/**
 * ContactSection Component
 *
 * Comprehensive, configurable contact section featuring:
 * 1. React Hook Form with accessible validation, aria-describedby error alerts & clean demo success state
 * 2. Configuration-driven business details (address, phone, email) with monospace metadata
 * 3. Architectural opening hours ledger
 * 4. Google Maps embed container with subtle editorial grading
 * 5. Accessible external social media tags
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import {
  SectionWrapper,
  SectionHeading,
  Button,
} from '../../components/ui/index.js'
import { businessConfig } from '../../config/index.js'

export function ContactSection({ config = businessConfig, id = 'contact' }) {
  const { name, contact = {}, openingHours = [], socialMedia = [] } = config
  const [isSubmitted, setIsSubmitted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data) => {
    // Client-side demo submission handler
    console.log('Contact form demo submission data:', data)
    setIsSubmitted(true)
    reset()
  }

  const leftAnim = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: -16 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }

  const rightAnim = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: 16 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
      }

  return (
    <SectionWrapper id={id} bg="surface" className="pb-24 sm:pb-32">
      <SectionHeading
        kicker="06 // DISPATCH & RESERVATIONS"
        title="Visit Us or Dispatch a Note"
        subtitle={`Drop by the roastery at ${name} or send our team an inquiry below.`}
        align="left"
        className="mb-14"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column (5 cols): Contact Info, Hours, Map, Socials */}
        <motion.div {...leftAnim} className="lg:col-span-5 space-y-6">
          {/* Contact Details Card */}
          <div className="p-6 sm:p-7 bg-bg border border-white/10 rounded-theme">
            <h3 className="font-heading text-xl font-normal text-text-main mb-6 flex items-center gap-2">
              <span className="font-mono text-xs text-primary">{'//'}</span>
              <span>LOCATION & DISPATCH</span>
            </h3>

            <ul className="space-y-4 font-body text-text-muted text-sm sm:text-base">
              {contact.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                  <span className="text-text-main leading-relaxed">
                    {contact.address.fullAddress || contact.address}
                  </span>
                </li>
              )}

              {contact.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-xs sm:text-sm text-text-main hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}

              {contact.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-mono text-xs sm:text-sm text-text-main hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>

            {/* Social Links */}
            {socialMedia.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="font-mono text-xs font-semibold text-text-main uppercase tracking-widest mb-3">
                  CHANNELS & COMMUNITY
                </h4>
                <div className="flex flex-wrap gap-2">
                  {socialMedia.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.platform} page`}
                      className="px-2.5 py-1 bg-white/[0.04] text-text-muted hover:text-text-main hover:border-primary/50 border border-white/10 font-mono text-[11px] uppercase tracking-wider rounded-theme transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      {social.platform}{' '}
                      {social.handle ? `(${social.handle})` : ''}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Opening Hours Schedule */}
          {openingHours.length > 0 && (
            <div className="p-6 sm:p-7 bg-bg border border-white/10 rounded-theme">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <h3 className="font-heading text-xl font-normal text-text-main">
                  Operating Hours
                </h3>
              </div>

              <div className="divide-y divide-white/[0.06] font-body text-xs sm:text-sm">
                {openingHours.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="py-2.5 flex items-center justify-between"
                  >
                    <span className="font-mono text-xs uppercase tracking-wider text-text-main">
                      {schedule.days}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Google Maps Embed / Container */}
          {contact.googleMapsEmbedUrl && (
            <div className="border border-white/15 rounded-theme overflow-hidden h-60 sm:h-64 relative bg-[#0f0f12]">
              <iframe
                title={`Google Maps location for ${name}`}
                src={contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[40%] contrast-125"
              />
            </div>
          )}
        </motion.div>

        {/* Right Column (7 cols): React Hook Form */}
        <motion.div {...rightAnim} className="lg:col-span-7">
          <div className="p-7 sm:p-9 bg-bg border border-white/10 rounded-theme">
            <h3 className="font-heading text-2xl sm:text-3xl font-normal text-text-main mb-2">
              Dispatch a Message
            </h3>
            <p className="font-body text-sm text-text-muted mb-8">
              Inquiries regarding private cuppings, wholesale beans, or press
              features.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.98 }
                }
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="font-heading text-2xl font-normal text-text-main mb-2">
                  Message Dispatched
                </h4>
                <p className="font-body text-text-muted text-sm sm:text-base max-w-md mx-auto mb-6">
                  Your note has been received by our head baristas and roastery
                  dispatch. We will reply within one business day.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Note
                </Button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-6"
              >
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs font-medium uppercase tracking-widest text-text-main mb-2"
                  >
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={
                      errors.name ? 'contact-name-error' : undefined
                    }
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Jane Doe"
                    className={`w-full px-4 py-3 bg-[#0d0d0e] border font-body text-sm text-text-main rounded-theme focus:outline-none focus:ring-1 transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-white/15 focus:ring-primary/40 focus:border-primary'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1 font-mono text-xs text-red-400"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs font-medium uppercase tracking-widest text-text-main mb-2"
                  >
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={
                      errors.email ? 'contact-email-error' : undefined
                    }
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    placeholder="jane@domain.com"
                    className={`w-full px-4 py-3 bg-[#0d0d0e] border font-body text-sm text-text-main rounded-theme focus:outline-none focus:ring-1 transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-white/15 focus:ring-primary/40 focus:border-primary'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1 font-mono text-xs text-red-400"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs font-medium uppercase tracking-widest text-text-main mb-2"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={
                      errors.message ? 'contact-message-error' : undefined
                    }
                    {...register('message', {
                      required: 'Please enter a message',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters',
                      },
                    })}
                    placeholder="Tell us about your event inquiry, wholesale question, or feedback..."
                    className={`w-full px-4 py-3 bg-[#0d0d0e] border font-body text-sm text-text-main rounded-theme focus:outline-none focus:ring-1 transition-colors ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-white/15 focus:ring-primary/40 focus:border-primary'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1 font-mono text-xs text-red-400"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'DISPATCHING...' : 'DISPATCH NOTE →'}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
