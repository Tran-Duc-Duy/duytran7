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
        "py-16 sm:py-24 bg-muted/30",
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
              "mx-auto max-w-2xl",
              !isSplit && "text-center mb-12"
            )}
          >
            {title && (
              <h2
                id={`${id}-title`}
                className={cn(
                  "text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
                  classes.title
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
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
            isSplit && "grid gap-8 lg:grid-cols-2 lg:gap-12 items-start"
          )}
        >
          {hasAddress && (
            <div className={cn(isSplit && "lg:order-2")}>
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Address
                </h3>
                <p className="mt-2 text-muted-foreground">{address}</p>
                {linkUrl && (
                  <a
                    href={linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-primary hover:underline"
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
                "overflow-hidden rounded-lg border border-border bg-muted",
                variant === "full-width" && "aspect-video w-full",
                !variant || variant === "default" ? "aspect-video min-h-[280px]" : ""
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
