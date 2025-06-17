"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";

export async function UpdatePost(context: z.infer<typeof postUpdateSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    const post = postUpdateSchema.parse(context);
    
    // Dapatkan user yang sedang login
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Coba update di tabel drafts terlebih dahulu
    const { data: draftData, error: draftError } = await supabase
      .from("drafts")
      .update({
        title: post.title,
        slug: post.slug,
        category_id: post.categoryId,
        description: post.description,
        image: post.image,
        content: post.content,
      })
      .eq("id", post.id)
      .eq("author_id", user.id) // Pastikan hanya pemilik yang bisa update
      .select()
      .single();

    // Jika berhasil update draft, kembalikan data
    if (!draftError && draftData) {
      return draftData;
    }

    // Jika tidak ada di drafts (PGRST116), coba di tabel posts
    if (draftError && draftError.code === 'PGRST116') {
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .update({
          title: post.title,
          slug: post.slug,
          category_id: post.categoryId,
          description: post.description,
          image: post.image,
          content: post.content,
        })
        .eq("id", post.id)
        .eq("author_id", user.id) // Pastikan hanya pemilik yang bisa update
        .select()
        .single();

      if (postError) {
        console.log("Error updating published post:", postError);
        return null;
      }
      
      return postData;
    }

    // Jika ada error lain pada draft
    console.log("Error updating draft:", draftError);
    return null;
    
  } catch (error) {
    console.log("Error in UpdatePost:", error);
    return null;
  }
}
