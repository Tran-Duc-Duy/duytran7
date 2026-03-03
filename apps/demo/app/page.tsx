import React from "react"
import { readFileSync } from "fs"
import { join } from "path"
import { LandingPage, buildMetadata, parseLandingConfigStrict } from "@duytran7/landing-next"

const examplesDir = join(process.cwd(), "..", "..", "examples")
const config = parseLandingConfigStrict(
  JSON.parse(readFileSync(join(examplesDir, "landing-full.json"), "utf-8"))
)

export const metadata = buildMetadata(config)

export default function Home(): React.ReactElement {
  return <LandingPage config={config} />
}
