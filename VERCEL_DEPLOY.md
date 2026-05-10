# Deploy Vercel

## Build local

```bash
npm.cmd run build
```

## Deploy bằng Vercel Dashboard

1. Push repo lên GitHub.
2. Import project vào Vercel.
3. Framework Preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Thêm Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Deploy.

## Cấu hình redirect cho Auth

Sau khi có domain Vercel, vào Supabase:

**Authentication > URL Configuration**

Thêm:

- Site URL: `https://your-app.vercel.app`
- Redirect URLs:
  - `https://your-app.vercel.app`
  - `http://localhost:5173`
  - `http://localhost:5174`

Nếu dùng Google OAuth, cũng kiểm tra redirect/callback URL theo hướng dẫn trong Supabase Google provider.
