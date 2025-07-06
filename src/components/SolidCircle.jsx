import React from "react";

export default function SolidCircle({
  color = "var(--c33)",
  size = 200,
  weight = 30,
  top = 0,
  left = 0,
  translateX = 0,
  translateY = 0,
}) {
  return (
    <div
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        padding: weight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top,
        left,
        borderRadius: 999,
        zIndex: -1,
        transform: `translate(${translateX}px,${translateY}px)`,
      }}
    >
      {/* <div
        style={{
          backgroundColor: "white",
          width: size - 2 * weight,
          height: size - 2 * weight,
          borderRadius: 999,
        }}
      ></div> */}
    </div>
  );
}
