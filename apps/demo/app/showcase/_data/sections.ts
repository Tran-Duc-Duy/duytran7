/**
 * Showcase data: section list for nav/grid and configs per section type.
 */

import type { LandingSection } from "@duytran7/landing-core"

export interface SectionMeta {
  id: string
  name: string
}

/** Section list for sidebar and grid (slug = id). */
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
  // ——— Hero (10 variants) ———
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
      subheadline: "Single column, centered layout.",
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
      primaryCta: { label: "Learn more", href: "#" },
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
      subheadline: "Reduced padding, clean look.",
    },
  },
  {
    label: "gradient",
    section: {
      id: "hero-gradient",
      type: "hero",
      variant: "gradient",
      headline: "Gradient hero",
      subheadline: "Background gradient variant.",
      primaryCta: { label: "Start", href: "#" },
      classes: { root: "bg-gradient-to-br from-primary/20 to-primary/5" },
    },
  },
  {
    label: "badge",
    section: {
      id: "hero-badge",
      type: "hero",
      variant: "badge",
      headline: "New release",
      subheadline: "With optional badge above.",
      badge: "Just launched",
      primaryCta: { label: "Try it", href: "#" },
    },
  },
  {
    label: "left",
    section: {
      id: "hero-left",
      type: "hero",
      variant: "left",
      headline: "Left-aligned hero",
      subheadline: "Content on the left.",
      primaryCta: { label: "CTA", href: "#" },
    },
  },
  {
    label: "right-image",
    section: {
      id: "hero-right-image",
      type: "hero",
      variant: "right-image",
      headline: "Hero with image right",
      subheadline: "Image on the right side.",
      primaryCta: { label: "Go", href: "#" },
      image: { src: "https://placehold.co/500x350", alt: "Visual" },
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
    label: "floating",
    section: {
      id: "hero-floating",
      type: "hero",
      variant: "floating",
      headline: "Floating hero",
      subheadline: "Floating card style.",
      primaryCta: { label: "Submit", href: "#" },
    },
  },
  // ——— Nav (8 variants) ———
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
    label: "minimal",
    section: {
      id: "nav-minimal",
      type: "nav",
      variant: "minimal",
      links: [
        { label: "Work", href: "#" },
        { label: "Contact", href: "#" },
      ],
      cta: { label: "Start", href: "#" },
    },
  },
  {
    label: "transparent",
    section: {
      id: "nav-transparent",
      type: "nav",
      variant: "transparent",
      links: [
        { label: "Home", href: "#" },
        { label: "Blog", href: "#" },
      ],
      cta: { label: "Login", href: "#" },
    },
  },
  {
    label: "dark",
    section: {
      id: "nav-dark",
      type: "nav",
      variant: "dark",
      links: [
        { label: "Product", href: "#" },
        { label: "Docs", href: "#" },
      ],
      cta: { label: "Get started", href: "#" },
    },
  },
  {
    label: "bordered",
    section: {
      id: "nav-bordered",
      type: "nav",
      variant: "bordered",
      links: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
      ],
      cta: { label: "Sign in", href: "#" },
    },
  },
  {
    label: "floating",
    section: {
      id: "nav-floating",
      type: "nav",
      variant: "floating",
      links: [
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
      ],
      cta: { label: "Book", href: "#" },
    },
  },
  {
    label: "compact",
    section: {
      id: "nav-compact",
      type: "nav",
      variant: "compact",
      links: [
        { label: "Docs", href: "#" },
        { label: "Changelog", href: "#" },
      ],
      cta: { label: "Try free", href: "#" },
    },
  },
  // ——— Features (8 variants) ———
  {
    label: "default",
    section: {
      id: "features-default",
      type: "features",
      variant: "default",
      title: "Features",
      subtitle: "Default list layout.",
      items: [
        { title: "Feature A", description: "First feature description." },
        { title: "Feature B", description: "Second feature." },
        { title: "Feature C", description: "Third." },
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
        { title: "Card 1", description: "Card description one." },
        { title: "Card 2", description: "Card two." },
        { title: "Card 3", description: "Card three." },
      ],
      columns: 3,
    },
  },
  {
    label: "list",
    section: {
      id: "features-list",
      type: "features",
      variant: "list",
      title: "Features list",
      items: [
        { title: "Item one", description: "Description." },
        { title: "Item two", description: "Description." },
      ],
      columns: 2,
    },
  },
  {
    label: "alternating",
    section: {
      id: "features-alternating",
      type: "features",
      variant: "alternating",
      title: "Alternating",
      items: [
        { title: "Block A", description: "Text here." },
        { title: "Block B", description: "Text here." },
      ],
      columns: 2,
    },
  },
  {
    label: "icon-top",
    section: {
      id: "features-icon-top",
      type: "features",
      variant: "icon-top",
      title: "Icon top",
      items: [
        { title: "First", description: "With icon.", icon: "★" },
        { title: "Second", description: "With icon.", icon: "◆" },
      ],
      columns: 2,
    },
  },
  {
    label: "numbered",
    section: {
      id: "features-numbered",
      type: "features",
      variant: "numbered",
      title: "Numbered steps",
      items: [
        { title: "Step one", description: "Do this first." },
        { title: "Step two", description: "Then this." },
      ],
      columns: 2,
    },
  },
  {
    label: "bordered",
    section: {
      id: "features-bordered",
      type: "features",
      variant: "bordered",
      title: "Bordered cards",
      items: [
        { title: "Bordered A", description: "Desc." },
        { title: "Bordered B", description: "Desc." },
      ],
      columns: 2,
    },
  },
  {
    label: "zigzag",
    section: {
      id: "features-zigzag",
      type: "features",
      variant: "zigzag",
      title: "Zigzag layout",
      items: [
        { title: "Left", description: "Content." },
        { title: "Right", description: "Content." },
      ],
      columns: 2,
    },
  },
  // ——— Stats (6 variants) ———
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
      title: "Bordered stats",
      items: [
        { value: "1k", label: "Projects" },
        { value: "50+", label: "Clients" },
      ],
      columns: 2,
    },
  },
  {
    label: "minimal",
    section: {
      id: "stats-minimal",
      type: "stats",
      variant: "minimal",
      items: [
        { value: "100", label: "Items" },
        { value: "5", label: "Years" },
      ],
      columns: 2,
    },
  },
  {
    label: "icons",
    section: {
      id: "stats-icons",
      type: "stats",
      variant: "icons",
      title: "With icons",
      items: [
        { value: "Fast", label: "Speed" },
        { value: "Secure", label: "Security" },
      ],
      columns: 2,
    },
  },
  {
    label: "gradient",
    section: {
      id: "stats-gradient",
      type: "stats",
      variant: "gradient",
      title: "Gradient stats",
      items: [
        { value: "99%", label: "Satisfaction" },
        { value: "10x", label: "Growth" },
      ],
      columns: 2,
    },
  },
  {
    label: "vertical",
    section: {
      id: "stats-vertical",
      type: "stats",
      variant: "vertical",
      items: [
        { value: "A", label: "Metric A" },
        { value: "B", label: "Metric B" },
      ],
      columns: 2,
    },
  },
  // ——— Logo cloud (5 variants) ———
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
    label: "grid",
    section: {
      id: "logo-grid",
      type: "logo-cloud",
      variant: "grid",
      title: "Partners",
      items: [
        { src: "https://placehold.co/80x28?text=1", alt: "1" },
        { src: "https://placehold.co/80x28?text=2", alt: "2" },
        { src: "https://placehold.co/80x28?text=3", alt: "3" },
        { src: "https://placehold.co/80x28?text=4", alt: "4" },
      ],
    },
  },
  {
    label: "bordered",
    section: {
      id: "logo-bordered",
      type: "logo-cloud",
      variant: "bordered",
      title: "Clients",
      items: [
        { src: "https://placehold.co/90x30?text=P", alt: "P" },
        { src: "https://placehold.co/90x30?text=Q", alt: "Q" },
      ],
    },
  },
  {
    label: "dark",
    section: {
      id: "logo-dark",
      type: "logo-cloud",
      variant: "dark",
      title: "Backed by",
      items: [{ src: "https://placehold.co/100x32?text=Dark", alt: "D" }],
    },
  },
  // ——— Team (5 variants) ———
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
    label: "list",
    section: {
      id: "team-list",
      type: "team",
      variant: "list",
      title: "Team list",
      members: [
        { name: "Alex", role: "Lead" },
        { name: "Sam", role: "Dev" },
      ],
      columns: 2,
    },
  },
  {
    label: "minimal",
    section: {
      id: "team-minimal",
      type: "team",
      variant: "minimal",
      title: "Minimal team",
      members: [{ name: "Jordan", role: "Founder" }],
      columns: 2,
    },
  },
  {
    label: "alternating",
    section: {
      id: "team-alternating",
      type: "team",
      variant: "alternating",
      title: "Alternating team",
      members: [
        { name: "Casey", role: "Design" },
        { name: "Morgan", role: "Eng" },
      ],
      columns: 2,
    },
  },
  // ——— Testimonials (6 variants) ———
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
      title: "Grid",
      items: [
        { quote: "Quote one.", author: "A" },
        { quote: "Quote two.", author: "B" },
      ],
    },
  },
  {
    label: "featured",
    section: {
      id: "testimonials-featured",
      type: "testimonials",
      variant: "featured",
      title: "Featured",
      items: [
        {
          quote: "This is the main testimonial.",
          author: "Lead User",
          role: "CEO",
        },
      ],
    },
  },
  {
    label: "rating",
    section: {
      id: "testimonials-rating",
      type: "testimonials",
      variant: "rating",
      title: "With rating",
      items: [{ quote: "Five stars.", author: "Happy", role: "User" }],
    },
  },
  {
    label: "minimal",
    section: {
      id: "testimonials-minimal",
      type: "testimonials",
      variant: "minimal",
      items: [{ quote: "Short and minimal.", author: "M" }],
    },
  },
  {
    label: "bordered",
    section: {
      id: "testimonials-bordered",
      type: "testimonials",
      variant: "bordered",
      title: "Bordered",
      items: [
        { quote: "Bordered quote.", author: "X" },
        { quote: "Another.", author: "Y" },
      ],
    },
  },
  // ——— Pricing (5 variants) ———
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
    label: "cards",
    section: {
      id: "pricing-cards",
      type: "pricing",
      variant: "cards",
      title: "Pricing cards",
      tiers: [
        {
          name: "Basic",
          price: "$9",
          period: "mo",
          features: ["One"],
          cta: { label: "Get", href: "#" },
        },
        {
          name: "Pro",
          price: "$19",
          period: "mo",
          features: ["One", "Two"],
          cta: { label: "Get", href: "#" },
        },
      ],
    },
  },
  {
    label: "table",
    section: {
      id: "pricing-table",
      type: "pricing",
      variant: "table",
      title: "Pricing table",
      tiers: [
        {
          name: "Starter",
          price: "$0",
          features: ["A"],
          cta: { label: "Start", href: "#" },
        },
      ],
    },
  },
  {
    label: "minimal",
    section: {
      id: "pricing-minimal",
      type: "pricing",
      variant: "minimal",
      title: "Minimal pricing",
      tiers: [
        {
          name: "Single",
          price: "$49",
          period: "mo",
          features: ["All-in-one"],
          cta: { label: "Choose", href: "#" },
        },
      ],
    },
  },
  {
    label: "bordered",
    section: {
      id: "pricing-bordered",
      type: "pricing",
      variant: "bordered",
      title: "Bordered tiers",
      tiers: [
        {
          name: "Plan",
          price: "$99",
          period: "yr",
          features: ["Full"],
          cta: { label: "Buy", href: "#" },
        },
      ],
    },
  },
  // ——— FAQ (5 variants) ———
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
    label: "accordion",
    section: {
      id: "faq-accordion",
      type: "faq",
      variant: "accordion",
      title: "FAQ accordion",
      items: [
        { question: "First question?", answer: "First answer." },
        { question: "Second?", answer: "Second answer." },
      ],
    },
  },
  {
    label: "two-column",
    section: {
      id: "faq-two-column",
      type: "faq",
      variant: "two-column",
      title: "FAQ two column",
      items: [
        { question: "Left?", answer: "Left." },
        { question: "Right?", answer: "Right." },
      ],
    },
  },
  {
    label: "bordered",
    section: {
      id: "faq-bordered",
      type: "faq",
      variant: "bordered",
      title: "FAQ bordered",
      items: [{ question: "Bordered Q?", answer: "Bordered A." }],
    },
  },
  {
    label: "minimal",
    section: {
      id: "faq-minimal",
      type: "faq",
      variant: "minimal",
      title: "FAQ minimal",
      items: [{ question: "Minimal?", answer: "Yes." }],
    },
  },
  // ——— CTA (6 variants) ———
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
    label: "card",
    section: {
      id: "cta-card",
      type: "cta",
      variant: "card",
      title: "Card CTA",
      subtitle: "Inside a card.",
      primaryCta: { label: "Action", href: "#" },
    },
  },
  {
    label: "minimal",
    section: {
      id: "cta-minimal",
      type: "cta",
      variant: "minimal",
      title: "Minimal CTA",
      primaryCta: { label: "Go", href: "#" },
    },
  },
  {
    label: "gradient",
    section: {
      id: "cta-gradient",
      type: "cta",
      variant: "gradient",
      title: "Gradient CTA",
      primaryCta: { label: "Start", href: "#" },
    },
  },
  {
    label: "dark",
    section: {
      id: "cta-dark",
      type: "cta",
      variant: "dark",
      title: "Dark CTA",
      primaryCta: { label: "Submit", href: "#" },
    },
  },
  // ——— Newsletter (4 variants) ———
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
    label: "minimal",
    section: {
      id: "newsletter-minimal",
      type: "newsletter",
      variant: "minimal",
      title: "Minimal signup",
      actionUrl: "#",
    },
  },
  {
    label: "card",
    section: {
      id: "newsletter-card",
      type: "newsletter",
      variant: "card",
      title: "Newsletter card",
      actionUrl: "#",
    },
  },
  // ——— Contact (4 variants) ———
  {
    label: "default",
    section: {
      id: "contact-default",
      type: "contact",
      variant: "default",
      title: "Contact",
      email: "hello@example.com",
      phone: "+1 234 567 890",
      formLabels: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send",
      },
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
    label: "minimal",
    section: {
      id: "contact-minimal",
      type: "contact",
      variant: "minimal",
      title: "Contact minimal",
      email: "mail@example.com",
      formLabels: { submit: "Send" },
      actionUrl: "#",
    },
  },
  {
    label: "centered",
    section: {
      id: "contact-centered",
      type: "contact",
      variant: "centered",
      title: "Contact us",
      email: "info@example.com",
      actionUrl: "#",
    },
  },
  // ——— Gallery (4 variants) ———
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
    label: "masonry",
    section: {
      id: "gallery-masonry",
      type: "gallery",
      variant: "masonry",
      title: "Masonry",
      images: [
        { src: "https://placehold.co/300x400", alt: "A" },
        { src: "https://placehold.co/400x200", alt: "B" },
        { src: "https://placehold.co/350x350", alt: "C" },
      ],
      columns: 3,
    },
  },
  {
    label: "grid-bordered",
    section: {
      id: "gallery-bordered",
      type: "gallery",
      variant: "grid-bordered",
      title: "Bordered grid",
      images: [
        { src: "https://placehold.co/350x250", alt: "1" },
        { src: "https://placehold.co/350x250", alt: "2" },
      ],
      columns: 2,
    },
  },
  {
    label: "staggered",
    section: {
      id: "gallery-staggered",
      type: "gallery",
      variant: "staggered",
      title: "Staggered",
      images: [
        { src: "https://placehold.co/400x300", alt: "X" },
        { src: "https://placehold.co/400x300", alt: "Y" },
      ],
      columns: 2,
    },
  },
  // ——— Banner (5 variants) ———
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
    label: "info",
    section: {
      id: "banner-info",
      type: "banner",
      variant: "info",
      message: "Info style banner.",
      cta: { label: "Learn more", href: "#" },
    },
  },
  {
    label: "gradient",
    section: {
      id: "banner-gradient",
      type: "banner",
      variant: "gradient",
      message: "Gradient banner.",
      cta: { label: "Action", href: "#" },
    },
  },
  // ——— Comparison (5 variants) ———
  {
    label: "default",
    section: {
      id: "comparison-default",
      type: "comparison",
      variant: "default",
      title: "Compare",
      planNames: ["Free", "Pro"],
      rows: [
        { feature: "Feature A", values: ["Yes", "Yes"] },
        { feature: "Feature B", values: [false, true] },
      ],
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
    label: "checkmarks",
    section: {
      id: "comparison-checkmarks",
      type: "comparison",
      variant: "checkmarks",
      planNames: ["Starter", "Growth"],
      rows: [
        { feature: "Reports", values: [true, true] },
        { feature: "API", values: [false, true] },
      ],
    },
  },
  {
    label: "bordered",
    section: {
      id: "comparison-bordered",
      type: "comparison",
      variant: "bordered",
      title: "Bordered comparison",
      planNames: ["A", "B"],
      rows: [{ feature: "Item", values: ["1", "2"] }],
    },
  },
  // ——— Timeline (5 variants) ———
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
    label: "alternate",
    section: {
      id: "timeline-alternate",
      type: "timeline",
      variant: "alternate",
      title: "Alternate timeline",
      items: [
        { title: "Event A", description: "Desc." },
        { title: "Event B", description: "Desc." },
      ],
    },
  },
  {
    label: "minimal",
    section: {
      id: "timeline-minimal",
      type: "timeline",
      variant: "minimal",
      title: "Minimal timeline",
      items: [{ date: "Q1", title: "Milestone" }],
    },
  },
  {
    label: "cards",
    section: {
      id: "timeline-cards",
      type: "timeline",
      variant: "cards",
      title: "Timeline cards",
      items: [{ date: "2024", title: "Launch", description: "We launched." }],
    },
  },
  // ——— Footer (6 variants) ———
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
  {
    label: "multi-column",
    section: {
      id: "footer-multi",
      type: "footer",
      variant: "multi-column",
      brand: { name: "Site", href: "/" },
      linkGroups: [
        {
          title: "Links",
          links: [
            { label: "One", href: "#" },
            { label: "Two", href: "#" },
          ],
        },
      ],
      bottom: { text: "© 2025" },
    },
  },
  {
    label: "dark",
    section: {
      id: "footer-dark",
      type: "footer",
      variant: "dark",
      brand: { name: "Dark", href: "/" },
      linkGroups: [{ title: "Nav", links: [{ label: "Home", href: "#" }] }],
      bottom: { text: "© 2025" },
    },
  },
  {
    label: "bordered",
    section: {
      id: "footer-bordered",
      type: "footer",
      variant: "bordered",
      brand: { name: "Bordered", href: "/" },
      bottom: { text: "© 2025" },
    },
  },
  {
    label: "centered",
    section: {
      id: "footer-centered",
      type: "footer",
      variant: "centered",
      brand: { name: "Centered", href: "/" },
      linkGroups: [
        {
          title: "Links",
          links: [
            { label: "A", href: "#" },
            { label: "B", href: "#" },
          ],
        },
      ],
      bottom: { text: "© 2025" },
    },
  },
]

/** Get showcase items by section type (slug). */
export function getShowcaseItemsByType(sectionType: string): ShowcaseItem[] {
  return SHOWCASE_ITEMS.filter((item) => item.section.type === sectionType)
}

/** All items (for legacy sections page). */
export function getAllShowcaseItems(): ShowcaseItem[] {
  return SHOWCASE_ITEMS.map((item) => ({
    label: `${item.section.type} — ${item.label}`,
    section: item.section,
  }))
}
