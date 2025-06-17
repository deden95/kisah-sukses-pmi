# Fix Google OAuth Redirect URL di Production

## Masalah
Setelah deploy ke Vercel, Google OAuth masih redirect ke `http://localhost:3000` alih-alih URL production.

## Solusi Sederhana

### 1. Update Environment Variables di Vercel (PALING PENTING!)

1. Masuk ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project **kisah-sukses-pmi**
3. Masuk ke **Settings** → **Environment Variables**
4. Update/tambahkan variable:
   ```
   Variable Name: NEXT_PUBLIC_APP_URL
   Value: https://kisah-sukses-pmi.vercel.app
   Environment: Production (dan Preview jika perlu)
   ```
5. **KLIK SAVE**

⚠️ **PENTING**: Setelah update environment variable, WAJIB redeploy!

### 2. Update Google Cloud Console

1. Masuk ke [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project Anda
3. Masuk ke **APIs & Services** → **Credentials**
4. Klik pada OAuth 2.0 Client ID yang Anda gunakan
5. Di bagian **Authorized redirect URIs**, tambahkan:
   ```
   https://kisah-sukses-pmi.vercel.app/auth/callback
   https://imdfhpojkvvyffenxbgf.supabase.co/auth/v1/callback
   ```

### 3. Update Supabase Configuration

1. Masuk ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Masuk ke **Settings** → **General**
4. Update **Site URL** menjadi: `https://kisah-sukses-pmi.vercel.app`
5. Di **Redirect URLs**, tambahkan: `https://kisah-sukses-pmi.vercel.app/**`

### 4. Redeploy (WAJIB!)

Setelah mengupdate environment variable di Vercel:

**Pilihan 1: Manual Redeploy**
1. Di Vercel dashboard, masuk ke tab **Deployments**
2. Klik tombol **Redeploy** pada deployment terbaru
3. Klik **Redeploy** lagi untuk konfirmasi

**Pilihan 2: Push Commit Baru**
1. Commit dan push perubahan ke GitHub
2. Vercel akan otomatis deploy ulang

## Verifikasi

Setelah selesai, test login Google dengan:
1. Buka website production Anda
2. Klik login dengan Google
3. Pastikan redirect kembali ke URL production, bukan localhost

## Catatan Tambahan

- Pastikan URL di semua konfigurasi konsisten (dengan/tanpa trailing slash)
- Jika masih ada masalah, cek browser console untuk error messages
- Environment variables di Vercel memerlukan redeploy untuk aktif

