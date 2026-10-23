# Hospitality Website Framework

> Every café has a different feeling.
>
> Every restaurant tells a different story.
>
> **Its website should too.**

A modular, reusable website framework for hospitality businesses, designed to create websites with personality rather than generic templates.

> **Status:** Active Development

---

# Overview

This project is a reusable frontend framework for building modern hospitality websites.

It is designed for businesses such as:

- Cafés
- Coffee Shops
- Restaurants
- Fine Dining
- Bars
- Lounges

Unlike traditional templates that simply replace a logo and color palette, this framework is designed to express the unique atmosphere, identity, and personality of every business while sharing a common technical foundation.

The long-term vision is to build a framework that allows new client websites to be created quickly without sacrificing originality or quality.

---

# Why This Project Exists

There are countless hospitality website templates available.

Most of them look different but are built around the same rigid structure.

This project takes a different approach.

Instead of forcing businesses into a predefined design, it provides a flexible framework capable of adapting to different brands, stories, layouts, and visual identities.

The framework should disappear behind the personality of the business.

---

# Philosophy

Every hospitality business has its own character.

A quiet specialty coffee shop shouldn't feel like a lively cocktail bar.

A traditional Indian restaurant shouldn't feel like a minimalist Scandinavian café.

Rather than building one fixed design, this framework supports different visual styles, typography, imagery, layouts, animations, and branding while maintaining a reusable and scalable architecture.

---

# Goals

The framework is designed to:

- Build production-quality frontend architecture.
- Create a reusable foundation for freelance client work.
- Demonstrate scalable software architecture through a real-world project.
- Reduce development time for future client websites.
- Eventually evolve into a full-stack website platform.

---

# Core Principles

- Mobile-first development
- Component-driven architecture
- Configuration-driven content
- Reusable UI
- Accessibility by default
- Performance-focused development
- Separation of content and presentation

---

# Current Features (MVP)

## Website

- Responsive, mobile-first layout
- Hero section (asymmetric editorial split with direct context bar and interactive card)
- About section (narrative story, pull quotes, stat counters)
- Featured Menu (dynamic category tabs, dietary badges, origin notes)
- Gallery (category filters, responsive grid, accessible Lightbox modal)
- Testimonials (critic & guest reviews with touch-friendly carousel)
- Events section (chronological event cards with date stamps and CTAs)
- Contact section (React Hook Form validation, business hours, Google Maps embed)
- Footer (multi-column business metadata, hours, social links)

## User Experience & Accessibility

- Mobile-first navigation drawer with active section tracking
- Accessible modal image viewer (Lightbox) with focus lock
- Form validation via React Hook Form
- Skip-to-content accessibility link and visible keyboard focus rings
- Strict reduced-motion enforcement via `<MotionConfig reducedMotion="user">`
- Floating Scroll-to-Top trigger
- Asynchronous image decoding, skeleton loading states, and eager Hero LCP loading

## Architecture & Theming

- Multi-brand design token system (`src/styles/tokens-cafe.css`, `src/styles/tokens-finedining.css`)
- Modular configuration presets (`src/config/presets/cafe/`, `src/config/presets/finedining/`)
- Two complete built-in hospitality themes: _Aura Coffee Roasters_ (Dark Editorial) and _Nocturne Restaurant & Wine Cellar_ (Luxury Fine Dining)
- 2-step developer theme switcher (`src/styles/tokens.css` and `src/config/index.js`)
- Reusable UI primitives (`Button`, `Badge`, `Container`, `SectionWrapper`, `SectionHeading`, `Card`, `Image`, `Skeleton`)
- Error Boundary and custom 404 page

---

# Future Features

Planned additions include:

- Reservation System
- Contact Form Backend
- Newsletter Integration
- Admin Dashboard
- CMS Integration
- Menu Management
- Event Management
- Analytics Dashboard
- SEO Improvements
- Additional Brand Presets (expanding beyond the two existing Café and Fine Dining presets)
- Alternative Section Layout Presets

---

# Tech Stack

## Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- Motion
- React Router
- Lucide React
- React Hook Form

## Planned Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Resend / Nodemailer

## Deployment

- Vercel
- Railway / Render (Backend)

## Development Tools

- Git
- GitHub
- VS Code
- ESLint
- Prettier

---

# Architecture

The application is built around reusable website sections rather than fixed page implementations.

```text
App

├── Navbar
├── Hero
├── About
├── Featured Menu
├── Gallery
├── Testimonials
├── Events
├── Contact
└── Footer
```

Every section can be:

- Added
- Removed
- Reordered
- Customized

without affecting the overall application architecture.

---

# Project Structure

```text
src/

├── assets/

├── components/
│   ├── common/
│   ├── layout/
│   └── ui/

├── sections/
│   ├── Hero/
│   ├── About/
│   ├── Menu/
│   ├── Gallery/
│   ├── Events/
│   ├── Testimonials/
│   ├── Contact/
│   └── Footer/

├── config/
│   ├── business.js
│   ├── menu.js
│   ├── gallery.js
│   ├── testimonials.js
│   └── events.js

├── hooks/
├── utils/
├── styles/

├── App.jsx
└── main.jsx
```

---

# Customization

The framework is designed so a new client website can be created with minimal development effort.

Developers should be able to customize:

### Branding

- Business Name
- Logo
- Tagline

### Visual Identity

- Color Palette
- Typography
- Images
- Icons

### Content

- Menu
- Gallery
- Testimonials
- Events
- Opening Hours
- Contact Information
- Social Media

### Layout

- Enable or disable sections
- Rearrange sections
- Extend existing pages
- Add custom pages

---

# Future Architecture

Current data flow:

```text
Configuration Files

↓

React Components

↓

Website
```

Planned architecture:

```text
Admin Dashboard

↓

Backend API

↓

Database

↓

React Frontend

↓

Website
```

The frontend is intentionally designed so that local configuration files can later be replaced by APIs or a CMS without major UI changes.

---

# Roadmap

- [x] Complete reusable frontend framework
- [x] Create multiple brand presets (Specialty Café & Luxury Fine Dining)
- [x] Responsive and accessibility audit
- [x] Creative redesign: Dark editorial visual identity (Aura Coffee Roasters)
- [x] External design system sync with Google Stitch (Aura Coffee)
- [ ] Production deployment & hosting setup
- [ ] Backend API & database services
- [ ] Add reservation system
- [ ] Develop admin dashboard
- [ ] Integrate CMS
- [ ] Analytics & conversion tracking

---

# Live Demo

Coming soon.

---

# Screenshots

Screenshots will be added as major sections of the framework are completed.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/tejass-kathuria/hospitality-framework.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linter:

```bash
npm run lint
```

Format code:

```bash
npm run format
```

---

# License

This repository is currently intended for portfolio and freelance work.

Commercial redistribution of the source code without permission is not permitted.

---

# Author

**Tejas Kathuria**
