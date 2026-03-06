# Kế hoạch: Template CLI (kiểu create-react-app) + Builder nhận JSON từng page

**Đã triển khai:** template tại `templates/next-landing/`, CLI tại `packages/create-landing-app/`. Chạy: `npx create-landing-app my-app [--type landing|saas|agency|blog] [--name pkg-name] [--no-install]`.

**Khai báo tên + loại dự án:** User khai báo tên dự án = thư mục tạo ra (đối số đầu). Loại dự án = `--type` / `-t`: **landing**, **saas**, **agency**, **blog** — mỗi type có preset tại `template/presets/<type>.json`, CLI ghi đè `content/pages/home.json` theo type. Option `--name` / `-n` ghi đè tên package trong `package.json`. Xem [packages/create-landing-app/README.md](../packages/create-landing-app/README.md).

**Template có deploy riêng không?** Không. Template được **đóng gói trong package CLI**: `package.json` có `"files": ["bin", "template"]`, nên khi publish lên npm thì thư mục `template/` (kèm `presets/`) đi kèm. Lúc chạy, `bin/create-landing-app.mjs` dùng `__dirname` để tìm `../template` ngay trong package đã cài — không cần host template ở URL nào.

Mục tiêu: cho phép user chạy lệnh (vd. `npx create-landing-app my-app`) để tạo dự án tối thiểu có **builder** và **nhận JSON từng page**, dựa trên cấu trúc demo đã rút gọn.

---

## 1. Phạm vi template (output)

**Cấu trúc tối thiểu cần có:**

- Next.js App Router (giống demo)
- **Layout**: header đơn giản (link Builder, Preview), LottieInjectorDynamic (nếu dùng Lottie)
- **Trang chủ** `/`: redirect hoặc render landing từ JSON
- **Builder** `/builder`: BuilderCanvas — chỉnh section, export/import JSON
- **Preview** `/builder/preview` (iframe) + `/builder/preview/[slug]` (tab mới): nhận config qua postMessage / localStorage
- **Data**: JSON từng page — có thể lưu ở `content/pages/*.json` hoặc do builder xuất ra, app đọc khi build hoặc runtime

**Bỏ khỏi template (chỉ có trong demo):**

- `/showcase`, `/demos`, `/about`, `/pricing`, `/contact`, `/custom-classes`
- `app/showcase/*`, `app/demos/*`, các page tĩnh không cần cho template
- `app/api/registry` (tùy chọn: giữ nếu muốn builder gọi API lấy registry)

---

## 2. Luồng “nhận JSON từng page”

Hai hướng:

| Cách                 | Mô tả                                                                                                                                                  | Dùng khi                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| **A. File-based**    | Mỗi page = 1 file JSON (vd. `content/pages/home.json`, `pricing.json`). App đọc khi build (getStaticProps) hoặc server component.                      | Site tĩnh, JSON do dev/CI tạo ra hoặc export từ builder rồi copy vào repo. |
| **B. Builder-first** | Builder là nguồn chính: user chỉnh trong UI, export JSON. App có thể (1) dùng JSON mặc định nhúng trong code, hoặc (2) đọc từ API/file do builder lưu. | Prototype nhanh, landing không cần CMS.                                    |

Template nên hỗ trợ **cả hai**: cấu hình mặc định đọc từ `content/pages/*.json` (nếu có), nếu không thì dùng JSON mặc định (hoặc từ builder export).

**Định dạng JSON mỗi page:** giống `LandingConfig`: `{ seo?, theme?, sections: LandingSection[] }`. Nhiều page = nhiều file, mỗi file một `LandingConfig` (hoặc wrapper `{ slug, config }`).

---

## 3. Các bước thực hiện

### Bước 1: Tách “template” trong repo

