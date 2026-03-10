'use client'

import { useState, useEffect } from 'react'

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        let visibleSection = ''

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id
          }
        })

        if (visibleSection) {
          setActiveSection(visibleSection)
        }
      },
      {
        threshold: 0.6
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return activeSection
}