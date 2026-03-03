import React from "react"
import Link from "next/link"
import { SECTION_LIST } from "./_data/sections"

export const metadata = {
  title: "Sections — Landing UI Demo",
  description:
    "Preview all sections and variants from @duytran7/landing-components",
}

export default function ShowcasePage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Sections
        </h1>
        <p className="text-muted-foreground mt-2">
          Here you can find all the sections available in the library. Each
          section has multiple variants you can preview on its detail page.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {SECTION_LIST.map(({ id, name }) => (
          <Link
            key={id}
            href={`/showcase/${id}`}
            className="border-border bg-card text-foreground hover:bg-muted/50 hover:border-foreground/20 flex items-center rounded-lg border px-4 py-3 text-sm font-medium transition-colors"
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  )
}
