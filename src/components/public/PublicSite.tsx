import { PublicHeader } from "@/components/public/PublicHeader";
import { StillPlate } from "@/components/public/StillPlate";
import { monograph, openingStill, photographer } from "@/lib/public-site";

const [sitter, lookout] = monograph;

export function PublicSite() {
  return (
    <>
      <PublicHeader />
      <main id="main">
        <section
          id="plate"
          aria-label={`${photographer.name} — opening still`}
        >
          <StillPlate still={openingStill} bleed priority sizes="100vw" />
        </section>

        <section
          aria-label={photographer.name}
          className="px-[var(--space-sm)] pt-10 pb-[var(--space-2xl)] sm:px-[var(--space-md)] sm:pt-12"
        >
          <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.03em] text-ink">
            {photographer.name}
          </h1>
          <p className="text-sheet mt-4 text-ink-muted">
            {photographer.location}
          </p>
        </section>

        <section
          id="work"
          aria-label="Stills"
          className="relative scroll-mt-16 px-[var(--space-sm)] pb-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <div className="w-[min(36rem,92%)]">
            <StillPlate
              still={sitter}
              sizes="(max-width: 640px) 92vw, 36rem"
            />
          </div>
          <div className="mt-12 ml-auto w-[min(24rem,72%)] lg:mt-[-18%] lg:mr-[4%]">
            <StillPlate
              still={lookout}
              sizes="(max-width: 640px) 64vw, 24rem"
            />
          </div>
        </section>

        <section
          id="about"
          className="max-w-[28rem] scroll-mt-16 px-[var(--space-sm)] pt-[var(--space-lg)] pb-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <p className="font-[family-name:var(--font-serif)] text-[1.25rem] font-normal leading-[1.45] tracking-[-0.015em] text-ink">
            {photographer.about}
          </p>
          <a
            href={`mailto:${photographer.email}`}
            className="text-sheet mt-8 inline-block text-ink-muted transition-colors duration-500 hover:text-ink"
          >
            {photographer.email}
          </a>
        </section>
      </main>
    </>
  );
}
