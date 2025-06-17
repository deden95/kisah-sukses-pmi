# 🔐 OAuth Authentication Setup Guide

## 📋 Overview

Aplikasi PMI Lampung Kisah Sukses menggunakan Supabase Auth dengan OAuth providers untuk autentikasi. Sistem ini mendukung:
- 📱 **Google OAuth** - Login dengan akun Google
- 🐙 **GitHub OAuth** - Login dengan akun GitHub

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

## ⚙️ Setup OAuth Providers

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

## 📞 Support

Jika masih mengalami kendala dengan OAuth setup:

1. **Check Supabase Logs**: Dashboard → Logs → Auth logs
2. **Browser DevTools**: Check Network tab untuk error details
3. **Supabase Community**: [Discord](https://discord.supabase.com/)
4. **GitHub Issues**: Report bugs di repository

---

**📝 Note**: Dokumentasi ini dibuat khusus untuk PMI Lampung - Kisah Sukses project. Untuk update terbaru, selalu check repository dan Supabase documentation.

