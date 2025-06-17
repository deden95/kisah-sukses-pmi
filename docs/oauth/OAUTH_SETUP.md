# 🔐 OAuth Authentication Setup Guide - PMI Lampung

> **⚠️ PENTING**: Dokumentasi ini dibuat khusus untuk proyek PMI Lampung - Kisah Sukses. Ikuti setiap langkah dengan teliti untuk menghindari error.

## 📋 Overview

Aplikasi PMI Lampung Kisah Sukses menggunakan **Supabase Auth** dengan OAuth providers untuk autentikasi pengguna. Sistem ini mendukung:
- 📱 **Google OAuth** - Login dengan akun Google (Gmail)
- 🐙 **GitHub OAuth** - Login dengan akun GitHub
- 🔗 **Magic Link** - Login dengan email (opsional)

### ✅ Yang Anda Butuhkan:
- ✅ Akun Supabase (gratis)
- ✅ Akun Google (untuk Google Cloud Console)
- ✅ Akun GitHub (untuk GitHub OAuth)
- ✅ Project sudah di-clone dan dependencies ter-install

## 🏗️ Arsitektur Authentication

```
User → OAuth Provider → Supabase Auth → Application
```

### Flow Autentikasi:
1. User klik "Sign in with Google/GitHub"
2. Redirect ke OAuth provider (Google/GitHub)
3. User authorize di provider
4. Provider mengirim authorization code ke Supabase
5. Supabase exchange code untuk access token
6. User diarahkan kembali ke aplikasi dengan session

## 📁 File Struktur & Konfigurasi

### 🔧 File Konfigurasi Utama:

```
kisah-sukses/
├── .env                                    # Environment variables (JANGAN commit!)
├── .env.example                           # Template environment variables
├── app/auth/callback/route.ts             # OAuth callback handler
├── components/login/login-section.tsx     # Login component dengan OAuth buttons
├── config/shared/shared-login-config.ts   # Konfigurasi teks login
├── utils/supabase/client.ts              # Supabase client configuration
└── utils/supabase/server.ts              # Supabase server configuration
```

### 📄 Penjelasan File:

#### 1. `.env` - Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_PROJECT_ID=your-project-id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WEB_URL=https://your-domain.com

# Author Configuration (untuk demo)
NEXT_PUBLIC_AUTHOR_ID=a84dba4d-947f-4802-b885-7b4177439901
```

#### 2. `app/auth/callback/route.ts` - OAuth Callback Handler
File ini menangani callback dari OAuth providers:
- Menerima authorization code dari provider
- Exchange code menjadi session
- Redirect user ke halaman yang dituju

#### 3. `components/login/login-section.tsx` - Login UI Component
Komponen yang menampilkan:
- Google OAuth button
- GitHub OAuth button  
- Magic link email (opsional)
- Loading states dan error handling

#### 4. `config/shared/shared-login-config.ts` - Konfigurasi Teks
Berisi semua teks yang ditampilkan di halaman login:
```typescript
const sharedLoginConfig = {
  title: "Login",
  description: "Please sign in to continue.",
  google: "Sign in with Google",
  github: "Sign in with Github",
  // ... teks lainnya
};
```

---

# 🚨 SOLUSI ERROR: "Unsupported provider: provider is not enabled"

> **❌ ERROR YANG ANDA ALAMI**: `{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}`

**🔍 PENYEBAB**: OAuth providers belum di-enable di Supabase Dashboard meskipun sudah setup di Google Cloud Console.

**✅ SOLUSI**: Ikuti langkah-langkah berikut dengan teliti:

### 🔧 LANGKAH 1: Verifikasi Project Supabase

1. **Buka Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** dengan akun Supabase Anda
3. **Pilih Project**: `ppsnfjaqfkyrhuoyfupg` (sesuai .env Anda)
4. **Verifikasi URL**: Pastikan URL project adalah `https://ppsnfjaqfkyrhuoyfupg.supabase.co`

### 🔧 LANGKAH 2: Enable OAuth Providers di Supabase

