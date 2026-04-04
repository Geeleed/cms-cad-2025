import { ButtonSecondarySmall } from "@/components/Buttons";
import FadeInWrapper from "@/components/FadeInWrapper";
import InlineText from "@/components/admin/InlineText";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Doctor({
  doctorImg,
  doctorIntro,
  buttonLabel,
  locale,
}) {
  const rt = "page_doctor";
  const rn = `page_doctor_${locale}`;
  return (
    <section className="section-doctor">
      <FadeInWrapper>
        <div className="card relative drop-shadow-2xl">
          <div>
            <p className="max-[450px]:line-clamp-6">
              <InlineText value={doctorIntro} resourceType={rt} resourceName={rn} fieldKey="child.0.content" multiline />
            </p>
            <Link href={`/${locale}/doctor`}>
              <ButtonSecondarySmall>
                <label className="cursor-pointer">
                  <InlineText value={buttonLabel} resourceType={rt} resourceName={rn} fieldKey="content" />
                </label>
              </ButtonSecondarySmall>
            </Link>
          </div>
          <div className="image max-[769px]:hidden">
            <Image src={doctorImg} width={500} height={500} alt="หมอ ทรงภูมิ" />
          </div>
        </div>
      </FadeInWrapper>
    </section>
  );
}
