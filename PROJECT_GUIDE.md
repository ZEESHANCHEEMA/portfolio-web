# Portfolio Project Guide

## Vision

Build an original, premium developer portfolio that presents professional experience, engineering ability, product thinking, and measurable project outcomes. The experience should be elegant, fast, accessible, and credible rather than decorative for its own sake.

## Current status

The repository contains the production-ready Next.js foundation and a temporary launch screen. Personal content, final art direction, and portfolio pages intentionally remain unimplemented until source material is available.

## Goals

- Communicate the owner’s role and value within the first viewport.
- Present selected work as outcome-focused case studies.
- Make experience, skills, services, and contact paths easy to scan.
- Achieve WCAG 2.2 AA and strong Core Web Vitals.
- Keep content separate from presentation so pages remain maintainable.
- Prefer static/server-rendered output and minimal client JavaScript.

## Design philosophy

Use strong typography, generous whitespace, a consistent grid, restrained color, and high-quality project imagery. Reference Apple, Linear, Stripe, Vercel, Framer, and Raycast for craft—not for copying. Every visual and motion decision must support hierarchy, feedback, spatial continuity, or storytelling.

## Technical stack

- Next.js 16.2.10 App Router
- React 19.2.4
- TypeScript in strict mode
- CSS Modules and global design tokens
- `next/font` for self-hosted font delivery
- ESLint with Next.js Core Web Vitals and TypeScript rules
- Lucide React for interface icons when needed

Do not add a library until the native platform and existing stack have been evaluated. Use the `pick-ui-library` skill only when explicitly requested.

## Target architecture

```text
src/
├── app/                 # Routes, layouts, metadata, errors and loading UI
│   ├── (marketing)/     # Public portfolio routes without a URL prefix
│   ├── projects/[slug]/ # Generated project case studies
│   └── blog/[slug]/     # Optional article routes
├── components/
│   ├── layout/          # Header, navigation and footer
│   ├── sections/        # Page-level compositions
│   ├── projects/        # Case-study components
│   ├── motion/          # Reusable, accessible motion primitives
│   ├── seo/             # Structured-data components
│   └── ui/              # Small reusable primitives
├── content/             # Typed portfolio data and optional MDX
├── config/              # Site-wide configuration
├── hooks/               # Client hooks only when necessary
├── lib/                 # Pure helpers, validation and data access
├── providers/           # Theme or other global client providers
├── styles/              # Tokens and shared style layers
└── types/               # Shared domain types
```

Create folders only when the first real file needs them. Avoid empty architecture and speculative abstractions.

## Route plan

- `/` — introduction, selected work, experience, capabilities, proof and CTA
- `/about` — professional story and values
- `/projects` — selected project index
- `/projects/[slug]` — outcome-driven case study
- `/experience` — career timeline
- `/skills` — grouped capabilities and evidence
- `/resume` — accessible resume with PDF download
- `/services` — engagement offerings
- `/blog` and `/blog/[slug]` — optional, only when publishing is required
- `/contact` — validated contact path
- `/privacy` — privacy policy when analytics or forms collect data

## Component rules

- Server Components are the default.
- Add `"use client"` only at the smallest interactive boundary.
- Prefer composition over boolean-heavy, all-purpose components.
- Keep content out of JSX when it is shared or repeated.
- Expose typed, predictable props and render safe fallbacks for optional data.
- Use semantic HTML before ARIA.
- Avoid unnecessary classes, context providers, and global state.

## State management

Use URL state and server data first. Local interactive state belongs in the owning component. Add a global state library only after a concrete cross-route requirement exists. Theme preference may use a small provider with a no-flash server-compatible strategy.

## Styling and design tokens

Use CSS custom properties for semantic tokens: background, surface, elevated surface, primary text, secondary text, border, accent, success, warning, and danger. Components consume semantic tokens rather than raw colors. Use CSS Modules for component styles and `globals.css` for resets, tokens, typography, and accessibility defaults.

Spacing follows a deliberate scale based on 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128 pixels. Typography uses fluid sizes with `clamp()` and readable line lengths.

## Motion guidelines

- First decide whether an element should animate and define its purpose.
- Prefer transform and opacity for performance.
- UI interactions generally stay below 300ms.
- Use `cubic-bezier(0.23, 1, 0.32, 1)` for strong ease-out entrances.
- Button press feedback may use `scale(0.97)` for 120–160ms.
- Staggers use 30–80ms between items and never block interaction.
- Use CSS for predetermined motion; use JavaScript only for dynamic gestures or values.
- Gate hover behavior behind `(hover: hover) and (pointer: fine)`.
- Respect `prefers-reduced-motion`; remove positional motion while preserving useful fades.
- Never animate merely to fill space.

