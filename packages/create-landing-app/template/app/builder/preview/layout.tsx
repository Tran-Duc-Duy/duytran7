/**
 * Layout for builder preview iframe — no extra chrome; header hidden via CSS (body.builder-preview).
 * Suspense required for useSearchParams() in page.
 */

import { Suspense } from "react"

export default function BuilderPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground p-8 text-center">Loading…</div>
      }
    >
      {children}
    </Suspense>
  )
}
