import type { ChapterId } from "./chapters";

/**
 * Every photograph on this site is a page, with its own story, its own Urdu
 * line and its own structured data.
 *
 * `slug` is also the filename: /public/gallery/<slug>.jpg. `ratio` is
 * width/height of the real file and must match it, or the layout shifts while
 * the image loads.
 *
 * ---------------------------------------------------------------------------
 * HAMMAD — READ THIS
 *
 * These 22 frames were pulled from your own Instagram posts, so the pictures
 * are right. The *words* are mine: written from your captions and from what is
 * visible in each frame. You were there and I was not, so every story below is
 * a draft until you have read it. Fix anything that isn't true — a confident
 * wrong detail is worse than no detail at all.
 *
 * Two specific things to check:
 *  1. The campus frames (DZu71LqHxib) already have your own Urdu burned into
 *     the image. The `urdu` field on those is a *different* line, meant to sit
 *     under the photo, not repeat it. Change or empty them as you prefer.
 *  2. Names and places are deliberately vague where I did not know them. If
 *     you know the man's name, use it. A name is worth more than an adjective.
 *
 * Instagram serves 1080–1440px, so these are web-resolution. When you have the
 * originals, overwrite the files in /public/gallery — nothing else changes.
 * ---------------------------------------------------------------------------
 */
export type Photo = {
  slug: string;
  title: string;
  urduTitle: string;
  chapter: ChapterId;
  /** width / height of the real file. */
  ratio: number;
  /** Descriptive alt text. This is what Google Images ranks. */
  alt: string;
  place: string;
  date: string;
  when: string;
  urdu: string;
  caption: string;
  story: string[];
  howItWasMade: string;
  tags: string[];
  accent: string;
  instagram?: string;
  note?: string;
  featured?: boolean;
  /** Part of the campus photo-essay, which reads in sequence. */
  essay?: "campus";
};

