import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import React from "react";

export default function CardTeam({ data }) {
  const { name, role, position, src_image } = data.content;
  const { content: content_highlights, child: child_highlights } =
    data.child.find((el) => el.content === "Highlights");
  const { content: content_credentials, child: child_credentials } =
    data.child.find((el) => el.content === "Professional Credentials");
  const { content: content_education, child: child_education } =
    data.child.find((el) => el.content === "Education Background");
  return (
    <FadeInWrapper>
      <div className="card-team">
        <div className="col-span-1 max-[769px]:text-center max-[769px]:flex max-[769px]:flex-col max-[769px]:justify-center">
          <figure className="w-full aspect-square overflow-hidden rounded-2xl max-[769px]:max-w-[320px] max-[769px]:mx-auto">
            <Image src={src_image} height={500} width={500} alt={name} />
          </figure>
          <div className="max-[769px]:mx-auto max-[769px]:mb-[2rem]">
            <p
              className="font-bold text-[2rem] mt-4"
              style={{ fontSize: "1.4rem" }}
            >
              {name}
            </p>
            <p style={{ fontSize: "1rem" }}>{role}</p>
            <p style={{ fontSize: "1rem" }}>{position}</p>
          </div>
        </div>
        <div className="col-span-2">
          <h2>{content_highlights}</h2>
          <div>
            {child_highlights.map((el) => (
              <div key={el.id}>
                <p>{el.content}</p>
                <ul>
                  {(el.child?.length || []) > 0 &&
                    el.child.map((el2) => <li key={el2.id}>{el2.content}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <h2>{content_credentials}</h2>
          <div>
            {child_credentials.map((el) => (
              <p className="mb-4" key={el.id}>
                {el.content}
              </p>
            ))}
          </div>
          <h2>{content_education}</h2>
          <div>
            {child_education.map((el) => (
              <p key={el.id}>{el.content}</p>
            ))}
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
}
