/**
 * Testimonials section — quotes grid/carousel placeholder (carousel logic injectable from outside).
 */

import type { TestimonialsSection as TestimonialsSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { Card, CardContent } from "../primitives/Card"
import { cn } from "../utils/cn"

export interface TestimonialsProps {
  config: TestimonialsSectionConfig
  className?: string
}

export function Testimonials({ config, className }: TestimonialsProps) {
  const {
    id,
    title,
    subtitle,
    items,
    variant = "default",
    className: configClass,
  } = config

  const isGrid = variant === "grid"

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
                className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-4 text-lg">{subtitle}</p>
            )}
          </div>
        )}
        <ul
          className={cn(
            "m-0 grid list-none gap-6 p-0",
            isGrid
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : "sm:grid-cols-1 lg:grid-cols-2"
          )}
        >
          {items.map((item, i) => (
            <li key={i}>
              <Card className="h-full">
                <CardContent className="pt-6">
                  <blockquote className="text-muted-foreground">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                  <footer className="mt-4 flex items-center gap-3">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={`${item.author}${item.role ? `, ${item.role}` : ""}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <cite className="text-foreground font-medium not-italic">
                        {item.author}
                      </cite>
                      {item.role && (
                        <p className="text-muted-foreground text-sm">
                          {item.role}
                        </p>
                      )}
                    </div>
                  </footer>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
