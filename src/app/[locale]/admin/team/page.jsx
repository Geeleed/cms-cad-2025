"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Button, Typography, Drawer, Input, Tabs, Spin, Space, Alert,
  Grid, Divider, Avatar, Row, Col, Tag, Select, Switch,
} from "antd";
import {
  PlusOutlined, EditOutlined, SaveOutlined,
  UserOutlined, MinusCircleOutlined, TeamOutlined,
  EyeOutlined, EyeInvisibleOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";

const { useBreakpoint } = Grid;

/* ─── helpers ─── */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

function emptyMember() {
  return { img: "", person_name: "", role: "", position: "", highlights: [], credentials: [], educations: [], status: "active" };
}

const STATUS_OPTIONS = [
  { value: "active",   label: "ทำงานอยู่",    color: "green" },
  { value: "resigned", label: "ลาออก",       color: "red" },
  { value: "inactive", label: "ไม่ใช้งาน", color: "default" },
];

function getStatusInfo(s) {
  return STATUS_OPTIONS.find((o) => o.value === s) ?? STATUS_OPTIONS[0];
}

/* ─── StringListEditor: editable array of strings ─── */
function StringListEditor({ value = [], onChange }) {
  // Items can be plain strings or { p: "..." } objects
  const getText = (item) => (typeof item === "object" && item !== null ? item.p ?? "" : item ?? "");
  const toItem = (item, text) => (typeof item === "object" && item !== null ? { ...item, p: text } : text);
  const newItem = () => (value.length > 0 && typeof value[0] === "object" ? { p: "" } : "");

  return (
    <div>
      {value.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
          <Input.TextArea
            autoSize={{ minRows: 1, maxRows: 4 }}
            value={getText(item)}
            onChange={(e) => {
              const next = [...value];
              next[i] = toItem(item, e.target.value);
              onChange(next);
            }}
          />
          <Button
            type="text"
            danger
            icon={<MinusCircleOutlined />}
            onClick={() => onChange(value.filter((_, idx) => idx !== i))}
          />
        </div>
      ))}
      <Button
        type="dashed"
        size="small"
        icon={<PlusOutlined />}
        onClick={() => onChange([...value, newItem()])}
      >
        เพิ่ม
      </Button>
    </div>
  );
}

/* ─── LangForm: fields for one language ─── */
function LangForm({ member, onChange }) {
  const set = (field, val) => onChange({ ...member, [field]: val });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <Typography.Text strong style={{ fontSize: 13 }}>ชื่อ</Typography.Text>
        <Input
          value={member.person_name ?? ""}
          onChange={(e) => set("person_name", e.target.value)}
          placeholder="ชื่อ-นามสกุล"
          style={{ marginTop: 4 }}
        />
      </div>
      <div>
        <Typography.Text strong style={{ fontSize: 13 }}>Role / ประเภท</Typography.Text>
        <Input
          value={member.role ?? ""}
          onChange={(e) => set("role", e.target.value)}
          placeholder="เช่น ครูผู้สอน / Advisor"
          style={{ marginTop: 4 }}
        />
      </div>
      <div>
        <Typography.Text strong style={{ fontSize: 13 }}>ตำแหน่ง</Typography.Text>
        <Input
          value={member.position ?? ""}
          onChange={(e) => set("position", e.target.value)}
          placeholder="เช่น Speech Therapist"
          style={{ marginTop: 4 }}
        />
      </div>
      <Divider style={{ margin: "4px 0" }} />
      <div>
        <Typography.Text strong style={{ fontSize: 13 }}>Highlights</Typography.Text>
        <div style={{ marginTop: 6 }}>
          <StringListEditor value={member.highlights ?? []} onChange={(v) => set("highlights", v)} />
        </div>
      </div>
      <div>
        <Typography.Text strong style={{ fontSize: 13 }}>Credentials / คุณสมบัติ</Typography.Text>
        <div style={{ marginTop: 6 }}>
          <StringListEditor value={member.credentials ?? []} onChange={(v) => set("credentials", v)} />
        </div>
      </div>
      <div>
        <Typography.Text strong style={{ fontSize: 13 }}>Education Background</Typography.Text>
        <div style={{ marginTop: 6 }}>
          <StringListEditor value={member.educations ?? []} onChange={(v) => set("educations", v)} />
        </div>
      </div>
    </div>
  );
}

