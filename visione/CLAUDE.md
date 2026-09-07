# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Run everything from `visione/` (this directory), **not** from the git root. `pnpm` is the pinned package manager (`pnpm@11.20.0`).

```bash
pnpm dev      # next dev — http://localhost:3000
pnpm build    # next build
pnpm start    # serve the production build
pnpm lint     # eslint (flat config)
```

There is no test framework configured — no test runner, no test files, no `test` script. Don't invent a `pnpm test` invocation; if tests are needed, the harness has to be added first.

## Repository layout

The git root is `Project Visione/`, one level **above** the Next.js app in `visione/`. Consequences worth knowing before touching git:

- Paths in `git status` / `git diff` are prefixed `visione/…` even when your shell is inside `visione/`.
- The git root holds a stray `package.json` (gsap only), a `pnpm-lock.yaml`, and a **committed `node_modules/`** — the app's `.gitignore` lives in `visione/` and does not cover the parent. This is accidental leftovers from an install run at the wrong level, not a workspace. All real dependency work belongs in `visione/package.json`.
- `visione/pnpm-workspace.yaml` exists but declares no packages — only `allowBuilds` flags disabling the `sharp` and `unrs-resolver` build scripts.

## Documentation (`docs/`)

`visione/docs/` is the home for all durable project documentation — design system, product decisions, brand references, implementation notes. It is written in Spanish; this file and the code stay in English.

- `docs/README.md` — index. Every new document gets a row in its table, in the same commit that adds the document.
- `docs/Design System.md` — the Visione design system as actually applied: the five brand colors and the amber rule, Barlow Condensed / Semi Condensed with fluid `clamp()` scales, container widths and vertical rhythm, which system components are in use, radii/shadows, logo assets, and a closing list of deliberate deviations and open brand caveats.

Read `docs/Design System.md` **before** writing any UI, styling, or design-token code — its color, type, spacing and component rules take precedence over generic defaults. Sections 1–9 document the `.dc.html` prototype and its separate design-system bundle, not the app in `app/`; section 10 records how that bundle was translated into this codebase. When porting a new rule, translate it into the Tailwind v4 `@theme inline` tokens in `app/globals.css` rather than copying the prototype's inline `var(--*)` styles.

Filenames are readable Spanish titles with spaces (`Design System.md`), so escape them as `%20` in Markdown links and quote them in shell commands. When a document and the code disagree, the code wins — fix the document.

## Architecture

Next.js 16 App Router application. There is no `src/` directory, no API routes, no server actions, and no state management beyond React hooks.

- `app/layout.tsx` — root layout. Loads Barlow Condensed (display) and Barlow Semi Condensed (UI/body) via `next/font/google` into CSS variables, and sets `h-full` on `<html>` with `min-h-full flex flex-col` on `<body>`. **Any full-height page layout depends on those two classes** — a child using `h-*` percentages resolves against them; pages take the remaining height with `flex-1` on their `<main>`.
- `app/page.tsx` — home. A server component that composes `SiteHeader`, the sections of `components/home/` and `SiteFooter`. It is the port of the `Visione Sitio Web.dc.html` prototype.
- `app/contador/page.tsx` — the GSAP demo route. Server component; it only frames the client island. Nothing on the site links to it.
- `app/globals.css` — Tailwind entry, brand tokens, theme tokens, and the one loose rule of the project (`.header-rail`).
- `components/ui/` — design system pieces, no business logic, named exports, no `"use client"` except `Accordion.tsx`, which owns its open state (see the `componentes-ui` skill in `.claude/skills/`). `Button.tsx` also exports `getButtonClassName()`, which is what lets `ButtonLink` wear the same styling on an `<a>` without duplicating classes.
- `components/home/` — one component per section of the home page.
- `components/SiteHeader.tsx` · `components/SiteFooter.tsx` — site chrome. The header is a client component (dropdown and mobile menu).
- `components/ClickCounter.tsx` — the click counter of `/contador`: state and both GSAP animations.
- `lib/content.ts` — the copy that appears more than once (the ten programmes, the resolutions, the FAQ). A desynchronised copy of that list is a silent bug.
- `public/assets/` — brand files pulled from the design project: the two lockups and the two V marks.

