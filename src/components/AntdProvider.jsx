"use client";
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
