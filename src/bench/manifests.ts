import type { BenchManifest } from "@/bench/types";
import deskR1 from "@bench/rounds/desk-r1/manifest.json";
import heroR1 from "@bench/rounds/hero-r1/manifest.json";

export const MANIFESTS: Record<string, BenchManifest> = {
  "hero-r1": heroR1,
  "desk-r1": deskR1,
};
