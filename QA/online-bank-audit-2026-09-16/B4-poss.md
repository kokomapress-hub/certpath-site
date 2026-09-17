# B4 — POSS Exam Study Guide — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/poss.json` — 180 questions / 3 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

B4 — POSS Exam Study Guide Audit
1. VERDICT

Score: 3.5/10 — PULL

Coverage audited: 180/180 questions, all 180 keys and explanations, all three tests, plus the complete Section A structural report. No sampling.

Audit dimension	Score
Answer-key correctness	6.5/10
Explanation accuracy	5.5/10
Item quality / distractors	2.0/10
Exam-blueprint alignment	1.5/10
Structural hygiene	2.0/10

The decisive defects are not cosmetic. The file declares itself the complete 180-item bank, yet Section B begins immediately with T1Q1; T1Q1–T1Q15, T2Q1–T2Q15, and T3Q1–T3Q15 repeatedly refer to information “in the passage,” but none of those nine source passages is present. T1Q1–T1Q2 illustrate the problem directly.

There is a second construct-level failure: Section A reports zero questions with images, yet the real POSS includes visual/pictorial Mechanical Concepts and Figural Reasoning. The bank instead verbalizes every supposed figure. Its structural report also shows a severe answer-position imbalance: A 8.9%, B 42.8%, C 41.1%, D 7.2%.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

9 items.

T1Q29 — two choices are defensible. Tapered roller bearings are particularly suited to combined radial/axial loading, but deep-groove ball bearings also accommodate radial plus axial loads. The stem does not distinguish load magnitude/direction sufficiently. Correct key: no unique key (A or D defensible).

T1Q44 — insufficient electrical information. A “480 V motor drawing 15 A” does not uniquely imply 7,200 W; phase configuration and power factor are required for AC motor real power. D follows (P=VI) only under an unstated unity-PF/single-phase assumption. Correct key: none as written.

T2Q34 — key C is technically wrong. A pump already stated to move 350 GPM does not become a 280-GPM pump because its efficiency is 80%. Pump efficiency is hydraulic output power divided by input power, not “useful flow ÷ stated flow.” Correct key: none offered; stated flow remains 350 GPM. Pump-efficiency definitions from DOE and KSB confirm the power-ratio definition.

T2Q54 — sequence is underdetermined. Circle→square, square→triangle, triangle→pentagon provides no coherent rule establishing that the next outer shape must be a hexagon. Correct key: no unique key.

T2Q57 — cut location is unspecified. A diagonal fold plus “a corner is cut off” can give different unfolded results depending on which folded corner is cut and whether the cut intersects the fold. Correct key: cannot determine without the figure/cut location.

T2Q60 — B/C ambiguity. With three circles having pairwise overlap but no triple-overlap region, there are six nonempty regions inside the circles; seven results only if the exterior region is also counted. The question never specifies that convention. Correct key: B if counting regions inside the circles; otherwise ambiguous.

T3Q50 — stem contradicts itself. A vertical line with a branch extending right, rotated 90° counterclockwise, produces the geometry represented by D, upside-down T. The parenthetical description (“capital T rotated 90° clockwise”) describes the opposite sideways T and would lead to A. Correct key: D from the literal geometry; item is internally contradictory.

T3Q54 — insufficient geometry. “The left half shows a right angle with the corner at the symmetry line” does not define the orientation/endpoints needed to determine a diamond. Multiple reflected figures are possible. Correct key: no unique key.

T3Q58 — region count is not determined by the stem. Three identical squares can satisfy pairwise-overlap/no-triple-overlap conditions with different boundary arrangements and therefore different region counts. Correct key: no unique key.

3. EXPLANATION ERRORS

7 definite explanation errors. The 45 passage-dependent explanations are discussed separately because, with the passages missing, they are unverifiable rather than demonstrably false.

T2Q34 — explanation incorrectly multiplies flow by pump efficiency. Efficiency is a power ratio, not a percentage reduction of stated volumetric flow.

T2Q54 — explanation claims the inner shapes have “sides 3, 4, 3,” despite the first inner shape being a circle, then invents an unsupported outer progression 4→3→5→6.

T2Q60 — explanation is self-contradictory: it reaches seven by adding “1 region outside all circles,” then immediately says seven is obtained “not counting the exterior.”

T3Q50 — explanation rotates the explicitly described right-facing branch incorrectly; it follows the contradictory parenthetical instead of the actual geometry.

T3Q54 — explanation asserts that reflecting an unspecified right angle necessarily makes a rhombus; that does not follow from the stated information.

