'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import type { Language, Project } from '@/types'
import { animateCardHover } from '@/utils/filterAnimations'

interface ProjectCardProps {
  project: Project
  language: Language
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
    <div className="flex flex-col items-center justify-center h-full w-full bg-gradient-to-br from-accent/20 via-card to-background p-4 sm:p-6">
      <span className="text-4xl sm:text-5xl font-bold text-accent/40 mb-2 sm:mb-3">
        {title[0]}
      </span>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
        {technologies.slice(0, 3).map(function (tech) {
          return (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent/80"
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
  onClick,
}: ProjectCardProps) {
  var cardRef = useRef<HTMLButtonElement>(null)
  var [imgError, setImgError] = useState(false)
  var title = project.title[language]
  var showFallback = !project.image || imgError

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseEnter={function () {
        if (cardRef.current) animateCardHover(cardRef.current, true, -10, 1.02)
      }}
      onMouseLeave={function () {
        if (cardRef.current) animateCardHover(cardRef.current, false)
      }}
      className="project-card group portfolio-card text-left overflow-hidden w-full will-change-transform"
    >
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-card">
        {!showFallback ? (
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
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
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent pointer-events-none" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
          {project.description[language]}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.technologies.slice(0, 4).map(function (tech) {
            return (
              <span
                key={tech}
                className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-accent/10 text-accent border border-accent/10"
              >
                {tech}
              </span>
            )
          })}
        </div>
      </div>
    </button>
  )
}
