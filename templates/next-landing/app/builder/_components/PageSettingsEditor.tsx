/**
 * PageSettingsEditor — form for metadata, theme, SEO of current page (Lighthouse, SEO).
 */

"use client"

import type { SeoConfig } from "@duytran7/landing-core"
import { getDefaultSeo } from "../_data/defaultSections"

export interface PageSettingsEditorProps {
  pageName: string
  seo: Partial<SeoConfig>
  theme: { primaryColor?: string; fontFamily?: string }
  onChange: (updates: {
    seo: Partial<SeoConfig>
    theme: { primaryColor?: string; fontFamily?: string }
  }) => void
  onClose: () => void
}

const defaultSeo = getDefaultSeo()

function LabelInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  id,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  id: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-foreground block text-xs font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-border bg-background text-foreground mt-1 w-full rounded border px-2 py-1.5 text-sm"
      />
    </div>
  )
}

export function PageSettingsEditor({
  pageName,
  seo,
  theme,
  onChange,
  onClose,
}: PageSettingsEditorProps) {
  const s = { ...defaultSeo, ...seo }
  const og = s.og ?? {}
  const twitter = s.twitter ?? {}

  const updateSeo = (patch: Partial<SeoConfig>) => {
    onChange({
      seo: { ...seo, ...patch },
      theme,
    })
  }

  const updateTheme = (patch: {
    primaryColor?: string
    fontFamily?: string
  }) => {
    onChange({ seo, theme: { ...theme, ...patch } })
  }

  return (
    <div className="border-border bg-card flex h-full flex-col border-l">
      <div className="border-border flex items-center justify-between border-b px-3 py-2">
        <h2 className="text-foreground text-sm font-semibold">
          Page settings — {pageName}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded p-1"
          aria-label="Close page settings"
        >
          ×
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        <section className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            Metadata & SEO
          </h3>
          <div className="space-y-2">
            <LabelInput
              id="seo-title"
              label="Title"
              value={s.title ?? ""}
              onChange={(v) => updateSeo({ title: v || undefined })}
              placeholder="Page title (meta, og)"
            />
            <LabelInput
              id="seo-description"
              label="Description"
              value={s.description ?? ""}
              onChange={(v) => updateSeo({ description: v || undefined })}
              placeholder="Meta description"
            />
            <LabelInput
              id="seo-canonical"
              label="Canonical URL"
              value={s.canonical ?? ""}
              onChange={(v) => updateSeo({ canonical: v || undefined })}
              placeholder="https://..."
            />
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            Open Graph
          </h3>
          <div className="space-y-2">
            <LabelInput
              id="og-title"
              label="og:title"
              value={og.title ?? ""}
              onChange={(v) =>
                updateSeo({
                  og: { ...og, title: v || undefined },
                })
              }
            />
            <LabelInput
              id="og-description"
              label="og:description"
              value={og.description ?? ""}
              onChange={(v) =>
                updateSeo({
                  og: { ...og, description: v || undefined },
                })
              }
            />
            <LabelInput
              id="og-image"
              label="og:image"
              value={og.image ?? ""}
              onChange={(v) =>
                updateSeo({
                  og: { ...og, image: v || undefined },
                })
              }
              placeholder="https://..."
            />
            <LabelInput
              id="og-type"
              label="og:type"
              value={og.type ?? ""}
              onChange={(v) =>
                updateSeo({
                  og: { ...og, type: v || undefined },
                })
              }
              placeholder="website"
            />
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            Twitter Card
          </h3>
          <div className="space-y-2">
            <LabelInput
              id="twitter-card"
              label="twitter:card"
              value={twitter.card ?? ""}
              onChange={(v) =>
                updateSeo({
                  twitter: {
                    ...twitter,
                    card: (v as "summary" | "summary_large_image") || undefined,
                  },
                })
              }
              placeholder="summary | summary_large_image"
            />
            <LabelInput
              id="twitter-title"
              label="twitter:title"
              value={twitter.title ?? ""}
              onChange={(v) =>
                updateSeo({
                  twitter: { ...twitter, title: v || undefined },
                })
              }
            />
            <LabelInput
              id="twitter-description"
              label="twitter:description"
              value={twitter.description ?? ""}
              onChange={(v) =>
                updateSeo({
                  twitter: { ...twitter, description: v || undefined },
                })
              }
            />
            <LabelInput
              id="twitter-image"
              label="twitter:image"
              value={twitter.image ?? ""}
              onChange={(v) =>
                updateSeo({
                  twitter: { ...twitter, image: v || undefined },
                })
              }
            />
          </div>
        </section>

        <section className="mb-6">
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            Theme
          </h3>
          <div className="space-y-2">
            <LabelInput
              id="theme-primary"
              label="Primary color (CSS value)"
              value={theme.primaryColor ?? ""}
              onChange={(v) => updateTheme({ primaryColor: v || undefined })}
              placeholder="hsl(222 47% 11%)"
            />
            <LabelInput
              id="theme-font"
              label="Font family (CSS)"
              value={theme.fontFamily ?? ""}
              onChange={(v) => updateTheme({ fontFamily: v || undefined })}
              placeholder="system-ui, sans-serif"
            />
          </div>
        </section>

        <section>
          <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
            JSON-LD (optional)
          </h3>
          <p className="text-muted-foreground mb-1 text-xs">
            Structured data for search. Valid JSON object or array.
          </p>
          <textarea
            id="seo-jsonld"
            className="border-border bg-background min-h-[80px] w-full resize-y rounded border px-2 py-1.5 font-mono text-xs"
            value={
              s.jsonLd
                ? JSON.stringify(
                    Array.isArray(s.jsonLd) ? s.jsonLd : s.jsonLd,
                    null,
                    2
                  )
                : ""
            }
            onChange={(e) => {
              const raw = e.target.value.trim()
              if (!raw) {
                updateSeo({ jsonLd: undefined })
                return
              }
              try {
                const parsed = JSON.parse(raw) as
                  | Record<string, unknown>
                  | Record<string, unknown>[]
                updateSeo({ jsonLd: parsed })
              } catch {
                // ignore invalid JSON while typing
              }
            }}
            spellCheck={false}
            aria-label="JSON-LD structured data"
          />
        </section>
      </div>
    </div>
  )
}
