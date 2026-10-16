'use client'

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects } from '@/data/projects'
import type { Project } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import { revealSectionHeader } from '@/utils/gsapAnimations'

var SWIPE_THRESHOLD = 56
var SWIPE_VELOCITY = 420

var SPRING = {
  type: 'spring' as const,
  stiffness: 280,
  damping: 32,
  mass: 0.85,
}

var SNAP_EASE = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 38,
  mass: 0.7,
}

function buildExtendedProjects(items: Project[]) {
  if (items.length === 0) return []
  if (items.length === 1) return [items[0], items[0], items[0]]

  return [items[items.length - 1], ...items, items[0]]
}

function getRealIndex(trackIndex: number, total: number) {
  if (total <= 1) return 0
  if (trackIndex === 0) return total - 1
  if (trackIndex === total + 1) return 0
  return trackIndex - 1
}

export default function Projects() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var viewportRef = useRef<HTMLDivElement>(null)
  var slideRefs = useRef<Array<HTMLDivElement | null>>([])
  var hasPositionedRef = useRef(false)
  var trackIndexRef = useRef(0)
  var isAnimatingRef = useRef(false)
  var skipAnimationRef = useRef(false)
  var animationControlsRef = useRef<{ stop: () => void } | null>(null)

  var x = useMotionValue(0)
  var prefersReduced = useReducedMotion()
  var { t, language } = useLanguage()

  var extendedProjects = useMemo(function () {
    return buildExtendedProjects(projects)
  }, [])

  var initialTrackIndex = Math.floor(projects.length / 2) + 1

  var [trackIndex, setTrackIndex] = useState(initialTrackIndex)
  var [selectedProject, setSelectedProject] = useState<Project | null>(null)
  var [modalOpen, setModalOpen] = useState(false)
  var didDragRef = useRef(false)

  trackIndexRef.current = trackIndex

  var activeIndex = getRealIndex(trackIndex, projects.length)

  var getSlideOffset = useCallback(function (index: number) {
    var viewport = viewportRef.current
    var slide = slideRefs.current[index]
    if (!viewport || !slide) return 0

    return slide.offsetLeft - viewport.clientWidth / 2 + slide.clientWidth / 2
  }, [])

  var moveToTrackIndex = useCallback(
    function (index: number, withAnimation: boolean, onComplete?: () => void) {
      var offset = getSlideOffset(index)

      if (animationControlsRef.current) {
        animationControlsRef.current.stop()
        animationControlsRef.current = null
      }

      if (withAnimation && hasPositionedRef.current && !prefersReduced) {
        isAnimatingRef.current = true
        var controls = animate(x, -offset, {
          ...SPRING,
          onComplete: function () {
            isAnimatingRef.current = false
            animationControlsRef.current = null
            if (onComplete) onComplete()
          },
        })
        animationControlsRef.current = controls
      } else {
        x.set(-offset)
        hasPositionedRef.current = true
        isAnimatingRef.current = false
        if (onComplete) onComplete()
      }
    },
    [getSlideOffset, prefersReduced, x],
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

  useEffect(function () {
    return function () {
      if (animationControlsRef.current) {
        animationControlsRef.current.stop()
      }
    }
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
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }

    setSelectedProject(project)
    setModalOpen(true)

    if (getRealIndex(trackIndexRef.current, projects.length) !== realIndex) {
      setTrackIndex(realIndex + 1)
    }
  }

  var handleDragStart = function () {
    if (animationControlsRef.current) {
      animationControlsRef.current.stop()
      animationControlsRef.current = null
    }
    isAnimatingRef.current = false
    didDragRef.current = false
  }

  var handleDrag = function (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) {
    if (Math.abs(info.offset.x) > 8) {
      didDragRef.current = true
    }
  }

  var handleDragEnd = function (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) {
    var shouldAdvance =
      Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY

    if (!shouldAdvance) {
      moveToTrackIndex(trackIndexRef.current, true)
      return
    }

    if (info.offset.x < 0 || info.velocity.x < -SWIPE_VELOCITY) {
      handleNext()
    } else {
      handlePrev()
    }
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
          className="projects-carousel-viewport relative overflow-hidden py-4 touch-pan-y"
        >
          <motion.div
            className="flex cursor-grab items-center gap-6 will-change-transform active:cursor-grabbing sm:gap-8 lg:gap-10"
            style={{ x }}
            drag={projects.length > 1 ? 'x' : false}
            dragConstraints={{ left: -99999, right: 99999 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
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
                    distance={index - trackIndex}
                    reducedMotion={!!prefersReduced}
                    onClick={function () {
                      handleProjectClick(project, realIndex)
                    }}
                  />
                </div>
              )
            })}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 sm:mt-10">
          <motion.button
            type="button"
            onClick={handlePrev}
            aria-label={t('projects.prev')}
            whileHover={prefersReduced ? undefined : { scale: 1.06 }}
            whileTap={prefersReduced ? undefined : { scale: 0.94 }}
            transition={SNAP_EASE}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground backdrop-blur-sm transition-colors hover:border-foreground/30 hover:bg-card"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            {projects.map(function (_, index) {
              var isActive = index === activeIndex

              return (
                <button
                  key={index}
                  type="button"
                  onClick={function () {
                    goToSlide(index)
                  }}
                  aria-label={`${t('projects.go_to')} ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="relative flex h-2 items-center justify-center"
                >
                  <motion.span
                    className={`block h-2 rounded-full ${
                      isActive
                        ? 'bg-foreground'
                        : 'bg-muted-foreground/35 hover:bg-muted-foreground/60'
                    }`}
                    animate={{ width: isActive ? 28 : 8 }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 400, damping: 28 }
                    }
                  />
                </button>
              )
            })}
          </div>

          <motion.button
            type="button"
            onClick={handleNext}
            aria-label={t('projects.next')}
            whileHover={prefersReduced ? undefined : { scale: 1.06 }}
            whileTap={prefersReduced ? undefined : { scale: 0.94 }}
            transition={SNAP_EASE}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-foreground backdrop-blur-sm transition-colors hover:border-foreground/30 hover:bg-card"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
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
