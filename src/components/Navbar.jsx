"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ButtonPrimaryMedium, NavLink } from "./Buttons";
import IconList from "./icons/IconList";

export default function Navbar() {
  const [isOpenNavPage, setIsOpenNavPage] = useState(false);
  return (
    <>
      <nav
        className="bg-white w-full drop-shadow-(--main-drop-shadow) max-[769px]:px-8"
        id="nav"
      >
        <div className="max-w-[1250px] w-full mx-auto flex items-center justify-between py-[28px] min-[1024px]:px-[28px] min-[1440px]:px-0 min-[700px]:px-[2rem]">
          <div>
            <Image
              src={"/statics/svgs/logo.svg"}
              width={100}
              height={100}
              alt="logo"
            />
          </div>
          <div className="flex justify-center items-center gap-[10px] min-[1024px]:justify-end max-[1440px]:hidden">
            <div className="flex justify-center items-center gap-[10px] flex-wrap min-[1024px]:w-1/2 min-[1440px]:w-full">
              <Link className="nav-link" href={"/home"}>
                Home
              </Link>
              <Link className="nav-link" href={"/about"}>
                About
              </Link>
              <Link className="nav-link" href={"/team"}>
                Team
              </Link>
              <Link className="nav-link" href={"/services"}>
                Services
              </Link>
              <Link className="nav-link" href={"/doctor"}>
                Doctor
              </Link>
              <Link className="nav-link" href={"/approaches"}>
                Approaches
              </Link>
              <Link className="nav-link" href={"/resources"}>
                Resources
              </Link>
              <Link className="nav-link" href={"/home#news"}>
                News
              </Link>
              {/* <Link className="nav-link" href={"/events"}>Events</Link> */}
            </div>
            <Link className="button-primary" href={"#contact"}>
              Contact
            </Link>
          </div>
          <div className="max-[1440px]:flex hidden items-center gap-8">
            <Link className="button-primary" href={"#contact"}>
              Contact
            </Link>
            <div onClick={() => setIsOpenNavPage(true)} className="scale-[2] -translate-x-2">
              <IconList />
            </div>
          </div>
        </div>
      </nav>
      <div
        onClick={() => setIsOpenNavPage(false)}
        hidden={isOpenNavPage === false}
        className="fixed top-0 left-0 w-dvw h-screen bg-(--neutral-400) z-50 flex flex-col items-center text-[2rem] font-bold pt-8 px-4 pb-4 *:hover:text-(--c) *:hover:underline"
      >
        <Link className="nav-link" href={"/home"}>
          Home
        </Link>
        <Link className="nav-link" href={"/about"}>
          About
        </Link>
        <Link className="nav-link" href={"/team"}>
          Team
        </Link>
        <Link className="nav-link" href={"/services"}>
          Services
        </Link>
        <Link className="nav-link" href={"/doctor"}>
          Doctor
        </Link>
        <Link className="nav-link" href={"/approaches"}>
          Approaches
        </Link>
        <Link className="nav-link" href={"/resources"}>
          Resources
        </Link>
        <Link className="nav-link" href={"/home#news"}>
          News
        </Link>
      </div>
    </>
  );
}
