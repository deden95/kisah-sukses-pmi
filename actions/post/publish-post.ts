"use server";

import { postUpdateSchema } from "@/lib/validation/post";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import * as z from "zod";

// Schema untuk publish post
export const postPublishSchema = postUpdateSchema.extend({
  published: z.boolean().default(true),
});

export async function PublishPost(context: z.infer<typeof postPublishSchema>) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    const post = postPublishSchema.parse(context);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // 1. Get the draft data
    const { data: draftData, error: draftError } = await supabase
      .from("drafts")
      .select("*")
      .eq("id", post.id)
      .eq("author_id", user.id)
      .single();

    if (draftError || !draftData) {
      console.log("Draft not found:", draftError);
      return { success: false, error: "Draft not found" };
    }

    // 2. Insert into posts table with updated data
    const { data: publishedPost, error: publishError } = await supabase
      .from("posts")
      .insert({
        id: draftData.id, // Keep same ID
        title: post.title,
        slug: post.slug,
        category_id: post.categoryId,
        description: post.description,
        image: post.image,
        content: post.content,
        author_id: user.id,
        published: true,
        created_at: draftData.created_at, // Keep original creation date
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (publishError) {
      console.log("Publish error:", publishError);
      return { success: false, error: "Failed to publish post" };
    }

    // 3. Delete from drafts table (move to posts)
    const { error: deleteDraftError } = await supabase
      .from("drafts")
      .delete()
      .eq("id", post.id)
      .eq("author_id", user.id);

    if (deleteDraftError) {
      console.log("Delete draft error:", deleteDraftError);
      // Rollback: delete from posts if draft deletion failed
      await supabase.from("posts").delete().eq("id", post.id);
      return { success: false, error: "Failed to move draft to published" };
    }

    return { success: true, data: publishedPost };
  } catch (error) {
    console.log("Publish post error:", error);
    return { success: false, error: "Failed to publish post" };
  }
}

// Function to unpublish (move back to draft)
export async function UnpublishPost(postId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // 1. Get the published post data
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .eq("author_id", user.id)
      .single();

    if (postError || !postData) {
      console.log("Published post not found:", postError);
      return { success: false, error: "Published post not found" };
    }

    // 2. Insert back into drafts table
    const { data: draftData, error: insertDraftError } = await supabase
      .from("drafts")
      .insert({
        id: postData.id,
        title: postData.title,
        slug: postData.slug,
        category_id: postData.category_id,
        description: postData.description,
        image: postData.image,
        content: postData.content,
        author_id: postData.author_id,
        published: false, // Mark as draft
        created_at: postData.created_at, // Keep original creation date
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertDraftError) {
      console.log("Insert draft error:", insertDraftError);
      return { success: false, error: "Failed to move to drafts" };
    }

    // 3. Delete from posts table (move to drafts)
    const { error: deletePostError } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId)
      .eq("author_id", user.id);

    if (deletePostError) {
      console.log("Delete post error:", deletePostError);
      // Rollback: delete from drafts if post deletion failed
      await supabase.from("drafts").delete().eq("id", postId);
      return { success: false, error: "Failed to unpublish post" };
    }

    return { success: true, data: draftData };
  } catch (error) {
    console.log("Unpublish post error:", error);
    return { success: false, error: "Failed to unpublish post" };
  }
}

