# B21 — ACT Math: 10 Practice Tests — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/act-math-tests.json` — 1584 questions / 36 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

3.5/10 — not release-ready as an Enhanced ACT Math simulator.

Assessment area	Score
Answer-key correctness, including uniqueness	9.9/10
Explanation accuracy	9.9/10
Item quality and distractors	2.0/10
Enhanced ACT blueprint alignment	1.0/10
Structural hygiene	4.0/10

The principal failure is simulator validity, not widespread arithmetic errors. There are 10 multiple-answer questions and 9 substantively incorrect explanations, affecting 13 distinct items because six appear in both categories. Separately, all 36 forms contain 44 questions, whereas Enhanced ACT Math has 45 questions in 50 minutes, including 41 scored questions. The forms also repeat a fixed topic-block structure without a credible harder finish. 
act.org

Coverage: I programmatically read and processed every item from T1Q1 through T36Q44: 1,584 stems, 6,336 choices, and 1,584 explanations. Every item was independently recomputed; all 9,504 within-item option pairs were checked for mathematical equivalence. Explanation validation included 4,170 calculation and consistency checks, supplemented by review of all 49 solver families and all flagged cases. This was full programmatic coverage, not sampling or 1,584 separate blind human reviews. Overlap comparisons used the complete B13 and B18 files. The live website’s timer, navigation, rendering, and scoring implementation were not tested.

The overall score emphasizes full-length simulator readiness, rather than averaging the mathematical-accuracy percentages.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

10 items have multiple correct choices. No wrong-valued keyed answers or items with no correct option were found. The six dependent systems below are underdetermined; the other four failures arise from equivalent answer sets.

Item	What is wrong	Correct key / mathematical result
T5Q16	B and D express the same complete solution set for ∣x∣=8.	B and D; {−8,8}. No unique key. 

act-math-tests


T6Q15	4x+4y=28 is the same equation as x+y=7. All four listed pairs satisfy both equations.	A, B, C, and D; infinitely many solutions on x+y=7. 

act-math-tests


T7Q6	2x+2y=10 duplicates x+y=5. All four choices are solutions.	A, B, C, and D; infinitely many solutions on x+y=5. 

act-math-tests


T13Q5	3x+3y=12 duplicates x+y=4. All four choices are solutions.	A, B, C, and D; infinitely many solutions on x+y=4. 

act-math-tests


T16Q6	2x+2y=18 duplicates x+y=9. All four choices are solutions.	A, B, C, and D; infinitely many solutions on x+y=9. 

act-math-tests


T16Q30	A and D list the same two x-intercepts in opposite order.	A and D; x=−2,2. 

act-math-tests


T19Q21	A and C express the same solution set for ∣4x∣=8.	A and C; {−2,2}. 

act-math-tests


T22Q23	C and D express the same solution set for ∣2x∣=10.	C and D; {−5,5}. 

act-math-tests


T31Q10	5x+5y=60 duplicates x+y=12. All four choices are solutions.	A, B, C, and D; infinitely many solutions on x+y=12. 

act-math-tests


T34Q10	2x+2y=14 duplicates x+y=7. All four choices are solutions.	A, B, C, and D; infinitely many solutions on x+y=7. 

act-math-tests

Re-keying alone cannot repair these questions. Their stems or option sets must change to establish exactly one defensible answer.

The result is 1,574/1,584 uniquely and correctly keyed items: 99.37%. The ten ambiguous items occur in nine forms: T5, T6, T7, T13, T16, T19, T22, T31, and T34.

3. EXPLANATION ERRORS

Nine substantive errors: six invalid deductions and three false numerical equalities.

Item	Explanation error	Correct conclusion
T6Q15	Moves from 0y=0 to y=6 as though that value were determined.	y is free; x=7−y.
T7Q6	Moves from 0y=0 to y=2.	y is free; x=5−y.
T13Q5	Moves from 0y=0 to y=3.	y is free; x=4−y.
T16Q6	Moves from 0y=0 to y=2.	y is free; x=9−y.
T31Q10	Moves from 0y=0 to y=4.	y is free; x=12−y.
T34Q10	Moves from 0y=0 to y=6.	y is free; x=7−y.

