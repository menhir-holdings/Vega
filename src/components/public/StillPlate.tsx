import Image from "next/image";
import type { PublicStill } from "@/lib/public-site";

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
  return (
    <figure className="m-0">
      <div
        className={
          bleed
            ? "relative h-[92svh] w-full overflow-hidden bg-stone"
            : "relative w-full overflow-hidden bg-stone"
        }
        style={
          bleed
            ? undefined
            : { aspectRatio: `${still.width} / ${still.height}` }
        }
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
      <figcaption
        className={`text-sheet mt-3 text-ink-muted ${
          bleed ? "px-[var(--space-sm)] sm:px-[var(--space-md)]" : ""
        }`}
      >
        {still.caption}
      </figcaption>
    </figure>
  );
}
