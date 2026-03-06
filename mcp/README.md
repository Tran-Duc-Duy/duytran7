# @duytran7/landing-mcp

MCP (Model Context Protocol) server for the [landing monorepo](https://github.com/Tran-Duc-Duy/duytran7). Use it from **Cursor**, **Claude Desktop**, or any MCP client to list section types, get example configs, list scaffold presets, and generate valid landing JSON. Uses `@duytran7/landing-core` registry.

## Quick start (Cursor)

1. **Build** (từ root repo):
   ```bash
   pnpm install
   pnpm --filter @duytran7/landing-mcp run build
   ```
2. **Thêm vào Cursor:** Mở Cursor Settings → MCP → Edit config (hoặc tạo/sửa `~/.cursor/mcp.json`), thêm:
   ```json
   {
     "mcpServers": {
       "landing": {
         "command": "node",
         "args": ["/Users/tranducduy/MyWork/npm-libs/mcp/dist/index.js"]
       }
     }
   }
   ```
   Thay đường dẫn trên bằng **đường dẫn tuyệt đối** tới thư mục `npm-libs` của bạn (ví dụ `.../npm-libs/mcp/dist/index.js`).
3. **Reload:** Restart Cursor hoặc reload MCP. Trong chat, Cursor sẽ gọi được các tool `list_sections`, `get_section_info`, `get_registry`, `list_presets`.

## Tools

| Tool                 | Description                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **list_sections**    | List all section types with id, name, description, use case, and variants.                                                           |
| **get_section_info** | Get one section’s full entry (including `exampleConfig`) by `sectionType` (e.g. `hero`, `video-embed`, `countdown`, `trust-badges`). |
| **get_registry**     | Return the full component registry as JSON.                                                                                          |
| **list_presets**     | List create-landing-app preset types (landing, saas, agency, blog) and CLI usage (--type, --name, --no-install) for scaffolding.    |

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

3. Restart Cursor (or reload MCP). You should see the `landing` server and tools: `list_sections`, `get_section_info`, `get_registry`, `list_presets`.

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
- Call **list_presets** to get create-landing-app preset types (landing, saas, agency, blog) and CLI usage (--type, --name, --no-install) when suggesting scaffold commands.

Use the returned JSON to build or validate `sections` in a `LandingConfig` (see repo docs: [docs/SCHEMA.md](../docs/SCHEMA.md), [docs/COMPONENTS.md](../docs/COMPONENTS.md)).

## Scaffold (create-landing-app)

Để tạo project mới (scaffold), dùng CLI **create-landing-app** (không phải MCP). MCP bổ trợ bằng cách cung cấp **list_presets** và các tool sections/registry khi chỉnh config.

- **Tạo app:** `npx create-landing-app <project-directory> [--type landing|saas|agency|blog] [--name pkg-name] [--no-install]`
- **Presets:** `--type` ghi sẵn `content/pages/home.json` (landing = Hero/Features/CTA; saas = Nav/Hero/Pricing/…; agency = Stats/Testimonials/…; blog = Blog grid/Newsletter/…).
- Chi tiết: [packages/create-landing-app/README.md](../packages/create-landing-app/README.md).
