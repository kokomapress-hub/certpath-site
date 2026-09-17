# Fix status — 2026-09-17

Work done against the 30 audits in this folder. Every change is committed with an
item-level diff verification; nothing is deployed.

## Re-audit in progress

Corrections packet sent to ChatGPT (Extra High effort) on 2026-09-17:
https://chatgpt.com/c/6aabadda-2304-83eb-9954-c084af7e8c05

184 substantively changed items across 26 banks, each shown BEFORE and AFTER,
with a required verdict of FIXED / PARTIAL / BROKEN per item and a final
CLEARED / NOT CLEARED. **Nothing goes live until that comes back.**

## Landed

| Commit | What |
|---|---|
| `d0ee002` | 12 duplicate-option items; 3 duplicated the KEYED value |
| `18e4227` | CCRN: 1 wrong key, 5 patient-safety corrections, 3 impossible ABGs, 9 overstatements |
| `7eca939` | 377 explanations: removed option letters invalidated by the cycle fix |
| `8933052` | CMSRN: unsafe DKA insulin instruction (2 items) + 8 overbroad premises |
| `b257bf5` | CNOR: Aldrete units, storage clearances, MH sequencing, corticosteroids |
| `9201fd1` | 57 mathematically-identical options (37 equalled the key) |
| `0e04bf2` | 41 unanswerable proportional systems + 8 impossible rounding items |
| `c4225aa` | CSP + CHST: 2 wrong keys, 8 unanswerable premises |
| `693e701` | Mechanical Aptitude + POSS: 4 wrong keys, 9 bad premises |
| `b6d6373` | CAPM + PMI-ACP: conflict of interest, integrated-launch constraint, Little's Law |

## Wrong answer keys corrected (11)

ccrn T3Q116 · cmsrn T1Q133, T2Q141 · csp T1Q24 · chst T3Q9 · mech-apt T1Q57,
T2Q31 · poss T2Q60, T3Q50 · cnor T1Q12 (units) · capm T2Q74

In most of these the bank's own explanation already described the correct
option, so the item was internally contradictory.

## Found by scanning, not in the audit

- **41 proportional systems** where all four options are correct (`4x + 4y = 32`
  is 4x `x + y = 8`). The audit found 2 by hand; a scan found 41 across 14 banks.
- **57 mathematically-equivalent options** differing only as text.
- **12 duplicate-option items**, 3 duplicating the keyed value.
- **8 rounding items** asking for a precision their answer cannot be given to.

## Verified clean (independent re-derivation, not inspection)

- 5,551 templated math answers recomputed from their stems: **0 key mismatches**.
- 14,020 math explanations checked against their keys: **0 real disagreements**.
- 221 systems of equations: all have exactly one solution, and it is the key.
- 580 tests: none above its own chance threshold for a learnable key cycle.

## Corrections to earlier claims in this folder

- A scan reporting **554** stale-letter explanations was wrong; its regex was
  case-insensitive and matched `(e.g.` and `(D1)`. True figure: **78**.
- A first pass of the math verifier reported **872** wrong keys. All 872 were
  bugs in the verifier (sale price computed instead of discount amount, "12%
  decrease" not parsed, "NOT blue" read as "blue"). Actual: **0**.
- The audit's "25 CAPM interactive answer keys unverifiable" was an artifact of
  `build_packet.py`, which emitted only `choices`. All 54 match/order items
  across capm and pmi-acp carry well-formed `pairs`/`sequence`. Builder fixed.
- The audit named chst T3Q9 correctly but cited the wrong replacement letter.
  Resolved by matching option TEXT, which is why letters are never trusted here.

## Still open

**B3 Journeyman Electrician — FLAGGED, not fixed.** 34 flagged keys and 64
explanations trace to one root cause: the book is sold as 2026 NEC and the bank
is built on 2023 (Art. 220 -> 120, 3 VA/ft2 -> 2, 10 kVA -> 8 kVA). Resolving it
means either relabelling the book as 2023 NEC or re-deriving every load
calculation against the 2026 code text. Not guessed at.

**Tier 3, unchanged and not fixable by editing text:**
- B4 POSS: 45 reading items with no passages; 36 "figural" items as prose.
  T2Q57, T3Q54, T3Q58 depend on figures the bank does not contain.
- B1 CAST Graphic Arithmetic needs shared drawings; B2 needs diagrams.
- B20-B23 are sold as full-length tests but built as topic drills.
- The longest-option cue: CCRN 90.5%, CNOR 82.8%, CAP 74.9%, CMSRN 71.6%.
  Shuffling moves the key, not the lengths - this needs distractor rewriting.
