"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { monograph } from "@/lib/public-site";
import type { OpeningStillSlot } from "@/bench/types";

/** Two stills trade on a ~20s timer. No scroll, no Ken Burns. */
export default function TakeF({ still, priority, sizes }: OpeningStillSlot) {
  const other = monograph[1];
  const [showOther, setShowOther] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;
    const id = window.setInterval(() => {
      setShowOther((current) => !current);
    }, 20_000);
    return () => window.clearInterval(id);
  }, []);

  const caption = showOther ? other.caption : still.caption;

  return (
    <figure className="m-0">
      <div className="vega-hero-frame relative isolate h-[92svh] w-full overflow-hidden bg-stone">
        <Image
          src={still.src}
          alt={still.alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover transition-opacity duration-[1800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            showOther ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={other.src}
          alt={other.alt}
          fill
          sizes={sizes}
          className={`object-cover transition-opacity duration-[1800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            showOther ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <figcaption className="text-sheet mt-3 px-[var(--space-sm)] text-ink-muted sm:px-[var(--space-md)]">
        {caption}
      </figcaption>
    </figure>
  );
}
