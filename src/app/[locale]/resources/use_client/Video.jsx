"use client";
import { getVideo } from "@/api/fetcher";
import React, { useEffect, useState } from "react";
import CardVideo from "../components/CardVideo";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";

export default function Video({ title = "Educational Videos", locale, resourceType, resourceName }) {
  const [v, setV] = useState();
  const [educational_videos, setEducational_videos] = useState();
  const setVideo = async () =>
    await getVideo().then((r) => {
      setV(r);
      setEducational_videos(r?.content?.en || "");
    });
  useEffect(() => {
    setVideo();
  }, []);
  return (
    <div>
      {/* <h2>{educational_videos}</h2> */}
      <h2><InlineText value={title} resourceType={resourceType} resourceName={resourceName} fieldKey="videos_title" /></h2>
      <div className="grid grid-cols-3 mb-[4rem] gap-4 max-[770px]:grid-cols-2 max-[450px]:grid-cols-1">
        {(v?.child || []).map((el) => (
          <FadeInWrapper key={el.id}>
            <CardVideo title={el.content.title} embedSrc={el.content.src} />
          </FadeInWrapper>
        ))}
      </div>
    </div>
  );
}
