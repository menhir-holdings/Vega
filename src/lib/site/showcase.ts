import { newId } from "@/lib/id";
import type { VegaStore } from "@/lib/store/types";
import type { SiteSection } from "@/types/site";

export type ShowcaseInput = {
  assetIds?: string[];
  sectionTitle?: string;
  subtitle?: string;
  layout?: "masonry" | "horizontal";
  republish?: boolean;
};

/**
 * Culmination: add a completed shoot to the photographer's public site.
 * Marks assets visibleOnSite and registers a gallery section.
 */
export function addAlbumToSiteShowcase(
  store: VegaStore,
  albumId: string,
  input: ShowcaseInput = {},
): { section: SiteSection | null; assetCount: number } {
  const album = store.albums.find((a) => a.id === albumId);
  if (!album) return { section: null, assetCount: 0 };

  const defaultIds = album.assets
    .filter((a) => a.selectionState === "picked" || a.finalUrl)
    .map((a) => a.id);

  const assetIds =
    input.assetIds?.length ? input.assetIds : defaultIds.length ? defaultIds : album.assets.map((a) => a.id);

  let count = 0;
  album.assets.forEach((a) => {
    if (assetIds.includes(a.id)) {
      a.visibleOnSite = true;
      count++;
    }
  });

  let section = store.site.sections.find(
    (s) => s.type === "gallery" && s.albumId === albumId,
  );

  if (!section) {
    section = {
      id: newId(),
      type: "gallery",
      albumId,
      layout: input.layout ?? "masonry",
      title: input.sectionTitle ?? album.name,
      subtitle: input.subtitle ?? "Recent work",
    };
    store.site.sections.push(section);
  } else if (section.type === "gallery") {
    if (input.sectionTitle) section.title = input.sectionTitle;
    if (input.subtitle) section.subtitle = input.subtitle;
    if (input.layout) section.layout = input.layout;
  }

  album.showcasedAt = new Date().toISOString();

  if (input.republish !== false) {
    store.site.published = true;
    store.site.publishedAt = new Date().toISOString();
    store.workspace.site = {
      workspaceId: store.workspace.id,
      slug: store.site.slug,
      productionUrl: `/s/${store.site.slug}`,
      publishedAt: store.site.publishedAt,
    };
  }

  return { section, assetCount: count };
}

export function albumsPendingShowcase(store: VegaStore) {
  return store.albums.filter(
    (a) => a.deliveryState === "finalized" && !a.showcasedAt,
  );
}
