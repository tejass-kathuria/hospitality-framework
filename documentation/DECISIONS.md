# DECISIONS.md

> This document records the reasoning behind major architectural, technical, and design decisions made throughout the project.
>
> Its purpose is to preserve context over time so future decisions are made with an understanding of why previous ones were made.
>
> This file should only be updated when a significant long-term decision changes the direction or architecture of the project.

---

# Initial Architecture Decisions

---

## Project Philosophy

**Status**

Accepted

**Decision**

Build a reusable hospitality website framework rather than a single client website.

**Reasoning**

The long-term objective is to reuse the same technical foundation across multiple hospitality businesses.

Instead of rebuilding every website from scratch, new projects should primarily involve changing branding, content, layout, imagery, typography, and styling.

This approach improves development speed while maintaining high quality and consistency.

---

## Section-Based Architecture

**Status**

Accepted

**Decision**

Organize the application into independent website sections instead of tightly coupled pages.

Examples:

- Hero
- About
- Menu
- Gallery
- Testimonials
- Contact

**Reasoning**

Hospitality websites frequently require sections to be added, removed, reordered, or customized.

Independent sections simplify maintenance and make customization significantly easier.

---

## Configuration-Driven Content

**Status**

Accepted

**Decision**

Business information should remain separate from UI components.

Initially, content will be stored inside configuration files.

Future versions may replace configuration files with APIs, databases, or a CMS.

**Reasoning**

The frontend should never depend on where the data comes from.

Keeping presentation independent from the data source allows future architectural changes with minimal impact on the UI.

---

## Reusable Components

**Status**

Accepted

**Decision**

Design components for reuse across multiple websites instead of individual pages.

**Reasoning**

Reducing duplication improves maintainability and allows future client websites to share the same component library.

---

# Technology Decisions

---

## React

**Status**

Accepted

**Decision**

Use React.

**Alternatives Considered**

- Vanilla JavaScript
- Vue
- Angular

**Reasoning**

React's component-based architecture naturally supports reusable UI, scalable development, and maintainable code.

It is also one of the most widely adopted frontend libraries in the industry.

---

## Vite

**Status**

Accepted

**Decision**

Use Vite as the build tool.

**Alternatives Considered**

- Create React App
- Next.js

**Reasoning**

Vite provides an extremely fast development experience with minimal configuration.

It fits the current requirements without introducing unnecessary complexity.

---

## JavaScript

**Status**

Accepted

**Decision**

Use JavaScript instead of TypeScript.

**Alternatives Considered**

- TypeScript

**Reasoning**

The current priority is mastering React fundamentals and shipping client projects efficiently.

Introducing TypeScript at this stage would increase complexity without providing proportional value.

TypeScript remains a possible future migration.

---

## Tailwind CSS

**Status**

Accepted

**Decision**

Use Tailwind CSS.

**Alternatives Considered**

- CSS Modules
- SCSS
- Styled Components

**Reasoning**

Tailwind enables rapid development while maintaining a consistent design system.

Its utility-first approach supports reusable components and straightforward customization.

---

## Backend Strategy

**Status**

Accepted

**Decision**

Delay backend development until the frontend architecture is mature.

**Reasoning**

The current objective is building a production-quality frontend framework.

Backend functionality should only be introduced when it clearly adds value.

No backend technology has been finalized.

Current candidates include:

Backend

- Express.js
- Fastify

Database

- MongoDB
- PostgreSQL

---

# Design Decisions

---

## Personality Over Uniformity

**Status**

Accepted

**Decision**

Every business should have its own visual identity.

**Reasoning**

The framework should never force every client into the same visual style.

Instead, architecture should remain reusable while branding, layout, typography, imagery, and visual language communicate each client's unique personality.

Examples include:

- Minimal Scandinavian Café
- Traditional Indian Restaurant
- Luxury Fine Dining
- Japanese Retro Café
- Modern South Delhi Café
- Industrial Cocktail Bar

---

## Mobile-First Development

**Status**

Accepted

**Decision**

Develop mobile-first.

**Reasoning**

Hospitality websites receive a significant percentage of traffic from mobile devices.

Desktop layouts should progressively enhance the mobile experience instead of driving it.

---

## Motion & Animation

**Status**

Accepted

**Decision**

Animations should improve usability rather than attract attention.

**Reasoning**

Subtle motion improves perceived quality while preserving usability, accessibility, and performance.

---

## Global Accessibility & Error Handling Strategy

**Status**

Accepted

**Decision**

Enforce strict reduced-motion adherence globally using `<MotionConfig reducedMotion="user">` and CSS media queries. Implement `ErrorBoundary` at the application root and a dedicated `NotFound` route for client-side navigation.

**Reasoning**

Hospitality websites serve a diverse public audience across mobile and desktop devices. Accessibility preferences (such as vestibular disorders requiring reduced motion) must be respected by default across all animations. Error boundaries prevent catastrophic white-screen failures, and proper 404 handling ensures graceful navigation recovery without backend dependencies.

---

