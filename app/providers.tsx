'use client'

import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import SmoothScroll from '@/components/SmoothScroll'
import { Toaster } from '@/components/ui/toaster'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <LanguageProvider>
        <SmoothScroll />
        {children}
        <Toaster />
      </LanguageProvider>
    </ThemeProvider>
  )
}
