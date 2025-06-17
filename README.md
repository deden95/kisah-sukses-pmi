# 🩸 PMI Lampung - Kisah Sukses

<p align="center">
  <img width="200" alt="PMI Logo" src="/public/images/LogoPMI.png">
</p>

<p align="center">
  <strong>Platform Digital Kisah Sukses PMI Palang Merah Indonesia Lampung</strong>
</p>

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

<p align="center">
  <a href="#-quick-start">🚀 Quick Start</a> •
  <a href="./docs">📚 Dokumentasi</a> •
  <a href="#-troubleshooting">🔧 Troubleshooting</a> •
  <a href="#-support">📞 Support</a>
</p>

---

## 📖 Tentang Proyek

**Platform Kisah Sukses PMI Lampung** adalah website untuk berbagi cerita inspiratif kegiatan kemanusiaan Palang Merah Indonesia Lampung.

### 🎯 Tujuan
- 📝 **Berbagi cerita inspiratif** tentang kegiatan kemanusiaan PMI
- 🩸 **Meningkatkan kesadaran** tentang donor darah dan kegiatan sosial
- 🤝 **Menghubungkan masyarakat** dengan misi kemanusiaan PMI
- 📚 **Dokumentasi digital** kegiatan dan pencapaian PMI Lampung

### 🛠️ Teknologi
Dibangun dengan teknologi modern: **Next.js 14**, **Supabase**, **TypeScript**, dan **Tailwind CSS**.


## 💾 Database Schema

### Database schema & dummy data: [here](./database_schema/)

<img width="992" alt="Screenshot 2023-06-10 at 10 00 18 PM" src="https://github.com/timtbdev/Next.js-Blog-App/assets/25026241/729e2d22-2467-4d5b-9c6c-e6a5ea58c717">

## 📚 Tech Stacks

