import Link from "next/link";
import { nav, site, whatsappLink, mailLink } from "@/lib/site";
import "@/styles/chrome.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot no-print" data-tone="deep">
      <div className="shell">
        <div className="foot__top">
          <div className="foot__say">
            <p className="urdu foot__urdu" data-reveal="soft">
              {site.urduTagline}
            </p>
            <p className="display foot__en" data-reveal="soft" style={{ ["--reveal-delay" as string]: "90ms" }}>
              {site.tagline}
            </p>
          </div>

          <div className="foot__act">
            <a className="foot__cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp
              <span className="mono">{site.contact.phoneLocal}</span>
            </a>
            <a className="foot__cta" href={mailLink()}>
              Email
              <span className="mono">{site.contact.email}</span>
            </a>
          </div>
        </div>

        <hr className="rule" data-reveal="draw" />

        <div className="foot__grid">
          <nav className="foot__col" aria-label="Footer">
            <h2 className="mono">Pages</h2>
            <ul role="list">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          <div className="foot__col">
            <h2 className="mono">Elsewhere</h2>
            <ul role="list">
              <li>
                <a href={site.social.instagram} target="_blank" rel="me noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.instagramAlt} target="_blank" rel="me noopener noreferrer">
                  Artwork account
                </a>
              </li>
            </ul>
          </div>

          <div className="foot__col">
            <h2 className="mono">Where</h2>
            <p className="foot__note">
              {site.location.city}, {site.location.region} — {site.location.country}.
              <br />
              Shooting across {site.areas.slice(0, 4).join(", ")} and the rest of the city.
            </p>
          </div>

          <div className="foot__col">
            <h2 className="mono">Using these photographs</h2>
            <p className="foot__note">
              Every frame on this site belongs to {site.person}. Licences are available — ask, and
              it is usually a yes. Taking one without asking is the only way to get a no.
            </p>
          </div>
        </div>

        <div className="foot__base">
          <p className="mono">
            © {year} {site.person}
          </p>
          <p className="mono">{site.meaning}</p>
        </div>
      </div>
    </footer>
  );
}
