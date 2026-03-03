import React from "react"
import { notFound } from "next/navigation"
import { SectionRenderer } from "@duytran7/landing-components"
import {
  SECTION_LIST,
  getShowcaseItemsByType,
} from "../_data/sections"

export function generateStaticParams(): { section: string }[] {
  return SECTION_LIST.map(({ id }) => ({ section: id }))
}

interface PageProps {
  params: Promise<{ section: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { section } = await params
  const meta = SECTION_LIST.find((s) => s.id === section)
  const name = meta?.name ?? section
  return {
    title: `${name} — Landing UI Demo`,
    description: `Preview ${name} section and its variants`,
  }
}

export default async function SectionDetailPage({
  params,
}: PageProps): Promise<React.ReactElement> {
  const { section } = await params
  const meta = SECTION_LIST.find((s) => s.id === section)
  if (!meta) notFound()

  const items = getShowcaseItemsByType(section)
  if (items.length === 0) notFound()

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {meta.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Variants for the {meta.name} section. Copy the config from docs or customize
          for your landing.
        </p>
      </div>
      <div className="space-y-12">
        {items.map(({ label, section: sectionConfig }) => (
          <div key={sectionConfig.id}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {label}
            </h2>
            <div className="rounded-lg border border-dashed border-border bg-muted/10 p-4">
              <SectionRenderer section={sectionConfig} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
