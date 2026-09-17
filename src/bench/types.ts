import type { PublicStill } from "@/lib/public-site";

export type OpeningStillSlot = {
  still: PublicStill;
  priority?: boolean;
  sizes: string;
  bleed?: boolean;
};

export type BenchTakeMeta = {
  letter: string;
  name: string;
  thesis: string;
};

export type BenchManifest = {
  id: string;
  brief: string;
  axes: string;
  subject: string;
  frameRoute: string;
  columns: number;
  takes: BenchTakeMeta[];
};
