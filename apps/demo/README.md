# Landing UI Demo

Next.js app to **preview** all sections and page configs from the Landing library. Uses the example JSON configs from `examples/` and renders them with `@landing/next`.

## Run locally

From the **monorepo root**:

```bash
pnpm install
pnpm build
pnpm --filter landing-demo dev
```

Or from this directory:

```bash
cd apps/demo
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to preview

- **`/`** — Full landing demo (single page from JSON).
- **`/showcase`** — Demo index: choose full page or section gallery.
- **`/showcase/sections`** — Section & variant gallery: all section types and variants (Hero default/centered/split, Features, Stats, CTA, etc.) on one page; scroll to preview every component.

Every route has a header with links to Showcase, **Builder**, Pricing, About, Contact.

## Page Builder (`/builder`)

**Multi-page builder: drag sections from the left into the canvas, add multiple pages, export with nav links.**

- **Pages (left):** List of pages (Home, Pricing, About, …). Click to edit that page. **Add page** to create a new one (name + slug). Nav links are derived from all pages and injected on export.
- **Sections (left):** Drag any section type (Hero, Nav, Features, …) into the canvas, or click to add to the current page. Reorder by dragging blocks in the canvas.
- **Canvas (center):** Current page’s sections. Drop zones: between blocks or “Drop to add at end”. Drag blocks to reorder; use × to remove.
- **Toolbar:** **Preview** (current page with nav links), **Copy JSON**, **Export JSON** (downloads `landing-pages.json`).
- **Export format:** `{ pages: [ { slug, name, config: LandingConfig } ] }`. Each `config` has `sections`; any Nav section gets links to all pages (label = page name, href = page slug). If a page has no Nav and there are multiple pages, a Nav is prepended. Use each `config` with `LandingPage` for that route.

## Routes

| Route                 | Description |
|-----------------------|--------------|
| `/`                   | Full landing (from `examples/landing-full.json`) |
| `/showcase`           | Demo index: links to full landing, pricing, about, contact + Section gallery |
| `/showcase/sections`  | Gallery: every section type + variants for preview |
| `/builder`            | **Page Builder:** drag-and-drop sections, export JSON, preview page from JSON |
| `/custom-classes`     | **Multi-level Tailwind demo:** page from `landing-with-custom-classes.json` — sections use **classes** in JSON (gradient, rounded, shadow). |
| `/pricing`            | Pricing page (from `examples/pricing-page.json`) |
| `/about`              | About page (from `examples/about-page.json`) |
| `/contact`            | Contact page (from `examples/contact-page.json`) |

Edit JSON in `examples/` and refresh the browser to update the preview (restart dev server if you change which file a route loads).

## Stack

- **Next.js** 15 (App Router)
- **@landing/core** — types & parser
- **@landing/components** — section UI
- **@landing/next** — `LandingPage`, `buildMetadata`
- **Tailwind CSS** — with shadcn-style CSS variables in `app/globals.css`
