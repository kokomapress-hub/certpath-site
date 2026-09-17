# B15 — Adult CCRN Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/ccrn.json` — 750 questions / 5 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 4.5/10

| Audit dimension | Score |
|---|---|
| Answer-key correctness | 7.5/10 |
| Explanation accuracy | 6.0/10 |
| Item quality and distractors | 1.5/10 |
| Exam-blueprint alignment | 6.0/10 |
| Structural hygiene | 2.0/10 |

The release blockers are clinical misinformation and highly predictable answers — not a failure to adopt the revised domain percentages.

T3Q116 has a definite wrong-letter key: C must be B. Five additional items have invalid premises or material answer ambiguity. Nineteen explanations require substantive correction, including instructions concerning hypoglycemia treatment, brain-death testing, DKA resolution and diagnostic interpretation.

**Across T1Q1–T5Q150, a repeating four-letter sequence matches 728 of the 750 supplied keys — 97.1%. Test 5 follows B–A–D–C without a single exception. Independently, selecting the sole longest option by character count matches 679/750 supplied keys — 90.5%.** These are major threats to the usefulness of the tests as readiness assessments, despite the balanced overall A/B/C/D totals.

Coverage: all 750 items, all 3,000 options and all 750 explanations read directly; bank parsed independently, structural statistics and numerical/acid-base examples recomputed, clinical content checked against the revised AACN plan and current guidance. Not a sample.

**Release decision: PULL.**

2. WRONG OR AMBIGUOUS KEYS

**Definite wrong-letter key**

- **T3Q116** — key selects permanent flaccidity as evidence that spinal shock is resolving — correct key: **B**, "Return of reflexes below the level of injury." The explanation itself describes return of reflex activity, directly contradicting the keyed C. Retrospective score correction warranted for affected attempts.

**Invalid premises or material ambiguity**

- **T2Q123** — Regular insulin is not the only insulin formulation that can be given IV — correct key: none under the stem's "only" premise. (NovoLog insulin aspart prescribing information permits IV administration under medical supervision.) Repair the premise.
- **T5Q64** — Conflates the pre-thrombolysis BP threshold with during/after management — correct key: C only for the pretreatment threshold (185/110); during treatment and for 24 h the limit is 180/105. Specify the phase before scoring.
- **T5Q26** — Low end-tidal CO₂ during CPR is not specific to inadequate compressions/perfusion — A intended, but C also physiologically defensible (excessive ventilation lowers ETCO₂). Add context to make A uniquely best.
- **T1Q145** — "Research requires IRB review and informed consent" presented as exceptionless — no option fully accurate as written (exemptions and consent waivers exist).
- **T2Q24** — "Any patient information or images posted on social media are automatically a HIPAA violation" is overbroad — no universally correct option as written. Properly de-identified information is not PHI.

Count: one definite miskey plus five invalid or materially ambiguous items.

3. EXPLANATION ERRORS

**Patient-safety-priority corrections**

- **T2Q124** — Drug effects incorrectly included among confounders that ancillary brain-death testing can bypass. Current guidance requires letting drug effects clear; ancillary testing addresses an unperformable exam component or unsafe/incomplete apnea test.
- **T2Q106; T3Q34** — Thiamine-before-glucose taught as a required sequence. Never delay emergency glucose; ASAM permits either order or concurrent administration. T2Q106 is worse because the instruction sits inside the keyed answer to a status-epilepticus question.
- **T1Q3** — Retains the older ~200 mg/dL dextrose-addition threshold; current adult hyperglycemic-crisis consensus adds dextrose below 250 mg/dL.
- **T1Q150** — Anion-gap closure incorrectly stated to define DKA resolution; current consensus uses ketones < 0.6 mmol/L plus venous pH ≥ 7.3 or bicarbonate ≥ 18 mmol/L (hyperchloremic acidosis can mislead).
- **T1Q148** — Antibiotic clock described as "within one hour of cultures"; the clock runs from presentation/recognition, and cultures must not delay indicated antibiotics.

**Diagnostic and treatment overstatements**

