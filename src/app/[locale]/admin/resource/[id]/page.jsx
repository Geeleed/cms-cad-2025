"use client";
import { useEffect, useState } from "react";
import { Button, Card, Typography, Spin, Alert, Space, Tag } from "antd";
import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import ResourceFields from "@/components/admin/ResourceFields";

const TYPE_LABELS = {
  page_landing: { label: "Landing", color: "blue" },
  page_about: { label: "About", color: "green" },
  page_services: { label: "Services", color: "purple" },
  page_approaches: { label: "Approaches", color: "cyan" },
  page_resources: { label: "Resources", color: "magenta" },
  page_news: { label: "News Page", color: "gold" },
  page_content: { label: "Page Content", color: "lime" },
  value_setting: { label: "Settings", color: "geekblue" },
  resource_video: { label: "Video", color: "volcano" },
};

export default function ResourceEditorPage({ params }) {
  const [id, setId] = useState(null);
  const [row, setRow] = useState(null);
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [siblingId, setSiblingId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";

  useEffect(() => {
    params.then(({ id: paramId }) => {
      setId(paramId);
      setSiblingId(null);
      fetch(`/api/admin/resource/${paramId}`)
        .then((r) => r.json())
        .then((data) => {
          setRow(data);
          setResource(data.resource);
          // Find sibling with opposite lang suffix
          const name = data.name ?? "";
          const langMatch = name.match(/_(en|th)$/);
          if (langMatch) {
            const siblingLang = langMatch[1] === "en" ? "th" : "en";
            const siblingName = name.replace(/_(en|th)$/, `_${siblingLang}`);
            fetch(`/api/admin/resource?type=${data.resource_type}&name=${siblingName}`)
              .then((r) => r.ok ? r.json() : null)
              .then((sib) => { if (sib?.id_resource) setSiblingId({ id: sib.id_resource, lang: siblingLang }); })
              .catch(() => {});
          }
        })
        .catch(() => setError("ไม่สามารถโหลดข้อมูลได้"))
        .finally(() => setLoading(false));
    });
  }, [params]);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch(`/api/admin/resource/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resource, remark: row.remark }),
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

  const typeInfo = TYPE_LABELS[row?.resource_type];
  const currentLang = (row?.name ?? "").match(/_(en|th)$/)?.[1];

  return (
    <div style={{ maxWidth: 900 }}>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.push(`/${locale}/admin/resource`)}>
          กลับ
        </Button>
      </Space>

      <Card
        title={
          <Space>
            <Tag color={typeInfo?.color ?? "default"}>{typeInfo?.label ?? row?.resource_type}</Tag>
            <Typography.Text strong>{row?.name?.replace(/_(en|th)$/, "") ?? row?.name}</Typography.Text>
            {currentLang && siblingId && (
              <Space size={4}>
                {["th", "en"].map((l) => (
                  <Button
                    key={l}
                    size="small"
                    type={currentLang === l ? "primary" : "default"}
                    style={{ minWidth: 36, fontWeight: 600, fontSize: 12 }}
                    onClick={() => {
                      if (currentLang !== l) {
                        router.push(`/${locale}/admin/resource/${siblingId.id}`);
                      }
                    }}
                  >
                    {l.toUpperCase()}
                  </Button>
                ))}
              </Space>
            )}
          </Space>
        }
        extra={
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={saving}
            onClick={save}
          >
            บันทึก
          </Button>
        }
      >
        {saved && <Alert type="success" message="บันทึกเรียบร้อยแล้ว" style={{ marginBottom: 16 }} />}
        {error && <Alert type="error" message={error} style={{ marginBottom: 16 }} />}

        {resource && (
          <ResourceFields
            data={resource}
            onChange={(updated) => setResource(updated)}
          />
        )}
      </Card>
    </div>
  );
}
