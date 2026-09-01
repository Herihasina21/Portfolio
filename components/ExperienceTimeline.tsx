"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Experience, Language } from "@/types";
import { shouldAnimateOnScroll } from "@/utils/motion";
import { animateTimelineSection } from "@/utils/gsapAnimations";

interface ExperienceTimelineProps {
  items: Experience[];
  language: Language;
  title: string;
}

export default function ExperienceTimeline({
  items,
  language,
  title,
}: ExperienceTimelineProps) {
  var timelineRef = useRef<HTMLDivElement>(null);

  useEffect(function () {
    if (!timelineRef.current || !shouldAnimateOnScroll()) return;

    var ctx = gsap.context(function () {
      animateTimelineSection(
        timelineRef.current as Element,
        ".timeline-entry",
        ".timeline-line",
      );
    }, timelineRef);

    return function () {
      ctx.revert();
    };
  }, [language]);

  return (
    <div>
      <h3 className="text-xl font-bold text-foreground mb-6">{title}</h3>
      <div ref={timelineRef} className="relative pl-8">
        <div className="timeline-line absolute left-3 top-2 bottom-2 w-px bg-border origin-top" />
        <div className="space-y-6">
          {items.map(function (item) {
            var Icon = item.type === "education" ? GraduationCap : Briefcase;
            return (
              <div key={item.id} className="timeline-entry relative">
                <div className="absolute -left-8 top-5 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center">
                  <Icon className="w-3 h-3 text-accent" />
                </div>
                <div className="portfolio-card portfolio-card-hover p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/15 text-accent">
                      {item.badge[language]}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.date[language]}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-1">
                    {item.title[language]}
                  </h4>
                  <p className="text-sm text-accent mb-2">
                    {item.company[language]}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {item.description[language]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.stack.map(function (tech) {
                      return (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 rounded-md bg-background border border-border/60 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
