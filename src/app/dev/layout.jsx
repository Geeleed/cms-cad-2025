import React from "react";

export default function layout({ children }) {
  return (
    <div className="absolute h-dvh w-dvw bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
