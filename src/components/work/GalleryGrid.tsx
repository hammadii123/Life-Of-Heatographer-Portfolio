"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Frame from "@/components/ui/Frame";
import type { Photo } from "@/content/photos";
import { chapters } from "@/content/chapters";
import "@/styles/gallery.css";

/**
 * The contact sheet.
 *
 * Filtering is done by rendering only the matching photographs rather than
 * hiding the rest, so a filtered view is genuinely smaller — the browser is not
 * still decoding twenty images you cannot see. Each surviving tile is keyed by
 * slug, so React reuses the ones that were already on screen and only the new
 * arrivals animate in.
 *
 * The mosaic is deliberately irregular. A perfect grid turns a body of work
 * into a product listing; a contact sheet keeps it a body of work.
 */
export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<string>("all");

  const shown = useMemo(
    () => (active === "all" ? photos : photos.filter((p) => p.chapter === active)),
    [photos, active],
  );

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of photos) map.set(p.chapter, (map.get(p.chapter) ?? 0) + 1);
    return map;
  }, [photos]);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by chapter">
        <button
          className="filter"
          data-on={active === "all" || undefined}
          data-cursor="link"
          onClick={() => setActive("all")}
        >
          <span className="filter__label">Everything</span>
          <span className="filter__n mono">{photos.length}</span>
        </button>

        {chapters.map((c) => {
          const n = counts.get(c.id) ?? 0;
          if (!n) return null;
          return (
            <button
              key={c.id}
              className="filter"
              data-on={active === c.id || undefined}
              data-cursor="link"
              style={{ ["--accent" as string]: c.accent }}
              onClick={() => setActive(c.id)}
            >
              <span className="urdu filter__urdu">{c.urdu}</span>
              <span className="filter__label">{c.title}</span>
              <span className="filter__n mono">{n}</span>
            </button>
          );
        })}
      </div>

      <p className="mono sheet__count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "frame" : "frames"}
      </p>

      <ul className="sheet" role="list">
        {shown.map((p, i) => (
          <li
            key={p.slug}
            className="sheet__cell"
            /* Portrait frames take the tall slot, landscape the wide one —
               the mosaic follows the photographs instead of cropping them
               into a shape they were never composed for. */
            data-shape={p.ratio < 0.95 ? "tall" : p.ratio > 1.2 ? "wide" : "square"}
            data-feature={p.featured || undefined}
            style={{ ["--accent" as string]: p.accent }}
          >
            <Link href={`/work/${p.slug}`} className="sheet__link lift">
              <Frame
                slug={p.slug}
                alt={p.alt}
                ratio={p.ratio}
                accent={p.accent}
                title={p.title}
                cursorLabel={p.urduTitle}
                sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 31vw"
                delay={(i % 3) * 90}
                drift
                driftAmount="4%"
              />

              <span className="sheet__plate">
                <span className="urdu sheet__urdu">{p.urduTitle}</span>
                <span className="display sheet__title">{p.title}</span>
                <span className="mono sheet__meta">
                  {p.place} · {p.when}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
