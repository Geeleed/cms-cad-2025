"use client";
import { useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import {
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ReadOutlined,
  MenuOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { ADMIN_SESSION_EVENT } from "@/hooks/useAdminSession";

const { Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileSider, setMobileSider] = useState(false); // true when sider is collapsed by breakpoint

  const locale = pathname.split("/")[1] ?? "th";
  const base = `/${locale}/admin`;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.dispatchEvent(new Event(ADMIN_SESSION_EVENT));
    router.push(`/${locale}/home`);
  };

  const menuItems = [
    { key: base, icon: <DashboardOutlined />, label: "Dashboard" },
    { key: `${base}/resource`, icon: <FileTextOutlined />, label: "จัดการเนื้อหาหน้าเว็บ" },
    { key: `${base}/team`, icon: <TeamOutlined />, label: "จัดการทีมงาน" },
    { key: `${base}/news`, icon: <PictureOutlined />, label: "จัดการข่าว" },
    { key: `${base}/video`, icon: <VideoCameraOutlined />, label: "จัดการวิดีโอ" },
    { key: `${base}/article`, icon: <ReadOutlined />, label: "จัดการบทความ" },
  ];

  const selectedKey =
    menuItems.find((item) => pathname.startsWith(item.key) && item.key !== base)?.key ?? base;

  const navigate = (key) => {
    router.push(key);
    setDrawerOpen(false);
  };

  const sidebarContent = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "16px",
          fontWeight: 700,
          fontSize: 16,
          borderBottom: "1px solid #f0f0f0",
          flexShrink: 0,
        }}
      >
        CAD Admin
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ border: "none", flex: 1 }}
      />
      <div style={{ padding: "16px", flexShrink: 0 }}>
        <Button icon={<LogoutOutlined />} onClick={logout} block>
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop sidebar — hidden on mobile via breakpoint */}
      <Sider
        width={240}
        theme="light"
        breakpoint="lg"
        collapsedWidth={0}
        trigger={null}
        onBreakpoint={(broken) => setMobileSider(broken)}
        style={{ borderRight: "1px solid #f0f0f0" }}
      >
        {sidebarContent}
      </Sider>

      {/* Mobile drawer */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={240}
        styles={{ body: { padding: 0, display: "flex", flexDirection: "column" } }}
        title={null}
        closeIcon={null}
      >
        {sidebarContent}
      </Drawer>

      <Layout>
        {/* Mobile top bar (shown only when sidebar is collapsed) */}
        {mobileSider && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              background: "#fff",
              borderBottom: "1px solid #f0f0f0",
              position: "sticky",
              top: 0,
              zIndex: 10,
            }}
          >
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
            />
            <span style={{ fontWeight: 700, fontSize: 16 }}>CAD Admin</span>
          </div>
        )}

        <Content
          style={{
            padding: mobileSider ? 16 : 24,
            background: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
