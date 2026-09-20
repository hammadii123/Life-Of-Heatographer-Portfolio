/**
 * The camera, in sound.
 *
 * Everything here is synthesised with the Web Audio API at the moment it is
 * played. There are no audio files: nothing to download, nothing to cache,
 * no latency on the first click, and about 3KB of code instead of 300KB of
 * MP3s. It also means the shutter can be *built* rather than sampled — a real
 * focal-plane shutter is two mechanical events a few milliseconds apart, and
 * you can hear the difference when it is modelled that way.
 *
 * Rules this module keeps to:
 *  - Silent until the visitor asks for sound. Never autoplay. Browsers block
 *    it anyway, and a site that makes noise uninvited is a site people close.
 *  - The choice is remembered per visitor in localStorage.
 *  - The AudioContext is created on the first real gesture, never at import.
 *  - Every sound is short, quiet, and duckable. Nothing loops.
 */

type Voice = "shutter" | "focus" | "tick" | "advance" | "thunk";

const STORE_KEY = "heartographer:sound";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let enabled = false;
let ready = false;

const listeners = new Set<(on: boolean) => void>();

/* -------------------------------------------------------------------------
   State
   ------------------------------------------------------------------------- */

export function isOn() {
  return enabled;
}

/** Returns an unsubscribe function. It returns void so it can be handed
 *  straight back from a React effect as the cleanup. */
export function subscribe(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function broadcast() {
  for (const fn of listeners) fn(enabled);
}

/** Read the remembered preference. Defaults to off. */
export function restore() {
  if (typeof window === "undefined") return false;
  try {
    enabled = window.localStorage.getItem(STORE_KEY) === "on";
  } catch {
    // Private windows and blocked storage both throw. Silence is the safe default.
    enabled = false;
  }
  broadcast();
  return enabled;
}

export function setOn(on: boolean) {
  enabled = on;
  try {
    window.localStorage.setItem(STORE_KEY, on ? "on" : "off");
  } catch {
    /* preference simply will not persist; the session still works */
  }
  if (on) {
    ensure();
    // Confirm with the sound itself, so turning it on demonstrates what it does.
    play("focus");
  }
  broadcast();
}

export function toggle() {
  setOn(!enabled);
  return enabled;
}

/* -------------------------------------------------------------------------
   Engine
   ------------------------------------------------------------------------- */

function ensure() {
  if (ready && ctx) {
    // Chrome suspends the context when a tab is backgrounded.
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  }
  try {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    // Deliberately low. This should sit under the page, not on top of it.
    master.gain.value = 0.16;
    master.connect(ctx.destination);
    ready = true;
  } catch {
    ready = false;
    ctx = null;
  }
  return ctx;
}

/** A short burst of filtered noise — the mechanical part of every camera sound. */
function noise(
  c: AudioContext,
  out: AudioNode,
  {
    at,
    duration,
    gain,
    freq,
    q = 1,
    type = "bandpass",
  }: {
    at: number;
    duration: number;
    gain: number;
    freq: number;
    q?: number;
    type?: BiquadFilterType;
  },
) {
  const frames = Math.max(1, Math.floor(c.sampleRate * duration));
  const buf = c.createBuffer(1, frames, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    // Decaying white noise. The exponent shapes how "hard" the click reads.
    const decay = Math.pow(1 - i / frames, 2.6);
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const src = c.createBufferSource();
  src.buffer = buf;

  const filter = c.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;

  const g = c.createGain();
  g.gain.setValueAtTime(gain, at);
  g.gain.exponentialRampToValueAtTime(0.0001, at + duration);

  src.connect(filter).connect(g).connect(out);
  src.start(at);
  src.stop(at + duration + 0.02);
}

/** A pitched blip — the electronic part. */
function tone(
  c: AudioContext,
  out: AudioNode,
  {
    at,
    duration,
    gain,
    from,
    to = from,
    type = "sine",
  }: {
    at: number;
    duration: number;
    gain: number;
    from: number;
    to?: number;
    type?: OscillatorType;
  },
) {
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, at);
  if (to !== from) osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), at + duration);

  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(gain, at + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, at + duration);

  osc.connect(g).connect(out);
  osc.start(at);
  osc.stop(at + duration + 0.02);
}

/* -------------------------------------------------------------------------
   The voices
   ------------------------------------------------------------------------- */

export function play(voice: Voice) {
  if (!enabled) return;
  const c = ensure();
  if (!c || !master) return;
  const t = c.currentTime;

  switch (voice) {
    /* Two mechanical events ~55ms apart: the mirror going up, then the
       curtain closing. Modelling both is what makes it read as a camera
       rather than as a mouse click. */
    case "shutter":
      noise(c, master, { at: t, duration: 0.028, gain: 0.9, freq: 2600, q: 0.8 });
      noise(c, master, { at: t + 0.004, duration: 0.05, gain: 0.5, freq: 480, q: 1.4 });
      noise(c, master, { at: t + 0.055, duration: 0.038, gain: 0.7, freq: 1700, q: 1.1 });
      tone(c, master, { at: t + 0.055, duration: 0.05, gain: 0.08, from: 180, to: 90 });
      break;

    /* Autofocus confirmation: two short high pips, the sound every camera
       made in 2004 and nobody has improved on. */
    case "focus":
      tone(c, master, { at: t, duration: 0.05, gain: 0.07, from: 2093 });
      tone(c, master, { at: t + 0.085, duration: 0.06, gain: 0.07, from: 2093 });
      break;

    /* The smallest possible acknowledgement — a dial detent. */
    case "tick":
      noise(c, master, { at: t, duration: 0.012, gain: 0.35, freq: 3800, q: 2.2 });
      break;

    /* Film advance: a short mechanical whirr, for moving between pages. */
    case "advance":
      for (let i = 0; i < 7; i++) {
        noise(c, master, {
          at: t + i * 0.021,
          duration: 0.018,
          gain: 0.22 - i * 0.02,
          freq: 1300 + i * 190,
          q: 2.4,
        });
      }
      tone(c, master, { at: t, duration: 0.16, gain: 0.05, from: 140, to: 220, type: "triangle" });
      break;

    /* A soft low body, for a section landing. */
    case "thunk":
      tone(c, master, { at: t, duration: 0.19, gain: 0.09, from: 150, to: 62, type: "sine" });
      noise(c, master, { at: t, duration: 0.03, gain: 0.25, freq: 320, q: 1.1 });
      break;
  }
}
