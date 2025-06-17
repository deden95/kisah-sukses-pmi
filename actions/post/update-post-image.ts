"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function UpdatePostImage(postId: string, imageName: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    // Dapatkan user yang sedang login
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Update image field in drafts table
    const { data: draftData, error: draftError } = await supabase
      .from("drafts")
      .update({ image: imageName })
      .eq("id", postId)
      .eq("author_id", user.id) // Pastikan hanya pemilik yang bisa update
      .select()
      .single();

    if (draftError && draftError.code !== 'PGRST116') {
      console.log("Error updating draft image:", draftError);
    }

    // Also try to update posts table in case it's already published
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .update({ image: imageName })
      .eq("id", postId)
      .eq("author_id", user.id) // Pastikan hanya pemilik yang bisa update
      .select()
      .single();

    if (postError && postError.code !== 'PGRST116') {
      console.log("Error updating post image:", postError);
    }

    return { success: true, data: draftData || postData };
  } catch (error) {
    console.log("Error in UpdatePostImage:", error);
    return { success: false, error: "Failed to update image" };
  }
}

