/**
 * Danh sách class Tailwind gợi ý cho autocomplete trong builder.
 * Bao phủ utility thường dùng; user vẫn có thể gõ class bất kỳ.
 */

const colors = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

function* colorClasses(
  prefix: string
): Generator<string> {
  for (const c of colors) {
    for (const s of shades) {
      yield `${prefix}-${c}-${s}`
    }
  }
  yield `${prefix}-black`
  yield `${prefix}-white`
  yield `${prefix}-transparent`
  yield `${prefix}-current`
  for (const c of colors) {
    yield `${prefix}-${c}`
  }
}

const spacing = [
  0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48,
  52, 56, 60, 64, 72, 80, 96,
]

function* spacingClasses(prefix: string, values: number[] = spacing): Generator<string> {
  for (const v of values) {
    yield `${prefix}-${v}`
  }
  yield `${prefix}-auto`
  yield `${prefix}-px`
}

const opacities = [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100]

function* opacitySlash(prefix: string): Generator<string> {
  for (const o of opacities) {
    yield `${prefix}/${o}`
  }
}

const rounded = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const
const shadows = ["sm", "md", "lg", "xl", "2xl", "inner", "none"] as const
const fontSizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"] as const
const fontWeights = ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"] as const

const TAILWIND_CLASSES: string[] = []

// bg-*
TAILWIND_CLASSES.push(...Array.from(colorClasses("bg")))
TAILWIND_CLASSES.push(...Array.from(opacitySlash("bg-black")))
TAILWIND_CLASSES.push(...Array.from(opacitySlash("bg-white")))
for (const c of colors) {
  TAILWIND_CLASSES.push(...Array.from(opacitySlash(`bg-${c}-500`)))
}

// text-*
TAILWIND_CLASSES.push(...Array.from(colorClasses("text")))
TAILWIND_CLASSES.push(...Array.from(opacitySlash("text-black")))
TAILWIND_CLASSES.push(...Array.from(opacitySlash("text-white")))

// border-*
TAILWIND_CLASSES.push(...Array.from(colorClasses("border")))
TAILWIND_CLASSES.push("border-border", "border-input")

// p, px, py, pt, pr, pb, pl
for (const prefix of ["p", "px", "py", "pt", "pr", "pb", "pl"]) {
  TAILWIND_CLASSES.push(...Array.from(spacingClasses(prefix)))
}

// m, mx, my, mt, mr, mb, ml
for (const prefix of ["m", "mx", "my", "mt", "mr", "mb", "ml"]) {
  TAILWIND_CLASSES.push(...Array.from(spacingClasses(prefix)))
}

// gap
TAILWIND_CLASSES.push(...Array.from(spacingClasses("gap")))

// w, h, min-w, min-h, max-w, max-h
for (const prefix of ["w", "h", "min-w", "min-h", "max-w", "max-h"]) {
  TAILWIND_CLASSES.push(...Array.from(spacingClasses(prefix)))
  TAILWIND_CLASSES.push(`${prefix}-full`, `${prefix}-screen`, `${prefix}-min`, `${prefix}-max`, `${prefix}-fit`)
}

// rounded
for (const r of rounded) {
  TAILWIND_CLASSES.push(`rounded-${r}`)
}
TAILWIND_CLASSES.push(...Array.from(spacingClasses("rounded", [0, 1, 2, 3, 4, 5, 6, 7, 8])))

// shadow
for (const sh of shadows) {
  TAILWIND_CLASSES.push(`shadow-${sh}`)
}

// typography
for (const fs of fontSizes) {
  TAILWIND_CLASSES.push(`text-${fs}`)
}
for (const fw of fontWeights) {
  TAILWIND_CLASSES.push(`font-${fw}`)
}
TAILWIND_CLASSES.push("italic", "not-italic", "uppercase", "lowercase", "capitalize", "normal-case", "underline", "line-through", "no-underline")

