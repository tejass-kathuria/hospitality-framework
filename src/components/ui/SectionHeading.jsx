/**
 * SectionHeading Component
 *
 * Standardized section title block featuring an optional eyebrow/kicker badge,
 * main heading, and descriptive subtitle with alignment choices.
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
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-primary">
              {kicker}
            </span>
          ) : (
            kicker
          )}
        </div>
      )}

      {title && (
        <TitleTag className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-main leading-tight">
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
