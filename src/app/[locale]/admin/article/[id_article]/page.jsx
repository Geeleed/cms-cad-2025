"use client";
import ArticleToolbar from "@/components/admin/ArticleToolbar";
import useBlogger from "@/hooks/useBlogger";
import { convert_rgba_to_hex } from "@/utils/pure_function";
import { Button, Input, Modal, Spin } from "antd";
import { message } from "@/lib/message";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ArticleEditPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [color, setColor] = useState("#000000");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pendingContent, setPendingContent] = useState(null);

  const { useAction, preview, EditorZone, onSetInitHtmlContent, editorReady, activeBlockType, activeFontFamily, activeFontSize } = useBlogger();

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/resource/article/${params.id_article}`);
        if (!res.ok) throw new Error("Not found");
        const data = await res.json();
        setTitle(data.title ?? "");
        setDescription(data.description ?? "");
        setPendingContent(data.content ?? "");
      } catch {
        message.error("โหลดบทความไม่ได้");
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id_article]);

  // Inject content once editor is ready and data has loaded
  useEffect(() => {
    if (pendingContent !== null && editorReady) {
      onSetInitHtmlContent(pendingContent);
      setPendingContent(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingContent, editorReady]);

  const onColorChange = (e) => {
    const hex = convert_rgba_to_hex({ ...e.metaColor });
    setColor(hex);
    useAction.setColor(hex);
  };

  const saveArticle = async () => {
    const content = useAction.getHTML();
    if (!title || content === "<p></p>") {
      message.warning("กรุณากรอกชื่อและเนื้อหา");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/resource/article/${params.id_article}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, content }),
      });
      if (res.ok) {
        message.success("บันทึกสำเร็จ");
        router.push(`/${locale}/admin/article`);
      } else {
        message.error("บันทึกไม่สำเร็จ");
      }
    } catch {
      message.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-[900px] w-full mx-auto pb-[4rem]">
      {/* Header */}
      <div className="mt-[2rem] mb-[1.5rem]" style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <Button onClick={() => router.push(`/${locale}/admin/article`)}>← กลับ</Button>
        <h1 style={{ margin: 0 }}>แก้ไขบทความ</h1>
      </div>

      {/* Title */}
      <Input
        placeholder="หัวข้อบทความ..."
        size="large"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 12, fontSize: 20, fontWeight: 600 }}
      />

      {/* Description */}
      <Input.TextArea
        placeholder="คำอธิบายสั้น ๆ เกี่ยวกับบทความ..."
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      {/* Editor container */}
      <div style={{ border: "1px solid #d9d9d9", borderRadius: 8, overflow: "hidden" }}>
        <ArticleToolbar useAction={useAction} color={color} onColorChange={onColorChange} activeBlockType={activeBlockType} activeFontFamily={activeFontFamily} activeFontSize={activeFontSize} />
        <div style={{ padding: "16px 20px", minHeight: 400, background: "#fff" }}>
          {EditorZone}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
        <Button onClick={() => setPreviewVisible(true)}>Preview</Button>
        <Button type="primary" onClick={saveArticle} loading={saving}>
          บันทึกการแก้ไข
        </Button>
      </div>

      <Modal
        title={title || "Untitled"}
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={900}
      >
        {preview}
      </Modal>
    </div>
  );
}
