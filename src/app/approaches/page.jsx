import React from "react";
import En from "./En";
import { getApproach } from "@/api/fetcher";
import Image from "next/image";
import Link from "next/link";
import FadeInWrapper from "@/components/FadeInWrapper";
import ContainerSection from "./components/ContainerSection";

export default async function page() {
  const approach = await getApproach();
  const d = approach.en;
  const [sec_a, sec_b, sec_c] = d.child;
  let [a_p1, a_p2, a_p3, a_p4] = sec_a.child;
  let [teaching, table] = a_p3.child;
  const references = sec_c.child.find((el) => el.label === "references");
  return (
    <div className="page-approaches">
      <div className="max-w-[1250px] mx-auto">
        <div className="mt-[8rem] mb-[1rem]">
          <FadeInWrapper>
            <h1>{d.content}</h1>
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
          <h2>{sec_a.content}</h2>
          <p>{a_p1.content}</p>
          <ul>
            {a_p1.child.map((el) => (
              <li key={el.id}>
                <div>{el.content}</div>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {(el?.child || []).map((el2) => (
                      <li key={el2.id}>{el2.content}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p>{a_p2.content}</p>
          <ul>
            {a_p2.child.map((el) => (
              <li key={el.id}>
                <div>{el.content}</div>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {(el?.child || []).map((el2) => (
                      <li key={el2.id}>{el2.content}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <h3>{a_p3.content}</h3>
          <p>{teaching.content}</p>
          <ul>
            {teaching.child.map((el) => (
              <div key={el.id}>
                <li>{el.content}</li>
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
                    <div key={el.id}>{el.content}</div>
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
                          {el2.content}
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
          <h3>{a_p4.content}</h3>
          <p>{a_p4.child[0].content}</p>
          <ul>
            {a_p4.child[0].child.map((el) => (
              <div key={el.id}>
                <li>{el.content}</li>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {el.child.map((el2) => (
                      <div key={el2.id}>
                        <li>{el2.content}</li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p>{a_p4.child[1].content}</p>
          <ul>
            {a_p4.child[1].child.map((el) => (
              <div key={el.id}>
                <li>{el.content}</li>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {el.child.map((el2) => (
                      <div key={el2.id}>
                        <li>{el2.content}</li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p>{a_p4.child[2].content}</p>
        </ContainerSection>

        <br />

        <ContainerSection>
          <div className="flex">
            <p className="font-bold mr-4">{a_p4.child[3].content}:</p>
            {a_p4.child[3].child.map((el) => (
              <p key={el.id}>{el.content}</p>
            ))}
          </div>
        </ContainerSection>

        <ContainerSection>
          <div className="flex">
            <p className="font-bold mr-4">{a_p4.child[4].content}:</p>
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
          <h2>{sec_b.content}</h2>
          <p>{sec_b.child[0].content}</p>
        </ContainerSection>

        <ContainerSection>
          <p>{sec_b.child[1].content}</p>
          <ul>
            {sec_b.child[1].child.map((el) => (
              <div key={el.id}>
                <li>{el.content}</li>
              </div>
            ))}
          </ul>
        </ContainerSection>

        <ContainerSection>
          <p>{sec_b.child[2].content}</p>
        </ContainerSection>

        <ContainerSection>
          <h3>{sec_b.child[3].content}</h3>
          <p>{sec_b.child[3].child[0].content}</p>
          <p className="font-semibold">{sec_b.child[3].child[1].content}</p>
          <div className="key-strategies">
            {sec_b.child[3].child[1].child.map((el) => (
              <div key={el.id} className="pl-6">
                <p className="font-semibold">{el.content}</p>
                {(el?.child || []).length > 0 && (
                  <ul>
                    {el.child.map((el2) => (
                      <div key={el2.id}>
                        <li style={{ marginBottom: 0 }}>{el2.content}</li>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ContainerSection>

        <ContainerSection>
          <h2>{sec_c.content}</h2>
          <p>
            <i>{sec_c.child[0].content}</i>
          </p>
          <p>{sec_c.child[1].content}</p>
          <p>{sec_c.child[2].content}</p>
        </ContainerSection>

        {sec_c.child.slice(3, -1).map((el) => (
          <ContainerSection key={el.id}>
            <div>
              <h3>{el.content}</h3>
              <div>
                {el.child.map((el2) => (
                  <div key={el2.id}>
                    <p>{el2.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </ContainerSection>
        ))}

        <ContainerSection>
          <h3>{references.content}</h3>
          <ol>
            {references.child.map((el) => (
              <div key={el.id}>
                <li>{el.content}</li>
              </div>
            ))}
          </ol>
        </ContainerSection>
      </div>
    </div>
  );
}
