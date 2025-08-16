"use client";
import React, { useEffect, useState } from "react";
import FadeInWrapper from "@/components/FadeInWrapper";
import { getNews } from "@/api/fetcher";
import { CardNews } from "../components/CardNews";

export default function News({title="News"}) {
  const [news, setNews] = useState([]);
  const init = async () => {
    const temp = await getNews();
    setNews(temp);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className="max-w-[1250px] mx-auto">
      <div className="mt-[8rem] mb-[1rem]">
        <h1>{title}</h1>
      </div>
      <div className="grid grid-cols-3 max-[1025px]:grid-cols-2 max-[821px]:grid-cols-1 gap-4 max-w-[1250px] mx-auto">
        {news.map((el, index) => (
          <FadeInWrapper key={index}>
            <CardNews
              imgSrc={el.imgSrc}
              title={el.title}
              date={el.date}
              href={el.href}
            />
          </FadeInWrapper>
        ))}
      </div>
    </div>
  );
}
