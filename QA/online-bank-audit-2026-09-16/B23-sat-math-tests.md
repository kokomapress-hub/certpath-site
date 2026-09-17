# B23 — Digital SAT Math: 10 Practice Tests — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/sat-math-tests.json` — 1540 questions / 35 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

3.0/10 — not release-ready as a full-length adaptive Digital SAT Math simulator.

Assessment area	Score
Answer-key correctness, including uniqueness	9.9/10
Explanation accuracy	9.9/10
Item quality and distractors	2.0/10
Exam-blueprint alignment	1.0/10
Structural hygiene	3.0/10

There are 11 multiple-answer questions and 16 substantively incorrect explanations, affecting 22 distinct items. The larger failure is simulator validity: every exported item is multiple choice, the forms follow fixed topic blocks, and the export contains no auditable module assignments, alternative second-module routes, difficulty calibration, or routing rules.

The 44-question count is correct for SAT Math. The problem is not length: the real section uses two 35-minute modules and changes the second module’s difficulty mix according to first-module performance. Merely presenting 44 questions does not reproduce that design. 
SAT Suite
 

sat-math-tests

Coverage: I processed all 1,540 items, all 6,160 options, and all 1,540 explanations, from T1Q1 through T35Q44. Every item was independently recomputed, all 9,240 within-item option pairs were checked for mathematical equivalence, and the explanation pass completed 4,798 arithmetic and consistency checks, with no unprocessed items. The solver classified the bank into 53 question families. Manual checks covered representative variants and flagged cases; this was not 1,540 separate blind human reviews.

Overlap comparisons used the complete B11 bank: 1,540 items, and B16 bank: 1,584 items. The live application’s timer, routing, calculator, rendering, and scaled-score calibration were not tested. Missing metadata in the export does not prove those features are absent from the website; it means the adaptive-simulator claim is not substantiated by the supplied material.

The overall score assesses simulator readiness rather than averaging arithmetic-accuracy percentages.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

Eleven items have multiple correct choices. No mathematically false keyed values or items with no correct option were found.

Item	What is wrong	Correct result / valid choices
T3Q17	For ∣3x∣=6, B and C give the same complete solution set. Printed key: C.	B and C; x=−2,2. 

sat-math-tests


T4Q2	3x+3y=21 duplicates x+y=7. Every listed pair satisfies both equations. Printed key: A.	A, B, C, and D; infinitely many solutions on x+y=7. 

sat-math-tests


T8Q20	For ∣x∣=12, A and C are equivalent solution sets. Printed key: A.	A and C; x=−12,12. 

sat-math-tests


T15Q6	3x+3y=33 duplicates x+y=11. All four choices satisfy both equations. Printed key: B.	A, B, C, and D; infinitely many solutions on x+y=11. 

sat-math-tests


T15Q27	For x
2
−16=0, A and B list the same two roots in opposite orders. Printed key: A.	A and B; x=−4,4. 

sat-math-tests


T25Q1	3x+3y=39 duplicates x+y=13. All four choices are solutions. Printed key: A.	A, B, C, and D; infinitely many solutions on x+y=13. 

sat-math-tests


T26Q3	3x+3y=42 duplicates x+y=14. All four choices are solutions. Printed key: D.	A, B, C, and D; infinitely many solutions on x+y=14. 

sat-math-tests


T26Q27	For ∣4x∣=8, A and C give the same solution set. Printed key: A.	A and C; x=−2,2. 

sat-math-tests


T30Q17	For ∣4x∣=12, B and C give the same solution set. Printed key: B.	B and C; x=−3,3. 

sat-math-tests


T31Q7	5x+5y=50 duplicates x+y=10. All four choices are solutions. Printed key: D.	A, B, C, and D; infinitely many solutions on x+y=10. 

sat-math-tests


T33Q26	For ∣x∣=8, B and D give the same solution set. Printed key: D.	B and D; x=−8,8. 

sat-math-tests

The five systems are underdetermined, not inconsistent or unsolvable. Their different coordinate pairs are all valid; they are not duplicate options.

Re-keying alone cannot repair these eleven questions. Their stems or option sets must change to establish one defensible answer.

