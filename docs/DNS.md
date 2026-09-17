# DNS — Vega

**Canonical bookmark:** [https://vega-menhir-holdings.vercel.app](https://vega-menhir-holdings.vercel.app)

Do not treat an unpaid `vega.menhir-holdings.com` (or photographer `{slug}.vega.menhir-holdings.com` bounce) as the live product. Preview and production for this pass are the Vercel `vercel.app` host.

## Vercel

Project: **vega** (`menhir-holdings` team), GitHub: `menhir-holdings/Vega`.

```bash
cd "Menhir Holdings/Visual/vega"
npx vercel@54 link --scope menhir-holdings --yes
npx vercel@54 deploy --yes --scope menhir-holdings
```

## Future custom domain

If a paid `vega.menhir-holdings.com` is wired later, CNAME `vega` → `cname.vercel-dns.com` (DNS only until SSL is green). Until then, the vercel.app bookmark is canonical.

Do **not** add `{slug}.vega.menhir-holdings.com` wildcards that bounce unpaid `.com` hosts.

## URLs

| Role | URL |
|------|-----|
| Public site | https://vega-menhir-holdings.vercel.app |
| Owner desk | https://vega-menhir-holdings.vercel.app/desk |
