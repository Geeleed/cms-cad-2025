"use client";
import useAdminSession from "@/hooks/useAdminSession";
import IconCall from "@/components/icons/IconCall";
import IconFacebook from "@/components/icons/IconFacebook";
import IconLine from "@/components/icons/IconLine";
import IconMail from "@/components/icons/IconMail";
import { Button, Input, Popover, Select, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ICON_OPTIONS = [
  { value: "facebook", label: "Facebook" },
  { value: "line",     label: "Line" },
  { value: "email",    label: "Email" },
  { value: "tel",      label: "Tel" },
];

function IconComp({ icon }) {
  if (icon === "facebook") return <IconFacebook />;
  if (icon === "line")     return <IconLine />;
  if (icon === "email")    return <IconMail />;
  if (icon === "tel")      return <IconCall />;
  return null;
}

function buildHref(icon, link) {
  if (icon === "email") return `mailto:${link}`;
  if (icon === "tel")   return `tel:${link}`;
  return link;
}

function setByPath(obj, path, value) {
  const clone = JSON.parse(JSON.stringify(obj));
  const keys = path.split(".");
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  return clone;
}

/**
 * InlineContactList — renders contacts array; admins can add / edit / delete.
 *
 * Each contact: { icon: "facebook"|"line"|"email"|"tel", label: string, link: string }
 *
 * Props:
 *   values        – contact[]
 *   resourceType  – cad__resource.resource_type
 *   resourceName  – cad__resource.name
 *   fieldKey      – dot-notation path to the array e.g. "contacts"
 *   telClass      – optional className override for tel row (e.g. red text)
 */
export default function InlineContactList({
  values = [],
  resourceType,
  resourceName,
  fieldKey,
  telClass = "",
}) {
  const { isAdmin, loading } = useAdminSession();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(values);
  const [saving, setSaving] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleOpen = (v) => {
    if (v) setDraft(JSON.parse(JSON.stringify(values)));
    setOpen(v);
  };

  const handleChange = (index, field, val) => {
    setDraft((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );
  };

  const handleAdd = () => {
    setDraft((prev) => [...prev, { icon: "facebook", label: "", link: "" }]);
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

  const renderRows = (list, disableLinks = false) =>
    list.map((c, i) => (
      <p
        key={i}
        className={`custom-text-1 flex items-center gap-x-2 ${c.icon === "tel" ? telClass : "text-(--neutral-600)"}`}
      >
        {disableLinks ? (
          <>
            <span style={{ display: "inline-flex" }}><IconComp icon={c.icon} /></span>
            {c.label}
          </>
        ) : (
          <Link
            href={buildHref(c.icon, c.link)}
            target={c.icon === "tel" ? undefined : "_blank"}
            className="flex items-center gap-x-2"
          >
            <IconComp icon={c.icon} />
            {c.label}
          </Link>
        )}
      </p>
    ));

  if (!mounted || loading || !isAdmin) return <>{renderRows(values, false)}</>;

  const popoverContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 360 }}>
      {draft.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Select
            value={item.icon}
            onChange={(v) => handleChange(i, "icon", v)}
            options={ICON_OPTIONS}
            size="small"
            style={{ width: 100, flexShrink: 0 }}
          />
          <Input
            placeholder="label"
            value={item.label}
            onChange={(e) => handleChange(i, "label", e.target.value)}
            size="small"
          />
          <Input
            placeholder="link"
            value={item.link}
            onChange={(e) => handleChange(i, "link", e.target.value)}
            size="small"
          />
          <Button size="small" danger onClick={() => handleRemove(i)} style={{ flexShrink: 0 }}>
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
      title="แก้ไขช่องทางติดต่อ"
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
        title="คลิกเพื่อแก้ไขช่องทางติดต่อ"
      >
        {renderRows(values, true)}
      </span>
    </Popover>
  );
}
