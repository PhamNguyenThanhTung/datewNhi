import { useRef, useMemo, useState } from "react";
import Avatar from "../../../components/Avatar";
import AnswerCard from "../../../components/AnswerCard";

// ==========================================
// HÀM TÍNH CUNG HOÀNG ĐẠO (ZODIAC)
// ==========================================
const getZodiac = (dobString) => {
  if (!dobString) return { name: "Chưa rõ", icon: "✨" };
  const date = new Date(dobString);
  const d = date.getDate();
  const m = date.getMonth() + 1;

  if ((m == 1 && d <= 19) || (m == 12 && d >= 22)) return { name: "Ma Kết", icon: "♑" };
  if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return { name: "Bảo Bình", icon: "♒" };
  if ((m == 2 && d >= 19) || (m == 3 && d <= 20)) return { name: "Song Ngư", icon: "♓" };
  if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return { name: "Bạch Dương", icon: "♈" };
  if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return { name: "Kim Ngưu", icon: "♉" };
  if ((m == 5 && d >= 21) || (m == 6 && d <= 21)) return { name: "Song Tử", icon: "♊" };
  if ((m == 6 && d >= 22) || (m == 7 && d <= 22)) return { name: "Cự Giải", icon: "♋" };
  if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return { name: "Sư Tử", icon: "♌" };
  if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return { name: "Xử Nữ", icon: "♍" };
  if ((m == 9 && d >= 23) || (m == 10 && d <= 23)) return { name: "Thiên Bình", icon: "♎" };
  if ((m == 10 && d >= 24) || (m == 11 && d <= 21)) return { name: "Bọ Cạp", icon: "♏" };
  if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return { name: "Nhân Mã", icon: "♐" };
  
  return { name: "Bí ẩn", icon: "✨" };
};

// ==========================================
// CSS Animations & Slider Styles
// ==========================================
const styles = `
  @keyframes heartbeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.15); }
    28% { transform: scale(1); }
    42% { transform: scale(1.15); }
    70% { transform: scale(1); }
  }
  
  @keyframes glowPulse {
    0% { box-shadow: 0 0 20px rgba(255,107,157,0.2), inset 0 0 20px rgba(255,107,157,0.2); }
    50% { box-shadow: 0 0 40px rgba(255,107,157,0.5), inset 0 0 30px rgba(167,139,250,0.4); }
    100% { box-shadow: 0 0 20px rgba(255,107,157,0.2), inset 0 0 20px rgba(255,107,157,0.2); }
  }

  .swipe-container {
    display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scroll-behavior: smooth;
    gap: 16px; padding-bottom: 10px; -ms-overflow-style: none; scrollbar-width: none;
  }
  .swipe-container::-webkit-scrollbar { display: none; }
  .swipe-item { flex: 0 0 100%; scroll-snap-align: center; }
`;

function PhotoButton({ question, onUpload, disabled }) {
  const ref = useRef(null);
  return (
    <>
      <button onClick={() => ref.current?.click()} disabled={disabled} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px", color: "#aaa", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 8, transition: "all 0.2s" }}>
        <span style={{ fontSize: 16 }}>📸</span> Đính kèm ảnh / Chụp ngay
      </button>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files[0]; e.target.value = ""; if (f) onUpload(question, f); }} />
    </>
  );
}

