/**
 * Single source of truth for everything the site claims about Hammad.
 * Anything marked VERIFY must be confirmed before launch.
 */
function resolveSiteUrl() {
  const set = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (set) {
    const bare = set.replace(/^https?:\/\//, "").replace(/\/+$/, "");
    if (bare) return `https://${bare}`;
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Heartographer",
  person: "Hammad Mustafa",
  handle: "life_of_heartographer",

  /** The whole brand in one line. Everything else descends from this. */
  meaning: "heart + photographer — one who photographs with the heart.",
  urduName: "ہارٹوگرافر",

  tagline: "Sab guzar rahe the. Main ruk gaya.",
  urduTagline: "سب گزر رہے تھے۔ میں رک گیا۔",

  role: "Street & Documentary Photographer",
  description:
    "Hammad Mustafa is a street and documentary photographer in Karachi. He photographs the people the city walks past — vendors, workers, strays, children, the monsoon — and writes the story behind every frame. Available for portraits, events, brand and documentary work across Karachi.",

  url: resolveSiteUrl(),
  locale: "en_PK",
  since: "2024",

  location: {
    city: "Karachi",
    region: "Sindh",
    country: "Pakistan",
    countryCode: "PK",
    timezone: "Asia/Karachi",
    // Karachi city centre — used for LocalBusiness geo + "near me" queries.
    lat: 24.8607,
    lng: 67.0011,
  },

  /** Areas he actually shoots in. Doubles as local-SEO surface area. */
  areas: [
    "Saddar",
    "Empress Market",
    "Burns Road",
    "Kharadar",
    "Lyari",
    "Clifton",
    "Sea View",
    "Frere Hall",
    "Tower",
    "Gulshan-e-Iqbal",
    "DHA",
    "Korangi",
  ],

  contact: {
    // VERIFY: confirm this is the address you want on a public photography site.
    email: "hammadworks123@gmail.com",
    phoneLocal: "0316 2223288",
    phoneIntl: "+923162223288",
    whatsapp: "923162223288",
  },

  social: {
    instagram: "https://www.instagram.com/life_of_heartographer/",
    instagramAlt: "https://www.instagram.com/hammadiiartwork/",
    // VERIFY: add these once they exist, or delete the keys.
    threads: "https://www.threads.net/@life_of_heartographer",
  },

  /** Honest equipment note — he shoots mobile, and that is part of the story. */
  gear: "Google Pixel. No studio, no crew — one phone, one city, and the patience to wait.",
} as const;

export const whatsappLink = (
  text = "Assalam o Alaikum Hammad, I saw your photography site and I'd like to book a shoot.",
) => `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject = "Shoot enquiry", body = "") =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export const absolute = (path = "/") => new URL(path, site.url).toString();

export const nav = [
  { href: "/work", label: "Work", urdu: "کام" },
  { href: "/chapters", label: "Chapters", urdu: "باب" },
  { href: "/about", label: "About", urdu: "تعارف" },
  { href: "/hire", label: "Hire", urdu: "بکنگ" },
  { href: "/journal", label: "Journal", urdu: "ڈائری" },
] as const;