Read `.agents/skills/emil-design-eng/SKILL.md` and `.agents/skills/apple-design/SKILL.md` before implementing polished motion or gesture-based interfaces. Use the audit skills according to their individual trigger rules.

## Content model

Content should be validated and typed. A project should support: slug, title, summary, role, timeframe, problem, constraints, process, solution, technologies, images, challenges, results, lessons, links, and future improvements. Optional fields must disappear cleanly rather than produce empty sections.

## Accessibility checklist

- One descriptive `h1` per page and logical heading order
- Keyboard-accessible navigation and interactions
- Visible focus indicators with sufficient contrast
- WCAG AA text and control contrast
- Descriptive links, labels, errors, and alternative text
- Touch targets of at least 44×44 CSS pixels where practical
- No information conveyed by color or motion alone
- Reduced-motion behavior tested
- Unique route titles for Next.js route announcements

## SEO strategy

Use the Metadata API from Server Components, canonical production URLs, Open Graph and Twitter imagery, sitemap, robots rules, and JSON-LD for Person, CreativeWork/SoftwareApplication, Article, BreadcrumbList, and FAQ only where the visible page supports it. Avoid misleading or duplicated structured data.

## Performance strategy

- Prefer static generation and Server Components.
- Use `next/image` with explicit dimensions and responsive sizes.
- Load only fonts and weights actually used.
- Avoid shipping animation libraries for CSS-solvable interactions.
- Dynamically import genuinely heavy, below-the-fold interactive features.
- Measure with Lighthouse and real Core Web Vitals; do not treat 95+ as guaranteed.

## Testing strategy

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- Add unit tests for validation and content utilities when they appear.
- Add component tests for interactive behavior.
- Add end-to-end tests for navigation, contact submission, theme, and critical case studies.
- Test keyboard operation, reduced motion, mobile layouts, and real touch devices.

## Error handling

Validate all external and user-provided input. Async operations must expose loading, success, and actionable error states. Log operational failures without leaking personal data. Contact submissions require server validation, spam protection, rate limiting, and a predictable response shape before deployment.

## Naming conventions

- Components and types: `PascalCase`
- Variables, functions, hooks: `camelCase`
- Route and file-system segments: `kebab-case`
- CSS module classes: descriptive `camelCase`
- Constants: descriptive names; reserve `UPPER_SNAKE_CASE` for true invariants

## Git workflow

Keep `main` deployable. Use short-lived branches such as `feat/project-case-studies` or `fix/mobile-navigation`. Commits should describe one coherent change. Pull requests must include intent, screenshots for visual work, validation performed, accessibility considerations, and known limitations.

## Deployment

Vercel is the default deployment target. Configure `NEXT_PUBLIC_SITE_URL`, a custom domain, preview deployments, Web Analytics only after consent/privacy review, error monitoring, and uptime checks. Never commit secrets.

## AI workflow

1. Read `AGENTS.md` and this guide.
2. Read relevant Next.js 16 documentation in `node_modules/next/dist/docs/` before framework changes.
3. Read the relevant `.agents/skills/*/SKILL.md` completely before using a skill.
4. Inspect current code and content before planning.
5. State inputs, outputs, failure modes, dependencies, and state changes.
6. Implement the smallest coherent change.
7. Run lint, typecheck, build, and task-specific tests.
8. Report changed files, validation, assumptions, and remaining risks.

## Roadmap

1. Gather personal content, resume, project evidence, links, imagery, and measurable outcomes.
2. Produce two or three visual directions and select one.
3. Finalize tokens, grid, typography, header, footer, buttons, cards, and motion primitives.
4. Build the homepage and responsive navigation.
5. Build the projects index and project case-study template.
6. Add about, experience, skills, services, resume, and contact routes.
7. Add metadata, structured data, OG images, sitemap, and robots policy.
8. Audit accessibility, animation, performance, responsive behavior, and content quality.
9. Deploy previews, perform device testing, and launch.

## Definition of done

A change is complete only when requirements are met, optional/null data is safe, failure states are handled, accessibility and responsive behavior are verified, regressions are considered, the diff remains focused, and all available quality commands pass.
