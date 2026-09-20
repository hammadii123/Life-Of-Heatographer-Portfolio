"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling, but only where it helps.
 *
 * The hero reads scroll position to drive its five acts; native scroll on
 * Windows arrives in coarse 100px jumps that make that sequence stutter. Lenis
 * interpolates it. It is switched off entirely for reduced-motion users and
 * for touch, where the platform's own inertia is better than anything we can
 * simulate and hijacking it feels broken.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links must still work with Lenis in control of the scroller.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element)?.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href")!.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
