"use client";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";

ConfigProvider.config({
  warning: { strict: false },
});

export default function AntdProvider({ children }) {
  return (
    <ConfigProvider
      warning={{ strict: false }}
      theme={{
        token: {
          fontFamily: '"Prompt", "IBM Plex Sans", Arial, sans-serif',
          colorPrimary: "#FA5456",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
