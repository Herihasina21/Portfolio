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
    <article className="skill-category-card min-h-[11.5rem] rounded-2xl border border-border/50 bg-card/90 p-6 backdrop-blur-sm sm:min-h-[12.5rem] sm:p-7 lg:p-8 dark:border-white/[0.08] dark:bg-card/80">
      <header className="mb-6 flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground sm:text-xl">
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
