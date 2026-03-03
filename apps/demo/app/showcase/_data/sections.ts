/**
 * Showcase data: section list for nav/grid và configs theo từng section type.
 */

import type { LandingSection } from "@duytran7/landing-core"

export interface SectionMeta {
  id: string
  name: string
}

/** Danh sách section dùng cho sidebar và grid (slug = id). */
export const SECTION_LIST: SectionMeta[] = [
  { id: "hero", name: "Hero" },
  { id: "nav", name: "Nav" },
  { id: "features", name: "Features" },
  { id: "stats", name: "Stats" },
  { id: "logo-cloud", name: "Logo Cloud" },
  { id: "team", name: "Team" },
  { id: "testimonials", name: "Testimonials" },
  { id: "pricing", name: "Pricing" },
  { id: "faq", name: "FAQ" },
  { id: "cta", name: "CTA" },
  { id: "newsletter", name: "Newsletter" },
  { id: "contact", name: "Contact" },
  { id: "gallery", name: "Gallery" },
  { id: "banner", name: "Banner" },
  { id: "comparison", name: "Comparison" },
  { id: "timeline", name: "Timeline" },
  { id: "footer", name: "Footer" },
]

export interface ShowcaseItem {
  label: string
  section: LandingSection
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    label: "default",
    section: {
      id: "hero-default",
      type: "hero",
      variant: "default",
      headline: "Hero headline",
      subheadline: "Optional subheadline.",
      primaryCta: { label: "Primary", href: "#" },
      secondaryCta: { label: "Secondary", href: "#" },
    },
  },
  {
    label: "centered",
    section: {
      id: "hero-centered",
      type: "hero",
      variant: "centered",
      headline: "Centered hero",
      subheadline: "Centered layout.",
      primaryCta: { label: "Get started", href: "#" },
    },
  },
  {
    label: "split",
    section: {
      id: "hero-split",
      type: "hero",
      variant: "split",
      headline: "Split hero",
      subheadline: "Text and image side by side.",
      primaryCta: { label: "CTA", href: "#" },
      image: { src: "https://placehold.co/600x400", alt: "Placeholder" },
    },
  },
  {
    label: "minimal",
    section: {
      id: "hero-minimal",
      type: "hero",
      variant: "minimal",
      headline: "Minimal hero",
      subheadline: "Less padding.",
    },
  },
  {
    label: "dark",
    section: {
      id: "hero-dark",
      type: "hero",
      variant: "dark",
      headline: "Dark hero",
      subheadline: "Dark background variant.",
      primaryCta: { label: "Action", href: "#" },
    },
  },
  {
    label: "default",
    section: {
      id: "nav-default",
      type: "nav",
      variant: "default",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "About", href: "#" },
      ],
      cta: { label: "Sign up", href: "#" },
    },
  },
  {
    label: "centered",
    section: {
      id: "nav-centered",
      type: "nav",
      variant: "centered",
      links: [
        { label: "One", href: "#" },
        { label: "Two", href: "#" },
      ],
      cta: { label: "CTA", href: "#" },
    },
  },
  {
    label: "default",
    section: {
      id: "features-default",
      type: "features",
      variant: "default",
      title: "Features",
      items: [
        { title: "Feature A", description: "Description A." },
        { title: "Feature B", description: "Description B." },
        { title: "Feature C", description: "Description C." },
      ],
      columns: 3,
    },
  },
  {
    label: "cards",
    section: {
      id: "features-cards",
      type: "features",
      variant: "cards",
      title: "Features (cards)",
      items: [
        { title: "Card 1", description: "Desc 1." },
        { title: "Card 2", description: "Desc 2." },
      ],
      columns: 2,
    },
  },
  {
    label: "default",
    section: {
      id: "stats-default",
      type: "stats",
      variant: "default",
      title: "Stats",
      items: [
        { value: "10k+", label: "Users" },
        { value: "99%", label: "Uptime" },
        { value: "24/7", label: "Support" },
      ],
      columns: 3,
    },
  },
  {
    label: "bordered",
    section: {
      id: "stats-bordered",
      type: "stats",
      variant: "bordered",
      items: [
        { value: "1k", label: "Projects" },
        { value: "50+", label: "Clients" },
      ],
      columns: 2,
    },
  },
  {
    label: "default",
    section: {
      id: "logo-default",
      type: "logo-cloud",
      variant: "default",
      title: "Trusted by",
      items: [
        { src: "https://placehold.co/120x40?text=A", alt: "A" },
        { src: "https://placehold.co/120x40?text=B", alt: "B" },
        { src: "https://placehold.co/120x40?text=C", alt: "C" },
      ],
    },
  },
  {
    label: "grayscale",
    section: {
      id: "logo-grayscale",
      type: "logo-cloud",
      variant: "grayscale",
      title: "Used by",
      items: [
        { src: "https://placehold.co/100x30?text=X", alt: "X" },
        { src: "https://placehold.co/100x30?text=Y", alt: "Y" },
      ],
    },
  },
  {
    label: "default",
    section: {
      id: "team-default",
      type: "team",
      variant: "default",
      title: "Team",
      members: [
        { name: "Jane Doe", role: "CEO" },
        { name: "John Smith", role: "CTO" },
      ],
      columns: 2,
    },
  },
  {
    label: "cards",
    section: {
      id: "team-cards",
      type: "team",
      variant: "cards",
      title: "Team (cards)",
      members: [
        { name: "Alice", role: "Design", bio: "Lead designer." },
        { name: "Bob", role: "Engineer", bio: "Backend." },
      ],
      columns: 2,
    },
  },
  {
    label: "default",
    section: {
      id: "testimonials-default",
      type: "testimonials",
      variant: "default",
      title: "Testimonials",
      items: [
        { quote: "Great product.", author: "Alice", role: "User" },
        { quote: "Very helpful.", author: "Bob", role: "Customer" },
      ],
    },
  },
  {
    label: "grid",
    section: {
      id: "testimonials-grid",
      type: "testimonials",
      variant: "grid",
      items: [
        { quote: "Quote one.", author: "A" },
        { quote: "Quote two.", author: "B" },
      ],
    },
  },
  {
    label: "default",
    section: {
      id: "pricing-default",
      type: "pricing",
      variant: "default",
      title: "Pricing",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "mo",
          features: ["Feature 1"],
          cta: { label: "Start", href: "#" },
        },
        {
          name: "Pro",
          price: "$29",
          period: "mo",
          features: ["Feature 1", "Feature 2"],
          cta: { label: "Buy", href: "#" },
          highlighted: true,
        },
      ],
    },
  },
  {
    label: "default",
    section: {
      id: "faq-default",
      type: "faq",
      variant: "default",
      title: "FAQ",
      items: [
        { question: "Q1?", answer: "A1." },
        { question: "Q2?", answer: "A2." },
      ],
    },
  },
  {
    label: "default",
    section: {
      id: "cta-default",
      type: "cta",
      variant: "default",
      title: "Call to action",
      subtitle: "Optional subtitle.",
      primaryCta: { label: "Submit", href: "#" },
    },
  },
  {
    label: "banner",
    section: {
      id: "cta-banner",
      type: "cta",
      variant: "banner",
      title: "Banner CTA",
      primaryCta: { label: "Click", href: "#" },
    },
  },
  {
    label: "default",
    section: {
      id: "newsletter-default",
      type: "newsletter",
      variant: "default",
      title: "Newsletter",
      subtitle: "Subscribe.",
      placeholder: "Email",
      submitLabel: "Subscribe",
      actionUrl: "#",
    },
  },
  {
    label: "inline",
    section: {
      id: "newsletter-inline",
      type: "newsletter",
      variant: "inline",
      title: "Stay updated",
      actionUrl: "#",
    },
  },
  {
    label: "default",
    section: {
      id: "contact-default",
      type: "contact",
      variant: "default",
      title: "Contact",
      email: "hello@example.com",
      phone: "+1 234 567 890",
      formLabels: { name: "Name", email: "Email", message: "Message", submit: "Send" },
      actionUrl: "#",
    },
  },
  {
    label: "split",
    section: {
      id: "contact-split",
      type: "contact",
      variant: "split",
      title: "Get in touch",
      email: "hi@example.com",
      address: "123 Street",
      formLabels: { submit: "Send" },
      actionUrl: "#",
    },
  },
  {
    label: "default",
    section: {
      id: "gallery-default",
      type: "gallery",
      variant: "default",
      title: "Gallery",
      images: [
        { src: "https://placehold.co/400x300", alt: "1" },
        { src: "https://placehold.co/400x300", alt: "2" },
        { src: "https://placehold.co/400x300", alt: "3" },
      ],
      columns: 3,
    },
  },
  {
    label: "default",
    section: {
      id: "banner-default",
      type: "banner",
      variant: "default",
      message: "Default banner message.",
      cta: { label: "Link", href: "#" },
    },
  },
  {
    label: "warning",
    section: {
      id: "banner-warning",
      type: "banner",
      variant: "warning",
      message: "Warning style banner.",
    },
  },
  {
    label: "success",
    section: {
      id: "banner-success",
      type: "banner",
      variant: "success",
      message: "Success style banner.",
    },
  },
  {
    label: "table",
    section: {
      id: "comparison-table",
      type: "comparison",
      variant: "table",
      title: "Compare plans",
      planNames: ["Free", "Pro", "Enterprise"],
      highlightColumn: 1,
      rows: [
        { feature: "Feature A", values: ["Yes", "Yes", "Yes"] },
        { feature: "Feature B", values: [false, true, true] },
      ],
    },
  },
  {
    label: "cards",
    section: {
      id: "comparison-cards",
      type: "comparison",
      variant: "cards",
      planNames: ["Basic", "Pro"],
      rows: [
        { feature: "Storage", values: ["5GB", "50GB"] },
        { feature: "Support", values: ["Email", "24/7"] },
      ],
    },
  },
  {
    label: "vertical",
    section: {
      id: "timeline-vertical",
      type: "timeline",
      variant: "vertical",
      title: "Timeline",
      items: [
        { date: "2024", title: "Step 1", description: "First step." },
        { date: "2025", title: "Step 2", description: "Second step." },
      ],
    },
  },
  {
    label: "horizontal",
    section: {
      id: "timeline-horizontal",
      type: "timeline",
      variant: "horizontal",
      items: [
        { date: "Jan", title: "Phase 1" },
        { date: "Feb", title: "Phase 2" },
        { date: "Mar", title: "Phase 3" },
      ],
    },
  },
  {
    label: "default",
    section: {
      id: "footer-default",
      type: "footer",
      variant: "default",
      brand: { name: "Brand", href: "/" },
      linkGroups: [
        { title: "Product", links: [{ label: "Features", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }] },
      ],
      bottom: { text: "© 2025.", links: [{ label: "Privacy", href: "#" }] },
    },
  },
  {
    label: "minimal",
    section: {
      id: "footer-minimal",
      type: "footer",
      variant: "minimal",
      brand: { name: "Minimal", href: "/" },
      bottom: { text: "© 2025" },
    },
  },
]

/** Lấy danh sách showcase items theo section type (slug). */
export function getShowcaseItemsByType(sectionType: string): ShowcaseItem[] {
  return SHOWCASE_ITEMS.filter((item) => item.section.type === sectionType)
}

/** Toàn bộ items (cho trang sections cũ). */
export function getAllShowcaseItems(): ShowcaseItem[] {
  return SHOWCASE_ITEMS.map((item) => ({
    label: `${item.section.type} — ${item.label}`,
    section: item.section,
  }))
}
