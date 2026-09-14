import { PublicHeader } from "@/components/public/PublicHeader";
import { StillPlate } from "@/components/public/StillPlate";
import { monograph, openingStill, photographer } from "@/lib/public-site";

const [sitter, oculus, north, lookout, path] = monograph;

export function PublicSite() {
  return (
    <>
      <PublicHeader />
      <main id="main">
        <section
          id="plate"
          aria-label={`${photographer.name} — opening still`}
          className="px-[var(--space-sm)] pt-10 pb-4 sm:px-[var(--space-md)] sm:pt-14"
        >
          <StillPlate
            still={openingStill}
            frame="opening"
            priority
            sizes="(max-width: 768px) 94vw, 88vw"
          />
        </section>

        <section
          aria-label={`${photographer.name}`}
          className="max-w-[36rem] px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2.25rem,5vw,3.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
            {photographer.lede}
          </h1>
          <p className="mt-8 font-[family-name:var(--font-serif)] text-lg leading-[1.55] text-ink-muted">
            {photographer.location}
          </p>
        </section>

        <section id="work" aria-label="Stills" className="scroll-mt-16">
          <div className="grid grid-cols-1 gap-16 px-[var(--space-sm)] pb-[var(--space-xl)] sm:px-[var(--space-md)] lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0 lg:pb-[var(--space-2xl)]">
            <div className="lg:col-span-6 lg:pt-4">
              <StillPlate
                still={sitter}
                frame="left"
                sizes="(max-width: 1024px) 92vw, 42vw"
              />
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-48">
              <StillPlate
                still={oculus}
                frame="right"
                sizes="(max-width: 1024px) 70vw, 28vw"
              />
            </div>
          </div>

          <div className="px-[var(--space-sm)] py-[var(--space-lg)] sm:px-[var(--space-md)]">
            <StillPlate
              still={north}
              frame="wide"
              sizes="(max-width: 768px) 94vw, 90vw"
            />
          </div>

          <div className="mx-auto max-w-[22rem] px-[var(--space-sm)] py-[var(--space-2xl)] sm:max-w-[24rem]">
            <StillPlate
              still={lookout}
              frame="center"
              sizes="(max-width: 640px) 80vw, 24rem"
            />
          </div>

          <div className="mr-auto w-full max-w-[44rem] px-[var(--space-sm)] pb-[var(--space-2xl)] sm:px-[var(--space-md)]">
            <StillPlate
              still={path}
              frame="path"
              sizes="(max-width: 768px) 92vw, 44rem"
            />
          </div>
        </section>

        <section
          id="about"
          className="max-w-[36rem] scroll-mt-16 px-[var(--space-sm)] py-[var(--space-xl)] sm:px-[var(--space-md)]"
        >
          <p className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.125rem)] font-normal leading-[1.35] tracking-[-0.015em] text-ink">
            {photographer.about}
          </p>
        </section>

        <section
          id="inquire"
          className="scroll-mt-16 px-[var(--space-sm)] pt-[var(--space-lg)] pb-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <a
            href={`mailto:${photographer.email}`}
            className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,4vw,2.75rem)] italic leading-tight text-ink transition-colors duration-500 hover:text-ink-muted"
          >
            {photographer.email}
          </a>
        </section>
      </main>
    </>
  );
}
