import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";

export default function Welcome({ welcomeTitle, welcomeP }) {
  return (
    <section className="section-welcome">
      <div className="max-w-[850px]">
        <FadeInWrapper threshold={0.01}>
          <h2 className="mb-[80px]">{welcomeTitle}</h2>
        </FadeInWrapper>
        <FadeInWrapper threshold={0.01} delay={500}>
          <p className="text-[18px]">{welcomeP}</p>
        </FadeInWrapper>
        <br />
      </div>
    </section>
  );
}
