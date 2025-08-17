import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          border: "8px solid #fc8823",
          borderTop: "8px solid #fa5456",
          borderRight: "8px solid #00b5bc",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          boxShadow: "0 0 24px #fa545644",
        }}
      />
      <style>
        {`
        @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );
}
