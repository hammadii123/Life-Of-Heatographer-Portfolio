/**
 * The gallery is not a grid — it is five chapters of one book about Karachi.
 * Each chapter is its own indexable page and its own photo essay.
 */
export type ChapterId = "chehray" | "barish" | "awaara" | "roshni" | "apna-sheher";

export type Chapter = {
  id: ChapterId;
  slug: ChapterId;
  title: string;
  urdu: string;
  /** Said out loud, for people who don't read Urdu script. */
  roman: string;
  kicker: string;
  blurb: string;
  /** Long-form intro for the chapter page — this is what ranks. */
  essay: string[];
  /** Colour sampled from the photographs in this chapter. */
  accent: string;
  seoTitle: string;
  seoDescription: string;
};

export const chapters: Chapter[] = [
  {
    id: "chehray",
    slug: "chehray",
    title: "Faces",
    urdu: "چہرے",
    roman: "Chehray",
    kicker: "The people the city walks past",
    blurb:
      "Vendors, workers, children, the man holding a whole family together on one day's earnings. Karachi has twenty million faces and almost no portraits of them.",
    essay: [
      "There is a particular kind of invisibility that a big city hands out for free. You can stand at the same corner every morning for eleven years selling cloth, and be seen by four thousand people a day, and be looked at by none of them.",
      "This chapter is an argument against that. Every frame here started the same way: I was walking somewhere, and something in a face made walking feel rude. So I stopped. Most of the time I asked. Sometimes I waited twenty minutes for a man to forget I was there, because a face that knows it is being photographed is wearing something, and I wanted the thing underneath.",
      "None of these people are subjects. They all have names, and most of them have opinions about how they should be photographed, and several of them were right.",
    ],
    accent: "#D9A441",
    seoTitle: "Faces of Karachi — Street Portrait Photography",
    seoDescription:
      "Street portraits from Karachi: vendors, labourers, children and elders photographed on Saddar, Burns Road and Empress Market by Hammad Mustafa.",
  },
  {
    id: "barish",
    slug: "barish",
    title: "Rain",
    urdu: "بارش",
    roman: "Barish",
    kicker: "What Karachi becomes when the sky breaks",
    blurb:
      "Three days a year this city turns into a mirror. Roads flood, work does not stop, and the whole place is suddenly lit from below.",
    essay: [
      "Karachi's relationship with rain is not romantic. Rain means the road is a river by 4pm, means the power is gone by 6, means the man with a cart is pushing it through water up to his knees because the cart is the rent.",
      "And yet it is the most beautiful the city ever looks. Wet asphalt does something no amount of money can buy: it takes every cheap sodium lamp and every rickshaw tail-light and doubles it, so the ground glows. For three days a year Karachi is lit from below.",
      "So I shoot in it. The phone goes in a plastic bag with a hole cut for the lens, and I stand in it, because everyone in these photographs is standing in it too, and it felt dishonest to shoot the monsoon from a dry place.",
    ],
    accent: "#2AA9B0",
    seoTitle: "Karachi Rain — Monsoon Street Photography",
    seoDescription:
      "Monsoon street photography from Karachi: flooded roads, night rickshaws and wet-light reflections, shot on foot during the rains by Hammad Mustafa.",
  },
  {
    id: "awaara",
    slug: "awaara",
    title: "Strays",
    urdu: "آوارہ",
    roman: "Awaara",
    kicker: "The ones who were never counted",
    blurb:
      "Cats on warm steps, a monkey on a rope, animals who learned the rules of this city faster than most people do.",
    essay: [
      "Every street in Karachi has a cat who owns it. Not lives on it — owns it. They know which shutter opens at seven, which hotel throws out bones at eleven, which engine block stays warm until midnight.",
      "I photograph them for the same reason I photograph people: because they are surviving something in plain sight, and nobody is writing it down. And because a cat is an honest test of patience. You cannot direct one. You can only be there, be still, and deserve the moment.",
      "Not all of it is gentle. There is a monkey in this chapter with a rope on his neck and a man beside him who also has nothing, and I have never worked out who to be angry at. So I kept the picture instead of an opinion.",
    ],
    accent: "#B4703A",
    seoTitle: "Strays of Karachi — Street Animal Photography",
    seoDescription:
      "Street animal photography from Karachi: the cats, dogs and working animals who survive the city in plain sight. Shot by Hammad Mustafa.",
  },
  {
    id: "roshni",
    slug: "roshni",
    title: "Light & Dust",
    urdu: "روشنی اور گرد",
    roman: "Roshni aur Gard",
    kicker: "Work, colour, and the air between",
    blurb:
      "Grain tossed into the light. Bananas stacked like a wall. The city's labour, photographed for its colour instead of its poverty.",
    essay: [
      "There is a way of photographing working people in South Asia that I have come to dislike: everything desaturated, everything sad, the person reduced to a hardship. It is not untrue. It is just not the whole day.",
      "The whole day also has a man tossing chana into the air at four in the afternoon so that the husk lifts off in the wind, and the low sun catches ten thousand grains mid-flight, and for half a second his stall is the most beautiful object in Saddar. He has done this ten thousand times. He is not doing it for me.",
      "This chapter is about that half-second. Colour, dust, the geometry of a cart stacked by somebody who has stacked it every morning for years. Skill, photographed as skill.",
    ],
    accent: "#E0A53A",
    seoTitle: "Light & Dust — Karachi Market & Labour Photography",
    seoDescription:
      "Colour and craft in Karachi's markets: vendors, carts and daily labour photographed in the light of Saddar and Burns Road by Hammad Mustafa.",
  },
  {
    id: "apna-sheher",
    slug: "apna-sheher",
    title: "Home",
    urdu: "اپنا شہر",
    roman: "Apna Sheher",
    kicker: "The places that made me",
    blurb:
      "Campus, corners, the blocks I walked before I ever owned a camera. The city as autobiography.",
    essay: [
      "Every photographer eventually photographs the route they already know by heart. Mine is a few kilometres wide and includes a university I spent four years inside, a bus stop where I learned to wait, and a set of buildings that look like nothing to anyone else.",
      "The photograph in this chapter that people actually saw — seven thousand of them — is a picture of a building. No face, no action, just a block and some palm trees on an overcast morning, with one line of Urdu across the sky. I have taken far better photographs. That one landed because it was not about the building.",
      "That taught me the thing this whole site is built on: people do not stop for a good photograph. They stop for a true one.",
    ],
    accent: "#8FA39A",
    seoTitle: "Apna Sheher — Karachi As Home",
    seoDescription:
      "Karachi photographed as home: campus, neighbourhood blocks and the ordinary corners of the city, by Karachi photographer Hammad Mustafa.",
  },
];

export const chapterById = (id: ChapterId) => chapters.find((c) => c.id === id)!;
