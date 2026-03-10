'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import gsap from 'gsap'
import Image from "next/image"

export default function Hero() {
  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  const { language, t } = useLanguage()

  useEffect(() => {
    // Animate heading with character stagger
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll('span')
      gsap.fromTo(
        chars,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power2.out',
        }
      )
    }

    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: 'power2.out',
        }
      )
    }

    // Animate buttons - simple fade in
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('button')
      gsap.fromTo(
        buttons,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          delay: 0.8,
          ease: 'power2.out',
        }
      )
    }
  }, [])

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-background" />

      {/* Content - Two Column Layout */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div ref={headingRef} className="inline-block fade-in-badge">
            <div className="px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md hover:bg-accent/15 transition-colors">
              <p className="text-sm font-semibold text-accent">
                {t("hero.badge")}
              </p>
            </div>
          </div>

          {/* Name - Split into two lines with accent color on second line */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            <div className="text-foreground">Herihasina Michael</div>
            <div className="text-accent bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
              Rakotoarivony
            </div>
          </h1>

          {/* Description */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-light"
          >
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a href="#contact">{t("hero.cta_secondary")}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 rounded-lg font-semibold hover:border-accent hover:text-accent transition-all duration-300"
            >
              <a href="#projects" className="flex items-center gap-2">
                {t("hero.cta_primary")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 pt-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Github />
            </a>

            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Linkedin />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail />
            </a>
          </div>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl blur-2xl" />

            {/* Image container */}
            <div className="relative bg-card/50 rounded-2xl overflow-hidden border border-border/50 h-full flex items-center justify-center">
              <Image
                src="/herihasina.png"
                alt="Herihasina"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
