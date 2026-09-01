'use client'

import { useState, useEffect } from 'react'

export function useActiveSection() {
  var [activeSection, setActiveSection] = useState('home')

  useEffect(function () {
    var sections = document.querySelectorAll('section[id]')
    if (!sections.length) return

    var ratios = new Map<string, number>()

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })

        var bestId = 'home'
        var bestRatio = 0

        ratios.forEach(function (ratio, id) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestRatio > 0) {
          setActiveSection(bestId)
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    sections.forEach(function (section) {
      observer.observe(section)
    })

    return function () {
      observer.disconnect()
    }
  }, [])

  return activeSection
}
