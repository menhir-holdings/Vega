export type VegaEvent =
  | {
      type: "delivery.opened";
      albumId: string;
      albumName: string;
      token: string;
    }
  | {
      type: "picks.submitted";
      albumId: string;
      albumName: string;
      sessionId: string;
      pickCount: number;
      clientEmail?: string;
    }
  | {
      type: "finals.released";
      albumId: string;
      albumName: string;
      token: string;
      clientEmail?: string;
    }
  | {
      type: "storage.warning";
      workspaceId: string;
      usagePercent: number;
    }
  | {
      type: "album.showcased";
      albumId: string;
      albumName: string;
      assetCount: number;
      siteSlug: string;
    };
