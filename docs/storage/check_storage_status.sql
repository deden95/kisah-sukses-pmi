-- =====================================================
-- CHECK STORAGE STATUS - PMI LAMPUNG
-- =====================================================
-- Jalankan script ini untuk mengecek status storage

-- 1. Check apakah storage buckets sudah ada
SELECT 
  'STORAGE BUCKETS STATUS' as section,
  id, 
  name, 
  public,
  created_at
FROM storage.buckets 
WHERE id IN ('posts', 'cover-image', 'gallery-image', 'profile')
ORDER BY id;

-- 2. Check storage policies
SELECT 
  'STORAGE POLICIES STATUS' as section,
  policyname as policy_name,
  tablename as table_name,
  cmd as operation,
  roles
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- 3. Check apakah ada files di storage
SELECT 
  'FILES IN STORAGE' as section,
  bucket_id,
  COUNT(*) as file_count
FROM storage.objects 
WHERE bucket_id IN ('posts', 'cover-image', 'gallery-image', 'profile')
GROUP BY bucket_id
ORDER BY bucket_id;

-- Jika semua query di atas error, berarti:
-- 1. Storage buckets belum dibuat
-- 2. Storage policies belum ada
-- 3. Perlu setup manual di dashboard

