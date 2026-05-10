import { getTodayKey } from "../data/questions";
import { isSupabaseConfigured, supabase } from "./supabaseClient";

const makeInviteCode = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export function profileToUser(profile, authUser) {
  if (!profile && !authUser) return null;
  return {
    uid: profile?.id || authUser?.id,
    id: profile?.id || authUser?.id,
    email: profile?.email || authUser?.email || "",
    // ✅ FIX: Bổ sung lấy dob cho user hiện tại
    dob: profile?.dob || null, 
    name: profile?.display_name || authUser?.user_metadata?.full_name || "Bạn",
    avatar: profile?.avatar_url || authUser?.user_metadata?.avatar_url || null,
  };
}

export async function getSessionProfile() {
  if (!isSupabaseConfigured) return { user: null, profile: null };
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw sessionError;
  const authUser = sessionData.session?.user;
  if (!authUser) return { user: null, profile: null };

  // ✅ FIX: Chỗ này đã lấy select("*") nên nó sẽ tự động gom cả 'dob' về. Không cần sửa thêm ở đây.
  const { data: profile } = await supabase.from("profiles")
    .select("*").eq("id", authUser.id).maybeSingle();

  return { user: profileToUser(profile, authUser), profile };
}

export async function signInWithGoogle() {
  if (!isSupabaseConfigured) return { demo: true };
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });
  if (error) throw error;
  return { demo: false };
}

export async function signInWithMagicLink(email, name) {
  if (!isSupabaseConfigured) return { demo: true };
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
      data: { display_name: name || email.split("@")[0] },
    },
  });
  if (error) throw error;
  return { demo: false };
}

