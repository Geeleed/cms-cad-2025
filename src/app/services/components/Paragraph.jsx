import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";

export default function Paragraph({ data }) {
  return (
    <div className="max-w-[800px] mt-[2rem] mb-[4rem]">
      <FadeInWrapper>
        <h2>{data.content}</h2>
      </FadeInWrapper>
      <ul>
        {data.child.map((el) => (
          <FadeInWrapper key={el.id}>
            <li>
              <p>{el.content}</p>
            </li>
          </FadeInWrapper>
        ))}
      </ul>
    </div>
  );
}
