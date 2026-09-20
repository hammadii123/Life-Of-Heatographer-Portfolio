import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Frame from "@/components/ui/Frame";
import JsonLd from "@/components/ui/JsonLd";
import { photoBySlug } from "@/content/photos";
import { site, absolute, whatsappLink } from "@/lib/site";
import { personJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import "@/styles/pages.css";

export const metadata: Metadata = {
  title: `About ${site.person} — Street Photographer in Karachi`,
  description: `Hammad Mustafa photographs the people Karachi walks past. No studio, no crew — a Google Pixel, the street, and the patience to wait. Available for portraits, events, brand and documentary work.`,
  alternates: { canonical: "/about" },
  openGraph: { url: absolute("/about") },
};

export default function AboutPage() {
  const portrait = photoBySlug("ummeed-wali-aankhen")!;

  return (
    <>
      <JsonLd
        data={[
          personJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <PageHeader
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        urdu="دل جہاں رکتا ہے، کیمرہ وہیں دیکھتا ہے۔"
        title={"I am not a better\nphotographer.\nI am the one\nwho stops."}
        lead={`${site.person}. Street and documentary photographer, Karachi.`}
      />

      <section className="section section--tight">
        <div className="shell about__split">
          <div className="about__sticky">
            <Frame
              slug={portrait.slug}
              alt={portrait.alt}
              ratio={portrait.ratio}
              accent={portrait.accent}
              title={portrait.title}
              sizes="(max-width: 900px) 92vw, 42vw"
              priority
              develop={false}
              cursorLabel={portrait.urduTitle}
            />
            <p className="mono" style={{ marginTop: "1rem", textTransform: "none", letterSpacing: "0.02em" }}>
              Not me — him. The only portrait on this page is of somebody else, which is roughly the
              point.
            </p>
          </div>

          <div className="about__prose prose">
            <h2 data-reveal="rise">The word</h2>
            <p data-reveal="soft">
              <em>Heartographer.</em> Heart, plus photographer. Not <em>one who takes pictures</em> —
              one who photographs with the heart. I picked it years ago and I have never come up with
              a better description of what I am trying to do.
            </p>

            <h2 data-reveal="rise">What I actually do</h2>
            <p data-reveal="soft">
              I walk. Saddar, Empress Market, Burns Road, Kharadar, Lyari, and the few kilometres
              around wherever I happen to be. I look at people who are being looked at by nobody, and
              when something stops me, I stop.
            </p>
            <p data-reveal="soft">
              That is the whole craft. Not equipment, not editing. The willingness to stand still on a
              street where standing still is strange, to be stared at for it, and to wait — sometimes
              twenty minutes — for a man to forget I am there, because a face that knows it is being
              photographed is wearing something, and I want the thing underneath.
            </p>

            <h2 data-reveal="rise">On the phone</h2>
            <p data-reveal="soft">
              Almost everything on this site was made with a Google Pixel. No studio, no lights, no
              assistant, no bag.
            </p>
            <p data-reveal="soft">
              I know that is not the answer people want. But equipment decides how large you can
              print; it does not decide whether the photograph is any good. What it decides, and this
              is the part that actually matters on a Karachi street, is whether anybody tenses up when
              you lift it. Nobody performs for a phone.
            </p>

            <h2 data-reveal="rise">The day I understood the job</h2>
            <p data-reveal="soft">
              In June 2026 I photographed an empty building on the campus I had just finished at. No
              face, no action, flat grey light, one line of Urdu across the sky.
            </p>
            <p data-reveal="soft">
              It reached more people than everything else I had made put together — seven and a half
              thousand of them, a hundred and sixty of whom wrote something. Almost all of those
              comments were about their <em>own</em> campus, not mine.
            </p>
            <p data-reveal="soft">
              I have made far better photographs. That one landed because it was true, and because it
              was a door into somebody else&rsquo;s memory. <em>People do not stop for a good
              photograph. They stop for a true one.</em>
            </p>

            <h2 data-reveal="rise">Working with me</h2>
            <p data-reveal="soft">
              Portraits, events, brand work and documentary commissions across Karachi. I shoot client
              work the same way I shoot the street — quietly, from the edge, waiting for the moment
              between the posed ones.
            </p>
            <p data-reveal="soft">
              I will also tell you honestly when a job is not right for me. Full multi-day weddings,
              for instance, are a specialist craft and I will point you at someone who does them
              properly.
            </p>

            <dl className="facts" data-reveal="soft">
              <div>
                <dt className="mono">Based</dt>
                <dd>
                  {site.location.city}, {site.location.region}, {site.location.country}
                </dd>
              </div>
              <div>
                <dt className="mono">Works in</dt>
                <dd>{site.areas.join(" · ")}</dd>
              </div>
              <div>
                <dt className="mono">Languages</dt>
                <dd>Urdu, English</dd>
              </div>
              <div>
                <dt className="mono">Equipment</dt>
                <dd>{site.gear}</dd>
              </div>
              <div>
                <dt className="mono">Elsewhere</dt>
                <dd>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="wipe"
                    data-cursor="link"
                  >
                    @{site.handle}
                  </a>
                </dd>
              </div>
            </dl>

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
              <Link className="btn" data-ghost href="/hire" data-cursor="link">
                Rates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
