import { getDoctor } from "@/api/fetcher";
import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page() {
  const doctor = await getDoctor();
  const d = doctor.en;
  const src_image_banner = d.child.find((el) => el.content.name === "banner")
    .content.src_image;
  const src_image_doctor = d.child.find((el) => el.content.name === "doctor")
    .content.src_image;
  const intro = d.child.find((el) => el.label === "intro").content;
  const about = d.child.find((el) => el.label === "about");
  const services = d.child.find((el) => el.label === "services");
  const appointments = d.child.find((el) => el.label === "appointments");
  const service_fee = d.child.find((el) => el.label === "service fee");
  const courses = d.child.find((el) => el.label === "courses");
  const faq = d.child.find((el) => el.label === "faq");
  const contact = d.child.find((el) => el.label === "contact");
  return (
    <div className="page-doctor">
      <div className="max-w-[1250px] mx-auto flex flex-col">
        <div className="mt-[8rem]">
          <FadeInWrapper>
            <h1>{d.content}</h1>
          </FadeInWrapper>
        </div>

        <FadeInWrapper>
          <div>
            <figure className="rounded-4xl overflow-hidden">
              <Image
                src={src_image_banner}
                width={1250}
                height={1250}
                alt={d.content}
              />
            </figure>
          </div>
        </FadeInWrapper>

        <div className="max-w-[800px] grid gap-12 my-12">
          <FadeInWrapper>
            <section className="grid grid-cols-4 gap-4">
              <figure className="w-full aspect-square overflow-hidden rounded-4xl">
                <Image
                  src={src_image_doctor}
                  width={400}
                  height={400}
                  alt="image doctor"
                />
              </figure>
              <p className="col-span-3">{intro}</p>
            </section>
          </FadeInWrapper>

          <section>
            <FadeInWrapper>
              <h2>{about.content}</h2>
            </FadeInWrapper>
            {about.child.map((el) => (
              <FadeInWrapper key={el.id}>
                <p className="mb-4">{el.content}</p>
              </FadeInWrapper>
            ))}
          </section>

          <section>
            <FadeInWrapper>
              <h2>{services.content}</h2>
            </FadeInWrapper>
            <FadeInWrapper>
              <p>
                <i>{services.child[0].content}</i>
              </p>
            </FadeInWrapper>
            <FadeInWrapper>
              <p>{services.child[1].content}</p>
            </FadeInWrapper>
            <FadeInWrapper>
              <p>{services.child[2].content}</p>
            </FadeInWrapper>
            <ul className="mt-4">
              {services.child[2].child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <li>{el.content}</li>
                </FadeInWrapper>
              ))}
            </ul>
          </section>

          <section>
            <FadeInWrapper>
              <h2>{appointments.content}</h2>
            </FadeInWrapper>
            <div className="pl-6">
              {appointments.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <p className="mb-4">{el.content}</p>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section>
            <FadeInWrapper>
              <h2>{service_fee.content}</h2>
            </FadeInWrapper>
            <div className="pl-2">
              {service_fee.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex justify-between hover:bg-(--c11) px-4 py-2 rounded-4xl transform-all">
                    <p>{el.content.name}</p>
                    <p>
                      {el.content.price.min !== el.content.price.max
                        ? `${el.content.price.min} - ${el.content.price.max} ${el.content.price.currency}`
                        : `${
                            el.content.price.min || el.content.price.min || 0
                          } ${el.content.price.currency}`}
                    </p>
                  </div>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section>
            <FadeInWrapper>
              <h2>{courses.content}</h2>
            </FadeInWrapper>
            <div className="pl-2">
              {courses.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex justify-between hover:bg-(--c11) px-4 py-2 rounded-4xl transform-all">
                    <p>{el.content.name}</p>
                    <p>
                      {el.content.price.min !== el.content.price.max
                        ? `${el.content.price.min} - ${el.content.price.max} ${el.content.price.currency}`
                        : `${
                            el.content.price.min || el.content.price.min || 0
                          } ${el.content.price.currency}`}
                    </p>
                  </div>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section>
            <FadeInWrapper>
              <h2>{faq.content}</h2>
            </FadeInWrapper>
            <div className="pl-6">
              {faq.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <details className="mb-4">
                    <summary className="font-semibold cursor-pointer hover-pink">
                      {el.content.q}
                    </summary>
                    <p className="pl-6" style={{ fontSize: "0.9rem" }}>
                      {el.content.a}
                    </p>
                  </details>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section className="card">
            <FadeInWrapper>
              <h2>{contact.content}</h2>
            </FadeInWrapper>
            <div>
              {contact.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex gap-2 hover:underline underline-offset-8 hover:text-(--c) w-fit transition-all duration-300">
                    <p className="font-semibold mb-4">
                      {el.content.contact_type}:
                    </p>
                    <Link
                      href={el.content.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {el.content.contact}
                    </Link>
                  </div>
                </FadeInWrapper>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