T3Q58 — explanation invents “3 areas where the third square creates additional regions” without geometry that establishes those regions.

T3Q41 — final rounded answer 22.4 kW is correct, but the printed intermediate calculation is not: (1.732×480×30×0.90=22,446.72), not 22,453.

4. ITEM QUALITY

T1Q1–T1Q15, T2Q1–T2Q15, T3Q1–T3Q15 — fatal missing dependency. These 45 Reading Comprehension items have no passages in the complete bank. They therefore become plant/safety trivia rather than reading-comprehension questions. The keys cannot be verified against the source text and customers cannot practice the tested skill.

Several missing-passage items also make overly broad real-world claims. T2Q7 says employees who “handle hazardous materials” must receive annual refresher training. OSHA Hazard Communication instead requires training at initial assignment and when a new hazard is introduced; annual refresher requirements apply to particular HAZWOPER populations, not universally to anyone handling hazardous material. T2Q8 invents a universal 50-foot spill-kit distance and T2Q10 a universal 24-hour environmental-officer reporting deadline; without their supposed passage/company procedure, these are unsupported policy statements.

T1Q15 similarly presents “below 1.0 µS/cm” as a universal target for properly treated boiler water. Boiler-water conductivity limits depend heavily on boiler design, pressure and treatment regime and can be orders of magnitude higher; the missing passage makes the intended special context impossible to recover. Current technical guidance illustrates the large variation in acceptable boiler-water conductivity.

T1Q16–T1Q30, T2Q16–T2Q30, T3Q16–T3Q30 — Mechanical Concepts format mismatch. All 45 are four-option text questions. Current POSS preparation references describe Mechanical Concepts as pictorial, normally with three choices, emphasizing rapid intuitive mechanics rather than calculation-heavy plant engineering. Calculation-heavy mismatches include T1Q16, T1Q18, T1Q20, T1Q22, T1Q26, T1Q28; T2Q16, T2Q18, T2Q21, T2Q25, T2Q30; T3Q16, T3Q18, T3Q22, T3Q27, T3Q30.

The mechanical section also drifts into learned plant-technology knowledge rather than general mechanical aptitude: T1Q19, T1Q23–T1Q25, T1Q29; T2Q23–T2Q24, T2Q27, T2Q29; T3Q17, T3Q20–T3Q21, T3Q23–T3Q26, T3Q28–T3Q29 cover valve selection, pump staging/Cv, steam traps, seals, cavitation, expansion joints and similar job knowledge.

T1Q49–T1Q60, T2Q49–T2Q60, T3Q49–T3Q60 — all 36 Figural Reasoning items are figureless. They describe imagined figures in prose instead of testing rapid visual recognition. T1Q53/T2Q50/T2Q58/T3Q50 are verbal rotation exercises; T1Q56/T2Q53/T3Q54 are verbal reflections. Several are not meaningfully spatial at all: T1Q55, T2Q49, T2Q59, T3Q53, T3Q57, T3Q60 are number/letter/count sequences, while T3Q59 is a clock-angle arithmetic item. This does not reproduce the visual construct of the actual section.

Distractor quality is also weakened by the missing modalities. T1Q1, T1Q6, T2Q6, T3Q11–T3Q14 can largely be answered from generic plant/safety knowledge without reading anything, while many figural answers become trivial once the transformation is spelled out verbally.

5. BLUEPRINT COVERAGE

Blueprint reference: Edison Electric Institute Plant Operator Selection System (POSS) employment-test battery, current public structure checked September 16, 2026. EEI's public battery description identifies POSS as its validated battery for fossil, nuclear and hydroelectric plant-operator jobs, but the public document does not state a formal version number or effective date.

A current utility using EEI testing lists exactly four POSS components:

Figural Reasoning

Mechanical Concepts

Reading Comprehension

Mathematical Usage

Accordingly, the requested “Spatial Ability” corresponds to EEI's Figural Reasoning component; it is not currently published as a separate fifth POSS section.

Current 2026 POSS references consistently report the long battery as Reading 36/30 min, Mechanical 44/20 min, Mathematical Usage 46/17 min, Figural 20/10 min, with a shorter Mathematical Usage variant of 18 questions/7 minutes also in use.

The bank's 180 questions divide cleanly by position as:

Domain	Bank	Bank %	Long-form POSS %	Assessment
Reading Comprehension	45	25.0%	24.7%	Weight close; delivery unusable because passages are absent
Mechanical Concepts	45	25.0%	30.1%	Underweighted ~5 points and format/content badly mismatched
Mathematical Usage	54	30.0%	31.5%	Weight close to long form; generally strongest section
Figural Reasoning	36	20.0%	13.7%	Overweighted ~6 points and entirely nonvisual

