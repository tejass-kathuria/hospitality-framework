/**
 * Navbar Component
 *
 * Sticky navigation header dynamically wired to the section registry.
 * Features active section highlighting, smooth scrolling, responsive mobile menu drawer,
 * keyboard accessibility, and CTA action button.
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

  // Track window scroll for background elevation style
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg/95 backdrop-blur-md shadow-sm border-b border-text-muted/10 py-3 sm:py-4'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand Logo / Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, 'hero')}
            className="group flex items-center gap-2 rounded-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-main group-hover:text-primary transition-colors">
              {business.name}
            </span>
          </a>

          {/* Desktop Navigation Links (Visible on Large Screens) */}
          <nav
            role="navigation"
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1.5 xl:gap-2"
          >
            {sections.map((section) => {
              const isActive = activeSection === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-full font-body text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-text-muted hover:text-text-main hover:bg-surface/50'
                  }`}
                >
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
              className="lg:hidden p-2 rounded-theme text-text-main hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
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
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-surface border-b border-text-muted/15 shadow-xl overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-2">
              {sections.map((section) => {
                const isActive = activeSection === section.id
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => handleNavClick(e, section.id)}
                    className={`px-4 py-3 rounded-theme font-body text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-text-main hover:bg-bg'
                    }`}
                  >
                    {section.label}
                  </a>
                )
              })}

              {navigation.ctaButton && (
                <div className="mt-4 pt-4 border-t border-text-muted/10">
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
