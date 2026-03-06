/**
 * Client component: finds all [data-landing-bg="lottie"] and injects LottieBackground player.
 * Add once in layout (client) so Hero (and any) Lottie placeholders get the player.
 */

"use client"

import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { LottieBackground } from "./LottieBackground"

const SELECTOR = '[data-landing-bg="lottie"]'

export function LottieInjector() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(SELECTOR)
    const roots: ReturnType<typeof createRoot>[] = []

    nodes.forEach((el) => {
      const url = el.getAttribute("data-lottie-url")
      if (!url) return

      const loop = el.getAttribute("data-lottie-loop") !== "false"
      const autoplay = el.getAttribute("data-lottie-autoplay") !== "false"

      const root = createRoot(el)
      root.render(
        <LottieBackground
          url={url}
          loop={loop}
          autoplay={autoplay}
          className="h-full w-full"
        />
      )
      roots.push(root)
    })

    return () => {
      roots.forEach((r) => {
        try {
          r.unmount()
        } catch {
          // ignore
        }
      })
    }
  }, [])

  return null
}
