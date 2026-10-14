/**
 * Footer Component
 *
 * Broadsheet-style editorial website footer displaying brand identity,
 * section registry links, operational hours, contact details, and social channels
 * with hairline grid dividers and monospace technical metadata.
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
    <footer className="bg-[#08080a] text-text-main pt-20 pb-14 border-t border-white/10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl sm:text-3xl font-normal tracking-tight text-text-main">
              {business.name}
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-sm">
              {business.description || business.tagline}
            </p>
            {business.establishedYear && (
              <p className="font-mono text-xs tracking-widest uppercase text-text-muted/60">
                {'//'} ARCHIVE EST. {business.establishedYear}
              </p>
            )}
          </div>

          {/* Col 2: Quick Links from Registry */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5 flex items-center gap-2">
              <span className="opacity-50">{'//'}</span>
              <span>INDEX NAVIGATION</span>
            </h4>
            <ul className="space-y-2.5 font-mono text-xs uppercase tracking-wider text-text-muted">
              {sections.map((section, idx) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => handleNavClick(e, section.id)}
                    className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary flex items-center gap-2"
                  >
                    <span className="text-[10px] opacity-40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{section.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Opening Hours */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5 flex items-center gap-2">
              <span className="opacity-50">{'//'}</span>
              <span>OPERATING HOURS</span>
            </h4>
            {business.openingHours && business.openingHours.length > 0 ? (
              <ul className="space-y-3 font-body text-xs sm:text-sm text-text-muted">
                {business.openingHours.map((sched, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col border-b border-white/[0.06] pb-2 last:border-none"
                  >
                    <span className="font-mono text-xs uppercase tracking-wider text-text-main">
                      {sched.days}
                    </span>
                    <span className="font-body text-xs text-text-muted mt-0.5">
                      {sched.hours}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-body text-sm text-text-muted">Open Daily</p>
            )}
          </div>

          {/* Col 4: Contact & Socials */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5 flex items-center gap-2">
              <span className="opacity-50">{'//'}</span>
              <span>LOCATION & DISPATCH</span>
            </h4>
            <div className="space-y-3 font-body text-xs sm:text-sm text-text-muted mb-6">
              {business.contact?.address && (
                <p className="leading-relaxed">
                  {business.contact.address.fullAddress ||
                    business.contact.address}
                </p>
              )}
              {business.contact?.phone && (
                <p>
                  <a
                    href={`tel:${business.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-mono text-xs hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
                  >
                    {business.contact.phone}
                  </a>
                </p>
              )}
              {business.contact?.email && (
                <p>
                  <a
                    href={`mailto:${business.contact.email}`}
                    className="font-mono text-xs hover:text-primary transition-colors focus-visible:outline-none focus-visible:text-primary"
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
                    className="px-2.5 py-1 bg-white/[0.04] hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-text-main text-[11px] font-mono uppercase tracking-wider rounded-theme transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono uppercase tracking-widest text-text-muted/60">
          <p>
            &copy; {currentYear} {business.name}. ALL RIGHTS RESERVED.
          </p>
          <p className="opacity-80">ARCHITECTURAL HOSPITALITY FRAMEWORK</p>
        </div>
      </Container>
    </footer>
  )
}
