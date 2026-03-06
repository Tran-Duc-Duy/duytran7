# @duytran7/landing-mcp

MCP (Model Context Protocol) server for the [landing monorepo](https://github.com/Tran-Duc-Duy/duytran7). Use it from **Cursor**, **Claude Desktop**, or any MCP client to list section types, get example configs, and generate valid landing JSON. Uses `@duytran7/landing-core` registry.

## Tools

| Tool                 | Description                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **list_sections**    | List all section types with id, name, description, use case, and variants.                                                           |
| **get_section_info** | Get one section’s full entry (including `exampleConfig`) by `sectionType` (e.g. `hero`, `video-embed`, `countdown`, `trust-badges`). |
| **get_registry**     | Return the full component registry as JSON.                                                                                          |

## Build and run

From the monorepo root:

```bash
pnpm install
pnpm --filter @duytran7/landing-mcp run build
node mcp/dist/index.js
```

The server uses **stdio** transport: it reads JSON-RPC from stdin and writes to stdout. Do not run it interactively; start it as a subprocess from your MCP client.

## Cursor

1. Build the MCP server (see above).
2. Add to Cursor MCP settings (e.g. `~/.cursor/mcp.json` or project `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "landing": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/npm-libs/mcp/dist/index.js"]
    }
  }
}
```

Replace `/ABSOLUTE/PATH/TO/npm-libs` with your repo path. If you use `pnpm exec`:

```json
{
  "mcpServers": {
    "landing": {
      "command": "pnpm",
      "args": ["--filter", "@duytran7/landing-mcp", "start"],
      "cwd": "/ABSOLUTE/PATH/TO/npm-libs"
    }
  }
}
```

3. Restart Cursor (or reload MCP). You should see the `landing` server and tools like `list_sections`, `get_section_info`, `get_registry`.

## Claude Desktop

In Claude Desktop config (e.g. `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "landing": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/npm-libs/mcp/dist/index.js"]
    }
  }
}
```

Use the same path rules as for Cursor.

## Usage

Once connected, the AI can:

- Call **list_sections** to choose which section types to use (hero, nav, features, pricing, video-embed, countdown, trust-badges, etc.).
- Call **get_section_info** with a `sectionType` to get the exact shape and `exampleConfig` for that section.
- Call **get_registry** to dump the full registry for reference.

Use the returned JSON to build or validate `sections` in a `LandingConfig` (see repo docs: [docs/SCHEMA.md](../docs/SCHEMA.md), [docs/COMPONENTS.md](../docs/COMPONENTS.md)).
