# @duytran7/landing-next

Next.js adapter: `buildMetadata`, `JsonLd`, and `LandingPage` rendered from JSON config. Use with `@duytran7/landing-core` and `@duytran7/landing-components`.

## Install

```bash
pnpm add @duytran7/landing-next @duytran7/landing-core @duytran7/landing-components
```

Peer dependencies: `next`, `react`, `react-dom`.

## Usage

```tsx
// app/page.tsx
import { readFileSync } from "fs"
import { join } from "path"
import {
  LandingPage,
  buildMetadata,
  parseLandingConfigStrict,
} from "@duytran7/landing-next"

const config = parseLandingConfigStrict(
  JSON.parse(readFileSync(join(process.cwd(), "landing.json"), "utf-8"))
)

export const metadata = buildMetadata(config)

export default function Home() {
  return <LandingPage config={config} />
}
```

## Theme and font

`config.theme` can include `themeId`, `fontId` (app-defined), or legacy `primaryColor`, `fontFamily`. Wrap the app (or layout) with **LandingThemeProvider** from the client entry so `data-theme` and optional font class are applied:

```tsx
import { LandingThemeProvider, LandingPage } from "@duytran7/landing-next"
import { LandingPageWithAnimations } from "@duytran7/landing-next/client"

// With animation + effects (client):
export default function Page() {
  return (
    <LandingThemeProvider theme={config.theme} fontClassName={fontClassName}>
      <LandingPageWithAnimations config={config} />
    </LandingThemeProvider>
  )
}
```

See [docs/STATE-AND-RICH-UI.md](../../docs/STATE-AND-RICH-UI.md).

## Animation and effects (client entry)

For scroll-in animation (`section.animation.enter`: fade, fade-up, fade-down, slide-left, slide-right) and section effects (parallax, float, mouseAware), use **LandingPageWithAnimations** from `@duytran7/landing-next/client` instead of `LandingPage`. Requires `framer-motion` (already a dependency of this package).

## Lottie background (Hero)

When Hero uses `background.type === "lottie"`, the library renders a placeholder with `data-landing-bg="lottie"`. Add **LottieInjector** once in your client layout so the player is injected: `import { LottieInjector } from "@duytran7/landing-components/lottie"` and render `<LottieInjector />` in the root layout (client).

## Mobile hamburger nav

`LandingPage` always uses the default `Nav` (desktop layout). For nav with `mobile.menu === "hamburger"`, render the page from a client component that uses `NavWithMobile` from `@duytran7/landing-components/nav-mobile` for the nav section. See [packages/components README](../components/README.md).

[Monorepo](https://github.com/Tran-Duc-Duy/duytran7#readme) · [Schema](../../docs/SCHEMA.md) · [Components](../../docs/COMPONENTS.md)