# Project Documentation Strategy

---

## Documentation Philosophy

**Status**

Accepted

**Decision**

Maintain dedicated project documentation for architecture, client information, progress, and development guidelines.

**Reasoning**

The project will be developed over a long period and may involve multiple AI coding assistants.

Clear documentation reduces context loss and helps both humans and AI remain consistent.

Project documentation includes:

- README.md
- CLIENT.md
- HANDOFF.md
- AGENTS.md
- DECISIONS.md

---

# Decision Ownership

**Status**

Accepted

**Decision**

Architectural decisions should never be changed automatically.

**Reasoning**

AI assistants may suggest improvements, but major architectural changes must be intentional.

Every significant architectural change should include:

- reasoning
- alternatives considered
- an update to this document

Consistency is generally more valuable than novelty.

---

# Project Priorities

When multiple valid solutions exist, prioritize them in this order:

1. Maintainability
2. Readability
3. Reusability
4. Client Customization
5. Performance
6. Developer Experience

Optimize only when complexity is justified.

---

# Current Non-Goals

The project is **not currently intended** to include:

- Full CMS integration
- E-commerce
- Multi-language support
- Multi-tenant architecture
- Authentication
- Admin dashboard
- Analytics

These features may be introduced later when justified by project requirements.

---

# Guiding Principles

The following principles should influence future decisions.

- Prefer reusable solutions.
- Prefer readability over cleverness.
- Prefer composition over duplication.
- Separate content from presentation.
- Scale only when complexity is justified.
- Keep architecture simple.
- Avoid unnecessary dependencies.
- Design for maintainability.
- Preserve the personality of every business.
- Optimize for business value rather than technical novelty.

---

# Multi-Brand & Visual Identity Decisions

---

## Multi-Brand Token & Configuration Preset Architecture

**Status**

Accepted (Phase 7 - 2026-09-04)

**Decision**

Separate visual identity (colors, typography, radii, spacing) into CSS custom property stylesheets (`src/styles/tokens-*.css` imported via `src/styles/tokens.css`), and business content into modular preset directories (`src/config/presets/*` re-exported via `src/config/index.js`). Centralize active theme selection to one-line developer toggles in both entry files while maintaining 100% backward-compatible proxy re-exports for legacy imports.

**Reasoning**

To prove genuine reusability across multiple hospitality clients, distinct brands (such as a Modern Specialty Café and a Luxury Fine Dining & Wine Cellar) must be deployable on the exact same codebase without modifying or duplicating React components, sections, or application routing logic.

Driving all styling through CSS Custom Properties mapped to Tailwind v4 `@theme` and all content through standardized JavaScript configuration objects guarantees instant brand customization with zero runtime overhead or component refactoring. Switching an entire site between themes requires modifying only two lines of code (one in `src/styles/tokens.css` and one in `src/config/index.js`), leaving UI primitives and sections completely decoupled from specific brand identities.

---

## Dark Editorial Visual Identity for Café Preset

**Status**

Accepted (Phase 8 - 2026-10-15)

**Decision**

Redesign the default modern café theme (_Aura Coffee Roasters_) from a generic light aesthetic into a high-contrast dark editorial visual identity. Adopt typewriter display typography (`Special Elite`), uppercase monospace metadata kickers (`Space Mono` with `//` prefixes), sharp 2px architectural geometry (`0.125rem`), a burnt orange ember accent (`#C96A2B`) on obsidian/basalt surfaces (`#0d0d0e`, `#161619`), and asymmetric section layouts.

**Reasoning**

Specialty coffee venues possess distinct artisanal craft, provenance, and atmosphere. Moving away from standard SaaS or dashboard-like layouts to an editorial composition with expressive typography and tactile micro-interactions better communicates authenticity and craftsmanship, fulfilling the core principle of creating websites with distinct personality.

---

## External Design Exploration via Google Stitch MCP

**Status**

Accepted (Post-Phase 8 - 2026-10-15)

**Decision**

Integrate Google Stitch via Stitch MCP as an external design exploration sandbox. Register a dedicated project (`Hospitality Framework - Aura Coffee`) and design system asset (`assets/14904771491707027720`) with a detailed `designMd` specification capturing the framework's visual identity, token mappings, typography scales, and component conventions.

**Reasoning**

Stitch provides an AI-assisted design space for rapid ideation and screen refinement without polluting or destabilizing the production React codebase. By registering the design system via MCP, external design concepts generated in Stitch can align with the framework's design tokens, while leaving implementation in React as a deliberate, manually reviewed engineering step. Stitch does not automatically generate or mutate application source files.

---

# When To Update This File

Update this document only when:

- Major technology choices change.
- Project architecture changes.
- Folder structure changes significantly.
- Design philosophy changes.
- Backend strategy changes.
- Documentation strategy changes.
- A long-term engineering decision is made.

Do **not** update this document for:

- Bug fixes
- Styling changes
- Small refactors
- Feature additions
- Daily development progress

Those belong in **HANDOFF.md** or a future **CHANGELOG.md** instead.
