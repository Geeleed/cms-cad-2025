"use client";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";

ConfigProvider.config({
  warning: { strict: false },
});

export default function AntdProvider({ children }) {
  return (
    <ConfigProvider warning={{ strict: false }}>
      {children}
    </ConfigProvider>
  );
}
