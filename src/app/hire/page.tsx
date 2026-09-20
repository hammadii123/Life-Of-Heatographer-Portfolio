import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import { services, faqs } from "@/content/services";
import { site, absolute, whatsappLink, mailLink } from "@/lib/site";
import { businessJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: "Hire a Photographer in Karachi — Rates & Services",
  description:
    "Book a street portrait session, event, brand shoot or documentary commission in Karachi. Published rates, what is included, and honest answers about what a photographer costs here.",
  alternates: { canonical: "/hire" },
  keywords: [
    "hire photographer Karachi",
    "photographer rates Karachi",
    "event photographer Karachi",
    "portrait photographer Karachi",
    "brand photographer Karachi",
    "photography prices Pakistan",
  ],
  openGraph: {
    title: "Hire a Photographer in Karachi — Rates & Services",
    description:
      "Published rates for portraits, events, brand and documentary photography across Karachi.",
    url: absolute("/hire"),
  },
};

export default function HirePage() {
  return (
    <>
      <JsonLd
        data={[
          businessJsonLd(services.map((s) => ({ name: s.name, description: s.description }))),
          faqJsonLd(faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Hire", path: "/hire" },
          ]),
        ]}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Hire" }]}
        urdu="بات سیدھی، اور قیمت سامنے۔"
        title={"Rates, in public,\nlike they should be"}
        lead={`Almost nobody in ${site.location.city} publishes their prices, and it wastes everybody's time. Here is what I charge, what is included, and who each of these is honestly right for.`}
        meta={`Available across ${site.location.city} · Usually replies the same day`}
      />

      <section className="section section--tight">
        <div className="shell">
          <div className="svcs">
            {services.map((s, i) => (
              <article
                className="svc"
                key={s.slug}
                style={{ ["--accent" as string]: s.accent }}
                data-reveal="rise"
                data-delay={i}
              >
                <p className="urdu svc__urdu">{s.urdu}</p>
                <h2 className="display svc__name">{s.name}</h2>
                <p className="mono svc__kicker">{s.kicker}</p>

                <p className="svc__price">
                  {s.price}
                  <small>{s.priceNote}</small>
                </p>

                <div className="svc__meta">
                  <span className="mono">{s.duration}</span>
                  <span className="mono">{s.deliverable}</span>
                </div>

                <p className="svc__desc">{s.description}</p>

                <ul className="svc__list" role="list">
                  {s.includes.map((inc) => (
                    <li key={inc}>{inc}</li>
                  ))}
                </ul>

                <p className="svc__for">
                  <strong>Right for:</strong> {s.bestFor}
                </p>
                {s.notFor && (
                  <p className="svc__not">
                    <strong>Not right for:</strong> {s.notFor}
                  </p>
                )}

                <p style={{ marginTop: "1.4rem" }}>
                  <a
                    className="link-arrow"
                    href={whatsappLink(`Hi Hammad — I'd like to book: ${s.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                  >
                    Book this
                  </a>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- how it works ---------------- */}
      <section className="section" data-tone="raised">
        <div className="shell">
          <header className="head" data-reveal="soft">
            <p className="mono">No surprises</p>
            <h2 className="display head__title">
              What actually <em>happens</em>
            </h2>
          </header>

          <ol className="svcs" role="list">
            {[
              {
                n: "01",
                t: "You message me",
                d: "WhatsApp is fastest. Tell me what the shoot is, roughly when, and where in Karachi. If it is not something I am right for, I will say so in that first reply rather than three days later.",
              },
              {
                n: "02",
                t: "A short call",
                d: "Ten minutes. What the pictures are for, who they are of, what you are worried about. Most people are worried about looking stiff, and that is a solvable problem.",
              },
              {
                n: "03",
                t: "The shoot",
                d: "We walk, or I work the room. Very little direction. I will not ask you to hold a pose for twenty seconds or stand in traffic for a frame.",
              },
              {
                n: "04",
                t: "Previews in 48 hours",
                d: "A handful of finished frames so you have something immediately. The full set follows in five to seven days depending on the booking.",
              },
              {
                n: "05",
                t: "Delivery",
                d: "A private gallery link, full resolution, no watermark, in both print and web sizes. Yours to use as agreed.",
              },
            ].map((step) => (
              <li className="svc" key={step.n} data-reveal="rise">
                <p className="mono" style={{ color: "var(--accent)" }}>
                  {step.n}
                </p>
                <h3 className="display svc__name">{step.t}</h3>
                <p className="svc__desc">{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- faq ---------------- */}
      <section className="section">
        <div className="shell">
          <header className="head" data-reveal="soft">
            <p className="mono">Before you ask</p>
            <h2 className="display head__title">
              The questions people <em>actually</em> ask
            </h2>
          </header>

          <div className="faqs">
            {faqs.map((f) => (
              <details className="faq" key={f.q}>
                <summary data-cursor="link">{f.q}</summary>
                <p className="faq__a">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-tone="deep">
        <div className="shell shell--narrow endnote">
          <p className="urdu endnote__urdu" data-reveal="ink">
            ایک پیغام، اور بات شروع۔
          </p>
          <h2 className="display endnote__title" data-reveal="rise">
            Tell me what the shoot is. I answer the same day.
          </h2>
          <div className="endnote__acts" data-reveal="soft">
            <a
              className="btn"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              WhatsApp {site.contact.phoneLocal}
            </a>
            <a className="btn" data-ghost href={mailLink()} data-cursor="link">
              Email instead
            </a>
            <Link className="btn" data-ghost href="/work" data-cursor="link">
              See the work first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
