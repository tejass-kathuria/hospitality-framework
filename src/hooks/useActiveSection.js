/**
 * useActiveSection Hook
 *
 * Tracks the currently active section in the viewport using Intersection Observer.
 * Accepts an array of section IDs and returns the ID of the visible section.
 */

import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds = [], options = {}) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '')

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: options.rootMargin || '-20% 0px -65% 0px',
      threshold: options.threshold || 0,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [sectionIds, options.rootMargin, options.threshold])

  return activeSection
}
