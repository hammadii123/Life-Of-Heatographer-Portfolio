"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Every photograph on this site goes through here.
 *
 *  1. Protection — no right-click save, no drag, no long-press sheet, and the
 *     full-resolution original is never served (next/image only ever emits a
 *     sized, re-encoded derivative). `.guard` in globals.css states the honest
 *     limits of that.
 *  2. Graceful absence — until an export exists in /public/gallery the frame
 *     renders as a tinted latent panel in the photograph's own accent colour.
 *     Nothing ever looks broken.
 *  3. Stability — the aspect ratio comes from the content file, so the layout
 *     is correct before a byte of image has loaded.
 *  4. The house reveal — `develop` brings the picture up out of grain and
 *     shadow the way the hero's fourth act does, and `drift` moves it against
 *     the scroll inside its own frame.
 */
export default function Frame({
  slug,
  alt,
  ratio,
  accent,
  title,
  sizes,
  priority,
  className = "",
  fit = "cover",
  develop = true,
  drift = false,
  driftAmount = "5%",
  /** Shown in the viewfinder cursor. Usually the photograph's Urdu title. */
  cursorLabel,
  delay = 0,
}: {
  slug: string;
  alt: string;
  ratio: number;
  accent: string;
  title?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  fit?: "cover" | "contain";
  develop?: boolean;
  drift?: boolean;
  driftAmount?: string;
  cursorLabel?: string;
  delay?: number;
}) {
  const [missing, setMissing] = useState(false);

  return (
    <div
      className={`frame guard ${className}`}
      style={{
        aspectRatio: String(ratio),
        ["--frame-accent" as string]: accent,
        ["--reveal-delay" as string]: `${delay}ms`,
        ["--drift-amount" as string]: driftAmount,
      }}
      /* Priority frames are above the fold — animating those in would just
         delay the thing the visitor came for. */
      data-reveal={develop && !priority ? "develop" : undefined}
      data-drift={drift ? "" : undefined}
      data-cursor="frame"
      data-cursor-label={cursorLabel}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {!missing && (
        <Image
          src={`/gallery/${slug}.jpg`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={82}
          draggable={false}
          onError={() => setMissing(true)}
          style={{ objectFit: fit }}
        />
      )}

      {missing && (
        <div className="frame__latent" role="img" aria-label={alt}>
          <span className="mono">awaiting print</span>
          {title && <span className="frame__latent-title display">{title}</span>}
        </div>
      )}
    </div>
  );
}
