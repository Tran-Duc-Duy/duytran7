"use client"

import dynamic from "next/dynamic"

const LottieInjector = dynamic(
  () =>
    import("@duytran7/landing-components/lottie").then((m) => m.LottieInjector),
  { ssr: false }
)

/** Chỉ load Lottie trên client (tránh document is not defined khi SSR). */
export function LottieInjectorDynamic() {
  return <LottieInjector />
}
