import React from "react"
import { BuilderCanvas } from "./_components/BuilderCanvas"

export const metadata = {
  title: "Page Builder — Landing UI Demo",
  description:
    "Drag-and-drop builder: compose sections, export JSON, render as page",
}

export default function BuilderPage(): React.ReactElement {
  return <BuilderCanvas />
}
