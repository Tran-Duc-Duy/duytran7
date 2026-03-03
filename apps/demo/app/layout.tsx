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
        <header className="sticky top-0 z-50 border-b bg-background/95 px-4 py-2 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link href="/" className="text-sm font-medium text-foreground hover:underline">
              Landing demo
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/showcase"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Showcase
              </Link>
              <Link
                href="/builder"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Builder
              </Link>
              <Link
                href="/custom-classes"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Custom classes
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
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
