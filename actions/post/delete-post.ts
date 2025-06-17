"use server";

import { postDeleteSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";

export async function DeletePost(context: z.infer<typeof postDeleteSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const post = postDeleteSchema.parse(context);
    let deletedPost = null;
    let tableSource = '';

    // Coba hapus dari tabel posts terlebih dahulu
    const { data: postsData, error: postsError } = await supabase
      .from("posts")
      .delete()
      .match({ id: post.id, author_id: post.user_id })
      .select("*");

    // Jika berhasil dihapus dari posts
    if (!postsError && postsData && postsData.length > 0) {
      deletedPost = postsData[0];
      tableSource = 'posts';
      console.log(`Post dengan ID ${post.id} berhasil dihapus dari tabel posts`);
    } else {
      // Jika tidak ada di posts, coba hapus dari tabel drafts
      const { data: draftsData, error: draftsError } = await supabase
        .from("drafts")
        .delete()
        .match({ id: post.id, author_id: post.user_id })
        .select("*");

      // Jika berhasil dihapus dari drafts
      if (!draftsError && draftsData && draftsData.length > 0) {
        deletedPost = draftsData[0];
        tableSource = 'drafts';
        console.log(`Post dengan ID ${post.id} berhasil dihapus dari tabel drafts`);
      }
    }

    // Jika post berhasil dihapus, coba hapus gambar terkait
    if (deletedPost) {
      try {
        // Hapus cover image jika ada
        if (deletedPost.image) {
          const imagePath = deletedPost.image.split('/').pop(); // ambil nama file saja
          if (imagePath) {
            await supabase.storage
              .from('cover-image')
              .remove([imagePath]);
            console.log(`Cover image ${imagePath} berhasil dihapus`);
          }
        }

        // Hapus gambar-gambar dalam konten jika ada
        if (deletedPost.content) {
          // Extract image URLs from content (assuming markdown or HTML format)
          const imageMatches = deletedPost.content.match(/!\[.*?\]\((.*?)\)|<img[^>]+src=["']([^"']+)["']/g);
          if (imageMatches) {
            for (const match of imageMatches) {
              const urlMatch = match.match(/\((.*?)\)|src=["']([^"']+)["']/);
              if (urlMatch) {
                const imageUrl = urlMatch[1] || urlMatch[2];
                if (imageUrl && imageUrl.includes('supabase')) {
                  const imagePath = imageUrl.split('/').pop();
                  if (imagePath) {
                    await supabase.storage
                      .from('posts')
                      .remove([imagePath]);
                    console.log(`Content image ${imagePath} berhasil dihapus`);
                  }
                }
              }
            }
          }
        }
      } catch (storageError) {
        console.log('Error menghapus gambar:', storageError);
        // Jangan return false karena post sudah terhapus, hanya gambar yang gagal
      }

      // Return object dengan backward compatibility
      const result = {
        success: true,
        message: `Post berhasil dihapus dari tabel ${tableSource}`,
        data: deletedPost
      };
      
      // Tambah property untuk backward compatibility
      (result as any).valueOf = () => true;
      (result as any).toString = () => 'true';
      
      return result;
    }

    // Jika tidak ditemukan di kedua tabel
    console.log(`Post dengan ID ${post.id} tidak ditemukan di tabel posts maupun drafts`);
    return {
      success: false,
      message: 'Post tidak ditemukan atau Anda tidak memiliki izin untuk menghapusnya'
    };
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("Validation error:", error);
      return {
        success: false,
        message: 'Data tidak valid'
      };
    }
    console.log("Unexpected error:", error);
    return {
      success: false,
      message: 'Terjadi kesalahan sistem'
    };
  }
}
