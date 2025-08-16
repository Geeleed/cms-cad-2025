import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import React from "react";

export default function CardTeam2({ data, dictionary }) {
  const {
    img,
    person_name,
    role,
    position,
    highlights,
    credentials,
    educations,
  } = data;
  const dict = dictionary;
  return (
    <FadeInWrapper>
      <div className="card-team">
        <div className="col-span-1 max-[769px]:text-center max-[769px]:flex max-[769px]:flex-col max-[769px]:justify-center">
          <figure className="w-full aspect-square overflow-hidden rounded-2xl max-[769px]:max-w-[320px] max-[769px]:mx-auto">
            <Image src={img} height={500} width={500} alt={person_name} />
          </figure>
          <div className="max-[769px]:mx-auto max-[769px]:mb-[2rem]">
            <p
              className="font-bold text-[2rem] mt-4"
              style={{ fontSize: "1.4rem" }}
            >
              {person_name}
            </p>
            <p style={{ fontSize: "1rem" }}>{role}</p>
            <p style={{ fontSize: "1rem" }}>{position}</p>
          </div>
        </div>
        <div className="col-span-2">
          <h2>{dict?.highlights}</h2>
          <div>
            {highlights.map((el, index) => (
              <div key={el?.id || index}>
                {el?.p && <p>{el.p}</p>}
                {el?.li && <ul>{el.li}</ul>}
              </div>
            ))}
          </div>
          <h2>{dict?.professional_credentials}</h2>
          <div>
            {credentials.map((el, index) => (
              <p className="mb-4" key={el?.id || index}>
                {el.p}
              </p>
            ))}
          </div>
          <h2>{dict?.education_background}</h2>
          <div>
            {educations.map((el, index) => (
              <p key={el?.id || index}>{el.p}</p>
            ))}
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
}
