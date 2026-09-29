/**
 * Container Component
 *
 * Layout wrapper that constrains content max-width and applies responsive horizontal padding.
 */

export function Container({
  children,
  className = '',
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  )
}
