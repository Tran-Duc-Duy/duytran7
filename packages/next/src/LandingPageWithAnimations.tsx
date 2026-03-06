/**
 * Client landing page: sections wrapped with scroll-in animation and effects (parallax, float, mouseAware).
 * Use when config has section.animation or section.effects. Requires framer-motion.
 */

"use client"

import { useRef } from "react"
import type { LandingConfig, LandingSection } from "@duytran7/landing-core"
import { SectionRenderer } from "@duytran7/landing-components"
import { motion, useScroll, useTransform } from "framer-motion"

export interface LandingPageWithAnimationsProps {
  config: LandingConfig
  className?: string
}

function getInitial(enter?: string) {
  switch (enter) {
    case "fade":
      return { opacity: 0 }
    case "fade-up":
      return { opacity: 0, y: 24 }
    case "fade-down":
      return { opacity: 0, y: -24 }
    case "slide-left":
      return { opacity: 0, x: 24 }
    case "slide-right":
      return { opacity: 0, x: -24 }
    default:
      return {}
  }
}

function getAnimate(enter?: string) {
  switch (enter) {
    case "fade":
    case "fade-up":
    case "fade-down":
    case "slide-left":
    case "slide-right":
      return { opacity: 1, x: 0, y: 0 }
    default:
      return {}
  }
}

function SectionWithAnimation({
  section,
  children,
}: {
  section: LandingSection
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const animation = section.animation
  const effects = section.effects
  const enter = animation?.enter ?? "none"
  const duration = (animation?.duration ?? 500) / 1000
  const delay = (animation?.delay ?? 0) / 1000

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 0.5], [30, -30])

  const hasParallax = effects?.parallax
  const hasFloat = effects?.float
  const hasMouseAware = effects?.mouseAware

  const content = (
    <motion.div
      ref={ref}
      initial={enter !== "none" ? getInitial(enter) : undefined}
      whileInView={enter !== "none" ? getAnimate(enter) : undefined}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration, delay }}
      style={hasParallax ? { y: parallaxY } : undefined}
    >
      {hasFloat ? (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </motion.div>
  )

  if (hasMouseAware) {
    return (
      <MouseAwareWrapper sectionId={section.id}>{content}</MouseAwareWrapper>
    )
  }

  return content
}

function MouseAwareWrapper({
  children,
}: {
  sectionId: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      className="perspective-[1000px]"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

export function LandingPageWithAnimations({
  config,
  className,
}: LandingPageWithAnimationsProps) {
  return (
    <>
      <a
        href="#main-content"
        className="border-border bg-background text-foreground focus:outline-ring absolute left-[-9999px] top-4 z-[100] rounded-md border px-4 py-2 text-sm font-medium shadow focus:left-4 focus:outline focus:outline-2"
      >
        Skip to main content
      </a>
      <main id="main-content" className={className} role="main" tabIndex={-1}>
        {config.sections.map((section) => {
          const hasAnimation =
            section.animation?.enter && section.animation.enter !== "none"
          const hasEffects =
            section.effects?.parallax ||
            section.effects?.float ||
            section.effects?.mouseAware

          const sectionContent = (
            <SectionRenderer
              key={section.id}
              section={section}
              className={section.className}
            />
          )

          if (hasAnimation || hasEffects) {
            return (
              <SectionWithAnimation key={section.id} section={section}>
                {sectionContent}
              </SectionWithAnimation>
            )
          }

          return sectionContent
        })}
      </main>
    </>
  )
}
