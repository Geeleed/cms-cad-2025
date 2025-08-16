"use client";
import { load_footer, load_system_word } from "@/api/loadData";
import Contact from "@/components/Contact";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const [locale, setLocale] = useState("");
  const [dict, setDict] = useState();
  const [footerData, setFooterData] = useState();
  // const { address, contact, footer, map } = footerData;
  // const {
  //   facebook_label,
  //   facebook_link,
  //   line_label,
  //   line_link,
  //   email_label,
  //   email_link,
  //   tel_label,
  //   tel_link,
  // } = contact;

  useEffect(() => {
    const temp = localStorage.getItem("locale");
    if (temp) {
      load_system_word({ params: { locale: temp } }).then((r) =>
        setDict(r.resource)
      );
      setLocale(temp);
      load_footer({ locale: temp }).then((r) => setFooterData(r));
    } else {
      load_system_word({ params: { locale: "en" } }).then((r) =>
        setDict(r.resource)
      );
      localStorage.setItem("locale", "en");
      setLocale("en");
      load_footer({ locale: "en" }).then((r) => {
        console.log(r);
        setFooterData(r);
      });
    }
  }, []);

  if (!(locale && dict && footerData)) {
    return null;
  }

  return (
    <footer>
      <Contact
        address={footerData?.address}
        contact={footerData?.contact || {}}
        map={footerData?.map || ""}
        dictionary={dict}
        locale={locale}
      />
      {/* <p className="py-[12px]">Copyright © 2025 cadcenter.co.th</p> */}
      <p className="py-[12px]">{footerData.footer}</p>
    </footer>
  );
}
