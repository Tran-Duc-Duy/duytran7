import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "nav-mobile": "src/nav-mobile.ts",
    lottie: "src/lottie/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic"
  },
})
