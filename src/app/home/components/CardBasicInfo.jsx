import IconCall from "@/components/icons/IconCall";
import IconClock from "@/components/icons/IconClock";
import IconFacebook from "@/components/icons/IconFacebook";
import IconLine from "@/components/icons/IconLine";
import IconMail from "@/components/icons/IconMail";
import IconSmile from "@/components/icons/IconSmile";
import Link from "next/link";
import React from "react";

export default function CardBasicInfo() {
  return (
    <div className="card-basic-info">
      <div className="flex card gap-[20px] card-basic-info-container">
        <div className="flex">
          <div className="icon-box">
            <IconCall />
          </div>
          <div>
            <TitleCard>Contact Us</TitleCard>
            <p className="custom-text-1 text-(--neutral-600)">
              <Link
                href={"https://www.facebook.com/cadautism"}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <IconFacebook /> cadautism
              </Link>
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              <Link
                href={"https://line.me/R/ti/p/~@cadcenter"}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <IconLine /> @cadcenter
              </Link>
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              <Link
                href={"mailto:cadautism@gmail.com"}
                target="_blank"
                className="flex items-center gap-x-2"
              >
                <IconMail /> cadautism@gmail.com
              </Link>
            </p>
            <p className="custom-text-1 text-(--primary-1) mt-[8px]">
              <Link
                href={"tel:0654962826"}
                className="flex items-center gap-x-2"
              >
                <IconCall />
                065-496-2826
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
        <div className="flex">
          <div className="icon-box">
            <IconClock />
          </div>
          <div>
            <TitleCard>Open Hours</TitleCard>
            <p className="custom-text-1 text-(--neutral-600)">Mon-Fri</p>
            <p className="custom-text-1 text-(--neutral-600)">
              8:00 AM to 5:00 PM
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mx-[20px] py-[8px]">
          <div className="h-full w-[1px] bg-[#d9d8e5]"></div>
        </div>
        <div className="flex">
          <div className="icon-box">
            <IconSmile />
          </div>
          <div>
            <TitleCard>Services</TitleCard>
            <p className="custom-text-1 text-(--neutral-600)">
              Language & Behavior Room
            </p>
            <p className="custom-text-1 text-(--neutral-600)">
              Parent Training
            </p>
            <p className="custom-text-1 text-(--neutral-600)">Consultation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const TitleCard = ({ children }) => {
  return <h2 style={{ marginBottom: 9, fontSize: 24 }}>{children}</h2>;
};
