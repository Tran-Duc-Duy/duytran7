/**
 * Hero section — renders from HeroSection config, SEO-friendly (h1 for headline).
 */

import type { HeroSection as HeroSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { Button } from "../primitives/Button"
import { cn } from "../utils/cn"

export interface HeroProps {
  config: HeroSectionConfig
  className?: string
}

/** True if value looks like a Tailwind class (bg-*, from-*, …), not a CSS color (#hex, rgb(), …). */
function looksLikeTailwindClass(s: string): boolean {
  const v = s.trim()
  if (!v) return false
  if (v.startsWith("bg-") || v.startsWith("from-") || v.startsWith("to-") || v.startsWith("via-"))
    return true
  if (/^#[0-9A-Fa-f]{3,8}$/.test(v)) return false
  if (/^rgb\(/.test(v) || /^rgba\(/.test(v) || /^hsl\(/.test(v) || /^hsla\(/.test(v)) return false
  return true
}

const heroVariantClasses: Record<string, string> = {
  default: "py-16 sm:py-24",
  centered: "py-16 sm:py-24",
  split: "py-16 sm:py-24",
  minimal: "py-12 sm:py-16",
  gradient: "py-16 sm:py-24 bg-gradient-to-b from-muted/50 to-background",
  badge: "py-16 sm:py-24",
  left: "py-16 sm:py-24",
  "right-image": "py-16 sm:py-24",
  dark: "py-16 sm:py-24 bg-neutral-900 text-white",
  floating: "py-16 sm:py-24",
}

export function Hero({ config, className }: HeroProps) {
  const {
    id,
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
    image,
    badge,
    variant = "default",
    background,
    fontFamily,
    className: configClass,
    classes = {},
  } = config

  const isCentered = ["centered", "minimal", "gradient", "badge", "floating"].includes(variant ?? "")
  const isSplitLayout = variant === "split" || variant === "right-image"
  const isRightImage = variant === "right-image"
  const sectionClass = heroVariantClasses[variant ?? "default"] ?? heroVariantClasses.default
  const isDark = variant === "dark"

  return (
    <Section
      as="section"
      id={id}
      className={cn(
        sectionClass,
        "relative z-0 overflow-hidden",
        isDark && "[&_.text-muted-foreground]:text-neutral-300",
        configClass,
        classes.root,
        className
      )}
      style={fontFamily ? { fontFamily } : undefined}
      aria-labelledby={`${id}-heading`}
    >
      {background?.type === "color" && background.color && (
        <>
          <div
            className={cn(
              "absolute inset-0 -z-10",
              looksLikeTailwindClass(background.color) ? background.color : undefined
            )}
            style={
              looksLikeTailwindClass(background.color)
                ? undefined
                : { backgroundColor: background.color }
            }
          />
          {background.overlay && (
            <div className={cn("absolute inset-0 -z-10", background.overlay)} aria-hidden />
          )}
        </>
      )}
      {background?.type === "image" && background.url && (
        <div
          className={cn("absolute inset-0 -z-10 bg-cover bg-center", background.overlay)}
          style={{ backgroundImage: `url(${background.url})` }}
        />
      )}
      {background?.type === "gradient" && background.gradientCss && (
        <div
          className={cn("absolute inset-0 -z-10", background.overlay)}
          style={{ background: background.gradientCss }}
        />
      )}
      {background?.type === "lottie" && background.url && (
        <div
          className={cn("absolute inset-0 -z-10 flex items-center justify-center", background.overlay)}
          data-landing-bg="lottie"
          data-lottie-url={background.url}
          aria-hidden
        >
          {/* App can inject Lottie player here via data-lottie-url */}
        </div>
      )}
      {background?.type === "video" && background.url && (
        <div className={cn("absolute inset-0 -z-10", background.overlay)}>
          <video
            src={background.url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            aria-hidden
          />
        </div>
      )}
      <Container size="lg" className={cn("relative", classes.container)}>
        <div className={cn(classes.animation)}>
        <div
          className={cn(
            "flex flex-col gap-8",
            isSplitLayout && "lg:flex-row lg:items-center lg:gap-12",
            isRightImage && "lg:flex-row-reverse",
            isCentered && "text-center"
          )}
        >
          <div className={cn("flex-1", isCentered && "mx-auto max-w-3xl")}>
            {badge && (
              <p
                className={cn(
                  "mb-4 inline-block rounded-full border bg-muted/50 px-4 py-1 text-sm font-medium text-muted-foreground",
                  classes.badge
                )}
              >
                {badge}
              </p>
            )}
            <h1
              id={`${id}-heading`}
              className={cn(
                "text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl",
                classes.title
              )}
            >
              {headline}
            </h1>
            {subheadline && (
              <p
                className={cn(
                  "text-muted-foreground mt-4 text-lg sm:text-xl",
                  classes.subtitle
                )}
              >
                {subheadline}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div
                className={cn(
                  "mt-8 flex flex-wrap gap-4",
                  isCentered && "justify-center"
                )}
              >
                {primaryCta && (
                  <Button asChild size="lg" className={classes.primaryButton}>
                    <a href={primaryCta.href}>{primaryCta.label}</a>
                  </Button>
                )}
                {secondaryCta && (
                  <Button asChild variant="outline" size="lg" className={classes.secondaryButton}>
                    <a href={secondaryCta.href}>{secondaryCta.label}</a>
                  </Button>
                )}
              </div>
            )}
          </div>
          {image && isSplitLayout && (
            <div className={cn("flex-1", classes.image)}>
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-lg object-cover shadow-lg"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}
        </div>
        {image && !isSplitLayout && (variant === "default" || variant === "left") && (
          <div className={cn("mt-12", classes.image)}>
            <img
              src={image.src}
              alt={image.alt}
              className="mx-auto rounded-lg object-cover shadow-lg"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        )}
        </div>
      </Container>
    </Section>
  )
}
