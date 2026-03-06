# State management and rich UI

This document defines how **state** is managed across landing components and how **rich UI** (Lottie, background video, effects, responsive menu, theme/font) is configured and implemented.

---

## 1. State management

### 1.1 Principles

- **Config is the source of truth** for content and layout. Components receive `config` (props) and render; they do not mutate config.
- **UI state** (open/closed, selected index, form values) lives either **inside the component** (local) or in **app-level context** (theme, font). The config can **reference** theme/font by id; the host app provides the actual values via context or CSS.

### 1.2 Where state lives

| Kind                  | Where                                                                 | Example                                                                                                            |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Local (component)** | useState/useReducer inside the section component                      | FAQ accordion open key, Nav mobile menu open, Countdown remaining (if live), Contact form fields                   |
| **Global (app)**      | React Context or URL (e.g. `?theme=dark`) or external store (Zustand) | `themeId`, `fontId` — app has a `LandingThemeProvider` that reads config or searchParams and sets CSS vars / class |
| **Builder**           | Demo app only (builder page state)                                    | Selected section id, form values for editing — not part of landing config                                          |

### 1.3 Config-driven global state (theme, font)

- **LandingConfig.theme** can include:
  - **themeId** (e.g. `"light"`, `"dark"`, `"brand"`) — app maps to a CSS class or data-theme and injects variables.
  - **fontId** (e.g. `"inter"`, `"geist"`) — app loads the font and sets `font-family`.
  - Legacy: **primaryColor**, **fontFamily** still supported for simple one-off overrides.

- The **host app** (e.g. Next.js layout) should:
  1. Read `config.theme` (or URL/searchParams).
  2. Wrap the page in a provider that sets `data-theme`, CSS variables, or `className` for the root.
  3. Optionally load a font (e.g. next/font) based on `fontId` and apply to the layout.

So: **config declares which theme/font to use**; **app owns the implementation** of themes and fonts. Components only use the resulting CSS (e.g. `bg-background`, `text-foreground`).

---

## 2. Rich UI: definitions and config

### 2.1 Background video and Lottie (Hero and similar)

- **Background video** (already in Hero):
  - Config: `background: { type: "video", url: "...", overlay?: "bg-black/40" }`.
  - Optional: **poster** (image URL before play), **muted/loop/autoplay** (default true for background).
  - Component: `<video autoPlay muted loop playsInline>`; no user state.

- **Background Lottie** (already in Hero):
  - Config: `background: { type: "lottie", url: "...", overlay?: "..." }`.
  - Optional: **lottieOptions**: `{ loop?: boolean, autoplay?: boolean }`.
  - Component: a **placeholder div** with `data-landing-bg="lottie"` and `data-lottie-url`. The **app** injects a Lottie player (e.g. `@lottiefiles/react-lottie-player`) that targets this element; the library does not bundle a player.

### 2.2 Section-level effects and animation

- **effects** (optional on section config):
  - **parallax**: boolean — scroll-based parallax for the section (or a child). App or component applies `transform` based on scroll.
  - **float**: boolean — subtle floating animation (e.g. CSS animation or framer-motion). For “floating” icons or cards.
  - **mouseAware**: boolean — element position or scale reacts to mouse (e.g. tilt, follow). Implemented in client component with mouse events.

- **animation** (optional on section config):
  - **enter**: `"none"` | `"fade"` | `"fade-up"` | `"fade-down"` | `"slide-left"` | `"slide-right"` — how the section appears on scroll (intersection observer). Default `"none"`.
  - **duration**: number (ms), optional.
  - **delay**: number (ms), optional.

These fields are **declared in config**; the component or a wrapper (e.g. framer-motion) implements the behavior. Prefer **framer-motion** in the app for enter animations and optional float/mouse effects so the core library stays small.

### 2.3 Responsive Nav: hamburger and sheet

- **Nav** on small viewports can switch to a **hamburger** that opens a **sheet** (drawer) with links and CTA.
- Config extension for **NavSection**:
  - **mobile**: `{ menu: "hamburger" | "dropdown" | "inline", sheetPosition?: "left" | "right" }`.
  - **hamburger**: icon button toggles a full-height or half sheet; links and CTA inside the sheet.
  - **dropdown**: menu opens as a dropdown below the logo/title (no sheet).
  - **inline**: keep links inline (scroll or wrap); no hamburger.

- **State**: “menu open” is **local** to the Nav component (useState). Nav that uses `mobile.menu === "hamburger"` must be a **client component** (or a client wrapper) to handle the toggle and render the sheet.

### 2.4 Theme and font switching (detailed)

- **themeId** and **fontId** in `LandingConfig.theme` are **symbolic**. The app defines what they mean:

