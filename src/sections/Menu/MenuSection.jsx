/**
 * MenuSection Component
 *
 * Configurable, data-driven menu section featuring:
 * - Monospace category filter tabs
 * - Specimen cards with hairline borders and matte basalt surfaces
 * - High-contrast Special Elite dish titles and tabular monospace pricing
 * - Structured dietary badges and subtle entrance transitions
 */

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  SectionWrapper,
  SectionHeading,
  Card,
  Image,
  Badge,
} from '../../components/ui/index.js'
import { menuConfig } from '../../config/index.js'

export function MenuSection({ config = menuConfig, id = 'menu' }) {
  const { title, subtitle, categories = [], items = [] } = config
  const [activeCategory, setActiveCategory] = useState('all')
  const shouldReduceMotion = useReducedMotion()

  const filteredItems =
    activeCategory === 'all'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <SectionWrapper id={id} bg="default">
      <SectionHeading
        kicker="02 // HARVEST & EXTRACTION"
        title={title || 'Our Menu'}
        subtitle={subtitle}
        align="center"
        className="mb-12"
      />

      {/* Category Filter Tabs (Tactile Toggle Plates) */}
      {categories.length > 0 && (
        <div
          role="tablist"
          aria-label="Menu category filters"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            aria-controls="menu-items-grid"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-theme font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeCategory === 'all'
                ? 'bg-primary text-text-light border border-primary font-bold shadow-sm'
                : 'bg-surface text-text-muted border border-white/10 hover:border-white/30 hover:text-text-main'
            }`}
          >
            All Selections
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls="menu-items-grid"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-theme font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? 'bg-primary text-text-light border border-primary font-bold shadow-sm'
                    : 'bg-surface text-text-muted border border-white/10 hover:border-white/30 hover:text-text-main'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Menu Item Grid (1 col mobile -> 2 cols tablet -> 3 cols desktop) */}
      <motion.div
        id="menu-items-grid"
        layout={!shouldReduceMotion}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
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
                className="h-full flex flex-col group border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {item.image && (
                  <div className="relative overflow-hidden bg-black/40 border-b border-white/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      aspectRatio="landscape"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                    {item.featured && (
                      <div className="absolute top-3 right-3 z-10">
                        <Badge variant="accent" size="sm">
                          {'//'} FEATURED
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-baseline justify-between gap-3 mb-2.5">
                    <h3 className="font-heading text-xl sm:text-2xl font-normal text-text-main group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono text-base font-bold text-primary shrink-0">
                      {item.price}
                    </span>
                  </div>

                  <p className="font-body text-sm text-text-muted mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>

                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 mt-auto">
                      {item.dietary.map((tag) => (
                        <Badge key={tag} variant="secondary" size="sm">
                          [{tag}]
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  )
}
