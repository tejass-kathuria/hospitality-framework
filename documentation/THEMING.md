# Theming & Brand Customization Guide

## 1. Architecture Overview

The Hospitality Framework is engineered with complete separation between **presentation logic** (React UI primitives, layout wrappers, section components) and **brand configuration** (visual design tokens, business data, menu items, imagery, and event schedules).

This architecture allows any hospitality business—such as a specialty coffee roastery, a Michelin-caliber fine dining restaurant, a cocktail lounge, or a boutique bakery—to be fully deployed using the exact same underlying codebase with zero component modifications.

```
┌────────────────────────────────────────────────────────┐
│                   React Application                    │
│   (App.jsx, Section Registry, Shared UI Primitives)    │
└───────────────────────▲────────────────────────────────┘
                        │
         ┌──────────────┴──────────────┐
         │                             │
┌────────┴─────────┐         ┌─────────┴──────────┐
│   Design Tokens  │         │  Business Config   │
│  src/styles/     │         │   src/config/      │
│  (CSS Variables) │         │   (JS Presets)     │
└──────────────────┘         └────────────────────┘
```

---

## 2. Design Token System

The styling layer uses **Tailwind CSS v4** coupled with CSS Custom Properties defined in `src/styles/`.

### 2.1 Token Categories

Every theme defines a comprehensive set of semantic variables:

| Variable                    | Description                          | Example (Café - Aura Coffee)             | Example (Fine Dining - Nocturne) |
| :-------------------------- | :----------------------------------- | :--------------------------------------- | :------------------------------- |
| `--client-color-primary`    | Main brand accent / active states    | `#C96A2B` (Burnt Orange)                 | `#c5a059` (Warm Gold)            |
| `--client-color-secondary`  | Supporting divider / secondary tone  | `#242428` (Hairline Border Charcoal)     | `#e6c887` (Champagne)            |
| `--client-color-accent`     | Highlights, badges, hover accents    | `#e6a15c` (Warm Honey/Amber)             | `#232220` (Bronze Black)         |
| `--client-color-bg`         | Main canvas background               | `#0d0d0e` (Obsidian Black)               | `#0c0c0e` (Obsidian)             |
| `--client-color-surface`    | Card / compartment background        | `#161619` (Matte Basalt Surface)         | `#141418` (Charcoal)             |
| `--client-color-text-main`  | Primary reading text                 | `#ece8e1` (Weathered Chalk / Off-White)  | `#f5f2eb` (Alabaster)            |
| `--client-color-text-muted` | Secondary / caption text             | `#a8a49a` (Warm Stone / Sand Slate)      | `#9e988f` (Warm Silver)          |
| `--client-color-text-light` | Inverted / hero pure light text      | `#ffffff` (Pure White)                   | `#ffffff`                        |
| `--client-font-heading`     | Display & section header font        | `'Special Elite', monospace`             | `'Cinzel', 'Playfair Display'`   |
| `--client-font-body`        | Body & UI font                       | `'Inter'`                                | `'Inter'`                        |
| `--client-font-mono`        | Monospace & technical metadata font  | `'Space Mono', monospace`                | `ui-monospace, monospace`        |
| `--client-radius-base`      | Corner roundness for cards & buttons | `0.125rem` (Sharp 2px)                   | `0.25rem` (Sharp 4px)            |
| `--client-spacing-section`  | Default vertical section padding     | `6rem`                                   | `6rem`                           |
| `--client-container-max`    | Maximum container width              | `1240px`                                 | `1240px`                         |
| `--client-transition-base`  | Standard animation timing            | `200ms cubic-bezier(0.16, 1, 0.3, 1)`    | `350ms cubic-bezier(0.25, ...)`  |

### 2.2 Tailwind Integration

In `src/index.css`, Tailwind v4 binds `@theme` utility tokens directly to these custom properties:

```css
@import 'tailwindcss';
@import './styles/tokens.css';

@theme {
  /* Colors */
  --color-primary: var(--client-color-primary);
  --color-secondary: var(--client-color-secondary);
  --color-accent: var(--client-color-accent);
  --color-bg: var(--client-color-bg);
  --color-surface: var(--client-color-surface);
  --color-text-main: var(--client-color-text-main);
  --color-text-muted: var(--client-color-text-muted);
  --color-text-light: var(--client-color-text-light);

  /* Typography */
  --font-heading: var(--client-font-heading);
  --font-body: var(--client-font-body);
  --font-mono: var(
    --client-font-mono,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    monospace
  );

  /* Layout */
  --spacing-section: var(--client-spacing-section);

  /* Geometry */
  --radius-theme: var(--client-radius-base);
}
```

Components simply apply utilities such as `bg-bg`, `bg-surface`, `bg-primary`, `text-text-main`, `text-text-muted`, `font-heading`, `font-mono`, and `rounded-theme`.

---

## 3. Configuration Preset Structure

Business content is organized into discrete preset directories inside `src/config/presets/`:

```
src/config/
├── index.js                      # Active preset barrel switcher
├── business.js                   # Backwards-compatible proxy export
├── navigation.js                 # Backwards-compatible proxy export
├── menu.js                       # Backwards-compatible proxy export
├── gallery.js                    # Backwards-compatible proxy export
├── testimonials.js               # Backwards-compatible proxy export
├── events.js                     # Backwards-compatible proxy export
├── sections.js                   # Backwards-compatible proxy export
└── presets/
    ├── cafe/                     # Default Modern Café Theme
    │   ├── business.js
    │   ├── navigation.js
    │   ├── menu.js
    │   ├── gallery.js
    │   ├── testimonials.js
    │   ├── events.js
    │   ├── sections.js
    │   └── index.js
    └── finedining/                # Luxury Fine Dining & Cellar Theme
        ├── business.js
        ├── navigation.js
        ├── menu.js
        ├── gallery.js
        ├── testimonials.js
        ├── events.js
        ├── sections.js
        └── index.js
```

### 3.1 Preset File Responsibilities

1. **`business.js`**: Core business identity (name, tagline, description, address, phone, email, opening hours, social links, hero headline/CTA/background, and about story/stats/images).
2. **`navigation.js`**: Header navigation link IDs, labels, and primary header CTA button.
3. **`menu.js`**: Section title, subtitle, categories (`id`, `name`), and menu items array (`id`, `name`, `category`, `price`, `description`, `dietary`, `featured`, `image`).
4. **`gallery.js`**: Section title, subtitle, and image grid array (`id`, `title`, `category`, `src`, `alt`).
5. **`testimonials.js`**: Section title, subtitle, and reviews list (`id`, `author`, `role`, `text`, `rating`, `avatar`).
6. **`events.js`**: Section title, subtitle, and event schedule (`id`, `title`, `date`, `time`, `description`, `image`, `category`, `cta`).
7. **`sections.js`**: Section registry controlling which sections are enabled, their render order, navigation IDs, and corresponding component names.
8. **`index.js`**: Barrel export aggregating all configurations into a unified module.

---

## 4. Switching Between Built-in Themes

Theme switching in the Hospitality Framework is a **developer-controlled, build-time / configuration toggle** rather than a dynamic client-facing dropdown. This ensures production deployments remain lightweight, compile only the active brand's assets, and keep administrative branding decisions strictly in the hands of the site developer.

Switching the entire application between themes takes just two lines across two entry files:

### Step 1: Switch Design Tokens (`src/styles/tokens.css`)

```css
/* For Modern Specialty Café (Aura Coffee Roasters) */
@import './tokens-cafe.css';
/* @import './tokens-finedining.css'; */

/* OR for Luxury Fine Dining (Nocturne Restaurant) */
/* @import './tokens-cafe.css'; */
@import './tokens-finedining.css';
```

### Step 2: Switch Business Content (`src/config/index.js`)

```javascript
/* For Modern Specialty Café (Aura Coffee Roasters) */
export * from './presets/cafe/index.js'
// export * from './presets/finedining/index.js'

/* OR for Luxury Fine Dining (Nocturne Restaurant) */
// export * from './presets/cafe/index.js'
export * from './presets/finedining/index.js'
```

---

## 5. Creating a New Brand / Theme (Step-by-Step)

To create a brand-new theme (e.g., _Artisan Cocktail Lounge_ or _Artisanal Bakery_):

### Step 1: Font Loading (`index.html`)

If the new theme uses custom typography families not already loaded, include their font stylesheets in `index.html` (e.g., via Google Fonts `<link>` tags) or via CSS `@import`:

```html
<!-- Example: Loading Syne and DM Sans in index.html -->
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Syne:wght@400..800&display=swap"
  rel="stylesheet"
/>
```

### Step 2: Create the Token Stylesheet

Create `src/styles/tokens-cocktail.css`:

```css
:root {
  --client-color-primary: #e07a5f;
  --client-color-secondary: #3d405b;
  --client-color-accent: #81b29a;
  --client-color-bg: #1f2421;
  --client-color-surface: #2b302c;
  --client-color-text-main: #f4f1de;
  --client-color-text-muted: #a3a099;
  --client-color-text-light: #ffffff;
  --client-font-heading: 'Syne', sans-serif;
  --client-font-body: 'DM Sans', sans-serif;
  --client-font-mono: 'Space Mono', monospace;
  --client-spacing-section: 6rem;
  --client-container-max: 1200px;
  --client-radius-base: 0.5rem;
  --client-transition-base: 250ms ease;
}
```

### Step 3: Create the Preset Folder

Create `src/config/presets/cocktail/` and populate:

- `business.js`
- `navigation.js`
- `menu.js`
- `gallery.js`
- `testimonials.js`
- `events.js`
- `sections.js`
- `index.js`

### Step 4: Activate the Theme

Update `src/styles/tokens.css` and `src/config/index.js` to point to the new files:

```css
/* src/styles/tokens.css */
@import './tokens-cocktail.css';
```

```javascript
/* src/config/index.js */
export * from './presets/cocktail/index.js'
```

### Step 5: Verify the Theme

Run the project verification commands to confirm there are no syntax errors, missing exports, or broken imports:

```bash
npm run lint
npm run build
```

---

## 6. Architectural Boundaries

To preserve strict reusability across all current and future themes:

- **DO NOT hardcode** business names, copy, prices, phone numbers, addresses, or images inside UI primitives (`src/components/ui/`) or sections (`src/sections/`).
- **DO NOT hardcode** raw hex codes or fixed font families inside section JSX. Always use semantic Tailwind classes (`bg-bg`, `bg-surface`, `bg-primary`, `text-text-main`, `text-text-muted`, `font-heading`, `font-mono`, `rounded-theme`).
- **DO NOT break prop interfaces** on section components. Sections must continue accepting an optional `config` prop and fallback to the centralized `config/index.js` exports.
