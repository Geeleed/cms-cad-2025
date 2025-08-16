import React from "react";
import News from "./use_client/News";
import { load_page_news, load_system_word } from "@/api/loadData";

export default async function Page({ params }) {
  const page_news = await load_page_news({ params });
  const system_word = await load_system_word({ params });
  return (
    <div className="page-news">
      <News title={system_word.resource.news} />
    </div>
  );
}
