import { describe, it, expect } from "vitest"
import { parseLandingConfig, parseLandingConfigStrict } from "../src/parser"

const validConfig = {
  seo: {
    title: "Test",
    description: "Test description",
  },
  sections: [
    {
      id: "hero",
      type: "hero",
      headline: "Hello",
    },
    {
      id: "footer",
      type: "footer",
      brand: { name: "Brand" },
    },
  ],
}

describe("parseLandingConfig", () => {
  it("returns success and data when config is valid", () => {
    const result = parseLandingConfig(validConfig)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.seo.title).toBe("Test")
      expect(result.data.sections).toHaveLength(2)
      expect(result.data.sections[0].type).toBe("hero")
    }
  })

  it("accepts JSON string", () => {
    const result = parseLandingConfig(JSON.stringify(validConfig))
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.seo.title).toBe("Test")
    }
  })

  it("returns errors when JSON string is invalid", () => {
    const result = parseLandingConfig("not json {")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0].path).toBe("")
    }
  })

  it("returns errors when seo is missing", () => {
    const result = parseLandingConfig({ sections: [] })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.some((e) => e.path.includes("seo"))).toBe(true)
    }
  })

  it("returns errors when section type is invalid", () => {
    const result = parseLandingConfig({
      seo: { title: "T", description: "D" },
      sections: [{ id: "x", type: "unknown_section" }],
    })
    expect(result.success).toBe(false)
  })
})

describe("parseLandingConfigStrict", () => {
  it("returns config when valid", () => {
    const data = parseLandingConfigStrict(validConfig)
    expect(data.seo.title).toBe("Test")
    expect(data.sections).toHaveLength(2)
  })

  it("throws when config is invalid", () => {
    expect(() => parseLandingConfigStrict({})).toThrow(/Invalid landing config/)
  })
})
