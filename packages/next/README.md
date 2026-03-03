# @landing/next

Next.js adapter: `buildMetadata`, `JsonLd`, and `LandingPage` rendered from JSON config. Use with `@landing/core` and `@landing/components`.

## Install

```bash
pnpm add @landing/next @landing/core @landing/components
```

Peer dependencies: `next`, `react`, `react-dom`.

## Usage

```tsx
// app/page.tsx
import { readFileSync } from "fs"
import { join } from "path"
import { LandingPage, buildMetadata, parseLandingConfigStrict } from "@landing/next"

const config = parseLandingConfigStrict(
  JSON.parse(readFileSync(join(process.cwd(), "landing.json"), "utf-8"))
)

export const metadata = buildMetadata(config)

export default function Home() {
  return <LandingPage config={config} />
}
```

See the [monorepo docs](https://github.com/your-username/landing#readme) and [docs/README.md](https://github.com/your-username/landing/blob/main/docs/README.md) for full reference.
