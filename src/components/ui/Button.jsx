/**
 * Button Component
 *
 * Tactile, architectural button component supporting multiple visual variants,
 * sharp geometry, uppercase monospace tracking, and accessible focus states.
 */

const variantStyles = {
  primary:
    'bg-primary text-text-light border border-primary hover:bg-text-main hover:text-bg hover:border-text-main focus-visible:ring-primary shadow-sm',
  secondary:
    'bg-surface text-text-main border border-white/20 hover:border-text-main hover:bg-white/10 focus-visible:ring-text-main',
  outline:
    'bg-transparent border border-white/30 text-text-main hover:bg-text-main hover:text-bg hover:border-text-main focus-visible:ring-primary',
  ghost:
    'bg-transparent text-text-muted hover:text-text-main hover:bg-white/5 focus-visible:ring-primary',
}

const sizeStyles = {
  sm: 'px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase font-semibold',
  md: 'px-5 py-2.5 text-xs sm:text-sm font-mono tracking-wider uppercase font-semibold',
  lg: 'px-7 py-3.5 text-sm sm:text-base font-mono tracking-widest uppercase font-semibold',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  href,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-theme transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:translate-y-[1px]'

  const combinedClasses =
    `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
