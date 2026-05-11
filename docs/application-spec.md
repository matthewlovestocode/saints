# Orthodox Saints Application Specification

_Last updated: 2026-05-11_

## Purpose

Orthodox Saints is a Next.js web application for learning about Orthodox saints through concise profiles, researched life summaries, teaching themes, timelines, and source notes. The current app is a curated saints index rather than a community-editable encyclopedia: saint content is stored in code, rendered as static pages, and presented with links to external Orthodox, hagiographic, liturgical, and contextual sources.

The user-facing experience should remain respectful, readable, and source-aware. Pages should introduce the saints devotionally without hiding uncertainty where source traditions differ.

## Current User Experience

### Global shell

- Every page renders inside `apps/web/src/app/layout.tsx` with the global `SiteNav` above the page content.
- The primary navigation links back to the saints index at `/`.
- Supabase-backed auth links are present in the nav:
  - Signed-out users see `Sign in` and `Sign up`.
  - Signed-in users see a `Sign out` form action.
- Auth is not required to browse the saint index or saint profile pages.

### Home page

Route: `/`

The home page is a saints index. It shows:

- A small eyebrow label, `Saints Index`.
- The page title, `Orthodox Saints`.
- A vertical grid of saint cards.

Each saint card includes:

- An icon-inspired portrait image.
- The saint name.
- A short summary.
- A three-item fact grid.
- Links to that saint's profile sections: `Overview`, `Life`, `Teachings`, and `Sources`.

### Saint profile pages

All saint profile pages use the same page layout:

- A `Saints index` back link.
- A hero with the saint name, current section title, summary, alternate-name badges, fact grid, and portrait.
- A tab list for the saint's profile sections.
- A content column containing sections, timelines, or source cards depending on the route.

The current section model is:

| Section | Route pattern | Current content |
| --- | --- | --- |
| Overview | `/saints/[slug]` | Researched thematic sections with source links. |
| Life | `/saints/[slug]/life` | Introductory prose followed by a chronological timeline. |
| Teachings | `/saints/[slug]/teachings` | Researched thematic sections about sayings, witness, and spiritual themes. |
| Sources | `/saints/[slug]/sources` | Reading guide prose followed by grouped external references. |

## Current Route Structure

### Application routes

- `/` — saints index.
- `/sign-in` — Supabase email/password sign-in page.
- `/sign-up` — Supabase email/password sign-up page.
- `/auth/confirm` — Supabase email confirmation callback route.
- `/saints/[slug]` — dynamic saint overview route.
- `/saints/[slug]/life` — dynamic saint life route.
- `/saints/[slug]/teachings` — dynamic saint teachings route.
- `/saints/[slug]/sources` — dynamic saint sources route.

### Explicit saint route files

The repo also currently contains explicit route files for the first five saints:

- Anthony the Great
- Macarius the Great
- Mary of Egypt
- Moses the Black
- Spyridon the Wonderworker

Those explicit routes render the same section types and content modules as the dynamic route system. Newer saints are served through the dynamic `[slug]` routes.

### Current saint slugs

The current `saints` array contains these public profile slugs:

- `moses-the-black`
- `macarius-the-great`
- `anthony-the-great`
- `spyridon-the-wonderworker`
- `mary-of-egypt`
- `george-the-dragon-slayer`
- `nino-of-georgia`
- `gabriel-of-georgia`
- `john-of-shanghai-and-san-francisco`
- `maria-of-paris`
- `nektarios-of-aegina`
- `seraphim-of-sarov`

Dynamic saint pages call `generateStaticParams()` from the `saints` array, so each saint is expected to have complete data for all four profile sections.

## Content Model

Saint content currently lives in `apps/web/src/app/data/saints.ts`.

### Shared reference records

`references` is a record keyed by short reference ids. Each reference has:

- `id`
- `title`
- `publisher`
- `url`
- `note`

Content sections store reference ids rather than duplicating source metadata. UI helpers resolve ids with `getReferences(ids)`.

### Saint metadata

Each saint in the `saints` array has:

- `name` — primary display name.
- `slug` — URL-safe route segment.
- `titles` — alternate names or titles rendered as badges.
- `feastDay` — fuller feast-day text for metadata and future use.
- `period` — historical period or dates.
- `location` — primary geographic context.
- `summary` — short profile summary used on index cards, heroes, and metadata descriptions.
- `image` — portrait image path under `apps/web/public`.
- `facts` — label/value pairs rendered in fact grids. The current UI expects three facts.
- `pages` — ordered navigation items for Overview, Life, Teachings, and Sources.

Navigation expectations:

- `pages` should include all four profile sections in a consistent order.
- `href` values must match the saint slug and route patterns.
- Tab active state is based on the current `activeHref`, so these hrefs should stay exact.

### Research sections

Overview and Teaching pages use `ResearchSection[]`. A section has:

- `title`
- optional `eyebrow`
- `body` as prose blocks
- optional `bullets`
- optional `image` with `src`, dimensions, `alt`, and optional `caption`
- `references` as reference ids

`body` supports plain strings and mixed inline link blocks so prose can include contextual links without hard-coding HTML in the data file.

### Life timelines

Life pages use `TimelineEntry[]`. Each timeline entry has:

- `label` — short stage label, displayed in uppercase styling.
- `title`
- `body` as prose blocks.
- optional `image` with the same shape used by research sections.
- `references` as reference ids.

The Life page also renders standard introductory copy before the timeline.

### Sources pages

Sources pages use grouped reference ids, currently arrays of objects with:

- `title`
- `references`

The Sources page renders a standard reading-guide section, then each group as cards with external links, publisher metadata, and source notes.

## UI and Layout Conventions

The app uses CSS modules and global color tokens rather than a component library.

Current visual conventions to preserve as the app grows:

- Dark teal/blue background with gold, red, and muted parchment-like text colors from `globals.css` custom properties.
- A thin multicolor strip fixed at the top of the viewport via `body::before`.
- Centered content containers with generous horizontal and vertical padding.
- Card surfaces with soft borders, gold top accents, subtle gradients, and panel shadows.
- Hero layouts that pair text with a portrait image on desktop and collapse to a single column on smaller screens.
- Section headers with optional uppercase eyebrow labels.
- Fact grids with uppercase labels and emphasized values.
- Tab navigation with active state shown by a gold underline.
- Source links and prose links should remain visibly distinct and accessible.
- Portrait and figure images should include descriptive alt text and preserve the icon-inspired visual tone already used in `apps/web/public/images`.

Responsive expectations:

- Index cards, saint heroes, and timeline rows collapse to single-column layouts on narrow screens.
- Fact grids collapse from three columns to one column on narrow screens.
- Portraits should not force horizontal scrolling.

## Implementation Notes for Future Contributors

- The main web app is in `apps/web` and uses Next.js App Router, React, Supabase SSR auth helpers, Vitest, and CSS modules.
- Root scripts in `package.json` forward to the web workspace for development, build, lint, and tests.
- Saint metadata for document titles and descriptions is generated in `apps/web/src/app/metadata.ts`.
- Dynamic saint routes map each slug to its overview sections, timeline, teaching sections, and source groups. When adding a saint, update each route mapping as well as the `saints` array and exported content constants.
- Missing saint content or missing section data results in `notFound()` on dynamic saint routes.
- Static images referenced by saint content should live under `apps/web/public/images` and be referenced with root-relative `/images/...` paths.
- Supabase configuration is optional for browsing. Auth helpers return no user when required Supabase environment variables are not present.

## Checks

Relevant checks before handoff for content/spec-only changes:

```bash
npm run lint
npm run test
```

For route or rendering changes, also run:

```bash
npm run build
```
