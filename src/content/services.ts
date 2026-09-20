/**
 * What Hammad actually sells, and what it costs.
 *
 * HAMMAD: every rupee figure below is a GUESS and must be replaced before this
 * page goes live. I picked numbers that sit where a Karachi photographer with
 * your body of work but no studio would realistically sit — high enough not to
 * be treated as free, low enough that a first client says yes. They are a
 * starting point for you to argue with, not a recommendation.
 *
 * Publishing prices at all is a deliberate choice: "DM for rates" loses you the
 * people who were ready to book and keeps the ones who want to negotiate.
 */
export type Service = {
  slug: string;
  name: string;
  urdu: string;
  kicker: string;
  /** Displayed price. Keep the currency in the string. */
  price: string;
  priceNote: string;
  duration: string;
  deliverable: string;
  description: string;
  includes: string[];
  /** Who this is honestly right for — and who it is not. */
  bestFor: string;
  notFor?: string;
  accent: string;
};

export const services: Service[] = [
  {
    slug: "street-portrait",
    name: "Street Portrait Session",
    urdu: "پورٹریٹ",
    kicker: "You, photographed like the city",
    price: "PKR 12,000",
    priceNote: "VERIFY — set your real rate",
    duration: "2 hours, one location",
    deliverable: "20 edited frames in 5 days",
    description:
      "We walk. Saddar, Burns Road, Frere Hall, the sea — wherever suits you. No studio, no lights, no posing that makes you feel stupid. I shoot the way I shoot the street: I wait until you forget the camera, and that is the frame we keep.",
    includes: [
      "A short call first, so we both know what we are doing",
      "2 hours, one area of Karachi, walking",
      "20 fully edited frames, my grade",
      "Web + print resolution, no watermark",
      "Delivery in 5 days",
    ],
    bestFor:
      "Anyone who hates being photographed and has seen too many stiff studio portraits of themselves.",
    notFor: "Heavily retouched, glamour-style beauty work. That is a real craft and it is not mine.",
    accent: "#2AA9B0",
  },
  {
    slug: "event",
    name: "Event & Function",
    urdu: "تقریب",
    kicker: "Candid, not lined-up",
    price: "PKR 25,000",
    priceNote: "VERIFY — half-day rate",
    duration: "Up to 5 hours",
    deliverable: "80–120 edited frames in 7 days",
    description:
      "Birthdays, mehndis, corporate evenings, launches. I work the room the way I work a street: quietly, from the edges, looking for the moment between the posed ones. You will get the group shots — everybody needs those — but the pictures you actually keep will be the other ones.",
    includes: [
      "Up to 5 hours of coverage",
      "80–120 edited frames",
      "The formal group shots, done properly",
      "A private gallery link to share with family",
      "Delivery in 7 days, 15 preview frames in 48 hours",
    ],
    bestFor: "Families and small companies who want the evening remembered, not performed.",
    notFor:
      "Full multi-day wedding coverage. I will refer you to somebody who does that for a living.",
    accent: "#D9A441",
  },
  {
    slug: "brand",
    name: "Brand & Product",
    urdu: "برانڈ",
    kicker: "Your product, on a real street",
    price: "PKR 35,000",
    priceNote: "VERIFY — per shoot day",
    duration: "One shoot day",
    deliverable: "30 edited frames, licensed for commercial use",
    description:
      "For brands who want images that look like Karachi instead of like a stock library. Clothing on real people in real light, food where it is actually eaten, product in the hands of somebody who would actually use it. This is the work I do with brands who want the city in the frame, not a white cyclorama.",
    includes: [
      "Pre-shoot moodboard and shot list",
      "One full shoot day, up to two locations",
      "30 edited frames",
      "Commercial licence, print and digital",
      "Vertical crops for stories and reels",
    ],
    bestFor: "Clothing, food, cafés, and anyone selling something that belongs to this city.",
    accent: "#B4703A",
  },
  {
    slug: "documentary",
    name: "Documentary & Editorial",
    urdu: "دستاویزی",
    kicker: "A story, properly told",
    price: "Let's talk",
    priceNote: "Scoped per project",
    duration: "Days to weeks",
    deliverable: "A complete photo essay, with the writing",
    description:
      "A neighbourhood, a trade, a community, a single person's working day. This is the work on the rest of this site, commissioned. It takes real time — you cannot photograph a place honestly in an afternoon — and it comes with the words, because a photo essay without text is a slideshow.",
    includes: [
      "Research and access, before any photography",
      "Multiple visits over days or weeks",
      "A sequenced essay, not a folder of files",
      "Captions and story text written by me",
      "Full usage rights negotiated up front",
    ],
    bestFor: "NGOs, publications, brands with a real story, and anyone documenting Karachi properly.",
    accent: "#8FA39A",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/**
 * These answer the questions people actually type into Google before they
 * book — which is why they are also the FAQ schema on /hire.
 */
export const faqs = [
  {
    q: "How much does a photographer cost in Karachi?",
    a: "It depends entirely on what you need. A two-hour street portrait session with me starts around PKR 12,000, an event is around PKR 25,000 for five hours, and a brand shoot day is around PKR 35,000. Documentary work is scoped per project. Anyone quoting you a single number without asking what the shoot is has not understood the shoot.",
  },
  {
    q: "Which areas of Karachi do you shoot in?",
    a: "All of it. Most of my personal work is from Saddar, Empress Market, Burns Road, Kharadar and Lyari, but I shoot client work anywhere in the city — Clifton, DHA, Gulshan, Korangi, Sea View. If it is inside Karachi, travel is included.",
  },
  {
    q: "What equipment do you use?",
    a: "A Google Pixel. I know that is not the answer people expect. Almost everything on this site was made with a phone, and the frames have been seen by tens of thousands of people. Equipment decides how big you can print. It does not decide whether the photograph is any good.",
  },
  {
    q: "How quickly do I get the photographs?",
    a: "Portraits in five days, events in seven, with a set of preview frames within 48 hours so you have something to post while you wait. If you need it faster, say so before the shoot and I will tell you honestly whether it is possible.",
  },
  {
    q: "Do you photograph weddings?",
    a: "Not full multi-day weddings — that is a specialist job and doing it badly would be unfair to you. I do shoot single functions, mehndis and valimas as an event booking, and I am happy to refer you to people who do complete wedding coverage properly.",
  },
  {
    q: "Can I get the unedited files?",
    a: "No, and every photographer will tell you the same thing. The edit is not a filter applied at the end — it is half the work, and the grade is the reason the photographs look like mine. What you get is the finished frame, at full resolution, with no watermark.",
  },
  {
    q: "Do you ask people before photographing them on the street?",
    a: "For portraits, almost always. For candid street frames, usually not in the moment — that is what makes them candid — but I show people the picture afterwards if they are still there, and I delete it on the spot if anyone asks me to. Nobody on this site is here against their wishes.",
  },
  {
    q: "How do I book?",
    a: `WhatsApp is fastest — 0316 2223288. Tell me what the shoot is, roughly when, and where in Karachi. I answer the same day, and I will tell you honestly if it is not something I am the right person for.`,
  },
];
