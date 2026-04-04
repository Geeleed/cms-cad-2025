import CardA from "@/components/CardA";
import CardB from "@/components/CardB";
import FadeInWrapper from "@/components/FadeInWrapper";
import IconApproaches1 from "@/components/icons/IconApproaches1";
import IconApproaches2 from "@/components/icons/IconApproaches2";
import IconApproaches3 from "@/components/icons/IconApproaches3";
import IconApproachesA from "@/components/icons/IconApproachesA";
import InlineText from "@/components/admin/InlineText";
import Link from "next/link";
import React from "react";

export default function Approaches({
  approachesTitle,
  approachesCard = [],
  locale,
  dictionary,
}) {
  const rt = "page_approaches";
  const rn = `page_approaches_${locale}`;
  return (
    <section className="section-approaches">
      <div className="flex justify-center text-center">
        <FadeInWrapper delay={100}>
          <h2><InlineText value={approachesTitle} resourceType={rt} resourceName={rn} fieldKey="content" /></h2>
        </FadeInWrapper>
      </div>
      <div className="card-container">
        <CardApproaches svg={<IconApproaches1 />} content={<InlineText value={approachesCard[0]} resourceType={rt} resourceName={rn} fieldKey="child.0.content" />} />
        <CardApproaches svg={<IconApproaches2 />} content={<InlineText value={approachesCard[1]} resourceType={rt} resourceName={rn} fieldKey="child.1.content" />} />
        <CardApproaches svg={<IconApproaches3 />} content={<InlineText value={approachesCard[2]} resourceType={rt} resourceName={rn} fieldKey="child.2.content" />} />
      </div>
      <div className="flex justify-center">
        <Link
          className="text-(--a) mt-[12px] underline"
          href={`/${locale}/approaches`}
        >
          {`${dictionary.read_more}...`}
        </Link>
      </div>
    </section>
  );
}

const CardApproaches = ({ svg, content }) => {
  return (
    <FadeInWrapper>
      <div className="card-approaches">
        <div className="svg">{svg}</div>
        <div className="content">{content}</div>
      </div>
    </FadeInWrapper>
  );
};
