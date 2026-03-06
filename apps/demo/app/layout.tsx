import type { Metadata } from "next"
import Link from "next/link"
import { LottieInjectorClient } from "./LottieInjectorClient"
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
              href="/builder"
              className="text-foreground text-sm font-medium hover:underline"
            >
              Builder
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/demos"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Demos
              </Link>
              <Link
                href="/showcase"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Showcase
              </Link>
              <Link
                href="/custom-classes"
                className="text-muted-foreground hover:text-foreground text-sm"
              >
                Custom classes
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <LottieInjectorClient />
      </body>
    </html>
  )
}
