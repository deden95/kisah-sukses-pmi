"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function PublishDraft(draftId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    // First, get the draft data
    const { data: draft, error: fetchError } = await supabase
      .from("drafts")
      .select("*")
      .eq("id", draftId)
      .single();

    if (fetchError) {
      console.log("Error fetching draft:", fetchError);
      return { success: false, error: "Draft not found" };
    }

    // Check if draft has required fields
    if (!draft.title || !draft.content || !draft.category_id) {
      return { 
        success: false, 
        error: "Post harus memiliki title, content, dan category sebelum dipublish" 
      };
    }

    // Insert into posts table
    const { data: publishedPost, error: insertError } = await supabase
      .from("posts")
      .insert({
        id: draft.id, // Keep the same ID
        title: draft.title,
        slug: draft.slug,
        category_id: draft.category_id,
        description: draft.description,
        image: draft.image,
        content: draft.content,
        author_id: draft.author_id,
        published: true,
        created_at: draft.created_at,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.log("Error publishing post:", insertError);
      return { success: false, error: "Failed to publish post" };
    }

    // Delete from drafts table
    const { error: deleteError } = await supabase
      .from("drafts")
      .delete()
      .eq("id", draftId);

    if (deleteError) {
      console.log("Error deleting draft:", deleteError);
      // If delete fails, we should also remove from posts to maintain consistency
      await supabase.from("posts").delete().eq("id", draftId);
      return { success: false, error: "Failed to remove draft after publishing" };
    }

    return { 
      success: true, 
      data: publishedPost,
      message: "Post berhasil dipublish!" 
    };

  } catch (error) {
    console.log("Error in PublishDraft:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

