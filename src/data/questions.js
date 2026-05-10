/**
 * NGÂN HÀNG CÂU HỎI LỬA NHỎ (Little Flame)
 * Gồm hơn 400 câu hỏi chia làm 12 danh mục + câu hỏi nhanh hàng ngày
 * Phiên bản đầy đủ - Xuất tất cả dữ liệu & tiện ích
 */

// =============================================
// 0. MAPPING TẦN SUẤT & SỐ NGÀY TƯƠNG ỨNG
// =============================================
const CATEGORY_FREQUENCY = {
  warm: "monthly",      // 30 ngày
  deep: "rare",         // 50 ngày
  couple: "rare",
  funny: "weekly",      // 7 ngày
  future: "monthly",
  gratitude: "monthly",
  challenge: "weekly",
  family: "monthly",
  work: "monthly",
  self: "rare",
  philosophy: "rare",
  travel: "monthly"
};

const QUICK_DEFAULT_FREQUENCY = "daily"; // 1 ngày

export const FREQUENCY_DAYS = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  rare: 50
};

// =============================================
// 0b. Hàm gán tần suất cho một câu hỏi
// =============================================
function getFrequencyForQuestion(question, categoryId) {
  if (question.frequency) return question.frequency;
  if (!categoryId) return QUICK_DEFAULT_FREQUENCY;
  return CATEGORY_FREQUENCY[categoryId] || "monthly";
}

// =============================================
// 1. DANH MỤC CÂU HỎI (12 CHỦ ĐỀ)

