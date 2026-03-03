/**
 * Contact section — contact info and/or simple form.
 */

import type { ContactSection as ContactSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface ContactProps {
  config: ContactSectionConfig
  className?: string
}

export function Contact({ config, className }: ContactProps) {
  const {
    id,
    title,
    subtitle,
    email,
    phone,
    address,
    formLabels,
    actionUrl = "#",
    variant = "default",
    className: configClass,
  } = config

  const hasInfo = email || phone || address
  const hasForm = formLabels !== undefined
  const isSplit = variant === "split" && hasInfo && hasForm

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24 bg-muted/30", configClass, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg">
        {(title || subtitle) && (
          <div className={cn("mx-auto max-w-2xl", !isSplit && "text-center mb-12")}>
            {title && (
              <h2
                id={`${id}-title`}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        <div
          className={cn(
            isSplit && "grid gap-12 lg:grid-cols-2 lg:gap-16"
          )}
        >
          {hasInfo && (
            <div className={cn(isSplit ? "lg:order-2" : "mb-10")}>
              <h3 className="text-lg font-semibold text-foreground">Contact info</h3>
              <ul className="mt-4 list-none space-y-3 p-0">
                {address && (
                  <li className="text-muted-foreground">{address}</li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="text-primary hover:underline">
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone}`} className="text-primary hover:underline">
                      {phone}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
          {hasForm && (
            <div className={cn(isSplit && "lg:order-1")}>
              <form
                action={actionUrl}
                method="post"
                className="space-y-4"
                aria-label="Contact form"
              >
                <div>
                  <label htmlFor={`${id}-name`} className="block text-sm font-medium text-foreground">
                    {formLabels.name ?? "Name"}
                  </label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className="block text-sm font-medium text-foreground">
                    {formLabels.email ?? "Email"}
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    required
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-message`} className="block text-sm font-medium text-foreground">
                    {formLabels.message ?? "Message"}
                  </label>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={4}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
                  aria-label={formLabels.submit ?? "Send message"}
                >
                  {formLabels.submit ?? "Send"}
                </button>
              </form>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
