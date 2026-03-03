/**
 * Core types for landing page JSON config.
 * Framework-agnostic: describes data structure only.
 */

/** SEO metadata for the page */
export interface SeoConfig {
  title: string
  description: string
  /** Canonical URL */
  canonical?: string
  /** Open Graph */
  og?: {
    title?: string
    description?: string
    image?: string
    type?: string
  }
  /** Twitter Card */
  twitter?: {
    card?: "summary" | "summary_large_image"
    title?: string
    description?: string
    image?: string
  }
  /** JSON-LD structured data (Organization, WebSite, etc.) */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Multi-layer Tailwind: className = root; classes = override per child element.
 * Keys vary by section (e.g. hero: title, subtitle, primaryButton; features: title, card, itemTitle).
 */
export interface SectionClasses {
  root?: string
  container?: string
  title?: string
  subtitle?: string
  description?: string
  primaryButton?: string
  secondaryButton?: string
  image?: string
  badge?: string
  [key: string]: string | undefined
}

/** Base section: id + type + optional className + optional multi-layer classes */
export interface SectionBase {
  id: string
  type: string
  /** Tailwind for section wrapper (single layer). */
  className?: string
  /** Multi-layer Tailwind: override per element (title, subtitle, button, ...). AI/config can send extra keys. */
  classes?: SectionClasses
}

/** Data source for sections with repeat list: static (default) or from API. */
export interface DataSource {
  type: "static" | "api"
  /** API URL (GET). Prefer envKey when set to avoid exposing URL. */
  apiUrl?: string
  /** Env var name (e.g. NEXT_PUBLIC_CMS_URL). App fetches from process.env[envKey] + path or uses apiUrl. */
  envKey?: string
  /** JSON path to array in response (e.g. "data.posts", "items"). Default per section (features → "items"). */
  dataPath?: string
}

/** Background for Hero (and other sections if needed): color, image, gradient, Lottie, video. */
export type HeroBackgroundType =
  | "color"
  | "image"
  | "gradient"
  | "lottie"
  | "video"

export interface HeroBackground {
  type: HeroBackgroundType
  /** Image / Lottie JSON / video URL. */
  url?: string
  /** Background color when type = color (CSS value). */
  color?: string
  /** CSS gradient when type = gradient (e.g. linear-gradient(...)). */
  gradientCss?: string
  /** Overlay class (e.g. bg-black/40) to darken background image. */
  overlay?: string
}

/** Hero variants: ~10 UI options */
export type HeroVariant =
  | "default"
  | "centered"
  | "split"
  | "minimal"
  | "gradient"
  | "badge"
  | "left"
  | "right-image"
  | "dark"
  | "floating"

/** Hero section */
export interface HeroSection extends SectionBase {
  type: "hero"
  headline: string
  subheadline?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image?: { src: string; alt: string }
  badge?: string
  variant?: HeroVariant
  /** Background: color, image, gradient, Lottie, video. */
  background?: HeroBackground
  /** Font (CSS font-family). */
  fontFamily?: string
}

/** Feature item trong features section */
export interface FeatureItem {
  title: string
  description?: string
  icon?: string
  image?: string
}

/** Features variants */
export type FeaturesVariant =
  | "default"
  | "cards"
  | "list"
  | "alternating"
  | "icon-top"
  | "icon-left"
  | "numbered"
  | "bordered"
  | "zigzag"
  | "grid-images"

/** Features section */
export interface FeaturesSection extends SectionBase {
  type: "features"
  title?: string
  subtitle?: string
  items: FeatureItem[]
  columns?: 2 | 3 | 4
  variant?: FeaturesVariant
  /** Data source: static (items in config) or api (fetch, merge into items at runtime). */
  dataSource?: DataSource
}

/** CTA variants */
export type CtaVariant =
  | "default"
  | "banner"
  | "card"
  | "split-image"
  | "minimal"
  | "gradient"
  | "two-column"
  | "floating"
  | "dark"
  | "bordered"

/** CTA section */
export interface CtaSection extends SectionBase {
  type: "cta"
  title: string
  subtitle?: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  image?: { src: string; alt: string }
  variant?: CtaVariant
}

/** Footer link group */
export interface FooterLinkGroup {
  title: string
  links: { label: string; href: string }[]
}

/** Footer variants */
export type FooterVariant =
  | "default"
  | "minimal"
  | "newsletter"
  | "multi-column"
  | "centered"
  | "social"
  | "dark"
  | "bordered"
  | "compact"
  | "simple"

/** Footer section */
export interface FooterSection extends SectionBase {
  type: "footer"
  brand?: { name: string; logo?: string; href?: string }
  linkGroups?: FooterLinkGroup[]
  bottom?: { text?: string; links?: { label: string; href: string }[] }
  variant?: FooterVariant
}

/** Nav variants */
export type NavVariant =
  | "default"
  | "centered"
  | "minimal"
  | "transparent"
  | "sticky"
  | "two-row"
  | "dark"
  | "bordered"
  | "floating"
  | "compact"

/** Nav section (header) */
export interface NavSection extends SectionBase {
  type: "nav"
  logo?: { src: string; alt: string; href?: string }
  links: { label: string; href: string }[]
  /** Extra custom links (shown after links from Pages). */
  extraLinks?: { label: string; href: string }[]
  cta?: { label: string; href: string }
  variant?: NavVariant
}

/** Testimonial item */
export interface TestimonialItem {
  quote: string
  author: string
  role?: string
  avatar?: string
}

/** Testimonials variants */
export type TestimonialsVariant =
  | "default"
  | "carousel"
  | "grid"
  | "featured"
  | "rating"
  | "minimal"
  | "bordered"
  | "alternating"
  | "masonry"
  | "compact"

/** Testimonials section */
export interface TestimonialsSection extends SectionBase {
  type: "testimonials"
  title?: string
  subtitle?: string
  items: TestimonialItem[]
  variant?: TestimonialsVariant
  dataSource?: DataSource
}

/** Pricing tier */
export interface PricingTier {
  name: string
  description?: string
  price: string
  period?: string
  features: string[]
  cta: { label: string; href: string }
  highlighted?: boolean
}

/** Pricing variants */
export type PricingVariant =
  | "default"
  | "cards"
  | "table"
  | "toggle"
  | "minimal"
  | "badge"
  | "featured-center"
  | "horizontal"
  | "compact"
  | "bordered"

/** Pricing section */
export interface PricingSection extends SectionBase {
  type: "pricing"
  title?: string
  subtitle?: string
  tiers: PricingTier[]
  variant?: PricingVariant
}

/** FAQ item */
export interface FaqItem {
  question: string
  answer: string
}

/** FAQ variants */
export type FaqVariant =
  | "default"
  | "accordion"
  | "two-column"
  | "bordered"
  | "minimal"
  | "category"
  | "grid"
  | "compact"
  | "expanded"
  | "cards"

/** FAQ section */
export interface FaqSection extends SectionBase {
  type: "faq"
  title?: string
  subtitle?: string
  items: FaqItem[]
  variant?: FaqVariant
}

/** Stat item for stats section */
export interface StatItem {
  value: string
  label?: string
  suffix?: string
}

/** Stats variants */
export type StatsVariant =
  | "default"
  | "bordered"
  | "minimal"
  | "icons"
  | "gradient"
  | "vertical"
  | "divider"
  | "large"
  | "compact"
  | "split"

/** Stats section (numbers / KPIs) */
export interface StatsSection extends SectionBase {
  type: "stats"
  title?: string
  subtitle?: string
  items: StatItem[]
  columns?: 2 | 3 | 4
  variant?: StatsVariant
}

/** Logo item for logo cloud */
export interface LogoCloudItem {
  src: string
  alt: string
  href?: string
}

/** Logo cloud variants */
export type LogoCloudVariant =
  | "default"
  | "grayscale"
  | "grid"
  | "carousel"
  | "bordered"
  | "dark"
  | "small"
  | "large"
  | "title-bottom"
  | "opacity"

/** Logo cloud section (trusted by / used by) */
export interface LogoCloudSection extends SectionBase {
  type: "logo-cloud"
  title?: string
  items: LogoCloudItem[]
  variant?: LogoCloudVariant
}

/** Team member */
export interface TeamMember {
  name: string
  role?: string
  avatar?: string
  bio?: string
  social?: { type: string; url: string }[]
}

/** Team variants */
export type TeamVariant =
  | "default"
  | "cards"
  | "list"
  | "social-only"
  | "overlay"
  | "minimal"
  | "alternating"
  | "grid-large"
  | "horizontal"
  | "compact"

/** Team section */
export interface TeamSection extends SectionBase {
  type: "team"
  title?: string
  subtitle?: string
  members: TeamMember[]
  columns?: 2 | 3 | 4
  variant?: TeamVariant
  dataSource?: DataSource
}

/** Newsletter variants */
export type NewsletterVariant =
  | "default"
  | "inline"
  | "minimal"
  | "card"
  | "benefits"
  | "split"
  | "bordered"
  | "dark"
  | "compact"
  | "floating"

/** Newsletter section */
export interface NewsletterSection extends SectionBase {
  type: "newsletter"
  title?: string
  subtitle?: string
  placeholder?: string
  submitLabel?: string
  actionUrl?: string
  variant?: NewsletterVariant
}

/** Contact variants */
export type ContactVariant =
  | "default"
  | "split"
  | "minimal"
  | "map-side"
  | "centered"
  | "two-column"
  | "cards"
  | "dark"
  | "compact"
  | "inline"

/** Contact section (info or form) */
export interface ContactSection extends SectionBase {
  type: "contact"
  title?: string
  subtitle?: string
  email?: string
  phone?: string
  address?: string
  formLabels?: {
    name?: string
    email?: string
    message?: string
    submit?: string
  }
  actionUrl?: string
  variant?: ContactVariant
}

/** Gallery image */
export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  href?: string
}

