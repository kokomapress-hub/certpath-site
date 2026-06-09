# CertPath Audit — Books B1–B23

**Date:** 2026-06-09
**Scope:** All 23 books in the source folder (`B1` through `B23`), all currently live on Amazon.
**Method:** Cross-referenced source PDFs (`/Users/.../1-Projects/CertPathPublishing/B*/`), the website catalog (`data/books.json` + `data/*.json`), and the Amazon storefront.

## Headline findings

1. **23 of 23 books are now correctly wired** with ASINs and Amazon URLs in `books.json` (11 were missing — backfilled this session).
2. **8 of 23 books (B16–B23) have NO question data on the website** — the homepage cards link to `/access`, but there's no `data/{slug}.json` to drive the quiz. **These books cannot deliver the online tests their covers promise** until question banks are created.
3. **Duplication varies by series:**
   - Cert exam books (B2–B6): website **mirrors** the book content (3/3 sample questions found verbatim).
   - CAST (B1): website has an **independent** bank (0/3 match).
   - TABE books (B7–B10): **partial overlap** (1/3 found) — website has its own bank but some questions are shared with the book.
   - College Prep books (B11–B14, all SAT/PSAT/ACT/GED): **independent** banks (mostly 0/3 — these online banks are template-generated, not lifted from the book).
   - CCRN (B15): independent bank.

---

## Master table