Against the shorter 118-question configuration, the mismatch is larger because Mathematical Usage falls to 18 questions while Mechanical becomes a much larger share. A general POSS product therefore needs to state which math/battery configuration it is modelling rather than implying one universal distribution.

The numerical weighting is not the principal failure. The much larger blueprint problem is construct fidelity: missing passages, zero visual Figural items, zero pictorial Mechanical items, four choices everywhere, and substantial plant-knowledge/calculation content in Mechanical Concepts.

6. STRUCTURAL CHECK

Section A correctly reports 180 questions / 3 tests, 60 each; every item has four choices and a syntactically valid key; there are no exact duplicate stems, no exact duplicate choice sets and no missing explanation fields.

The two “very short” explanations, T2Q37 and T2Q48, are simple one-step arithmetic explanations and are not intrinsically defective merely because they are short.

The answer-key distribution is commercially unacceptable:

A: 16/180 = 8.9%

B: 77/180 = 42.8%

C: 74/180 = 41.1%

D: 13/180 = 7.2%

Thus 83.9% of every answer is B or C. Per test, the skew remains obvious: T1 = A2/B26/C25/D7; T2 = A9/B23/C24/D4; T3 = A5/B28/C25/D2. A practiced customer can exploit position frequency instead of content.

Section A's same-answer-run entries are accurate if their listed ID denotes the end of the run. The actual ranges are T1Q14–T1Q17 B×4; T1Q21–T1Q27 B×7; T1Q48–T1Q52 C×5; T1Q55–T1Q58 B×4; T2Q7–T2Q10 C×4; T2Q26–T2Q30 B×5; T2Q31–T2Q34 C×4; T2Q41–T2Q44 C×4. A seven-item B run in T1 is particularly conspicuous.

The report's questionsWithImages = 0 / missingImageFiles = 0 should not be treated as a clean image check. It means no images were referenced at all, which is precisely the problem for POSS Mechanical and Figural sections. The empty tag inventory also prevents automated domain-level monitoring.

Exact-stem duplication is zero, but there is substantial template repetition: T1Q53/T2Q50/T2Q58/T3Q50 all test rotation; T1Q56/T2Q53/T3Q54 test reflection; and T1Q51/T1Q57/T1Q60/T2Q52/T2Q56/T2Q59/T3Q52 are closely related verbal-grid exercises.

7. TOP FIXES

T1Q1–T1Q15, T2Q1–T2Q15, T3Q1–T3Q15 — restore the nine missing reading passages immediately. No Reading Comprehension item should remain live without its source passage.

T1Q16–T1Q30, T2Q16–T2Q30, T3Q16–T3Q30 — rebuild Mechanical Concepts to pictorial, basic-mechanics aptitude items and remove the heavy plant-knowledge/calculation dependence.

T1Q49–T1Q60, T2Q49–T2Q60, T3Q49–T3Q60 — replace the prose-only “figural” bank with actual visual Picture Series/Comparison/Progression-style material.

T2Q34 — remove immediately: pump efficiency is being applied incorrectly to flow.

T2Q54, T2Q57, T2Q60, T3Q50, T3Q54, T3Q58 — rebuild the underdetermined/contradictory spatial items with actual figures and uniquely keyed geometry.

All 180 items — rebalance answer positions. Move from A/B/C/D = 16/77/74/13 toward approximately 25% each and eliminate runs longer than three.

All three tests — explicitly choose and document the targeted POSS configuration (long Mathematical Usage versus short version), then set section counts/pacing proportionally.

T1Q15, T2Q7, T2Q8, T2Q10 — fact-check or contextualize passage content so company-specific operating rules are not presented as universal engineering/regulatory requirements.

T1Q29, T1Q44, T3Q41 — repair technical precision: eliminate the bearing ambiguity, specify electrical phase/PF/formula, and correct the three-phase-power arithmetic.

T1Q1–T3Q60 — add domain/subtype/dependency metadata and automated gates: Reading items must require a passage; Mechanical/Figural items must require a figure; answer distributions and same-key runs should fail QA before publication.

8. SUMMARY ROW

| POSS Exam Study Guide (B4) | 3.5/10 | 9 | 7 (+45 passage-dependent explanations unverifiable) | PULL | All reading passages are missing, both visual constructs are delivered without images, and severe B/C key skew compounds multiple ambiguous or technically wrong items. |

Correct the audit’s arithmetic inconsistency
Clarify the 45 unverifiable explanations