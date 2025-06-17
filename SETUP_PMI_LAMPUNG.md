# 📋 Panduan Setup PMI Lampung - Kisah Sukses

> **Dokumentasi lengkap untuk setup website Kisah Sukses PMI Lampung**

## 📑 Daftar Isi
- [Persiapan Awal](#persiapan-awal)
- [Setup Supabase Database](#setup-supabase-database)
- [Konfigurasi Authentication](#konfigurasi-authentication)
- [Environment Variables](#environment-variables)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Persiapan Awal

### 1. Requirements
- **Node.js** (versi 18 atau lebih baru)
- **NPM** atau **Yarn**
- **Akun Supabase** (gratis)
- **Akun Google** (untuk OAuth)
- **Akun GitHub** (untuk OAuth)

### 2. Clone Repository
```bash
git clone <repository-url>
cd kisah-sukses
npm install
```

---

## 🗄️ Setup Supabase Database

### Langkah 1: Buat Project Supabase
1. **Daftar/Login** ke [Supabase](https://supabase.com/dashboard)
2. **Klik "New Project"**
3. **Isi data project**:
   - Name: `PMI Lampung Kisah Sukses`
   - Organization: Pilih atau buat baru
   - Password: Buat password database yang kuat
   - Region: `Southeast Asia (Singapore)`
4. **Klik "Create new project"**
5. **Tunggu** hingga project selesai dibuat (2-3 menit)

### Langkah 2: Setup Database Otomatis
1. **Buka SQL Editor** di dashboard Supabase
2. **Klik "New query"**
3. **Copy seluruh isi** file `setup_database.sql`
4. **Paste** ke SQL Editor
5. **Klik "Run"** untuk menjalankan script
6. **Pastikan** muncul pesan "Database setup completed successfully!"

### Langkah 3: Verifikasi Tabel
**Cek di Table Editor**, pastikan tabel berikut sudah dibuat:
- ✅ `profiles` - Data profil user
- ✅ `categories` - Kategori artikel
- ✅ `posts` - Artikel/konten
- ✅ `comments` - Komentar
- ✅ `bookmarks` - Bookmark user
- ✅ `drafts` - Draft artikel

### Langkah 4: Setup Storage Buckets
1. **Masuk ke menu Storage**
2. **Buat bucket** dengan konfigurasi berikut:

| Bucket Name | Public | Deskripsi |
|-------------|--------|----------|
| `posts` | ✅ Yes | Gambar artikel |
| `cover-image` | ✅ Yes | Cover artikel |
| `gallery-image` | ✅ Yes | Galeri foto |
| `profile` | ✅ Yes | Foto profil user |

---

## 🔐 Konfigurasi Authentication

### Setup Google OAuth

#### 1. Google Cloud Console
1. **Buka** [Google Cloud Console](https://console.cloud.google.com/)
2. **Buat project baru** atau pilih existing
3. **Enable APIs**:
   - Cari "Google+ API" dan enable
   - Cari "Google Identity Services API" dan enable

#### 2. Buat OAuth Credentials
1. **Masuk ke "Credentials"** di menu kiri
2. **Klik "+ CREATE CREDENTIALS"** > "OAuth client ID"
3. **Pilih "Web application"**
4. **Isi form**:
   - Name: `PMI Lampung Kisah Sukses`
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
5. **Copy Client ID dan Client Secret**

### Setup GitHub OAuth

#### 1. GitHub Developer Settings
1. **Buka** [GitHub Settings](https://github.com/settings/developers)
2. **Klik "New OAuth App"**
3. **Isi form**:
   - Application name: `PMI Lampung Kisah Sukses`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
4. **Copy Client ID dan Client Secret**

### Setup di Supabase

#### 1. Enable OAuth Providers
1. **Masuk ke Authentication** > **Settings** > **Auth Providers**
2. **Enable Google**:
   - Paste Client ID dari Google Console
   - Paste Client Secret dari Google Console
   - Redirect URL: `http://localhost:3000/auth/callback`
3. **Enable GitHub**:
   - Paste Client ID dari GitHub
   - Paste Client Secret dari GitHub
   - Redirect URL: `http://localhost:3000/auth/callback`

#### 2. Site URL Configuration
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/auth/callback`

---

## ⚙️ Environment Variables

### 1. Copy Template
```bash
cp .env.example .env
```

### 2. Isi Konfigurasi
**Edit file `.env`** dan isi dengan data dari Supabase:

```env
# ========================================
# SUPABASE CONFIGURATION
# ========================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=your-project-ref

# ========================================
# STORAGE BUCKETS
# ========================================
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS=posts
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE=cover-image
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE=gallery-image
NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_PROFILE=profile

# ========================================
# APP CONFIGURATION
# ========================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=

# ========================================
# AUTHOR ID (Generate after first login)
# ========================================
NEXT_PUBLIC_AUTHOR_ID=
```

### 3. Cara Mendapatkan Values

#### Supabase URL & API Key
1. **Masuk ke Supabase Dashboard**
2. **Pilih project** PMI Lampung
3. **Klik Settings** > **API**
4. **Copy**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Project Reference ID → `NEXT_PUBLIC_SUPABASE_PROJECT_ID`

---

## 🚀 Menjalankan Aplikasi

### 1. Development Mode
```bash
npm run dev
# atau
yarn dev
```

### 2. Akses Aplikasi
- **Website**: http://localhost:3000
- **Login Page**: http://localhost:3000/login
- **Admin Dashboard**: http://localhost:3000/editor/posts

### 3. Login Admin Pertama
1. **Buka** http://localhost:3000/login
2. **Klik** "Sign in with Google" atau "Sign in with GitHub"
3. **Login** dengan akun yang akan dijadikan admin
4. **Sistem** akan otomatis redirect ke dashboard
5. **Copy User ID** dari profile untuk dimasukkan ke `NEXT_PUBLIC_AUTHOR_ID`

---

## 🔧 Troubleshooting

### ❌ Error: "Your project's URL and Key are required"

**Penyebab**: Environment variables belum dikonfigurasi

**Solusi**:
1. Pastikan file `.env` ada di root folder
2. Periksa `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Restart development server: `npm run dev`

### ❌ Error: "Unsupported Server Component type: undefined"

**Penyebab**: Komponen tidak di-export dengan benar

**Solusi**:
1. Periksa import/export komponen yang error
2. Pastikan semua fungsi dipanggil dengan `()` jika perlu
3. Clear cache: `rm -rf .next && npm run dev`

### ❌ OAuth Login Tidak Berfungsi

**Penyebab**: Konfigurasi OAuth salah

**Solusi**:
1. **Periksa Redirect URLs**:
   - Google: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
   - GitHub: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
2. **Pastikan OAuth enabled** di Supabase Auth Settings
3. **Cek Client ID dan Secret** sudah benar

### ❌ Database Connection Error

**Penyebab**: Supabase credentials salah

**Solusi**:
1. Verifikasi URL Supabase di `.env`
2. Regenerate API Key jika perlu
3. Pastikan project Supabase aktif

### ❌ Storage Upload Error

**Penyebab**: Storage buckets belum dibuat atau tidak public

**Solusi**:
1. Cek semua buckets sudah dibuat
2. Pastikan buckets di-set sebagai **Public**
3. Periksa storage policies

---

## 📊 Post-Setup Checklist

**Setelah setup selesai, pastikan hal berikut berfungsi**:

- [ ] ✅ Website bisa diakses di http://localhost:3000
- [ ] ✅ Login Google/GitHub berfungsi
- [ ] ✅ Redirect ke dashboard setelah login
- [ ] ✅ Bisa membuat artikel baru
- [ ] ✅ Upload gambar berfungsi
- [ ] ✅ Draft dan publish artikel
- [ ] ✅ Kategori tampil dengan benar
- [ ] ✅ Komentar bisa dibuat
- [ ] ✅ Bookmark berfungsi

---

## 📞 Bantuan

**Jika masih mengalami kendala**:

1. **Cek dokumentasi**: Baca ulang step yang bermasalah
2. **Lihat logs**: Periksa console browser dan terminal
3. **Reset setup**: Hapus tabel dan jalankan ulang `setup_database.sql`
4. **Hubungi tim PMI**: [admin@pmilampung.org](mailto:admin@pmilampung.org)

---

*Dokumentasi ini dibuat khusus untuk PMI Lampung - Update terakhir: Juni 2025*

