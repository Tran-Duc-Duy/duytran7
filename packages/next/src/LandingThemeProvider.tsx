/**
 * Client provider: sets data-theme and optional font class from config.theme.
 * App should define CSS for [data-theme="..."] and/or pass fontClassName from next/font.
 */

"use client"

import type { LandingThemeConfig } from "@duytran7/landing-core"

export interface LandingThemeProviderProps {
  /** Theme config from LandingConfig.theme (themeId, fontId, or legacy primaryColor/fontFamily). */
  theme?: LandingThemeConfig
  /** Optional class for font (e.g. from next/font). Applied to wrapper. */
  fontClassName?: string
  children: React.ReactNode
}

export function LandingThemeProvider({
  theme,
  fontClassName,
  children,
}: LandingThemeProviderProps) {
  const themeId = theme?.themeId
  const fontId = theme?.fontId
  const legacyFont = theme?.fontFamily
  const legacyColor = theme?.primaryColor

  const dataTheme = themeId ?? undefined
  const fontClass = fontClassName ?? (fontId ? `font-${fontId}` : undefined)
  const style: React.CSSProperties = {}
  if (legacyFont) style.fontFamily = legacyFont
  if (legacyColor && !themeId)
    (style as Record<string, string>)["--primary"] = legacyColor

  return (
    <div
      data-theme={dataTheme}
      data-font-id={fontId ?? undefined}
      className={fontClass}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </div>
  )
}
