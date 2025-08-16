import { fetchData, getTeam } from "@/api/fetcher";
import React from "react";
import CardTeam from "./components/CardTeam";
import FadeInWrapper from "@/components/FadeInWrapper";
import CardTeam2 from "./components/CardTeam2";
import { load_page_team, load_system_word } from "@/api/loadData";

// const loadData = async ({ params }) => {
//   const temp = await params;
//   const locale = (await temp?.locale) || "en";
//   const result = await fetchData({
//     resource_type: "page_team",
//     name: `page_team_${locale}`,
//   });
//   let dictionay = await fetchData({
//     resource_type: "system_word",
//     name: `system_word_${locale}`,
//   });
//   dictionay = dictionay?.resource;
//   const resource = result?.resource || {};
//   return { resource, dictionay };
// };

// export default async function page() {
//   const team = await getTeam();
//   const d = team.en;
//   return (
//     <div className="page-team flex">
//       <div className="max-w-[1250px] mx-auto px-[2rem]">
//         <FadeInWrapper>
//           <div className="mt-[8rem] mb-[1rem]">
//             <h1>{d.content}</h1>
//           </div>
//         </FadeInWrapper>
//         <div className="flex flex-col">
//           {d.child.map((el, index) => (
//             <CardTeam key={index} data={el} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default async function page({ params }) {
  const page_team = await load_page_team({ params });
  const system_word = await load_system_word({ params });
  return (
    <div className="page-team flex">
      <div className="max-w-[1250px] mx-auto px-[2rem]">
        <FadeInWrapper>
          <div className="mt-[8rem] mb-[1rem]">
            <h1>{page_team.resource.title}</h1>
          </div>
        </FadeInWrapper>
        <div className="flex flex-col">
          {page_team.resource.team.map((el, index) => (
            <CardTeam2
              key={index}
              data={el}
              dictionary={system_word.resource}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
