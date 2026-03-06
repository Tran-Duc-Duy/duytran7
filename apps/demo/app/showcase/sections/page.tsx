import React from "react"
import { ShowcaseSectionRenderer } from "../_components/ShowcaseSectionRenderer"
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
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          All sections (long)
        </h1>
        <p className="text-muted-foreground mt-2">
          Every section type with sample variants. Scroll to preview all in one
          page.
        </p>
      </div>
      <div className="space-y-12">
        {items.map(({ label, section }) => (
          <div key={section.id}>
            <h2 className="text-muted-foreground mb-3 text-sm font-semibold uppercase tracking-wider">
              {label}
            </h2>
            <div className="border-border bg-muted/10 rounded-lg border border-dashed p-4">
              <ShowcaseSectionRenderer section={section} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