- App Router,
- Server Actions
- Server and Client Components
- Data Fetching, Insertion using [Supabase-JS-Client](https://supabase.com/docs/reference/javascript/introduction)
- API Routes and Middlewares
- Cookie based Authentication using [Supabase Auth](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- CMS using [Supabase Database](https://supabase.com/docs/guides/database)
- Metadata files
- Open Graph Image Generation using [Vercel/Og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
- Image Upload using [Uppy](https://uppy.io) and [Supabase Storage](https://supabase.com/docs/guides/storage/uploads)
- Styled using [Tailwind CSS](https://tailwindcss.com/)
- UI Components using [HeadlessUI](https://headlessui.com), [Radix-UI](https://radix-ui.com), [Shadcn-UI](https://ui.shadcn.com/)
- WYSIWYG editor using [Novel](https://novel.sh/)
- Loading, Error, NotFound, Empty pages
- Sending emails using [NodeMailer](https://nodemailer.com) and [React Email](https://https://react.email/), [Gmail](https://gmail.com)
- Forms using [React-Hook-Forms](https://www.react-hook-form.com/)
- Toasts using [React-Hot-Toast](https://react-hot-toast.com/)
- Validations using [Zod](https://zod.dev)
- Icons using [HeroIcons](https://heroicons.com/) & [Lucide-Icon](https://lucide.dev/icons/)
- Newsletter using [ConvertKit](https://convertkit.com/)
- Drawer using [Vaul](https://vaul.emilkowal.ski/)
- Written in [TypeScript](https://www.typescriptlang.org/)

## ⌨️ Code Quality

- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## 📈 Miscellaneous

- [Vercel Analytics](https://vercel.com/analytics)

## ✨ Fitur Utama

- 🔐 **Autentikasi OAuth** - Login dengan Google/GitHub
- 📝 **Editor WYSIWYG** - Menulis artikel dengan editor modern
- 🏷️ **Kategori Artikel** - Donor Darah, Kemanusiaan, Bencana Alam, dll.
- 💾 **Draft System** - Simpan artikel sebagai draft
- 🔖 **Bookmark** - Simpan artikel favorit
- 💬 **Komentar** - Sistem komentar untuk setiap artikel
- 📱 **Responsive Design** - Tampilan optimal di semua perangkat
- 🚀 **SEO Optimized** - Meta tags dan Open Graph
- 📊 **Admin Dashboard** - Panel admin untuk mengelola konten

## 📚 Dokumentasi Lengkap

> **🎯 AKSES CEPAT**: Semua dokumentasi tersedia di folder [`docs/`](./docs)

### 📖 **Setup & Installation**
- [📋 Dokumentasi Index](./docs/README.md) - Daftar lengkap semua dokumentasi
- [⚡ Quick Setup Guide](./docs/QUICK_SETUP.md) - Setup cepat untuk development
- [📊 Setup PMI Lampung](./docs/SETUP_PMI_LAMPUNG.md) - Panduan setup lengkap

### 🔐 **Authentication**
- [🔑 OAuth Setup](./docs/oauth/OAUTH_SETUP.md) - Google & GitHub OAuth setup
- [🚨 OAuth Troubleshooting](./docs/oauth/OAUTH_TROUBLESHOOTING.md) - Solusi masalah login

### 💾 **Storage & Upload**
- [⚡ URGENT: Storage Fix](./docs/storage/URGENT_STORAGE_FIX.md) - Fix upload error 403
- [📝 Step-by-step Storage Setup](./docs/storage/STORAGE_SETUP_STEP_BY_STEP.md) - Panduan detail
- [📁 Storage Upload Fix](./docs/storage/STORAGE_UPLOAD_FIX.md) - Troubleshooting upload

### 🗄️ **Database**
- [📊 Database Setup Script](./docs/database/setup_database.sql) - Script SQL setup database

### 🔧 **SQL Scripts**
- [🛠️ Debug Storage Complete](./docs/storage/debug_storage_complete.sql) - Fix semua masalah storage
- [🔄 Storage Fix Alternative](./docs/storage/storage_fix_alternative.sql) - Alternative storage fix
- [✅ Check Storage Status](./docs/storage/check_storage_status.sql) - Cek status storage

---

# ⚙️ Panduan Setup

## 📋 Requirements

Untuk menjalankan aplikasi ini secara lokal, Anda membutuhkan:

- [Node.js (Version: >=18.x)](https://nodejs.org/en/download/)
- Node Package Manager NPM - sudah termasuk dalam Node.js
- [Akun Supabase](https://supabase.com) - untuk database dan autentikasi
- [Akun Google OAuth](https://console.developers.google.com) - untuk login Google
- [Akun GitHub OAuth](https://github.com/settings/developers) - untuk login GitHub

## 🚀 Langkah-langkah Setup

### 1. 📥 Clone Repository

```bash
git clone https://github.com/your-repo/pmi-lampung-kisah-sukses.git
cd pmi-lampung-kisah-sukses
```

### 2. 📦 Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. 🗄️ Setup Supabase Database

#### A. Buat Project Supabase
1. Daftar/Login ke [Supabase Dashboard](https://supabase.com/dashboard)
2. Klik "New Project"
3. Pilih Organization dan isi:
   - **Name**: `PMI Lampung Kisah Sukses`
   - **Database Password**: Buat password yang kuat
   - **Region**: `Southeast Asia (Singapore)` (terdekat dengan Indonesia)
4. Klik "Create new project" dan tunggu setup selesai

#### B. Setup Database Otomatis
1. Buka **SQL Editor** di Supabase Dashboard
2. Klik **"New query"**
3. Copy script SQL dari file `setup_database.sql` dan paste ke editor
4. Klik **"Run"** untuk membuat semua tabel dan konfigurasi

#### C. Setup Storage Buckets
1. Masuk ke menu **Storage** di Supabase Dashboard
2. Buat bucket-bucket berikut (semua **Public**):
   - `posts` - untuk gambar artikel
   - `cover-image` - untuk cover artikel
   - `gallery-image` - untuk galeri
   - `profile` - untuk foto profil user

### 4. 🔑 Setup Authentication (OAuth)

> **📖 Dokumentasi Lengkap OAuth**: Lihat [docs/oauth/OAUTH_SETUP.md](./docs/oauth/OAUTH_SETUP.md) untuk panduan detail setup Google OAuth dan GitHub OAuth.
> 
> **🚨 Troubleshooting OAuth**: Jika mengalami error, lihat [docs/oauth/OAUTH_TROUBLESHOOTING.md](./docs/oauth/OAUTH_TROUBLESHOOTING.md) untuk solusi cepat.

#### Quick Setup:

**A. Google OAuth**
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru dan enable Google+ API
3. Buat OAuth 2.0 Client ID (Web application)
4. Set redirect URI: `https://[your-project-ref].supabase.co/auth/v1/callback`
5. Copy Client ID dan Client Secret

**B. GitHub OAuth**
1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. Buat New OAuth App
3. Set callback URL: `https://[your-project-ref].supabase.co/auth/v1/callback`
4. Copy Client ID dan Client Secret

**C. Setup di Supabase**
1. Masuk ke **Authentication → Providers** di Supabase Dashboard
2. Enable Google dan GitHub dengan credentials yang sudah didapat
3. Set redirect URL: `http://localhost:3000/auth/callback`

### 5. 🔧 Konfigurasi Environment Variables

1. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. Isi file `.env` dengan konfigurasi Supabase Anda:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Storage Buckets
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS=posts
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE=cover-image
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE=gallery-image
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_PROFILE=profile
   ```

### 6. 🚀 Jalankan Aplikasi

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 7. 👤 Login Admin Pertama Kali

1. Buka `http://localhost:3000/login`
2. Pilih "Sign in with Google" atau "Sign in with GitHub"
3. Setelah login, Anda akan diarahkan ke dashboard admin: `http://localhost:3000/editor/posts`
4. User pertama yang login akan otomatis menjadi admin

## 📝 Cara Menggunakan

### Membuat Artikel Baru
1. Login sebagai admin
2. Masuk ke `/editor/posts`
3. Klik "Create New Post"
4. Isi judul, pilih kategori, upload gambar
5. Tulis konten menggunakan editor WYSIWYG
6. Simpan sebagai Draft atau Publish langsung

### Mengelola Kategori
- Kategori default sudah tersedia: Donor Darah, Kemanusiaan, Bencana Alam, Kesehatan, Pendidikan
- Admin dapat menambah kategori baru melalui dashboard

### Upload Gambar
- Gambar otomatis diupload ke Supabase Storage
- Mendukung format: JPG, PNG, WebP
- Ukuran maksimal: 5MB per file

## 🔧 Troubleshooting

<div align="center">

**🚨 Ada masalah? Solusi cepat ada di sini!**

[![Troubleshooting Guide](https://img.shields.io/badge/🔧_Complete-Troubleshooting_Guide-red?style=for-the-badge)](./docs/TROUBLESHOOTING.md)

</div>

### ⚡ **Quick Fixes untuk Error Umum**

| ❌ **Error** | ✅ **Quick Fix** | 📖 **Guide** |
|---|---|---|
| `Unsupported provider: provider is not enabled` | Enable OAuth di Supabase | [OAuth Fix](./docs/oauth/OAUTH_TROUBLESHOOTING.md) |
| `403 - RLS policy violation` | Setup storage policies | [Storage Fix](./docs/storage/URGENT_STORAGE_FIX.md) |
| `Your project's URL and Key are required` | Check `.env` dan restart | [Troubleshooting](./docs/TROUBLESHOOTING.md#environment-variables-issues) |
| Database connection error | Verify Supabase credentials | [Database Setup](./docs/SETUP_PMI_LAMPUNG.md#setup-supabase-database) |

**📋 Comprehensive Guide**: [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) - Semua solusi masalah ada di sini!

## 🔧 OAuth Production Deployment Fix

### ❌ Masalah: Login Google Redirect ke localhost:3000 Setelah Deploy

Jika setelah deploy ke Vercel/Netlify, login Google masih redirect ke `http://localhost:3000/?code=xxx`, ikuti langkah berikut:

### ✅ **Solusi Lengkap:**

#### 1. **Update Environment Variables di Platform Deploy**

**Di Vercel:**
1. Buka dashboard Vercel → Project Anda → **Settings** → **Environment Variables**
2. Tambahkan/Update variabel berikut:
```env
NEXT_PUBLIC_WEB_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```
3. **Redeploy** project Anda

**Di Netlify:**
1. Buka dashboard Netlify → Site Anda → **Site Settings** → **Environment Variables**
2. Tambahkan variabel yang sama seperti di atas
3. **Trigger Deploy** ulang

#### 2. **Update Supabase Configuration**

1. Buka [Supabase Dashboard](https://app.supabase.com) → Project Anda
2. Ke **Authentication** → **URL Configuration**
3. Update:
   - **Site URL**: `https://your-app-name.vercel.app`
   - **Redirect URLs**: Tambahkan `https://your-app-name.vercel.app/auth/callback`

#### 3. **Update Google OAuth Configuration**

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Ke **APIs & Services** → **Credentials**
3. Edit OAuth 2.0 Client ID Anda
4. Di **Authorized redirect URIs**, tambahkan:
```
https://your-app-name.vercel.app/auth/callback
```
5. **Save** perubahan

#### 4. **Update GitHub OAuth Configuration** (jika menggunakan)

1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. Edit OAuth App Anda
3. Update **Authorization callback URL**:
```
https://your-app-name.vercel.app/auth/callback
```
4. **Update application**

### 🔍 **Penjelasan Teknis**

Masalah ini terjadi karena:
- Fungsi `getUrl()` di `lib/utils.ts` menggunakan environment variable `NEXT_PUBLIC_WEB_URL` untuk production
- Jika tidak di-set, akan fallback ke hardcoded URL atau localhost
- OAuth providers masih menggunakan redirect URL development

### ✅ **Cara Verifikasi Fix Berhasil**

1. Buka aplikasi production Anda
2. Klik "Login with Google"
3. Setelah authorize di Google, seharusnya redirect ke:
```
https://your-app-name.vercel.app/auth/callback?code=xxx
```
4. Kemudian otomatis redirect ke dashboard/homepage production

### 🚨 **Tips Penting**

- ⚠️ **Jangan lupa redeploy** setelah update environment variables
- 🔄 **Clear browser cache** jika masih ada masalah
- 📝 **Catat semua URL** yang digunakan untuk konsistensi
- 🔐 **Gunakan HTTPS** untuk semua production URLs

---

## 📱 Deployment

### Deploy ke Vercel
1. Push code ke GitHub repository
2. Connect repository ke [Vercel](https://vercel.com)
3. Set environment variables di Vercel dashboard
4. Update OAuth redirect URLs dengan domain production

### Deploy ke Netlify
1. Build aplikasi: `npm run build`
2. Upload folder `out` ke Netlify
3. Set environment variables
4. Update OAuth redirect URLs

## 🤝 Kontribusi PMI Lampung

Untuk kontributor dari PMI Lampung:
1. Fork repository ini
2. Buat branch untuk fitur baru: `git checkout -b fitur-baru`
3. Commit perubahan: `git commit -m 'Tambah fitur baru'`
4. Push ke branch: `git push origin fitur-baru`
5. Buat Pull Request

## 📞 Support

Jika mengalami kendala:
- 📧 Email: [admin@pmilampung.org](mailto:admin@pmilampung.org)
- 📱 WhatsApp: +62-xxx-xxxx-xxxx
- 🌐 Website: [www.pmilampung.org](https://www.pmilampung.org)

## License

Licensed under the [MIT license](https://github.com/shadcn/taxonomy/blob/main/LICENSE.md).