**Pages stay server components.** Interactivity lives in a component under `components/`, imported into the page — that keeps `"use client"` off the route so it can prerender (both routes are static in `next build`). On the home page only `SiteHeader`, `HeroSection` and `AboutSection` are client islands.

### Next.js 16 specifics

Per `AGENTS.md` above, this is not the Next.js in your training data — read `node_modules/next/dist/docs/` (start at `index.md`, then `01-app/`) before writing framework code. Things already visible in this codebase that differ from older Next:

- Layout props use the generated global type `LayoutProps<"/">` rather than a hand-written `{ children }` interface. Route types are generated into `.next/types/` and `.next/dev/types/`, both wired into `tsconfig.json` `include`.
- `AGENTS.md` is regenerated by `next dev` (see `node_modules/next/dist/server/lib/generate-agent-files.js`). Deleting it from a diff just recreates an uncommitted change — commit it alongside your work instead. Don't put project guidance in `AGENTS.md`; it gets overwritten. This file is the durable place.

### Tailwind CSS v4

There is **no `tailwind.config.js`** — v4 is configured in CSS. `app/globals.css` declares the raw brand values in `:root` and an `@theme inline` block maps them into Tailwind tokens — colours, the two font families, the condensed type scale, leading, tracking, radii, shadows, container widths, easings and the `nav` breakpoint (980px, where the desktop navigation appears). PostCSS wires it up through `@tailwindcss/postcss` in `postcss.config.mjs`. Add design tokens in `@theme inline`, not in a JS config.

Two traps worth knowing:

- **Don't reuse Tailwind's own token names for different values.** The design system's containers are `tight`/`narrow`/`content`/`rail` precisely so that `max-w-lg` keeps meaning 32rem. The type scale (`--text-sm: 15px`) *does* override the defaults on purpose — that is the system's scale.
- **Conflicting utilities resolve by stylesheet order, not by the order you write them in `className`.** Two `border-color` classes on the same element is a coin flip: give each variant its own colour instead of setting a default in a base string and overriding it (see `components/ui/Button.tsx`).

Note that `globals.css` sets `body { background: var(--background) }`, which is white — the design system has no dark theme and `color-scheme` is pinned to `light`. Page-level background classes paint on top of that white base.

### GSAP animation pattern

Animations use `gsap` with the `@gsap/react` `useGSAP` hook. Call `gsap.registerPlugin(useGSAP)` once at module scope, not inside the component body. Two distinct cases, both present in `components/ClickCounter.tsx`:

- **Reactive animations** — run inside `useGSAP(fn, { scope, dependencies })`. `scope` is a ref to the container so GSAP cleans up its tweens on unmount; `dependencies` re-runs the effect (e.g. re-animating the counter text when the count changes).
- **Event-handler animations** — must be wrapped in `contextSafe()`, destructured from the `useGSAP` return value, so the tween is registered with the same context and cleaned up too. A raw `gsap.to()` inside an `onClick` leaks out of the scope.

Every animated element needs its own `useRef`; the animation targets `ref.current`, so a ref dropped from a JSX element silently makes its animation a no-op rather than an error.

Scroll-linked movement uses `ScrollTrigger` (`import { ScrollTrigger } from "gsap/ScrollTrigger"`, registered alongside `useGSAP`), created inside `useGSAP` so the context reverts it. Two things bite here:

- If the element already carries a transform from a Tailwind class (`translate-x-full`), GSAP reads it as a pixel offset and **adds** it to whatever you tween. Pass `x: 0` explicitly in the tween vars to clear it.
- Anything measured from laid-out text has to be re-measured after the webfonts load: `document.fonts.ready.then(() => ScrollTrigger.refresh())`.

One exception: when the animated element is the one that fired the event, animate `event.currentTarget` instead of a ref. ESLint's `react-hooks/refs` rule errors on a ref read inside a `contextSafe()` callback, because `contextSafe` runs during render — `currentTarget` sidesteps it and drops a ref.