Uniquely correct keyed items: 1,529/1,540 = 99.29%. The failures affect nine forms: T3, T4, T8, T15, T25, T26, T30, T31, and T33.

3. EXPLANATION ERRORS

Sixteen substantive errors: five invalid uniqueness deductions and eleven incorrect signed equalities.

Dependent-system explanations
Item	Invalid deduction	Correct conclusion
T4Q2	Moves from 0y=0 to y=6, x=1.	y is free; x=7−y.
T15Q6	Moves from 0y=0 to y=8, x=3.	y is free; x=11−y.
T25Q1	Moves from 0y=0 to y=6, x=7.	y is free; x=13−y.
T26Q3	Moves from 0y=0 to y=6, x=8.	y is free; x=14−y.
T31Q7	Moves from 0y=0 to y=3, x=7.	y is free; x=10−y.

These explanations present an arbitrary solution as uniquely derived. Each explicitly contains the zero-coefficient step, so the defect is logical, not merely abbreviated working. 

sat-math-tests +3

Salary-change explanations
Item	False printed equality	Correct equality; existing key remains correct
T2Q37	(−12)/60=0.2	(−12)/60=−0.2: 20% decrease; A. 

sat-math-tests


T5Q37	(−20)/80=0.25	(−20)/80=−0.25: 25% decrease; A. 

sat-math-tests


T11Q35	(−24)/80=0.3	(−24)/80=−0.3: 30% decrease; A. 

sat-math-tests


T12Q33	(−20)/100=0.2	(−20)/100=−0.2: 20% decrease; C. 

sat-math-tests


T13Q32	(−6)/40=0.15	(−6)/40=−0.15: 15% decrease; A. 

sat-math-tests


T13Q34	(−12)/40=0.3	(−12)/40=−0.3: 30% decrease; C. 

sat-math-tests


T14Q37	(−12)/80=0.15	(−12)/80=−0.15: 15% decrease; A. 

sat-math-tests


T16Q31	(−9)/60=0.15	(−9)/60=−0.15: 15% decrease; A. 

sat-math-tests


T17Q33	(−10)/100=0.1	(−10)/100=−0.1: 10% decrease; D. 

sat-math-tests


T25Q37	(−5)/20=0.25	(−5)/20=−0.25: 25% decrease; C. 

sat-math-tests


T27Q34	(−4)/40=0.1	(−4)/40=−0.1: 10% decrease; D. 

sat-math-tests

A separate presentation defect affects all 19 salary-change items: calculations silently switch from dollars to thousands of dollars. For example, T1Q37 describes a $20,000 increase but states “Change = 20.” Label the units. This is not counted as 19 additional substantive mathematical errors. 

sat-math-tests

4. ITEM QUALITY
Fixed blocks and excessive repetition

The same assembly pattern holds throughout T1Q1–T35Q44:

Positions in every form	Observed content block	Bank-wide items
Q1–Q15	Linear equations/functions, slopes, systems, inequalities, and rates	525
Q16–Q30	Quadratics, composition, absolute values, radicals, exponent rules, and related algebra	525
Q31–Q37	Elementary data summaries, probability, percentages, and proportions	245
Q38–Q44	Geometry, overwhelmingly four routine templates	245

These are observed assembly blocks, not certified SAT domain assignments.

T1Q38–T1Q42 consists of five consecutive rectangular-box volume questions. T6Q24–T6Q28 consists of five consecutive function-composition questions. Both sequences repeatedly test the same procedure rather than providing balanced assessment coverage. 

sat-math-tests +1

There are 205 composition questions, accounting for 13.31% of the entire bank. Composition, vertex identification, quadratic minimum identification, and quadratic y-intercept identification together occupy 413/525 — 78.67% — of the Q16–Q30 block.

All 35 mean questions use five consecutive integers. Examples include T1Q34, T2Q31, and T5Q36. The repeated structure makes the answer the middle integer and limits the variety suggested by the question count. 

sat-math-tests +2

Internal duplication and answer cues

