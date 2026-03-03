/**
 * Timeline section — vertical or horizontal timeline.
 */

import type { TimelineSection as TimelineSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface TimelineProps {
  config: TimelineSectionConfig
  className?: string
}

export function Timeline({ config, className }: TimelineProps) {
  const {
    id,
    title,
    subtitle,
    items,
    variant = "default",
    className: configClass,
  } = config

  const isVertical = variant === "vertical" || variant === "default"
  const isHorizontal = variant === "horizontal"

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24", configClass, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2
                id={`${id}-title`}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {isVertical && (
          <ul className="relative list-none border-l border-border pl-6 sm:pl-8">
            {items.map((item, i) => (
              <li key={i} className="relative pb-10 last:pb-0">
                <span
                  className="absolute -left-[1.6rem] top-0 h-4 w-4 rounded-full border-2 border-primary bg-background sm:-left-8"
                  aria-hidden
                />
                {item.date && (
                  <p className="text-sm font-medium text-muted-foreground">{item.date}</p>
                )}
                <h3 className="mt-1 text-lg font-semibold text-foreground">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
        {isHorizontal && (
          <ul className="flex flex-wrap justify-center gap-8 list-none p-0">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex max-w-xs flex-col rounded-lg border bg-card p-6 text-center"
              >
                {item.date && (
                  <p className="text-sm font-medium text-muted-foreground">{item.date}</p>
                )}
                <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  )
}
