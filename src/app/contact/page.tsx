import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import { site, absolute, whatsappLink, mailLink } from "@/lib/site";
import { businessJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: `Contact ${site.person} — Photographer in Karachi`,
  description: `Book a shoot or ask a question. WhatsApp ${site.contact.phoneLocal}, email ${site.contact.email}. Based in Karachi, available across the city.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: absolute("/contact") },
};

export default function ContactPage() {
  const ways = [
    {
      name: "WhatsApp",
      urdu: "واٹس ایپ",
      value: site.contact.phoneLocal,
      href: whatsappLink(),
      external: true,
      note: "Fastest. Tell me what the shoot is, roughly when, and where in Karachi. Same-day reply almost always.",
      accent: "#2AA9B0",
    },
    {
      name: "Email",
      urdu: "ای میل",
      value: site.contact.email,
      href: mailLink("Shoot enquiry — from the website"),
      external: false,
      note: "Better for anything with a brief attached, or if you need a quote in writing for approval.",
      accent: "#D9A441",
    },
    {
      name: "Instagram",
      urdu: "انسٹاگرام",
      value: `@${site.handle}`,
      href: site.social.instagram,
      external: true,
      note: "Where the work goes first. DMs are open, but they are slower than WhatsApp.",
      accent: "#B4703A",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          businessJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        urdu="ایک پیغام، اور بات شروع۔"
        title={"Let's talk about\nwhat you want\nphotographed"}
        lead="No form. Forms are where enquiries go to sit in a spam folder. Pick whichever of these you actually use and message me directly."
        meta={`${site.location.city}, ${site.location.country} · PKT (UTC+5)`}
      />

      <section className="section section--tight">
        <div className="shell">
          <div className="ways">
            {ways.map((w) => (
              <a
                className="way"
                key={w.name}
                href={w.href}
                target={w.external ? "_blank" : undefined}
                rel={w.external ? "noopener noreferrer" : undefined}
                style={{ ["--accent" as string]: w.accent }}
                data-reveal="rise"
                data-cursor="link"
                data-cursor-label={w.name}
              >
                <p className="urdu way__urdu">{w.urdu}</p>
                <h2 className="display way__name">{w.name}</h2>
                <p className="way__value">{w.value}</p>
                <p className="way__note">{w.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" data-tone="raised">
        <div className="shell">
          <div className="about__split">
            <div>
              <h2 className="display head__title" data-reveal="rise">
                What to tell me
              </h2>
              <p className="lead" data-reveal="soft">
                The more of this you include in the first message, the faster I can give you a real
                answer instead of four follow-up questions.
              </p>
            </div>

            <ul className="svc__list" role="list" data-reveal="soft" style={{ marginTop: 0 }}>
              {[
                "What the shoot is — portrait, event, brand, documentary",
                "Roughly when, and how long you need me for",
                "Where in Karachi",
                "What the pictures are for — Instagram, print, a website, yourself",
                "Anything you are worried about. Usually it is looking stiff, and it is fixable",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" data-tone="deep">
        <div className="shell shell--narrow endnote">
          <p className="urdu endnote__urdu" data-reveal="ink">
            اور اگر صرف بات کرنی ہو، تب بھی لکھ دیجیے۔
          </p>
          <h2 className="display endnote__title" data-reveal="rise">
            And if you just want to talk about photography, that is fine too.
          </h2>
          <p className="lead" data-reveal="soft">
            People message me asking where to shoot, what to buy, how to ask a stranger. I answer
            those. Some of them turned into the journal.
          </p>
          <div className="endnote__acts" data-reveal="soft">
            <Link className="btn" href="/journal" data-cursor="link">
              Read the journal
            </Link>
            <Link className="btn" data-ghost href="/hire" data-cursor="link">
              See the rates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
