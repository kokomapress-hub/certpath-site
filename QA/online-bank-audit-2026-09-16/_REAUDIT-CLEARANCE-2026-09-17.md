# Re-audit clearance log — 2026-09-17

Every corrected item was resubmitted to ChatGPT (High effort, one bank or small
group per thread), with a required verdict of FIXED / PARTIAL / BROKEN per item
and a final CLEARED / NOT CLEARED. A group is only CLEARED when every item is
FIXED.

## Result: all 184 corrected items CLEARED

| Group | Items | Passes | First-pass result |
|---|---|---|---|
| CCRN (B15) | 25 | 4 | 17 FIXED / 8 PARTIAL / 0 BROKEN |
| CMSRN (B27) | 10 | 2 | 9 / 1 / 0 |
| CNOR (B26) | 5 | 3 | 2 / 3 / 0 |
| CSP (B5) | 5 | 3 | 4 / 1 / 0 |
| CHST (B6) | 5 | 3 | 2 / 3 / 0 |
| Mechanical Aptitude (B2) | 7 | 2 | 6 / 1 / 0 |
| POSS (B4) | 6 | 2 | 5 / 1 / 0 |
| CAPM + PMI-ACP (B33, B41) | 3 | 2 | 2 / 1 / 0 |
| sat/psat/act/asvab math | 44 | 1 | 44 / 0 / 0 |
| math workbooks + practice tests | 32 | 2 | 30 / 2 / 0 |
| tabe-a | 27 | 2 | 26 / 1 / 0 |
| tabe-d, tabe-e, tabe-m | 15 | 2 | 11 / 4 / 0 |

**184 items. 0 BROKEN at any point** — no correction was ever found to have made
an item worse.

## What the loop caught in my corrections

40 PARTIAL verdicts across the run, in four recurring kinds. None was a wrong
answer key; every one was a defect in precision.

1. **Absolutes softened but not made conditional (9 items).** I would fix an
   explanation and leave the KEYED OPTION still too strong. CCRN T1Q143
   (minimum-necessary does not apply to provider-to-provider treatment
   disclosures), T2Q24 (de-identified data is not PHI), T5Q59 / T5Q133 (lactate
   is not proof of hypoperfusion), CMSRN T3Q135 (ASPEN: adults do NOT require a
   TPN taper — I had replaced "never discontinue abruptly" with "taper rather
   than stop abruptly", a milder absolute), CNOR T10Q136 ("the only treatment"
   vs "first-line"), mech-apt T2Q52 (specified Type 316 on one side of a
   comparison, left bare "aluminium" on the other).

2. **Numeric boundaries (5 items).** CNOR T1Q12 took three passes: converting the
   Aldrete criterion from mmHg to percent, I left "more than 50%" overlapping
   "20% to 50%", then after fixing that, "within 20%" still overlapped
   "20% to 49%". CSP T2Q26 took three to state 1926.1408's Option 2 / Option 3 /
   Table A structure correctly.

3. **Claims invented while fixing something else (3 items).** CHST T3Q9 — I
   corrected the crane-signal key correctly, then asserted "both arms crossed
   overhead = emergency stop" and that a pushing motion means swing. Neither is a
   real ASME B30.5 signal. Also POSS T1Q29 (cylindrical rollers "radial only" —
   flanged NJ/NUP designs carry limited thrust) and PMI-ACP T6Q34 ("would leave
   most of the team idle", unsupported). The most dangerous class: invented
   claims read exactly as confidently as sourced ones.

4. **Distractors that were merely wrong, not diagnostic (7 items, one cause).**
   `fix_equiv.py` scored replacement distractors on being mathematically DISTINCT
   from the other options and never on tracing to a realistic error, so it could
   emit a value no student would arrive at — which makes an item EASIER rather
   than fairer, quietly inflating scores on a readiness test. Caught in
   sat-math-workbook (2), tabe-a (1), tabe-d (1), tabe-e (1), tabe-m (2). All now
   carry a named error path.

## Items that needed four passes

- **CCRN T4Q104.** Correcting the pH to satisfy Henderson-Hasselbalch made the
  compensation inadequate under Winter's formula, which made a SECOND option
  defensible — worse than the original defect. Then my delta-gap exclusion could
  not be computed from the stem. Now self-contained: Na+ 140, Cl- 100, anion gap
  22, Winter's 35 +/- 2 against a measured 35, delta ratio 1.7.
- **CCRN T2Q124.** Three successive wordings before reaching the guideline's
  actual scope: an uncorrectable METABOLIC DERANGEMENT, not a generic
  "confounding condition", and not "once confounders have been excluded" either.

## Final state of the automated checks

- 30 published banks structurally valid (2 flags remain, both verified false
  positives: a case-sensitive capitalisation item, and "primary key is a unique
  identifier" matching a key-claim regex).
- 5,551 templated math answers re-derived from their stems: **0 key mismatches**.
- Mathematically-equivalent options: **0 critical, 0 distractor** (21 filtered
  false positives, each with a recorded reason).
- Proportional systems with more than one correct option: **0**.
- Percent items not rounded as the stem demands: **0**.
- Answer-key cycle: 3 of 580 tests above their own 95th-percentile chance
  threshold, against ~29 expected by chance at that threshold.

## Still open — NOT fixed by this work

- **B3 Journeyman Electrician: FLAGGED.** Its 34 flagged keys and 64 explanations
  trace to the book being sold as 2026 NEC while the bank is built on 2023
  (Art. 220 -> 120, 3 VA/ft2 -> 2, 10 kVA -> 8 kVA). Resolving it means either
  relabelling the book as 2023 NEC or re-deriving every load calculation against
  the 2026 code text. Deliberately not guessed at.
- **Tier 3, not fixable by editing text:** B4 POSS ships 45 reading items with no
  passages and 36 "figural" items as prose (T2Q57, T3Q54, T3Q58 depend on figures
  the bank does not contain); B1 CAST Graphic Arithmetic needs shared drawings;
  B2 needs diagrams; B20-B23 are sold as full-length tests but built as topic
  drills.
- **The longest-option cue.** CCRN 90.5%, CNOR 82.8%, CAP 74.9%, CMSRN 71.6%.
  Shuffling moves the key, not the lengths — this needs distractor rewriting
  across whole banks, which is authoring work rather than correction.

The clearance above covers the 184 items that were changed. It is not a re-rating
of the banks against the original audit's blueprint and item-design findings.