The conservative same-input/task comparison found 22 repeat groups containing 53 items, representing 31 repetitions beyond the first occurrence. There are no exact whitespace-normalized duplicate stems.

For example, T1Q34 and T5Q36 ask for the mean of the identical values 4–8, reordered. T1Q38, T12Q41, and T25Q42 ask for the volume of the same box with dimensions 6, 8, and 10, reordered.

A separate nearby-answer cue occurs at T7Q3 → T7Q5: the first evaluates f(7) for f(x)=2x+3; the second immediately asks which input gives f(x)=17 for that same function. These are different tasks and therefore are not counted as same-task duplicates, but the first supplies information that helps answer the second. 

sat-math-tests +1

Overlap with B11 and B16

The counts below are unique B23 items with a match, not the number of matching pairs.

“Same inputs/task” preserves the mathematical task and supplied inputs while normalizing irrelevant ordering and equivalent notation. It does not count two questions merely because they have the same answer.

Comparator	Identical normalized stems	Same-input/task matches in B23
B11 — Digital SAT Math	0	53/1,540 — 3.44%
B16 — Digital SAT Math Workbook	0	64/1,540 — 4.16%
Either bank, counting each B23 item once	0	92/1,540 — 5.97%

Twenty-five B23 items match both earlier banks.

B23 item	Earlier-bank item(s)	Repeated mathematical task
T1Q34	B11 T32Q28; B16 T32Q36/T34Q37	Mean of the same five values, 4–8, shuffled.
T1Q38	B11 T20Q11	Volume of the same 6×8×10 box, with reordered dimensions.
T2Q24	B16 T1Q30	X-intercepts of (x−3)(x+6), with reversed factor order.
T15Q27	B11 T16Q15	Complete real solution set of x
2
=16. B23 introduces duplicate correct options into the repeated task.

The earlier sources confirm those inputs and tasks. 

sat-math

 

sat-math-workbook +1

All 53 B23 solver families also occur in both B11 and B16. That is shared template coverage, not a claim that every B23 item is duplicated.

Distractor and wording defects

Three items duplicate incorrect singleton answers: T8Q20 B/D, T33Q26 A/C, and T35Q22 C/D. In T35Q22, both duplicated distractors give only x=4, whereas the complete solution set is {0,4}. T35Q22 still has one correct option, A, so it is not added to the eleven multiple-answer items. 

sat-math-tests +1

26/47 marble-probability questions — 55.32% — contain an option greater than 1. Examples include T1Q32 C = 12/3, T1Q36 A = 8/6, and T3Q36 B = 9/5. Such choices can represent denominator errors, but this repeatedly used, immediately eliminable pattern reduces distractor variety. These are quality findings, not additional wrong keys. 

sat-math-tests +2

The fixed-fee template has a 2/2 longest-correct-answer cue: T20Q13 D and T31Q4 D. The correct sentence is substantially longer than every alternative. This local cue is distinct from the bank-wide length results below. 

sat-math-tests +1

T5Q33, T9Q37, and T23Q37 need approximation qualifiers. Their stated sample percentages imply 87.5, 62.5, and 62.5 students, respectively. Rounded percentages make the intended estimates defensible, so these are wording defects rather than additional unanswerable questions. 

sat-math-tests +2

The export also retains awkward generated notation: T1Q3 includes y = -2x + -4, and T1Q25 uses (x - -3) in its explanation. These are mathematically interpretable but need typesetting cleanup; the live renderer was not inspected. 

sat-math-tests +1

5. BLUEPRINT COVERAGE

Reference: College Board’s The Digital SAT Suite of Assessments Specifications Overview, Summer 2022, cross-checked against the current official SAT structure, Math, response-format, and scoring pages on September 16, 2026. 
SAT Suite
+1

Official domain	Approximate operational-question share	Official approximate question range
Algebra	35%	13–15
Advanced Math	35%	13–15
Problem-Solving and Data Analysis	15%	5–7
Geometry and Trigonometry	15%	5–7

The specification distinguishes 40 operational questions and four pretest questions across the two modules. These allocations should not be treated as an arbitrary percentage split of 44 equally scored questions. 
SAT Suite

Adaptive-simulator requirements are not established

