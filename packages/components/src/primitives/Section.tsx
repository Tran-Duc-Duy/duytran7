/**
 * Section wrapper — semantic section with id and className per landing block.
 */

import { forwardRef } from "react"
import { cn } from "../utils/cn"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "header" | "footer" | "nav"
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ as: Tag = "section", className, id, ...props }, ref) => (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      id={id}
      className={cn(className)}
      {...props}
    />
  )
)
Section.displayName = "Section"
