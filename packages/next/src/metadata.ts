/**
 * Build Next.js Metadata từ LandingConfig — tối ưu SEO (title, description, openGraph, twitter, JSON-LD).
 */

import type { Metadata } from "next"
import type { LandingConfig } from "@duytran7/landing-core"

export function buildMetadata(config: LandingConfig): Metadata {
  const { seo } = config

  return {
    title: seo.title,
    description: seo.description,
    metadataBase: seo.canonical ? new URL(seo.canonical) : undefined,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: seo.og
      ? {
          title: seo.og.title ?? seo.title,
          description: seo.og.description ?? seo.description,
          images: seo.og.image ? [seo.og.image] : undefined,
          type: (seo.og.type as "website") ?? "website",
        }
      : undefined,
    twitter: seo.twitter
      ? {
          card: seo.twitter.card ?? "summary_large_image",
          title: seo.twitter.title ?? seo.title,
          description: seo.twitter.description ?? seo.description,
          images: seo.twitter.image ? [seo.twitter.image] : undefined,
        }
      : undefined,
  }
}
