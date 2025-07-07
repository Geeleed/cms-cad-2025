import { getTeam } from "@/api/fetcher";
import React from "react";
import CardTeam from "./components/CardTeam";
import FadeInWrapper from "@/components/FadeInWrapper";

export default async function page() {
  const team = await getTeam();
  const d = team.en;
  return (
    <div className="page-team flex">
      <div className="max-w-[1250px] mx-auto px-[2rem]">
        <FadeInWrapper>
          <div className="mt-[8rem] mb-[1rem]">
            <h1>{d.content}</h1>
          </div>
        </FadeInWrapper>
        <div className="flex flex-col">
          {d.child.map((el, index) => (
            <CardTeam key={index} data={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
