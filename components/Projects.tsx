'use client'

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import type { Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { t, language } = useLanguage();
  const categories = [
    t("projects.all"),
    t("projects.web"),
    t("projects.desktop"),
    t("projects.mobile"),
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    if (activeCategory === t("projects.all")) {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((p) => {
          if (activeCategory === t("projects.web"))
            return p.category === "Web Development";
          if (activeCategory === t("projects.desktop"))
            return p.category === "Desktop";
          if (activeCategory === t("projects.mobile"))
            return p.category === "Mobile";
          return true;
        }),
      );
    }
  }, [activeCategory, t]);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none none",
        },
      },
    );

    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-card/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance"
          >
            {t("projects.title").split(" ")[0]}{" "}
            <span className="text-accent">
              {t("projects.title").split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-accent text-accent-foreground"
                  : "bg-background border border-border text-foreground hover:border-accent"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              language={language}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("projects.no_projects")}</p>
          </div>
        )}
      </div>
    </section>
  )
}
