/**
 * AboutSection Component
 *
 * Displays the business story, mission, and stats in a responsive side-by-side
 * image & text layout with entrance animations respecting reduced motion.
 */

import { motion, useReducedMotion } from 'framer-motion'
import {
  SectionWrapper,
  SectionHeading,
  Image,
  Card,
} from '../../components/ui/index.js'
import { businessConfig } from '../../config/index.js'

export function AboutSection({ config = businessConfig, id = 'about' }) {
  const { name, about = {} } = config
  const shouldReduceMotion = useReducedMotion()

  const title = about.title || 'Our Story'
  const subtitle = about.subtitle || `Crafted with care at ${name}.`
  const content = about.content || []
  const image1 =
    about.image1 ||
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop'
  const image2 =
    about.image2 ||
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'

  const leftAnim = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, ease: 'easeOut' },
      }

  const rightAnim = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, delay: 0.15, ease: 'easeOut' },
      }

  return (
    <SectionWrapper id={id} bg="default" className="pb-24 sm:pb-28">
      <SectionHeading kicker="About Us" title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column: Visual Image Composition */}
        <motion.div {...leftAnim} className="relative mb-6 lg:mb-0">
          <div className="relative z-10 w-4/5 shadow-2xl rounded-theme overflow-hidden">
            <Image
              src={image1}
              alt={`${name} coffee craftsmanship`}
              aspectRatio="portrait"
              className="w-full"
            />
          </div>

          {image2 && (
            <div className="absolute bottom-0 right-0 z-20 w-3/5 border-4 border-bg shadow-2xl rounded-theme overflow-hidden translate-y-6 sm:translate-y-8">
              <Image
                src={image2}
                alt={`${name} interior atmosphere`}
                aspectRatio="square"
                className="w-full"
              />
            </div>
          )}
        </motion.div>

        {/* Right Column: Story Text & Stats */}
        <motion.div
          {...rightAnim}
          className="flex flex-col justify-center mt-6 lg:mt-0"
        >
          <div className="space-y-4 text-text-muted font-body leading-relaxed text-base sm:text-lg">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Stats Callouts */}
          {(about.stat1 || about.stat2) && (
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-text-muted/15">
              {about.stat1 && (
                <Card variant="ghost" padding="none">
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-1">
                    {about.stat1.number}
                  </div>
                  <div className="font-body text-xs sm:text-sm font-medium uppercase tracking-wider text-text-muted">
                    {about.stat1.label}
                  </div>
                </Card>
              )}

              {about.stat2 && (
                <Card variant="ghost" padding="none">
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-primary mb-1">
                    {about.stat2.number}
                  </div>
                  <div className="font-body text-xs sm:text-sm font-medium uppercase tracking-wider text-text-muted">
                    {about.stat2.label}
                  </div>
                </Card>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