/* ─── MemberCard ─── */
function MemberCard({ enMember, thMember, idx, onEdit, onChangeStatus }) {
  const img = thMember?.img || enMember?.img;
  const name = thMember?.person_name || enMember?.person_name || "(ไม่มีชื่อ)";
  const role = thMember?.role || enMember?.role || "";
  const position = thMember?.position || enMember?.position || "";
  const status = thMember?.status || enMember?.status || "active";
  const statusInfo = getStatusInfo(status);
  const isInactive = status !== "active";

  return (
    <div
      style={{
        background: isInactive ? "#fafafa" : "#fff",
        border: `1px solid ${isInactive ? "#e0e0e0" : "#f0f0f0"}`,
        borderRadius: 12,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        opacity: isInactive ? 0.7 : 1,
        transition: "opacity 0.2s",
        textAlign: "center",
        height: "100%",
      }}
    >
      <div style={{ width: "100%", position: "relative", paddingTop: "133%", borderRadius: 10, overflow: "hidden", background: "#f0f0f0", filter: isInactive ? "grayscale(60%)" : "none" }}>
        {img ? (
          <img src={img} alt={name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserOutlined style={{ fontSize: 40, color: "#bbb" }} />
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
          <Typography.Text strong style={{ fontSize: 14 }}>
            {name}
          </Typography.Text>
          <Tag color={statusInfo.color} style={{ fontSize: 10, margin: 0 }}>{statusInfo.label}</Tag>
        </div>
        {role && (
          <Typography.Text type="secondary" style={{ fontSize: 12, display: "block" }}>
            {role}
          </Typography.Text>
        )}
        {position && (
          <Typography.Text type="secondary" style={{ fontSize: 11, display: "block" }}>
            {position}
          </Typography.Text>
        )}
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
        <Button size="small" icon={<EditOutlined />} onClick={() => onEdit(idx)} block>
          แก้ไข
        </Button>
        <Select
          size="small"
          value={status}
          onChange={(val) => onChangeStatus(idx, val)}
          style={{ width: "100%" }}
          options={STATUS_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
        />
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function TeamPage() {
  const pathname = usePathname();
  const screens = useBreakpoint();
  const fileRef = useRef();

  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showInactive, setShowInactive] = useState(false);

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [draftEn, setDraftEn] = useState(null);
  const [draftTh, setDraftTh] = useState(null);
  const [draftImg, setDraftImg] = useState("");
  const [draftStatus, setDraftStatus] = useState("active");

  useEffect(() => {
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then(setTeamData)
      .catch(() => setAlert({ type: "error", message: "โหลดข้อมูลไม่สำเร็จ" }))
      .finally(() => setLoading(false));
  }, []);

  const saveAll = useCallback(async (data) => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setTeamData(data);
        setAlert({ type: "success", message: "บันทึกเรียบร้อยแล้ว" });
        setTimeout(() => setAlert(null), 3000);
        return true;
      } else {
        setAlert({ type: "error", message: "บันทึกไม่สำเร็จ" });
        return false;
      }
    } catch {
      setAlert({ type: "error", message: "เกิดข้อผิดพลาด" });
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const openAdd = () => {
    const m = emptyMember();
    setEditIdx(null);
    setDraftEn(m);
    setDraftTh({ ...m });
    setDraftImg("");
    setDraftStatus("active");
    setDrawerOpen(true);
  };

  const openEdit = (idx) => {
    const enMembers = teamData?.en_resource?.team ?? [];
    const thMembers = teamData?.th_resource?.team ?? [];
    const en = { ...emptyMember(), ...(enMembers[idx] ?? {}) };
    const th = { ...emptyMember(), ...(thMembers[idx] ?? {}) };
    setEditIdx(idx);
    setDraftEn({ ...en, img: undefined });
    setDraftTh({ ...th, img: undefined });
    setDraftImg(th.img || en.img || "");
    setDraftStatus(th.status || en.status || "active");
    setDrawerOpen(true);
  };

  const handleFilePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const b64 = await fileToBase64(file);
      setDraftImg(b64);
    } catch {
      // ignore
    }
    e.target.value = "";
  };

  const handleSaveMember = async () => {
    if (!teamData) return;
    const enTeam = [...(teamData.en_resource?.team ?? [])];
    const thTeam = [...(teamData.th_resource?.team ?? [])];

    const enMember = { ...draftEn, img: draftImg, status: draftStatus };
    const thMember = { ...draftTh, img: draftImg, status: draftStatus };

    if (editIdx === null) {
      enTeam.push(enMember);
      thTeam.push(thMember);
    } else {
      enTeam[editIdx] = enMember;
      thTeam[editIdx] = thMember;
    }

    const updated = {
      ...teamData,
      en_resource: { ...teamData.en_resource, team: enTeam },
      th_resource: { ...teamData.th_resource, team: thTeam },
    };

    const ok = await saveAll(updated);
    if (ok) setDrawerOpen(false);
  };

  // Change status directly from card (no drawer needed)
  const handleChangeStatus = async (idx, newStatus) => {
    if (!teamData) return;
    const applyStatus = (team) =>
      team.map((m, i) => (i === idx ? { ...m, status: newStatus } : m));
    const updated = {
      ...teamData,
      en_resource: { ...teamData.en_resource, team: applyStatus(teamData.en_resource?.team ?? []) },
      th_resource: { ...teamData.th_resource, team: applyStatus(teamData.th_resource?.team ?? []) },
    };
    await saveAll(updated);
  };

  const enTeam = teamData?.en_resource?.team ?? [];
  const thTeam = teamData?.th_resource?.team ?? [];
  const totalCount = Math.max(enTeam.length, thTeam.length);
  const activeCount = enTeam.filter((m) => !m?.status || m.status === "active").length;
  const inactiveCount = totalCount - activeCount;

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16 }}>
        <Spin size="large" />
        <Typography.Text type="secondary">กำลังโหลดข้อมูลทีมงาน...</Typography.Text>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
        <div>
          <Typography.Title level={4} style={{ margin: 0 }}>
            จัดการทีมงาน
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 13 }}>
            ทำงานอยู่ {activeCount} คน
            {inactiveCount > 0 && ` · ไม่ใช้งาน ${inactiveCount} คน`}
          </Typography.Text>
        </div>
        <Space>
          {inactiveCount > 0 && (
            <Button
              icon={showInactive ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => setShowInactive((v) => !v)}
            >
              {showInactive ? "ซ่อนไม่ใช้งาน" : `แสดงไม่ใช้งาน (${inactiveCount})`}
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd}>
            เพิ่มสมาชิก
          </Button>
        </Space>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          showIcon
          closable
          onClose={() => setAlert(null)}
          style={{ marginBottom: 16, borderRadius: 8 }}
        />
      )}

      {/* Member list */}
      {totalCount === 0 ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px", background: "#fff", borderRadius: 12, border: "2px dashed #d9d9d9", gap: 12 }}>
          <TeamOutlined style={{ fontSize: 48, color: "#d9d9d9" }} />
          <Typography.Title level={5} style={{ margin: 0, color: "#bbb" }}>ยังไม่มีสมาชิก</Typography.Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={openAdd} style={{ marginTop: 8 }}>
            เพิ่มสมาชิกคนแรก
          </Button>
        </div>
      ) : (
        <Row gutter={[16, 20]} align="stretch">
          {Array.from({ length: totalCount }).map((_, idx) => {
            const en = enTeam[idx];
            const th = thTeam[idx];
            const status = th?.status || en?.status || "active";
            if (!showInactive && status !== "active") return null;
            return (
              <Col xs={24} sm={12} md={8} key={idx}>
                <MemberCard
                  idx={idx}
                  enMember={en}
                  thMember={th}
                  onEdit={openEdit}
                  onChangeStatus={handleChangeStatus}
                />
              </Col>
            );
          })}
        </Row>
      )}

      {/* Edit / Add Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editIdx === null ? "เพิ่มสมาชิกใหม่" : `แก้ไขสมาชิก #${(editIdx ?? 0) + 1}`}
        width={screens.lg ? 700 : "100%"}
        extra={
          <Button type="primary" icon={<SaveOutlined />} loading={saving} onClick={handleSaveMember}>
            บันทึก
          </Button>
        }
        styles={{ body: { paddingBottom: 80 } }}
      >
        {/* Photo section */}
        <div style={{ marginBottom: 20 }}>
          <Typography.Text strong>รูปภาพ (ใช้ร่วมกัน TH / EN)</Typography.Text>
          <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Avatar
              src={draftImg || undefined}
              icon={!draftImg && <UserOutlined />}
              size={80}
              shape="square"
              style={{ borderRadius: 8, background: "#f0f0f0", flexShrink: 0 }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <Input
                value={draftImg}
                onChange={(e) => setDraftImg(e.target.value)}
                placeholder="https://... หรืออัปโหลดไฟล์"
                addonBefore="URL"
              />
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFilePick}
              />
              <Button size="small" onClick={() => fileRef.current?.click()}>
                📁 อัปโหลดรูปภาพ
              </Button>
            </div>
          </div>
        </div>

        {/* Status field (shared) */}
        <div style={{ marginBottom: 16 }}>
          <Typography.Text strong>สถานะ</Typography.Text>
          <Select
            value={draftStatus}
            onChange={setDraftStatus}
            style={{ width: "100%", marginTop: 8 }}
            options={STATUS_OPTIONS.map((o) => ({
              value: o.value,
              label: <><Tag color={o.color} style={{ marginRight: 4 }}>{o.label}</Tag></>,
            }))}
          />
        </div>

        <Divider style={{ margin: "0 0 16px" }} />

        {/* TH / EN tabs */}
        <Tabs
          defaultActiveKey="th"
          items={[
            {
              key: "th",
              label: "🇹🇭 ภาษาไทย",
              children: draftTh ? (
                <LangForm member={draftTh} onChange={setDraftTh} />
              ) : null,
            },
            {
              key: "en",
              label: "🇬🇧 English",
              children: draftEn ? (
                <LangForm member={draftEn} onChange={setDraftEn} />
              ) : null,
            },
          ]}
        />
      </Drawer>
    </div>
  );
}
