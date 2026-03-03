import React from "react"
import { BuilderCanvas } from "./_components/BuilderCanvas"

export const metadata = {
  title: "Page Builder — Landing UI Demo",
  description: "Drag-and-drop builder: lắp ghép sections, export JSON, render thành trang",
}

export default function BuilderPage(): React.ReactElement {
  return <BuilderCanvas />
}
