/**
 * The hero's per-frame driver.
 *
 * WHY THIS IS NOT CSS CUSTOM PROPERTIES
 *
 * The first version wrote --p, --a1..--a5, --mx, --my and --pan onto
 * .hero__stage every frame and let calc() in the stylesheet do the rest. That
 * reads beautifully and it froze the renderer.
 *
 * A custom property written on an element invalidates the computed style of
 * that element's entire subtree, because any descendant might inherit it. The
 * stage's subtree is three lanes of photographs — around fifty elements — so
 * Chrome was recomputing style for all of them sixty times a second, on the
 * main thread. Past a certain element count the main thread simply never
 * yields, the tab stops responding, and even devtools cannot reach it.
 *
 * So the values are applied straight to the eleven elements that actually use
 * them. Each write dirties one element. Nothing inherits, nothing cascades,
 * and the whole frame is a handful of compositor-friendly property writes.
 *
 * Everything assigned here is transform, opacity, filter or a geometry value
 * on an element that is already its own layer.
 */

export type Stagehands = {
  river: HTMLElement | null;
  part: HTMLElement | null;
  still: HTMLElement | null;
  stillTag: HTMLElement | null;
  grey: HTMLElement | null;
  finder: HTMLElement | null;
  lock: HTMLElement | null;
  bladeTop: HTMLElement | null;
  bladeBottom: HTMLElement | null;
  flash: HTMLElement | null;
  print: HTMLElement | null;
  printCap: HTMLElement | null;
  copy: HTMLElement | null;
  scrim: HTMLElement | null;
  hudBar: HTMLElement | null;
  hud: HTMLElement | null;
  cue: HTMLElement | null;
  pans: HTMLElement[];
};

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export const ACTS = {
  river: [0.0, 0.2],
  stop: [0.18, 0.4],
  finder: [0.38, 0.62],
  shutter: [0.6, 0.84],
  through: [0.82, 1.0],
} as const;

export function actOf(p: number) {
  return p < 0.2 ? 1 : p < 0.4 ? 2 : p < 0.62 ? 3 : p < 0.84 ? 4 : 5;
}

/** How far each lane shifts with the pointer, back to front. */
const PAN_AMOUNT = [8, 18, 34];

export function applyFrame(
  el: Stagehands,
  p: number,
  mx: number,
  my: number,
) {
  const a1 = span(p, ...ACTS.river);
  const a2 = span(p, ...ACTS.stop);
  const a3 = span(p, ...ACTS.finder);
  const a4 = span(p, ...ACTS.shutter);
  const a5 = span(p, ...ACTS.through);

  // Derived beats, named the way the story is.
  const close = Math.min(1, a4 * 5); // blades meeting
  // The print starts coming up the moment the blades shut, and is readable
  // well before the act ends. An earlier curve left a long stretch where the
  // blades were closed, the flash was half on and the photograph was still
  // almost black — on screen that is a grey wash with a dark rectangle in it,
  // which reads as broken rather than as a darkroom.
  const develop = clamp01((a4 - 0.2) / 0.45);
  const exit = a5; // going through it
  const pan = mx * 2 - 1;

  const mxPct = `${(mx * 100).toFixed(2)}%`;
  const myPct = `${(my * 100).toFixed(2)}%`;

  /* ---- the crowd ---- */
  if (el.river) {
    el.river.style.opacity = String((0.55 + 0.45 * a1) * (1 - close));
  }
  for (let i = 0; i < el.pans.length; i++) {
    el.pans[i].style.transform = `translate3d(${(pan * (PAN_AMOUNT[i] ?? 10)).toFixed(1)}px,0,0)`;
  }

  /* ---- the crowd parts ---- */
  if (el.part) {
    el.part.style.opacity = String(a2);
    el.part.style.transform = `scale(${(0.45 + a2 * 0.55).toFixed(3)})`;
  }

  /* ---- the one who stopped ---- */
  if (el.still) {
    el.still.style.opacity = String(a2);
    el.still.style.transform = `scale(${(0.94 + a2 * 0.06).toFixed(3)})`;
  }
  if (el.stillTag) el.stillTag.style.opacity = String(a2 * (1 - a3));

  /* ---- the world loses its colour, except where the finder points ---- */
  if (el.grey) {
    el.grey.style.opacity = String(a3 * (1 - close));
    const r = `calc(8vmax + ${(a3 * 5).toFixed(2)}vmax)`;
    const mask = `radial-gradient(circle ${r} at ${mxPct} ${myPct}, transparent 0%, transparent 58%, #000 100%)`;
    el.grey.style.maskImage = mask;
    el.grey.style.webkitMaskImage = mask;
  }

  /* ---- the viewfinder ---- */
  if (el.finder) {
    el.finder.style.left = mxPct;
    el.finder.style.top = myPct;
    el.finder.style.width = `calc(17vmax + ${(a3 * 9).toFixed(2)}vmax)`;
    el.finder.style.opacity = String(a3 * (1 - close));
  }
  if (el.lock) el.lock.style.opacity = String(Math.max(0, (a3 - 0.62) / 0.38));

  /* ---- the shutter ---- */
  if (el.bladeTop) {
    el.bladeTop.style.transform = `translate3d(0,${(-100 + close * 100).toFixed(2)}%,0)`;
  }
  if (el.bladeBottom) {
    el.bladeBottom.style.transform = `translate3d(0,${(100 - close * 100).toFixed(2)}%,0)`;
  }
  if (el.flash) {
    // A narrow spike at the instant the blades meet, and gone. Anything
    // wider than this is a white screen you have to scroll through.
    el.flash.style.opacity = String(Math.max(0, 1 - Math.abs(a4 - 0.2) / 0.06) * 0.85);
  }

  /* ---- the print, developing, then coming toward you ---- */
  if (el.print) {
    // Appears AFTER the flash, not during it. While the frame is white, an
    // undeveloped print on top of it is a black rectangle on a white screen,
    // which reads as a broken image rather than as an exposure.
    //
    // Then it holds almost to the end: fading it out early left several
    // hundred pixels of blank screen before the hero released, worst on a
    // phone where the whole act is a couple of thumb-flicks long.
    const arrive = clamp01((a4 - 0.22) / 0.08);
    const leave = 1 - Math.max(0, (exit - 0.72) / 0.28) * 0.8;
    el.print.style.opacity = String(close * arrive * leave);
    el.print.style.transform = `scale(${((0.92 + close * 0.08) * (1 + exit * 2.2)).toFixed(3)})`;
    el.print.style.filter =
      `grayscale(${(1 - develop).toFixed(3)}) ` +
      `brightness(${(0.38 + develop * 0.62).toFixed(3)}) ` +
      `contrast(${(1.8 - develop * 0.8).toFixed(3)})`;
  }
  if (el.printCap) {
    el.printCap.style.opacity = String(develop * (1 - Math.min(1, exit * 3)));
  }

  /* ---- the words step back once the camera comes up ---- */
  const copyOut = Math.min(1, a3 * 1.6);
  if (el.copy) {
    el.copy.style.opacity = String(1 - copyOut);
    el.copy.style.transform = `translate3d(0,${(a3 * -2.5).toFixed(2)}rem,0)`;
  }
  if (el.scrim) el.scrim.style.opacity = String(1 - copyOut);

  /* ---- the camera's own readouts ---- */
  if (el.hudBar) el.hudBar.style.width = `${(p * 100).toFixed(2)}%`;
  if (el.hud) el.hud.style.opacity = String(Math.min(1, p * 14) * (1 - exit));
  if (el.cue) el.cue.style.opacity = String(1 - Math.min(1, p * 8));
}
