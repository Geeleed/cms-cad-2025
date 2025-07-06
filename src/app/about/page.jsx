import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="page-more-text page-about">
      <div className="page-more-text-container">
        <FadeInWrapper>
          <header>
            <h1>About Us</h1>
          </header>
        </FadeInWrapper>
        <FadeInWrapper>
          <figure>
            <Image
              src={"/statics/images/stock/1.jpg"}
              alt="about us"
              width={1500}
              height={1500}
              quality={100}
            />
          </figure>
        </FadeInWrapper>
        <FadeInWrapper>
          <main>
            <section>
              <h2>About the Center</h2>
              <p>
                At CAD, we are dedicated to supporting children and families
                impacted by autism and other developmental disorders by adapting
                psychological principles and evidence-based practices from
                abroad to Thailand. Our team is driven by a deep understanding
                of the complexities of children with special needs and is ready
                to empower them to lead independent and fulfilling lives, while
                ensuring that all practices are conducted within an ethical
                framework that prioritizes transparency and integrity.
              </p>
              <p>
                CAD is committed to becoming a leader in the education and
                treatment of children with special needs, as well as in the
                training of educators and providing consultation services to
                families and educational institutions. We aim to enhance the
                quality of life for individuals with neurodiversity, build
                confidence within their families, and unlock their inner
                potential through the most effective and appropriate approaches.
              </p>
            </section>
            <section>
              <h2>Our Mission </h2>
              <p>
                To equip children with autism or developmental delays to reach
                their full potential through modern, evidence-based practices
                that fosters positive behaviors and provides measurable
                outcomes.
              </p>
            </section>
            <section>
              <h2>Our Purpose</h2>
              <p>
                To empower individuals with neurodiversity and their families to
                live the most self-fulfilling and independent lives possible.
              </p>
            </section>
            <section>
              <h2>Program Highlights</h2>
              <p>
                Our learning program is designed and supervised by Board
                Certified Behavior Analysts (BCBA) -{" "}
                <strong>Ms. Dita Chapman</strong> and{" "}
                <strong>Ms. Prapanit Prapanont (Kru Aum)</strong>. Both hold
                degrees in psychology and have extensive experience in teaching
                children with special needs. The program is based on the
                Pennsylvania Training and Technical Assistance Network (PaTTAN)
                model, a teaching standard developed by the Pennsylvania
                Department of Education, USA. It aims to stimulate development
                and enhance children’s potential through one-on-one sessions,
                personalized to meet the needs of children with diverse
                neurological profiles.
              </p>
            </section>
          </main>
        </FadeInWrapper>
      </div>
    </div>
  );
}
