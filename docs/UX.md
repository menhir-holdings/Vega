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

## Two surfaces

### A. Public site (`/`) — always on

**Question:** "Whose work is this?"

Patterns stolen (not cloned) — photographer/editorial homes, not SaaS editors:

- [Mouthwash — still as an object on paper](https://mobbin.com/sites/sections/0e035b6e-f0ab-416e-9ade-af96d4542658)
- [Kinfolk — small still + sentence](https://mobbin.com/sites/sections/033cc912-2914-4fb4-84bb-281616e64147)
- [Kinfolk — type beside a still](https://mobbin.com/sites/sections/1557474b-af5b-48e0-b8d3-541af616713b)
- [Open — one still, name as caption](https://mobbin.com/screens/a1ac1617-7316-4679-ae32-4b3d207dc4d3)

Opening still on plaster → a sentence → asymmetric monograph → about as running type → email. No overlay hero, no masonry "Work" grid, no tracked section kickers. No explore, follow, or community.

### B. Owner desk (`/desk`) — one quiet screen

**Question:** "What's live, and how do I change it?"

- What's live (status + pages)
- Preview of `/` in a desk frame
- Ask for a change (write it; Vega takes it from there)

No site-builder chrome, no album pipeline, no Clerk wall for this skeleton.

---

## Anti-patterns

| Kill | Instead |
|------|---------|
| `/` as SaaS marketing for a creator network | `/` is the photographer site |
| Overlay name + tagline on a full-bleed hero | Photograph sits on paper; type comes after |
| Masonry "Selected stills" | Sequence of stills at different scales |
| Work / About / Inquire theme nav | Name + email |
| Explore / follow / appreciate | Unwired; not linked |
| `{slug}.vega…` bounce to unpaid `.com` | Canonical `vega-menhir-holdings.vercel.app` |
| CMS as the home screen | Desk: live + preview + ask |

---

## Leftover (unwired)

`/admin`, `/s/{slug}`, and `/deliver/{token}` may still exist. They are not the default experience.

---

## v1 success criteria

1. A stranger opening `/` sees a photographer's site, not a WordPress theme.
2. `/desk` answers what's live, shows a preview, and accepts a change request.
3. No discoverability layer is required to use the product.
