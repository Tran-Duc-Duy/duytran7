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
      className={cn("bg-muted/30 py-16 sm:py-24", configClass, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg">
        {(title || subtitle) && (
          <div
            className={cn("mx-auto max-w-2xl", !isSplit && "mb-12 text-center")}
          >
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
        <div className={cn(isSplit && "grid gap-12 lg:grid-cols-2 lg:gap-16")}>
          {hasInfo && (
            <div className={cn(isSplit ? "lg:order-2" : "mb-10")}>
              <h3 className="text-foreground text-lg font-semibold">
                Contact info
              </h3>
              <ul className="mt-4 list-none space-y-3 p-0">
                {address && (
                  <li className="text-muted-foreground">{address}</li>
                )}
                {email && (
                  <li>
                    <a
                      href={`mailto:${email}`}
                      className="text-primary hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a
                      href={`tel:${phone}`}
                      className="text-primary hover:underline"
                    >
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
                  <label
                    htmlFor={`${id}-name`}
                    className="text-foreground block text-sm font-medium"
                  >
                    {formLabels.name ?? "Name"}
                  </label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    className="border-input bg-background text-foreground mt-1 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${id}-email`}
                    className="text-foreground block text-sm font-medium"
                  >
                    {formLabels.email ?? "Email"}
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    className="border-input bg-background text-foreground mt-1 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={`${id}-message`}
                    className="text-foreground block text-sm font-medium"
                  >
                    {formLabels.message ?? "Message"}
                  </label>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={4}
                    className="border-input bg-background text-foreground mt-1 w-full rounded-md border px-3 py-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 font-medium"
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
