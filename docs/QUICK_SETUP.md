# ⚡ Quick Setup - PMI Lampung Kisah Sukses

<div align="center">

**🩸 Panduan setup cepat dalam 10 menit**

![Setup Progress](https://img.shields.io/badge/Setup_Time-10_minutes-green?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-Bahasa_Indonesia-blue?style=for-the-badge)

</div>

---

## 🎯 **Apa yang Akan Anda Dapatkan?**

Setelah mengikuti panduan ini (10 menit), Anda akan memiliki:
- ✅ Website berjalan di `http://localhost:3000`
- ✅ Login Google/GitHub working
- ✅ Database dan storage setup
- ✅ Ready untuk development!

---

## 📋 Checklist Setup - Ikuti Berurutan!

### 📦 **STEP 1: Clone & Install** (2 menit)

```bash
# Clone repository
git clone <repository-url>
cd kisah-sukses

# Install dependencies
npm install
```

**✅ Success indicator**: Folder `node_modules` terbuat, no error di terminal

---

### 🗄️ **STEP 2: Buat Project Supabase** (3 menit)
1. Daftar di [supabase.com](https://supabase.com/dashboard)
2. Klik "New Project"
3. Name: `PMI Lampung Kisah Sukses`
4. Region: `Southeast Asia (Singapore)`
5. Tunggu setup selesai

### ✅ Langkah 3: Setup Database
1. Buka **SQL Editor** di Supabase
2. Copy isi file `setup_database.sql`
3. Paste dan **Run**
4. Cek muncul "Database setup completed successfully!"

### ✅ Langkah 4: Buat Storage Buckets
Di menu **Storage**, buat bucket (semua Public):
- `posts`
- `cover-image` 
- `gallery-image`
- `profile`

### ✅ Langkah 5: Setup OAuth

**Google OAuth**:
1. [Google Console](https://console.cloud.google.com/) → Create Project
2. Enable "Google+ API"
3. Create OAuth Client ID (Web app)
4. Redirect URI: `https://[PROJECT-REF].supabase.co/auth/v1/callback`

**GitHub OAuth**:
1. [GitHub Settings](https://github.com/settings/developers) → New OAuth App
2. Callback URL: `https://[PROJECT-REF].supabase.co/auth/v1/callback`

**Di Supabase**:
1. Authentication → Auth Providers
2. Enable Google & GitHub dengan Client ID/Secret
3. Redirect: `http://localhost:3000/auth/callback`

### ✅ Langkah 6: Environment Variables
```bash
cp .env.example .env
```

Isi `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS=posts
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE=cover-image
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE=gallery-image
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_PROFILE=profile
```

### ✅ Langkah 7: Jalankan
```bash
npm run dev
```

## 🎉 Selesai!

- **Website**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/editor/posts

## ⚠️ Troubleshooting Cepat

**Error Supabase**: Cek URL & API Key di `.env`
**Error OAuth**: Pastikan redirect URL benar
**Error Database**: Jalankan ulang `setup_database.sql`

---

📞 **Butuh bantuan?** Lihat `SETUP_PMI_LAMPUNG.md` untuk panduan lengkap

