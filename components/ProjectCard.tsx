'use client'

import { Project, Language } from "@/types";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: Project;
  language: Language;
}

export default function ProjectCard({ project, language }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <div className="project-card group rounded-xl overflow-hidden border border-border hover:border-accent/50 bg-background transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent/5 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300" />
        <div className="text-center relative z-10">
          <div className="text-4xl font-bold text-accent/30 group-hover:text-accent/50 transition-colors">
            {project.title[language][0]}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          {project.title[language]}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description[language]}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs gap-1"
            >
              <ExternalLink className="w-3 h-3" /> {t("projects.view")}
            </Button>
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs gap-1"
              >
                <Github className="w-3 h-3" /> Code
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
