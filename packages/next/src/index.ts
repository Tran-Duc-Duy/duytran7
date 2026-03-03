/**
 * @duytran7/landing-next — Next.js adapter: metadata, JSON-LD, LandingPage từ config.
 */

export { buildMetadata } from "./metadata"
export { JsonLd } from "./JsonLd"
export type { JsonLdProps } from "./JsonLd"
export { LandingPage } from "./LandingPage"
export type { LandingPageProps } from "./LandingPage"

export { parseLandingConfig, parseLandingConfigStrict } from "@duytran7/landing-core"
export type { LandingConfig, ParseLandingConfigResult } from "@duytran7/landing-core"
