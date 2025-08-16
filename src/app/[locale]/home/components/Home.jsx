import Image from "next/image";
import React from "react";
// import CardBasicInfo from "./CardBasicInfo";
import FadeInWrapper from "@/components/FadeInWrapper";

export default function Home({ h1_1, h1_2, p, img }) {
  return (
    <section className="section-home">
      <div className="left">
        <div>
          <FadeInWrapper>
            {/* <h1>
              <span className="text-(--c)">Unlocking</span> Potential, One Step
              at a Time!
            </h1> */}
            <h1>
              <span className="text-(--c)">{h1_1}</span>
              {` ${h1_2}`}
            </h1>
          </FadeInWrapper>
          <FadeInWrapper delay={500}>
            {/* <p>
              At CAD, our purpose is to empower individuals with neurodiversity
              and their families to live the most self-fulfilling and
              independent lives possible.
            </p> */}
            <p>{p}</p>
          </FadeInWrapper>
        </div>
      </div>
      <div className="right">
        <FadeInWrapper>
          <div className="image">
            <Image
              className="w-full"
              src={img}
              width={1000}
              height={1000}
              alt="CAD center team"
            />
          </div>
        </FadeInWrapper>
      </div>
      <FadeInWrapper delay={1000}>
        <div className="col-span-2 w-full">
          {/* <div className="bg-red-300 w-full col-span-2">1</div> */}
          {/* <CardBasicInfo /> */}
        </div>
      </FadeInWrapper>
      {/* <div className="col-span-2 absolute flex justify-center w-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        <div className="w-fit">
          <FadeInWrapper delay={1000}>
            <CardBasicInfo />
          </FadeInWrapper>
        </div>
      </div> */}
    </section>
  );
}
