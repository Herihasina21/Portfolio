'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Calendar, Code, Globe, Layers } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ExperienceTimeline from './ExperienceTimeline'
import { experiences } from '@/data/experience'
import { statsData } from '@/data/stats'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import {
  animateCounter,
  revealOnScroll,
  revealSectionHeader,
} from '@/utils/gsapAnimations'

var statIcons = {
  calendar: Calendar,
  code: Code,
  layers: Layers,
  globe: Globe,
}

export default function About() {
  var sectionRef = useRef<HTMLDivElement>(null)
  var statsRef = useRef<HTMLDivElement>(null)
  var storyRef = useRef<HTMLDivElement>(null)
  var { t, language } = useLanguage()

  useEffect(function () {
    if (!sectionRef.current || !shouldAnimateOnScroll()) return

    var ctx = gsap.context(function () {
      revealSectionHeader(sectionRef.current as Element, '.about-header')

      if (statsRef.current) {
        revealOnScroll(statsRef.current, '.stat-card', {
          y: 32,
          stagger: 0.1,
          scale: 0.96,
        })

        statsRef.current.querySelectorAll('.stat-value').forEach(function (el) {
          var target = Number(el.getAttribute('data-value') ?? 0)
          animateCounter(el as HTMLElement, 0, target, 1.6)
        })
      }

      if (storyRef.current) {
        revealOnScroll(storyRef.current, '.story-item', {
          y: 26,
          stagger: 0.14,
        })
      }
    }, sectionRef)

    return function () {
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="snap-section relative py-16 sm:py-20 lg:py-24 section-divider section-blur-surface section-blur-about"
    >
      <div className="section-shell max-w-7xl">
        <div className="about-header">
          <SectionHeader
            titleMain={t('about.title_main')}
            titleAccent={t('about.title_accent')}
            subtitle={t('about.subtitle_short')}
          />
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {statsData.map(function (stat) {
            var Icon = statIcons[stat.icon as keyof typeof statIcons]
            return (
              <div
                key={stat.id}
                className="stat-card portfolio-card portfolio-card-hover p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">
                  <span className="stat-value" data-value={stat.value} suppressHydrationWarning>
                    {stat.value}
                  </span>
                  {stat.suffix}
                </p>
                <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
              </div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div ref={storyRef}>
            <h3 className="text-xl font-bold text-foreground mb-6">
              {t('about.story_title')}
            </h3>
            <div className="space-y-5">
              <p
                className="story-item text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.subtitle1') }}
              />
              <p
                className="story-item text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.subtitle2') }}
              />
              <p
                className="story-item text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t('about.subtitle3') }}
              />
            </div>
          </div>

          <ExperienceTimeline
            items={experiences}
            language={language}
            title={t('about.timeline_title')}
          />
        </div>
      </div>
    </section>
  )
}