# Landing app (from create-landing-app)

Minimal Next.js app with a **Builder** and **JSON-per-page** config. Khi tạo bằng CLI với `--type` (landing, saas, agency, blog), file `content/pages/home.json` đã được điền sẵn theo preset; bạn có thể chỉnh trong Builder hoặc sửa file.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — run production server

## Structure

- **`content/pages/*.json`** — One file per page (e.g. `home.json`). Each file is a `LandingConfig` (`sections`, `seo`, `theme`). The home page at `/` reads `content/pages/home.json`; add more files and routes as needed.
- **`/builder`** — Drag-and-drop builder: add sections, edit, then **Export JSON** or **Copy JSON**. Use **Import JSON** to load a file (single `LandingConfig` or `{ pages: [{ slug, config }] }`).
- **Preview** — In builder, use "Preview" or "Open in new tab" to see the current config.

## Adding a page from JSON

1. Edit in Builder and click **Export JSON**, or write JSON by hand.
2. Save as `content/pages/<slug>.json` (e.g. `pricing.json`).
3. Add a route in `app/` that calls `getPageConfig("<slug>")` and renders `<LandingPage config={config} />` (see `app/page.tsx` for home).

## Docs

- [Landing config schema](https://github.com/Tran-Duc-Duy/duytran7#readme) — `@duytran7/landing-core`
- [State & rich UI](https://github.com/Tran-Duc-Duy/duytran7/blob/main/docs/STATE-AND-RICH-UI.md) — theme, Lottie, animation
