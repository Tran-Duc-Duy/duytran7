import React from "react"
import { SectionRenderer } from "@duytran7/landing-components"
import { getAllShowcaseItems } from "../_data/sections"

export const metadata = {
  title: "All sections — Landing UI Demo",
  description: "Preview every section type and variant on one page",
}

export default function SectionGalleryPage(): React.ReactElement {
  const items = getAllShowcaseItems()

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          All sections (long)
        </h1>
        <p className="mt-2 text-muted-foreground">
          Every section type with sample variants. Scroll to preview all in one page.
        </p>
      </div>
      <div className="space-y-12">
        {items.map(({ label, section }) => (
          <div key={section.id}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </h2>
            <div className="rounded-lg border border-dashed border-border bg-muted/10 p-4">
              <SectionRenderer section={section} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
