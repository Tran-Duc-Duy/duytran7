# Next.js landing template (minimal)

Template nguồn cho **create-landing-app**. Cấu trúc tối thiểu: layout, Home (đọc `content/pages/home.json`), Builder (kèm Import/Export JSON), Preview.

- **Presets:** CLI hỗ trợ `--type landing|saas|agency|blog` để ghi sẵn nội dung `content/pages/home.json`; presets nằm trong `packages/create-landing-app/template/presets/`.
- **Đồng bộ:** Khi sửa template, copy sang `packages/create-landing-app/template/` (kèm presets nếu đổi) để CLI ship đúng bản mới.
- **Chạy tại chỗ (trong monorepo):** Từ **root repo** chạy `pnpm install`, rồi `cd templates/next-landing && pnpm run dev`. Không chạy `pnpm install` ngay trong thư mục template — dependency được cài chung workspace.

Xem [docs/TEMPLATE-CLI-PLAN.md](../../docs/TEMPLATE-CLI-PLAN.md) và [packages/create-landing-app/README.md](../../packages/create-landing-app/README.md).
