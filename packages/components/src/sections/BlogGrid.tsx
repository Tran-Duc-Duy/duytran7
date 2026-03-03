/**
 * Blog grid section — list of article/post cards (image, title, excerpt, link).
 */

import type { BlogGridSection as BlogGridSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface BlogGridProps {
  config: BlogGridSectionConfig
  className?: string
}

const colClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

export function BlogGrid({ config, className }: BlogGridProps) {
  const {
    id,
    title,
    subtitle,
    items,
    columns = 3,
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const useCards = variant === "cards" || variant === "default" || variant === "bordered"

  return (
    <Section
      id={id}
      className={cn(
        "py-16 sm:py-24 bg-muted/30",
        configClass,
        classes.root,
        className
      )}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg" className={classes.container}>
        {(title || subtitle) && (
          <div
            className={cn(
              "mx-auto mb-12 max-w-2xl text-center", classes.header
            )}
          >
            {title && (
              <h2
                id={`${id}-title`}
                className={cn(
                  "text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
                  classes.title
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
                  classes.subtitle
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <ul
          className={cn(
            "grid gap-6 list-none p-0 m-0",
            colClasses[columns],
            variant === "list" && "grid-cols-1 max-w-3xl",
            classes.grid
          )}
        >
          {items.map((item, i) => (
            <li key={i}>
              <a
                href={item.href}
                className={cn(
                  "block h-full transition hover:opacity-90",
                  useCards &&
                    "rounded-lg border border-border bg-card overflow-hidden shadow-sm"
                )}
              >
                {item.image && (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={cn(
                    useCards && "p-5",
                    variant === "list" && "py-4 border-b border-border last:border-0"
                  )}
                >
                  {item.date && (
                    <time
                      className="text-sm text-muted-foreground"
                      dateTime={item.date}
                    >
                      {item.date}
                    </time>
                  )}
                  <h3 className="mt-1 font-semibold text-foreground line-clamp-2">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
