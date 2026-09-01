'use client'

import { useRef } from 'react'
import { animateCardHover } from '@/utils/gsapAnimations'

interface SkillPillProps {
  name: string
  logo: string
  glow?: string
}

export default function SkillPill({
  name,
  logo,
  glow = '#8b9cb8',
}: SkillPillProps) {
  var pillRef = useRef<HTMLSpanElement>(null)

  return (
    <span
      ref={pillRef}
      onMouseEnter={function () {
        if (pillRef.current) animateCardHover(pillRef.current, true, -4, 1.06)
      }}
      onMouseLeave={function () {
        if (pillRef.current) animateCardHover(pillRef.current, false)
      }}
      className="skill-pill group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-border/50 bg-background/80 px-3 py-1.5 text-sm text-foreground dark:border-white/10 dark:bg-[#0a0c10]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at center, ${glow}35 0%, transparent 72%)`,
        }}
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute inset-0 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `${glow}20` }}
        aria-hidden="true"
      />
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="relative z-[1] h-4 w-4 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <span className="relative z-[1] whitespace-nowrap transition-colors duration-300 group-hover:text-foreground">
        {name}
      </span>
    </span>
  )
}
