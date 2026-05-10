import { useState } from "react";
import { BS, IS } from "../../../styles/global";

const daysLeft = (date) => {
  if (!date) return null;
  const start = new Date();
  const end = new Date(`${date}T00:00:00`);
  start.setHours(0, 0, 0, 0);
  return Math.ceil((end - start) / 86400000);
};

export default function CountdownTab({ countdown, onSave }) {
  const [title, setTitle] = useState(countdown.title || "");
  const [date, setDate] = useState(countdown.date || "");
  const left = daysLeft(countdown.date);

  const save = () => onSave({ title: title.trim(), date });

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>⏰ Countdown</div>
      <div style={{ color: "#555", fontSize: 13, marginBottom: 18 }}>Đếm ngày tới một dịp quan trọng</div>

      <div style={{ background: "linear-gradient(135deg,rgba(255,209,102,0.1),rgba(96,239,255,0.08))", border: "1px solid rgba(255,209,102,0.18)", borderRadius: 18, padding: 18, textAlign: "center", marginBottom: 16 }}>
        <div style={{ color: "#ffd166", fontSize: 13, fontWeight: 800, marginBottom: 6 }}>{countdown.title || "Chưa đặt sự kiện"}</div>
        <div style={{ color: "#fff", fontSize: 46, fontWeight: 900 }}>{left === null ? "?" : Math.abs(left)}</div>
        <div style={{ color: "#666", fontSize: 13 }}>{left === null ? "Chọn một ngày bên dưới" : left >= 0 ? "ngày nữa" : "ngày đã qua"}</div>
      </div>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tên sự kiện, ví dụ: Kỷ niệm 1 năm" style={{ ...IS, marginBottom: 10 }} />
      <input value={date} onChange={(e) => setDate(e.target.value)} type="date" style={{ ...IS, marginBottom: 10 }} />
      <button onClick={save} style={BS("linear-gradient(135deg,#ffd166,#ff8e53)")}>Lưu countdown</button>
    </div>
  );
}
