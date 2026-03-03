/**
 * Banner section — announcement / alert bar.
 */

import type { BannerSection as BannerSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface BannerProps {
  config: BannerSectionConfig
  className?: string
}

const variantClasses: Record<string, string> = {
  default: "bg-primary text-primary-foreground",
  warning: "bg-amber-500 text-white",
  success: "bg-emerald-600 text-white",
  info: "bg-blue-600 text-white",
  gradient:
    "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
  icon: "bg-primary text-primary-foreground",
  minimal: "bg-muted text-muted-foreground border-b",
  bordered: "border bg-background text-foreground",
  dark: "bg-neutral-900 text-white",
  compact: "py-2 text-xs bg-primary text-primary-foreground",
}

export function Banner({ config, className }: BannerProps) {
  const {
    id,
    message,
    cta,
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  return (
    <Section
      id={id}
      as="section"
      className={cn(
        "py-3 text-center text-sm font-medium",
        variantClasses[variant] ?? variantClasses.default,
        configClass,
        classes.root,
        className
      )}
    >
      <Container size="full" className={classes.container}>
        <span className={classes.message}>{message}</span>
        {cta && (
          <>
            {" "}
            <a
              href={cta.href}
              className={cn(
                "font-semibold underline underline-offset-2 hover:no-underline",
                classes.cta
              )}
            >
              {cta.label}
            </a>
          </>
        )}
      </Container>
    </Section>
  )
}
