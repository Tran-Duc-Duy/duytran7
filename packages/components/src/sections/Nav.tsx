/**
 * Nav (header) section — semantic nav, accessible, SEO.
 */

import type { NavSection as NavSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { Button } from "../primitives/Button"
import { cn } from "../utils/cn"

export interface NavProps {
  config: NavSectionConfig
  className?: string
}

export function Nav({ config, className }: NavProps) {
  const {
    id,
    logo,
    links,
    cta,
    variant = "default",
    className: configClass,
  } = config

  const isCentered = variant === "centered"
  const isMinimal = variant === "minimal"

  return (
    <Section
      as="header"
      id={id}
      className={cn("bg-background border-b py-4", configClass, className)}
    >
      <Container size="lg">
        <nav
          className={cn(
            "flex items-center justify-between gap-4",
            isCentered && "flex-col sm:flex-row"
          )}
          aria-label="Main navigation"
        >
          {logo ? (
            <a
              href={logo.href ?? "#"}
              className="text-foreground flex items-center gap-2 font-semibold"
            >
              <img
                src={logo.src}
                alt={logo.alt || "Company logo"}
                className="h-8 w-auto"
              />
            </a>
          ) : (
            <span className="text-foreground font-semibold" />
          )}
          <ul
            className={cn(
              "flex list-none flex-wrap items-center gap-6 p-0",
              isCentered && "justify-center"
            )}
          >
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && !isMinimal && (
            <Button asChild size="sm">
              <a href={cta.href}>{cta.label}</a>
            </Button>
          )}
        </nav>
      </Container>
    </Section>
  )
}
