-- =====================================================
-- FIX STORAGE RLS POLICIES - PMI LAMPUNG KISAH SUKSES
-- =====================================================
-- Jalankan script ini SETELAH membuat storage buckets manual
-- Error: "new row violates row-level security policy"

-- ⚠️ PENTING: Script ini hanya berfungsi SETELAH Anda membuat 
-- storage buckets secara manual di Supabase Dashboard!

-- =====================================================
-- 1. VERIFY STORAGE BUCKETS EXIST
-- =====================================================
-- Cek apakah buckets sudah dibuat (akan error jika belum ada)
SELECT id, name, public FROM storage.buckets 
WHERE id IN ('posts', 'cover-image', 'gallery-image', 'profile');

-- Jika query di atas mengembalikan error atau kosong, 
-- Anda harus membuat buckets manual dulu di Dashboard!

-- =====================================================
-- 2. DROP EXISTING STORAGE POLICIES (Jika ada)
-- =====================================================

DROP POLICY IF EXISTS "Authenticated users can upload to posts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view posts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update posts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete posts bucket" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated users can upload to cover-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view cover-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update cover-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete cover-image bucket" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated users can upload to gallery-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view gallery-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update gallery-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete gallery-image bucket" ON storage.objects;

DROP POLICY IF EXISTS "Authenticated users can upload to profile bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can view profile bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update profile bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete profile bucket" ON storage.objects;

-- =====================================================
-- 3. CREATE STORAGE RLS POLICIES
-- =====================================================

-- POSTS BUCKET POLICIES
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload to posts bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'posts');

-- Allow everyone to view (public bucket)
CREATE POLICY "Everyone can view posts bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'posts');

-- Allow authenticated users to update their own files
CREATE POLICY "Authenticated users can update posts bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'posts');

-- Allow authenticated users to delete their own files
CREATE POLICY "Authenticated users can delete posts bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'posts');

-- COVER-IMAGE BUCKET POLICIES
CREATE POLICY "Authenticated users can upload to cover-image bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'cover-image');

CREATE POLICY "Everyone can view cover-image bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'cover-image');

CREATE POLICY "Authenticated users can update cover-image bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'cover-image');

CREATE POLICY "Authenticated users can delete cover-image bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'cover-image');

-- GALLERY-IMAGE BUCKET POLICIES
CREATE POLICY "Authenticated users can upload to gallery-image bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-image');

CREATE POLICY "Everyone can view gallery-image bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'gallery-image');

CREATE POLICY "Authenticated users can update gallery-image bucket"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery-image');

CREATE POLICY "Authenticated users can delete gallery-image bucket"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-image');

-- PROFILE BUCKET POLICIES
CREATE POLICY "Authenticated users can upload to profile bucket"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile');

CREATE POLICY "Everyone can view profile bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile');

CREATE POLICY "Users can update own profile images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'profile' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own profile images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'profile' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- 4. VERIFY BUCKETS ARE PUBLIC
-- =====================================================

UPDATE storage.buckets 
SET public = true 
WHERE id IN ('posts', 'cover-image', 'gallery-image', 'profile');

-- =====================================================
-- 5. SUCCESS MESSAGE
-- =====================================================

SELECT 'Storage RLS policies fixed successfully! You can now upload images.' as status;

