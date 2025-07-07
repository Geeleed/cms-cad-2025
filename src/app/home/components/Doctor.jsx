import { ButtonSecondarySmall } from "@/components/Buttons";
import FadeInWrapper from "@/components/FadeInWrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Doctor() {
  return (
    <section className="section-doctor">
      <FadeInWrapper>
        <div className="card relative drop-shadow-2xl">
          <div>
            <p className="max-[450px]:line-clamp-6">
              Dr. Songpoom serves as a consultant and partner psychiatrist at
              the CAD Center, offering expert guidance and support in the field
              of psychiatry. He has been a dedicated psychiatrist at multiple
              hospitals and is an entrepreneur with his own clinic Sunshine Mind
              Clinic. Dr. Songpoom has an extensive background in child and
              adolescent psychiatry, with significant roles in both academia and
              clinical practice.
            </p>
            <Link href={"/doctor"}>
              <ButtonSecondarySmall>
                <label className="cursor-pointer">Meet Our Doctor</label>
              </ButtonSecondarySmall>
            </Link>
          </div>
          <div className="image max-[769px]:hidden">
            <Image
              src={"/statics/images/team/หมอ ทรงภูมิ.jpg"}
              width={500}
              height={500}
              alt="หมอ ทรงภูมิ"
            />
          </div>
        </div>
      </FadeInWrapper>
    </section>
  );
}
