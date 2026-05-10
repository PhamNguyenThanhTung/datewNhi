import AnswerCard from "../../../components/AnswerCard";

export default function HistoryTab({ user, couple, history }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>📖 Lịch sử trả lời</div>
      <div style={{ color: "#555", fontSize: 13, marginBottom: 18 }}>Nơi lưu các ngày mà cả hai đã cùng trả lời câu hỏi. Ảnh riêng nằm ở tab Album.</div>
      {history.length === 0 ? (
        <div style={{ textAlign: "center", color: "#444", marginTop: 60 }}><div style={{ fontSize: 44 }}>🌱</div><p style={{ fontSize: 14 }}>Chưa có ngày nào đủ câu trả lời của cả hai.</p></div>
      ) : (
        history.map((h, i) => (
          <div key={h.date} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "15px", marginBottom: 12, animation: `fadeUp 0.3s ease ${i * 0.04}s both` }}>
            <div style={{ color: "#444", fontSize: 11, marginBottom: 5 }}>{h.date}</div>
            <div style={{ color: "#777", fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>❓ {h.question}</div>
            <AnswerCard name={user.name} avatar={user.avatar} answer={h.myAnswer} color="#60efff" mini />
            <div style={{ marginTop: 8 }}><AnswerCard name={couple.partnerName} answer={h.partnerAnswer} color="#ffd166" mini /></div>
          </div>
        ))
      )}
    </div>
  );
}
