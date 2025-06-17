# 🚨 URGENT: Fix Storage Upload NOW!

> **❌ ERROR ANDA**: `response code: 403, response text: new row violates row-level security policy`

> **⚡ QUICK FIX**: 5 menit untuk mengatasi masalah upload gambar

---

## 🔥 STEP 1: Cek Status Storage (1 menit)

### A. Buka Supabase Dashboard
1. **Klik**: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Pilih project**: `ppsnfjaqfkyrhuoyfupg` 
3. **Klik sidebar**: `Storage`

### B. Cek Apakah Ada Buckets
**Pertanyaan**: Apakah Anda melihat folder berikut?
- 📁 `posts`
- 📁 `cover-image` 
- 📁 `gallery-image`
- 📁 `profile`

**Jika TIDAK ADA buckets → Lanjut ke STEP 2**
**Jika ADA buckets → Skip ke STEP 3**

---

## 🔥 STEP 2: Buat Storage Buckets (2 menit)

### Buat 4 Buckets Ini:

1. **Klik**: `Create a new bucket`
   - **Name**: `posts`
   - **Public bucket**: ✅ **CENTANG**
   - **Create**

2. **Klik**: `Create a new bucket`
   - **Name**: `cover-image`
   - **Public bucket**: ✅ **CENTANG**
   - **Create**

3. **Klik**: `Create a new bucket`
   - **Name**: `gallery-image`
   - **Public bucket**: ✅ **CENTANG**
   - **Create**

4. **Klik**: `Create a new bucket`
   - **Name**: `profile`
   - **Public bucket**: ✅ **CENTANG**
   - **Create**

### ✅ Verifikasi
Sekarang Anda harus melihat 4 buckets dengan badge "public"

---

## 🔥 STEP 3: Setup RLS Policies (2 menit)

### A. Buka SQL Editor
1. **Sidebar**: `SQL Editor`
2. **Klik**: `New query`

### B. Copy-Paste Script
```sql
-- COPY PASTE SCRIPT INI KE SQL EDITOR:

-- Create storage policies untuk upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile'));

-- Create storage policies untuk view
CREATE POLICY "Allow public downloads"
ON storage.objects
FOR SELECT
USING (bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile'));

-- Create storage policies untuk update
CREATE POLICY "Allow authenticated updates"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile'));

-- Create storage policies untuk delete
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile'));

SELECT 'Storage policies created successfully!' as status;
```

### C. Jalankan
1. **Klik**: `Run` (atau Ctrl+Enter)
2. **Tunggu** sampai muncul: `Storage policies created successfully!`

---

## 🔥 STEP 4: Test Upload (30 detik)

### A. Restart Server
```bash
# Di terminal:
npm run dev
```

### B. Test Upload
1. **Buka**: `http://localhost:3000/login`
2. **Login** dengan Google/GitHub
3. **Buka**: `http://localhost:3000/editor/posts/new`
4. **Upload gambar** di editor

### ✅ Berhasil Jika:
- No error 403
- Progress bar sampai 100%
- Gambar muncul di preview
- No error di console (F12)

---

## 🚨 JIKA MASIH ERROR

### Error: "Bucket does not exist"
**Solusi**: Ulangi STEP 2, pastikan bucket name persis: `posts`, `cover-image`, `gallery-image`, `profile`

### Error: "User not authenticated"
**Solusi**: 
1. Logout dan login ulang
2. Cek OAuth setup di [OAUTH_TROUBLESHOOTING.md](./OAUTH_TROUBLESHOOTING.md)

### Error: "Policy already exists"
**Solusi**: Abaikan, ini normal. Yang penting upload berfungsi.

### Masih 403 Error
**Manual Policy Creation**:
1. **Dashboard** → **Authentication** → **Policies**
2. **New policy** → **Table**: `storage.objects`
3. **Policy name**: `Upload files`
4. **Operation**: `INSERT` 
5. **Target roles**: `authenticated`
6. **WITH CHECK**: `true`
7. **Save**

---

## 📱 Quick Commands

```bash
# 1. Restart server
npm run dev

# 2. Check di browser console (F12)
supabase.auth.getSession().then(console.log)

# 3. Test upload manual
const file = new File(['test'], 'test.jpg', {type: 'image/jpeg'});
supabase.storage.from('posts').upload('test.jpg', file).then(console.log);
```

---

## ✅ Success Checklist

- [ ] **4 storage buckets created**: posts, cover-image, gallery-image, profile
- [ ] **All buckets are public**: Green "public" badge visible
- [ ] **RLS policies created**: SQL script ran successfully
- [ ] **User can login**: OAuth working
- [ ] **Upload works**: No 403 error in editor
- [ ] **Images display**: Preview shows uploaded image
- [ ] **user-placeholder.png exists**: Fixed by copying Pmi.png

---

**🎯 If all checkboxes ✅, your upload is FIXED!**

**📧 Still broken?** Screenshot the error + email: tech@pmilampung.org

