# @duytran7/landing-core

Types, Zod schema, parser, and component registry for landing page JSON config. Framework-agnostic (no React).

## Install

```bash
pnpm add @duytran7/landing-core
```

## Exports

- **Types:** `LandingConfig`, `LandingSection`, `LandingThemeConfig`, `SectionBase`, `SectionAnimation`, `SectionEffects`, and section types (`HeroSection`, `NavSection`, `NavMobileConfig`, `FeaturesSection`, `VideoEmbedSection`, `CountdownSection`, `TrustBadgesSection`, etc.).
- **Schema:** `landingConfigSchema` (Zod) to validate JSON. Supports theme (`themeId`, `fontId`), section `animation` and `effects`, Nav `mobile`, Hero `background.videoOptions` / `lottieOptions`.
- **Parser:** `parseLandingConfig(json)` or `parseLandingConfigStrict(json)`.
- **Registry:** `componentRegistry`, `getComponentRegistryEntry(id)`, `getComponentRegistryJson()` for AI, tooling, and MCP.

## Section types (registry)

hero, nav, features, stats, logo-cloud, team, testimonials, pricing, faq, cta, newsletter, contact, gallery, banner, comparison, timeline, map, blog-grid, video-embed, countdown, trust-badges, footer.

See [monorepo docs](https://github.com/Tran-Duc-Duy/duytran7#readme), [docs/SCHEMA.md](../../docs/SCHEMA.md), and [docs/COMPONENTS.md](../../docs/COMPONENTS.md).
