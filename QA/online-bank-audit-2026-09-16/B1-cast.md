# B1 — CAST Exam Study Guide (`cast`) — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** 330 questions / 3 tests · **Auditor:** ChatGPT (GPT-5 Thinking, High), thread "Audit Study Guide"
**Coverage claimed by auditor:** all 330 questions, 12 passages, all keys and explanations; 54 Mathematical Usage items independently recomputed. Figure binaries not supplied, so 48 Graphic Arithmetic keys are not visually verified.

## 1. Verdict — 7.1/10 · SHIP WITH FIXES

| Area | Score | Finding |
|---|---|---|
| Answer-key correctness | 9.4 | One defective item (no correct answer); all 54 standalone math keys recompute correctly |
| Explanation accuracy | 7.8 | Several explanations cite facts absent from their passages; two OSHA statements materially wrong; one circular |
| Item quality / distractors | 6.1 | Heavy concept recycling, many giveaway distractors, some artificial stems |
| Exam-blueprint alignment | 6.4 | Reproduces *classic* CAST exactly; current **CAST-R** differs materially; Graphic Arithmetic format wrong |
| Structural hygiene | 6.8 | Counts/keys clean, but section-level key skew, 61 repeated stems, 40 terse explanations |

## 2. Wrong or ambiguous keys (1)

- **T3Q30** — no fully correct option as written. Choice C says the bottom of a submerged tank faces greater *outward* force; external hydrostatic pressure acts **inward**. Intended key C after rewording.

No key errors in the 54 Mathematical Usage items. The 48 Graphic Arithmetic keys could not be cleared without the figures.

## 3. Explanation errors (8 material + 3 minor)

| Item | Defect |
|---|---|
| T1Q60 | Claims the passage calls LOTO failure "a leading cause of workplace injuries" — the passage never says this |
| T1Q64 | Cites 29 CFR 1926.502(d)(20) for impact-loaded PFAS; correct provision is **(d)(19)** ((d)(20) is prompt rescue) |
| T1Q74 | Says the passage covers "clearances"; it covers grounding, GFCIs, double insulation, inspection (minor) |
| T2Q51 | Says the passage lists "sprinklers"; it lists ponding, wet burlap, fine mist, sheeting, membrane compounds (minor) |
| T2Q52 | Invents "65–75% of its 28-day strength"; passage says ~70% of designed strength at 7 days |
| T3Q30 | Repeats the outward/inward pressure error |
| T3Q48 | Imports OSHA's "competent person" definition into a passage-vocabulary item; passage never defines it |
| T3Q59 | **Material regulatory error** — treats 85 dBA TWA as the point hearing protection must be worn. §1910.95: 85 dBA is the action level (protectors *made available*); construction §1926.52 uses the Table D-2 / 90 dBA framework |
| T3Q74 | Says the passage covers "capacity tags"; it does not (minor) |
| T3Q76 | Says the passage "emphasizes the role of a qualified rigger"; the term never appears |
| T3Q104 | **Circular** — derives height from the keyed answer, then multiplies back to "prove" it |

## 4. Item quality

**Concept cloning (largest quality defect):**
- Free fall ×7 — T1Q1, T1Q6, T2Q1, T2Q14, T2Q25, T3Q9, T3Q10
- Hydraulic area / F=P×A ×7 — T1Q4, T1Q8, T1Q16, T2Q18, T2Q28, T3Q13, T3Q28
- Levers ×10 — T1Q7, T1Q11, T1Q24, T2Q6, T2Q13, T2Q35, T3Q5, T3Q11, T3Q38, T3Q44
- Ramps ×9 — T1Q2, T1Q17, T1Q35, T2Q3, T2Q10, T2Q40, T3Q1, T3Q14, T3Q37
- Pipe velocity/pressure ×9 — T1Q10, T1Q42, T2Q31, T2Q32, T2Q34, T3Q2, T3Q16, T3Q17, T3Q43
- Springs ×6 — T1Q20, T1Q31, T2Q5, T2Q22, T3Q7, T3Q34
- Unit conversions padded and repeated across tests — T1Q89–94, T2Q88–94, T3Q85, T3Q88

