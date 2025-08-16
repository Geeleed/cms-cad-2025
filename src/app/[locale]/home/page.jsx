import SolidCircle from "@/components/SolidCircle";
import React from "react";
import About from "./components/About";
import Services from "./components/Services";
import Doctor from "./components/Doctor";
import Approaches from "./components/Approaches";
import Resources from "./components/Resources";
import FAQ from "./components/FAQ";
import Welcome from "./components/Welcome";
import News from "./components/News";
import Home from "./components/Home";
import CardBasicInfo from "./components/CardBasicInfo";
import Team from "./components/Team";
import { fetchData } from "@/api/fetcher";
import { load_page_landing, load_system_word } from "@/api/loadData";

export default async function page({ params }) {
  const locale = (await params).locale;
  const page_home = await load_page_landing({ params });
  const {
    sectionHome: { h1_1, h1_2, p, img },
    sectionBasicInfo: { contact, openHours, basicServices },
    sectionWelcome: { welcomeTitle, welcomeP },
    sectionAbout: { aboutTitle, aboutSubtitle, aboutP1, aboutP2, aboutCard },
    sectionTeam: { teamTitle, teamCard },
    sectionDoctor: { doctorImg, doctorIntro, buttonLabel },
    sectionServices: { servicesTitle, servicesCard },
    sectionApproaches: { approachesTitle, approachesCard },
    sectionResources: { resourcesTitle, articlesList, videosList },
    sectionNews: { newsTitle, newsList },
    sectionFooter: { address, footer, map },
  } = page_home;
  const system_word = await load_system_word({ params });
  const dictionary = system_word.resource;
  return (
    <div className="page-home">
      <Home h1_1={h1_1} h1_2={h1_2} p={p} img={img} />
      <CardBasicInfo
        contact={contact}
        openHours={openHours}
        basicServices={basicServices}
        dictionary={dictionary}
      />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--c) rotate-12 left-[10rem] animate-up-down top-[2rem]">
          C
        </div>
        <div className="decoration-cad text-(--c) rotate-3 right-[10rem] translate-y-[10rem] animate-up-down-reverse">
          D
        </div>
      </div>
      <Welcome welcomeTitle={welcomeTitle} welcomeP={welcomeP} />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--c) -rotate-6 left-[10rem] translate-y-[1rem] animate-up-down">
          A
        </div>
      </div>
      <About
        dictionary={dictionary}
        aboutTitle={aboutTitle}
        aboutSubtitle={aboutSubtitle}
        aboutP1={aboutP1}
        aboutP2={aboutP2}
        aboutCard={aboutCard}
        locale={locale}
      />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--c) rotate-6 right-[10rem] translate-y-[-8rem] animate-up-down-reverse">
          C
        </div>
        <div className="decoration-cad text-(--c) -rotate-6 left-[10rem] translate-y-[30rem] animate-up-down">
          D
        </div>
      </div>
      <Team teamTitle={teamTitle} teamCard={teamCard} locale={locale} />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--a) rotate-6 right-[10rem] translate-y-[2rem] animate-up-down-reverse">
          A
        </div>
      </div>
      <Doctor
        doctorImg={doctorImg}
        doctorIntro={doctorIntro}
        buttonLabel={buttonLabel}
        locale={locale}
      />
      <Services
        servicesTitle={servicesTitle}
        servicesCard={servicesCard}
        locale={locale}
        dictionary={dictionary}
      />
      <Approaches
        approachesTitle={approachesTitle}
        approachesCard={approachesCard}
        locale={locale}
        dictionary={dictionary}
      />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--d) left-[10rem] translate-y-[55rem] animate-up-down-reverse">
          D
        </div>
      </div>
      <Resources
        resourcesTitle={resourcesTitle}
        articlesList={articlesList}
        videosList={videosList}
        dictionary={dictionary}
        locale={locale}
      />
      <News
        newsTitle={newsTitle}
        newsList={newsList}
        dictionary={dictionary}
        locale={locale}
      />
      {/* <FAQ /> */}
    </div>
  );
}
