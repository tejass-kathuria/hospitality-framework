/**
 * Button Component
 *
 * Flexible, accessible button component supporting multiple visual variants,
 * sizes, and link/button behaviors.
 */

const variantStyles = {
  primary:
    'bg-primary text-text-light hover:bg-secondary hover:text-text-main focus-visible:ring-primary',
  secondary:
    'bg-accent text-text-main hover:bg-secondary focus-visible:ring-secondary',
  outline:
    'border border-primary text-primary hover:bg-primary hover:text-text-light focus-visible:ring-primary',
  ghost:
    'bg-transparent text-text-main hover:bg-accent/50 focus-visible:ring-primary',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg font-medium',
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
    'inline-flex items-center justify-center font-body rounded-theme transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

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
