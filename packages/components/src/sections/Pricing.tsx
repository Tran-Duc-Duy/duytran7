/**
 * Pricing section — tiers with Card, highlighted tier emphasized.
 */

import type { PricingSection as PricingSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../primitives/Card"
import { Button } from "../primitives/Button"
import { cn } from "../utils/cn"

export interface PricingProps {
  config: PricingSectionConfig
  className?: string
}

export function Pricing({ config, className }: PricingProps) {
  const { id, title, subtitle, tiers, className: configClass } = config

  return (
    <Section
      id={id}
      className={cn("bg-muted/30 py-16 sm:py-24", configClass, className)}
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {tiers.map((tier, i) => (
            <Card
              key={i}
              className={cn(
                "flex flex-col",
                tier.highlighted && "border-primary shadow-lg lg:scale-105"
              )}
            >
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                {tier.description && (
                  <CardDescription>{tier.description}</CardDescription>
                )}
                <p className="mt-4">
                  <span className="text-foreground text-4xl font-bold">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground">
                      /{tier.period}
                    </span>
                  )}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="list-none space-y-2 p-0">
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className="text-muted-foreground flex items-center gap-2 text-sm"
                    >
                      <span className="text-primary" aria-hidden>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={cn(
                    tier.highlighted && "bg-primary text-primary-foreground"
                  )}
                  size="lg"
                >
                  <a href={tier.cta.href}>{tier.cta.label}</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
