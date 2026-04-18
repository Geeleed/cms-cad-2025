"use client";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";
import React from "react";

export default function Paragraph2({ data, index, resourceType, resourceName }) {
  const { h2, p_list } = data;
  return (
    <div className="max-w-[800px] mt-[2rem] mb-[4rem]">
      <FadeInWrapper>
        <h2>
          {resourceType
            ? <InlineText value={h2} resourceType={resourceType} resourceName={resourceName} fieldKey={`content.${index}.h2`} />
            : h2}
        </h2>
      </FadeInWrapper>
      <ul>
        {p_list.map((el, i) => (
          <FadeInWrapper key={i}>
            <li>
              <p>
                {resourceType
                  ? <InlineText value={el} resourceType={resourceType} resourceName={resourceName} fieldKey={`content.${index}.p_list.${i}`} multiline />
                  : el}
              </p>
            </li>
          </FadeInWrapper>
        ))}
      </ul>
    </div>
  );
}
