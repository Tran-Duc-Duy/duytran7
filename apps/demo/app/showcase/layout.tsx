import React from "react"
import Link from "next/link"
import { ShowcaseSidebar } from "./_components/ShowcaseSidebar"

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <div className="bg-background min-h-screen">
      <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
        <div className="flex h-14 items-center gap-6 px-4">
          <Link
            href="/showcase"
            className="text-foreground flex items-center gap-2 font-semibold hover:opacity-80"
          >
            Landing UI
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Full landing
            </Link>
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-foreground transition-colors"
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
