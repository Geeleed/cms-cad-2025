"use client";
import ArticleToolbar from "@/components/admin/ArticleToolbar";
import useBlogger from "@/hooks/useBlogger";
import useAdminSession from "@/hooks/useAdminSession";
import { convert_rgba_to_hex } from "@/utils/pure_function";
import { Button, Input, Spin, message } from "antd";
import React, { useEffect, useState } from "react";

export default function InlineArticleEdit({
  id_article,
  initialTitle,
  initialDescription,
  initialContent,
}) {
  const { isAdmin, loading: authLoading } = useAdminSession();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle ?? "");
  const [description, setDescription] = useState(initialDescription ?? "");
  const [color, setColor] = useState("#000000");
  const [saving, setSaving] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);

  const { useAction, EditorZone, onSetInitHtmlContent, editorReady } =
    useBlogger();

  // Load initial content into Tiptap once editor is ready and edit mode begins
  useEffect(() => {
    if (editing && editorReady && !contentLoaded) {
      onSetInitHtmlContent(initialContent ?? "");
      setContentLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, editorReady]);

  // Reset content-loaded flag if editing is cancelled and re-opened
  useEffect(() => {
    if (!editing) setContentLoaded(false);
  }, [editing]);

  const onColorChange = (e) => {
    const hex = convert_rgba_to_hex({ ...e.metaColor });
    setColor(hex);
    useAction.setColor(hex);
  };

  const handleSave = async () => {
    const content = useAction.getHTML();
    if (!title || !content || content === "<p></p>") {
      message.warning("กรุณากรอกชื่อและเนื้อหา");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/resource/article/${id_article}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content }),
      });
      if (res.ok) {
        message.success("บันทึกสำเร็จ");
        setEditing(false);
        // Refresh page to show updated content
        window.location.reload();
      } else {
        message.error("บันทึกไม่สำเร็จ");
      }
    } catch {
      message.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(initialTitle ?? "");
    setDescription(initialDescription ?? "");
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="max-w-[1250px] mx-auto w-full py-[2rem]">
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Button onClick={handleCancel} disabled={saving}>
            ยกเลิก
          </Button>
          <Button type="primary" onClick={handleSave} loading={saving}>
            บันทึก
          </Button>
          <span style={{ color: "#888", fontSize: 13 }}>
            กำลังแก้ไข: {initialTitle}
          </span>
        </div>

        {/* Title */}
        <Input
          placeholder="หัวข้อบทความ..."
          size="large"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: 10, fontSize: 20, fontWeight: 600 }}
        />

        {/* Description */}
        <Input.TextArea
          placeholder="คำอธิบายสั้น ๆ..."
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: 14 }}
        />

        {/* Toolbar */}
        <ArticleToolbar
          useAction={useAction}
          color={color}
          onColorChange={onColorChange}
        />

        {/* Editor */}
        <div
          className="editor-wrapper"
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            minHeight: 300,
            padding: "12px 16px",
            marginTop: 8,
          }}
        >
          {EditorZone}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Edit FAB — visible only to admins */}
      {!authLoading && isAdmin && (
        <div
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => setEditing(true)}
            style={{
              borderRadius: 999,
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
              padding: "0 28px",
              height: 48,
              fontWeight: 600,
            }}
          >
            ✏️ แก้ไขบทความ
          </Button>
        </div>
      )}

      {/* Normal read-only view */}
      <div className="editor-content" dangerouslySetInnerHTML={{ __html: initialContent }} />
    </div>
  );
}
