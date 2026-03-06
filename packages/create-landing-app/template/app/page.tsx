import { redirect } from "next/navigation"
import { LandingPage } from "@duytran7/landing-next"
import { getPageConfig } from "./lib/getPageConfig"

export default function HomePage() {
  const config = getPageConfig("home")
  if (!config) redirect("/builder")
  return <LandingPage config={config} />
}
