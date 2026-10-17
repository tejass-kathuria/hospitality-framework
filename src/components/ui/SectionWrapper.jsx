/**
 * SectionWrapper Component
 *
 * Provides standard section-level vertical padding, HTML section tag wrapper,
 * ID attributes for smooth-scroll targeting, and dark editorial surface choices.
 */

import { Container } from './Container.jsx'

const bgStyles = {
  default: 'bg-bg text-text-main',
  surface: 'bg-surface text-text-main border-y border-white/5',
  muted: 'bg-[#111114] text-text-main border-y border-white/5',
  dark: 'bg-black text-text-light',
  brick: 'bg-raw-brick text-text-main border-y border-white/10',
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
  const baseStyles = 'py-20 md:py-28 transition-colors duration-300 relative'
  const backgroundClass = bgStyles[bg] || bgStyles.default
  const combinedClasses = `${baseStyles} ${backgroundClass} ${className}`.trim()

  return (
    <Component id={id} className={combinedClasses} {...props}>
      {containerize ? <Container>{children}</Container> : children}
    </Component>
  )
}
