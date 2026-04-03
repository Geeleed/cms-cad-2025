"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  Table,
  Popconfirm,
  Space,
  Typography,
  Tag,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function ArticleAdminPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";
  const base = `/${locale}/admin/article`;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/resource/article");
      const data = await res.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch {
      message.error("โหลดบทความไม่ได้");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id_article) => {
    try {
      const res = await fetch(`/api/resource/article/${id_article}`, {
        method: "DELETE",
      });
      if (res.ok) {
        message.success("ลบบทความสำเร็จ");
        setArticles((prev) => prev.filter((a) => a.id_article !== id_article));
      } else {
        message.error("ลบไม่สำเร็จ");
      }
    } catch {
      message.error("เกิดข้อผิดพลาด");
    }
  };

  const columns = [
    {
      title: "ชื่อบทความ",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "คำอธิบาย",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (v) => v || <Tag color="default">ไม่มี</Tag>,
    },
    {
      title: "วันที่สร้าง",
      dataIndex: "created_at",
      key: "created_at",
      width: 160,
      render: (v) =>
        v ? new Date(v).toLocaleDateString("th-TH", { dateStyle: "medium" }) : "-",
    },
    {
      title: "จัดการ",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EditOutlined />}
            onClick={() => router.push(`${base}/${record.id_article}`)}
          />
          <Popconfirm
            title="ยืนยันการลบ"
            description="บทความนี้จะถูกลบถาวร"
            onConfirm={() => handleDelete(record.id_article)}
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          จัดการบทความ
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => router.push(`${base}/editor`)}
        >
          เพิ่มบทความใหม่
        </Button>
      </div>
      <Table
        rowKey="id_article"
        columns={columns}
        dataSource={articles}
        loading={loading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
}
