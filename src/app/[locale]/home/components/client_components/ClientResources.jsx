"use client";
import { getArticle } from "@/api/fetcher";
import FadeInWrapper from "@/components/FadeInWrapper";
import { convertHtmlToText } from "@/utils/pure_function";
import React, { useEffect, useState } from "react";

export default function ClientResources() {
  const [article, setArticle] = useState([]);
  const init = async () => {
    const article = await getArticle();
    const temp = [];
    const num = article.length > 3 ? 3 : article.length;
    for (let i = 0; i < num; i++) {
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
    setArticle(temp);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <section className="section-resources">
      <div className="flex justify-center">
        <h2>Resources</h2>
      </div>
      <div className="max-w-[1250px] w-full">
        <div>
          <h3>Articles</h3>
          <div className="flex justify-center gap-[20px] max-[1025px]:grid max-[1025px]:grid-cols-2 max-[821px]:grid-cols-1">
            {article.map((el) => (
              <CardArticle
                key={el.id_article}
                title={el.title}
                detail={el.detail}
                href={`/resources/article/${el.id_article}`}
              />
            ))}
            {/* <CardArticle
              title={
                "Early, Intensive ABA Therapy: An Investment in Your Child's Future"
              }
              detail={
                "While starting ABA therapy for your child with autism might seem expensive, it's important to think about the long-term benefits that outweigh the initial cost. Just like planting a seed that grows into a strong tree, intensive ABA therapy early on can help your child blossom and become more independent in the future."
              }
            />
            <CardArticle
              title={
                "How ABA Therapy Can Improve the Lives of Children with Autism Spectrum Disorder"
              }
              detail={
                "Applied Behavior Analysis (ABA) is one of the most widely used therapies for children with Autism Spectrum Disorder (ASD). While it's important to acknowledge the ongoing debate surrounding the therapy, there's also substantial evidence showing its potential to improve the lives of many children with ASD. This article aims to explore the positive ways ABA can impact their lives, while also acknowledging the diverse perspectives and ethical considerations involved."
              }
            />
            <CardArticle
              title={
                "ABA therapy helps kids with autism thrive, and YOU play a key role. Here's why:"
              }
              detail={
                "You know your child best: You see their strengths, challenges, and daily life routines in ways professionals can't. Sharing this info helps create tailored therapy plans that truly fit their needs."
              }
            /> */}
            {/* <CardArticle
              title={
                "เปลี่ยนชีวิตเด็กออทิสติกด้วยการพัฒนาพฤติกรรมทางสังคมตั้งแต่วัยแรกเริ่ม! (Early social behaviors)"
              }
              detail={`ทุกคนเคยสงสัยไหมว่าทำไมเด็กออทิสติกบางคนมีปัญหาในการสื่อสารและสร้างความสัมพันธ์? คำตอบอยู่ที่ "พฤติกรรมทางสังคมในวัยแรกเริ่ม (Early social behaviors)" ซึ่งเป็นกุญแจสำคัญในการพัฒนาทักษะที่จำเป็นสำหรับชีวิต`}
            /> */}
          </div>
          <div className="flex justify-center my-[20px]">
            <a className="text-(--d) underline" href={"/resources"}>
              More Articles...
            </a>
          </div>
        </div>
        <div>
          <h3>Educational Videos</h3>
          <div className="grid grid-cols-3 gap-[1rem] justify-items-center max-[1025px]:grid-cols-2 max-[821px]:grid-cols-1 max-[821px]:gap-[2rem]">
            <CardVideo
              title={
                "ทำไมการยื้อแย่งแกล้งงงถึงไม่ได้ผลเวลาสอนเด็กออทิสติกให้พูด?"
              }
              embedSrc={
                "https://www.youtube.com/embed/7GfABCg6Fjk?si=8l5dOod3jraqlpoK"
              }
            />
            <CardVideo
              title={"การปรับพฤติกรรมไวต่อเสียงในเด็กออทิสติกด้วยเทคนิคของ ABA"}
              embedSrc={
                "https://www.youtube.com/embed/k2isy_lJWoM?si=0X1FgOpno9IRMQjf"
              }
            />
            <CardVideo
              title={
                "เทคนิคการสอนภาษา ฝึกพูด เด็กเล็กเด็กพูดช้าเด็กออทิสติก Naturalistic teaching"
              }
              embedSrc={
                "https://www.youtube.com/embed/wUzZ7UDNyVs?si=5s62FTYa8iDUZ1bQ"
              }
            />
          </div>
          <div className="flex justify-center my-[20px]">
            <a className="text-(--d) underline" href={"/resources"}>
              More Video...
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const CardArticle = ({ title, detail, href = "#" }) => {
  return (
    <FadeInWrapper>
      <div className="card-article card">
        <div>
          <h3 className="title">{title}</h3>
          <p className="detail line-clamp-3">{detail}</p>
        </div>
        <div className="button mt-[20px]">
          <a href={href}>Full article...</a>
          <div className="line" />
        </div>
      </div>
    </FadeInWrapper>
  );
};

const CardVideo = ({ title, embedSrc }) => {
  return (
    <div className="card-video">
      <div className="embed">
        <iframe
          width="560"
          height="315"
          //   src="https://www.youtube.com/embed/7GfABCg6Fjk?si=8l5dOod3jraqlpoK"
          src={embedSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <h3 className="title">{title}</h3>
    </div>
  );
};
