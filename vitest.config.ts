/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: [
      "packages/**/tests/**/*.test.ts",
      "packages/**/tests/**/*.test.tsx",
    ],
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
})
