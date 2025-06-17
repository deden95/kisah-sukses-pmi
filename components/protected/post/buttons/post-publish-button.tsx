"use client";

import { PublishDraft } from "@/actions/post/publish-draft";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface PostPublishButtonProps {
  postId: string;
  postTitle: string;
}

const PostPublishButton = ({ postId, postTitle }: PostPublishButtonProps) => {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      const result = await PublishDraft(postId);
      
      if (result.success) {
        toast.success(result.message || "Post berhasil dipublish!");
        setShowDialog(false);
        router.refresh(); // Refresh the page to update the list
      } else {
        toast.error(result.error || "Gagal mempublish post");
      }
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Terjadi kesalahan saat mempublish post");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={isPublishing}
        >
          {isPublishing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Publish
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Publish Post</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin mempublish post &quot;{postTitle}&quot;?
            <br /><br />
            Setelah dipublish:
            <br />• Post akan visible untuk publik
            <br />• Post akan dipindah dari drafts ke posts
            <br />• Anda masih bisa mengedit post setelah dipublish
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPublishing}>
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-green-600 hover:bg-green-700"
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Ya, Publish"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PostPublishButton;

