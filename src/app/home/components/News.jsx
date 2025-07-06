import Link from "next/link";
import React from "react";

const news = [
  {
    imgSrc: "https://www.matichon.co.th/wp-content/uploads/2025/06/11-20.jpg",
    title:
      "CAD CENTER จับมือ SUNSHINE MIND CLINIC ร่วมรักษาและบำบัดเด็กออทิสติกโดยจิตแพทย์เด็ก",
    date: "วันที่ 5 มิถุนายน 2568 - 15:13 น.",
    href: "https://www.matichon.co.th/publicize/news_5216216",
  },
  {
    imgSrc: "https://static.naewna.com/uploads/news/source/891857.jpg",
    title:
      "บำบัดเด็ก‘ออทิสติก’โดยสหวิชาชีพ ทำตั้งแต่‘อายุน้อย-ต่อเนื่อง’เสริมพฤติกรรมเชิงบวก",
    date: "วันจันทร์ ที่ 16 มิถุนายน พ.ศ. 2568, 06.00 น.",
    href: "https://www.naewna.com/local/891857",
  },
  {
    imgSrc:
      "https://www.matichon.co.th/wp-content/uploads/2025/05/01-56-728x486.jpg",
    title:
      "ศูนย์พัฒนาเด็ก CAD CENTER จับมือจิตแพทย์เด็กผนึกทีมสหวิชาชีพร่วมบำบัดเด็กออทิสติก",
    date: "วันที่ 13 พฤษภาคม 2568 - 15:14 น.",
    href: "https://www.matichon.co.th/publicize/news_5180557",
  },
];

export default function News() {
  return (
    <section className="section-news" id="news">
      <div className="flex justify-center">
        <h2>News</h2>
      </div>
      <div className="content">
        {news.map((el, index) => (
          <CardNews
            key={index}
            imgSrc={el.imgSrc}
            title={el.title}
            date={el.date}
            href={el.href}
          />
        ))}
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
