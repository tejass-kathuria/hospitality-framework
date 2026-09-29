/**
 * SectionWrapper Component
 *
 * Provides standard section-level vertical padding, HTML section tag wrapper,
 * ID attributes for smooth-scroll targeting, and theme background options.
 */

import { Container } from './Container.jsx'

const bgStyles = {
  default: 'bg-bg text-text-main',
  surface: 'bg-surface text-text-main',
  muted: 'bg-accent/20 text-text-main',
  dark: 'bg-text-main text-text-light',
}

export function SectionWrapper({
  id,
  children,
  className = '',
  bg = 'default',
  as: Component = 'section',
  containerize = true,
  ...props
}) {
  const baseStyles = 'py-16 md:py-24 transition-colors duration-300'
  const backgroundClass = bgStyles[bg] || bgStyles.default
  const combinedClasses = `${baseStyles} ${backgroundClass} ${className}`.trim()

  return (
    <Component id={id} className={combinedClasses} {...props}>
      {containerize ? <Container>{children}</Container> : children}
    </Component>
  )
}
