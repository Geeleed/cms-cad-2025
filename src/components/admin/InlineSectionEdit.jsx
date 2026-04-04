"use client";
import ResourceFields from "@/components/admin/ResourceFields";
import useAdminSession from "@/hooks/useAdminSession";
import { Button, Drawer, Spin, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import React, { useState, useRef } from "react";

export default function InlineSectionEdit({
  children,
  resourceType,
  resourceName,
  label,
}) {
  const { isAdmin, loading: authLoading } = useAdminSession();
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hovered, setHovered] = useState(false);

  const openDrawer = async () => {
    setOpen(true);
    if (rowData) return; // already fetched
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/resource?type=${encodeURIComponent(resourceType)}&name=${encodeURIComponent(resourceName)}`
      );
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setRowData(data);
      setResource(data.resource);
    } catch {
      message.error("โหลดข้อมูลไม่ได้");
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!rowData) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/resource/${rowData.id_resource}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resource, remark: rowData.remark }),
      });
      if (res.ok) {
        message.success("บันทึกสำเร็จ");
        setOpen(false);
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

  return (
    <>
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Edit overlay button — only for admins */}
        {!authLoading && isAdmin && hovered && (
          <button
            onClick={openDrawer}
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 14px",
              background: "rgba(22,119,255,0.92)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 13,
              boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
              backdropFilter: "blur(2px)",
            }}
          >
            <EditOutlined />
            {label ? `แก้ไข: ${label}` : "แก้ไขส่วนนี้"}
          </button>
        )}

        {children}
      </div>

      <Drawer
        title={label ? `แก้ไข: ${label}` : "แก้ไขเนื้อหา"}
        open={open}
        onClose={() => setOpen(false)}
        width={560}
        footer={
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button onClick={() => setOpen(false)} disabled={saving}>
              ยกเลิก
            </Button>
            <Button
              type="primary"
              onClick={handleSave}
              loading={saving}
              disabled={loading || !resource}
            >
              บันทึก
            </Button>
          </div>
        }
      >
        {loading ? (
          <Spin size="large" style={{ display: "block", margin: "80px auto" }} />
        ) : resource ? (
          <ResourceFields data={resource} onChange={setResource} />
        ) : null}
      </Drawer>
    </>
  );
}
