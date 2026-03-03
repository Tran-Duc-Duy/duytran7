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
  it("trả về success và data khi config hợp lệ", () => {
    const result = parseLandingConfig(validConfig)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.seo.title).toBe("Test")
      expect(result.data.sections).toHaveLength(2)
      expect(result.data.sections[0].type).toBe("hero")
    }
  })

  it("chấp nhận JSON string", () => {
    const result = parseLandingConfig(JSON.stringify(validConfig))
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.seo.title).toBe("Test")
    }
  })

  it("trả về errors khi JSON string invalid", () => {
    const result = parseLandingConfig("not json {")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0)
      expect(result.errors[0].path).toBe("")
    }
  })

  it("trả về errors khi thiếu seo", () => {
    const result = parseLandingConfig({ sections: [] })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.errors.some((e) => e.path.includes("seo"))).toBe(true)
    }
  })

  it("trả về errors khi section type không hợp lệ", () => {
    const result = parseLandingConfig({
      seo: { title: "T", description: "D" },
      sections: [{ id: "x", type: "unknown_section" }],
    })
    expect(result.success).toBe(false)
  })
})

describe("parseLandingConfigStrict", () => {
  it("trả về config khi hợp lệ", () => {
    const data = parseLandingConfigStrict(validConfig)
    expect(data.seo.title).toBe("Test")
    expect(data.sections).toHaveLength(2)
  })

  it("throw khi config invalid", () => {
    expect(() => parseLandingConfigStrict({})).toThrow(/Invalid landing config/)
  })
})
