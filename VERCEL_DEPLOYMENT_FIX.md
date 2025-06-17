# Fix Google OAuth Redirect URL di Production

## Masalah
Setelah deploy ke Vercel, Google OAuth masih redirect ke `http://localhost:3000` alih-alih URL production.

## Solusi

### 1. Update Environment Variables di Vercel

1. Masuk ke dashboard Vercel
2. Pilih project Anda
3. Masuk ke **Settings** → **Environment Variables**
4. Tambahkan variable baru:
   ```
   NEXT_PUBLIC_WEB_URL = https://your-app-name.vercel.app
   ```
   (Ganti dengan URL Vercel yang sebenarnya)

### 2. Update Google Cloud Console

1. Masuk ke [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project Anda
3. Masuk ke **APIs & Services** → **Credentials**
4. Klik pada OAuth 2.0 Client ID yang Anda gunakan
5. Di bagian **Authorized redirect URIs**, tambahkan:
   ```
   https://your-app-name.vercel.app/auth/callback
   https://imdfhpojkvvyffenxbgf.supabase.co/auth/v1/callback
   ```

### 3. Update Supabase Configuration

1. Masuk ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Masuk ke **Settings** → **General**
4. Update **Site URL** menjadi: `https://your-app-name.vercel.app`
5. Di **Redirect URLs**, tambahkan: `https://your-app-name.vercel.app/**`

### 4. Deploy Ulang

Setelah mengupdate semua konfigurasi di atas:
1. Commit dan push perubahan code
2. Atau trigger redeploy manual di Vercel dashboard

## Verifikasi

Setelah selesai, test login Google dengan:
1. Buka website production Anda
2. Klik login dengan Google
3. Pastikan redirect kembali ke URL production, bukan localhost

## Catatan Tambahan

- Pastikan URL di semua konfigurasi konsisten (dengan/tanpa trailing slash)
- Jika masih ada masalah, cek browser console untuk error messages
- Environment variables di Vercel memerlukan redeploy untuk aktif