export const CATEGORIES = [
  {
    id: "warm", emoji: "🌱", label: "Nhẹ nhàng", labelEn: "Warm-up", color: "#f5a623",
    desc: "Câu hỏi vui, phá băng, dễ trả lời",
    questions: [
      { vi: "Nếu cuộc đời mình là một bộ phim, tên phim đó sẽ là gì?", en: "If your life were a movie, what would it be called?" },
      { vi: "Bài hát nào đang bị kẹt trong đầu bạn nhiều nhất gần đây?", en: "What song is stuck in your head the most lately?" },
      { vi: "Nếu được ăn một món mãi không chán, bạn chọn món gì?", en: "If you could eat one food forever without getting tired of it, what would it be?" },
      { vi: "Emoji nào mô tả tâm trạng bạn hôm nay nhất?", en: "Which emoji best describes your mood today?" },
      { vi: "Bạn thích cà phê hay trà? Tại sao?", en: "Coffee or tea? Why?" },
      { vi: "Nếu được đặt tên lại cho bản thân, bạn sẽ chọn tên gì?", en: "If you could rename yourself, what name would you choose?" },
      { vi: "Superpower bạn muốn có nhất là gì?", en: "What superpower would you most want to have?" },
      { vi: "Kỷ niệm ngốc nghếch nhất mà giờ bạn có thể cười về nó là gì?", en: "What's the silliest memory that you can laugh about now?" },
      { vi: "Bài hát karaoke ruột của bạn là gì?", en: "What's your go-to karaoke song?" },
      { vi: "Nếu được sống ở một thành phố khác, bạn chọn đâu?", en: "If you could live in any other city, where would it be?" },
      { vi: "Phim hoạt hình hồi nhỏ bạn mê nhất là phim gì?", en: "What was your favorite cartoon as a kid?" },
      { vi: "Con vật nào mà bạn nghĩ phản ánh tính cách mình nhất?", en: "Which animal do you think best reflects your personality?" },
      { vi: "Điều đầu tiên bạn làm khi thức dậy mỗi sáng là gì?", en: "What's the first thing you do every morning when you wake up?" },
      { vi: "Nếu không phải làm công việc hiện tại, bạn muốn làm gì?", en: "If you weren't doing your current job, what would you want to do?" },
      { vi: "Điều gì khiến bạn cười to nhất trong tuần này?", en: "What made you laugh the hardest this week?" },
      { vi: "Nếu được đi du lịch ngay hôm nay, bạn muốn đến đâu?", en: "If you could travel somewhere right now, where would you go?" },
      { vi: "Bạn thích sáng sớm hay đêm khuya?", en: "Are you more of a morning person or a night owl?" },
      { vi: "Thứ đầu tiên bạn nhận ra ở một người lạ là gì?", en: "What's the first thing you notice about a stranger?" },
      { vi: "Nếu là một loại thời tiết, bạn sẽ là loại nào?", en: "If you were a type of weather, what would you be?" },
      { vi: "Nếu bạn mở một quán, bạn sẽ mở quán gì?", en: "If you opened a shop, what kind would it be?" },
      { vi: "Buổi sáng lý tưởng nhất của bạn sẽ trông như thế nào?", en: "What would your perfect morning look like?" },
      { vi: "Bạn có thói quen gì trước khi ngủ không?", en: "Do you have any bedtime routines?" },
      { vi: "Món ăn nào nhắc bạn nhớ đến tuổi thơ nhất?", en: "What food most reminds you of your childhood?" },
      { vi: "Bạn thích nhận tin nhắn ngắn hay cuộc gọi dài?", en: "Do you prefer short texts or long phone calls?" },
      { vi: "Có món ăn nào bạn không bao giờ chán không?", en: "Is there a food you could never get tired of?" },
      { vi: "Bạn thích mặc đồ thoải mái hay thời trang khi ở nhà?", en: "Do you prefer comfy clothes or stylish clothes at home?" },
      { vi: "Khi bạn không biết xem gì, bạn thường xem lại phim gì?", en: "When you don't know what to watch, what do you rewatch?" },
      { vi: "Bạn có xu hướng lưu hay xóa ảnh trên điện thoại?", en: "Are you a photo hoarder or a photo deleter?" },
      { vi: "Sở thích bí mật nào của bạn mà ít người biết?", en: "What secret hobby do you have that few people know about?" },
      { vi: "Bạn thích nhận hoa hay quà thực tế hơn?", en: "Would you rather receive flowers or practical gifts?" },
      { vi: "Tiếng ồn nào khiến bạn thấy bình yên? (mưa, sóng biển, tiếng quạt...)", en: "What sound makes you feel peaceful? (rain, waves, fan...)" },
      { vi: "Bạn hay đặt báo thức mấy lần trước khi thực sự dậy?", en: "How many alarms do you set before actually getting up?" },
      { vi: "Phim nào bạn đã xem hơn 3 lần?", en: "What movie have you watched more than 3 times?" },
      { vi: "Khi cần thư giãn nhanh, bạn làm gì trong 10 phút?", en: "When you need to relax quickly, what do you do in 10 minutes?" },
      { vi: "Bạn thích ăn ngọt hay mặn hơn?", en: "Sweet or savory — which do you prefer?" },
      { vi: "Bạn có bao giờ đọc cuối sách trước rồi mới đọc từ đầu không?", en: "Do you ever read the ending of a book before reading from the beginning?" },
      { vi: "Thứ cuối tuần lý tưởng của bạn có gì?", en: "What does your ideal weekend look like?" },
      { vi: "Bạn có hay quên tên người mới gặp không?", en: "Do you often forget the names of people you just met?" },
      { vi: "Nếu được tặng 1 triệu ngay lúc này, điều đầu tiên bạn làm là gì?", en: "If given 1 million VND right now, what's the first thing you'd do?" },
      { vi: "Bạn thích xem phim có phụ đề hay lồng tiếng?", en: "Do you prefer subtitles or dubbed films?" },
      { vi: "Bạn hay mang theo gì trong túi/ví mà người khác thấy kỳ lạ?", en: "What do you carry in your bag/wallet that others might find odd?" },
      { vi: "Nếu cuộc đời bạn là một thể loại nhạc, đó là thể loại gì?", en: "If your life were a music genre, what would it be?" },
      { vi: "Bạn thích không khí sinh nhật hay Tết hơn?", en: "Do you prefer birthday vibes or Tết vibes?" },
      { vi: "Điều gì làm bạn mỉm cười mỗi khi nghĩ đến?", en: "What always makes you smile when you think about it?" },
      { vi: "Bạn có hay nói chuyện với bản thân khi một mình không?", en: "Do you talk to yourself when you're alone?" },
      { vi: "Bạn thích bắt đầu một ngày với âm nhạc hay yên tĩnh?", en: "Do you prefer starting your day with music or silence?" },
      { vi: "Màu sắc nào bạn không bao giờ mặc và tại sao?", en: "What color do you never wear and why?" },
      { vi: "Điều gì bạn muốn học được ngay ngày mai nếu có thể là gì?", en: "What would you want to learn instantly if you could?" },
      { vi: "Bạn thích biển hay núi?", en: "Do you prefer the beach or the mountains?" },
      { vi: "Khi gặp chuyện buồn, bạn hay tìm đến ai?", en: "When something bad happens, who do you turn to?" },
      { vi: "Bạn nghĩ mình hướng nội hay hướng ngoại?", en: "Do you think you're more introverted or extroverted?" },
      { vi: "Bạn có thể không dùng điện thoại một ngày không?", en: "Could you go a day without your phone?" },
      { vi: "Câu chuyện cười ruột của bạn là gì?", en: "What's your go-to joke?" },
      { vi: "Kỷ niệm ăn uống vui nhất của bạn là gì?", en: "What's your funniest food memory?" },
    ]
  },
  {
    id: "deep", emoji: "🌊", label: "Sâu sắc", labelEn: "Deep Talk", color: "#4a90d9",
    desc: "Câu hỏi chạm tới cảm xúc, giá trị sống",
    questions: [
      { vi: "Khoảnh khắc nào trong cuộc đời khiến bạn thay đổi hoàn toàn?", en: "What moment in your life completely changed you?" },
      { vi: "Nỗi sợ lớn nhất của bạn mà ít ai biết là gì?", en: "What's your biggest fear that few people know about?" },
      { vi: "Điều gì bạn ước mình đã biết sớm hơn?", en: "What's something you wish you had known sooner?" },
      { vi: "Thành tựu nào bạn tự hào nhất trong cuộc đời?", en: "What achievement are you most proud of in your life?" },
      { vi: "Nếu biết mình chỉ còn 1 năm để sống, bạn sẽ làm gì khác đi?", en: "If you knew you only had one year left, what would you do differently?" },
      { vi: "Điều gì bạn vẫn còn nuối tiếc?", en: "What do you still regret?" },
      { vi: "Bạn định nghĩa 'hạnh phúc' như thế nào?", en: "How do you define happiness?" },
      { vi: "Điều gì khiến bạn cảm thấy cô đơn nhất, kể cả khi ở cạnh người khác?", en: "What makes you feel most lonely, even when surrounded by people?" },
      { vi: "Kỷ niệm nào của tuổi thơ ảnh hưởng nhiều nhất tới bạn?", en: "What childhood memory influenced you the most?" },
      { vi: "Điều bạn muốn người khác nhớ về mình sau khi bạn không còn nữa?", en: "What do you want people to remember about you after you're gone?" },
      { vi: "Điều gì ở bản thân bạn đang cố thay đổi?", en: "What about yourself are you trying to change?" },
      { vi: "Giá trị sống quan trọng nhất với bạn là gì?", en: "What's the most important value in your life?" },
      { vi: "Bạn đã từng mất đi điều gì mà không bao giờ lấy lại được?", en: "Have you ever lost something you could never get back?" },
      { vi: "Điều gì khiến bạn cảm thấy thật sự sống?", en: "What makes you feel truly alive?" },
      { vi: "Lần cuối bạn khóc là khi nào và vì sao?", en: "When was the last time you cried and why?" },
      { vi: "Điều gì bạn ước mình dũng cảm hơn để làm?", en: "What do you wish you were braver about doing?" },
      { vi: "Câu nói hay bài học nào theo bạn suốt cuộc đời?", en: "What quote or lesson has stayed with you throughout your life?" },
      { vi: "Nếu có thể thay đổi một điều về cách bạn được nuôi dạy, đó là gì?", en: "If you could change one thing about how you were raised, what would it be?" },
      { vi: "Điều gì bạn sẽ làm ngay nếu biết chắc mình sẽ không thất bại?", en: "What would you do right now if you knew you couldn't fail?" },
      { vi: "Ai là người đã tin tưởng bạn hơn bạn tin tưởng chính mình?", en: "Who has believed in you more than you believed in yourself?" },
      { vi: "Điều gì trong cuộc sống khiến bạn cảm thấy ý nghĩa nhất?", en: "What in life gives you the most meaning?" },
      { vi: "Bạn đã từng phải đưa ra một quyết định khó khăn mà không có ai giúp chưa?", en: "Have you ever had to make a hard decision without anyone to help?" },
      { vi: "Điều gì bạn ước mình đã dũng cảm hơn để từ bỏ sớm hơn?", en: "What do you wish you had been brave enough to let go of sooner?" },
      { vi: "Bạn có sợ trở thành người bình thường không?", en: "Are you afraid of becoming ordinary?" },
      { vi: "Khi nào bạn cảm thấy thế giới này không công bằng?", en: "When do you feel the world is most unfair?" },
      { vi: "Bạn có bao giờ cảm thấy mình đang sống sai mục tiêu không?", en: "Have you ever felt you were living for the wrong purpose?" },
      { vi: "Bạn học được điều gì quan trọng nhất từ thất bại?", en: "What's the most important thing you've learned from failure?" },
      { vi: "Điều gì bạn sẽ không bao giờ nói với bố/mẹ?", en: "What would you never tell your parents?" },
      { vi: "Điều gì khiến bạn cảm thấy nhỏ bé trước vũ trụ?", en: "What makes you feel small in front of the universe?" },
      { vi: "Bạn đã từng mất đi một phần của bản thân mà không bao giờ lấy lại được?", en: "Have you ever lost a part of yourself you could never get back?" },
      { vi: "Lời khuyên nào bạn nhận được nhưng lúc đó không chịu nghe, sau này mới hiểu?", en: "What advice were you given that you didn't listen to at the time but later understood?" },
      { vi: "Điều gì bạn cảm thấy mình chưa bao giờ thực sự hiểu về bản thân?", en: "What about yourself do you feel you've never truly understood?" },
      { vi: "Bạn xử lý sự cô đơn như thế nào?", en: "How do you deal with loneliness?" },
      { vi: "Điều gì bạn đã hy sinh mà không ai biết?", en: "What have you sacrificed that no one knows about?" },
      { vi: "Nếu bạn có thể xóa một ký ức, bạn xóa ký ức nào?", en: "If you could erase one memory, which would it be?" },
      { vi: "Điều gì bạn còn nợ chính mình?", en: "What do you still owe yourself?" },
      { vi: "Bạn có bao giờ cảm thấy mình đang diễn một vai không phải mình?", en: "Have you ever felt like you were playing a role that wasn't really you?" },
      { vi: "Khoảnh khắc nào trong cuộc đời bạn cảm thấy chậm lại và muốn giữ mãi?", en: "What moment in life made you want to slow down and hold onto forever?" },
      { vi: "Điều gì bạn đã phải chấp nhận dù không muốn?", en: "What have you had to accept even though you didn't want to?" },
      { vi: "Điều gì bạn tự hứa với mình lúc còn nhỏ mà bạn vẫn chưa làm được?", en: "What promise did you make to your younger self that you haven't kept?" },
      { vi: "Khoảnh khắc nào bạn cảm thấy mình thực sự trưởng thành?", en: "What moment made you feel truly grown up?" },
      { vi: "Điều gì bạn thường nói 'không sao' nhưng thực ra rất đau?", en: "What do you often say 'it's fine' about but it actually hurts a lot?" },
      { vi: "Bạn nghĩ điều gì làm cho một cuộc đời có ý nghĩa?", en: "What do you think makes a life meaningful?" },
      { vi: "Nếu bạn có thể trò chuyện với phiên bản 80 tuổi của mình, bạn muốn hỏi gì?", en: "If you could talk to your 80-year-old self, what would you ask?" },
      { vi: "Điều gì bạn sợ mất nhất trong cuộc đời này?", en: "What are you most afraid of losing in this life?" },
      { vi: "Bạn đã từng tha thứ cho ai mà thực sự khó khăn chưa?", en: "Have you ever forgiven someone and it was truly difficult?" },
      { vi: "Điều gì bạn muốn người thân nhất của mình biết nhưng chưa bao giờ nói?", en: "What do you want your closest people to know but have never said?" },
      { vi: "Khi nào bạn cảm thấy mình đang thực sự sống, không chỉ tồn tại?", en: "When do you feel truly alive, not just existing?" },
      { vi: "Điều gì về bản thân bạn vẫn đang cố hiểu?", en: "What about yourself are you still trying to understand?" },
      { vi: "Bạn có bao giờ cảm thấy bị hiểu nhầm bởi người thân không?", en: "Have you ever felt misunderstood by your loved ones?" },
      { vi: "Điều gì bạn cần được nghe nhất lúc này?", en: "What do you most need to hear right now?" },
      { vi: "Nếu được gặp mặt một người đã mất, bạn muốn gặp ai?", en: "If you could meet someone who has passed away, who would it be?" },
      { vi: "Người trong cuộc đời bạn mà bạn cần nói 'cảm ơn' nhiều hơn là ai?", en: "Who in your life do you need to thank more?" },
      { vi: "Khi nào bạn cảm thấy cô đơn nhất?", en: "When do you feel most lonely?" },
      { vi: "Điều gì bạn muốn tha thứ cho bản thân mình?", en: "What do you want to forgive yourself for?" },
      { vi: "Điều gì bạn đã phải học cách chấp nhận dù khó khăn?", en: "What have you had to learn to accept despite it being difficult?" },
    ]
  },
  {
    id: "couple", emoji: "💕", label: "Tình yêu", labelEn: "Relationship", color: "#e05c7c",
    desc: "Câu hỏi về mối quan hệ, cảm xúc lứa đôi",
    questions: [
      { vi: "Khoảnh khắc nào khiến bạn nhận ra mình đang yêu?", en: "What moment made you realize you were in love?" },
      { vi: "Điều gì ở đối phương khiến bạn thích nhất mà chưa bao giờ nói?", en: "What do you love most about your partner that you've never told them?" },
      { vi: "Love language của bạn là gì? Bạn muốn được yêu theo cách nào?", en: "What's your love language? How do you most like to be loved?" },
      { vi: "Kỷ niệm nào của chúng ta mà bạn nhớ nhất?", en: "What's your favorite memory of us together?" },
      { vi: "Nếu một ngày cảm thấy tình cảm nhạt đi, bạn sẽ chọn nói ra hay giữ trong lòng?", en: "If you ever felt our feelings fading, would you speak up or keep it inside?" },
      { vi: "Điều gì bạn muốn mình làm tốt hơn trong mối quan hệ này?", en: "What do you wish you did better in this relationship?" },
      { vi: "Khi cãi nhau, điều gì khiến bạn khó chịu nhất ở bản thân?", en: "When we argue, what bothers you most about yourself?" },
      { vi: "Bạn muốn chúng ta làm gì nhiều hơn trong tương lai?", en: "What would you like us to do more of in the future?" },
      { vi: "Điều gì về mối quan hệ này khiến bạn cảm thấy biết ơn nhất?", en: "What about this relationship are you most grateful for?" },
      { vi: "Nếu phải mô tả tình yêu của chúng ta bằng một màu sắc, đó là màu gì?", en: "If you had to describe our love with a color, what would it be?" },
      { vi: "Bạn thấy mình thay đổi như thế nào kể từ khi có mối quan hệ này?", en: "How do you think you've changed since we've been together?" },
      { vi: "Điều gì ở tôi khiến bạn vẫn chọn ở lại đến hôm nay?", en: "What about me makes you choose to stay?" },
      { vi: "Khi bạn thấy mệt mỏi hoặc stress, bạn muốn tôi làm gì?", en: "When you're tired or stressed, what do you need from me?" },
      { vi: "5 năm nữa, bạn hình dung chúng ta đang ở đâu?", en: "Where do you see us in 5 years?" },
      { vi: "Điều gì bạn muốn tôi hiểu về bạn hơn?", en: "What do you wish I understood better about you?" },
      { vi: "Khoảnh khắc nào bạn cảm thấy chúng ta gần nhau nhất?", en: "When do you feel closest to me?" },
      { vi: "Có điều gì bạn muốn xin lỗi tôi mà chưa nói?", en: "Is there something you want to apologize to me for that you haven't said yet?" },
      { vi: "Một điều nhỏ nhoi nào của tôi khiến bạn mỉm cười?", en: "What's one small thing I do that makes you smile?" },
      { vi: "Điều gì trong mối quan hệ này bạn vẫn chưa hoàn toàn thoải mái chia sẻ?", en: "What's something in our relationship you still don't feel fully comfortable sharing?" },
      { vi: "Nếu phải viết một lá thư gửi cho tôi trong tương lai, bạn sẽ viết gì?", en: "If you had to write me a letter to read in the future, what would it say?" },
      { vi: "Lần đầu tiên bạn nhìn thấy tôi, bạn nghĩ gì?", en: "What did you think when you first saw me?" },
      { vi: "Điều gì về tôi khiến bạn vẫn còn bất ngờ sau tất cả thời gian này?", en: "What about me still surprises you after all this time?" },
      { vi: "Lần cãi nhau nào mà sau này bạn cười về nó?", en: "What fight have we had that you later laughed about?" },
      { vi: "Bạn muốn chúng ta có truyền thống riêng nào?", en: "What traditions do you want us to have together?" },
      { vi: "Điều gì bạn học được từ tôi mà bạn không ngờ?", en: "What have you learned from me that you didn't expect?" },
      { vi: "Khi nào bạn thấy tôi đẹp/đáng yêu nhất?", en: "When do you find me most beautiful/adorable?" },
      { vi: "Bạn muốn chúng ta đi du lịch ở đâu nhất?", en: "Where do you most want us to travel together?" },
      { vi: "Điều gì bạn ước mình đã làm khác đi ở đầu mối quan hệ này?", en: "What do you wish you had done differently at the beginning of our relationship?" },
      { vi: "Khi tôi buồn, điều gì bạn muốn làm nhất cho tôi?", en: "When I'm sad, what do you most want to do for me?" },
      { vi: "Bạn nghĩ mình và tôi giống nhau điều gì nhất?", en: "What do you think we have most in common?" },
      { vi: "Có bao giờ bạn nhìn tôi và nghĩ 'mình may mắn quá' không?", en: "Have you ever looked at me and thought 'I'm so lucky'?" },
      { vi: "Điều gì bạn muốn tôi hiểu khi bạn im lặng?", en: "What do you want me to understand when you're quiet?" },
      { vi: "Bạn muốn chúng ta cùng học điều gì?", en: "What do you want us to learn together?" },
      { vi: "Điều gì bạn thường nghĩ nhưng ngại nói với tôi?", en: "What do you often think but hesitate to tell me?" },
      { vi: "Khi bạn nhớ tôi, thứ đầu tiên bạn nghĩ đến là gì?", en: "When you miss me, what's the first thing that comes to mind?" },
      { vi: "Bạn muốn buổi hẹn hò lý tưởng của chúng ta như thế nào?", en: "What would our ideal date look like?" },
      { vi: "Lần nào bạn cảm thấy tôi thực sự ở bên bạn?", en: "When have you felt I was truly there for you?" },
      { vi: "Bạn mô tả tình cảm của chúng ta với người lạ như thế nào?", en: "How would you describe our relationship to a stranger?" },
      { vi: "Điều gì về tương lai chung của chúng ta bạn hào hứng nhất?", en: "What about our shared future excites you most?" },
      { vi: "Bạn có bao giờ ghen tuông không? Cảm giác đó như thế nào với bạn?", en: "Have you ever been jealous? What does that feel like for you?" },
      { vi: "Khi nào bạn cảm thấy được yêu thương nhất từ phía tôi?", en: "When do you feel most loved by me?" },
      { vi: "Bạn nghĩ mối quan hệ chúng ta có điểm đặc biệt gì?", en: "What do you think is special about our relationship?" },
      { vi: "Điều gì bạn sẽ giữ mãi về tôi dù chuyện gì xảy ra?", en: "What will you always keep about me no matter what?" },
      { vi: "Điều gì bạn cảm ơn tôi nhiều nhất?", en: "What are you most thankful to me for?" },
      { vi: "Khi tôi không ở đây, bạn nhớ điều gì nhất?", en: "When I'm not around, what do you miss most?" },
      { vi: "Bạn muốn tôi nhìn nhận bạn như thế nào?", en: "How do you want me to see you?" },
      { vi: "Lần nào tôi khiến bạn ngạc nhiên theo cách đẹp nhất?", en: "When have I surprised you in the most wonderful way?" },
      { vi: "Bạn có muốn chúng ta có một bài hát riêng không? Nếu có, là bài nào?", en: "Do you want us to have our own song? If so, which one?" },
      { vi: "Điều gì bạn sợ nhất trong mối quan hệ này?", en: "What are you most afraid of in this relationship?" },
      { vi: "Khi nhìn vào mắt tôi, bạn thấy gì?", en: "When you look into my eyes, what do you see?" },
      { vi: "Bạn nghĩ chúng ta sẽ già đi cùng nhau như thế nào?", en: "How do you imagine us growing old together?" },
      { vi: "Khi tôi mệt mỏi, bạn muốn làm gì cho tôi nhất?", en: "When I'm exhausted, what do you most want to do for me?" },
      { vi: "Bạn có nghĩ chúng ta phù hợp nhau không? Tại sao?", en: "Do you think we're a good match? Why?" },
      { vi: "Điều bạn muốn con cái chúng ta (nếu có) thấy ở bố/mẹ là gì?", en: "What do you want our children (if any) to see in their parents?" },
      { vi: "Nếu phải viết một câu mô tả tình yêu của chúng ta, câu đó là gì?", en: "If you had to describe our love in one sentence, what would it be?" },
      { vi: "Bạn có cảm giác khi ở bên tôi như thế nào?", en: "What feeling do you have when you're with me?" },
      { vi: "Điều nào về tôi khiến bạn cảm thấy an toàn?", en: "What about me makes you feel safe?" },
      { vi: "Bạn muốn chúng ta giải quyết mâu thuẫn tốt hơn theo cách nào?", en: "How do you want us to handle conflicts better?" },
      { vi: "Nếu có thể sống lại ngày chúng ta gặp nhau, bạn sẽ thay đổi gì?", en: "If you could relive the day we met, what would you change?" },
      { vi: "Điều gì bạn muốn chúng ta làm ít đi?", en: "What do you want us to do less of?" },
      { vi: "Điều gì bạn muốn thay đổi ở bản thân vì tôi?", en: "What would you change about yourself for me?" },
      { vi: "Bạn thích ngồi im với nhau hay nói chuyện không ngừng?", en: "Do you prefer sitting quietly together or talking non-stop?" },
      { vi: "Điều gì về tôi mà bạn nghĩ thế giới nên biết?", en: "What about me do you think the world should know?" },
      { vi: "Bạn muốn tôi làm gì khi bạn đang tức giận?", en: "What do you want me to do when you're angry?" },
      { vi: "Nếu có thể tặng cho tôi bất cứ điều gì, bạn tặng gì?", en: "If you could give me anything, what would you give?" },
      { vi: "Câu nói nào của tôi bạn sẽ nhớ mãi?", en: "What's something I said that you'll always remember?" },
    ]
  },
  {
    id: "funny", emoji: "😂", label: "Vô tri", labelEn: "Funny", color: "#7ed321",
    desc: "Câu hỏi hài hước, ngốc nghếch, cười không ngừng",
    questions: [
      { vi: "Nếu em là con gián thì anh có yêu em không?", en: "If I were a cockroach, would you still love me?" },
      { vi: "Nếu chúng ta là hai nhân vật trong phim hoạt hình, chúng ta là ai?", en: "If we were cartoon characters, which two would we be?" },
      { vi: "Điều kỳ quặc nhất bạn làm khi không có ai nhìn là gì?", en: "What's the weirdest thing you do when no one is watching?" },
      { vi: "Bạn có bao giờ nói chuyện với thú cưng (hoặc đồ vật) không?", en: "Have you ever talked to a pet or an inanimate object? What did you say?" },
      { vi: "Nếu cuộc đời bạn có nhạc nền, bài gì sẽ phát lúc này?", en: "If your life had a soundtrack right now, what song would be playing?" },
      { vi: "Kỹ năng vô dụng nhất bạn có là gì?", en: "What's the most useless skill you have?" },
      { vi: "Điều ngốc nghếch nhất bạn từng tin hồi còn nhỏ là gì?", en: "What's the most ridiculous thing you believed as a kid?" },
      { vi: "Nếu được chọn một vũ khí trong zombie apocalypse, bạn chọn gì?", en: "If you had to pick one weapon in a zombie apocalypse, what would it be?" },
      { vi: "Nếu chúng ta bị kẹt trong thang máy 3 tiếng, bạn sẽ làm gì?", en: "If we were stuck in an elevator for 3 hours, what would you do?" },
      { vi: "Bạn từng làm điều gì xấu hổ mà vẫn chưa kể ai?", en: "What's something embarrassing you did that you've never told anyone?" },
      { vi: "Nếu gia đình bạn là một loại đồ ăn, đó là món gì?", en: "If your family were a type of food, what would they be?" },
      { vi: "Tật xấu buồn cười nhất của bạn là gì?", en: "What's your funniest bad habit?" },
      { vi: "Câu chuyện bịa đặt nhất bạn từng kể mà người khác tin là gì?", en: "What's the most ridiculous lie you told that someone actually believed?" },
      { vi: "Bạn nghĩ mình trong mắt người lạ trông như người thế nào?", en: "What do you think you look like to strangers at first glance?" },
      { vi: "Nếu AI viết tiểu thuyết về cuộc đời bạn, tựa đề sẽ là gì?", en: "If AI wrote a novel about your life, what would the title be?" },
      { vi: "Bạn bao giờ ngủ quên trên xe và dậy không biết mình đang ở đâu chưa?", en: "Have you ever fallen asleep on a vehicle and woken up not knowing where you were?" },
      { vi: "Nếu ai đó đọc lịch sử tìm kiếm Google của bạn, họ sẽ nghĩ gì?", en: "If someone read your Google search history, what would they think?" },
      { vi: "Bạn đã bao giờ gửi nhầm tin nhắn chưa? Chuyện gì xảy ra?", en: "Have you ever sent a text to the wrong person? What happened?" },
      { vi: "Nếu bạn là một món ăn đặc biệt của Việt Nam, bạn là món gì?", en: "If you were a Vietnamese specialty dish, what would you be?" },
      { vi: "Bạn đã bao giờ thử nấu ăn và thất bại thảm hại chưa? Kể đi!", en: "Have you ever tried cooking and failed miserably? Tell me!" },
      { vi: "Nếu bạn có thể swap cuộc đời với một nhân vật phim hoạt hình, bạn chọn ai?", en: "If you could swap lives with a cartoon character, who would you choose?" },
      { vi: "Điều buồn cười nhất xảy ra với bạn tuần này là gì?", en: "What's the funniest thing that happened to you this week?" },
      { vi: "Bạn có talent bí mật không? (dù vô dụng cũng được!)", en: "Do you have a secret talent? (even if useless!)" },
      { vi: "Bạn đã từng bị bắt gặp đang hát một mình chưa?", en: "Have you ever been caught singing alone?" },
      { vi: "Nếu nhà bạn bị ma ám, bạn sẽ làm gì đầu tiên?", en: "If your house were haunted, what would you do first?" },
      { vi: "Thứ kỳ lạ nhất bạn đã mua mà không biết tại sao là gì?", en: "What's the strangest thing you've bought without knowing why?" },
      { vi: "Nếu bạn là một loại côn trùng, bạn sẽ là gì và tại sao?", en: "If you were an insect, what would you be and why?" },
      { vi: "Cái tên biệt danh ngốc nghếch nhất bạn có là gì?", en: "What's the most ridiculous nickname you've had?" },
      { vi: "Bạn có thể sống sót trong một ngôi nhà không có wifi không?", en: "Could you survive in a house with no wifi?" },
      { vi: "Thói quen ăn uống kỳ lạ nhất của bạn là gì?", en: "What's your weirdest eating habit?" },
      { vi: "Bạn đã bao giờ nói lảm nhảm trong khi ngủ chưa? Nói gì?", en: "Have you ever talked in your sleep? What did you say?" },
      { vi: "Nếu bạn là thám tử, tên thám tử của bạn là gì?", en: "If you were a detective, what would your detective name be?" },
      { vi: "Điều ngốc nghếch nhất bạn đã googled trong đêm khuya là gì?", en: "What's the most ridiculous thing you've Googled late at night?" },
      { vi: "Nếu cả gia đình bạn là một ban nhạc, ai đóng vai gì?", en: "If your whole family were a band, who would play what role?" },
      { vi: "Bạn có thể ăn bao nhiêu bánh mì liên tiếp nếu không bị phán xét?", en: "How many bánh mì could you eat in a row if no one judged you?" },
      { vi: "Tình huống awkward nhất bạn từng gặp khi hẹn hò là gì?", en: "What's the most awkward situation you've encountered on a date?" },
      { vi: "Nếu bạn có thể dạy thú cưng làm một việc, bạn dạy gì?", en: "If you could teach a pet to do one thing, what would it be?" },
      { vi: "Điều gì bạn đã bao giờ nói với gương mà bạn không dám nói với người khác?", en: "What have you said to a mirror that you wouldn't say to another person?" },
      { vi: "Nếu bạn là superhero nhưng có superpower vô dụng, đó là gì?", en: "If you were a superhero with a useless superpower, what would it be?" },
      { vi: "Bạn có thể mô tả bản thân bằng ba từ mà mẹ bạn dùng không?", en: "Could you describe yourself using three words your mom would use?" },
    ]
  },
  {
    id: "future", emoji: "🔮", label: "Tương lai", labelEn: "Future", color: "#9b59b6",
    desc: "Câu hỏi về ước mơ, kế hoạch, bucket list",
    questions: [
      { vi: "3 điều bạn muốn thực hiện được trước tuổi 30/40 là gì?", en: "What are 3 things you want to accomplish before you turn 30/40?" },
      { vi: "Nếu tiền không phải vấn đề, bạn sẽ làm gì mỗi ngày?", en: "If money were no object, what would you do every day?" },
      { vi: "Bạn muốn học điều gì mà chưa bao giờ có thời gian?", en: "What's something you've always wanted to learn but never had time for?" },
      { vi: "Nơi nào trên thế giới bạn nhất định phải đến một lần?", en: "What's one place in the world you absolutely must visit?" },
      { vi: "Nếu có thể thay đổi một điều trong thế giới, bạn thay đổi gì?", en: "If you could change one thing about the world, what would it be?" },
      { vi: "Ước mơ lớn nhất mà bạn vẫn chưa dám nói to với ai?", en: "What's your biggest dream that you haven't dared to say out loud?" },
      { vi: "Bạn hình dung ngôi nhà mơ ước của mình trông như thế nào?", en: "What does your dream home look like?" },
      { vi: "Điều gì trên bucket list chung mà bạn muốn chúng ta làm nhất?", en: "What's on our shared bucket list that you most want us to do?" },
      { vi: "Nếu bạn có thể trở lại tuổi 18 và chọn một con đường khác, đó là gì?", en: "If you could go back to 18 and choose a different path, what would it be?" },
      { vi: "Phiên bản tốt nhất của bản thân trong tương lai trông như thế nào?", en: "What does the best version of your future self look like?" },
      { vi: "Bạn muốn con cái (nếu có) kế thừa điều gì nhất từ bạn?", en: "What do you most want to pass on to your children (if any)?" },
      { vi: "Điều gì bạn muốn nhìn lại và nói 'mình đã làm được' sau 10 năm?", en: "What do you want to look back on in 10 years and say 'I did it'?" },
      { vi: "Bạn muốn để lại di sản gì cho đời?", en: "What legacy do you want to leave behind?" },
      { vi: "Nếu được sống một cuộc đời hoàn toàn khác, bạn sẽ chọn cuộc đời nào?", en: "If you could live a completely different life, what would it be?" },
      { vi: "Kỹ năng nào bạn muốn học để hỗ trợ mối quan hệ của chúng ta?", en: "What skill do you want to learn to better support our relationship?" },
      { vi: "Bạn hình dung buổi sáng lý tưởng khi về già sẽ như thế nào?", en: "What does your ideal morning in old age look like?" },
      { vi: "Nghề nghiệp nào bạn thầm mong muốn dù biết khó thực hiện?", en: "What career do you secretly wish for even if it's hard to achieve?" },
      { vi: "Bạn muốn mình nổi tiếng vì điều gì?", en: "What would you want to be known for?" },
      { vi: "Điều gì bạn chắc chắn sẽ làm trong năm tới?", en: "What are you certain you'll do in the next year?" },
      { vi: "Nếu bạn có thể tạo ra một sản phẩm, đó là sản phẩm gì?", en: "If you could create any product, what would it be?" },
      { vi: "Bạn muốn học thêm ngôn ngữ nào và tại sao?", en: "What language would you want to learn and why?" },
      { vi: "Bạn muốn trải nghiệm điều gì ít nhất một lần trước khi chết?", en: "What do you want to experience at least once before you die?" },
      { vi: "Bạn nghĩ cuộc sống 10 năm nữa sẽ thay đổi thế nào?", en: "How do you think life will change in 10 years?" },
      { vi: "Điều gì bạn muốn dạy cho thế hệ sau?", en: "What do you want to teach to the next generation?" },
      { vi: "Nếu có thể tạo ra một ứng dụng, đó là ứng dụng gì?", en: "If you could create any app, what would it be?" },
      { vi: "Bạn muốn về hưu ở đâu?", en: "Where do you want to retire?" },
      { vi: "Điều gì bạn muốn làm mà chưa dám bắt đầu?", en: "What do you want to do that you haven't dared to start?" },
      { vi: "Nếu bạn viết một cuốn sách, đó là sách về gì?", en: "If you wrote a book, what would it be about?" },
      { vi: "Bạn muốn kỷ niệm gì đặc biệt nhất với chúng ta trong 5 năm tới?", en: "What special memory do you want to create with us in the next 5 years?" },
      { vi: "Điều gì bạn muốn bỏ lại phía sau khi bước vào chương mới của cuộc đời?", en: "What do you want to leave behind as you enter a new chapter of life?" },
      { vi: "Bạn muốn trở thành phiên bản tốt hơn của mình ở điểm nào nhất?", en: "Which aspect of yourself do you most want to improve?" },
      { vi: "Kế hoạch nào bạn đang ấp ủ mà chưa kể ai?", en: "What plan are you holding onto that you haven't told anyone?" },
      { vi: "Bạn muốn bước sang tuổi 50 với điều gì trong tay?", en: "What do you want to have in your hands when you turn 50?" },
      { vi: "Điều gì bạn chắc chắn mình sẽ không hối hận khi làm?", en: "What are you sure you won't regret doing?" },
      { vi: "Bạn muốn con cháu kể gì về bạn?", en: "What do you want your grandchildren to say about you?" },
      { vi: "Nếu bạn biết chắc mình sẽ không thất bại, bạn sẽ thử điều gì ngay ngày mai?", en: "If you knew for sure you wouldn't fail, what would you try tomorrow?" },
      { vi: "Điều gì bạn tin sẽ không bao giờ thay đổi ở bạn dù thời gian trôi qua?", en: "What do you believe will never change about you no matter how much time passes?" },
      { vi: "Bạn muốn học một kỹ năng gì để giúp ích cho người khác?", en: "What skill do you want to learn to help others?" },
      { vi: "Nếu bạn có thể làm tình nguyện cho tổ chức nào, đó là tổ chức gì?", en: "If you could volunteer for any organization, what would it be?" },
      { vi: "Nhà lý tưởng của bạn ở đâu và trông như thế nào?", en: "Where and what does your dream home look like?" },
    ]
  },
  {
    id: "gratitude", emoji: "🙏", label: "Biết ơn", labelEn: "Gratitude", color: "#e67e22",
    desc: "Câu hỏi về sự biết ơn, trân trọng",
    questions: [
      { vi: "Điều bạn biết ơn nhất hôm nay là gì?", en: "What are you most grateful for today?" },
      { vi: "Ai là người ảnh hưởng lớn nhất đến cuộc đời bạn?", en: "Who has had the biggest influence on your life?" },
      { vi: "Điều nhỏ nhoi nào của đối phương khiến bạn cảm thấy được yêu?", en: "What small thing does your partner do that makes you feel loved?" },
      { vi: "Lần nào ai đó giúp bạn mà bạn không bao giờ quên?", en: "When did someone help you in a way you'll never forget?" },
      { vi: "Điều gì trong ngày hôm nay khiến bạn mỉm cười?", en: "What made you smile today?" },
      { vi: "Bạn trân trọng điều gì về bản thân mình nhất?", en: "What do you appreciate most about yourself?" },
      { vi: "3 điều bạn yêu ở đối phương mà bạn muốn họ biết ngay hôm nay?", en: "3 things you love about your partner that you want them to know right now?" },
      { vi: "Khoảnh khắc hạnh phúc đơn giản nhất gần đây của bạn là gì?", en: "What's been your simplest, most happy moment recently?" },
      { vi: "Điều gì ở cuộc sống hiện tại mà bạn nghĩ mình đang coi nhẹ?", en: "What in your current life do you think you're taking for granted?" },
      { vi: "Câu nói của ai đó từng cứu bạn vào lúc khó khăn?", en: "Whose words once saved you in a difficult moment?" },
      { vi: "Bạn biết ơn điều gì về cơ thể của mình?", en: "What about your body are you grateful for?" },
      { vi: "Ai là người đã giúp bạn trong lúc khó khăn nhất mà bạn muốn cảm ơn ngay lúc này?", en: "Who helped you most in your hardest moment that you want to thank right now?" },
      { vi: "Điều nhỏ nhặt nào trong ngày hôm nay khiến bạn biết ơn?", en: "What small thing today are you grateful for?" },
      { vi: "Bạn biết ơn điều gì về giai đoạn khó khăn bạn đã trải qua?", en: "What about a difficult period you've been through are you grateful for?" },
      { vi: "Có người nào mà bạn chưa kịp nói 'cảm ơn' không?", en: "Is there someone you haven't gotten to thank yet?" },
      { vi: "Điều gì về bữa cơm gia đình khiến bạn trân trọng?", en: "What about family meals makes you appreciate them?" },
      { vi: "Bạn biết ơn điều gì ở người bạn thân nhất?", en: "What about your closest friend are you most grateful for?" },
      { vi: "Một kỷ niệm nào mà bạn biết ơn vì đã được trải qua?", en: "What memory are you grateful to have experienced?" },
      { vi: "Điều gì trong thiên nhiên làm bạn cảm thấy biết ơn khi nhìn thấy?", en: "What in nature makes you feel grateful when you see it?" },
      { vi: "Bạn trân trọng điều gì về cuộc sống mà 5 năm trước bạn không nghĩ tới?", en: "What in life do you appreciate now that you didn't think about 5 years ago?" },
      { vi: "Điều gì về âm nhạc hoặc nghệ thuật khiến bạn biết ơn chúng tồn tại?", en: "What about music or art makes you grateful they exist?" },
      { vi: "Bạn biết ơn điều gì về gia đình mình dù không hoàn hảo?", en: "What about your family are you grateful for despite imperfections?" },
      { vi: "Khoảnh khắc nào trong tuần qua mà bạn muốn chụp lại và giữ mãi?", en: "What moment this past week would you want to photograph and keep forever?" },
      { vi: "Bạn biết ơn điều gì đã học được từ một người bạn không ưa?", en: "What have you learned from someone you didn't like that you're grateful for?" },
      { vi: "Nếu phải nói 'cảm ơn' với cuộc đời bằng một câu, bạn nói gì?", en: "If you had to say 'thank you' to life in one sentence, what would you say?" },
      { vi: "Điều gì về thời gian yên tĩnh một mình khiến bạn biết ơn?", en: "What about quiet alone time are you grateful for?" },
      { vi: "Bạn biết ơn điều gì về công nghệ giúp bạn kết nối với người thân?", en: "What technology are you grateful for that helps you connect with loved ones?" },
      { vi: "Điều gì về những thất bại của bạn mà bạn thực sự biết ơn?", en: "What about your failures are you truly grateful for?" },
      { vi: "Bạn trân trọng điều gì ở bản thân mà trước đây bạn coi là điểm yếu?", en: "What about yourself do you now treasure that you used to see as a weakness?" },
      { vi: "Nếu hôm nay là ngày cuối cùng, bạn sẽ cảm ơn ai và vì điều gì?", en: "If today were your last day, who would you thank and for what?" },
      { vi: "Điều gì về ngôn ngữ tiếng Việt của mình mà bạn yêu thích?", en: "What about the Vietnamese language do you love?" },
      { vi: "Bạn biết ơn điều gì về người đã dạy bạn bài học quan trọng nhất?", en: "What about the person who taught you your most important lesson are you grateful for?" },
      { vi: "Bạn biết ơn điều gì về sức khỏe của mình mà hay quên trân trọng?", en: "What about your health do you often forget to be grateful for?" },
      { vi: "Điều gì về con người Việt Nam mà bạn tự hào và biết ơn?", en: "What about Vietnamese people makes you proud and grateful?" },
      { vi: "Điều nhỏ nào trong cuộc sống hằng ngày bạn đang dần nhận ra giá trị của nó?", en: "What small daily thing are you slowly realizing the value of?" },
    ]
  },
  {
    id: "challenge", emoji: "🎯", label: "Thử thách", labelEn: "Challenge", color: "#1abc9c",
    desc: "Thử thách hành động, không chỉ trả lời",
    questions: [
      { vi: "Hãy kể điều bạn chưa bao giờ nói với đối phương — ngay lúc này!", en: "Tell your partner something you've never told them before — right now!" },
      { vi: "Nói 3 điều bạn yêu về vẻ ngoài của đối phương.", en: "Say 3 things you love about your partner's appearance." },
      { vi: "Hát hoặc đọc một đoạn bài hát mà bạn nghĩ đến khi nghĩ về đối phương.", en: "Sing or recite part of a song that reminds you of your partner." },
      { vi: "Vẽ khuôn mặt đối phương trong 60 giây và gửi ảnh cho họ xem!", en: "Draw your partner's face in 60 seconds and send them the photo!" },
      { vi: "Giả vờ bạn là người dẫn chương trình giới thiệu đối phương — giới thiệu đi!", en: "Pretend you're a TV host introducing your partner — go!" },
      { vi: "Nhắn một tin nhắn dễ thương cho đối phương ngay lúc này, không cần lý do.", en: "Send your partner a sweet message right now, no reason needed." },
      { vi: "Kể một kỷ niệm của chúng ta từ góc nhìn của bạn, chi tiết nhất có thể.", en: "Tell one of our memories from your perspective, in as much detail as possible." },
      { vi: "Tả mùi bạn nhớ nhất về đối phương — không được dùng từ 'nước hoa'!", en: "Describe the smell you associate most with your partner — can't say 'perfume'!" },
      { vi: "Dành 60 giây để nói liên tục những điều bạn thích ở đối phương.", en: "Spend 60 seconds listing things you like about your partner non-stop." },
      { vi: "Cho đối phương xem 3 ảnh trong điện thoại có ý nghĩa với bạn và giải thích.", en: "Show your partner 3 photos on your phone that mean something to you and explain why." },
      { vi: "Nhắn cho bố/mẹ hoặc người thân một tin nhắn yêu thương ngay bây giờ.", en: "Send a loving message to a parent or family member right now." },
      { vi: "Kể về ngày tệ nhất trong tuần của bạn — không được giấu đi điều gì.", en: "Tell me about your worst day this week — without hiding anything." },
      { vi: "Nói với tôi điều bạn thường không nói vì sợ tôi lo lắng.", en: "Tell me something you usually don't say because you're afraid I'll worry." },
      { vi: "Thực hiện một cử chỉ âu yếm dành cho đối phương trong 30 giây không nói gì.", en: "Perform a loving gesture toward your partner for 30 seconds without words." },
      { vi: "Kể về lần bạn cảm thấy cô đơn nhất và bạn đã làm gì.", en: "Tell me about when you felt loneliest and what you did." },
      { vi: "Hãy nói 'Tôi yêu em/anh' theo 5 cách khác nhau trong 60 giây.", en: "Say 'I love you' in 5 different ways in 60 seconds." },
      { vi: "Cho tôi xem ảnh đẹp nhất trên điện thoại bạn và giải thích tại sao bạn giữ nó.", en: "Show me the most beautiful photo on your phone and explain why you kept it." },
      { vi: "Miêu tả người ngồi trước mặt bạn như một nhân vật tiểu thuyết.", en: "Describe the person in front of you as if they were a novel character." },
      { vi: "Hãy cùng nhau viết một câu chuyện ngắn — mỗi người nói một câu.", en: "Let's write a short story together — each person says one sentence at a time." },
      { vi: "Cho đối phương xem playlist nghe nhiều nhất gần đây và giải thích tại sao.", en: "Show your partner your most-listened playlist lately and explain why." },
      { vi: "Hãy chia sẻ một bí mật nhỏ mà bạn chưa từng kể với bất kỳ ai.", en: "Share a small secret you've never told anyone." },
      { vi: "Tặng cho đối phương một 'danh hiệu' hài hước phù hợp với họ.", en: "Give your partner a funny 'title' that suits them perfectly." },
      { vi: "Cùng lên kế hoạch một buổi hẹn hò bất ngờ trong 5 phút.", en: "Together, plan a surprise date in the next 5 minutes." },
      { vi: "Hãy nói điều bạn ghét nhất và yêu nhất về bản thân mình.", en: "Say the thing you hate most and love most about yourself." },
      { vi: "Viết câu trả lời cho 'Tôi cần bạn biết rằng...' và đọc to lên.", en: "Write your answer to 'I need you to know that...' and read it aloud." },
      { vi: "Đặt điện thoại xuống 10 phút và chỉ nhìn vào mắt nhau.", en: "Put down your phones for 10 minutes and just look into each other's eyes." },
      { vi: "Cùng hứa với nhau một điều trước khi kết thúc cuộc trò chuyện này.", en: "Make a promise to each other before ending this conversation." },
      { vi: "Gọi cho một người bạn lâu không liên lạc và nói 'Tao/tôi nhớ mày/bạn'.", en: "Call someone you haven't spoken to in a while and say 'I miss you.'" },
      { vi: "Trao cho đối phương một vật gì đó trong túi/tay với ý nghĩa đặc biệt.", en: "Give your partner something from your bag/hands with a special meaning." },
      { vi: "Hãy kể điều bạn chưa bao giờ dám thừa nhận với chính mình, giờ nói to lên đi.", en: "Tell me something you've never dared to admit to yourself — say it out loud now." },
    ]
  },
  {
    id: "family", emoji: "🏠", label: "Gia đình", labelEn: "Family", color: "#c0392b",
    desc: "Câu hỏi về gia đình, tuổi thơ, nguồn cội",
    questions: [
      { vi: "Người trong gia đình ảnh hưởng lớn nhất đến con người bạn là ai?", en: "Who in your family has influenced who you are the most?" },
      { vi: "Điều bạn học được từ bố/mẹ mà bạn sẽ truyền lại cho con?", en: "What have you learned from your parents that you'll pass on to your children?" },
      { vi: "Kỷ niệm gia đình vui nhất mà bạn nhớ mãi là gì?", en: "What's the happiest family memory you'll always remember?" },
      { vi: "Có điều gì bạn muốn nói với bố/mẹ mà chưa dám nói không?", en: "Is there something you want to tell your parents but haven't dared to?" },
      { vi: "Bạn và anh/chị/em trong nhà có thân thiết không? Điều gì kết nối bạn nhất?", en: "Are you close with your siblings? What connects you most?" },
      { vi: "Truyền thống gia đình nào bạn muốn giữ mãi?", en: "What family tradition do you want to keep forever?" },
      { vi: "Điều gì về bố/mẹ khiến bạn tự hào nhất?", en: "What about your parents makes you most proud?" },
      { vi: "Bạn có muốn nuôi con khác bố/mẹ bạn đã nuôi bạn không?", en: "Do you want to raise children differently from how your parents raised you?" },
      { vi: "Kỷ niệm Tết nào đẹp nhất trong ký ức của bạn?", en: "What's the most beautiful Tết memory in your mind?" },
      { vi: "Người trong gia đình mà bạn giống nhất là ai?", en: "Who in your family are you most similar to?" },
      { vi: "Điều gì về gia đình bạn mà người ngoài thường không hiểu?", en: "What about your family do outsiders often not understand?" },
      { vi: "Bạn có thói quen nào được truyền từ gia đình?", en: "What habits have been passed down from your family?" },
      { vi: "Nếu có thể ngồi ăn với cả gia đình ngay lúc này, bạn muốn nói gì?", en: "If you could sit and eat with your whole family right now, what would you say?" },
      { vi: "Bạn nghĩ gia đình lý tưởng của mình trong tương lai trông như thế nào?", en: "What does your ideal family look like in the future?" },
      { vi: "Điều gì về bố hoặc mẹ mà bạn chỉ nhận ra khi lớn lên?", en: "What about your mom or dad did you only realize when you grew up?" },
      { vi: "Bạn muốn con cái của mình kế thừa điều gì từ gia đình bạn?", en: "What do you want your children to inherit from your family?" },
      { vi: "Có kỷ niệm nào với ông bà mà bạn trân trọng mãi không?", en: "Is there a memory with your grandparents that you'll always treasure?" },
      { vi: "Bạn nghĩ điều gì làm cho một gia đình hạnh phúc?", en: "What do you think makes a family happy?" },
      { vi: "Điều gì bạn ước gia đình mình đã làm nhiều hơn khi bạn còn nhỏ?", en: "What do you wish your family had done more of when you were young?" },
      { vi: "Nếu bạn có thể gặp một thành viên gia đình đã mất, bạn sẽ nói gì?", en: "If you could meet a deceased family member, what would you say?" },
      { vi: "Ký ức về một bữa cơm gia đình mà bạn sẽ không quên là gì?", en: "What memory of a family meal will you never forget?" },
      { vi: "Bạn nghĩ vai trò của bạn trong gia đình là gì?", en: "What do you think your role in the family is?" },
      { vi: "Điều gì bố/mẹ nói với bạn mà bạn nhớ mãi đến giờ?", en: "What did your parents say to you that you still remember today?" },
      { vi: "Bạn muốn kế thừa điều gì và không muốn kế thừa điều gì từ gia đình?", en: "What do you want and don't want to inherit from your family?" },
      { vi: "Nếu cả gia đình cùng làm một điều, bạn muốn làm gì?", en: "If your whole family could do one thing together, what would it be?" },
      { vi: "Bạn có hay nói 'yêu' với bố mẹ trực tiếp không?", en: "Do you often say 'I love you' directly to your parents?" },
      { vi: "Điều gì khiến gia đình bạn đặc biệt so với gia đình khác?", en: "What makes your family special compared to others?" },
      { vi: "Có điều gì về cách nuôi dạy của bố/mẹ mà bạn biết ơn nhưng hồi nhỏ không hiểu?", en: "Is there something about how your parents raised you that you're grateful for but didn't understand as a child?" },
      { vi: "Nếu bạn có thể tặng cho cả gia đình một chuyến đi, bạn sẽ đưa họ đến đâu?", en: "If you could give your whole family a trip, where would you take them?" },
      { vi: "Khi ở nhà với gia đình, bạn thường làm gì nhất?", en: "When home with family, what do you usually do most?" },
      { vi: "Điều gì về quê hương của bạn mà bạn muốn con cái biết?", en: "What about your hometown do you want your children to know?" },
      { vi: "Bạn có định sẽ chăm sóc bố mẹ khi về già không?", en: "Do you plan to care for your parents in their old age?" },
      { vi: "Điều gì làm bạn cảm thấy 'về nhà' ngay cả khi không ở nhà?", en: "What makes you feel 'home' even when you're not at home?" },
      { vi: "Nếu cả gia đình bạn là một bộ phim, đó sẽ là thể loại phim gì?", en: "If your whole family were a movie, what genre would it be?" },
      { vi: "Điều bạn muốn bố/mẹ tự hào về bạn nhất là gì?", en: "What do you most want your parents to be proud of you for?" },
    ]
  },
  {
    id: "work", emoji: "💼", label: "Công việc", labelEn: "Work & Ambition", color: "#2980b9",
    desc: "Câu hỏi về sự nghiệp, tham vọng, cân bằng",
    questions: [
      { vi: "Điều gì khiến bạn thực sự hứng thú trong công việc?", en: "What genuinely excites you about your work?" },
      { vi: "Khoảnh khắc nào trong sự nghiệp bạn cảm thấy tự hào nhất?", en: "What career moment are you most proud of?" },
      { vi: "Nếu tiền không thành vấn đề, bạn sẽ làm công việc gì?", en: "If money weren't an issue, what work would you do?" },
      { vi: "Người mentor/sếp nào đã ảnh hưởng lớn nhất đến sự nghiệp bạn?", en: "Which mentor/boss has influenced your career the most?" },
      { vi: "Thất bại trong công việc nào dạy bạn nhiều nhất?", en: "What work failure taught you the most?" },
      { vi: "Bạn nghĩ sự cân bằng công việc – cuộc sống của mình hiện tại như thế nào?", en: "How do you feel about your current work-life balance?" },
      { vi: "Điều gì bạn ước mình được học trước khi bắt đầu sự nghiệp?", en: "What do you wish you had learned before starting your career?" },
      { vi: "Nếu có thể thay đổi một điều trong môi trường làm việc, bạn thay đổi gì?", en: "If you could change one thing about your work environment, what would it be?" },
      { vi: "Bạn thích làm việc độc lập hay làm việc nhóm?", en: "Do you prefer working independently or in a team?" },
      { vi: "Điều gì về công việc khiến bạn muốn trốn tránh nhất?", en: "What about work do you most want to avoid?" },
      { vi: "Bạn có bao giờ cảm thấy 'đốt cháy' (burnout) chưa? Bạn đã làm gì?", en: "Have you ever felt burned out? What did you do?" },
      { vi: "Kỹ năng nào bạn muốn phát triển trong năm tới?", en: "What skill do you want to develop in the next year?" },
      { vi: "Bạn thích làm việc ở văn phòng, tại nhà hay quán cà phê?", en: "Do you prefer working in an office, at home, or at a café?" },
      { vi: "Điều gì bạn muốn đồng nghiệp nhớ về bạn?", en: "What do you want your colleagues to remember you for?" },
      { vi: "Nếu bạn có thể khởi nghiệp ngay ngày mai, bạn làm gì?", en: "If you could start a business tomorrow, what would it be?" },
      { vi: "Điều gì bạn chưa dám thử trong sự nghiệp?", en: "What haven't you dared to try in your career?" },
      { vi: "Bạn định nghĩa thành công trong sự nghiệp như thế nào?", en: "How do you define success in your career?" },
      { vi: "Có lúc nào bạn nghi ngờ con đường sự nghiệp của mình không?", en: "Have you ever doubted your career path?" },
      { vi: "Bạn có hay mang công việc về nhà trong đầu không?", en: "Do you often bring work home in your head?" },
      { vi: "Điều gì về ngành nghề của bạn mà bạn muốn người khác hiểu hơn?", en: "What about your profession do you wish people understood better?" },
      { vi: "Nếu có thể làm việc ở bất cứ đâu trên thế giới, bạn chọn đâu?", en: "If you could work anywhere in the world, where would you choose?" },
      { vi: "Thứ gì trong công việc khiến bạn mất ngủ nhất?", en: "What about work keeps you up at night?" },
      { vi: "Điều gì bạn chưa nói với sếp mà bạn muốn nói?", en: "What haven't you told your boss that you wish you could?" },
      { vi: "Bạn có tin mình đang đúng ngành không?", en: "Do you believe you're in the right field?" },
      { vi: "Điều gì bạn làm trong công việc mà người khác không nhìn thấy nhưng bạn biết quan trọng?", en: "What do you do at work that others don't see but you know matters?" },
      { vi: "Nếu có thể thay đổi nghề nghiệp ngay bây giờ, bạn sẽ làm gì?", en: "If you could change careers right now, what would you do?" },
      { vi: "Câu chuyện thành công nhỏ nào trong công việc mà bạn chưa kể ai?", en: "What small work success story have you never told anyone?" },
      { vi: "Bạn muốn 5 năm nữa mình đang ở đâu trong sự nghiệp?", en: "Where do you want to be in your career 5 years from now?" },
      { vi: "Điều gì khiến bạn tiếp tục đi làm mỗi ngày?", en: "What keeps you going to work every day?" },
      { vi: "Bạn có thể làm việc mà không cần ai công nhận không?", en: "Could you do your job without anyone recognizing it?" },
      { vi: "Thứ gì về sếp/môi trường làm việc hiện tại bạn biết ơn?", en: "What about your boss/current work environment are you grateful for?" },
      { vi: "Bạn nghĩ AI sẽ thay đổi công việc của bạn như thế nào?", en: "How do you think AI will change your work?" },
      { vi: "Điều gì bạn muốn để lại trong ngành nghề của mình?", en: "What do you want to leave behind in your field?" },
      { vi: "Nếu có thể thuê người giúp một việc trong công việc, bạn muốn thuê ai làm gì?", en: "If you could hire someone to help with one work task, what would it be?" },
      { vi: "Bạn nghĩ mình sẽ làm công việc này thêm bao nhiêu năm?", en: "How many more years do you think you'll do this job?" },
    ]
  },
  {
    id: "self", emoji: "🔍", label: "Khám phá bản thân", labelEn: "Self-Discovery", color: "#8e44ad",
    desc: "Câu hỏi đào sâu nội tâm, tự nhận thức",
    questions: [
      { vi: "Điều gì về bản thân bạn luôn luôn không thay đổi dù qua bao nhiêu năm?", en: "What about you has always stayed the same no matter how many years have passed?" },
      { vi: "Bạn nghĩ mình đang thiếu gì để trở thành người bạn muốn?", en: "What do you think you're missing to become the person you want to be?" },
      { vi: "Nếu phải mô tả bản thân bằng 3 từ, đó là những từ gì?", en: "If you had to describe yourself in 3 words, what would they be?" },
      { vi: "Khi nào bạn cảm thấy mình là phiên bản tốt nhất?", en: "When do you feel like your best self?" },
      { vi: "Điều gì bạn làm tốt hơn hầu hết mọi người mà ít ai biết?", en: "What do you do better than most people that few know about?" },
      { vi: "Bạn xử lý sự tức giận như thế nào?", en: "How do you handle anger?" },
      { vi: "Điều gì kích hoạt (trigger) bạn nhiều nhất?", en: "What triggers you the most?" },
      { vi: "Bạn thường tự an ủi bản thân như thế nào khi buồn?", en: "How do you usually comfort yourself when sad?" },
      { vi: "Nếu bạn là một cuốn sách, bạn là thể loại gì và tựa đề là gì?", en: "If you were a book, what genre would it be and what would the title be?" },
      { vi: "Điều gì bạn đang cố gắng thay đổi ở bản thân gần đây?", en: "What about yourself are you trying to change lately?" },
      { vi: "Bạn có xu hướng đưa ra quyết định bằng lý trí hay cảm xúc hơn?", en: "Do you tend to make decisions more with logic or emotion?" },
      { vi: "Điều gì khiến bạn cảm thấy được nhìn nhận và tôn trọng?", en: "What makes you feel seen and respected?" },
      { vi: "Bạn xử lý thất vọng như thế nào?", en: "How do you deal with disappointment?" },
      { vi: "Điều gì về bản thân bạn vẫn đang cố hiểu?", en: "What about yourself are you still trying to understand?" },
      { vi: "Khi nào bạn khó tin tưởng người khác nhất?", en: "When is it hardest for you to trust others?" },
      { vi: "Bạn có xu hướng đặt nhu cầu của người khác lên trên bản thân không?", en: "Do you tend to put others' needs above your own?" },
      { vi: "Điều gì là nguồn năng lượng lớn nhất của bạn?", en: "What's your biggest source of energy?" },
      { vi: "Điều gì 'rút cạn' năng lượng của bạn nhanh nhất?", en: "What drains your energy the fastest?" },
      { vi: "Bạn có bao giờ cảm thấy không đủ tốt không? Lúc đó bạn làm gì?", en: "Have you ever felt not good enough? What did you do?" },
      { vi: "Điều gì bạn muốn tha thứ cho bản thân?", en: "What do you want to forgive yourself for?" },
      { vi: "Khi bạn một mình, bạn thường nghĩ gì nhất?", en: "When you're alone, what do you think about most?" },
      { vi: "Bạn nghĩ bản năng của mình có đáng tin không?", en: "Do you think your instincts are trustworthy?" },
      { vi: "Điều gì bạn không thể chịu được ở người khác (và có thể có ở chính bạn)?", en: "What can't you stand in others (and might exist in yourself)?" },
      { vi: "Khi nào bạn cảm thấy mình bị hiểu lầm nhiều nhất?", en: "When do you feel most misunderstood?" },
      { vi: "Bạn thường phản ứng như thế nào khi bị chỉ trích?", en: "How do you usually react to criticism?" },
      { vi: "Điều gì về bản thân bạn muốn ôm lấy thay vì thay đổi?", en: "What about yourself do you want to embrace rather than change?" },
      { vi: "Bạn có bao giờ cảm thấy mình đang diễn vai 'người tốt' thay vì thực sự là mình không?", en: "Have you ever felt like you were performing 'being good' rather than actually being yourself?" },
      { vi: "Khi bạn thực sự vui, bạn trông như thế nào?", en: "What do you look like when you're genuinely happy?" },
      { vi: "Điều gì khiến bạn tự ti nhất?", en: "What makes you feel most insecure?" },
      { vi: "Bạn có kỷ luật với bản thân không? Trong lĩnh vực nào?", en: "Are you disciplined with yourself? In what area?" },
      { vi: "Điều gì bạn luôn muốn làm nhưng cứ trì hoãn?", en: "What do you always want to do but keep putting off?" },
      { vi: "Bạn học tốt nhất bằng cách nghe, nhìn hay làm?", en: "Do you learn best by listening, seeing, or doing?" },
      { vi: "Khi bị áp lực, bạn trở nên tốt hơn hay tệ hơn?", en: "When under pressure, do you get better or worse?" },
      { vi: "Điều gì bạn cần có trong cuộc sống để cảm thấy ổn định?", en: "What do you need in life to feel stable?" },
      { vi: "Bạn có hay so sánh mình với người khác không? Điều đó ảnh hưởng bạn như thế nào?", en: "Do you often compare yourself to others? How does that affect you?" },
      { vi: "Điều gì bạn thấy khác biệt ở mình so với đa số?", en: "What makes you different from the majority?" },
      { vi: "Bạn có sợ cô đơn không? Hay bạn cần thời gian một mình?", en: "Are you afraid of being alone, or do you need alone time?" },
      { vi: "Khi bạn tức giận, điều gì giúp bạn bình tĩnh lại?", en: "When you're angry, what helps you calm down?" },
      { vi: "Điều gì về bản thân bạn vẫn đang học cách yêu thương?", en: "What about yourself are you still learning to love?" },
      { vi: "Bạn nghĩ người khác nhìn nhận bạn như thế nào so với cách bạn nhìn chính mình?", en: "How do you think others see you compared to how you see yourself?" },
      { vi: "Điều gì bạn đã từng ghét ở bản thân nhưng giờ chấp nhận được?", en: "What did you used to hate about yourself that you now accept?" },
      { vi: "Khi nào bạn cảm thấy mình thực sự dũng cảm?", en: "When do you feel truly courageous?" },
      { vi: "Bạn cần gì từ một mối quan hệ để thực sự hạnh phúc?", en: "What do you need from a relationship to be truly happy?" },
      { vi: "Điều gì bạn muốn thế giới biết về bạn?", en: "What do you want the world to know about you?" },
      { vi: "Nếu bạn không sợ gì, bạn sẽ là ai?", en: "If you were afraid of nothing, who would you be?" },
    ]
  },
  {
    id: "philosophy", emoji: "🌙", label: "Triết học", labelEn: "Philosophy & Life", color: "#16a085",
    desc: "Câu hỏi về quan điểm sống, ý nghĩa tồn tại",
    questions: [
      { vi: "Bạn nghĩ con người sống để làm gì?", en: "What do you think people live for?" },
      { vi: "Điều gì làm cho một hành động là 'tốt'?", en: "What makes an action 'good'?" },
      { vi: "Bạn có tin rằng mọi chuyện đều xảy ra vì lý do không?", en: "Do you believe everything happens for a reason?" },
      { vi: "Hạnh phúc là trạng thái hay hành trình?", en: "Is happiness a state or a journey?" },
      { vi: "Bạn nghĩ con người về bản chất là vị tha hay ích kỷ?", en: "Do you think humans are fundamentally altruistic or selfish?" },
      { vi: "Nếu bạn có thể tua lại thời gian, điều đó có làm thay đổi ai bạn là không?", en: "If you could rewind time, would that change who you are?" },
      { vi: "Điều gì bạn cho là đúng dù cả thế giới không đồng ý?", en: "What do you believe is right even if the whole world disagrees?" },
      { vi: "Bạn nghĩ 'tự do' thực sự nghĩa là gì?", en: "What does 'freedom' truly mean to you?" },
      { vi: "Điều gì quan trọng hơn — sự thật hay lòng tốt?", en: "What matters more — truth or kindness?" },
      { vi: "Bạn có tin rằng con người có thể thực sự thay đổi không?", en: "Do you believe people can truly change?" },
      { vi: "Nếu bạn phải chọn giữa sống lâu và sống sâu, bạn chọn gì?", en: "If you had to choose between a long life and a deep life, which would you choose?" },
      { vi: "Điều gì tạo nên bản sắc của một người?", en: "What creates a person's identity?" },
      { vi: "Bạn nghĩ số phận và sự lựa chọn, cái nào định hình cuộc đời hơn?", en: "Which shapes life more — fate or choice?" },
      { vi: "Điều gì là 'thật' trong một thế giới luôn thay đổi?", en: "What is 'real' in an ever-changing world?" },
      { vi: "Điều gì làm cho một mối quan hệ có giá trị?", en: "What makes a relationship valuable?" },
      { vi: "Tình yêu là cảm xúc hay sự lựa chọn?", en: "Is love an emotion or a choice?" },
      { vi: "Bạn nghĩ điều gì là không thể thay thế trong cuộc đời?", en: "What do you think is irreplaceable in life?" },
      { vi: "Nếu ai đó cư xử tệ vì hoàn cảnh, họ có đáng trách không?", en: "If someone behaves badly due to circumstances, are they still to blame?" },
      { vi: "Điều gì bạn cho là quan trọng nhất — quá khứ, hiện tại hay tương lai?", en: "What do you consider most important — the past, present, or future?" },
      { vi: "Bạn nghĩ thất bại có cần thiết để trưởng thành không?", en: "Do you think failure is necessary to grow?" },
      { vi: "Điều gì tạo ra sự khác biệt giữa sự tồn tại và sự sống?", en: "What creates the difference between existence and living?" },
      { vi: "Bạn nghĩ 'bình thường' có phải là điều tốt không?", en: "Do you think being 'normal' is a good thing?" },
      { vi: "Nếu bạn có thể biết trước tất cả, cuộc đời có còn ý nghĩa không?", en: "If you could know everything in advance, would life still be meaningful?" },
      { vi: "Điều gì không bao giờ thỏa hiệp dù ai nói gì?", en: "What will you never compromise no matter what anyone says?" },
      { vi: "Bạn nghĩ người ta cần bao nhiêu để hạnh phúc?", en: "How much do you think a person needs to be happy?" },
      { vi: "Điều gì về con người khiến bạn vừa ngạc nhiên vừa hy vọng?", en: "What about humans both surprises and gives you hope?" },
      { vi: "Nếu bạn chỉ có thể để lại một bài học cho đời, đó là gì?", en: "If you could leave only one lesson for the world, what would it be?" },
      { vi: "Bạn nghĩ sự im lặng nói lên điều gì?", en: "What do you think silence says?" },
      { vi: "Điều gì khiến bạn tin rằng cuộc đời này đáng sống?", en: "What makes you believe this life is worth living?" },
      { vi: "Bạn nghĩ sự khác biệt giữa sự dũng cảm và sự liều lĩnh là gì?", en: "What do you think is the difference between courage and recklessness?" },
    ]
  },
  {
    id: "travel", emoji: "✈️", label: "Du lịch", labelEn: "Travel & Adventure", color: "#27ae60",
    desc: "Câu hỏi về phiêu lưu, khám phá thế giới",
    questions: [
      { vi: "Chuyến đi nào thay đổi cách bạn nhìn thế giới?", en: "What trip changed the way you see the world?" },
      { vi: "Nơi nào bạn đã đến một lần nhưng muốn quay lại mãi?", en: "Where have you been once but want to keep returning to?" },
      { vi: "Bạn thích du lịch một mình hay theo nhóm? Tại sao?", en: "Do you prefer traveling alone or in a group? Why?" },
      { vi: "Điều gì bạn luôn làm đầu tiên khi đến một nơi mới?", en: "What do you always do first when arriving somewhere new?" },
      { vi: "Món ăn địa phương nào bạn nhớ nhất từ một chuyến đi?", en: "What local food do you remember most from a trip?" },
      { vi: "Nếu được chọn một nơi để sống 1 năm, bạn chọn đâu?", en: "If you could choose a place to live for 1 year, where would you choose?" },
      { vi: "Hành lý gọn nhẹ hay đầy đủ — bạn thuộc team nào?", en: "Light packing or fully packed — which team are you on?" },
      { vi: "Điều gì bạn học được về bản thân từ những chuyến đi?", en: "What have you learned about yourself from your travels?" },
      { vi: "Bạn thích đặt kế hoạch chi tiết hay tự phát khi du lịch?", en: "Do you prefer detailed plans or spontaneous traveling?" },
      { vi: "Nơi nào ở Việt Nam bạn muốn khám phá mà chưa từng đến?", en: "Where in Vietnam do you want to explore but haven't been to?" },
      { vi: "Chuyến đi tệ nhất của bạn là gì và bạn học được gì từ nó?", en: "What was your worst trip and what did you learn from it?" },
      { vi: "Bạn thích biển, núi, thành phố hay nông thôn khi đi chơi?", en: "Do you prefer the beach, mountains, city, or countryside when traveling?" },
      { vi: "Điều gì về văn hóa nước khác khiến bạn ngạc nhiên nhất?", en: "What about another country's culture surprised you the most?" },
      { vi: "Nếu được đi du lịch ngay lúc này, bạn sẽ gói gì vào vali?", en: "If you could travel right now, what would you pack in your suitcase?" },
      { vi: "Bạn thích ở khách sạn hay chỗ ở địa phương (homestay) hơn?", en: "Do you prefer hotels or local stays (homestay)?" },
      { vi: "Khoảnh khắc nào trong chuyến đi bạn cảm thấy tự do nhất?", en: "What travel moment made you feel most free?" },
      { vi: "Điều gì bạn muốn khám phá về thế giới mà chưa có cơ hội?", en: "What about the world do you want to discover but haven't had the chance to?" },
      { vi: "Bạn muốn trải nghiệm đêm giao thừa ở đâu một lần trong đời?", en: "Where do you want to experience New Year's Eve at least once in your life?" },
      { vi: "Nếu có thể đi du lịch trên máy bay miễn phí, lịch trình của bạn sẽ thế nào?", en: "If you could fly for free, what would your travel itinerary look like?" },
      { vi: "Bạn có bao giờ đi lạc ở nơi xa lạ chưa? Chuyện gì xảy ra?", en: "Have you ever gotten lost in an unfamiliar place? What happened?" },
      { vi: "Nơi nào bạn nghĩ cả hai chúng ta nên cùng nhau đến?", en: "Where do you think we should both go together?" },
      { vi: "Bạn thích khám phá ban ngày hay ban đêm khi đến thành phố mới?", en: "Do you prefer exploring a new city during the day or at night?" },
      { vi: "Điều gì về du lịch một mình bạn thích và không thích?", en: "What do you like and dislike about traveling alone?" },
      { vi: "Bạn muốn leo núi, lặn biển hay nhảy dù một lần không?", en: "Would you want to climb a mountain, dive in the ocean, or skydive once?" },
      { vi: "Điều gì bạn luôn mua làm quà khi đi du lịch về?", en: "What do you always buy as a gift when you travel?" },
      { vi: "Chuyến đi mơ ước của bạn và tôi cùng nhau là gì?", en: "What's your dream trip for the two of us?" },
      { vi: "Bạn có muốn sống ở nước ngoài một thời gian không?", en: "Would you want to live abroad for a while?" },
      { vi: "Phong cảnh nào trong những chuyến đi bạn không thể quên?", en: "What scenery from your travels can you never forget?" },
      { vi: "Điều gì về việc đi du lịch khiến bạn hồi hộp nhất?", en: "What about traveling excites you the most?" },
      { vi: "Nếu cả hai chúng ta cùng road trip xuyên Việt Nam, chặng đường nào bạn mong nhất?", en: "If we road-tripped across Vietnam, which stretch would you most look forward to?" },
      { vi: "Điều gì bạn luôn muốn nói với những người địa phương nhưng ngại ngùng?", en: "What do you always want to say to locals but feel shy about?" },
      { vi: "Nếu được đi theo dấu chân một nhân vật lịch sử, bạn chọn ai và đến đâu?", en: "If you could follow in the footsteps of a historical figure, who and where?" },
      { vi: "Bạn thích du lịch theo mùa hay thích tránh mùa cao điểm?", en: "Do you prefer traveling in season or avoiding peak times?" },
      { vi: "Điều gì về những người bạn gặp trong chuyến đi khiến bạn thay đổi cách nghĩ?", en: "What about people you've met traveling changed the way you think?" },
      { vi: "Bạn nghĩ điểm đến tốt nhất là những nơi mình tình cờ khám phá hay lên kế hoạch trước?", en: "Do you think the best destinations are ones you discover by chance or plan in advance?" },
    ]
  },
];

