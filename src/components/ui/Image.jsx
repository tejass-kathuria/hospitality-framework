/**
 * Image Component
 *
 * Robust image primitive supporting lazy loading, defined aspect ratios,
 * object-fit styles, theme-matched border radius, async decoding,
 * and built-in skeleton loading & error fallbacks.
 */

import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { Skeleton } from './Skeleton.jsx'

const aspectStyles = {
  auto: 'aspect-auto',
  square: 'aspect-square', // 1:1
  video: 'aspect-video', // 16:9
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

const fitStyles = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
}

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  theme: 'rounded-theme',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function Image({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
  rounded = 'theme',
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  onLoad,
  onError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const aspectClass = aspectStyles[aspectRatio] || aspectStyles.auto
  const fitClass = fitStyles[objectFit] || fitStyles.cover
  const roundedClass = roundedStyles[rounded] || roundedStyles.theme

  const handleLoad = (e) => {
    setIsLoaded(true)
    if (onLoad) onLoad(e)
  }

  const handleError = (e) => {
    setHasError(true)
    setIsLoaded(true)
    if (onError) onError(e)
  }

  return (
    <div
      className={`overflow-hidden relative ${aspectClass} ${roundedClass} ${className}`.trim()}
    >
      {/* Skeleton placeholder until image loads */}
      {!isLoaded && !hasError && (
        <Skeleton
          rounded="none"
          className="absolute inset-0 w-full h-full z-0"
        />
      )}

      {/* Graceful error fallback */}
      {hasError ? (
        <div
          role="img"
          aria-label={alt || 'Image failed to load'}
          className="w-full h-full flex flex-col items-center justify-center bg-surface text-text-muted p-4 text-center"
        >
          <ImageOff className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs font-body opacity-70">
            {alt || 'Image unavailable'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding={decoding}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${fitClass} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  )
}
