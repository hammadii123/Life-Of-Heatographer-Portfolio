"use client";

import { useEffect, useState } from "react";
import { play, restore, subscribe, toggle, isOn } from "@/lib/sound";

/**
 * Wires the camera sounds to the whole document with delegated listeners, so
 * no component has to know that sound exists.
 *
 * The mapping is deliberately sparse. A site that makes a noise at every
 * pointer movement is exhausting within thirty seconds; a site that makes
 * exactly the right noise four times feels expensive. So:
 *
 *   entering a photograph  → autofocus pips
 *   opening a photograph   → the shutter
 *   any other navigation   → film advance
 *   a button or a filter   → a dial detent
 *
 * Nothing plays until the visitor turns sound on, and that choice is theirs
 * and is remembered.
 */
export default function Sound() {
  useEffect(() => {
    restore();

    // One pip per photograph entered, not per pixel moved across it.
    let lastFrame: Element | null = null;
    let lastAt = 0;

    const onOver = (e: PointerEvent) => {
      const frame = (e.target as Element)?.closest?.('[data-cursor="frame"]');
      if (!frame || frame === lastFrame) {
        if (!frame) lastFrame = null;
        return;
      }
      lastFrame = frame;
      const now = performance.now();
      if (now - lastAt < 380) return;
      lastAt = now;
      play("focus");
    };

    const onClick = (e: MouseEvent) => {
      const el = e.target as Element;
      if (!el?.closest) return;

      if (el.closest('[data-cursor="frame"]')) {
        play("shutter");
        return;
      }
      if (el.closest("button, summary, [role='button']")) {
        play("tick");
        return;
      }
      // An internal link means the page is about to change.
      const link = el.closest("a[href]") as HTMLAnchorElement | null;
      if (link && link.origin === window.location.origin) {
        play("advance");
      }
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}

/**
 * The switch. Lives in the nav.
 *
 * Renders as "off" on the server and syncs on mount, because the preference
 * is in localStorage and guessing it during SSR would hydrate wrong.
 */
export function SoundToggle() {
  const [on, setOnState] = useState(false);

  useEffect(() => {
    setOnState(restore());
    return subscribe(setOnState);
  }, []);

  return (
    <button
      className="soundBtn"
      onClick={() => setOnState(toggle())}
      aria-pressed={on}
      title={on ? "Sound on — click to mute" : "Sound off — click for the shutter"}
      data-cursor="link"
      data-cursor-label={on ? "mute" : "sound"}
    >
      <span className="visually-hidden">
        {on ? "Turn camera sounds off" : "Turn camera sounds on"}
      </span>
      {/* Five bars that stand up when sound is live. */}
      <span className="soundBtn__bars" aria-hidden="true" data-on={on || undefined}>
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}

export { isOn };
