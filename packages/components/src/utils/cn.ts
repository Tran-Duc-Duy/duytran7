/**
 * Merge classNames (shadcn-style). Consumer can provide clsx + tailwind-merge or use fallback.
 */

export function cn(
  ...inputs: (string | number | boolean | undefined | null)[]
): string {
  return inputs.filter(Boolean).join(" ").replace(/\s+/g, " ").trim()
}
