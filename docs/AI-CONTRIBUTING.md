# Guide for AI and developers

This doc helps AI assistants and developers understand the repo, generate valid config, and extend it.

## Repo overview

- **Monorepo** (pnpm): `packages/core`, `packages/components`, `packages/next`, `apps/demo`.
- **Core** (`@duytran7/landing-core`): Types, Zod schema, parser, **component registry**. No React.
- **Components** (`@duytran7/landing-components`): React section components (Hero, Nav, …) + `SectionRenderer`. Tailwind/shadcn-style.
- **Next** (`@duytran7/landing-next`): `LandingPage`, `buildMetadata`, `parseLandingConfigStrict` for Next.js App Router.
- **Demo** (`apps/demo`): Next app with builder, showcase, and full landing demos.

## Generating landing config

1. **List sections**: Use the component registry (see [COMPONENTS.md](COMPONENTS.md)). Each entry has `id`, `description`, `useCase`, `variants`, `configFields`, `exampleConfig`.
2. **Pick sections**: Choose section types that match the page goal (e.g. hero, features, pricing, cta, footer).
3. **Build JSON**: For each section, include at least `id`, `type`, and the required fields from `configFields`. Use `exampleConfig` as a template.
4. **Validate**: Run `parseLandingConfigStrict(config)` (or the parser) to ensure the config is valid.

## Section IDs and types

- **id**: Unique per page (e.g. `hero-1`, `features-main`). Used for anchors and keys.
- **type**: Must match a registry `id` (e.g. `hero`, `nav`, `features`, `video-embed`, `countdown`, `trust-badges`).

## Adding a new section type

1. **Types** (`packages/core/src/types.ts`): Add interface `XxxSection extends SectionBase { type: "xxx"; ... }` and add to `LandingSection` union.
2. **Schema** (`packages/core/src/schema.ts`): Add Zod schema and append to `landingSectionSchema` discriminated union.
3. **Registry** (`packages/core/src/registry.ts`): Push a `ComponentRegistryEntry` (id, name, description, useCase, variants, configFields, exampleConfig).
4. **Component** (`packages/components/src/sections/Xxx.tsx`): Implement the React component; accept `config: XxxSection`.
5. **SectionRenderer**: Add `case "xxx": return <Xxx config={section} className={className} />`.
6. **Showcase** (optional): Add to `SECTION_LIST` and `SHOWCASE_ITEMS` in `apps/demo/app/showcase/_data/sections.ts`.

## MCP server (landing-mcp)

An MCP server is provided so Cursor, Claude, or other clients can:

- **List sections**: All section types with descriptions and use cases.
- **Get section info**: Variants and example config for a given section type.
- **Get full registry**: Full JSON registry for tooling/docs.

Setup:

1. Build the MCP server: from repo root, `pnpm --filter @duytran7/landing-mcp run build`. See **mcp/README.md** for full instructions.
2. Add the server to your Cursor or Claude Desktop MCP config (stdio; path to `mcp/dist/index.js`).
3. Use the tools **list_sections**, **get_section_info**, **get_registry** when generating or editing landing JSON.

## Naming and style

- **Config**: camelCase for keys. Section `type` and `variant` are lowercase with hyphen if needed (e.g. `logo-cloud`, `video-embed`).
- **Code**: PascalCase for components, camelCase for files and functions. No `I` prefix for interfaces.
- **Docs**: Prefer English for docs, comments, and UI strings.

## Testing and build

- From repo root: `pnpm install`, `pnpm run build`, `pnpm run lint`.
- Demo app: `apps/demo`; use `workspace:*` for local packages so new section types are available before publish.
