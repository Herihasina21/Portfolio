"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
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
        className="w-[min(94vw,58rem)] max-w-none gap-0 overflow-hidden border-border/40 bg-card/95 p-0 backdrop-blur-xl dark:border-white/10 dark:bg-card/95"
        showCloseButton={false}
      >
        <div
          ref={contentRef}
          className="project-modal-scroll max-h-[min(90vh,920px)] overflow-y-auto"
        >
          <div className="flex justify-end px-4 pb-1 pt-3 sm:px-6 sm:pt-4">
            <DialogClose className="flex h-7 w-7 items-center justify-center rounded-full border border-border/50 bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-muted focus:outline-none dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 [&_svg]:size-3.5">
              <X />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          {project.image && (
            <div className="relative px-6 pb-2 pt-6 sm:px-10 sm:pb-4 sm:pt-8">
              <div className="modal-hero project-image-frame relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title[language]}
                  fill
                  className="object-contain object-center p-2 sm:p-3"
                  sizes="(max-width: 768px) 94vw, 896px"
                />
                <div className="project-image-vignette pointer-events-none absolute inset-0 rounded-2xl" />
              </div>
            </div>
          )}

          <div className="px-6 pb-8 pt-5 sm:px-10 sm:pb-10 sm:pt-6">
            <p className="modal-animate mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {categoryLabel}
            </p>

            <DialogTitle className="modal-animate mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {project.title[language]}
            </DialogTitle>

            <p className="modal-animate mb-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description[language]}
            </p>

            <div className="modal-animate mb-8 grid gap-4 lg:grid-cols-2 lg:gap-6">
              <div className="rounded-2xl border border-border/35 bg-background/50 p-5 backdrop-blur-sm sm:p-6 dark:border-white/8 dark:bg-background/40">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {t("projects.problem")}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {problem}
                </p>
              </div>
              <div className="rounded-2xl border border-border/35 bg-background/50 p-5 backdrop-blur-sm sm:p-6 dark:border-white/8 dark:bg-background/40">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                  {t("projects.solution")}
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {solution}
                </p>
              </div>
            </div>

            <div className="modal-animate mb-8 rounded-2xl border border-border/35 bg-background/40 p-5 backdrop-blur-sm sm:p-6 dark:border-white/8 dark:bg-background/35">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                {t("projects.features")}
              </h4>
              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map(function (feature, index) {
                  return (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/80"
                        aria-hidden="true"
                      />
                      <span>{feature[language]}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="modal-animate flex flex-col gap-5 border-t border-border/35 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/8">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(function (tech) {
                  return (
                    <span
                      key={tech}
                      className="rounded-full border border-border/50 bg-background/60 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur-sm dark:border-white/12 dark:bg-background/50 dark:text-foreground/80"
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
