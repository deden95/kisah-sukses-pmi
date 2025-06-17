# 🔧 Troubleshooting Guide - PMI Lampung Kisah Sukses

<div align="center">

**🚨 Solusi Cepat untuk Masalah Umum**

[![Error Fix](https://img.shields.io/badge/🚨_Quick-Fix-red?style=for-the-badge)](#-quick-fixes)
[![OAuth Issues](https://img.shields.io/badge/🔐_OAuth-Issues-orange?style=for-the-badge)](#-oauth-authentication-issues)
[![Storage Issues](https://img.shields.io/badge/💾_Storage-Issues-yellow?style=for-the-badge)](#-storage--upload-issues)
[![Database Issues](https://img.shields.io/badge/🗄️_Database-Issues-blue?style=for-the-badge)](#%EF%B8%8F-database-issues)

</div>

---

## 🚨 Quick Fixes

### ⚡ **Top 5 Errors & Instant Solutions**

| ❌ **Error** | ✅ **Quick Fix** | 🔗 **Detailed Guide** |
|---|---|---|
| `Unsupported provider: provider is not enabled` | Enable OAuth di Supabase → Auth → Providers | [OAuth Fix](./oauth/OAUTH_TROUBLESHOOTING.md) |
| `403 - RLS policy violation` (upload) | Jalankan storage policies SQL script | [Storage Fix](./storage/URGENT_STORAGE_FIX.md) |
| `Your project's URL and Key are required` | Check `.env` file dan restart server | [Environment Setup](#-environment-variables-issues) |
| `redirect_uri_mismatch` | Fix OAuth redirect URLs | [OAuth Setup](./oauth/OAUTH_SETUP.md) |
| `Database connection error` | Verify Supabase credentials | [Database Setup](./SETUP_PMI_LAMPUNG.md#setup-supabase-database) |

---

## 🔐 OAuth & Authentication Issues

### 🚨 **"Unsupported provider: provider is not enabled"**

**🔍 Problem**: OAuth providers belum di-enable di Supabase  
**⚡ Solution**: 
1. Buka [Supabase Dashboard](https://supabase.com/dashboard) → pilih project
2. **Authentication** → **Providers**
3. **Enable Google** dan **GitHub** (toggle switch harus hijau)
4. Masukkan Client ID dan Secret dari Google/GitHub
5. **Save** dan restart server: `npm run dev`

**📋 Detailed Guide**: [OAuth Troubleshooting](./oauth/OAUTH_TROUBLESHOOTING.md)

### 🚨 **"redirect_uri_mismatch"**

**🔍 Problem**: OAuth redirect URL tidak cocok  
**⚡ Solution**:
1. **Google Console**: Authorized redirect URIs harus: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
2. **GitHub OAuth**: Callback URL harus sama
3. **Supabase**: Site URL → `http://localhost:3000`

### 🚨 **Login berhasil tapi tidak redirect**

**🔍 Problem**: Session tidak persist setelah OAuth  
**⚡ Solution**:
1. Clear browser cache dan cookies
2. Check callback handler: `app/auth/callback/route.ts`
3. Verify environment: `NEXT_PUBLIC_APP_URL=http://localhost:3000`

---

## 💾 Storage & Upload Issues

### 🚨 **"403 - new row violates row-level security policy"**

**🔍 Problem**: RLS policies untuk storage belum setup  
**⚡ Solution** (5 menit):

1. **Check storage buckets exist**:
   - Supabase → Storage → harus ada: `posts`, `cover-image`, `gallery-image`, `profile`
   - Semua bucket harus **Public**

2. **Run RLS policies**:
   ```sql
   -- Copy paste ke Supabase SQL Editor
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects
   FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile'));
   
   CREATE POLICY "Allow public downloads"
   ON storage.objects
   FOR SELECT
   USING (bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile'));
   ```

3. **Test upload**: Login → `/editor/posts/new` → upload gambar

**📋 Detailed Guide**: [URGENT Storage Fix](./storage/URGENT_STORAGE_FIX.md)

### 🚨 **"Bucket does not exist"**

**🔍 Problem**: Storage buckets belum dibuat  
**⚡ Solution**:
1. Supabase → **Storage** → **Create new bucket**
2. Buat 4 buckets (semua **Public**):
   - `posts`
   - `cover-image`
   - `gallery-image` 
   - `profile`

### 🚨 **Upload gagal tanpa error message**

**🔍 Problem**: User tidak authenticated atau file terlalu besar  
**⚡ Solution**:
1. **Check authentication**: Browser console → `supabase.auth.getSession()`
2. **Check file size**: Max 5MB
3. **Check file type**: JPG, PNG, WebP only

---

## 🗄️ Database Issues

### 🚨 **"Your project's URL and Key are required"**

**🔍 Problem**: Environment variables tidak dikonfigurasi  
**⚡ Solution**:
1. **Check `.env` file** ada di root project
2. **Verify values**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **Restart server**: `npm run dev`

### 🚨 **Database connection error**

**🔍 Problem**: Supabase credentials salah atau project tidak aktif  
**⚡ Solution**:
1. **Verify project URL**: [Supabase Dashboard](https://supabase.com/dashboard) → Settings → API
2. **Copy correct values**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. **Regenerate keys** jika perlu

### 🚨 **Tables tidak ada / missing**

**🔍 Problem**: Database setup belum dijalankan  
**⚡ Solution**:
1. **Supabase** → **SQL Editor** → **New query**
2. **Copy paste** script dari `docs/database/setup_database.sql`
3. **Run** dan tunggu "Database setup completed successfully!"
4. **Verify**: Table Editor → check tables: `profiles`, `posts`, `categories`, etc.

---

## ⚙️ Environment Variables Issues

### 🚨 **Environment variables tidak terbaca**

**🔍 Problem**: `.env` file tidak ada atau format salah  
**⚡ Solution**:

1. **Create `.env`**:
   ```bash
   cp .env.example .env
   ```

2. **Fill required values**:
   ```env
   # WAJIB diisi
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # Storage buckets
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_POSTS=posts
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_COVER_IMAGE=cover-image
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_GALLERY_IMAGE=gallery-image
   NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_PROFILE=profile
   ```

3. **Restart server**: `npm run dev`

### 🚨 **Environment variables tidak update**

**🔍 Problem**: Next.js cache masih menyimpan nilai lama  
**⚡ Solution**:
```bash
# Clear cache
rm -rf .next
npm run dev
```

---

## 🌐 Next.js Specific Issues

### 🚨 **"Unsupported Server Component type: undefined"**

**🔍 Problem**: Component tidak di-export dengan benar  
**⚡ Solution**:
1. **Check import/export** komponen yang error
2. **Clear cache**: `rm -rf .next && npm run dev`
3. **Check syntax**: Pastikan semua bracket dan parentheses matching

### 🚨 **"Image hostname not configured"**

**🔍 Problem**: Next.js image domains tidak dikonfigurasi  
**⚡ Solution**:

Update `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'your-project-ref.supabase.co',
      'localhost'
    ],
  },
}

module.exports = nextConfig
```

### 🚨 **Hot reload tidak bekerja**

**🔍 Problem**: Development server tidak detect perubahan file  
**⚡ Solution**:
```bash
# Stop server (Ctrl+C) dan restart
npm run dev

# Atau clear cache
rm -rf .next node_modules/.cache
npm run dev
```

---

## 🖥️ Local Development Issues

### 🚨 **Port 3000 sudah digunakan**

**🔍 Problem**: Port 3000 sudah digunakan aplikasi lain  
**⚡ Solution**:
```bash
# Gunakan port lain
npm run dev -- --port 3001

# Atau kill process di port 3000
lsof -ti:3000 | xargs kill -9
```

### 🚨 **Node.js version mismatch**

**🔍 Problem**: Node.js version tidak compatible  
**⚡ Solution**:
1. **Check version**: `node --version` (harus ≥ 18.x)
2. **Update Node.js**: [nodejs.org](https://nodejs.org/)
3. **Clear node_modules**: `rm -rf node_modules && npm install`

---

## 🔍 **Debugging Tools**

### 📊 **Check System Status**

```bash
# Check environment
cat .env | grep SUPABASE

# Check Node.js
node --version
npm --version

# Check project structure
ls -la
ls -la app/
ls -la components/
```

### 🔍 **Test Database Connection**

Browser console:
```javascript
// Test Supabase connection
supabase.auth.getSession().then(console.log);

// Test database query
supabase.from('profiles').select('*').limit(1).then(console.log);

// Test storage
supabase.storage.listBuckets().then(console.log);
```

### 🔍 **Check Authentication**

Browser console:
```javascript
// Check current user
supabase.auth.getUser().then(console.log);

// Check session
supabase.auth.getSession().then(console.log);

// Test OAuth providers
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
```

---

## 📞 Emergency Support

### 🚨 **Jika Semua Cara Gagal**

1. **Screenshot error** + console logs
2. **Copy `.env`** (tanpa sensitive data)
3. **Describe steps** yang sudah dicoba
4. **Contact**:
   - 📧 **Email**: tech@pmilampung.org
   - 📱 **WhatsApp**: +62-xxx-xxxx-xxxx
   - 🐙 **GitHub Issues**: Create new issue

### 📋 **Template Error Report**

```
**Error Description**: 
[Describe what you were trying to do]

**Error Message**: 
[Copy exact error message]

**Steps to Reproduce**:
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Environment**:
- OS: [Windows/Mac/Linux]
- Node.js: [version]
- Browser: [Chrome/Firefox/etc]

**What I've Tried**:
- [List solutions you've attempted]

**Screenshots**:
[Attach screenshots if helpful]
```

---

**📝 Last Updated**: June 2025 | **👥 Maintainer**: PMI Lampung Tech Team

<div align="center">

**🩸 Made with ❤️ for PMI Lampung**

[🏠 Back to Main README](../README.md) | [📚 Documentation](./README.md) | [📧 Contact Support](mailto:tech@pmilampung.org)

</div>

