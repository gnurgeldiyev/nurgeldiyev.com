# nurgeldiyev.com

Guga Nurgeldiyev's personal site + microblog — the successor to my old
`bento.me/gnurgeldiyev` page (RIP bento). A links hub up top, and a running
microblog where each post pulls in its own **enriched context** — real Spotify
album art, OpenGraph link previews, maps.

## Stack

- **Next.js 16** (App Router, Turbopack, React Server Components)
- **React 19**
- **Tailwind CSS 4** (CSS-first `@theme`, class-based dark mode)
- **MDX** microblog via `next-mdx-remote` + `gray-matter`
- Deployed on **Vercel** (free tier — every page is statically prerendered
  with a 1-day revalidate)

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the build
```

Node 20+ required (Node 24 recommended).

## Writing a microblog post

Posts are plain MDX files in [`content/posts/`](content/posts). To publish, add
a file named `YYYY-MM-DD-slug.mdx` and push — Vercel rebuilds automatically.

```mdx
---
title: Watching a hillside come back
date: 2026-06-28
type: link                 # note | link | song | photo | video | place
url: https://restor.eco/... # link/song target (enriched automatically)
tags: [nature, restoration]
---

Your short markdown body here.
```

**Post types & what gets enriched** (see [`lib/enrich.ts`](lib/enrich.ts)):

| `type`  | Extra frontmatter | Auto-enrichment                              |
| ------- | ----------------- | -------------------------------------------- |
| `note`  | —                 | just the text                                |
| `link`  | `url`             | OpenGraph title / description / image / favicon |
| `song`  | `url` (Spotify)   | real track title + album art via oEmbed      |
| `place` | `location`        | location chip                                |
| `photo` | `image`           | renders the image                            |
| `video` | `video`           | renders the clip                             |

The `type` is inferred from the frontmatter if omitted.

## Editing the links hub

Everything on the landing page (profile, socials, featured card, Airflora,
music, event clips, map) lives in [`config/content.ts`](config/content.ts).
No component edits needed for content changes.

## Deploy to Vercel

```bash
git init && git add -A && git commit -m "New site"
# push to GitHub, then import at vercel.com — framework auto-detected
# or:
npx vercel        # preview
npx vercel --prod # production
```

Point the `nurgeldiyev.com` domain at the project in Vercel → Settings →
Domains. No environment variables required.
