/**
 * VideoEmbed section — YouTube, Vimeo, or self-hosted video with optional title.
 */

import type { VideoEmbedSection as VideoEmbedSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface VideoEmbedProps {
  config: VideoEmbedSectionConfig
  className?: string
}

const variantClasses: Record<string, string> = {
  default: "py-16 sm:py-24",
  centered: "py-16 sm:py-24 text-center",
  bordered: "py-16 sm:py-24 rounded-xl border border-border bg-muted/20",
  floating: "py-16 sm:py-24 shadow-xl rounded-2xl bg-muted/30",
  minimal: "py-8 sm:py-12",
}

export function VideoEmbed({ config, className }: VideoEmbedProps) {
  const {
    id,
    title,
    subtitle,
    embedUrl,
    aspectRatio = "16/9",
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const aspectClass =
    aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "1/1"
        ? "aspect-square"
        : "aspect-video"

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
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2
                id={`${id}-title`}
                className={cn(
                  "text-foreground text-2xl font-bold sm:text-3xl",
                  classes.title
                )}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "text-muted-foreground mt-2 text-lg",
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
            "bg-muted w-full overflow-hidden rounded-lg",
            aspectClass
          )}
        >
          <iframe
            src={embedUrl}
            title={title ?? "Video"}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Container>
    </Section>
  )
}
