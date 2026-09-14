/** Fictional talent for the always-on public site. Not a SaaS marketing page. */
export const photographer = {
  name: "Iris Calder",
  given: "Iris",
  surname: "Calder",
  role: "Photographer",
  location: "Lisbon",
  email: "studio@iris-calder.com",
  about:
    "Works in natural light between Lisbon and the Atlantic. Portraits, and the quiet around a person.",
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

export type PublicStill = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export const openingStill: PublicStill = {
  id: "plate",
  src: "/stills/01-wave.jpg",
  alt: "A small wave breaking, late light on the Atlantic",
  width: 2400,
  height: 3595,
  caption: "Estoril",
};

export const monograph: readonly [PublicStill, PublicStill] = [
  {
    id: "sitter",
    src: "/stills/02-sitter.jpg",
    alt: "Portrait against a painted wall, hand at a silver chain",
    width: 1400,
    height: 2100,
    caption: "Marta",
  },
  {
    id: "lookout",
    src: "/stills/05-lookout.jpg",
    alt: "Portrait on a lookout, orange beanie, city below",
    width: 1400,
    height: 1923,
    caption: "Tomás",
  },
];
