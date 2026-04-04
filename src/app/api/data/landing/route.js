import { NextResponse } from "next/server";
import pool from "@/config/db";

export async function POST(request) {
  const { locale } = await request.json();
  const conn = await pool.connect();
  try {
    const resourceConfigs = [
      { type: "page_landing", name: `section_home_${locale}`, key: "sectionHome" },
      { type: "page_landing", name: `section_welcome_${locale}`, key: "sectionWelcome" },
      { type: "value_setting", name: `value_setting_${locale}`, key: "valueSetting" },
      { type: "page_services", name: `page_services_${locale}`, key: "pageServices" },
      { type: "page_about", name: `page_about_${locale}`, key: "sectionAbout" },
      { type: "page_team", name: `page_team_${locale}`, key: "sectionTeam" },
      { type: "page_doctor", name: `page_doctor_${locale}`, key: "sectionDoctor" },
      { type: "page_approaches", name: `page_approaches_${locale}`, key: "sectionApproaches" },
      { type: "page_resources", name: `page_resources_${locale}`, key: "sectionResources" },
      { type: "page_news", name: `page_news_${locale}`, key: "sectionNews" },
    ];

    const placeholders = resourceConfigs
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(", ");
    const values = resourceConfigs.flatMap((r) => [r.type, r.name]);

    const result = await conn.query(
      `SELECT resource_type, name, resource FROM cad__resource WHERE (resource_type, name) IN (${placeholders})`,
      values
    );

    const resourceMap = {};
    result.rows.forEach((r) => {
      resourceMap[`${r.resource_type}_${r.name}`] = r.resource;
    });

    const returnResult = {};
    resourceConfigs.forEach((cfg) => {
      const resData = resourceMap[`${cfg.type}_${cfg.name}`];
      if (!resData) return;
      switch (cfg.key) {
        case "sectionHome":
          returnResult.sectionHome = { h1_1: resData.h1_1, h1_2: resData.h1_2, p: resData.p, img: resData.img };
          break;
        case "sectionWelcome":
          returnResult.sectionWelcome = { welcomeTitle: resData.h2, welcomeP: resData.p };
          break;
        case "valueSetting":
          returnResult.sectionBasicInfo = {
            contacts: resData.contacts || [],
            openSchedule: resData.open_schedule || [],
            basicServices: resData.my_services,
          };
          returnResult.sectionFooter = {
            address: resData.address,
            contacts: resData.contacts || [],
            footer: resData.footer,
            map: resData.map,
          };
          break;
        case "pageServices":
          returnResult.sectionServices = {
            servicesTitle: resData.title,
            servicesCard: resData.content.map((c) => c.h2),
          };
          break;
        case "sectionAbout":
          returnResult.sectionAbout = {
            aboutTitle: resData.h2, aboutSubtitle: resData.h3,
            aboutP1: resData.p_1, aboutP2: resData.p_2, aboutCard: resData.card,
          };
          break;
        case "sectionTeam":
          returnResult.sectionTeam = {
            teamTitle: resData.title,
            teamCard: resData.team.map((t) => ({
              img: t.img, person_name: t.person_name, role: t.role, position: t.position,
            })),
          };
          break;
        case "sectionDoctor":
          returnResult.sectionDoctor = {
            buttonLabel: resData.content,
            doctorIntro: resData.child.find((c) => c?.label === "intro")?.content,
            doctorImg: resData.child.find((c) => c?.content?.name === "doctor")?.content?.src_image,
          };
          break;
        case "sectionApproaches":
          returnResult.sectionApproaches = {
            approachesTitle: resData.content,
            approachesCard: resData.child.map((c) => c.content),
          };
          break;
        case "sectionResources":
          returnResult.sectionResources = { resourcesTitle: resData.title, articlesList: [], videosList: [] };
          break;
        case "sectionNews":
          returnResult.sectionNews = { newsTitle: resData.title, newsList: [] };
          break;
      }
    });

    return NextResponse.json(returnResult);
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  } finally {
    conn.release();
  }
}
