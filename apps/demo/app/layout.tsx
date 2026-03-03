import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Landing UI Demo",
  description: "Preview of @duytran7/landing-components and page configs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-background/95 sticky top-0 z-50 border-b px-4 py-2 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/"
              className="text-foreground text-sm font-medium hover:underline"
            >
              Landing demo
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/showcase"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Showcase
              </Link>
              <Link
                href="/builder"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Builder
              </Link>
              <Link
                href="/custom-classes"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Custom classes
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
