/**
 * @duytran7/landing-core — types, schema, parser cho landing page JSON config.
 * Framework-agnostic: works with Next, React, or any runtime.
 */

export type {
  LandingConfig,
  LandingThemeConfig,
  LandingSection,
  SeoConfig,
  SectionBase,
  SectionClasses,
  SectionAnimation,
  SectionEffects,
  SectionEnterAnimation,
  HeroSection,
  HeroVariant,
  HeroBackground,
  HeroBackgroundType,
  HeroLottieOptions,
  HeroVideoOptions,
  DataSource,
  FeaturesSection,
  FeaturesVariant,
  FeatureItem,
  CtaSection,
  CtaVariant,
  FooterSection,
  FooterVariant,
  FooterLinkGroup,
  NavSection,
  NavVariant,
  NavMobileConfig,
  NavMobileMenu,
  TestimonialsSection,
  TestimonialsVariant,
  TestimonialItem,
  PricingSection,
  PricingVariant,
  PricingTier,
  FaqSection,
  FaqVariant,
  FaqItem,
  StatsSection,
  StatsVariant,
  StatItem,
  LogoCloudSection,
  LogoCloudVariant,
  LogoCloudItem,
  TeamSection,
  TeamVariant,
  TeamMember,
  NewsletterSection,
  NewsletterVariant,
  ContactSection,
  ContactVariant,
  GallerySection,
  GalleryVariant,
  GalleryImage,
  BannerSection,
  BannerVariant,
  ComparisonSection,
  ComparisonVariant,
  ComparisonRow,
  TimelineSection,
  TimelineVariant,
  TimelineItem,
  MapSection,
  MapVariant,
  BlogGridSection,
  BlogGridVariant,
  BlogGridItem,
} from "./types"

export { landingConfigSchema } from "./schema"
export type { LandingConfigInput, LandingConfigOutput } from "./schema"

export { parseLandingConfig, parseLandingConfigStrict } from "./parser"
export type {
  ParseLandingConfigResult,
  ParseResult,
  ParseError,
} from "./parser"

export {
  componentRegistry,
  getComponentRegistryJson,
  getComponentRegistryEntry,
} from "./registry"
export type { ComponentRegistryEntry } from "./registry"
