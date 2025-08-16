import { load_page_about } from "@/api/loadData";
import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import React from "react";

export default async function Page({ params }) {
  const page_about = await load_page_about({ params });
  return (
    <div className="page-more-text page-about">
      <div className="page-more-text-container">
        <FadeInWrapper>
          <header>
            <h1>{page_about.resource.h2}</h1>
          </header>
        </FadeInWrapper>
        <FadeInWrapper>
          <figure>
            <Image
              src={page_about.resource.img}
              alt="about us"
              width={1500}
              height={1500}
              quality={100}
            />
          </figure>
        </FadeInWrapper>
        <FadeInWrapper>
          <main>
            <section>
              <h2>{page_about.resource.h3}</h2>
              <p>{page_about.resource.p_1}</p>
              <p>{page_about.resource.p_2}</p>
            </section>
            {page_about.resource.card.map((el, index) => (
              <section key={index}>
                <h2>{el.h3} </h2>
                <p>{el.p}</p>
              </section>
            ))}
          </main>
        </FadeInWrapper>
      </div>
    </div>
  );
}
