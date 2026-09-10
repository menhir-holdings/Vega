# Vega — product definition

**Vega** is a professional photographer **website**, plus a quiet owner desk. The live site is the product. Photoport (the old Nuxt+Sanity CMS) is retired — do not revive it as a second live product.

Non-tech clients want a sleek professional website, control over the first look and later changes, without a CMS to learn. Vega holds the site. The owner asks when something should move.

| What Vega is | What Vega is not |
|--------------|------------------|
| An always-on photographer website | A creator network, marketplace, or explore/follow graph |
| A quiet desk: what's live, a preview, how to ask for a change | A CMS labyrinth or discoverability platform |
| One talent, one site | `{slug}.vega…` bounce to an unpaid `.com` |

**Canonical bookmark:** [https://vega-menhir-holdings.vercel.app](https://vega-menhir-holdings.vercel.app) — not an unpaid `.com`.

---

## This pass (skeleton)

1. **Public site (`/`)** — professional photographer site for fictional talent (Iris Calder). Full-bleed still, a named plate, selected work, inquire. Always on. No marketplace, explore, or follow.
2. **Owner desk (`/desk`)** — one quiet screen: what's live, a live preview, how to ask for a change. No Clerk maze required for the skeleton.

Leftover album/admin/delivery routes may still exist in the repo. They are not the default experience and are not linked from `/` or `/desk`.

---

## Surfaces

```
┌─────────────────────────────────────────────────────────┐
│  PUBLIC SITE  /                                          │
│  Always-on photographer website                          │
│  Plate · still + name · work · about · inquire           │
└───────────────────────────┬─────────────────────────────┘
                            │ owner only
┌───────────────────────────▼─────────────────────────────┐
│  DESK  /desk                                             │
│  What's live · preview · ask for a change                │
└─────────────────────────────────────────────────────────┘
```

---

## URLs

| Role | URL |
|------|-----|
| **Public site (canonical)** | `https://vega-menhir-holdings.vercel.app` |
| Public site | `/` |
| Owner desk | `/desk` |
| Legacy admin (unwired) | `/admin` |
| Legacy published slug (unwired) | `/s/{slug}` |
| Legacy client delivery (unwired) | `/deliver/{token}` |

---

## Implementation status

- ✅ `/` is the photographer site, not a SaaS marketing page
- ✅ `/desk` shows live status, preview, and a change request
- ✅ PRODUCT vision: website + quiet desk
- ✅ Canonical host: `vega-menhir-holdings.vercel.app`
- ⏳ Enrichment after the owner asks (stills, copy, structure)
- ⏳ Optional owner gate later — Clerk is not required for this skeleton

See [UX.md](./UX.md) · [SYSTEM.md](./SYSTEM.md)
