import React from "react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = 'force-dynamic';
import FadeInWrapper from "@/components/FadeInWrapper";
import ContainerSection from "./components/ContainerSection";
import { load_page_approaches } from "@/api/loadData";
import InlineNodeText from "@/components/admin/InlineNodeText";

export default async function page({ params }) {
  const { locale } = await params;
  const page_approaches = await load_page_approaches({ params });
  const d = page_approaches.resource;
  if (!d?.child) return null;
  const [sec_a, sec_b, sec_c] = d.child;
  let [a_p1, a_p2, a_p3, a_p4] = sec_a.child;
  let [teaching, table] = a_p3.child;
  const references = sec_c.child.find((el) => el.label === "references");
  const rt = "page_approaches";
  const rn = `page_approaches_${locale}`;
  const N = (node) => <InlineNodeText value={node.content} nodeId={node.id} resourceType={rt} resourceName={rn} />;
  return (
    <div className="page-approaches">
      <div className="max-w-[1250px] mx-auto">
        <div className="mt-[8rem] mb-[1rem]">
          <FadeInWrapper>
            <h1><N {...d} /></h1>
          </FadeInWrapper>
        </div>
        <FadeInWrapper>
          <div>
            <figure className="rounded-4xl overflow-hidden">
              <Image
                src={"/statics/images/stock/8.jpg"}
                width={1250}
                height={1250}
                alt={d.content}
              />
            </figure>
          </div>
        </FadeInWrapper>

        <ContainerSection>
          <h2><N {...sec_a} /></h2>
          <p><N {...a_p1} /></p>
          <ul>
            {a_p1.child.map((el) => (
              <li key={el.id}>
                <div><N {...el} /></div>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {(el?.child || []).map((el2) => (
                      <li key={el2.id}><N {...el2} /></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p><N {...a_p2} /></p>
          <ul>
            {a_p2.child.map((el) => (
              <li key={el.id}>
                <div><N {...el} /></div>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {(el?.child || []).map((el2) => (
                      <li key={el2.id}><N {...el2} /></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <h3><N {...a_p3} /></h3>
          <p><N {...teaching} /></p>
          <ul>
            {teaching.child.map((el) => (
              <div key={el.id}>
                <li><N {...el} /></li>
              </div>
            ))}
          </ul>
        </ContainerSection>

        {/* table */}
        <FadeInWrapper>
          <div className="w-full overflow-auto">
            <div className="min-w-[1000px]">
              <div className="border border-(--neutral-300)">
                <div className="grid grid-cols-4 font-bold text-center py-2 bg-(--a22)">
                  {table.content_table.header.map((el) => (
                    <div key={el.id}><N {...el} /></div>
                  ))}
                </div>
                <div>
                  {table.content_table.body.map((el, index) => (
                    <div key={index} className="grid grid-cols-4">
                      {el.child.map((el2) => (
                        <div
                          key={el2.id}
                          className="p-4 border border-(--neutral-300)"
                        >
                          <N {...el2} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInWrapper>

        <ContainerSection>
          <h3><N {...a_p4} /></h3>
          <p><N {...a_p4.child[0]} /></p>
          <ul>
            {a_p4.child[0].child.map((el) => (
              <div key={el.id}>
                <li><N {...el} /></li>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {el.child.map((el2) => (
                      <div key={el2.id}>
                        <li><N {...el2} /></li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p><N {...a_p4.child[1]} /></p>
          <ul>
            {a_p4.child[1].child.map((el) => (
              <div key={el.id}>
                <li><N {...el} /></li>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {el.child.map((el2) => (
                      <div key={el2.id}>
                        <li><N {...el2} /></li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p><N {...a_p4.child[2]} /></p>
        </ContainerSection>

        <br />

        <ContainerSection>
          <div className="flex">
            <p className="font-bold mr-4"><N {...a_p4.child[3]} />:</p>
            {a_p4.child[3].child.map((el) => (
              <p key={el.id}><N {...el} /></p>
            ))}
          </div>
        </ContainerSection>

        <ContainerSection>
          <div className="flex">
            <p className="font-bold mr-4"><N {...a_p4.child[4]} />:</p>
            <div className="flex gap-x-4 flex-wrap">
              {a_p4.child[4].child.map((el) => (
                <Link
                  key={el.id}
                  href={`https://${el.content}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {el.content}
                </Link>
              ))}
            </div>
          </div>
        </ContainerSection>

        {/* section B */}
        <ContainerSection>
          <h2><N {...sec_b} /></h2>
          <p><N {...sec_b.child[0]} /></p>
        </ContainerSection>

        <ContainerSection>
          <p><N {...sec_b.child[1]} /></p>
          <ul>
            {sec_b.child[1].child.map((el) => (
              <div key={el.id}>
                <li><N {...el} /></li>
              </div>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p><N {...sec_b.child[2]} /></p>
        </ContainerSection>

        <ContainerSection>
          <h3><N {...sec_b.child[3]} /></h3>
          <p><N {...sec_b.child[3].child[0]} /></p>
          <p className="font-semibold"><N {...sec_b.child[3].child[1]} /></p>
          <div className="key-strategies">
            {sec_b.child[3].child[1].child.map((el) => (
              <div key={el.id} className="pl-6">
                <p className="font-semibold"><N {...el} /></p>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {el.child.map((el2) => (
                      <div key={el2.id}>
                        <li style={{ marginBottom: 0 }}><N {...el2} /></li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ContainerSection>

        <ContainerSection>
          <h2><N {...sec_c} /></h2>
          <p>
            <i><N {...sec_c.child[0]} /></i>
          </p>
          <p><N {...sec_c.child[1]} /></p>
          <p><N {...sec_c.child[2]} /></p>
        </ContainerSection>

        {sec_c.child.slice(3, -1).map((el) => (
          <ContainerSection key={el.id}>
            <div>
              <h3><N {...el} /></h3>
              <div>
                {el.child.map((el2) => (
                  <div key={el2.id}>
                    <p><N {...el2} /></p>
                  </div>
                ))}
              </div>
            </div>
          </ContainerSection>
        ))}

        <ContainerSection>
          <h3><N {...references} /></h3>
          <ol>
            {references.child.map((el) => (
              <div key={el.id}>
                <li><N {...el} /></li>
              </div>
            ))}
          </ol>
        </ContainerSection>
      </div>
    </div>
  );
}

