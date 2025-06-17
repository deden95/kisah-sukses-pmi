-- =====================================================
-- ALTERNATIVE STORAGE FIX (SUPER PERMISSIVE)
-- =====================================================
-- Jika script lain tidak berhasil, gunakan ini
-- Ini akan memberikan akses penuh untuk testing

-- Drop semua policies yang ada
DROP POLICY IF EXISTS "PMI_Upload_Policy" ON storage.objects;
DROP POLICY IF EXISTS "PMI_Download_Policy" ON storage.objects;
DROP POLICY IF EXISTS "PMI_Update_Policy" ON storage.objects;
DROP POLICY IF EXISTS "PMI_Delete_Policy" ON storage.objects;

-- Policy super permissive untuk testing
-- HANYA UNTUK DEVELOPMENT/TESTING!

-- Allow ANYONE (authenticated OR anonymous) to upload
CREATE POLICY "Allow_All_Uploads_Testing"
ON storage.objects
FOR INSERT
WITH CHECK (true);

-- Allow ANYONE to download
CREATE POLICY "Allow_All_Downloads_Testing"
ON storage.objects
FOR SELECT
USING (true);

-- Allow ANYONE to update
CREATE POLICY "Allow_All_Updates_Testing"
ON storage.objects
FOR UPDATE
USING (true);

-- Allow ANYONE to delete
CREATE POLICY "Allow_All_Deletes_Testing"
ON storage.objects
FOR DELETE
USING (true);

-- Pastikan buckets public
UPDATE storage.buckets SET public = true;

-- Check results
SELECT 'SUPER PERMISSIVE POLICIES CREATED - FOR TESTING ONLY!' as status;

-- PERINGATAN: Policies ini SANGAT permissive
-- Hanya untuk testing upload functionality
-- Setelah upload berhasil, ganti dengan policies yang lebih secure

