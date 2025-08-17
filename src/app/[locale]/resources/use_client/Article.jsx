"use client";
import { getArticle } from "@/api/fetcher";
import React, { useEffect, useState } from "react";
import { CardArticle } from "../components/CardArticle";
import { convertHtmlToText } from "@/utils/pure_function";
import FadeInWrapper from "@/components/FadeInWrapper";

export default function Article({ title = "Articles", locale, dictionary }) {
  const [articles, setArticles] = useState([]);
  const init = async () => {
    const article = await getArticle();
    const temp = [];
    for (let i = 0; i < article.length; i++) {
      const element = article[i];
      const content = element.content;
      const text = convertHtmlToText(content);
      temp.push({
        title: element.title,
        detail: text,
        id_article: element.id_article,
        content: element.content,
      });
    }
    setArticles(temp);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <h2>{title}</h2>
      <div className="grid grid-cols-3 items-stretch mb-[4rem] gap-4 max-[1025px]:grid-cols-2 max-[450px]:grid-cols-1">
        {articles.map((el) => (
          <FadeInWrapper key={el.id_article}>
            <CardArticle
              key={el.id_article}
              title={el.title}
              detail={el.detail}
              href={`/${locale}/resources/article/${el.id_article}`}
              dictionary={dictionary}
            />
          </FadeInWrapper>
        ))}
      </div>
    </div>
  );
}
