"use client";

import PostEditButton from "@/components/protected/post/buttons/post-edit-button";
import { PostPublishButton } from "@/components/protected/post/buttons";
import { Row } from "@tanstack/react-table";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const postId = row.getValue("id") as string;
  const postTitle = row.getValue("title") as string;
  
  return (
    <div className="flex items-center gap-2">
      <PostEditButton id={postId} />
      <PostPublishButton postId={postId} postTitle={postTitle} />
    </div>
  );
}
