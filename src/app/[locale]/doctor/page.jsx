import { load_page_doctor } from "@/api/loadData";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineNodeText from "@/components/admin/InlineNodeText";
import InlineNodeImage from "@/components/admin/InlineNodeImage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dynamic = 'force-dynamic';

export default async function Page({ params }) {
  const { locale } = await params;
  const page_doctor = await load_page_doctor({ params });
  const d = page_doctor.resource;
  if (!d?.child) return null;
  const bannerNode = d.child.find((el) => el.content.name === "banner");
  const doctorNode = d.child.find((el) => el.content.name === "doctor");
  const src_image_banner = bannerNode.content.src_image;
  const src_image_doctor = doctorNode.content.src_image;
  const introNode = d.child.find((el) => el.label === "intro");
  const about = d.child.find((el) => el.label === "about");
  const services = d.child.find((el) => el.label === "services");
  const appointments = d.child.find((el) => el.label === "appointments");
  const service_fee = d.child.find((el) => el.label === "service fee");
  const courses = d.child.find((el) => el.label === "courses");
  const faq = d.child.find((el) => el.label === "faq");
  const contact = d.child.find((el) => el.label === "contact");
  const rt = "page_doctor";
  const rn = `page_doctor_${locale}`;
  const N = (node) => <InlineNodeText value={node.content} nodeId={node.id} resourceType={rt} resourceName={rn} />;
  return (
    <div className="page-doctor">
      <div className="max-w-[1250px] mx-auto flex flex-col px-[2rem]">
        <div className="mt-[8rem]">
          <FadeInWrapper>
            <h1><N {...d} /></h1>
          </FadeInWrapper>
        </div>

        <FadeInWrapper>
          <div>
            <figure className="rounded-4xl overflow-hidden">
              <InlineNodeImage value={src_image_banner} nodeId={bannerNode.id} contentField="src_image" resourceType={rt} resourceName={rn}>
                <Image
                  src={src_image_banner}
                  width={1250}
                  height={1250}
                  alt={d.content}
                />
              </InlineNodeImage>
            </figure>
          </div>
        </FadeInWrapper>

        <div className="max-w-[800px] grid gap-12 my-12 max-[450px]:my-6">
          <FadeInWrapper>
            <section className="grid grid-cols-4 gap-4 max-[450px]:grid-cols-1 max-[450px]:gap-x-0">
              <figure className="w-full aspect-square overflow-hidden rounded-4xl max-[450px]:max-w-[200px] max-[450px]:mx-auto max-[450px]:hidden">
                <InlineNodeImage value={src_image_doctor} nodeId={doctorNode.id} contentField="src_image" resourceType={rt} resourceName={rn}>
                  <Image
                    src={src_image_doctor}
                    width={400}
                    height={400}
                    alt="image doctor"
                  />
                </InlineNodeImage>
              </figure>
              <p className="col-span-3"><N {...introNode} /></p>
            </section>
          </FadeInWrapper>

          <section>
            <FadeInWrapper>
              <h2><N {...about} /></h2>
            </FadeInWrapper>
            {about.child.map((el) => (
              <FadeInWrapper key={el.id}>
                <p className="mb-4"><N {...el} /></p>
              </FadeInWrapper>
            ))}
          </section>

          <section>
            <FadeInWrapper>
              <h2><N {...services} /></h2>
            </FadeInWrapper>
            <FadeInWrapper>
              <p>
                <i><N {...services.child[0]} /></i>
              </p>
            </FadeInWrapper>
            <FadeInWrapper>
              <p><N {...services.child[1]} /></p>
            </FadeInWrapper>
            <FadeInWrapper>
              <p><N {...services.child[2]} /></p>
            </FadeInWrapper>
            <ul className="mt-4">
              {services.child[2].child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <li><N {...el} /></li>
                </FadeInWrapper>
              ))}
            </ul>
          </section>

          <section>
            <FadeInWrapper>
              <h2><N {...appointments} /></h2>
            </FadeInWrapper>
            <div className="pl-6">
              {appointments.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <p className="mb-4"><N {...el} /></p>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section>
            <FadeInWrapper>
              <h2><N {...service_fee} /></h2>
            </FadeInWrapper>
            <div className="pl-2 max-[450px]:pl-0">
              {service_fee.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex justify-between hover:bg-(--c11) px-4 max-[450px]:px-0 py-2 rounded-4xl transform-all">
                    <p className="max-[450px]:w-1/2">
                      <InlineNodeText value={el.content.name} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="name" multiline={false} />
                    </p>
                    <p className="max-[450px]:w-1/2 max-[450px]:text-right">
                      <InlineNodeText value={el.content.price} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="price" multiline={false} />
                    </p>
                  </div>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section>
            <FadeInWrapper>
              <h2><N {...courses} /></h2>
            </FadeInWrapper>
            <div className="pl-2 max-[450px]:pl-0">
              {courses.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex justify-between hover:bg-(--c11) px-4 max-[450px]:px-0 py-2 rounded-4xl transform-all">
                    <p className="max-[450px]:w-1/2">
                      <InlineNodeText value={el.content.name} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="name" multiline={false} />
                    </p>
                    <p className="max-[450px]:w-1/2 text-right">
                      <InlineNodeText value={el.content.price} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="price" multiline={false} />
                    </p>
                  </div>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section>
            <FadeInWrapper>
              <h2><N {...faq} /></h2>
            </FadeInWrapper>
            <div className="pl-6 max-[450px]:pl-0">
              {faq.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <details className="mb-4">
                    <summary className="font-semibold cursor-pointer hover-pink">
                      <InlineNodeText value={el.content.q} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="q" />
                    </summary>
                    <p className="pl-6" style={{ fontSize: "0.9rem" }}>
                      <InlineNodeText value={el.content.a} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="a" />
                    </p>
                  </details>
                </FadeInWrapper>
              ))}
            </div>
          </section>

          <section className="card max-[450px]:hidden">
            <FadeInWrapper>
              <h2><N {...contact} /></h2>
            </FadeInWrapper>
            <div>
              {contact.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex gap-2 hover:underline underline-offset-8 hover:text-(--c) w-fit transition-all duration-300">
                    <p className="font-semibold mb-4">
                      <InlineNodeText value={el.content.contact_type} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="contact_type" multiline={false} />:
                    </p>
                    <Link
                      href={el.content.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InlineNodeText value={el.content.contact} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="contact" multiline={false} />
                    </Link>
                    <InlineNodeText value={el.content.href} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="href" multiline={false} label="ลิงก์" />
                  </div>
                </FadeInWrapper>
              ))}
            </div>
          </section>
          <section className="max-[450px]:block hidden">
            <FadeInWrapper>
              <h2><N {...contact} /></h2>
            </FadeInWrapper>
            <div>
              {contact.child.map((el) => (
                <FadeInWrapper key={el.id}>
                  <div className="flex gap-2 hover:underline underline-offset-8 hover:text-(--c) w-fit transition-all duration-300">
                    <p className="font-semibold mb-4">
                      <InlineNodeText value={el.content.contact_type} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="contact_type" multiline={false} />:
                    </p>
                    <Link
                      href={el.content.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InlineNodeText value={el.content.contact} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="contact" multiline={false} />
                    </Link>
                    <InlineNodeText value={el.content.href} nodeId={el.id} resourceType={rt} resourceName={rn} contentField="href" multiline={false} label="ลิงก์" />
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
