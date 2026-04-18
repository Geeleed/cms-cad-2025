import React from "react";
import News from "./use_client/News";
import { load_page_news, load_system_word } from "@/api/loadData";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const page_news = await load_page_news({ params });
  const locale = (await params).locale;
  const system_word = await load_system_word({ params });
  return (
    <div className="page-news">
      <News
        title={page_news.resource?.title ?? system_word.resource.news}
        resourceType="page_news"
        resourceName={`page_news_${locale}`}
      />
    </div>
  );
}
