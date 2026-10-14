/**
 * GallerySection Component
 *
 * Configurable image gallery section with category filters, editorial grid layout,
 * and an accessible lightbox modal featuring keyboard navigation, focus trapping,
 * and reduced-motion support.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Image,
  Badge,
} from '../../components/ui/index.js'
import { galleryConfig } from '../../config/index.js'

export function GallerySection({ config = galleryConfig, id = 'gallery' }) {
  const { title, subtitle, images = [] } = config
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedIndex, setSelectedIndex] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const closeBtnRef = useRef(null)

  // Extract unique categories from images data
  const categories = [
    'All',
    ...Array.from(new Set(images.map((img) => img.category).filter(Boolean))),
  ]

  const filteredImages =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory)

  const selectedImage =
    selectedIndex !== null ? filteredImages[selectedIndex] : null

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    )
  }, [selectedIndex, filteredImages.length])

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    )
  }, [selectedIndex, filteredImages.length])

  const closeModal = useCallback(() => {
    setSelectedIndex(null)
  }, [])

  // Keyboard Navigation: Escape key to close, Arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, closeModal, handlePrev, handleNext])

  // Focus close button when lightbox opens and lock body scroll
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedIndex])

  return (
    <SectionWrapper id={id} bg="muted">
      <SectionHeading
        kicker="03 // SPACE & ARCHIVE"
        title={title || 'The Atmosphere'}
        subtitle={subtitle}
        align="center"
        className="mb-12"
      />

      {/* Category Filter Tabs */}
      {categories.length > 1 && (
        <div
          role="tablist"
          aria-label="Gallery category filters"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="gallery-images-grid"
                onClick={() => {
                  setActiveCategory(cat)
                  setSelectedIndex(null)
                }}
                className={`px-4 py-2 rounded-theme font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'bg-primary text-text-light border border-primary font-bold shadow-sm'
                    : 'bg-surface text-text-muted border border-white/10 hover:border-white/30 hover:text-text-main'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>
      )}

      {/* Image Grid (1 col mobile -> 2 cols tablet -> 3 cols desktop) */}
      <motion.div
        id="gallery-images-grid"
        layout={!shouldReduceMotion}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id || idx}
              layout={!shouldReduceMotion}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98 }
              }
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.25 }}
            >
              <Card
                variant="elevated"
                padding="none"
                onClick={() => setSelectedIndex(idx)}
                className="group cursor-pointer overflow-hidden relative border border-white/10 hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                tabIndex={0}
                role="button"
                aria-label={`View ${img.title || 'image'} in lightbox`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedIndex(idx)
                  }
                }}
              >
                <div className="relative">
                  <Image
                    src={img.src}
                    alt={img.alt || img.title}
                    aspectRatio="square"
                    className="group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Monospace Figure Overlay */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge variant="dark" size="sm">
                      FIG. {String(idx + 1).padStart(2, '0')}
                    </Badge>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {img.category && (
                      <span className="font-mono text-xs uppercase tracking-widest text-primary mb-1">
                        {'//'} {img.category}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-normal text-text-light">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Close Button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeModal}
              aria-label="Close lightbox"
              className="absolute top-6 right-6 z-10 p-2.5 text-text-light hover:text-primary transition-colors bg-white/5 hover:bg-white/10 border border-white/15 rounded-theme cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Previous Button */}
            {filteredImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Previous image"
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-2.5 text-text-light hover:text-primary transition-colors bg-white/5 hover:bg-white/10 border border-white/15 rounded-theme cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Lightbox Main Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2 bg-[#121215] border border-white/15 rounded-theme shadow-2xl"
            >
              <motion.img
                key={selectedImage.src}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { scale: 0.98, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { scale: 0.98, opacity: 0 }
                }
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
                src={selectedImage.src}
                alt={selectedImage.alt || selectedImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-theme"
              />

              {/* Caption Bar */}
              <div className="mt-4 pb-2 text-center text-text-main w-full">
                <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-1">
                  {'//'} ARCHIVE SPECIMEN
                </span>
                <h4 className="font-heading text-xl font-normal">
                  {selectedImage.title}
                </h4>
                {selectedImage.alt && (
                  <p className="font-body text-xs sm:text-sm text-text-muted mt-1 max-w-md mx-auto">
                    {selectedImage.alt}
                  </p>
                )}
              </div>
            </div>

            {/* Next Button */}
            {filteredImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Next image"
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-2.5 text-text-light hover:text-primary transition-colors bg-white/5 hover:bg-white/10 border border-white/15 rounded-theme cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
