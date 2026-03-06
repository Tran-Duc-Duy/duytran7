/**
 * Client wrapper for SectionRenderer so sections that use hooks (e.g. Countdown) work.
 */

"use client"

import type { LandingSection } from "@duytran7/landing-core"
import { SectionRenderer } from "@duytran7/landing-components"

export interface ShowcaseSectionRendererProps {
  section: LandingSection
}

export function ShowcaseSectionRenderer({
  section,
}: ShowcaseSectionRendererProps) {
  return <SectionRenderer section={section} />
}
