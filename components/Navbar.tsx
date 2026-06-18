'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Menu, X, Moon, Sun, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSelector from '@/components/LanguageSelector'
import { useLanguage } from '@/context/LanguageContext'
import { useActiveSection } from '@/hooks/useActiveSection'

export default function Navbar() {
  var [isOpen, setIsOpen] = useState(false)
  var [isScrolled, setIsScrolled] = useState(false)
  var { theme, setTheme } = useTheme()
  var activeSection = useActiveSection()
  var { t } = useLanguage()

  useEffect(function () {
    var onScroll = function () {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return function () {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  var navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ]

  var isDark = theme !== 'light'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-xl border-border shadow-lg shadow-black/10'
          : 'bg-background/70 backdrop-blur-md border-border/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="#home" className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
              <span className="text-accent font-bold text-xs sm:text-sm">HM</span>
            </div>
            <span className="hidden sm:block font-semibold text-foreground truncate group-hover:text-accent transition-colors text-sm sm:text-base">
              Herihasina Michael
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(function (link) {
              var sectionId = link.href.substring(1)
              var isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                    isActive
                      ? 'text-foreground bg-card/80'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
                  )}
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={function () {
                setTheme(isDark ? 'light' : 'dark')
              }}
              className="hover:bg-card/80 rounded-full h-8 w-8 sm:h-9 sm:w-9"
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              <Sun
                className={`w-4 h-4 ${isDark ? 'block' : 'hidden'}`}
                suppressHydrationWarning
              />
              <Moon
                className={`w-4 h-4 ${isDark ? 'hidden' : 'block'}`}
                suppressHydrationWarning
              />
            </Button>

            <LanguageSelector className="hidden sm:block" />

            <a href="/cv.pdf" download className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full gap-2 border-border/60 hover:border-accent/40 text-xs sm:text-sm h-8 sm:h-9"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">{t('nav.download_cv')}</span>
                <span className="lg:hidden">CV</span>
              </Button>
            </a>

            <button
              type="button"
              className="lg:hidden p-2 hover:bg-card/80 rounded-lg transition-colors"
              onClick={function () {
                setIsOpen(!isOpen)
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navLinks.map(function (link) {
                var sectionId = link.href.substring(1)
                var isActive = activeSection === sectionId
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-card/80 hover:text-foreground'
                    }`}
                    onClick={function () {
                      setIsOpen(false)
                    }}
                  >
                    {link.label}
                  </a>
                )
              })}

              <div className="px-3 py-3 sm:hidden">
                <LanguageSelector />
              </div>

              <a href="/cv.pdf" download className="block px-3 py-2.5 mt-1 md:hidden">
                <Button variant="outline" className="w-full rounded-xl gap-2">
                  <Download className="w-4 h-4" />
                  {t('nav.download_cv')}
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
