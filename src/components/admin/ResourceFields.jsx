"use client";

import { Input, Collapse, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { useRef } from "react";

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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function isImgKey(key) {
  return key === "img" || key === "imgSrc" || key === "img_src" || key === "src";
}

function UrlField({ fieldKey, value, onChange }) {
  const fileInputRef = useRef();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
    } catch {
      // silently ignore
    }
    e.target.value = "";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          addonBefore="URL"
          style={{ flex: 1 }}
        />
        {isImgKey(fieldKey) && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button onClick={() => fileInputRef.current?.click()}>📁 อัปโหลด</Button>
          </>
        )}
      </div>
      {isImgKey(fieldKey) && value && (
        <img
          src={value}
          alt="preview"
          style={{ maxHeight: 160, maxWidth: "100%", objectFit: "contain", borderRadius: 6, border: "1px solid #eee", background: "#fafafa" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      )}
    </div>
  );
}

function FieldEditor({ fieldKey, value, onChange }) {
  if (typeof value === "string") {
    if (isRichText(fieldKey)) {
      return <TiptapField value={value} onChange={onChange} />;
    }
    if (isUrl(fieldKey)) {
      return <UrlField fieldKey={fieldKey} value={value} onChange={onChange} />;
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
