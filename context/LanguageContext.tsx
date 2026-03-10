'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// load translations from JSON files placed at project root
import enTranslations from '../locales/en.json'
import frTranslations from '../locales/fr.json'

export type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: enTranslations,
  fr: frTranslations,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLang = localStorage.getItem('language') as Language | null
    if (savedLang) {
      setLanguageState(savedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  const t = (key: string): string => {
    return translations[language]?.[key] ?? key
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// fallback hook if provider unavailable
const defaultTranslations = {
  en: translations.en,
  fr: translations.fr,
}

export function useLanguage() {
  try {
    const context = useContext(LanguageContext)

    if (!context) {
      return {
        language: 'en' as Language,
        setLanguage: () => {},
        t: (key: string) => defaultTranslations.en[key] ?? key,
      }
    }
    return context
  } catch (error) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => defaultTranslations.en[key] ?? key,
    }
  }
}

