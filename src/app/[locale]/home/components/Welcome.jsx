import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";
import React from "react";

export default function Welcome({ welcomeTitle, welcomeP, locale }) {
  const rt = "page_landing";
  const rn = `section_welcome_${locale}`;
  return (
    <section className="section-welcome">
      <div className="max-w-[850px]">
        <FadeInWrapper threshold={0.01}>
          <h2 className="mb-[80px]">
            <InlineText value={welcomeTitle} resourceType={rt} resourceName={rn} fieldKey="h2" />
          </h2>
        </FadeInWrapper>
        <FadeInWrapper threshold={0.01} delay={500}>
          <p className="text-[18px]">
            <InlineText value={welcomeP} resourceType={rt} resourceName={rn} fieldKey="p" multiline />
          </p>
        </FadeInWrapper>
        <br />
      </div>
    </section>
  );
}
