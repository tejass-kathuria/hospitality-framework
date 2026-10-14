/**
 * SectionHeading Component
 *
 * Editorial section header block featuring monospace kicker stamp,
 * dominant Special Elite heading without faux-bolding, and descriptive subtitle.
 */

const alignStyles = {
  left: 'text-left items-start',
  center: 'text-center items-center mx-auto',
  right: 'text-right items-end ml-auto',
}

export function SectionHeading({
  title,
  subtitle,
  kicker,
  align = 'center',
  titleAs: TitleTag = 'h2',
  className = '',
  ...props
}) {
  const alignmentClass = alignStyles[align] || alignStyles.center

  return (
    <div
      className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignmentClass} ${className}`.trim()}
      {...props}
    >
      {kicker && (
        <div className="mb-3">
          {typeof kicker === 'string' ? (
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <span className="opacity-60">{'//'}</span>
              <span>{kicker}</span>
            </span>
          ) : (
            kicker
          )}
        </div>
      )}

      {title && (
        <TitleTag className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-normal tracking-tight text-text-main leading-[1.1]">
          {title}
        </TitleTag>
      )}

      {subtitle && (
        <p className="mt-4 font-body text-base sm:text-lg text-text-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}
