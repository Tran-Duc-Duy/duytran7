"use client"

/**
 * Preview standalone theo slug: mở trong tab mới tại /builder/preview/[slug].
 * Đọc config từ localStorage (key landing-preview-${slug}), shared giữa các tab cùng origin.
 */

import React, { useState, useEffect, use } from "react"
import { useSearchParams } from "next/navigation"
import { BuilderPreviewFrame, type PageEntry } from "../../_components/BuilderPreviewFrame"

export const PREVIEW_STORAGE_KEY_PREFIX = "landing-preview-"

const VIEWPORTS = {
  desktop: { width: 1280, meta: "width=1280" },
  tablet: { width: 768, meta: "width=768" },
  mobile: { width: 375, meta: "width=375" },
} as const

type ViewportKey = keyof typeof VIEWPORTS

function parseViewport(v: string | null): ViewportKey {
  if (v === "tablet" || v === "mobile" || v === "desktop") return v
  return "desktop"
}

interface StoredPayload {
  pages: PageEntry[]
  currentSlug: string
}

export default function BuilderPreviewBySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}): React.ReactElement {
  const { slug } = use(params)
  const searchParams = useSearchParams()
  const viewport = parseViewport(searchParams.get("v"))
  const viewportMeta = VIEWPORTS[viewport]
  const [pages, setPages] = useState<PageEntry[]>([])
  const [currentSlug, setCurrentSlug] = useState<string>("/")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.body.classList.add("builder-preview")
    return () => document.body.classList.remove("builder-preview")
  }, [])

  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]')
    if (!meta) {
      meta = document.createElement("meta")
      meta.setAttribute("name", "viewport")
      document.head.appendChild(meta)
    }
    meta.setAttribute("content", viewportMeta.meta)
  }, [viewportMeta.meta])

  useEffect(() => {
    const decodedSlug = typeof slug === "string" ? decodeURIComponent(slug) : slug
    const key = `${PREVIEW_STORAGE_KEY_PREFIX}${decodedSlug}`
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(key) : null
      if (raw) {
        const data = JSON.parse(raw) as StoredPayload
        if (Array.isArray(data.pages) && data.pages.length > 0) {
          setPages(data.pages)
          setCurrentSlug(data.currentSlug ?? data.pages[0].slug ?? "/")
        }
      }
    } finally {
      setLoaded(true)
    }
  }, [slug])

  if (!loaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-muted/30 p-8 text-center text-muted-foreground">
        <p>Loading preview…</p>
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-muted/30 p-8 text-center text-muted-foreground">
        <p>No preview data for this slug. Open from builder with &quot;Open in new tab&quot;.</p>
      </div>
    )
  }

  return (
    <BuilderPreviewFrame
      pages={pages}
      currentSlug={currentSlug}
      setCurrentSlug={setCurrentSlug}
    />
  )
}