Response format is demonstrably wrong in the export. College Board specifies approximately 75% four-option multiple choice and 25% student-produced responses. B23 supplies 1,540 multiple-choice items and zero student-produced-response items, across T1Q1–T35Q44. Renaming a multiple-choice drill “adaptive” does not address independent answer entry, accepted numeric representations, or scoring of entered responses. 
SAT Suite
 

sat-math-tests

A simple split at Q22 would produce unbalanced modules. For every exported form:

Hypothetical split of the existing order	Result
Q1–Q22	All 15 first-block questions plus seven second-block questions; no geometry and none of the Q31–Q37 data block
Q23–Q44	Eight second-block questions, all seven data-block questions, and all seven geometry questions

This is a diagnostic of the supplied order, not a claim that the live application actually uses that split. It conflicts with the official design in which all four categories appear in each module. Some first-block unit-price questions could map to Problem-Solving and Data Analysis; that does not resolve the complete absence of first-half geometry. 
SAT Suite

Difficulty routing is unverified. No first-module assignment, higher-/lower-difficulty second-module pool, routing rule, or calibration evidence is supplied for T1–T35. The real second module retains a mix of difficulty levels tailored to first-module performance; it is not simply “the remaining 22 questions.” 
SAT Suite

The exported finish does not demonstrate a credible harder route. Examples include T1Q38–T1Q42, five straightforward box-volume calculations, and T35Q44, a direct triangle-angle sum. These do not establish the within-module difficulty progression described by College Board. I have not assigned calibrated difficulty values from stem appearance alone. 

sat-math-tests +1

 
SAT Suite

Scaled-score validity is also unverified. College Board’s scoring considers item characteristics and response patterns; equal numbers correct can yield different section scores. No evidence supplied with T1Q1–T35Q44 validates a conversion from these forms to the SAT Math scale. This does not establish that the website uses an incorrect conversion—it means no conversion was auditable here. 
SAT Suite

Content breadth is insufficient

Geometry and Trigonometry: Of the 245 Q38–Q44 items, 104 are triangle-angle sums, 82 are box volumes, 38 identify circle radii, and 20 identify circle centers. The remaining item is T12Q40, an arc-length calculation. Thus, 244/245 terminal geometry items use four routine templates. No right-triangle trigonometry, Pythagorean side-length, similarity, or area tasks were found. These omissions matter because the official domain includes area/volume, triangle relationships, right triangles/trigonometry, and circles. 

sat-math-tests

 
SAT Suite

Problem-Solving and Data Analysis: The Q31–Q37 block is restricted to elementary summaries, single-draw marble probabilities, percentages, unit prices, and simple sample-to-population estimates. Across T1Q1–T35Q44, there are no actual table or graph stimuli, scatterplot-model tasks, conditional-probability tasks, margin-of-error tasks, or observational-study/experiment evaluation. Those are explicit parts of the official domain. T1Q31–T1Q37 illustrates the limited range used instead. 

sat-math-tests

 
SAT Suite

Advanced Math: Coverage is dominated by composition and recognition of already-revealed quadratic features. Only T1Q29, T13Q30, and T15Q27 directly ask students to solve an expanded quadratic equation; T15Q27 is ambiguous. There are only three expansion questions, three factorization questions, and five exponent-quotient questions, with no rational-expression simplification or nonlinear-system tasks. The official domain is broader than repeated substitution and feature identification. 

sat-math-tests +1

 
SAT Suite

Algebra: The first block contains legitimate algebra, but it repeatedly uses short procedural tasks and does not provide evidence of balanced domain coverage within each module. T7Q3/T7Q5 also demonstrates reuse of the same linear relationship rather than independent assessment. 

sat-math-tests

 
SAT Suite

I found no clearly out-of-scope mathematical family that needs blanket removal. In particular, circle equations, absolute values, and polynomial-factor questions should not be rejected merely because they were unsuitable allocations in a different exam bank. Here, the principal problems are concentration, missing skills, absent response formats, and unsupported adaptive assembly.

