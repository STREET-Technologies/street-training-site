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
git add -A && git commit -m "content: sync" && git push   # Vercel rebuilds
```

`npm run sync` reads from `/Users/gunnar/VAULTS/STREET-Training` by default; override with
the `TRAINING_VAULT` env var.

## Deploy (Vercel)

Import this repo in Vercel. It is a standard Next.js app, no special config.

Because this is unreleased material under review, the app sends `noindex` headers. For the
review link, also turn on Vercel **Deployment Protection** (password) in project settings
so only reviewers can open it.

## Status

Returns (`03-Returns-and-Refunds`) is fully written. Most other pages are drafts (shown with
a "Draft" pill) pending commercial-team tone review and two facts to confirm: the order
status stage names, and billing/commission specifics. The acceptance window is deliberately
not stated to retailers.
