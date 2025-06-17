# 🩸 PMI Lampung - Kisah Sukses

<p align="center">
  <img width="200" alt="PMI Logo" src="/public/images/LogoPMI.png">
</p>

<p align="center">
  <strong>Platform Digital Kisah Sukses PMI Palang Merah Indonesia Lampung</strong>
</p>

## 📖 Tentang Proyek

Website "Kisah Sukses" adalah platform digital untuk Palang Merah Indonesia (PMI) Lampung yang bertujuan untuk:
- 📝 Berbagi cerita inspiratif tentang kegiatan kemanusiaan PMI
- 🩸 Meningkatkan kesadaran tentang donor darah dan kegiatan sosial
- 🤝 Menghubungkan masyarakat dengan misi kemanusiaan PMI
- 📚 Dokumentasi digital kegiatan dan pencapaian PMI Lampung

Aplikasi ini dibangun dengan teknologi modern: **Next.js 14**, **Supabase**, **TypeScript**, dan **Tailwind CSS**.

## 💻 Frontend

<img width="1040" alt="Cover" src="https://github.com/timtbdev/Next.js-Blog-App/assets/25026241/d263479c-853f-40ed-aed4-58c5cbb8b14c">

## 🧰 Backend

<img width="1040" alt="Cover" src="https://github.com/timtbdev/Next.js-Blog-App/assets/25026241/c5cd3077-b955-43fd-b6ea-2f3b5f9297c9">

## 📹 Preview

https://github.com/timtbdev/Next.js-Blog-App/assets/25026241/29c35c5f-ad67-4f5b-9943-0fd0d94448b8

## 💾 Database Schema

### Database schema & dummy data: [here](./database_schema/)

<img width="992" alt="Screenshot 2023-06-10 at 10 00 18 PM" src="https://github.com/timtbdev/Next.js-Blog-App/assets/25026241/729e2d22-2467-4d5b-9c6c-e6a5ea58c717">

## 📊 Google Lighthouse performance statistics

<img width="992" alt="Screenshot 2023-06-10 at 10 00 18 PM" src="https://github.com/timtbdev/Next.js-Blog-App/assets/25026241/2a4f693b-5c0d-4647-8444-291e1f635ee7">

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

#### A. Google OAuth
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Enable **Google+ API**
4. Buat **OAuth 2.0 Client ID**:
   - Application type: **Web application**
   - Authorized redirect URIs: `https://[your-project-ref].supabase.co/auth/v1/callback`
5. Copy **Client ID** dan **Client Secret**

#### B. GitHub OAuth
1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. Klik **"New OAuth App"**
3. Isi form:
   - **Application name**: `PMI Lampung Kisah Sukses`
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `https://[your-project-ref].supabase.co/auth/v1/callback`
4. Copy **Client ID** dan **Client Secret**

#### C. Setup di Supabase
1. Masuk ke **Authentication → Settings → Auth Providers** di Supabase Dashboard
2. **Enable Google**:
   - Masukkan Client ID dan Client Secret dari Google
   - Redirect URL: `http://localhost:3000/auth/callback`
3. **Enable GitHub**:
   - Masukkan Client ID dan Client Secret dari GitHub
   - Redirect URL: `http://localhost:3000/auth/callback`

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

### Error: "Your project's URL and Key are required"
**Solusi**: Pastikan file `.env` sudah dikonfigurasi dengan benar dan restart development server.

### Error: "Unsupported Server Component type: undefined"
**Solusi**: Biasanya ada komponen yang tidak di-export dengan benar. Periksa file komponen yang bermasalah.

### Login OAuth tidak berfungsi
**Solusi**: 
1. Periksa konfigurasi OAuth di Google/GitHub Console
2. Pastikan redirect URL sudah benar
3. Periksa apakah OAuth sudah di-enable di Supabase

### Database connection error
**Solusi**: Pastikan URL dan API Key Supabase sudah benar di file `.env`

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

## Contributing

- [Start a discussion](https://timtb.dev/contact) with a question, piece of feedback, or idea you want to share with me.
- [Open an issue](https://github.com/timtbdev/Next.js-Blog-App/issues) if you believe you've encountered a bug with the starter kit.

## 🙇 Author

- Tim ([@timtbdev](https://twitter.com/timtbdev))

## License

Licensed under the [MIT license](https://github.com/shadcn/taxonomy/blob/main/LICENSE.md).
