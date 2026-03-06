"use client"

import React, { useCallback } from "react"
import type { LandingSection } from "@duytran7/landing-core"
import { cn } from "@duytran7/landing-components"
import { TailwindClassInput } from "./TailwindClassInput"
import { ImageUrlInput } from "./ImageUrlInput"

const SECTION_NAMES: Record<string, string> = {
  hero: "Hero",
  nav: "Nav",
  features: "Features",
  stats: "Stats",
  "logo-cloud": "Logo Cloud",
  team: "Team",
  testimonials: "Testimonials",
  pricing: "Pricing",
  faq: "FAQ",
  cta: "CTA",
  newsletter: "Newsletter",
  contact: "Contact",
  gallery: "Gallery",
  banner: "Banner",
  comparison: "Comparison",
  timeline: "Timeline",
  footer: "Footer",
}

const CLASS_KEYS = [
  "root",
  "container",
  "title",
  "subtitle",
  "description",
  "primaryButton",
  "secondaryButton",
  "image",
  "badge",
  "animation",
  "header",
  "grid",
  "card",
  "inner",
  "actions",
  "message",
  "cta",
]

export interface SectionEditorProps {
  section: LandingSection
  onChange: (section: LandingSection) => void
  onClose: () => void
}

export function SectionEditor({
  section,
  onChange,
  onClose,
}: SectionEditorProps): React.ReactElement {
  const update = useCallback(
    (
      patch:
        | Partial<LandingSection>
        | ((prev: LandingSection) => LandingSection)
    ) => {
      const next =
        typeof patch === "function" ? patch(section) : { ...section, ...patch }
      onChange(next as LandingSection)
    },
    [section, onChange]
  )

  const s = section as unknown as Record<string, unknown>
  const classes = (s.classes as Record<string, string> | undefined) ?? {}

  const setClass = (key: string, value: string) => {
    const nextClasses = { ...classes }
    if (value.trim() === "") delete nextClasses[key]
    else nextClasses[key] = value
    update({ classes: nextClasses } as Partial<LandingSection>)
  }

  return (
    <div className="border-border bg-card flex h-full flex-col border-l">
      <div className="border-border flex items-center justify-between border-b px-3 py-2">
        <span className="text-foreground text-sm font-semibold">
          Edit — {SECTION_NAMES[section.type] ?? section.type}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded p-1"
        >
          ×
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-4">
          <section>
            <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
              Content
            </h3>
            <div className="space-y-2">
              {section.type === "hero" && (
                <>
                  <LabelInput
                    label="Headline"
                    value={(s.headline as string) ?? ""}
                    onChange={(v) =>
                      update({ headline: v } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Subheadline"
                    value={(s.subheadline as string) ?? ""}
                    onChange={(v) =>
                      update({
                        subheadline: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Badge"
                    value={(s.badge as string) ?? ""}
                    onChange={(v) =>
                      update({
                        badge: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <VariantSelect
                    label="Variant"
                    value={(s.variant as string) ?? "default"}
                    options={[
                      "default",
                      "centered",
                      "split",
                      "minimal",
                      "gradient",
                      "badge",
                      "left",
                      "right-image",
                      "dark",
                      "floating",
                    ]}
                    onChange={(v) =>
                      update({ variant: v } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Primary CTA label"
                    value={(s.primaryCta as { label?: string })?.label ?? ""}
                    onChange={(v) =>
                      update({
                        primaryCta: {
                          ...((s.primaryCta as {
                            label: string
                            href: string
                          }) ?? {
                            label: "",
                            href: "#",
                          }),
                          label: v,
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Primary CTA href"
                    value={(s.primaryCta as { href?: string })?.href ?? ""}
                    onChange={(v) =>
                      update({
                        primaryCta: {
                          ...((s.primaryCta as {
                            label: string
                            href: string
                          }) ?? {
                            label: "",
                            href: "#",
                          }),
                          href: v,
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Secondary CTA label"
                    value={(s.secondaryCta as { label?: string })?.label ?? ""}
                    onChange={(v) =>
                      update({
                        secondaryCta: v
                          ? {
                              ...((s.secondaryCta as {
                                label: string
                                href: string
                              }) ?? {
                                label: "",
                                href: "#",
                              }),
                              label: v,
                            }
                          : undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Secondary CTA href"
                    value={(s.secondaryCta as { href?: string })?.href ?? ""}
                    onChange={(v) =>
                      update({
                        secondaryCta:
                          (s.secondaryCta as
                            | { label: string; href: string }
                            | undefined) && v
                            ? {
                                ...(s.secondaryCta as {
                                  label: string
                                  href: string
                                }),
                                href: v,
                              }
                            : (s.secondaryCta as
                                | { label: string; href: string }
                                | undefined),
                      } as Partial<LandingSection>)
                    }
                  />
                  <ImageUrlInput
                    label="Image URL"
                    value={(s.image as { src?: string })?.src ?? ""}
                    onChange={(v) =>
                      update({
                        image: v
                          ? {
                              src: v,
                              alt: (s.image as { alt?: string })?.alt ?? "Hero",
                            }
                          : undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Image alt"
                    value={(s.image as { alt?: string })?.alt ?? ""}
                    onChange={(v) =>
                      update({
                        image: (s.image as { src: string })?.src
                          ? {
                              src: (s.image as { src: string }).src,
                              alt: v || "Hero",
                            }
                          : undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <p className="text-muted-foreground text-xs font-medium">
                    Background
                  </p>
                  <VariantSelect
                    label="Background type"
                    value={(s.background as { type?: string })?.type ?? "none"}
                    options={[
                      "none",
                      "color",
                      "image",
                      "gradient",
                      "lottie",
                      "video",
                    ]}
                    onChange={(v) => {
                      if (v === "none") {
                        update({
                          background: undefined,
                        } as Partial<LandingSection>)
                        return
                      }
                      const bg =
                        (s.background as {
                          type: string
                          url?: string
                          color?: string
                          gradientCss?: string
                          overlay?: string
                        }) ?? {}
                      const bgType = v as
                        | "color"
                        | "image"
                        | "gradient"
                        | "lottie"
                        | "video"
                      update({
                        background: { ...bg, type: bgType },
                      } as Partial<LandingSection>)
                    }}
                  />
                  {((s.background as { type?: string })?.type ?? "none") !==
                    "none" && (
                    <>
                      {["image", "lottie", "video"].includes(
                        (s.background as { type?: string })?.type ?? ""
                      ) && (
                        <ImageUrlInput
                          label="Background URL"
                          value={(s.background as { url?: string })?.url ?? ""}
                          onChange={(v) =>
                            update({
                              background: {
                                ...(s.background as object),
                                url: v || undefined,
                              },
                            } as Partial<LandingSection>)
                          }
                        />
                      )}
                      {(s.background as { type?: string })?.type ===
                        "color" && (
                        <TailwindClassInput
                          label="Background color (CSS or Tailwind)"
                          defaultKey="background color"
                          value={
                            (s.background as { color?: string })?.color ?? ""
                          }
                          onChange={(v) =>
                            update({
                              background: {
                                ...(s.background as object),
                                color: v || undefined,
                              },
                            } as Partial<LandingSection>)
                          }
                        />
                      )}
                      {(s.background as { type?: string })?.type ===
                        "gradient" && (
                        <LabelInput
                          label="Gradient (CSS)"
                          value={
                            (s.background as { gradientCss?: string })
                              ?.gradientCss ?? ""
                          }
                          placeholder="linear-gradient(to right, #fff, #000)"
                          onChange={(v) =>
                            update({
                              background: {
                                ...(s.background as object),
                                gradientCss: v || undefined,
                              },
                            } as Partial<LandingSection>)
                          }
                        />
                      )}
                      <TailwindClassInput
                        label="Overlay (Tailwind)"
                        defaultKey="overlay"
                        value={
                          (s.background as { overlay?: string })?.overlay ?? ""
                        }
                        placeholder="bg-black/40"
                        onChange={(v) =>
                          update({
                            background: {
                              ...(s.background as object),
                              overlay: v || undefined,
                            },
                          } as Partial<LandingSection>)
                        }
                      />
                    </>
                  )}
                  <LabelInput
                    label="Font family (CSS)"
                    value={(s.fontFamily as string) ?? ""}
                    placeholder="system-ui, sans-serif"
                    onChange={(v) =>
                      update({
                        fontFamily: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {section.type === "nav" && (
                <>
                  <VariantSelect
                    label="Variant"
                    value={(s.variant as string) ?? "default"}
                    options={[
                      "default",
                      "centered",
                      "minimal",
                      "transparent",
                      "sticky",
                      "dark",
                      "bordered",
                    ]}
                    onChange={(v) =>
                      update({ variant: v } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="CTA label"
                    value={(s.cta as { label?: string })?.label ?? ""}
                    onChange={(v) =>
                      update({
                        cta: v
                          ? {
                              ...((s.cta as {
                                label: string
                                href: string
                              }) ?? {
                                label: "",
                                href: "#",
                              }),
                              label: v,
                            }
                          : undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="CTA href"
                    value={(s.cta as { href?: string })?.href ?? ""}
                    onChange={(v) =>
                      update({
                        cta:
                          (s.cta as
                            | { label: string; href: string }
                            | undefined) && v
                            ? {
                                ...(s.cta as { label: string; href: string }),
                                href: v,
                              }
                            : (s.cta as
                                | { label: string; href: string }
                                | undefined),
                      } as Partial<LandingSection>)
                    }
                  />
                  <p className="text-muted-foreground text-xs">
                    Links from Pages are added automatically. Add more links
                    below.
                  </p>
                  <div className="space-y-2">
                    <span className="text-muted-foreground text-xs font-medium">
                      Additional links
                    </span>
                    {(
                      (s as { extraLinks?: { label: string; href: string }[] })
                        .extraLinks ?? []
                    ).map((link, i) => (
                      <div
                        key={i}
                        className="border-border bg-muted/20 flex flex-wrap items-center gap-2 rounded border p-2"
                      >
                        <LabelInput
                          label="Label"
                          value={link.label}
                          onChange={(v) => {
                            const extra =
                              (
                                s as {
                                  extraLinks?: { label: string; href: string }[]
                                }
                              ).extraLinks ?? []
                            const next = [...extra]
                            next[i] = { ...next[i], label: v }
                            update({
                              extraLinks: next,
                            } as Partial<LandingSection>)
                          }}
                        />
                        <LabelInput
                          label="Href"
                          value={link.href}
                          onChange={(v) => {
                            const extra =
                              (
                                s as {
                                  extraLinks?: { label: string; href: string }[]
                                }
                              ).extraLinks ?? []
                            const next = [...extra]
                            next[i] = { ...next[i], href: v }
                            update({
                              extraLinks: next,
                            } as Partial<LandingSection>)
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const extra =
                              (
                                s as {
                                  extraLinks?: { label: string; href: string }[]
                                }
                              ).extraLinks ?? []
                            const next = extra.filter((_, j) => j !== i)
                            update({
                              extraLinks: next.length > 0 ? next : undefined,
                            } as Partial<LandingSection>)
                          }}
                          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded p-1"
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const extra =
                          (
                            s as {
                              extraLinks?: { label: string; href: string }[]
                            }
                          ).extraLinks ?? []
                        update({
                          extraLinks: [
                            ...extra,
                            { label: "New link", href: "#" },
                          ],
                        } as Partial<LandingSection>)
                      }}
                      className="border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 rounded border px-2 py-1 text-xs font-medium"
                    >
                      Add link
                    </button>
                  </div>
                </>
              )}
              {section.type === "features" && (
                <>
                  <LabelInput
                    label="Title"
                    value={(s.title as string) ?? ""}
                    onChange={(v) =>
                      update({
                        title: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Subtitle"
                    value={(s.subtitle as string) ?? ""}
                    onChange={(v) =>
                      update({
                        subtitle: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <VariantSelect
                    label="Variant"
                    value={(s.variant as string) ?? "default"}
                    options={[
                      "default",
                      "cards",
                      "list",
                      "alternating",
                      "bordered",
                    ]}
                    onChange={(v) =>
                      update({ variant: v } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {section.type === "cta" && (
                <>
                  <LabelInput
                    label="Title"
                    value={(s.title as string) ?? ""}
                    onChange={(v) =>
                      update({ title: v } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Subtitle"
                    value={(s.subtitle as string) ?? ""}
                    onChange={(v) =>
                      update({
                        subtitle: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Primary CTA label"
                    value={(s.primaryCta as { label?: string })?.label ?? ""}
                    onChange={(v) =>
                      update({
                        primaryCta: {
                          ...((s.primaryCta as {
                            label: string
                            href: string
                          }) ?? {
                            label: "",
                            href: "#",
                          }),
                          label: v,
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Primary CTA href"
                    value={(s.primaryCta as { href?: string })?.href ?? ""}
                    onChange={(v) =>
                      update({
                        primaryCta: {
                          ...((s.primaryCta as {
                            label: string
                            href: string
                          }) ?? {
                            label: "",
                            href: "#",
                          }),
                          href: v,
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                  <VariantSelect
                    label="Variant"
                    value={(s.variant as string) ?? "default"}
                    options={["default", "banner", "card", "minimal", "dark"]}
                    onChange={(v) =>
                      update({ variant: v } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {section.type === "banner" && (
                <>
                  <LabelInput
                    label="Message"
                    value={(s.message as string) ?? ""}
                    onChange={(v) =>
                      update({ message: v } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="CTA label"
                    value={(s.cta as { label?: string })?.label ?? ""}
                    onChange={(v) =>
                      update({
                        cta: v
                          ? {
                              ...((s.cta as {
                                label: string
                                href: string
                              }) ?? {
                                label: "",
                                href: "#",
                              }),
                              label: v,
                            }
                          : undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="CTA href"
                    value={(s.cta as { href?: string })?.href ?? ""}
                    onChange={(v) =>
                      update({
                        cta:
                          (s.cta as
                            | { label: string; href: string }
                            | undefined) && v
                            ? {
                                ...(s.cta as { label: string; href: string }),
                                href: v,
                              }
                            : (s.cta as
                                | { label: string; href: string }
                                | undefined),
                      } as Partial<LandingSection>)
                    }
                  />
                  <VariantSelect
                    label="Variant"
                    value={(s.variant as string) ?? "default"}
                    options={[
                      "default",
                      "warning",
                      "success",
                      "info",
                      "minimal",
                      "dark",
                    ]}
                    onChange={(v) =>
                      update({ variant: v } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {section.type === "stats" && (
                <>
                  <LabelInput
                    label="Title"
                    value={(s.title as string) ?? ""}
                    onChange={(v) =>
                      update({
                        title: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <VariantSelect
                    label="Variant"
                    value={(s.variant as string) ?? "default"}
                    options={["default", "bordered", "minimal"]}
                    onChange={(v) =>
                      update({ variant: v } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {section.type === "map" && (
                <>
                  <LabelInput
                    label="Title"
                    value={(s.title as string) ?? ""}
                    onChange={(v) =>
                      update({
                        title: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Subtitle"
                    value={(s.subtitle as string) ?? ""}
                    onChange={(v) =>
                      update({
                        subtitle: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Address"
                    value={(s.address as string) ?? ""}
                    onChange={(v) =>
                      update({
                        address: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Map embed URL (iframe src)"
                    value={(s.mapEmbedUrl as string) ?? ""}
                    onChange={(v) =>
                      update({
                        mapEmbedUrl: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Link URL (open in Maps)"
                    value={(s.linkUrl as string) ?? ""}
                    onChange={(v) =>
                      update({
                        linkUrl: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Link label"
                    value={(s.linkLabel as string) ?? ""}
                    onChange={(v) =>
                      update({
                        linkLabel: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {section.type === "blog-grid" && (
                <>
                  <LabelInput
                    label="Title"
                    value={(s.title as string) ?? ""}
                    onChange={(v) =>
                      update({
                        title: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Subtitle"
                    value={(s.subtitle as string) ?? ""}
                    onChange={(v) =>
                      update({
                        subtitle: v || undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  <p className="text-muted-foreground text-xs">
                    Edit items (title, excerpt, href, image, date) in Raw JSON
                    below.
                  </p>
                </>
              )}
              {section.type === "footer" && (
                <>
                  <LabelInput
                    label="Brand name"
                    value={(s.brand as { name?: string })?.name ?? ""}
                    onChange={(v) =>
                      update({
                        brand: {
                          ...((s.brand as { name: string; href?: string }) ?? {
                            name: "",
                            href: "/",
                          }),
                          name: v,
                          href: (s.brand as { href?: string })?.href ?? "/",
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Brand href"
                    value={(s.brand as { href?: string })?.href ?? ""}
                    onChange={(v) =>
                      update({
                        brand: {
                          ...((s.brand as { name: string; href?: string }) ?? {
                            name: "",
                            href: "/",
                          }),
                          href: v || "/",
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                  <LabelInput
                    label="Bottom text"
                    value={(s.bottom as { text?: string })?.text ?? ""}
                    onChange={(v) =>
                      update({
                        bottom: {
                          ...((s.bottom as {
                            text?: string
                            links?: unknown[]
                          }) ?? {}),
                          text: v || undefined,
                        },
                      } as Partial<LandingSection>)
                    }
                  />
                </>
              )}
              {["features", "team", "testimonials", "blog-grid"].includes(
                section.type
              ) && (
                <>
                  <p className="text-muted-foreground mt-2 text-xs font-medium">
                    Data source (API / env)
                  </p>
                  <VariantSelect
                    label="Source"
                    value={
                      (s.dataSource as { type?: string })?.type ?? "static"
                    }
                    options={["static", "api"]}
                    onChange={(v) =>
                      update({
                        dataSource:
                          v === "api"
                            ? {
                                type: "api",
                                apiUrl: (s.dataSource as { apiUrl?: string })
                                  ?.apiUrl,
                                envKey: (s.dataSource as { envKey?: string })
                                  ?.envKey,
                                dataPath: (
                                  s.dataSource as { dataPath?: string }
                                )?.dataPath,
                              }
                            : undefined,
                      } as Partial<LandingSection>)
                    }
                  />
                  {(s.dataSource as { type?: string })?.type === "api" && (
                    <>
                      <LabelInput
                        label="API URL"
                        value={
                          (s.dataSource as { apiUrl?: string })?.apiUrl ?? ""
                        }
                        placeholder="https://api.example.com/items"
                        onChange={(v) =>
                          update({
                            dataSource: {
                              ...(s.dataSource as object),
                              apiUrl: v || undefined,
                            },
                          } as Partial<LandingSection>)
                        }
                      />
                      <LabelInput
                        label="Env key (preferred)"
                        value={
                          (s.dataSource as { envKey?: string })?.envKey ?? ""
                        }
                        placeholder="NEXT_PUBLIC_CMS_URL"
                        onChange={(v) =>
                          update({
                            dataSource: {
                              ...(s.dataSource as object),
                              envKey: v || undefined,
                            },
                          } as Partial<LandingSection>)
                        }
                      />
                      <LabelInput
                        label="Data path (JSON)"
                        value={
                          (s.dataSource as { dataPath?: string })?.dataPath ??
                          ""
                        }
                        placeholder="items or data.posts"
                        onChange={(v) =>
                          update({
                            dataSource: {
                              ...(s.dataSource as object),
                              dataPath: v || undefined,
                            },
                          } as Partial<LandingSection>)
                        }
                      />
                    </>
                  )}
                </>
              )}
              {![
                "hero",
                "nav",
                "features",
                "cta",
                "banner",
                "stats",
                "footer",
                "map",
                "blog-grid",
              ].includes(section.type) && (
                <p className="text-muted-foreground text-xs">
                  Use Tailwind & Animation below or edit JSON. Content fields
                  for this type can be added later.
                </p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
              Tailwind & Animation
            </h3>
            <div className="space-y-2">
              <TailwindClassInput
                label="className (root)"
                defaultKey="className (root)"
                value={(s.className as string) ?? ""}
                placeholder="e.g. py-16 bg-muted/20"
                onChange={(v) =>
                  update({
                    className: v || undefined,
                  } as Partial<LandingSection>)
                }
              />
              {CLASS_KEYS.map((key) => {
                const defaultKey = [
                  "root",
                  "container",
                  "title",
                  "subtitle",
                  "description",
                  "primaryButton",
                  "secondaryButton",
                ].includes(key)
                  ? `classes.${key}`
                  : undefined
                return (
                  <TailwindClassInput
                    key={key}
                    label={
                      key === "animation"
                        ? "animation (Tailwind class)"
                        : `classes.${key}`
                    }
                    defaultKey={defaultKey}
                    value={classes[key] ?? ""}
                    placeholder={
                      key === "animation"
                        ? "e.g. animate-fade-in duration-300"
                        : undefined
                    }
                    onChange={(v) => setClass(key, v)}
                  />
                )
              })}
              <p className="text-muted-foreground text-xs">
                Add more class keys via Raw JSON below. Animation = Tailwind
                animate-* or custom.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-muted-foreground mb-2 text-xs font-semibold uppercase tracking-wider">
              Raw JSON
            </h3>
            <textarea
              className={cn(
                "border-border bg-background w-full rounded border px-2 py-1.5 font-mono text-xs",
                "min-h-[120px] resize-y"
              )}
              value={JSON.stringify(section, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value) as LandingSection
                  if (parsed?.id && parsed?.type) onChange(parsed)
                } catch {
                  // ignore invalid JSON while typing
                }
              }}
              spellCheck={false}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

function LabelInput({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}): React.ReactElement {
  return (
    <div>
      <label className="text-muted-foreground mb-0.5 block text-xs font-medium">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="border-border bg-background w-full rounded border px-2 py-1.5 text-sm"
      />
    </div>
  )
}

function VariantSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}): React.ReactElement {
  return (
    <div>
      <label className="text-muted-foreground mb-0.5 block text-xs font-medium">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-border bg-background w-full rounded border px-2 py-1.5 text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
