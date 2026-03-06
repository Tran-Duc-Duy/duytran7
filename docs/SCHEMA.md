# Landing page config schema

This document describes the JSON configuration structure for building landing pages. All section types, fields, and variants are defined in `@duytran7/landing-core` (types + Zod schema).

## Root config

```ts
interface LandingConfig {
  seo: SeoConfig
  sections: LandingSection[]
  theme?: { primaryColor?: string; fontFamily?: string }
}
```

- **seo**: Title, description, canonical, Open Graph, Twitter Card, JSON-LD.
- **sections**: Array of section objects; order = render order.
- **theme**: Optional global theme (adapter may map to CSS vars).

## SEO (`seo`)

| Field       | Type            | Required | Description                                   |
| ----------- | --------------- | -------- | --------------------------------------------- |
| title       | string          | yes      | Page title (meta, OG)                         |
| description | string          | yes      | Meta description                              |
| canonical   | string          | no       | Canonical URL                                 |
| og          | object          | no       | title, description, image, type               |
| twitter     | object          | no       | card, title, description, image               |
| jsonLd      | object \| array | no       | Structured data (Organization, WebSite, etc.) |

## Section base

Every section has:

- **id** (string): Unique in the page (for anchors, keys).
- **type** (string): Section type (e.g. `hero`, `nav`, `features`).
- **className** (string, optional): Tailwind for the section wrapper.
- **classes** (object, optional): Multi-layer Tailwind overrides (e.g. `title`, `subtitle`, `primaryButton`). Keys depend on the section type.

## Section types and main fields

| Type         | Main fields                                                                             | Notes                      |
| ------------ | --------------------------------------------------------------------------------------- | -------------------------- |
| hero         | headline, subheadline, primaryCta, secondaryCta?, image?, badge?, variant?, background? | Above-the-fold block       |
| nav          | logo?, links, cta?, variant?                                                            | Header / navigation        |
| features     | title?, subtitle?, items[], columns?, variant?                                          | Feature grid (2–4 columns) |
| stats        | title?, items[], columns?, variant?                                                     | KPI / numbers row          |
| logo-cloud   | title?, items[] (logo URLs or { src, alt }), variant?                                   | Partner/customer logos     |
| team         | title?, subtitle?, members[], columns?, variant?                                        | Team grid                  |
| testimonials | title?, subtitle?, items[], variant?                                                    | Quotes, rating             |
| pricing      | title?, subtitle?, tiers[], variant?                                                    | Pricing cards/table        |
| faq          | title?, subtitle?, items[], variant?                                                    | Accordion/list FAQ         |
| cta          | headline, subheadline?, primaryCta?, secondaryCta?, variant?                            | Call-to-action block       |
| newsletter   | title?, subtitle?, placeholder?, submitLabel?, variant?                                 | Email signup               |
| contact      | title?, subtitle?, fields?, submitLabel?, variant?                                      | Contact form/config        |
| gallery      | title?, subtitle?, images[], columns?, variant?                                         | Image grid                 |
| banner       | message, cta?, variant?, dismissible?                                                   | Announcement bar           |
| comparison   | title?, subtitle?, planNames[], rows[], highlightColumn?, variant?                      | Plan comparison table      |
| timeline     | title?, subtitle?, items[], variant?                                                    | Timeline / roadmap         |
| map          | title?, subtitle?, address?, mapEmbedUrl?, linkUrl?, linkLabel?, variant?               | Map + address              |
| blog-grid    | title?, subtitle?, items[], columns?, variant?, dataSource?                             | Article list               |
| video-embed  | title?, subtitle?, embedUrl, posterUrl?, aspectRatio?, variant?                         | YouTube/Vimeo/self-hosted  |
| countdown    | targetDate (ISO 8601), title?, subtitle?, cta?, expiredLabel?, variant?                 | Launch/sale countdown      |
| trust-badges | title?, subtitle?, items[] (icon?, label, href?), variant?                              | Payment/security badges    |
| footer       | brand?, linkGroups?, bottom?, variant?                                                  | Page footer                |

Full field lists and allowed variants are in the TypeScript types and in the **component registry** (see [COMPONENTS.md](COMPONENTS.md)). Use `parseLandingConfigStrict()` from `@duytran7/landing-core` to validate config at runtime.

## Validation

- **Parser**: `parseLandingConfig(json)` returns `{ success, data?, errors? }`.
- **Strict**: `parseLandingConfigStrict(json)` throws on invalid config (use in build/SSR).
- **Schema**: `landingConfigSchema` (Zod) is exported for custom validation.

## Data source (for list sections)

Sections that render a list (e.g. features, blog-grid) can use static data or an API:

```ts
dataSource?: {
  type: "static" | "api"
  apiUrl?: string
  envKey?: string
  dataPath?: string
}
```

- **apiUrl**: GET URL for the list.
- **envKey**: Env var name; app may use `process.env[envKey] + path`.
- **dataPath**: JSON path to the array in the response (e.g. `"data.posts"`).
