import type { ComponentType } from "react";
import A from "@bench/rounds/desk-r1/takes/A";
import B from "@bench/rounds/desk-r1/takes/B";
import C from "@bench/rounds/desk-r1/takes/C";
import D from "@bench/rounds/desk-r1/takes/D";

export const DESK_TAKES: Record<string, Record<string, ComponentType>> = {
  "desk-r1": { A, B, C, D },
};
