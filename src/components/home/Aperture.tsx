/**
 * The aperture that stands in for the "o" of heartographer.
 *
 * Six blades, built the way a real iris is: each blade is a wedge hinged at a
 * point on the rim, and rotating every blade about its own hinge by the same
 * angle opens or closes a hexagonal hole in the middle. At rest the blades are
 * swung open; as the word scrolls up the screen they close, and they open
 * again as it leaves.
 *
 * The blades are drawn oversized and clipped to the rim circle, so swinging
 * them never exposes a gap at the edge — which is exactly the trick an actual
 * iris uses.
 *
 * An earlier version drew six triangles meeting at the centre with no hinge
 * rotation: that is a solid disc, not an aperture, which is what it looked
 * like on screen.
 */
const BLADES = 6;
const R_HINGE = 46; // where each blade is pinned, on the rim
const R_REACH = 96; // how far past the rim the blade is drawn, before clipping

const pt = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)] as const;
};

export default function Aperture() {
  const blades = Array.from({ length: BLADES }, (_, i) => {
    const a = (360 / BLADES) * i;
    const b = a + 360 / BLADES;
    const [hx, hy] = pt(a, R_HINGE);
    const [ox, oy] = pt(a, R_REACH);
    const [px, py] = pt(b, R_REACH);
    return {
      i,
      hinge: `${hx.toFixed(2)}px ${hy.toFixed(2)}px`,
      // centre → out past the rim at this blade's angle → out past the rim at
      // the next blade's angle. Six of these, unrotated, tile the whole disc.
      d: `M50 50 L${ox.toFixed(2)} ${oy.toFixed(2)} L${px.toFixed(2)} ${py.toFixed(2)} Z`,
    };
  });

  return (
    <span className="ap" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="ap__svg">
        <defs>
          <clipPath id="ap-rim" clipPathUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="44" />
          </clipPath>
        </defs>

        <g clipPath="url(#ap-rim)">
          {blades.map((b) => (
            <path
              key={b.i}
              className="ap__blade"
              d={b.d}
              style={{ transformOrigin: b.hinge }}
            />
          ))}
        </g>

        <circle cx="50" cy="50" r="46" className="ap__ring" />
      </svg>
    </span>
  );
}