These are not merely abbreviated explanations: they present an arbitrary member of an infinite solution set as the uniquely derived answer. The printed derivations explicitly contain the zero-coefficient step. 

act-math-tests +5

Item	False printed calculation	Correct calculation; existing key
T2Q33	(−24)/60=0.4.	(−24)/60=−0.4, hence 40% decrease; A remains correct. 

act-math-tests


T22Q36	(−4)/40=0.1.	(−4)/40=−0.1, hence 10% decrease; D remains correct. 

act-math-tests


T28Q37	(−16)/40=0.4.	(−16)/40=−0.4, hence 40% decrease; C remains correct. 

act-math-tests

The salary calculations also use thousands without labeling that unit change. The nine-error total counts substantive mathematical/logic failures, not every wording or brevity issue.

4. ITEM QUALITY
A. The forms repeat topic blocks instead of functioning as balanced tests

The same allocation holds in every form, T1Q1–T36Q44:

Positions in each form	Recurring content block	Bank-wide items
Q1–Q15	Linear equations, systems, inequalities, slopes, linear functions, and related rate contexts	540
Q16–Q30	Quadratics, composition, absolute values, radicals, exponent rules, and exponential models	540
Q31–Q37	Elementary data summaries, probability, percentages, and proportional arithmetic	252
Q38–Q44	Triangle-angle sums, rectangular-box volumes, and circle center/radius identification	252

The final seven positions never move beyond four routine geometry templates. For example, T15Q40–T15Q44 are five consecutive applications of 180−a−b. T36Q38–T36Q44 consist only of box volumes, circle radii, and triangle-angle sums. That is not a credible harder finish for a test whose official design orders items by increasing difficulty. 

act-math-tests +1

 
ACT

B. Numerical variation is being used in place of substantive variety

Under the classification used in this pass, all 1,584 items fall into 49 solver families. Particularly concentrated families include 136 function-composition items, 95 triangle-angle items, 80 vertex-identification items, 80 box-volume items, and 76 quadratic-minimum items.

The conservative same-input/task check found 30 internal repeat groups containing 78 items, representing 48 repetitions beyond the first occurrence. This is narrower than merely calling questions “similar”: it preserves the supplied numerical inputs while ignoring irrelevant ordering.

Examples:

T1Q37, T6Q31, and T16Q31 all ask for the mean of the same five values, 22–26, in different orders. T7Q35, T12Q32, T16Q34, T19Q37, T20Q33, T23Q36, T31Q36, and T33Q36 repeat the mean of 17–21. Changing the order does not create a new mathematical task. 

act-math-tests +2

T6Q28 → T6Q29 creates an additional within-test cue: one question factorizes x
2
−x−30, and the next immediately asks for the roots of that same polynomial. These are different tasks, so they are not counted in the conservative same-task total, but the adjacency makes the second item less independent. 

act-math-tests

C. Overlap with B13 and B18

The comparison used all 1,530 B13 items and all 1,540 B18 items. Both Library copies of B13 were byte-identical.

“Same inputs/task” here ignores reordered data sets, box dimensions, triangle angles, factors, or points, and reconciles the two equivalent unit-price wordings. It does not count a question merely because it shares a topic or final answer.

Comparison	Identical normalized stems	Same-input/task matches among B21’s 1,584 items
B21 versus B13	0	43 — 2.71%
B21 versus B18	0	87 — 5.49%
B21 versus either bank, counting each B21 item once	0	104 — 6.57%

Twenty-six B21 items match both earlier banks. Separately, all 49 B21 solver families occur in both B13 and B18. That is shared template coverage, not a claim that every question is an exact duplicate.

Concrete cross-bank matches:

B21 item	Earlier-bank item(s)	What is repeated
T1Q39	B13 T19Q43; B18 T14Q38	Volume of the same 2×4×6 box, with reordered dimensions.
T7Q35	B13 T13Q31; B18 T8Q36	Mean of the same five numbers, 17–21, reordered.
T3Q21	B18 T7Q20	Expansion of (x−4)(x−5), with the factor order reversed.

The earlier-bank source items confirm the identical box dimensions, data values, and factors. 

act-math

 

act-math-workbook

 

act-math

 

act-math-workbook +1

