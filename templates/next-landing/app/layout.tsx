import type { Metadata } from "next"
import Link from "next/link"
import { LottieInjectorDynamic } from "./LottieInjectorDynamic"
import "./globals.css"

export const metadata: Metadata = {
  title: "Landing",
  description: "Landing pages from JSON config — edit in Builder",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-background/95 sticky top-0 z-50 border-b px-4 py-2 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/"
              className="text-foreground text-sm font-medium hover:underline"
            >
              Home
            </Link>
            <Link
              href="/builder"
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              Builder
            </Link>
          </div>
        </header>
        {children}
        <LottieInjectorDynamic />
      </body>
    </html>
  )
}
