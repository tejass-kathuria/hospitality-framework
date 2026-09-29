/**
 * App Component
 *
 * Primary application orchestrator. Dynamically renders enabled website sections
 * from the section registry, integrated with the Navbar, Footer, active section tracking,
 * scroll-to-top controls, global reduced-motion enforcement, and accessibility skip links.
 */

import { MotionConfig } from 'framer-motion'
import { Navbar, Footer, ScrollToTop } from './components/layout/index.js'
import { AnimatedSection } from './components/common/index.js'
import {
  HeroSection,
  AboutSection,
  MenuSection,
  GallerySection,
  TestimonialsSection,
  EventsSection,
  ContactSection,
} from './sections/index.js'
import {
  sectionsConfig,
  businessConfig,
  navigationConfig,
} from './config/index.js'
import { useActiveSection } from './hooks/index.js'

const SECTION_COMPONENTS = {
  HeroSection,
  AboutSection,
  MenuSection,
  GallerySection,
  TestimonialsSection,
  EventsSection,
  ContactSection,
}

function App() {
  const enabledSections = sectionsConfig.filter((section) => section.enabled)
  const sectionIds = enabledSections.map((section) => section.id)
  const activeSection = useActiveSection(sectionIds)

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-text-main flex flex-col selection:bg-primary selection:text-text-light">
        {/* Accessibility Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-text-light focus:rounded-theme focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Top Navigation */}
        <Navbar
          activeSection={activeSection}
          sections={enabledSections}
          business={businessConfig}
          navigation={navigationConfig}
        />

        {/* Dynamic Main Page Content */}
        <main id="main-content" className="flex-grow">
          {enabledSections.map((section) => {
            const Component = SECTION_COMPONENTS[section.component]
            if (!Component) return null

            // Hero section manages its own full-viewport entrance animation; wrap others with AnimatedSection
            if (section.id === 'hero') {
              return <Component key={section.id} id={section.id} />
            }

            return (
              <AnimatedSection key={section.id}>
                <Component id={section.id} />
              </AnimatedSection>
            )
          })}
        </main>

        {/* Footer */}
        <Footer business={businessConfig} sections={enabledSections} />

        {/* Floating Scroll To Top */}
        <ScrollToTop threshold={400} />
      </div>
    </MotionConfig>
  )
}

export default App
