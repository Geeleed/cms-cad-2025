import { getVideo } from "@/api/fetcher";
import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";

export default async function Page() {
  const v = await getVideo();
  const educational_videos = v.content.en;
  return (
    <div>
      <div className="max-w-[1250px] mx-auto">
        <div className="mt-[8rem] mb-[1rem]">
          <h1>Resources</h1>
        </div>
        <h2>{educational_videos}</h2>
        <div className="grid grid-cols-3 mb-[4rem]">
          {v.child.map((el) => (
            <FadeInWrapper key={el.id}>
              <CardVideo title={el.content.title} embedSrc={el.content.src} />
            </FadeInWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}

const CardVideo = ({ title, embedSrc }) => {
  return (
    <div className="card-video">
      <div className="embed">
        <iframe
          width="560"
          height="315"
          src={embedSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <h3 className="title line-clamp-3">{title}</h3>
    </div>
  );
};