/** Gallery variants */
export type GalleryVariant =
  | "default"
  | "masonry"
  | "carousel"
  | "grid-bordered"
  | "staggered"
  | "full-width"
  | "compact"
  | "dark"
  | "overlay"
  | "list"

/** Gallery section */
export interface GallerySection extends SectionBase {
  type: "gallery"
  title?: string
  subtitle?: string
  images: GalleryImage[]
  columns?: 2 | 3 | 4
  variant?: GalleryVariant
}

/** Banner variants */
export type BannerVariant =
  | "default"
  | "warning"
  | "success"
  | "info"
  | "gradient"
  | "icon"
  | "minimal"
  | "bordered"
  | "dark"
  | "compact"

/** Banner section (announcement / alert) */
export interface BannerSection extends SectionBase {
  type: "banner"
  message: string
  cta?: { label: string; href: string }
  variant?: BannerVariant
  dismissible?: boolean
}

/** Comparison row (feature name + values per plan) */
export interface ComparisonRow {
  feature: string
  values: (string | boolean)[]
}

/** Comparison variants */
export type ComparisonVariant =
  | "default"
  | "table"
  | "cards"
  | "highlighted-row"
  | "checkmarks"
  | "minimal"
  | "compact"
  | "bordered"
  | "striped"
  | "inline"

