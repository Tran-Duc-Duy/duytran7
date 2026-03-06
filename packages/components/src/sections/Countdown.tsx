/**
 * Countdown section — target date/time. Renders remaining time at build/render (static).
 * For live ticking, hydrate with a client script or use a client wrapper.
 */

import React from "react"
import type { CountdownSection as CountdownSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface CountdownProps {
  config: CountdownSectionConfig
  className?: string
}

function parseRemaining(targetDate: string): {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
} {
  const target = new Date(targetDate).getTime()
  const now = Date.now()
  const diff = Math.max(0, target - now)
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }
  const days = Math.floor(diff / (24 * 60 * 60 * 1000))
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((diff % (60 * 1000)) / 1000)
  return { days, hours, minutes, seconds, expired: false }
}

function pad(n: number): string {
  return String(n).padStart(2, "0")
}

const variantClasses: Record<string, string> = {
  default: "py-16 sm:py-24 bg-muted/20",
  compact: "py-8 sm:py-12",
  minimal: "py-6 border-y border-border",
  banner: "py-6 bg-primary text-primary-foreground",
  dark: "py-16 sm:py-24 bg-neutral-900 text-white",
}

export function Countdown({ config, className }: CountdownProps) {
  const {
    id,
    targetDate,
    title,
    subtitle,
    cta,
    expiredLabel = "Ended",
    variant = "default",
    className: configClass,
    classes = {},
  } = config

  const remaining = parseRemaining(targetDate)

  return (
    <Section
      id={id}
      className={cn(
        variantClasses[variant] ?? variantClasses.default,
        configClass,
        classes.root,
        className
      )}
      aria-live="polite"
      aria-label={title ?? "Countdown"}
    >
      <Container size="lg" className={cn("text-center", classes.container)}>
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2
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
        {remaining.expired ? (
          <div className="text-xl font-semibold">{expiredLabel}</div>
        ) : (
          <div
            className="flex flex-wrap justify-center gap-4 sm:gap-8"
            role="timer"
          >
            <div className="bg-background/80 flex min-w-[4rem] flex-col rounded-lg px-4 py-3 shadow-sm">
              <span className="text-2xl font-bold sm:text-3xl">
                {pad(remaining.days)}
              </span>
              <span className="text-muted-foreground text-xs">Days</span>
            </div>
            <div className="bg-background/80 flex min-w-[4rem] flex-col rounded-lg px-4 py-3 shadow-sm">
              <span className="text-2xl font-bold sm:text-3xl">
                {pad(remaining.hours)}
              </span>
              <span className="text-muted-foreground text-xs">Hours</span>
            </div>
            <div className="bg-background/80 flex min-w-[4rem] flex-col rounded-lg px-4 py-3 shadow-sm">
              <span className="text-2xl font-bold sm:text-3xl">
                {pad(remaining.minutes)}
              </span>
              <span className="text-muted-foreground text-xs">Minutes</span>
            </div>
            <div className="bg-background/80 flex min-w-[4rem] flex-col rounded-lg px-4 py-3 shadow-sm">
              <span className="text-2xl font-bold sm:text-3xl">
                {pad(remaining.seconds)}
              </span>
              <span className="text-muted-foreground text-xs">Seconds</span>
            </div>
          </div>
        )}
        {cta && (
          <div className="mt-8">
            <a
              href={cta.href}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-6 py-2.5 text-sm font-medium"
            >
              {cta.label}
            </a>
          </div>
        )}
      </Container>
    </Section>
  )
}
