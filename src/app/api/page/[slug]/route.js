import { NextResponse } from "next/server";

const pageMap = {
  home: () => require("@/static_json/home_en.json"),
  about: () => require("@/static_json/about_en.json"),
  approach: () => require("@/static_json/approach_en.json"),
  contact: () => require("@/static_json/contact_en.json"),
  doctor: () => require("@/static_json/doctor_en.json"),
  service: () => require("@/static_json/service_en.json"),
  team: () => require("@/static_json/team_en.json"),
};

export async function GET(request, { params }) {
  const { slug } = await params;
  const loader = pageMap[slug];
  if (!loader) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ en: loader(), th: null });
}
