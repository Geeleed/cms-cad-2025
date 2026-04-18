import { load_page_about } from "@/api/loadData";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";
import InlineImage from "@/components/admin/InlineImage";
import Image from "next/image";
import React from "react";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { locale } = await params;
  const page_about = await load_page_about({ params });
  if (!page_about.resource?.h2) return null;
  const rt = "page_about";
  const rn = `page_about_${locale}`;
  return (
    <div className="page-more-text page-about">
      <div className="page-more-text-container">
        <FadeInWrapper>
          <header>
            <h1><InlineText value={page_about.resource.h2} resourceType={rt} resourceName={rn} fieldKey="h2" /></h1>
          </header>
        </FadeInWrapper>
        <FadeInWrapper>
          <figure>
            <InlineImage value={page_about.resource.img} resourceType={rt} resourceName={rn} fieldKey="img">
              <Image
                src={page_about.resource.img}
                alt="about us"
                width={1500}
                height={1500}
                quality={100}
              />
            </InlineImage>
          </figure>
        </FadeInWrapper>
        <FadeInWrapper>
          <main>
            <section>
              <h2><InlineText value={page_about.resource.h3} resourceType={rt} resourceName={rn} fieldKey="h3" /></h2>
              <p><InlineText value={page_about.resource.p_1} resourceType={rt} resourceName={rn} fieldKey="p_1" multiline /></p>
              <p><InlineText value={page_about.resource.p_2} resourceType={rt} resourceName={rn} fieldKey="p_2" multiline /></p>
            </section>
            {(page_about.resource.card || []).map((el, index) => (
              <section key={index}>
                <h2><InlineText value={el.h3} resourceType={rt} resourceName={rn} fieldKey={`card.${index}.h3`} /></h2>
                <p><InlineText value={el.p} resourceType={rt} resourceName={rn} fieldKey={`card.${index}.p`} multiline /></p>
              </section>
            ))}
          </main>
        </FadeInWrapper>
      </div>
    </div>
  );
}
