'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import { SOCIAL_LINKS } from '@/constants/social'
import { prefersReducedMotion } from '@/utils/motion'
import gsap from 'gsap'
import Image from 'next/image'

export default function Hero() {
  var sectionRef = useRef<HTMLElement>(null)
  var badgeRef = useRef<HTMLDivElement>(null)
  var nameRef = useRef<HTMLHeadingElement>(null)
  var subtitleRef = useRef<HTMLParagraphElement>(null)
  var buttonsRef = useRef<HTMLDivElement>(null)
  var socialRef = useRef<HTMLDivElement>(null)
  var imageWrapRef = useRef<HTMLDivElement>(null)
  var portraitRef = useRef<HTMLDivElement>(null)
  var glowRef = useRef<HTMLDivElement>(null)
  var bgGlowLeftRef = useRef<HTMLDivElement>(null)
  var bgGlowRightRef = useRef<HTMLDivElement>(null)
  var scrollIndicatorRef = useRef<HTMLAnchorElement>(null)

  var { t } = useLanguage()

  useEffect(function () {
    var reducedMotion = prefersReducedMotion()

    if (!sectionRef.current) {
      return
    }

    var ctx = gsap.context(function () {
      if (reducedMotion) {
        gsap.set(
          [
            badgeRef.current,
            subtitleRef.current,
            imageWrapRef.current,
            portraitRef.current,
            glowRef.current,
            bgGlowLeftRef.current,
            bgGlowRightRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, x: 0, y: 0, scale: 1 },
        )
        if (nameRef.current) {
          gsap.set(nameRef.current.querySelectorAll('.hero-char'), {
            opacity: 1,
            y: 0,
          })
        }
        if (buttonsRef.current) {
          gsap.set(buttonsRef.current.querySelectorAll('button, a'), {
            opacity: 1,
            y: 0,
          })
        }
        if (socialRef.current) {
          gsap.set(socialRef.current.querySelectorAll('a'), { opacity: 1, y: 0 })
        }
        return
      }

      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (bgGlowLeftRef.current && bgGlowRightRef.current) {
        tl.fromTo(
          [bgGlowLeftRef.current, bgGlowRightRef.current],
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 1.4, stagger: 0.15 },
          0,
        )
      }

      var isDesktop = window.innerWidth >= 768

      if (imageWrapRef.current) {
        tl.fromTo(
          imageWrapRef.current,
          isDesktop
            ? { opacity: 0, scale: 0.88, x: 56, y: 0 }
            : { opacity: 0, scale: 0.94, x: 0, y: -32 },
          { opacity: 1, scale: 1, x: 0, y: 0, duration: 1.1 },
          0.15,
        )
      }

      if (portraitRef.current) {
        tl.fromTo(
          portraitRef.current,
          { opacity: 0, scale: 0.92, rotate: -2 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.4)' },
          0.35,
        )
      }

      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.9 },
          0.45,
        )
      }

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          0.25,
        )
      }

      if (nameRef.current) {
        var chars = nameRef.current.querySelectorAll('.hero-char')
        tl.fromTo(
          chars,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.035 },
          0.35,
        )
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.7,
        )
      }

      if (buttonsRef.current) {
        var buttons = buttonsRef.current.querySelectorAll('button, a')
        tl.fromTo(
          buttons,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 },
          0.85,
        )
      }

      if (socialRef.current) {
        var icons = socialRef.current.querySelectorAll('a')
        tl.fromTo(
          icons,
          { opacity: 0, y: 12, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08 },
          1,
        )
      }

      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.15,
        )
      }

      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -10,
          duration: 3.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.4,
        })
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.18,
          opacity: 0.75,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.2,
        })
      }

      if (bgGlowLeftRef.current) {
        gsap.to(bgGlowLeftRef.current, {
          x: 18,
          y: -12,
          duration: 7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }

      if (bgGlowRightRef.current) {
        gsap.to(bgGlowRightRef.current, {
          x: -14,
          y: 16,
          duration: 8.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 0.5,
        })
      }

      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          y: 8,
          duration: 1.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.6,
        })
      }
    }, sectionRef)

    return function () {
      ctx.revert()
    }
  }, [])

  var splitText = function (text: string) {
    return text.split('').map(function (char, index) {
      return (
        <span key={index} className="hero-char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] w-full items-center overflow-hidden px-4 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8"
    >
      <div className="absolute inset-0 -z-20 bg-background" />
      <div
        ref={bgGlowLeftRef}
        className="absolute top-[20%] -left-20 -z-10 h-64 w-64 rounded-full bg-accent/8 blur-3xl dark:bg-accent/10"
      />
      <div
        ref={bgGlowRightRef}
        className="absolute bottom-[15%] right-[10%] -z-10 hidden h-72 w-72 rounded-full bg-accent/6 blur-3xl dark:bg-accent/8 md:block"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 sm:gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-2 space-y-5 text-center sm:space-y-6 md:order-1 md:max-w-xl md:text-left lg:max-w-none">
          <div ref={badgeRef} className="inline-block">
            <div className="rounded-full border border-accent/25 bg-accent/8 px-4 py-2 backdrop-blur-md transition-colors hover:bg-accent/12">
              <p className="text-sm font-semibold text-accent">
                {t('hero.badge')}
              </p>
            </div>
          </div>

          <h1
            ref={nameRef}
            className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.35rem]"
          >
            <div className="text-foreground">
              {splitText('Herihasina Michael')}
            </div>
            <div className="mt-1 text-accent">{splitText('Rakotoarivony')}</div>
          </h1>

          <p
            ref={subtitleRef}
            className="mx-auto max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0"
          >
            {t('hero.description')}
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col justify-center gap-3 pt-2 sm:flex-row sm:gap-4 md:justify-start"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full border border-accent/30 bg-accent/15 px-8 py-3 font-semibold text-accent shadow-none transition-all duration-300 hover:border-accent/50 hover:bg-accent/25"
            >
              <a href="#contact">{t('hero.cta_secondary')}</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-border/60 px-8 py-3 font-semibold transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <a href="#projects" className="flex items-center gap-2">
                {t('hero.cta_primary')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div
            ref={socialRef}
            className="flex justify-center gap-6 pt-1 md:justify-start"
          >
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              aria-label="Email"
              className="text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div
          ref={imageWrapRef}
          className="order-1 flex justify-center md:order-2 md:justify-end md:self-center"
        >
          <div className="hero-portrait-wrap relative aspect-square size-[min(72vw,260px)] sm:size-[min(68vw,300px)] md:size-[min(calc(100vh-9rem),420px)] lg:size-[min(calc(100vh-8rem),480px)] xl:size-[min(520px,calc(100vh-7.5rem))]">
            <div ref={glowRef} className="hero-portrait-glow" aria-hidden="true" />

            <div ref={portraitRef} className="relative h-full w-full will-change-transform">
              <Image
                src="/assets/herihasina.png"
                alt="Herihasina Michael Rakotoarivony"
                fill
                priority
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 360px, 440px"
                className="hero-portrait"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
