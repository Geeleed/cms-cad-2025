import { getArticleWithIdArticle } from "@/api/fetcher";
import InlineArticleEdit from "@/components/admin/InlineArticleEdit";
import React from "react";

export default async function Page({ params }) {
  const { id_article } = await params;

  if (!id_article) {
    return <div>ไม่พบบทความ</div>
  }

  const result = await getArticleWithIdArticle(id_article);

  if (!result) {
    return <div>ไม่พบบทความ</div>;
  }

  return (
    <main className="py-[8rem]">
      <div className="max-w-[1250px] mx-auto w-full">
        <InlineArticleEdit
          id_article={id_article}
          initialTitle={result.title}
          initialDescription={result.description}
          initialContent={result.content}
        />
      </div>
    </main>
  );
}
