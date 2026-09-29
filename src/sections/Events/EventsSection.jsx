/**
 * EventsSection Component
 *
 * Configurable events section displaying upcoming workshops, tasting sessions,
 * and gatherings. Features responsive event cards, date/time metadata, category badges,
 * call-to-action buttons, and a graceful fallback state when no events are scheduled.
 */

import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
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
    <SectionWrapper id={id} bg="default">
      <SectionHeading
        kicker="Gatherings & Workshops"
        title={title || 'Workshops & Events'}
        subtitle={subtitle}
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
              }}
            >
              <Card
                variant="elevated"
                padding="none"
                className="h-full flex flex-col overflow-hidden group"
              >
                {event.image && (
                  <div className="relative">
                    <Image
                      src={event.image}
                      alt={event.title}
                      aspectRatio="landscape"
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                    {event.category && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="accent" size="sm">
                          {event.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  {/* Event Metadata (Date & Time) */}
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-body text-primary font-semibold mb-3">
                    {event.date && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-text-muted" />
                        <span className="text-text-muted">{event.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-2xl font-bold text-text-main group-hover:text-primary transition-colors mb-3">
                    {event.title}
                  </h3>

                  <p className="font-body text-sm sm:text-base text-text-muted mb-8 flex-grow leading-relaxed">
                    {event.description}
                  </p>

                  {/* CTA Action */}
                  <div className="mt-auto pt-4 border-t border-text-muted/10 flex items-center justify-between">
                    <Button variant="primary" size="sm">
                      {event.cta || 'Register Now'}
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
          className="max-w-xl mx-auto text-center py-12"
        >
          <Calendar className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
          <h3 className="font-heading text-xl font-bold text-text-main mb-2">
            No Upcoming Events Scheduled
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            We are currently planning our next round of cuppings and
            masterclasses. Check back soon or follow our social channels for
            announcements!
          </p>
        </Card>
      )}
    </SectionWrapper>
  )
}
