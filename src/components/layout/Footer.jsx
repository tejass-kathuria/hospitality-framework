/**
 * Footer Component
 *
 * Configurable website footer displaying brand identity, quick navigation links
 * from the section registry, opening hours, contact details, social links, and copyright.
 */

import { Container } from '../ui/index.js'
import { businessConfig, sectionsConfig } from '../../config/index.js'

export function Footer({
  business = businessConfig,
  sections = sectionsConfig.filter((s) => s.enabled),
}) {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <footer className="bg-text-main text-text-light pt-16 pb-12 border-t border-text-light/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-text-light">
              {business.name}
            </h3>
            <p className="font-body text-sm text-text-light/70 leading-relaxed max-w-sm">
              {business.description || business.tagline}
            </p>
            {business.establishedYear && (
              <p className="font-body text-xs text-text-light/50">
                Est. {business.establishedYear}
              </p>
            )}
          </div>

          {/* Col 2: Quick Links from Registry */}
          <div>
            <h4 className="font-heading text-base font-bold text-text-light uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-body text-sm text-text-light/75">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleNavClick(e, section.id)}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div>
            <h4 className="font-heading text-base font-bold text-text-light uppercase tracking-wider mb-4">
              Hours
            </h4>
            {business.openingHours && business.openingHours.length > 0 ? (
              <ul className="space-y-2.5 font-body text-sm text-text-light/75">
                {business.openingHours.map((sched, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className="font-medium text-text-light">
                      {sched.days}
                    </span>
                    <span className="text-text-light/60">{sched.hours}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-sm text-text-light/75">Open Daily</p>
            )}
          </div>

          {/* Col 4: Contact & Socials */}
          <div>
            <h4 className="font-heading text-base font-bold text-text-light uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="space-y-3 font-body text-sm text-text-light/75 mb-6">
              {business.contact?.address && (
                <p>
                  {business.contact.address.fullAddress ||
                    business.contact.address}
                </p>
              )}
              {business.contact?.phone && (
                <p>
                  <a
                    href={`tel:${business.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                  >
                    {business.contact.phone}
                  </a>
                </p>
              )}
              {business.contact?.email && (
                <p>
                  <a
                    href={`mailto:${business.contact.email}`}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary focus-visible:underline"
                  >
                    {business.contact.email}
                  </a>
                </p>
              )}
            </div>

            {/* Social Media Links */}
            {business.socialMedia && business.socialMedia.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {business.socialMedia.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.platform} profile`}
                    className="px-3 py-1.5 bg-text-light/10 hover:bg-primary hover:text-text-light text-text-light/90 text-xs font-body rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-text-light/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-text-light/50">
          <p>
            &copy; {currentYear} {business.name}. All rights reserved.
          </p>
          <p>Crafted with the Hospitality Website Framework.</p>
        </div>
      </Container>
    </footer>
  )
}
