'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Menu, X, Moon, Sun, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/LanguageContext'
import { useActiveSection } from '@/hooks/useActiveSection'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const activeSection = useActiveSection()
  
  const { language, setLanguage, t } = useLanguage()

  const [showLangMenu, setShowLangMenu] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#contact', label: t('nav.contact') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">H.</span>
            </div>
            <span className="hidden sm:block font-bold text-foreground group-hover:text-accent transition-colors">
              {t('nav.name')}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1)
              const isActive = activeSection === sectionId
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-accent font-semibold'
                      : 'text-foreground hover:text-accent'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Theme Toggle & Language & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {mounted && (
              <>
                {/* Language Switcher */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="hover:bg-accent/10"
                    title="Change language"
                  >
                    <Globe className="w-5 h-5" />
                  </Button>
                  {showLangMenu && (
                    <div className="absolute right-0 mt-2 w-24 bg-card border border-border rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => {
                          setLanguage('en')
                          setShowLangMenu(false)
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-accent/10 transition-colors ${
                          language === 'en' ? 'text-accent font-semibold' : 'text-foreground'
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage('fr')
                          setShowLangMenu(false)
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-accent/10 transition-colors border-t border-border ${
                          language === 'fr' ? 'text-accent font-semibold' : 'text-foreground'
                        }`}
                      >
                        Français
                      </button>
                    </div>
                  )}
                </div>

                {/* Theme Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="hover:bg-accent/10"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const sectionId = link.href.substring(1)
                const isActive = activeSection === sectionId
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      isActive
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'text-foreground hover:bg-accent/10 hover:text-accent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
