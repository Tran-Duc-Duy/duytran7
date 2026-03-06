/**
 * TrustBadges section — payment icons, SSL, guarantees.
 */

import type { TrustBadgesSection as TrustBadgesSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface TrustBadgesProps {
  config: TrustBadgesSectionConfig
  className?: string
}

const variantClasses: Record<string, string> = {
  default: "py-12 sm:py-16 bg-muted/30",
  inline: "py-6 flex flex-wrap justify-center gap-x-8 gap-y-2",
  grid: "py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
  minimal: "py-8 border-t border-b border-border",
  bordered: "py-12 rounded-xl border border-border bg-card",
  dark: "py-12 sm:py-16 bg-neutral-900 text-neutral-100",
}

export function TrustBadges({ config, className }: TrustBadgesProps) {
  const {
    id,
    title,
    subtitle,
    items,
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const isInline = variant === "inline"

  return (
    <Section
      id={id}
      className={cn(
        variantClasses[variant] ?? variantClasses.default,
        configClass,
        classes.root,
        className
      )}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg" className={classes.container}>
        {(title || subtitle) && !isInline && (
          <div className="mb-8 text-center">
            {title && (
              <h2
                id={`${id}-title`}
                className={cn(
                  "text-foreground text-xl font-semibold sm:text-2xl",
                  classes.title
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-muted-foreground mt-1 text-sm",
                  classes.subtitle
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div
          className={
            isInline
              ? "flex flex-wrap justify-center gap-x-8 gap-y-2"
              : "flex flex-wrap justify-center gap-6 sm:gap-10"
          }
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                "flex items-center gap-2 text-sm",
                item.href && "hover:underline"
              )}
            >
              {item.icon && (
                <span className="text-lg" aria-hidden>
                  {item.icon.length <= 2 ? (
                    item.icon
                  ) : (
                    <img
                      src={item.icon}
                      alt=""
                      className="h-6 w-6 object-contain"
                    />
                  )}
                </span>
              )}
              {item.href ? (
                <a href={item.href} className="font-medium">
                  {item.label}
                </a>
              ) : (
                <span className="font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
