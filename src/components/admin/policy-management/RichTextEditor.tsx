"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none max-h-[60vh] overflow-auto",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  return (
    <div
      className={`rich-text-editor border-2 border-gray-200 rounded-xl p-2 relative ${className}`}
    >
      {/* Editor box */}
      <div className="p-3 bg-white rounded-md min-h-[200px]">
        <EditorContent editor={editor} />
      </div>

      {/* --- Toolbar positioned bottom-right --- */}
      <div className="absolute bottom-2 right-2 flex flex-wrap gap-1 bg-white p-2 shadow-lg rounded-md border border-gray-200">
        <ToolbarButton onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive("bold")}>
          B
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive("italic")}>
          I
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive("underline")}>
          U
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive("bulletList")}>
          •
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive("orderedList")}>
          1.
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor?.isActive("heading", { level: 1 })}
        >
          H1
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor?.isActive("heading", { level: 2 })}
        >
          H2
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive("blockquote")}>
          “
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().undo().run()}>
          ↺
        </ToolbarButton>

        <ToolbarButton onClick={() => editor?.chain().focus().redo().run()}>
          ↻
        </ToolbarButton>

        <ToolbarButton
          onClick={() => {
            if (!editor) return;
            const prev = editor.getAttributes("link").href || "";
            const url = window.prompt("Enter link URL", prev);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().extendMarkRange("link").unsetLink().run();
            } else {
              editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
            }
          }}
          active={editor?.isActive("link")}
        >
          🔗
        </ToolbarButton>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        Output is HTML. Press Enter for new paragraph.
      </p>
    </div>
  );
}

/* Toolbar button */
function ToolbarButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 border rounded text-sm ${active ? "bg-blue-600 text-white border-transparent" : "bg-white text-gray-700"
        }`}
    >
      {children}
    </button>
  );
}
