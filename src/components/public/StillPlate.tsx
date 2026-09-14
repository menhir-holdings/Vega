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
      {bleed ? (
        <div className="relative h-[92svh] w-full overflow-hidden bg-stone">
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
      ) : (
        <div className="bg-stone">
          <Image
            src={still.src}
            alt={still.alt}
            width={still.width}
            height={still.height}
            priority={priority}
            sizes={sizes}
            className="h-auto w-full"
          />
        </div>
      )}
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