| themeId (example) | App behavior                                                   |
| ----------------- | -------------------------------------------------------------- |
| `light`           | Add `data-theme="light"` or class; use light CSS vars.         |
| `dark`            | Add `data-theme="dark"`; use dark vars.                        |
| `brand`           | Use a custom set of CSS variables (primary, background, etc.). |

| fontId (example) | App behavior                                                                           |
| ---------------- | -------------------------------------------------------------------------------------- |
| `inter`          | Load Inter (e.g. next/font) and set `--font-sans: Inter, sans-serif` or apply to body. |
| `geist`          | Same for Geist.                                                                        |
| (custom)         | Any font family the app registers.                                                     |

- **Section-level override**: A section can still have **fontFamily** (CSS string) to override the global font for that block only.

---

## 3. Code examples

### 3.1 Theme + font (config + layout)

```json
{
  "theme": {
    "themeId": "dark",
    "fontId": "geist"
  },
  "sections": [...]
}
```

```tsx
// app/layout.tsx
import { LandingThemeProvider } from "@duytran7/landing-next/client"
import { GeistSans } from "geist/font/sans"

export default function Layout({ children }) {
  const config = getConfig() // from props, fetch, or static
  return (
    <LandingThemeProvider
      theme={config.theme}
      fontClassName={GeistSans.className}
    >
      {children}
    </LandingThemeProvider>
  )
}
```

App CSS (e.g. `globals.css`) should define `[data-theme="dark"]` and `[data-theme="light"]` with the right `--background`, `--foreground`, etc.

### 3.2 Section with animation + effects

```json
{
  "id": "features-1",
  "type": "features",
  "title": "Features",
  "items": [...],
  "animation": {
    "enter": "fade-up",
    "duration": 600,
    "delay": 100
  },
  "effects": {
    "parallax": true,
    "float": false,
    "mouseAware": true
  }
}
```

Use **LandingPageWithAnimations** so these options take effect:

```tsx
import { LandingPageWithAnimations } from "@duytran7/landing-next/client"

export default function Page() {
  return <LandingPageWithAnimations config={config} />
}
```

### 3.3 Hero with Lottie background

```json
{
  "id": "hero-1",
  "type": "hero",
  "headline": "Welcome",
  "background": {
    "type": "lottie",
    "url": "https://assets.lottiefiles.com/xxx.json",
    "overlay": "bg-black/30",
    "lottieOptions": { "loop": true, "autoplay": true }
  }
}
```

Add **LottieInjector** once in a client layout so the player is injected into placeholders:

```tsx
"use client"
import { LottieInjector } from "@duytran7/landing-components/lottie"

export function ClientLayout({ children }) {
  return (
    <>
      {children}
      <LottieInjector />
    </>
  )
}
```

### 3.4 Nav with hamburger on mobile

```json
{
  "id": "nav-1",
  "type": "nav",
  "logo": { "src": "/logo.svg", "alt": "Logo" },
  "links": [{ "label": "Pricing", "href": "/pricing" }],
  "mobile": { "menu": "hamburger", "sheetPosition": "right" },
  "cta": { "label": "Sign in", "href": "/login" }
}
```

Render from a **client** component so the sheet can open/close:

```tsx
"use client"
import { NavWithMobile } from "@duytran7/landing-components/nav-mobile"
import { SectionRenderer } from "@duytran7/landing-components"

function SectionOrNav({ section }) {
  if (section.type === "nav" && section.mobile?.menu === "hamburger") {
    return <NavWithMobile config={section} />
  }
  return <SectionRenderer section={section} />
}
```

---

## 4. Performance and accessibility

- **Reduced motion**: Prefer respecting `prefers-reduced-motion: reduce`. The app can skip or tone down `animation.enter` and `effects.float` when the user has this preference (e.g. pass a flag to a wrapper or use CSS `@media (prefers-reduced-motion: reduce)` to override animations).
- **Video**: Always set `poster` when possible so the first frame loads without delay; keep `muted` for autoplay to avoid browser blocking.
- **Lottie**: Keep file size reasonable; avoid huge JSON. Use `loop: false` for one-shot animations if appropriate.
- **Parallax**: Use `will-change: transform` sparingly; prefer framer-motion’s GPU-friendly transforms to avoid layout thrashing.
- **Focus**: Nav mobile sheet should trap focus when open and close on Escape; ensure “Skip to main content” remains first focusable element.

---

## 5. Extending

- **Custom themeId / fontId**: The app owns the mapping. In layout or theme provider, map `themeId`/`fontId` from config to your CSS classes or `data-theme` and font loaders (e.g. next/font). No change in the library.
- **Custom enter animation**: Config can carry extra keys (e.g. `animation.enter: "custom-zoom"`). The app can use **LandingPageWithAnimations** and extend the mapping from `enter` to `initial`/`animate` in a fork or wrapper, or add a custom wrapper that reads `section.animation` and applies its own motion variants.
- **Custom effects**: Same idea — add a custom wrapper that reads `section.effects` and applies your own parallax/float/mouse logic (e.g. different easing or intensity).
- **More background types**: To add e.g. “gradient + noise”, extend Hero background type and schema in core, then render the new type in Hero; no change to Lottie/video flow.

