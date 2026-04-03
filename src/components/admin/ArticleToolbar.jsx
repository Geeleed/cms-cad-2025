"use client";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  DeleteOutlined,
  FileImageOutlined,
  HighlightOutlined,
  ItalicOutlined,
  LinkOutlined,
  MenuOutlined,
  MinusOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  TableOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { ColorPicker, Divider, Dropdown, Select, Tooltip } from "antd";
import React, { useRef } from "react";

function Btn({ title, onClick, children }) {
  return (
    <Tooltip title={title}>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        style={{
          padding: "4px 7px",
          border: "none",
          background: "transparent",
          borderRadius: 4,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          lineHeight: 1,
          color: "inherit",
          minWidth: 28,
          minHeight: 28,
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e8e8")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        {children}
      </button>
    </Tooltip>
  );
}

function Sep() {
  return <Divider type="vertical" style={{ margin: "0 4px", height: 20 }} />;
}

const fontFamilyOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Georgia", label: "Georgia" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "Verdana", label: "Verdana" },
  { value: "Kanit, sans-serif", label: "Kanit" },
  { value: "Prompt, sans-serif", label: "Prompt" },
  { value: "IBM Plex Sans, sans-serif", label: "IBM Plex Sans" },
];

const fontSizeOptions = [
  { value: "12px", label: "12" },
  { value: "14px", label: "14" },
  { value: "16px", label: "16" },
  { value: "18px", label: "18" },
  { value: "20px", label: "20" },
  { value: "24px", label: "24" },
  { value: "28px", label: "28" },
  { value: "32px", label: "32" },
  { value: "40px", label: "40" },
  { value: "48px", label: "48" },
];

export default function ArticleToolbar({ useAction, color, onColorChange }) {
  const imageInputRef = useRef();

  const onSetLink = () => {
    const url = window.prompt("URL:");
    if (url) useAction.setLink(url, "_blank");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "#fafafa",
        borderBottom: "1px solid #d9d9d9",
        padding: "6px 10px",
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* Undo / Redo */}
      <Btn title="Undo (Ctrl+Z)" onClick={useAction.undo}>
        <UndoOutlined />
      </Btn>
      <Btn title="Redo (Ctrl+Y)" onClick={useAction.redo}>
        <RedoOutlined />
      </Btn>

      <Sep />

      {/* Block type */}
      <Select
        size="small"
        defaultValue="paragraph"
        style={{ width: 120 }}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(val) => {
          if (val === "paragraph") useAction.setParagraph();
          else useAction.setHeading(Number(val));
        }}
        options={[
          { value: "paragraph", label: "Paragraph" },
          { value: "1", label: "Heading 1" },
          { value: "2", label: "Heading 2" },
          { value: "3", label: "Heading 3" },
          { value: "4", label: "Heading 4" },
          { value: "5", label: "Heading 5" },
          { value: "6", label: "Heading 6" },
        ]}
      />

      <Sep />

      {/* Font family */}
      <Select
        size="small"
        placeholder="Font"
        allowClear
        style={{ width: 130 }}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(font) => font && useAction.setFontFamily(font)}
        options={fontFamilyOptions}
      />

      {/* Font size */}
      <Select
        size="small"
        placeholder="Size"
        allowClear
        style={{ width: 72 }}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(size) => size && useAction.setFontSize(size)}
        options={fontSizeOptions}
      />

      <Sep />

      {/* Text formatting */}
      <Btn title="Bold (Ctrl+B)" onClick={useAction.toggleBold}>
        <BoldOutlined />
      </Btn>
      <Btn title="Italic (Ctrl+I)" onClick={useAction.toggleItalic}>
        <ItalicOutlined />
      </Btn>
      <Btn title="Underline (Ctrl+U)" onClick={useAction.toggleUnderline}>
        <UnderlineOutlined />
      </Btn>
      <Btn title="Strikethrough" onClick={useAction.toggleStrike}>
        <StrikethroughOutlined />
      </Btn>
      <Btn title="Highlight" onClick={useAction.toggleHighlight}>
        <HighlightOutlined />
      </Btn>
      <Btn title="Subscript" onClick={useAction.toggleSubscript}>
        <span style={{ fontSize: 11 }}>x<sub>2</sub></span>
      </Btn>
      <Btn title="Superscript" onClick={useAction.toggleSuperscript}>
        <span style={{ fontSize: 11 }}>x<sup>2</sup></span>
      </Btn>

      <Sep />

      {/* Text color */}
      <Tooltip title="สีตัวอักษร">
        <span onMouseDown={(e) => e.preventDefault()}>
          <ColorPicker
            size="small"
            value={color}
            onChangeComplete={onColorChange}
          />
        </span>
      </Tooltip>

      <Sep />

      {/* Alignment */}
      <Btn title="Align Left" onClick={useAction.setTextAlignLeft}>
        <AlignLeftOutlined />
      </Btn>
      <Btn title="Align Center" onClick={useAction.setTextAlignCenter}>
        <AlignCenterOutlined />
      </Btn>
      <Btn title="Align Right" onClick={useAction.setTextAlignRight}>
        <AlignRightOutlined />
      </Btn>
      <Btn title="Justify" onClick={useAction.setTextAlignJustify}>
        <MenuOutlined />
      </Btn>

      <Sep />

      {/* Lists */}
      <Btn title="Bullet List" onClick={useAction.toggleBulletList}>
        <UnorderedListOutlined />
      </Btn>
      <Btn title="Ordered List" onClick={useAction.toggleOrderedList}>
        <OrderedListOutlined />
      </Btn>

      <Sep />

      {/* Link & HR */}
      <Btn title="Insert Link" onClick={onSetLink}>
        <LinkOutlined />
      </Btn>
      <Btn title="Horizontal Rule" onClick={useAction.setHorizontalRule}>
        <MinusOutlined />
      </Btn>

      <Sep />

      {/* Table */}
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "insert",
              label: "แทรกตาราง (3×3)",
              icon: <TableOutlined />,
              onClick: () => useAction.insertTable({ rows: 3, cols: 3, withHeaderRow: true }),
            },
            { type: "divider" },
            { key: "addColBefore", label: "เพิ่มคอลัมน์ซ้าย", onClick: () => useAction.addColumnBefore() },
            { key: "addColAfter", label: "เพิ่มคอลัมน์ขวา", onClick: () => useAction.addColumnAfter() },
            { key: "delCol", label: "ลบคอลัมน์", danger: true, icon: <DeleteOutlined />, onClick: () => useAction.deleteColumn() },
            { type: "divider" },
            { key: "addRowBefore", label: "เพิ่มแถวด้านบน", onClick: () => useAction.addRowBefore() },
            { key: "addRowAfter", label: "เพิ่มแถวด้านล่าง", onClick: () => useAction.addRowAfter() },
            { key: "delRow", label: "ลบแถว", danger: true, icon: <DeleteOutlined />, onClick: () => useAction.deleteRow() },
            { type: "divider" },
            { key: "merge", label: "รวม Cell", onClick: () => useAction.mergeCells() },
            { key: "split", label: "แยก Cell", onClick: () => useAction.splitCell() },
            { key: "headerRow", label: "Toggle Header Row", onClick: () => useAction.toggleHeaderRow() },
            { type: "divider" },
            { key: "delTable", label: "ลบตาราง", danger: true, icon: <DeleteOutlined />, onClick: () => useAction.deleteTable() },
          ],
        }}
      >
        <span>
          <Btn title="ตาราง">
            <TableOutlined />
          </Btn>
        </span>
      </Dropdown>

      <Sep />

      {/* Image */}
      <Btn title="แทรกรูปภาพ" onClick={() => imageInputRef.current?.click()}>
        <FileImageOutlined />
      </Btn>
      <input
        hidden
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              useAction.insertImage({
                src: reader.result?.toString(),
                width: "300px",
                height: "auto",
                align: "center",
              });
            };
            reader.readAsDataURL(file);
          }
          e.target.value = "";
        }}
      />
      <Btn title="จัดรูปซ้าย" onClick={() => useAction.alignSelectedImage("left")}>
        <span style={{ fontSize: 11, color: "#888" }}><AlignLeftOutlined /></span>
      </Btn>
      <Btn title="จัดรูปกลาง" onClick={() => useAction.alignSelectedImage("center")}>
        <span style={{ fontSize: 11, color: "#888" }}><AlignCenterOutlined /></span>
      </Btn>
      <Btn title="จัดรูปขวา" onClick={() => useAction.alignSelectedImage("right")}>
        <span style={{ fontSize: 11, color: "#888" }}><AlignRightOutlined /></span>
      </Btn>
    </div>
  );
}
