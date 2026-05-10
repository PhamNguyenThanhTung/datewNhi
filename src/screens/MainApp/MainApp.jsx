import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import useLS from "../../hooks/useLS";
import { getTodayKey } from "../../data/questions";
import { isSupabaseConfigured } from "../../lib/supabaseClient";
import { deleteBucketItem, loadRoomData, saveAnswer, saveBucketItem, saveCountdown, sendPushNotification, subscribeRoom, toggleBucketItem, uploadMemory } from "../../lib/coupleService";
import { useDailyPrompts } from "../../hooks/useDailyPrompts";
import GamesTab from "./tabs/GamesTab"; // Đường dẫn tuỳ thuộc vào file MainApp của bạn đang ở đâu
import HomeTab from "./tabs/HomeTab";
import HistoryTab from "./tabs/HistoryTab";
import BucketTab from "./tabs/BucketTab";
import ProfileTab from "./tabs/ProfileTab";
import AlbumTab from "./tabs/AlbumTab";
import CountdownTab from "./tabs/CountdownTab";

export default function MainApp({ user, couple, onLogout, onUpdateUser }) {
  const [tab, setTab] = useState("home");
  const todayKey = getTodayKey();
  const roomId = couple.roomId || couple.id || couple.coupleCode;

  // 🚀 Lấy câu hỏi từ Edge Function (hoặc fallback local)
  const { questions: dailyPrompts, loading: promptsLoading } = useDailyPrompts(roomId);

  const [localMyAns, setLocalMyAns] = useLS(`my_${couple.coupleCode}_${todayKey}`, "");
  const [localPtAns, setLocalPtAns] = useLS(`pt_${couple.coupleCode}_${todayKey}`, "");
  const [localMyAnswers, setLocalMyAnswers] = useLS(`my_multi_${couple.coupleCode}_${todayKey}`, {});
  const [localPtAnswers] = useLS(`pt_multi_${couple.coupleCode}_${todayKey}`, {});
  const [skippedQuestions, setSkippedQuestions] = useLS(`skipped_${couple.coupleCode}_${todayKey}`, {});
  const [localStreak, setLocalStreak] = useLS(`streak_${couple.coupleCode}`, { count: 0, lastDate: null });
  const [localHistory, setLocalHistory] = useLS(`history_${couple.coupleCode}`, []);
  const [localBucket, setLocalBucket] = useLS(`bucket_${couple.coupleCode}`, []);

  const [myAns, setMyAns] = useState(localMyAns);
  const [, setPtAns] = useState(localPtAns);
  const [myAnswers, setMyAnswers] = useState(localMyAnswers);
  const [partnerAnswers, setPartnerAnswers] = useState(localPtAnswers);
  const [streak, setStreak] = useState(localStreak);
  const [history, setHistory] = useState(localHistory);
  const [bucket, setBucket] = useState(localBucket);
  const [memories, setMemories] = useState([]);
  const [countdown, setCountdown] = useState({ title: couple.countdownTitle || "", date: couple.countdownDate || "" });
  const [partnerName, setPartnerName] = useState(couple.partnerName || "Đang chờ người ấy");
  const [partnerJoined, setPartnerJoined] = useState(Boolean(couple.partnerJoined));
  const [ansInputs, setAnsInputs] = useState({});
  const [ptInput, setPtInput] = useState("");
  const [showSim, setShowSim] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [streakAnim, setStreakAnim] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [syncing, setSyncing] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let mounted = true;
    const sync = async () => {
      const data = await loadRoomData(roomId, user.id);
      if (!mounted || !data) return;
      setMyAns(data.myAns);
      setPtAns(data.ptAns);
      setMyAnswers(data.myAnswers);
      setPartnerAnswers(data.partnerAnswers);
      setHistory(data.history);
      setBucket(data.bucket);
      setMemories(data.memories);
      setStreak(data.streak);
      setCountdown(data.countdown);
      setPartnerName(data.partnerName);
      setPartnerJoined(data.partnerJoined);
      setSyncing(false);
    };
    sync().catch(console.error);
    const unsubscribe = subscribeRoom(roomId, () => sync().catch(console.error));
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [roomId, user.id]);

  const attemptStreakUpdate = () => {
    const today = getTodayKey();
    if (streak.lastDate === today) return;
    
    const yd = (() => {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    })();
    const n = streak.lastDate === yd ? streak.count + 1 : 1;
    const nextStreak = { count: n, lastDate: today };
    setStreak(nextStreak);
    setLocalStreak(nextStreak);
    setStreakAnim(true);
    setTimeout(() => setStreakAnim(false), 900);
    setHistory((h) => {
      const next = [{ date: todayKey, question: "Câu hỏi demo", myAnswer: myAns || "Đã trả lời", partnerAnswer: ptAns || "Đã trả lời" }, ...h.slice(0, 29)];
      setLocalHistory(next);
      return next;
    });
  };

  const skipQuestion = (promptKey) => {
    if (myAnswers[promptKey] || partnerAnswers[promptKey]) return;
    setSkippedQuestions((items) => ({ ...items, [promptKey]: true }));
    setAnsInputs((items) => ({ ...items, [promptKey]: "" }));
  };

  const submitMy = async (question) => {
    const answer = ansInputs[question.promptKey]?.trim();
    if (!answer) return;
    setMyAnswers((items) => {
      const next = { ...items, [question.promptKey]: answer };
      setLocalMyAnswers(next);
      return next;
    });
    setMyAns(answer);
    setLocalMyAns(answer);
    setAnsInputs((items) => ({ ...items, [question.promptKey]: "" }));
    await saveAnswer({ roomId, userId: user.id, question, answer });
    
    // Check streak: I just answered, check if partner has answered too
    const partnerResponded = ptAns || Object.keys(partnerAnswers).length > 0;
    if (partnerResponded && streak.lastDate !== todayKey) {
      attemptStreakUpdate();
    }
  };

  const uploadQuestionPhoto = async (question, file) => {
    const caption = question.vi;
    if (isSupabaseConfigured) {
      const memory = await uploadMemory(roomId, user.id, file, caption);
      setMemories((items) => [memory, ...items]);
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMemories((items) => [{ id: Date.now(), image_url: event.target.result, caption, created_at: new Date().toISOString() }, ...items]);
      };
      reader.readAsDataURL(file);
    }
    const answer = "Đã gửi một bức ảnh 📷";
    setMyAnswers((items) => {
      const next = { ...items, [question.promptKey]: answer };
      setLocalMyAnswers(next);
      return next;
    });
    // Gửi thông báo cho người kia
    const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id;
    await saveAnswer({ roomId, userId: user.id, userName: user.name, partnerId, question, answer });
  };

  const submitPt = async () => {
    if (!ptInput.trim()) return;
    const answer = ptInput.trim();
    setPtAns(answer);
    setLocalPtAns(answer);
    setPtInput("");
    setShowSim(false);
    
    // Check streak: Partner just answered, check if I have answered too
    const iResponded = myAns || Object.keys(myAnswers).length > 0;
    if (iResponded && streak.lastDate !== todayKey) {
      attemptStreakUpdate();
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;
    const text = newItem.trim();
    setNewItem("");
    if (isSupabaseConfigured) {
      const inserted = await saveBucketItem(roomId, text);
      if (inserted) setBucket((b) => [inserted, ...b]);
      attemptStreakUpdate(); // Streak cộng khi add bucket item
      // Gửi thông báo cho người kia
      const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id;
      if (partnerId) {
        sendPushNotification(partnerId, `${user.name} vừa thêm vào danh sách: "${text}" ✨`);
      }
      return;
    }
    const item = { id: Date.now(), text, done: false };
    setBucket((b) => {
      const next = [item, ...b];
      setLocalBucket(next);
      return next;
    });
    attemptStreakUpdate(); // Streak cộng khi add bucket item
  };

  const addSuggestion = async (text, index) => {
    if (isSupabaseConfigured) {
      const inserted = await saveBucketItem(roomId, text);
      if (inserted) setBucket((b) => [inserted, ...b]);
      attemptStreakUpdate(); // Streak cộng khi accept suggestion
      // Gửi thông báo cho người kia
      const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id;
      if (partnerId) {
        sendPushNotification(partnerId, `${user.name} vừa chấp nhận gợi ý: "${text}" ✨`);
      }
      return;
    }
    setBucket((b) => {
      const next = [{ id: Date.now() + index, text, done: false }, ...b];
      setLocalBucket(next);
      return next;
    });
    attemptStreakUpdate(); // Streak cộng khi accept suggestion
  };

  const toggleItem = async (id) => {
    const item = bucket.find((x) => x.id === id);
    if (!item) return;
    const done = !item.done;
    setBucket((b) => {
      const next = b.map((x) => (x.id === id ? { ...x, done } : x));
      setLocalBucket(next);
      return next;
    });
    await toggleBucketItem(id, done);
  };

  const removeItem = async (id) => {
    setBucket((b) => {
      const next = b.filter((x) => x.id !== id);
      setLocalBucket(next);
      return next;
    });
    await deleteBucketItem(id);
  };

  const handleSaveCountdown = async (nextCountdown) => {
    setCountdown(nextCountdown);
    await saveCountdown(roomId, nextCountdown);
    attemptStreakUpdate(); // Streak cộng khi save countdown
    // Gửi thông báo cho người kia
    const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id;
    if (partnerId && nextCountdown.title) {
      sendPushNotification(partnerId, `${user.name} vừa cập nhật: "${nextCountdown.title}" ⏰`);
    }
  };

  const saveProfile = () => {
    onUpdateUser({ ...user, name: editName.trim() || user.name });
    setEditMode(false);
  };

  const displayCouple = { ...couple, partnerName, partnerJoined };
  const tabs = [
    { id: "home", icon: "🕯️", label: "Hôm nay" },
    { id: "history", icon: "📖", label: "Lịch sử" },
    { id: "games", icon: "🎮", label: "Góc Vui" },
    { id: "album", icon: "🖼️", label: "Album" },
    { id: "countdown", icon: "⏰", label: "Đếm ngày" },
    { id: "bucket", icon: "🌟", label: "Danh sách" },
    { id: "profile", icon: "👤", label: "Hồ sơ" },
  ];

  // 🕯️ Màn hình Loading khi đợi câu hỏi từ server
  if (promptsLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0a0a12", color: "#ff6b9d" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20, animation: "pulse 1.5s infinite" }}>🕯️</div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 1 }}>ĐANG THẮP LỬA...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 440, margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "13px 18px 11px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(24px)", position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar src={user.avatar} name={user.name} size={34} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
              {user.name} <span style={{ color: "#ff6b9d" }}>♥</span> {partnerName}
            </div>
            <div style={{ fontSize: 10, color: "#444" }}>#{couple.coupleCode}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: streakAnim ? "rgba(255,209,102,0.18)" : "rgba(255,255,255,0.06)", borderRadius: 99, padding: "7px 13px", animation: streakAnim ? "sb 0.7s ease" : "none", transition: "background 0.3s" }}>
          <span style={{ fontSize: 17 }}>🔥</span>
          <span style={{ fontWeight: 900, fontSize: 17, color: "#ffd166" }}>{streak.count}</span>
          <span style={{ color: "#444", fontSize: 10 }}>ngày</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 96px" }}>
        {syncing && <div style={{ color: "#555", textAlign: "center", fontSize: 13, marginBottom: 12 }}>Đang đồng bộ...</div>}
        {!partnerJoined && isSupabaseConfigured && (
          <div style={{ background: "rgba(255,209,102,0.06)", border: "1px dashed rgba(255,209,102,0.2)", borderRadius: 14, color: "#777", fontSize: 13, lineHeight: 1.5, padding: 12, marginBottom: 12, textAlign: "center" }}>
            Đang chờ người ấy nhập mã phòng. Khi họ tham gia, tên profile của họ sẽ tự hiện ở đây.
          </div>
        )}
        {tab === "home" && <HomeTab user={user} couple={displayCouple} questions={dailyPrompts} myAnswers={myAnswers} partnerAnswers={partnerAnswers} ansInputs={ansInputs} setAnsInputs={setAnsInputs} skippedQuestions={skippedQuestions} ptInput={ptInput} setPtInput={setPtInput} showSim={showSim} setShowSim={setShowSim} submitMy={submitMy} submitPt={submitPt} skipQuestion={skipQuestion} uploadQuestionPhoto={uploadQuestionPhoto} realtime={isSupabaseConfigured} />}
        {tab === "history" && <HistoryTab user={user} couple={displayCouple} history={history} />}
        {tab === 'games' && (
  <GamesTab 
    roomId={couple.id} 
    userId={user.id} 
    myName={user.name} 
    partnerName={couple.partnerName} 
    // 👇 BẮT BUỘC PHẢI THÊM DÒNG NÀY ĐỂ LẤY ID NGƯỜI ẤY
    partnerId={couple.user1_id === user.id ? couple.user2_id : couple.user1_id}
  />
)}
        {tab === "album" && <AlbumTab user={user} roomId={roomId} memories={memories} setMemories={setMemories} />}
        {tab === "countdown" && <CountdownTab countdown={countdown} onSave={handleSaveCountdown} />}
        {tab === "bucket" && <BucketTab bucket={bucket} newItem={newItem} setNewItem={setNewItem} addItem={addItem} addSuggestion={addSuggestion} toggleItem={toggleItem} removeItem={removeItem} />}
        {tab === "profile" && <ProfileTab user={user} couple={displayCouple} streak={streak} history={history} bucket={bucket} editMode={editMode} setEditMode={setEditMode} editName={editName} setEditName={setEditName} saveProfile={saveProfile} onLogout={onLogout} onUpdateUser={onUpdateUser} />}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 440, background: "rgba(7,7,14,0.97)", backdropFilter: "blur(28px)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-around", padding: "10px 0 max(10px,env(safe-area-inset-bottom))", zIndex: 20 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 6px", fontFamily: "inherit", minWidth: 48 }}>
            <span style={{ fontSize: 19, filter: tab === t.id ? "none" : "grayscale(0.7)", opacity: tab === t.id ? 1 : 0.32, transition: "all 0.2s" }}>{t.icon}</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: tab === t.id ? "#ff6b9d" : "#444", transition: "color 0.2s", whiteSpace: "nowrap" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#ff6b9d" }} />}
          </button>
        ))}
      </div>
    </div>
  );
}