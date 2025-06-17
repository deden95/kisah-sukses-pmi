#!/usr/bin/env node

/**
 * Script untuk setup database PMI Lampung Kisah Sukses
 * 
 * Cara penggunaan:
 * 1. Pastikan sudah ada project Supabase
 * 2. Set environment variables:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *    - SUPABASE_SERVICE_ROLE_KEY (untuk admin operations)
 * 3. Jalankan: node scripts/setup-database.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  console.log('🚀 Memulai setup database PMI Lampung Kisah Sukses...\n');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Environment variables tidak ditemukan!');
    console.error('Pastikan NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah diset.');
    process.exit(1);
  }

  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('✅ Terhubung ke Supabase');

    // Check if categories table exists and has data
    const { data: existingCategories, error: checkError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingCategories && existingCategories.length > 0) {
      console.log('✅ Tabel categories sudah ada dan memiliki data');
      
      // Show existing categories
      const { data: allCategories } = await supabase
        .from('categories')
        .select('*')
        .order('title');
      
      console.log('\n📋 Kategori yang tersedia:');
      allCategories?.forEach(cat => {
        console.log(`   - ${cat.title} (${cat.slug})`);
      });
      
      console.log('\n✨ Database sudah siap digunakan!');
      return;
    }

    // Insert categories if they don't exist
    console.log('📝 Menambahkan kategori PMI...');
    
    const categories = [
      { title: 'Donor Darah', slug: 'donor-darah' },
      { title: 'Kemanusiaan', slug: 'kemanusiaan' },
      { title: 'Kisah Sukses', slug: 'kisah-sukses' },
      { title: 'Kesehatan', slug: 'kesehatan' },
      { title: 'Pendidikan', slug: 'pendidikan' }
    ];

    const { data: insertedCategories, error: insertError } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (insertError) {
      throw insertError;
    }

    console.log('✅ Kategori berhasil ditambahkan:');
    insertedCategories?.forEach(cat => {
      console.log(`   - ${cat.title} (ID: ${cat.id})`);
    });

    console.log('\n✨ Setup database selesai!');
    console.log('\n📝 Langkah selanjutnya:');
    console.log('   1. Pastikan storage buckets sudah dibuat:');
    console.log('      - posts');
    console.log('      - cover-image'); 
    console.log('      - gallery-image');
    console.log('      - profile');
    console.log('   2. Set RLS policies jika diperlukan');
    console.log('   3. Test aplikasi dengan membuat post baru');

  } catch (error) {
    console.error('❌ Error saat setup database:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Pastikan Supabase project sudah aktif');
    console.error('   2. Cek kembali environment variables');
    console.error('   3. Pastikan service role key memiliki permissions yang tepat');
    process.exit(1);
  }
}

// Run the setup
setupDatabase();

