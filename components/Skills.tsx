'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import SectionHeader from './SectionHeader'
import SkillCategoryCard from './SkillCategoryCard'
import { skillCategories } from '@/data/skills'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import { revealOnScroll, revealSectionHeader } from '@/utils/gsapAnimations'

export default function Skills() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var gridRef = useRef<HTMLDivElement>(null)
  var { t } = useLanguage()

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return

    var ctx = gsap.context(function () {
      revealSectionHeader(sectionRef.current as Element, '.skills-header')

      if (gridRef.current) {
        revealOnScroll(gridRef.current, '.skill-category-card', {
          y: 32,
          stagger: 0.09,
          scale: 0.97,
        })
      }
    }, sectionRef)

    return function () {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="snap-section relative section-divider py-16 sm:py-20 lg:py-24 section-blur-surface section-blur-skills"
    >
      <div className="section-shell">
        <div className="skills-header">
          <SectionHeader
            titleMain={t('skills.title_main')}
            titleAccent={t('skills.title_accent')}
            subtitle={t('skills.subtitle')}
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {skillCategories.map(function (category) {
            return (
              <SkillCategoryCard
                key={category.id}
                title={t(category.labelKey)}
                items={category.items}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
