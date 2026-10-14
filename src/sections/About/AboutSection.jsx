/**
 * AboutSection Component
 *
 * Displays the business story, ethos, and stats in an editorial broadsheet layout:
 * - Left-aligned header with monospace section indexing
 * - Framed archival photographs with technical registration marks and figure tags
 * - Primary statement set in Special Elite display typography
 * - Architectural stat boxes with hairline dividers and monospace tabular values
 */

import { motion, useReducedMotion } from 'framer-motion'
import {
  SectionWrapper,
  SectionHeading,
  Image,
  Badge,
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
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      }

  const rightAnim = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
      }

  return (
    <SectionWrapper id={id} bg="surface" className="pb-24 sm:pb-32">
      <SectionHeading
        kicker="01 // PHILOSOPHY & ORIGIN"
        title={title}
        subtitle={subtitle}
        align="left"
        className="mb-14 sm:mb-18"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column (5 cols): Framed Visual Archival Imagery */}
        <motion.div {...leftAnim} className="lg:col-span-5 relative">
          <div className="relative z-10 p-1.5 bg-[#121214] border border-white/15 rounded-theme shadow-2xl group">
            <div className="overflow-hidden rounded-theme relative">
              <Image
                src={image1}
                alt={`${name} coffee craftsmanship`}
                aspectRatio="portrait"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 z-10">
                <Badge variant="dark" size="sm">
                  FIG. 02 // SOURCING
                </Badge>
              </div>
            </div>
          </div>

          {image2 && (
            <div className="absolute -bottom-10 -right-4 sm:-right-8 z-20 w-3/5 p-1 bg-[#121214] border border-white/20 rounded-theme shadow-2xl">
              <div className="overflow-hidden rounded-theme relative">
                <Image
                  src={image2}
                  alt={`${name} interior atmosphere`}
                  aspectRatio="square"
                  className="w-full object-cover"
                />
                <div className="absolute bottom-2 left-2 z-10">
                  <Badge variant="dark" size="sm">
                    FIG. 03 // BATCH ROASTER
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column (7 cols): Story Narrative & Structural Stat Blocks */}
        <motion.div
          {...rightAnim}
          className="lg:col-span-7 flex flex-col justify-center mt-6 lg:mt-0 lg:pl-6"
        >
          {/* Opening Display Statement */}
          <div className="font-heading text-2xl sm:text-3xl text-text-main font-normal leading-snug mb-6 border-l-2 border-primary pl-4">
            &ldquo;Craftsmanship, single-origin terroir, and mindfulness
            restored to the daily coffee ritual.&rdquo;
          </div>

          <div className="space-y-4 text-text-muted font-body leading-relaxed text-base sm:text-lg mb-10">
            {content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Stats Callouts: Architectural Box Grid */}
          {(about.stat1 || about.stat2) && (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-white/10">
              {about.stat1 && (
                <div className="p-4 sm:p-5 bg-bg border border-white/10 rounded-theme">
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-primary mb-1">
                    {about.stat1.number}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    {about.stat1.label}
                  </div>
                </div>
              )}

              {about.stat2 && (
                <div className="p-4 sm:p-5 bg-bg border border-white/10 rounded-theme">
                  <div className="font-mono text-3xl sm:text-4xl font-bold text-primary mb-1">
                    {about.stat2.number}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    {about.stat2.label}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
