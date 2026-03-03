/**
 * Map / Location section — embedded map (e.g. Google Maps iframe) + address.
 */

import type { MapSection as MapSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface MapProps {
  config: MapSectionConfig
  className?: string
}

export function Map({ config, className }: MapProps) {
  const {
    id,
    title,
    subtitle,
    address,
    mapEmbedUrl,
    linkUrl,
    linkLabel = "Open in Maps",
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const hasMap = Boolean(mapEmbedUrl)
  const hasAddress = Boolean(address)
  const isSplit = variant === "split" && hasMap && hasAddress

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
            className={cn("mx-auto max-w-2xl", !isSplit && "mb-12 text-center")}
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
        <div
          className={cn(
            isSplit && "grid items-start gap-8 lg:grid-cols-2 lg:gap-12"
          )}
        >
          {hasAddress && (
            <div className={cn(isSplit && "lg:order-2")}>
              <div className="border-border bg-card rounded-lg border p-6">
                <h3 className="text-foreground text-lg font-semibold">
                  Address
                </h3>
                <p className="text-muted-foreground mt-2">{address}</p>
                {linkUrl && (
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary mt-4 inline-flex hover:underline"
                  >
                    {linkLabel}
                  </a>
                )}
              </div>
            </div>
          )}
          {hasMap && (
            <div
              className={cn(
                "border-border bg-muted overflow-hidden rounded-lg border",
                variant === "full-width" && "aspect-video w-full",
                !variant || variant === "default"
                  ? "aspect-video min-h-[280px]"
                  : ""
              )}
            >
              <iframe
                title={title ?? "Map"}
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
