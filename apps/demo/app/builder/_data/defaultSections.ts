/**
 * Default section configs when adding from builder. Each add creates a copy with unique id.
 */

import type { LandingSection } from "@duytran7/landing-core"

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}`
}

const defaults: Record<string, () => LandingSection> = {
  hero: () => ({
    id: uid("hero"),
    type: "hero",
    variant: "default",
    headline: "Headline",
    subheadline: "Subheadline text.",
    primaryCta: { label: "Get started", href: "#" },
    secondaryCta: { label: "Learn more", href: "#" },
  }),
  nav: () => ({
    id: uid("nav"),
    type: "nav",
    variant: "default",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
    ],
    cta: { label: "Sign up", href: "#" },
  }),
  features: () => ({
    id: uid("features"),
    type: "features",
    variant: "default",
    title: "Features",
    items: [
      { title: "Feature 1", description: "Description." },
      { title: "Feature 2", description: "Description." },
    ],
    columns: 3,
  }),
  stats: () => ({
    id: uid("stats"),
    type: "stats",
    variant: "default",
    title: "Stats",
    items: [
      { value: "10k+", label: "Users" },
      { value: "99%", label: "Uptime" },
    ],
    columns: 3,
  }),
  "logo-cloud": () => ({
    id: uid("logo-cloud"),
    type: "logo-cloud",
    variant: "default",
    title: "Trusted by",
    items: [
      { src: "https://placehold.co/120x40?text=A", alt: "A" },
      { src: "https://placehold.co/120x40?text=B", alt: "B" },
    ],
  }),
  team: () => ({
    id: uid("team"),
    type: "team",
    variant: "default",
    title: "Team",
    members: [
      { name: "Jane", role: "CEO" },
      { name: "John", role: "CTO" },
    ],
    columns: 2,
  }),
  testimonials: () => ({
    id: uid("testimonials"),
    type: "testimonials",
    variant: "default",
    title: "Testimonials",
    items: [
      { quote: "Great product.", author: "Alice", role: "User" },
    ],
  }),
  pricing: () => ({
    id: uid("pricing"),
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
  }),
  faq: () => ({
    id: uid("faq"),
    type: "faq",
    variant: "default",
    title: "FAQ",
    items: [
      { question: "Question?", answer: "Answer." },
    ],
  }),
  cta: () => ({
    id: uid("cta"),
    type: "cta",
    variant: "default",
    title: "Call to action",
    subtitle: "Optional subtitle.",
    primaryCta: { label: "Submit", href: "#" },
  }),
  newsletter: () => ({
    id: uid("newsletter"),
    type: "newsletter",
    variant: "default",
    title: "Newsletter",
    subtitle: "Subscribe.",
    placeholder: "Email",
    submitLabel: "Subscribe",
    actionUrl: "#",
  }),
  contact: () => ({
    id: uid("contact"),
    type: "contact",
    variant: "default",
    title: "Contact",
    email: "hello@example.com",
    formLabels: { name: "Name", email: "Email", message: "Message", submit: "Send" },
    actionUrl: "#",
  }),
  gallery: () => ({
    id: uid("gallery"),
    type: "gallery",
    variant: "default",
    title: "Gallery",
    images: [
      { src: "https://placehold.co/400x300", alt: "1" },
      { src: "https://placehold.co/400x300", alt: "2" },
    ],
    columns: 3,
  }),
  banner: () => ({
    id: uid("banner"),
    type: "banner",
    variant: "default",
    message: "Announcement message.",
    cta: { label: "Link", href: "#" },
  }),
  comparison: () => ({
    id: uid("comparison"),
    type: "comparison",
    variant: "table",
    title: "Compare",
    planNames: ["Free", "Pro"],
    rows: [
      { feature: "Feature A", values: ["Yes", "Yes"] },
    ],
  }),
  timeline: () => ({
    id: uid("timeline"),
    type: "timeline",
    variant: "vertical",
    title: "Timeline",
    items: [
      { date: "2024", title: "Step 1", description: "Description." },
    ],
  }),
  footer: () => ({
    id: uid("footer"),
    type: "footer",
    variant: "default",
    brand: { name: "Brand", href: "/" },
    linkGroups: [
      { title: "Product", links: [{ label: "Features", href: "#" }] },
      { title: "Company", links: [{ label: "About", href: "#" }] },
    ],
    bottom: { text: "© 2025", links: [{ label: "Privacy", href: "#" }] },
  }),
  map: () => ({
    id: uid("map"),
    type: "map",
    variant: "default",
    title: "Find us",
    address: "123 Main St, City",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.0!2d105.0!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAwJzAwLjAiTiAxMDXCsDAwJzAwLjAiRQ!5e0!3m2!1sen!2s!4v1",
    linkLabel: "Open in Google Maps",
    linkUrl: "https://maps.google.com/",
  }),
  "blog-grid": () => ({
    id: uid("blog-grid"),
    type: "blog-grid",
    variant: "default",
    title: "Latest posts",
    subtitle: "Articles and updates.",
    items: [
      {
        title: "First post",
        excerpt: "Short excerpt for the first article.",
        href: "/blog/1",
        date: "2025-01-15",
      },
      {
        title: "Second post",
        excerpt: "Short excerpt for the second article.",
        href: "/blog/2",
        date: "2025-01-10",
      },
    ],
    columns: 3,
  }),
}

export const SECTION_TYPE_IDS = Object.keys(defaults) as string[]

export function createDefaultSection(type: string): LandingSection | null {
  const fn = defaults[type]
  return fn ? fn() : null
}

export function getDefaultSeo() {
  return {
    title: "Landing Page",
    description: "Built with Landing UI Builder",
  }
}

/** Create a nav section with links (e.g. from builder pages). */
export function createNavSectionWithLinks(links: { label: string; href: string }[]): LandingSection {
  return {
    id: uid("nav"),
    type: "nav",
    variant: "default",
    links,
    cta: { label: "Sign up", href: "#" },
  }
}
