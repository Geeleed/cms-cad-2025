"use client";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ButtonPrimaryMedium, NavLink } from "./Buttons";

export default function Navbar() {
  return (
    <nav className="bg-white w-full drop-shadow-(--main-drop-shadow)" id="nav">
      <div className="max-w-[1250px] w-full mx-auto flex items-center justify-between py-[28px] min-[1024px]:px-[28px] min-[1440px]:px-0">
        <div>
          <Image
            src={"/statics/svgs/logo.svg"}
            width={100}
            height={100}
            alt="logo"
          />
        </div>
        <div className="flex justify-center items-center gap-[10px] min-[1024px]:justify-end">
          <div className="flex justify-center items-center gap-[10px] flex-wrap min-[1024px]:w-1/2 min-[1440px]:w-full">
          <Link className="nav-link" href={"/home"}>Home</Link>
          <Link className="nav-link" href={"/about"}>About</Link>
          <Link className="nav-link" href={"/team"}>Team</Link>
          <Link className="nav-link" href={"/services"}>Services</Link>
          <Link className="nav-link" href={"/doctor"}>Doctor</Link>
          <Link className="nav-link" href={"/approaches"}>Approaches</Link>
          <Link className="nav-link" href={"/resources"}>Resources</Link>
          <Link className="nav-link" href={"/home#news"}>News</Link>
          {/* <Link className="nav-link" href={"/events"}>Events</Link> */}
          </div>
          <Link className="button-primary" href={"#contact"}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
