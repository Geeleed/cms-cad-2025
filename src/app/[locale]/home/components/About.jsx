import FadeInWrapper from "@/components/FadeInWrapper";
import IconAbout from "@/components/icons/IconAbout";
import InlineText from "@/components/admin/InlineText";
import Link from "next/link";
import React from "react";

export default function About({
  dictionary,
  aboutTitle,
  aboutSubtitle,
  aboutP1,
  aboutP2,
  aboutCard = [],
  locale,
}) {
  const rt = "page_about";
  const rn = `page_about_${locale}`;
  return (
    <section className="section-about">
      <FadeInWrapper delay={100}>
        <div className="flex flex-col justify-center items-center">
          <h2><InlineText value={aboutTitle} resourceType={rt} resourceName={rn} fieldKey="h2" /></h2>
          <h3 className="title"><InlineText value={aboutSubtitle} resourceType={rt} resourceName={rn} fieldKey="h3" /></h3>
          <div className="max-w-[820px] text-center mb-[32px]">
            <p className="small"><InlineText value={aboutP1} resourceType={rt} resourceName={rn} fieldKey="p_1" multiline /></p>
            <p className="small mt-[18px]"><InlineText value={aboutP2} resourceType={rt} resourceName={rn} fieldKey="p_2" multiline /></p>
          </div>
        </div>
      </FadeInWrapper>
      <div className="flex justify-center">
        <div className="flex gap-[16px] flex-wrap justify-center">
          {aboutCard.map((el, index) => (
            <FadeInWrapper delay={500 + 200 * index} key={el?.id || index}>
              <div className="card card-about">
                <h3 className="title"><InlineText value={el.h3} resourceType={rt} resourceName={rn} fieldKey={`card.${index}.h3`} /></h3>
                <p className="line-clamp-2"><InlineText value={el.p} resourceType={rt} resourceName={rn} fieldKey={`card.${index}.p`} multiline /></p>
                <Link href={`/${locale}/about`}>
                  <div className="read-more">
                    {`${dictionary.read_more}...`}
                    <div className="line" />
                  </div>
                </Link>
              </div>
            </FadeInWrapper>
          ))}
          {/* <FadeInWrapper delay={500}>
            <div className="card card-about">
              <h3 className="title">Our Mission</h3>
              <div className="line-clamp-2">
                <p>
                  To equip children with autism or developmental delays to reach
                  their full potential through modern, evidence-based practices
                  that fosters positive behaviors and provides measurable
                  outcomes.
                </p>
              </div>
              <Link href={"/about"}>
                <div className="read-more">
                  Read more...
                  <div className="line" />
                </div>
              </Link>
            </div>
          </FadeInWrapper> */}
          {/* <FadeInWrapper delay={700}>
            <div className="card card-about">
              <h3 className="title">Our Purpose</h3>
              <div className="line-clamp-2">
                <p>
                  To empower individuals with neurodiversity and their families
                  to live the most self-fulfilling and independent lives
                  possible.
                </p>
              </div>
              <Link href={"/about"}>
                <div className="read-more">
                  Read more...
                  <div className="line" />
                </div>
              </Link>
            </div>
          </FadeInWrapper> */}
          {/* <FadeInWrapper delay={900}>
            <div className="card card-about">
              <h3 className="title">Program Highlights</h3>
              <div className="line-clamp-2">
                <p>
                  Our learning program is designed and supervised by Board
                  Certified Behavior Analysts (BCBA) - Ms. Dita Chapman and Ms.
                  Prapanit Prapanont (Kru Aum). Both hold degrees in psychology
                  and have extensive experience in teaching children with
                  special needs. The program is based on the Pennsylvania
                  Training and Technical Assistance Network (PaTTAN) model, a
                  teaching standard developed by the Pennsylvania Department of
                  Education, USA. It aims to stimulate development and enhance
                  children’s potential through one-on-one sessions, personalized
                  to meet the needs of children with diverse neurological
                  profiles.
                </p>
              </div>
              <Link href={"/about"}>
                <div className="read-more">
                  Read more...
                  <div className="line" />
                </div>
              </Link>
            </div>
          </FadeInWrapper> */}
        </div>
      </div>
      <div className="h-[3px] w-[40%] mt-[80px] mx-auto bg-(--c)"></div>
    </section>
  );
}

const CardAbout = ({ title, content, image }) => {
  return (
    <div className="card-about">
      <div className="image">{image}</div>
      <div className="text">
        <h3 className="title">{title}</h3>
        <div className="content line-clamp-2">
          {content.map((el, index) => (
            <p key={index}>{el}</p>
          ))}
        </div>
      </div>
      <div>
        <div className="read-more">Read more...</div>
      </div>
    </div>
  );
};
