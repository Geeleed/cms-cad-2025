"use client";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, message } from "antd";
import { _setMessageApi } from "@/lib/message";
import { useEffect } from "react";

ConfigProvider.config({
  warning: { strict: false },
});

function MessageHolder() {
  const [api, contextHolder] = message.useMessage();
  useEffect(() => {
    _setMessageApi(api);
  }, [api]);
  return contextHolder;
}

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
      <MessageHolder />
      {children}
    </ConfigProvider>
  );
}
