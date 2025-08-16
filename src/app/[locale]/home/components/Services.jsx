import FadeInWrapper from "@/components/FadeInWrapper";
import IconServices1 from "@/components/icons/IconServices1";
import IconServices2 from "@/components/icons/IconServices2";
import IconServices3 from "@/components/icons/IconServices3";
import Link from "next/link";
import React from "react";

export default function Services({
  servicesTitle,
  servicesCard,
  locale,
  dictionary,
}) {
  return (
    <section className="section-services">
      <div className="flex justify-center">
        <FadeInWrapper delay={100}>
          <h2>{servicesTitle}</h2>
        </FadeInWrapper>
      </div>
      {/* <div className="flex justify-center bg-(--a22) max-w-[1250px] w-full mx-auto rounded-[40px]"> */}
      <div className="card-container">
        {/* {servicesCard.map((el, index) => (
          <CardServices key={index} svg={<IconServices1 />} content={el} />
        ))} */}
        <CardServices svg={<IconServices1 />} content={servicesCard[0]} />
        <CardServices svg={<IconServices2 />} content={servicesCard[1]} />
        <CardServices svg={<IconServices3 />} content={servicesCard[2]} />
      </div>
      <div className="flex justify-center">
        <Link
          className="text-(--a) mt-[12px] underline"
          href={`/${locale}/services`}
        >
          {`${dictionary.read_more}...`}
        </Link>
      </div>
      {/* <div hidden className="flex justify-center gap-[20px] *:h-full">
        <FadeInWrapper delay={300}>
          <CardA
            icon={<IconChatDotFill />}
            title={"Early Intensive Language Behavioral Intervention Classroom"}
            content={` • Offers an Individualized Education Program (IEP) designed by
              Board Certified Behavior Analysts (BCBA), with a pre-enrollment
              language and developmental assessment to ensure the program is
              best suited for each child.`}
          />
        </FadeInWrapper>
        <FadeInWrapper delay={500}>
          <CardA
            icon={<IconPeopleFill />}
            title={"Parent Training"}
            content={`• Offers training for parents on essential techniques for
              supporting children outside the classroom, such as promoting
              communication, managing undesirable behaviors, and fostering
              overall developmental progress. The parent training consists of 8
              hours per month and is included in the early intensive classroom
              program.`}
          />
        </FadeInWrapper>
        <FadeInWrapper delay={700}>
          <CardA
            icon={<IconChatTextFill />}
            title={"Training and Consultation Service"}
            content={` • Offers consultation on how to manage and provide treatment for
              children with special needs, as well as how to design an effective
              and appropriate learning program.`}
          />
        </FadeInWrapper>
      </div> */}
      {/* <div hidden className="services-list-container">
        <div className="services-list">
          <div className="services-title">
            <h3>Early Intensive Language Behavioral Intervention Classroom</h3>
          </div>
          <div className="services-sub-list-container">
            <p className="card">
              • Offers an Individualized Education Program (IEP) designed by
              Board Certified Behavior Analysts (BCBA), with a pre-enrollment
              language and developmental assessment to ensure the program is
              best suited for each child.
            </p>
            <p className="card">
              • Integrates Applied Behavior Analysis (ABA) principles with the
              Early Start Denver Model (ESDM) teaching approach to develop
              children's skills in areas such as speaking, communication, social
              skills, self-help, emotional regulation, behavior modification,
              promoting desirable behaviors, school readiness, and developing
              essential learning skills, including self-control and attention to
              tasks.
            </p>
            <p className="card">
              • Provides two classroom program options: a half-day program (15
              hours/week) and a full-day program (30 hours/week).
            </p>
            <p className="card">
              • Programs available in English and Thai, Monday to Friday.
            </p>
          </div>
        </div>
        <div className="services-list">
          <div className="services-title">
            <h3>Parent Training</h3>
          </div>
          <div className="services-sub-list-container">
            <p className="card">
              • Offers training for parents on essential techniques for
              supporting children outside the classroom, such as promoting
              communication, managing undesirable behaviors, and fostering
              overall developmental progress. The parent training consists of 8
              hours per month and is included in the early intensive classroom
              program.
            </p>
            <p className="card">
              • Provides a summary report on each child’s progress and holds a
              parent meeting to update on developmental progress.
            </p>
          </div>
        </div>
        <div className="services-list">
          <div className="services-title">
            <h3>Training and Consultation Service</h3>
          </div>
          <div className="services-sub-list-container">
            <p className="card">
              • Offers consultation on how to manage and provide treatment for
              children with special needs, as well as how to design an effective
              and appropriate learning program.
            </p>
            <p className="card">
              • Provides training for instructors or therapists interested in
              the field.
            </p>
          </div>
        </div>
      </div> */}
    </section>
  );
}

const CardServices = ({ svg, content }) => {
  return (
    <FadeInWrapper>
      <div className="card-services">
        <div className="svg">{svg}</div>
        <div className="content">{content}</div>
      </div>
    </FadeInWrapper>
  );
};
