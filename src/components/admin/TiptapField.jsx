"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import { Button, Space } from "antd";
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

const extensions = [
  StarterKit,
  Underline,
  Link.configure({ openOnClick: false }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Color,
  TextStyle,
  Highlight,
];

export default function TiptapField({ value, onChange }) {
  const editor = useEditor({
    extensions,
    content: value ?? "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Sync external value changes (e.g. initial load)
  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value ?? "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (icon, action, isActive) => (
    <Button
      size="small"
      icon={icon}
      type={isActive ? "primary" : "default"}
      onMouseDown={(e) => { e.preventDefault(); action(); }}
    />
  );

  return (
    <div style={{ border: "1px solid #d9d9d9", borderRadius: 6, overflow: "hidden" }}>
      <Space size={2} wrap style={{ padding: "6px 8px", borderBottom: "1px solid #f0f0f0", background: "#fafafa" }}>
        {btn(<BoldOutlined />, () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"))}
        {btn(<ItalicOutlined />, () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"))}
        {btn(<UnderlineOutlined />, () => editor.chain().focus().toggleUnderline().run(), editor.isActive("underline"))}
        {btn(<AlignLeftOutlined />, () => editor.chain().focus().setTextAlign("left").run(), editor.isActive({ textAlign: "left" }))}
        {btn(<AlignCenterOutlined />, () => editor.chain().focus().setTextAlign("center").run(), editor.isActive({ textAlign: "center" }))}
        {btn(<AlignRightOutlined />, () => editor.chain().focus().setTextAlign("right").run(), editor.isActive({ textAlign: "right" }))}
        {btn(<OrderedListOutlined />, () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
        {btn(<UnorderedListOutlined />, () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
        {btn(<LinkOutlined />, () => {
          const url = window.prompt("URL");
          if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
        }, editor.isActive("link"))}
      </Space>
      <EditorContent
        editor={editor}
        style={{ padding: "8px 12px", minHeight: 80, background: "#fff" }}
      />
    </div>
  );
}
