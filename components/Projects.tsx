'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects } from '@/data/projects'
import type { Project } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll, MOTION_EASE_IN_OUT } from '@/utils/motion'
import { revealSectionHeader } from '@/utils/gsapAnimations'

var INITIAL_PROJECT_INDEX = Math.floor(projects.length / 2)
var CAROUSEL_DURATION = 0.85

export default function Projects() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var trackRef = useRef<HTMLDivElement>(null)
  var viewportRef = useRef<HTMLDivElement>(null)
  var slideRefs = useRef<Array<HTMLDivElement | null>>([])
  var hasPositionedRef = useRef(false)
  var { t, language } = useLanguage()

  var [activeIndex, setActiveIndex] = useState(INITIAL_PROJECT_INDEX)
  var [selectedProject, setSelectedProject] = useState<Project | null>(null)
  var [modalOpen, setModalOpen] = useState(false)

  var centerActiveSlide = useCallback(function (animate: boolean) {
    var track = trackRef.current
    var viewport = viewportRef.current
    var slide = slideRefs.current[activeIndex]
    if (!track || !viewport || !slide) return

    var offset =
      slide.offsetLeft - viewport.clientWidth / 2 + slide.clientWidth / 2

    gsap.killTweensOf(track)

    if (animate && hasPositionedRef.current) {
      gsap.to(track, {
        x: -offset,
        duration: CAROUSEL_DURATION,
        ease: MOTION_EASE_IN_OUT,
        overwrite: true,
      })
    } else {
      gsap.set(track, { x: -offset })
      hasPositionedRef.current = true
    }
  }, [activeIndex])

  useLayoutEffect(
    function () {
      slideRefs.current = slideRefs.current.slice(0, projects.length)

      requestAnimationFrame(function () {
        centerActiveSlide(hasPositionedRef.current)
      })
    },
    [activeIndex, centerActiveSlide],
  )

  useEffect(function () {
    function handleResize() {
      centerActiveSlide(false)
    }

    window.addEventListener('resize', handleResize)
    return function () {
      window.removeEventListener('resize', handleResize)
    }
  }, [centerActiveSlide])

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return

    revealSectionHeader(sectionRef.current, '.projects-header')
  }, [])

  var goToSlide = function (index: number) {
    if (index < 0 || index >= projects.length) return
    setActiveIndex(index)
  }

  var handlePrev = function () {
    goToSlide(activeIndex - 1)
  }

  var handleNext = function () {
    goToSlide(activeIndex + 1)
  }

  var handleProjectClick = function (project: Project, index: number) {
    setActiveIndex(index)
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative section-divider px-4 py-16 sm:px-6 sm:py-24 lg:px-8 section-bg-band"
    >
      <div className="mx-auto max-w-7xl">
        <div className="projects-header">
          <SectionHeader
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
          />
        </div>

        <div
          ref={viewportRef}
          className="projects-carousel-viewport relative overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex items-center gap-5 sm:gap-7 will-change-transform"
          >
            {projects.map(function (project, index) {
              return (
                <div
                  key={project.id}
                  ref={function (el) {
                    slideRefs.current[index] = el
                  }}
                  className="w-[min(88vw,420px)] shrink-0 sm:w-[420px]"
                >
                  <ProjectCard
                    project={project}
                    language={language}
                    isActive={index === activeIndex}
                    onClick={function () {
                      handleProjectClick(project, index)
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label={t('projects.prev')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-card disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {projects.map(function (_, index) {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={function () {
                    goToSlide(index)
                  }}
                  aria-label={`${t('projects.go_to')} ${index + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-7 bg-foreground'
                      : 'w-2 bg-muted-foreground/35 hover:bg-muted-foreground/60'
                  }`}
                />
              )
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeIndex === projects.length - 1}
            aria-label={t('projects.next')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-card disabled:cursor-not-allowed disabled:opacity-25"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
        language={language}
      />
    </section>
  )
}