| Items | Defect |
|---|---|
| T2Q16; T3Q40 | Glucose-positive drainage treated as diagnostic of CSF leak; glucose-strip testing lacks sensitivity/specificity (use β₂-transferrin) |
| T4Q55 | Treats new LBBB with ischemic symptoms as automatically a STEMI equivalent; keyed B ("possible", urgent evaluation) is right — preserve the distinction |
| T2Q120 | Claims benzodiazepines are "reserved for withdrawal syndromes" — false; they have seizure/status-epilepticus indications (the bank itself uses midazolam for refractory status in T1Q116) |
| T2Q121; T5Q59; T5Q133 | Elevated/rising lactate equated categorically with anaerobic metabolism from hypoperfusion |
| T5Q45 | Soap-and-water handwashing called "sporicidal" — it physically removes spores, does not kill them |
| T4Q104 | Stops at metabolic acidosis, overlooks inadequate respiratory compensation (HCO₃ 18 → expected PaCO₂ ≈ 35±2, not 40) |
| T1Q132 | "Respectively" does not match the order of the three distractor signs |

**Professional-practice explanations**

- **T1Q143** — Minimum-necessary explanation omits the treatment-disclosure exception.
- **T1Q145; T2Q24** — Repeat the exceptionless research-consent and social-media/HIPAA claims from Section 2.

**Confirmed substantive explanation-correction count: 19 unique items.**

Additional dated/qualification-dependent teaching (not in the 19): T2Q7 and T4Q49 (assay-specific hs-troponin pathways, not a universal 3–4 h rise); T4Q123 (bicarbonate consideration at pH < 7.0, not < 6.9); T3Q124 (needs an explicit no-delay safeguard).

4. ITEM QUALITY

**Internally inconsistent ABG data** (Henderson–Hasselbalch check):

| Item | Supplied values | Independent check |
|---|---|---|
| T2Q62, option C | pH 7.15, PaCO₂ 55, HCO₃ 14 | implies pH ≈ 7.03; at pH 7.15/PaCO₂ 55, HCO₃ ≈ 18.5 |
| T5Q74 | pH 7.50, PaCO₂ 28, HCO₃ 24 | implies pH ≈ 7.56; at pH 7.50/PaCO₂ 28, HCO₃ ≈ 21.1 |
| T4Q104 | pH 7.30, PaCO₂ 40, HCO₃ 18 | implies pH ≈ 7.28; PaCO₂ exceeds expected compensation |

T2Q62 also gives away its own answer — the keyed option literally appends "acidosis from BOTH respiratory and metabolic causes."

**Missing clinical context:** T1Q7 and T1Q67 (inotrope selection on SBP alone); T2Q97 (fixed IABP → Impella → VA-ECMO ladder presented as standard; "ECMO directly to nothing" distractor makes D conspicuous); T4Q73 ("MRI-conditional" used as blanket exception); T4Q135 (exchange-transfusion rationale invents complications absent from the stem); T1Q39 (acute liver failure vs cirrhosis encephalopathy not differentiated).

**Repetition and giveaway alternatives:** T1Q27/T1Q146 (phosphate binders with meals); T3Q116/T5Q58 (spinal-shock resolution, inconsistently scored); T1Q113/T5Q145 (teach-back); T5Q108, T5Q137, T5Q143 (correct answer contrasted with obviously neglectful or unethical conduct).

**No visual stimuli anywhere in T1Q1–T5Q150** — no ECG strips, capnograms or arterial waveforms; items such as T1Q25 and T1Q74 describe findings in words.

5. BLUEPRINT COVERAGE

Benchmark: AACN Adult CCRN Test Plan for exams on/after 12 November 2025 (July 2026 CCRN Exam Handbook, Direct Care). Clinical Judgment 80%, Professional Caring and Ethical Practice 20%.

| Revised reporting category | Official | Bank total | Bank % | Per test |
|---|---|---|---|---|
| Cardiovascular | 13% | 100 | 13.33% | 20 |
| Respiratory | 12% | 90 | 12.00% | 18 |
| Endocrine; Heme/Immuno; GI; Renal/GU; Integumentary | 21% | 155 | 20.67% | 31 |
| Musculoskeletal; Neurological; Behavioral/Psychosocial | 18% | 135 | 18.00% | 27 |
| Multisystem | 16% | 120 | 16.00% | 24 |
| Professional Caring and Ethical Practice | 20% | 150 | 20.00% | 30 |

**This is not an unchanged older-test-plan bank** — the quota structure matches the revised plan. The problems are item mapping, depth, outdated statements and assessment design.

**Mapping errors:** 12 myasthenia gravis / Guillain-Barré items coded `neuro_group` (T1Q76, T1Q82, T2Q76, T2Q100, T3Q28, T3Q52, T3Q136, T4Q64, T4Q70, T5Q10, T5Q100, T5Q106) belong under Hematology/Immunology in the revised plan; T1Q107 (abdominal compartment syndrome) is coded Multisystem but the plan lists it under GI.

