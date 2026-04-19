"use client";
import useAdminSession from "@/hooks/useAdminSession";
import { Button, Input, Popover } from "antd";
import { message } from "@/lib/message";
import { useState } from "react";

/** Deep-search a node by id in a nested tree (nodes have .id, .child[]) */
function findNodeById(node, targetId) {
  if (node.id === targetId) return node;
  if (Array.isArray(node.child)) {
    for (const c of node.child) {
      const found = findNodeById(c, targetId);
      if (found) return found;
    }
  }
  return null;
}

/** Deep-clone and update a node's content (or a nested field within content) by id */
function updateNodeById(resource, targetId, newContent, contentField = null) {
  const clone = JSON.parse(JSON.stringify(resource));

  function walk(node) {
    if (node.id === targetId) {
      if (contentField) {
        const keys = contentField.split(".");
        let cur = node.content;
        for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
        cur[keys[keys.length - 1]] = newContent;
      } else {
        node.content = newContent;
      }
      return true;
    }
    if (Array.isArray(node.child)) {
      for (const c of node.child) {
        if (walk(c)) return true;
      }
    }
    return false;
  }

  walk(clone);
  return clone;
}

/**
 * InlineNodeText — inline edit for tree-based resources (approaches, doctor, etc.)
 *
 * Props:
 *   value         – current text value
 *   nodeId        – the node's unique id inside the resource tree
 *   resourceType  – cad__resource.resource_type
 *   resourceName  – cad__resource.name
 *   multiline     – use TextArea (default false)
 */
export default function InlineNodeText({
  value,
  nodeId,
  resourceType,
  resourceName,
  multiline = true,
  contentField = null,
  label,
}) {
  const { isAdmin, loading } = useAdminSession();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value ?? "");
  const [saving, setSaving] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (loading || !isAdmin) return <>{value}</>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const getRes = await fetch(
        `/api/admin/resource?type=${encodeURIComponent(resourceType)}&name=${encodeURIComponent(resourceName)}`
      );
      if (!getRes.ok) throw new Error("fetch");
      const row = await getRes.json();
      const updatedResource = updateNodeById(row.resource, nodeId, draft, contentField);
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
          onClick={() => { setOpen(false); setDraft(value ?? ""); }}
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
        {label !== undefined ? (
          <span style={{ opacity: 0.5, fontSize: "0.75em", fontStyle: "italic" }}>[{label || "ลิงก์"}]</span>
        ) : value}
      </span>
    </Popover>
  );
}
