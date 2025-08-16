"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import IconList from "./icons/IconList";
import { load_system_word } from "@/api/loadData";

export default function Navbar() {
  const [locale, setLocale] = useState("");

  const [dict, setDict] = useState({});

  const onChangeLocale = (value) => {
    localStorage.setItem("locale", value);
    setLocale(value);
    const pathname = window.location.pathname;
    const revPathname = pathname.replace("/th", "/").replace("/en", "/");
    const origin = window.location.origin;
    window.location.replace(`${origin}/${value}/${revPathname}`);
  };

  useEffect(() => {
    const temp = localStorage.getItem("locale");
    if (temp) {
      load_system_word({ params: { locale: temp } }).then((r) =>
        setDict(r.resource)
      );
      setLocale(temp);
      console.log({ temp });
    } else {
      load_system_word({ params: { locale: "en" } }).then((r) =>
        setDict(r.resource)
      );
      localStorage.setItem("locale", "en");
      setLocale("en");
      console.log(localStorage.getItem("locale"));
    }
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("locale", locale);
  //   if (locale !== localStorage.getItem("locale")) {
  //     window.location.reload();
  //   }
  // }, [locale]);

  const [isOpenNavPage, setIsOpenNavPage] = useState(false);
  return (
    <>
      <nav
        className="bg-white w-full drop-shadow-(--main-drop-shadow) max-[769px]:px-8"
        id="nav"
      >
        <div className="max-w-[1250px] w-full mx-auto flex items-center justify-between py-[28px] min-[1024px]:px-[28px] min-[1440px]:px-0 min-[700px]:px-[2rem]">
          <Link href={`/${locale}/home`}>
            <Image
              src={"/statics/svgs/logo.svg"}
              width={140}
              height={140}
              alt="logo"
            />
          </Link>
          <div className="flex justify-center items-center gap-[10px] min-[1024px]:justify-end max-[1440px]:hidden">
            <div className="flex justify-center items-center gap-[10px] flex-wrap min-[1024px]:w-1/2 min-[1440px]:w-full">
              <Link className="nav-link" href={`/${locale}/home`}>
                {/* Home */}
                {dict?.home}
              </Link>
              <Link className="nav-link" href={`/${locale}/about`}>
                {/* About */}
                {dict?.about}
              </Link>
              <Link className="nav-link" href={`/${locale}/team`}>
                {/* Team */}
                {dict?.team}
              </Link>
              <Link className="nav-link" href={`/${locale}/services`}>
                {/* Services */}
                {dict?.services}
              </Link>
              <Link className="nav-link" href={`/${locale}/doctor`}>
                {/* Doctor */}
                {dict?.doctor}
              </Link>
              <Link className="nav-link" href={`/${locale}/approaches`}>
                {/* Approaches */}
                {dict?.approaches}
              </Link>
              <Link className="nav-link" href={`/${locale}/resources`}>
                {/* Resources */}
                {dict?.resources}
              </Link>
              <Link className="nav-link" href={`/${locale}/news`}>
                {/* News */}
                {dict?.news}
              </Link>
              {locale && (
                <div className="group-button-switch-locale">
                  <button
                    onClick={() => onChangeLocale("en")}
                    className={locale === "en" ? "local-active" : ""}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => onChangeLocale("th")}
                    className={locale === "th" ? "local-active" : ""}
                  >
                    TH
                  </button>
                </div>
              )}
              {/* <Link className="nav-link" href={"/events"}>Events</Link> */}
            </div>
            <Link className="button-primary" href={"#contact"}>
              {/* Contact */}
              {dict?.contact}
            </Link>
          </div>
          <div className="max-[1440px]:flex hidden items-center gap-8">
            <Link className="button-primary" href={"#contact"}>
              {/* Contact */}
              {dict?.contact}
            </Link>
            <div
              onClick={() => setIsOpenNavPage(true)}
              className="scale-[2] -translate-x-2"
            >
              <IconList />
            </div>
          </div>
        </div>
      </nav>
      {isOpenNavPage === true && (
        <div
          onClick={() => setIsOpenNavPage(false)}
          className="fixed top-0 left-0 w-dvw h-screen bg-(--neutral-400) z-50 flex flex-col items-center text-[2rem] font-bold pt-8 px-4 pb-4 *:hover:text-(--c) *:hover:underline"
        >
          <Link className="nav-link" href={`/${locale}/home`}>
            {/* Home */}
            {dict?.home}
          </Link>
          <Link className="nav-link" href={`/${locale}/about`}>
            {/* About */}
            {dict?.about}
          </Link>
          <Link className="nav-link" href={`/${locale}/team`}>
            {/* Team */}
            {dict?.team}
          </Link>
          <Link className="nav-link" href={`/${locale}/services`}>
            {/* Services */}
            {dict?.services}
          </Link>
          <Link className="nav-link" href={`/${locale}/doctor`}>
            {/* Doctor */}
            {dict?.doctor}
          </Link>
          <Link className="nav-link" href={`/${locale}/approaches`}>
            {/* Approaches */}
            {dict?.approaches}
          </Link>
          <Link className="nav-link" href={`/${locale}/resources`}>
            {/* Resources */}
            {dict?.resources}
          </Link>
          <Link className="nav-link" href={`/${locale}/news`}>
            {/* News */}
            {dict?.news}
          </Link>
          {locale && (
            <div className="group-button-switch-locale">
              <button
                onClick={() => onChangeLocale("en")}
                className={locale === "en" ? "local-active" : ""}
              >
                EN
              </button>
              <button
                onClick={() => onChangeLocale("th")}
                className={locale === "th" ? "local-active" : ""}
              >
                TH
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
