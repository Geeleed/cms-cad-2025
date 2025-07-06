import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";

export default function Welcome() {
  return (
    <section className="section-welcome">
      <div className="max-w-[850px]">
        <FadeInWrapper threshold={0.01}>
          <h2 className="mb-[80px]">
            Welcome to “Center for Autism Development (CAD)”
          </h2>
        </FadeInWrapper>
        <FadeInWrapper threshold={0.01} delay={500}>
          <p className="text-[18px]">
            We are a learning center dedicated to developing the potential of
            children with autism, ADHD, or developmental delays through an early
            intensive language and behavioral intervention classroom. Our goal
            is to enhance language skills and stimulate all-around development
            using the principles of Applied Behavior Analysis (ABA) along with
            the Early Start Denver Model (ESDM) teaching approach. The program
            is taught in both English and Thai.
          </p>
        </FadeInWrapper>
        <br />
        {/* <FadeInWrapper>
          <Link href={"#"}>
            <ButtonPrimarySmall>Read more...</ButtonPrimarySmall>
          </Link>
        </FadeInWrapper> */}
      </div>
    </section>
  );
}
