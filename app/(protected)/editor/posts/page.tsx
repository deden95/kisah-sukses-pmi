import PostTableEmpty from "@/components/protected/post/post-emtpy-table";
import PostRefreshOnce from "@/components/protected/post/post-refresh-once";
import PostTableTitle from "@/components/protected/post/post-table-title";
import { columns } from "@/components/protected/post/table/columns";
import { DataTable } from "@/components/protected/post/table/data-table";
import { protectedPostConfig } from "@/config/protected";
import { Draft } from "@/types/collection";
import type { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: protectedPostConfig.title,
  description: protectedPostConfig.description,
};

interface PostsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const PostsPage: FC<PostsPageProps> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Fetch user data
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch drafts
  const { data: draftsData, error: draftsError } = await supabase
    .from("drafts")
    .select(`*, categories(*)`)
    .order("created_at", { ascending: false })
    .match({ author_id: user?.id })
    .returns<Draft[]>();

  // Fetch published posts
  const { data: postsData, error: postsError } = await supabase
    .from("posts")
    .select(`*, categories(*)`)
    .order("created_at", { ascending: false })
    .match({ author_id: user?.id })
    .returns<Draft[]>();

  // Combine data and add status
  const allData = [
    ...(draftsData || []).map(item => ({ ...item, published: false })),
    ...(postsData || []).map(item => ({ ...item, published: true }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const data = allData;
  const error = draftsError || postsError;

  if (!data || error || !data.length) {
    notFound;
  }
  return (
    <>
      <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        {data?.length && data?.length > 0 ? (
          <>
            <PostTableTitle />
            <DataTable data={data ? data : []} columns={columns} />
          </>
        ) : (
          <PostTableEmpty />
        )}
        <PostRefreshOnce />
      </div>
    </>
  );
};

export default PostsPage;
