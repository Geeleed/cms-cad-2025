"use client";
import { useEffect, useState, useCallback } from "react";
import {
  Button, Input, Typography, Popconfirm, Spin, Badge, Tag, Grid, Tooltip,
} from "antd";
import {
  PlusOutlined, DeleteOutlined, SaveOutlined, VideoCameraOutlined,
  LinkOutlined, CheckCircleOutlined, EditOutlined, ExclamationCircleOutlined,
} from "@ant-design/icons";

const { useBreakpoint } = Grid;

/** Convert any YouTube URL format to embed URL */
function toEmbedUrl(url) {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (short) return `https://www.youtube.com/embed/${short[1]}`;
  const watch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watch) return `https://www.youtube.com/embed/${watch[1]}`;
  return url;
}

function VideoCard({ item, idx, isDirty, cardStatus, onUpdate, onRemove, onSave }) {
  const screens = useBreakpoint();
  const isMd = screens.md;
  const embedSrc = toEmbedUrl(item.content?.src ?? "");
  const { saving = false, saved = false, error = "" } = cardStatus ?? {};

  // Border color based on state
  const borderColor = error ? "#ff4d4f" : saved ? "#52c41a" : isDirty ? "#1677ff" : "#e8e8e8";

  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "border-color 0.3s",
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "#fafafa",
          borderBottom: "1px solid #f0f0f0",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Badge
            count={idx + 1}
            style={{ backgroundColor: "#1677ff", fontWeight: 600, borderRadius: 6 }}
          />
          <Typography.Text strong style={{ fontSize: 14 }}>
            {item.content?.title || (
              <span style={{ color: "#bbb", fontWeight: 400 }}>ยังไม่มีชื่อ</span>
            )}
          </Typography.Text>
          {isDirty && !saving && (
            <Tag color="blue" icon={<EditOutlined />}>
              มีการแก้ไข
            </Tag>
          )}
          {saved && (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              บันทึกแล้ว
            </Tag>
          )}
          {error && (
            <Tag color="error" icon={<ExclamationCircleOutlined />}>
              บันทึกไม่สำเร็จ
            </Tag>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Button
            type={isDirty ? "primary" : "default"}
            size="small"
            icon={<SaveOutlined />}
            loading={saving}
            disabled={!isDirty || saving}
            onClick={() => onSave(idx)}
          >
            บันทึก
          </Button>
          <Popconfirm
            title="ลบวิดีโอนี้?"
            description="ข้อมูลวิดีโอนี้จะถูกลบและบันทึกทันที"
            onConfirm={() => onRemove(idx)}
            okText="ลบ"
            okButtonProps={{ danger: true }}
            cancelText="ยกเลิก"
          >
            <Button type="text" danger size="small" icon={<DeleteOutlined />}>
              ลบ
            </Button>
          </Popconfirm>
        </div>
      </div>

      {/* Card body — 2-col on md+, stacked on mobile */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMd ? "1fr 1fr" : "1fr",
          gap: 0,
        }}
      >
        {/* Left: inputs */}
        <div
          style={{
            padding: "16px 20px",
            borderRight: isMd ? "1px solid #f0f0f0" : "none",
            borderBottom: !isMd && embedSrc ? "1px solid #f0f0f0" : "none",
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
              ชื่อวิดีโอ
            </Typography.Text>
            <Input
              prefix={<VideoCameraOutlined style={{ color: "#bbb" }} />}
              value={item.content?.title ?? ""}
              onChange={(e) => onUpdate(idx, "title", e.target.value)}
              placeholder="เช่น การดูแลสุขภาพฟัน"
            />
          </div>
          <div>
            <Typography.Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
              YouTube URL{" "}
              <Tooltip title="รองรับทุกรูปแบบ เช่น https://www.youtube.com/watch?v=ID หรือ https://youtu.be/ID">
                <LinkOutlined style={{ cursor: "help" }} />
              </Tooltip>
            </Typography.Text>
            <Input
              prefix={<LinkOutlined style={{ color: "#bbb" }} />}
              value={item.content?.src ?? ""}
              onChange={(e) => onUpdate(idx, "src", e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            {item.content?.src && embedSrc !== item.content.src && (
              <Typography.Text type="success" style={{ fontSize: 11, marginTop: 4, display: "block" }}>
                ✓ แปลงเป็น embed URL อัตโนมัติเมื่อบันทึก
              </Typography.Text>
            )}
          </div>
        </div>

        {/* Right: preview */}
        <div style={{ padding: isMd ? "16px" : "0 20px 16px" }}>
          {embedSrc ? (
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                borderRadius: 8,
                overflow: "hidden",
                background: "#000",
              }}
            >
              <iframe
                src={embedSrc}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0, left: 0,
                  width: "100%", height: "100%",
                  border: "none",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: isMd ? "100%" : 100,
                minHeight: 80,
                background: "#f5f5f5",
                borderRadius: 8,
                color: "#bbb",
                gap: 6,
              }}
            >
              <VideoCameraOutlined style={{ fontSize: 28 }} />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                ใส่ URL เพื่อดูตัวอย่าง
              </Typography.Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoPage() {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Set of dirty card indices
  const [dirtySet, setDirtySet] = useState(new Set());
  // Per-card status: { [idx]: { saving, saved, error } }
  const [cardStatus, setCardStatus] = useState({});

  useEffect(() => {
    fetch("/api/admin/video")
      .then((r) => r.json())
      .then(setVideoData)
      .finally(() => setLoading(false));
  }, []);

  const setStatus = (idx, patch) =>
    setCardStatus((prev) => ({ ...prev, [idx]: { ...(prev[idx] ?? {}), ...patch } }));

  const updateChild = useCallback((idx, field, value) => {
    setVideoData((prev) => {
      const children = [...(prev.child ?? [])];
      children[idx] = { ...children[idx], content: { ...children[idx].content, [field]: value } };
      return { ...prev, child: children };
    });
    setDirtySet((prev) => new Set([...prev, idx]));
    // Clear saved/error state when editing again
    setCardStatus((prev) => ({ ...prev, [idx]: { saving: false, saved: false, error: "" } }));
  }, []);

  const addVideo = () => {
    const maxId = Math.max(0, ...(videoData?.child ?? []).map((c) => c.id ?? 0));
    setVideoData((prev) => ({
      ...prev,
      child: [...(prev.child ?? []), { id: maxId + 1, content: { title: "", src: "" } }],
    }));
    const newIdx = (videoData?.child?.length ?? 0);
    setDirtySet((prev) => new Set([...prev, newIdx]));
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 50);
  };

  const removeVideo = async (idx) => {
    // Remove from state and immediately save the updated list
    setVideoData((prev) => {
      const updated = { ...prev, child: prev.child.filter((_, i) => i !== idx) };
      // save immediately after removal
      const payload = {
        ...updated,
        child: updated.child.map((c) => ({
          ...c,
          content: { ...c.content, src: toEmbedUrl(c.content?.src ?? "") },
        })),
      };
      fetch("/api/admin/video", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      return updated;
    });
    // Reset dirty/status for all indices after removal (indices shift)
    setDirtySet(new Set());
    setCardStatus({});
  };

  const saveCard = async (idx) => {
    setStatus(idx, { saving: true, saved: false, error: "" });
    try {
      const payload = {
        ...videoData,
        child: (videoData?.child ?? []).map((c) => ({
          ...c,
          content: { ...c.content, src: toEmbedUrl(c.content?.src ?? "") },
        })),
      };
      const res = await fetch("/api/admin/video", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        // Update src to embed in local state
        setVideoData(payload);
        setDirtySet((prev) => { const s = new Set(prev); s.delete(idx); return s; });
        setStatus(idx, { saving: false, saved: true, error: "" });
        setTimeout(() => setStatus(idx, { saved: false }), 4000);
      } else {
        setStatus(idx, { saving: false, error: "บันทึกไม่สำเร็จ กรุณาลองใหม่" });
      }
    } catch {
      setStatus(idx, { saving: false, error: "เกิดข้อผิดพลาด" });
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16 }}>
        <Spin size="large" />
        <Typography.Text type="secondary">กำลังโหลดข้อมูลวิดีโอ...</Typography.Text>
      </div>
    );
  }

  const count = videoData?.child?.length ?? 0;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Page header */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            จัดการวิดีโอ
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            {count > 0 ? `${count} วิดีโอ` : "ยังไม่มีวิดีโอ"} · แสดงในหน้า Resources
            {dirtySet.size > 0 && (
              <Tag color="blue" style={{ marginLeft: 8 }}>
                {dirtySet.size} รายการยังไม่ได้บันทึก
              </Tag>
            )}
          </Typography.Text>
        </div>
        <Button icon={<PlusOutlined />} onClick={addVideo}>
          เพิ่มวิดีโอ
        </Button>
      </div>

      {/* Video list */}
      {count === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 24px",
            background: "#fff",
            borderRadius: 12,
            border: "2px dashed #d9d9d9",
            gap: 12,
          }}
        >
          <VideoCameraOutlined style={{ fontSize: 48, color: "#d9d9d9" }} />
          <Typography.Title level={5} style={{ margin: 0, color: "#bbb" }}>
            ยังไม่มีวิดีโอ
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            คลิก &ldquo;เพิ่มวิดีโอ&rdquo; เพื่อเริ่มต้น
          </Typography.Text>
          <Button type="primary" icon={<PlusOutlined />} onClick={addVideo} style={{ marginTop: 8 }}>
            เพิ่มวิดีโอแรก
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(videoData?.child ?? []).map((item, idx) => (
            <VideoCard
              key={item.id ?? idx}
              item={item}
              idx={idx}
              isDirty={dirtySet.has(idx)}
              cardStatus={cardStatus[idx]}
              onUpdate={updateChild}
              onRemove={removeVideo}
              onSave={saveCard}
            />
          ))}

          <Button
            icon={<PlusOutlined />}
            onClick={addVideo}
            size="large"
            style={{ borderRadius: 8, borderStyle: "dashed", height: 48 }}
            block
          >
            เพิ่มวิดีโอ
          </Button>
        </div>
      )}
    </div>
  );
}
