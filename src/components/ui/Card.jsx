/**
 * Card Component
 *
 * Architectural content compartment used for menu items, testimonials, events, and highlights.
 * Uses hairline borders, matte basalt surfaces, and clean hover state transitions.
 */

const variantStyles = {
  default: 'bg-surface border border-white/10 transition-colors duration-200',
  elevated:
    'bg-surface border border-white/10 hover:border-white/30 hover:bg-[#1a1a1e] transition-all duration-200',
  outline:
    'bg-transparent border border-white/15 hover:border-primary/60 transition-colors duration-200',
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
  const baseStyles = 'rounded-theme overflow-hidden'
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
