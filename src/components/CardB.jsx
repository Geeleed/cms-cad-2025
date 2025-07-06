import React from "react";
import FadeInWrapper from "./FadeInWrapper";
import IconAbout from "./icons/IconAbout";

export default function CardB({
  icon = <IconAbout />,
  title = "Title",
  content = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto omnis eaque laboriosam quibusdam porro iste architecto hic incidunt suscipit! Consectetur corrupti necessitatibus, ratione dolor alias neque quaerat. Magni, perspiciatis rerum?",
}) {
  return (
    <FadeInWrapper delay={100}>
      <div className="card card-b">
        <div hidden={icon === null} className="image">
          {icon}
        </div>
        <div>
          <h3 className="title">{title}</h3>
          <div>
            <div className="line-clamp-2">
              <p>{content}</p>
            </div>
            <div className="read-more">
              Read more...
              <div className="line" />
            </div>
          </div>
        </div>
      </div>
    </FadeInWrapper>
  );
}
