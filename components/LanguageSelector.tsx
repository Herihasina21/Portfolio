'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Globe } from 'lucide-react'
import { useLanguage, type Language } from '@/context/LanguageContext'

var languages: Array<{
  code: Language
  label: string
  flag: string
}> = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

interface LanguageSelectorProps {
  className?: string
}

export default function LanguageSelector({ className = '' }: LanguageSelectorProps) {
  var [isOpen, setIsOpen] = useState(false)
  var containerRef = useRef<HTMLDivElement>(null)
  var { language, setLanguage } = useLanguage()

  var current = languages.find(function (lang) {
    return lang.code === language
  }) ?? languages[0]

  useEffect(function () {
    var handleClickOutside = function (event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return function () {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={function () {
          setIsOpen(!isOpen)
        }}
        className="flex items-center gap-2 h-9 px-3 rounded-full border border-border/60 bg-card/40 text-sm font-medium text-foreground hover:border-accent/40 hover:bg-card/70 transition-colors"
        aria-label="Changer la langue"
        aria-expanded={isOpen}
        suppressHydrationWarning
      >
        <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
        <span suppressHydrationWarning>{current.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-xl shadow-black/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {languages.map(function (lang) {
            var isSelected = language === lang.code
            return (
              <button
                key={lang.code}
                type="button"
                onClick={function () {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isSelected
                    ? 'bg-accent/10 text-foreground'
                    : 'text-muted-foreground hover:bg-card hover:text-foreground'
                }`}
              >
                <span className="text-base leading-none" aria-hidden="true">
                  {lang.flag}
                </span>
                <span className="flex-1 text-left font-medium">{lang.label}</span>
                {isSelected && <Check className="w-4 h-4 text-accent shrink-0" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
