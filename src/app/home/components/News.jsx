import { getNews } from "@/api/fetcher";
import Link from "next/link";
import React from "react";

export default async function News() {
  const news = await getNews();
  return (
    <section className="section-news">
      <div className="flex justify-center">
        <h2>News</h2>
      </div>
      <div className="grid grid-cols-3 max-[1025px]:grid-cols-2 max-[821px]:grid-cols-1 gap-4 max-w-[1250px] mx-auto">
        {(news || []).slice(0,3).map((el, index) => (
          <CardNews
            key={index}
            imgSrc={el.imgSrc}
            title={el.title}
            date={el.date}
            href={el.href}
          />
        ))}
      </div>
      <div className="flex justify-center my-[20px]">
        <Link className="text-(--d) underline" href={"/news"}>
          More News...
        </Link>
      </div>
    </section>
  );
}

const CardNews = ({ imgSrc, title, date, href }) => {
  return (
    <div className="card-news">
      <Link href={href} target="_blank">
        <div className="img-container">
          <img src={imgSrc} alt={title} />
        </div>
        <p className="title line-clamp-2">{title}</p>
        <p className="date line-clamp-1">{date}</p>
      </Link>
    </div>
  );
};
