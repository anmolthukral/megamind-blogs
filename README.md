# Engineer Playbook — Blogs

Engineering blog platform for engineerplaybook.io. Built with Next.js 16 + React 19.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Design System:** `@engineerplaybook/design-system` (shared tokens + components)
- **Content:** MDX-based blog posts
- **Navigation:** `@engineerplaybook/common-nav` shared nav web component

## Development

```bash
npm install
npm run dev     # http://localhost:3000
```

## Build

```bash
npm run build
npm run lint
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Blog listing |
| `/[slug]` | Individual blog post (SSG) |

## Deployment

Deploys independently to Vercel. Gateway routes `engineerplaybook.io/blogs/*` here.

```bash
vercel deploy
```
