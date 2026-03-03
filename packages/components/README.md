# @landing/components

React section components (hero, nav, features, CTA, footer, testimonials, pricing, FAQ, etc.) and `SectionRenderer`. Shadcn-style, Tailwind CSS, config-driven.

## Install

```bash
pnpm add @landing/components @landing/core
```

Peer dependencies: `react`, `react-dom`. Your app must use Tailwind CSS and the same CSS variables as the [demo app](https://github.com/your-username/landing/tree/main/apps/demo).

## Usage

```tsx
import { SectionRenderer } from "@landing/components"
import type { HeroSection } from "@landing/core"

const section: HeroSection = {
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

See the [monorepo docs](https://github.com/your-username/landing#readme) and [docs/README.md](https://github.com/your-username/landing/blob/main/docs/README.md) for sections, variants, and custom Tailwind (`classes`).
