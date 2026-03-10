"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCard from "./SkillCard";
import { skillsData } from "@/data/skills";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      },
    );

    const cards = sectionRef.current.querySelectorAll(".skill-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: -80 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      },
    );
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* title */}
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-4">
            {t("skills.title")}
          </h2>

          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category) => (
            <div key={category.title} className="skill-card">
              <SkillCard title={t(category.title)} items={category.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
