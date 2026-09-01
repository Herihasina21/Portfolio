'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import type { Language, Project } from '@/types'
import { getProjectCategoryLabel } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  language: Language
  isActive: boolean
  onClick: () => void
}

function ProjectImageFallback({
  title,
  technologies,
}: {
  title: string
  technologies: string[]
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-muted/40 via-card to-background p-6">
      <span className="mb-3 text-5xl font-bold text-muted-foreground/30">
        {title[0]}
      </span>
      <div className="flex flex-wrap justify-center gap-1.5">
        {technologies.slice(0, 3).map(function (tech) {
          return (
            <span
              key={tech}
              className="rounded-full border border-border/50 px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              {tech}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function ProjectCard({
  project,
  language,
  isActive,
  onClick,
}: ProjectCardProps) {
  var cardRef = useRef<HTMLButtonElement>(null)
  var [imgError, setImgError] = useState(false)
  var title = project.title[language]
  var showFallback = !project.image || imgError
  var categoryLabel = getProjectCategoryLabel(project, language)
  var visibleTechs = project.technologies.slice(0, 3)
  var extraTechCount = project.technologies.length - visibleTechs.length

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'project-carousel-card group w-full text-left transition-[transform,opacity,filter] duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)]',
        isActive
          ? 'scale-100 opacity-100 blur-0'
          : 'scale-[0.88] opacity-40 blur-[1.5px] sm:blur-[2px]',
      )}
    >
      <div
        className={cn(
          'overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow,background-color] duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)]',
          isActive
            ? 'border-border/70 shadow-2xl shadow-black/30 dark:border-white/10 dark:bg-[#11151c] dark:shadow-black/50'
            : 'border-border/25 dark:border-white/[0.06] dark:bg-[#0d1016]',
        )}
      >
        <div className="relative h-48 overflow-hidden bg-muted/20 sm:h-56">
          {!showFallback ? (
            <Image
              src={project.image}
              alt={title}
              fill
              sizes="(max-width: 640px) 88vw, 420px"
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              onError={function () {
                setImgError(true)
              }}
            />
          ) : (
            <ProjectImageFallback
              title={title}
              technologies={project.technologies}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent dark:from-[#11151c] dark:via-[#11151c]/10" />
        </div>

        <div className="space-y-3 p-5 sm:p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {categoryLabel}
          </p>

          <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground sm:text-xl">
            {title}
          </h3>

          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {project.description[language]}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {visibleTechs.map(function (tech) {
              return (
                <span
                  key={tech}
                  className="rounded-full border border-border/60 bg-transparent px-3 py-1 text-[11px] text-muted-foreground dark:border-white/12 dark:text-foreground/70"
                >
                  {tech}
                </span>
              )
            })}
            {extraTechCount > 0 && (
              <span className="rounded-full border border-border/60 bg-transparent px-3 py-1 text-[11px] text-muted-foreground dark:border-white/12 dark:text-foreground/70">
                +{extraTechCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}
