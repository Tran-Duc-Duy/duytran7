# @landing/core

Types, Zod schema, parser, and component registry for landing page JSON config. Framework-agnostic.

## Install

```bash
pnpm add @landing/core
```

## Usage

- **Types:** `LandingConfig`, `LandingSection`, `HeroSection`, `NavSection`, etc.
- **Schema:** `landingConfigSchema` (Zod) to validate JSON.
- **Parser:** `parseLandingConfig(json)` or `parseLandingConfigStrict(json)`.
- **Registry:** `componentRegistry`, `getComponentRegistryEntry(id)`, `getComponentRegistryJson()` for AI/tooling.

See the [monorepo docs](https://github.com/your-username/landing#readme) and [docs/README.md](https://github.com/your-username/landing/blob/main/docs/README.md) for full reference.
