# Sanity CMS — Photo Gallery

## How it's set up

| File | Purpose |
|------|---------|
| `sanity.config.ts` | Studio configuration (project ID, dataset, schema) |
| `sanity.cli.ts` | CLI config (for `npx sanity deploy`) |
| `sanity/schemas/gallery.ts` | Gallery content model |
| `sanity/lib/client.ts` | Next.js server client (read-only, CDN) |
| `sanity/lib/image.ts` | Image URL builder (auto-resize via Sanity CDN) |
| `sanity/lib/fetch.ts` | GROQ query + fetch function |
| `components/Gallery.tsx` | Server component that displays images |
| `app/media/page.tsx` | Media page that renders Gallery |

**Schema fields** (`gallery` document):
- **Title** — short description of the photo (required)
- **Category** — choose: News Interview, Newspaper, Key Activities & Events, or Media Coverage (required)
- **Description** — optional longer caption
- **Event Date** — when the photo was taken (optional)
- **Image** — the photo file (with hotspot/crop, required)

## For content editors (Prof. Latif)

1. Go to **https://talib-latif.sanity.studio**
2. Log in with Google account
3. Click the **+** (pencil icon) next to "Gallery"
4. Fill in:
   - **Title** — e.g. "IPCC Expert Meeting 2022"
   - **Category** — pick from the dropdown
   - **Description** — optional caption
   - **Event Date** — optional, pick the date
   - **Image** — drag & drop a photo
5. Click **Publish**

The photo appears on the website's **Media Room** page automatically. No code changes needed.

## How images are served

The Sanity Image Pipeline auto-resizes and optimizes every photo:

- Thumbnails: `600×338` (16:9) via `urlFor().width(600).height(338).url()`
- Lightbox: `1600px` wide via `urlFor().width(1600).url()`
- Sanity's CDN serves WebP format automatically based on browser support
- Next.js `<Image>` component adds lazy loading and responsive `sizes`

## Features

- **Category badges** — each photo shows its category (News Interview, Newspaper, etc.)
- **Lightbox** — click any photo to see it full-size with title, description, and date
- **Keyboard navigation** — arrow keys to browse, Esc to close in the lightbox

## Commands

```bash
# Deploy studio changes (after editing schema)
powershell -ExecutionPolicy Bypass -Command "npx sanity deploy"

# Run studio locally for development
powershell -ExecutionPolicy Bypass -Command "npx sanity dev"
```

## Environment variables

| Variable | Required? | Where used |
|----------|-----------|------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Next.js + Studio config |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Next.js + Studio config |