export const QUICK_QUESTIONS = [
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


// =============================================
// 2. DANH SÁCH CÂU HỎI PHẲNG (ĐÃ KÈM FREQUENCY)
// =============================================
export const ALL_QUESTIONS = CATEGORIES.flatMap(cat =>
  cat.questions.map((q, i) => ({
    ...q,
    id: `${cat.id}_${i}`,            // ID ổn định
    categoryId: cat.id,
    categoryLabel: cat.label,
    emoji: cat.emoji,
    color: cat.color,
    frequency: getFrequencyForQuestion(q, cat.id)
  }))
);

// Thêm QUICK_QUESTIONS vào pool chung
QUICK_QUESTIONS.forEach((q, i) => {
  ALL_QUESTIONS.push({
    ...q,
    id: `quick_${i}`,
    categoryId: "quick",
    categoryLabel: "Nhanh",
    emoji: "⚡",
    color: "#f5a623",
    frequency: getFrequencyForQuestion(q, null)
  });
});

// =============================================
// 3. TIỆN ÍCH NGÀY & CÂU HỎI FALLBACK
// =============================================

/**
 * Lấy key ngày hôm nay (YYYY-MM-DD) dùng cho promptKey
 */
export const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

/**
 * Fallback: Sinh danh sách câu hỏi mỗi ngày dựa trên seed thời gian.
 * Dùng khi Edge Function không khả dụng (mất mạng, lỗi).
 * Lấy ngẫu nhiên từ ALL_QUESTIONS (không kiểm tra frequency để đơn giản).
 */
export const getDailyQuestions = (count = 6) => {
  const d = new Date();
  const daySeed = Math.floor(d.getTime() / 86400000);

  return Array.from({ length: count }, (_, i) => {
    const index = (daySeed + i) % ALL_QUESTIONS.length;
    const question = ALL_QUESTIONS[index];
    return {
      ...question,
      promptKey: `${getTodayKey()}#fallback_${i}`
    };
  });
};

// =============================================
// 4. GỢI Ý BUCKET LIST
// =============================================
export const bucketSuggestions = [
  "Xem hoàng hôn cùng nhau 🌅",
  "Học nấu một món mới 🍜",
  "Chụp ảnh 5 thành phố 📸",
  "Đi picnic một ngày không dùng điện thoại 🧺",
  "Viết thư tay cho nhau 💌",
  "Cùng nhau đi xem một buổi concert âm nhạc 🎸",
  "Thức cả đêm trò chuyện đến sáng ☕",
  "Làm một món đồ handmade tặng đối phương 🎨",
  "Đi du lịch đến một nơi chưa ai từng đến 🛫"
];

// =============================================
// 5. CÂU HỎI NHANH (LEGACY - có thể vẫn dùng)
// =============================================
export const getQuickTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const getQuickQuestionForDay = (offset = 0) => {
  const d = new Date();
  const seed = Math.floor(d.getTime() / 86400000) + offset;
  return QUICK_QUESTIONS[((seed % QUICK_QUESTIONS.length) + QUICK_QUESTIONS.length) % QUICK_QUESTIONS.length];
};

export const getQuickTodayQ = () => getQuickQuestionForDay(0);

export const getQuickDailyQuestions = (count = 5) => {
  const d = new Date();
  const seed = Math.floor(d.getTime() / 86400000);
  return Array.from({ length: count }, (_, i) => {
    const index = (seed + i) % QUICK_QUESTIONS.length;
    return { ...QUICK_QUESTIONS[index], promptKey: `${getQuickTodayKey()}#${index}` };
  });
};