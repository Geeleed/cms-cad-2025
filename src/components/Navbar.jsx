"use client";
import useAdminSession, { ADMIN_SESSION_EVENT } from "@/hooks/useAdminSession";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import IconList from "./icons/IconList";
import { load_system_word } from "@/api/loadData";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [locale, setLocale] = useState("");
  const [dict, setDict] = useState({});
  const { isAdmin } = useAdminSession();

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
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.dispatchEvent(new Event(ADMIN_SESSION_EVENT));
    router.push(`/${locale}/home`);
  };

  return (
    <>
      <nav
        className="bg-white w-full drop-shadow-(--main-drop-shadow) max-[769px]:px-8 sticky top-0 z-[100] transition-all duration-300"
        id="nav"
        data-main-navbar
      >
        <div className={`max-w-[1250px] w-full mx-auto flex items-center justify-between min-[1024px]:px-[28px] min-[1440px]:px-0 min-[700px]:px-[2rem] transition-all duration-300 ${scrolled ? "py-[10px]" : "py-[28px]"}`}>
          <Link href={`/${locale}/home`}>
            <Image
              src={"/statics/svgs/logo.svg"}
              width={scrolled ? 80 : 140}
              height={scrolled ? 80 : 140}
              alt="logo"
              className="transition-all duration-300"
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
              {isAdmin && (
                <div className="relative">
                  {isAdminOpen && (
                    <div className="fixed inset-0 z-[110]" onClick={() => setIsAdminOpen(false)} />
                  )}
                  <button
                    className="nav-link text-(--primary-1) font-semibold relative z-[120]"
                    onClick={() => setIsAdminOpen((v) => !v)}
                  >
                    Admin ▾
                  </button>
                  {isAdminOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg py-1 z-[120] min-w-[210px] border border-gray-100">
                      <Link className="block px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-700" href={`/${locale}/admin`} onClick={() => setIsAdminOpen(false)}>Dashboard</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700" href={`/${locale}/admin/resource`} onClick={() => setIsAdminOpen(false)}>จัดการเนื้อหาหน้าเว็บ</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700" href={`/${locale}/admin/team`} onClick={() => setIsAdminOpen(false)}>จัดการทีมงาน</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700" href={`/${locale}/admin/news`} onClick={() => setIsAdminOpen(false)}>จัดการข่าว</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700" href={`/${locale}/admin/video`} onClick={() => setIsAdminOpen(false)}>จัดการวิดีโอ</Link>
                      <Link className="block px-4 py-2 hover:bg-gray-50 text-sm text-gray-700" href={`/${locale}/admin/article`} onClick={() => setIsAdminOpen(false)}>จัดการบทความ</Link>
                      <hr className="my-1 border-gray-100" />
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-500" onClick={() => { setIsAdminOpen(false); logout(); }}>ออกจากระบบ</button>
                    </div>
                  )}
                </div>
              )}
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
          <div className="max-[1440px]:flex hidden items-center gap-4">
            <Link className="button-primary !py-3 !px-5 !text-sm !rounded-xl" href={"#contact"}>
              {/* Contact */}
              {dict?.contact}
            </Link>
            <div
              onClick={() => setIsOpenNavPage(true)}
              className="cursor-pointer flex items-center justify-center"
            >
              <IconList />
            </div>
          </div>
        </div>
      </nav>
      {isOpenNavPage === true && (
        <div
          onClick={() => setIsOpenNavPage(false)}
          className="fixed top-0 left-0 w-dvw h-screen bg-(--neutral-400) z-[200] flex flex-col items-center text-[2rem] font-bold pt-8 px-4 pb-4 *:hover:text-(--c) *:hover:underline"
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
          {isAdmin && (
            <>
              <Link className="nav-link text-(--primary-1) font-semibold" href={`/${locale}/admin`}>Dashboard</Link>
              <Link className="nav-link text-(--primary-1)" href={`/${locale}/admin/resource`}>จัดการเนื้อหาหน้าเว็บ</Link>
              <Link className="nav-link text-(--primary-1)" href={`/${locale}/admin/team`}>จัดการทีมงาน</Link>
              <Link className="nav-link text-(--primary-1)" href={`/${locale}/admin/news`}>จัดการข่าว</Link>
              <Link className="nav-link text-(--primary-1)" href={`/${locale}/admin/video`}>จัดการวิดีโอ</Link>
              <Link className="nav-link text-(--primary-1)" href={`/${locale}/admin/article`}>จัดการบทความ</Link>
              <button className="nav-link text-red-400 font-semibold" onClick={logout}>ออกจากระบบ</button>
            </>
          )}
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