**Depth gaps:** no substantive assessment of PICS, PTSD or neurological storming (all named revised-plan topics); the caring allocation leans on elementary ethical definitions with plainly wrong alternatives.

**Current-practice review:** sepsis items need SSC 2026 nuance (qSOFA not the sole screen; 30 mL/kg remains conditional); ACLS items miss the 2025 AHA higher initial cardioversion energy for AF/flutter (≥ 200 J); ventilator items never test 4–8 mL/kg PBW or plateau < 30 cm H₂O, and T4Q62 should not make RSBI a mandatory SBT-readiness gate; sedation items need the 2025 PADIS focused update (dexmedetomidine conditionally preferred when light sedation/delirium reduction is the priority); temperature-management items (T1Q47, T2Q83, T3Q31, T3Q89) do not teach current selection, 32–37.5 °C range or ≥ 36 h duration; hemodynamics items need pressure/flow/congestion data rather than drug and device recognition.

6. STRUCTURAL CHECK

Section A's claims all confirmed at string/count level (750 items, 5 tests, 3,000 options, no invalid letters, no missing or very short explanations, no exact duplicate stems, no duplicate choices, no long same-letter runs, no images). **But they fail to detect the two dominant defects:**

**Four-letter cycling:**

| Test | Repeating template | Matching supplied keys |
|---|---|---|
| T1Q1–T1Q150 | B–A–D–C | 139/150 — 92.7% |
| T2Q1–T2Q150 | D–C–B–A | 144/150 — 96.0% |
| T3Q1–T3Q150 | B–A–D–C | 147/150 — 98.0% |
| T4Q1–T4Q150 | D–C–B–A | 148/150 — 98.7% |
| T5Q1–T5Q150 | B–A–D–C | **150/150 — 100%** |

The total letter distribution (A 190, B 188, C 183, D 189) therefore provides false reassurance: near-perfect marginal balance coexists with near-deterministic ordering.

**Answer-length cue:** the keyed answer is the sole longest option by character count in **679 items (90.5%)**; another 12 keyed answers tie for longest. An option-length heuristic recovers most answers without subject knowledge.

Qualification: this audits the exported ordering. Runtime shuffling could conceal the positional cycle, but would not remove the length cue or repair the clinical content.

7. TOP FIXES

1. **Quarantine the safety-sensitive teaching immediately:** T2Q124, T2Q106, T3Q34, T5Q64, T1Q3, T1Q150, T1Q148.
2. **Correct T3Q116 from C to B** and repair the five invalid/ambiguous items; regrade the definite miskey.
3. **Remove the four-letter key cycle** across the whole bank; add periodic-pattern detection to generation and release checks (long-run testing alone is inadequate).
4. **Rebuild distractors to eliminate the longest-answer shortcut** (start with T2Q97, T5Q108, T5Q143).
5. **Repair the ABG data** in T2Q62, T5Q74, T4Q104; validate Henderson-Hasselbalch consistency programmatically; remove the answer-revealing parenthesis in T2Q62.
6. **Modernize linked clinical families together:** DKA (T1Q3/T1Q150/T4Q123), thiamine (T2Q106/T3Q34/T3Q124), lactate (T2Q121/T5Q59/T5Q133), sedation (T2Q120/T1Q116).
7. **Repair diagnostic/treatment context:** T2Q16/T3Q40 (CSF testing), T2Q7/T4Q49/T4Q55 (ACS), T1Q7/T1Q67/T2Q97 (hemodynamics), T4Q73 (MRI), T4Q135 (transfusion indication).
8. **Correct professional-practice absolutes:** T1Q143, T1Q145, T2Q24.
9. **Remap against the revised plan at item level** (the 12 MG/GBS items, T1Q107) and fill gaps: PICS, PTSD, storming, visual interpretation, quantitative ventilator/hemodynamic decisions.
10. **Require a second independent critical-care clinical review** and a full-bank regression check before release.

8. SUMMARY ROW

| B15 — Adult CCRN Exam Prep | 4.5/10 | 1 definite miskey + 5 invalid/ambiguous | 19 substantive explanation corrections | PULL | Revised domain quotas, but safety-relevant clinical errors and a four-letter pattern matching 97.1% of supplied keys. |
