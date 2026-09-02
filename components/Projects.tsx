'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects } from '@/data/projects'
import type { Project } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import { revealSectionHeader } from '@/utils/gsapAnimations'

var CAROUSEL_DURATION = 1.05
var CAROUSEL_EASE = 'power4.inOut'

function buildExtendedProjects(items: Project[]) {
  if (items.length === 0) return []
  if (items.length === 1) return [items[0], items[0], items[0]]

  return [
    items[items.length - 1],
    ...items,
    items[0],
  ]
}

function getRealIndex(trackIndex: number, total: number) {
  if (total <= 1) return 0
  if (trackIndex === 0) return total - 1
  if (trackIndex === total + 1) return 0
  return trackIndex - 1
}

export default function Projects() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var trackRef = useRef<HTMLDivElement>(null)
  var viewportRef = useRef<HTMLDivElement>(null)
  var slideRefs = useRef<Array<HTMLDivElement | null>>([])
  var hasPositionedRef = useRef(false)
  var trackIndexRef = useRef(0)
  var isAnimatingRef = useRef(false)
  var skipAnimationRef = useRef(false)
  var { t, language } = useLanguage()

  var extendedProjects = useMemo(function () {
    return buildExtendedProjects(projects)
  }, [])

  var initialTrackIndex = Math.floor(projects.length / 2) + 1

  var [trackIndex, setTrackIndex] = useState(initialTrackIndex)
  var [selectedProject, setSelectedProject] = useState<Project | null>(null)
  var [modalOpen, setModalOpen] = useState(false)

  trackIndexRef.current = trackIndex

  var activeIndex = getRealIndex(trackIndex, projects.length)

  var getSlideOffset = useCallback(function (index: number) {
    var viewport = viewportRef.current
    var slide = slideRefs.current[index]
    if (!viewport || !slide) return 0

    return slide.offsetLeft - viewport.clientWidth / 2 + slide.clientWidth / 2
  }, [])

  var moveToTrackIndex = useCallback(
    function (index: number, animate: boolean, onComplete?: () => void) {
      var track = trackRef.current
      if (!track) return

      var offset = getSlideOffset(index)

      gsap.killTweensOf(track)

      if (animate && hasPositionedRef.current) {
        isAnimatingRef.current = true
        gsap.to(track, {
          x: -offset,
          duration: CAROUSEL_DURATION,
          ease: CAROUSEL_EASE,
          overwrite: true,
          onComplete: function () {
            isAnimatingRef.current = false
            if (onComplete) onComplete()
          },
        })
      } else {
        gsap.set(track, { x: -offset })
        hasPositionedRef.current = true
        if (onComplete) onComplete()
      }
    },
    [getSlideOffset],
  )

  useLayoutEffect(
    function () {
      slideRefs.current = slideRefs.current.slice(0, extendedProjects.length)

      requestAnimationFrame(function () {
        var shouldAnimate =
          hasPositionedRef.current && !skipAnimationRef.current
        skipAnimationRef.current = false

        moveToTrackIndex(trackIndexRef.current, shouldAnimate, function () {
          var total = projects.length
          if (total <= 1) return

          var current = trackIndexRef.current
          if (current === 0) {
            skipAnimationRef.current = true
            setTrackIndex(total)
          } else if (current === total + 1) {
            skipAnimationRef.current = true
            setTrackIndex(1)
          }
        })
      })
    },
    [trackIndex, moveToTrackIndex, extendedProjects.length],
  )

  useEffect(function () {
    function handleResize() {
      moveToTrackIndex(trackIndexRef.current, false)
    }

    window.addEventListener('resize', handleResize)
    return function () {
      window.removeEventListener('resize', handleResize)
    }
  }, [moveToTrackIndex])

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return

    revealSectionHeader(sectionRef.current, '.projects-header')
  }, [])

  var goToSlide = function (realIndex: number) {
    if (projects.length === 0 || isAnimatingRef.current) return
    var nextTrackIndex = realIndex + 1
    if (nextTrackIndex === trackIndexRef.current) return

    setTrackIndex(nextTrackIndex)
  }

  var handlePrev = function () {
    if (isAnimatingRef.current || projects.length === 0) return
    setTrackIndex(trackIndexRef.current - 1)
  }

  var handleNext = function () {
    if (isAnimatingRef.current || projects.length === 0) return
    setTrackIndex(trackIndexRef.current + 1)
  }

  var handleProjectClick = function (project: Project, realIndex: number) {
    setTrackIndex(realIndex + 1)
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="snap-section relative section-divider py-16 sm:py-20 lg:py-24 section-blur-surface section-blur-projects"
    >
      <div className="section-shell">
        <div className="projects-header">
          <SectionHeader
            titleMain={t('projects.title_main')}
            titleAccent={t('projects.title_accent')}
            subtitle={t('projects.subtitle')}
          />
        </div>

        <div
          ref={viewportRef}
          className="projects-carousel-viewport relative overflow-hidden py-2"
        >
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 lg:gap-10 will-change-transform"
          >
            {extendedProjects.map(function (project, index) {
              var realIndex = getRealIndex(index, projects.length)
              var isClone =
                index === 0 || index === extendedProjects.length - 1

              return (
                <div
                  key={`${project.id}-${index}`}
                  ref={function (el) {
                    slideRefs.current[index] = el
                  }}
                  className="w-[min(92vw,520px)] shrink-0 sm:w-[520px] lg:w-[580px]"
                  aria-hidden={isClone && index !== trackIndex}
                >
                  <ProjectCard
                    project={project}
                    language={language}
                    isActive={index === trackIndex}
                    onClick={function () {
                      if (isAnimatingRef.current) return
                      handleProjectClick(project, realIndex)
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
            aria-label={t('projects.prev')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-card"
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
                  className={`h-2 rounded-full transition-all duration-500 ease-out ${
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
            aria-label={t('projects.next')}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground backdrop-blur-sm transition-all hover:border-foreground/30 hover:bg-card"
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
