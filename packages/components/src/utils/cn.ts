/**
 * Merge classNames (shadcn-style). Consumer có thể cung cấp clsx + tailwind-merge hoặc dùng fallback.
 */

export function cn(
  ...inputs: (string | number | boolean | undefined | null)[]
): string {
  return inputs.filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}