---

## 6. Troubleshooting

| Issue                         | Cause                                                 | Fix                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme/font not applying       | Provider not wrapping the page or theme not in config | Wrap layout with `LandingThemeProvider` and pass `config.theme`; define `[data-theme="..."]` and font classes in CSS.                                                     |
| Lottie not showing            | LottieInjector not mounted or wrong selector          | Add `<LottieInjector />` in a **client** layout; Hero must render `data-landing-bg="lottie"` and `data-lottie-url`. In Next.js load it with `next/dynamic` and `{ ssr: false }` so lottie-web never runs on server (avoids "document is not defined"). |
| Animation/effects not running | Using `LandingPage` instead of client entry           | Use `LandingPageWithAnimations` from `@duytran7/landing-next/client` when config has `animation` or `effects`.                                                            |
| Nav hamburger not opening     | Nav rendered as server component                      | Render the nav section with `NavWithMobile` from a **client** component (e.g. a wrapper that checks `section.type === "nav"` and `section.mobile?.menu === "hamburger"`). |
| `document is not defined` (Lottie) | lottie-web runs during SSR                       | Load the component that renders `LottieInjector` via `next/dynamic(..., { ssr: false })` so the Lottie bundle runs only on the client.     |
| Hydration mismatch            | Client-only content (e.g. Countdown) in server tree   | Keep Countdown server-safe (no live tick); or wrap the section in a client boundary and use a client-only countdown there.                |

---

## 7. Quick reference

| Feature                  | Config key                                   | Where to implement                              |
| ------------------------ | -------------------------------------------- | ----------------------------------------------- |
| Theme                    | `theme.themeId`                              | `LandingThemeProvider` + app CSS `[data-theme]` |
| Font                     | `theme.fontId` or `fontClassName`            | `LandingThemeProvider` + next/font or link      |
| Enter animation          | `section.animation.enter`                    | `LandingPageWithAnimations` (framer-motion)     |
| Parallax / float / mouse | `section.effects`                            | `LandingPageWithAnimations`                     |
| Hero video               | `background.type: "video"`, `videoOptions`   | Hero component (built-in)                       |
| Hero Lottie              | `background.type: "lottie"`, `lottieOptions` | Hero placeholder + `LottieInjector` in app      |
| Nav hamburger            | `section.mobile.menu: "hamburger"`           | `NavWithMobile` in client component             |

---

## 8. Implementation checklist

- **Core (types/schema)**
  - [x] Extend `LandingConfig.theme` with `themeId?`, `fontId?`.
  - [x] Add `SectionBase.effects?` and `SectionBase.animation?`.
  - [x] Add `NavSection.mobile?` (menu, sheetPosition).
  - [x] Hero `background`: `videoOptions?` (poster, muted, loop, autoplay), `lottieOptions?` (loop, autoplay).

- **Components**
  - [x] **Nav**: desktop-only in default `Nav`. For `mobile.menu === "hamburger"`, the app must render from a **client boundary** and use **NavWithMobile** from `@duytran7/landing-components/nav-mobile`. Example: client component that for `section.type === "nav" && section.mobile?.menu === "hamburger"` renders `<NavWithMobile config={section} />`, else `<SectionRenderer section={section} />`.
  - [x] Hero: use `background.videoOptions` (poster, muted, loop, autoplay) and `background.lottieOptions` (data attributes for app Lottie injection).
  - [x] Section animation + effects: **LandingPageWithAnimations** from `@duytran7/landing-next/client` wraps sections with framer-motion (enter: fade, fade-up, fade-down, slide-left, slide-right), parallax, float, mouseAware.

- **App (demo or host)**
  - [x] **LandingThemeProvider** from `@duytran7/landing-next/client`: read `config.theme.themeId` / `fontId` (or URL), apply `data-theme` and optional `fontClassName`.
  - [x] **LottieInjector** from `@duytran7/landing-components/lottie`: add once in layout (client); finds `[data-landing-bg="lottie"]` and injects Lottie player using `data-lottie-url` / `data-lottie-loop` / `data-lottie-autoplay`.
  - [x] Parallax/float/mouseAware: use **LandingPageWithAnimations** (client) instead of `LandingPage` when config has `section.animation` or `section.effects`.

---

This keeps **state** clear (local vs context vs builder) and **rich UI** (Lottie, video, effects, responsive nav, theme/font) defined in config and implemented in components + app without bloating the core library. See **§3 Code examples** for copy-paste usage, **§4–5** for performance and extending, **§6** for common issues, and **§7** for a one-glance reference.