#### A. Masuk ke Authentication Settings
1. Di **sidebar kiri**, klik **"Authentication"**
2. Klik tab **"Providers"** (bukan Settings)
3. Anda akan melihat list semua OAuth providers yang tersedia

#### B. Enable Google OAuth
1. **Scroll ke bawah** dan cari **"Google"**
2. **Toggle switch** di sebelah kanan untuk **ENABLE** Google
3. Form konfigurasi akan muncul:
   ```
   Client ID: [masukkan dari Google Cloud Console]
   Client Secret: [masukkan dari Google Cloud Console]
   Redirect URL: https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback
   ```
4. **SAVE** konfigurasi

#### C. Enable GitHub OAuth
1. Masih di halaman yang sama, cari **"GitHub"**
2. **Toggle switch** untuk **ENABLE** GitHub
3. Masukkan credentials dari GitHub OAuth App:
   ```
   Client ID: [dari GitHub Developer Settings]
   Client Secret: [dari GitHub Developer Settings]
   Redirect URL: https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback
   ```
4. **SAVE** konfigurasi

### 🔧 LANGKAH 3: Konfigurasi Site URLs

1. Masih di **Authentication**, klik tab **"Settings"**
2. Scroll ke **"Site URL"** dan set:
   ```
   Site URL: http://localhost:3000
   ```
