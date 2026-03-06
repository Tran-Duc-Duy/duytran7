# Landing — npm libraries for landing pages

<!-- Replace your-username/landing with your actual org/repo when publishing -->

[![CI](https://github.com/your-username/landing/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/landing/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Minimize landing page build time: **JSON config + drop into Next.js** and you get an SEO-ready page with shadcn-style components and TypeScript + tsup.

> **Open source** — contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## Table of contents

- [Monorepo structure](#monorepo-structure)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Template (create-landing-app)](#template-create-landing-app)
- [Schema sections](#schema-sections)
- [Customization](#customization)
- [Documentation](#documentation)
- [MCP server](#mcp-server)
- [Contributing](#contributing)
- [License](#license)

## Monorepo structure

| Package                 | Description                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **@landing/core**       | Types, Zod schema, and parser for JSON config. Framework-agnostic.                                                                      |
| **@landing/components** | React components (button, card, section, hero, nav, features, cta, footer, testimonials, pricing, faq). Shadcn-style, easy to override. |
| **@landing/next**       | Next.js adapter: `buildMetadata`, `JsonLd`, `LandingPage` rendered from config.                                                         |

## Installation

In your Next.js app:

```bash
pnpm add @landing/core @landing/components @landing/next
# Peer deps: next, react, react-dom. Your app needs Tailwind CSS.
```

## Quick start

1. **Create a JSON config file** (e.g. `landing.json` in your project):

```json
{
  "seo": {
    "title": "My Product",
    "description": "Short description for SEO.",
    "canonical": "https://example.com",
    "og": { "image": "https://example.com/og.jpg" },
    "jsonLd": [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "My Product",
        "url": "https://example.com"
      }
    ]
  },
  "sections": [
    {
      "id": "nav",
      "type": "nav",
      "links": [
        { "label": "Features", "href": "#features" },
        { "label": "Pricing", "href": "#pricing" }
      ],
      "cta": { "label": "Sign up", "href": "/signup" }
    },
    {
      "id": "hero",
      "type": "hero",
      "headline": "Build faster",
      "subheadline": "Just JSON and a few lines of code.",
      "primaryCta": { "label": "Get started", "href": "/signup" }
    },
    {
      "id": "features",
      "type": "features",
      "title": "Features",
      "items": [
        { "title": "SEO", "description": "Meta and JSON-LD out of the box." },
        { "title": "Responsive", "description": "Tailwind, mobile-first." }
      ],
      "columns": 3
    },
    {
      "id": "footer",
      "type": "footer",
      "brand": { "name": "My Product", "href": "/" },
      "bottom": { "text": "© 2025 My Product." }
    }
  ]
}
```

2. **In Next.js App Router** — e.g. `app/page.tsx`:

```tsx
import { readFileSync } from "fs"
import { join } from "path"
import {
  LandingPage,
  buildMetadata,
  parseLandingConfigStrict,
} from "@landing/next"

const configPath = join(process.cwd(), "landing.json")
const raw = JSON.parse(readFileSync(configPath, "utf-8"))
const config = parseLandingConfigStrict(raw)

export const metadata = buildMetadata(config)

export default function Home() {
  return <LandingPage config={config} />
}
```

Done. You get all sections, SEO (title, description, OG, Twitter, JSON-LD), and semantic HTML.

## Template (create-landing-app)

Scaffold a minimal Next.js app with a **Builder** and **JSON-per-page** config. Khai báo **tên dự án** (thư mục) và **loại dự án** (preset nội dung):

```bash
npx create-landing-app my-landing
npx create-landing-app my-saas --type saas
npx create-landing-app agency-site -t agency --name my-agency
cd my-landing && npm run dev
```

**Options:** `--type` / `-t` = `landing` | `saas` | `agency` | `blog` (preset cho `content/pages/home.json`); `--name` / `-n` = tên package; `--no-install` = bỏ qua npm install (test trong monorepo).

You get: Home (reads `content/pages/home.json`), **/builder** (drag-and-drop, Import/Export JSON), and Preview. See [packages/create-landing-app/README.md](packages/create-landing-app/README.md) and [docs/TEMPLATE-CLI-PLAN.md](docs/TEMPLATE-CLI-PLAN.md).

## Schema sections & widgets

All sections are config-driven; add them to `sections` in your JSON in any order.

| Section          | Description                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **nav**          | Header with logo, links, CTA. Variants: default, centered, minimal.                                           |
| **hero**         | Headline (h1), subheadline, 1–2 CTAs, optional image. Variants: default, centered, split.                     |
| **features**     | Feature grid. Variants: default, cards, list. Columns: 2, 3, 4.                                               |
| **stats**        | KPI numbers row. Variants: default, bordered, minimal.                                                        |
| **logo-cloud**   | Trusted-by / used-by logos. Variant: grayscale.                                                               |
| **team**         | Team members with avatar, role, bio, social. Variants: default, cards.                                        |
| **testimonials** | Quotes with author and avatar. Variants: default, grid.                                                       |
| **pricing**      | Tiers with features and CTA; optional highlighted tier.                                                       |
| **comparison**   | Plan/feature comparison table or cards.                                                                       |
| **faq**          | Q&A list.                                                                                                     |
| **timeline**     | Vertical or horizontal timeline.                                                                              |
| **gallery**      | Image grid. Columns: 2, 3, 4.                                                                                 |
| **newsletter**   | Email signup form (post to `actionUrl`). Variants: default, inline, minimal.                                  |
| **contact**      | Contact info and/or form (email, phone, address, formLabels, `actionUrl`). Variants: default, split, minimal. |
| **banner**       | Announcement bar. Variants: default, warning, success, info.                                                  |
| **cta**          | Call-to-action block. Variants: default, banner, card.                                                        |
| **footer**       | Brand, link groups, bottom bar. Variants: default, minimal.                                                   |

**Ready-made pages:** see [examples/](examples/) for full landing, pricing, about, and contact page configs. Copy a JSON file and point your route at it.

**Documentation:** [docs/README.md](docs/README.md) — installation, quick start, **full list of sections and ~10 UI variants per section**, SEO, and customization.

## Customization

- **Theme**: Use Tailwind in your app (CSS variables `--primary`, `--foreground`, …) or override `className` per section in config.
- **Other components**: Import from `@landing/components` (Button, Card, Section, Hero, …) and use standalone or wrap.
- **Validate config**: Use `parseLandingConfig(json)` — returns `{ success, data }` or `{ success: false, errors }`.
- **Component registry (for AI)**: Structured catalog so agents can identify and pick sections — `componentRegistry`, `getComponentRegistryEntry(id)` from `@landing/core`; demo: `GET /api/registry`; static file: `docs/component-registry.json` (generate with `pnpm export-registry`). See [docs/README.md#component-registry-for-ai](docs/README.md#component-registry-for-ai).

## Demo (preview UI)

A Next.js app in **`apps/demo`** renders the example configs so you can preview all sections and pages.

From the repo root:

```bash
pnpm install
pnpm build
pnpm demo
```

Open [http://localhost:3000](http://localhost:3000). Routes: `/` (full landing), `/pricing`, `/about`, `/contact`. See [apps/demo/README.md](apps/demo/README.md).

## Build monorepo

```bash
pnpm install
pnpm build
```

## Tech stack

- **TypeScript** + **tsup** (ESM + CJS, dts, sourcemap).
- Components do **not** bundle React (peerDependencies); styling is **Tailwind** (consumer configures).
- **SEO**: Next.js metadata + JSON-LD via `JsonLd` component.

## Documentation

- **[docs/SCHEMA.md](docs/SCHEMA.md)** — Root config, SEO, and all section types with main fields.
- **[docs/COMPONENTS.md](docs/COMPONENTS.md)** — Component registry, section → component mapping, use-case coverage.
- **[docs/AI-CONTRIBUTING.md](docs/AI-CONTRIBUTING.md)** — Guide for AI and developers: generating config, adding sections, MCP usage.
- **[docs/STATE-AND-RICH-UI.md](docs/STATE-AND-RICH-UI.md)** — State management (local vs context), rich UI (Lottie, video, effects, responsive nav, theme/font).

## MCP server

An **MCP server** is provided for Cursor, Claude Desktop, and other MCP clients. It exposes tools: **list_sections**, **get_section_info**, **get_registry**, **list_presets**. Use them to discover section types, get example JSON, and get create-landing-app preset/CLI usage when building or editing landing config. See **[mcp/README.md](mcp/README.md)** for build and setup (stdio transport).

## Publishing to npm

Packages are published in dependency order: `@landing/core` → `@landing/components` → `@landing/next`. The demo app (`apps/demo`) is `private: true` and is not published.

**One-time setup**

1. Log in: `npm login` (or set `NPM_TOKEN` for CI).
2. Ensure `repository` and `homepage` in root and in each package point to your real repo (replace `your-username/landing` if needed).

**Publish from repo root**

```bash
pnpm run build
pnpm run publish-packages
```

This runs `build` then publishes core, components, and next in order. For a dry run without publishing, run from each package: `npm pack` to produce a tarball.

**Publish via CI (GitHub Actions)**

Push a version tag to trigger the [Publish workflow](.github/workflows/publish.yml):

```bash
git tag v0.1.0
git push origin v0.1.0
```

Configure `NPM_TOKEN` in the repo Secrets (Settings → Secrets and variables → Actions).

## Contributing

The project is open to contributions: bug reports, feature ideas, new sections/components, docs improvements.

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Contribution process, code standards, how to add new sections.
- **[Code of Conduct](CODE_OF_CONDUCT.md)** — Community guidelines.
- **Issues** — [Bug report](.github/ISSUE_TEMPLATE/bug_report.yml) | [Feature request](.github/ISSUE_TEMPLATE/feature_request.yml).
- **Pull requests** — Use the template; ensure `pnpm build`, `pnpm test`, and `pnpm lint` pass.

After forking and cloning, run `pnpm install` and `pnpm build` to get started.

## License

[MIT](LICENSE) — free to use, including commercially. Attribution appreciated.