There is no verbatim-stem duplication with those banks, but B21 is not a materially new set of mathematical approaches.

D. Distractors and stimulus quality

T5Q16 contains an additional duplicated distractor pair: A, “x=8 only,” and C, “x=8,” both give the same incomplete solution set. Across the bank, mathematical option-equivalence checking found five equivalent pairs in four items; four pairs duplicate correct answers, and this fifth pair duplicates a distractor. 

act-math-tests

Thirty-one of the 46 marble-probability questions contain an immediately eliminable option above 1. Examples include T2Q31 C = 8/6, T3Q37 B = 7/6, and T22Q31 B = 10/8. Such options can represent a misconception, but repeatedly using the same denominator error limits the distractor challenge. These are quality findings, not additional wrong keys. 

act-math-tests +2

T3Q6 and T32Q4 use the same fixed-fee interpretation template, with the correct answer uniquely longest in both cases. The problem is template-specific, despite the absence of a bank-wide “longest answer is correct” effect.

T9Q34 reports 25% of a 250-student sample: exactly interpreted, that implies 62.5 students. A rounded percentage makes the scenario defensible, so I have not counted it as unanswerable; the percentage should be identified as approximate. 

act-math-tests

There are no missing required figures found in the export, but also no supplied visual stimuli. For example, T1Q43 and T36Q40/T36Q42 mention circles but only require reading their equations, not interpreting diagrams. The coverage omission is different from a broken image file. 

act-math-tests +1

5. BLUEPRINT COVERAGE

Reference: ACT’s current Mathematics Test Description and the revised Math Content Blueprint, Table 2.2, in Design Framework for the ACT Enhancements, February 2026. This is the revised blueprint, not the earlier initial table in that report. 
ACT
+1

Official category	Enhanced ACT allocation
Preparing for Higher Math	33 scored items — approximately 80%
Number & Quantity	4–5; 10–12%
Algebra	7–8; 17–20%
Functions	7–8; 17–20%
Geometry	7–8; 17–20%
Statistics & Probability	5–6; 12–15%
Integrating Essential Skills	8; approximately 20%
Modeling	At least 8; cross-counted with other categories

These allocations concern the 41 scored items, not an arbitrary percentage split of all 45 delivered questions. Modeling is overlapping, not an additional exclusive content block. 
ACT
+1

Number & Quantity is severely underrepresented. Even crediting every exponent-quotient item to this category, there are only seven: T1Q26, T2Q21, T9Q30, T15Q29, T16Q25, T26Q29, and T32Q25 — 0.44% of the bank. Twenty-nine forms contain none of that family. There are no dedicated complex-number, matrix, vector, or rational-exponent tasks. Those are within ACT’s stated Number & Quantity coverage. 

act-math-tests +1

 
ACT

Algebra and function drills dominate, but breadth within them is restricted. Every form reserves its first 30 positions for the two algebra/function-related blocks. Within those blocks, examples such as T1Q16–T1Q17 repeatedly evaluate compositions, while T1Q20/T1Q24/T1Q25 identify vertices directly from vertex form. The bank does not supply logarithmic or piecewise-function tasks, despite their inclusion in ACT’s function coverage. 

act-math-tests +2

 
ACT

Geometry is narrow rather than adequately represented by the existence of a geometry block. The 252 terminal geometry positions contain 95 angle-sum questions, 80 box-volume questions, 57 circle-radius questions, and 20 circle-center questions. T15Q40–T15Q44 illustrates the concentration. There is no meaningful coverage of trigonometric ratios, similarity/congruence, composite figures, or broader area/surface-area work. ACT’s geometry scope extends well beyond the four templates used here. 

act-math-tests

 
ACT

Statistics and probability lack representation variety. The data block is dominated by five-number means/medians/ranges and single-marble probabilities; T1Q31–T1Q37 is representative. There are no bivariate-data or graph/table-interpretation tasks. ACT explicitly includes data relationships and broader distribution analysis. 

act-math-tests

 
ACT

Integrating Essential Skills and Modeling are not established as form-level allocations. Items such as T1Q33 and T1Q37–T1Q39 exercise basic proportional arithmetic, means, and volume, but do not demonstrate a planned set of nonroutine, integrated problems. T3Q6 provides elementary model interpretation, but the export supplies no Modeling or other domain tags with which to verify balanced forms. 

