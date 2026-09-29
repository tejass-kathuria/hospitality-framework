/**
 * Skeleton Component
 *
 * Reusable placeholder element providing subtle loading feedback
 * matching design token colors without causing layout shifts.
 */

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  theme: 'rounded-theme',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

export function Skeleton({ rounded = 'theme', className = '', ...props }) {
  const roundedClass = roundedStyles[rounded] || roundedStyles.theme

  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-text-muted/15 ${roundedClass} ${className}`.trim()}
      {...props}
    />
  )
}
