# Vega — UX specification

Vega is a **photographer website** with a quiet owner desk. Visitors never see a product. The owner never learns a CMS.

---

## Design principle

**The live site is the product. The desk is how you ask.**

Non-tech clients want a sleek professional site, control over the first look and later changes, and no burden. They do not know what they want yet. Vega holds the site; they write when something should move.

| Stakeholder | Center of gravity | Success |
|-------------|-------------------|---------|
| **Visitor** | The photographer's public site | Feels like a studio, not a platform |
| **Owner** | `/desk` — what's live, preview, ask | Change without a labyrinth |

---

## Two surfaces (skeleton)

### A. Public site (`/`) — always on

**Question:** "Whose work is this?"

Patterns stolen (not cloned):

- [Open — still + name](https://mobbin.com/screens/a1ac1617-7316-4679-ae32-4b3d207dc4d3)
- [Locomotive — full-bleed plate](https://mobbin.com/sites/sections/6a2f519f-af72-4525-a6ca-2ef3457bdf63)
- [KOBU — huge quiet type](https://mobbin.com/sites/sections/92720ac4-a34f-4460-854c-ba4c969c697e)

Plate → named still → selected work → surname wordmark → about / inquire. No explore, follow, or community.

### B. Owner desk (`/desk`) — one quiet screen

**Question:** "What's live, and how do I change it?"

Patterns stolen:

- [Squarespace — editor + live site](https://mobbin.com/screens/8e63e795-8387-4194-8307-5f387a0c261a)
- [Framer — canvas with live page](https://mobbin.com/screens/7742c3d7-a2c0-4e62-ac05-3ee229e284bd)

- What's live (status + pages)
- Preview of `/` in a desk frame
- Ask for a change (write it; Vega takes it from there)

No site-builder chrome, no album pipeline, no Clerk wall for this skeleton.

---

## Anti-patterns

| Kill | Instead |
|------|---------|
| `/` as SaaS marketing for a creator network | `/` is the photographer site |
| Explore / follow / appreciate | Unwired; not linked |
| `{slug}.vega…` bounce to unpaid `.com` | Canonical `vega-menhir-holdings.vercel.app` |
| CMS as the home screen | Desk: live + preview + ask |

---

## Leftover (unwired)

`/admin`, `/s/{slug}`, and `/deliver/{token}` may still exist. They are not the default experience.

---

## v1 success criteria

1. A stranger opening `/` sees a professional photographer site.
2. `/desk` answers what's live, shows a preview, and accepts a change request.
3. No discoverability layer is required to use the product.
