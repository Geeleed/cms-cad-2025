"use client";
import useAdminSession from "@/hooks/useAdminSession";
import { Button, Popover, message } from "antd";
import { useRef, useState } from "react";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => acc?.[k], obj);
}

function setByPath(obj, path, value) {
  const clone = JSON.parse(JSON.stringify(obj));
  const keys = path.split(".");
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) {
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return clone;
}

/**
 * InlineImage — wraps a image element so admins can click to replace the image URL.
 *
 * Props:
 *   children      – the <Image /> or <img /> element to render
 *   value         – current image src URL
 *   resourceType  – cad__resource.resource_type
 *   resourceName  – cad__resource.name
 *   fieldKey      – dot-notation path inside resource JSON e.g. "img"
 */
export default function InlineImage({
  children,
  value,
  resourceType,
  resourceName,
  fieldKey,
}) {
  const { isAdmin, loading } = useAdminSession();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef();

  if (loading || !isAdmin) return <>{children}</>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const getRes = await fetch(
        `/api/admin/resource?type=${encodeURIComponent(resourceType)}&name=${encodeURIComponent(resourceName)}`
      );
      if (!getRes.ok) throw new Error("fetch");
      const row = await getRes.json();
      const updatedResource = setByPath(row.resource, fieldKey, draft);
      const putRes = await fetch(`/api/admin/resource/${row.id_resource}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resource: updatedResource, remark: row.remark }),
      });
      if (!putRes.ok) throw new Error("save");
      message.success("บันทึกสำเร็จ");
      setOpen(false);
      window.location.reload();
    } catch {
      message.error("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setDraft(base64);
    } catch {
      message.error("อ่านไฟล์ไม่ได้");
    }
    e.target.value = "";
  };

  const popoverContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 320 }}>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
      <Button block onClick={() => fileInputRef.current?.click()}>📁 เลือกรูปจากเครื่อง</Button>
      {draft && (
        <img
          src={draft}
          alt="preview"
          style={{ width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => { setOpen(false); setDraft(value ?? ""); }} disabled={saving}>
          ยกเลิก
        </Button>
        <Button size="small" type="primary" onClick={handleSave} loading={saving}>
          บันทึก
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={popoverContent}
      title="เปลี่ยนรูปภาพ"
      open={open}
      onOpenChange={(v) => {
        if (!v) setDraft(value ?? "");
        setOpen(v);
      }}
      trigger="click"
      destroyTooltipOnHide
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => e.stopPropagation()}
        title="คลิกเพื่อเปลี่ยนรูป"
        style={{
          cursor: "pointer",
          position: "relative",
          display: "inline-block",
          width: "100%",
        }}
      >
        {children}
        {(hovered || open) && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            color: "#fff",
            fontSize: 14,
            fontWeight: 600,
            pointerEvents: "none",
          }}>
            🖼 เปลี่ยนรูป
          </div>
        )}
      </div>
    </Popover>
  );
}
