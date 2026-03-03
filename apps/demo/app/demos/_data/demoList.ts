/**
 * List of full landing page demos (slug = filename in examples/ without .json).
 */
export const DEMO_LIST = [
  {
    slug: "landing-full",
    name: "Acme (full)",
    description:
      "Full landing with banner, stats, logo cloud, features, testimonials, pricing, FAQ, CTA, newsletter.",
  },
  {
    slug: "saas",
    name: "SaaS",
    description:
      "Flowbase — automate workflow. Hero, stats, features, integrations, pricing.",
  },
  {
    slug: "agency",
    name: "Agency",
    description:
      "Studio Nine — design & dev agency. Work, services, testimonials.",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    description: "Alex Rivera — product designer. Selected work, kind words.",
  },
  {
    slug: "startup",
    name: "Startup",
    description:
      "Launchpad — ship faster. Templates, auth, billing, dashboard.",
  },
  {
    slug: "product",
    name: "Product",
    description: "Relay — API platform. Design, mock, test, monitor.",
  },
] as const

export type DemoSlug = (typeof DEMO_LIST)[number]["slug"]
