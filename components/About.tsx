'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Code, Globe, Layers } from 'lucide-react'
import SectionHeader from './SectionHeader'
import ExperienceTimeline from './ExperienceTimeline'
import { experiences } from '@/data/experience'
import { statsData } from '@/data/stats'
import { useLanguage } from '@/context/LanguageContext'
import { shouldAnimateOnScroll } from '@/utils/motion'
import { animateCounter } from '@/utils/gsapAnimations'

gsap.registerPlugin(ScrollTrigger)

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
    if (!shouldAnimateOnScroll()) return

    var ctx = gsap.context(function () {
      if (statsRef.current) {
        var cards = statsRef.current.querySelectorAll('.stat-card')
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          },
        )

        statsRef.current.querySelectorAll('.stat-value').forEach(function (el) {
          var target = Number(el.getAttribute('data-value') ?? 0)
          animateCounter(el as HTMLElement, 0, target, 1.5)
        })
      }

      if (storyRef.current) {
        var paragraphs = storyRef.current.querySelectorAll('.story-item')
        gsap.fromTo(
          paragraphs,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 75%',
            },
          },
        )
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
      className="relative py-24 px-4 sm:px-6 lg:px-8 pb-32"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title={t('about.title')}
          subtitle={t('about.subtitle_short')}
        />

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
