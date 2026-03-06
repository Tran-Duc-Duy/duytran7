import { readFileSync, existsSync } from "fs"
import { join } from "path"
import type { LandingConfig } from "@duytran7/landing-core"
import { parseLandingConfig } from "@duytran7/landing-core"

const CONTENT_DIR = join(process.cwd(), "content", "pages")

/**
 * Đọc config landing từ content/pages/<slug>.json. Trả về null nếu file không tồn tại hoặc invalid.
 */
export function getPageConfig(slug: string): LandingConfig | null {
  const filePath = join(CONTENT_DIR, `${slug}.json`)
  if (!existsSync(filePath)) return null
  try {
    const raw = readFileSync(filePath, "utf-8")
    const parsed = parseLandingConfig(JSON.parse(raw))
    if (parsed.success) return parsed.data
    return null
  } catch {
    return null
  }
}

/** Danh sách slug có file trong content/pages (để build static paths). */
export function getPageSlugs(): string[] {
  try {
    const { readdirSync } = require("fs")
    const files = readdirSync(CONTENT_DIR, { withFileTypes: true })
    return files
      .filter((f: { isFile: () => boolean; name: string }) => f.isFile() && f.name.endsWith(".json"))
      .map((f: { name: string }) => f.name.replace(/\.json$/, ""))
  } catch {
    return []
  }
}
