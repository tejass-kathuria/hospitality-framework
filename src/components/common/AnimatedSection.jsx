/**
 * AnimatedSection Component
 *
 * Reusable wrapper that adds subtle scroll-triggered entrance animations
 * using Motion while gracefully respecting reduced-motion user preferences.
 */

import { motion, useReducedMotion } from 'framer-motion'

export function AnimatedSection({ children, className = '', id, ...props }) {
  const shouldReduceMotion = useReducedMotion()

  const animationProps = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, ease: 'easeOut' },
      }

  return (
    <motion.div id={id} className={className} {...animationProps} {...props}>
      {children}
    </motion.div>
  )
}
