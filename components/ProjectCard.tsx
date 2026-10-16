'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import type { Language, Project } from '@/types'
import { getProjectCategoryLabel } from '@/data/projects'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  language: Language
  distance: number
  reducedMotion: boolean
  onClick: () => void
}

var CARD_SPRING = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 30,
  mass: 0.8,
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

function getCoverflowStyle(distance: number, reducedMotion: boolean) {
  var abs = Math.min(Math.abs(distance), 1.35)
  var side = distance === 0 ? 0 : distance > 0 ? 1 : -1

  if (reducedMotion) {
    return {
      scale: abs < 0.5 ? 1 : 0.94,
      opacity: abs < 0.5 ? 1 : 0.55,
      rotateY: 0,
      y: 0,
      filter: 'blur(0px)',
      zIndex: abs < 0.5 ? 10 : 1,
    }
  }

  // Motion Coverflow defaults adapted for portfolio cards:
  // neighbourScale ~0.82, neighbourOpacity ~0.45, subtle rotateY
  var scale = 1 - abs * 0.18
  var opacity = 1 - abs * 0.55
  var rotateY = side * Math.min(abs, 1) * -14
  var y = abs * 10
  var blur = abs * 1.6

  return {
    scale: Math.max(scale, 0.8),
    opacity: Math.max(opacity, 0.32),
    rotateY,
    y,
    filter: `blur(${blur}px)`,
    zIndex: Math.round(20 - abs * 10),
  }
}

export default function ProjectCard({
  project,
  language,
  distance,
  reducedMotion,
  onClick,
}: ProjectCardProps) {
  var [imgError, setImgError] = useState(false)
  var title = project.title[language]
  var showFallback = !project.image || imgError
  var categoryLabel = getProjectCategoryLabel(project, language)
  var visibleTechs = project.technologies.slice(0, 3)
  var extraTechCount = project.technologies.length - visibleTechs.length
  var isActive = Math.abs(distance) < 0.35
  var coverflow = getCoverflowStyle(distance, reducedMotion)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'true' : undefined}
      className="project-carousel-card group w-full text-left"
      style={{
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
        zIndex: coverflow.zIndex,
      }}
      animate={{
        scale: coverflow.scale,
        opacity: coverflow.opacity,
        rotateY: coverflow.rotateY,
        y: coverflow.y,
        filter: coverflow.filter,
      }}
      transition={reducedMotion ? { duration: 0 } : CARD_SPRING}
      whileHover={
        reducedMotion || !isActive
          ? undefined
          : { y: -4, transition: { type: 'spring', stiffness: 400, damping: 24 } }
      }
    >
      <div
        className={cn(
          'overflow-hidden rounded-2xl border bg-card transition-[border-color,box-shadow,background-color] duration-500',
          isActive
            ? 'border-border/70 shadow-2xl shadow-black/20 dark:border-white/10 dark:shadow-black/40'
            : 'border-border/25 dark:border-white/[0.06]',
        )}
      >
        <div className="relative h-52 overflow-hidden project-image-frame sm:h-64 lg:h-72">
          {!showFallback ? (
            <Image
              src={project.image}
              alt={title}
              fill
              sizes="(max-width: 640px) 92vw, 580px"
              className="object-contain object-center p-2 transition-transform duration-700 group-hover:scale-[1.02] sm:p-3"
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
          <div className="project-image-vignette pointer-events-none absolute inset-0" />
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
    </motion.button>
  )
}
