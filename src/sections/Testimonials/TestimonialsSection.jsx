/**
 * TestimonialsSection Component
 *
 * Configurable testimonials section displaying guest reviews, star ratings,
 * customer avatars, and roles. Presents a touch-friendly, snap-scrolling carousel
 * on mobile and a clean grid layout on desktop screens with reduced-motion support.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
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
    <SectionWrapper id={id} bg="surface">
      <SectionHeading
        kicker="Guest Experiences"
        title={title || 'Community Words'}
        subtitle={subtitle}
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
            }}
            className="w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center flex"
          >
            <Card
              variant="elevated"
              padding="lg"
              className="w-full flex flex-col justify-between"
            >
              <div>
                {/* Star Rating Header */}
                <div
                  className="flex items-center gap-1 text-amber-400 mb-4"
                  aria-label={`Rating: ${review.rating || 5} out of 5 stars`}
                >
                  {Array.from({ length: review.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="font-body text-base text-text-muted italic leading-relaxed mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-text-muted/10 mt-auto">
                {review.avatar && (
                  <Image
                    src={review.avatar}
                    alt={`Avatar of ${review.author}`}
                    aspectRatio="square"
                    rounded="full"
                    className="w-12 h-12 shrink-0"
                  />
                )}
                <div>
                  <h4 className="font-heading font-semibold text-text-main text-base">
                    {review.author}
                  </h4>
                  {review.role && (
                    <p className="font-body text-xs text-text-muted">
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
