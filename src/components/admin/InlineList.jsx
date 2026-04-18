"use client";
import useAdminSession from "@/hooks/useAdminSession";
import { Button, Input, Popover } from "antd";
import { message } from "@/lib/message";
import { useState } from "react";

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
 * InlineList — renders an array of strings that admins can add/edit/delete inline.
 *
 * Props:
 *   values        – string[]  the current array
 *   resourceType  – cad__resource.resource_type
 *   resourceName  – cad__resource.name
 *   fieldKey      – dot-notation path to the array inside resource JSON e.g. "my_services"
 *   renderItem    – (item: string, index: number) => ReactNode  — how to render each item (non-admin)
 */
export default function InlineList({
  values = [],
  resourceType,
  resourceName,
  fieldKey,
  renderItem,
}) {
  const { isAdmin, loading } = useAdminSession();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(values);
  const [saving, setSaving] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (loading || !isAdmin) {
    return (
      <>
        {values.map((item, i) =>
          renderItem ? renderItem(item, i) : <span key={i}>{item}</span>
        )}
      </>
    );
  }

  const handleOpen = (v) => {
    if (v) setDraft([...values]);
    else setDraft([...values]);
    setOpen(v);
  };

  const handleChange = (index, val) => {
    setDraft((prev) => prev.map((item, i) => (i === index ? val : item)));
  };

  const handleAdd = () => {
    setDraft((prev) => [...prev, ""]);
  };

  const handleRemove = (index) => {
    setDraft((prev) => prev.filter((_, i) => i !== index));
  };

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
    <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 260 }}>
      {draft.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Input
            value={item}
            onChange={(e) => handleChange(i, e.target.value)}
            size="small"
            autoFocus={i === draft.length - 1 && draft.length > values.length}
          />
          <Button
            size="small"
            danger
            onClick={() => handleRemove(i)}
            style={{ flexShrink: 0 }}
          >
            ×
          </Button>
        </div>
      ))}
      <Button size="small" onClick={handleAdd} style={{ alignSelf: "flex-start" }}>
        + เพิ่ม
      </Button>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => setOpen(false)} disabled={saving}>
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
      title="แก้ไขรายการ"
      open={open}
      onOpenChange={handleOpen}
      trigger="click"
      destroyTooltipOnHide
    >
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          cursor: "pointer",
          display: "block",
          borderRadius: 4,
          padding: "2px 4px",
          transition: "background 0.15s",
          background: hovered || open ? "rgba(22,119,255,0.10)" : "transparent",
        }}
        onClick={(e) => e.stopPropagation()}
        title="คลิกเพื่อแก้ไขรายการ"
      >
        {values.map((item, i) =>
          renderItem ? renderItem(item, i) : <span key={i}>{item}</span>
        )}
      </span>
    </Popover>
  );
}
