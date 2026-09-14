"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PublicStill } from "@/lib/public-site";

const ease = [0.22, 1, 0.36, 1] as const;

const frames = {
  opening:
    "relative aspect-[2/3] max-h-[86svh] w-full overflow-hidden bg-stone",
  left: "relative aspect-[2/3] w-full overflow-hidden bg-stone",
  right: "relative aspect-[4/5] w-full overflow-hidden bg-stone",
  wide: "relative aspect-[16/10] w-full overflow-hidden bg-stone",
  center: "relative aspect-[3/4] w-full overflow-hidden bg-stone",
  path: "relative aspect-[3/2] w-full overflow-hidden bg-stone",
} as const;

type Frame = keyof typeof frames;

export function StillPlate({
  still,
  frame,
  priority = false,
  sizes,
}: {
  still: PublicStill;
  frame: Frame;
  priority?: boolean;
  sizes: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className="m-0"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: reduceMotion ? 0 : 1.1, ease }}
    >
      <div className={frames[frame]}>
        <Image
          src={still.src}
          alt={still.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption className="mt-4 font-[family-name:var(--font-serif)] text-[0.9375rem] italic leading-snug text-ink-muted">
        {still.caption}
      </figcaption>
    </motion.figure>
  );
}
