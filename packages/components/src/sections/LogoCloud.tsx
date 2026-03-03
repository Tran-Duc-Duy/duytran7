/**
 * Logo cloud section — trusted by / used by logos.
 */

import type { LogoCloudSection as LogoCloudSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface LogoCloudProps {
  config: LogoCloudSectionConfig
  className?: string
}

export function LogoCloud({ config, className }: LogoCloudProps) {
  const {
    id,
    title,
    items,
    variant = "default",
    className: configClass,
  } = config

  return (
    <Section
      id={id}
      className={cn("bg-muted/30 py-12 sm:py-16", configClass, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg">
        {title && (
          <p
            id={`${id}-title`}
            className="text-muted-foreground mb-8 text-center text-sm font-semibold uppercase tracking-wider"
          >
            {title}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href ?? "#"}
              className={cn(
                "flex h-12 w-auto items-center opacity-70 transition hover:opacity-100",
                variant === "grayscale" && "grayscale hover:grayscale-0"
              )}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="max-h-12 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