- Tạo thư mục `templates/next-landing/` (hoặc `packages/template-next/`).
- Copy từ `apps/demo` sang template chỉ những thứ cần:
  - `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (redirect hoặc đọc JSON)
  - `app/builder/` (toàn bộ: page, preview, \_components, \_data)
  - Cấu hình: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- **Không** copy: `app/showcase`, `app/demos`, `app/about`, `app/pricing`, `app/contact`, `app/custom-classes`, `app/api` (hoặc chỉ giữ `api` nếu cần registry).
- Trong template, `app/page.tsx` có thể: đọc `content/pages/home.json` (nếu có) và render `<LandingPage config={config} />`, fallback redirect `/builder`.

Kết quả: một bộ “minimal demo” chỉ gồm layout + builder + preview.

### Bước 2: Chuẩn hóa “content” — JSON từng page

- Trong template, định nghĩa thư mục mặc định cho JSON: ví dụ `content/pages/`.
- Quy ước tên: `home.json`, `pricing.json`, … hoặc `[slug].json` tương ứng route.
- Mỗi file export một object kiểu `LandingConfig` (có `sections`, `seo`, `theme`).
- Viết helper đọc JSON (vd. `getPageConfig(slug)`): dùng `fs` trong server component hoặc trong API route. Nếu file không tồn tại → trả về null hoặc config mặc định.

Như vậy “nhận vào JSON từng page” = app đọc từ `content/pages/<page>.json`.

### Bước 3: Builder nhận / xuất JSON từng page

- **Import**: Trong BuilderCanvas, thêm nút “Import JSON” (một file hoặc nhiều file). Parse JSON và set state `pages` (mỗi item có `slug`, `config`). Validate bằng `parseLandingConfigStrict` (hoặc parser hiện có).
- **Export**: Đã có (Copy JSON / Export JSON). Có thể thêm “Export to content/pages” (trong CLI hoặc script) ghi từng page ra `content/pages/<slug>.json`.
- **Khớp với file-based**: Nếu app đọc từ `content/pages/`, sau khi export từ builder ra đúng thư mục này thì lần build tiếp theo app sẽ dùng JSON mới.

Builder vẫn giữ model “nhiều page, mỗi page một config”; JSON file chỉ là nguồn dữ liệu khi chạy/build.

### Bước 4: Tạo package CLI (create-landing-app)

- Tạo package mới trong monorepo, ví dụ `packages/create-landing-app/` (hoặc tên khác như `create-duytran-landing`).
- Cấu trúc gợi ý:
  - `package.json`: `bin: { "create-landing-app": "./dist/cli.js" }`, dependency vào các package landing (core, components, next) ở version published (không dùng workspace khi user chạy npx).
  - `src/cli.ts`: đọc tham số (tên app, thư mục đích, có copy JSON mẫu không).
  - Template files: copy từ `templates/next-landing/` (đã tách ở bước 1) vào thư mục đích.
  - Thay thế placeholder (package name, tên app) nếu cần.
  - Chạy `pnpm install` hoặc `npm install` trong thư mục đích.
- Publish package lên npm (vd. `@duytran7/create-landing-app` hoặc `create-landing-app`). User chạy: `npx create-landing-app my-app`.

### Bước 5: Dependency trong template (khi user tạo project)

- Template dùng `@duytran7/landing-core`, `@duytran7/landing-components`, `@duytran7/landing-next` với **version cố định** (vd. `^0.1.0`), không dùng `workspace:*` (vì project tạo ra độc lập, không nằm trong monorepo).
- File `package.json` trong template có sẵn các dependency này; CLI chỉ cần copy và chạy install.

### Bước 6: Tùy chọn — seed JSON mẫu

- Trong template có sẵn `content/pages/home.json` (và có thể `pricing.json`) với config mẫu hợp lệ.
- Trang chủ `/` đọc `home.json` và render `<LandingPage config={config} />`.
- User có thể chỉnh trong builder rồi export ra đè file trong `content/pages/`, hoặc import JSON vào builder.

### Bước 7: Doc và README

- README trong template: cách chạy dev/build, cấu trúc `content/pages/`, cách dùng builder (import/export JSON), cách thêm page mới (tạo file JSON hoặc thêm từ builder).
- Doc trong repo (ví dụ `docs/TEMPLATE-CLI-PLAN.md` — file này): ghi lại quy ước JSON, luồng builder ↔ file, cách bảo trì template và CLI.

---

## 4. Thứ tự triển khai gợi ý

1. **Bước 1 + 2**: Tách template + chuẩn hóa `content/pages/*.json` và helper đọc — có ngay app tối thiểu “đọc JSON từng page”.
2. **Bước 3**: Builder import/export JSON — builder “nhận vào” và “xuất ra” JSON từng page.
3. **Bước 6**: Seed JSON mẫu trong template — trải nghiệm “mở là chạy”.
4. **Bước 4 + 5**: CLI copy template + cài đặt dependency — user chạy một lệnh là có project.
5. **Bước 7**: README và doc — người dùng và người bảo trì đều rõ cách dùng và mở rộng.

---

## 5. Tóm tắt

- **Template** = cấu trúc dự án tối thiểu từ demo: layout, builder, preview, không showcase/demos/trang tĩnh dư.
- **JSON từng page** = mỗi page một file (vd. `content/pages/<slug>.json`) theo `LandingConfig`; app đọc khi build/runtime; builder import/export đúng format đó.
- **CLI** = package có bin, copy template vào thư mục user chỉ định, cài dependency, (tùy chọn) seed JSON mẫu — tương tự `create-react-app` nhưng cho landing + builder.

Sau khi làm xong, user chỉ cần: `npx create-landing-app my-landing` → vào thư mục → chỉnh JSON trong builder hoặc trong file → build/deploy.
