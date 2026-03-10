'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return

      const elements = contentRef.current.querySelectorAll('.fade-in-item')
      
      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 30%',
              scrub: false,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const highlights = [
    t('about.highlight.1'),
    t('about.highlight.2'),
    t('about.highlight.3'),
    t('about.highlight.4'),
    t('about.highlight.5'),
    t('about.highlight.6'),
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-card/50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("about.title")}
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
        </div>

        <div ref={contentRef} className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="space-y-6">
            <div className="fade-in-item">
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("about.subtitle1") }}
              />
            </div>

            <div className="fade-in-item">
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("about.subtitle2") }}
              />
            </div>

            <div className="fade-in-item">
              <p
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("about.subtitle3") }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
