'use client'

import SkillPill from './SkillPill'
import type { Skill } from '@/data/skills'

interface SkillCategoryCardProps {
  title: string
  items: Skill[]
}

function formatCount(count: number): string {
  return count < 10 ? '0' + count : String(count)
}

export default function SkillCategoryCard({
  title,
  items,
}: SkillCategoryCardProps) {
  return (
    <article className="skill-category-card rounded-2xl border border-border/50 bg-card p-5 sm:p-6 dark:border-white/[0.08] dark:bg-[#11151c]">
      <header className="mb-5 flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          {title}
        </h3>
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {formatCount(items.length)}
        </span>
      </header>

      <div className="flex flex-wrap gap-2">
        {items.map(function (skill) {
          return (
            <SkillPill
              key={skill.name}
              name={skill.name}
              logo={skill.logo}
              glow={skill.glow}
            />
          )
        })}
      </div>
    </article>
  )
}
