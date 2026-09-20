"use client";

import { useEffect } from "react";
import "@/styles/viewfinder.css";

/**
 * The cursor is a viewfinder.
 *
 * The hero spends five acts teaching one idea — that this site is what it
 * looks like through his camera. Dropping that idea the moment you scroll past
 * the hero would waste it, so the pointer carries it through every page: a
 * focus dot at rest, corner brackets with a focus-lock tick over a photograph,
 * a ring over anything clickable.
 *
 * Costs: one rAF loop, one element, transform and opacity only. Nothing here
 * reads layout during a frame. It removes itself entirely on touch devices,
 * where there is no pointer to decorate and a fake one is just latency.
 */
export default function Viewfinder() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const root = document.createElement("div");
    root.className = "vf";
    root.setAttribute("aria-hidden", "true");
    root.innerHTML = `
      <span class="vf__dot"></span>
      <span class="vf__box">
        <i data-c="tl"></i><i data-c="tr"></i><i data-c="bl"></i><i data-c="br"></i>
      </span>
      <span class="vf__label"></span>`;
    document.body.appendChild(root);
    document.documentElement.classList.add("has-vf");

    const label = root.querySelector<HTMLElement>(".vf__label")!;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let shown = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        root.dataset.on = "true";
      }

      // closest() walks up from the target, so a photograph's caption or an
      // icon inside a button still resolves to the right mode.
      const hit = (e.target as Element)?.closest?.("[data-cursor]") as HTMLElement | null;
      const mode = hit?.dataset.cursor ?? "";
      if (root.dataset.mode !== mode) root.dataset.mode = mode;

      const text = hit?.dataset.cursorLabel ?? "";
      if (label.textContent !== text) label.textContent = text;
      // Urdu labels have to be set in Nastaliq and run right-to-left.
      const urdu = /[؀-ۿ]/.test(text);
      label.classList.toggle("urdu", urdu);
    };

    const onLeave = () => {
      shown = false;
      root.dataset.on = "false";
    };
    const onDown = () => (root.dataset.press = "true");
    const onUp = () => (root.dataset.press = "false");

    const frame = () => {
      // Two speeds: the dot tracks almost exactly, the brackets trail. That
      // gap is what makes it feel like a lens rather than a sticker.
      x += (tx - x) * 0.32;
      y += (ty - y) * 0.32;
      root.style.setProperty("--x", `${x.toFixed(1)}px`);
      root.style.setProperty("--y", `${y.toFixed(1)}px`);
      root.style.setProperty("--tx", `${tx.toFixed(1)}px`);
      root.style.setProperty("--ty", `${ty.toFixed(1)}px`);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(raf);
      root.remove();
      document.documentElement.classList.remove("has-vf");
    };
  }, []);

  return null;
}
