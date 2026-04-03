"use client";
import { useEffect, useState } from "react";
import {
  Card, Button, Input, Space, Typography, Popconfirm, Alert, Spin,
} from "antd";
import { PlusOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

export default function VideoPage() {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/video")
      .then((r) => r.json())
      .then(setVideoData)
      .finally(() => setLoading(false));
  }, []);

  const updateChild = (idx, field, value) => {
    setVideoData((prev) => {
      const children = [...(prev.child ?? [])];
      children[idx] = {
        ...children[idx],
        content: { ...children[idx].content, [field]: value },
      };
      return { ...prev, child: children };
    });
  };

  const addVideo = () => {
    const maxId = Math.max(0, ...(videoData?.child ?? []).map((c) => c.id ?? 0));
    setVideoData((prev) => ({
      ...prev,
      child: [
        ...(prev.child ?? []),
        { id: maxId + 1, content: { title: "", src: "" } },
      ],
    }));
  };

  const removeVideo = (idx) => {
    setVideoData((prev) => ({
      ...prev,
      child: prev.child.filter((_, i) => i !== idx),
    }));
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/admin/video", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(videoData),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError("บันทึกไม่สำเร็จ");
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spin size="large" style={{ display: "block", margin: "80px auto" }} />;

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          จัดการวิดีโอ
        </Typography.Title>
        <Button type="primary" icon={<SaveOutlined />} loading={saving} onClick={save}>
          บันทึกทั้งหมด
        </Button>
      </div>

      {saved && <Alert type="success" message="บันทึกเรียบร้อยแล้ว" style={{ marginBottom: 16 }} />}
      {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(videoData?.child ?? []).map((item, idx) => (
          <Card
            key={item.id ?? idx}
            size="small"
            title={`วิดีโอ ${idx + 1}`}
            extra={
              <Popconfirm
                title="ลบวิดีโอนี้?"
                onConfirm={() => removeVideo(idx)}
                okText="ลบ"
                cancelText="ยกเลิก"
              >
                <Button danger size="small" icon={<DeleteOutlined />} />
              </Popconfirm>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>ชื่อวิดีโอ</Typography.Text>
                <Input
                  value={item.content?.title ?? ""}
                  onChange={(e) => updateChild(idx, "title", e.target.value)}
                  placeholder="ชื่อวิดีโอ"
                />
              </div>
              <div>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  YouTube Embed URL (https://www.youtube.com/embed/...)
                </Typography.Text>
                <Input
                  value={item.content?.src ?? ""}
                  onChange={(e) => updateChild(idx, "src", e.target.value)}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                />
              </div>
              {item.content?.src && (
                <div style={{ marginTop: 8 }}>
                  <iframe
                    src={item.content.src}
                    width="100%"
                    height="180"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ border: "none", borderRadius: 4 }}
                  />
                </div>
              )}
            </Space>
          </Card>
        ))}
      </div>

      <Button
        icon={<PlusOutlined />}
        onClick={addVideo}
        style={{ marginTop: 16 }}
        block
      >
        เพิ่มวิดีโอ
      </Button>
    </div>
  );
}
