"use client"

import dynamic from "next/dynamic"

const LottieInjector = dynamic(
  () =>
    import("@duytran7/landing-components/lottie").then((m) => m.LottieInjector),
  { ssr: false }
)

export function LottieInjectorDynamic() {
  return <LottieInjector />
}
