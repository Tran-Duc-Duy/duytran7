/**
 * Page templates: mỗi loại trang có tên, slug mặc định và danh sách section types.
 * Dùng khi "Add page" hoặc "Add inner page" để tạo trang với nội dung mẫu.
 */

import type { LandingSection } from "@duytran7/landing-core"
import { createDefaultSection } from "./defaultSections"

export interface PageTemplate {
  id: string
  name: string
  slug: string
  description: string
  /** Section type ids theo thứ tự (nav/hero/... từ defaultSections). */
  sectionTypes: string[]
}

/** Các template trang và inner page. */
export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: "landing",
    name: "Landing",
    slug: "/",
    description: "Trang chủ: Nav, Hero, Features, CTA, Footer",
    sectionTypes: ["nav", "hero", "features", "cta", "footer"],
  },
  {
    id: "about",
    name: "Về chúng tôi",
    slug: "/about",
    description: "Giới thiệu: Nav, Hero, Team, Testimonials, CTA, Footer",
    sectionTypes: ["nav", "hero", "team", "testimonials", "cta", "footer"],
  },
  {
    id: "pricing",
    name: "Giá",
    slug: "/pricing",
    description: "Bảng giá: Nav, Hero, Pricing, FAQ, CTA, Footer",
    sectionTypes: ["nav", "hero", "pricing", "faq", "cta", "footer"],
  },
  {
    id: "contact",
    name: "Liên hệ",
    slug: "/contact",
    description: "Liên hệ: Nav, Hero, Contact, Footer",
    sectionTypes: ["nav", "hero", "contact", "footer"],
  },
  {
    id: "faq",
    name: "FAQ",
    slug: "/faq",
    description: "Câu hỏi thường gặp: Nav, Hero, FAQ, CTA, Footer",
    sectionTypes: ["nav", "hero", "faq", "cta", "footer"],
  },
  {
    id: "login",
    name: "Đăng nhập / Đăng ký",
    slug: "/login",
    description: "Trang đăng nhập: Nav, Hero (Sign in), CTA, Footer",
    sectionTypes: ["nav", "hero", "cta", "footer"],
  },
  {
    id: "blog-post",
    name: "Bài viết / Blog",
    slug: "/blog/post",
    description: "Nội dung bài viết: Nav, Hero, Features (nội dung), Footer",
    sectionTypes: ["nav", "hero", "features", "footer"],
  },
  {
    id: "product",
    name: "Sản phẩm / Tính năng",
    slug: "/product",
    description: "Trang sản phẩm: Nav, Hero, Features, Gallery, CTA, Footer",
    sectionTypes: ["nav", "hero", "features", "gallery", "cta", "footer"],
  },
  {
    id: "dashboard",
    name: "Dashboard / Danh sách",
    slug: "/dashboard",
    description: "Thống kê & danh sách: Nav, Stats, Features, Footer",
    sectionTypes: ["nav", "stats", "features", "footer"],
  },
  {
    id: "team",
    name: "Đội ngũ (inner)",
    slug: "team",
    description: "Trang con Đội ngũ: Hero, Team, Footer",
    sectionTypes: ["hero", "team", "footer"],
  },
  {
    id: "testimonials",
    name: "Đánh giá (inner)",
    slug: "testimonials",
    description: "Trang con Testimonials: Hero, Testimonials, Footer",
    sectionTypes: ["hero", "testimonials", "footer"],
  },
  {
    id: "blank",
    name: "Trang trống",
    slug: "/new-page",
    description: "Trang không section, tự thêm sau",
    sectionTypes: [],
  },
]

/** Template cho trang gốc (không phải inner). */
export const ROOT_PAGE_TEMPLATES = PAGE_TEMPLATES.filter(
  (t) => t.slug.startsWith("/") || t.id === "blank"
)

/** Template phù hợp cho inner page (slug không có leading /). */
export const INNER_PAGE_TEMPLATES = PAGE_TEMPLATES.filter(
  (t) => !t.slug.startsWith("/") || t.id === "blank"
)

export function createSectionsFromTemplate(sectionTypes: string[]): LandingSection[] {
  const sections: LandingSection[] = []
  for (const type of sectionTypes) {
    const section = createDefaultSection(type)
    if (section) sections.push(section)
  }
  return sections
}

export function createPageFromTemplate(
  templateId: string,
  options?: { parentSlug?: string; nameOverride?: string; slugSuffix?: string }
): { name: string; slug: string; sectionTypes: string[] } | null {
  const template = PAGE_TEMPLATES.find((t) => t.id === templateId)
  if (!template) return null

  let slug = template.slug
  if (options?.parentSlug) {
    const base =
      options.slugSuffix ?? (template.slug.replace(/^\//, "") || "page")
    slug = `${options.parentSlug.replace(/\/$/, "")}/${base}`
  }
  if (options?.slugSuffix && !options?.parentSlug) {
    slug = options.slugSuffix.startsWith("/") ? options.slugSuffix : `/${options.slugSuffix}`
  }

  return {
    name: options?.nameOverride ?? template.name,
    slug,
    sectionTypes: [...template.sectionTypes],
  }
}
