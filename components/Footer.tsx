'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  var currentYear = new Date().getFullYear()
  var { t } = useLanguage()

  return (
    <footer className="relative overflow-hidden border-t border-border/40 section-blur-surface">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Herihasina Michael Rakotoarivony. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
