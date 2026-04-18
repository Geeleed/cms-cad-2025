import { getService } from "@/api/fetcher";
import Image from "next/image";
import React from "react";

export const dynamic = 'force-dynamic';
import Paragraph from "./components/Paragraph";
import FadeInWrapper from "@/components/FadeInWrapper";
import { load_page_services } from "@/api/loadData";
import Paragraph2 from "./components/Paragraph2";
import InlineText from "@/components/admin/InlineText";
import InlineImage from "@/components/admin/InlineImage";

// export default async function Page() {
//   const service = await getService();
//   const d = service.en;
//   return (
//     <div className="page-services">
//       <div className="max-w-[1250px] mx-auto px-[2rem]">
//         <div className="mt-[8rem] mb-[1rem]">
//           <FadeInWrapper>
//             <h1>{d.content}</h1>
//           </FadeInWrapper>
//         </div>
//         <div>
//           <FadeInWrapper>
//             <figure className="rounded-4xl overflow-hidden">
//               <Image
//                 src={"/statics/images/stock/10.jpg"}
//                 width={1250}
//                 height={1250}
//                 alt="service"
//               />
//             </figure>
//           </FadeInWrapper>
//           {d.child.map((el) => (
//             <Paragraph key={el.id} data={el} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default async function Page({ params }) {
  const { locale } = await params;
  const page_services = await load_page_services({ params });
  if (!page_services.resource?.title) return null;
  const rt = "page_services";
  const rn = `page_services_${locale}`;
  return (
    <div className="page-services">
      <div className="max-w-[1250px] mx-auto px-[2rem]">
        <div className="mt-[8rem] mb-[1rem]">
          <FadeInWrapper>
            <h1><InlineText value={page_services.resource.title} resourceType={rt} resourceName={rn} fieldKey="title" /></h1>
          </FadeInWrapper>
        </div>
        <div>
          <FadeInWrapper>
            <figure className="rounded-4xl overflow-hidden">
              <InlineImage value={page_services.resource.img} resourceType={rt} resourceName={rn} fieldKey="img">
                <Image
                  src={page_services.resource.img}
                  width={1250}
                  height={1250}
                  alt="service"
                />
              </InlineImage>
            </figure>
          </FadeInWrapper>
          {(page_services.resource.content || []).map((el,index) => (
            <Paragraph2 key={el?.id||index} data={el} index={index} resourceType={rt} resourceName={rn} />
          ))}
        </div>
      </div>
    </div>
  );
}
