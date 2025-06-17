"use client";

import "@/styles/prosemirror.css";
import "@/styles/editor.css";
import { Editor as EditorClass } from "@tiptap/core";
import { EditorProps } from "@tiptap/pm/view";
import {
  EditorContent,
  Extension,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { EditorBubbleMenu } from "./bubble-menu";
import { defaultEditorContent } from "./default-content";
import { defaultExtensions } from "./extensions";
import { ImageResizer } from "./extensions/image-resizer";
import { defaultEditorProps } from "./props";
import { EditorToolbar } from "./toolbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function EnhancedWysiwygEditor({
  className = "relative min-h-[600px] w-full max-w-screen-lg border-stone-200 bg-white sm:rounded-lg sm:border sm:shadow-lg",
  defaultValue = defaultEditorContent,
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
  onUpdate = () => {},
  extensions = [],
  editorProps = {},
  title = "Content Editor",
  description = "Write your article content using the rich text editor below.",
}: {
  /**
   * Additional classes to add to the editor container.
   */
  className?: string;
  /**
   * The default value to use for the editor.
   */
  defaultValue?: JSONContent | string;
  /**
   * A list of extensions to use for the editor, in addition to the default Novel extensions.
   */
  extensions?: Extension[];
  /**
   * Props to pass to the underlying Tiptap editor, in addition to the default Novel editor props.
   */
  editorProps?: EditorProps;
  /**
   * A callback function that is called whenever the editor is updated.
   */
  onUpdate?: (editor?: EditorClass) => void | Promise<void>;
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   */
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   */
  debounceDuration?: number;
  /**
   * Title for the editor card
   */
  title?: string;
  /**
   * Description for the editor card
   */
  description?: string;
}) {
  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    onDebouncedUpdate(editor);
  }, debounceDuration);

  const editor = useEditor({
    extensions: [...defaultExtensions, ...extensions],
    editorProps: {
      ...defaultEditorProps,
      ...editorProps,
      attributes: {
        ...defaultEditorProps.attributes,
        class: `prose prose-lg prose-stone dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full p-6`,
      },
    },
    onUpdate: (e) => {
      onUpdate(e.editor);
      debouncedUpdates(e);
    },
  });

  // hydrate the editor with the defaultValue.
  useEffect(() => {
    if (!editor) return;

    if (defaultValue) {
      editor.commands.setContent(defaultValue);
    }
  }, [editor, defaultValue]);

  const prev = useRef("");

  if (!editor) {
    return (
      <Card className="max-w-screen-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <Separator className="mb-8" />
        <CardContent>
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-screen-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent className="p-0">
        <div className={className}>
          {/* Toolbar */}
          <EditorToolbar editor={editor} />
          
          {/* Editor Content */}
          <div
            onClick={() => {
              editor?.chain().focus().run();
            }}
            className="relative min-h-[500px]"
          >
            {editor && <EditorBubbleMenu editor={editor} />}
            {editor?.isActive("image") && <ImageResizer editor={editor} />}
            <EditorContent 
              editor={editor} 
              className="min-h-[500px] cursor-text"
            />
            
            {/* Placeholder when editor is empty */}
            {editor?.isEmpty && (
              <div className="absolute top-6 left-6 text-gray-400 pointer-events-none">
                <p className="text-lg">Start writing your article...</p>
                <p className="text-sm mt-1">
                  Type '/' for commands, or use the toolbar above for formatting options.
                </p>
              </div>
            )}
          </div>
          
          {/* Footer with tips */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-600">
            <div className="flex flex-wrap gap-4 text-xs">
              <span>💡 <strong>Tips:</strong></span>
              <span>• Type '/' for quick commands</span>
              <span>• Select text to see formatting options</span>
              <span>• Use Ctrl+Z/Y for undo/redo</span>
              <span>• Drag and drop to rearrange content</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

