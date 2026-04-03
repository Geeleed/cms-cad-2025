"use client";

import { Input, Collapse, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";

const TiptapField = dynamic(() => import("./TiptapField"), { ssr: false });

// Keys that should use rich text editor
const RICHTEXT_KEYS = new Set(["p", "description", "content", "body", "text", "footer", "address"]);
const URL_KEYS = new Set(["img", "imgSrc", "img_src", "src", "href", "link", "map",
  "facebook_link", "line_link", "email_link", "tel_link"]);

function isRichText(key) {
  return RICHTEXT_KEYS.has(key) || key.startsWith("p_") || key.startsWith("p.");
}

function isUrl(key) {
  return URL_KEYS.has(key) || key.endsWith("_link") || key.endsWith("_src") || key === "map";
}

function FieldEditor({ fieldKey, value, onChange }) {
  if (typeof value === "string") {
    if (isRichText(fieldKey)) {
      return <TiptapField value={value} onChange={onChange} />;
    }
    if (isUrl(fieldKey)) {
      return (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          addonBefore="URL"
        />
      );
    }
    return (
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <div style={{ paddingLeft: 8, borderLeft: "3px solid #f0f0f0" }}>
        {value.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              {typeof item === "object" && item !== null ? (
                <ResourceFields
                  data={item}
                  onChange={(updated) => {
                    const next = [...value];
                    next[idx] = updated;
                    onChange(next);
                  }}
                />
              ) : (
                <Input
                  value={item}
                  onChange={(e) => {
                    const next = [...value];
                    next[idx] = e.target.value;
                    onChange(next);
                  }}
                />
              )}
            </div>
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => {
                const next = value.filter((_, i) => i !== idx);
                onChange(next);
              }}
            />
          </div>
        ))}
        <Button
          size="small"
          icon={<PlusOutlined />}
          onClick={() => onChange([...value, ""])}
        >
          เพิ่ม
        </Button>
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <ResourceFields
        data={value}
        onChange={onChange}
      />
    );
  }

  return (
    <Input
      value={String(value ?? "")}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default function ResourceFields({ data, onChange }) {
  const entries = Object.entries(data);

  // Group by whether the value is a primitive or nested
  const primitives = entries.filter(([, v]) => typeof v !== "object" || v === null);
  const nested = entries.filter(([, v]) => typeof v === "object" && v !== null);

  const updateKey = (key, newValue) => {
    onChange({ ...data, [key]: newValue });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {primitives.map(([key, value]) => (
        <div key={key}>
          <div style={{ fontWeight: 500, marginBottom: 4, color: "#555", fontSize: 13 }}>
            {key}
          </div>
          <FieldEditor
            fieldKey={key}
            value={value}
            onChange={(v) => updateKey(key, v)}
          />
        </div>
      ))}
      {nested.length > 0 && (
        <Collapse
          size="small"
          items={nested.map(([key, value]) => ({
            key,
            label: <span style={{ fontWeight: 600 }}>{key}</span>,
            children: (
              <FieldEditor
                fieldKey={key}
                value={value}
                onChange={(v) => updateKey(key, v)}
              />
            ),
          }))}
        />
      )}
    </div>
  );
}
