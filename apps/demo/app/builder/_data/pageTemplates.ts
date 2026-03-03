/**
 * Page templates: each page type has name, default slug and section type list.
 * Used when "Add page" or "Add inner page" to create a page with sample content.
 */

import type { LandingSection } from "@duytran7/landing-core"
import { createDefaultSection } from "./defaultSections"

export interface PageTemplate {
  id: string
  name: string
  slug: string
  description: string
  /** Section type ids in order (nav/hero/... from defaultSections). */
  sectionTypes: string[]
}

/** Page and inner-page templates. */
export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: "landing",
    name: "Landing",
    slug: "/",
    description: "Home: Nav, Hero, Features, CTA, Footer",
    sectionTypes: ["nav", "hero", "features", "cta", "footer"],
  },
  {
    id: "about",
    name: "About",
    slug: "/about",
    description: "About: Nav, Hero, Team, Testimonials, CTA, Footer",
    sectionTypes: ["nav", "hero", "team", "testimonials", "cta", "footer"],
  },
  {
    id: "pricing",
    name: "Pricing",
    slug: "/pricing",
    description: "Pricing: Nav, Hero, Pricing, FAQ, CTA, Footer",
    sectionTypes: ["nav", "hero", "pricing", "faq", "cta", "footer"],
  },
  {
    id: "contact",
    name: "Contact",
    slug: "/contact",
    description: "Contact: Nav, Hero, Contact, Footer",
    sectionTypes: ["nav", "hero", "contact", "footer"],
  },
  {
    id: "faq",
    name: "FAQ",
    slug: "/faq",
    description: "FAQ: Nav, Hero, FAQ, CTA, Footer",
    sectionTypes: ["nav", "hero", "faq", "cta", "footer"],
  },
  {
    id: "login",
    name: "Login / Sign up",
    slug: "/login",
    description: "Login: Nav, Hero (Sign in), CTA, Footer",
    sectionTypes: ["nav", "hero", "cta", "footer"],
  },
  {
    id: "blog-post",
    name: "Blog post",
    slug: "/blog/post",
    description: "Blog: Nav, Hero, Features, Footer",
    sectionTypes: ["nav", "hero", "features", "footer"],
  },
  {
    id: "product",
    name: "Product / Feature",
    slug: "/product",
    description: "Product: Nav, Hero, Features, Gallery, CTA, Footer",
    sectionTypes: ["nav", "hero", "features", "gallery", "cta", "footer"],
  },
  {
    id: "dashboard",
    name: "Dashboard / List",
    slug: "/dashboard",
    description: "Dashboard: Nav, Stats, Features, Footer",
    sectionTypes: ["nav", "stats", "features", "footer"],
  },
  {
    id: "team",
    name: "Team (inner)",
    slug: "team",
    description: "Inner Team: Hero, Team, Footer",
    sectionTypes: ["hero", "team", "footer"],
  },
  {
    id: "testimonials",
    name: "Testimonials (inner)",
    slug: "testimonials",
    description: "Inner Testimonials: Hero, Testimonials, Footer",
    sectionTypes: ["hero", "testimonials", "footer"],
  },
  {
    id: "blank",
    name: "Blank page",
    slug: "/new-page",
    description: "No sections; add sections later",
    sectionTypes: [],
  },
]

/** Templates for root pages (not inner). */
export const ROOT_PAGE_TEMPLATES = PAGE_TEMPLATES.filter(
  (t) => t.slug.startsWith("/") || t.id === "blank"
)

/** Templates for inner pages (slug without leading /). */
export const INNER_PAGE_TEMPLATES = PAGE_TEMPLATES.filter(
  (t) => !t.slug.startsWith("/") || t.id === "blank"
)

export function createSectionsFromTemplate(sectionTypes: string[]): LandingSection[] {
  const sections: LandingSection[] = []
  for (const type of sectionTypes) {
    const section = createDefaultSection(type)
    if (section) sections.push(section)
  }
  return sections
}

export function createPageFromTemplate(
  templateId: string,
  options?: { parentSlug?: string; nameOverride?: string; slugSuffix?: string }
): { name: string; slug: string; sectionTypes: string[] } | null {
  const template = PAGE_TEMPLATES.find((t) => t.id === templateId)
  if (!template) return null

  let slug = template.slug
  if (options?.parentSlug) {
    const base =
      options.slugSuffix ?? (template.slug.replace(/^\//, "") || "page")
    slug = `${options.parentSlug.replace(/\/$/, "")}/${base}`
  }
  if (options?.slugSuffix && !options?.parentSlug) {
    slug = options.slugSuffix.startsWith("/") ? options.slugSuffix : `/${options.slugSuffix}`
  }

  return {
    name: options?.nameOverride ?? template.name,
    slug,
    sectionTypes: [...template.sectionTypes],
  }
}
