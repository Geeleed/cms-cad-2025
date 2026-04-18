"use client";
import { useEffect, useState } from "react";
import { Tag, Typography, Button, Input, Spin } from "antd";
import { EditOutlined } from "@ant-design/icons";
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
const TEAM_TYPES = new Set(["page_team", "page_doctor"]);

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

// Strip _en / _th suffix to get base name for pairing
function getBaseName(name) {
  if (!name) return null;
  return name.replace(/_(en|th)$/, "");
}

function getLang(name) {
  if (!name) return null;
  const m = name.match(/_(en|th)$/);
  return m ? m[1] : null;
}

// Pair rows that differ only by _en / _th suffix
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
  // Merge: pairs first (sorted by base name), then unpaired
  const paired = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  return { paired, unpaired };
}

function PairedRow({ base, langs, onEdit }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        background: "#fff",
        borderBottom: "1px solid #f5f5f5",
      }}
    >
      <span style={{ fontWeight: 500 }}>{base}</span>
      <Button
        size="small"
        icon={<EditOutlined />}
        onClick={() => onEdit(langs["th"]?.id_resource ?? langs["en"]?.id_resource)}
      >
        แก้ไข
      </Button>
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

  // Group by resource_type, sorted by TYPE_ORDER
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
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        จัดการเนื้อหาหน้าเว็บ
      </Typography.Title>
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
            const { paired, unpaired } = pairRows(rows);
            const totalItems = paired.length + unpaired.length;
            return (
              <div key={type}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <Tag color={t?.color ?? "default"} style={{ fontSize: 13, padding: "2px 10px" }}>
                    {t?.label ?? type}
                  </Tag>
                  <span style={{ color: "#aaa", fontSize: 13 }}>{totalItems} รายการ</span>
                </div>
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
