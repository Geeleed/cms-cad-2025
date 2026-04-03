"use client";
import { Layout, Menu, Button } from "antd";
import {
  FileTextOutlined,
  PictureOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname.split("/")[1] ?? "th";
  const base = `/${locale}/admin`;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`${base}/login`);
  };

  const menuItems = [
    { key: base, icon: <DashboardOutlined />, label: "Dashboard" },
    { key: `${base}/resource`, icon: <FileTextOutlined />, label: "จัดการเนื้อหาหน้าเว็บ" },
    { key: `${base}/news`, icon: <PictureOutlined />, label: "จัดการข่าว" },
    { key: `${base}/video`, icon: <VideoCameraOutlined />, label: "จัดการวิดีโอ" },
    { key: `${base}/article`, icon: <ReadOutlined />, label: "จัดการบทความ" },
  ];

  const selectedKey = menuItems.find((item) => pathname.startsWith(item.key) && item.key !== base)?.key ?? base;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} theme="light" style={{ borderRight: "1px solid #f0f0f0" }}>
        <div style={{ padding: "16px", fontWeight: 700, fontSize: 16, borderBottom: "1px solid #f0f0f0" }}>
          CAD Admin
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ border: "none" }}
        />
        <div style={{ position: "absolute", bottom: 16, width: "100%", padding: "0 16px" }}>
          <Button icon={<LogoutOutlined />} onClick={logout} block>
            ออกจากระบบ
          </Button>
        </div>
      </Sider>
      <Layout>
        <Content style={{ padding: 24, background: "#f5f5f5", minHeight: "100vh" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
