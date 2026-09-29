# AGENTS.md

# AI Development Guide

This document defines how AI assistants should work on this repository.

It exists to reduce context loss, maintain consistency across development sessions, and ensure every AI contributes to the project using the same philosophy and architecture.

---

# Project Overview

This project is a modular website framework for hospitality businesses.

Target businesses include:

- Cafés
- Restaurants
- Bars
- Lounges
- Fine Dining

This is **not** a generic website template.

The objective is to create websites with their own identity, atmosphere, and personality while maintaining a reusable architecture underneath.

Think of this project as a framework for building client websites rather than a single website.

---

# Project Philosophy

The framework should disappear behind the client's brand.

Each business should feel unique.

Changing a business should involve changing data, branding, layout, imagery, typography and visual language—not rebuilding the application.

Architecture should always prioritize:

- Reusability
- Scalability
- Maintainability
- Readability
- Customization

---

# Before Writing Code

Always read these files first.

1. README.md
2. CLIENT.md
3. HANDOFF.md
4. DECISIONS.md

Do not begin implementing features before understanding the current project state.

---

# Tech Stack

Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Motion
- React Router
- Lucide React
- React Hook Form

Backend (Future)

- Node.js
- Express.js
- MongoDB

Deployment

- Vercel

---

# Coding Principles

## 1. Never duplicate code.

If a component can be reused, reuse it.

---

## 2. Components should do one thing well.

Prefer multiple small components over one large component.

---

## 3. Separate content from presentation.

Business information should never be hardcoded inside UI components unless absolutely necessary.

---

## 4. Keep components generic.

Instead of building:

CoffeeMenu.jsx

Prefer:

MenuSection.jsx

The same component should work for cafés, restaurants and bars.

---

## 5. Mobile First

Design for mobile first.

Desktop enhancements come afterwards.

---

## 6. Accessibility

Always consider:

- semantic HTML
- keyboard navigation
- aria labels where appropriate
- sufficient color contrast

---

## 7. Keep dependencies minimal.

Do not install a package if native React or JavaScript can solve the problem cleanly.

---

## 8. Keep animations tasteful.

Animations should support the experience.

They should never become the experience.

Avoid excessive motion.

---

## Folder Responsibilities

### components/

Reusable UI components.

Examples

- Button
- Card
- Input
- Modal
- Navbar

---

### sections/

Entire website sections.

Examples

- Hero
- About
- Gallery
- Testimonials
- Contact

---

### config/

Business data.

Examples

- business.js
- menu.js
- testimonials.js
- gallery.js

Future versions may replace these with API calls.

---

### assets/

Images

Fonts

Icons

Static assets

---

### hooks/

Reusable custom React hooks.

---

### utils/

Utility functions.

Formatting.

Helpers.

Constants.

---

### styles/

Global styles.

Tailwind configuration.

Variables.

---

# Design Principles

The framework should support many visual identities.

Examples include:

Minimal Scandinavian Café

Luxury Fine Dining

Traditional Indian Restaurant

Modern South Delhi Café

Japanese Retro Coffee Shop

Industrial Cocktail Bar

Do not optimize the framework for one aesthetic.

Optimize it for adaptability.

---

# Component Guidelines

Before creating a new component, ask:

Can an existing component be reused?

Can this become configurable?

Will another business benefit from this abstraction?

If yes, reuse.

If no, create.

---

# When Making Changes

Do not rewrite working code unless there is a clear benefit.

Avoid unnecessary refactoring.

Respect existing architecture.

Small improvements are preferred over massive rewrites.

---

# If You Encounter Bugs

Fix the root cause.

Avoid temporary workarounds unless documented.

If a workaround is necessary:

- explain why
- document it in HANDOFF.md

---

# If Requirements Are Unclear

Do not invent major functionality.

Instead:

- make reasonable assumptions
- document those assumptions
- keep implementations flexible

---

# Documentation Responsibilities

If significant work is completed:

Update

- HANDOFF.md

If architecture changes:

Update

- DECISIONS.md

If setup changes:

Update

- README.md

If client requirements change:

Update

- CLIENT.md

---

# Code Style

Prioritize

- readability
- consistency
- descriptive naming
- maintainability

Avoid

- deeply nested components
- duplicated logic
- unnecessary abstractions
- magic numbers
- commented-out dead code

---

# Future Vision

The project should eventually support:

- Reservation system
- Admin dashboard
- CMS integration
- Multiple themes
- Multiple layouts
- Authentication
- Analytics
- SEO improvements

Current implementation should not make these difficult to add later.

---

# Success Criteria

A new client website should require changing:

- branding
- content
- images
- colors
- typography
- layout configuration

—not rewriting the application.

The framework should scale as more business templates are added while maintaining a consistent architecture.

---

# Final Rule

Whenever possible, make decisions that benefit Future You.

Write code that another developer—or another AI—can understand months later without needing additional explanation.
