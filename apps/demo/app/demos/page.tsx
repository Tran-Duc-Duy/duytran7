import React from "react"
import Link from "next/link"
import { DEMO_LIST } from "./_data/demoList"

export const metadata = {
  title: "Landing demos — Landing UI Demo",
  description: "Full landing page demos built from JSON config.",
}

export default function DemosPage(): React.ReactElement {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Landing demos</h1>
      <p className="text-muted-foreground mt-2">
        Full landing pages rendered from JSON. Use the Builder to create your
        own.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {DEMO_LIST.map((demo) => (
          <li key={demo.slug}>
            <Link
              href={`/demos/${demo.slug}`}
              className="border-border bg-card hover:bg-muted/50 block rounded-lg border p-4 transition-colors"
            >
              <span className="font-semibold">{demo.name}</span>
              <p className="text-muted-foreground mt-1 text-sm">
                {demo.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
