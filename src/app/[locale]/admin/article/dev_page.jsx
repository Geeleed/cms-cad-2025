import Title from "antd/es/typography/Title";
import React from "react";
import Typing from "./components/Typing";
import TableEditor from "./components/TableEditor";

export default function Page() {
  return (
    <div>
      <Title>Article Management</Title>
      <Typing />
      <TableEditor />
    </div>
  );
}
