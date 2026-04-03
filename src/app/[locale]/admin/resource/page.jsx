"use client";
import { useEffect, useState } from "react";
import { Table, Tag, Typography, Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const TYPE_LABELS = {
  page_landing: { label: "Landing", color: "blue" },
  page_about: { label: "About", color: "green" },
  page_services: { label: "Services", color: "purple" },
  page_team: { label: "Team", color: "orange" },
  page_doctor: { label: "Doctor", color: "red" },
  page_approaches: { label: "Approaches", color: "cyan" },
  page_resources: { label: "Resources", color: "magenta" },
  page_news: { label: "News Page", color: "gold" },
  page_content: { label: "Page Content", color: "lime" },
  value_setting: { label: "Settings", color: "geekblue" },
  resource_video: { label: "Video", color: "volcano" },
};

export default function ResourceListPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";

  useEffect(() => {
    fetch("/api/admin/resource")
      .then((r) => r.json())
      .then((rows) => setData(rows))
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.resource_type.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "ประเภท",
      dataIndex: "resource_type",
      render: (type) => {
        const t = TYPE_LABELS[type];
        return <Tag color={t?.color ?? "default"}>{t?.label ?? type}</Tag>;
      },
      filters: Object.entries(TYPE_LABELS).map(([k, v]) => ({ text: v.label, value: k })),
      onFilter: (value, record) => record.resource_type === value,
    },
    {
      title: "ชื่อ (name)",
      dataIndex: "name",
    },
    {
      title: "หมายเหตุ",
      dataIndex: "remark",
      render: (r) => r || "-",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EditOutlined />}
          onClick={() => router.push(`/${locale}/admin/resource/${record.id_resource}`)}
        >
          แก้ไข
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 16 }}>
        จัดการเนื้อหาหน้าเว็บ
      </Typography.Title>
      <Input.Search
        placeholder="ค้นหา..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16, maxWidth: 320 }}
        allowClear
      />
      <Table
        rowKey="id_resource"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
}
