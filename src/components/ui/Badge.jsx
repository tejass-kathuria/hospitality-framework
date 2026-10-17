/**
 * Badge Component
 *
 * Compact label primitive used for categories, dietary tags, stamps, and highlights.
 * Uses disciplined sharp geometry and monospace uppercase typography.
 */

const variantStyles = {
  primary: 'bg-primary/15 text-primary border border-primary/40',
  secondary: 'bg-surface text-text-muted border border-white/15',
  accent: 'bg-accent/20 text-accent border border-accent/40',
  outline: 'border border-white/20 text-text-muted bg-transparent',
  dark: 'bg-black/70 text-text-light border border-white/20',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[11px] font-mono tracking-wider uppercase',
  md: 'px-2.5 py-1 text-xs font-mono tracking-widest uppercase',
}

export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center font-semibold rounded-theme transition-colors'

  const combinedClasses =
    `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.sm} ${className}`.trim()

  return (
    <span className={combinedClasses} {...props}>
      {children}
    </span>
  )
}
