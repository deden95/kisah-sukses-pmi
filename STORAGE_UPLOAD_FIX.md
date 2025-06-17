# 🚨 Fix Storage Upload Error - PMI Lampung

> **❌ ERROR**: `tus: unexpected response while creating upload, originated from request (method: POST, url: https://ppsnfjaqfkyrhuoyfupg.supabase.co/storage/v1/upload/resumable, response code: 403, response text: new row violates row-level security policy)`

## 🔍 Penyebab Error

Error ini terjadi karena **Row Level Security (RLS) policies** untuk Supabase Storage belum dikonfigurasi dengan benar. User yang authenticated tidak memiliki permission untuk upload file ke storage buckets.

## ⚡ Solusi Cepat - 5 Menit

### 1. **Jalankan Script SQL Fix**

1. **Buka Supabase Dashboard**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Pilih project**: `ppsnfjaqfkyrhuoyfupg`
3. **Klik sidebar**: `SQL Editor`
4. **Klik "New query"**
5. **Copy script** dari file `fix_storage_rls.sql` dan paste ke editor
6. **Klik "Run"** untuk menjalankan script

### 2. **Manual Fix di Dashboard**

Jika tidak ingin menjalankan script, ikuti langkah manual:

#### A. Verifikasi Storage Buckets
1. **Sidebar**: `Storage`
2. **Pastikan buckets berikut ada**:
   - ✅ `posts` (Public)
   - ✅ `cover-image` (Public)
   - ✅ `gallery-image` (Public)
   - ✅ `profile` (Public)

#### B. Create Buckets Jika Belum Ada
1. **Klik "Create a new bucket"**
2. **Name**: `posts`
3. **Public bucket**: ✅ **CENTANG**
4. **Create bucket**
5. **Ulangi untuk**: `cover-image`, `gallery-image`, `profile`

#### C. Setup RLS Policies
1. **Sidebar**: `Authentication` → `Policies`
2. **Klik "New policy"**
3. **Table**: `storage.objects`
4. **Policy name**: `Authenticated users can upload`
5. **Allowed operation**: `INSERT`
6. **Target roles**: `authenticated`
7. **USING expression**: `true`
8. **WITH CHECK expression**: `bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')`
9. **Save policy**

### 3. **Test Upload**

```bash
# Restart development server
npm run dev

# Test upload gambar di:
# http://localhost:3000/editor/posts/new
```

---

## 🔧 Langkah Detail SQL Script

Jika ingin memahami apa yang dilakukan script `fix_storage_rls.sql`:

### 1. **Create Storage Buckets**
```sql
-- Membuat bucket jika belum ada
INSERT INTO storage.buckets (id, name, public)
VALUES ('posts', 'posts', true)
ON CONFLICT (id) DO NOTHING;
```

### 2. **Create RLS Policies**
```sql
-- Policy untuk upload (INSERT)
CREATE POLICY "Authenticated users can upload to posts bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'posts');

-- Policy untuk view (SELECT)
CREATE POLICY "Everyone can view posts bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'posts');
```

### 3. **Ensure Buckets are Public**
```sql
-- Pastikan bucket bersifat public
UPDATE storage.buckets 
SET public = true 
WHERE id IN ('posts', 'cover-image', 'gallery-image', 'profile');
```

---

## 🧪 Debugging Upload Issues

### 1. **Check Browser Console**
```javascript
// Buka Developer Tools (F12) → Console
// Saat upload gambar, lihat error details
console.log('Upload error details:', error);
```

### 2. **Check Supabase Logs**
1. **Supabase Dashboard** → **Logs**
2. **Filter**: `Storage` atau `Auth`
3. **Time range**: Last 1 hour
4. **Look for**: 403 errors atau RLS violations

### 3. **Check Authentication Status**
```javascript
// Pastikan user sudah login
const { data: session } = await supabase.auth.getSession();
console.log('User session:', session);
```

### 4. **Manual Bucket Test**
```javascript
// Test upload manual
const { data, error } = await supabase.storage
  .from('posts')
  .upload('test.jpg', file);
  
console.log('Upload result:', { data, error });
```

---

## 🔍 Common Issues & Solutions

### ❌ Issue 1: "Bucket does not exist"
**Solution**:
1. Buat bucket di Storage dashboard
2. Set sebagai Public
3. Restart development server

### ❌ Issue 2: "User not authenticated"
**Solution**:
1. Pastikan OAuth sudah di-setup dengan benar
2. Login ulang ke aplikasi
3. Check session dengan `supabase.auth.getSession()`

### ❌ Issue 3: "Policy not found"
**Solution**:
1. Jalankan script `fix_storage_rls.sql`
2. Atau buat policies manual di Authentication → Policies

### ❌ Issue 4: "File size too large"
**Solution**:
1. Check file size (max 50MB untuk Supabase free tier)
2. Compress gambar sebelum upload
3. Implement client-side validation

---

## 📋 Checklist Setelah Fix

### ✅ Supabase Dashboard Check
- [ ] **Storage buckets ada**: `posts`, `cover-image`, `gallery-image`, `profile`
- [ ] **All buckets are PUBLIC**: Toggle switch ON
- [ ] **RLS policies ada**: Minimal INSERT dan SELECT policies
- [ ] **No error di Logs**: Check storage dan auth logs

### ✅ Application Check
- [ ] **User bisa login**: OAuth working
- [ ] **Upload gambar di editor**: Tidak ada error 403
- [ ] **Gambar muncul di preview**: URL accessible
- [ ] **File tersimpan di Storage**: Check di dashboard

### ✅ Browser Check
- [ ] **No console errors**: F12 → Console clean
- [ ] **Network requests success**: F12 → Network tab
- [ ] **Images load properly**: Check image URLs

---

## 🚨 Emergency Commands

```bash
# 1. Restart everything
npm run dev

# 2. Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Clear cookies for localhost:3000

# 3. Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Re-login to app
# Logout dan login ulang dengan OAuth
```

---

## 📞 Support

Jika masalah upload masih berlanjut:

1. **Screenshot error** di browser console
2. **Copy exact error message** dari Uppy/tus
3. **Check Supabase logs** untuk detail error
4. **Contact support**:
   - 📧 Email: tech@pmilampung.org
   - 💬 WhatsApp: +62-xxx-xxxx-xxxx
   - 🌐 GitHub Issues: Report bug dengan error details

---

**🎯 Success Indicator**: 
Upload berhasil jika bisa upload gambar di editor dan file muncul di preview tanpa error 403.

**📝 Note**: 
Setelah fix ini, semua authenticated users bisa upload ke semua storage buckets. Untuk production, pertimbangkan implementasi policies yang lebih restrictive berdasarkan ownership.

