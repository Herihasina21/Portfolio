"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Language, Project } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { prefersReducedMotion } from "@/utils/motion";

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
        var items = contentRef.current?.querySelectorAll(".modal-animate");
        if (!items) return;

        gsap.fromTo(
          items,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
        );
      }, contentRef);

      return function () {
        ctx.revert();
      };
    },
    [open, project],
  );

  if (!project) return null;

  var overview = project.overview?.[language] ?? project.description[language];
  var challenges =
    project.challenges?.[language] ??
    (language === "fr"
      ? "Concevoir une solution performante, maintenable et adaptée aux besoins réels des utilisateurs."
      : "Designing a performant, maintainable solution tailored to real user needs.");
  var role =
    project.role?.[language] ??
    (language === "fr"
      ? "Développeur Fullstack — conception, développement et déploiement."
      : "Fullstack Developer — design, development, and deployment.");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border/60 p-0 gap-0 sm:max-w-4xl"
        showCloseButton
      >
        <div ref={contentRef} className="p-6 sm:p-8">
          <DialogTitle className="modal-animate text-2xl font-bold mb-4 pr-8">
            {project.title[language]}
          </DialogTitle>

          <div className="modal-animate flex flex-wrap gap-2 mb-6">
            {project.technologies.map(function (tech) {
              return (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-full bg-accent/15 text-accent font-medium"
                >
                  {tech}
                </span>
              );
            })}
          </div>

          <div className="modal-animate grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {project.image && (
                <div className="relative rounded-xl overflow-hidden border border-border/60 aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title[language]}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ExternalLink className="w-4 h-4" />
                    {t("projects.demo")}
                  </Button>
                </a>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="gap-2">
                      <Github className="w-4 h-4" />
                      {t("projects.code")}
                    </Button>
                  </a>
                )}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {t("projects.stack")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(function (tech) {
                    return (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-background border border-border/60 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="modal-animate">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {t("projects.overview")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {overview}
                </p>
              </div>
              <div className="modal-animate">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {t("projects.challenges")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {challenges}
                </p>
              </div>
              <div className="modal-animate">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {t("projects.role")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
