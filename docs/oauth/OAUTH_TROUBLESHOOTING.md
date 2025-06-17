# 🚨 OAuth Quick Troubleshooting Guide - PMI Lampung

> **⚡ QUICK FIX**: Untuk error `"Unsupported provider: provider is not enabled"`

## 🎯 ERROR YANG SERING TERJADI

### ❌ Error: "Unsupported provider: provider is not enabled"

**🔍 PENYEBAB**: OAuth providers (Google/GitHub) belum di-enable di Supabase Dashboard.

**⚡ SOLUSI CEPAT**:

1. **Buka Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Pilih project**: `ppsnfjaqfkyrhuoyfupg`
3. **Klik sidebar**: `Authentication` → `Providers`
4. **Enable Google**: Toggle switch harus **HIJAU/ON**
5. **Enable GitHub**: Toggle switch harus **HIJAU/ON**
6. **Isi credentials** dan **SAVE**
7. **Restart server**: `npm run dev`

---

## 📋 CHECKLIST 5 MENIT

### ✅ Supabase Dashboard Check
- [ ] **Project ID benar**: `ppsnfjaqfkyrhuoyfupg`
- [ ] **Authentication → Providers**: Google toggle **ON**
- [ ] **Authentication → Providers**: GitHub toggle **ON**
- [ ] **Google Client ID**: Sudah diisi
- [ ] **Google Client Secret**: Sudah diisi
- [ ] **GitHub Client ID**: Sudah diisi
- [ ] **GitHub Client Secret**: Sudah diisi
- [ ] **Authentication → Settings → Site URL**: `http://localhost:3000`
- [ ] **Redirect URLs**: `http://localhost:3000/auth/callback`

### ✅ Google Cloud Console Check
- [ ] **Project**: `PMI Lampung Kisah Sukses` ada
- [ ] **APIs & Services → Credentials**: OAuth Client ID ada
- [ ] **Authorized JavaScript origins**: `http://localhost:3000`
- [ ] **Authorized redirect URIs**: `https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback`

### ✅ GitHub Developer Settings Check
- [ ] **OAuth App**: `PMI Lampung Kisah Sukses` ada
- [ ] **Authorization callback URL**: `https://ppsnfjaqfkyrhuoyfupg.supabase.co/auth/v1/callback`

### ✅ Local Environment Check
- [ ] **File .env**: Sudah ada dan terisi
- [ ] **NEXT_PUBLIC_SUPABASE_URL**: `https://ppsnfjaqfkyrhuoyfupg.supabase.co`
- [ ] **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Sudah diisi
- [ ] **Server restart**: `npm run dev` setelah perubahan

---

## 🔧 QUICK COMMANDS

```bash
# Check environment variables
cat .env | grep SUPABASE

# Restart server
npm run dev

# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete

# Check if files exist
ls -la app/auth/callback/
ls -la components/login/
```

---

## 🔍 DEBUG STEPS

### 1. Browser Console Debug
```javascript
// Buka Developer Tools (F12) → Console
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);
```

### 2. Network Tab Debug
1. Buka **Developer Tools** (F12)
2. Klik tab **Network**
3. Klik "Sign in with Google"
4. Lihat **failed request** dan **response error**

### 3. Supabase Logs Debug
1. Buka **Supabase Dashboard**
2. Klik **Logs** di sidebar
3. Pilih **Auth logs**
4. Cari error messages

---

## ⚡ EMERGENCY FIXES

### Fix 1: Reset Supabase Auth
```bash
# Backup current .env
cp .env .env.backup

# Go to Supabase Dashboard
# Authentication → Providers
# Disable dan enable ulang Google & GitHub
```

### Fix 2: Regenerate OAuth Credentials
1. **Google Cloud Console**: Generate new Client Secret
2. **GitHub Developer Settings**: Generate new Client Secret
3. **Update Supabase** dengan credentials baru
4. **Update .env** jika diperlukan

### Fix 3: Clear Everything
```bash
# Stop server
# Ctrl+C

# Clear node modules (jika desperate)
rm -rf node_modules
npm install

# Clear browser cache completely
# Clear cookies for localhost:3000

# Restart
npm run dev
```

---

## 📱 Test OAuth After Fix

```bash
# 1. Start server
npm run dev

# 2. Open browser
# http://localhost:3000/login

# 3. Test Google OAuth
# Klik "Sign in with Google"
# Harus redirect ke Google
# Harus redirect balik ke dashboard

# 4. Test GitHub OAuth
# Klik "Sign in with GitHub"
# Harus redirect ke GitHub
# Harus redirect balik ke dashboard
```

---

## 🆘 STILL NOT WORKING?

### Langkah Terakhir:

1. **Screenshot** Supabase Providers page
2. **Copy error message** lengkap dari browser console
3. **Check** file `.env` (sembunyikan secrets)
4. **Contact support** dengan info di atas

### Support Contacts:
- 📧 **Email**: tech@pmilampung.org
- 💬 **WhatsApp**: +62-xxx-xxxx-xxxx
- 🌐 **GitHub Issues**: Report di repository

---

**🎯 SUCCESS INDICATOR**: 
OAuth berhasil jika bisa login dengan Google/GitHub dan masuk ke dashboard tanpa error `"Unsupported provider"`.

**📝 Note**: 
Jika masih error setelah mengikuti semua langkah, kemungkinan ada masalah dengan:
- Supabase project permissions
- OAuth app configuration
- Network/firewall issues

Dalam kasus ini, contact support dengan screenshot dan error messages.

