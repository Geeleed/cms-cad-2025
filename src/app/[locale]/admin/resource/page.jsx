"use client";
import { useEffect, useState } from "react";
import { Tag, Typography, Button, Input, Spin, Tooltip } from "antd";
import { EditOutlined, LinkOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const TYPE_ORDER = [
  "page_landing",
  "page_about",
  "page_services",
  "page_approaches",
  "page_resources",
  "page_news",
  "page_content",
  "value_setting",
  "resource_video",
];

// Types managed in the dedicated Team page — excluded here
const TEAM_TYPES = new Set(["page_team", "page_doctor", "page_content"]);

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

// Human-readable descriptions per resource type
const TYPE_DESCRIPTIONS = {
  page_landing: "เนื้อหาหน้าหลัก (Home) ทุก section",
  page_about: "หน้า About — ประวัติและรายละเอียดองค์กร",
  page_services: "หน้า Services — รายการบริการ",
  page_approaches: "หน้า Approaches — แนวทางการรักษา",
  page_resources: "หน้า Resources — บทความและวิดีโอ",
  page_news: "หน้า News — ข่าวสาร",
  page_content: "เนื้อหาทั่วไป",
  value_setting: "ค่าตั้งต้นของระบบ (สี, ค่าต่างๆ)",
  resource_video: "วิดีโอที่แสดงในหน้าเว็บ",
};

// Page preview links per resource_type
const TYPE_PAGE_LINKS = {
  page_landing: (locale) => `/${locale}/home`,
  page_about: (locale) => `/${locale}/about`,
  page_services: (locale) => `/${locale}/services`,
  page_approaches: (locale) => `/${locale}/approaches`,
  page_resources: (locale) => `/${locale}/resources`,
  page_news: (locale) => `/${locale}/news`,
};

function getBaseName(name) {
  if (!name) return null;
  return name.replace(/_(en|th)$/, "");
}

function getLang(name) {
  if (!name) return null;
  const m = name.match(/_(en|th)$/);
  return m ? m[1] : null;
}

function pairRows(rows) {
  const map = {};
  const unpaired = [];
  for (const row of rows) {
    const base = getBaseName(row.name);
    const lang = getLang(row.name);
    if (base && lang) {
      if (!map[base]) map[base] = {};
      map[base][lang] = row;
    } else {
      unpaired.push(row);
    }
  }
  const paired = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  return { paired, unpaired };
}

function PairedRow({ base, langs, onEdit }) {
  const displayName = base.replace(/^(page_landing|page_about|page_services|page_approaches|page_resources|page_news|page_content|value_setting|resource_video)_?/, "");
  const label = displayName || base;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "#fff",
        borderBottom: "1px solid #f5f5f5",
        gap: 8,
      }}
    >
      <span style={{ fontWeight: 500, flex: 1, fontSize: 13, color: "#444" }}>{label}</span>
      <div style={{ display: "flex", gap: 6 }}>
        {["th", "en"].map((lang) =>
          langs[lang] ? (
            <Button
              key={lang}
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEdit(langs[lang].id_resource)}
            >
              {lang.toUpperCase()}
            </Button>
          ) : null
        )}
      </div>
    </div>
  );
}

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
      !TEAM_TYPES.has(r.resource_type) &&
      ((r.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
        r.resource_type.toLowerCase().includes(search.toLowerCase()))
  );

  const grouped = filtered.reduce((acc, row) => {
    if (!acc[row.resource_type]) acc[row.resource_type] = [];
    acc[row.resource_type].push(row);
    return acc;
  }, {});

  const sortedGroupEntries = Object.entries(grouped).sort(([a], [b]) => {
    const ia = TYPE_ORDER.indexOf(a);
    const ib = TYPE_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 4 }}>
        จัดการเนื้อหาหน้าเว็บ
      </Typography.Title>
      <Typography.Text type="secondary" style={{ display: "block", marginBottom: 20, fontSize: 13 }}>
        คลิกปุ่ม TH / EN เพื่อแก้ไขเนื้อหาแต่ละภาษา
      </Typography.Text>
      <Input.Search
        placeholder="ค้นหา..."
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 24, maxWidth: 320 }}
        allowClear
      />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 60 }}>
          <Spin size="large" />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {sortedGroupEntries.map(([type, rows]) => {
            const t = TYPE_LABELS[type];
            const desc = TYPE_DESCRIPTIONS[type];
            const pageLink = TYPE_PAGE_LINKS[type]?.(locale);
            const { paired, unpaired } = pairRows(rows);
            const totalItems = paired.length + unpaired.length;
            return (
              <div key={type}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <Tag color={t?.color ?? "default"} style={{ fontSize: 13, padding: "2px 10px" }}>
                    {t?.label ?? type}
                  </Tag>
                  {pageLink && (
                    <Tooltip title="ดูหน้านี้บนเว็บไซต์">
                      <Button
                        type="link"
                        size="small"
                        icon={<LinkOutlined />}
                        href={pageLink}
                        target="_blank"
                        style={{ padding: 0, fontSize: 12 }}
                      >
                        ดูหน้าจริง
                      </Button>
                    </Tooltip>
                  )}
                </div>
                {desc && (
                  <Typography.Text type="secondary" style={{ display: "block", fontSize: 12, marginBottom: 8 }}>
                    {desc}
                  </Typography.Text>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 8, overflow: "hidden", border: "1px solid #f0f0f0" }}>
                  {paired.map(([base, langs]) => (
                    <PairedRow
                      key={base}
                      base={base}
                      langs={langs}
                      onEdit={(id) => router.push(`/${locale}/admin/resource/${id}`)}
                    />
                  ))}
                  {unpaired.map((row) => (
                    <div
                      key={row.id_resource}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        background: "#fff",
                        borderBottom: "1px solid #f5f5f5",
                        gap: 8,
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 500 }}>{row.name || <span style={{ color: "#bbb", fontStyle: "italic" }}>(ไม่มีชื่อ — id: {row.id_resource})</span>}</span>
                        {row.remark && <span style={{ marginLeft: 12, color: "#999", fontSize: 13 }}>{row.remark}</span>}
                      </div>
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => router.push(`/${locale}/admin/resource/${row.id_resource}`)}
                      >
                        แก้ไข
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
