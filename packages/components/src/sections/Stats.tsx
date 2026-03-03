/**
 * Stats section — KPI / numbers row.
 */

import type { StatsSection as StatsSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface StatsProps {
  config: StatsSectionConfig
  className?: string
}

const colClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

export function Stats({ config, className }: StatsProps) {
  const {
    id,
    title,
    subtitle,
    items,
    columns = 4,
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24", configClass, classes.root, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg" className={classes.container}>
        {(title || subtitle) && (
          <div
            className={cn(
              "mx-auto mb-12 max-w-2xl text-center",
              classes.header
            )}
          >
            {title && (
              <h2
                id={`${id}-title`}
                className={cn(
                  "text-foreground text-3xl font-bold tracking-tight sm:text-4xl",
                  classes.title
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-muted-foreground mt-4 text-lg",
                  classes.subtitle
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <dl
          className={cn(
            "m-0 grid list-none gap-8 p-0",
            colClasses[columns],
            variant === "bordered" &&
              "divide-border bg-card divide-y rounded-lg border p-6",
            variant === "minimal" && "text-center"
          )}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={cn(
                variant === "bordered" && "py-4 first:pt-0 last:pb-0"
              )}
            >
              <dt className="text-foreground text-3xl font-bold sm:text-4xl">
                {item.value}
                {item.suffix && (
                  <span className="text-muted-foreground font-normal">
                    {item.suffix}
                  </span>
                )}
              </dt>
              {item.label && (
                <dd className="text-muted-foreground mt-1 text-sm">
                  {item.label}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
