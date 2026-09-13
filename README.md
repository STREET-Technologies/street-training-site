# street-training-site

Client-facing retailer training and help site for STREET. A small Next.js app that
renders the markdown training content as a polished help centre, styled with STREET's
design language (Barlow + Hanson, cream/black, lime as accent).

This is the review/delivery surface for TT-230 (retailer user guide) and TT-229 (returns).
The content's source of truth is the `STREET-Training` Obsidian vault; this repo renders it.

## How it works

- Content lives in `content/`, one folder per section (numbered for order). Folders are
  the navigation; page order comes from each file's `order` frontmatter.
- `lib/content.ts` discovers the markdown, builds the nav, resolves `[[wiki-links]]`, and
  renders markdown to HTML. The `In short:` line becomes a lead; a `> Watch out:`
  blockquote becomes a styled callout.
- The vault's `_Internal/` staff layer is never copied here, so it cannot leak to retailers.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Updating content

Content is authored in the Obsidian vault, not here.

```bash
npm run sync       # copies the numbered sections from the vault into content/
git diff -- content/  # review the synced changes before committing
```

`npm run sync` reads from `/Users/gunnar/VAULTS/STREET-Training` by default; override with
the `TRAINING_VAULT` env var.

## Deploy (Vercel)

Import this repo in Vercel. It is a standard Next.js app, no special config.

The app sends `noindex` headers, which do not restrict access. The current free-plan
setup uses a public repo and does not provide password protection. Do not place private
operational material in the numbered retailer sections. `_Internal/` remains excluded.

A push to `main` triggers a Vercel deployment. Complete content review before publishing.
The vendor portal also renders this vault under `/guide`; keep both content copies aligned.

## Content review

All 24 retailer pages were revised in September 2026. The eight-section structure is
unchanged; returns remains in `04-Returns-and-Refunds`.

Pages with `status: draft` remain visible with a Draft pill. The flag is not an access or
publication gate. Commercial returns/billing decisions and support arrangements are tracked
in the source vault's `_Internal/Known-Gotchas.md`. The acceptance-window duration remains
excluded from retailer copy.
