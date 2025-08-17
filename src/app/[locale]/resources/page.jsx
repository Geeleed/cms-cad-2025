// import { getVideoWithRevalidate } from "@/api/fetcher";
// import FadeInWrapper from "@/components/FadeInWrapper";
import React from "react";
// import CardVideo from "./components/CardVideo";
import Video from "./use_client/Video";
import Article from "./use_client/Article";
import { load_page_resources, load_system_word } from "@/api/loadData";

export default async function Page({ params }) {
  // const v = await getVideoWithRevalidate({ revalidate: 360 });
  // const educational_videos = v.content.en;
  const page_resources = await load_page_resources({ params });
  const locale = (await params).locale;
  const system_word = await load_system_word({ params });
  const dictionary = system_word.resource;
  return (
    <div className="page-resources">
      <div className="max-w-[1250px] mx-auto">
        <div className="mt-[8rem] mb-[1rem]">
          <h1>{system_word.resource.resources}</h1>
        </div>
        {/* <section>
          <h2>{educational_videos}</h2>
          <div className="grid grid-cols-3 mb-[4rem] gap-4 max-[770px]:grid-cols-2 max-[450px]:grid-cols-1">
            {(v?.child || []).map((el) => (
              <FadeInWrapper key={el.id}>
                <CardVideo title={el.content.title} embedSrc={el.content.src} />
              </FadeInWrapper>
            ))}
          </div>
        </section> */}
        <section>
          <Article
            title={system_word.resource.articles}
            locale={locale}
            dictionary={dictionary}
          />
        </section>
        <section>
          <Video title={system_word.resource.educational_videos} />
        </section>
      </div>
    </div>
  );
}
