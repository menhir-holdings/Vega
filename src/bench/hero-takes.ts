import type { ComponentType } from "react";
import type { OpeningStillSlot } from "@/bench/types";
import A from "@bench/rounds/hero-r1/takes/A";
import D from "@bench/rounds/hero-r1/takes/D";
import E from "@bench/rounds/hero-r1/takes/E";
import F from "@bench/rounds/hero-r1/takes/F";
import G from "@bench/rounds/hero-r1/takes/G";
import H from "@bench/rounds/hero-r1/takes/H";

export const HERO_TAKES: Record<
  string,
  Record<string, ComponentType<OpeningStillSlot>>
> = {
  "hero-r1": { A, D, E, F, G, H },
};
