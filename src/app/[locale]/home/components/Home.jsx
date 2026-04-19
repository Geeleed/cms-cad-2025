import Image from "next/image";
import React from "react";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";
import InlineImage from "@/components/admin/InlineImage";

export default function Home({ h1_1, h1_2, p, img, locale }) {
  const rt = "page_landing";
  const rn = `section_home_${locale}`;
  return (
    <section className="section-home">
      <div className="left">
        <div>
          <FadeInWrapper>
            <h1>
              <span className="text-(--c)">
                <InlineText value={h1_1} resourceType={rt} resourceName={rn} fieldKey="h1_1" />
              </span>
              {" "}
              <InlineText value={h1_2} resourceType={rt} resourceName={rn} fieldKey="h1_2" />
            </h1>
          </FadeInWrapper>
          <FadeInWrapper delay={500}>
            <p>
              <InlineText value={p} resourceType={rt} resourceName={rn} fieldKey="p" multiline />
            </p>
          </FadeInWrapper>
        </div>
      </div>
      <div className="right">
        <FadeInWrapper>
          <div className="image">
            <InlineImage value={img} resourceType={rt} resourceName={rn} fieldKey="img">
              {img ? (
                <Image
                  className="w-full"
                  src={img}
                  width={1000}
                  height={1000}
                  alt="CAD center team"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : null}
            </InlineImage>
          </div>
        </FadeInWrapper>
      </div>
      <FadeInWrapper delay={1000}>
        <div className="col-span-2 w-full" />
      </FadeInWrapper>
    </section>
  );
}
