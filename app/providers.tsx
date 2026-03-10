'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
