"use client";
import { Card, Row, Col, Typography } from "antd";
import { FileTextOutlined, PictureOutlined, ReadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] ?? "th";
  const base = `/${locale}/admin`;

  const cards = [
    {
      icon: <FileTextOutlined style={{ fontSize: 32, color: "#1677ff" }} />,
      title: "จัดการเนื้อหาหน้าเว็บ",
      desc: "แก้ไข Landing, About, Services, Team, Doctor, Approaches, Contact",
      path: `${base}/resource`,
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
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        Dashboard
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {cards.map((card) => (
          <Col xs={24} sm={12} lg={8} key={card.path}>
            <Card
              hoverable
              onClick={() => router.push(card.path)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ marginBottom: 12 }}>{card.icon}</div>
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

