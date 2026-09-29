/**
 * HeroSection Component
 *
 * Full-viewport hero section featuring background imagery, readable text overlays,
 * configurable branding/headlines, primary & secondary CTAs, subtle entrance animations,
 * and a smooth-scrolling indicator.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button, Badge, Container } from '../../components/ui/index.js'
import { businessConfig } from '../../config/index.js'

export function HeroSection({ config = businessConfig, id = 'hero' }) {
  const { name, tagline, hero = {} } = config
  const shouldReduceMotion = useReducedMotion()

  const headline = hero.headline || name
  const subheadline = hero.subheadline || tagline
  const bgImage =
    hero.bgImage ||
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1920&auto=format&fit=crop'

  return (
    <section
      id={id}
      className="relative min-h-screen flex items-center justify-center bg-text-main text-text-light overflow-hidden"
    >
      {/* Background Image with Dark Overlay (Optimized for LCP) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt={name}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-text-main via-text-main/70 to-text-main/40" />
      </div>

      {/* Hero Content */}
      <Container className="relative z-10 py-24 text-center">
        <motion.div
          initial={
            shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.2 : 0.7,
            ease: 'easeOut',
          }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Tagline Badge */}
          {tagline && (
            <Badge
              variant="accent"
              size="md"
              className="mb-6 tracking-widest uppercase shadow-sm"
            >
              {tagline}
            </Badge>
          )}

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-light leading-[1.1] mb-6 break-words">
            {headline}
          </h1>

          {/* Subheadline Description */}
          {subheadline && (
            <p className="font-body text-lg sm:text-xl text-text-light/85 max-w-2xl leading-relaxed mb-10">
              {subheadline}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {hero.ctaPrimary && (
              <Button href="#menu" variant="primary" size="lg">
                {hero.ctaPrimary}
              </Button>
            )}

            {hero.ctaSecondary && (
              <Button href="#about" variant="outline" size="lg">
                {hero.ctaSecondary}
              </Button>
            )}
          </div>
        </motion.div>
      </Container>

      {/* Scroll Down Indicator (Respects Reduced Motion) */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: [0, 8, 0] }
        }
        transition={
          shouldReduceMotion
            ? { opacity: { delay: 0.3, duration: 0.3 } }
            : {
                opacity: { delay: 1, duration: 0.5 },
                y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
              }
        }
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-3 text-text-light/70 hover:text-text-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.a>
    </section>
  )
}
