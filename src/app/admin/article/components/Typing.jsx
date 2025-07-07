"use client";
import React, { useEffect, useState } from "react";
import { Layout, Input, Modal, Flex, Select } from "antd";
import { SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";
import { FontSize } from "@/extensions/FontSize";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { FontFamily } from "@/extensions/FontFamily";

const { Header, Content, Footer } = Layout;

const headingOptions = [
  { value: "paragraph", label: "Paragraph" },
  { value: "heading1", label: "Heading 1" },
  { value: "heading2", label: "Heading 2" },
  { value: "heading3", label: "Heading 3" },
  { value: "heading4", label: "Heading 4" },
  { value: "heading5", label: "Heading 5" },
  { value: "heading6", label: "Heading 6" },
];

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Strike,
      Highlight,
      TextStyle,
      FontSize,
      FontFamily,
      Color,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      HorizontalRule,
      HardBreak,
      Subscript,
      Superscript,
    ],
    content: "<p>Write your blog here...</p>",
  });

  const applyStyle = (command) => {
    if (!editor) return;
    command();
  };

  return (
    <Layout>
      <Header
        style={{ background: "#1f1f1f", color: "#fff", padding: "0 20px" }}
      >
        <h2 style={{ color: "#fff", lineHeight: "64px" }}>Blog Editor</h2>
      </Header>

      <Content style={{ padding: "24px 48px" }}>
        <Input
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 20, fontSize: 24, fontWeight: "bold" }}
        />

        {/* Toolbar */}
        <Flex gap="small" wrap style={{ marginBottom: 12 }}>
          <button onClick={() => editor.chain().focus().toggleBold().run()}>
            Bold
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()}>
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            Underline
          </button>
          <button
            onClick={() => editor.chain().focus().toggleSubscript().run()}
          >
            Subscript
          </button>
          <button
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
          >
            Superscript
          </button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()}>
            Strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            Highlight
          </button>
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            HR
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#e74c3c").run()}
          >
            Red
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#2ecc71").run()}
          >
            Green
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            Left
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            Center
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            Right
          </button>
          <button
            onClick={() =>
              editor
                .chain()
                .focus()
                .setLink({ href: "https://example.com", target: "_blank" })
                .run()
            }
          >
            Link
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            Bullet List
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            Ordered List
          </button>
          <button onClick={() => editor.commands.sinkListItem("listItem")}>
            Indent (เพิ่มระดับ)
          </button>
          <button onClick={() => editor.commands.liftListItem("listItem")}>
            Outdent (ลดระดับ)
          </button>
          <Select
            defaultValue="paragraph"
            style={{ width: 150 }}
            onChange={(val) => {
              if (!editor) return;
              if (val === "paragraph") {
                editor.chain().focus().setParagraph().run();
              } else if (val.startsWith("heading")) {
                const level = parseInt(val.replace("heading", ""), 10);
                editor.chain().focus().setHeading({ level }).run();
              }
            }}
            options={headingOptions}
          />
          <Select
            defaultValue="16px"
            style={{ width: 100 }}
            onChange={(val) => editor.chain().focus().setFontSize(val).run()}
            options={[
              { value: "12px", label: "12px" },
              { value: "14px", label: "14px" },
              { value: "16px", label: "16px" },
              { value: "20px", label: "20px" },
              { value: "24px", label: "24px" },
              { value: "32px", label: "32px" },
            ]}
          />
          <Select
            defaultValue="Arial"
            style={{ width: 150 }}
            onChange={(font) =>
              editor.chain().focus().setFontFamily(font).run()
            }
            options={[
              { value: "Arial", label: "Arial" },
              { value: "Georgia", label: "Georgia" },
              { value: "Times New Roman", label: "Times New Roman" },
              { value: "Courier New", label: "Courier New" },
              { value: "Tahoma", label: "Tahoma" },
              { value: "Verdana", label: "Verdana" },
              { value: "Kanit, sans-serif", label: "Kanit" },
              { value: "Prompt, sans-serif", label: "Prompt" },
              { value: "IBM Plex Sans, sans-serif", label: "IBM Plex Sans" },
            ]}
          />
        </Flex>

        {/* Editor */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 16,
            minHeight: 300,
            background: "#fff",
          }}
        >
          <EditorContent editor={editor} className="editor-content"/>
        </div>
      </Content>

      <Footer>
        <Flex justify="center" gap="large" style={{ fontSize: 20 }}>
          <UndoOutlined
            onClick={() => editor?.chain().focus().undo().run()}
            style={{ cursor: "pointer" }}
          />
          <SaveOutlined
            onClick={() => {
              setPreviewVisible(true);
              console.log(editor?.getJSON());
              console.log(editor?.getText());
              console.log(editor?.getHTML());
            }}
            style={{ cursor: "pointer" }}
          />
        </Flex>
      </Footer>

      <Modal
        title={title || "Untitled Blog"}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
      >
        <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() }} />
      </Modal>
    </Layout>
  );
}
