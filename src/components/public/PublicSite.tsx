import Image from "next/image";
import { Gallery } from "@/components/gallery/Gallery";
import { BleedPlate } from "@/components/public/BleedPlate";
import { PublicHeader } from "@/components/public/PublicHeader";
import {
  photographer,
  signatureStill,
  workStills,
} from "@/lib/public-site";

export function PublicSite() {
  return (
    <>
      <PublicHeader />
      <main id="main">
        <BleedPlate />

        <section
          aria-label={`${photographer.name} still`}
          className="flex min-h-[100svh] flex-col items-center justify-center bg-paper px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <figure className="flex w-full max-w-[28rem] flex-col items-center sm:max-w-[32rem]">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone">
              <Image
                src={signatureStill.src}
                alt={signatureStill.alt}
                fill
                sizes="(max-width: 640px) 88vw, 32rem"
                className="object-cover object-center"
              />
            </div>
            <figcaption className="mt-10 text-center">
              <p className="font-[family-name:var(--font-sans)] text-[clamp(1.75rem,4vw,2.75rem)] font-normal tracking-[-0.02em] text-ink">
                {photographer.name}
              </p>
              <p className="mt-3 text-[0.75rem] tracking-[0.16em] uppercase text-ink-muted">
                {photographer.location}
              </p>
            </figcaption>
          </figure>
        </section>

        <section
          id="work"
          className="scroll-mt-24 px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)] sm:py-[var(--space-3xl)]"
        >
          <Gallery
            images={workStills}
            layout="masonry"
            subtitle="Selected stills"
            title="Work"
          />
        </section>

        <section
          aria-label={`${photographer.surname} wordmark`}
          className="overflow-hidden bg-paper px-[var(--space-sm)] pt-[var(--space-xl)] pb-[var(--space-md)] sm:px-[var(--space-md)]"
        >
          <p className="text-display-huge text-ink select-none">
            {photographer.surname}
          </p>
        </section>

        <section
          id="about"
          className="mx-auto max-w-2xl scroll-mt-24 px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <p className="text-label mb-6">About</p>
          <p className="text-display-lg mb-8 font-light text-ink">
            {photographer.lede}
          </p>
          <p className="text-lg leading-[1.75] text-ink-muted sm:text-xl">
            {photographer.about}
          </p>
        </section>

        <section
          id="inquire"
          className="scroll-mt-24 border-t border-line px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <p className="text-label mb-4">Inquire</p>
          <a
            href={`mailto:${photographer.email}`}
            className="text-display-lg inline-block text-ink transition-[color,transform] duration-700 ease-[var(--ease-cinematic)] hover:translate-y-[-3px] hover:text-ink-muted"
          >
            {photographer.email}
          </a>
        </section>
      </main>
    </>
  );
}
