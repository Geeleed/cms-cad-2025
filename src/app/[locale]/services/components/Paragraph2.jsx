import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";

export default function Paragraph2({ data }) {
  const { h2, p_list } = data;
  return (
    <div className="max-w-[800px] mt-[2rem] mb-[4rem]">
      <FadeInWrapper>
        <h2>{h2}</h2>
      </FadeInWrapper>
      <ul>
        {p_list.map((el, index) => (
          <FadeInWrapper key={index}>
            <li>
              <p>{el}</p>
            </li>
          </FadeInWrapper>
        ))}
      </ul>
    </div>
  );
}
