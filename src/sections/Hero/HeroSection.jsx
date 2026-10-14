/**
 * HeroSection Component
 *
 * Asymmetric, information-rich editorial hero section.
 * Replaces generic full-screen wallpaper templates with an authentic,
 * multi-compartment representation of the venue:
 * - Direct context: Location coordinates, live status, and operational hours
 * - Monumental Special Elite display headline
 * - Supporting craft narrative and high-contrast tactile action triggers
 * - Framed focal imagery with architectural corner registration marks
 * - Today's signature highlight card and operational snapshot pillars
 */

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Compass, Sparkles } from 'lucide-react'
import { Button, Badge, Container, Image } from '../../components/ui/index.js'
import { businessConfig } from '../../config/index.js'

export function HeroSection({ config = businessConfig, id = 'hero' }) {
  const {
    name,
    tagline,
    hero = {},
    about = {},
    contact = {},
    openingHours = [],
  } = config
  const shouldReduceMotion = useReducedMotion()

  const headline = hero.headline || name
  const subheadline = hero.subheadline || tagline
  const heroImage =
    hero.bgImage ||
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop' //cafe

  const backgroundImage = hero.backgroundImage ||
    'https://imgs.search.brave.com/RpW4WVYm9zpZx6lrwnELWQv9bPOzRZ_Mc8WuAMOMkLo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvbW9u/b2Nocm9tZS1kYXJr/LXdhbGwtYnJpY2tz/LWhrc2NqYjE4Zm5k/endyNTMuanBn' //brick

  const todayHours =
    openingHours.length > 0
      ? `${openingHours[0].days}: ${openingHours[0].hours}`
      : 'Open Daily from 7:00 AM'

  const addressShort =
    contact.address?.street || contact.address?.city || 'SoHo, New York'

  // Motion variants respecting reduced motion preferences
  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
      }

  const fadeIn = (delay = 0) =>
    shouldReduceMotion
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6, delay },
      }

  return (
    <section
      id={id}
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex flex-col justify-between bg-raw-brick text-text-main overflow-hidden border-b border-white/10"
    >
      {/* Full-screen café background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* Subtle radial ambient vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0e]/60 via-transparent to-[#0d0d0e] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      {/* Dark filter */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      <Container className="relative z-10 my-auto">
        {/* Top Context & Ticker Bar */}
        <motion.div
          {...fadeIn(0.05)}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10 text-xs font-mono text-text-muted"
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-text-main font-semibold">
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>{addressShort.toUpperCase()}</span>
            </span>
            <span className="opacity-30">{'//'}</span>
            <span className="hidden sm:inline tracking-wider">
              40.7209° N, 74.0022° W
            </span>
          </div>

          <div className="flex items-center gap-4 tracking-wider">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-primary">
              <Sparkles className="w-3 h-3" />
              <span>SMALL BATCH ROASTERY</span>
            </span>
            <span className="hidden md:inline opacity-30">{'//'}</span>
            <span className="text-text-main">{todayHours}</span>
          </div>
        </motion.div>

        {/* Asymmetric Core: Left Editorial Story + Right Framed Visual & Product Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column (60% / col-span-7) */}
          <motion.div
            {...fadeUp(0.1)}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {tagline && (
              <div className="mb-4">
                <Badge variant="accent" size="sm">
                  {'//'} {tagline}
                </Badge>
              </div>
            )}

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-text-main leading-[1.05] mb-6">
              {headline}
            </h1>

            {subheadline && (
              <p className="font-body text-base sm:text-lg text-text-muted max-w-xl leading-relaxed mb-8">
                {subheadline}
              </p>
            )}

            {/* Action Trigger Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              {hero.ctaPrimary && (
                <Button
                  href="#menu"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>{hero.ctaPrimary}</span>
                  <span className="ml-2 font-mono text-sm opacity-80">→</span>
                </Button>
              )}

              {hero.ctaSecondary && (
                <Button
                  href="#about"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>{hero.ctaSecondary}</span>
                </Button>
              )}
            </div>

            {/* Operational Snapshot: 3 Micro Pillars */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t0 border-white/10 w-full max-w-xl">
              <div>
                <div className="font-mono text-xs sm:text-sm font-bold text-primary">
                  {about.stat1?.number || '100%'}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mt-0.5">
                  {about.stat1?.label || 'Direct Trade'}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs sm:text-sm font-bold text-primary">
                  {about.stat2?.number || '12+'}
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mt-0.5">
                  {about.stat2?.label || 'Single Origins'}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs sm:text-sm font-bold text-primary">
                  DAILY
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-text-muted uppercase tracking-wider mt-0.5">
                  Fresh Bakes
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column (40% / col-span-5): Framed Visual & Live Venue Card */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Framed Visual Image with Corner Registration Marks */}
            <div className="relative p-1.5 bg-[#161619] border border-white/15 rounded-theme shadow-2xl group">
              {/* Corner crosshairs / registration marks */}


              <div className="overflow-hidden relative rounded-theme">
                <Image
                  src={heroImage}
                  alt={`${name} craft atmosphere`}
                  aspectRatio="landscape"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Overlaid Image Technical Label */}
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="dark" size="sm">
                    FIG. 01 // ROASTERY BAR
                  </Badge>
                </div>
              </div>
            </div>

            {/* "Today's Feature / Live Note" Compartment Card */}
            <div className="p-4 sm:p-5 bg-[#161619] border border-white/10 rounded-theme">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] font-semibold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>CURRENT ROAST PROFILE</span>
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  BATCH #2409
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-lg sm:text-xl font-normal text-text-main">
                  Ethiopian Yirgacheffe V60
                </h2>
                <a
                  href="#menu"
                  className="font-mono text-xs text-primary hover:text-text-main flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>Menu</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="font-body text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                Single-origin heirloom varietal. Delicately extracted with notes
                of wild bergamot, sweet jasmine, and raw honey.
              </p>

              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>Elevation: 2,100 MASL</span>
                <span className="text-text-main">Walk-ins Welcome</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Technical Ticker Strip */}
      <div className="relative z-10 mt-12 pt-4 border-t border-white/10">
        <Container>
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted uppercase tracking-widest">
            <span className="hidden sm:inline">
              {'//'} ARCHIVAL RECORD: SPECIALTY TERROIR COFFEE
            </span>
            <span className="truncate">
              {contact.address?.fullAddress ||
                contact.address ||
                'New York, NY'}
            </span>
            <a
              href="#about"
              className="flex items-center gap-1.5 text-text-main hover:text-primary transition-colors focus-visible:outline-none"
              aria-label="Scroll to about story"
            >
              <span className="hidden sm:inline">EXPLORE THE STORY</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </Container>
      </div>
    </section>
  )
}
