/**
 * Newsletter section — email signup (form posts to actionUrl; consumer can handle server-side).
 */

import type { NewsletterSection as NewsletterSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface NewsletterProps {
  config: NewsletterSectionConfig
  className?: string
}

export function Newsletter({ config, className }: NewsletterProps) {
  const {
    id,
    title,
    subtitle,
    placeholder = "Enter your email",
    submitLabel = "Subscribe",
    actionUrl = "#",
    variant = "default",
    className: configClass,
  } = config

  const isInline = variant === "inline"
  const isMinimal = variant === "minimal"

  return (
    <Section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        variant === "default" && "bg-muted/30",
        configClass,
        className
      )}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size={isMinimal ? "md" : "lg"}>
        <div
          className={cn(
            "mx-auto max-w-2xl",
            isMinimal ? "text-center" : "rounded-lg border bg-card p-8 text-center shadow-sm sm:p-12"
          )}
        >
          {(title || subtitle) && (
            <>
              {title && (
                <h2
                  id={`${id}-title`}
                  className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="mt-2 text-muted-foreground">{subtitle}</p>
              )}
            </>
          )}
          <form
            action={actionUrl}
            method="post"
            className={cn(
              "mt-6",
              isInline ? "flex flex-col gap-3 sm:flex-row sm:justify-center" : "flex flex-col gap-3 sm:flex-row sm:justify-center"
            )}
            aria-label="Newsletter signup"
          >
            <label htmlFor={`${id}-email`} className="sr-only">
              {placeholder}
            </label>
            <input
              id={`${id}-email`}
              type="email"
              name="email"
              placeholder={placeholder}
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
              autoComplete="email"
              aria-label={placeholder}
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
              aria-label={submitLabel}
            >
              {submitLabel}
            </button>
          </form>
        </div>
      </Container>
    </Section>
  )
}
