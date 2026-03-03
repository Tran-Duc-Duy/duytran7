"use client"

/**
 * Input autocomplete Tailwind: gợi ý class, Tab/Enter complete, preview swatch, default value.
 */

import React, { useState, useMemo, useRef, useEffect } from "react"
import {
  filterTailwindSuggestions,
  getCurrentToken,
  applySuggestion,
  TAILWIND_DEFAULTS,
} from "../_data/tailwindClasses"

export interface TailwindClassInputProps {
  label: string
  value: string
  placeholder?: string
  defaultKey?: string
  onChange: (value: string) => void
}

export function TailwindClassInput({
  label,
  value,
  placeholder,
  defaultKey,
  onChange,
}: TailwindClassInputProps): React.ReactElement {
  const [open, setOpen] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const token = getCurrentToken(value)
  const suggestions = useMemo(
    () => filterTailwindSuggestions(token, 30),
    [token]
  )

  useEffect(() => {
    setHighlightIndex(0)
  }, [token])

  useEffect(() => {
    if (!open) return
    const el = listRef.current?.children[highlightIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: "nearest" })
  }, [open, highlightIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) {
      if (e.key === "Tab" && token) setOpen(true)
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightIndex((i) => (i + 1) % suggestions.length)
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
      return
    }
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault()
      const chosen = suggestions[highlightIndex]
      if (chosen) {
        onChange(applySuggestion(value, chosen))
        setOpen(false)
      }
      return
    }
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const handleSelect = (suggestion: string) => {
    onChange(applySuggestion(value, suggestion))
    setOpen(false)
    inputRef.current?.focus()
  }

  const showList = open && suggestions.length > 0
  const defaultVal = defaultKey ? TAILWIND_DEFAULTS[defaultKey] : undefined

  const isColorLike = (cls: string) =>
    /^bg-|^text-/.test(cls) && !cls.includes("/")

  return (
    <div className="relative">
      <label className="mb-0.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex gap-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 180)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1.5 text-sm"
        />
        {defaultVal != null && (
          <button
            type="button"
            onClick={() => onChange(defaultVal)}
            className="shrink-0 rounded border border-border bg-muted/30 px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/50"
            title="Điền giá trị mặc định"
          >
            Default
          </button>
        )}
      </div>
      {value.trim() && (
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Preview:</span>
          <div
            className={`h-6 w-10 rounded border border-border ${value}`}
            title={value}
          />
          <span className="max-w-[200px] truncate text-xs text-muted-foreground" title={value}>
            {value}
          </span>
        </div>
      )}
      {showList && (
        <ul
          ref={listRef}
          className="absolute left-0 right-0 top-full z-50 mt-0.5 max-h-48 overflow-auto rounded border border-border bg-popover py-1 shadow-md"
        >
          {suggestions.map((cls, i) => (
            <li key={cls}>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  handleSelect(cls)
                }}
                className={`flex w-full items-center gap-2 px-2 py-1.5 text-left text-sm ${
                  i === highlightIndex ? "bg-accent text-accent-foreground" : "hover:bg-muted/50"
                }`}
              >
                {isColorLike(cls) ? (
                  <span
                    className={`shrink-0 h-3.5 w-3.5 rounded border border-border ${cls}`}
                  />
                ) : null}
                <span className="min-w-0 truncate font-mono">{cls}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
