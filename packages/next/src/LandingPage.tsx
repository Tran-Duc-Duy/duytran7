/**
 * LandingPage — render toàn bộ sections từ config (Server Component). Dùng trong page/layout Next.js.
 */

import type { LandingConfig } from "@duytran7/landing-core"
import { SectionRenderer } from "@duytran7/landing-components"
import { JsonLd } from "./JsonLd"

export interface LandingPageProps {
  config: LandingConfig
  /** Optional wrapper className cho main */
  className?: string
}

export function LandingPage({ config, className }: LandingPageProps) {
  return (
    <>
      <a
        href="#main-content"
        className="absolute left-[-9999px] top-4 z-[100] rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow focus:left-4 focus:outline focus:outline-2 focus:outline-ring"
      >
        Skip to main content
      </a>
      {config.seo?.jsonLd && <JsonLd data={config.seo.jsonLd} />}
      <main id="main-content" className={className} role="main" tabIndex={-1}>
        {config.sections.map((section) => (
          <SectionRenderer
            key={section.id}
            section={section}
            className={section.className}
          />
        ))}
      </main>
    </>
  )
}
