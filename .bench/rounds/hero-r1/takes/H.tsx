import Image from "next/image";
import type { OpeningStillSlot } from "@/bench/types";

/** Cinematic matte. Still image. No Ken Burns. */
export default function TakeH({ still, priority, sizes }: OpeningStillSlot) {
  return (
    <figure className="m-0">
      <div className="bench-hero-h-stage relative isolate h-[92svh] w-full overflow-hidden">
        <div className="bench-hero-h-matte">
          <Image
            src={still.src}
            alt={still.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover"
          />
        </div>
      </div>
      <figcaption className="text-sheet mt-3 px-[var(--space-sm)] text-ink-muted sm:px-[var(--space-md)]">
        {still.caption}
      </figcaption>
    </figure>
  );
}
