import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getCategories() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
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

