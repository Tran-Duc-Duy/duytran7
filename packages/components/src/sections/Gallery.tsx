/**
 * Gallery section — image grid.
 */

import type { GallerySection as GallerySectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface GalleryProps {
  config: GallerySectionConfig
  className?: string
}

const colClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

export function Gallery({ config, className }: GalleryProps) {
  const {
    id,
    title,
    subtitle,
    images,
    columns = 3,
    variant = "default",
    className: configClass,
  } = config

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24", configClass, className)}
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
        <ul
          className={cn(
            "m-0 grid list-none gap-4 p-0",
            colClasses[columns],
            variant === "masonry" && "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {images.map((img, i) => (
            <li key={i}>
              {img.href ? (
                <a href={img.href} className="block overflow-hidden rounded-lg">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-64 w-full object-cover transition hover:scale-105"
                  />
                  {img.caption && (
                    <p className="text-muted-foreground mt-2 text-sm">
                      {img.caption}
                    </p>
                  )}
                </a>
              ) : (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-64 w-full object-cover"
                  />
                  {img.caption && (
                    <p className="text-muted-foreground mt-2 text-sm">
                      {img.caption}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