export const photos: Photo[] = [
  /* =====================================================================
     چہرے — FACES
     ===================================================================== */
  {
    slug: "unki-hansi",
    title: "Their Laughter Said It All",
    urduTitle: "ان کی ہنسی",
    chapter: "chehray",
    ratio: 1440 / 1920,
    alt: "Two young Pakistani children at a restaurant table in Karachi, the older girl laughing at the camera and a small child peering over the table edge, a tray of fries and ketchup in front of them",
    place: "Karachi",
    date: "2026-08-18",
    when: "August 2026",
    urdu: "کچھ لمحات لفظوں کے محتاج نہیں ہوتے،\nان کا ہنسنا ہی اس شام کا سب سے خوبصورت منظر تھا۔",
    caption: "Some moments don't need words — their laughter said it all.",
    story: [
      "A tray of fries, one bottle of ketchup, and two of them guarding it like it was the last plate in Karachi.",
      "The little one can barely see over the table. He has his chin on the edge and his eyes just clear the top, and he is watching the fries, not me. His sister is the one who looked up.",
      "I did not ask her to smile. I have never once got a real smile by asking. The phone was already on the table and I lifted it about four inches.",
      "That whole evening cost somebody maybe a hundred and fifty rupees. I have sat at dinners costing two hundred times that which produced nothing close to this.",
    ],
    howItWasMade:
      "Phone flat on the next table, lifted four inches, one frame. No flash — the restaurant's own tubelight and the green string lights behind did all of it.",
    tags: ["street photography karachi", "children", "candid", "dhaba", "laughter"],
    accent: "#D98A3A",
    instagram: "https://www.instagram.com/p/DcL9k2JsLAy/",
    featured: true,
  },
  {
    slug: "ummeed-wali-aankhen",
    title: "Eyes Shining With Hope",
    urduTitle: "امید والی آنکھیں",
    chapter: "chehray",
    ratio: 1440 / 1800,
    alt: "Elderly Pakistani man with a full white beard in a pale mint kurta standing at his cloth stall in Karachi, bright printed fabrics hanging on the rail behind him",
    place: "Karachi",
    date: "2024-03-06",
    when: "March 2024",
    urdu: "آنکھوں میں امید، دل میں اللہ کی مدد کا یقین۔",
    caption:
      "Eyes shining with hope, waiting for Allah's help. A smile that never fades tells a story of unyielding faith.",
    story: [
      "Behind him, every colour the stall sells, hung up in a row like flags. In front of him, the same stretch of footpath he has stood on for years.",
      "I asked how the day had been. He said what everyone in this city says — that it was fine, that Allah is enough, that it will get better.",
      "People say that sentence here the way other people say hello. Most of the time it is politeness. Sometimes you look at the person saying it and you realise they mean every single word of it, and it stops being small talk and becomes the most serious thing anybody has said to you all week.",
      "This was one of those times, and it is in the eyes, not the mouth. The smile is ordinary. The eyes are not.",
      "This is the photograph I go back to when I have not made anything good in a month and I am wondering why I keep doing this.",
    ],
    howItWasMade:
      "Asked first, then waited for him to stop posing. Available light, exposed for his face and let the fabrics go bright behind him.",
    tags: ["portrait", "cloth vendor", "karachi", "hope", "faith", "street portrait"],
    accent: "#8FA39A",
    instagram: "https://www.instagram.com/p/C4M1PfSIhi1/",
    featured: true,
  },
  {
    slug: "ustad-e-bazaar",
    title: "Back to the Road",
    urduTitle: "استادِ بازار",
    chapter: "chehray",
    ratio: 1440 / 1800,
    alt: "The same elderly bearded Karachi vendor out on an open tree-lined road, hands resting on the handle of his cart, rickshaws and traffic blurred behind him",
    place: "Karachi",
    date: "2024-03-06",
    when: "March 2024",
    urdu: "دن ختم نہیں ہوتا، بس سڑک بدل جاتی ہے۔",
    caption: "The day does not end. The road just changes.",
    story: [
      "The same man, twenty minutes later, out on the road with his hands back on the handle.",
      "I keep both frames together on purpose. The first one is the portrait — him standing still, letting himself be looked at. This one is the job: the cart, the traffic, the going.",
      "Most photographs of working people pick one of those and pretend it is the whole person. He is both, in the same afternoon, twenty minutes apart.",
      "He is also, I think, faintly amused that I was still there.",
    ],
    howItWasMade:
      "Shot wider and from further back so the traffic reads, at a slow enough shutter to keep the rickshaws soft behind him.",
    tags: ["vendor", "karachi", "cart", "street", "portrait"],
    accent: "#7E9A86",
    instagram: "https://www.instagram.com/p/C4M1PfSIhi1/",
  },
  {
    slug: "gumnaam-heero",
    title: "Unseen Hero of His Family",
    urduTitle: "گمنام ہیرو",
    chapter: "chehray",
    ratio: 1440 / 1716,
    alt: "A man in a teal shirt resting his head on his hand in the open cab of his truck in Karachi, a large stack of bananas loaded in front of him",
    place: "Karachi",
    date: "2024-11-07",
    when: "November 2024",
    urdu: "اپنے گھر کا گمنام ہیرو۔",
    caption: "Unseen hero of his family.",
    story: [
      "Look at the bananas before you look at him. Every bunch turned the same way, stacked into a wall by hand, in the dark, at whatever hour the market opens.",
      "Then look at him. Head on his hand, in the doorway of his own cab, in the middle of a working day. Not asleep. Just done, for a minute.",
      "Nobody taught him to stack like that in a design school and nobody is ever going to praise him for it. He will unbuild that wall by tonight and rebuild it tomorrow.",
      "Somebody is eating tonight because he did. There is no record of that anywhere, and when he stops doing it the market will not notice.",
      "So this is the record. It is not much. But it exists now, and it has his face on it.",
    ],
    howItWasMade:
      "From the pavement, framing the fruit and the man in one rectangle so neither could be read without the other.",
    tags: ["fruit vendor", "karachi", "labour", "documentary", "portrait", "bananas"],
    accent: "#E0A53A",
    instagram: "https://www.instagram.com/p/DCEyUXGtafe/",
    featured: true,
  },
  {
    slug: "feroze-bench",
    title: "The Turquoise Bench",
    urduTitle: "فیروزی بینچ",
    chapter: "chehray",
    ratio: 1440 / 1800,
    alt: "A man in a rust-brown shalwar kameez, cap and patterned scarf resting on a bright turquoise bench under a tree in Karachi, his hand against his face",
    place: "Karachi",
    date: "2024-06-20",
    when: "June 2024",
    urdu: "دوپہر میں درخت کے نیچے، تھوڑی دیر کا آرام۔",
    caption: "Half an hour under a tree, and then back to it.",
    story: [
      "Somebody painted that bench turquoise. Not the municipality — somebody who wanted it to be that colour, against a wall that is already a different blue, under a tree, on a street where nothing else is painted at all.",
      "That is the part of this city nobody writes about. It is not only surviving. Somebody chose a colour.",
      "He is resting in the middle of the day with his hand against his face, in the exact way a person sits when the rest is temporary and they know how many minutes are left in it.",
      "The rust of his kameez against that turquoise is the whole photograph. I did not arrange any of it. It was just there, the way this city keeps putting things together better than I could.",
    ],
    howItWasMade: "From across the road, at a distance, so the frame keeps its manners.",
    tags: ["portrait", "karachi street", "colour", "turquoise", "rest"],
    accent: "#2AA9B0",
    instagram: "https://www.instagram.com/p/C8uCbx1t-hY/",
    featured: true,
  },

  /* =====================================================================
     روشنی اور گرد — LIGHT & DUST
     ===================================================================== */
  {
    slug: "sunehray-daane",
    title: "The Rhythm of Golden Grains",
    urduTitle: "سنہرے دانے",
    chapter: "roshni",
    ratio: 1440 / 1920,
    alt: "A masked Karachi street vendor tossing golden roasted chana from a wide metal pan, the grains suspended in mid-air above a large roasting dish",
    place: "Saddar, Karachi",
    date: "2026-04-12",
    when: "April 2026",
    urdu: "یہ شہر کا دل ہے، گرمی میں دھڑکتا ہوا۔",
    caption:
      "They say you can't capture the soul of the street in a second. But the rhythm of these golden grains told a different story.",
    story: [
      "He throws them up so the husk catches the wind and lifts off. That is the entire reason. It is not a performance — it is winnowing, and he has done it every afternoon for longer than I have owned a phone worth photographing with.",
      "But at around four the sun comes in low under the awnings on that street, and every single grain lights up on the way down. For half a second his stall is the most beautiful object in Saddar, and then it is a stall again.",
      "I stood there through maybe eleven throws. Ten were nothing — grains too low, my timing late, someone walking through. The eleventh had everything where it should be.",
      "He asked to see it. Then he asked me to send it to him, and I did. He said his son would like it.",
    ],
    howItWasMade:
      "Eleven throws, one frame that worked. Low afternoon sun behind the grains so they read as light instead of objects.",
    tags: ["saddar", "chana", "vendor", "golden hour", "karachi market", "motion"],
    accent: "#E0A53A",
    instagram: "https://www.instagram.com/p/DXCMrqNjGHV/",
    featured: true,
  },
  {
    slug: "daane-ki-lay",
    title: "The Same Motion, Ten Thousand Times",
    urduTitle: "دانے کی لَے",
    chapter: "roshni",
    ratio: 1440 / 1920,
    alt: "Close view of the same Karachi vendor working the roasting pan with a flat tool, golden chana turning in the dish",
    place: "Saddar, Karachi",
    date: "2026-04-12",
    when: "April 2026",
    urdu: "ہنر وہ ہے جو ہاتھ خود یاد رکھ لیں۔",
    caption: "Skill is what the hands remember without being asked.",
    story: [
      "The throw is the photograph people like. This is the part that actually takes the skill.",
      "Watch the angle of the tool and the way his weight is set. He is not looking at the pan. His hands know where everything is, the way a musician's do, and his eyes are free to be somewhere else entirely.",
      "We call this kind of work 'informal'. It is the most disciplined thing happening on that street.",
      "I kept this frame next to the flying one on purpose. One is the moment. This is the ten thousand repetitions that make the moment possible, and nobody photographs those.",
    ],
    howItWasMade: "Closer, tighter, waist height — the frame is about the hands, so nothing else got in.",
    tags: ["saddar", "chana", "craft", "hands", "karachi market"],
    accent: "#C98A3B",
    instagram: "https://www.instagram.com/p/DXCMrqNjGHV/",
  },

  /* =====================================================================
     آوارہ — STRAYS
     ===================================================================== */
  {
    slug: "sukoon-ka-lamha",
    title: "A Rare Moment of Stillness",
    urduTitle: "سکون کا لمحہ",
    chapter: "awaara",
    ratio: 1440 / 1800,
    alt: "A calico street cat sitting on dusty ground beside a bicycle wheel in Karachi, head tilted upward into warm light",
    place: "Karachi",
    date: "2024-01-29",
    when: "January 2024",
    urdu: "سکون کا ایک نایاب لمحہ۔",
    caption: "Caught a rare moment of stillness.",
    story: [
      "She owns that stretch of pavement. I do not mean she lives there — she owns it. She knows which shutter opens at seven and which engine block stays warm until midnight, and she has strong opinions about both.",
      "Cats are the only honest test of patience I know. You cannot direct one, you cannot rush one, and the moment you move closer you have lost it. You can only be there, be still, and deserve it.",
      "I crouched beside that bicycle for a long time doing nothing at all. Then something above us moved, she looked up, and everything in her went quiet for about a second and a half.",
      "That is the whole photograph. A second and a half of a street animal not being on guard.",
    ],
    howItWasMade: "Crouched beside a bicycle and waited without moving. Shot at her eye level, never above it.",
    tags: ["cats of karachi", "street cat", "stray", "animal photography", "patience"],
    accent: "#B4703A",
    instagram: "https://www.instagram.com/p/C2r73NisXrR/",
    featured: true,
  },
  {
    slug: "billi-ki-nazar",
    title: "Auditing Me",
    urduTitle: "بلی کی نظر",
    chapter: "awaara",
    ratio: 1440 / 1800,
    alt: "Close portrait of a calico street cat in Karachi staring directly into the camera, ears forward, pale green eyes catching the light",
    place: "Karachi",
    date: "2024-01-29",
    when: "January 2024",
    urdu: "وہ دیکھ رہی تھی کہ میں یہاں کیا کر رہا ہوں۔",
    caption: "Not scared. Not friendly. Deciding about me.",
    story: [
      "Eight frames into sitting on the ground next to her, she turned around and gave me this.",
      "It is not fear and it is not affection. It is an assessment. She is working out what I am for, and whether I am going to produce anything, and how long she has to keep looking at me before I go away.",
      "Street animals here read people faster than people read each other. She had already decided about me before I had finished focusing.",
      "I like that this is the one frame in the set where she is clearly the one doing the looking.",
    ],
    howItWasMade: "Ground level, no closer than she allowed, one frame when she turned.",
    tags: ["cats of karachi", "street cat", "animal portrait", "stray", "eyes"],
    accent: "#A87C42",
    instagram: "https://www.instagram.com/p/C2r73NisXrR/",
  },
  {
    slug: "billi-ki-zubaan",
    title: "Unbothered",
    urduTitle: "بلی کی زبان",
    chapter: "awaara",
    ratio: 1440 / 1800,
    alt: "A calico street cat in Karachi lying on the ground mid-lick, tongue out, completely relaxed",
    place: "Karachi",
    date: "2024-01-29",
    when: "January 2024",
    urdu: "اور پھر اُس نے فیصلہ کیا کہ میں کوئی خطرہ نہیں ہوں۔",
    caption: "And then she decided I was not a problem.",
    story: [
      "This is the frame that says I had been there long enough.",
      "An animal that is still on guard does not do this. The tongue out, the body down, the complete lack of interest in what I am holding — that only happens once you have stopped being an event.",
      "Twenty minutes of sitting on a dirty pavement doing nothing, for this.",
      "It is also just funny, and I am not going to pretend otherwise. Not everything has to be about the human condition.",
    ],
    howItWasMade: "Same spot, same crouch, twenty minutes later.",
    tags: ["cats of karachi", "street cat", "stray", "animal photography", "humour"],
    accent: "#B98A4E",
    instagram: "https://www.instagram.com/p/C2r73NisXrR/",
  },
  {
    slug: "dhoop-sekti-billi",
    title: "Whatcha Got There?",
    urduTitle: "دھوپ سیکتی بلی",
    chapter: "awaara",
    ratio: 1440 / 1800,
    alt: "A ginger and white street cat lying on a rough stone ledge in Karachi, white paws stretched forward, looking up toward the camera",
    place: "Karachi",
    date: "2024-10-22",
    when: "October 2024",
    urdu: "پتھر پر دھوپ، اور ایک سوال بھری نظر۔",
    caption:
      "Sunning itself on the steps, this little cat got a look that says: 'Whatcha got there?'",
    story: [
      "Warm stone in the morning is the best real estate in Karachi and every cat in this city knows it before eight o'clock.",
      "This one had claimed a ledge, folded herself into the exact shape of the warm patch, and put both white paws out in front like she was settling in for a long meeting.",
      "She was entirely unbothered by me until I crouched. Then the head came up and I got the look.",
      "There is a reason I keep photographing them. In a city that is loud about everything, a cat on a warm stone is the only thing here that has clearly worked out how to live.",
    ],
    howItWasMade: "Crouched to ledge height so the look comes straight down the lens, not down at her.",
    tags: ["cats of karachi", "street cat", "morning light", "stray", "ginger cat"],
    accent: "#C58B45",
    instagram: "https://www.instagram.com/p/DBbnB4iNiTd/",
  },
  {
    slug: "fann-e-baqa",
    title: "When Innocence Learns Too Soon",
    urduTitle: "فنِ بقا",
    chapter: "awaara",
    ratio: 1080 / 1440,
    alt: "A street performer in white sitting cross-legged on a Karachi pavement beating a small drum, a costumed monkey on a rope beside him, a parked car and brick wall behind",
    place: "Karachi",
    date: "2025-08-19",
    when: "August 2025",
    urdu: "معصومیت نے وقت سے پہلے زندہ رہنے کا ہنر سیکھ لیا۔",
    caption: "When innocence learns too soon the art of survival.",
    story: [
      "A man, a drum, a rope, and a monkey who knows the routine better than the man does.",
      "I have thought about this frame more than any other I have taken, and I still do not know where to put my anger. The easy thing is to be angry at him. But he is sitting on the same pavement, in the same heat, with the same nothing, and the monkey eats because the show earns.",
      "Both of them learned survival before they were allowed to be anything else. That is the only honest sentence I have about it.",
      "So I did not write an opinion underneath. I kept the picture, because a picture can hold two true things at once in a way a sentence cannot.",
    ],
    howItWasMade: "Shot low, from sitting height, so neither of them is looked down at.",
    tags: ["madari", "street performer", "karachi", "documentary", "survival", "monkey"],
    accent: "#A8703C",
    instagram: "https://www.instagram.com/p/DNiolPVsZ9L/",
    featured: true,
  },

  /* =====================================================================
     بارش — RAIN
     ===================================================================== */
  {
    slug: "barish-mein-safar",
    title: "The Rain Tests Us",
    urduTitle: "بارش میں سفر",
    chapter: "barish",
    ratio: 1440 / 1801,
    alt: "A man in a cream shalwar kameez walking a motorcycle away down a wet Karachi road after rain, grey apartment blocks and tangled wires under a heavy sky",
    place: "Karachi",
    date: "2024-07-09",
    when: "July 2024",
    urdu: "بارش آزماتی ہے، مگر ہم رکتے نہیں۔",
    caption:
      "Even when the skies pour down, we find a way to move forward. The rain tests us, but our determination prevails.",
    story: [
      "Karachi had stopped. Offices had sent people home, the road was shining, and everyone with a choice was already inside.",
      "He was still going. Not heroically — he was not thinking about determination, he was thinking about getting somewhere before it got worse. That is what the line under this photograph is actually made of. Not courage. Just no option.",
      "I shot him from behind on purpose. You do not need his face. You need the road, the blocks stacked up either side, the wires doing what Karachi wires do, and the size of all of it against one person walking.",
      "I was standing in it too, phone in a plastic bag with a hole cut for the lens. That is the only equipment advice I have ever given anyone.",
    ],
    howItWasMade:
      "Wide, from behind, low enough to catch the wet road — the weight is the city, not the face.",
    tags: ["monsoon", "karachi rain", "wet street", "documentary", "street photography"],
    accent: "#6E8189",
    instagram: "https://www.instagram.com/p/C9NHRmOo2Eq/",
    featured: true,
  },

  /* =====================================================================
     اپنا شہر — HOME  ·  the campus essay, in sequence
     ===================================================================== */
  {
    slug: "subah-ki-bhaag-daur",
    title: "The Morning Rush That Finally Stopped",
    urduTitle: "صبح کی بھاگ دوڑ",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "University campus building in Karachi on an overcast morning, palm trees and parked cars in front, a line of Urdu Nastaliq calligraphy set across the pale sky",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "صبح کی وہ بھاگ دوڑ اب ہمیشہ کے لیے تھم گئی۔",
    caption:
      "From frantically searching for the right block in 2022, to saying our final goodbyes in 2026. New people will sit on our benches tomorrow, but our laughter will always echo here.",
    story: [
      "In 2022 I could not find the right block. I remember running, with a bag that was too heavy, asking a guard who pointed somewhere vague, and arriving late anyway.",
      "In 2026 I stood in the same spot on purpose, for a long time, and nobody was rushing anywhere.",
      "There is no person in this photograph. That was the point. I wanted the building at exactly the hour we all used to be sprinting across it — empty, grey, completely ordinary. Same palms. Same parking. Only we left.",
      "I put one line of Urdu across the sky and posted it without expecting anything. It reached more people than everything else I had made put together.",
      "That was the day I understood what I am actually doing. I am not showing people my city. I am handing them a door into their own memory, and the photograph is only the handle.",
    ],
    howItWasMade:
      "Overcast morning, deliberately flat light so the building would look like a memory instead of a postcard. Urdu set in Nastaliq afterwards, into the empty sky.",
    tags: ["karachi", "university", "nostalgia", "urdu typography", "campus", "graduation"],
    accent: "#9FB0A8",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
    note: "7,661 likes · 164 comments — the most-seen photograph I have made.",
    featured: true,
  },
  {
    slug: "campus-raasta",
    title: "The Road In",
    urduTitle: "راستہ",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "A palm-lined road leading into a Karachi university campus, a single car parked at the kerb, with text across the sky reading from Kia hoga mera to I am a Software Engineer",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "چار سال پہلے یہ راستہ بہت لمبا لگتا تھا۔",
    caption: 'From "Kia hoga mera?" to "I am a Software Engineer." The journey was never easy.',
    story: [
      "Everybody who has been through a degree in this country has said that first sentence out loud at least once, usually at two in the morning, usually to nobody.",
      "This is the road you say it on. You walk in at the start of it with no idea, and four years later you walk out the other end with a title and a slightly different face.",
      "The road did not change. The palms did not change. I did.",
    ],
    howItWasMade: "Centred down the road on purpose — a road that goes somewhere should be photographed straight.",
    tags: ["karachi", "campus", "university road", "graduation", "journey"],
    accent: "#8FA39A",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-canteen",
    title: "The Canteen Will Stay",
    urduTitle: "کینٹین",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "Empty canteen tables and benches under a shaded steel roof at a Karachi university, no students at any of them",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "کینٹین وہی رہے گی، بس بیٹھنے والے بدل جائیں گے۔",
    caption: "The canteen stays. Only the people at the tables change.",
    story: [
      "Every argument I ever won and most of the ones I lost happened at one of these tables.",
      "This is the room where you find out who your actual friends are, usually over food nobody has paid for yet and a tea that has gone cold because someone would not stop talking.",
      "It is a shed with steel benches. It is also the single most important building on any campus and everybody knows it.",
      "In September it will be full again, of people who have never met me.",
    ],
    howItWasMade: "Shot empty, on purpose, from the end of the row so the benches run out of the frame.",
    tags: ["karachi", "campus", "canteen", "university", "nostalgia"],
    accent: "#87958B",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-block-a",
    title: "Block A",
    urduTitle: "بلاک اے",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "A university signboard in Karachi reading Block A, Administration, HR Department and Academic Office, with palm trees and parked cars behind it",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "یہی وہ بلاک تھا جو پہلے دن نہیں مل رہا تھا۔",
    caption: "This is the block I could not find on the first day.",
    story: [
      "Administration. HR Department. Academic Office. Scholarship desk.",
      "For four years this board was just furniture. You walk past it eight hundred times without reading a word of it, and then on the last week you stop and actually read it, and it turns out it has been telling the whole story the entire time.",
      "This is the block. In 2022 I ran past it twice looking for it.",
    ],
    howItWasMade: "Straight on, signboard filling the frame, so it reads like a document rather than a scene.",
    tags: ["karachi", "campus", "university", "signage", "first day"],
    accent: "#A3A897",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-dost",
    title: "Everyone Was Gathering Up the Last Days",
    urduTitle: "دوست",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "Students in white shirts walking together across a Karachi university campus, seen past the shoulder of another student in the foreground",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "سب آخری دنوں کو سمیٹ رہے تھے۔",
    caption: "Everyone was gathering up the last days, and somebody was already gone ahead.",
    story: [
      "Shot over a shoulder, which is how you actually see your friends — from slightly behind, walking toward something.",
      "In the final weeks everybody starts collecting. Photographs, signatures on shirts, numbers that will not get used, promises about staying in touch that both people know the truth about while they are making them.",
      "The person in the foreground is not in the group. That is the whole frame, really. By the last month some people are already somewhere else.",
    ],
    howItWasMade: "Over the shoulder, shallow, focus on the group so the foreground stays a silhouette.",
    tags: ["karachi", "campus", "students", "friendship", "last days"],
    accent: "#96A29C",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-notebook",
    title: "The Handwriting",
    urduTitle: "کاپی",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1351,
    alt: "A student's open notebook in Karachi filled with handwritten equations and working, held on a lap",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "یہ صفحے اب کسی کام کے نہیں، اور پھر بھی پھینکے نہیں جاتے۔",
    caption: "These pages are no use to anyone now, and still nobody throws them away.",
    story: [
      "Four years of working, in handwriting that got worse every semester.",
      "None of it is useful any more. The syllabus has moved on, half of it was memorised for one paper and released the next morning, and there is not a single page here anybody will ever open again.",
      "Nobody throws them out, though. They go into a box at home, and the box goes on top of a cupboard, and it stays there for a decade.",
      "It is not the equations. It is the proof that you sat there and did it.",
    ],
    howItWasMade: "Close and handheld, lit by whatever came through the window — no attempt to make it tidy.",
    tags: ["karachi", "campus", "student life", "notebook", "study"],
    accent: "#8E9AA0",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-dhuaan",
    title: "Smoke From the Last Function",
    urduTitle: "دھواں",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "A man leaning over a smoking grill at a Karachi university farewell, thick white smoke rising across the frame and catching the light",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "اب ہم اس میلے میں مہمان ہوں گے۔",
    caption: "From now on we come to this as guests.",
    story: [
      "Every campus event in this country ends with somebody bent over a grill in a cloud of smoke, and that person is never on the poster.",
      "The smoke is the best light on the entire campus and it lasts about forty minutes a year.",
      "What got me about this one was the arithmetic underneath it. We had been to this function four times. This was the last one where we belonged to the place. Next year it happens again, at the same spot, with the same smoke, and we would be visitors.",
    ],
    howItWasMade: "Shot into the light so the smoke reads as light, exposing for the highlights and letting him go dark.",
    tags: ["karachi", "campus", "farewell", "smoke", "food", "event"],
    accent: "#B9895A",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-barish",
    title: "And Then Everyone Leaves",
    urduTitle: "اور پھر سب چلے جاتے ہیں",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "A wet campus road in Karachi after rain, figures walking away in the distance between buildings and flowering trees",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "اور پھر سب چلے جاتے ہیں۔",
    caption: "And then everybody leaves.",
    story: [
      "The road is wet and everyone in the frame is walking away from the camera.",
      "I did not plan that. I turned around because of the light on the water and this is what was in front of me, and I only understood what it was later when I was going through the frames.",
      "That is most of street photography, honestly. You do not find the metaphor. You take the picture and the metaphor is in it when you get home.",
    ],
    howItWasMade: "Turned around for the light on the wet road; the people walking away were already there.",
    tags: ["karachi", "campus", "rain", "goodbye", "wet road"],
    accent: "#7E8C8E",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
  },
  {
    slug: "campus-aakhri",
    title: "The Story Ended",
    urduTitle: "کہانی ختم ہوئی",
    chapter: "apna-sheher",
    essay: "campus",
    ratio: 1080 / 1350,
    alt: "Palm trees against a pale overcast Karachi sky above low campus buildings, the last frame of the farewell series",
    place: "Karachi",
    date: "2026-06-18",
    when: "June 2026",
    urdu: "کہانی ختم ہوئی، اور سارے کردار اپنی راہ چل دیے۔",
    caption: "The story ended, and all the characters went their own way.",
    story: [
      "Last frame. No people in it at all, which is the correct way to end a series about people leaving.",
      "Just the palms, the flat white sky, and the tops of the buildings — the part of the place that was there before any of us arrived and will be there long after the last person who remembers us has also left.",
      "I have made better photographs than every single one in this set. None of them have done what these did.",
      "People do not stop for a good photograph. They stop for a true one.",
    ],
    howItWasMade: "Pointed up, at nothing, on the way out.",
    tags: ["karachi", "campus", "palms", "ending", "farewell"],
    accent: "#9AA69F",
    instagram: "https://www.instagram.com/p/DZu71LqHxib/",
    featured: true,
  },
];

export const photoBySlug = (slug: string) => photos.find((p) => p.slug === slug);
export const photosInChapter = (id: ChapterId) => photos.filter((p) => p.chapter === id);
export const featuredPhotos = () => photos.filter((p) => p.featured);
export const campusEssay = () => photos.filter((p) => p.essay === "campus");

/** Previous / next within the full sequence, for the story pages. */
export function neighbours(slug: string) {
  const i = photos.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? photos[i - 1] : photos[photos.length - 1],
    next: i < photos.length - 1 ? photos[i + 1] : photos[0],
  };
}
