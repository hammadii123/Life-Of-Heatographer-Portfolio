# /public/gallery

Drop the real exports here, named exactly `<slug>.jpg`, where the slug is the
one in `src/content/photos.ts`. Nothing else needs to change — every page,
the hero, the OG images and the structured data all read from that file.

Export guidance:
- Longest edge 2400–3000px. Larger than that is wasted: next/image resizes
  down to what each screen asks for and never serves the original.
- sRGB, quality 90. Next re-encodes to AVIF/WebP anyway, so do not pre-compress.
- Keep the aspect ratio matching the `ratio` field for that photo, or update
  the field. A mismatch causes the layout to shift while the image loads.

Files currently here that say PLACEHOLDER are generated stand-ins from
`scripts/make-placeholders.mjs`. Overwrite them. The script never replaces a
file that already exists, so re-running it after you add real photographs is
safe.
