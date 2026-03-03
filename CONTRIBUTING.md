# Contributing

Thank you for your interest in contributing to Landing. This document explains how to contribute code, report bugs, and suggest features.

## Table of contents

- [Code of Conduct](#code-of-conduct)
- [Getting started](#getting-started)
- [Contribution workflow](#contribution-workflow)
- [Code standards](#code-standards)
- [Repo structure](#repo-structure)
- [Adding a new section or component](#adding-a-new-section-or-component)
- [Test](#test)
- [Publish (for maintainers)](#publish-for-maintainers)

## Code of Conduct

The project adheres to the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to respect it.

## Getting started

### Requirements

- **Node.js** >= 18
- **pnpm** >= 9 (recommend the version in root `package.json`’s `packageManager`)

### Install and run

```bash
# Clone repo (replace your-username with actual org/user)
git clone https://github.com/your-username/landing.git
cd landing

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Useful scripts

| Script            | Description                                 |
| ----------------- | ------------------------------------------- |
| `pnpm build`      | Build all packages                          |
| `pnpm dev`        | Watch mode per package (run inside package) |
| `pnpm test`       | Run tests (Vitest, from root)               |
| `pnpm test:watch` | Run tests in watch mode                     |
| `pnpm lint`       | Check format (Prettier)                     |
| `pnpm format`     | Auto-format code                            |
| `pnpm clean`      | Remove `dist` and `node_modules`            |

## Contribution workflow

1. **Fork** the repo and create a branch from `main` (or `master`):

   ```bash
   git checkout -b feat/short-description
   # or fix/short-description for bugfix
   ```

2. **Open an issue** (recommended) before large PRs:
   - Bugs: use [Bug report](.github/ISSUE_TEMPLATE/bug_report.yml)
   - New features: use [Feature request](.github/ISSUE_TEMPLATE/feature_request.yml)

3. **Code** according to [code standards](#code-standards) below.

4. **Test**: add or update tests in `packages/<pkg>/tests/*.test.ts` when changing logic. Run `pnpm test` before opening a PR.

5. **Commit** with a clear message; you can follow:
   - `feat(scope): description` — new feature
   - `fix(scope): description` — bugfix
   - `docs: description` — docs only
   - `chore(scope): description` — tooling, deps, config

6. **Push** and open a **Pull Request**:
   - Fill in the PR template (describe changes, link issue if any).
   - Ensure CI (build, lint, test) passes.

7. **Review**: maintainers will review and may request changes.

## Code standards

- **TypeScript**: strict mode, avoid `any` when possible. Config types live in `@landing/core`.
- **Format**: Prettier (see `.prettierrc`). Run `pnpm format` before committing.
- **Imports**: keep a consistent order (e.g. node/react, aliases, relative). Follow ESLint import-sort if configured.
- **File names**: camelCase for logic files, PascalCase for React components.
- **Comments**: one or two lines at the top describing the file’s purpose; keep comments consistent within a file.

## Repo structure

```
.
├── packages/
│   ├── core/          # @landing/core — types, schema, parser
│   ├── components/    # @landing/components — React UI
│   └── next/          # @landing/next — Next.js adapter
├── examples/          # Example JSON configs
├── .github/           # Issue/PR templates, CI
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

- **core**: no React/Next dependency; TypeScript + Zod only.
- **components**: depends on `@landing/core` and React; exports primitives and sections.
- **next**: depends on core and components; peer Next.js; exports metadata, LandingPage, JsonLd.

## Adding a new section or component

1. **Define the type** in `packages/core/src/types.ts` (e.g. `NewSection extends SectionBase { type: "new"; ... }`).
2. **Add Zod schema** in `packages/core/src/schema.ts` and include it in `landingSectionSchema` (discriminated union).
3. **Export the type** from `packages/core/src/index.ts`.
4. **Create the component** in `packages/components/src/sections/NewSection.tsx` (accepts `config: NewSection`, renders semantic HTML).
5. **Register it** in `packages/components/src/sections/SectionRenderer.tsx` (case `"new"` → `<NewSection config={section} />`).
6. **Update README** (schema sections) and optionally `examples/landing.json`.

Run `pnpm build` after adding to ensure nothing breaks.

## Test

- Tests use **Vitest**; config is at root `vitest.config.ts`.
- Put test files under `packages/<package-name>/tests/*.test.ts` (or `*.test.tsx` for React).
- From root: `pnpm test` (single run) or `pnpm test:watch` (watch).
- CI runs `pnpm test` after build; PRs must pass tests.

## Publish (for maintainers)

- **Bump version**: run `./scripts/bump-version.sh` to bump patch for all packages (no git tag is created).
- **Publish to npm**: push a tag `v*` or `landing-*` (e.g. `v0.1.1`). The [.github/workflows/publish.yml](.github/workflows/publish.yml) workflow will build, test, and publish. Configure **NPM_TOKEN** in repo Secrets.

---

If you have questions, open a [Discussion](https://github.com/your-username/landing/discussions) or comment on the relevant issue.
