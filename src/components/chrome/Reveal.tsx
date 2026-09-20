"use client";

import { useEffect } from "react";

/**
 * One observer for the whole site.
 *
 * Mounted once in the root layout, it watches every [data-reveal] element and
 * adds `.in` when it enters. New nodes (route changes, lazily rendered grids)
 * are picked up by a MutationObserver, so components never wire up their own
 * observers and there is never more than one running.
 */
export default function Reveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in"));
      return;
    }

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      },
      // Fire a little before the element is fully on screen, so the motion
      // reads as the page arriving rather than as a delayed pop.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const scan = (root: ParentNode) => {
      const nodes = root.querySelectorAll?.("[data-reveal]:not(.in)");
      nodes?.forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // Anything already on screen at mount reveals immediately rather than
        // waiting for a scroll that may never happen on a short page.
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight * 0.92) {
          el.classList.add("in");
          return;
        }
        io.observe(el);
      });
    };

    scan(document);

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          if (el.matches?.("[data-reveal]") && !seen.has(el)) {
            seen.add(el);
            io.observe(el);
          }
          scan(el);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
