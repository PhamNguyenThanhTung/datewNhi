import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { BS, IS, GB } from "../styles/global";

// Mật khẩu ẩn dùng chung để bypass hệ thống Auth
const DUMMY_PASSWORD = "ChamApp@Password123";

export default function LoginScreen({ onLogin }) {
  const [step, setStep] = useState(0); 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authUser, setAuthUser] = useState(null); // Lưu user auth

  // Bước 1: Nhập Email và thử Đăng nhập
  const handleCheckEmail = async () => {
    if (!email.includes("@") || loading) return;
    setLoading(true); setError("");
    
    try {
      const { data, error: signInErr } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: DUMMY_PASSWORD
      });

      if (data?.user) {
        setAuthUser(data.user); // Lưu lại authUser
        
        // Lấy profile (Dùng maybeSingle để tránh lỗi 406 nếu chưa có profile)
        const { data: profile } = await supabase.from("profiles")
          .select("*").eq("id", data.user.id).maybeSingle();

        // 🚨 CHẶN ĐỨNG TẠI ĐÂY: Có tài khoản Auth nhưng chưa có Tên thì phải đi nhập tên!
        if (!profile || !profile.display_name) {
          setStep(1); 
          return;
        }

        // Nếu đã có tên đàng hoàng, kiểm tra xem có phòng chưa
        const { data: room } = await supabase.from("couple_rooms")
          .select("*")
          .or(`user1_id.eq.${data.user.id},user2_id.eq.${data.user.id}`)
          .maybeSingle();

        if (room) {
          onLogin({ id: data.user.id, email: profile.email, name: profile.display_name, roomId: room.id });
        } else {
          setName(profile.display_name); // Gắn sẵn tên để khỏi lỗi
          setStep(2); // Đi chọn phòng
        }
      } else {
        // Tài khoản hoàn toàn chưa tồn tại -> Nhập tên
        setStep(1);
      }
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  // Bước 2: Tạo tài khoản (hoặc Cập nhật tên cho tài khoản bị thiếu)
  const handleCreateAccount = async () => {
    if (!name.trim() || loading) return;
    setLoading(true); setError("");

    try {
      const targetEmail = email.trim().toLowerCase();
      const displayName = name.trim(); 
      
      let currentUser = authUser;

      // Nếu là user mới tinh (chưa có authUser từ Bước 1) thì mới chạy signUp
      if (!currentUser) {
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email: targetEmail,
          password: DUMMY_PASSWORD
        });
        if (signUpErr) throw signUpErr;

        if (data?.user?.identities?.length === 0) {
          setError("Email này đang bị kẹt ở hệ thống. Hãy vào tab Users của Supabase xóa nó đi nhé!");
          setLoading(false);
          return; 
        }
        currentUser = data.user;
        setAuthUser(currentUser); // Cập nhật lại state
      }

      // Dù là tạo mới hay bổ sung tên, đều chạy Upsert để lưu tên chuẩn xác vào DB
      const { error: profileErr } = await supabase.from("profiles").upsert({
        id: currentUser.id,
        email: targetEmail,
        display_name: displayName 
      });
      if (profileErr) throw profileErr;

      setStep(2); // Chuyển sang chọn phòng
    } catch (err) { 
        setError("Không thể lưu tên: " + err.message); 
        console.error(err);
    } 
    finally { setLoading(false); }
  };

  // Bước 3A: Tạo phòng mới
  const handleCreateRoom = async () => {
    setLoading(true); setError("");
    try {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // ✅ Đảm bảo lấy tên chính xác
      const displayName = name.trim() || authUser?.email?.split("@")[0] || "Bạn";
      
      // Tạo phòng (Dùng đúng cột invite_code và user1_id của DB)
      const { data: room, error: rErr } = await supabase.from("couple_rooms")
        .insert([{ invite_code: code, user1_id: authUser.id }])
        .select().single();
      
      if (rErr) throw rErr;
      
      onLogin({ id: authUser.id, email, name: displayName, roomId: room.id });
    } catch (err) { setError("Không thể tạo phòng."); } 
    finally { setLoading(false); }
  };

  // Bước 3B: Nhập mã phòng người yêu (invite_code)
  const handleJoinRoom = async () => {
    if (!roomCodeInput.trim() || loading) return;
    setLoading(true); setError("");
    try {
      const inputCode = roomCodeInput.trim().toUpperCase();
      
      // 1. Tìm phòng theo invite_code
      const { data: room, error: findErr } = await supabase.from("couple_rooms")
        .select("*").eq("invite_code", inputCode).single();
        
      if (!room || findErr) { setError("Sai mã phòng mất rồi!"); return; }

      // 2. Cập nhật user2_id thành id của mình
      const { error: updateErr } = await supabase.from("couple_rooms")
        .update({ user2_id: authUser.id })
        .eq("id", room.id);
        
      if (updateErr) throw updateErr;

      // ✅ Đảm bảo lấy tên chính xác
      const displayName = name.trim() || authUser?.email?.split("@")[0] || "Bạn";
      onLogin({ id: authUser.id, email, name: displayName, roomId: room.id });
    } catch (err) { setError("Không thể tham gia phòng."); } 
    finally { setLoading(false); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 28 }}>
      <div style={{ width: "100%", maxWidth: 340 }}>
        
        {step === 0 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <h2 style={{ textAlign: 'center', color: '#ff6b9d', marginBottom: 20 }}>Góc Nhỏ 💌</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCheckEmail()} type="email" placeholder="Gmail của bạn..." style={{...IS, marginBottom: 16}} />
            <button onClick={handleCheckEmail} disabled={loading} style={BS("linear-gradient(135deg,#ff6b9d,#a78bfa)")}>
              {loading ? "Đang tải..." : "Tiếp tục ✨"}
            </button>
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <p style={{ color: '#888', textAlign: 'center' }}>Người ấy gọi bạn là gì nhỉ? 🤔</p>
            <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCreateAccount()} placeholder="Tên của bạn..." style={{...IS, marginBottom: 16}} />
            <button onClick={handleCreateAccount} disabled={loading} style={BS("#ff6b9d")}>
              {loading ? "Đang tạo..." : "Xác nhận tên"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: "fadeUp 0.3s ease", textAlign: 'center' }}>
            <p style={{ color: '#ff6b9d', fontWeight: 'bold' }}>Sắp xong rồi! 🚀</p>
            <button onClick={handleCreateRoom} disabled={loading} style={{...BS("linear-gradient(135deg,#ff6b9d,#ffd166)"), marginBottom: 15}}>🏠 Tạo phòng mới</button>
            <div style={{ color: '#444', fontSize: 12, marginBottom: 15 }}>— hoặc —</div>
            <button onClick={() => setStep(3)} style={GB}>🔑 Nhập mã người ấy gửi</button>
          </div>
        )}

        {step === 3 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <p style={{ color: '#888', textAlign: 'center' }}>Dán mã phòng vào đây nhé:</p>
            <input value={roomCodeInput} onChange={(e) => setRoomCodeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleJoinRoom()} placeholder="Mã phòng (VD: A1B2C3)" style={{...IS, marginBottom: 16}} />
            <button onClick={handleJoinRoom} disabled={loading} style={BS("#a78bfa")}>Kết nối ngay 💌</button>
            <button onClick={() => setStep(2)} style={{...GB, marginTop: 10}}>Quay lại</button>
          </div>
        )}

        {error && <div style={{ color: "#ff8e53", fontSize: 13, textAlign: "center", marginTop: 14 }}>{error}</div>}
      </div>
    </div>
  );
}