import { NextResponse } from "next/server"
import { componentRegistry } from "@duytran7/landing-core"

/**
 * GET /api/registry — Component registry for AI recognition.
 * Returns section list with id, name, description, useCase, variants, configFields, classesKeys, exampleConfig.
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(componentRegistry, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json",
    },
  })
}
