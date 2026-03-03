/**
 * Features section — grid of feature items, optional cards variant.
 */

import type { FeaturesSection as FeaturesSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../primitives/Card"
import { cn } from "../utils/cn"

export interface FeaturesProps {
  config: FeaturesSectionConfig
  className?: string
}

const colClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

export function Features({ config, className }: FeaturesProps) {
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

  const useCards = variant === "cards"

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
            "m-0 grid list-none gap-8 p-0",
            colClasses[columns],
            variant === "list" && "sm:grid-cols-1",
            classes.grid
          )}
        >
          {items.map((item, i) => (
            <li key={i}>
              {useCards ? (
                <Card className={cn("h-full", classes.card)}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={
                        item.title
                          ? `${item.title}${item.description ? ` — ${item.description}` : ""}`
                          : "Feature illustration"
                      }
                      className="h-48 w-full rounded-t-lg object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.description && (
                      <CardDescription>{item.description}</CardDescription>
                    )}
                  </CardHeader>
                  {!item.description && item.image && <CardContent />}
                </Card>
              ) : (
                <div>
                  <h3 className="text-foreground text-lg font-semibold">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-muted-foreground mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
