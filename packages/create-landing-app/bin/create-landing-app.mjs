#!/usr/bin/env node

import { cpSync, mkdirSync, readFileSync, writeFileSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

const __dirname = dirname(fileURLToPath(import.meta.url))
const TEMPLATE_DIR = join(__dirname, "..", "template")
const PRESETS_DIR = join(TEMPLATE_DIR, "presets")

const VALID_TYPES = ["landing", "saas", "agency", "blog"]

function getArg(name) {
  const i = process.argv.indexOf(name)
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null
}

const args = process.argv.slice(2)
const target = args.find((a) => !a.startsWith("--") && !VALID_TYPES.includes(a))
const noInstall = args.includes("--no-install")
const typeArg = getArg("--type") || getArg("-t") || "landing"
const projectType = VALID_TYPES.includes(typeArg) ? typeArg : "landing"
const nameArg = getArg("--name") || getArg("-n")

if (!target) {
  console.error("Usage: npx create-landing-app <project-directory> [options]")
  console.error("Example: npx create-landing-app my-app --type saas")
  console.error("Options:")
  console.error("  --type, -t <landing|saas|agency|blog>  preset content for home.json (default: landing)")
  console.error("  --name, -n <string>                    package name (default: from directory name)")
  console.error("  --no-install                           skip npm install (for monorepo test)")
  process.exit(1)
}

const targetPath = join(process.cwd(), target)
if (existsSync(targetPath)) {
  console.error(`Error: "${target}" already exists. Choose another name.`)
  process.exit(1)
}

console.log(`Creating landing app in ${targetPath} (type: ${projectType})...`)
mkdirSync(targetPath, { recursive: true })
cpSync(TEMPLATE_DIR, targetPath, { recursive: true })

const presetPath = join(PRESETS_DIR, `${projectType}.json`)
const homeJsonPath = join(targetPath, "content", "pages", "home.json")
if (existsSync(presetPath)) {
  cpSync(presetPath, homeJsonPath)
  console.log(`  Applied preset: ${projectType}`)
}

const pkgPath = join(targetPath, "package.json")
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"))
const safeName =
  nameArg?.replace(/^[^a-z0-9]/i, "").replace(/[^a-z0-9-]/g, "-") ||
  target.replace(/^[^a-z0-9]/i, "").replace(/[^a-z0-9-]/g, "-") ||
  "my-landing"
pkg.name = safeName
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n")

if (!noInstall) {
  console.log("Installing dependencies...")
  try {
    execSync("npm install", { cwd: targetPath, stdio: "inherit" })
  } catch {
    console.log("Run manually: cd " + target + " && npm install")
  }
} else {
  console.log("Skipped install (--no-install). Add this folder to pnpm-workspace.yaml, set landing deps to workspace:*, then run pnpm install from repo root.")
}

console.log("Done. Next steps:")
console.log("  cd " + target)
if (!noInstall) console.log("  npm run dev")
else console.log("  pnpm install (from repo root) then pnpm run dev here")
console.log("  Open http://localhost:3000 and go to /builder to edit, or edit content/pages/*.json")
