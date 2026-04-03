"use client";
import { usePathname } from "next/navigation";

export default function FooterWrapper({ footer }) {
  const pathname = usePathname();
  if (pathname.includes("/admin")) return null;
  return footer;
}
