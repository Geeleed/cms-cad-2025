"use client";
import { useEffect, useState } from "react";
import {
  Table, Button, Modal, Form, Input, Space, Typography, Popconfirm, Alert,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

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

  const columns = [
    {
      title: "รูป",
      dataIndex: "img_src",
      render: (src) =>
        src ? (
          <img src={src} alt="" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 4 }} />
        ) : "-",
      width: 100,
    },
    { title: "หัวข้อข่าว", dataIndex: "title", ellipsis: true },
    { title: "วันที่", dataIndex: "date", width: 180 },
    {
      title: "ลิงก์",
      dataIndex: "href",
      render: (h) => (
        <a href={h} target="_blank" rel="noreferrer" style={{ fontSize: 12 }}>
          {h?.slice(0, 40)}...
        </a>
      ),
    },
    {
      title: "",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EditOutlined />} onClick={() => openEdit(record)} />
          <Popconfirm
            title="ลบข่าวนี้?"
            onConfirm={() => handleDelete(record.id)}
            okText="ลบ"
            cancelText="ยกเลิก"
          >
            <Button size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          จัดการข่าว
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          เพิ่มข่าว
        </Button>
      </div>

      <Table rowKey="id" columns={columns} dataSource={data} loading={loading} pagination={{ pageSize: 10 }} scroll={{ x: 600 }} />

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