export async function signOut() {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function upsertProfile(authUser, patch = {}) {
  if (!isSupabaseConfigured) return null;
  const payload = {
    id: authUser.id,
    email: authUser.email,
    display_name: patch.display_name || authUser.user_metadata?.display_name || authUser.user_metadata?.full_name || authUser.email?.split("@")[0] || "Bạn",
    avatar_url: patch.avatar_url ?? authUser.user_metadata?.avatar_url ?? null,
    // ✅ FIX: Thêm upsert dob nếu có truyền vào
    dob: patch.dob ?? null,
    updated_at: new Date().toISOString(),
  };
  const { data, error } = await supabase.from("profiles").upsert(payload).select("*").single();
  if (error) throw error;
  return data;
}

export async function updateProfile(user, patch) {
  if (!isSupabaseConfigured) return { ...user, ...patch };
  
  const updateData = {
    display_name: patch.name ?? user.name,
    avatar_url: patch.avatar ?? user.avatar,
    updated_at: new Date().toISOString(),
  };
  
  // ✅ FIX: Bổ sung dob vào cục update nếu người dùng có sửa ngày sinh
  if (patch.dob !== undefined) {
    updateData.dob = patch.dob;
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id)
    .select("*")
    .single();
  if (error) throw error;
  return profileToUser(data, { id: user.id, email: user.email });
}

export async function uploadAvatar(user, file) {
  if (!isSupabaseConfigured) return null;
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${user.id}/avatar.${ext}`;
  const { error } = await supabase.storage.from("avatars").upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return data.publicUrl;
}

export async function createRoom(user) {
  if (!isSupabaseConfigured) {
    return { id: `demo-${Date.now()}`, coupleCode: makeInviteCode(), partnerName: "Đang chờ người ấy", myName: user.name, role: "A", streakCount: 0 };
  }
  const invite_code = makeInviteCode();
  const { data, error } = await supabase.from("couple_rooms").insert({ invite_code, user1_id: user.id }).select("*").single();
  if (error) throw error;
  return roomToCouple(data, user);
}

export async function joinRoom(user, code) {
  if (!isSupabaseConfigured) {
    const stored = JSON.parse(localStorage.getItem("lhn_couple") || "null");
    if (!stored || stored.coupleCode !== code.toUpperCase()) throw new Error("Mã không đúng! Nhờ người kia kiểm tra lại.");
    return { ...stored, partnerName: stored.myName || "Người tạo phòng", myName: user.name, role: "B" };
  }
  const { data: room, error: findError } = await supabase.from("couple_rooms").select("*").eq("invite_code", code.toUpperCase()).maybeSingle();
  if (findError) throw findError;
  if (!room) throw new Error("Mã phòng không tồn tại.");
  if (room.user1_id !== user.id && room.user2_id && room.user2_id !== user.id) throw new Error("Phòng này đã đủ 2 người.");
  const patch = room.user1_id === user.id ? {} : { user2_id: user.id };
  const { data, error } = await supabase.from("couple_rooms").update(patch).eq("id", room.id).select("*").single();
  if (error) throw error;
  return roomToCouple(data, user);
}

export async function getMyRoom(user) {
  if (!isSupabaseConfigured || !user) return null;
  const { data, error } = await supabase
    .from("couple_rooms")
    .select("*")
    .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data ? roomToCouple(data, user) : null;
}

async function roomToCouple(room, user) {
  if (!isSupabaseConfigured) return room;
  const partnerId = room.user1_id === user.id ? room.user2_id : room.user1_id;
  let partnerProfile = null;
  if (partnerId) {
    // ✅ FIX: Chỗ này là select("*") rồi nên nó lấy đủ dob của Partner luôn.
    const { data } = await supabase.from("profiles").select("*").eq("id", partnerId).maybeSingle();
    partnerProfile = data;
  }
  return {
    id: room.id,
    roomId: room.id,
    coupleCode: room.invite_code,
    partnerName: partnerProfile?.display_name || "Đang chờ người ấy",
    partnerAvatar: partnerProfile?.avatar_url || null,
    // ✅ FIX: Đưa ngày sinh của partner vào để hiển thị cung hoàng đạo
    partnerDob: partnerProfile?.dob || null, 
    partnerJoined: Boolean(partnerProfile),
    myName: user.name,
    role: room.user1_id === user.id ? "A" : "B",
    streakCount: room.streak_count || 0,
    lastDate: room.last_answer_date,
    // ✅ FIX: Đưa ngày yêu nhau vào object couple
    startDate: room.start_date || null,
    countdownTitle: room.countdown_title || "",
    countdownDate: room.countdown_date || "",
  };
}

export async function loadRoomData(roomId, userId) {
  if (!isSupabaseConfigured) return null;
  const todayKey = getTodayKey();
  const [answersRes, bucketRes, memoriesRes, roomRes] = await Promise.all([
    supabase.from("answers").select("*").eq("room_id", roomId).order("created_at", { ascending: false }),
    supabase.from("bucket_list").select("*").eq("room_id", roomId).order("created_at", { ascending: false }),
    supabase.from("memories").select("*").eq("room_id", roomId).order("created_at", { ascending: false }),
    supabase.from("couple_rooms").select("*").eq("id", roomId).single(),
  ]);
  const error = answersRes.error || bucketRes.error || memoriesRes.error || roomRes.error;
  if (error) throw error;
  const todayAnswers = answersRes.data.filter((a) => a.date_key === todayKey || a.date_key.startsWith(`${todayKey}#`));
  const roomMeta = await roomToCouple(roomRes.data, { id: userId, name: "" });
  const myAnswers = {};
  const partnerAnswers = {};
  todayAnswers.forEach((answer) => {
    const key = answer.date_key.includes("#") ? answer.date_key : `${todayKey}#legacy`;
    if (answer.user_id === userId) myAnswers[key] = answer.answer_text;
    else partnerAnswers[key] = answer.answer_text;
  });
  return {
    myAns: todayAnswers.find((a) => a.user_id === userId)?.answer_text || "",
    ptAns: todayAnswers.find((a) => a.user_id !== userId)?.answer_text || "",
    myAnswers,
    partnerAnswers,
    partnerName: roomMeta.partnerName,
    partnerJoined: roomMeta.partnerJoined,
    history: buildHistory(answersRes.data, userId),
    bucket: bucketRes.data.map((x) => ({ id: x.id, text: x.text, done: x.done })),
    memories: memoriesRes.data,
    streak: { count: roomRes.data.streak_count || 0, lastDate: roomRes.data.last_answer_date },
    countdown: { title: roomRes.data.countdown_title || "", date: roomRes.data.countdown_date || "" },
  };
}

function buildHistory(answers, userId) {
  const grouped = answers.reduce((acc, answer) => {
    acc[answer.date_key] ||= { date: answer.date_key, question: answer.question_vi, myAnswer: "", partnerAnswer: "" };
    if (answer.user_id === userId) acc[answer.date_key].myAnswer = answer.answer_text;
    else acc[answer.date_key].partnerAnswer = answer.answer_text;
    return acc;
  }, {});
  return Object.values(grouped).filter((x) => x.myAnswer && x.partnerAnswer).slice(0, 30);
}

// ✅ CẬP NHẬT HÀM LƯU CÂU TRẢ LỜI CÓ THÔNG BÁO
export async function saveAnswer({ roomId, userId, userName, partnerId, question, answer }) {
  if (!isSupabaseConfigured) return;
  const dateKey = question.promptKey || getTodayKey();
  
  const { error } = await supabase.from("answers").upsert(
    {
      room_id: roomId,
      user_id: userId,
      date_key: dateKey,
      question_vi: question.vi,
      question_en: question.en,
      answer_text: answer,
    },
    { onConflict: "room_id,user_id,date_key" },
  );

  if (error) throw error;
  
  // 1. Cập nhật Streak
  await refreshStreak(roomId);

  // 2. 🔔 BẮN THÔNG BÁO CHO NGƯỜI KIA
  // Nếu có ID người kia, gửi tin nhắn báo hiệu
  if (partnerId) {
    sendPushNotification(partnerId, `${userName} vừa trả lời câu hỏi: "${question.vi}" ✨`);
  }
}

export async function refreshStreak(roomId) {
  if (!isSupabaseConfigured) return null;
  const today = getTodayKey();
  const { data: answers, error: answersError } = await supabase.from("answers").select("user_id").eq("room_id", roomId).eq("date_key", today);
  if (answersError) throw answersError;
  const uniqueUsers = new Set((answers || []).map((x) => x.user_id));
  if (uniqueUsers.size < 2) return null;

  const { data: room, error: roomError } = await supabase.from("couple_rooms").select("streak_count,last_answer_date").eq("id", roomId).single();
  if (roomError) throw roomError;
  if (room.last_answer_date === today) return room;

  const yd = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  })();
  const nextCount = room.last_answer_date === yd ? (room.streak_count || 0) + 1 : 1;
  const { data, error } = await supabase.from("couple_rooms").update({ streak_count: nextCount, last_answer_date: today }).eq("id", roomId).select("*").single();
  if (error) throw error;
  return data;
}