**Giveaway distractors:** T1Q22, T1Q28, T2Q36, T3Q21 ("gravity briefly reverses direction", "rocks repel water"); reading items T1Q69, T2Q53, T3Q45.

**Defective stems:** T3Q14 (a "ramp" with slope length = rise = 7 ft is vertical); T3Q17 (confuses continuity with "ease" of pushing flow); T3Q48 and T3Q76 (external-knowledge leakage into reading items).

## 5. Blueprint coverage

Bank reproduces **classic CAST** per-test structure exactly: Mechanical Concepts 44 (132 total), Reading 32 (96), Mathematical Usage 18 (54), Graphic Arithmetic 16 (48).

**The issue:** EEI's current **CAST-R** (©2020) is Graphic Arithmetic + Mechanical Concepts + Reading + the 105-item Work Preferences Inventory — **Mathematical Usage is not a CAST-R component**, and the bank has no WPI coverage.
- T1Q77–94, T2Q77–94, T3Q77–94 (54 items) are classic-CAST-only content — fine if positioned as classic CAST prep, a problem if customers expect CAST-R.
- Graphic Arithmetic architecture is wrong: EEI uses **two shared drawings per test with several questions each**; this bank uses a separate figure per item, and omits the official fifth "None of the Above" option.

## 6. Structural check — Section A confirmed

Counts, 0 invalid keys, 0 missing explanations, 0 duplicate choice sets, key distribution (A 109, B 108, C 71, D 28, E 14) all confirmed independently.

**But the global numbers hide section-level skew:**

| Section | n | A | B | C | D | E | Concern |
|---|---|---|---|---|---|---|---|
| Mechanical | 132 | **68 (51.5%)** | 39 | 25 | — | — | A correct more than half the time |
| Reading | 96 | 13 | **42 (43.8%)** | 25 | 16 | — | Strong B bias |
| Math | 54 | 20 (37%) | 12 | 15 | 7 | — | Moderate A bias |
| Graphic | 48 | 8 | 15 | 6 | 5 | 14 | B/E = 60.4% |

T2 Mechanical keys A on 25/44; T3 Mechanical 24/44 — exploitable. Runs confirmed: T2Q3–Q6 A×4, T2Q37–Q40 A×4, T2Q106–Q109 B×4, T3Q19–Q22 A×4.

40 terse explanations confirmed and commercially significant (e.g. T1Q101, T1Q102, T2Q99, T2Q100, T3Q97, T3Q98 amount to "read it from the table").

`nMissingImageFiles: 0` could not be independently verified — the packet ships figure paths, not binaries.

## 7. Top fixes (ranked)

1. **T3Q30** — repair now; no correct option exists.
2. **T1Q64** — fix OSHA citation to 1926.502(d)(19).
3. **T3Q59** — fix the 85/90 dBA treatment (action level vs mandatory use; §1910.95 vs §1926.52).
4. **Graphic Arithmetic redesign** (T*Q95–Q110) — two shared drawings per test, multiple dependent questions each, plus "None of the Above" fifth option. Largest fidelity repair.
5. **Settle classic CAST vs CAST-R positioning** (T*Q77–Q94) in the book, cover copy, and site.
6. **Break up the clone families** in Mechanical Concepts.
7. **Rebalance keys section by section** — Mechanical 68/132 A, Reading 42/96 B.
8. **Rewrite the 40 terse explanations**, especially Graphic; show the figure values and the operation (T3Q104 circularity included).
9. **Strip invented passage support** from reading explanations — T1Q60, T2Q52, T3Q48, T3Q76.
10. **Raise difficulty/discrimination** — less repetitive unit conversion (T1Q89–94 etc.), replace absurd distractors (T1Q22, T1Q28, T2Q36, T3Q21).

## 8. Summary row

| B1 — CAST Exam Study Guide | 7.1/10 | 1 wrong key | 8 bad explanations | SHIP WITH FIXES | Classic CAST counts exact, but Graphic Arithmetic format, CAST-R positioning, key skew, safety/explanation defects, and heavy near-duplication need correction. |
