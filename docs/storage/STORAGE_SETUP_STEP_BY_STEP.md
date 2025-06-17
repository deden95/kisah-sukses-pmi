# 📝 Step-by-Step: Fix Storage Upload Error

> **🎯 UNTUK PROJECT**: PMI Lampung Kisah Sukses (`ppsnfjaqfkyrhuoyfupg`)
> 
> **❌ ERROR**: `response code: 403, response text: new row violates row-level security policy`

---

## 🔥 LANGKAH 1: Buat Storage Buckets

### A. Buka Supabase Dashboard
1. **Klik link**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Login** dengan akun Supabase Anda
3. **Klik project**: `ppsnfjaqfkyrhuoyfupg`

### B. Masuk ke Storage
1. **Di sidebar kiri**, klik **"Storage"**
2. Anda akan melihat halaman storage (mungkin kosong)

### C. Buat Bucket #1: `posts`
1. **Klik tombol hijau**: **"Create a new bucket"**
2. **Isi form**:
   - **Name**: `posts`
   - **Public bucket**: ✅ **CENTANG** (ini penting!)
3. **Klik**: **"Create bucket"**
4. **Verify**: Bucket `posts` muncul di list

### D. Buat Bucket #2: `cover-image`
1. **Klik lagi**: **"Create a new bucket"**
2. **Isi form**:
   - **Name**: `cover-image`
   - **Public bucket**: ✅ **CENTANG**
3. **Klik**: **"Create bucket"**

### E. Buat Bucket #3: `gallery-image`
1. **Klik lagi**: **"Create a new bucket"**
2. **Isi form**:
   - **Name**: `gallery-image`
   - **Public bucket**: ✅ **CENTANG**
3. **Klik**: **"Create bucket"**

### F. Buat Bucket #4: `profile`
1. **Klik lagi**: **"Create a new bucket"**
2. **Isi form**:
   - **Name**: `profile`
   - **Public bucket**: ✅ **CENTANG**
3. **Klik**: **"Create bucket"**

### ✅ Verifikasi Buckets
Sekarang di halaman Storage, Anda harus melihat 4 buckets:
- ✅ `posts` (public)
- ✅ `cover-image` (public)
- ✅ `gallery-image` (public)
- ✅ `profile` (public)

---

## 🔥 LANGKAH 2: Setup RLS Policies

### A. Masuk ke SQL Editor
1. **Di sidebar kiri**, klik **"SQL Editor"**
2. **Klik**: **"New query"**

### B. Copy-Paste Script
1. **Buka file**: `fix_storage_rls.sql` di project Anda
2. **Copy semua isi file** (Ctrl+A, Ctrl+C)
3. **Paste ke SQL Editor** di Supabase (Ctrl+V)

### C. Jalankan Script
1. **Klik tombol**: **"Run"** (atau Ctrl+Enter)
2. **Tunggu** sampai selesai
3. **Harus muncul pesan**: `"Storage RLS policies fixed successfully!"`

### ❌ Jika Ada Error
Jika muncul error `table "storage.buckets" does not exist`, berarti buckets belum dibuat. **Ulangi Langkah 1**.

---

## 🔥 LANGKAH 3: Test Upload

### A. Restart Development Server
```bash
# Di terminal project Anda:
# Stop server dengan Ctrl+C, lalu:
npm run dev
```

### B. Test Upload di Browser
1. **Buka**: `http://localhost:3000/login`
2. **Login** dengan Google atau GitHub
3. **Masuk ke**: `http://localhost:3000/editor/posts/new`
4. **Coba upload gambar** di editor

### ✅ Berhasil Jika:
- Tidak ada error 403
- Gambar muncul di preview
- Progress bar upload sampai 100%

---

## 🔧 JIKA MASIH ERROR

### Problem 1: "Bucket does not exist"
**Solusi**: Ulangi Langkah 1, pastikan bucket name exactly: `posts`, `cover-image`, `gallery-image`, `profile`

### Problem 2: "User not authenticated"
**Solusi**: 
1. Check OAuth sudah di-setup (lihat OAUTH_SETUP.md)
2. Logout dan login ulang
3. Check di browser console: `supabase.auth.getSession()`

### Problem 3: "Policy not found" 
**Solusi**: Ulangi Langkah 2, pastikan script berjalan tanpa error

### Problem 4: Masih 403 Error
**Manual Policy Creation**:
1. **Supabase Dashboard** → **Authentication** → **Policies**
2. **Klik**: **"New policy"**
3. **Isi**:
   - **Table**: `storage.objects`
   - **Policy name**: `Allow authenticated uploads`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated`
   - **WITH CHECK**: `bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')`
4. **Save policy**

---

## 📸 Visual Verification

### Screenshot 1: Storage Buckets
```
Di halaman Storage, Anda harus melihat:

[CREATE A NEW BUCKET] button

buckets/
├── 📁 posts (public)
├── 📁 cover-image (public)
├── 📁 gallery-image (public)
└── 📁 profile (public)
```

### Screenshot 2: SQL Editor Success
```
[ ✓ ] Storage RLS policies fixed successfully! You can now upload images.

Rows: 1
Time: 2.3s
```

### Screenshot 3: Upload Success
```
Di editor posts, saat upload gambar:
- Progress bar: [##########] 100%
- Image preview muncul
- No error 403 di console
```

---

## 📱 Quick Test Commands

```bash
# 1. Check environment
cat .env | grep SUPABASE_URL

# 2. Restart server
npm run dev

# 3. Check di browser console (F12)
# Paste ini di console:
supabase.auth.getSession().then(console.log)

# 4. Test upload manual (di console)
const file = new File(['test'], 'test.jpg', {type: 'image/jpeg'});
supabase.storage.from('posts').upload('test.jpg', file).then(console.log);
```

---

## 🎆 Success Checklist

### ✅ Final Verification
- [ ] **4 buckets exist**: posts, cover-image, gallery-image, profile
- [ ] **All buckets are public**: Green "public" badge
- [ ] **RLS policies created**: No error saat run script SQL
- [ ] **User can login**: OAuth working
- [ ] **Upload works**: No 403 error di editor
- [ ] **Images display**: Preview shows uploaded image
- [ ] **Console clean**: No errors di browser F12

### 🎯 You're Done!
Jika semua checklist ✅, upload gambar sudah berhasil diperbaiki!

---

**📧 Need Help?**
- Email: tech@pmilampung.org
- WhatsApp: +62-xxx-xxxx-xxxx
- Screenshot error + kirim ke support

