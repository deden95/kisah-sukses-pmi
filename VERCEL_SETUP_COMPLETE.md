# Setup Vercel untuk Deployment Kisah Sukses PMI

## 📋 Prerequisites
- Project sudah push ke GitHub
- Akun Vercel sudah terhubung dengan GitHub

## 🚀 Langkah-langkah Deployment

### 1. Deploy Project ke Vercel

1. Masuk ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"New Project"**
3. Pilih repository **kisah-sukses-pmi** dari GitHub
4. Klik **"Deploy"**
5. Tunggu proses deployment selesai

### 2. Setup Environment Variables

Setelah deployment pertama, masuk ke **Settings** → **Environment Variables**

#### Environment Variables yang dibutuhkan:

```bash
# URL Configuration
NEXT_PUBLIC_APP_URL = http://localhost:3000
NEXT_PUBLIC_WEB_URL = https://kisah-sukses-pmi.vercel.app

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_PROJECT_ID = imdfhpojkvvyffenxbgf
NEXT_PUBLIC_SUPABASE_URL = https://imdfhpojkvvyffenxbgf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltZGZocG9qa3Z2eWZmZW54YmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxODgwNzIsImV4cCI6MjA2NTc2NDA3Mn0.MBD_y0E_35K09YAD37Mv4ppuCIv5oeOq0jHfMs53ihw
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS = posts
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE = cover-image
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE = gallery-image
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_PROFILE = profile

# Author ID for Demo
NEXT_PUBLIC_AUTHOR_ID = a84dba4d-947f-4802-b885-7b4177439901

# Email Configuration (Optional)
GOOGLE_EMAIL = your-email@gmail.com
GOOGLE_PASSWORD = your-app-password

# ConvertKit (Optional)
CONVERTKIT_API_KEY = your-convertkit-api-key
CONVERTKIT_FORM_ID = your-form-id
CONVERTKIT_API_URL = https://api.convertkit.com/v3

# Supabase Access Token (Optional)
SUPABASE_ACCESS_TOKEN = your-supabase-access-token
```

#### Cara Menambahkan Environment Variables:

1. **Name**: Masukkan nama variable (contoh: `NEXT_PUBLIC_WEB_URL`)
2. **Value**: Masukkan nilai variable (contoh: `https://kisah-sukses-pmi.vercel.app`)
3. **Environments**: 
   - `NEXT_PUBLIC_APP_URL` → **Development** & **Preview**
   - `NEXT_PUBLIC_WEB_URL` → **Production**
   - Semua yang lain → **All environments** (Production, Preview, Development)
4. **Klik Save**

### 3. Setup OAuth Providers

#### Google OAuth Setup:

1. **Google Cloud Console** ([console.cloud.google.com](https://console.cloud.google.com/))
2. **APIs & Services** → **Credentials**
3. **OAuth 2.0 Client IDs** → Pilih client Anda
4. **Authorized redirect URIs**, tambahkan:
   ```
   https://imdfhpojkvvyffenxbgf.supabase.co/auth/v1/callback
   https://kisah-sukses-pmi.vercel.app/auth/callback
   ```

#### GitHub OAuth Setup:

1. **GitHub Settings** ([github.com/settings/developers](https://github.com/settings/developers))
2. **OAuth Apps** → Pilih app Anda
3. **Authorization callback URL**:
   ```
   https://imdfhpojkvvyffenxbgf.supabase.co/auth/v1/callback
   ```

### 4. Setup Supabase Configuration

1. **Supabase Dashboard** ([supabase.com/dashboard](https://supabase.com/dashboard))
2. **Settings** → **General**
3. **Site URL**: `https://kisah-sukses-pmi.vercel.app`
4. **Redirect URLs**: `https://kisah-sukses-pmi.vercel.app/**`

### 5. Redeploy Project

Setelah setup environment variables:

**Option 1: Manual Redeploy**
1. **Deployments** tab
2. Klik **"Redeploy"** pada deployment terbaru
3. Klik **"Redeploy"** lagi untuk konfirmasi

**Option 2: Git Push**
1. Push commit baru ke GitHub
2. Vercel akan otomatis deploy

## ✅ Verifikasi Setup

### Test Checklist:

- [ ] Website bisa diakses di `https://kisah-sukses-pmi.vercel.app`
- [ ] Login Google berhasil dan redirect ke Vercel URL (bukan localhost)
- [ ] Login GitHub berhasil dan redirect ke Vercel URL (bukan localhost)
- [ ] Upload gambar ke Supabase storage berhasil
- [ ] CRUD operations (Create, Read, Update, Delete) posts berfungsi
- [ ] Environment variables ter-load dengan benar

### Debug Environment Variables:

Untuk memastikan environment variables ter-load, bisa tambahkan log sementara:

```javascript
console.log('Production URL:', process.env.NEXT_PUBLIC_WEB_URL);
console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);
console.log('Node ENV:', process.env.NODE_ENV);
```

## 🚨 Troubleshooting

### Masalah Umum:

1. **OAuth masih redirect ke localhost**
   - Pastikan Supabase Site URL sudah production
   - Pastikan Google/GitHub OAuth callback URLs sudah ditambahkan
   - Clear browser cache

2. **Environment variables tidak ter-load**
   - Pastikan sudah redeploy setelah menambah env vars
   - Pastikan nama environment variables benar (case-sensitive)

3. **Build error saat deployment**
   - Check build logs di Vercel dashboard
   - Pastikan semua dependencies ada di package.json

4. **Storage upload error**
   - Pastikan Supabase storage buckets sudah ada
   - Pastikan RLS policies sudah dikonfigurasi dengan benar

## 📞 Support

Jika masih ada masalah:
1. Check Vercel build logs
2. Check browser console untuk error messages
3. Check Supabase dashboard untuk authentication logs
4. Hubungi support Vercel/Supabase jika diperlukan

---

**Update terakhir**: Desember 2024
**Vercel URL**: https://kisah-sukses-pmi.vercel.app

