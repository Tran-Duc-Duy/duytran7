# Example configs

Copy any JSON file into your app and pass it to `LandingPage` (e.g. load from `landing.json` or per-route config). Customize `seo` and `sections` to match your content.

| File                                 | Description                                                                                                                                                     |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **landing.json**                     | Minimal landing: nav, hero, features, CTA, footer.                                                                                                              |
| **landing-full.json**                | Full landing with many sections; includes **classes** examples (banner, hero, features, CTA).                                                                   |
| **landing-with-custom-classes.json** | **Multi-level Tailwind demo:** banner, hero, features, CTA, footer with **classes** in JSON (gradient, rounded, shadow). View in demo app at `/custom-classes`. |
| **pricing-page.json**                | Pricing page: nav, hero, pricing tiers, comparison table, FAQ, CTA, footer.                                                                                     |
| **about-page.json**                  | About page: nav, hero, stats, timeline, team, CTA, footer.                                                                                                      |
| **contact-page.json**                | Contact page: nav, hero, contact (split: form + info), footer.                                                                                                  |

**Custom Tailwind (classes):** Any section can have a `"classes": { "root": "...", "title": "...", "primaryButton": "...", ... }` field — arbitrary Tailwind class strings. Full example in `landing-with-custom-classes.json`.

## Usage in Next.js

**Single landing (e.g. home):**

```tsx
// app/page.tsx
import { readFileSync } from "fs"
import { join } from "path"
import {
  LandingPage,
  buildMetadata,
  parseLandingConfigStrict,
} from "@landing/next"

const config = parseLandingConfigStrict(
  JSON.parse(readFileSync(join(process.cwd(), "landing.json"), "utf-8"))
)
export const metadata = buildMetadata(config)
export default function Home() {
  return <LandingPage config={config} />
}
```

**Per-route config (e.g. pricing, about, contact):**

```tsx
// app/pricing/page.tsx
import { readFileSync } from "fs"
import { join } from "path"
import {
  LandingPage,
  buildMetadata,
  parseLandingConfigStrict,
} from "@landing/next"

const config = parseLandingConfigStrict(
  JSON.parse(
    readFileSync(join(process.cwd(), "examples/pricing-page.json"), "utf-8")
  )
)
export const metadata = buildMetadata(config)
export default function PricingPage() {
  return <LandingPage config={config} />
}
```

Forms (newsletter, contact) post to `actionUrl`; implement the API route or server action in your app to process submissions.
