# Heartographer

The portfolio site of **Hammad Mustafa** — street and documentary photographer, Karachi.

*heart + photographer.* Not one who takes pictures — one who photographs with the heart.

> سب گزر رہے تھے۔ میں رک گیا۔
> *Everyone was passing. I stopped.*

---

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Next.js 16 (App Router) · React 19 · TypeScript · Lenis for smooth scroll.
No UI framework, no animation library — every component and every movement on
this site is written for it.

---

## Where things live

```
src/
  app/          routes. Each page owns its own metadata and structured data.
  components/
    hero/       the five-act opening sequence
    chrome/     nav, footer, cursor, sound, scroll, reveal
    home/       the set pieces on the front page
    ui/         Frame, PageHeader, JsonLd
  content/      ALL the words and all the photo data. Edit these, not the pages.
    photos.ts     every photograph: story, Urdu line, tags, colour
    chapters.ts   the five chapters
    services.ts   what is for sale, and the FAQ
    journal.ts    the articles
  lib/
    site.ts     name, phone, email, areas — one source of truth
    jsonld.ts   structured data for Google
    sound.ts    the camera sounds, synthesised (no audio files)
  styles/       one stylesheet per area
scripts/
  make-placeholders.mjs   stand-in images so the site builds before photos exist
  make-motion.mjs         bakes the hero's motion blur into files
public/gallery/           the photographs
```

---

## Adding or replacing a photograph

1. Export it at 2400–3000px on the long edge, sRGB, quality 90. Do not
   pre-compress — Next re-encodes to AVIF/WebP anyway.
2. Save it as `public/gallery/<slug>.jpg`, where `<slug>` matches the entry in
   `src/content/photos.ts`.
3. Make sure the `ratio` field matches the file (width ÷ height), or the layout
   will shift while the image loads.
4. Re-bake the hero blur and clear the image cache:

```bash
rm -rf public/gallery/motion && node scripts/make-motion.mjs
rm -rf .next/cache/images
```

**The cache step is not optional.** Next caches optimised images for a year and
keys them by filename, so replacing a file without clearing it leaves the old
picture on screen.

---

## Things worth knowing before changing anything

**The hero's motion blur is baked into files, on purpose.** Blurring at runtime
— an SVG filter on the lane, or `blur()` on each image — makes the browser
re-rasterise fifty photographs every frame, because the lanes never stop
moving. `scripts/make-motion.mjs` does it once instead, and does a real
horizontal smear, which CSS cannot do at all.

**The hero writes styles to elements, not custom properties.** A CSS custom
property set on an ancestor invalidates the computed style of its whole
subtree. See `src/components/hero/drive.ts`.

**Sound is off until the visitor asks for it**, and there are no audio files —
every sound is synthesised in `src/lib/sound.ts` when it plays.

**Urdu is set in Noto Nastaliq Urdu and needs vertical room.** `.urdu` carries
padding for the descenders; do not put it in a tight box with `overflow:
hidden`.

**Image protection is honest about its limits.** Right-click, drag and
long-press are blocked, and the full-resolution original is never served — only
a resized, re-encoded derivative. Nothing on the web can stop a screenshot.

---

## Before it goes live

- [ ] Replace every `PLACEHOLDER` image in `public/gallery/`
- [ ] Read every story in `src/content/photos.ts` and correct anything untrue
- [ ] Set the real prices in `src/content/services.ts` (all marked `VERIFY`)
- [ ] Confirm the contact email in `src/lib/site.ts`
- [ ] Set `NEXT_PUBLIC_SITE_URL` once there is a domain
- [ ] Submit `/sitemap.xml` in Google Search Console

---

© Hammad Mustafa. The photographs are not licensed for reuse — ask.
