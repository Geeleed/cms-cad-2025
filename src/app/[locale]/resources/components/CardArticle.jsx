import FadeInWrapper from "@/components/FadeInWrapper";
import Link from "next/link";

export const CardArticle = ({ title, detail, href = "#" }) => {
  return (
    <FadeInWrapper className="h-full">
      <div className="card-article card">
        <div>
          <h3 className="title">{title}</h3>
          <p className="detail line-clamp-3">{detail}</p>
        </div>
        <div className="button mt-[20px]">
          <Link href={href}>Full article...</Link>
          <div className="line" />
        </div>
      </div>
    </FadeInWrapper>
  );
};
