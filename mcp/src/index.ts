#!/usr/bin/env node
/**
 * MCP server for landing page config.
 * Exposes: list_sections, get_section_info, get_registry, list_presets.
 */

import {
  componentRegistry,
  getComponentRegistryEntry,
  getComponentRegistryJson,
} from "@duytran7/landing-core"
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const mcp = new McpServer(
  { name: "landing-mcp", version: "0.1.0" },
  { capabilities: { tools: {} } }
)

mcp.registerTool(
  "list_sections",
  {
    description:
      "List all landing section types with id, name, description, use case, and variants. Use when you need to pick sections for a landing page.",
    inputSchema: z.object({}),
  },
  async () => {
    const list = componentRegistry.map((entry) => ({
      id: entry.id,
      name: entry.name,
      description: entry.description,
      useCase: entry.useCase,
      variants: entry.variants,
    }))
    return {
      content: [{ type: "text" as const, text: JSON.stringify(list, null, 2) }],
    }
  }
)

mcp.registerTool(
  "get_section_info",
  {
    description:
      "Get detailed info and example config for one section type. Use to generate valid JSON for a section.",
    inputSchema: z.object({
      sectionType: z
        .string()
        .describe(
          "Section type id (e.g. hero, nav, features, video-embed, countdown, trust-badges)."
        ),
    }),
  },
  async ({ sectionType }) => {
    const entry = getComponentRegistryEntry(sectionType)
    if (!entry) {
      const ids = componentRegistry.map((e) => e.id).join(", ")
      return {
        content: [
          {
            type: "text" as const,
            text: `Unknown section type "${sectionType}". Available: ${ids}`,
          },
        ],
        isError: true,
      }
    }
    return {
      content: [
        { type: "text" as const, text: JSON.stringify(entry, null, 2) },
      ],
    }
  }
)

mcp.registerTool(
  "get_registry",
  {
    description:
      "Get the full component registry as JSON. Use for reference or to list all sections with examples.",
    inputSchema: z.object({}),
  },
  async () => {
    const json = getComponentRegistryJson()
    return { content: [{ type: "text" as const, text: json }] }
  }
)

const PRESETS_INFO = {
  presets: [
    { id: "landing", name: "Landing", description: "Hero, Features, CTA (default)" },
    { id: "saas", name: "SaaS", description: "Nav, Hero centered, Features, Pricing, CTA, Footer" },
    { id: "agency", name: "Agency", description: "Nav, Hero minimal, Stats, Features cards, Testimonials, CTA, Footer" },
    { id: "blog", name: "Blog", description: "Nav, Hero, Blog grid, Newsletter, Footer" },
  ],
  cliUsage:
    "npx create-landing-app <project-directory> [--type landing|saas|agency|blog] [--name pkg-name] [--no-install]",
  options: [
    { flag: "--type, -t", description: "Preset for content/pages/home.json (default: landing)" },
    { flag: "--name, -n", description: "Package name in package.json (default: sanitized directory name)" },
    { flag: "--no-install", description: "Skip npm install (e.g. when adding to pnpm workspace)" },
  ],
}

mcp.registerTool(
  "list_presets",
  {
    description:
      "List create-landing-app preset types and CLI usage. Use when the user wants to scaffold a new project or know which --type to pass.",
    inputSchema: z.object({}),
  },
  async () => {
    return {
      content: [{ type: "text" as const, text: JSON.stringify(PRESETS_INFO, null, 2) }],
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await mcp.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
