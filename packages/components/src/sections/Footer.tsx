/**
 * Footer section — semantic footer, link groups, bottom bar.
 */

import type { FooterSection as FooterSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface FooterProps {
  config: FooterSectionConfig
  className?: string
}

export function Footer({ config, className }: FooterProps) {
  const {
    id,
    brand,
    linkGroups,
    bottom,
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const isMinimal = variant === "minimal"

  return (
    <Section
      as="footer"
      id={id}
      className={cn(
        "bg-muted/30 border-t py-12",
        configClass,
        classes.root,
        className
      )}
      role="contentinfo"
    >
      <Container size="lg" className={classes.container}>
        <div
          className={cn(
            !isMinimal && "grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {brand && (
            <div className="space-y-4">
              {brand.logo ? (
                <a href={brand.href ?? "#"} className="inline-block">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-8 w-auto"
                  />
                </a>
              ) : (
                <a
                  href={brand.href ?? "#"}
                  className="text-foreground font-semibold"
                >
                  {brand.name}
                </a>
              )}
            </div>
          )}
          {linkGroups?.map((group, i) => (
            <div key={i}>
              <h3 className="text-foreground text-sm font-semibold">
                {group.title}
              </h3>
              <ul className="mt-4 list-none space-y-2 p-0">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {bottom && (
          <div className="mt-12 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
            {bottom.text && (
              <p className="text-muted-foreground text-sm">{bottom.text}</p>
            )}
            {bottom.links && bottom.links.length > 0 && (
              <ul className="flex list-none flex-wrap gap-6 p-0">
                {bottom.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Container>
    </Section>
  )
}
