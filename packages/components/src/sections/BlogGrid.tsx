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

  const useCards =
    variant === "cards" || variant === "default" || variant === "bordered"

  return (
    <Section
      id={id}
      className={cn(
        "bg-muted/30 py-16 sm:py-24",
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
        <ul
          className={cn(
            "m-0 grid list-none gap-6 p-0",
            colClasses[columns],
            variant === "list" && "max-w-3xl grid-cols-1",
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
                    "border-border bg-card overflow-hidden rounded-lg border shadow-sm"
                )}
              >
                {item.image && (
                  <div className="bg-muted aspect-video w-full overflow-hidden">
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
                    variant === "list" &&
                      "border-border border-b py-4 last:border-0"
                  )}
                >
                  {item.date && (
                    <time
                      className="text-muted-foreground text-sm"
                      dateTime={item.date}
                    >
                      {item.date}
                    </time>
                  )}
                  <h3 className="text-foreground mt-1 line-clamp-2 font-semibold">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
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
