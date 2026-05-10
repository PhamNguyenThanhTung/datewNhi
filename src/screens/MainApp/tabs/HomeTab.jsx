import { useRef } from "react";
import Avatar from "../../../components/Avatar";
import AnswerCard from "../../../components/AnswerCard";
import { BS } from "../../../styles/global";

function PhotoButton({ question, onUpload, disabled }) {
  const ref = useRef(null);
  return (
    <>
      <button onClick={() => ref.current?.click()} disabled={disabled} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "11px", color: "#ccc", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginTop: 10 }}>
        📷 Up ảnh cho câu này
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          event.target.value = "";
          if (file) onUpload(question, file);
        }}
        style={{ display: "none" }}
      />
    </>
  );
}

export default function HomeTab({ user, couple, questions, myAnswers, partnerAnswers, ansInputs, setAnsInputs, skippedQuestions, submitMy, skipQuestion, uploadQuestionPhoto }) {
  const visibleQuestions = questions.filter((q) => !skippedQuestions[q.promptKey]);
  const doneCount = questions.filter((q) => myAnswers[q.promptKey]).length;

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ textAlign: "center", color: "#444", fontSize: 12, marginBottom: 18 }}>
        {new Date().toLocaleDateString("vi-VN", { weekday: "long", day: "numeric", month: "long" })}
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "13px 15px", marginBottom: 14 }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Gói câu hỏi hôm nay</div>
        <div style={{ color: "#555", fontSize: 12, marginTop: 4 }}>Trả lời nhẹ thôi: 5 câu nhỏ mỗi ngày, bỏ qua câu nào không hợp mood.</div>
        <div style={{ color: "#ff6b9d", fontSize: 12, fontWeight: 800, marginTop: 8 }}>{doneCount}/{questions.length} câu đã trả lời</div>
      </div>

      {visibleQuestions.map((question, index) => {
        const myAnswer = myAnswers[question.promptKey];
        const partnerAnswer = partnerAnswers[question.promptKey];
        const bothDone = myAnswer && partnerAnswer;
        const needsPhoto = question.allowPhoto || question.tag === "📷" || question.vi.toLowerCase().includes("chụp");

        return (
          <div key={question.promptKey} style={{ background: "linear-gradient(135deg,rgba(255,107,157,0.09),rgba(167,139,250,0.08))", border: "1px solid rgba(255,107,157,0.18)", borderRadius: 18, padding: "16px 14px", marginBottom: 14, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -10, right: -8, fontSize: 52, opacity: 0.05 }}>{question.tag}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,107,157,0.12)", borderRadius: 99, padding: "3px 10px", fontSize: 11, color: "#ff6b9d", fontWeight: 700, marginBottom: 10 }}>
              {question.tag} Câu {index + 1}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.5, marginBottom: 5 }}>{question.vi}</div>
            <div style={{ fontSize: 12, color: "#444", fontStyle: "italic", marginBottom: 12 }}>{question.en}</div>

            {!myAnswer ? (
              <>
                <div style={{ color: "#555", fontSize: 13, marginBottom: 7, display: "flex", alignItems: "center", gap: 6 }}>
                  <Avatar src={user.avatar} name={user.name} size={18} />
                  <span>Câu trả lời của <strong style={{ color: "#60efff" }}>{user.name}</strong></span>
                </div>
                <textarea
                  value={ansInputs[question.promptKey] || ""}
                  onChange={(e) => setAnsInputs((items) => ({ ...items, [question.promptKey]: e.target.value }))}
                  placeholder={needsPhoto ? "Viết thêm vài chữ nếu muốn..." : "Viết câu trả lời của bạn..."}
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "12px 14px", color: "#fff", fontSize: 14, resize: "none", minHeight: needsPhoto ? 66 : 82, fontFamily: "inherit", display: "block" }}
                />
                {needsPhoto && <PhotoButton question={question} onUpload={uploadQuestionPhoto} />}
                <button onClick={() => submitMy(question)} style={{ ...BS("linear-gradient(135deg,#60efff,#a78bfa)"), marginTop: 10 }}>Gửi câu này</button>
                <button onClick={() => skipQuestion(question.promptKey)} style={{ background: "transparent", border: "none", color: "#555", fontSize: 12, cursor: "pointer", width: "100%", padding: "6px", fontFamily: "inherit" }}>Bỏ qua câu này</button>
              </>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <AnswerCard name={user.name} avatar={user.avatar} answer={myAnswer} color="#60efff" mini />
                {!partnerAnswer && <div style={{ color: "#555", fontSize: 12, textAlign: "center" }}>Đang chờ {couple.partnerName} trả lời câu này...</div>}
                {partnerAnswer && <AnswerCard name={couple.partnerName} answer={partnerAnswer} color="#ffd166" mini />}
                {bothDone && <div style={{ color: "#ff6b9d", fontSize: 12, fontWeight: 800, textAlign: "center" }}>Đã mở câu trả lời của cả hai</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
