/**
 * Team section — team members grid.
 */

import type { TeamSection as TeamSectionConfig } from "@duytran7/landing-core"
import { Section } from "../primitives/Section"
import { Container } from "../primitives/Container"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../primitives/Card"
import { cn } from "../utils/cn"

export interface TeamProps {
  config: TeamSectionConfig
  className?: string
}

const colClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const

export function Team({ config, className }: TeamProps) {
  const {
    id,
    title,
    subtitle,
    members,
    columns = 3,
    variant = "default",
    className: configClass,
  } = config

  return (
    <Section
      id={id}
      className={cn("py-16 sm:py-24", configClass, className)}
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
        <ul
          className={cn(
            "grid gap-8 list-none p-0 m-0",
            colClasses[columns]
          )}
        >
          {members.map((member, i) => (
            <li key={i}>
              {variant === "cards" ? (
                <Card className="h-full text-center">
                  {member.avatar && (
                    <img
                      src={member.avatar}
                      alt={`${member.name}${member.role ? `, ${member.role}` : ""}`}
                      className="mx-auto mt-6 h-24 w-24 rounded-full object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    {member.role && (
                      <CardDescription>{member.role}</CardDescription>
                    )}
                  </CardHeader>
                  {member.bio && (
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  )}
                  {member.social && member.social.length > 0 && (
                    <div className="flex justify-center gap-4 pb-6">
                      {member.social.map((s, j) => (
                        <a
                          key={j}
                          href={s.url}
                          className="text-muted-foreground hover:text-foreground text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.type}
                        </a>
                      ))}
                    </div>
                  )}
                </Card>
              ) : (
                <div className="text-center">
                  {member.avatar && (
                    <img
                      src={member.avatar}
                      alt={`${member.name}${member.role ? `, ${member.role}` : ""}`}
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                    />
                  )}
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{member.name}</h3>
                  {member.role && (
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  )}
                  {member.bio && (
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  )}
                  {member.social && member.social.length > 0 && (
                    <div className="mt-2 flex justify-center gap-4">
                      {member.social.map((s, j) => (
                        <a
                          key={j}
                          href={s.url}
                          className="text-muted-foreground hover:text-foreground text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {s.type}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
