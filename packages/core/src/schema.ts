/**
 * Zod schema for LandingConfig — validate JSON config from file or API.
 */

import { z } from "zod"

const seoConfigSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  canonical: z.string().url().optional(),
  og: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().url().optional(),
      type: z.string().optional(),
    })
    .optional(),
  twitter: z
    .object({
      card: z.enum(["summary", "summary_large_image"]).optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().url().optional(),
    })
    .optional(),
  jsonLd: z
    .union([z.record(z.unknown()), z.array(z.record(z.unknown()))])
    .optional(),
})

const sectionAnimationSchema = z
  .object({
    enter: z
      .enum([
        "none",
        "fade",
        "fade-up",
        "fade-down",
        "slide-left",
        "slide-right",
      ])
      .optional(),
    duration: z.number().optional(),
    delay: z.number().optional(),
  })
  .optional()

const sectionEffectsSchema = z
  .object({
    parallax: z.boolean().optional(),
    float: z.boolean().optional(),
    mouseAware: z.boolean().optional(),
  })
  .optional()

const sectionBaseSchema = z.object({
  id: z.string().min(1),
  type: z.string(),
  className: z.string().optional(),
  /** Multi-layer Tailwind: override per element (root, title, subtitle, primaryButton, ...). */
  classes: z.record(z.string(), z.string().optional()).optional(),
  animation: sectionAnimationSchema,
  effects: sectionEffectsSchema,
})

const heroVariants = [
  "default",
  "centered",
  "split",
  "minimal",
  "gradient",
  "badge",
  "left",
  "right-image",
  "dark",
  "floating",
] as const
const heroBackgroundSchema = z.object({
  type: z.enum(["color", "image", "gradient", "lottie", "video"]),
  url: z.string().optional(),
  color: z.string().optional(),
  gradientCss: z.string().optional(),
  overlay: z.string().optional(),
  lottieOptions: z
    .object({ loop: z.boolean().optional(), autoplay: z.boolean().optional() })
    .optional(),
  videoOptions: z
    .object({
      poster: z.string().optional(),
      muted: z.boolean().optional(),
      loop: z.boolean().optional(),
      autoplay: z.boolean().optional(),
    })
    .optional(),
})
const heroSectionSchema = sectionBaseSchema.extend({
  type: z.literal("hero"),
  headline: z.string(),
  subheadline: z.string().optional(),
  primaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
  secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
  image: z.object({ src: z.string(), alt: z.string() }).optional(),
  badge: z.string().optional(),
  variant: z.enum(heroVariants).optional(),
  background: heroBackgroundSchema.optional(),
  fontFamily: z.string().optional(),
})

const featureItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
})

const dataSourceSchema = z.object({
  type: z.enum(["static", "api"]),
  apiUrl: z.string().optional(),
  envKey: z.string().optional(),
  dataPath: z.string().optional(),
})
const featuresVariants = [
  "default",
  "cards",
  "list",
  "alternating",
  "icon-top",
  "icon-left",
  "numbered",
  "bordered",
  "zigzag",
  "grid-images",
] as const
const featuresSectionSchema = sectionBaseSchema.extend({
  type: z.literal("features"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(featureItemSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum(featuresVariants).optional(),
  dataSource: dataSourceSchema.optional(),
})

const ctaVariants = [
  "default",
  "banner",
  "card",
  "split-image",
  "minimal",
  "gradient",
  "two-column",
  "floating",
  "dark",
  "bordered",
] as const
const ctaSectionSchema = sectionBaseSchema.extend({
  type: z.literal("cta"),
  title: z.string(),
  subtitle: z.string().optional(),
  primaryCta: z.object({ label: z.string(), href: z.string() }),
  secondaryCta: z.object({ label: z.string(), href: z.string() }).optional(),
  image: z.object({ src: z.string(), alt: z.string() }).optional(),
  variant: z.enum(ctaVariants).optional(),
})

const footerLinkGroupSchema = z.object({
  title: z.string(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
})

const footerVariants = [
  "default",
  "minimal",
  "newsletter",
  "multi-column",
  "centered",
  "social",
  "dark",
  "bordered",
  "compact",
  "simple",
] as const
const footerSectionSchema = sectionBaseSchema.extend({
  type: z.literal("footer"),
  brand: z
    .object({
      name: z.string(),
      logo: z.string().optional(),
      href: z.string().optional(),
    })
    .optional(),
  linkGroups: z.array(footerLinkGroupSchema).optional(),
  bottom: z
    .object({
      text: z.string().optional(),
      links: z
        .array(z.object({ label: z.string(), href: z.string() }))
        .optional(),
    })
    .optional(),
  variant: z.enum(footerVariants).optional(),
})

const navVariants = [
  "default",
  "centered",
  "minimal",
  "transparent",
  "sticky",
  "two-row",
  "dark",
  "bordered",
  "floating",
  "compact",
] as const
const navMobileSchema = z
  .object({
    menu: z.enum(["hamburger", "dropdown", "inline"]),
    sheetPosition: z.enum(["left", "right"]).optional(),
  })
  .optional()

const navSectionSchema = sectionBaseSchema.extend({
  type: z.literal("nav"),
  logo: z
    .object({
      src: z.string(),
      alt: z.string(),
      href: z.string().optional(),
    })
    .optional(),
  links: z.array(z.object({ label: z.string(), href: z.string() })),
  extraLinks: z
    .array(z.object({ label: z.string(), href: z.string() }))
    .optional(),
  mobile: navMobileSchema,
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
  variant: z.enum(navVariants).optional(),
})

const testimonialItemSchema = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string().optional(),
  avatar: z.string().optional(),
})

const testimonialsVariants = [
  "default",
  "carousel",
  "grid",
  "featured",
  "rating",
  "minimal",
  "bordered",
  "alternating",
  "masonry",
  "compact",
] as const
const testimonialsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("testimonials"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(testimonialItemSchema),
  variant: z.enum(testimonialsVariants).optional(),
  dataSource: dataSourceSchema.optional(),
})

const pricingTierSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.string(),
  period: z.string().optional(),
  features: z.array(z.string()),
  cta: z.object({ label: z.string(), href: z.string() }),
  highlighted: z.boolean().optional(),
})

const pricingVariants = [
  "default",
  "cards",
  "table",
  "toggle",
  "minimal",
  "badge",
  "featured-center",
  "horizontal",
  "compact",
  "bordered",
] as const
const pricingSectionSchema = sectionBaseSchema.extend({
  type: z.literal("pricing"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  tiers: z.array(pricingTierSchema),
  variant: z.enum(pricingVariants).optional(),
})

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const faqVariants = [
  "default",
  "accordion",
  "two-column",
  "bordered",
  "minimal",
  "category",
  "grid",
  "compact",
  "expanded",
  "cards",
] as const
const faqSectionSchema = sectionBaseSchema.extend({
  type: z.literal("faq"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(faqItemSchema),
  variant: z.enum(faqVariants).optional(),
})

const statItemSchema = z.object({
  value: z.string(),
  label: z.string().optional(),
  suffix: z.string().optional(),
})

const statsVariants = [
  "default",
  "bordered",
  "minimal",
  "icons",
  "gradient",
  "vertical",
  "divider",
  "large",
  "compact",
  "split",
] as const
const statsSectionSchema = sectionBaseSchema.extend({
  type: z.literal("stats"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(statItemSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum(statsVariants).optional(),
})

const logoCloudItemSchema = z.object({
  src: z.string(),
  alt: z.string(),
  href: z.string().optional(),
})

const logoCloudVariants = [
  "default",
  "grayscale",
  "grid",
  "carousel",
  "bordered",
  "dark",
  "small",
  "large",
  "title-bottom",
  "opacity",
] as const
const logoCloudSectionSchema = sectionBaseSchema.extend({
  type: z.literal("logo-cloud"),
  title: z.string().optional(),
  items: z.array(logoCloudItemSchema),
  variant: z.enum(logoCloudVariants).optional(),
})

const teamMemberSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
  social: z.array(z.object({ type: z.string(), url: z.string() })).optional(),
})

const teamVariants = [
  "default",
  "cards",
  "list",
  "social-only",
  "overlay",
  "minimal",
  "alternating",
  "grid-large",
  "horizontal",
  "compact",
] as const
const teamSectionSchema = sectionBaseSchema.extend({
  type: z.literal("team"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  members: z.array(teamMemberSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum(teamVariants).optional(),
  dataSource: dataSourceSchema.optional(),
})

const newsletterVariants = [
  "default",
  "inline",
  "minimal",
  "card",
  "benefits",
  "split",
  "bordered",
  "dark",
  "compact",
  "floating",
] as const
const newsletterSectionSchema = sectionBaseSchema.extend({
  type: z.literal("newsletter"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  placeholder: z.string().optional(),
  submitLabel: z.string().optional(),
  actionUrl: z.string().optional(),
  variant: z.enum(newsletterVariants).optional(),
})

const contactVariants = [
  "default",
  "split",
  "minimal",
  "map-side",
  "centered",
  "two-column",
  "cards",
  "dark",
  "compact",
  "inline",
] as const
const contactSectionSchema = sectionBaseSchema.extend({
  type: z.literal("contact"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  formLabels: z
    .object({
      name: z.string().optional(),
      email: z.string().optional(),
      message: z.string().optional(),
      submit: z.string().optional(),
    })
    .optional(),
  actionUrl: z.string().optional(),
  variant: z.enum(contactVariants).optional(),
})

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  href: z.string().optional(),
})

const galleryVariants = [
  "default",
  "masonry",
  "carousel",
  "grid-bordered",
  "staggered",
  "full-width",
  "compact",
  "dark",
  "overlay",
  "list",
] as const
const gallerySectionSchema = sectionBaseSchema.extend({
  type: z.literal("gallery"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(galleryImageSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum(galleryVariants).optional(),
})

const bannerVariants = [
  "default",
  "warning",
  "success",
  "info",
  "gradient",
  "icon",
  "minimal",
  "bordered",
  "dark",
  "compact",
] as const
const bannerSectionSchema = sectionBaseSchema.extend({
  type: z.literal("banner"),
  message: z.string(),
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
  variant: z.enum(bannerVariants).optional(),
  dismissible: z.boolean().optional(),
})

const comparisonRowSchema = z.object({
  feature: z.string(),
  values: z.array(z.union([z.string(), z.boolean()])),
})

const comparisonVariants = [
  "default",
  "table",
  "cards",
  "highlighted-row",
  "checkmarks",
  "minimal",
  "compact",
  "bordered",
  "striped",
  "inline",
] as const
const comparisonSectionSchema = sectionBaseSchema.extend({
  type: z.literal("comparison"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  planNames: z.array(z.string()),
  rows: z.array(comparisonRowSchema),
  highlightColumn: z.number().optional(),
  variant: z.enum(comparisonVariants).optional(),
})

const timelineItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.string().optional(),
  icon: z.string().optional(),
})

const timelineVariants = [
  "default",
  "vertical",
  "horizontal",
  "alternate",
  "minimal",
  "connectors",
  "cards",
  "compact",
  "dark",
  "numbered",
] as const
const timelineSectionSchema = sectionBaseSchema.extend({
  type: z.literal("timeline"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(timelineItemSchema),
  variant: z.enum(timelineVariants).optional(),
})

const mapVariants = [
  "default",
  "split",
  "minimal",
  "full-width",
  "card",
] as const
const mapSectionSchema = sectionBaseSchema.extend({
  type: z.literal("map"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  address: z.string().optional(),
  mapEmbedUrl: z.string().optional(),
  linkUrl: z.string().optional(),
  linkLabel: z.string().optional(),
  variant: z.enum(mapVariants).optional(),
})

const blogGridItemSchema = z.object({
  title: z.string(),
  excerpt: z.string().optional(),
  href: z.string(),
  image: z.object({ src: z.string(), alt: z.string() }).optional(),
  date: z.string().optional(),
})
const blogGridVariants = [
  "default",
  "cards",
  "list",
  "masonry",
  "featured",
  "minimal",
  "bordered",
  "compact",
] as const
const blogGridSectionSchema = sectionBaseSchema.extend({
  type: z.literal("blog-grid"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(blogGridItemSchema),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  variant: z.enum(blogGridVariants).optional(),
  dataSource: dataSourceSchema.optional(),
})

const videoEmbedVariants = [
  "default",
  "centered",
  "bordered",
  "floating",
  "minimal",
] as const
const videoEmbedSectionSchema = sectionBaseSchema.extend({
  type: z.literal("video-embed"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  embedUrl: z.string().url(),
  posterUrl: z.string().url().optional(),
  aspectRatio: z.string().optional(),
  variant: z.enum(videoEmbedVariants).optional(),
})

const countdownVariants = [
  "default",
  "compact",
  "minimal",
  "banner",
  "dark",
] as const
const countdownSectionSchema = sectionBaseSchema.extend({
  type: z.literal("countdown"),
  targetDate: z.string().min(1),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  cta: z.object({ label: z.string(), href: z.string() }).optional(),
  expiredLabel: z.string().optional(),
  variant: z.enum(countdownVariants).optional(),
})

const trustBadgeItemSchema = z.object({
  icon: z.string().optional(),
  label: z.string(),
  href: z.string().optional(),
})
const trustBadgesVariants = [
  "default",
  "inline",
  "grid",
  "minimal",
  "bordered",
  "dark",
] as const
const trustBadgesSectionSchema = sectionBaseSchema.extend({
  type: z.literal("trust-badges"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(trustBadgeItemSchema),
  variant: z.enum(trustBadgesVariants).optional(),
})

const landingSectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  featuresSectionSchema,
  ctaSectionSchema,
  footerSectionSchema,
  navSectionSchema,
  testimonialsSectionSchema,
  pricingSectionSchema,
  faqSectionSchema,
  statsSectionSchema,
  logoCloudSectionSchema,
  teamSectionSchema,
  newsletterSectionSchema,
  contactSectionSchema,
  gallerySectionSchema,
  bannerSectionSchema,
  comparisonSectionSchema,
  timelineSectionSchema,
  mapSectionSchema,
  blogGridSectionSchema,
  videoEmbedSectionSchema,
  countdownSectionSchema,
  trustBadgesSectionSchema,
])

export const landingConfigSchema = z.object({
  seo: seoConfigSchema,
  sections: z.array(landingSectionSchema),
  theme: z
    .object({
      themeId: z.string().optional(),
      fontId: z.string().optional(),
      primaryColor: z.string().optional(),
      fontFamily: z.string().optional(),
    })
    .optional(),
})

export type LandingConfigInput = z.input<typeof landingConfigSchema>
export type LandingConfigOutput = z.output<typeof landingConfigSchema>
