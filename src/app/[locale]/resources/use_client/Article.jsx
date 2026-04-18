"use client";
import { getArticle } from "@/api/fetcher";
import React, { useEffect, useState } from "react";
import { CardArticle } from "../components/CardArticle";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";

export default function Article({ title = "Articles", locale, dictionary, resourceType, resourceName }) {
  const [articles, setArticles] = useState([]);
  const init = async () => {
    const article = await getArticle();
    setArticles(
      article.map((el) => ({
        title: el.title,
        detail: el.description,
        id_article: el.id_article,
      }))
    );
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <h2><InlineText value={title} resourceType={resourceType} resourceName={resourceName} fieldKey="articles_title" /></h2>
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
