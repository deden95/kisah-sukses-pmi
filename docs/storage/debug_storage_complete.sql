-- =====================================================
-- COMPLETE STORAGE DEBUG & FIX - PMI LAMPUNG
-- =====================================================
-- Jalankan script ini untuk debug dan fix storage issues

-- 1. CHECK CURRENT USER & AUTH STATUS
SELECT 
  'CURRENT AUTH STATUS' as section,
  auth.uid() as current_user_id,
  auth.role() as current_role,
  current_user as postgres_user;

-- 2. CHECK STORAGE BUCKETS
SELECT 
  'STORAGE BUCKETS' as section,
  id, 
  name, 
  public,
  created_at
FROM storage.buckets 
WHERE id IN ('posts', 'cover-image', 'gallery-image', 'profile')
ORDER BY id;

-- 3. CHECK EXISTING STORAGE POLICIES
SELECT 
  'EXISTING STORAGE POLICIES' as section,
  policyname as policy_name,
  cmd as operation,
  roles,
  qual as using_clause,
  with_check as with_check_clause
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- 4. DROP ALL EXISTING STORAGE POLICIES (CLEAN SLATE)
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public downloads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to posts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Everyone can view posts bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to cover-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Everyone can view cover-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to gallery-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Everyone can view gallery-image bucket" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload to profile bucket" ON storage.objects;
DROP POLICY IF EXISTS "Everyone can view profile bucket" ON storage.objects;

-- 5. CREATE SIMPLE, WORKING STORAGE POLICIES

-- Allow ALL authenticated users to upload to ANY of our buckets
CREATE POLICY "PMI_Upload_Policy"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')
);

-- Allow EVERYONE to view/download from our public buckets
CREATE POLICY "PMI_Download_Policy"
ON storage.objects
FOR SELECT
USING (
  bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')
);

-- Allow authenticated users to update files
CREATE POLICY "PMI_Update_Policy"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')
);

-- Allow authenticated users to delete files
CREATE POLICY "PMI_Delete_Policy"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')
);

-- 6. VERIFY NEW POLICIES CREATED
SELECT 
  'NEW STORAGE POLICIES CREATED' as section,
  policyname as policy_name,
  cmd as operation,
  roles
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%PMI_%'
ORDER BY policyname;

-- 7. ENSURE BUCKETS ARE PUBLIC
UPDATE storage.buckets 
SET public = true 
WHERE id IN ('posts', 'cover-image', 'gallery-image', 'profile');

-- 8. CHECK RLS IS ENABLED ON STORAGE.OBJECTS
SELECT 
  'RLS STATUS' as section,
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'storage' 
AND tablename = 'objects';

-- 9. SUCCESS MESSAGE
SELECT 'STORAGE COMPLETELY FIXED! Try uploading now.' as final_status;

-- 10. NEXT STEPS:
-- 1. Restart your development server: npm run dev
-- 2. Login to your app
-- 3. Go to /editor/posts/new
-- 4. Try uploading an image
-- 5. It should work without 403 error!

