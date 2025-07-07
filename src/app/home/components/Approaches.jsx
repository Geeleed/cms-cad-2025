import CardA from "@/components/CardA";
import CardB from "@/components/CardB";
import FadeInWrapper from "@/components/FadeInWrapper";
import IconApproaches1 from "@/components/icons/IconApproaches1";
import IconApproaches2 from "@/components/icons/IconApproaches2";
import IconApproaches3 from "@/components/icons/IconApproaches3";
import IconApproachesA from "@/components/icons/IconApproachesA";
import Link from "next/link";
import React from "react";

export default function Approaches() {
  return (
    <section className="section-approaches">
      <div className="flex justify-center text-center">
        <FadeInWrapper delay={100}>
          <h2>Our Teaching Approaches</h2>
        </FadeInWrapper>
      </div>
      {/* <div className="flex justify-center bg-(--a22) max-w-[1250px] w-full mx-auto rounded-[40px]"> */}
      <div className="card-container">
        <CardApproaches
          svg={<IconApproaches1 />}
          content={
            "A. Principles of Applied Behavior Analysis (ABA)and Verbal Behavior (VB) Approach"
          }
        />
        <CardApproaches
          svg={<IconApproaches2 />}
          content={"B. Early Start Denver Model (ESDM)"}
        />
        <CardApproaches
          svg={<IconApproaches3 />}
          content={"C. Benefits of an Intensive ABA intervention Classroom"}
        />
      </div>
      <div className="flex justify-center">
        <Link className="text-(--a) mt-[12px] underline" href={"/approaches"}>
          Read more...
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
