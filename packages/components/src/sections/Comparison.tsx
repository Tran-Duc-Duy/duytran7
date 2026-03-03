/**
 * Comparison section — plan/feature comparison table or cards.
 */

import type { ComparisonSection as ComparisonSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { cn } from "../utils/cn"

export interface ComparisonProps {
  config: ComparisonSectionConfig
  className?: string
}

function formatValue(v: string | boolean): string {
  if (typeof v === "boolean") return v ? "Yes" : "No"
  return v
}

export function Comparison({ config, className }: ComparisonProps) {
  const {
    id,
    title,
    subtitle,
    planNames,
    rows,
    highlightColumn,
    variant = "default",
    className: configClass,
  } = config

  const isTable = variant === "table" || variant === "default"

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24 bg-muted/30", configClass, className)}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <Container size="lg">
        {(title || subtitle) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title && (
              <h2
                id={`${id}-title`}
                className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
        {isTable ? (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 font-medium text-foreground">Feature</th>
                  {planNames.map((name, i) => (
                    <th
                      key={i}
                      className={cn(
                        "p-4 font-medium text-foreground",
                        highlightColumn === i && "bg-primary/10"
                      )}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="p-4 text-muted-foreground">{row.feature}</td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className={cn(
                          "p-4",
                          highlightColumn === j && "bg-primary/5 font-medium"
                        )}
                      >
                        {formatValue(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {planNames.map((planName, colIndex) => (
              <div
                key={colIndex}
                className={cn(
                  "rounded-lg border bg-card p-6",
                  highlightColumn === colIndex && "border-primary shadow-md"
                )}
              >
                <h3 className="mb-4 text-lg font-semibold text-foreground">{planName}</h3>
                <ul className="list-none space-y-2 p-0">
                  {rows.map((row, i) => (
                    <li key={i} className="flex justify-between gap-2 text-sm">
                      <span className="text-muted-foreground">{row.feature}</span>
                      <span>{formatValue(row.values[colIndex] ?? "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
