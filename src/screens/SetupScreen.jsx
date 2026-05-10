import { useState } from "react";
import Avatar from "../components/Avatar";
import { createRoom, joinRoom } from "../lib/coupleService";
import { BS, GB, IS } from "../styles/global";

export default function SetupScreen({ user, onSetup }) {
  const [mode, setMode] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const create = async () => {
    setLoading(true);
    setError("");
    try {
      onSetup(await createRoom(user));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const join = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError("");
    try {
      onSetup(await joinRoom(user, code.trim()));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 340, animation: "fadeUp 0.5s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "12px 16px", marginBottom: 28 }}>
          <Avatar src={user.avatar} name={user.name} size={42} />
          <div><div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{user.name}</div><div style={{ color: "#555", fontSize: 12 }}>{user.email}</div></div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ fontSize: 34 }}>👫</div>
          <h2 style={{ color: "#fff", fontSize: 21, fontWeight: 800, margin: "8px 0 4px" }}>Kết nối với người ấy</h2>
          <p style={{ color: "#555", fontSize: 13, margin: 0 }}>Tạo mã phòng hoặc nhập mã được gửi cho bạn</p>
        </div>

        {!mode && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => setMode("create")} style={BS("linear-gradient(135deg,#ff6b9d,#ff8e53)")}>✨ Tạo mã phòng</button>
            <button onClick={() => setMode("join")} style={BS("linear-gradient(135deg,#a78bfa,#60efff)")}>🔗 Nhập mã phòng</button>
          </div>
        )}

        {mode === "create" && (
          <div style={{ animation: "fadeUp 0.3s ease", textAlign: "center" }}>
            <div style={{ color: "#666", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
              App sẽ tạo mã ngẫu nhiên. Tên của người ấy sẽ tự hiện sau khi họ đăng nhập và nhập mã này.
            </div>
            <button onClick={create} disabled={loading} style={BS("linear-gradient(135deg,#ff6b9d,#a78bfa)")}>{loading ? "Đang tạo..." : "Tạo mã 🎉"}</button>
            <button onClick={() => setMode(null)} style={GB}>← Quay lại</button>
          </div>
        )}

        {mode === "join" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Mã phòng (VD: AB12CD)" style={{ ...IS, textAlign: "center", fontSize: 22, fontWeight: 900, letterSpacing: 6, marginBottom: 10 }} />
            <button onClick={join} disabled={loading} style={BS("linear-gradient(135deg,#a78bfa,#60efff)")}>{loading ? "Đang tham gia..." : "Tham gia 💫"}</button>
            <button onClick={() => setMode(null)} style={GB}>← Quay lại</button>
          </div>
        )}

        {error && <div style={{ color: "#ff8e53", fontSize: 13, textAlign: "center", marginTop: 12 }}>{error}</div>}
      </div>
    </div>
  );
}
