import { getVideo } from "@/api/fetcher";
import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";
import CardVideo from "./components/CardVideo";
// import Video from "./use_client/Video";

export default async function Page() {
  const v = await getVideo({ revalidate: 360 });
  const educational_videos = v.content.en;
  return (
    <div className="page-resources">
      <div className="max-w-[1250px] mx-auto">
        <div className="mt-[8rem] mb-[1rem]">
          <h1>Resources</h1>
        </div>
        <h2>{educational_videos}</h2>
        <div className="grid grid-cols-3 mb-[4rem] gap-4 max-[770px]:grid-cols-2 max-[450px]:grid-cols-1">
          {(v?.child || []).map((el) => (
            <FadeInWrapper key={el.id}>
              <CardVideo title={el.content.title} embedSrc={el.content.src} />
            </FadeInWrapper>
          ))}
        </div>
        {/* <Video /> */}
      </div>
    </div>
  );
}
