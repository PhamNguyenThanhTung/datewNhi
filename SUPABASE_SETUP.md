# Supabase Setup cho Lửa Nhỏ

## 1. Tạo project

1. Vào Supabase Dashboard và tạo project mới.
2. Mở **SQL Editor**.
3. Copy toàn bộ nội dung file `supabase/schema.sql` và chạy.

Schema này tạo:

- `profiles`
- `couple_rooms`
- `answers`
- `bucket_list`
- `memories`
- Storage buckets `avatars` và `memories`
- RLS policies
- Realtime publication cho các bảng cần đồng bộ

## 2. Lấy biến môi trường

Trong Supabase Dashboard, vào **Project Settings > API** rồi lấy:

- Project URL
- anon/public key hoặc publishable key

Tạo file `.env.local` ở root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-or-publishable-key
```

## 3. Auth

Magic Link hoạt động ngay nếu email provider mặc định của Supabase còn trong giới hạn free tier.

Nếu dùng Google OAuth:

1. Vào **Authentication > Providers > Google**.
2. Bật Google provider.
3. Điền Client ID/Secret lấy từ Google Cloud.
4. Trong Google Cloud, thêm callback URL Supabase cung cấp trong trang Google provider.

## 4. Chạy local

```bash
npm.cmd run dev
```

PowerShell trên máy này đang chặn `npm.ps1`, nên dùng `npm.cmd`.

## 5. Test realtime 2 điện thoại

1. Deploy hoặc chạy app qua URL mà cả 2 máy truy cập được.
2. Người A đăng nhập, tạo phòng, gửi mã.
3. Người B đăng nhập trên điện thoại khác, nhập mã.
4. Mỗi người trả lời các câu trong gói câu hỏi hằng ngày.
5. Câu trả lời, bucket list, album và countdown sẽ đồng bộ qua Supabase Realtime.

## 6. Ảnh được lưu ở đâu?

- Ảnh avatar lưu trong Storage bucket `avatars`.
- Ảnh album và ảnh upload từ câu hỏi hằng ngày lưu trong Storage bucket `memories`.
- Bảng `memories` chỉ lưu metadata: `image_path`, `image_url`, `caption`, `room_id`, `user_id`.

## 7. Nếu đã chạy schema trước đó

Nếu trước đây bạn đã chạy `supabase/schema.sql`, hãy chạy lại phần policy mới cho xóa bucket list:

```sql
create policy "members can delete bucket"
on public.bucket_list for delete to authenticated
using (exists (
  select 1 from public.couple_rooms r
  where r.id = bucket_list.room_id and (r.user1_id = auth.uid() or r.user2_id = auth.uid())
));
```
