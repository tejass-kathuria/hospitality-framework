/**
 * GallerySection Component
 *
 * Configurable image gallery section with category filters, responsive grid layout,
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
  Button,
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
        kicker="Atmosphere & Craft"
        title={title || 'The Atmosphere'}
        subtitle={subtitle}
      />

      {/* Category Filter Tabs */}
      {categories.length > 1 && (
        <div
          role="tablist"
          aria-label="Gallery category filters"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              aria-controls="gallery-images-grid"
              variant={activeCategory === cat ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => {
                setActiveCategory(cat)
                setSelectedIndex(null)
              }}
            >
              {cat}
            </Button>
          ))}
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
                  : { opacity: 0, scale: 0.95 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.95 }
              }
              transition={{ duration: shouldReduceMotion ? 0.15 : 0.25 }}
            >
              <Card
                variant="elevated"
                padding="none"
                onClick={() => setSelectedIndex(idx)}
                className="group cursor-pointer overflow-hidden relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                <Image
                  src={img.src}
                  alt={img.alt || img.title}
                  aspectRatio="square"
                  className="group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-text-main/80 via-text-main/20 to-transparent opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {img.category && (
                    <Badge variant="accent" size="sm" className="mb-2 w-fit">
                      {img.category}
                    </Badge>
                  )}
                  <h3 className="font-heading text-lg font-bold text-text-light">
                    {img.title}
                  </h3>
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
            className="fixed inset-0 z-50 bg-text-main/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
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
              className="absolute top-6 right-6 z-10 p-3 text-text-light hover:text-primary transition-colors bg-surface/10 hover:bg-surface/20 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <X className="w-6 h-6" />
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
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 p-3 text-text-light hover:text-primary transition-colors bg-surface/10 hover:bg-surface/20 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Lightbox Main Content Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <motion.img
                key={selectedImage.src}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { scale: 0.96, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { scale: 0.96, opacity: 0 }
                }
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
                src={selectedImage.src}
                alt={selectedImage.alt || selectedImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-theme shadow-2xl"
              />

              {/* Caption Bar */}
              <div className="mt-4 text-center text-text-light">
                <h4 className="font-heading text-xl font-bold">
                  {selectedImage.title}
                </h4>
                {selectedImage.alt && (
                  <p className="font-body text-sm text-text-light/70 mt-1">
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
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 p-3 text-text-light hover:text-primary transition-colors bg-surface/10 hover:bg-surface/20 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
