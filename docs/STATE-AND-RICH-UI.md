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

## 3. Implementation checklist

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

This keeps **state** clear (local vs context vs builder) and **rich UI** (Lottie, video, effects, responsive nav, theme/font) defined in config and implemented in components + app without bloating the core library.