6. STRUCTURAL CHECK
Section A: independently checked results
Check	Recomputed result
Questions and forms	1,540; 35 forms of exactly 44
IDs and numbering	Unique; Q1–Q44 present in every form
Choices	Four per item
Missing choices / invalid key labels	0 / 0
Exact whitespace-normalized duplicate stems	0
Missing explanations	0
Explanations under 40 characters	717 — 46.56%
Explanation length	Median 42 characters; minimum 14; maximum 96
Mathematically equivalent option pairs	9 pairs across 7 items
Images / broken referenced image paths	0 / 0
Domain tags	None supplied
True within-form runs of at least four identical keys	19, not the 15 entries printed

The basic counts, key distribution, missing fields, and short-explanation total reproduce Section A. Its zero duplicate-choice result does not establish mathematical uniqueness: the root-set duplicates in T3Q17/T15Q27, among others, evade literal-string checks. 

sat-math-tests +1

No required figure was found to be missing. The problem is absence of visual assessment tasks, not demonstrated broken image files.

The explanation lengths are not automatically mathematical errors, but the predominantly one-line workings provide limited diagnostic teaching. T1Q22, for example, supplies only the substitution result for the y-intercept. 

sat-math-tests

Key distribution and same-answer runs

A = 392 (25.5%); B = 388 (25.2%); C = 381 (24.7%); D = 379 (24.6%). The aggregate distribution is not a release blocker. 

sat-math-tests

Section A’s run list is truncated and crosses form boundaries:

Printed entry	Actual interpretation
“T7Q2 key D ×4”	T6Q43–T6Q44 plus T7Q1–T7Q2. T7 has no four-answer run.
“T10Q3 key D ×6”	T9Q42–T9Q44 plus T10Q1–T10Q3. This is not a six-answer run inside T10.

The first boundary-spanning sequence is directly visible in the source. 

sat-math-tests

The printed list also omits six later within-form runs: T23Q22–Q26 A×5; T23Q37–Q40 D×4; T27Q37–Q40 A×4; T29Q28–Q32 D×5; T30Q17–Q21 B×5; and T35Q38–Q41 B×4.

The longest true within-form run is six, at T1Q26–T1Q31 and T12Q37–T12Q42, both D. A natural same-letter run is not by itself proof of a defective shuffle; the reporting error is that the diagnostic mixes boundaries and omits findings.

Longest-option cue rate

Lengths were measured as source-text characters after whitespace normalization, excluding labels, not rendered width. Results use the printed keys.

Measurement	Result
Key is strictly longer than every distractor	74/1,540 = 4.81%
Key is tied for or uniquely longest	816/1,540 = 52.99%
Items with one uniquely longest option	664
Key is that uniquely longest option	74/664 = 11.14%
Uniquely longest option is a distractor	590/664 = 88.86%
All four options have equal length	243

The 52.99% tie-inclusive rate does not establish a useful “choose the longest” strategy. Given the observed tie sizes, the uniform-key baseline is 51.30%. Randomly selecting among the longest options would score 22.31% against the printed keys.

The stronger aggregate tendency is the reverse: a uniquely longest option is usually wrong. The fixed-fee items T20Q13/T31Q4 remain local exceptions, with a 2/2 longest-correct cue.

Per-test answer-key cycles

No exact repeating cycle was found in any form under either check: whole-form periods 1–22, or nonconstant local periods 2–6 spanning at least 12 items and three repetitions.

T18 does, however, have an unusual partial four-position pattern. Repeating ADCB matches 24/44 keys — 54.55%. In 200,000 randomized permutations preserving T18’s letter totals and searching all 24 four-letter permutations each time, a fit at least this high occurred 117 times. The estimated probability is approximately 0.00059, or 0.021 after a conservative 35-form adjustment for this test family.

That is a shuffle-review flag, not proof of a deterministic cycle or deliberate manipulation.

In the table, both length columns are counts out of 44. “Best fit” is the strongest repeated A/B/C/D permutation after searching all 24 possibilities; it is not automatically a detected cycle.

