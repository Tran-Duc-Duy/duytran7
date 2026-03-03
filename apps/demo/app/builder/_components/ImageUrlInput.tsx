"use client"

/**
 * Input URL ảnh: gợi ý Unsplash placeholder, preview thumbnail, default một ảnh mẫu.
 */

import React, { useState } from "react"

const UNSPLASH_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1557683316-973673baf926?w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
]

export interface ImageUrlInputProps {
  label: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export function ImageUrlInput({
  label,
  value,
  placeholder,
  onChange,
}: ImageUrlInputProps): React.ReactElement {
  const [previewError, setPreviewError] = useState(false)

  const pickRandom = () => {
    const url = UNSPLASH_PLACEHOLDERS[Math.floor(Math.random() * UNSPLASH_PLACEHOLDERS.length)]
    onChange(url)
    setPreviewError(false)
  }

  return (
    <div>
      <label className="mb-0.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="flex gap-1">
        <input
          type="url"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value)
            setPreviewError(false)
          }}
          className="min-w-0 flex-1 rounded border border-border bg-background px-2 py-1.5 text-sm"
        />
        <button
          type="button"
          onClick={pickRandom}
          className="shrink-0 rounded border border-border bg-muted/30 px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/50"
          title="Chèn ảnh mẫu Unsplash"
        >
          Unsplash
        </button>
      </div>
      {value && (
        <div className="mt-1.5">
          <p className="mb-1 text-xs text-muted-foreground">Preview:</p>
          <div className="relative h-24 w-full overflow-hidden rounded border border-border bg-muted/20">
            {previewError ? (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Không tải được ảnh
              </div>
            ) : (
              <img
                src={value}
                alt=""
                className="h-full w-full object-cover"
                onError={() => setPreviewError(true)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
