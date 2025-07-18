"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import CustomTableHeader from "@/extensions/CustomTableHeader";
import { mergeStyleToCurrentCell } from "@/utils/mergeStyle";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { parseStyleString, toStyleString } from "@/utils/styleUtils";
import Highlight from "@tiptap/extension-highlight";
import { FontSize } from "@/extensions/FontSize";
import { FontFamily } from "@/extensions/FontFamily";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { CustomTableCell } from "@/extensions/CustomTableCell";

export default function TiptapTableEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      CustomTableCell,
      CustomTableHeader,
      Color,
      TextStyle,
      Highlight,
      FontSize,
      FontFamily,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      HorizontalRule,
      HardBreak,
      Subscript,
      Superscript,
    ],
    onSelectionUpdate: ({ editor }) => {
      const pos = editor.state.selection.from;
      const resolved = editor.state.doc.resolve(pos);
      const node = resolved.node();

      const rawStyle = node.attrs?.style;
      const styleObj = parseStyleString(rawStyle);

      console.log("Node Type:", node.type.name);
      console.log("Raw Style:", rawStyle);
      console.log("Style Object:", styleObj);
      console.log({ pos, resolved });
      console.log({ editor });
      // เช่น styleObj.textAlign = 'center'
    },
    content: `
      <table style="border-collapse: collapse; width: 100%; border: 1px solid #ccc;">
        <thead>
          <tr>
            <th style="border: 1px solid #ccc; padding: 8px; background: #eee;">หัวข้อ 1</th>
            <th style="border: 1px solid #ccc; padding: 8px; background: #eee;">หัวข้อ 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px;">ข้อมูล 1</td>
            <td style="border: 1px solid #ccc; padding: 8px;">ข้อมูล 2</td>
          </tr>
        </tbody>
      </table>
    `,
  });

  const inspectStyle = () => {
    const node = editor?.state.selection.$anchor.node();
    console.log("อยู่ใน:", node.type.name);
    console.log("style:", node.attrs?.style ?? "ไม่มี style");
  };

  const setCellColor = (color) => {
    editor?.chain().focus().setCellAttribute("backgroundColor", color).run();
  };

  const setCellBorderColor = (color) => {
    editor?.chain().focus().setCellAttribute("borderColor", color).run();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem", display: "flex", gap: 16 }}>
        <button onClick={() => updateTextColor("red")}>สีแดง</button>
        <button onClick={() => updateTextColor("blue")}>สีน้ำเงิน</button>
        <button onClick={() => editor.chain().focus().addRowAfter().run()}>
          ➕ เพิ่มแถว
        </button>{" "}
        <button onClick={() => editor.chain().focus().addColumnAfter().run()}>
          ➕ เพิ่มคอลัมน์
        </button>{" "}
        <button onClick={() => editor.chain().focus().deleteRow().run()}>
          🗑 ลบแถว
        </button>{" "}
        <button onClick={() => editor.chain().focus().deleteColumn().run()}>
          🗑 ลบคอลัมน์
        </button>{" "}
        <button onClick={() => editor.chain().focus().deleteTable().run()}>
          🧹 ลบตาราง
        </button>{" "}
        <button
          onClick={() => editor.chain().focus().setColor("#ff0000").run()}
        >
          แดง
        </button>{" "}
        <button
          onClick={() => {
            const pos = editor.state.selection.from;
            const dom = editor.view.domAtPos(pos)?.node;

            console.log(pos);
            console.log("Style:", dom.style);
            if (dom instanceof HTMLElement) {
              console.log("Style:", dom.style.textAlign);
            }
            mergeStyleToCurrentCell(editor, { "background-color": "yellow" });
          }}
        >
          🎨 ไฮไลต์
        </button>{" "}
        <button
          //   onClick={() =>
          //     mergeStyleToCurrentCell(editor, { "text-align": "center" })
          //   }
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          📐 จัดกลาง
        </button>{" "}
        <button onClick={inspectStyle}>🔍 ดู style</button>{" "}
        <button onClick={() => console.log(editor.getHTML())}>
          💾 Export HTML
        </button>
        <button onClick={() => setCellColor("lightyellow")}>เหลืองอ่อน</button>
        <button onClick={() => setCellColor("lightblue")}>ฟ้าอ่อน</button>
        <button onClick={() => setCellColor("white")}>ล้างสี</button>
        <button onClick={() => setCellBorderColor("red")}>เส้นขอบแดง</button>
        <button onClick={() => setCellBorderColor("blue")}>เส้นขอบฟ้า</button>
        <button onClick={() => setCellBorderColor(null)}>ล้างเส้นขอบ</button>
      </div>
      <EditorContent
        editor={editor}
        style={{ border: "1px solid #ccc", padding: "8px" }}
      />
    </div>
  );
}
