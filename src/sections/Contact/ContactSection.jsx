/**
 * ContactSection Component
 *
 * Comprehensive, configurable contact section featuring:
 * 1. React Hook Form with accessible validation, aria-describedby error alerts & clean demo success state
 * 2. Configuration-driven business details (address, phone, email)
 * 3. Opening hours schedule
 * 4. Google Maps embed / placeholder container
 * 5. Accessible external social media links
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import {
  SectionWrapper,
  SectionHeading,
  Card,
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
        transition: { duration: 0.5 },
      }

  const rightAnim = shouldReduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, x: 16 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.1 },
      }

  return (
    <SectionWrapper id={id} bg="muted">
      <SectionHeading
        kicker="Get In Touch"
        title="Visit Us or Say Hello"
        subtitle={`We would love to hear from you. Drop by ${name} or send us a message below.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Info, Hours, Map, Socials */}
        <motion.div {...leftAnim} className="space-y-8">
          {/* Contact Details Card */}
          <Card variant="surface" padding="lg">
            <h3 className="font-heading text-xl font-bold text-text-main mb-6">
              Contact Information
            </h3>

            <ul className="space-y-4 font-body text-text-muted text-sm sm:text-base">
              {contact.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{contact.address.fullAddress || contact.address}</span>
                </li>
              )}

              {contact.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}

              {contact.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>

            {/* Social Links */}
            {socialMedia.length > 0 && (
              <div className="mt-8 pt-6 border-t border-text-muted/10">
                <h4 className="font-heading text-sm font-semibold text-text-main uppercase tracking-wider mb-4">
                  Follow Our Journey
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${social.platform} page`}
                      className="px-4 py-2 bg-bg text-text-main hover:bg-primary hover:text-text-light font-body text-xs font-medium rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {social.platform}{' '}
                      {social.handle ? `(${social.handle})` : ''}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Opening Hours Schedule */}
          {openingHours.length > 0 && (
            <Card variant="surface" padding="lg">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-heading text-xl font-bold text-text-main">
                  Opening Hours
                </h3>
              </div>

              <div className="divide-y divide-text-muted/10 font-body text-sm">
                {openingHours.map((schedule, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between"
                  >
                    <span className="font-medium text-text-main">
                      {schedule.days}
                    </span>
                    <span className="text-text-muted">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Google Maps Embed / Container */}
          {contact.googleMapsEmbedUrl && (
            <Card
              variant="surface"
              padding="none"
              className="overflow-hidden h-64 sm:h-72"
            >
              <iframe
                title={`Google Maps location for ${name}`}
                src={contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </Card>
          )}
        </motion.div>

        {/* Right Column: React Hook Form */}
        <motion.div {...rightAnim}>
          <Card variant="surface" padding="lg">
            <h3 className="font-heading text-2xl font-bold text-text-main mb-2">
              Send a Message
            </h3>
            <p className="font-body text-sm text-text-muted mb-8">
              Fill out the form below and our team will respond shortly.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 0.95 }
                }
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h4 className="font-heading text-2xl font-bold text-text-main mb-2">
                  Thank You!
                </h4>
                <p className="font-body text-text-muted text-base max-w-md mx-auto mb-6">
                  Your message has been submitted. We appreciate you reaching
                  out and will be in touch soon.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
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
                    className="block font-body text-xs font-semibold uppercase tracking-wider text-text-main mb-2"
                  >
                    Your Name <span className="text-red-500">*</span>
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
                    className={`w-full px-4 py-3 bg-bg border font-body text-text-main rounded-theme focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-text-muted/20 focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1 font-body text-xs text-red-500"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-body text-xs font-semibold uppercase tracking-wider text-text-main mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
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
                    placeholder="jane@example.com"
                    className={`w-full px-4 py-3 bg-bg border font-body text-text-main rounded-theme focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-text-muted/20 focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1 font-body text-xs text-red-500"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-body text-xs font-semibold uppercase tracking-wider text-text-main mb-2"
                  >
                    Message <span className="text-red-500">*</span>
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
                    placeholder="Tell us about your event inquiry, feedback, or question..."
                    className={`w-full px-4 py-3 bg-bg border font-body text-text-main rounded-theme focus:outline-none focus:ring-2 transition-colors ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-500/20'
                        : 'border-text-muted/20 focus:ring-primary/20 focus:border-primary'
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="mt-1 font-body text-xs text-red-500"
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
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
