'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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

  useEffect(function () {
    var savedLang = localStorage.getItem('language') as Language | null
    if (savedLang === 'en' || savedLang === 'fr') {
      setLanguageState(savedLang)
    }
  }, [])

  var setLanguage = function (lang: Language) {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  var t = function (key: string): string {
    return translations[language]?.[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

const defaultTranslations = {
  en: translations.en,
  fr: translations.fr,
}

export function useLanguage() {
  var context = useContext(LanguageContext)

  if (!context) {
    return {
      language: 'en' as Language,
      setLanguage: function () {},
      t: function (key: string) {
        return defaultTranslations.en[key] ?? key
      },
    }
  }

  return context
}
