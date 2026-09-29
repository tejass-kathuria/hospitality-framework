/**
 * Card Component
 *
 * Flexible content container used for menu items, testimonials, events, and cards.
 * Supports multiple visual variants, padding options, and hover interactions.
 */

const variantStyles = {
  default: 'bg-surface border border-text-muted/15 shadow-sm',
  elevated:
    'bg-surface border border-text-muted/10 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
  outline: 'bg-surface border-2 border-primary/20 hover:border-primary/50',
  ghost: 'bg-transparent border-none shadow-none',
}

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  as: Component = 'div',
  onClick,
  ...props
}) {
  const baseStyles = 'rounded-theme overflow-hidden transition-colors'
  const variantClass = variantStyles[variant] || variantStyles.default
  const paddingClass = paddingStyles[padding] || paddingStyles.md
  const interactiveClass = onClick ? 'cursor-pointer' : ''

  const combinedClasses =
    `${baseStyles} ${variantClass} ${paddingClass} ${interactiveClass} ${className}`.trim()

  return (
    <Component className={combinedClasses} onClick={onClick} {...props}>
      {children}
    </Component>
  )
}
