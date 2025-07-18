import Link from "next/link";

export const CardNews = ({ imgSrc, title, date, href }) => {
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
