/**
 * Client Lottie player for Hero (or any) background. Used by LottieInjector or directly.
 */

"use client"

import { Player } from "@lottiefiles/react-lottie-player"

export interface LottieBackgroundProps {
  url: string
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export function LottieBackground({
  url,
  loop = true,
  autoplay = true,
  className,
}: LottieBackgroundProps) {
  return (
    <Player
      src={url}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  )
}
