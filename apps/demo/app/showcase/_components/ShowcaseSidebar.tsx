"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SECTION_LIST } from "../_data/sections"
import { cn } from "@duytran7/landing-components"

export function ShowcaseSidebar(): React.ReactElement {
  const pathname = usePathname()

  return (
    <aside className="w-56 shrink-0 border-r border-border">
      <nav className="sticky top-14 flex flex-col gap-6 overflow-y-auto py-6 pl-4 pr-2">
        <div className="flex flex-col gap-1">
          <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Getting started
          </p>
          <Link
            href="/showcase"
            className={cn(
              "rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              pathname === "/showcase"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            Introduction
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sections
          </p>
          {SECTION_LIST.map(({ id, name }) => {
            const href = `/showcase/${id}`
            const isActive = pathname === href
            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                {name}
              </Link>
            )
          })}
        </div>
        <div className="flex flex-col gap-1">
          <Link
            href="/showcase/sections"
            className={cn(
              "rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
              pathname === "/showcase/sections"
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
            )}
          >
            All sections (long)
          </Link>
        </div>
      </nav>
    </aside>
  )
}