/** Comparison section (e.g. plan comparison table) */
export interface ComparisonSection extends SectionBase {
  type: "comparison"
  title?: string
  subtitle?: string
  planNames: string[]
  rows: ComparisonRow[]
  highlightColumn?: number
  variant?: ComparisonVariant
}

/** Timeline item */
export interface TimelineItem {
  title: string
  description?: string
  date?: string
  icon?: string
}

/** Timeline variants */
export type TimelineVariant =
  | "default"
  | "vertical"
  | "horizontal"
  | "alternate"
  | "minimal"
  | "connectors"
  | "cards"
  | "compact"
  | "dark"
  | "numbered"

/** Timeline section */
export interface TimelineSection extends SectionBase {
  type: "timeline"
  title?: string
  subtitle?: string
  items: TimelineItem[]
  variant?: TimelineVariant
}

/** Map / Location section: embed map (e.g. Google Maps iframe) + address. */
export type MapVariant = "default" | "split" | "minimal" | "full-width" | "card"

export interface MapSection extends SectionBase {
  type: "map"
  title?: string
  subtitle?: string
  address?: string
  /** iframe src for embedded map (e.g. Google Maps embed URL). */
  mapEmbedUrl?: string
  /** Link to open map in new tab (e.g. Google Maps directions). */
  linkUrl?: string
  linkLabel?: string
  variant?: MapVariant
}

/** Blog / article card (for blog grid section). */
export interface BlogGridItem {
  title: string
  excerpt?: string
  href: string
  image?: { src: string; alt: string }
  date?: string
}

/** BlogGrid variants */
export type BlogGridVariant =
  | "default"
  | "cards"
  | "list"
  | "masonry"
  | "featured"
  | "minimal"
  | "bordered"
  | "compact"

/** Blog grid section: list of articles/posts with image, title, excerpt, link. */
export interface BlogGridSection extends SectionBase {
  type: "blog-grid"
  title?: string
  subtitle?: string
  items: BlogGridItem[]
  columns?: 2 | 3 | 4
  variant?: BlogGridVariant
  dataSource?: DataSource
}

/** Union of all section types */
export type LandingSection =
  | HeroSection
  | FeaturesSection
  | CtaSection
  | FooterSection
  | NavSection
  | TestimonialsSection
  | PricingSection
  | FaqSection
  | StatsSection
  | LogoCloudSection
  | TeamSection
  | NewsletterSection
  | ContactSection
  | GallerySection
  | BannerSection
  | ComparisonSection
  | TimelineSection
  | MapSection
  | BlogGridSection

/** Root config for a landing page */
export interface LandingConfig {
  /** SEO & meta */
  seo: SeoConfig
  /** Sections in render order */
  sections: LandingSection[]
  /** Theme / global (optional, for adapter to map to CSS vars or theme) */
  theme?: {
    primaryColor?: string
    fontFamily?: string
  }
}
