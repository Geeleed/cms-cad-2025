"use client";
import { Card, Row, Col, Typography } from "antd";
import { Grid } from "antd";
import { FileTextOutlined, PictureOutlined, ReadOutlined, VideoCameraOutlined, TeamOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

const { useBreakpoint } = Grid;

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const screens = useBreakpoint();
  const locale = pathname.split("/")[1] ?? "th";
  const base = `/${locale}/admin`;

  const cards = [
    {
      icon: <FileTextOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      title: "จัดการเนื้อหาหน้าเว็บ",
      desc: "แก้ไข Landing, About, Services, Approaches, Contact",
      path: `${base}/resource`,
    },
    {
      icon: <TeamOutlined style={{ fontSize: 32, color: "#eb2f96" }} />,
      title: "จัดการทีมงาน",
      desc: "แก้ไขข้อมูลแพทย์และทีมงานที่แสดงในเว็บไซต์",
      path: `${base}/team`,
    },
    {
      icon: <PictureOutlined style={{ fontSize: 32, color: "#52c41a" }} />,
      title: "จัดการข่าว",
      desc: "เพิ่ม / แก้ไข / ลบข่าวสารของศูนย์",
      path: `${base}/news`,
    },
    {
      icon: <VideoCameraOutlined style={{ fontSize: 32, color: "#fa8c16" }} />,
      title: "จัดการวิดีโอ",
      desc: "เพิ่ม / ลบวิดีโอ YouTube ในหน้า Resources",
      path: `${base}/video`,
    },
    {
      icon: <ReadOutlined style={{ fontSize: 32, color: "#722ed1" }} />,
      title: "จัดการบทความ",
      desc: "เขียน / แก้ไข / ลบบทความในหน้า Resources",
      path: `${base}/article`,
    },
  ];

  return (
    <div>
      <Typography.Title level={screens.xs ? 4 : 3} style={{ marginBottom: 16 }}>
        Dashboard
      </Typography.Title>
      <Row gutter={[16, 16]} align="stretch">
        {cards.map((card) => (
          <Col xs={24} sm={12} lg={8} key={card.path} style={{ display: "flex" }}>
            <Card
              hoverable
              onClick={() => router.push(card.path)}
              style={{ cursor: "pointer", width: "100%" }}
            >
              <div style={{ marginBottom: 8 }}>{card.icon}</div>
              <Typography.Title level={5} style={{ margin: 0 }}>
                {card.title}
              </Typography.Title>
              <Typography.Text type="secondary">{card.desc}</Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

