"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, Popconfirm, Typography, Skeleton, Empty } from "antd";
import { message } from "@/lib/message";
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function ArticleCard({ article, onEdit, onDelete }) {
  const fmtDate = (v) =>
    v ? new Date(v).toLocaleDateString("th-TH", { dateStyle: "medium" }) : null;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #f0f0f0",
        borderRadius: 12,
        padding: "14px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "box-shadow 0.2s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
    >
      {/* Top row: icon + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 9,
            background: "#f0f5ff", display: "flex",
            alignItems: "center", justifyContent: "center",
            flexShrink: 0, color: "#1677ff", fontSize: 16,
          }}
        >
          <FileTextOutlined />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {article.title || <Text type="secondary" italic>ไม่มีชื่อ</Text>}
          </div>
          {article.description && (
            <div style={{ fontSize: 13, color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {article.description}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: dates + buttons */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {fmtDate(article.created_at) && (
            <span style={{ fontSize: 12, color: "#bbb", display: "flex", alignItems: "center", gap: 3 }}>
              <CalendarOutlined style={{ flexShrink: 0 }} /> สร้าง {fmtDate(article.created_at)}
            </span>
          )}
          {fmtDate(article.updated_at) && (
            <span style={{ fontSize: 12, color: "#bbb" }}>
              · แก้ไข {fmtDate(article.updated_at)}
            </span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <Button size="small" icon={<EditOutlined />} onClick={onEdit} style={{ borderRadius: 8 }}>
            แก้ไข
          </Button>
          <Popconfirm
            title="ยืนยันการลบ"
            description="บทความนี้จะถูกลบถาวร"
            onConfirm={onDelete}
            okText="ลบ"
            cancelText="ยกเลิก"
            okButtonProps={{ danger: true }}
          >
            <Button size="small" danger icon={<DeleteOutlined />} style={{ borderRadius: 8 }} />
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}

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

  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (id_article) => {
    try {
      const res = await fetch(`/api/resource/article/${id_article}`, { method: "DELETE" });
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

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <Title level={4} style={{ margin: 0 }}>จัดการบทความ</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push(`${base}/editor`)} style={{ borderRadius: 8 }}>
          เพิ่มบทความใหม่
        </Button>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[1, 2, 3].map((k) => (
            <div key={k} style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 12, padding: "16px 20px" }}>
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <Empty description="ยังไม่มีบทความ" />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {articles.map((a) => (
            <ArticleCard
              key={a.id_article}
              article={a}
              onEdit={() => router.push(`${base}/${a.id_article}`)}
              onDelete={() => handleDelete(a.id_article)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
