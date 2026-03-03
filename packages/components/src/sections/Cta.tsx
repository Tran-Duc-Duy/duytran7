/**
 * CTA section — call-to-action block, SEO-friendly heading.
 */

import type { CtaSection as CtaSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { Button } from "../primitives/Button"
import { cn } from "../utils/cn"

export interface CtaProps {
  config: CtaSectionConfig
  className?: string
}

export function Cta({ config, className }: CtaProps) {
  const {
    id,
    title,
    subtitle,
    primaryCta,
    secondaryCta,
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const isBanner = variant === "banner"
  const isCard = variant === "card"

  return (
    <Section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        isBanner && "bg-primary text-primary-foreground",
        isCard && "bg-muted/30",
        configClass,
        classes.root,
        className
      )}
      aria-labelledby={`${id}-title`}
    >
      <Container size="md" className={classes.container}>
        <div
          className={cn(
            "text-center",
            isCard &&
              "bg-card text-card-foreground rounded-lg border p-8 shadow-sm sm:p-12",
            classes.inner
          )}
        >
          <h2
            id={`${id}-title`}
            className={cn(
              "text-3xl font-bold tracking-tight sm:text-4xl",
              isBanner ? "text-primary-foreground" : "text-foreground",
              classes.title
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={cn(
                "mt-4 text-lg",
                isBanner
                  ? "text-primary-foreground/90"
                  : "text-muted-foreground",
                classes.subtitle
              )}
            >
              {subtitle}
            </p>
          )}
          <div className={cn("mt-8 flex flex-wrap justify-center gap-4", classes.actions)}>
            <Button
              asChild
              size="lg"
              className={cn(
                isBanner &&
                  "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                classes.primaryButton
              )}
            >
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
            {secondaryCta && (
              <Button
                asChild
                variant={isBanner ? "outline" : "secondary"}
                size="lg"
                className={cn(
                  isBanner &&
                    "border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10",
                  classes.secondaryButton
                )}
              >
                <a href={secondaryCta.href}>{secondaryCta.label}</a>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
