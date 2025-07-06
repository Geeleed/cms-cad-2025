import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";

export default function ContainerSection({ children }) {
  return (
    <FadeInWrapper>
      <div className="container-section">{children}</div>
    </FadeInWrapper>
  );
}
