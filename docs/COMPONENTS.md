# Component registry and section mapping

This document maps **section types** (from config) to **React components** and lists variants and use cases. It is the source of truth for builders, docs, and AI.

## How to get the registry

- **Runtime**: `import { componentRegistry, getComponentRegistryEntry } from "@duytran7/landing-core"`
- **API** (demo app): `GET /api/registry` returns the full registry as JSON.
- **MCP**: Use the `landing-mcp` server (see [AI-CONTRIBUTING.md](AI-CONTRIBUTING.md)) to list sections and get example configs.

## Registry entry shape

Each entry has:

| Field         | Description                              |
| ------------- | ---------------------------------------- |
| id            | Section type (e.g. `hero`, `nav`)        |
| name          | Display name                             |
| description   | One-sentence description for AI/builders |
| useCase       | When to use this section                 |
| variants      | List of allowed `variant` values         |
| configFields  | Main config keys (id, type, …)           |
| classesKeys   | Optional; keys in `classes` object       |
| exampleConfig | Minimal valid JSON for this section      |

## Section type → component

| Section type | Component                                                                        | Package                      |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------- |
| hero         | Hero                                                                             | @duytran7/landing-components |
| nav          | Nav (desktop); mobile hamburger: `NavWithMobile` from `.../nav-mobile` in client | same                         |
| features     | Features                                                                         | same                         |
| stats        | Stats                                                                            | same                         |
| logo-cloud   | LogoCloud                                                                        | same                         |
| team         | Team                                                                             | same                         |
| testimonials | Testimonials                                                                     | same                         |
| pricing      | Pricing                                                                          | same                         |
| faq          | Faq                                                                              | same                         |
| cta          | Cta                                                                              | same                         |
| newsletter   | Newsletter                                                                       | same                         |
| contact      | Contact                                                                          | same                         |
| gallery      | Gallery                                                                          | same                         |
| banner       | Banner                                                                           | same                         |
| comparison   | Comparison                                                                       | same                         |
| timeline     | Timeline                                                                         | same                         |
| map          | Map                                                                              | same                         |
| blog-grid    | BlogGrid                                                                         | same                         |
| video-embed  | VideoEmbed                                                                       | same                         |
| countdown    | Countdown                                                                        | same                         |
| trust-badges | TrustBadges                                                                      | same                         |
| footer       | Footer                                                                           | same                         |

Rendering is done via **SectionRenderer**: pass a single section config and it returns the matching component. Use `LandingPage` from `@duytran7/landing-next` to render a full config (SEO + sections). For scroll-in animation and section effects (parallax, float, mouseAware), use `LandingPageWithAnimations` from `@duytran7/landing-next/client`. For Hero Lottie backgrounds, add `LottieInjector` from `@duytran7/landing-components/lottie` in the app layout (client).

## Use-case coverage

- **Above the fold**: hero, nav, banner
- **Social proof**: stats, logo-cloud, testimonials
- **Product/features**: features, comparison
- **Pricing**: pricing
- **Trust**: trust-badges, logo-cloud
- **Engagement**: cta, newsletter, contact
- **Content**: blog-grid, gallery, timeline
- **Urgency**: countdown, banner
- **Media**: video-embed, gallery
- **Location**: map
- **Footer**: footer

For a new section type, add the interface and Zod schema in `packages/core`, register in `componentRegistry`, implement the component in `packages/components`, and add a case in `SectionRenderer`.
