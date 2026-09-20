import Link from "next/link";
import Frame from "@/components/ui/Frame";
import type { Photo } from "@/content/photos";

export { default as Aperture } from "@/components/home/Aperture";

/* ==========================================================================
   Four set pieces for the home page. All server-rendered — every movement
   here is CSS, either an IntersectionObserver reveal or a scroll-driven
   animation. No client JavaScript is shipped for any of them.
   ========================================================================== */

/**
 * One photograph, full bleed, one line of Urdu, and nothing else.
 *
 * Every luxury book has a page with almost nothing on it. After five chapters
 * of type this is where the site stops talking — and it is the only place a
 * photograph is allowed to be the entire screen.
 */
export function Quiet({ photo }: { photo: Photo }) {
  return (
    <section
      className="quiet"
      style={{ ["--accent" as string]: photo.accent } as React.CSSProperties}
      aria-label={photo.title}
    >
      <Link
        href={`/work/${photo.slug}`}
        className="quiet__link"
        data-cursor="frame"
        data-cursor-label={photo.urduTitle}
      >
        <Frame
          slug={photo.slug}
          alt={photo.alt}
          ratio={photo.ratio}
          accent={photo.accent}
          title={photo.title}
          sizes="100vw"
          className="quiet__frame"
          drift
          driftAmount="8%"
        />

        <span className="quiet__words">
          <span className="urdu quiet__urdu" data-reveal="ink">
            {photo.urdu.split("\n")[0]}
          </span>
          <span className="mono quiet__meta" data-reveal="soft">
            {photo.title} · {photo.place} · {photo.when}
          </span>
        </span>
      </Link>
    </section>
  );
}

/**
 * A contact sheet that travels sideways as the page scrolls down.
 *
 * Driven by `animation-timeline: view()` — native, off the main thread, zero
 * JavaScript. Where that is unsupported it stays a horizontally scrollable
 * strip, which is the honest fallback and is what touch gets anyway.
 */
export function Sheet({ photos }: { photos: Photo[] }) {
  return (
    <section className="band" aria-label="Contact sheet">
      <div className="band__rail">
        <div className="band__track">
          {photos.map((p, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="band__cell"
              style={{ ["--accent" as string]: p.accent }}
              data-cursor="frame"
              data-cursor-label={p.urduTitle}
            >
              <span className="mono band__no">{String(i + 1).padStart(2, "0")}</span>
              <Frame
                slug={p.slug}
                alt={p.alt}
                ratio={p.ratio}
                accent={p.accent}
                title={p.title}
                sizes="(max-width: 700px) 54vw, 22vw"
                develop={false}
              />
              <span className="urdu band__urdu">{p.urduTitle}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * His own captions, running past forever.
 *
 * Not decoration — this is the writing that makes the photographs work, used
 * as texture. Two identical runs so the loop has no seam.
 */
export function Marquee({ lines }: { lines: string[] }) {
  const run = (key: string) => (
    <span className="mq__run" key={key} aria-hidden={key === "b" ? "true" : undefined}>
      {lines.map((l, i) => (
        <span className="mq__item" key={`${key}-${i}`}>
          <span className="urdu mq__urdu">{l}</span>
          <i className="mq__dot" aria-hidden="true" />
        </span>
      ))}
    </span>
  );

  return (
    <section className="mq" aria-label="Lines from the captions">
      <div className="mq__rail">
        {run("a")}
        {run("b")}
      </div>
    </section>
  );
}
