/**
 * SectionRenderer — maps section config (from JSON) to the correct React component.
 */

import type React from "react"
import type { LandingSection } from "@duytran7/landing-core"
import { Hero } from "./Hero"
import { Nav } from "./Nav"
import { Features } from "./Features"
import { Cta } from "./Cta"
import { Footer } from "./Footer"
import { Testimonials } from "./Testimonials"
import { Pricing } from "./Pricing"
import { Faq } from "./Faq"
import { Stats } from "./Stats"
import { LogoCloud } from "./LogoCloud"
import { Team } from "./Team"
import { Newsletter } from "./Newsletter"
import { Contact } from "./Contact"
import { Gallery } from "./Gallery"
import { Banner } from "./Banner"
import { Comparison } from "./Comparison"
import { Timeline } from "./Timeline"
import { Map } from "./Map"
import { BlogGrid } from "./BlogGrid"

function assertNever(section: never): never {
  throw new Error(
    `Unexpected section type: ${String((section as { type?: string }).type)}`
  )
}

export interface SectionRendererProps {
  section: LandingSection
  className?: string
}

export function SectionRenderer({
  section,
  className,
}: SectionRendererProps): React.ReactElement {
  switch (section.type) {
    case "hero":
      return <Hero config={section} className={className} />
    case "nav":
      return <Nav config={section} className={className} />
    case "features":
      return <Features config={section} className={className} />
    case "cta":
      return <Cta config={section} className={className} />
    case "footer":
      return <Footer config={section} className={className} />
    case "testimonials":
      return <Testimonials config={section} className={className} />
    case "pricing":
      return <Pricing config={section} className={className} />
    case "faq":
      return <Faq config={section} className={className} />
    case "stats":
      return <Stats config={section} className={className} />
    case "logo-cloud":
      return <LogoCloud config={section} className={className} />
    case "team":
      return <Team config={section} className={className} />
    case "newsletter":
      return <Newsletter config={section} className={className} />
    case "contact":
      return <Contact config={section} className={className} />
    case "gallery":
      return <Gallery config={section} className={className} />
    case "banner":
      return <Banner config={section} className={className} />
    case "comparison":
      return <Comparison config={section} className={className} />
    case "timeline":
      return <Timeline config={section} className={className} />
    case "map":
      return <Map config={section} className={className} />
    case "blog-grid":
      return <BlogGrid config={section} className={className} />
    default:
      return assertNever(section)
  }
}
