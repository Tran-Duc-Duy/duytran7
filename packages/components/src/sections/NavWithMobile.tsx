/**
 * Client Nav with hamburger + sheet on small viewports. Use when config.mobile.menu === "hamburger".
 */

"use client"

import { useState } from "react"
import type { NavSection as NavSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { Button } from "../primitives/Button"
import { cn } from "../utils/cn"

export interface NavWithMobileProps {
  config: NavSectionConfig
  className?: string
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex h-5 w-6 flex-col justify-center gap-1"
      aria-hidden
    >
      <span
        className={cn(
          "h-0.5 w-6 bg-current transition-transform",
          open && "translate-y-1.5 rotate-45"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-6 bg-current transition-opacity",
          open && "opacity-0"
        )}
      />
      <span
        className={cn(
          "h-0.5 w-6 bg-current transition-transform",
          open && "-translate-y-1.5 -rotate-45"
        )}
      />
    </span>
  )
}

export function NavWithMobile({ config, className }: NavWithMobileProps) {
  const {
    id,
    logo,
    links,
    extraLinks = [],
    cta,
    variant = "default",
    mobile,
  } = config
  const [open, setOpen] = useState(false)
  const isRight = mobile?.sheetPosition === "right"
  const isMinimal = variant === "minimal"

  const allLinks = [...links, ...extraLinks]

  return (
    <Section
      as="header"
      id={id}
      className={cn("bg-background border-b py-4", className)}
      aria-label="Main navigation"
    >
      <Container size="lg">
        <nav className="flex items-center justify-between gap-4">
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

          {/* Desktop: inline links + CTA */}
          <ul
            className={cn(
              "text-muted-foreground hidden list-none flex-wrap items-center gap-6 p-0 md:flex",
              variant === "centered" && "justify-center"
            )}
          >
            {allLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && !isMinimal && (
            <div className="hidden md:block">
              <Button asChild size="sm">
                <a href={cta.href}>{cta.label}</a>
              </Button>
            </div>
          )}

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="text-foreground hover:bg-muted focus:ring-muted flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            aria-expanded={open}
            aria-controls={`${id}-sheet`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={open} />
          </button>
        </nav>
      </Container>

      {/* Sheet overlay + panel */}
      <div
        id={`${id}-sheet`}
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          !open && "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "bg-background/80 fixed inset-0 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <div
          className={cn(
            "bg-background border-foreground/10 flex h-full w-full max-w-sm flex-col border shadow-xl transition-transform duration-200",
            isRight ? "ml-auto" : "mr-auto",
            open
              ? "translate-x-0"
              : isRight
                ? "translate-x-full"
                : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b p-4">
            {logo && (
              <a
                href={logo.href ?? "#"}
                className="text-foreground flex items-center gap-2 font-semibold"
                onClick={() => setOpen(false)}
              >
                <img
                  src={logo.src}
                  alt={logo.alt || ""}
                  className="h-8 w-auto"
                />
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground flex h-10 w-10 items-center justify-center rounded-md"
              aria-label="Close menu"
            >
              <HamburgerIcon open={true} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col gap-1 p-4">
            {allLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="text-foreground hover:bg-muted block rounded-md px-3 py-2 font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && (
            <div className="border-t p-4">
              <Button asChild className="w-full" size="lg">
                <a href={cta.href} onClick={() => setOpen(false)}>
                  {cta.label}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
