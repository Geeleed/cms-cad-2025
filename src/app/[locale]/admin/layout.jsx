"use client";

export default function AdminLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: 24 }}>
      {children}
    </div>
  );
}
