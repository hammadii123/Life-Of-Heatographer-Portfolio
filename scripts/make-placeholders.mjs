/**
 * Generates stand-in files for /public/gallery so the whole site can be built,
 * reviewed and demoed before the real exports exist.
 *
 *   node scripts/make-placeholders.mjs
 *
 * Each stand-in carries its photograph's own accent colour and exact aspect
 * ratio, so layout, colour and rhythm are all truthful — only the picture is
 * missing. Every one is stamped so a placeholder can never be mistaken for a
 * finished frame.
 *
 * It will NOT overwrite a file that is already there, so once Hammad drops a
 * real export in, re-running this is safe.
 */
import sharp from "sharp";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "gallery");
mkdirSync(outDir, { recursive: true });

/* The content file is TypeScript, so read the fields we need out of the source
   rather than adding a build step just for a dev utility. */
const src = readFileSync(join(root, "src", "content", "photos.ts"), "utf8");
const entries = [...src.matchAll(/slug:\s*"([^"]+)"[\s\S]*?ratio:\s*([^,]+),[\s\S]*?accent:\s*"(#[0-9a-fA-F]{6})"/g)].map(
  (m) => ({
    slug: m[1],
    ratio: Function(`"use strict";return (${m[2]})`)(),
    accent: m[3],
  }),
);

if (!entries.length) {
  console.error("No photos parsed from src/content/photos.ts — aborting.");
  process.exit(1);
}

const LONG = 1800;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

for (const { slug, ratio, accent } of entries) {
  const file = join(outDir, `${slug}.jpg`);
  if (existsSync(file)) {
    console.log(`kept    ${slug}.jpg (already present)`);
    continue;
  }

  const w = ratio >= 1 ? LONG : Math.round(LONG * ratio);
  const h = ratio >= 1 ? Math.round(LONG / ratio) : LONG;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="glow" cx="50%" cy="34%" r="78%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.62"/>
        <stop offset="55%" stop-color="${accent}" stop-opacity="0.16"/>
        <stop offset="100%" stop-color="#0a1113" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="55%" stop-color="#0a1113" stop-opacity="0"/>
        <stop offset="100%" stop-color="#050a0b" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="#0a1113"/>
    <rect width="100%" height="100%" fill="url(#glow)"/>
    <rect width="100%" height="100%" fill="url(#floor)"/>
    <g font-family="monospace" fill="#ece5d8" text-anchor="middle">
      <text x="50%" y="${h / 2 - 14}" font-size="${Math.round(w * 0.028)}"
            letter-spacing="${Math.round(w * 0.012)}" opacity="0.92">PLACEHOLDER</text>
      <text x="50%" y="${h / 2 + Math.round(w * 0.05)}" font-size="${Math.round(w * 0.021)}"
            letter-spacing="${Math.round(w * 0.004)}" opacity="0.55">${esc(slug)}.jpg</text>
    </g>
  </svg>`;

  /* Real monochrome grain, so the stand-ins sit in the same visual family as
     the photographs rather than looking like flat CSS. */
  const noise = Buffer.alloc(w * h);
  for (let i = 0; i < noise.length; i++) noise[i] = 118 + ((Math.random() * 20) | 0);

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: noise,
        raw: { width: w, height: h, channels: 1 },
        blend: "overlay",
      },
    ])
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(file);

  console.log(`made    ${slug}.jpg  ${w}×${h}`);
}

writeFileSync(
  join(outDir, "README.md"),
  `# /public/gallery

Drop the real exports here, named exactly \`<slug>.jpg\`, where the slug is the
one in \`src/content/photos.ts\`. Nothing else needs to change — every page,
the hero, the OG images and the structured data all read from that file.

Export guidance:
- Longest edge 2400–3000px. Larger than that is wasted: next/image resizes
  down to what each screen asks for and never serves the original.
- sRGB, quality 90. Next re-encodes to AVIF/WebP anyway, so do not pre-compress.
- Keep the aspect ratio matching the \`ratio\` field for that photo, or update
  the field. A mismatch causes the layout to shift while the image loads.

Files currently here that say PLACEHOLDER are generated stand-ins from
\`scripts/make-placeholders.mjs\`. Overwrite them. The script never replaces a
file that already exists, so re-running it after you add real photographs is
safe.
`,
);

console.log(`\nDone. ${entries.length} slugs processed in public/gallery/`);