export async function saveBucketItem(roomId, text) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase.from("bucket_list").insert({ room_id: roomId, text }).select("*").single();
  if (error) throw error;
  return { id: data.id, text: data.text, done: data.done };
}

export async function toggleBucketItem(id, done) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from("bucket_list").update({ done }).eq("id", id);
  if (error) throw error;
}

export async function deleteBucketItem(id) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from("bucket_list").delete().eq("id", id);
  if (error) throw error;
}

export async function saveCountdown(roomId, countdown) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase
    .from("couple_rooms")
    .update({ countdown_title: countdown.title || null, countdown_date: countdown.date || null })
    .eq("id", roomId);
  if (error) throw error;
}

export async function uploadMemory(roomId, userId, file, caption) {
  if (!isSupabaseConfigured) return null;
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${roomId}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from("memories").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (uploadError) throw uploadError;
  const { data: publicData } = supabase.storage.from("memories").getPublicUrl(path);
  const { data, error } = await supabase
    .from("memories")
    .insert({ room_id: roomId, user_id: userId, image_path: path, image_url: publicData.publicUrl, caption })
    .select("*")
    .single();
  if (error) throw error;
  return data;
}

export function subscribeRoom(roomId, onChange) {
  if (!isSupabaseConfigured || !roomId) return () => {};
  const channel = supabase
    .channel(`room-${roomId}`)
    .on("postgres_changes", { event: "*", schema: "public", table: "answers", filter: `room_id=eq.${roomId}` }, onChange)
    .on("postgres_changes", { event: "*", schema: "public", table: "bucket_list", filter: `room_id=eq.${roomId}` }, onChange)
    .on("postgres_changes", { event: "*", schema: "public", table: "memories", filter: `room_id=eq.${roomId}` }, onChange)
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "couple_rooms", filter: `id=eq.${roomId}` }, onChange)
    .subscribe();
  return () => supabase.removeChannel(channel);
}
// ✅ HÀM GỬI THÔNG BÁO QUA ONESIGNAL (ĐÃ FIX)
export async function sendPushNotification(targetUserId, message) {
  if (!targetUserId) return;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Đảm bảo chữ Basic có dấu cách phía sau
      'Authorization': 'Basic os_v2_app_oybov2ddwbh6lexelqj7howel6qlxz73qosux3u5borxecp4yt3brapgz55h6kw6xmmgwukww2otwl6msbza2zs5pjwtkpfcww662za' 
    },
    body: JSON.stringify({
      app_id: '7602eae8-63b0-4fe5-92e4-5c13f3bac45f',
      include_external_user_ids: [targetUserId],
      contents: { en: message, vi: message },
      headings: { en: 'Lửa Nhỏ 🔥', vi: 'Lửa Nhỏ 🔥' },
      
      // ✅ PHẢI LÀ LINK WEB, KHÔNG ĐƯỢC DÙNG Ổ C:
      chrome_web_icon: "https://datew-nhi.vercel.app/logo.jpg", 
      // Nếu chưa có link web, tạm thời hãy comment dòng icon này lại hoặc dùng link ảnh mạng
      // chrome_web_icon: "https://i.imgur.com/your-image-id.jpg" 
    })
  };

  try {
    const res = await fetch('https://onesignal.com/api/v1/notifications', options);
    const data = await res.json();
    
    if (data.errors) {
      console.error("OneSignal báo lỗi:", data.errors);
    } else {
      console.log("Gửi thông báo thành công:", data);
    }
  } catch (err) {
    console.error("Lỗi kết nối mạng:", err);
  }
}