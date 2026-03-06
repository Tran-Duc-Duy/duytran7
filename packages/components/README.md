# @duytran7/landing-components

React section components (hero, nav, features, stats, testimonials, pricing, FAQ, CTA, video-embed, countdown, trust-badges, footer, etc.) and `SectionRenderer`. Shadcn-style, Tailwind CSS, config-driven.

## Install

```bash
pnpm add @duytran7/landing-components @duytran7/landing-core
```

Peer dependencies: `react`, `react-dom`. Your app must use Tailwind CSS and the same CSS variables as the [demo app](https://github.com/Tran-Duc-Duy/duytran7/tree/main/apps/demo).

## Usage

```tsx
import { SectionRenderer } from "@duytran7/landing-components"
import type { LandingSection } from "@duytran7/landing-core"

const section: LandingSection = {
  id: "hero-1",
  type: "hero",
  headline: "Welcome",
  subheadline: "Subheadline.",
  primaryCta: { label: "Get started", href: "#" },
}

export default function Page() {
  return <SectionRenderer section={section} />
}
```

## Mobile nav (hamburger + sheet)

For `config.mobile?.menu === "hamburger"`, use **NavWithMobile** from a **client component** so the nav can toggle a sheet on small viewports:

```tsx
"use client"

import { SectionRenderer } from "@duytran7/landing-components"
import { NavWithMobile } from "@duytran7/landing-components/nav-mobile"
import type { LandingSection, NavSection } from "@duytran7/landing-core"

function SectionOrNav({ section }: { section: LandingSection }) {
  if (section.type === "nav" && section.mobile?.menu === "hamburger") {
    return <NavWithMobile config={section as NavSection} />
  }
  return <SectionRenderer section={section} />
}
```

## Lottie background (Hero)

When Hero uses `background.type === "lottie"`, it renders a placeholder with `data-landing-bg="lottie"`. Add **LottieInjector** from `@duytran7/landing-components/lottie` once in your app layout (client) so the Lottie player is injected into those placeholders. The package includes `@lottiefiles/react-lottie-player`.

## Section types and primitives

Exported sections: Hero, Nav, Features, Stats, LogoCloud, Team, Testimonials, Pricing, Faq, Cta, Newsletter, Contact, Gallery, Banner, Comparison, Timeline, Map, BlogGrid, VideoEmbed, Countdown, TrustBadges, Footer.

Primitives: `Section`, `Container`, `Button`, `Card`, `cn`.

See [docs/COMPONENTS.md](../../docs/COMPONENTS.md), [docs/STATE-AND-RICH-UI.md](../../docs/STATE-AND-RICH-UI.md), and [monorepo README](https://github.com/Tran-Duc-Duy/duytran7#readme).
