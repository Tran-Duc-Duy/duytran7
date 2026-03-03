"use client"

/**
 * Preview frame: receives pages + currentSlug, handles nav/CTA clicks and renders sections.
 * Applies config.seo (page settings) to document title and meta tags.
 * Shared for iframe (postMessage) and standalone (open in new tab by slug).
 */

import React, { useCallback, useEffect } from "react"
import type { LandingConfig } from "@duytran7/landing-core"
import { SectionRenderer } from "@duytran7/landing-components"

function setMeta(name: string, content: string, attr: "name" | "property" = "name"): void {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function setCanonical(href: string): void {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!el) {
    el = document.createElement("link")
    el.setAttribute("rel", "canonical")
    document.head.appendChild(el)
  }
  el.setAttribute("href", href)
}

export interface PageEntry {
  slug: string
  config: LandingConfig
}

function getPathnameFromHref(href: string): string {
  try {
    if (href.startsWith("/")) return href
    const u = new URL(href)
    return u.pathname
  } catch {
    return href
  }
}

export interface BuilderPreviewFrameProps {
  pages: PageEntry[]
  currentSlug: string
  setCurrentSlug: (slug: string) => void
}

export function BuilderPreviewFrame({
  pages,
  currentSlug,
  setCurrentSlug,
}: BuilderPreviewFrameProps): React.ReactElement {
  const pageSlugs = pages.map((p) => p.slug)
  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.("a")
      if (!a || a.tagName !== "A") return
      const href = a.getAttribute("href")
      if (!href || href.startsWith("#")) return
      const pathname = getPathnameFromHref(href)
      const normalized = pathname.replace(/\/$/, "") || "/"
      const match = pageSlugs.find((s) => (s.replace(/\/$/, "") || "/") === normalized)
      if (match !== undefined) {
        e.preventDefault()
        setCurrentSlug(
          pages.find((p) => (p.slug.replace(/\/$/, "") || "/") === normalized)?.slug ?? match
        )
      }
    },
    [pageSlugs, pages, setCurrentSlug]
  )

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, true)
    return () => document.removeEventListener("click", handleDocumentClick, true)
  }, [handleDocumentClick])

  const config = pages.find((p) => p.slug === currentSlug)?.config ?? pages[0]?.config

  useEffect(() => {
    if (!config?.seo) return
    const s = config.seo
    document.title = s.title ?? ""
    if (s.description) setMeta("description", s.description)
    if (s.canonical) setCanonical(s.canonical)
    if (s.og) {
      if (s.og.title) setMeta("og:title", s.og.title, "property")
      if (s.og.description) setMeta("og:description", s.og.description, "property")
      if (s.og.image) setMeta("og:image", s.og.image, "property")
      if (s.og.type) setMeta("og:type", s.og.type, "property")
    }
    if (s.twitter) {
      if (s.twitter.card) setMeta("twitter:card", s.twitter.card)
      if (s.twitter.title) setMeta("twitter:title", s.twitter.title)
      if (s.twitter.description) setMeta("twitter:description", s.twitter.description)
      if (s.twitter.image) setMeta("twitter:image", s.twitter.image)
    }
  }, [config?.seo])

  if (!config) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-muted/30 p-8 text-center text-muted-foreground">
        <p>Waiting for config from builder…</p>
      </div>
    )
  }

  const sections = config.sections ?? []
  if (sections.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-muted/30 p-8 text-center text-muted-foreground">
        <p>No sections on this page.</p>
      </div>
    )
  }

  return (
    <main id="main-content" role="main" className="min-h-screen">
      {sections.map((section) => (
        <SectionRenderer
          key={section.id}
          section={section}
          className={section.className}
        />
      ))}
    </main>
  )
}
