import { NextResponse } from "next/server";
import cad__resource from "@/static_json/cad__resource.json";

export async function POST(request) {
  try {
    const { locale } = await request.json();
    const value_setting = cad__resource.find(
      (el) =>
        el.resource_type === "value_setting" &&
        el.name === `value_setting_${locale}`
    );
    const {
      facebook_label, facebook_link,
      line_label, line_link,
      email_label, email_link,
      tel_label, tel_link,
      address, map, footer,
    } = value_setting.resource;
    const contact = {
      facebook_label, facebook_link,
      line_label, line_link,
      email_label, email_link,
      tel_label, tel_link,
    };
    return NextResponse.json({ address, contact, footer, map });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}
