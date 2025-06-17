import { createClient } from "@/utils/supabase/client";

export async function getCategories() {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      console.log("Error fetching categories:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.log("Error in getCategories:", error);
    return [];
  }
}

export async function getCategoryById(id: string) {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("Error fetching category:", error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Error in getCategoryById:", error);
    return null;
  }
}

