# street-training-site

A small Next.js help-centre that renders the STREET retailer training content as a
client-facing site, styled in STREET's design language. It is the review/delivery surface
for the training vault (TT-230 / TT-229).

## Content and tone live in the vault, not here

The content's source of truth is the **STREET-Training Obsidian vault**
(`STREET-Technologies/street-training`). `content/` here is a synced copy.

- Edit copy in the vault, then `npm run sync` (copies the numbered sections, excludes `_Internal/`).
- The canonical **voice and editorial rules are in the vault's `STYLE.md`**. Do not invent or
  drift the tone in this repo. If copy needs changing, change it in the vault.

## Stack

- Next.js 16 (App Router), React 19, TypeScript. Static (SSG).
- **Plain CSS** in `app/globals.css`. No Tailwind, no component library.
- Markdown via `marked` + `gray-matter` in `lib/content.ts`.

## Render model (from street-intel, reimplemented)

- Folders are the nav; a two-digit prefix sets section order and is stripped from URLs.
- Page order within a section comes from the `order:` frontmatter field.
- `_Internal/` is never synced, so it cannot reach the site.
- `[[wiki-links]]` resolve by filename / title / alias to the target page.
- `**In short:**` becomes a lead; `> Watch out:` becomes a lime callout; other blockquotes
  (e.g. `> Worth knowing:`) render as calm quotes.

## Design system (from street-vendor-portal)

Tokens are defined in `:root` in `app/globals.css`. Match these; do not introduce new colours.

- **Palette:** cream `#fdfbf7` (page), sand `#f7f3ed` (warm surface, used sparingly), black
  `#000` (ink + CTAs), lime `#c6ff00` (accent only, never a background wash or body text).
- **Type:** Hanson Bold (display: page H1, hero, wordmark) + Barlow (everything else). Use
  Hanson sparingly; body and sub-headings are Barlow.
- **Feel:** editorial, calm, lots of white space, hairline rules, no heavy shadows. Lime is the
  accent, not the brand.

## Layout conventions

- Top bar, then a two-column shell: section rail + article. Article max-width ~46rem.
- **Desktop:** sticky section rail on the left (always visible).
- **Mobile:** the rail collapses into a sticky "Browse the guide" switcher bar (React state,
  not `<details>` — the closed-`<details>` content cannot be force-shown in current Chrome).
  Open state drops a floating, scrollable panel over the article.
- Callouts, cards, wikilinks: see existing classes in `globals.css` (`.lead`, `.callout--watch`,
  `.card`, `.wikilink`, `.sidebar`, `.guidenav`).

## When changing layout/CSS

**Verify both breakpoints** (desktop ~1280 and mobile ~390) and actually look at the
screenshots. A mobile fix once silently removed the desktop rail. Measure with the page,
do not assume from the diff.

## Deploy

- Vercel, auto-deploy on push to `main`. `noindex` headers are set (`next.config.ts`).
- Free plan: repo is public and password protection is unavailable. An optional env-gated
  Basic-Auth review gate (in `proxy.ts`) was discussed but not built.

## Update loop

Edit vault → `npm run sync` → commit/push (both this repo and the vault repo) → Vercel rebuilds.
