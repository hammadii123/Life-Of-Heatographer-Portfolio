/**
 * The journal exists for one reason: the people who will eventually hire
 * Hammad are, right now, searching for something else — where to shoot in
 * Karachi, what a photographer costs, how to photograph strangers without
 * being a nuisance. Answer those properly and they arrive already trusting him.
 *
 * Each post is a real answer, long enough to be worth ranking, written in the
 * same voice as the photographs.
 */
export type Post = {
  slug: string;
  title: string;
  urdu: string;
  description: string;
  date: string;
  updated?: string;
  readMinutes: number;
  accent: string;
  /** Slugs from photos.ts used as the post's images, in order. */
  frames: string[];
  /** Body. `h` is a heading, `p` a paragraph, `list` a bulleted block. */
  body: ({ h: string } | { p: string } | { list: string[] } | { quote: string })[];
  tags: string[];
};

export const posts: Post[] = [
  {
    slug: "street-photography-spots-in-karachi",
    title: "Where to Shoot Street Photography in Karachi",
    urdu: "کراچی میں تصویر کہاں سے شروع ہوتی ہے",
    description:
      "Eleven places in Karachi worth carrying a camera to — Empress Market, Burns Road, Kharadar, Sea View and more — with the hour to go, what to expect, and how to not get shouted at.",
    date: "2026-09-02",
    readMinutes: 9,
    accent: "#D9A441",
    frames: ["sunehray-daane", "gumnaam-heero", "feroze-bench"],
    tags: [
      "street photography karachi",
      "photography spots karachi",
      "empress market",
      "burns road",
      "karachi photowalk",
    ],
    body: [
      {
        p: "Every few weeks somebody messages me asking where to go. Usually they have just bought a camera, or they have a phone and two free hours on a Sunday, and they want a list.",
      },
      {
        p: "So here is the list. But the honest answer first: the location matters much less than the hour, and the hour matters much less than whether you are willing to stand in one spot for twenty minutes. I have made nothing at Empress Market on four separate visits and something I still like on a road near my own house. Go anyway.",
      },
      { h: "1. Empress Market and the streets behind it" },
      {
        p: "The obvious one, and it deserves it. The building is the photograph everybody takes; the streets behind it are where the actual pictures are. Flower sellers, pet shops, a fabric section that is the most colour you will see anywhere in the city.",
      },
      {
        p: "Go at 8am on a weekday. By eleven it is crowded enough that you are in the way, and being in the way is how you end up in an argument.",
      },
      { h: "2. Burns Road, after dark" },
      {
        p: "Food street. Tube lights, steel, steam, and people who are entirely used to being photographed and will tell you to get on with it. The light is terrible in a way that is very good: hard, mixed, orange and green at once.",
      },
      { p: "After 8pm. Take nothing you mind getting oil on." },
      { h: "3. Kharadar and Mithadar" },
      {
        p: "Old Karachi. Wooden balconies, narrow lanes, buildings that have been there longer than the country. This is the part of the city that looks like nowhere else in it.",
      },
      {
        p: "Morning, and slowly. This is a residential area and people live their whole lives in these lanes — walk it twice without the camera up before you start shooting.",
      },
      { h: "4. Lyari" },
      {
        p: "Football, murals, boxing clubs, and a warmth toward outsiders that surprises people who only know Lyari from the news. Some of the best portraits I have been allowed to take came from here.",
      },
      {
        p: "Go with somebody who is from there the first time. Not for safety — for manners. Turning up alone with a camera in a neighbourhood that has been photographed badly by outsiders for thirty years is a bad opening.",
      },
      { h: "5. Frere Hall and the Sunday book bazaar" },
      {
        p: "Gardens, an old colonial building, and on Sundays a second-hand book market spread out on the ground. Readers make good subjects because they stop moving and forget you exist.",
      },
      { p: "Sunday morning, before the sun gets high." },
      { h: "6. Sea View and Clifton beach" },
      {
        p: "Camel handlers, families, kites, horses, and the only reliable sunset in a city that is usually too hazy for one. It is the most photographed place in Karachi so you have to work harder for something that is not a postcard.",
      },
      { p: "The hour before sunset, then stay for the hour after. Everybody leaves at sunset; the light after it is better." },
      { h: "7. Tower and the shipping offices" },
      {
        p: "Handcarts, porters, freight, ropes, sacks. Straight labour, all day, in strong sun. Hard light and hard work — this is where you learn to expose for skin in full sun.",
      },
      { h: "8. Saddar — Zainab Market and Preedy Street" },
      {
        p: "Where most of my own work comes from. Cloth, electronics, food carts, chana roasters, tailors. Dense, fast, and generous with faces.",
      },
      { p: "Late afternoon, when the sun drops under the awnings and everything goes gold for about forty minutes." },
      { h: "9. Any road, in the monsoon" },
      {
        p: "For three days a year Karachi gets a mirror. Wet asphalt doubles every light in the city and the whole place is suddenly lit from below. It does not matter where you are. Just get out in it.",
      },
      { p: "Phone in a plastic bag with a hole cut for the lens. That is the whole technique." },
      { h: "10. Your own neighbourhood" },
      {
        p: "The one nobody lists, and the one that will actually produce your best work. You know the light in your own area at every hour without having to think. You know which corner has the cat and which shutter opens at seven.",
      },
      {
        p: "The photograph of mine that reached the most people — by a factor of about fifty — is a picture of a building on a campus I walked through for four years. Familiarity is not a handicap. It is the whole advantage.",
      },
      { h: "11. The one I am not going to tell you" },
      { p: "Every photographer has one. Find your own." },
      { h: "How to do this without being a nuisance" },
      {
        list: [
          "Learn the sentence. \"Bhai, ek tasveer le loon?\" You will get a yes far more often than you expect.",
          "Show them the picture afterwards. Always. It costs four seconds and it is the difference between taking something and sharing something.",
          "If someone says no, say thank you and walk away. There is no second ask.",
          "Delete it on the spot if you are asked to. Do it in front of them.",
          "Do not photograph children without a parent visible and comfortable.",
          "Poverty is not a subject. If the only content of the frame is that somebody has less than you, you have not made a photograph, you have made a report.",
        ],
      },
      {
        quote:
          "The location is a place to stand. The photograph is what you are willing to wait for.",
      },
      {
        p: "Go out this week. Take the phone you already have. Come back with nothing four times, which is normal and which nobody posts about, and then on the fifth time come back with one frame you cannot stop looking at.",
      },
    ],
  },
  {
    slug: "how-much-photographer-costs-karachi",
    title: "What a Photographer Actually Costs in Karachi",
    urdu: "کراچی میں فوٹوگرافر کا خرچ",
    description:
      "An honest breakdown of photography rates in Karachi in 2026 — portraits, events, brand shoots — what changes the price, and what to ask before you pay anyone.",
    date: "2026-08-14",
    readMinutes: 6,
    accent: "#2AA9B0",
    frames: ["unki-hansi", "ummeed-wali-aankhen"],
    tags: ["photographer rates karachi", "photography price pakistan", "hire photographer karachi"],
    body: [
      {
        p: "Almost nobody in this city publishes their rates, and it is bad for everyone. You end up messaging six people, getting six wildly different numbers, and having no idea which one is reasonable.",
      },
      { p: "So here is how it actually works." },
      { h: "What you are paying for" },
      {
        p: "Not the hours on the day. A two-hour portrait session is two hours of shooting and roughly six hours of everything else: the call beforehand, the travel, the culling, the edit, the export, the delivery, and the admin. When somebody quotes you a half-day rate, they are quoting you a day.",
      },
      { h: "Rough ranges in Karachi, 2026" },
      {
        list: [
          "Street or lifestyle portrait session — PKR 8,000 to 20,000 for around two hours",
          "Single event or function, five hours — PKR 20,000 to 45,000",
          "Brand or product shoot day — PKR 30,000 to 80,000, depending on usage rights",
          "Full wedding coverage — a different market entirely, and worth going to a specialist for",
          "Documentary or editorial — priced per project, never per hour",
        ],
      },
      {
        p: "If someone is far below those, ask what is missing — usually it is the edit, or the delivery timeline, or they are new and building a portfolio, which is a perfectly good reason and worth taking a chance on.",
      },
      { h: "What actually moves the price" },
      {
        list: [
          "Usage. A portrait for yourself and a photograph that will run on a brand's billboard are not the same product, even if the shoot is identical.",
          "Turnaround. 48 hours costs more than seven days because it displaces other work.",
          "Number of finished frames, not number of shots taken.",
          "Locations. Two is more than one, mostly because of Karachi traffic.",
          "Whether anyone needs to be paid on the day — assistants, permissions, a venue.",
        ],
      },
      { h: "Five questions worth asking anyone you hire" },
      {
        list: [
          "How many edited frames do I get, and by when?",
          "What are the usage rights — can I use these commercially?",
          "Do I get full resolution, and is anything watermarked?",
          "What happens if it rains, or I have to move the date?",
          "Can I see a full gallery from one real shoot, not just your best six frames?",
        ],
      },
      {
        p: "That last one matters more than the rest put together. Anyone can assemble six good pictures. Ask to see everything from one job.",
      },
      { h: "My own rates" },
      {
        p: "They are on the hire page, with what is included in each. I would rather you know before you message me — if the number is wrong for you, neither of us has wasted an afternoon finding that out.",
      },
    ],
  },
  {
    slug: "photographing-strangers-karachi",
    title: "How to Photograph Strangers Without Being a Nuisance",
    urdu: "اجنبی چہرے، اور تھوڑی سی تمیز",
    description:
      "Street photography ethics in Pakistan — asking, being refused, showing the picture, and the difference between documenting someone and using them.",
    date: "2026-07-21",
    readMinutes: 5,
    accent: "#B4703A",
    frames: ["gumnaam-heero", "fann-e-baqa", "ustad-e-bazaar"],
    tags: ["street photography ethics", "photographing strangers", "karachi", "consent"],
    body: [
      {
        p: "The most common question I get is not about cameras. It is some version of: how do you point a camera at a stranger without feeling like a creep?",
      },
      { p: "Partly you do not. A bit of that feeling is correct and you should keep it." },
      { h: "Ask more than you think you need to" },
      {
        p: "There is a myth that asking destroys the moment. Sometimes it does. Far more often the person straightens up for two seconds, realises nothing is happening, relaxes, and gives you something better than the frame you were about to steal.",
      },
      {
        p: "Almost everyone I have asked in this city has said yes. Karachi is not a suspicious place. It is a place that is used to being photographed badly.",
      },
      { h: "Show them the picture" },
      {
        p: "Every time, if they are still there. Four seconds. It converts the whole thing from something you took into something you made together, and half the time you get a better second frame because now they are interested.",
      },
      { h: "A no is a no, immediately" },
      {
        p: "No negotiating, no explaining that it is art, no second ask. Say thanks and go. And if someone tells you afterwards to delete it, delete it in front of them.",
      },
      { h: "The line I try not to cross" },
      {
        p: "Poverty is not a subject. If the entire content of a frame is that somebody has less than the person looking at it, that is not a photograph, it is a report, and the person in it did not agree to be the evidence.",
      },
      {
        p: "The test I use: would I be comfortable if this person saw it, on my phone, right now, with me standing there? If the answer is no, the picture does not get published, however good it is.",
      },
      {
        quote:
          "Photograph people the way you would want somebody to photograph your own father on his worst working day.",
      },
      { h: "Children" },
      {
        p: "A parent visible, and comfortable, or I do not take it. The two children on the front page of this site were photographed with their family at the next table, who saw the whole thing and asked me to send it.",
      },
      { h: "Send the picture" },
      {
        p: "If someone gives you their number, actually send it. Most photographers do not and it is the cheapest decent thing you can do. The chana seller in my Saddar frames has that photograph on his phone. He asked for it for his son.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);
