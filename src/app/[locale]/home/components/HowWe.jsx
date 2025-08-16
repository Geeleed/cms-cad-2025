import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import React from "react";

export default function HowWe() {
  return (
    <section className="section-how">
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 max-w-[1250px]">
          <div className="my-auto py-[100px]">
            <div className="relative">
              <div className="w-[100%] rounded-[40px] overflow-hidden translate-x-[-40px]">
                <FadeInWrapper delay={200}>
                  <Image
                    className="w-fit"
                    src={"/statics/images/card/1.jpg"}
                    width={600}
                    height={600}
                    alt="card 1"
                  />
                </FadeInWrapper>
              </div>
              <div className="w-[80%] rounded-[40px] overflow-hidden translate-x-[60px] translate-y-[-50px]">
                <FadeInWrapper delay={300}>
                  <Image
                    className="w-fit"
                    src={"/statics/images/card/2.jpg"}
                    width={600}
                    height={600}
                    alt="card 2"
                  />
                </FadeInWrapper>
              </div>
            </div>
          </div>
          <article className="px-[40px] pt-[180px]">
            <div>
              <FadeInWrapper delay={200}>
                <div className="flex justify-center mt-[40px]">
                  <h3 className="max-w-[700px]">
                    Certified and designed ABA treatment specifically for
                    children with special needs
                  </h3>
                </div>
              </FadeInWrapper>
              <FadeInWrapper delay={400}>
                <div className="line-clamp-2">
                  <p className="small text-justify">
                    Treatment based on Applied Behavior Analysis (ABA) focuses
                    on understanding and modifying the behaviors of children
                    with autism and other developmental delays. It aims to
                    reinforce desirable behaviors and reduce inappropriate
                    behaviors, while also helping children learn new skills and
                    build social interactions. ABA treatment is internationally
                    recognized as the most research-supported and evidence-based
                    practice (EBP). It is not only suitable for children with
                    autism but also for children with other developmental
                    disorders, such as Attention-Deficit/Hyperactivity Disorder
                    (ADHD), speech delays, global developmental delays, sensory
                    processing disorder (SPD), and social, emotional, and
                    behavioral challenges.
                  </p>
                </div>
              </FadeInWrapper>
            </div>
            <div>
              <FadeInWrapper delay={600}>
                <div className="flex justify-center mt-[40px]">
                  <h3 className="max-w-[700px]">
                    The only center in Thailand applying the learning program
                    from the Pennsylvania Department of Education
                  </h3>
                </div>
              </FadeInWrapper>
              <FadeInWrapper delay={800}>
                <div className="line-clamp-2">
                  <p className="small mb-[18x] text-justify">
                    We are operated by a team of Board-Certified Behavior
                    Analysts (BCBA) with over 14 years of experience. All
                    instructors receive extensive training and close supervision
                    to ensure high-quality teaching that aligns with ethical
                    standards.
                  </p>
                  <p className="small mb-[18px] text-justify">
                    Currently, CAD is the only learning center in Thailand
                    applying the learning program from the Pennsylvania Training
                    and Technical Assistance Network (PaTTAN), which is an
                    educational standard developed by the Pennsylvania
                    Department of Education in the United States, in
                    collaboration with Dr. Amiris DiPuglia, an expert in
                    behavior analysis for children with special needs and
                    PaTTAN’s educational consultant for, and Mr. Mike Miklos, a
                    psychology expert and Board Certified Behavior Analyst
                    specializing in autism and developmental delays.
                  </p>
                  <p className="small mb-[18px] text-justify">
                    We adopt Naturalistic Teaching as the core approach in our
                    learning program, focusing on promoting positive behaviors
                    and enhancing various aspects of children's development.
                    This includes speech and communication skills, social
                    skills, self-care skills, appropriate behavioral expression,
                    and school readiness.{" "}
                  </p>
                  <p className="small mb-[18px] text-justify">
                    Each child will receive a tailored classroom program
                    designed to suit their age, skills, development, and
                    learning behaviors. Teaching is conducted in a one-on-one
                    format, with detailed progress tracking through
                    individualized reports that highlight developmental
                    milestones in various areas, which can be followed up on,
                    measured, and used as a reference. Additionally, we offer
                    training and consultation services for parents to guide them
                    in supporting their child's development outside the
                    classroom.
                  </p>
                </div>
              </FadeInWrapper>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
