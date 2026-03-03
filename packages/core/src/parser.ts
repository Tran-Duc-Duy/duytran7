/**
 * Parse and validate JSON config into LandingConfig.
 * Returns result type for caller to handle errors explicitly.
 */

import type { LandingConfig } from "./types"
import { landingConfigSchema } from "./schema"

export interface ParseResult {
  success: true
  data: LandingConfig
}

export interface ParseError {
  success: false
  errors: Array<{ path: string; message: string }>
}

export type ParseLandingConfigResult = ParseResult | ParseError

/**
 * Parse and validate config (object or JSON string).
 */
export function parseLandingConfig(input: unknown): ParseLandingConfigResult {
  let raw: unknown = input
  if (typeof input === "string") {
    try {
      raw = JSON.parse(input) as unknown
    } catch (e) {
      return {
        success: false,
        errors: [
          { path: "", message: `Invalid JSON: ${(e as Error).message}` },
        ],
      }
    }
  }

  const result = landingConfigSchema.safeParse(raw)
  if (result.success) {
    return { success: true, data: result.data as LandingConfig }
  }

  const errors = result.error.issues.map((issue) => ({
    path: issue.path.join(".") || "root",
    message: issue.message,
  }))
  return {
    success: false,
    errors,
  }
}

/**
 * Assert parse: throw if invalid (use when config is guaranteed correct).
 */
export function parseLandingConfigStrict(input: unknown): LandingConfig {
  const parsed = parseLandingConfig(input)
  if (parsed.success) return parsed.data
  const msg = parsed.errors.map((e) => `${e.path}: ${e.message}`).join("; ")
  throw new Error(`Invalid landing config: ${msg}`)
}
