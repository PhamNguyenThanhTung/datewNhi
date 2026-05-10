import { useState } from "react";
import { signInWithGoogle, signInWithMagicLink } from "../lib/coupleService";
import { isSupabaseConfigured } from "../lib/supabaseClient";
import { BS, GB, IS } from "../styles/global";

export default function LoginScreen({ onLogin }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const googleLogin = async () => {
    setLoading(true);
    setNotice("");
    try {
      const result = await signInWithGoogle();
      if (result.demo) onLogin({ email: "demo@gmail.com", name: "Bạn", avatar: null, uid: "demo@gmail.com", id: "demo@gmail.com" });
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  const emailLogin = async () => {
    if (!email.includes("@") || !name.trim()) return;
    setLoading(true);
    setNotice("");
    try {
      const result = await signInWithMagicLink(email, name.trim());
      if (result.demo) onLogin({ email, name: name.trim(), avatar: null, uid: email, id: email });
      else setNotice("Đã gửi Magic Link. Mở email trên điện thoại này để đăng nhập.");
    } catch (error) {
      setNotice(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 28 }}>
      <div style={{ width: "100%", maxWidth: 340, animation: "fadeUp 0.5s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 60, animation: "hb 2.4s ease-in-out infinite" }}>🕯️</div>
          <h1 style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1.5, margin: "10px 0 6px", background: "linear-gradient(135deg,#ff6b9d,#ffd166,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "200%", animation: "shimmer 4s linear infinite" }}>lửa nhỏ</h1>
          <p style={{ color: "#555", fontSize: 14, margin: 0 }}>Một câu hỏi mỗi ngày - mãi bên nhau</p>
        </div>

        {step === 0 && (
          <>
            <button onClick={googleLogin} disabled={loading} style={{ width: "100%", padding: "14px 20px", borderRadius: 14, background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontSize: 15, fontWeight: 700, color: "#3c4043", boxShadow: "0 2px 24px rgba(0,0,0,0.35)", marginBottom: 18, fontFamily: "inherit", opacity: loading ? 0.85 : 1 }}>
              {loading ? <div style={{ width: 20, height: 20, border: "2px solid #ddd", borderTopColor: "#4285f4", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} /> : "G"}
              {loading ? "Đang đăng nhập..." : isSupabaseConfigured ? "Đăng nhập với Google" : "Demo Google"}
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} /><span style={{ color: "#444", fontSize: 12 }}>hoặc email</span><div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
            </div>
            <button onClick={() => setStep(1)} style={{ ...BS("rgba(255,255,255,0.07)"), boxShadow: "none", border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}>📧 Dùng email</button>
          </>
        )}

        {step === 1 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 8 }}>Địa chỉ email</div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && email.includes("@") && setStep(2)} type="email" placeholder="email@gmail.com" style={{ ...IS, marginBottom: 10 }} autoFocus />
            <button onClick={() => email.includes("@") && setStep(2)} style={BS("linear-gradient(135deg,#ff6b9d,#a78bfa)")}>Tiếp tục →</button>
            <button onClick={() => setStep(0)} style={GB}>← Quay lại</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 8 }}>Tên hiển thị của bạn</div>
            <input value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && emailLogin()} placeholder="Tên của bạn..." style={{ ...IS, marginBottom: 10 }} autoFocus />
            <button onClick={emailLogin} disabled={loading} style={BS("linear-gradient(135deg,#ff6b9d,#a78bfa)")}>{isSupabaseConfigured ? "Gửi Magic Link ✨" : "Vào app demo ✨"}</button>
            <button onClick={() => setStep(1)} style={GB}>← Quay lại</button>
          </div>
        )}

        {notice && <div style={{ color: notice.includes("Đã gửi") ? "#60efff" : "#ff8e53", fontSize: 13, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>{notice}</div>}
      </div>
    </div>
  );
}
