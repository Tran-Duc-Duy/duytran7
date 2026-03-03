import React from "react"
import { readFileSync } from "fs"
import { join } from "path"
import { notFound } from "next/navigation"
import {
  LandingPage,
  buildMetadata,
  parseLandingConfigStrict,
} from "@duytran7/landing-next"
import { DEMO_LIST } from "../_data/demoList"

const examplesDir = join(process.cwd(), "..", "..", "examples")
const validSlugs = new Set<string>(DEMO_LIST.map((d) => d.slug))

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return DEMO_LIST.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  if (!validSlugs.has(slug)) return {}
  const path = join(examplesDir, `${slug}.json`)
  try {
    const config = parseLandingConfigStrict(
      JSON.parse(readFileSync(path, "utf-8"))
    )
    return buildMetadata(config)
  } catch {
    return {}
  }
}

export default async function DemoPage({
  params,
}: Props): Promise<React.ReactElement> {
  const { slug } = await params
  if (!validSlugs.has(slug)) notFound()
  const path = join(examplesDir, `${slug}.json`)
  let config
  try {
    config = parseLandingConfigStrict(JSON.parse(readFileSync(path, "utf-8")))
  } catch {
    notFound()
  }
  return <LandingPage config={config} />
}