Test	Strictly longest key	Including ties	Maximum same-key run	Best four-letter fit
T1	3	23	6	ACDB — 20/44
T2	1	23	4	ABCD — 18/44
T3	2	22	2	BADC — 17/44
T4	0	21	3	ABCD — 16/44
T5	1	12	4	ACDB — 18/44
T6	4	25	4	BCAD — 17/44
T7	2	33	2	ABCD — 17/44
T8	2	23	3	CDAB — 15/44
T9	0	26	5	BACD — 18/44
T10	2	30	4	DBCA — 15/44
T11	1	23	3	CABD — 15/44
T12	3	16	6	CDBA — 19/44
T13	3	24	2	BCDA — 18/44
T14	4	25	3	CADB — 19/44
T15	3	23	3	ABCD — 16/44
T16	0	23	4	ACDB — 16/44
T17	4	25	5	DABC — 17/44
T18	1	24	4	ADCB — 24/44; review flag
T19	5	21	4	BCDA — 18/44
T20	3	20	5	DCAB — 18/44
T21	0	24	3	ACDB — 18/44
T22	1	22	2	DACB — 15/44
T23	3	23	5	CDAB — 15/44
T24	5	26	2	BDCA — 16/44
T25	1	27	3	CDAB — 17/44
T26	3	33	3	BDAC — 15/44
T27	2	24	4	BACD — 17/44
T28	1	16	3	DBAC — 18/44
T29	3	22	5	DBAC — 19/44
T30	1	24	5	BCAD — 16/44
T31	5	21	3	ACBD — 17/44
T32	3	23	3	BACD — 18/44
T33	0	24	3	DCBA — 15/44
T34	0	23	3	CBAD — 17/44
T35	2	22	4	DBCA — 14/44

The 
B23 audit evidence ledger contains every item’s computed result, option-equivalence checks, explanation assertions, complete overlap pairings, internal repeats, key sequences, and the T18 randomization-test details.

7. TOP FIXES

Withdraw the adaptive-simulator designation until the forms and delivery logic are validated. The problem spans T1Q1–T35Q44; correcting isolated answers will not establish adaptive validity.

Quarantine the eleven ambiguous questions in Section 2. Repair the root-set comparisons and dependent-system generator, including regression cases T3Q17, T4Q2, T15Q27, and T31Q7. Re-score affected retained attempts where possible.

Correct all sixteen substantive explanations. Remove arbitrary uniqueness claims in the five dependent systems and repair the eleven salary sign errors, including T2Q37, T13Q34, and T27Q34.

Reassemble two balanced 22-question modules rather than splitting existing forms at Q22. The T1Q1–Q22/T1Q23–Q44 example demonstrates why the current topic-block order cannot serve as the module specification.

Document and test first-module routing and both second-module difficulty pools. Validate routing and score interpretation for T1–T35; do not substitute arbitrary raw-score thresholds or claim SAT-scale precision without evidence.

Add genuine student-produced-response items and scoring. Replace part of the all-MCQ allocation across T1Q1–T35Q44, with explicit acceptance rules for equivalent valid numeric entries.

Restore geometry breadth and visual interpretation. Replace repeated slots such as T1Q38–T1Q42 with right-triangle/trigonometric, area, similarity, and more varied circle/solid tasks.

Rebalance algebraic and data-analysis tasks. Reduce clusters such as T6Q24–T6Q28; add nonlinear systems, rational-expression work, meaningful graph/table interpretation, conditional probability, and statistical-claim evaluation.

Deduplicate and strengthen distractors before assembling forms. Address the 92 cross-bank matches, 22 internal repeat groups, nearby cue T7Q3/T7Q5, and duplicate distractors in T8Q20/T33Q26/T35Q22.

Repair the release diagnostics and review T18’s partial regularity. Reset run detection at each form boundary, report all findings rather than a truncated list, and investigate T18Q1–T18Q44 without forcing artificial alternation or suppressing legitimate random runs.

8. SUMMARY ROW

| B23 — Digital SAT Math: 10 Practice Tests | 3.0/10 | 11 ambiguous; 0 wrong-valued | 16 | PULL | Correct 44-item length, but zero SPR and unsubstantiated adaptive design; 92 overlaps with B11/B16; T18 partial key-pattern flag. |