// flex, grid
TAILWIND_CLASSES.push("flex", "inline-flex", "grid", "inline-grid", "hidden", "block", "inline-block", "inline", "contents")
TAILWIND_CLASSES.push("flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse")
TAILWIND_CLASSES.push("flex-wrap", "flex-nowrap", "flex-wrap-reverse")
TAILWIND_CLASSES.push("items-start", "items-end", "items-center", "items-baseline", "items-stretch")
TAILWIND_CLASSES.push("justify-start", "justify-end", "justify-center", "justify-between", "justify-around", "justify-evenly")
TAILWIND_CLASSES.push("grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4", "grid-cols-5", "grid-cols-6")
TAILWIND_CLASSES.push("sm:grid-cols-2", "md:grid-cols-3", "lg:grid-cols-4")

// overflow, position
TAILWIND_CLASSES.push("overflow-auto", "overflow-hidden", "overflow-clip", "overflow-visible", "overflow-scroll")
TAILWIND_CLASSES.push("relative", "absolute", "fixed", "sticky")

// common single
TAILWIND_CLASSES.push(
  "bg-muted",
  "bg-muted/20",
  "bg-muted/30",
  "bg-background",
  "bg-card",
  "bg-primary",
  "bg-primary/10",
  "bg-primary/90",
  "text-foreground",
  "text-muted-foreground",
  "text-primary",
  "border",
  "border-0",
  "border-2",
  "border-4",
  "border-dashed",
  "border-border",
  "object-cover",
  "object-contain",
  "object-center",
  "bg-cover",
  "bg-center",
  "bg-no-repeat",
  "aspect-video",
  "aspect-square",
  "w-full",
  "h-full",
  "min-h-screen",
  "py-16",
  "py-24",
  "sm:py-24",
  "px-4",
  "container",
  "mx-auto",
  "text-center",
  "list-none",
  "space-y-4",
  "gap-4",
  "rounded-lg",
  "rounded-md",
  "shadow-lg",
  "transition-colors",
  "hover:bg-muted",
  "focus:ring-2",
  "focus:ring-ring",
  "focus:outline-none"
)

const UNIQ = [...new Set(TAILWIND_CLASSES)].sort()

export const TAILWIND_SUGGESTIONS: string[] = UNIQ

/** Default value gợi ý theo ngữ cảnh (vd. className root, overlay). */
export const TAILWIND_DEFAULTS: Record<string, string> = {
  "className (root)": "py-16 bg-muted/20",
  "classes.root": "py-16 bg-muted/20",
  "classes.container": "max-w-6xl mx-auto",
  "classes.title": "text-3xl font-bold",
  "classes.subtitle": "text-muted-foreground mt-4",
  "classes.description": "text-muted-foreground",
  "classes.primaryButton": "bg-primary text-primary-foreground",
  "classes.secondaryButton": "border border-input",
  overlay: "bg-black/40",
  "background color": "bg-red-100",
}

/** Lọc gợi ý theo từ khóa (prefix). */
export function filterTailwindSuggestions(query: string, limit = 40): string[] {
  const q = query.trim().toLowerCase()
  if (!q) return TAILWIND_SUGGESTIONS.slice(0, limit)
  return TAILWIND_SUGGESTIONS.filter((c) => c.toLowerCase().startsWith(q)).slice(0, limit)
}

/** Lấy token hiện tại (từ cuối cùng) trong chuỗi nhiều class. */
export function getCurrentToken(value: string): string {
  const parts = value.trim().split(/\s+/)
  return parts[parts.length - 1] ?? ""
}

/** Thay token cuối bằng suggestion (hoặc append nếu chưa có token). */
export function applySuggestion(currentValue: string, suggestion: string): string {
  const trimmed = currentValue.trim()
  const parts = trimmed.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return suggestion
  parts[parts.length - 1] = suggestion
  return parts.join(" ")
}
