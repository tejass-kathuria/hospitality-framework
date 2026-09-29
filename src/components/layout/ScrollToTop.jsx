/**
 * ScrollToTop Component
 *
 * Floating button that appears when the user scrolls down, enabling smooth
 * scrolling back to the top of the page with reduced-motion support.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export function ScrollToTop({ threshold = 400 }) {
  const [isVisible, setIsVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-30 p-3.5 rounded-full bg-primary text-text-light hover:bg-secondary hover:text-text-main shadow-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
