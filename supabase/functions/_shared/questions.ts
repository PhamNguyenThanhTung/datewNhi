// supabase/functions/_shared/questions.ts
// Dữ liệu dùng chung cho Edge Function generate-daily-prompts
// Copy từ src/data/questions.js – không import React, không JSX

export const FREQUENCY_DAYS: Record<string, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  rare: 50
};

export const ALL_QUESTIONS = [
  {
    id: "warm_0",
    vi: "Nếu cuộc đời mình là một bộ phim, tên phim đó sẽ là gì?",
    en: "If your life were a movie, what would it be called?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_1",
    vi: "Bài hát nào đang bị kẹt trong đầu bạn nhiều nhất gần đây?",
    en: "What song is stuck in your head the most lately?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_2",
    vi: "Nếu được ăn một món mãi không chán, bạn chọn món gì?",
    en: "If you could eat one food forever without getting tired of it, what would it be?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_3",
    vi: "Emoji nào mô tả tâm trạng bạn hôm nay nhất?",
    en: "Which emoji best describes your mood today?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_4",
    vi: "Bạn thích cà phê hay trà? Tại sao?",
    en: "Coffee or tea? Why?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_5",
    vi: "Nếu được đặt tên lại cho bản thân, bạn sẽ chọn tên gì?",
    en: "If you could rename yourself, what name would you choose?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_6",
    vi: "Superpower bạn muốn có nhất là gì?",
    en: "What superpower would you most want to have?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_7",
    vi: "Kỷ niệm ngốc nghếch nhất mà giờ bạn có thể cười về nó là gì?",
    en: "What's the silliest memory that you can laugh about now?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_8",
    vi: "Bài hát karaoke ruột của bạn là gì?",
    en: "What's your go-to karaoke song?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_9",
    vi: "Nếu được sống ở một thành phố khác, bạn chọn đâu?",
    en: "If you could live in any other city, where would it be?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_10",
    vi: "Phim hoạt hình hồi nhỏ bạn mê nhất là phim gì?",
    en: "What was your favorite cartoon as a kid?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_11",
    vi: "Con vật nào mà bạn nghĩ phản ánh tính cách mình nhất?",
    en: "Which animal do you think best reflects your personality?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_12",
    vi: "Điều đầu tiên bạn làm khi thức dậy mỗi sáng là gì?",
    en: "What's the first thing you do every morning when you wake up?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_13",
    vi: "Nếu không phải làm công việc hiện tại, bạn muốn làm gì?",
    en: "If you weren't doing your current job, what would you want to do?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_14",
    vi: "Điều gì khiến bạn cười to nhất trong tuần này?",
    en: "What made you laugh the hardest this week?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_15",
    vi: "Nếu được đi du lịch ngay hôm nay, bạn muốn đến đâu?",
    en: "If you could travel somewhere right now, where would you go?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_16",
    vi: "Bạn thích sáng sớm hay đêm khuya?",
    en: "Are you more of a morning person or a night owl?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_17",
    vi: "Thứ đầu tiên bạn nhận ra ở một người lạ là gì?",
    en: "What's the first thing you notice about a stranger?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_18",
    vi: "Nếu là một loại thời tiết, bạn sẽ là loại nào?",
    en: "If you were a type of weather, what would you be?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_19",
    vi: "Nếu bạn mở một quán, bạn sẽ mở quán gì?",
    en: "If you opened a shop, what kind would it be?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_20",
    vi: "Buổi sáng lý tưởng nhất của bạn sẽ trông như thế nào?",
    en: "What would your perfect morning look like?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_21",
    vi: "Bạn có thói quen gì trước khi ngủ không?",
    en: "Do you have any bedtime routines?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_22",
    vi: "Món ăn nào nhắc bạn nhớ đến tuổi thơ nhất?",
    en: "What food most reminds you of your childhood?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_23",
    vi: "Bạn thích nhận tin nhắn ngắn hay cuộc gọi dài?",
    en: "Do you prefer short texts or long phone calls?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_24",
    vi: "Có món ăn nào bạn không bao giờ chán không?",
    en: "Is there a food you could never get tired of?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_25",
    vi: "Bạn thích mặc đồ thoải mái hay thời trang khi ở nhà?",
    en: "Do you prefer comfy clothes or stylish clothes at home?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_26",
    vi: "Khi bạn không biết xem gì, bạn thường xem lại phim gì?",
    en: "When you don't know what to watch, what do you rewatch?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_27",
    vi: "Bạn có xu hướng lưu hay xóa ảnh trên điện thoại?",
    en: "Are you a photo hoarder or a photo deleter?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_28",
    vi: "Sở thích bí mật nào của bạn mà ít người biết?",
    en: "What secret hobby do you have that few people know about?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_29",
    vi: "Bạn thích nhận hoa hay quà thực tế hơn?",
    en: "Would you rather receive flowers or practical gifts?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_30",
    vi: "Tiếng ồn nào khiến bạn thấy bình yên? (mưa, sóng biển, tiếng quạt...)",
    en: "What sound makes you feel peaceful? (rain, waves, fan...)",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_31",
    vi: "Bạn hay đặt báo thức mấy lần trước khi thực sự dậy?",
    en: "How many alarms do you set before actually getting up?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_32",
    vi: "Phim nào bạn đã xem hơn 3 lần?",
    en: "What movie have you watched more than 3 times?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_33",
    vi: "Khi cần thư giãn nhanh, bạn làm gì trong 10 phút?",
    en: "When you need to relax quickly, what do you do in 10 minutes?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_34",
    vi: "Bạn thích ăn ngọt hay mặn hơn?",
    en: "Sweet or savory — which do you prefer?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_35",
    vi: "Bạn có bao giờ đọc cuối sách trước rồi mới đọc từ đầu không?",
    en: "Do you ever read the ending of a book before reading from the beginning?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_36",
    vi: "Thứ cuối tuần lý tưởng của bạn có gì?",
    en: "What does your ideal weekend look like?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_37",
    vi: "Bạn có hay quên tên người mới gặp không?",
    en: "Do you often forget the names of people you just met?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_38",
    vi: "Nếu được tặng 1 triệu ngay lúc này, điều đầu tiên bạn làm là gì?",
    en: "If given 1 million VND right now, what's the first thing you'd do?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_39",
    vi: "Bạn thích xem phim có phụ đề hay lồng tiếng?",
    en: "Do you prefer subtitles or dubbed films?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_40",
    vi: "Bạn hay mang theo gì trong túi/ví mà người khác thấy kỳ lạ?",
    en: "What do you carry in your bag/wallet that others might find odd?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_41",
    vi: "Nếu cuộc đời bạn là một thể loại nhạc, đó là thể loại gì?",
    en: "If your life were a music genre, what would it be?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_42",
    vi: "Bạn thích không khí sinh nhật hay Tết hơn?",
    en: "Do you prefer birthday vibes or Tết vibes?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_43",
    vi: "Điều gì làm bạn mỉm cười mỗi khi nghĩ đến?",
    en: "What always makes you smile when you think about it?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_44",
    vi: "Bạn có hay nói chuyện với bản thân khi một mình không?",
    en: "Do you talk to yourself when you're alone?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_45",
    vi: "Bạn thích bắt đầu một ngày với âm nhạc hay yên tĩnh?",
    en: "Do you prefer starting your day with music or silence?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_46",
    vi: "Màu sắc nào bạn không bao giờ mặc và tại sao?",
    en: "What color do you never wear and why?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_47",
    vi: "Điều gì bạn muốn học được ngay ngày mai nếu có thể là gì?",
    en: "What would you want to learn instantly if you could?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_48",
    vi: "Bạn thích biển hay núi?",
    en: "Do you prefer the beach or the mountains?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_49",
    vi: "Khi gặp chuyện buồn, bạn hay tìm đến ai?",
    en: "When something bad happens, who do you turn to?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_50",
    vi: "Bạn nghĩ mình hướng nội hay hướng ngoại?",
    en: "Do you think you're more introverted or extroverted?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_51",
    vi: "Bạn có thể không dùng điện thoại một ngày không?",
    en: "Could you go a day without your phone?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_52",
    vi: "Câu chuyện cười ruột của bạn là gì?",
    en: "What's your go-to joke?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "warm_53",
    vi: "Kỷ niệm ăn uống vui nhất của bạn là gì?",
    en: "What's your funniest food memory?",
    categoryId: "warm",
    categoryLabel: "Nhẹ nhàng",
    emoji: "🌱",
    color: "#f5a623",
    frequency: "monthly"
  },
  {
    id: "deep_0",
    vi: "Khoảnh khắc nào trong cuộc đời khiến bạn thay đổi hoàn toàn?",
    en: "What moment in your life completely changed you?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_1",
    vi: "Nỗi sợ lớn nhất của bạn mà ít ai biết là gì?",
    en: "What's your biggest fear that few people know about?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_2",
    vi: "Điều gì bạn ước mình đã biết sớm hơn?",
    en: "What's something you wish you had known sooner?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_3",
    vi: "Thành tựu nào bạn tự hào nhất trong cuộc đời?",
    en: "What achievement are you most proud of in your life?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_4",
    vi: "Nếu biết mình chỉ còn 1 năm để sống, bạn sẽ làm gì khác đi?",
    en: "If you knew you only had one year left, what would you do differently?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_5",
    vi: "Điều gì bạn vẫn còn nuối tiếc?",
    en: "What do you still regret?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_6",
    vi: "Bạn định nghĩa 'hạnh phúc' như thế nào?",
    en: "How do you define happiness?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_7",
    vi: "Điều gì khiến bạn cảm thấy cô đơn nhất, kể cả khi ở cạnh người khác?",
    en: "What makes you feel most lonely, even when surrounded by people?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_8",
    vi: "Kỷ niệm nào của tuổi thơ ảnh hưởng nhiều nhất tới bạn?",
    en: "What childhood memory influenced you the most?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_9",
    vi: "Điều bạn muốn người khác nhớ về mình sau khi bạn không còn nữa?",
    en: "What do you want people to remember about you after you're gone?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_10",
    vi: "Điều gì ở bản thân bạn đang cố thay đổi?",
    en: "What about yourself are you trying to change?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_11",
    vi: "Giá trị sống quan trọng nhất với bạn là gì?",
    en: "What's the most important value in your life?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_12",
    vi: "Bạn đã từng mất đi điều gì mà không bao giờ lấy lại được?",
    en: "Have you ever lost something you could never get back?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_13",
    vi: "Điều gì khiến bạn cảm thấy thật sự sống?",
    en: "What makes you feel truly alive?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_14",
    vi: "Lần cuối bạn khóc là khi nào và vì sao?",
    en: "When was the last time you cried and why?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_15",
    vi: "Điều gì bạn ước mình dũng cảm hơn để làm?",
    en: "What do you wish you were braver about doing?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_16",
    vi: "Câu nói hay bài học nào theo bạn suốt cuộc đời?",
    en: "What quote or lesson has stayed with you throughout your life?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_17",
    vi: "Nếu có thể thay đổi một điều về cách bạn được nuôi dạy, đó là gì?",
    en: "If you could change one thing about how you were raised, what would it be?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_18",
    vi: "Điều gì bạn sẽ làm ngay nếu biết chắc mình sẽ không thất bại?",
    en: "What would you do right now if you knew you couldn't fail?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_19",
    vi: "Ai là người đã tin tưởng bạn hơn bạn tin tưởng chính mình?",
    en: "Who has believed in you more than you believed in yourself?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_20",
    vi: "Điều gì trong cuộc sống khiến bạn cảm thấy ý nghĩa nhất?",
    en: "What in life gives you the most meaning?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_21",
    vi: "Bạn đã từng phải đưa ra một quyết định khó khăn mà không có ai giúp chưa?",
    en: "Have you ever had to make a hard decision without anyone to help?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_22",
    vi: "Điều gì bạn ước mình đã dũng cảm hơn để từ bỏ sớm hơn?",
    en: "What do you wish you had been brave enough to let go of sooner?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_23",
    vi: "Bạn có sợ trở thành người bình thường không?",
    en: "Are you afraid of becoming ordinary?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_24",
    vi: "Khi nào bạn cảm thấy thế giới này không công bằng?",
    en: "When do you feel the world is most unfair?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_25",
    vi: "Bạn có bao giờ cảm thấy mình đang sống sai mục tiêu không?",
    en: "Have you ever felt you were living for the wrong purpose?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_26",
    vi: "Bạn học được điều gì quan trọng nhất từ thất bại?",
    en: "What's the most important thing you've learned from failure?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_27",
    vi: "Điều gì bạn sẽ không bao giờ nói với bố/mẹ?",
    en: "What would you never tell your parents?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_28",
    vi: "Điều gì khiến bạn cảm thấy nhỏ bé trước vũ trụ?",
    en: "What makes you feel small in front of the universe?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_29",
    vi: "Bạn đã từng mất đi một phần của bản thân mà không bao giờ lấy lại được?",
    en: "Have you ever lost a part of yourself you could never get back?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_30",
    vi: "Lời khuyên nào bạn nhận được nhưng lúc đó không chịu nghe, sau này mới hiểu?",
    en: "What advice were you given that you didn't listen to at the time but later understood?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_31",
    vi: "Điều gì bạn cảm thấy mình chưa bao giờ thực sự hiểu về bản thân?",
    en: "What about yourself do you feel you've never truly understood?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_32",
    vi: "Bạn xử lý sự cô đơn như thế nào?",
    en: "How do you deal with loneliness?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_33",
    vi: "Điều gì bạn đã hy sinh mà không ai biết?",
    en: "What have you sacrificed that no one knows about?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_34",
    vi: "Nếu bạn có thể xóa một ký ức, bạn xóa ký ức nào?",
    en: "If you could erase one memory, which would it be?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_35",
    vi: "Điều gì bạn còn nợ chính mình?",
    en: "What do you still owe yourself?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_36",
    vi: "Bạn có bao giờ cảm thấy mình đang diễn một vai không phải mình?",
    en: "Have you ever felt like you were playing a role that wasn't really you?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_37",
    vi: "Khoảnh khắc nào trong cuộc đời bạn cảm thấy chậm lại và muốn giữ mãi?",
    en: "What moment in life made you want to slow down and hold onto forever?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_38",
    vi: "Điều gì bạn đã phải chấp nhận dù không muốn?",
    en: "What have you had to accept even though you didn't want to?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_39",
    vi: "Điều gì bạn tự hứa với mình lúc còn nhỏ mà bạn vẫn chưa làm được?",
    en: "What promise did you make to your younger self that you haven't kept?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_40",
    vi: "Khoảnh khắc nào bạn cảm thấy mình thực sự trưởng thành?",
    en: "What moment made you feel truly grown up?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_41",
    vi: "Điều gì bạn thường nói 'không sao' nhưng thực ra rất đau?",
    en: "What do you often say 'it's fine' about but it actually hurts a lot?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_42",
    vi: "Bạn nghĩ điều gì làm cho một cuộc đời có ý nghĩa?",
    en: "What do you think makes a life meaningful?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_43",
    vi: "Nếu bạn có thể trò chuyện với phiên bản 80 tuổi của mình, bạn muốn hỏi gì?",
    en: "If you could talk to your 80-year-old self, what would you ask?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_44",
    vi: "Điều gì bạn sợ mất nhất trong cuộc đời này?",
    en: "What are you most afraid of losing in this life?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_45",
    vi: "Bạn đã từng tha thứ cho ai mà thực sự khó khăn chưa?",
    en: "Have you ever forgiven someone and it was truly difficult?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_46",
    vi: "Điều gì bạn muốn người thân nhất của mình biết nhưng chưa bao giờ nói?",
    en: "What do you want your closest people to know but have never said?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_47",
    vi: "Khi nào bạn cảm thấy mình đang thực sự sống, không chỉ tồn tại?",
    en: "When do you feel truly alive, not just existing?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_48",
    vi: "Điều gì về bản thân bạn vẫn đang cố hiểu?",
    en: "What about yourself are you still trying to understand?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_49",
    vi: "Bạn có bao giờ cảm thấy bị hiểu nhầm bởi người thân không?",
    en: "Have you ever felt misunderstood by your loved ones?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_50",
    vi: "Điều gì bạn cần được nghe nhất lúc này?",
    en: "What do you most need to hear right now?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_51",
    vi: "Nếu được gặp mặt một người đã mất, bạn muốn gặp ai?",
    en: "If you could meet someone who has passed away, who would it be?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_52",
    vi: "Người trong cuộc đời bạn mà bạn cần nói 'cảm ơn' nhiều hơn là ai?",
    en: "Who in your life do you need to thank more?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_53",
    vi: "Khi nào bạn cảm thấy cô đơn nhất?",
    en: "When do you feel most lonely?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_54",
    vi: "Điều gì bạn muốn tha thứ cho bản thân mình?",
    en: "What do you want to forgive yourself for?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "deep_55",
    vi: "Điều gì bạn đã phải học cách chấp nhận dù khó khăn?",
    en: "What have you had to learn to accept despite it being difficult?",
    categoryId: "deep",
    categoryLabel: "Sâu sắc",
    emoji: "🌊",
    color: "#4a90d9",
    frequency: "rare"
  },
  {
    id: "couple_0",
    vi: "Khoảnh khắc nào khiến bạn nhận ra mình đang yêu?",
    en: "What moment made you realize you were in love?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_1",
    vi: "Điều gì ở đối phương khiến bạn thích nhất mà chưa bao giờ nói?",
    en: "What do you love most about your partner that you've never told them?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_2",
    vi: "Love language của bạn là gì? Bạn muốn được yêu theo cách nào?",
    en: "What's your love language? How do you most like to be loved?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_3",
    vi: "Kỷ niệm nào của chúng ta mà bạn nhớ nhất?",
    en: "What's your favorite memory of us together?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_4",
    vi: "Nếu một ngày cảm thấy tình cảm nhạt đi, bạn sẽ chọn nói ra hay giữ trong lòng?",
    en: "If you ever felt our feelings fading, would you speak up or keep it inside?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_5",
    vi: "Điều gì bạn muốn mình làm tốt hơn trong mối quan hệ này?",
    en: "What do you wish you did better in this relationship?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_6",
    vi: "Khi cãi nhau, điều gì khiến bạn khó chịu nhất ở bản thân?",
    en: "When we argue, what bothers you most about yourself?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_7",
    vi: "Bạn muốn chúng ta làm gì nhiều hơn trong tương lai?",
    en: "What would you like us to do more of in the future?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_8",
    vi: "Điều gì về mối quan hệ này khiến bạn cảm thấy biết ơn nhất?",
    en: "What about this relationship are you most grateful for?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_9",
    vi: "Nếu phải mô tả tình yêu của chúng ta bằng một màu sắc, đó là màu gì?",
    en: "If you had to describe our love with a color, what would it be?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_10",
    vi: "Bạn thấy mình thay đổi như thế nào kể từ khi có mối quan hệ này?",
    en: "How do you think you've changed since we've been together?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_11",
    vi: "Điều gì ở tôi khiến bạn vẫn chọn ở lại đến hôm nay?",
    en: "What about me makes you choose to stay?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_12",
    vi: "Khi bạn thấy mệt mỏi hoặc stress, bạn muốn tôi làm gì?",
    en: "When you're tired or stressed, what do you need from me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_13",
    vi: "5 năm nữa, bạn hình dung chúng ta đang ở đâu?",
    en: "Where do you see us in 5 years?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_14",
    vi: "Điều gì bạn muốn tôi hiểu về bạn hơn?",
    en: "What do you wish I understood better about you?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_15",
    vi: "Khoảnh khắc nào bạn cảm thấy chúng ta gần nhau nhất?",
    en: "When do you feel closest to me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_16",
    vi: "Có điều gì bạn muốn xin lỗi tôi mà chưa nói?",
    en: "Is there something you want to apologize to me for that you haven't said yet?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_17",
    vi: "Một điều nhỏ nhoi nào của tôi khiến bạn mỉm cười?",
    en: "What's one small thing I do that makes you smile?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_18",
    vi: "Điều gì trong mối quan hệ này bạn vẫn chưa hoàn toàn thoải mái chia sẻ?",
    en: "What's something in our relationship you still don't feel fully comfortable sharing?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_19",
    vi: "Nếu phải viết một lá thư gửi cho tôi trong tương lai, bạn sẽ viết gì?",
    en: "If you had to write me a letter to read in the future, what would it say?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_20",
    vi: "Lần đầu tiên bạn nhìn thấy tôi, bạn nghĩ gì?",
    en: "What did you think when you first saw me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_21",
    vi: "Điều gì về tôi khiến bạn vẫn còn bất ngờ sau tất cả thời gian này?",
    en: "What about me still surprises you after all this time?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_22",
    vi: "Lần cãi nhau nào mà sau này bạn cười về nó?",
    en: "What fight have we had that you later laughed about?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_23",
    vi: "Bạn muốn chúng ta có truyền thống riêng nào?",
    en: "What traditions do you want us to have together?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_24",
    vi: "Điều gì bạn học được từ tôi mà bạn không ngờ?",
    en: "What have you learned from me that you didn't expect?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_25",
    vi: "Khi nào bạn thấy tôi đẹp/đáng yêu nhất?",
    en: "When do you find me most beautiful/adorable?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_26",
    vi: "Bạn muốn chúng ta đi du lịch ở đâu nhất?",
    en: "Where do you most want us to travel together?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_27",
    vi: "Điều gì bạn ước mình đã làm khác đi ở đầu mối quan hệ này?",
    en: "What do you wish you had done differently at the beginning of our relationship?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_28",
    vi: "Khi tôi buồn, điều gì bạn muốn làm nhất cho tôi?",
    en: "When I'm sad, what do you most want to do for me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_29",
    vi: "Bạn nghĩ mình và tôi giống nhau điều gì nhất?",
    en: "What do you think we have most in common?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_30",
    vi: "Có bao giờ bạn nhìn tôi và nghĩ 'mình may mắn quá' không?",
    en: "Have you ever looked at me and thought 'I'm so lucky'?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_31",
    vi: "Điều gì bạn muốn tôi hiểu khi bạn im lặng?",
    en: "What do you want me to understand when you're quiet?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_32",
    vi: "Bạn muốn chúng ta cùng học điều gì?",
    en: "What do you want us to learn together?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_33",
    vi: "Điều gì bạn thường nghĩ nhưng ngại nói với tôi?",
    en: "What do you often think but hesitate to tell me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_34",
    vi: "Khi bạn nhớ tôi, thứ đầu tiên bạn nghĩ đến là gì?",
    en: "When you miss me, what's the first thing that comes to mind?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_35",
    vi: "Bạn muốn buổi hẹn hò lý tưởng của chúng ta như thế nào?",
    en: "What would our ideal date look like?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_36",
    vi: "Lần nào bạn cảm thấy tôi thực sự ở bên bạn?",
    en: "When have you felt I was truly there for you?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_37",
    vi: "Bạn mô tả tình cảm của chúng ta với người lạ như thế nào?",
    en: "How would you describe our relationship to a stranger?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_38",
    vi: "Điều gì về tương lai chung của chúng ta bạn hào hứng nhất?",
    en: "What about our shared future excites you most?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_39",
    vi: "Bạn có bao giờ ghen tuông không? Cảm giác đó như thế nào với bạn?",
    en: "Have you ever been jealous? What does that feel like for you?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_40",
    vi: "Khi nào bạn cảm thấy được yêu thương nhất từ phía tôi?",
    en: "When do you feel most loved by me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_41",
    vi: "Bạn nghĩ mối quan hệ chúng ta có điểm đặc biệt gì?",
    en: "What do you think is special about our relationship?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_42",
    vi: "Điều gì bạn sẽ giữ mãi về tôi dù chuyện gì xảy ra?",
    en: "What will you always keep about me no matter what?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_43",
    vi: "Điều gì bạn cảm ơn tôi nhiều nhất?",
    en: "What are you most thankful to me for?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_44",
    vi: "Khi tôi không ở đây, bạn nhớ điều gì nhất?",
    en: "When I'm not around, what do you miss most?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_45",
    vi: "Bạn muốn tôi nhìn nhận bạn như thế nào?",
    en: "How do you want me to see you?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_46",
    vi: "Lần nào tôi khiến bạn ngạc nhiên theo cách đẹp nhất?",
    en: "When have I surprised you in the most wonderful way?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_47",
    vi: "Bạn có muốn chúng ta có một bài hát riêng không? Nếu có, là bài nào?",
    en: "Do you want us to have our own song? If so, which one?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_48",
    vi: "Điều gì bạn sợ nhất trong mối quan hệ này?",
    en: "What are you most afraid of in this relationship?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_49",
    vi: "Khi nhìn vào mắt tôi, bạn thấy gì?",
    en: "When you look into my eyes, what do you see?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_50",
    vi: "Bạn nghĩ chúng ta sẽ già đi cùng nhau như thế nào?",
    en: "How do you imagine us growing old together?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_51",
    vi: "Khi tôi mệt mỏi, bạn muốn làm gì cho tôi nhất?",
    en: "When I'm exhausted, what do you most want to do for me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_52",
    vi: "Bạn có nghĩ chúng ta phù hợp nhau không? Tại sao?",
    en: "Do you think we're a good match? Why?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_53",
    vi: "Điều bạn muốn con cái chúng ta (nếu có) thấy ở bố/mẹ là gì?",
    en: "What do you want our children (if any) to see in their parents?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_54",
    vi: "Nếu phải viết một câu mô tả tình yêu của chúng ta, câu đó là gì?",
    en: "If you had to describe our love in one sentence, what would it be?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_55",
    vi: "Bạn có cảm giác khi ở bên tôi như thế nào?",
    en: "What feeling do you have when you're with me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_56",
    vi: "Điều nào về tôi khiến bạn cảm thấy an toàn?",
    en: "What about me makes you feel safe?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_57",
    vi: "Bạn muốn chúng ta giải quyết mâu thuẫn tốt hơn theo cách nào?",
    en: "How do you want us to handle conflicts better?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_58",
    vi: "Nếu có thể sống lại ngày chúng ta gặp nhau, bạn sẽ thay đổi gì?",
    en: "If you could relive the day we met, what would you change?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_59",
    vi: "Điều gì bạn muốn chúng ta làm ít đi?",
    en: "What do you want us to do less of?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_60",
    vi: "Điều gì bạn muốn thay đổi ở bản thân vì tôi?",
    en: "What would you change about yourself for me?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_61",
    vi: "Bạn thích ngồi im với nhau hay nói chuyện không ngừng?",
    en: "Do you prefer sitting quietly together or talking non-stop?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_62",
    vi: "Điều gì về tôi mà bạn nghĩ thế giới nên biết?",
    en: "What about me do you think the world should know?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_63",
    vi: "Bạn muốn tôi làm gì khi bạn đang tức giận?",
    en: "What do you want me to do when you're angry?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_64",
    vi: "Nếu có thể tặng cho tôi bất cứ điều gì, bạn tặng gì?",
    en: "If you could give me anything, what would you give?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "couple_65",
    vi: "Câu nói nào của tôi bạn sẽ nhớ mãi?",
    en: "What's something I said that you'll always remember?",
    categoryId: "couple",
    categoryLabel: "Tình yêu",
    emoji: "💕",
    color: "#e05c7c",
    frequency: "rare"
  },
  {
    id: "funny_0",
    vi: "Nếu em là con gián thì anh có yêu em không?",
    en: "If I were a cockroach, would you still love me?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_1",
    vi: "Nếu chúng ta là hai nhân vật trong phim hoạt hình, chúng ta là ai?",
    en: "If we were cartoon characters, which two would we be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_2",
    vi: "Điều kỳ quặc nhất bạn làm khi không có ai nhìn là gì?",
    en: "What's the weirdest thing you do when no one is watching?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_3",
    vi: "Bạn có bao giờ nói chuyện với thú cưng (hoặc đồ vật) không?",
    en: "Have you ever talked to a pet or an inanimate object? What did you say?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_4",
    vi: "Nếu cuộc đời bạn có nhạc nền, bài gì sẽ phát lúc này?",
    en: "If your life had a soundtrack right now, what song would be playing?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_5",
    vi: "Kỹ năng vô dụng nhất bạn có là gì?",
    en: "What's the most useless skill you have?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_6",
    vi: "Điều ngốc nghếch nhất bạn từng tin hồi còn nhỏ là gì?",
    en: "What's the most ridiculous thing you believed as a kid?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_7",
    vi: "Nếu được chọn một vũ khí trong zombie apocalypse, bạn chọn gì?",
    en: "If you had to pick one weapon in a zombie apocalypse, what would it be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_8",
    vi: "Nếu chúng ta bị kẹt trong thang máy 3 tiếng, bạn sẽ làm gì?",
    en: "If we were stuck in an elevator for 3 hours, what would you do?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_9",
    vi: "Bạn từng làm điều gì xấu hổ mà vẫn chưa kể ai?",
    en: "What's something embarrassing you did that you've never told anyone?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_10",
    vi: "Nếu gia đình bạn là một loại đồ ăn, đó là món gì?",
    en: "If your family were a type of food, what would they be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_11",
    vi: "Tật xấu buồn cười nhất của bạn là gì?",
    en: "What's your funniest bad habit?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_12",
    vi: "Câu chuyện bịa đặt nhất bạn từng kể mà người khác tin là gì?",
    en: "What's the most ridiculous lie you told that someone actually believed?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_13",
    vi: "Bạn nghĩ mình trong mắt người lạ trông như người thế nào?",
    en: "What do you think you look like to strangers at first glance?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_14",
    vi: "Nếu AI viết tiểu thuyết về cuộc đời bạn, tựa đề sẽ là gì?",
    en: "If AI wrote a novel about your life, what would the title be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_15",
    vi: "Bạn bao giờ ngủ quên trên xe và dậy không biết mình đang ở đâu chưa?",
    en: "Have you ever fallen asleep on a vehicle and woken up not knowing where you were?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_16",
    vi: "Nếu ai đó đọc lịch sử tìm kiếm Google của bạn, họ sẽ nghĩ gì?",
    en: "If someone read your Google search history, what would they think?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_17",
    vi: "Bạn đã bao giờ gửi nhầm tin nhắn chưa? Chuyện gì xảy ra?",
    en: "Have you ever sent a text to the wrong person? What happened?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_18",
    vi: "Nếu bạn là một món ăn đặc biệt của Việt Nam, bạn là món gì?",
    en: "If you were a Vietnamese specialty dish, what would you be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_19",
    vi: "Bạn đã bao giờ thử nấu ăn và thất bại thảm hại chưa? Kể đi!",
    en: "Have you ever tried cooking and failed miserably? Tell me!",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_20",
    vi: "Nếu bạn có thể swap cuộc đời với một nhân vật phim hoạt hình, bạn chọn ai?",
    en: "If you could swap lives with a cartoon character, who would you choose?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_21",
    vi: "Điều buồn cười nhất xảy ra với bạn tuần này là gì?",
    en: "What's the funniest thing that happened to you this week?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_22",
    vi: "Bạn có talent bí mật không? (dù vô dụng cũng được!)",
    en: "Do you have a secret talent? (even if useless!)",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_23",
    vi: "Bạn đã từng bị bắt gặp đang hát một mình chưa?",
    en: "Have you ever been caught singing alone?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_24",
    vi: "Nếu nhà bạn bị ma ám, bạn sẽ làm gì đầu tiên?",
    en: "If your house were haunted, what would you do first?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_25",
    vi: "Thứ kỳ lạ nhất bạn đã mua mà không biết tại sao là gì?",
    en: "What's the strangest thing you've bought without knowing why?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_26",
    vi: "Nếu bạn là một loại côn trùng, bạn sẽ là gì và tại sao?",
    en: "If you were an insect, what would you be and why?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_27",
    vi: "Cái tên biệt danh ngốc nghếch nhất bạn có là gì?",
    en: "What's the most ridiculous nickname you've had?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_28",
    vi: "Bạn có thể sống sót trong một ngôi nhà không có wifi không?",
    en: "Could you survive in a house with no wifi?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_29",
    vi: "Thói quen ăn uống kỳ lạ nhất của bạn là gì?",
    en: "What's your weirdest eating habit?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_30",
    vi: "Bạn đã bao giờ nói lảm nhảm trong khi ngủ chưa? Nói gì?",
    en: "Have you ever talked in your sleep? What did you say?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_31",
    vi: "Nếu bạn là thám tử, tên thám tử của bạn là gì?",
    en: "If you were a detective, what would your detective name be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_32",
    vi: "Điều ngốc nghếch nhất bạn đã googled trong đêm khuya là gì?",
    en: "What's the most ridiculous thing you've Googled late at night?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_33",
    vi: "Nếu cả gia đình bạn là một ban nhạc, ai đóng vai gì?",
    en: "If your whole family were a band, who would play what role?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_34",
    vi: "Bạn có thể ăn bao nhiêu bánh mì liên tiếp nếu không bị phán xét?",
    en: "How many bánh mì could you eat in a row if no one judged you?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_35",
    vi: "Tình huống awkward nhất bạn từng gặp khi hẹn hò là gì?",
    en: "What's the most awkward situation you've encountered on a date?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_36",
    vi: "Nếu bạn có thể dạy thú cưng làm một việc, bạn dạy gì?",
    en: "If you could teach a pet to do one thing, what would it be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_37",
    vi: "Điều gì bạn đã bao giờ nói với gương mà bạn không dám nói với người khác?",
    en: "What have you said to a mirror that you wouldn't say to another person?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_38",
    vi: "Nếu bạn là superhero nhưng có superpower vô dụng, đó là gì?",
    en: "If you were a superhero with a useless superpower, what would it be?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "funny_39",
    vi: "Bạn có thể mô tả bản thân bằng ba từ mà mẹ bạn dùng không?",
    en: "Could you describe yourself using three words your mom would use?",
    categoryId: "funny",
    categoryLabel: "Vô tri",
    emoji: "😂",
    color: "#7ed321",
    frequency: "weekly"
  },
  {
    id: "future_0",
    vi: "3 điều bạn muốn thực hiện được trước tuổi 30/40 là gì?",
    en: "What are 3 things you want to accomplish before you turn 30/40?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_1",
    vi: "Nếu tiền không phải vấn đề, bạn sẽ làm gì mỗi ngày?",
    en: "If money were no object, what would you do every day?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_2",
    vi: "Bạn muốn học điều gì mà chưa bao giờ có thời gian?",
    en: "What's something you've always wanted to learn but never had time for?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_3",
    vi: "Nơi nào trên thế giới bạn nhất định phải đến một lần?",
    en: "What's one place in the world you absolutely must visit?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_4",
    vi: "Nếu có thể thay đổi một điều trong thế giới, bạn thay đổi gì?",
    en: "If you could change one thing about the world, what would it be?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_5",
    vi: "Ước mơ lớn nhất mà bạn vẫn chưa dám nói to với ai?",
    en: "What's your biggest dream that you haven't dared to say out loud?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_6",
    vi: "Bạn hình dung ngôi nhà mơ ước của mình trông như thế nào?",
    en: "What does your dream home look like?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_7",
    vi: "Điều gì trên bucket list chung mà bạn muốn chúng ta làm nhất?",
    en: "What's on our shared bucket list that you most want us to do?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_8",
    vi: "Nếu bạn có thể trở lại tuổi 18 và chọn một con đường khác, đó là gì?",
    en: "If you could go back to 18 and choose a different path, what would it be?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_9",
    vi: "Phiên bản tốt nhất của bản thân trong tương lai trông như thế nào?",
    en: "What does the best version of your future self look like?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_10",
    vi: "Bạn muốn con cái (nếu có) kế thừa điều gì nhất từ bạn?",
    en: "What do you most want to pass on to your children (if any)?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_11",
    vi: "Điều gì bạn muốn nhìn lại và nói 'mình đã làm được' sau 10 năm?",
    en: "What do you want to look back on in 10 years and say 'I did it'?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_12",
    vi: "Bạn muốn để lại di sản gì cho đời?",
    en: "What legacy do you want to leave behind?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_13",
    vi: "Nếu được sống một cuộc đời hoàn toàn khác, bạn sẽ chọn cuộc đời nào?",
    en: "If you could live a completely different life, what would it be?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_14",
    vi: "Kỹ năng nào bạn muốn học để hỗ trợ mối quan hệ của chúng ta?",
    en: "What skill do you want to learn to better support our relationship?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_15",
    vi: "Bạn hình dung buổi sáng lý tưởng khi về già sẽ như thế nào?",
    en: "What does your ideal morning in old age look like?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_16",
    vi: "Nghề nghiệp nào bạn thầm mong muốn dù biết khó thực hiện?",
    en: "What career do you secretly wish for even if it's hard to achieve?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_17",
    vi: "Bạn muốn mình nổi tiếng vì điều gì?",
    en: "What would you want to be known for?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_18",
    vi: "Điều gì bạn chắc chắn sẽ làm trong năm tới?",
    en: "What are you certain you'll do in the next year?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_19",
    vi: "Nếu bạn có thể tạo ra một sản phẩm, đó là sản phẩm gì?",
    en: "If you could create any product, what would it be?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_20",
    vi: "Bạn muốn học thêm ngôn ngữ nào và tại sao?",
    en: "What language would you want to learn and why?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_21",
    vi: "Bạn muốn trải nghiệm điều gì ít nhất một lần trước khi chết?",
    en: "What do you want to experience at least once before you die?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_22",
    vi: "Bạn nghĩ cuộc sống 10 năm nữa sẽ thay đổi thế nào?",
    en: "How do you think life will change in 10 years?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_23",
    vi: "Điều gì bạn muốn dạy cho thế hệ sau?",
    en: "What do you want to teach to the next generation?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_24",
    vi: "Nếu có thể tạo ra một ứng dụng, đó là ứng dụng gì?",
    en: "If you could create any app, what would it be?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_25",
    vi: "Bạn muốn về hưu ở đâu?",
    en: "Where do you want to retire?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_26",
    vi: "Điều gì bạn muốn làm mà chưa dám bắt đầu?",
    en: "What do you want to do that you haven't dared to start?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_27",
    vi: "Nếu bạn viết một cuốn sách, đó là sách về gì?",
    en: "If you wrote a book, what would it be about?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_28",
    vi: "Bạn muốn kỷ niệm gì đặc biệt nhất với chúng ta trong 5 năm tới?",
    en: "What special memory do you want to create with us in the next 5 years?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_29",
    vi: "Điều gì bạn muốn bỏ lại phía sau khi bước vào chương mới của cuộc đời?",
    en: "What do you want to leave behind as you enter a new chapter of life?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_30",
    vi: "Bạn muốn trở thành phiên bản tốt hơn của mình ở điểm nào nhất?",
    en: "Which aspect of yourself do you most want to improve?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_31",
    vi: "Kế hoạch nào bạn đang ấp ủ mà chưa kể ai?",
    en: "What plan are you holding onto that you haven't told anyone?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_32",
    vi: "Bạn muốn bước sang tuổi 50 với điều gì trong tay?",
    en: "What do you want to have in your hands when you turn 50?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_33",
    vi: "Điều gì bạn chắc chắn mình sẽ không hối hận khi làm?",
    en: "What are you sure you won't regret doing?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_34",
    vi: "Bạn muốn con cháu kể gì về bạn?",
    en: "What do you want your grandchildren to say about you?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_35",
    vi: "Nếu bạn biết chắc mình sẽ không thất bại, bạn sẽ thử điều gì ngay ngày mai?",
    en: "If you knew for sure you wouldn't fail, what would you try tomorrow?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_36",
    vi: "Điều gì bạn tin sẽ không bao giờ thay đổi ở bạn dù thời gian trôi qua?",
    en: "What do you believe will never change about you no matter how much time passes?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_37",
    vi: "Bạn muốn học một kỹ năng gì để giúp ích cho người khác?",
    en: "What skill do you want to learn to help others?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_38",
    vi: "Nếu bạn có thể làm tình nguyện cho tổ chức nào, đó là tổ chức gì?",
    en: "If you could volunteer for any organization, what would it be?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "future_39",
    vi: "Nhà lý tưởng của bạn ở đâu và trông như thế nào?",
    en: "Where and what does your dream home look like?",
    categoryId: "future",
    categoryLabel: "Tương lai",
    emoji: "🔮",
    color: "#9b59b6",
    frequency: "monthly"
  },
  {
    id: "gratitude_0",
    vi: "Điều bạn biết ơn nhất hôm nay là gì?",
    en: "What are you most grateful for today?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_1",
    vi: "Ai là người ảnh hưởng lớn nhất đến cuộc đời bạn?",
    en: "Who has had the biggest influence on your life?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_2",
    vi: "Điều nhỏ nhoi nào của đối phương khiến bạn cảm thấy được yêu?",
    en: "What small thing does your partner do that makes you feel loved?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_3",
    vi: "Lần nào ai đó giúp bạn mà bạn không bao giờ quên?",
    en: "When did someone help you in a way you'll never forget?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_4",
    vi: "Điều gì trong ngày hôm nay khiến bạn mỉm cười?",
    en: "What made you smile today?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_5",
    vi: "Bạn trân trọng điều gì về bản thân mình nhất?",
    en: "What do you appreciate most about yourself?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_6",
    vi: "3 điều bạn yêu ở đối phương mà bạn muốn họ biết ngay hôm nay?",
    en: "3 things you love about your partner that you want them to know right now?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_7",
    vi: "Khoảnh khắc hạnh phúc đơn giản nhất gần đây của bạn là gì?",
    en: "What's been your simplest, most happy moment recently?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_8",
    vi: "Điều gì ở cuộc sống hiện tại mà bạn nghĩ mình đang coi nhẹ?",
    en: "What in your current life do you think you're taking for granted?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_9",
    vi: "Câu nói của ai đó từng cứu bạn vào lúc khó khăn?",
    en: "Whose words once saved you in a difficult moment?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_10",
    vi: "Bạn biết ơn điều gì về cơ thể của mình?",
    en: "What about your body are you grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_11",
    vi: "Ai là người đã giúp bạn trong lúc khó khăn nhất mà bạn muốn cảm ơn ngay lúc này?",
    en: "Who helped you most in your hardest moment that you want to thank right now?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_12",
    vi: "Điều nhỏ nhặt nào trong ngày hôm nay khiến bạn biết ơn?",
    en: "What small thing today are you grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_13",
    vi: "Bạn biết ơn điều gì về giai đoạn khó khăn bạn đã trải qua?",
    en: "What about a difficult period you've been through are you grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_14",
    vi: "Có người nào mà bạn chưa kịp nói 'cảm ơn' không?",
    en: "Is there someone you haven't gotten to thank yet?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_15",
    vi: "Điều gì về bữa cơm gia đình khiến bạn trân trọng?",
    en: "What about family meals makes you appreciate them?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_16",
    vi: "Bạn biết ơn điều gì ở người bạn thân nhất?",
    en: "What about your closest friend are you most grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_17",
    vi: "Một kỷ niệm nào mà bạn biết ơn vì đã được trải qua?",
    en: "What memory are you grateful to have experienced?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_18",
    vi: "Điều gì trong thiên nhiên làm bạn cảm thấy biết ơn khi nhìn thấy?",
    en: "What in nature makes you feel grateful when you see it?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_19",
    vi: "Bạn trân trọng điều gì về cuộc sống mà 5 năm trước bạn không nghĩ tới?",
    en: "What in life do you appreciate now that you didn't think about 5 years ago?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_20",
    vi: "Điều gì về âm nhạc hoặc nghệ thuật khiến bạn biết ơn chúng tồn tại?",
    en: "What about music or art makes you grateful they exist?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_21",
    vi: "Bạn biết ơn điều gì về gia đình mình dù không hoàn hảo?",
    en: "What about your family are you grateful for despite imperfections?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_22",
    vi: "Khoảnh khắc nào trong tuần qua mà bạn muốn chụp lại và giữ mãi?",
    en: "What moment this past week would you want to photograph and keep forever?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_23",
    vi: "Bạn biết ơn điều gì đã học được từ một người bạn không ưa?",
    en: "What have you learned from someone you didn't like that you're grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_24",
    vi: "Nếu phải nói 'cảm ơn' với cuộc đời bằng một câu, bạn nói gì?",
    en: "If you had to say 'thank you' to life in one sentence, what would you say?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_25",
    vi: "Điều gì về thời gian yên tĩnh một mình khiến bạn biết ơn?",
    en: "What about quiet alone time are you grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_26",
    vi: "Bạn biết ơn điều gì về công nghệ giúp bạn kết nối với người thân?",
    en: "What technology are you grateful for that helps you connect with loved ones?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_27",
    vi: "Điều gì về những thất bại của bạn mà bạn thực sự biết ơn?",
    en: "What about your failures are you truly grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_28",
    vi: "Bạn trân trọng điều gì ở bản thân mà trước đây bạn coi là điểm yếu?",
    en: "What about yourself do you now treasure that you used to see as a weakness?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_29",
    vi: "Nếu hôm nay là ngày cuối cùng, bạn sẽ cảm ơn ai và vì điều gì?",
    en: "If today were your last day, who would you thank and for what?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_30",
    vi: "Điều gì về ngôn ngữ tiếng Việt của mình mà bạn yêu thích?",
    en: "What about the Vietnamese language do you love?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_31",
    vi: "Bạn biết ơn điều gì về người đã dạy bạn bài học quan trọng nhất?",
    en: "What about the person who taught you your most important lesson are you grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_32",
    vi: "Bạn biết ơn điều gì về sức khỏe của mình mà hay quên trân trọng?",
    en: "What about your health do you often forget to be grateful for?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_33",
    vi: "Điều gì về con người Việt Nam mà bạn tự hào và biết ơn?",
    en: "What about Vietnamese people makes you proud and grateful?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "gratitude_34",
    vi: "Điều nhỏ nào trong cuộc sống hằng ngày bạn đang dần nhận ra giá trị của nó?",
    en: "What small daily thing are you slowly realizing the value of?",
    categoryId: "gratitude",
    categoryLabel: "Biết ơn",
    emoji: "🙏",
    color: "#e67e22",
    frequency: "monthly"
  },
  {
    id: "challenge_0",
    vi: "Hãy kể điều bạn chưa bao giờ nói với đối phương — ngay lúc này!",
    en: "Tell your partner something you've never told them before — right now!",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_1",
    vi: "Nói 3 điều bạn yêu về vẻ ngoài của đối phương.",
    en: "Say 3 things you love about your partner's appearance.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_2",
    vi: "Hát hoặc đọc một đoạn bài hát mà bạn nghĩ đến khi nghĩ về đối phương.",
    en: "Sing or recite part of a song that reminds you of your partner.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_3",
    vi: "Vẽ khuôn mặt đối phương trong 60 giây và gửi ảnh cho họ xem!",
    en: "Draw your partner's face in 60 seconds and send them the photo!",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_4",
    vi: "Giả vờ bạn là người dẫn chương trình giới thiệu đối phương — giới thiệu đi!",
    en: "Pretend you're a TV host introducing your partner — go!",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_5",
    vi: "Nhắn một tin nhắn dễ thương cho đối phương ngay lúc này, không cần lý do.",
    en: "Send your partner a sweet message right now, no reason needed.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_6",
    vi: "Kể một kỷ niệm của chúng ta từ góc nhìn của bạn, chi tiết nhất có thể.",
    en: "Tell one of our memories from your perspective, in as much detail as possible.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_7",
    vi: "Tả mùi bạn nhớ nhất về đối phương — không được dùng từ 'nước hoa'!",
    en: "Describe the smell you associate most with your partner — can't say 'perfume'!",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_8",
    vi: "Dành 60 giây để nói liên tục những điều bạn thích ở đối phương.",
    en: "Spend 60 seconds listing things you like about your partner non-stop.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_9",
    vi: "Cho đối phương xem 3 ảnh trong điện thoại có ý nghĩa với bạn và giải thích.",
    en: "Show your partner 3 photos on your phone that mean something to you and explain why.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_10",
    vi: "Nhắn cho bố/mẹ hoặc người thân một tin nhắn yêu thương ngay bây giờ.",
    en: "Send a loving message to a parent or family member right now.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_11",
    vi: "Kể về ngày tệ nhất trong tuần của bạn — không được giấu đi điều gì.",
    en: "Tell me about your worst day this week — without hiding anything.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_12",
    vi: "Nói với tôi điều bạn thường không nói vì sợ tôi lo lắng.",
    en: "Tell me something you usually don't say because you're afraid I'll worry.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_13",
    vi: "Thực hiện một cử chỉ âu yếm dành cho đối phương trong 30 giây không nói gì.",
    en: "Perform a loving gesture toward your partner for 30 seconds without words.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_14",
    vi: "Kể về lần bạn cảm thấy cô đơn nhất và bạn đã làm gì.",
    en: "Tell me about when you felt loneliest and what you did.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_15",
    vi: "Hãy nói 'Tôi yêu em/anh' theo 5 cách khác nhau trong 60 giây.",
    en: "Say 'I love you' in 5 different ways in 60 seconds.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_16",
    vi: "Cho tôi xem ảnh đẹp nhất trên điện thoại bạn và giải thích tại sao bạn giữ nó.",
    en: "Show me the most beautiful photo on your phone and explain why you kept it.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_17",
    vi: "Miêu tả người ngồi trước mặt bạn như một nhân vật tiểu thuyết.",
    en: "Describe the person in front of you as if they were a novel character.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_18",
    vi: "Hãy cùng nhau viết một câu chuyện ngắn — mỗi người nói một câu.",
    en: "Let's write a short story together — each person says one sentence at a time.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_19",
    vi: "Cho đối phương xem playlist nghe nhiều nhất gần đây và giải thích tại sao.",
    en: "Show your partner your most-listened playlist lately and explain why.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_20",
    vi: "Hãy chia sẻ một bí mật nhỏ mà bạn chưa từng kể với bất kỳ ai.",
    en: "Share a small secret you've never told anyone.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_21",
    vi: "Tặng cho đối phương một 'danh hiệu' hài hước phù hợp với họ.",
    en: "Give your partner a funny 'title' that suits them perfectly.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_22",
    vi: "Cùng lên kế hoạch một buổi hẹn hò bất ngờ trong 5 phút.",
    en: "Together, plan a surprise date in the next 5 minutes.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_23",
    vi: "Hãy nói điều bạn ghét nhất và yêu nhất về bản thân mình.",
    en: "Say the thing you hate most and love most about yourself.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_24",
    vi: "Viết câu trả lời cho 'Tôi cần bạn biết rằng...' và đọc to lên.",
    en: "Write your answer to 'I need you to know that...' and read it aloud.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_25",
    vi: "Đặt điện thoại xuống 10 phút và chỉ nhìn vào mắt nhau.",
    en: "Put down your phones for 10 minutes and just look into each other's eyes.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_26",
    vi: "Cùng hứa với nhau một điều trước khi kết thúc cuộc trò chuyện này.",
    en: "Make a promise to each other before ending this conversation.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_27",
    vi: "Gọi cho một người bạn lâu không liên lạc và nói 'Tao/tôi nhớ mày/bạn'.",
    en: "Call someone you haven't spoken to in a while and say 'I miss you.'",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_28",
    vi: "Trao cho đối phương một vật gì đó trong túi/tay với ý nghĩa đặc biệt.",
    en: "Give your partner something from your bag/hands with a special meaning.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "challenge_29",
    vi: "Hãy kể điều bạn chưa bao giờ dám thừa nhận với chính mình, giờ nói to lên đi.",
    en: "Tell me something you've never dared to admit to yourself — say it out loud now.",
    categoryId: "challenge",
    categoryLabel: "Thử thách",
    emoji: "🎯",
    color: "#1abc9c",
    frequency: "weekly"
  },
  {
    id: "family_0",
    vi: "Người trong gia đình ảnh hưởng lớn nhất đến con người bạn là ai?",
    en: "Who in your family has influenced who you are the most?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_1",
    vi: "Điều bạn học được từ bố/mẹ mà bạn sẽ truyền lại cho con?",
    en: "What have you learned from your parents that you'll pass on to your children?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_2",
    vi: "Kỷ niệm gia đình vui nhất mà bạn nhớ mãi là gì?",
    en: "What's the happiest family memory you'll always remember?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_3",
    vi: "Có điều gì bạn muốn nói với bố/mẹ mà chưa dám nói không?",
    en: "Is there something you want to tell your parents but haven't dared to?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_4",
    vi: "Bạn và anh/chị/em trong nhà có thân thiết không? Điều gì kết nối bạn nhất?",
    en: "Are you close with your siblings? What connects you most?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_5",
    vi: "Truyền thống gia đình nào bạn muốn giữ mãi?",
    en: "What family tradition do you want to keep forever?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_6",
    vi: "Điều gì về bố/mẹ khiến bạn tự hào nhất?",
    en: "What about your parents makes you most proud?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_7",
    vi: "Bạn có muốn nuôi con khác bố/mẹ bạn đã nuôi bạn không?",
    en: "Do you want to raise children differently from how your parents raised you?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_8",
    vi: "Kỷ niệm Tết nào đẹp nhất trong ký ức của bạn?",
    en: "What's the most beautiful Tết memory in your mind?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_9",
    vi: "Người trong gia đình mà bạn giống nhất là ai?",
    en: "Who in your family are you most similar to?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_10",
    vi: "Điều gì về gia đình bạn mà người ngoài thường không hiểu?",
    en: "What about your family do outsiders often not understand?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_11",
    vi: "Bạn có thói quen nào được truyền từ gia đình?",
    en: "What habits have been passed down from your family?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_12",
    vi: "Nếu có thể ngồi ăn với cả gia đình ngay lúc này, bạn muốn nói gì?",
    en: "If you could sit and eat with your whole family right now, what would you say?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_13",
    vi: "Bạn nghĩ gia đình lý tưởng của mình trong tương lai trông như thế nào?",
    en: "What does your ideal family look like in the future?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_14",
    vi: "Điều gì về bố hoặc mẹ mà bạn chỉ nhận ra khi lớn lên?",
    en: "What about your mom or dad did you only realize when you grew up?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_15",
    vi: "Bạn muốn con cái của mình kế thừa điều gì từ gia đình bạn?",
    en: "What do you want your children to inherit from your family?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_16",
    vi: "Có kỷ niệm nào với ông bà mà bạn trân trọng mãi không?",
    en: "Is there a memory with your grandparents that you'll always treasure?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_17",
    vi: "Bạn nghĩ điều gì làm cho một gia đình hạnh phúc?",
    en: "What do you think makes a family happy?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_18",
    vi: "Điều gì bạn ước gia đình mình đã làm nhiều hơn khi bạn còn nhỏ?",
    en: "What do you wish your family had done more of when you were young?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_19",
    vi: "Nếu bạn có thể gặp một thành viên gia đình đã mất, bạn sẽ nói gì?",
    en: "If you could meet a deceased family member, what would you say?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_20",
    vi: "Ký ức về một bữa cơm gia đình mà bạn sẽ không quên là gì?",
    en: "What memory of a family meal will you never forget?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_21",
    vi: "Bạn nghĩ vai trò của bạn trong gia đình là gì?",
    en: "What do you think your role in the family is?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_22",
    vi: "Điều gì bố/mẹ nói với bạn mà bạn nhớ mãi đến giờ?",
    en: "What did your parents say to you that you still remember today?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_23",
    vi: "Bạn muốn kế thừa điều gì và không muốn kế thừa điều gì từ gia đình?",
    en: "What do you want and don't want to inherit from your family?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_24",
    vi: "Nếu cả gia đình cùng làm một điều, bạn muốn làm gì?",
    en: "If your whole family could do one thing together, what would it be?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_25",
    vi: "Bạn có hay nói 'yêu' với bố mẹ trực tiếp không?",
    en: "Do you often say 'I love you' directly to your parents?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_26",
    vi: "Điều gì khiến gia đình bạn đặc biệt so với gia đình khác?",
    en: "What makes your family special compared to others?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_27",
    vi: "Có điều gì về cách nuôi dạy của bố/mẹ mà bạn biết ơn nhưng hồi nhỏ không hiểu?",
    en: "Is there something about how your parents raised you that you're grateful for but didn't understand as a child?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_28",
    vi: "Nếu bạn có thể tặng cho cả gia đình một chuyến đi, bạn sẽ đưa họ đến đâu?",
    en: "If you could give your whole family a trip, where would you take them?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_29",
    vi: "Khi ở nhà với gia đình, bạn thường làm gì nhất?",
    en: "When home with family, what do you usually do most?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_30",
    vi: "Điều gì về quê hương của bạn mà bạn muốn con cái biết?",
    en: "What about your hometown do you want your children to know?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_31",
    vi: "Bạn có định sẽ chăm sóc bố mẹ khi về già không?",
    en: "Do you plan to care for your parents in their old age?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_32",
    vi: "Điều gì làm bạn cảm thấy 'về nhà' ngay cả khi không ở nhà?",
    en: "What makes you feel 'home' even when you're not at home?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_33",
    vi: "Nếu cả gia đình bạn là một bộ phim, đó sẽ là thể loại phim gì?",
    en: "If your whole family were a movie, what genre would it be?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "family_34",
    vi: "Điều bạn muốn bố/mẹ tự hào về bạn nhất là gì?",
    en: "What do you most want your parents to be proud of you for?",
    categoryId: "family",
    categoryLabel: "Gia đình",
    emoji: "🏠",
    color: "#c0392b",
    frequency: "monthly"
  },
  {
    id: "work_0",
    vi: "Điều gì khiến bạn thực sự hứng thú trong công việc?",
    en: "What genuinely excites you about your work?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_1",
    vi: "Khoảnh khắc nào trong sự nghiệp bạn cảm thấy tự hào nhất?",
    en: "What career moment are you most proud of?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_2",
    vi: "Nếu tiền không thành vấn đề, bạn sẽ làm công việc gì?",
    en: "If money weren't an issue, what work would you do?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_3",
    vi: "Người mentor/sếp nào đã ảnh hưởng lớn nhất đến sự nghiệp bạn?",
    en: "Which mentor/boss has influenced your career the most?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_4",
    vi: "Thất bại trong công việc nào dạy bạn nhiều nhất?",
    en: "What work failure taught you the most?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_5",
    vi: "Bạn nghĩ sự cân bằng công việc – cuộc sống của mình hiện tại như thế nào?",
    en: "How do you feel about your current work-life balance?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_6",
    vi: "Điều gì bạn ước mình được học trước khi bắt đầu sự nghiệp?",
    en: "What do you wish you had learned before starting your career?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_7",
    vi: "Nếu có thể thay đổi một điều trong môi trường làm việc, bạn thay đổi gì?",
    en: "If you could change one thing about your work environment, what would it be?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_8",
    vi: "Bạn thích làm việc độc lập hay làm việc nhóm?",
    en: "Do you prefer working independently or in a team?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_9",
    vi: "Điều gì về công việc khiến bạn muốn trốn tránh nhất?",
    en: "What about work do you most want to avoid?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_10",
    vi: "Bạn có bao giờ cảm thấy 'đốt cháy' (burnout) chưa? Bạn đã làm gì?",
    en: "Have you ever felt burned out? What did you do?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_11",
    vi: "Kỹ năng nào bạn muốn phát triển trong năm tới?",
    en: "What skill do you want to develop in the next year?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_12",
    vi: "Bạn thích làm việc ở văn phòng, tại nhà hay quán cà phê?",
    en: "Do you prefer working in an office, at home, or at a café?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_13",
    vi: "Điều gì bạn muốn đồng nghiệp nhớ về bạn?",
    en: "What do you want your colleagues to remember you for?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_14",
    vi: "Nếu bạn có thể khởi nghiệp ngay ngày mai, bạn làm gì?",
    en: "If you could start a business tomorrow, what would it be?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_15",
    vi: "Điều gì bạn chưa dám thử trong sự nghiệp?",
    en: "What haven't you dared to try in your career?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_16",
    vi: "Bạn định nghĩa thành công trong sự nghiệp như thế nào?",
    en: "How do you define success in your career?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_17",
    vi: "Có lúc nào bạn nghi ngờ con đường sự nghiệp của mình không?",
    en: "Have you ever doubted your career path?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_18",
    vi: "Bạn có hay mang công việc về nhà trong đầu không?",
    en: "Do you often bring work home in your head?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_19",
    vi: "Điều gì về ngành nghề của bạn mà bạn muốn người khác hiểu hơn?",
    en: "What about your profession do you wish people understood better?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_20",
    vi: "Nếu có thể làm việc ở bất cứ đâu trên thế giới, bạn chọn đâu?",
    en: "If you could work anywhere in the world, where would you choose?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_21",
    vi: "Thứ gì trong công việc khiến bạn mất ngủ nhất?",
    en: "What about work keeps you up at night?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_22",
    vi: "Điều gì bạn chưa nói với sếp mà bạn muốn nói?",
    en: "What haven't you told your boss that you wish you could?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_23",
    vi: "Bạn có tin mình đang đúng ngành không?",
    en: "Do you believe you're in the right field?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_24",
    vi: "Điều gì bạn làm trong công việc mà người khác không nhìn thấy nhưng bạn biết quan trọng?",
    en: "What do you do at work that others don't see but you know matters?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_25",
    vi: "Nếu có thể thay đổi nghề nghiệp ngay bây giờ, bạn sẽ làm gì?",
    en: "If you could change careers right now, what would you do?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_26",
    vi: "Câu chuyện thành công nhỏ nào trong công việc mà bạn chưa kể ai?",
    en: "What small work success story have you never told anyone?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_27",
    vi: "Bạn muốn 5 năm nữa mình đang ở đâu trong sự nghiệp?",
    en: "Where do you want to be in your career 5 years from now?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_28",
    vi: "Điều gì khiến bạn tiếp tục đi làm mỗi ngày?",
    en: "What keeps you going to work every day?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_29",
    vi: "Bạn có thể làm việc mà không cần ai công nhận không?",
    en: "Could you do your job without anyone recognizing it?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_30",
    vi: "Thứ gì về sếp/môi trường làm việc hiện tại bạn biết ơn?",
    en: "What about your boss/current work environment are you grateful for?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_31",
    vi: "Bạn nghĩ AI sẽ thay đổi công việc của bạn như thế nào?",
    en: "How do you think AI will change your work?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_32",
    vi: "Điều gì bạn muốn để lại trong ngành nghề của mình?",
    en: "What do you want to leave behind in your field?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_33",
    vi: "Nếu có thể thuê người giúp một việc trong công việc, bạn muốn thuê ai làm gì?",
    en: "If you could hire someone to help with one work task, what would it be?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "work_34",
    vi: "Bạn nghĩ mình sẽ làm công việc này thêm bao nhiêu năm?",
    en: "How many more years do you think you'll do this job?",
    categoryId: "work",
    categoryLabel: "Công việc",
    emoji: "💼",
    color: "#2980b9",
    frequency: "monthly"
  },
  {
    id: "self_0",
    vi: "Điều gì về bản thân bạn luôn luôn không thay đổi dù qua bao nhiêu năm?",
    en: "What about you has always stayed the same no matter how many years have passed?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_1",
    vi: "Bạn nghĩ mình đang thiếu gì để trở thành người bạn muốn?",
    en: "What do you think you're missing to become the person you want to be?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_2",
    vi: "Nếu phải mô tả bản thân bằng 3 từ, đó là những từ gì?",
    en: "If you had to describe yourself in 3 words, what would they be?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_3",
    vi: "Khi nào bạn cảm thấy mình là phiên bản tốt nhất?",
    en: "When do you feel like your best self?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_4",
    vi: "Điều gì bạn làm tốt hơn hầu hết mọi người mà ít ai biết?",
    en: "What do you do better than most people that few know about?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_5",
    vi: "Bạn xử lý sự tức giận như thế nào?",
    en: "How do you handle anger?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_6",
    vi: "Điều gì kích hoạt (trigger) bạn nhiều nhất?",
    en: "What triggers you the most?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_7",
    vi: "Bạn thường tự an ủi bản thân như thế nào khi buồn?",
    en: "How do you usually comfort yourself when sad?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_8",
    vi: "Nếu bạn là một cuốn sách, bạn là thể loại gì và tựa đề là gì?",
    en: "If you were a book, what genre would it be and what would the title be?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_9",
    vi: "Điều gì bạn đang cố gắng thay đổi ở bản thân gần đây?",
    en: "What about yourself are you trying to change lately?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_10",
    vi: "Bạn có xu hướng đưa ra quyết định bằng lý trí hay cảm xúc hơn?",
    en: "Do you tend to make decisions more with logic or emotion?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_11",
    vi: "Điều gì khiến bạn cảm thấy được nhìn nhận và tôn trọng?",
    en: "What makes you feel seen and respected?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_12",
    vi: "Bạn xử lý thất vọng như thế nào?",
    en: "How do you deal with disappointment?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_13",
    vi: "Điều gì về bản thân bạn vẫn đang cố hiểu?",
    en: "What about yourself are you still trying to understand?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_14",
    vi: "Khi nào bạn khó tin tưởng người khác nhất?",
    en: "When is it hardest for you to trust others?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_15",
    vi: "Bạn có xu hướng đặt nhu cầu của người khác lên trên bản thân không?",
    en: "Do you tend to put others' needs above your own?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_16",
    vi: "Điều gì là nguồn năng lượng lớn nhất của bạn?",
    en: "What's your biggest source of energy?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_17",
    vi: "Điều gì 'rút cạn' năng lượng của bạn nhanh nhất?",
    en: "What drains your energy the fastest?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_18",
    vi: "Bạn có bao giờ cảm thấy không đủ tốt không? Lúc đó bạn làm gì?",
    en: "Have you ever felt not good enough? What did you do?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_19",
    vi: "Điều gì bạn muốn tha thứ cho bản thân?",
    en: "What do you want to forgive yourself for?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_20",
    vi: "Khi bạn một mình, bạn thường nghĩ gì nhất?",
    en: "When you're alone, what do you think about most?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_21",
    vi: "Bạn nghĩ bản năng của mình có đáng tin không?",
    en: "Do you think your instincts are trustworthy?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_22",
    vi: "Điều gì bạn không thể chịu được ở người khác (và có thể có ở chính bạn)?",
    en: "What can't you stand in others (and might exist in yourself)?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_23",
    vi: "Khi nào bạn cảm thấy mình bị hiểu lầm nhiều nhất?",
    en: "When do you feel most misunderstood?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_24",
    vi: "Bạn thường phản ứng như thế nào khi bị chỉ trích?",
    en: "How do you usually react to criticism?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_25",
    vi: "Điều gì về bản thân bạn muốn ôm lấy thay vì thay đổi?",
    en: "What about yourself do you want to embrace rather than change?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_26",
    vi: "Bạn có bao giờ cảm thấy mình đang diễn vai 'người tốt' thay vì thực sự là mình không?",
    en: "Have you ever felt like you were performing 'being good' rather than actually being yourself?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_27",
    vi: "Khi bạn thực sự vui, bạn trông như thế nào?",
    en: "What do you look like when you're genuinely happy?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_28",
    vi: "Điều gì khiến bạn tự ti nhất?",
    en: "What makes you feel most insecure?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_29",
    vi: "Bạn có kỷ luật với bản thân không? Trong lĩnh vực nào?",
    en: "Are you disciplined with yourself? In what area?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_30",
    vi: "Điều gì bạn luôn muốn làm nhưng cứ trì hoãn?",
    en: "What do you always want to do but keep putting off?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_31",
    vi: "Bạn học tốt nhất bằng cách nghe, nhìn hay làm?",
    en: "Do you learn best by listening, seeing, or doing?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_32",
    vi: "Khi bị áp lực, bạn trở nên tốt hơn hay tệ hơn?",
    en: "When under pressure, do you get better or worse?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_33",
    vi: "Điều gì bạn cần có trong cuộc sống để cảm thấy ổn định?",
    en: "What do you need in life to feel stable?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_34",
    vi: "Bạn có hay so sánh mình với người khác không? Điều đó ảnh hưởng bạn như thế nào?",
    en: "Do you often compare yourself to others? How does that affect you?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_35",
    vi: "Điều gì bạn thấy khác biệt ở mình so với đa số?",
    en: "What makes you different from the majority?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_36",
    vi: "Bạn có sợ cô đơn không? Hay bạn cần thời gian một mình?",
    en: "Are you afraid of being alone, or do you need alone time?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_37",
    vi: "Khi bạn tức giận, điều gì giúp bạn bình tĩnh lại?",
    en: "When you're angry, what helps you calm down?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_38",
    vi: "Điều gì về bản thân bạn vẫn đang học cách yêu thương?",
    en: "What about yourself are you still learning to love?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_39",
    vi: "Bạn nghĩ người khác nhìn nhận bạn như thế nào so với cách bạn nhìn chính mình?",
    en: "How do you think others see you compared to how you see yourself?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_40",
    vi: "Điều gì bạn đã từng ghét ở bản thân nhưng giờ chấp nhận được?",
    en: "What did you used to hate about yourself that you now accept?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_41",
    vi: "Khi nào bạn cảm thấy mình thực sự dũng cảm?",
    en: "When do you feel truly courageous?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_42",
    vi: "Bạn cần gì từ một mối quan hệ để thực sự hạnh phúc?",
    en: "What do you need from a relationship to be truly happy?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_43",
    vi: "Điều gì bạn muốn thế giới biết về bạn?",
    en: "What do you want the world to know about you?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "self_44",
    vi: "Nếu bạn không sợ gì, bạn sẽ là ai?",
    en: "If you were afraid of nothing, who would you be?",
    categoryId: "self",
    categoryLabel: "Khám phá bản thân",
    emoji: "🔍",
    color: "#8e44ad",
    frequency: "rare"
  },
  {
    id: "philosophy_0",
    vi: "Bạn nghĩ con người sống để làm gì?",
    en: "What do you think people live for?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_1",
    vi: "Điều gì làm cho một hành động là 'tốt'?",
    en: "What makes an action 'good'?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_2",
    vi: "Bạn có tin rằng mọi chuyện đều xảy ra vì lý do không?",
    en: "Do you believe everything happens for a reason?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_3",
    vi: "Hạnh phúc là trạng thái hay hành trình?",
    en: "Is happiness a state or a journey?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_4",
    vi: "Bạn nghĩ con người về bản chất là vị tha hay ích kỷ?",
    en: "Do you think humans are fundamentally altruistic or selfish?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_5",
    vi: "Nếu bạn có thể tua lại thời gian, điều đó có làm thay đổi ai bạn là không?",
    en: "If you could rewind time, would that change who you are?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_6",
    vi: "Điều gì bạn cho là đúng dù cả thế giới không đồng ý?",
    en: "What do you believe is right even if the whole world disagrees?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_7",
    vi: "Bạn nghĩ 'tự do' thực sự nghĩa là gì?",
    en: "What does 'freedom' truly mean to you?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_8",
    vi: "Điều gì quan trọng hơn — sự thật hay lòng tốt?",
    en: "What matters more — truth or kindness?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_9",
    vi: "Bạn có tin rằng con người có thể thực sự thay đổi không?",
    en: "Do you believe people can truly change?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_10",
    vi: "Nếu bạn phải chọn giữa sống lâu và sống sâu, bạn chọn gì?",
    en: "If you had to choose between a long life and a deep life, which would you choose?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_11",
    vi: "Điều gì tạo nên bản sắc của một người?",
    en: "What creates a person's identity?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_12",
    vi: "Bạn nghĩ số phận và sự lựa chọn, cái nào định hình cuộc đời hơn?",
    en: "Which shapes life more — fate or choice?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_13",
    vi: "Điều gì là 'thật' trong một thế giới luôn thay đổi?",
    en: "What is 'real' in an ever-changing world?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_14",
    vi: "Điều gì làm cho một mối quan hệ có giá trị?",
    en: "What makes a relationship valuable?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_15",
    vi: "Tình yêu là cảm xúc hay sự lựa chọn?",
    en: "Is love an emotion or a choice?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_16",
    vi: "Bạn nghĩ điều gì là không thể thay thế trong cuộc đời?",
    en: "What do you think is irreplaceable in life?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_17",
    vi: "Nếu ai đó cư xử tệ vì hoàn cảnh, họ có đáng trách không?",
    en: "If someone behaves badly due to circumstances, are they still to blame?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_18",
    vi: "Điều gì bạn cho là quan trọng nhất — quá khứ, hiện tại hay tương lai?",
    en: "What do you consider most important — the past, present, or future?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_19",
    vi: "Bạn nghĩ thất bại có cần thiết để trưởng thành không?",
    en: "Do you think failure is necessary to grow?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_20",
    vi: "Điều gì tạo ra sự khác biệt giữa sự tồn tại và sự sống?",
    en: "What creates the difference between existence and living?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_21",
    vi: "Bạn nghĩ 'bình thường' có phải là điều tốt không?",
    en: "Do you think being 'normal' is a good thing?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_22",
    vi: "Nếu bạn có thể biết trước tất cả, cuộc đời có còn ý nghĩa không?",
    en: "If you could know everything in advance, would life still be meaningful?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_23",
    vi: "Điều gì không bao giờ thỏa hiệp dù ai nói gì?",
    en: "What will you never compromise no matter what anyone says?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_24",
    vi: "Bạn nghĩ người ta cần bao nhiêu để hạnh phúc?",
    en: "How much do you think a person needs to be happy?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_25",
    vi: "Điều gì về con người khiến bạn vừa ngạc nhiên vừa hy vọng?",
    en: "What about humans both surprises and gives you hope?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_26",
    vi: "Nếu bạn chỉ có thể để lại một bài học cho đời, đó là gì?",
    en: "If you could leave only one lesson for the world, what would it be?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_27",
    vi: "Bạn nghĩ sự im lặng nói lên điều gì?",
    en: "What do you think silence says?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_28",
    vi: "Điều gì khiến bạn tin rằng cuộc đời này đáng sống?",
    en: "What makes you believe this life is worth living?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "philosophy_29",
    vi: "Bạn nghĩ sự khác biệt giữa sự dũng cảm và sự liều lĩnh là gì?",
    en: "What do you think is the difference between courage and recklessness?",
    categoryId: "philosophy",
    categoryLabel: "Triết học",
    emoji: "🌙",
    color: "#16a085",
    frequency: "rare"
  },
  {
    id: "travel_0",
    vi: "Chuyến đi nào thay đổi cách bạn nhìn thế giới?",
    en: "What trip changed the way you see the world?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_1",
    vi: "Nơi nào bạn đã đến một lần nhưng muốn quay lại mãi?",
    en: "Where have you been once but want to keep returning to?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_2",
    vi: "Bạn thích du lịch một mình hay theo nhóm? Tại sao?",
    en: "Do you prefer traveling alone or in a group? Why?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_3",
    vi: "Điều gì bạn luôn làm đầu tiên khi đến một nơi mới?",
    en: "What do you always do first when arriving somewhere new?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_4",
    vi: "Món ăn địa phương nào bạn nhớ nhất từ một chuyến đi?",
    en: "What local food do you remember most from a trip?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_5",
    vi: "Nếu được chọn một nơi để sống 1 năm, bạn chọn đâu?",
    en: "If you could choose a place to live for 1 year, where would you choose?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_6",
    vi: "Hành lý gọn nhẹ hay đầy đủ — bạn thuộc team nào?",
    en: "Light packing or fully packed — which team are you on?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_7",
    vi: "Điều gì bạn học được về bản thân từ những chuyến đi?",
    en: "What have you learned about yourself from your travels?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_8",
    vi: "Bạn thích đặt kế hoạch chi tiết hay tự phát khi du lịch?",
    en: "Do you prefer detailed plans or spontaneous traveling?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_9",
    vi: "Nơi nào ở Việt Nam bạn muốn khám phá mà chưa từng đến?",
    en: "Where in Vietnam do you want to explore but haven't been to?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_10",
    vi: "Chuyến đi tệ nhất của bạn là gì và bạn học được gì từ nó?",
    en: "What was your worst trip and what did you learn from it?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_11",
    vi: "Bạn thích biển, núi, thành phố hay nông thôn khi đi chơi?",
    en: "Do you prefer the beach, mountains, city, or countryside when traveling?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_12",
    vi: "Điều gì về văn hóa nước khác khiến bạn ngạc nhiên nhất?",
    en: "What about another country's culture surprised you the most?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_13",
    vi: "Nếu được đi du lịch ngay lúc này, bạn sẽ gói gì vào vali?",
    en: "If you could travel right now, what would you pack in your suitcase?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_14",
    vi: "Bạn thích ở khách sạn hay chỗ ở địa phương (homestay) hơn?",
    en: "Do you prefer hotels or local stays (homestay)?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_15",
    vi: "Khoảnh khắc nào trong chuyến đi bạn cảm thấy tự do nhất?",
    en: "What travel moment made you feel most free?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_16",
    vi: "Điều gì bạn muốn khám phá về thế giới mà chưa có cơ hội?",
    en: "What about the world do you want to discover but haven't had the chance to?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_17",
    vi: "Bạn muốn trải nghiệm đêm giao thừa ở đâu một lần trong đời?",
    en: "Where do you want to experience New Year's Eve at least once in your life?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_18",
    vi: "Nếu có thể đi du lịch trên máy bay miễn phí, lịch trình của bạn sẽ thế nào?",
    en: "If you could fly for free, what would your travel itinerary look like?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_19",
    vi: "Bạn có bao giờ đi lạc ở nơi xa lạ chưa? Chuyện gì xảy ra?",
    en: "Have you ever gotten lost in an unfamiliar place? What happened?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_20",
    vi: "Nơi nào bạn nghĩ cả hai chúng ta nên cùng nhau đến?",
    en: "Where do you think we should both go together?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_21",
    vi: "Bạn thích khám phá ban ngày hay ban đêm khi đến thành phố mới?",
    en: "Do you prefer exploring a new city during the day or at night?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_22",
    vi: "Điều gì về du lịch một mình bạn thích và không thích?",
    en: "What do you like and dislike about traveling alone?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_23",
    vi: "Bạn muốn leo núi, lặn biển hay nhảy dù một lần không?",
    en: "Would you want to climb a mountain, dive in the ocean, or skydive once?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_24",
    vi: "Điều gì bạn luôn mua làm quà khi đi du lịch về?",
    en: "What do you always buy as a gift when you travel?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_25",
    vi: "Chuyến đi mơ ước của bạn và tôi cùng nhau là gì?",
    en: "What's your dream trip for the two of us?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_26",
    vi: "Bạn có muốn sống ở nước ngoài một thời gian không?",
    en: "Would you want to live abroad for a while?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_27",
    vi: "Phong cảnh nào trong những chuyến đi bạn không thể quên?",
    en: "What scenery from your travels can you never forget?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_28",
    vi: "Điều gì về việc đi du lịch khiến bạn hồi hộp nhất?",
    en: "What about traveling excites you the most?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_29",
    vi: "Nếu cả hai chúng ta cùng road trip xuyên Việt Nam, chặng đường nào bạn mong nhất?",
    en: "If we road-tripped across Vietnam, which stretch would you most look forward to?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_30",
    vi: "Điều gì bạn luôn muốn nói với những người địa phương nhưng ngại ngùng?",
    en: "What do you always want to say to locals but feel shy about?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_31",
    vi: "Nếu được đi theo dấu chân một nhân vật lịch sử, bạn chọn ai và đến đâu?",
    en: "If you could follow in the footsteps of a historical figure, who and where?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_32",
    vi: "Bạn thích du lịch theo mùa hay thích tránh mùa cao điểm?",
    en: "Do you prefer traveling in season or avoiding peak times?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_33",
    vi: "Điều gì về những người bạn gặp trong chuyến đi khiến bạn thay đổi cách nghĩ?",
    en: "What about people you've met traveling changed the way you think?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "travel_34",
    vi: "Bạn nghĩ điểm đến tốt nhất là những nơi mình tình cờ khám phá hay lên kế hoạch trước?",
    en: "Do you think the best destinations are ones you discover by chance or plan in advance?",
    categoryId: "travel",
    categoryLabel: "Du lịch",
    emoji: "✈️",
    color: "#27ae60",
    frequency: "monthly"
  },
  {
    id: "quick_0",
    vi: "Bây giờ bạn đang làm gì?",
    en: "What are you doing right now?",
    tag: "☕",
    allowPhoto: true,
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_1",
    vi: "Hôm nay bạn ăn gì ngon nhất?",
    en: "What was the best thing you ate today?",
    tag: "🍜",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_2",
    vi: "Chụp cho người ấy xem một góc nhỏ quanh bạn lúc này.",
    en: "Send a small photo of where you are right now.",
    tag: "📷",
    allowPhoto: true,
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_3",
    vi: "Hôm nay có điều gì làm bạn thấy hơi mệt không?",
    en: "Did anything make you feel tired today?",
    tag: "🫧",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_4",
    vi: "Bạn đang nhớ người ấy ở khoảnh khắc nào nhất hôm nay?",
    en: "When did you miss your partner most today?",
    tag: "💕",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_5",
    vi: "Nếu được gặp nhau 30 phút tối nay, bạn muốn làm gì?",
    en: "If you had 30 minutes together tonight, what would you do?",
    tag: "🌙",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_6",
    vi: "Khoảnh khắc nào trong ngày hôm nay khiến bạn mỉm cười?",
    en: "What moment today made you smile?",
    tag: "🌱",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_7",
    vi: "Một chuyện rất nhỏ hôm nay mà bạn muốn kể cho người ấy là gì?",
    en: "What tiny thing from today do you want to tell your partner?",
    tag: "💬",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_8",
    vi: "Bạn muốn người ấy ôm bạn kiểu nào ngay lúc này?",
    en: "What kind of hug do you want right now?",
    tag: "🫶",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_9",
    vi: "Điều gì ở đối phương mà bạn chưa bao giờ nói ra?",
    en: "What's something about your partner you've never said aloud?",
    tag: "✨",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_10",
    vi: "Kỷ niệm ngốc nghếch nhất của chúng ta là gì?",
    en: "What's our silliest memory together?",
    tag: "😂",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_11",
    vi: "5 năm nữa, bạn hình dung chúng ta đang ở đâu?",
    en: "Where do you see us in 5 years?",
    tag: "🔮",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  },
  {
    id: "quick_12",
    vi: "Bạn biết ơn điều gì nhất về nhau ngày hôm nay?",
    en: "What are you most grateful for about each other today?",
    tag: "🙏",
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: "daily"
  }
];