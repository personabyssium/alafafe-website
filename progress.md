# Alafafe Project Progress Ledger

This document tracks all major architectural and functional changes made to the Alafafe website, including the technical rationale behind each decision.

## Phase 1: Architecture & Templating
### 1.1 Shell Templating Implementation
- **Changes**: Isolated global Header and Footer into `src/partials/`, implemented custom Vite plugin.
- **Reason**: To eliminate massive code duplication (over 1,500 lines removed). Updates to navigation or contact info now happen in one place and reflect site-wide.

### 1.2 Single-File Bilingual Strategy
- **Changes**: Created `translations.json` and a lightweight i18n engine in `src/main.js`.
- **Reason**: Fulfills the requirement for French/Arabic support without duplicating every HTML file. This keeps the project maintainable and SEO-friendly by using `dir="rtl"` and dynamic text swapping.

## Phase 2: Functional Features
### 2.1 Unified Quote Engine (Base Engine)
- **Changes**: Created `quote-engine.js` (core logic) and `config/quotes.json` (schema).
- **Reason**: The objective was to replace placeholder forms with a professional multi-step experience. Building an "Engine" instead of hardcoded forms allows us to add new insurance types (Habitation, Santé) in minutes by simply updating a configuration file.

### 2.2 Universal Quote Flow Integration
- **Changes**: Integrated `QuoteEngine` into `auto.html`, `habitation.html`, `sante.html`, and `voyage.html`.
- **Reason**: Provides a consistent, high-conversion lead capture mechanism across all individual insurance products. Each page now features a dynamic multi-step form tailored to its specific requirements while sharing the same underlying logic.

## Phase 3: Content & UX
### 3.1 Particuliers Hub Page
- **Changes**: Created `particuliers.html`, updated header navigation.
- **Reason**: To provide a professional landing page for individual services instead of jumping straight to "Auto". This improves navigation flow and site architecture.

### 3.2 Sinistres UI Contrast & Branding Fix
- **Changes**: Increased body text opacity in the central box and changed side-box background numbers to emerald green (`text-emerald-900/10`).
- **Reason**: Improved readability and visual consistency across the "Steps" section on the Sinistres page.

---
*Last Updated: 2026-02-26 04:05*
