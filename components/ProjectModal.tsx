"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Language, Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import {
  getProjectCategoryLabel,
  hasLiveProjectLink,
} from "@/data/projects";
import { prefersReducedMotion } from "@/utils/motion";
import { animateModalIn } from "@/utils/gsapAnimations";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
}

export default function ProjectModal({
  project,
  open,
  onOpenChange,
  language,
}: ProjectModalProps) {
  var contentRef = useRef<HTMLDivElement>(null);
  var { t } = useLanguage();

  useEffect(
    function () {
      if (!open || !contentRef.current || prefersReducedMotion()) return;

      var ctx = gsap.context(function () {
        animateModalIn(contentRef.current as HTMLElement);
      }, contentRef);

      return function () {
        ctx.revert();
      };
    },
    [open, project],
  );

  if (!project) return null;

  var categoryLabel = getProjectCategoryLabel(project, language);
  var showLiveLink = hasLiveProjectLink(project.link);
  var problem =
    project.problem?.[language] ??
    project.challenges?.[language] ??
    (language === "fr"
      ? "Répondre à un besoin concret avec une solution fiable et évolutive."
      : "Address a concrete need with a reliable, scalable solution.");
  var solution =
    project.solution?.[language] ??
    project.overview?.[language] ??
    project.description[language];
  var features =
    project.features ??
    project.technologies.map(function (tech) {
      return { en: tech, fr: tech };
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[92vh] gap-0 overflow-y-auto border-border/40 bg-card p-0 sm:max-w-3xl dark:border-white/10 dark:bg-[#11151c]"
        showCloseButton
      >
        <div ref={contentRef}>
          {project.image && (
            <div className="modal-hero relative aspect-[16/10] w-full overflow-hidden bg-muted/20">
              <Image
                src={project.image}
                alt={project.title[language]}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent dark:from-[#11151c]" />
            </div>
          )}

          <div className="px-6 pb-8 pt-6 sm:px-9 sm:pb-10 sm:pt-8">
            <p className="modal-animate mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {categoryLabel}
            </p>

            <DialogTitle className="modal-animate mb-4 pr-10 text-2xl font-bold leading-tight text-foreground sm:text-[1.75rem]">
              {project.title[language]}
            </DialogTitle>

            <p className="modal-animate mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              {project.description[language]}
            </p>

            <div className="modal-animate mb-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t("projects.problem")}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {problem}
                </p>
              </div>
              <div>
                <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {t("projects.solution")}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {solution}
                </p>
              </div>
            </div>

            <ul className="modal-animate mb-10 space-y-2.5">
              {features.map(function (feature, index) {
                return (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-foreground/50"
                      aria-hidden="true"
                    />
                    <span>{feature[language]}</span>
                  </li>
                );
              })}
            </ul>

            <div className="modal-animate flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(function (tech) {
                  return (
                    <span
                      key={tech}
                      className="rounded-full border border-border/60 px-3.5 py-1.5 text-xs text-muted-foreground dark:border-white/12 dark:text-foreground/75"
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>

              {showLiveLink && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {t("projects.view")}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
