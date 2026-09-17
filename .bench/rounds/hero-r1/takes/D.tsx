import Image from "next/image";
import type { OpeningStillSlot } from "@/bench/types";

/** Frozen plate. Grain, caption, and type are the only moving parts. */
export default function TakeD({ still, priority, sizes }: OpeningStillSlot) {
  return (
    <figure className="m-0">
      <div className="vega-hero-frame bench-hero-d-frame relative isolate h-[92svh] w-full overflow-hidden bg-stone">
        <Image
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          priority={priority}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="bench-hero-d-caption text-sheet mt-3 px-[var(--space-sm)] text-ink-muted sm:px-[var(--space-md)]">
        {still.caption}
      </figcaption>
    </figure>
  );
}
