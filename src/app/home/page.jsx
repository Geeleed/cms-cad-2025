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

export default function page() {
  return (
    <div className="page-home">
      <Home />
      {/* <div className="solid-circle-c right-0 opacity-10 size-[500px] translate-x-[200px] translate-y-[100px] animate-up-down" /> */}
      <CardBasicInfo />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--c) rotate-12 left-[10rem] animate-up-down top-[2rem]">
          C
        </div>
        {/* <div className="decoration-cad text-(--c) -rotate-6 left-[20%] translate-y-[15rem]">A</div> */}
        <div className="decoration-cad text-(--c) rotate-3 right-[10rem] translate-y-[10rem] animate-up-down-reverse">
          D
        </div>
      </div>
      <Welcome />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--c) -rotate-6 left-[10rem] translate-y-[1rem] animate-up-down">
          A
        </div>
      </div>
      {/* <div className="solid-circle-c left-0 opacity-10 size-[800px] translate-x-[-300px] translate-y-[100px] animate-up-down-reverse" /> */}
      <About />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--c) rotate-6 right-[10rem] translate-y-[-8rem] animate-up-down-reverse">
          C
        </div>
        <div className="decoration-cad text-(--c) -rotate-6 left-[10rem] translate-y-[30rem] animate-up-down">
          D
        </div>
      </div>
      {/* <div className="solid-circle-c right-0 opacity-10 size-[900px] translate-x-[400px] animate-up-down" /> */}
      <Team />
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--a) rotate-6 right-[10rem] translate-y-[2rem] animate-up-down-reverse">
          A
        </div>
        {/* <div className="decoration-cad text-(--a) -rotate-6 left-[10rem] translate-y-[10rem]">C</div> */}
      </div>
      {/* <div className="solid-circle-a left-0 opacity-10 size-[500px] translate-x-[-200px] animate-up-down-reverse" /> */}
      <Doctor />
      <Services />
      <Approaches />
      {/* <div className="solid-circle-d left-0 opacity-10 size-[800px] translate-x-[-500px] translate-y-[400px] animate-up-down-reverse" /> */}
      <div className="container-decoration-cad">
        <div className="decoration-cad text-(--d) left-[10rem] translate-y-[55rem] animate-up-down-reverse">
          D
        </div>
      </div>
      <Resources />
      <News />
      {/* <FAQ /> */}
    </div>
  );
}