act-math-tests +2

The observed task counts above are audit classifications, not fabricated official tags. I found no clearly off-scope mathematical topic; the problem is missing coverage, concentration, and insufficient complexity.

6. STRUCTURAL CHECK
Section A: independently checked results
Check	Recomputed finding
Question and form counts	1,584 questions; 36 forms; every form exactly 44 questions
Item IDs and numbering	Unique IDs; Q1–Q44 present in every form
Choice count	Four choices in all 1,584 items
Invalid key labels / missing choices	0 / 0
Exact normalized duplicate stems	0
Missing explanations	0
Explanations under 40 characters	718 — 45.33%
Explanation length	Median 43 characters; maximum 95
Runs of at least four identical keys	11
Images / missing referenced image files	0 / 0
Domain tags	None supplied

The numerical findings in Section A are reproducible. Its zero duplicate-choice result, however, must not be treated as proof of mathematical uniqueness: T5Q16, T16Q30, T19Q21, and T22Q23 evade literal-string checking. 

act-math-tests +1

There are also 178 repeated unordered four-choice-set groups spanning 593 items across different questions. Reusing a set of four numerical options is not automatically an error; it is distinct from duplicating options inside a question.

The explanation lengths are not themselves counted as mathematical errors. Nevertheless, this export provides brief one-line working, not substantial diagnostic feedback. T2Q22, for example, offers only the substitution x=0, while the problematic T6Q15 compresses an invalid uniqueness claim into the same presentation style. 

act-math-tests +1

Answer-key distribution

A = 429 (27.1%); B = 369 (23.3%); C = 370 (23.4%); D = 416 (26.3%). This matches Section A. The aggregate distribution is not a release blocker. 

act-math-tests

The longest run is D seven times at T18Q3–T18Q9. Section A identifies runs by their ending item, not their starting item. The other runs are:

T3Q4–Q7 C×4; T7Q26–Q29 C×4; T10Q22–Q25 D×4; T10Q36–Q39 A×4; T15Q30–Q34 A×5; T16Q33–Q37 B×5; T20Q2–Q6 D×5; T29Q16–Q19 B×4; T29Q35–Q38 D×4; T33Q20–Q23 C×4. These reproduce the eleven reported runs. 

act-math-tests

Longest-option cue rate

Length was measured as source-text characters after trimming/collapsing whitespace, excluding option labels—not rendered pixel width.

Measurement	Result
Keyed answer is strictly longer than every distractor	72/1,584 = 4.55%
Keyed answer is tied for or solely longest	838/1,584 = 52.90%
Questions possessing a single uniquely longest option	688
Key is that option, among those 688 questions	72/688 = 10.47%
Uniquely longest option is a distractor	616/688 = 89.53%

The 52.90% inclusive figure is not evidence of a strong longest-correct-answer cue. Ties are common: 275 items have all four options equal in length, and the tie-inclusive baseline under uniformly assigned keys is 51.85%. Randomly selecting among the longest options would score 21.90% against the printed keys.

The detectable overall tendency is in the opposite direction: a uniquely longest numerical option is usually wrong. A local verbal cue still exists in T3Q6/T32Q4, where the fixed-fee answer is conspicuously longer.

Per-test length and cycle results

Every row covers that test’s Q1–Q44. “Unique” counts strictly longest keyed answers; “including ties” also counts tied maxima. The cycle column shows the best-fitting repeated permutation of A, B, C, D among all 24 permutations, with matches out of 44.

