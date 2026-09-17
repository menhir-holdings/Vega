import Image from "next/image";
import type { OpeningStillSlot } from "@/bench/types";

/** Ken Burns lives inside an inset plate, not the full bleed. */
export default function TakeE({ still, priority, sizes }: OpeningStillSlot) {
  return (
    <figure className="m-0 px-[var(--space-sm)] sm:px-[var(--space-md)]">
      <div className="vega-hero-frame relative isolate mx-auto h-[min(78svh,46rem)] w-full max-w-[40rem] overflow-hidden bg-stone">
        <Image
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          priority={priority}
          sizes={sizes}
          className="vega-hero-still h-full w-full object-cover"
        />
      </div>
      <figcaption className="text-sheet mx-auto mt-3 w-full max-w-[40rem] text-ink-muted">
        {still.caption}
      </figcaption>
    </figure>
  );
}
