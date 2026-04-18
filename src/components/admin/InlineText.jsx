"use client";
import useAdminSession from "@/hooks/useAdminSession";
import { Button, Input, Popover } from "antd";
import { message } from "@/lib/message";
import { useState } from "react";

/** Get a nested value by dot-notation path: "card.0.h3" */
function getByPath(obj, path) {
  return path.split(".").reduce((acc, k) => acc?.[k], obj);
}

/** Return a deep-cloned object with the nested value at dot-path replaced */
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
 * InlineText — renders a text value that admins can click to edit in-place.
 *
 * Props:
 *   value         – the current text value
 *   resourceType  – cad__resource.resource_type
 *   resourceName  – cad__resource.name
 *   fieldKey      – dot-notation path inside resource JSON  e.g. "h2", "card.0.h3"
 *   multiline     – use TextArea instead of Input (default false)
 */
export default function InlineText({
  value,
  resourceType,
  resourceName,
  fieldKey,
  multiline = true,
}) {
  const { isAdmin, loading } = useAdminSession();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Non-admin or still loading auth — render plain text to avoid layout shifts
  if (loading || !isAdmin) return <>{value}</>;

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

  const popoverContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 280 }}>
      {multiline ? (
        <Input.TextArea
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
        />
      ) : (
        <Input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onPressEnter={handleSave}
        />
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button
          size="small"
          onClick={() => {
            setOpen(false);
            setDraft(value ?? "");
          }}
          disabled={saving}
        >
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
      title="แก้ไขข้อความ"
      open={open}
      onOpenChange={(v) => {
        if (!v) setDraft(value ?? "");
        setOpen(v);
      }}
      trigger="click"
      destroyTooltipOnHide
    >
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: "pointer",
          display: "inline",
          position: "relative",
          borderRadius: 4,
          padding: "1px 4px",
          transition: "background 0.15s",
          background: hovered || open ? "rgba(22,119,255,0.10)" : "transparent",
        }}
        onClick={(e) => e.stopPropagation()}
        title="คลิกเพื่อแก้ไข"
      >
        {value}
      </span>
    </Popover>
  );
}
