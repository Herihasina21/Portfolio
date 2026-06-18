"use client";

import { useRef } from "react";
import { animateCardHover } from "@/utils/filterAnimations";

interface TechSkillCardProps {
  name: string;
  logo: string;
  glow?: string;
}

export default function TechSkillCard({
  name,
  logo,
  glow = "#8b9cb8",
}: TechSkillCardProps) {
  var cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onMouseEnter={function () {
        if (cardRef.current) animateCardHover(cardRef.current, true, -5, 1.06);
      }}
      onMouseLeave={function () {
        if (cardRef.current) animateCardHover(cardRef.current, false);
      }}
      className="tech-skill-card group portfolio-card p-3 sm:p-4 flex flex-col items-center justify-center gap-1.5 sm:gap-2 cursor-pointer relative overflow-hidden min-h-[76px] sm:min-h-[88px]"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glow}40 0%, transparent 72%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 blur-xl pointer-events-none"
        style={{ background: `${glow}18` }}
      />
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
        <img
          src={logo}
          alt={name}
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <span className="relative text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
        {name}
      </span>
    </div>
  );
}
