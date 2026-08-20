export interface JourneyPricing {
  startingFrom: number;
}

export interface Journey {
  slug: string;
  meta: string;         // e.g. "NAMIBIA · 10D/9N"
  duration: string;     // e.g. "10 DAYS / 9 NIGHTS"
  title: string;
  carouselTitle?: string; // custom title for curated collections carousel
  tagline: string;      // evocative quoted line for listing cards
  image: string;        // portrait crop for home carousel
  imageAlt: string;
  listingImage: string; // 8:5 landscape crop for listing cards
  listingImageAlt: string;
  pricing: JourneyPricing;
}

export const journeys: Journey[] = [
  {
    slug: "namibia",
    meta: "NAMIBIA · 10D/9N",
    duration: "10 DAYS / 9 NIGHTS",
    title: "Namibia",
    carouselTitle: "Desert Wildlife Drama",
    tagline: "Ancient clay pans, soaring red dunes, and desert-adapted wildlife under vast cosmic skies.",
    image: "/etosha.avif",
    imageAlt: "Wildlife on the salt pans of Etosha National Park, Namibia",
    listingImage: "/deadvlei (1).avif",
    listingImageAlt: "Desolate ancient camelthorn trees against soaring red dunes in Deadvlei, Namibia",
    pricing: {
      startingFrom: 8400,
    },
  },
  {
    slug: "rwanda-uganda",
    meta: "RWANDA & UGANDA · 8D/7N",
    duration: "8 DAYS / 7 NIGHTS",
    title: "Rwanda and Uganda",
    carouselTitle: "The Silverback Experience",
    tagline: "Misty mountain sanctuaries, primal rainforests, and an intimate gaze with mountain gorillas.",
    image: "/silverback.avif",
    imageAlt: "Mountain gorilla in misty forest, Rwanda",
    listingImage: "/rwanda-ug.avif",
    listingImageAlt: "Lush misty mountain gorilla habitat canopy in Rwanda and Uganda",
    pricing: {
      startingFrom: 9600,
    },
  },
  {
    slug: "kenya-tanzania",
    meta: "KENYA & TANZANIA · 12D/11N",
    duration: "12 DAYS / 11 NIGHTS",
    title: "Kenya and Tanzania",
    carouselTitle: "The Great Migration",
    tagline: "The endless savanna pulse, Mara river crossings, and untamed natural drama across the Serengeti.",
    image: "/wildebeest-migration.avif",
    imageAlt: "Wildebeest crossing the Mara River during the Great Migration, Kenya",
    listingImage: "/savannah-kenya-tz.avif",
    listingImageAlt: "Golden acacia savanna landscape across Kenya and Tanzania",
    pricing: {
      startingFrom: 11200,
    },
  },
];
