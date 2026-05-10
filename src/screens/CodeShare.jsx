import { useState } from "react";
import { BS } from "../styles/global";

export default function CodeShare({ couple, onReady }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(couple.coupleCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24, textAlign: "center" }}>
      <div style={{ maxWidth: 320, animation: "fadeUp 0.5s ease" }}>
        <div style={{ fontSize: 54, marginBottom: 14 }}>🎉</div>
        <h2 style={{ color: "#fff", fontSize: 21, fontWeight: 800, marginBottom: 6 }}>Mã phòng đã tạo!</h2>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 26 }}>Gửi mã này cho người ấy. Tên của họ sẽ hiện sau khi họ tự đăng nhập và tham gia.</p>
        <div onClick={copyCode} style={{ background: "rgba(255,255,255,0.05)", border: "2px dashed rgba(255,107,157,0.4)", borderRadius: 18, padding: "26px 20px", cursor: "pointer", marginBottom: 22 }}>
          <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: 10, color: "#ff6b9d", fontFamily: "monospace" }}>{couple.coupleCode}</div>
          <div style={{ color: "#555", fontSize: 13, marginTop: 8 }}>{copied ? "✅ Đã copy!" : "👆 Nhấn để copy"}</div>
        </div>
        <button onClick={onReady} style={BS("linear-gradient(135deg,#ff6b9d,#a78bfa)")}>Vào app</button>
      </div>
    </div>
  );
}
