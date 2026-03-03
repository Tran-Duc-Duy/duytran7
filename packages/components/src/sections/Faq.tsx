/**
 * FAQ section — semantic dl/dt/dd, extensible to accordion via composition.
 */

import type { FaqSection as FaqSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface FaqProps {
  config: FaqSectionConfig
  className?: string
}

export function Faq({ config, className }: FaqProps) {
  const { id, title, subtitle, items, className: configClass } = config

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24", configClass, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="md">
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
        <dl className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="bg-card rounded-lg border p-6">
              <dt className="text-foreground text-lg font-semibold">
                {item.question}
              </dt>
              <dd className="text-muted-foreground mt-2">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}
