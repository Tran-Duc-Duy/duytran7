# create-landing-app

Scaffold a minimal Next.js landing app with a **Builder** and **JSON-per-page** config (one JSON file per page in `content/pages/`).

**Template có cần deploy riêng không?** Không. Template nằm **trong chính package** (`template/`). Khi publish `create-landing-app` lên npm, field `"files": ["bin", "template"]` đảm bảo thư mục `template/` được đóng gói theo. User chạy `npx create-landing-app my-app` → npx tải package về → chạy `bin/create-landing-app.mjs` → script copy từ `template/` (cùng cấp với `bin/`, trong package vừa tải) ra thư mục đích. Không cần URL hay server riêng.

## Usage

```bash
npx create-landing-app <project-directory> [options]
cd <project-directory>
npm run dev
```

**Options:**

| Option         | Mô tả                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| `--type`, `-t` | Loại dự án = preset nội dung cho `content/pages/home.json`: **landing** (mặc định), **saas**, **agency**, **blog** |
| `--name`, `-n` | Tên package (mặc định: tên thư mục, đã chuẩn hóa)                                                                  |
| `--no-install` | Bỏ qua `npm install` (khi test trong monorepo với workspace)                                                       |

**Ví dụ:**

```bash
npx create-landing-app my-landing
npx create-landing-app my-saas --type saas
npx create-landing-app agency-site -t agency --name my-agency
npx create-landing-app blog -t blog --no-install
```

Sau khi tạo, mở http://localhost:3000 — Home đọc `content/pages/home.json` (đã điền theo preset). Vào **/builder** để chỉnh, import/export JSON, preview.

## Presets (--type)

| Type        | Nội dung mẫu `home.json`                                            |
| ----------- | ------------------------------------------------------------------- |
| **landing** | Hero, Features, CTA (mặc định)                                      |
| **saas**    | Nav, Hero centered, Features, Pricing, CTA, Footer                  |
| **agency**  | Nav, Hero minimal, Stats, Features cards, Testimonials, CTA, Footer |
| **blog**    | Nav, Hero, Blog grid, Newsletter, Footer                            |

Preset nằm trong package tại `template/presets/<type>.json`; CLI ghi đè `content/pages/home.json` theo type. User vẫn chỉnh thoải mái trong Builder hoặc sửa file sau khi tạo.

## What you get

- Next.js 16 (App Router) + Tailwind
- **Layout** — Home, Builder links; Lottie injector for Hero Lottie backgrounds
- **Home** (`/`) — Renders `content/pages/home.json` via `<LandingPage />`; redirects to `/builder` if file missing
- **Builder** (`/builder`) — Full builder: add/remove/reorder sections, page settings, Preview, Import JSON, Copy/Export JSON
- **Preview** — Iframe in builder + standalone at `/builder/preview/[slug]`
- **Helper** — `getPageConfig(slug)` in `app/lib/getPageConfig.ts` to read `content/pages/<slug>.json`

## JSON format

- Single page: a **LandingConfig** (`sections`, `seo?`, `theme?`).
- Multi-page export from builder: `{ pages: [ { slug, name?, config } ] }`. Use **Import JSON** to load this in the builder.

## Thử nghiệm create-landing-app trong monorepo (chưa publish)

Để test CLI ngay trong repo, dùng app tạo ra làm workspace package và trỏ dependency vào local:

1. **Tạo app** (từ root repo), dùng **`--no-install`** để không chạy `npm install` (tránh tải mãi vì `@duytran7/landing-*` có thể chưa publish):

   ```bash
   node packages/create-landing-app/bin/create-landing-app.mjs test-landing-app --no-install
   ```

   → Thư mục `test-landing-app/` xuất hiện ở root.

2. **Thêm vào workspace** — trong `pnpm-workspace.yaml` thêm một dòng:

   ```yaml
   - "test-landing-app"
   ```

3. **Dùng package local** — mở `test-landing-app/package.json`, đổi 3 dependency landing thành `workspace:*`:

   ```json
   "@duytran7/landing-core": "workspace:*",
   "@duytran7/landing-components": "workspace:*",
   "@duytran7/landing-next": "workspace:*",
   ```

4. **Cài và chạy** (từ root):

   ```bash
   pnpm install
   cd test-landing-app && pnpm run dev
   ```

   Mở http://localhost:3000 (Home đọc `content/pages/home.json`), vào **/builder** để chỉnh, Import/Export JSON, Preview.

5. **Dọn sau khi test xong:** xóa thư mục `test-landing-app/` và bỏ dòng `- "test-landing-app"` trong `pnpm-workspace.yaml`.

---

## Monorepo

This package lives in the same repo as `@duytran7/landing-core`, `@duytran7/landing-components`, `@duytran7/landing-next`. The generated app depends on those packages from npm (`^0.1.0`). To develop the template locally, copy from `templates/next-landing` in the repo and use `workspace:*` in the copied `package.json` if needed.
