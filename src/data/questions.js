export const QUESTIONS = [
  { vi: "Bây giờ bạn đang làm gì?", en: "What are you doing right now?", tag: "☕", allowPhoto: true },
  { vi: "Hôm nay bạn ăn gì ngon nhất?", en: "What was the best thing you ate today?", tag: "🍜" },
  { vi: "Chụp cho người ấy xem một góc nhỏ quanh bạn lúc này.", en: "Send a small photo of where you are right now.", tag: "📷", allowPhoto: true },
  { vi: "Hôm nay có điều gì làm bạn thấy hơi mệt không?", en: "Did anything make you feel tired today?", tag: "🫧" },
  { vi: "Bạn đang nhớ người ấy ở khoảnh khắc nào nhất hôm nay?", en: "When did you miss your partner most today?", tag: "💕" },
  { vi: "Nếu được gặp nhau 30 phút tối nay, bạn muốn làm gì?", en: "If you had 30 minutes together tonight, what would you do?", tag: "🌙" },
  { vi: "Khoảnh khắc nào trong ngày hôm nay khiến bạn mỉm cười?", en: "What moment today made you smile?", tag: "🌱" },
  { vi: "Một chuyện rất nhỏ hôm nay mà bạn muốn kể cho người ấy là gì?", en: "What tiny thing from today do you want to tell your partner?", tag: "💬" },
  { vi: "Bạn muốn người ấy ôm bạn kiểu nào ngay lúc này?", en: "What kind of hug do you want right now?", tag: "🫶" },
  { vi: "Điều gì ở đối phương mà bạn chưa bao giờ nói ra?", en: "What's something about your partner you've never said aloud?", tag: "✨" },
  { vi: "Kỷ niệm ngốc nghếch nhất của chúng ta là gì?", en: "What's our silliest memory together?", tag: "😂" },
  { vi: "5 năm nữa, bạn hình dung chúng ta đang ở đâu?", en: "Where do you see us in 5 years?", tag: "🔮" },
  { vi: "Bạn biết ơn điều gì nhất về nhau ngày hôm nay?", en: "What are you most grateful for about each other today?", tag: "🙏" },
];

export const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const getQuestionForDay = (offset = 0) => {
  const d = new Date();
  const seed = Math.floor(d.getTime() / 86400000) + offset;
  return QUESTIONS[((seed % QUESTIONS.length) + QUESTIONS.length) % QUESTIONS.length];
};

export const getTodayQ = () => getQuestionForDay(0);

export const getDailyQuestions = (count = 5) => {
  const d = new Date();
  const seed = Math.floor(d.getTime() / 86400000);
  return Array.from({ length: count }, (_, i) => {
    const index = (seed + i) % QUESTIONS.length;
    return { ...QUESTIONS[index], promptKey: `${getTodayKey()}#${index}` };
  });
};

export const bucketSuggestions = [
  "Xem hoàng hôn cùng nhau 🌅",
  "Học nấu một món mới 🍜",
  "Chụp ảnh 5 thành phố 📸",
  "Đọc cùng một cuốn sách 📚",
  "Đi picnic một ngày không dùng điện thoại 🧺",
  "Viết thư tay cho nhau 💌",
];