| B# | Title | Pages | Claimed Qs (book + online) | Website Qs | Duplicates? | Amazon |
|---|---|---|---|---|---|---|
| **B1** | CAST Exam Study Guide | 198 | 500+ book Qs | 330 (3 tests) | **No** (web bank independent) | [B0GWWTVNPM](https://www.amazon.com/dp/B0GWWTVNPM) |
| **B2** | Mechanical Aptitude Study Guide | 177 | 440+ book Qs | 180 (3 tests) | **Yes — verbatim** | [B0GX5BKYDB](https://www.amazon.com/dp/B0GX5BKYDB) |
| **B3** | Journeyman Electrician Study Guide | 219 | 500+ book Qs | 180 (3 tests) | **Yes — verbatim** | [B0GX5PYHC9](https://www.amazon.com/dp/B0GX5PYHC9) |
| **B4** | POSS Exam Study Guide | 169 | 370+ book Qs | 180 (3 tests) | **Yes — verbatim** | [B0GX9TQMQ5](https://www.amazon.com/dp/B0GX9TQMQ5) |
| **B5** | CSP Exam Study Guide | 202 | 500+ book Qs | 180 (3 tests) | **Yes — verbatim** | [B0GXDZ91DZ](https://www.amazon.com/dp/B0GXDZ91DZ) |
| **B6** | CHST Exam Study Guide | 173 | 500+ book Qs | 180 (3 tests) | **Yes — verbatim** | [B0GXJ74XG7](https://www.amazon.com/dp/B0GXJ74XG7) |
| **B7** | TABE 11 & 12 Math Level A | 215 | 1,200+ problems | 1,000 (20 tests) | **Partial** | [B0GZCNBK3V](https://www.amazon.com/dp/B0GZCNBK3V) |
| **B8** | TABE 11 & 12 Math Level D | 170 | 1,000+ problems | 650 (13 tests) | **Partial** | [B0GZK4TXKK](https://www.amazon.com/dp/B0GZK4TXKK) |
| **B9** | TABE 11 & 12 Math Level M | 154 | 800+ problems | 600 (15 tests) | No match in sample | [B0GZGYP2QD](https://www.amazon.com/dp/B0GZGYP2QD) |
| **B10** | TABE 11 & 12 Math Level E | 114 | 500+ problems | 490 (14 tests) | **Partial** | [B0H12F299V](https://www.amazon.com/dp/B0H12F299V) |
| **B11** | Digital SAT Math Prep | 195 | 700+ book + 1,500+ online | 1,540 (35 drills) | **No** (web bank generated) | [B0H2LHP2TY](https://www.amazon.com/dp/B0H2LHP2TY) |
| **B12** | Digital PSAT/NMSQT Math Prep | 185 | 700+ book + 1,500+ online | 1,540 (35 drills) | **No** (web bank generated) | [B0H2PBYBBQ](https://www.amazon.com/dp/B0H2PBYBBQ) |
| **B13** | ACT Math Prep | 247 | 650+ book + 1,500+ online | 1,530 (34 drills) | **Partial** | [B0H2TZ3VMT](https://www.amazon.com/dp/B0H2TZ3VMT) |
| **B14** | GED Math Prep | 211 | 650+ book + 1,500+ online | 1,518 (33 drills) | **No** (web bank generated) | [B0H2XXSTDL](https://www.amazon.com/dp/B0H2XXSTDL) |
| **B15** | Adult CCRN Exam Prep | 184 | 750+ practice Qs | 750 (5 tests) | **No** (web bank independent) | [B0H344Q8HL](https://www.amazon.com/dp/B0H344Q8HL) |
| **B16** | Digital SAT Math Workbook | 198 | 700+ book + 1,500+ online | listed 1,540 — **NO JSON** ⚠️ | n/a | [B0H49B1Q68](https://www.amazon.com/dp/B0H49B1Q68) |
| **B17** | Digital PSAT/NMSQT Math Workbook | 195 | 700+ book + 1,500+ online | listed 1,540 — **NO JSON** ⚠️ | n/a | [B0H49TXZN7](https://www.amazon.com/dp/B0H49TXZN7) |
| **B18** | ACT Math Workbook | 199 | 700+ book + 1,500+ online | listed 1,530 — **NO JSON** ⚠️ | n/a | [B0H4C89CML](https://www.amazon.com/dp/B0H4C89CML) |
| **B19** | GED Math Workbook | 173 | 600+ book + 1,500+ online | listed 1,518 — **NO JSON** ⚠️ | n/a | [B0H4CJPMKT](https://www.amazon.com/dp/B0H4CJPMKT) |
| **B20** | Digital PSAT/NMSQT Math: 10 Practice Tests | 122 | 440 book + 1,500+ online | listed 1,540 — **NO JSON** ⚠️ | n/a | [B0H4C69P6F](https://www.amazon.com/dp/B0H4C69P6F) |
| **B21** | ACT Math: 10 Practice Tests | 124 | 450 book + 1,500+ online | listed 1,530 — **NO JSON** ⚠️ | n/a | [B0H4KG9WPQ](https://www.amazon.com/dp/B0H4KG9WPQ) |
| **B22** | GED Math: 10 Practice Tests | 123 | 460 book + 1,500+ online | listed 1,518 — **NO JSON** ⚠️ | n/a | [B0H4L73NR3](https://www.amazon.com/dp/B0H4L73NR3) |
| **B23** | Digital SAT Math: 10 Practice Tests | 123 | 440 book + 1,500+ online | listed 1,540 — **NO JSON** ⚠️ | n/a | [B0H4L4FJH7](https://www.amazon.com/dp/B0H4L4FJH7) |

---

## ⚠️ Critical: 8 books promise online tests they can't deliver

**B16–B23** appear on the homepage with "1,540 questions / 35 drills" etc., but `data/{slug}.json` does **not exist** for any of them. When a customer enters the access code printed in the book, they'll get a broken quiz page.

**Possible fixes (pick one):**
- **A — Reuse the parent bank:** point each workbook/tests slug at its sibling JSON (e.g. `sat-math-workbook` reads `sat-math.json`). Quickest. Just update `data/books.json` cover/title/asin per book but the quiz engine loads from the parent slug.
- **B — Generate dedicated banks:** create 8 new JSON files, possibly templated like the SAT bank. Higher integrity but ~3,000 new generated questions.
- **C — Mark as "Coming Soon":** flip these 8 books to `published: false` on the site until banks exist. Customers buying the book see no broken UX, but they also don't get what the cover promises.

My recommendation: **(A) now**, optionally **(B) later** if there's signal that customers notice duplicate content across the SAT/SAT-Workbook/SAT-Tests trio.

---

## Duplication methodology

For each book with a website JSON:
1. Sampled 3 questions (first, middle, last).
2. Extracted a 40-character distinctive substring from each (skipping leading boilerplate).
3. Searched the book's interior PDF text (flattened to one line) for the substring.
4. Reported `n/3` exact matches.

**Caveats:** PDF text extraction is imperfect for math (subscripts, fractions, special symbols). A "0/3" result for a math-heavy book may be partly artifact. The cert exam books (B2–B6) which match 3/3 confirm the method works for text-heavy questions. The college-prep books (B11–B14) genuinely use independent template-generated banks — verified by sampling actual question strings ("f(x) = 4x + (-3)" style in the website JSON vs. natural-language word problems in the book).

---

## Reconciliation notes

- **POSS book claim:** website prefatory text says "500+", but Amazon listing description says "370+ Questions". The book interior text was ambiguous; using Amazon's published count.
- **TABE Level A website test count (20 / 1,000 Qs):** much higher than the book's claim (3 tests / 1,200+ problems). Most of the website Qs are NEW content authored after the book was published. Same pattern for D/M/E.
- **CCRN claim (750+):** matches website count exactly (5 tests × 150 Qs). But sampled questions don't match the book text — the website has a parallel bank, not a reprint.

---

## What was already correct vs. fixed this session

✅ **Already correct (12 books):** cast, mech-apt, journeyman-elec, poss, csp, chst, tabe-a, tabe-d, tabe-m, tabe-e, sat-math, psat-math — ASINs and Amazon URLs were set; covers are real PNGs from the source folders.

🔧 **Fixed this session (11 books):** act-math, ged-math, ccrn, sat-math-workbook, psat-math-workbook, act-math-workbook, ged-math-workbook, sat-math-tests, psat-math-tests, act-math-tests, ged-math-tests — added ASINs + Amazon URLs. Rendered real `act-math.png` cover from the wraparound source PDF (was an SVG placeholder).

⚠️ **Still outstanding:** the 8 books in B16–B23 need question data wired in (see Critical section above).
