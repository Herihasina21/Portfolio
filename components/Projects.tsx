'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Filter, Globe, Monitor, Smartphone } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { projects } from '@/data/projects'
import type { Project } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import {
  animateGridIn,
  animateGridOut,
  animatePillClick,
} from '@/utils/filterAnimations'

gsap.registerPlugin(ScrollTrigger)

function filterByCategory(category: string): Project[] {
  if (category === 'all') return projects
  if (category === 'web') {
    return projects.filter(function (p) {
      return p.category === 'Web Development'
    })
  }
  if (category === 'desktop') {
    return projects.filter(function (p) {
      return p.category === 'Desktop'
    })
  }
  if (category === 'mobile') {
    return projects.filter(function (p) {
      return p.category === 'Mobile'
    })
  }
  return projects
}

export default function Projects() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var gridRef = useRef<HTMLDivElement>(null)
  var isFirstRender = useRef(true)
  var { t, language } = useLanguage()

  var categories = [
    { key: 'all', label: t('projects.all'), icon: Filter },
    { key: 'web', label: t('projects.web'), icon: Globe },
    { key: 'desktop', label: t('projects.desktop'), icon: Monitor },
    { key: 'mobile', label: t('projects.mobile'), icon: Smartphone },
  ]

  var [activeCategory, setActiveCategory] = useState('all')
  var [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  var [selectedProject, setSelectedProject] = useState<Project | null>(null)
  var [modalOpen, setModalOpen] = useState(false)
  var [isAnimating, setIsAnimating] = useState(false)

  useEffect(
    function () {
      setFilteredProjects(filterByCategory(activeCategory))
    },
    [activeCategory],
  )

  useEffect(
    function () {
      if (!gridRef.current) return

      if (isFirstRender.current) {
        isFirstRender.current = false
        requestAnimationFrame(function () {
          if (gridRef.current) {
            animateGridIn(gridRef.current, '.project-card')
          }
        })
        return
      }

      requestAnimationFrame(function () {
        if (gridRef.current) {
          animateGridIn(gridRef.current, '.project-card')
        }
      })
    },
    [filteredProjects],
  )

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return

    gsap.fromTo(
      sectionRef.current.querySelector('.projects-header'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      },
    )
  }, [])

  var handleCategoryChange = function (
    key: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (key === activeCategory || isAnimating) return

    animatePillClick(event.currentTarget)

    if (!gridRef.current) {
      setActiveCategory(key)
      return
    }

    setIsAnimating(true)
    animateGridOut(gridRef.current, '.project-card', function () {
      setActiveCategory(key)
      setIsAnimating(false)
    })
  }

  var handleProjectClick = function (project: Project) {
    setSelectedProject(project)
    setModalOpen(true)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 section-divider"
    >
      <div className="max-w-7xl mx-auto">
        <div className="projects-header">
          <SectionHeader
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-1">
          {categories.map(function (category) {
            var Icon = category.icon
            var isActive = activeCategory === category.key
            return (
              <button
                key={category.key}
                type="button"
                disabled={isAnimating}
                onClick={function (e) {
                  handleCategoryChange(category.key, e)
                }}
                className={`filter-pill text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 ${
                  isActive ? 'filter-pill-active' : 'filter-pill-inactive'
                } ${isAnimating ? 'opacity-80' : ''}`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {category.label}
              </button>
            )
          })}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredProjects.map(function (project) {
            return (
              <ProjectCard
                key={`${activeCategory}-${project.id}`}
                project={project}
                language={language}
                onClick={function () {
                  handleProjectClick(project)
                }}
              />
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('projects.no_projects')}</p>
          </div>
        )}
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
