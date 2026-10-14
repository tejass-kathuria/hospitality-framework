/**
 * ScrollToTop Component
 *
 * Floating button that appears when the user scrolls down, enabling smooth
 * scrolling back to the top of the page with sharp architectural geometry
 * and reduced-motion support.
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

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
            shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }
          }
          animate={{ opacity: 1, scale: 1 }}
          exit={
            shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-6 z-30 p-3 rounded-theme bg-[#161619] text-text-main border border-white/20 hover:border-primary hover:text-primary hover:bg-[#202025] shadow-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
