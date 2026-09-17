# Fix plan — CertPath online question banks

Derived from the 30 audits in this folder. Three tiers, in the order they should be done.

## Tier 1 — mechanical, scripted, reversible (ready to run)

**Break the learnable answer-key cycle.** `scripts/shuffle-bank-answers.py <bank>` reshuffles each
question's four choices with a seeded shuffle, rewrites the answer letter, and skips any question whose
explanation names an option by letter. It searches salts until the resulting key sequence looks like
chance (cycle <= 33%, no run > 5, no letter > 30%).

Banks still carrying a cycle, worst first:

| Bank | Tests with a learnable cycle |
|---|---|
| `act-math-tests` | 32 |
| `psat-math-workbook` | 31 |
| `sat-math` / `act-math` | 28 each |
| `psat-math-tests` | 28 |
| `sat-math-tests` | 27 |
| `sat-math-workbook` / `act-math-workbook` | 26 each |
| `asvab-math` | 24 |
| `psat-math` / `ged-math-workbook` | 23 each |
| `ged-math` / `ged-math-tests` | 21 each |
| `tabe-a` 13, `tabe-m` 12, `tabe-e` 11, `tabe-d` 8 | |
| `cnor` | 10 (Test 9 fits A-B-C-D at 79%) |
| `cap` | 7 (Test 7 at 73%) |
| `chst` 2, `pmp` 1, `cmsrn` 1, `csp` 1, `poss` 1 | |

`ccrn` is already fixed (commit 9eb82a9). `data/chst.json` and `data/ged-math.json` have uncommitted
edits from another session — land those first, then run the script on them.

**What Tier 1 does NOT fix:** the longest-option cue. Shuffling moves the key, it does not change which
option is longest. Measured rates: CCRN 90.5%, CNOR 82.8%, CAP 74.9%, CMSRN 71.6%, CSP 63.9%, CHST 63.3%,
PMP 48.8%, CAPM 41.7%. Fixing this means rewriting distractors to match the key's length and specificity —
authoring work, Tier 3.

## Tier 2 — item-level corrections (193 flagged keys, 321 flagged explanations)

Every item is cited by ID in the per-book reports and collected in `_findings_index.json`. Many reports
give the corrected letter explicitly ("correct key: B"); those are quick. Items where the audit says
"no correct option as written" need the stem or an option rewritten, not a new letter.

Highest-risk first:

1. **B15 CCRN** — T3Q116 wrong key (C -> B), plus 19 explanations giving unsafe instruction:
   thiamine-before-glucose as a mandatory sequence (T2Q106, T3Q34), ancillary brain-death testing
   presented as a way around unresolved drug effects (T2Q124), DKA resolution defined by anion gap
   (T1Q150), sepsis antibiotic clock tied to cultures (T1Q148), 2021 dextrose threshold (T1Q3).
2. **B26 CNOR / B27 CMSRN** — same class of clinical defects; CMSRN has the largest explanation-defect
   count in the whole catalogue.
3. **B3 Journeyman Electrician** — 34 flagged keys, 64 flagged explanations, nearly all from the bank
   still being on 2023-and-earlier NEC while the book is sold as 2026 NEC.
4. **Math banks** — B11/B12/B16/B17/B23 etc.: template-generated items with multiple defensible answers,
   answers not among the choices, or mathematically equivalent choices.

## Tier 3 — structural / authoring (not a code change)

| Book | What has to be rebuilt |
|---|---|
| B4 POSS | All 45 reading items have no passages; all 36 "figural reasoning" items are prose, not figures |
| B3 Journeyman | Re-derive load calculations against 2026 NEC (Art. 220 -> 120, 3 VA/ft2 -> 2, 10 kVA -> 8 kVA) |
| B1 CAST | Graphic Arithmetic should be 2 shared drawings per test with dependent items, plus "None of the Above" |
| B2 Mechanical Aptitude | Text-only bank cannot simulate BMCT-II or WTMA, both of which are diagram-based |
| B7-B10 TABE | Same construct failure as POSS |
| B20-B23 | Sold as full-length practice tests but built as topic drills; no module/adaptive structure |
| B41 PMI-ACP | Check which ECO it targets; the old seven-domain outline is retired |
| Certification banks | Rewrite distractors to kill the longest-answer shortcut |

## Deploy note

28 of 30 banks are rated PULL. Tier 1 strictly improves what is already live, but it does not make a PULL
bank shippable. Decide separately whether the worst banks stay live while Tiers 2-3 are worked through.
