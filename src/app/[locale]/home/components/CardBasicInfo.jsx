"use client";
import IconClock from "@/components/icons/IconClock";
import IconSmile from "@/components/icons/IconSmile";
import IconCall from "@/components/icons/IconCall";
import InlineText from "@/components/admin/InlineText";
import InlineList from "@/components/admin/InlineList";
import InlineContactList from "@/components/admin/InlineContactList";
import React from "react";

export default function CardBasicInfo({
  contacts = [],
  openSchedule = [],
  basicServices,
  dictionary,
  locale,
}) {
  const services = basicServices || [];
  const dict = dictionary || {};
  const rt = "value_setting";
  const rn = `value_setting_${locale}`;
  return (
    <div className="card-basic-info">
      <div className="flex card gap-[20px] card-basic-info-container">
        <div className="flex content-block">
          <div className="icon-box">
            <IconCall />
          </div>
          <div>
            <TitleCard>{dict.contact_us}</TitleCard>
            <InlineContactList
              values={contacts}
              resourceType={rt}
              resourceName={rn}
              fieldKey="contacts"
              telClass="text-(--primary-1) mt-[8px]"
            />
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
            <TitleCard>{dict.open_hours}</TitleCard>
            <InlineList
              values={openSchedule}
              resourceType={rt}
              resourceName={rn}
              fieldKey="open_schedule"
              renderItem={(item, i) => (
                <p key={i} className="custom-text-1 text-(--neutral-600)">{item}</p>
              )}
            />
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
            <InlineList
              values={services}
              resourceType={rt}
              resourceName={rn}
              fieldKey="my_services"
              renderItem={(item, i) => (
                <p key={i} className="custom-text-1 text-(--neutral-600)">{item}</p>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const TitleCard = ({ children }) => {
  return <h2 style={{ marginBottom: 9, fontSize: 24 }}>{children}</h2>;
};
