# Tài liệu Bối cảnh Dự án: "Lửa Nhỏ" (datewNhi)

Đây là tài liệu tóm tắt bối cảnh, kiến trúc và lộ trình phát triển của ứng dụng **Lửa Nhỏ** để AI có thể nắm bắt và tiếp tục hỗ trợ lập trình.

## 1. Tổng quan Dự án

- **Tên ứng dụng:** Lửa Nhỏ (Tên project: `datewNhi`).
- **Mục tiêu:** Một ứng dụng web (PWA) dành cho các cặp đôi để kết nối thông qua các câu hỏi hàng ngày, lưu trữ kỷ niệm và cùng nhau thực hiện các thử thách.
- **Triết lý:** Miễn phí vĩnh viễn (sử dụng các gói Free Tier của Vercel và Supabase), giao diện hiện đại, tối giản và mang tính cá nhân hóa cao.

## 2. Tech Stack

- **Frontend:** React (khởi tạo bằng Vite).
- **Styling:** CSS-in-JS (inline styles kết hợp keyframes) hoặc Tailwind CSS (dự kiến).
- **Backend/Database/Auth:** [Supabase](https://supabase.com/).
  - **Database:** PostgreSQL.
  - **Authentication:** Magic Link hoặc Google OAuth.
  - **Storage:** Lưu trữ ảnh kỷ niệm.
  - **Realtime:** Đồng bộ hóa câu trả lời và các tính năng tương tác tức thì.
- **Serverless Functions:** Vercel Functions (Node.js) + Cron Jobs.
- **Email Service:** Gmail OAuth2 + Nodemailer.
- **Push Notifications:** OneSignal (web notifications).
- **Image Optimization:** browser-image-compression (nén ảnh 5MB → 300KB).
- **Deployment:** Vercel.

## 3. Cấu trúc Database (Supabase Schema)

Dự án sử dụng các bảng chính sau:

- `profiles`: Lưu thông tin cá nhân (id, display_name, avatar_url, room_id).
- `couple_rooms`: Quản lý phòng đôi (id, invite_code, user1_id, user2_id, streak_count).
- `daily_questions`: Kho câu hỏi (id, content_vi, content_en, category).
- `answers`: Câu trả lời của người dùng (id, question_id, room_id, user_id, answer_text).
- `memories`: Album ảnh chung (id, room_id, image_path, caption).
- `bucket_list`: Danh sách việc cần làm cùng nhau.

## 4. Cấu trúc Thư mục

```text
api/                   # Serverless Functions (Vercel)
├── cron-streak-reminder.js   # Gửi email nhắc nhở hàng ngày (20:00 VN)
└── email-template.js  # Template HTML email

src/
├── data/               # Dữ liệu tĩnh (danh sách câu hỏi mẫu)
│   └── questions.js
├── hooks/              # Custom hooks (useLS, useAuth)
│   └── useLS.js
├── lib/                # Cấu hình thư viện (supabaseClient.js, coupleService.js)
├── components/         # UI components dùng chung
│   ├── Avatar.jsx
│   ├── AnswerCard.jsx
│   └── Particles.jsx
├── styles/             # Styles toàn cục và constants
│   └── global.js
├── screens/            # Các màn hình chính
│   ├── LoginScreen.jsx
│   ├── SetupScreen.jsx
│   ├── CodeShare.jsx
│   └── MainApp/
│       ├── MainApp.jsx
│       └── tabs/
│           ├── HomeTab.jsx
│           ├── HistoryTab.jsx
│           ├── BucketTab.jsx
│           ├── AlbumTab.jsx
│           ├── CountdownTab.jsx
│           └── ProfileTab.jsx
└── App.jsx             # Entry point & routing

vercel.json            # Cấu hình Vercel Cron Jobs
```

## 5. Tính năng Chính

### 🕯️ Trang chủ (Home Tab)
- Hiển thị **5 câu hỏi hàng ngày** được pick ngẫu nhiên
- Cho phép cả 2 người trả lời (chữ hoặc upload ảnh)
- Hiển thị **streak 🔥** trong header (cập nhật khi cả 2 đều tương tác)
- **Push notification** gửi khi partner trả lời hoặc upload ảnh
- Tương tác realtime qua Supabase

### 📖 Lịch sử (History Tab)
- Lưu trữ lịch sử 30 ngày gần nhất
- Hiển thị câu hỏi + 2 câu trả lời của mỗi ngày
- Tìm kiếm & lọc theo ngày

### 🖼️ Album (Album Tab)
- **Nén ảnh tự động:** Giảm 5MB → 300KB mà vẫn sắc nét (1GB lưu được 5000 ảnh)
- **Upload trực tiếp** vào Supabase Storage
- **Click ảnh** → Xem toàn màn hình với chú thích
- **Long press (500ms)** → Menu 2 nút:
  - 💾 **Lưu ảnh:** Download về device
  - 🗑️ **Xóa:** Xóa từ Supabase Storage & UI
- **Hover effect:** Scale 1.02 để highlight

### ⏰ Đếm ngày (Countdown Tab)
- Tạo kỷ niệm đặc biệt (sinh nhật, kỷ niệm, kế hoạch)
- Đếm ngày đến / từ sự kiện
- **Push notification** gửi khi partner cập nhật countdown

### 🌟 Danh sách (Bucket Tab)
- To-do list chung cho cặp
- Thêm, hoàn thành, xóa task
- Gợi ý sẵn: "Đi du lịch", "Kỷ niệm tin tưởng", v.v.
- **Push notification** gửi khi partner thêm item hoặc chấp nhận gợi ý

### 👤 Hồ sơ (Profile Tab)
- Hiển thị thông tin 2 người (avatar, tên)
- Thống kê streak & số câu trả lời
- Đếm số ảnh trong album
- Đăng xuất

## 6. Tối ưu & Fixes

### 🔐 Fix 429 Rate Limit (LoginScreen)
- **Vấn đề:** Supabase giới hạn ~4 OTP/phút, spam click gây 429 error
- **Giải pháp:** Thêm cooldown 60 giây sau mỗi lần gửi OTP
- **UX:** Button bị disable + countdown timer "Vui lòng chờ 60s"

### 📸 Image Compression (AlbumTab)
- **Thư viện:** `browser-image-compression` (300KB target)
- **Hiệu quả:** 5MB → 300KB, 1GB lưu 5000 ảnh, upload <1s

### 🔥 Streak Logic Refinement (v2)
- **Vấn đề:** Trước đó chỉ cộng streak khi CẢ 2 người trả lời Q&A
- **Giải pháp:** Đổi thành "bất kỳ tương tác nào" (trả lời Q&A, upload ảnh, thêm bucket list, cập nhật countdown)
- **Trigger:** `attemptStreakUpdate()` được gọi từ `submitMy()`, `submitPt()`, `uploadQuestionPhoto()`, `addItem()`, `addSuggestion()`, `handleSaveCountdown()`
- **Logic:** Streak cộng khi cả 2 người đều có ít nhất 1 tương tác trong ngày

## 7. Hệ thống Email Reminder (Cron Job)

### 📧 Tính năng
- **Lịch:** Mỗi ngày lúc **20:00 giờ Việt Nam** (13:00 UTC)
- **Logic:** 
  - Query các cặp chưa hoàn thành câu hỏi hôm nay
  - Xác định user nào chưa trả lời
  - Gửi email nhắc nhở duy trì streak
- **Email Template:** HTML đẹp, có link mở app

### 📂 File liên quan
- `api/cron-streak-reminder.js` - Logic chính (kiểm tra, gửi email)
- `api/email-template.js` - Template HTML email
- `vercel.json` - Cron schedule: `0 13 * * *` (20:00 VN)

### 🔐 Bảo mật
- Chỉ Vercel Cron có thể trigger (check header `Authorization: Bearer ${CRON_SECRET}`)
- Admin Key Supabase không public
- Refresh token Gmail được lưu private trong Vercel env vars

### 📋 Environment Variables cần thiết
```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
SENDER_EMAIL=...
CRON_SECRET=<random_secret_here>
APP_URL=https://datewnhi.vercel.app
```

### 🚀 Setup Vercel (Email)
1. Thêm tất cả env vars vào **Vercel Dashboard > Settings > Environment Variables**
2. `CRON_SECRET`: Tạo token ngẫu nhiên mạnh bằng `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. Deploy: `git push` - Vercel sẽ tự động trigger cron lúc 20:00 VN hàng ngày

## 8. Hệ thống Push Notifications (OneSignal)

### 📲 Tính năng
- **Thời gian thực:** Nhận thông báo ngay khi partner trả lời / tương tác
- **Các sự kiện trigger:**
  - ✅ Partner trả lời câu hỏi
  - ✅ Partner upload ảnh (đính ảnh vào câu trả lời)
  - ✅ Partner thêm item vào bucket list
  - ✅ Partner chấp nhận gợi ý bucket list
  - ✅ Partner cập nhật countdown
- **Link:** Bấm thông báo → Mở app ngay lập tức

### 🔧 Integration
- **SDK:** `react-onesignal` v3.5.1
- **Setup:** 
  - `index.html` load OneSignal SDK script
  - `App.jsx` initialize OneSignal + request permission (showSlidedownPrompt)
  - `coupleService.js` có hàm `sendPushNotification(targetUserId, message)` gửi qua REST API
  - `HomeTab.jsx`, `MainApp.jsx` gọi hàm này khi trigger event

### 📋 OneSignal Setup
```
7602eae8-63b0-4fe5-92e4-5c13f3bac45fApp ID: 
REST API Key: os_v2_app_oybov2ddwbh6lexelqj7howel6dbpkytj6ievp44iqcvlzte6hfv6qsa4ygpmky33yho7qwfzw7mdoo5ujpyjsg3somshbr2erluira
```

## 9. API/Services

### `lib/supabaseClient.js`
- Cấu hình Supabase client (public key)
- Export client instance

### `lib/coupleService.js`
- `loadRoomData()` - Load tất cả dữ liệu phòng
- `saveAnswer()` - Lưu câu trả lời của user
- `uploadMemory()` - Upload ảnh lên Storage
- `subscribeRoom()` - Subscribe realtime updates
- `saveCountdown()` - Lưu countdown info
- `saveBucketItem()` - Thêm item to bucket list

## 10. Local Storage Keys

Mỗi cặp lưu dữ liệu local:
```
streak_${coupleCode}              // { count, lastDate }
my_${coupleCode}_${todayKey}      // Câu trả lời của tôi hôm nay
pt_${coupleCode}_${todayKey}      // Câu trả lời của partner hôm nay
history_${coupleCode}             // Lịch sử 30 ngày
bucket_${coupleCode}              // Danh sách việc cần làm
my_multi_${coupleCode}_${todayKey} // Multiple answers (nếu có)
skipped_${coupleCode}_${todayKey}  // Những câu skip lại
```

## 11. Lộ trình Phát triển (Roadmap)

### ✅ Hoàn thành
- ✅ Cấu trúc project & folder
- ✅ Flow login/setup + cooldown 60s (fix 429 rate limit)
- ✅ Main app UI (6 tabs)
- ✅ Local storage & realtime sync
- ✅ **Email reminder system** (20:00 VN mỗi ngày)
- ✅ **Album:** Nén ảnh 5MB → 300KB, fullscreen view, long press delete
- ✅ **Push Notifications:** OneSignal web notifications (Q&A, upload, bucket, countdown)
- ✅ **Streak Logic:** Any interaction counts (not just Q&A)

### 🔄 Đang phát triển
- Tối ưu performance
- Testing & bug fixes

### 📅 Sắp tới
- Social sharing (chia sẻ kỷ niệm)
- Custom questions (tạo câu hỏi riêng)
- Themes & personalization

---

**Cập nhật lần cuối:** May 10, 2026 | **Push Notifications v1.0 + Streak Logic Refinement** ✅
