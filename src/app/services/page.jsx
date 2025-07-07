import { getService } from "@/api/fetcher";
import Image from "next/image";
import React from "react";
import Paragraph from "./components/Paragraph";
import FadeInWrapper from "@/components/FadeInWrapper";

export default async function Page() {
  const service = await getService();
  const d = service.en;
  return (
    <div className="page-services">
      <div className="max-w-[1250px] mx-auto px-[2rem]">
        <div className="mt-[8rem] mb-[1rem]">
          <FadeInWrapper>
            <h1>{d.content}</h1>
          </FadeInWrapper>
        </div>
        <div>
          <FadeInWrapper>
            <figure className="rounded-4xl overflow-hidden">
              <Image
                src={"/statics/images/stock/10.jpg"}
                width={1250}
                height={1250}
                alt="service"
              />
            </figure>
          </FadeInWrapper>
          {d.child.map((el) => (
            <Paragraph key={el.id} data={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
