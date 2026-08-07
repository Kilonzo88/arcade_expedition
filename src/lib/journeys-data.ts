export interface Journey {
  slug: string;
  meta: string;         // e.g. "NAMIBIA · 10D/9N"
  title: string;
  image: string;        // path relative to /public
  imageAlt: string;
}

export const journeys: Journey[] = [
  {
    slug: "namibia",
    meta: "NAMIBIA · 10D/9N",
    title: "Desert Wildlife Drama",
    image: "/etosha.avif",
    imageAlt: "Wildlife on the salt pans of Etosha National Park, Namibia",
  },
  {
    slug: "rwanda-uganda",
    meta: "RWANDA & UGANDA · 8D/7N",
    title: "The Silverback Encounter",
    image: "/silverback.avif",
    imageAlt: "Mountain gorilla in misty forest, Rwanda",
  },
  {
    slug: "kenya-tanzania",
    meta: "KENYA & TANZANIA · 12D/11N",
    title: "The Great Migration",
    image: "/wildebeest-migration.avif",
    imageAlt: "Wildebeest crossing the Mara River during the Great Migration, Kenya",
  },
];
