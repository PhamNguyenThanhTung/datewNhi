import Avatar from "./Avatar";

export default function AnswerCard({ name, avatar, answer, color, mini }) {
  return (
    <div style={{ background: `${color}10`, border: `1px solid ${color}2a`, borderRadius: mini ? 12 : 16, padding: mini ? "10px 13px" : "16px", animation: "pop 0.4s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
        <Avatar src={avatar} name={name} size={mini ? 22 : 28} />
        <span style={{ fontSize: 12, color, fontWeight: 700 }}>{name}</span>
      </div>
      <div style={{ color: "#ccc", fontSize: mini ? 13 : 14, lineHeight: 1.65 }}>{answer}</div>
    </div>
  );
}
