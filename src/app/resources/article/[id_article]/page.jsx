import { getArticleWithIdArticle } from "@/api/fetcher";
import React from "react";

export default async function Page({ params }) {
  const { id_article } = await params;

  if (!id_article) {
    return <div>ไม่พบบทความ</div>;
  }

  const result = await getArticleWithIdArticle(id_article);
  return (
    <main className="py-[8rem]">
      <div className="max-w-[1250px] mx-auto w-full">
        <div dangerouslySetInnerHTML={{ __html: result.content }} />;
      </div>
    </main>
  );
}