3. Di **"Redirect URLs"**, tambahkan:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/**
   ```
4. **SAVE** perubahan

### 🔧 LANGKAH 4: Test Setelah Konfigurasi

1. **Restart development server**:
   ```bash
   # Stop server dengan Ctrl+C, lalu:
   npm run dev
   ```
2. **Buka browser**: `http://localhost:3000/login`
3. **Klik "Sign in with Google"** - seharusnya tidak ada error lagi
4. **Test juga GitHub OAuth**

---

## ⚙️ Setup OAuth Providers (Lengkap)

> **📍 PENTING**: Bagian ini adalah panduan lengkap. Jika Anda sudah mengikuti solusi error di atas, Anda bisa skip ke section "Testing".

### 🔴 Google OAuth Setup

#### Step 1: Buat Project di Google Cloud Console
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih existing project
3. Nama project: `PMI Lampung Kisah Sukses`

#### Step 2: Enable Google+ API
1. Masuk ke **APIs & Services** → **Library**
2. Cari "Google+ API" dan enable
3. Atau bisa enable "Google Identity API" untuk yang terbaru

#### Step 3: Buat OAuth 2.0 Credentials
1. Masuk ke **APIs & Services** → **Credentials**
2. Klik **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Pilih **"Web application"**
4. Konfigurasi:
   ```
   Name: PMI Lampung - Web Client
   
   Authorized JavaScript origins:
   - http://localhost:3000 (untuk development)
   - https://your-domain.com (untuk production)
   
   Authorized redirect URIs:
   - https://your-project.supabase.co/auth/v1/callback
   ```
5. **SAVE** dan copy **Client ID** serta **Client Secret**

#### Step 4: Setup di Supabase
1. Buka Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Google**
3. Masukkan:
   - **Client ID**: dari Google Cloud Console
   - **Client Secret**: dari Google Cloud Console
   - **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

### 🐙 GitHub OAuth Setup

#### Step 1: Buat OAuth App di GitHub
1. Buka [GitHub Developer Settings](https://github.com/settings/developers)
2. Klik **"New OAuth App"**
3. Konfigurasi:
   ```
   Application name: PMI Lampung Kisah Sukses
   Homepage URL: https://your-domain.com
   Application description: Platform Digital Kisah Sukses PMI Lampung
   
   Authorization callback URL:
   https://your-project.supabase.co/auth/v1/callback
   ```
4. **Register application**
5. Copy **Client ID** dan generate **Client Secret**

#### Step 2: Setup di Supabase
1. Buka Supabase Dashboard → **Authentication** → **Providers**
2. Enable **GitHub**
3. Masukkan:
   - **Client ID**: dari GitHub OAuth App
   - **Client Secret**: dari GitHub OAuth App
   - **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

## 🔄 OAuth Flow Implementation

### Client-Side Code (React)

```typescript
// components/login/login-section.tsx

// Google OAuth
async function signInWithGoogle() {
  setSignInGoogleClicked(true);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getLoginRedirectPath(currentPathname),
      queryParams: {
        prompt: "consent", // Force consent screen
      },
    },
  });
  router.refresh();
}

// GitHub OAuth  
async function signInWithGitHub() {
  setSignInGithubClicked(true);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: getLoginRedirectPath(currentPathname),
      queryParams: {
        prompt: "consent",
      },
    },
  });
  router.refresh();
}
```

### Server-Side Callback Handler

```typescript
// app/auth/callback/route.ts

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectPath = requestUrl.searchParams.get("redirect");
  
  if (code) {
    const supabase = createClient(cookies());
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(redirect || requestUrl.origin);
    }
  }
  
  return NextResponse.redirect(new URL("/auth/auth-code-error", request.url));
}
```

## 🛡️ Security Configuration

### Supabase Auth Settings

1. **Site URL**: Set URL aplikasi Anda
   ```
   Development: http://localhost:3000
   Production: https://your-domain.com
   ```

2. **Redirect URLs**: Daftar URL yang diizinkan untuk redirect
   ```
   http://localhost:3000/auth/callback
   https://your-domain.com/auth/callback
   ```

3. **JWT Settings**: 
   - JWT expiry: 3600 (1 hour)
   - Refresh token rotation: Enabled

### Environment Variables Security

```env
# ⚠️ IMPORTANT: Jangan commit file .env ke Git!
# Gunakan .env.example sebagai template

# Public keys (aman untuk frontend)
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Private keys (hanya untuk server)
SUPABASE_ACCESS_TOKEN=xxx  # Jika ada
```

## 🧪 Testing OAuth

### 1. Local Development Testing

```bash
# Start development server
npm run dev

# Test URLs:
# http://localhost:3000/login
# http://localhost:3000/auth/callback
```

### 2. Manual Testing Steps

1. **Google OAuth Test**:
   - Buka `/login`
   - Klik "Sign in with Google"
   - Pilih akun Google
   - Verify redirect ke dashboard
   - Check user data di Supabase Dashboard

2. **GitHub OAuth Test**:
   - Buka `/login`
   - Klik "Sign in with GitHub"
   - Authorize aplikasi
   - Verify redirect ke dashboard
   - Check user data di Supabase Dashboard

### 3. Debugging OAuth Issues

```typescript
// Tambahkan logging untuk debugging
async function signInWithGoogle() {
  try {
    setSignInGoogleClicked(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { prompt: "consent" },
      },
    });
    
    if (error) {
      console.error('OAuth Error:', error);
      // Handle error
    }
    
    console.log('OAuth Success:', data);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}
```

## 🚀 Production Deployment

### 1. Update OAuth Providers

**Google Cloud Console**:
- Tambah production domain ke Authorized JavaScript origins
- Tambah production callback URL ke Authorized redirect URIs

**GitHub OAuth App**:
- Update Homepage URL ke production domain
- Update Authorization callback URL ke production

### 2. Update Supabase Settings

- **Site URL**: Update ke production domain
- **Redirect URLs**: Tambah production callback URLs

### 3. Environment Variables

```env
# Production .env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_WEB_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-key
```

## 🔍 Troubleshooting

### Common Issues & Solutions

#### 1. "redirect_uri_mismatch" Error
**Cause**: OAuth redirect URL tidak cocok
**Solution**: 
- Periksa redirect URL di Google/GitHub console
- Pastikan format URL tepat: `https://project.supabase.co/auth/v1/callback`

#### 2. "invalid_client" Error
**Cause**: Client ID atau Secret salah
**Solution**:
- Verify Client ID dan Secret di Supabase dashboard
- Regenerate secret jika perlu

#### 3. CORS Error
**Cause**: Domain tidak authorized
**Solution**:
- Tambah domain ke Authorized JavaScript origins (Google)
- Update Site URL di Supabase

#### 4. Session tidak persist
**Cause**: Cookie configuration salah
**Solution**:
```typescript
// Pastikan Supabase client configuration benar
const supabase = createClientComponentClient({
  cookieOptions: {
    name: 'sb-cookies',
    domain: process.env.NODE_ENV === 'production' ? '.your-domain.com' : 'localhost',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  }
});
```

### 5. Development vs Production URLs

**Development**:
```
App URL: http://localhost:3000
Callback: https://project.supabase.co/auth/v1/callback
```

**Production**:
```
App URL: https://your-domain.com  
Callback: https://project.supabase.co/auth/v1/callback
```

---

# 📋 CHECKLIST LENGKAP OAUTH SETUP

> **🎯 GUNAKAN CHECKLIST INI** untuk memastikan semua konfigurasi sudah benar.

## ✅ Checklist Google OAuth

### Google Cloud Console:
- [ ] Project `PMI Lampung Kisah Sukses` sudah dibuat
- [ ] Google+ API atau Google Identity API sudah di-enable
- [ ] OAuth 2.0 Client ID sudah dibuat (Web application)
- [ ] Authorized JavaScript origins berisi:
  - [ ] `http://localhost:3000`
  - [ ] `https://your-production-domain.com` (untuk production)
- [ ] Authorized redirect URIs berisi:
  - [ ] `https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback`
- [ ] Client ID dan Client Secret sudah di-copy

### Supabase Dashboard:
- [ ] Masuk ke Authentication → Providers
- [ ] Google provider sudah di-**ENABLE** (toggle switch ON)
- [ ] Client ID dari Google sudah dimasukkan
- [ ] Client Secret dari Google sudah dimasukkan
- [ ] Configuration sudah di-**SAVE**

## ✅ Checklist GitHub OAuth

### GitHub Developer Settings:
- [ ] OAuth App sudah dibuat di [GitHub Developer Settings](https://github.com/settings/developers)
- [ ] Application name: `PMI Lampung Kisah Sukses`
- [ ] Homepage URL sudah diisi
- [ ] Authorization callback URL: `https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback`
- [ ] Client ID dan Client Secret sudah di-copy

### Supabase Dashboard:
- [ ] GitHub provider sudah di-**ENABLE** (toggle switch ON)
- [ ] Client ID dari GitHub sudah dimasukkan
- [ ] Client Secret dari GitHub sudah dimasukkan
- [ ] Configuration sudah di-**SAVE**

## ✅ Checklist Supabase Configuration

### Authentication Settings:
- [ ] Masuk ke Authentication → Settings
- [ ] Site URL: `http://localhost:3000`
- [ ] Redirect URLs berisi:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `http://localhost:3000/**`

### Environment Variables (.env):
- [ ] `NEXT_PUBLIC_SUPABASE_URL=https://ppsnfjaqfkyrhuoyfupg.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` sudah diisi dengan benar
- [ ] `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- [ ] File `.env` TIDAK di-commit ke Git

---

# 🚨 DEBUGGING GUIDE KHUSUS ERROR ANDA

## Error: "Unsupported provider: provider is not enabled"

### 🔍 Langkah Debugging:

1. **Check Browser Console**:
   ```javascript
   // Buka Developer Tools (F12)
   // Di Console, ketik:
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
   console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);
   ```

2. **Check Network Tab**:
   - Buka Network tab di Developer Tools
   - Klik "Sign in with Google"
   - Lihat request yang gagal
   - Check response body untuk detail error

3. **Check Supabase Project**:
   ```bash
   # Verifikasi environment variables
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

### 🔧 Solusi Step-by-Step:

#### STEP 1: Double-check Supabase Project ID
```bash
# File .env Anda saat ini:
NEXT_PUBLIC_SUPABASE_PROJECT_ID=ppsnfjaqfkyrhuoyfupg
NEXT_PUBLIC_SUPABASE_URL=https://ppsnfjaqfkyrhuoyfupg.supabase.co
```

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pastikan Anda melihat project: `ppsnfjaqfkyrhuoyfupg`
3. Klik project tersebut

#### STEP 2: Enable Providers (PALING PENTING)
1. **Sidebar kiri** → **Authentication**
2. **Tab "Providers"** (BUKAN Settings)
3. **Scroll ke bawah** cari "Google"
4. **Toggle switch** harus **HIJAU/ON**
5. **Isi form** dengan credentials dari Google Cloud Console
6. **SAVE**
7. **Ulangi untuk GitHub**

#### STEP 3: Verify Configuration
```typescript
// Tambah ini di components/login/login-section.tsx untuk debugging
console.log('Supabase client:', supabase);
console.log('Auth state:', await supabase.auth.getSession());
```

#### STEP 4: Test Again
```bash
# Restart server
npm run dev

# Test di browser
# http://localhost:3000/login
```

---

# 📸 VISUAL GUIDE - SCREENSHOT AREAS

## 🖼️ Google Cloud Console Setup

### Screenshot 1: APIs & Services → Credentials
```
Pertanyaan: "Apakah Anda melihat OAuth 2.0 Client IDs?"
Harusnya ada: PMI Lampung - Web Client
```

### Screenshot 2: Edit OAuth Client
```
Authorized JavaScript origins:
✅ http://localhost:3000

Authorized redirect URIs:
✅ https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback
```

## 🖼️ Supabase Dashboard

### Screenshot 3: Authentication → Providers
```
Google: [TOGGLE SWITCH HIJAU/ON] ← HARUS ON!
GitHub: [TOGGLE SWITCH HIJAU/ON] ← HARUS ON!
```

### Screenshot 4: Google Provider Configuration
```
Client ID: [FILLED]
Client Secret: [FILLED]
Redirect URL: https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback
```

---

# 🔧 QUICK FIX COMMANDS

```bash
# 1. Restart everything
npm run dev

# 2. Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete

# 3. Check environment
cat .env | grep SUPABASE

# 4. Verify project structure
ls -la app/auth/
ls -la components/login/
```

---

# ⚡ EMERGENCY TROUBLESHOOTING

## Jika Masih Error Setelah Semua Setup:

### 1. Reset OAuth Configuration
```bash
# Backup .env
cp .env .env.backup

# Regenerate secrets di Google Cloud Console
# Regenerate secrets di GitHub
# Update .env dengan credentials baru
```

### 2. Check Project Permissions
- Pastikan akun Anda adalah **Owner** di Supabase project
- Pastikan tidak ada typo di Project ID

### 3. Alternative Testing
```typescript
// Test Supabase connection dulu
const { data, error } = await supabase.auth.getSession();
console.log('Session test:', { data, error });
```

### 4. Contact Support
Jika masih tidak bisa:
1. **Screenshot** Supabase Providers page
2. **Copy-paste** exact error message
3. **Share** .env (tanpa secrets) dan project structure

---

## 📞 Support Channels

### Immediate Help:
1. **Check Supabase Logs**: Dashboard → Logs → Auth logs
2. **Browser DevTools**: Network tab untuk detail error
3. **Clear Browser Cache**: Sering mengatasi masalah cache

### Community Support:
1. **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com/)
2. **Stack Overflow**: Tag dengan `supabase` dan `nextjs`
3. **GitHub Issues**: Untuk bug reports

### Local PMI Lampung Support:
- 📧 **Technical Lead**: [tech@pmilampung.org](mailto:tech@pmilampung.org)
- 📱 **WhatsApp Support**: +62-xxx-xxxx-xxxx
- 🌐 **Website**: [www.pmilampung.org](https://www.pmilampung.org)

---

**📝 Final Notes**: 

- **Dokumentasi ini dibuat khusus untuk PMI Lampung - Kisah Sukses project**
- **Selalu backup .env sebelum melakukan perubahan**
- **Untuk production deployment, ulangi setup dengan domain production**
- **Check dokumentasi Supabase terbaru untuk updates: [supabase.com/docs](https://supabase.com/docs)**

**🎯 Success Indicator**: OAuth setup berhasil jika Anda bisa login dengan Google/GitHub dan diarahkan ke `/dashboard` tanpa error.

