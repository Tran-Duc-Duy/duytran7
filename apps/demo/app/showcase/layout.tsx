import React from "react"
import Link from "next/link"
import { ShowcaseSidebar } from "./_components/ShowcaseSidebar"

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center gap-6 px-4">
          <Link
            href="/showcase"
            className="flex items-center gap-2 font-semibold text-foreground hover:opacity-80"
          >
            Landing UI
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link
              href="/"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Full landing
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex">
        <ShowcaseSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
