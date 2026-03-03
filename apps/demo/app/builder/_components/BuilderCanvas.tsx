"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import type { LandingConfig, LandingSection, SeoConfig } from "@duytran7/landing-core"
import { SectionRenderer, cn } from "@duytran7/landing-components"
import {
  createDefaultSection,
  createNavSectionWithLinks,
  getDefaultSeo,
  SECTION_TYPE_IDS,
} from "../_data/defaultSections"
import {
  createPageFromTemplate,
  createSectionsFromTemplate,
  ROOT_PAGE_TEMPLATES,
  INNER_PAGE_TEMPLATES,
} from "../_data/pageTemplates"
import { SectionEditor } from "./SectionEditor"
import { PageSettingsEditor } from "./PageSettingsEditor"

/** Key prefix localStorage cho preview mở tab mới (shared giữa các tab cùng origin; trùng với preview/[slug]/page). */
const PREVIEW_STORAGE_KEY_PREFIX = "landing-preview-"

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
  map: "Map / Location",
  "blog-grid": "Blog Grid",
  footer: "Footer",
}

const DATA_SECTION_TYPE = "application/x-landing-section-type"
const DATA_REORDER_INDEX = "application/x-landing-reorder-index"

export interface BuilderPage {
  id: string
  name: string
  slug: string
  sections: LandingSection[]
  /** Template id từ pageTemplates (landing, about, pricing, …). */
  pageType?: string
  /** Id trang cha; set thì đây là inner page. */
  parentId?: string | null
  /** Metadata & SEO (title, description, og, twitter, jsonLd). */
  seo?: Partial<SeoConfig>
  /** Theme (primaryColor, fontFamily) — dùng cho CSS vars. */
  theme?: { primaryColor?: string; fontFamily?: string }
}

function uid(): string {
  return `page-${Date.now().toString(36)}`
}

const DEFAULT_PAGE: BuilderPage = {
  id: "home",
  name: "Home",
  slug: "/",
  sections: [],
}

