# Vega — UX specification

Vega is a **website manager** for photographers. Client delivery is a feature inside the shoot workflow — it culminates in two outcomes: the client's album and new work on the photographer's site.

---

## Design principle

**Your site is home. Shoots feed it.**

The photographer opens Vega to manage their portfolio — not to "use a delivery tool." Every album is a shoot that may end with client handoff *and* new showcase images. Creative control stays with the photographer; Vega handles publish, delivery links, and the handoff plumbing.

| Stakeholder | Center of gravity | Success |
|-------------|-------------------|---------|
| **Photographer** | Their live website + what's next to publish | Shoot completes → client happy → site updated without a second workflow |
| **Client** | One link for picks and downloads | Done on mobile in one session; never sees "Vega" as a product |

---

## Photographer — two surfaces

### A. Site home (`/admin`) — default landing

**Question:** "How does my site look, and what needs my attention?"

- **Site card** — live URL, publish status, last updated, **Edit site** / **Preview**
- **Pipeline** — albums by stage (draft · awaiting client · retouch · ready to showcase)
- **Showcase queue** — finalized shoots not yet on the site
- **New shoot** — creates album, enters workflow

Site is the anchor; albums are work feeding the site.

### B. Site editor (`/admin/site`) — creative control

**Question:** "How do I want my portfolio to read?"

- Controller + live preview (not a generic page builder)
- Hero title, subtitle, about, contact
- Section structure: which albums appear as galleries / editorial strips
- **Publish** — deploys to `/s/{slug}`; photographer chooses when

Delivery UI never appears here. This is portfolio identity.

### C. Album workflow (`/admin/albums/{id}`) — per shoot

Five steps; delivery is steps 3–4, showcase is the culmination:

```
Upload → Curate → Deliver → Retouch → Showcase
         │          │          │            │
         │          │          │            └── new gallery on YOUR site
         │          │          └── client ZIP download
         │          └── client pick link (feature)
         └── client vs site visibility
```

#### Upload
Batch ingest. Folder → categories. Continue when thumbnails land.

#### Curate
Per-image **Client** / **Site** intent toggles (site may stay off until showcase confirms). Reorder, cover, categories.

#### Deliver (feature)
Delivery card: PIN, email, pick limit, **Open for picking**. One link for the client. Not the product center — a step in the shoot.

#### Retouch
Pick list, CSV, upload finals, **Release downloads** to client.

#### Showcase (culmination)
**Question:** "What from this shoot goes on my website?"

- Grid of picks/finals; all selected by default
- Section title defaults to album name
- **Add to my website** → marks `visibleOnSite`, appends gallery section, optional republish
- Photographer sees preview of how it will read on the site

---

## Client journey (unchanged — intentionally invisible)

Mobile, one link, no account:

1. PIN (if set) → gallery → lightbox → review → submit
2. Wait (same link)
3. Download finals (ZIP)

Client never learns about the photographer's website manager.

---

## Anti-patterns (recentered)

| Old framing | New framing |
|-------------|-------------|
| Admin home = album list | Admin home = **your website** |
| Portfolio builder = equal peer | Site editor = **primary creative surface** |
| Delivery = the product | Delivery = **feature inside album** |
| Finals = done | Finals = done **for client**; showcase = done **for site** |
| `visibleOnSite` toggled during curate only | Showcase step **confirms** what goes public |

---

## v1 success criteria

1. Photographer lands on site home and sees live portfolio status.
2. One shoot: upload → client picks → finals → **add to website** in one session.
3. Published site shows new gallery section without manual code or second tool.
4. Photographer retains full creative control over copy, structure, and what goes public.
