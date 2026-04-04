"use client";
import { ADMIN_SESSION_EVENT } from "@/hooks/useAdminSession";
import useAdminSession from "@/hooks/useAdminSession";
import { Alert, Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginModal({ locale }) {
  const router = useRouter();
  const { isAdmin, loading: sessionLoading } = useAdminSession();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

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
        setOpen(false);
        form.resetFields();
        window.dispatchEvent(new Event(ADMIN_SESSION_EVENT));
        router.push(`/${locale}/admin`);
      } else {
        setError("รหัสผ่านไม่ถูกต้อง");
      }
    } catch {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.dispatchEvent(new Event(ADMIN_SESSION_EVENT));
  };

  const handleCancel = () => {
    setOpen(false);
    setError("");
    form.resetFields();
  };

  if (sessionLoading) return null;

  return (
    <>
      {isAdmin ? (
        <button
          onClick={handleLogout}
          className="button-primary !py-[10px] !px-[20px] !text-[0.85rem] !rounded-[8px]"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="button-primary !py-[10px] !px-[20px] !text-[0.85rem] !rounded-[8px]"
        >
          Login
        </button>
      )}
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={null}
        title="Admin Login"
        width={360}
        centered
        destroyOnClose
      >
        {error && <Alert type="error" message={error} className="mb-4" />}
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off" className="mt-4">
          <Form.Item
            label="รหัสผ่าน"
            name="password"
            rules={[{ required: true, message: "กรุณาใส่รหัสผ่าน" }]}
          >
            <Input.Password size="large" placeholder="Admin password" autoFocus />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              เข้าสู่ระบบ
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
