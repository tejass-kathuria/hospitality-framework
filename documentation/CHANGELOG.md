# CHANGELOG.md

> This document records significant changes made throughout the project's development.
>
> Unlike `HANDOFF.md`, which tracks the current development session, this file records completed milestones across the lifetime of the project.
>
> Only notable changes should be added here.
>
> Small bug fixes, styling tweaks, or temporary experiments do not belong in this document.

---

# Version History

---

## [Unreleased]

### Planned

- Production deployment & custom domain setup
- Reservation system
- CMS integration
- Admin dashboard
- Backend API & database services
- Analytics & conversion tracking

---

## [0.4.1] - 2026-10-17

### Added

- **Google Stitch MCP Design System Integration**:
  - Registered dedicated Stitch project `Hospitality Framework - Aura Coffee` (Project ID: `7323805666708853184`, Asset: `assets/14904771491707027720`).
  - Structured token mappings registered in Stitch (Dark mode, primary burnt orange `#C96A2B`, neutral `#ece8e1`, secondary `#242428`, tertiary `#e6a15c`, body `INTER`, headline proxy `COURIER_PRIME`, roundness `ROUND_FOUR`).
  - Authored comprehensive 12-section `designMd` specification codifying visual principles, type hierarchy, component conventions, and layout archetypes for external design exploration.

### Changed

- Polished Hero component styles and navigation link weights (`cd4a57b`).
- Merged `creative-redesign` feature branch into `main` via PR #1 (commit `a5b75ca`).

---

## [0.4.0] - 2026-10-15

### Added

- **Phase 8: Creative Redesign (Dark Editorial Visual Identity)**:
  - Transformed the default café preset into an editorial, dark hospitality aesthetic for _Aura Coffee Roasters_ (commit `34f7ed5`).
  - Adopted `Special Elite` typewriter display typography, `Space Mono` uppercase metadata kickers with `//` prefixes, and disciplined 2px architectural geometry (`--client-radius-base: 0.125rem`).
  - Added subtle atmospheric texture utilities in `src/index.css`: `.bg-raw-brick` and `.bg-raw-dots`.
  - Rebuilt Hero section with an asymmetric 12-column layout, operational context bar, framed café photography, interactive hover-to-orange Roast Profile card, and operational ticker.

### Changed

- Updated `src/styles/tokens-cafe.css` to dark editorial palette: burnt orange primary (`#C96A2B`), obsidian black canvas (`#0d0d0e`), matte basalt surface (`#161619`), weathered chalk text (`#ece8e1`), muted stone text (`#a8a49a`), and hairline charcoal dividers (`#242428`).
- Harmonized typography and component styling across About, Menu, Gallery, Testimonials, Events, Contact, Navbar, and Footer sections.

---

## [0.3.0] - 2026-09-04

### Added

- **Phase 7: Multi-Brand Theming Architecture**:
  - Extracted default café tokens into `src/styles/tokens-cafe.css`.
  - Created luxury fine dining tokens in `src/styles/tokens-finedining.css` (obsidian `#0c0c0e`, charcoal `#141418`, gold `#c5a059`, alabaster `#f5f2eb`, sharp 0.25rem radius, serif typography).
  - Modularized configuration presets into `src/config/presets/cafe/` and `src/config/presets/finedining/`.
  - Authored complete fine dining brand preset _Nocturne Restaurant & Wine Cellar_ (9-course tasting menu, Grand Cru sommelier pairings, subterranean cellar gallery, Michelin reviews, DRC retrospective dinners).
  - Implemented 2-step developer theme switcher via `src/styles/tokens.css` and `src/config/index.js` with 100% backward-compatible proxy re-exports.
  - Authored comprehensive developer theming manual in `documentation/THEMING.md`.

---

## [0.2.0] - 2026-08-15

### Added

- **Phases 1-6: Frontend Framework MVP, Sections, Orchestration & Polish**:
  - Reusable UI primitives in `src/components/ui/` (`Button`, `Badge`, `Container`, `SectionWrapper`, `SectionHeading`, `Card`, `Image`, `Skeleton`).
  - Independent section implementations in `src/sections/` (`Hero`, `About`, `Menu` with category filters, `Gallery` with lightbox modal, `Testimonials` with touch carousel, `Events`, and `Contact` with React Hook Form validation).
  - Dynamic page orchestrator in `src/App.jsx` reading from `sectionsConfig`.
  - Sticky accessible `Navbar`, multi-column `Footer`, and floating `ScrollToTop`.
  - Active section tracking with `useActiveSection` IntersectionObserver hook.
  - Scroll-triggered entrance animations via `AnimatedSection` using Motion.
  - Global accessibility and reduced-motion enforcement via `<MotionConfig reducedMotion="user">` and CSS `@media (prefers-reduced-motion: reduce)`.
  - Responsive audit across 375px–1440px viewport widths with horizontal overflow clipping.
  - Performance optimizations: skeleton loading states, asynchronous image decoding, high fetch priority on Hero LCP image.
  - SEO audit, Web Manifest, Error Boundary, and custom 404 page.

---

## [0.1.0] - 2026-07-14

### Added

- Project initialized.
- Repository created.
- Documentation system established.
- README.md
- AGENTS.md
- CLIENT.md
- HANDOFF.md
- DECISIONS.md
- CHANGELOG.md

### Architecture

- Selected React + Vite.
- Adopted Tailwind CSS.
- Established modular section-based architecture.
- Introduced configuration-driven content.
- Defined reusable component strategy.
- Adopted mobile-first development.

### Documentation

- Established documentation workflow.
- Defined AI development guidelines.
- Established architectural decision logging.
- Introduced development handoff process.

---

# Release Guidelines

Create a new version entry whenever one of the following occurs:

- Major feature completed.
- Architecture changes.
- Significant UI redesign.
- Backend milestone completed.
- Public release.
- Production deployment.

Each release should include only relevant sections.

Possible sections:

- Added
- Changed
- Improved
- Fixed
- Removed
- Deprecated
- Security

Not every release needs every section.

---

# Versioning

This project follows Semantic Versioning.

Format:

MAJOR.MINOR.PATCH

Examples:

- 1.0.0
- 1.1.0
- 1.1.1

Guidelines:

- **MAJOR**: Breaking architectural or API changes.
- **MINOR**: New features added without breaking existing functionality.
- **PATCH**: Bug fixes, performance improvements, and minor refinements.

---

# Changelog Principles

- Record outcomes, not implementation details.
- Keep entries concise and meaningful.
- Group related changes together.
- Write from the perspective of the project, not individual development sessions.
- Use past tense.
- Do not duplicate information already tracked in `HANDOFF.md`.

---

# Difference Between Documentation Files

- **README.md** — What the project is.
- **CLIENT.md** — Client requirements and business information.
- **AGENTS.md** — Development rules and workflow.
- **DECISIONS.md** — Why important decisions were made.
- **HANDOFF.md** — Current development state.
- **CHANGELOG.md** — Major milestones and completed releases.
