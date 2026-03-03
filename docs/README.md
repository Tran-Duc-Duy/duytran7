# Landing library — Documentation

Guide to building landing pages from JSON config with `@landing/core`, `@landing/components`, and `@landing/next`. Each section type supports **multiple UI variants** so you can pick the look that fits your page.

---

## Table of contents

1. [Installation](#installation)
2. [Quick start](#quick-start)
3. [Config structure](#config-structure)
4. [Sections & variants reference](#sections--variants-reference)
5. [SEO](#seo)
6. [Customization](#customization)
7. [Component registry (for AI)](#component-registry-for-ai)

---

## Installation

In your Next.js project:

```bash
pnpm add @landing/core @landing/components @landing/next
```

Peer dependencies: `next`, `react`, `react-dom`. Your app must use **Tailwind CSS** and define the same CSS variables as the demo (see [apps/demo/app/globals.css](../apps/demo/app/globals.css)).

---

## Quick start

1. Create a JSON config file (e.g. `content/landing.json`) with `seo` and `sections`.
2. In your page (Server Component), read the config, build metadata, and render:

```tsx
// app/page.tsx
import { readFileSync } from "fs"
import { join } from "path"
import { LandingPage, buildMetadata, parseLandingConfigStrict } from "@landing/next"

const config = parseLandingConfigStrict(
  JSON.parse(readFileSync(join(process.cwd(), "content/landing.json"), "utf-8"))
)

export const metadata = buildMetadata(config)

export default function Home() {
  return <LandingPage config={config} />
}
```

3. Run your app and open the page. Use the **variant** field in each section to switch UI style (see tables below).

---

## Config structure

```json
{
  "seo": {
    "title": "Page title",
    "description": "Meta description",
    "canonical": "https://example.com",
    "og": { "image": "https://example.com/og.png" },
    "twitter": { "card": "summary_large_image" },
    "jsonLd": [{ "@context": "https://schema.org", "@type": "WebSite", "name": "...", "url": "..." }]
  },
  "sections": [
    { "id": "nav", "type": "nav", "variant": "centered", "links": [...], "cta": {...} },
    { "id": "hero", "type": "hero", "variant": "split", "headline": "...", ... }
  ],
  "theme": { "primaryColor": "#...", "fontFamily": "..." }
}
```

- **seo** — Used by `buildMetadata()` for Next.js metadata and JSON-LD.
- **sections** — Array of section objects. Each has `id`, `type`, and optional **variant**; the rest depends on the section type.
- **theme** — Optional; you can map these to CSS variables in your app.

---

## Sections & variants reference

Every section supports a **variant** field. Choose one value per section; unknown variants fall back to `"default"`.

### Hero

| Variant | Description |
|--------|-------------|
| `default` | Headline + subheadline + CTAs; image below if provided. |
| `centered` | Content centered, max-width copy. |
| `split` | Text and image side by side (image right). |
| `minimal` | Less padding, centered. |
| `gradient` | Subtle gradient background. |
| `badge` | Optional `badge` text above headline; centered. |
| `left` | Text left-aligned. |
| `right-image` | Same as split but image on the right. |
| `dark` | Dark background, light text. |
| `floating` | Centered, card-like. |

Example:

```json
{
  "id": "hero",
  "type": "hero",
  "variant": "centered",
  "badge": "New",
  "headline": "Your headline",
  "subheadline": "Optional subheadline.",
  "primaryCta": { "label": "Get started", "href": "/signup" },
  "secondaryCta": { "label": "Learn more", "href": "/about" },
  "image": { "src": "/hero.jpg", "alt": "Hero" }
}
```

---

### Nav

| Variant | Description |
|--------|-------------|
| `default` | Logo left, links center/right, CTA. |
| `centered` | Logo and links centered. |
| `minimal` | Simplified layout. |
| `transparent` | For overlay on hero. |
| `sticky` | Sticks on scroll. |
| `two-row` | Two rows (e.g. top links + main nav). |
| `dark` | Dark background. |
| `bordered` | Bottom border. |
| `floating` | Rounded, shadow. |
| `compact` | Reduced padding. |

---

### Features

| Variant | Description |
|--------|-------------|
| `default` | Grid of title + description. |
| `cards` | Each item in a card. |
| `list` | Single column list. |
| `alternating` | Alternating image/text rows. |
| `icon-top` | Icon above title. |
| `icon-left` | Icon left of text. |
| `numbered` | Numbered items. |
| `bordered` | Bordered cards. |
| `zigzag` | Zigzag layout. |
| `grid-images` | Grid with optional images. |

---

### Stats

| Variant | Description |
|--------|-------------|
| `default` | Row of value + label. |
| `bordered` | Cards with border. |
| `minimal` | Text only, centered. |
| `icons` | With optional icon per stat. |
| `gradient` | Gradient background. |
| `vertical` | Stacked layout. |
| `divider` | With dividers between. |
| `large` | Larger typography. |
| `compact` | Tighter spacing. |
| `split` | Split background. |

---

### Logo cloud

| Variant | Description |
|--------|-------------|
| `default` | Row of logos. |
| `grayscale` | Grayscale, color on hover. |
| `grid` | Grid layout. |
| `carousel` | Horizontal scroll. |
| `bordered` | Bordered container. |
| `dark` | Dark background. |
| `small` | Smaller logos. |
| `large` | Larger logos. |
| `title-bottom` | Title below logos. |
| `opacity` | Faded, full opacity on hover. |

---

### Team

| Variant | Description |
|--------|-------------|
| `default` | Avatar + name + role. |
| `cards` | Card per member, optional bio & social. |
| `list` | List layout. |
| `social-only` | Emphasize social links. |
| `overlay` | Name on image overlay. |
| `minimal` | Minimal styling. |
| `alternating` | Alternating layout. |
| `grid-large` | Large grid. |
| `horizontal` | Horizontal scroll. |
| `compact` | Compact cards. |

---

### Testimonials

| Variant | Description |
|--------|-------------|
| `default` | Quote cards. |
| `carousel` | Carousel (single visible). |
| `grid` | Grid of quotes. |
| `featured` | One large + rest small. |
| `rating` | With rating display. |
| `minimal` | Minimal card. |
| `bordered` | Bordered cards. |
| `alternating` | Alternating style. |
| `masonry` | Masonry layout. |
| `compact` | Compact quotes. |

---

### Pricing

| Variant | Description |
|--------|-------------|
| `default` | Tiers as cards. |
| `cards` | Card per tier. |
| `table` | Table layout. |
| `toggle` | Monthly/annual toggle. |
| `minimal` | Minimal cards. |
| `badge` | “Popular” badge on tier. |
| `featured-center` | Highlighted tier in center. |
| `horizontal` | Horizontal scroll. |
| `compact` | Compact layout. |
| `bordered` | Bordered cards. |

---

### FAQ

| Variant | Description |
|--------|-------------|
| `default` | List of Q&A. |
| `accordion` | Collapsible (expand/collapse). |
| `two-column` | Two columns. |
| `bordered` | Bordered items. |
| `minimal` | Minimal styling. |
| `category` | Grouped by category. |
| `grid` | Grid layout. |
| `compact` | Tighter spacing. |
| `expanded` | All expanded. |
| `cards` | Each in a card. |

---

### CTA

| Variant | Description |
|--------|-------------|
| `default` | Title + subtitle + buttons. |
| `banner` | Full-width colored banner. |
| `card` | Inside a card. |
| `split-image` | With optional image. |
| `minimal` | Minimal layout. |
| `gradient` | Gradient background. |
| `two-column` | Two columns. |
| `floating` | Floating card. |
| `dark` | Dark background. |
| `bordered` | Bordered block. |

---

### Newsletter

| Variant | Description |
|--------|-------------|
| `default` | Card with form. |
| `inline` | Inline email + submit. |
| `minimal` | Minimal form. |
| `card` | Card style. |
| `benefits` | With benefit list. |
| `split` | Split layout. |
| `bordered` | Bordered container. |
| `dark` | Dark background. |
| `compact` | Compact form. |
| `floating` | Floating card. |

---

### Contact

| Variant | Description |
|--------|-------------|
| `default` | Form and/or info. |
| `split` | Form one side, info other. |
| `minimal` | Minimal layout. |
| `map-side` | Map placeholder one side. |
| `centered` | Centered form. |
| `two-column` | Two columns. |
| `cards` | Info in cards. |
| `dark` | Dark background. |
| `compact` | Compact form. |
| `inline` | Inline fields. |

---

### Gallery

| Variant | Description |
|--------|-------------|
| `default` | Grid of images. |
| `masonry` | Masonry grid. |
| `carousel` | Horizontal scroll. |
| `grid-bordered` | Bordered grid. |
| `staggered` | Staggered layout. |
| `full-width` | Full-width images. |
| `compact` | Compact grid. |
| `dark` | Dark background. |
| `overlay` | Caption overlay. |
| `list` | List layout. |

---

### Banner

| Variant | Description |
|--------|-------------|
| `default` | Primary color bar. |
| `warning` | Amber/warning style. |
| `success` | Green/success. |
| `info` | Blue/info. |
| `gradient` | Gradient background. |
| `icon` | With icon. |
| `minimal` | Minimal bar. |
| `bordered` | Bordered. |
| `dark` | Dark bar. |
| `compact` | Less padding. |

---

### Comparison

| Variant | Description |
|--------|-------------|
| `default` | Table. |
| `table` | Full table. |
| `cards` | One card per plan. |
| `highlighted-row` | Highlight a row. |
| `checkmarks` | Check/cross marks. |
| `minimal` | Minimal table. |
| `compact` | Compact table. |
| `bordered` | Bordered table. |
| `striped` | Striped rows. |
| `inline` | Inline comparison. |

---

### Timeline

| Variant | Description |
|--------|-------------|
| `default` | Vertical timeline. |
| `vertical` | Vertical with line. |
| `horizontal` | Horizontal cards. |
| `alternate` | Alternate left/right. |
| `minimal` | Minimal line. |
| `connectors` | With connectors. |
| `cards` | Card per item. |
| `compact` | Compact. |
| `dark` | Dark background. |
| `numbered` | Numbered steps. |

---

### Footer

| Variant | Description |
|--------|-------------|
| `default` | Brand + link groups + bottom. |
| `minimal` | Minimal links. |
| `newsletter` | With newsletter block. |
| `multi-column` | Multiple columns. |
| `centered` | Centered content. |
| `social` | Emphasize social. |
| `dark` | Dark background. |
| `bordered` | Top border. |
| `compact` | Compact. |
| `simple` | Single row. |

---

## SEO

- **buildMetadata(config)** — Returns a Next.js `Metadata` object from `config.seo` (title, description, canonical, openGraph, twitter).
- **JsonLd** — Renders `config.seo.jsonLd` as `<script type="application/ld+json">`. Use for WebSite, Organization, etc.
- Sections use semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>` in hero) for accessibility and SEO.

---

## Customization

- **Theme** — Set CSS variables in your app (`--primary`, `--foreground`, `--muted`, `--card`, etc.). See `apps/demo/app/globals.css`.
- **Override per section** — Use the **className** field on any section to add Tailwind classes to the section root.
- **Multi-level Tailwind (classes)** — Use the **classes** object on any section to override specific elements (AI-friendly):
  - Common keys: `root`, `container`, `title`, `subtitle`, `description`, `primaryButton`, `secondaryButton`, `image`, `badge`. Section-specific keys (e.g. `header`, `grid`, `card`, `actions`, `message`, `cta`) are supported where implemented (Hero, Features, CTA, Banner and others).
  - Example: `"classes": { "title": "text-4xl font-black", "primaryButton": "rounded-full shadow-lg" }`.
- **Validate config** — Use `parseLandingConfig(json)` for `{ success, data }` or `{ success: false, errors }` instead of throwing.
- **Use components directly** — Import `Hero`, `Features`, etc. from `@landing/components` and pass config objects for full control.

---

## Demo and examples

- **Preview UI**: From repo root run `pnpm demo` and open http://localhost:3000. Routes: `/`, `/showcase`, `/showcase/sections`, `/builder`, `/pricing`, `/about`, `/contact`.
- **Page Builder (`/builder`)**: Drag-and-drop sections, reorder, export JSON. The exported JSON is valid `LandingConfig` — use with `parseLandingConfigStrict` + `LandingPage` to render the same page. Optimized for AI-generated or no-code flows.
- **Example configs**: See [examples/](../examples/) for full landing, pricing, about, and contact page JSON. Copy and edit for your project.
- **Component registry (AI)**: `GET /api/registry` returns the section catalog (description, useCase, variants, exampleConfig). Static file: [docs/component-registry.json](component-registry.json).

---

## Component registry (for AI)

So that AI in your ecosystem can **identify and pick** the right section (instead of generating components from images every time), the library provides a **component registry** — a structured catalog with description, use case, variants, config shape, and example.

### Entry fields

| Field | Meaning |
|-------|--------|
| **id** | Section type (hero, nav, features, …). |
| **name** | Display name. |
| **description** | Short description for AI to identify the section (one sentence). |
| **useCase** | When to use this section. |
| **variants** | List of UI variants (default, centered, split, …). |
| **configFields** | Main config fields (AI knows what to send). |
| **classesKeys** | Keys in the `classes` object (multi-level Tailwind) if supported. |
| **exampleConfig** | Minimal example config (JSON). |

### How to consume

1. **API (when running the demo):** `GET https://your-demo-url/api/registry` — returns the full registry array as JSON.
2. **Static JSON:** File [docs/component-registry.json](component-registry.json) (generate with `pnpm export-registry` after `pnpm build`). Host this file or include it in context for AI.
3. **In code:** `import { componentRegistry, getComponentRegistryEntry } from "@landing/core"` — use in MCP server, CLI, or internal tools.

### Integration ideas

- **AI agent / MCP:** Expose a “list landing sections” tool that returns the registry; a “get section example” tool that returns `exampleConfig` for a given `id`. The agent chooses a section by `description` and `useCase`, then fills config from `configFields` and `exampleConfig`.
- **No-code / builder:** Build a dropdown or palette from the registry (name, description); when a section is selected, initialize from `exampleConfig`.
- **Docs / chatbot:** Add the registry (or a link to the JSON) to RAG context or system prompt so the agent can answer “what sections are available?”, “when to use hero?”, “what config does hero need?”.
