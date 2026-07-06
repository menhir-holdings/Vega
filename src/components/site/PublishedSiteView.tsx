import type { GalleryImage } from "@/types/gallery";
import type { Album } from "@/types/album";
import type { SiteBuilderConfig } from "@/types/site";
import { EditorialStripSection } from "@/components/sections/EditorialStripSection";
import { FeaturedGallerySection } from "@/components/sections/FeaturedGallerySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { SiteHeader } from "@/components/layout/SiteHeader";

function siteAssets(album: Album) {
  return album.assets
    .filter((a) => a.visibleOnSite)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function toGalleryImages(assets: Album["assets"]): GalleryImage[] {
  return assets.map((a) => ({
    id: a.id,
    src: a.finalUrl ?? a.previewUrl,
    alt: a.alt,
    width: a.width,
    height: a.height,
    aspect: a.height > a.width ? "portrait" : "landscape",
  }));
}

type PublishedSiteViewProps = {
  site: SiteBuilderConfig;
  albums: Album[];
};

export function PublishedSiteView({ site, albums }: PublishedSiteViewProps) {
  const heroImage = {
    src: site.heroImageUrl,
    alt: site.heroTitle,
    width: 2400,
    height: 3600,
  };

  const gallerySections = site.sections.filter((s) => s.type === "gallery");
  const editorialSection = site.sections.find((s) => s.type === "editorial");

  return (
    <>
      <SiteHeader />
      <main id="main">
        <HeroSection
          image={heroImage}
          title={site.heroTitle}
          subtitle={site.heroSubtitle}
        />

        {gallerySections.map((section) => {
          if (section.type !== "gallery") return null;
          const album = albums.find((a) => a.id === section.albumId);
          const images = album ? toGalleryImages(siteAssets(album)) : [];
          if (!images.length) return null;
          return (
            <FeaturedGallerySection
              key={section.id}
              images={images}
              layout={section.layout}
              title={section.title}
              subtitle={section.subtitle}
            />
          );
        })}

        {editorialSection?.type === "editorial" && (() => {
          const album = albums.find((a) => a.id === editorialSection.albumId);
          const assets = album ? siteAssets(album) : [];
          const start = editorialSection.startIndex ?? 0;
          const count = editorialSection.count ?? 4;
          const stripImages = toGalleryImages(assets.slice(start, start + count));
          if (!stripImages.length) return null;
          return <EditorialStripSection key={editorialSection.id} images={stripImages} />;
        })()}

        <section
          id="about"
          className="mx-auto max-w-2xl px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)] sm:py-[var(--space-3xl)]"
        >
          <p className="text-label mb-6">About</p>
          <p className="text-display-lg mb-8 font-light text-ink">{site.heroTitle}</p>
          <p className="text-lg leading-[1.75] text-ink-muted sm:text-xl">{site.aboutText}</p>
        </section>
        <section
          id="contact"
          className="border-t border-line px-[var(--space-sm)] py-[var(--space-2xl)] sm:px-[var(--space-md)]"
        >
          <p className="text-label mb-4">Inquire</p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="text-display-lg inline-block text-ink transition-[color,transform] duration-700 ease-[var(--ease-cinematic)] hover:translate-y-[-3px] hover:text-ink-muted"
          >
            {site.contactEmail}
          </a>
        </section>
      </main>
    </>
  );
}
