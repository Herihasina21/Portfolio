'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Palette, Server, Wrench } from 'lucide-react'
import SectionHeader from './SectionHeader'
import TechSkillCard from './TechSkillCard'
import { skillTabs } from '@/data/skills'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import {
  animateGridIn,
  animateGridOut,
  animatePillClick,
} from '@/utils/filterAnimations'

gsap.registerPlugin(ScrollTrigger)

var tabIcons = {
  code: Code,
  server: Server,
  wrench: Wrench,
  palette: Palette,
}

export default function Skills() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var gridRef = useRef<HTMLDivElement>(null)
  var isFirstRender = useRef(true)
  var [activeTab, setActiveTab] = useState(skillTabs[0].id)
  var [isAnimating, setIsAnimating] = useState(false)
  var { t } = useLanguage()

  var currentTab = skillTabs.find(function (tab) {
    return tab.id === activeTab
  }) ?? skillTabs[0]

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return

    gsap.fromTo(
      sectionRef.current.querySelector('.skills-header'),
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

  useEffect(
    function () {
      if (!gridRef.current) return

      if (isFirstRender.current) {
        isFirstRender.current = false
        requestAnimationFrame(function () {
          if (gridRef.current) {
            animateGridIn(gridRef.current, '.tech-skill-card')
          }
        })
        return
      }

      requestAnimationFrame(function () {
        if (gridRef.current) {
          animateGridIn(gridRef.current, '.tech-skill-card')
        }
      })
    },
    [activeTab],
  )

  var handleTabChange = function (
    tabId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    if (tabId === activeTab || isAnimating) return

    animatePillClick(event.currentTarget)

    if (!gridRef.current) {
      setActiveTab(tabId)
      return
    }

    setIsAnimating(true)
    animateGridOut(gridRef.current, '.tech-skill-card', function () {
      setActiveTab(tabId)
      setIsAnimating(false)
    })
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-card/30 section-divider"
    >
      <div className="max-w-7xl mx-auto">
        <div className="skills-header">
          <SectionHeader
            title={t('skills.title')}
            subtitle={t('skills.subtitle')}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-1">
          {skillTabs.map(function (tab) {
            var Icon = tabIcons[tab.icon as keyof typeof tabIcons]
            var isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                disabled={isAnimating}
                onClick={function (e) {
                  handleTabChange(tab.id, e)
                }}
                className={`filter-pill text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 ${
                  isActive ? 'filter-pill-active' : 'filter-pill-inactive'
                } ${isAnimating ? 'opacity-80' : ''}`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {t(tab.labelKey)}
              </button>
            )
          })}
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3"
        >
          {currentTab.items.map(function (skill) {
            return (
              <TechSkillCard
                key={`${activeTab}-${skill.name}`}
                name={skill.name}
                logo={skill.logo}
                glow={skill.glow}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
