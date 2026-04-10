"use client";
import { postArticle } from "@/api/fetcher";
import ArticleToolbar from "@/components/admin/ArticleToolbar";
import useBlogger from "@/hooks/useBlogger";
import { convert_rgba_to_hex } from "@/utils/pure_function";
import { Button, Input, Modal, message } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { useAction, preview, EditorZone, activeBlockType, activeFontFamily, activeFontSize, activeColor } = useBlogger();

  const onColorChange = (e) => {
    const hex = convert_rgba_to_hex({ ...e.metaColor });
    useAction.setColor(hex);
  };

  const submitArticle = async () => {
    const content = useAction.getHTML();
    if (!(title && content !== "<p></p>" && description)) {
      const temp = [];
      if (!title) temp.push("Title");
      if (content === "<p></p>") temp.push("Content");
      if (!description) temp.push("Description");
      message.warning(`กรุณากรอก: ${temp.join(", ")}`);
      return;
    }
    setSubmitting(true);
    try {
      const r = await postArticle({ title, content, description });
      if (r.auth) {
        message.success("บันทึกบทความสำเร็จ");
        router.push(`/${locale}/admin/article`);
      } else {
        message.error("ไม่สามารถบันทึกได้");
      }
    } catch {
      message.error("เกิดข้อผิดพลาด");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[900px] w-full mx-auto pb-[4rem]">
      {/* Header */}
      <div className="mt-[2rem] mb-[1.5rem]" style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button onClick={() => router.push(`/${locale}/admin/article`)}>← กลับ</Button>
        <h1 style={{ margin: 0 }}>เพิ่มบทความใหม่</h1>
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
        <ArticleToolbar
          useAction={useAction}
          color={activeColor}
          onColorChange={onColorChange}
          activeBlockType={activeBlockType}
          activeFontFamily={activeFontFamily}
          activeFontSize={activeFontSize}
        />
        <div style={{ padding: "16px 20px", minHeight: 400, background: "#fff" }}>
          {EditorZone}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
        <Button onClick={() => setPreviewVisible(true)}>Preview</Button>
        <Button type="primary" onClick={submitArticle} loading={submitting}>
          บันทึกบทความ
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
