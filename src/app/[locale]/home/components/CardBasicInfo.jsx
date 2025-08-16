import IconCall from "@/components/icons/IconCall";
import IconClock from "@/components/icons/IconClock";
import IconFacebook from "@/components/icons/IconFacebook";
import IconLine from "@/components/icons/IconLine";
import IconMail from "@/components/icons/IconMail";
import IconSmile from "@/components/icons/IconSmile";
import Link from "next/link";
import React from "react";

export default function CardBasicInfo({
  contact,
  openHours,
  basicServices,
  dictionary,
}) {
  const {
    facebook_label,
    facebook_link,
    line_label,
    line_link,
    email_label,
    email_link,
    tel_label,
    tel_link,
  } = contact;
  const services = basicServices;
  const dict = dictionary;
  return (
    <div className="card-basic-info">
      <div className="flex card gap-[20px] card-basic-info-container">
        <div className="flex content-block">
          <div className="icon-box">
            <IconCall />
          </div>
          <div>
            <TitleCard>{dict.contact_us}</TitleCard>
            <p className="custom-text-1 text-(--neutral-600)">
              <Link
                // href={"https://www.facebook.com/cadautism"}
                href={facebook_link}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <IconFacebook /> {facebook_label}
              </Link>
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              <Link
                // href={"https://line.me/R/ti/p/~@cadcenter"}
                href={line_link}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                {/* <IconLine /> @cadcenter */}
                <IconLine /> {line_label}
              </Link>
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              <Link
                // href={"mailto:cadautism@gmail.com"}
                href={`mailto:${email_link}`}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                {/* <IconMail /> cadautism@gmail.com */}
                <IconMail /> {email_label}
              </Link>
            </p>
            <p className="custom-text-1 text-(--primary-1) mt-[8px]">
              <Link
                // href={"tel:0654962826"}
                href={`tel:${tel_link}`}
                className="flex items-center gap-x-2"
              >
                <IconCall />
                {/* 065-496-2826 */}
                {tel_label}
              </Link>
            </p>
            {/* <Link className="button-primary small w-full mt-[8px]" href={"tel:0654962826"}>
              065-496-2826
            </Link> */}
          </div>
        </div>
        <div className="flex justify-center items-center mx-[20px] py-[8px]">
          <div className="h-full w-[1px] bg-[#d9d8e5]"></div>
        </div>
        <div className="flex content-block">
          <div className="icon-box">
            <IconClock />
          </div>
          <div>
            {/* <TitleCard>Open Hours</TitleCard> */}
            <TitleCard>{dict.open_hours}</TitleCard>
            <p className="custom-text-1 text-(--neutral-600)">
              {openHours.days}
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              {openHours.hours}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mx-[20px] py-[8px]">
          <div className="h-full w-[1px] bg-[#d9d8e5]"></div>
        </div>
        <div className="flex content-block">
          <div className="icon-box">
            <IconSmile />
          </div>
          <div>
            {/* <TitleCard>Services</TitleCard> */}
            <TitleCard>{dict.services}</TitleCard>
            {services.map((el, index) => (
              <p key={index} className="custom-text-1 text-(--neutral-600)">
                {el}
              </p>
            ))}
            {/* <p className="custom-text-1 text-(--neutral-600)">
              Language & Behavior Room
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              Parent Training
            </p>
            <p className="custom-text-1 text-(--neutral-600)">Consultation</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const TitleCard = ({ children }) => {
  return <h2 style={{ marginBottom: 9, fontSize: 24 }}>{children}</h2>;
};
