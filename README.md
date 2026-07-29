# rishilokesh.me

A rough personal blog. Next.js + Markdown. Deploys on Vercel.

## Run

```bash
npm install
npm run dev
```

## Add a post

Create a file in `content/blog/`:

```md
---
title: Your post title
description: Short summary.
date: 2026-07-29
tags: [notes]
---

Your content here.
```

Filename becomes the slug: `/blog/your-filename`.

## Customize

- Name / email: `src/lib/site.ts`
- Theme: `src/app/globals.css`

## Deploy

Push to GitHub and import at [vercel.com/new](https://vercel.com/new), or run `npx vercel`.
# rishilokesh.me
