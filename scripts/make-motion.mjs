/**
 * Bakes the hero's motion blur into image files.
 *
 *   node scripts/make-motion.mjs
 *
 * WHY THIS EXISTS
 * The crowd in the hero is three lanes of photographs translating continuously.
 * Blurring them at runtime — with an SVG filter on the lane, or a CSS blur() on
 * each image — makes Chrome re-rasterise filtered content every single frame,
 * because the layer never stops moving. With around fifty photographs on screen
 * that saturates the main thread and the tab stops responding entirely. Both
 * approaches were tried; both froze the renderer. Removing the blur fixed it.
 *
 * So the blur is applied here, once, and the hero just displays ordinary
 * images. Runtime cost: zero.
 *
 * It is also a better blur. This is a real horizontal smear — squash the image
 * on the x axis, blur it, stretch it back, so a gaussian of sigma s becomes a
 * smear of s x SQUASH horizontally and stays s vertically. CSS blur() is
 * isotropic and cannot do this; a crowd is only smeared along the axis it
 * travels on.
 *
 * Output: /public/gallery/motion/<slug>-<level>.jpg
 */
import sharp from "sharp";
import { readFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "public", "gallery");
const outDir = join(srcDir, "motion");
mkdirSync(outDir, { recursive: true });

/** Rendered at roughly 130–190px wide, so 420 is plenty and stays tiny. */
const W = 420;
const H = 560;
const SQUASH = 6;

/** One per lane depth: furthest travels most, so it smears most. */
const LEVELS = [
  { name: "soft", sigma: 5.0 },
  { name: "mid", sigma: 2.8 },
  { name: "near", sigma: 1.3 },
];

const slugs = readdirSync(srcDir)
  .filter((f) => f.endsWith(".jpg"))
  .map((f) => f.replace(/\.jpg$/, ""));

if (!slugs.length) {
  console.error("No photographs in public/gallery — run make-placeholders.mjs first.");
  process.exit(1);
}

let made = 0;
for (const slug of slugs) {
  const src = join(srcDir, `${slug}.jpg`);

  for (const { name, sigma } of LEVELS) {
    const out = join(outDir, `${slug}-${name}.jpg`);
    if (existsSync(out)) continue;

    await sharp(src)
      .resize(W, H, { fit: "cover", position: "attention" })
      // Squash on x, blur, stretch back: the gaussian is stretched with it.
      .resize({ width: Math.max(2, Math.round(W / SQUASH)), height: H, fit: "fill" })
      .blur(sigma)
      .resize({ width: W, height: H, fit: "fill" })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(out);

    made++;
  }
}

console.log(
  `motion blur baked: ${made} file(s) for ${slugs.length} photographs -> public/gallery/motion/`,
);
console.log("Delete that folder and re-run after you replace any photograph.");
