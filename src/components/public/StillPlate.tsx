"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { PublicStill } from "@/lib/public-site";

const ease = [0.22, 1, 0.36, 1] as const;

export function StillPlate({
  still,
  priority = false,
  sizes,
  bleed = false,
}: {
  still: PublicStill;
  priority?: boolean;
  sizes: string;
  bleed?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className="m-0"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 1.05, ease }}
    >
      <div
        className={`relative w-full overflow-hidden bg-stone ${
          bleed ? "max-h-[92svh]" : ""
        }`}
        style={{ aspectRatio: `${still.width} / ${still.height}` }}
      >
        <Image
          src={still.src}
          alt={still.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption className="text-sheet mt-3 text-ink-muted">
        {still.caption}
      </figcaption>
    </motion.figure>
  );
}
