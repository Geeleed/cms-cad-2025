import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky max-h-16 bg-[#FA5456] flex justify-between h-10">
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        <Image
          src={"./statics/svgs/logo.svg"}
          width={40}
          height={40}
          alt="logo"
        />
      </span>
      <span className="flex gap-2 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <Link href={""}>Home</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Team</Link>
        <Link href={""}>Services</Link>
        <Link href={""}>Approaches</Link>
        <Link href={""}>Doctors</Link>
        <Link href={""}>Resources</Link>
        <Link href={""}>News</Link>
        <Link href={""}>Events</Link>
        <Link href={""}>Contact</Link>
      </span>
      <span className="absolute right-4 top-1/2 -translate-y-1/2">
        <button>
          <Image
            src={"./statics/svgs/logo.svg"}
            width={40}
            height={40}
            alt="logo"
          />
        </button>
        <button>
          <Image
            src={"./statics/svgs/logo.svg"}
            width={40}
            height={40}
            alt="logo"
          />
        </button>
      </span>
    </nav>
  );
}