Test	Unique longest key	Including ties	Maximum same-key run	Best four-letter fit
T1	1	16	3	BDAC: 17/44
T2	1	20	2	ADCB: 16/44
T3	2	20	4	BADC: 14/44
T4	4	24	3	BADC: 15/44
T5	5	26	3	BCDA: 16/44
T6	1	27	3	DCBA: 16/44
T7	3	25	4	DCAB: 19/44
T8	0	27	3	CABD: 19/44
T9	0	24	3	DACB: 17/44
T10	2	19	4	CBAD: 16/44
T11	1	24	2	ACBD: 18/44
T12	1	25	3	ABDC: 20/44
T13	3	18	3	ABDC: 16/44
T14	1	25	3	BACD: 17/44
T15	5	26	5	CADB: 17/44
T16	0	23	5	DBCA: 18/44
T17	0	27	3	BDAC: 17/44
T18	3	19	7	BADC: 17/44
T19	2	25	2	BDCA: 17/44
T20	1	23	5	ABCD: 17/44
T21	3	20	3	BCAD: 16/44
T22	0	22	3	BCDA: 16/44
T23	0	19	3	CDAB: 17/44
T24	3	27	3	CDAB: 17/44
T25	4	27	3	ADCB: 17/44
T26	2	20	3	ACBD: 14/44
T27	3	23	3	BADC: 16/44
T28	5	27	3	DCAB: 16/44
T29	1	17	4	CBAD: 16/44
T30	6	26	3	CDBA: 18/44
T31	1	24	3	ADCB: 16/44
T32	3	20	3	ADBC: 19/44
T33	0	26	4	CDBA: 17/44
T34	2	25	3	DBAC: 16/44
T35	0	25	2	DABC: 20/44
T36	3	27	2	ABDC: 14/44

No repeating answer-key cycle was detected in any form under either of these checks: exact whole-form periods of 1–22, or nonconstant local periods of 2–6 spanning at least 12 items and three repetitions.

The four-letter best fits range from 31.8% to 45.5%. These are selected-after-search fits, so 25% is not the appropriate baseline for their maximum. They do not establish a deterministic cycle. Nor does T18Q3–T18Q9 alone justify suppressing natural same-letter runs.

The complete item-status, overlap-pair, and per-test results are recorded in the 
B21 audit evidence ledger.

7. TOP FIXES

Remove the current forms from the full-length Enhanced ACT simulator offering. Every form from T1Q1–T1Q44 through T36Q1–T36Q44 is short and uses the wrong assembly pattern. Correcting individual keys will not resolve that.

Quarantine the ten ambiguous items listed in Section 2. Repair the dependent-system generator behind T6Q15/T7Q6/T13Q5/T16Q6/T31Q10/T34Q10, and the equivalent-solution-set failures in T5Q16/T16Q30/T19Q21/T22Q23. Re-score affected attempts where responses are retained.

Correct the nine substantive explanation failures. Eliminate the false uniqueness deductions and the sign errors in T2Q33, T22Q36, and T28Q37.

Reassemble genuine 45-question, 50-minute forms with documented scoring treatment. Replace the Q44 stopping point illustrated by T1Q44/T36Q44; document the simulation’s 41-scored/4-unscored treatment rather than silently treating the present forms as equivalent.

Rebuild Number & Quantity coverage. The seven-item family represented by T1Q26/T16Q25 cannot cover the category across 36 forms.

Replace excessive elementary repetitions with missing breadth and integrated reasoning. Prioritize the slots occupied by T15Q40–T15Q44, repeated circle-radius tasks such as T11Q38–T11Q40, and basic arithmetic sequences such as T1Q31–T1Q39.

Establish and review a credible difficulty progression for each form. Remove the universal routine-geometry finish, exemplified by T36Q38–T36Q44, and avoid adjacent answer cues such as T6Q28–T6Q29.

Deduplicate internally and across B13/B18 before assembling forms. Address the 104 cross-bank same-input/task matches, including T1Q39 and T7Q35, and the 30 internal repeat groups.

Improve distractor variety and targeted feedback. Address the repeated probability-denominator pattern in T2Q31/T3Q37/T22Q31, the verbal length cue in T3Q6/T32Q4, and the extra duplicated distractor in T5Q16.

Make semantic validation a release gate. Require exactly one valid option, unordered solution-set comparison, system-rank checks, explanation assertions, domain/difficulty metadata, and form-level review. Regression cases must include T5Q16, T6Q15, T16Q30, and T22Q36.

8. SUMMARY ROW

| B21 — ACT Math: 10 Practice Tests | 3.5/10 | 10 ambiguous; 0 wrong-valued | 9 | PULL | All 36 forms are 44-question template blocks, not valid Enhanced ACT simulators; 104 same-input/task overlaps with B13/B18. |