#!/usr/bin/env node
/**
 * MCP server for landing page config.
 * Exposes: list_sections, get_section_info, get_registry.
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

async function main() {
  const transport = new StdioServerTransport()
  await mcp.connect(transport)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