export default function HomeTab({ user, couple, questions, myAnswers, partnerAnswers, ansInputs, setAnsInputs, skippedQuestions, submitMy, skipQuestion, uploadQuestionPhoto }) {
  
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleQuestions = useMemo(() => questions.filter((q) => !skippedQuestions[q.promptKey]), [questions, skippedQuestions]);
  const doneCount = questions.filter((q) => myAnswers[q.promptKey]).length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    setActiveIndex(Math.round(scrollRef.current.scrollLeft / (width + 16)));
  };

  const scrollTo = (index) => {
    if (!scrollRef.current || index < 0 || index >= visibleQuestions.length) return;
    scrollRef.current.scrollTo({ left: index * (scrollRef.current.offsetWidth + 16), behavior: 'smooth' });
  };

  // Logic Đếm Ngày 
  const anniversaryData = useMemo(() => {
    const startDateStr = couple.startDate || new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString();
    const start = new Date(startDateStr);
    const today = new Date();
    start.setHours(0,0,0,0); today.setHours(0,0,0,0);
    const diffDays = Math.ceil(Math.abs(today - start) / (1000 * 60 * 60 * 24));
    return { days: diffDays };
  }, [couple.startDate]);

  // Lấy Cung Hoàng Đạo
  const myZodiac = getZodiac(user?.dob); 
  // Chú ý: partnerDob cần được truyền vào từ coupleService sau khi update DB
  const ptZodiac = getZodiac(couple?.partnerDob);

  return (
    <div style={{ animation: "fadeUp 0.4s ease", paddingBottom: 20 }}>
      <style>{styles}</style>

      {/* 🔮 GIAO DIỆN "BEEN TOGETHER" KIỂU DARK MODE */}
      <div style={{ 
        display: "flex", flexDirection: "column", alignItems: "center", 
        padding: "20px 0 30px 0", marginBottom: 20,
        borderBottom: "1px dashed rgba(255,255,255,0.1)"
      }}>
        
        {/* Vòng tròn đếm ngày */}
        <div style={{
          width: 150, height: 150, borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(30,15,30,0.8), rgba(15,10,25,0.9))",
          border: "2px solid rgba(255,107,157,0.3)",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          animation: "glowPulse 3s infinite alternate",
          marginBottom: 24, position: "relative"
        }}>
          <div style={{ fontSize: 13, color: "#ff8da1", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
            Bên nhau
          </div>
          <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", lineHeight: 1.1, textShadow: "0 2px 15px rgba(255,107,157,0.6)" }}>
            {anniversaryData.days}
          </div>
          <div style={{ fontSize: 13, color: "#ff8da1", fontWeight: 700 }}>Ngày</div>
          
          {/* Tag kỷ niệm nhỏ gắn ở viền */}
          <div style={{
            position: "absolute", bottom: -12, background: "linear-gradient(135deg, #ff6b9d, #a78bfa)",
            color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 12px", borderRadius: 99,
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
          }}>
            Vẫn đang rực cháy 🔥
          </div>
        </div>

        {/* 2 Avatar và Trái tim ở giữa */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, width: "100%" }}>
          {/* Người dùng */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 80 }}>
            <Avatar src={user.avatar} name={user.name} size={60} />
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: 8, textAlign: "center" }}>
              {user.name}
            </div>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, marginTop: 2 }}>
              {myZodiac.icon} {myZodiac.name}
            </div>
          </div>

          {/* Trái tim nhịp đập */}
          <div style={{ fontSize: 32, animation: "heartbeat 1.5s infinite" }}>💖</div>

          {/* Người ấy */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 80 }}>
            <Avatar src={couple.partnerAvatar} name={couple.partnerName} size={60} />
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: 8, textAlign: "center" }}>
              {couple.partnerName}
            </div>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 600, marginTop: 2 }}>
              {ptZodiac.icon} {ptZodiac.name}
            </div>
          </div>
        </div>
      </div>

      {/* Gói câu hỏi hôm nay */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 16, padding: "16px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>Trò chuyện hôm nay</div>
          <div style={{ color: "#666", fontSize: 12, marginTop: 4 }}>Vuốt ngang để xem câu tiếp theo</div>
        </div>
        <div style={{ background: "rgba(255,107,157,0.1)", border: "1px solid rgba(255,107,157,0.3)", borderRadius: 99, padding: "6px 12px", color: "#ff6b9d", fontSize: 12, fontWeight: 800 }}>
          {doneCount}/{questions.length} Đã xong
        </div>
      </div>

      {/* VÙNG SWIPE */}
      <div ref={scrollRef} onScroll={handleScroll} className="swipe-container">
        {visibleQuestions.length === 0 && (
          <div style={{ width: "100%", textAlign: "center", color: "#666", padding: "40px 0", fontStyle: "italic" }}>Hôm nay hai bạn đã trả lời hết câu hỏi rồi! 🎉</div>
        )}

        {visibleQuestions.map((question, index) => {
          const myAnswer = myAnswers[question.promptKey];
          const partnerAnswer = partnerAnswers[question.promptKey];
          const bothDone = myAnswer && partnerAnswer;

          return (
            <div key={question.promptKey} className="swipe-item" style={{ background: "linear-gradient(145deg, rgba(30, 15, 30, 0.4) 0%, rgba(15, 10, 25, 0.6) 100%)", border: "1px solid rgba(255, 107, 157, 0.12)", borderRadius: 20, padding: "20px 16px", position: "relative", overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255, 107, 157, 0.15)", borderRadius: 99, padding: "4px 12px", fontSize: 11, color: "#ff8da1", fontWeight: 800, marginBottom: 14 }}>Câu {index + 1}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", lineHeight: 1.4, marginBottom: 6 }}>{question.vi}</div>
              <div style={{ fontSize: 12, color: "#555", fontStyle: "italic", marginBottom: 16 }}>{question.en}</div>

              {!myAnswer ? (
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <textarea value={ansInputs[question.promptKey] || ""} onChange={(e) => setAnsInputs((items) => ({ ...items, [question.promptKey]: e.target.value }))} placeholder="Viết câu trả lời của bạn..." style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px", color: "#fff", fontSize: 14, resize: "none", minHeight: 80, fontFamily: "inherit", display: "block", boxSizing: "border-box", outline: "none" }} />
                  <PhotoButton question={question} onUpload={uploadQuestionPhoto} />
                  <button onClick={() => { submitMy(question); if (index < visibleQuestions.length - 1) setTimeout(() => scrollTo(index + 1), 500); }} style={{ width: "100%", background: "linear-gradient(135deg, #8bc6ff 0%, #a78bfa 100%)", border: "none", borderRadius: 12, padding: "14px", color: "#fff", fontSize: 14, fontWeight: 800, marginTop: 14, cursor: "pointer" }}>Gửi câu này</button>
                  <button onClick={() => skipQuestion(question.promptKey)} style={{ background: "transparent", border: "none", color: "#555", fontSize: 12, cursor: "pointer", width: "100%", padding: "12px", fontFamily: "inherit", marginTop: 4, fontWeight: 600 }}>Bỏ qua câu này</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <AnswerCard name={user.name} avatar={user.avatar} answer={myAnswer} color="#60efff" mini />
                  {!partnerAnswer && <div style={{ color: "#555", fontSize: 12, textAlign: "center", padding: "10px 0", fontStyle: "italic" }}>Đang chờ {couple.partnerName} trả lời...</div>}
                  {partnerAnswer && <AnswerCard name={couple.partnerName} answer={partnerAnswer} color="#ffd166" mini />}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {visibleQuestions.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 16 }}>
          {visibleQuestions.map((_, idx) => (
            <div key={idx} onClick={() => scrollTo(idx)} style={{ width: activeIndex === idx ? 24 : 8, height: 8, borderRadius: 4, background: activeIndex === idx ? "linear-gradient(135deg, #8bc6ff 0%, #a78bfa 100%)" : "rgba(255,255,255,0.15)", transition: "all 0.3s ease", cursor: "pointer" }} />
          ))}
        </div>
      )}
    </div>
  );
}