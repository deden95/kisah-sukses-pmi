"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { JSONContent } from "@tiptap/react";

interface DetailPostContentProps {
  content: string | null;
}

// Extensions untuk rendering (read-only)
const renderExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3 pl-6 mb-4",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3 pl-6 mb-4",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-gray-100 p-4 font-mono text-sm overflow-x-auto my-4",
      },
    },
    code: {
      HTMLAttributes: {
        class: "rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm",
      },
    },
    heading: {
      HTMLAttributes: {
        class: "font-bold text-gray-900",
      },
      levels: [1, 2, 3, 4, 5, 6],
    },
    paragraph: {
      HTMLAttributes: {
        class: "mb-4 leading-relaxed",
      },
    },
  }),
  HorizontalRule.configure({
    HTMLAttributes: {
      class: "my-6 border-t border-gray-300",
    },
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class: "text-blue-600 underline hover:text-blue-800 transition-colors",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),
  TiptapImage.configure({
    HTMLAttributes: {
      class: "rounded-lg max-w-full h-auto my-4 mx-auto",
    },
  }),
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2 mb-4",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-2",
    },
    nested: true,
  }),
];

export default function DetailPostContent({ content }: DetailPostContentProps) {
  let parsedContent: JSONContent | null = null;
  let isValidJSON = true;

  // Parse JSON content safely
  if (content) {
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      console.error("Error parsing content JSON:", error);
      isValidJSON = false;
    }
  }

  const editor = useEditor({
    extensions: renderExtensions,
    content: parsedContent,
    editable: false, // Read-only mode
    editorProps: {
      attributes: {
        class: "prose prose-lg prose-stone max-w-none focus:outline-none",
      },
    },
  });

  // Early return for invalid JSON as fallback
  if (!isValidJSON && content) {
    return (
      <div 
        className="prose prose-lg prose-stone max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (!editor || !content) {
    return (
      <div className="text-gray-500 italic">
        Konten tidak tersedia.
      </div>
    );
  }

  return (
    <div className="detail-post-content">
      <style jsx global>{`
        .detail-post-content .ProseMirror {
          outline: none;
          border: none;
        }
        
        .detail-post-content .ProseMirror h1 {
          font-size: 2.25rem;
          line-height: 2.5rem;
          margin-bottom: 1rem;
          margin-top: 2rem;
        }
        
        .detail-post-content .ProseMirror h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
          margin-bottom: 0.75rem;
          margin-top: 1.5rem;
        }
        
        .detail-post-content .ProseMirror h3 {
          font-size: 1.5rem;
          line-height: 2rem;
          margin-bottom: 0.5rem;
          margin-top: 1.25rem;
        }
        
        .detail-post-content .ProseMirror h4 {
          font-size: 1.25rem;
          line-height: 1.75rem;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }
        
        .detail-post-content .ProseMirror h5 {
          font-size: 1.125rem;
          line-height: 1.75rem;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }
        
        .detail-post-content .ProseMirror h6 {
          font-size: 1rem;
          line-height: 1.5rem;
          margin-bottom: 0.5rem;
          margin-top: 1rem;
        }
        
        .detail-post-content .ProseMirror strong {
          font-weight: 600;
        }
        
        .detail-post-content .ProseMirror em {
          font-style: italic;
        }
        
        .detail-post-content .ProseMirror u {
          text-decoration: underline;
        }
        
        .detail-post-content .ProseMirror s {
          text-decoration: line-through;
        }
        
        .detail-post-content .ProseMirror img {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          margin: 1.5rem auto;
          display: block;
        }
        
        .detail-post-content .ProseMirror a {
          color: #2563eb;
          text-decoration: underline;
          transition: color 0.2s;
        }
        
        .detail-post-content .ProseMirror a:hover {
          color: #1d4ed8;
        }
        
        .detail-post-content .ProseMirror ul[data-type="taskList"] {
          list-style: none;
          padding-left: 0;
        }
        
        .detail-post-content .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }
        
        .detail-post-content .ProseMirror ul[data-type="taskList"] li input {
          margin-right: 0.5rem;
          margin-top: 0.125rem;
        }
      `}</style>
      <EditorContent editor={editor} />
    </div>
  );
}

