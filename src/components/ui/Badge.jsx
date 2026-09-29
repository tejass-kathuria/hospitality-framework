/**
 * Badge Component
 *
 * Small tag/label primitive used for categories, dietary tags, and highlights.
 */

const variantStyles = {
  primary: 'bg-primary/10 text-primary border border-primary/20',
  secondary: 'bg-secondary/20 text-text-main border border-secondary/30',
  accent: 'bg-accent text-text-main',
  outline: 'border border-text-muted/30 text-text-muted',
}

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3.5 py-1 text-sm',
}

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center font-body font-medium rounded-full tracking-wide transition-colors'

  const combinedClasses =
    `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.sm} ${className}`.trim()

  return (
    <span className={combinedClasses} {...props}>
      {children}
    </span>
  )
}
