import Image from "next/image";
import type { OpeningStillSlot } from "@/bench/types";

/** Frame stays put. Crop walks by object-position steps. */
export default function TakeG({ still, priority, sizes }: OpeningStillSlot) {
  return (
    <figure className="m-0">
      <div className="vega-hero-frame relative isolate h-[92svh] w-full overflow-hidden bg-stone">
        <Image
          src={still.src}
          alt={still.alt}
          width={still.width}
          height={still.height}
          priority={priority}
          sizes={sizes}
          className="bench-hero-g-still h-full w-full object-cover"
        />
      </div>
      <figcaption className="text-sheet mt-3 px-[var(--space-sm)] text-ink-muted sm:px-[var(--space-md)]">
        {still.caption}
      </figcaption>
    </figure>
  );
}
