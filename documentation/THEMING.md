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

| Variable                    | Description                          | Example (Café)         | Example (Fine Dining)          |
| :-------------------------- | :----------------------------------- | :--------------------- | :----------------------------- |
| `--client-color-primary`    | Main brand accent / active states    | `#2c2c2a`              | `#c5a059` (Warm Gold)          |
| `--client-color-secondary`  | Supporting accent tone               | `#8c827a`              | `#e6c887` (Champagne)          |
| `--client-color-accent`     | Highlights, badges, hover accents    | `#d97736`              | `#232220` (Bronze Black)       |
| `--client-color-bg`         | Main canvas background               | `#faf8f5` (Warm Cream) | `#0c0c0e` (Obsidian)           |
| `--client-color-surface`    | Card / elevation background          | `#ffffff`              | `#141418` (Charcoal)           |
| `--client-color-text-main`  | Primary reading text                 | `#1a1a18`              | `#f5f2eb` (Alabaster)          |
| `--client-color-text-muted` | Secondary / caption text             | `#6b665f`              | `#9e988f` (Warm Silver)        |
| `--client-color-text-light` | Inverted / hero light text           | `#ffffff`              | `#ffffff`                      |
| `--client-font-heading`     | Display & section header font        | `'Plus Jakarta Sans'`  | `'Cinzel', 'Playfair Display'` |
| `--client-font-body`        | Body & UI font                       | `'Inter'`              | `'Inter'`                      |
| `--client-radius-base`      | Corner roundness for cards & buttons | `0.75rem` (Soft)       | `0.25rem` (Sharp)              |
| `--client-spacing-section`  | Default vertical section padding     | `6rem`                 | `6rem`                         |
| `--client-container-max`    | Maximum container width              | `1200px`               | `1240px`                       |
| `--client-transition-base`  | Standard animation timing            | `200ms ease`           | `350ms cubic-bezier(...)`      |

### 2.2 Tailwind Integration

In `src/index.css`, Tailwind v4 binds `@theme` utility tokens directly to these custom properties:

```css
@import './styles/tokens.css';
@import 'tailwindcss';

@theme {
  --color-client-primary: var(--client-color-primary);
  --color-client-secondary: var(--client-color-secondary);
  --color-client-accent: var(--client-color-accent);
  --color-client-bg: var(--client-color-bg);
  --color-client-surface: var(--client-color-surface);
  --color-client-text-main: var(--client-color-text-main);
  --color-client-text-muted: var(--client-color-text-muted);
  --color-client-text-light: var(--client-color-text-light);
  --font-heading: var(--client-font-heading);
  --font-body: var(--client-font-body);
  --radius-client: var(--client-radius-base);
}
```

Components simply apply utilities such as `bg-client-bg`, `text-client-main`, `bg-client-surface`, `rounded-client`, and `font-heading`.

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

Switching the entire application between themes takes just two lines across two entry files:

### Step 1: Switch Design Tokens (`src/styles/tokens.css`)

```css
/* For Modern Specialty Café */
@import './tokens-cafe.css';
/* @import './tokens-finedining.css'; */

/* OR for Luxury Fine Dining */
/* @import './tokens-cafe.css'; */
@import './tokens-finedining.css';
```

### Step 2: Switch Business Content (`src/config/index.js`)

```javascript
/* For Modern Specialty Café */
export * from './presets/cafe/index.js'
// export * from './presets/finedining/index.js'

/* OR for Luxury Fine Dining */
// export * from './presets/cafe/index.js'
export * from './presets/finedining/index.js'
```

---

## 5. Creating a New Brand / Theme (Step-by-Step)

To create a brand-new theme (e.g., _Artisan Cocktail Lounge_ or _Artisanal Bakery_):

### Step 1: Create the Token Stylesheet

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
  --client-spacing-section: 6rem;
  --client-container-max: 1200px;
  --client-radius-base: 0.5rem;
  --client-transition-base: 250ms ease;
}
```

### Step 2: Create the Preset Folder

Create `src/config/presets/cocktail/` and populate:

- `business.js`
- `navigation.js`
- `menu.js`
- `gallery.js`
- `testimonials.js`
- `events.js`
- `sections.js`
- `index.js`

### Step 3: Activate the Theme

Update `src/styles/tokens.css` and `src/config/index.js` to point to the new files.

---

## 6. Architectural Boundaries

To preserve strict reusability across all current and future themes:

- **DO NOT hardcode** business names, copy, prices, phone numbers, addresses, or images inside UI primitives (`src/components/ui/`) or sections (`src/sections/`).
- **DO NOT hardcode** raw hex codes or fixed font families inside section JSX. Always use semantic Tailwind classes (`bg-client-bg`, `text-client-main`, `font-heading`, `rounded-client`).
- **DO NOT break prop interfaces** on section components. Sections must continue accepting an optional `config` prop and fallback to the centralized `config/index.js` exports.
