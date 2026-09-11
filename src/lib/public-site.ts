import type { GalleryImage } from "@/types/gallery";

/** Fictional talent for the always-on public site. Not a SaaS marketing page. */
export const photographer = {
  name: "Iris Calder",
  given: "Iris",
  surname: "Calder",
  role: "Photographer",
  location: "Lisbon",
  email: "studio@iris-calder.com",
  plateLine: "Portraits and stills",
  lede: "Photographs made slowly — for people who would rather be seen than staged.",
  about:
    "Iris Calder works in natural light between Lisbon and the Atlantic. Portraits, stills, and the quiet space around a person. Vega keeps this site live; Iris asks when something should change.",
} as const;

export const liveSite = {
  status: "Live",
  pages: [
    { id: "home", label: "Home", href: "/#plate" },
    { id: "work", label: "Work", href: "/#work" },
    { id: "about", label: "About", href: "/#about" },
  ],
  bookmark: "https://vega-menhir-holdings.vercel.app",
} as const;

export const heroStill = {
  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=2400&q=85",
  alt: "Close portrait in warm light, looking past the camera",
  width: 2400,
  height: 3200,
};

export const signatureStill = {
  src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1600&q=85",
  alt: "Portrait of a woman in soft window light, eyes toward camera",
  width: 1600,
  height: 2000,
};

export const workStills: GalleryImage[] = [
  {
    id: "work-01",
    src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&q=82",
    alt: "Portrait in cool daylight, hair across one eye",
    width: 1400,
    height: 1750,
    aspect: "portrait",
  },
  {
    id: "work-02",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=82",
    alt: "Sun through trees over a mountain ridge",
    width: 1800,
    height: 1200,
    aspect: "landscape",
  },
  {
    id: "work-03",
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=82",
    alt: "Figure in red against a pale wall",
    width: 1400,
    height: 2100,
    aspect: "portrait",
  },
  {
    id: "work-04",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019f?w=1800&q=82",
    alt: "Small boat on a still lake at dusk",
    width: 1800,
    height: 1200,
    aspect: "landscape",
  },
  {
    id: "work-05",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&q=82",
    alt: "Standing portrait, yellow knit, direct gaze",
    width: 1400,
    height: 1750,
    aspect: "portrait",
  },
  {
    id: "work-06",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=82",
    alt: "Forest path in filtered afternoon light",
    width: 1800,
    height: 1200,
    aspect: "landscape",
  },
];
