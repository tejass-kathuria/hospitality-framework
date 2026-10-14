/**
 * EventsSection Component
 *
 * Configurable events section displaying workshops, cupping sessions,
 * and masterclasses. Features ticket-stub / ledger cards, monospace date/time stamps,
 * category badges, and actionable registration triggers.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, Clock, Ticket } from 'lucide-react'
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Image,
  Badge,
  Button,
} from '../../components/ui/index.js'
import { eventsConfig } from '../../config/index.js'

export function EventsSection({ config = eventsConfig, id = 'events' }) {
  const { title, subtitle, events = [] } = config
  const shouldReduceMotion = useReducedMotion()

  return (
    <SectionWrapper id={id} bg="surface">
      <SectionHeading
        kicker="04 // SESSIONS & GATHERINGS"
        title={title || 'Workshops & Events'}
        subtitle={subtitle}
        align="left"
        className="mb-14"
      />

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {events.map((event, idx) => (
            <motion.div
              key={event.id || idx}
              initial={
                shouldReduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduceMotion ? 0.15 : 0.5,
                delay: shouldReduceMotion ? 0 : idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Card
                variant="elevated"
                padding="none"
                className="h-full flex flex-col group border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {event.image && (
                  <div className="relative overflow-hidden bg-black/40 border-b border-white/10">
                    <Image
                      src={event.image}
                      alt={event.title}
                      aspectRatio="landscape"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    {event.category && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="dark" size="sm">
                          {'//'} {event.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  {/* Event Metadata (Date & Time) */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-primary font-medium mb-3">
                    {event.date && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="uppercase tracking-wider">
                          {event.date}
                        </span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center gap-1.5 text-text-muted">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{event.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-normal text-text-main group-hover:text-primary transition-colors mb-3 leading-tight">
                    {event.title}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-text-muted mb-8 flex-grow leading-relaxed">
                    {event.description}
                  </p>

                  {/* CTA Action */}
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                      <Ticket className="w-3.5 h-3.5 text-primary" />
                      <span>Limited Capacity</span>
                    </div>

                    <Button variant="primary" size="sm">
                      {event.cta || 'Reserve Seat'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty Fallback State */
        <Card
          variant="outline"
          padding="lg"
          className="max-w-xl mx-auto text-center py-12 border border-white/15"
        >
          <Calendar className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
          <h3 className="font-heading text-xl font-normal text-text-main mb-2">
            No Upcoming Sessions Scheduled
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            We are curating our next round of origin cuppings and extraction
            masterclasses. Follow our social channels or dispatch announcements
            for releases.
          </p>
        </Card>
      )}
    </SectionWrapper>
  )
}
