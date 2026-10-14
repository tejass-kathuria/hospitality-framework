/**
 * TestimonialsSection Component
 *
 * Configurable testimonials section displaying community words and critic acclaim.
 * Features hairline ledger cards, warm amber star ratings, monospace author roles,
 * and a touch-friendly snap-scroll on mobile with reduced-motion support.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Image,
} from '../../components/ui/index.js'
import { testimonialsConfig } from '../../config/index.js'

export function TestimonialsSection({
  config = testimonialsConfig,
  id = 'testimonials',
}) {
  const { title, subtitle, reviews = [] } = config
  const shouldReduceMotion = useReducedMotion()

  return (
    <SectionWrapper id={id} bg="default">
      <SectionHeading
        kicker="05 // COMMUNITY & CRITICAL WORDS"
        title={title || 'Guest Perspectives'}
        subtitle={subtitle}
        align="center"
        className="mb-14"
      />

      {/* Grid on Desktop, Touch-Friendly Horizontal Snap-Scroll on Mobile */}
      <div className="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {reviews.map((review, idx) => (
          <motion.div
            key={review.id || idx}
            initial={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.5,
              delay: shouldReduceMotion ? 0 : idx * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center flex"
          >
            <Card
              variant="elevated"
              padding="lg"
              className="w-full flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300 relative group"
            >
              <div>
                {/* Rating & Quote Icon Header */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center gap-1 text-primary"
                    aria-label={`Rating: ${review.rating || 5} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-primary text-primary"
                      />
                    ))}
                  </div>

                  <Quote className="w-5 h-5 text-white/10 group-hover:text-primary/40 transition-colors" />
                </div>

                {/* Review Text */}
                <p className="font-body text-base text-text-main/90 leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-white/10 mt-auto">
                {review.avatar && (
                  <div className="p-0.5 border border-white/15 rounded-theme shrink-0">
                    <Image
                      src={review.avatar}
                      alt={`Avatar of ${review.author}`}
                      aspectRatio="square"
                      rounded="theme"
                      className="w-10 h-10 object-cover rounded-theme"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-heading font-normal text-text-main text-base sm:text-lg">
                    {review.author}
                  </h4>
                  {review.role && (
                    <p className="font-mono text-xs uppercase tracking-wider text-text-muted mt-0.5">
                      {review.role}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
