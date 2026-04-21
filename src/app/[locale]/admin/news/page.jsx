"use client";
import { useEffect, useState } from "react";
import {
  Button, Modal, Form, Input, Typography, Popconfirm, Alert, Skeleton, Empty,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, LinkOutlined, CalendarOutlined } from "@ant-design/icons";

export default function NewsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create, obj = edit
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const load = () => {
    setLoading(true);
    fetch("/api/admin/news")
      .then((r) => r.json())
      .then(setData)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setError("");
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      img_src: record.img_src,
      title: record.title,
      date: record.date,
      href: record.href,
    });
    setError("");
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/admin/news/${id}`, { method: "DELETE" });
    load();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    setSaving(true);
    setError("");
    try {
      let res;
      if (editing) {
        res = await fetch(`/api/admin/news/${editing.id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        });
      } else {
        res = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        });
      }
      if (res.ok) {
        setModalOpen(false);
        load();
      } else {
        setError("บันทึกไม่สำเร็จ");
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>จัดการข่าว</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} style={{ borderRadius: 8 }}>
          เพิ่มข่าว
        </Button>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map((k) => (
            <div key={k} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 16 }}>
              <div style={{ width: 100, height: 66, borderRadius: 8, background: "#f5f5f5", flexShrink: 0 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ))}
        </div>
      ) : data.length === 0 ? (
        <Empty description="ยังไม่มีข่าว" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.map((record) => (
            <div
              key={record.id}
              style={{
                background: "#fff",
                border: "1px solid #f0f0f0",
                borderRadius: 12,
                padding: "12px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
            >
              {/* Top row: thumbnail + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {record.img_src ? (
                  <img
                    src={record.img_src}
                    alt=""
                    style={{ width: 80, height: 54, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                  />
                ) : (
                  <div style={{ width: 80, height: 54, borderRadius: 8, background: "#f5f5f5", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 20 }}>
                    📰
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {record.title}
                  </div>
                </div>
              </div>

              {/* Bottom row: meta + buttons */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", minWidth: 0, overflow: "hidden" }}>
                  {record.date && (
                    <span style={{ fontSize: 12, color: "#bbb", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap" }}>
                      <CalendarOutlined style={{ flexShrink: 0 }} /> {record.date}
                    </span>
                  )}
                  {record.href && (
                    <a
                      href={record.href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: 12, color: "#1677ff", display: "flex", alignItems: "center", gap: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}
                    >
                      <LinkOutlined style={{ flexShrink: 0 }} /> {record.href}
                    </a>
                  )}
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} style={{ borderRadius: 8 }}>แก้ไข</Button>
                  <Popconfirm
                    title="ลบข่าวนี้?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="ลบ"
                    cancelText="ยกเลิก"
                  >
                    <Button size="small" danger icon={<DeleteOutlined />} style={{ borderRadius: 8 }} />
                  </Popconfirm>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        title={editing ? "แก้ไขข่าว" : "เพิ่มข่าว"}
        onCancel={() => { setModalOpen(false); form.resetFields(); }}
        onOk={handleSubmit}
        okText="บันทึก"
        cancelText="ยกเลิก"
        confirmLoading={saving}
      >
        {error && <Alert type="error" message={error} style={{ marginBottom: 12 }} />}
        <Form form={form} layout="vertical">
          <Form.Item label="หัวข้อข่าว" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="วันที่" name="date">
            <Input placeholder="เช่น 4 เม.ย. 2569" />
          </Form.Item>
          <Form.Item label="URL รูปภาพ" name="img_src">
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item label="ลิงก์ข่าว" name="href" rules={[{ required: true }]}>
            <Input placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
