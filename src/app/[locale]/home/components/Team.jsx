"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import FadeInWrapper from "@/components/FadeInWrapper";
import IconLeftFill from "@/components/icons/IconLeftFill";
import IconRightFill from "@/components/icons/IconRightFill";

export default function Team({ teamTitle, teamCard, locale }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pause, setPause] = useState(false);
  // const [locale, setLocale] = useState("en");
  const timerRef = useRef(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3, spacing: 62 },
    breakpoints: {
      "(max-width: 1180px)": {
        slides: { perView: 2, spacing: 40 },
      },
      "(max-width: 820px)": {
        slides: { perView: 1, spacing: 20 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Autoplay
  //   useEffect(() => {
  //     if (!instanceRef.current) return;

  //     timerRef.current = setInterval(() => {
  //       if (!pause) {
  //         instanceRef.current?.next();
  //       }
  //     }, 3000);

  //     return () => clearInterval(timerRef.current);
  //   }, [pause]);
  const teamData = teamCard.map((el) => ({
    name: el.person_name,
    role: el.role,
    detail: el.position,
    img: el.img,
  }));

  return (
    <section className="section-team">
      <div className="flex flex-col justify-center items-center">
        <FadeInWrapper delay={100}>
          <div className="mb-[20px]">
            <h2>{teamTitle}</h2>
          </div>
        </FadeInWrapper>

        <FadeInWrapper delay={300}>
          <div className="">
            <div className="team-slider-container">
              <div ref={sliderRef} className="keen-slider max-w-dvw">
                {teamData.map((member, idx) => (
                  <div
                    key={idx}
                    className="keen-slider__slide flex justify-center"
                  >
                    <Link href={`/${locale}/team`}>
                      <div className="card-team">
                        <div className="image">
                          <Image
                            src={member.img}
                            width={400}
                            height={400}
                            alt={member.name}
                          />
                        </div>
                        <div className="text">
                          <h3>{member.name}</h3>
                          <p>{member.role}</p>
                          {member.detail && <p>{member.detail}</p>}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <button
                className="button-slider button-slider-left"
                onClick={() => instanceRef.current?.prev()}
              >
                <IconLeftFill />
              </button>
              <button
                className="button-slider button-slider-right"
                onClick={() => instanceRef.current?.next()}
              >
                <IconRightFill />
              </button>
              <div className="container-button-slider"></div>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-4 gap-2">
              {teamData.map((_, idx) => (
                <button
                  key={idx}
                  className={`size-4 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? "bg-(--primary-1)"
                      : "bg-(--neutral-400)"
                  }`}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                />
              ))}
            </div>
          </div>
        </FadeInWrapper>
      </div>
    </section>
  );
}
