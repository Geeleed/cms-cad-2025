import FadeInWrapper from "@/components/FadeInWrapper";
import IconAbout from "@/components/icons/IconAbout";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <section className="section-about">
      <FadeInWrapper delay={100}>
        <div className="flex flex-col justify-center items-center">
          <h2>About Us</h2>
          <h3 className="title">About the Center</h3>
          <div className="max-w-[820px] text-center mb-[32px]">
            <p className="small">
              At CAD, we are dedicated to supporting children and families
              impacted by autism and other developmental disorders by adapting
              psychological principles and evidence-based practices from abroad
              to Thailand. Our team is driven by a deep understanding of the
              complexities of children with special needs and is ready to
              empower them to lead independent and fulfilling lives, while
              ensuring that all practices are conducted within an ethical
              framework that prioritizes transparency and integrity.
            </p>
            <p className="small mt-[18px]">
              CAD is committed to becoming a leader in the education and
              treatment of children with special needs, as well as in the
              training of educators and providing consultation services to
              families and educational institutions. We aim to enhance the
              quality of life for individuals with neurodiversity, build
              confidence within their families, and unlock their inner potential
              through the most effective and appropriate approaches.
            </p>
          </div>
        </div>
      </FadeInWrapper>
      <div className="flex justify-center">
        <div className="flex gap-[16px] flex-wrap justify-center">
          <FadeInWrapper delay={300}>
            <div hidden className="card card-about">
              <div className="image">
                <IconAbout />
              </div>
              <h3 className="title">About the Center</h3>
              <div className="line-clamp-2">
                <p>
                  At CAD, we are dedicated to supporting children and families
                  impacted by autism and other developmental disorders by
                  adapting psychological principles and evidence-based practices
                  from abroad to Thailand. Our team is driven by a deep
                  understanding of the complexities of children with special
                  needs and is ready to empower them to lead independent and
                  fulfilling lives, while ensuring that all practices are
                  conducted within an ethical framework that prioritizes
                  transparency and integrity.
                </p>
                <p>
                  CAD is committed to becoming a leader in the education and
                  treatment of children with special needs, as well as in the
                  training of educators and providing consultation services to
                  families and educational institutions. We aim to enhance the
                  quality of life for individuals with neurodiversity, build
                  confidence within their families, and unlock their inner
                  potential through the most effective and appropriate
                  approaches.
                </p>
              </div>
              <Link href={"/about"}>
                <div className="read-more">
                  Read more...
                  <div className="line" />
                </div>
              </Link>
            </div>
          </FadeInWrapper>
          <FadeInWrapper delay={500}>
            <div className="card card-about">
              {/* <div className="image">
                <IconAbout />
              </div> */}
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
          </FadeInWrapper>
          <FadeInWrapper delay={700}>
            <div className="card card-about">
              {/* <div className="image">
                <IconAbout />
              </div> */}
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
          </FadeInWrapper>
          <FadeInWrapper delay={900}>
            <div className="card card-about">
              {/* <div className="image">
                <IconAbout />
              </div> */}
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
          </FadeInWrapper>
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
