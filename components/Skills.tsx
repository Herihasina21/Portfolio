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
      className="relative section-divider px-4 py-16 sm:px-6 sm:py-24 lg:px-8 section-bg-patch-alt"
    >
      <div className="mx-auto max-w-7xl">
        <div className="skills-header">
          <SectionHeader
            title={t('skills.title')}
            subtitle={t('skills.subtitle')}
          />
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
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
