"use client";
import { Button, Form, Input, Card, Typography, Alert } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("./");
      } else {
        setError("รหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm shadow-md">
        <Typography.Title level={3} className="text-center mb-6">
          Admin Login
        </Typography.Title>
        {error && <Alert type="error" message={error} className="mb-4" />}
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: "กรุณาใส่รหัสผ่าน" }]}
          >
            <Input.Password size="large" placeholder="Admin password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
