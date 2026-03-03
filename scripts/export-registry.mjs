/**
 * Export component registry to static JSON (docs, AI tools).
 * Chạy sau build: pnpm build && pnpm export-registry
 */
import { writeFileSync } from "fs"
import { createRequire } from "module"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const { getComponentRegistryJson } = require(join(__dirname, "../packages/core/dist/index.cjs"))

const json = getComponentRegistryJson()
writeFileSync(join(__dirname, "../docs/component-registry.json"), json, "utf8")
console.log("Written docs/component-registry.json")
