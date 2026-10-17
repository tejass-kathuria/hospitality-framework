/**
 * Navbar Component
 *
 * Structured, editorial navigation header with architectural hairline borders,
 * operational status indicator, monospace index links, responsive mobile drawer,
 * and high-contrast tactile action triggers.
 */

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Container, Button } from '../ui/index.js'
import {
  businessConfig,
  navigationConfig,
  sectionsConfig,
} from '../../config/index.js'

export function Navbar({
  activeSection = 'hero',
  sections = sectionsConfig.filter((s) => s.enabled),
  business = businessConfig,
  navigation = navigationConfig,
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Track window scroll for subtle background elevation style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen, closeMobileMenu])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
    closeMobileMenu()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-[#0d0d0e]/95 backdrop-blur-md shadow-lg border-b-2 border-white/10 py-3 sm:py-3.5'
        : 'bg-[#0d0d0e]/85 backdrop-blur-sm border-b-2 border-primary/100 py-4 sm:py-4.5'
        }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo / Wordmark & Live Operational Status */}
          <div className="flex items-center gap-4">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="group flex items-center gap-2 rounded-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-text-main group-hover:text-primary transition-colors">
                {business.name}
              </span>
            </a>

            {/* Live Status Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-theme bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open Today</span>
            </div>
          </div>

          {/* Desktop Navigation Links (Visible on Large Screens) */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
          >
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id
              const indexFormatted = String(idx + 1).padStart(2, '0')
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-2.5 py-1.5 rounded-theme font-mono text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${isActive
                    ? 'text-primary bg-primary/10 border border-primary/30 font-bold'
                    : 'text-text-main/90 font-semibold hover:text-primary hover:bg-white/5 border border-transparent'
                    }`}
                >
                  <span className="text-[10px] opacity-50 mr-1.5 font-medium">
                    {indexFormatted}
                  </span>
                  {section.label}
                </a>
              )
            })}
          </nav>

          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {navigation.ctaButton && (
              <div className="hidden sm:block">
                <Button
                  href={navigation.ctaButton.href}
                  onClick={(e) => {
                    const targetId = navigation.ctaButton.href.replace('#', '')
                    handleNavClick(e, targetId)
                  }}
                  variant="primary"
                  size="sm"
                >
                  {navigation.ctaButton.label}
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle Button (Visible on Mobile & Tablet) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-theme text-text-main border border-white/10 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0d0d0e] border-b border-white/10 shadow-2xl overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-2">
              {sections.map((section, idx) => {
                const isActive = activeSection === section.id
                const indexFormatted = String(idx + 1).padStart(2, '0')
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleNavClick(e, section.id)}
                    className={`px-4 py-3 rounded-theme font-mono text-sm uppercase tracking-wider flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive
                      ? 'bg-primary/10 text-primary border border-primary/30 font-semibold'
                      : 'text-text-main hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <span>{section.label}</span>
                    <span className="text-xs font-mono opacity-50">
                      {'//'} {indexFormatted}
                    </span>
                  </a>
                )
              })}

              {navigation.ctaButton && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Button
                    href={navigation.ctaButton.href}
                    onClick={(e) => {
                      const targetId = navigation.ctaButton.href.replace(
                        '#',
                        ''
                      )
                      handleNavClick(e, targetId)
                    }}
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    {navigation.ctaButton.label}
                  </Button>
                </div>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