export function BuilderCanvas(): React.ReactElement {
  const [pages, setPages] = useState<BuilderPage[]>([{ ...DEFAULT_PAGE }])
  const [activePageId, setActivePageId] = useState<string>(DEFAULT_PAGE.id)
  const [showPreview, setShowPreview] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [isDropTarget, setIsDropTarget] = useState(false)
  const [showAddPage, setShowAddPage] = useState(false)
  const [showCustomPageForm, setShowCustomPageForm] = useState(false)
  const [addInnerForParentId, setAddInnerForParentId] = useState<string | null>(null)
  const [newPageName, setNewPageName] = useState("")
  const [newPageSlug, setNewPageSlug] = useState("")
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null)
  const [showPageSettings, setShowPageSettings] = useState(false)
  const [previewViewport, setPreviewViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const previewIframeRef = useRef<HTMLIFrameElement>(null)

  const activePage = pages.find((p) => p.id === activePageId) ?? pages[0]
  const sections = activePage.sections

  useEffect(() => {
    setSelectedSectionIndex(null)
  }, [activePageId])

  useEffect(() => {
    if (showPageSettings) setSelectedSectionIndex(null)
  }, [showPageSettings])

  const setPageSections = useCallback(
    (updater: (prev: LandingSection[]) => LandingSection[]) => {
      setPages((prev) =>
        prev.map((p) =>
          p.id === activePageId ? { ...p, sections: updater(p.sections) } : p
        )
      )
    },
    [activePageId]
  )

  const updatePageSettings = useCallback(
    (pageId: string, updates: { seo?: Partial<SeoConfig>; theme?: { primaryColor?: string; fontFamily?: string } }) => {
      setPages((prev) =>
        prev.map((p) =>
          p.id !== pageId
            ? p
            : {
                ...p,
                ...(updates.seo !== undefined && { seo: updates.seo }),
                ...(updates.theme !== undefined && { theme: updates.theme }),
              }
        )
      )
    },
    []
  )

  const updateSectionAt = useCallback(
    (index: number, updated: LandingSection) => {
      setPageSections((prev) =>
        prev.map((s, i) => (i === index ? updated : s))
      )
    },
    [setPageSections]
  )

  const addSection = useCallback(
    (type: string) => {
      const section = createDefaultSection(type)
      if (section) setPageSections((prev) => [...prev, section])
    },
    [setPageSections]
  )

  const addPageFromTemplate = useCallback(
    (templateId: string, parentId?: string | null) => {
      const parent = parentId ? pages.find((p) => p.id === parentId) : null
      const parentSlug = parent?.slug ?? ""
      const data = createPageFromTemplate(templateId, {
        parentSlug: parentSlug || undefined,
        slugSuffix: parent ? undefined : undefined,
      })
      if (!data) return
      const id = uid()
      const sections = createSectionsFromTemplate(data.sectionTypes)
      const newPage: BuilderPage = {
        id,
        name: data.name,
        slug: data.slug,
        sections,
        pageType: templateId,
        parentId: parentId ?? null,
      }
      setPages((prev) => [...prev, newPage])
      setActivePageId(id)
      setShowAddPage(false)
      setShowCustomPageForm(false)
      setAddInnerForParentId(null)
      setShowPreview(false)
    },
    [pages]
  )

  const addPageBlank = useCallback(() => {
    const name = newPageName.trim() || "New Page"
    const slug = newPageSlug.trim() || `/${name.toLowerCase().replace(/\s+/g, "-")}`
    const id = uid()
    setPages((prev) => [
      ...prev,
      { id, name, slug, sections: [], pageType: "blank", parentId: null },
    ])
    setActivePageId(id)
    setNewPageName("")
    setNewPageSlug("")
    setShowAddPage(false)
    setShowCustomPageForm(false)
    setShowPreview(false)
  }, [newPageName, newPageSlug])

  const removePage = useCallback(
    (id: string) => {
      if (pages.length <= 1) return
      const toRemove = new Set<string>([id])
      let changed = true
      while (changed) {
        changed = false
        for (const p of pages) {
          if (p.parentId && toRemove.has(p.parentId) && !toRemove.has(p.id)) {
            toRemove.add(p.id)
            changed = true
          }
        }
      }
      setPages((prev) => prev.filter((p) => !toRemove.has(p.id)))
      if (toRemove.has(activePageId)) {
        const remaining = pages.filter((p) => !toRemove.has(p.id))
        setActivePageId(remaining[0]?.id ?? DEFAULT_PAGE.id)
      }
    },
    [pages, activePageId]
  )

  const removeSection = useCallback(
    (index: number) => {
      setPageSections((prev) => prev.filter((_, i) => i !== index))
      setSelectedSectionIndex((prev) => {
        if (prev === null) return null
        if (prev === index) return null
        return prev > index ? prev - 1 : prev
      })
    },
    [setPageSections]
  )

  const moveSection = useCallback(
    (from: number, to: number) => {
      if (from === to) return
      setPageSections((prev) => {
        const next = [...prev]
        const [item] = next.splice(from, 1)
        next.splice(to, 0, item!)
        return next
      })
      setDragIndex(null)
    },
    [setPageSections]
  )

  const navLinksFromPages = pages.map((p) => ({ label: p.name, href: p.slug }))

  const rootPages = pages.filter((p) => !p.parentId)
  const getChildPages = (parentId: string) =>
    pages.filter((p) => p.parentId === parentId)

  const buildConfigForPage = useCallback(
    (page: BuilderPage, injectNavLinks: boolean): LandingConfig => {
      let sections = [...page.sections]
      if (injectNavLinks) {
        const navIndex = sections.findIndex((s) => s.type === "nav")
        if (navIndex >= 0) {
          const navSection = sections[navIndex]
          if (navSection.type === "nav") {
            const baseLinks =
              navLinksFromPages.length > 0
                ? navLinksFromPages
                : (navSection.links ?? [])
            const extraLinks =
              (navSection as { extraLinks?: { label: string; href: string }[] })
                .extraLinks ?? []
            const mergedLinks = [...baseLinks, ...extraLinks]
            sections = sections.map((s, i) =>
              i === navIndex && s.type === "nav"
                ? { ...s, links: mergedLinks }
                : s
            )
          }
        } else if (pages.length > 1) {
          sections = [createNavSectionWithLinks(navLinksFromPages), ...sections]
        }
      }
      const baseSeo = getDefaultSeo()
      const seo: SeoConfig = {
        title: page.seo?.title ?? `${page.name} — Landing`,
        description: page.seo?.description ?? baseSeo.description,
        canonical: page.seo?.canonical,
        og: page.seo?.og,
        twitter: page.seo?.twitter,
        jsonLd: page.seo?.jsonLd,
      }
      return {
        seo,
        sections,
        theme: page.theme,
      }
    },
    [navLinksFromPages, pages.length]
  )

  const handlePaletteDragStart = (e: React.DragEvent, type: string): void => {
    e.dataTransfer.setData(DATA_SECTION_TYPE, type)
    e.dataTransfer.effectAllowed = "copy"
  }

  const handleCanvasDragStart = (e: React.DragEvent, index: number): void => {
    setDragIndex(index)
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData(DATA_REORDER_INDEX, String(index))
  }

  const handleCanvasDragOver = (e: React.DragEvent, _toIndex: number): void => {
    e.preventDefault()
    setIsDropTarget(true)
    const isReorder = e.dataTransfer.types.includes(DATA_REORDER_INDEX)
    e.dataTransfer.dropEffect = isReorder ? "move" : "copy"
  }

  const handleCanvasDragLeave = (): void => setIsDropTarget(false)

  const handleCanvasDrop = (e: React.DragEvent, dropIndex: number): void => {
    e.preventDefault()
    setIsDropTarget(false)
    const sectionType = e.dataTransfer.getData(DATA_SECTION_TYPE)
    const reorderIndex = e.dataTransfer.getData(DATA_REORDER_INDEX)
    if (sectionType) {
      const section = createDefaultSection(sectionType)
      if (!section) return
      setPageSections((prev) => {
        const next = [...prev]
        next.splice(dropIndex, 0, section)
        return next
      })
      return
    }
    if (reorderIndex !== "") {
      const from = parseInt(reorderIndex, 10)
      if (!Number.isNaN(from)) moveSection(from, dropIndex)
    }
  }

  const handleDropZoneDrop = (e: React.DragEvent): void => {
    e.preventDefault()
    setIsDropTarget(false)
    const sectionType = e.dataTransfer.getData(DATA_SECTION_TYPE)
    if (sectionType) {
      const section = createDefaultSection(sectionType)
      if (section) setPageSections((prev) => [...prev, section])
    }
  }

  const handleExportJson = (): void => {
    const payload = {
      pages: pages.map((p) => ({
        slug: p.slug,
        name: p.name,
        config: buildConfigForPage(p, true),
      })),
    }
    const json = JSON.stringify(payload, null, 2)
    const blob = new Blob([json], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "landing-pages.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyJson = async (): Promise<void> => {
    const payload = {
      pages: pages.map((p) => ({
        slug: p.slug,
        name: p.name,
        config: buildConfigForPage(p, true),
      })),
    }
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2))
  }

  const currentConfig = buildConfigForPage(activePage, true)

  const sendConfigToPreview = useCallback(() => {
    const win = previewIframeRef.current?.contentWindow
    if (!win) return
    const payload = {
      type: "landing-preview-config",
      currentSlug: activePage.slug,
      pages: pages.map((p) => ({
        slug: p.slug,
        config: buildConfigForPage(p, true),
      })),
    }
    win.postMessage(payload, "*")
  }, [activePage.slug, pages, buildConfigForPage])

  useEffect(() => {
    if (!showPreview) return
    sendConfigToPreview()
  }, [showPreview, sendConfigToPreview])

  const handlePreviewIframeLoad = useCallback(() => {
    setTimeout(sendConfigToPreview, 50)
  }, [sendConfigToPreview])

  const handleOpenPreviewInNewTab = useCallback(() => {
    const rawSlug = activePage.slug || pages[0]?.slug || "default"
    const urlSlug =
      rawSlug === "/" || rawSlug === "" ? "home" : rawSlug
    const payload = {
      pages: pages.map((p) => ({
        slug: p.slug,
        config: buildConfigForPage(p, true),
      })),
      currentSlug: activePage.slug,
    }
    try {
      localStorage.setItem(
        `${PREVIEW_STORAGE_KEY_PREFIX}${urlSlug}`,
        JSON.stringify(payload)
      )
      window.open(`/builder/preview/${encodeURIComponent(urlSlug)}?v=desktop`, "_blank", "noopener")
    } catch {
      // localStorage full hoặc popup bị chặn
    }
  }, [activePage.slug, pages, buildConfigForPage])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Page Builder</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPageSettings(true)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
              aria-label="Page settings: metadata, theme, SEO"
            >
              Page settings
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
              aria-label="Preview page"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={handleOpenPreviewInNewTab}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
              aria-label="Open preview in new tab"
            >
              Open in new tab
            </button>
            <button
              type="button"
              onClick={handleCopyJson}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
              aria-label="Copy page JSON to clipboard"
            >
              Copy JSON
            </button>
            <button
              type="button"
              onClick={handleExportJson}
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              aria-label="Export landing pages JSON file"
            >
              Export JSON
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-1 gap-4 overflow-auto p-4">
        <aside className="flex w-56 shrink-0 flex-col gap-6">
          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pages
            </p>
            <div className="flex flex-col gap-1">
              {rootPages.map((root) => (
                <div key={root.id} className="flex flex-col gap-0.5">
                  <div
                    className={cn(
                      "flex items-center justify-between gap-1 rounded-md border px-3 py-2 text-sm",
                      root.id === activePageId
                        ? "border-primary bg-primary/10 font-medium text-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-muted/60"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePageId(root.id)}
                      className="min-w-0 flex-1 truncate text-left"
                      aria-label={`Select page ${root.name}`}
                      aria-current={root.id === activePageId ? "true" : undefined}
                    >
                      {root.name}
                    </button>
                    <div className="flex shrink-0 items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => setAddInnerForParentId(root.id)}
                        className="rounded p-1 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        title="Add inner page"
                        aria-label={`Add inner page under ${root.name}`}
                      >
                        +
                      </button>
                      {pages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePage(root.id)}
                          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          title="Remove page"
                          aria-label={`Remove page ${root.name}`}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                  {getChildPages(root.id).map((child) => (
                    <div
                      key={child.id}
                      className={cn(
                        "ml-4 flex items-center justify-between gap-1 rounded-md border border-l-2 border-border border-l-primary/50 px-3 py-1.5 text-sm",
                        child.id === activePageId
                          ? "border-primary bg-primary/10 font-medium text-foreground"
                          : "bg-muted/30 text-muted-foreground hover:bg-muted/60"
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setActivePageId(child.id)}
                        className="min-w-0 flex-1 truncate text-left"
                        aria-label={`Select page ${child.name}`}
                        aria-current={child.id === activePageId ? "true" : undefined}
                      >
                        {child.name}
                      </button>
                      {pages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePage(child.id)}
                          className="rounded p-1 hover:bg-destructive/10 hover:text-destructive"
                          title="Remove page"
                          aria-label={`Remove page ${child.name}`}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {!showAddPage && addInnerForParentId === null ? (
              <button
                type="button"
                onClick={() => setShowAddPage(true)}
                className="mt-2 w-full rounded-md border border-dashed border-border py-2 text-sm text-muted-foreground hover:bg-muted/60"
              >
                + Add page
              </button>
            ) : addInnerForParentId ? (
              <div className="mt-2 space-y-1 rounded-md border border-border bg-muted/20 p-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Inner page (trang con)
                </p>
                <div className="flex flex-wrap gap-1">
                  {INNER_PAGE_TEMPLATES.filter((t) => t.id !== "blank").map(
                    (t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() =>
                          addPageFromTemplate(t.id, addInnerForParentId)
                        }
                        className="rounded border border-border bg-background px-2 py-1 text-xs hover:bg-muted/80"
                        title={t.description}
                      >
                        {t.name}
                      </button>
                    )
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setAddInnerForParentId(null)}
                  className="text-xs text-muted-foreground underline"
                >
                  Cancel
                </button>
              </div>
            ) : showCustomPageForm ? (
              <div className="mt-2 space-y-2 rounded-md border border-border bg-muted/20 p-2">
                <input
                  type="text"
                  placeholder="Page name"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm"
                />
                <input
                  type="text"
                  placeholder="Slug (e.g. /pricing)"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm"
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={addPageBlank}
                    className="rounded bg-primary px-2 py-1 text-sm text-primary-foreground"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomPageForm(false)
                      setShowAddPage(false)
                    }}
                    className="rounded border border-border px-2 py-1 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-2 space-y-2 rounded-md border border-border bg-muted/20 p-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Chọn loại trang
                </p>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {ROOT_PAGE_TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => addPageFromTemplate(t.id)}
                      className="w-full rounded border border-border bg-background px-2 py-1.5 text-left text-sm hover:bg-muted/80"
                      title={t.description}
                    >
                      <span className="font-medium">{t.name}</span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        {t.slug}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomPageForm(true)}
                  className="w-full rounded border border-dashed border-border py-1.5 text-sm text-muted-foreground hover:bg-muted/60"
                >
                  Trang trống (tùy chỉnh)
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPage(false)}
                  className="w-full text-center text-xs text-muted-foreground underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </section>

          <section>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sections — drag into canvas
            </p>
            <ul className="flex flex-col gap-1">
              {SECTION_TYPE_IDS.map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    draggable
                    onDragStart={(e) => handlePaletteDragStart(e, type)}
                    onClick={() => addSection(type)}
                    className="w-full cursor-grab rounded-md border border-border bg-card px-3 py-2 text-left text-sm font-medium text-foreground active:cursor-grabbing hover:bg-muted/80"
                  >
                    {SECTION_NAMES[type] ?? type}
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Drag into canvas or click to add to current page.
            </p>
          </section>
        </aside>

        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {activePage.name} — drop sections here, drag to reorder
          </p>
          {sections.length === 0 ? (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDropTarget(true)
              }}
              onDragLeave={handleCanvasDragLeave}
              onDrop={handleDropZoneDrop}
              className={cn(
                "rounded-lg border-2 border-dashed py-16 text-center text-sm text-muted-foreground transition-colors",
                isDropTarget ? "border-primary bg-primary/5" : "border-border bg-muted/20"
              )}
            >
              Drop sections here or drag from the left.
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {sections.map((section, index) => (
                <li
                  key={section.id}
                  draggable
                  onDragStart={(e) => handleCanvasDragStart(e, index)}
                  onDragOver={(e) => handleCanvasDragOver(e, index)}
                  onDragLeave={handleCanvasDragLeave}
                  onDrop={(e) => handleCanvasDrop(e, index)}
                  onDragEnd={() => setDragIndex(null)}
                  className={cn(
                    "rounded-lg border border-border bg-card transition-opacity",
                    dragIndex === index && "opacity-50"
                  )}
                >
                  <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3 py-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {SECTION_NAMES[section.type] ?? section.type} — {section.id}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="cursor-grab text-muted-foreground" title="Drag to reorder">
                        ⋮⋮
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowPageSettings(false)
                          setSelectedSectionIndex(index)
                        }}
                        className="rounded px-2 py-0.5 text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        title="Edit content & styles"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        title="Remove"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-border bg-transparent p-2">
                    <SectionRenderer
                      section={currentConfig.sections[index] ?? section}
                      className={(currentConfig.sections[index] ?? section).className}
                    />
                  </div>
                </li>
              ))}
              <li
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDropTarget(true)
                }}
                onDragLeave={handleCanvasDragLeave}
                onDrop={(e) => {
                  e.preventDefault()
                  setIsDropTarget(false)
                  const sectionType = e.dataTransfer.getData(DATA_SECTION_TYPE)
                  if (sectionType) {
                    const section = createDefaultSection(sectionType)
                    if (section) setPageSections((prev) => [...prev, section])
                  }
                }}
                className={cn(
                  "rounded-lg border-2 border-dashed py-6 text-center text-xs text-muted-foreground",
                  isDropTarget ? "border-primary bg-primary/5" : "border-border bg-muted/10"
                )}
              >
                Drop to add at end
              </li>
            </ul>
          )}
        </div>

        {(showPageSettings || (selectedSectionIndex !== null && sections[selectedSectionIndex])) && (
          <div className="flex h-full w-80 shrink-0 flex-col border-l border-border bg-muted/20">
            <div className="min-h-0 flex-1 overflow-y-auto">
              {showPageSettings ? (
                <PageSettingsEditor
                  pageName={activePage.name}
                  seo={activePage.seo ?? {}}
                  theme={activePage.theme ?? {}}
                  onChange={(updates) =>
                    updatePageSettings(activePageId, updates)
                  }
                  onClose={() => setShowPageSettings(false)}
                />
              ) : selectedSectionIndex !== null && sections[selectedSectionIndex] ? (
                <SectionEditor
                  section={sections[selectedSectionIndex]!}
                  onChange={(updated) =>
                    updateSectionAt(selectedSectionIndex, updated)
                  }
                  onClose={() => setSelectedSectionIndex(null)}
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex flex-col bg-muted/50">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2">
            <span className="text-sm font-medium text-foreground">
              Preview — {activePage.name}
            </span>
            <div className="flex items-center gap-1">
              <span className="mr-2 text-xs text-muted-foreground">Viewport:</span>
              {(["desktop", "tablet", "mobile"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setPreviewViewport(v)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 text-sm font-medium capitalize",
                    previewViewport === v
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  )}
                  aria-label={`Preview ${v} viewport`}
                  aria-pressed={previewViewport === v}
                >
                  {v === "desktop" ? "Desktop (1280px)" : v === "tablet" ? "Tablet (768px)" : "Mobile (375px)"}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm hover:bg-muted"
              aria-label="Close preview"
            >
              Close
            </button>
          </div>
          <div className="flex flex-1 items-start justify-center overflow-auto p-4">
            {currentConfig.sections.length === 0 ? (
              <div className="rounded-lg border border-border bg-background p-8 text-muted-foreground">
                No sections on this page.
              </div>
            ) : (
              <div
                className="flex shrink-0 flex-col overflow-hidden rounded-lg border-2 border-border bg-background shadow-lg"
                style={{
                  width:
                    previewViewport === "desktop"
                      ? 1280
                      : previewViewport === "tablet"
                        ? 768
                        : 375,
                  maxWidth: "100%",
                  minHeight: 480,
                }}
              >
                <iframe
                  ref={previewIframeRef}
                  src={`/builder/preview?v=${previewViewport}`}
                  title={`Preview ${activePage.name} — ${previewViewport}`}
                  className="h-full min-h-[480px] w-full flex-1 border-0"
                  onLoad={handlePreviewIframeLoad}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
