# CertPath Publishing — Project Status

Single source of truth for what's live, what's wired, and what's pending. Update this after every meaningful change.

**Last updated:** 2026-04-18

## Live URLs

- **Site:** https://certpathpublishing.store (Cloudflare Pages, auto-deploy from `main`)
- **Repo:** https://github.com/kokomapress-hub/certpath-site
- **Amazon storefront:** search "CertPath Publishing"
- **Payhip store:** https://app.payhip.com (CertPath store, separate from KOKOMA)

## Books — Status Matrix

| # | Slug | Title | Paperback (KDP) | E-book (Payhip) | Cheatsheet (Payhip) | Cover |
|---|---|---|---|---|---|---|
| 1 | cast | CAST | ✅ B0GWWTVNPM | ✅ Fphcy | ✅ mcNUK | ✅ |
| 2 | mech-apt | Mechanical Aptitude | ✅ B0GX5BKYDB | ✅ AURvd | ✅ Ww7Gn | ✅ |
| 3 | journeyman-elec | Journeyman Electrician | ✅ B0GX5PYHC9 | ✅ 32MKx | ✅ zh2ct | ✅ |
| 4 | poss | POSS | ✅ B0GX9TQMQ5 | ✅ 2eG41 | ✅ nHbBm | ✅ |
| 5 | csp | CSP | ✅ B0GXDZ91DZ | ✅ CXKYO | ✅ 2btkV | ✅ |
| 6 | chst | CHST | ✅ B0GXJ74XG7 | ✅ F51cp | ✅ Z4jNR | ✅ |
| 7 | tabe-a | TABE Level A Math | ✅ B0GZCNBK3V | ⏳ | ⏳ | ✅ |
| 8 | tabe-d | TABE Level D Math | ⏳ Pending | ⏳ | ⏳ | placeholder |
| 9 | nhie | Home Inspector (NHIE) | ⏳ Pending | ⏳ | ⏳ | placeholder |
| 8 | sts | STS | ⏳ Pending | ⏳ | ⏳ | placeholder |
| 9 | cpt | MSSC CPT | ⏳ Pending | ⏳ | ⏳ | placeholder |
| 10 | ncidq | NCIDQ | ⏳ Pending | ⏳ | ⏳ | placeholder |

## Pricing

- Paperback: **$19.99** (Amazon KDP) — dropped from $29.99 on 2026-04-24 to drive launch velocity + reviews
- E-book: **$9.99** (50% off displayed on site) — dropped from $14.99
- Cheatsheet: **$1.99**

**Pricing ladder plan:**
- Launch (next 60 days): $19.99 paperback → trigger reviews
- After 10+ reviews: raise to $24.99
- After 25+ reviews / category badge: raise to $27.99–$29.99

## Payments

- **Provider:** Payhip (Stripe blocked in Qatar; Lemon Squeezy also rejected)
- **Payout:** PayPal Business → Qatar bank
- **Fees per sale:** Payhip 5% + PayPal 4.4% + $0.30
  - $9.99 e-book → ~$8.70 net
  - $1.99 cheatsheet → ~$1.50 net
- **Integration:** Direct anchor links (`<a href="payhip.com/b/XXX">`) — no backend
- **Details:** see [PAYHIP_SETUP.md](PAYHIP_SETUP.md)

## Site Architecture

- Static HTML/CSS/JS on Cloudflare Pages
- No backend, no database — `data/books.json` is the catalog
- localStorage for unlocked book codes
- GitHub `main` push → Cloudflare auto-deploy (~1-2 min)
- Inline SVG shield logo (PNG had sizing issues)
- CSS cache-buster `?v=N` — bump when style.css changes

## Key Files

| File | Purpose |
|---|---|
| `data/books.json` | Catalog: titles, prices, ASINs, Payhip URLs, access codes |
| `index.html` | Homepage with book grid + cheatsheet grid |
| `ebook.html` | Per-book e-book landing page |
| `access.html` | Access code entry for online practice tests |
| `quiz.html` | Quiz runner (uses clean URL `/quiz?book=...&test=...`) |
| `blog/index.html` | Blog list (reads `blog/posts.json`) |
| `blog/YYYY-MM-DD-slug.html` | Individual blog posts |
| `bonus-pdfs/*.pdf` | Cheatsheet PDFs delivered by Payhip |
| `_redirects` | Empty — Cloudflare handles clean URLs natively |

## Source Material (outside repo)

- Books: `/Users/prasadchandrasekaran/Desktop/Claude Code/{slug}-book/` (docx-js generators)
- Cheatsheets: `/Users/prasadchandrasekaran/Desktop/1-Projects/CertPathPublishing/CheatSheets/` (docx-js, reuses styles.js from journeyman-elec-book)

## Adding a New Book (post-KDP launch)

1. Get Amazon ASIN from KDP dashboard → update `asin` + `amazonUrl` in `data/books.json`
2. Create 2 Payhip products (e-book + cheatsheet), upload PDFs
3. Copy share URLs → fill `payhipEbookUrl` + `payhipCheatsheetUrl` in `data/books.json`
4. Replace placeholder cover at `img/covers/{slug}.svg` with real PNG from KDP cover PDF
5. Set `"published": true`
6. Commit + push — Cloudflare deploys in ~2 min
7. Update this file's status matrix

## Pending Work

- [ ] **KDP dashboard**: update all 6 paperback list prices to $19.99 (~72hr propagation)
- [ ] **Payhip dashboard**: update all 6 e-book product prices to $9.99 so checkout matches site
- [ ] **TABE Level A:** create Payhip products (e-book + cheatsheet) and generate cheatsheet PDF
- [ ] **TABE Level D:** complete KDP publishing → flip `published: true` + add ASIN
- [ ] Books 9-12: complete KDP publishing (NHIE, STS, MSSC CPT, NCIDQ)
- [ ] Books 9-12: generate cheatsheet PDFs once books are final
- [ ] Books 9-12: replace placeholder SVG covers with real PNGs (need cover PDFs in `Cover/V1/`)
- [ ] Verify end-to-end Payhip checkout for at least one purchase
- [ ] Optional: link Wise as secondary PayPal withdrawal destination once transaction history accumulates

## Operational Notes

- **Daily blog agent:** RemoteTrigger `trig_01WtoJg54XHBiesu1Mbp43Qs` posts to `blog/`
- **Refunds:** Payhip dashboard → Sales → Refund (auto-revokes download access)
- **Customer list:** Payhip → Customers (use for follow-up campaigns)
- **MailerLite:** wired for email capture on `/access`

## Known Quirks

- `/access` had a 308 loop earlier — fixed by emptying `_redirects` so Cloudflare handles clean URLs natively. Don't re-add `/access /access.html 200` rules.
- Quiz internal links MUST use clean URLs (`/quiz?book=...`), not `.html` — the redirect drops query strings.
- Stripe code was deleted (commit `dfb47e1`). Don't re-add unless Qatar restriction lifts.
