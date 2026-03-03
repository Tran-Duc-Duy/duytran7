"use client"

/**
 * Preview frame for builder: load in iframe with ?v=desktop|tablet|mobile.
 * Receives config via postMessage. Standalone (new tab) uses route /builder/preview/[slug].
 */

import React, { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BuilderPreviewFrame, type PageEntry } from "../_components/BuilderPreviewFrame"

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

export default function BuilderPreviewPage(): React.ReactElement {
  const searchParams = useSearchParams()
  const viewport = parseViewport(searchParams.get("v"))
  const viewportMeta = VIEWPORTS[viewport]
  const [pages, setPages] = useState<PageEntry[]>([])
  const [currentSlug, setCurrentSlug] = useState<string>("/")

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
    const handler = (e: MessageEvent) => {
      const d = e.data
      if (d?.type !== "landing-preview-config") return
      const list = d.pages as PageEntry[] | undefined
      const slug = d.currentSlug as string | undefined
      if (Array.isArray(list) && list.length > 0) {
        setPages(list)
        setCurrentSlug(slug ?? list[0].slug ?? "/")
      }
    }
    window.addEventListener("message", handler)
    return () => window.removeEventListener("message", handler)
  }, [])

  useEffect(() => {
    window.parent?.postMessage?.({ type: "landing-preview-ready" }, "*")
  }, [])

  return (
    <BuilderPreviewFrame
      pages={pages}
      currentSlug={currentSlug}
      setCurrentSlug={setCurrentSlug}
    />
  )
}
