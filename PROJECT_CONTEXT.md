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
src/
├── data/               # Dữ liệu tĩnh (danh sách câu hỏi mẫu)
│   └── questions.js
├── hooks/              # Custom hooks (useLS, useAuth)
│   └── useLS.js
├── lib/                # Cấu hình thư viện (supabaseClient.js)
├── components/         # UI components dùng chung
│   ├── Avatar.jsx
│   ├── AnswerCard.jsx
│   └── Particles.jsx
├── styles/             # Styles toàn cục và constants
│   └── global.js
├── screens/            # Các màn hình lớn
│   ├── LoginScreen.jsx
│   ├── SetupScreen.jsx
│   ├── CodeShare.jsx
│   └── MainApp/
│       ├── MainApp.jsx
│       └── tabs/
│           ├── HomeTab.jsx
│           ├── HistoryTab.jsx
│           ├── BucketTab.jsx
│           └── ProfileTab.jsx
└── App.jsx             # Entry point và điều hướng
```
