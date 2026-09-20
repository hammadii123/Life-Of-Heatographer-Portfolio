"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site, whatsappLink } from "@/lib/site";
import { SoundToggle } from "@/components/chrome/Sound";
import "@/styles/chrome.css";

/**
 * The nav starts invisible over the hero — the first thing on this site should
 * be the street, not a menu — and materialises once you leave it.
 * Each label carries its Urdu underneath; on hover the two swap places.
 */
export default function Nav() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > (overHero ? window.innerHeight * 0.7 : 24));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  // Close the mobile panel on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Trap nothing, but do let Escape out, and stop the page scrolling behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="nav no-print"
      data-lifted={lifted || !overHero || open}
      data-open={open}
    >
      <div className="nav__bar shell">
        <Link href="/" className="nav__mark" aria-label={`${site.person}, home`}>
          <span className="nav__mark-en">{site.person}</span>
          <span className="nav__mark-ur urdu" aria-hidden="true">
            {site.urduName}
          </span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="nav__link"
                data-active={active || undefined}
              >
                <span className="nav__link-en">{item.label}</span>
                <span className="nav__link-ur urdu" aria-hidden="true">
                  {item.urdu}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="nav__end">
          <SoundToggle />
          <a
            className="nav__cta"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a shoot
          </a>
          <button
            className="nav__burger"
            aria-expanded={open}
            aria-controls="nav-panel"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className="nav__burger-line" />
            <span className="nav__burger-line" />
          </button>
        </div>
      </div>

      <div className="nav__panel" id="nav-panel" ref={panel} hidden={!open}>
        <div className="shell">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav__panel-link"
              style={{ transitionDelay: `${90 + i * 55}ms` }}
            >
              <span className="display">{item.label}</span>
              <span className="urdu" aria-hidden="true">
                {item.urdu}
              </span>
            </Link>
          ))}
          <a className="nav__panel-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp {site.contact.phoneLocal}
          </a>
        </div>
      </div>
    </header>
  );
}
