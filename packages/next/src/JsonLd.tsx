/**
 * JsonLd — render JSON-LD script(s) cho SEO structured data (Organization, WebSite, etc.).
 */

import type { SeoConfig } from "@duytran7/landing-core"

export interface JsonLdProps {
  /** Từ config.seo.jsonLd — một object hoặc mảng object */
  data: SeoConfig["jsonLd"]
}

export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
