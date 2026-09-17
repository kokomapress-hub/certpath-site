# B22 — GED Math: 10 Practice Tests — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/ged-math-tests.json` — 1584 questions / 36 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

3.0/10 — not release-ready as a full-length GED Mathematical Reasoning simulator.

Assessment area	Score
Answer-key correctness, including uniqueness	9.9/10
Explanation accuracy	9.9/10
Item quality and distractors	2.0/10
GED blueprint alignment	1.0/10
Structural hygiene	3.0/10

The mathematical failures are eight multiple-answer questions and four substantively incorrect explanations, affecting ten distinct items. The larger release problem is that T1–T36 are all 44-question, four-option-only forms assembled from recurring topic blocks, with substantial GED coverage gaps. Correcting those ten items would not make the product a valid simulator.

Coverage: I processed all 1,584 items, all 6,336 options, and all 1,584 explanations, from T1Q1 through T36Q44. The pass independently recomputed every item, checked all 9,504 within-item option pairs for mathematical equivalence, and performed 5,119 explanation arithmetic/consistency checks. There were no unprocessed items. Manual review covered representative variants across the 48 solver families and all flagged cases; this was not 1,584 separate blind human reviews.

Overlap comparisons used the complete B14 bank: 1,518 items, and B19 bank: 1,540 items. The live application’s timer, calculator restrictions, navigation, rendering, and score calibration were not tested.

The overall score reflects simulator readiness, not an average of the arithmetic-accuracy percentages.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

Eight items have multiple correct choices. No mathematically false keyed answers or items with no correct option were found.

Item	What is wrong	Correct mathematical result / valid choices
T1Q20	For ∣2x∣=8, A and C list the same solutions in opposite orders. Printed key: A.	A and C; x=−4,4. 

ged-math-tests


T2Q24	For ∣3x∣=6, B and C are equivalent solution sets. Printed key: C.	B and C; x=−2,2. 

ged-math-tests


T6Q26	For ∣4x∣=12, A and B are equivalent solution sets. Printed key: B.	A and B; x=−3,3. 

ged-math-tests


T13Q2	2x+2y=14 duplicates x+y=7. Every listed pair satisfies both equations. Printed key: C.	A, B, C, and D; infinitely many solutions on x+y=7. 

ged-math-tests


T24Q24	For ∣2x∣=6, A and C are equivalent solution sets. Printed key: A.	A and C; x=−3,3. 

ged-math-tests


T26Q3	2x+2y=22 duplicates x+y=11. Every listed pair satisfies both equations. Printed key: C.	A, B, C, and D; infinitely many solutions on x+y=11. 

ged-math-tests


T32Q22	For ∣4x∣=4, B and D are equivalent solution sets. Printed key: D.	B and D; x=−1,1. 

ged-math-tests


T34Q16	For ∣2x∣=4, C and D are equivalent solution sets. Printed key: C.	C and D; x=−2,2. 

ged-math-tests

The two systems are underdetermined, not inconsistent or unsolvable. The six absolute-value failures contain duplicate correct answer sets; the system failures contain different ordered pairs that are all valid.

Re-keying alone cannot repair any of these eight items. The stem or option set must change.

Uniquely correct keyed items: 1,576/1,584 = 99.49%. The eight defects affect eight forms: T1, T2, T6, T13, T24, T26, T32, and T34.

3. EXPLANATION ERRORS

Four substantive errors were found.

Item	Explanation error	Correct conclusion
T13Q2	After reaching 0y=0, the explanation asserts y=3, then x=4, as though these were uniquely determined.	y is free; x=7−y. The explanation must acknowledge infinitely many solutions. 

ged-math-tests


T26Q3	After reaching 0y=0, it asserts y=7, then x=4.	y is free; x=11−y. The selected pair is only one possible solution. 

ged-math-tests


T22Q35	Prints (−25)/100=0.25. The sign is wrong.	(−25)/100=−0.25, meaning 25% decrease. Existing key D remains correct. 

ged-math-tests


T28Q31	Prints (−16)/40=0.4. The sign is wrong.	(−16)/40=−0.4, meaning 40% decrease. Existing key B remains correct. 

ged-math-tests

The first two explanations teach an invalid deduction; the latter two contain false numerical equalities despite reaching the intended verbal answer.

A separate presentation issue affects the salary template: T5Q37, T15Q36, T22Q35, T28Q31, and T29Q33 silently calculate in thousands. For example, T5Q37 changes a salary from $20,000 to $28,000 but states “Change = 8.” Label that change as $8,000, or explicitly state that the calculation uses thousands. This is not counted as five additional substantive mathematical errors. 

ged-math-tests

4. ITEM QUALITY
Repeated topic blocks instead of independently assembled forms

The following structure holds throughout T1Q1–T36Q44:

Positions in every form	Content block	Bank-wide items
Q1–Q15	Linear equations/functions, slopes, systems, inequalities, and rates	540
Q16–Q30	Quadratics, composition, absolute-value/radical equations, exponential models, and related algebra	540
Q31–Q37	Basic data summaries, probability, percentages, and proportions	252
Q38–Q44	Triangle-angle sums, rectangular-box volumes, circle centers, and circle radii	252

These are observed assembly blocks, not official GED domain tags.

The final geometry block contains only 86 triangle-angle questions, 76 box-volume questions, 46 circle-center questions, and 44 circle-radius questions. For example, T1Q40–T1Q43 are four consecutive circle-center identification questions. Earlier in that same form, T1Q34–T1Q37 are four consecutive range calculations. 

ged-math-tests +1

Across the whole bank, 120 items evaluate function compositions, 111 identify quadratic vertices, and 55 identify quadratic minima. These concentrations leave little room for broader task variety.

Internal repetition

The conservative same-input/task comparison found 25 repeat groups containing 61 items, or 36 repetitions beyond the first occurrence. This comparison preserves the numerical inputs and the task; it does not count questions simply because their answers happen to match.

The clearest examples are:

Items	Repetition
T24Q36 and T24Q37	The same five numbers, 12–16, merely reordered. Both have identical A–D choices and key B. 

ged-math-tests


T5Q20 and T5Q27	The same x-intercept task for (x−7)(x−1), with the factors reversed. 

ged-math-tests +1


T1Q38 and T4Q41	The same 7×10×8 box, with dimensions reordered. 

ged-math-tests +1

All 42 mean questions use five consecutive integers. Examples include T3Q32, T3Q33, and T4Q35. This makes the template substantially less varied than the item count suggests: students repeatedly encounter a data set whose mean is its middle integer. 

ged-math-tests +1

Overlap with B14 and B19

The table counts unique B22 items with a match, not the number of matching pairs.

“Same inputs/task” normalizes reordered data sets, dimensions, angles, point pairs, and binomial factors, and reconciles the two unit-price wordings. It does not merge different tasks or all questions sharing a final answer.

Comparator	Identical normalized stems	Same-input/task matches in B22
B14 — GED Math	7	62/1,584 — 3.91%
B19 — GED Math Workbook	0	62/1,584 — 3.91%
Either bank, counting each B22 item once	7	90/1,584 — 5.68%

Thirty-four B22 items match both earlier banks.

Representative matches:

B22 item	Earlier item(s)	Repeated task
T13Q5	B14 T13Q5	Exact stem: 4 pounds cost $24; find the cost of 14 pounds. Options are reordered.
T12Q35	B14 T5Q32; B19 T1Q37	Mean of the same five values, 23–27, shuffled.
T7Q10	B19 T2Q37	6 pounds cost $18; find the cost of 9 pounds. Dollar formatting and wording differ.
T5Q26	B19 T32Q22	X-intercepts of the same factored quadratic, with factor order reversed.

The source pairs confirm the identical inputs and tasks. 

ged-math-tests

 

ged-math

 

ged-math-tests

 

ged-math

 

ged-math-workbook

 

ged-math-tests +1

The seven exact-stem matches are B22 T2Q36, T3Q23, T13Q5, T13Q15, T20Q13, T22Q36, and T36Q2. Their complete B14 pairings are recorded in the evidence ledger.

All 48 B22 solver families also occur in B19. That is shared template coverage—not a claim that every B22 question is duplicated—but B22 does not add new solver-family breadth over that workbook.

Distractors and wording

34 of the 63 marble-probability questions, 53.97%, contain an option greater than 1. Examples include T2Q31 B = 8/6, T2Q32 B = 9/5, and T10Q34 C = 6/2. These can represent denominator misconceptions, but repeatedly using the same immediately eliminable pattern weakens distractor variety. They are not additional wrong-key findings. 

ged-math-tests +1

The fixed-fee interpretation template has a 3/3 longest-correct-answer cue: T2Q11 D, T16Q3 B, and T31Q5 B. The correct sentence is much longer than the alternatives. This local verbal cue is distinct from the bank-wide length results below. 

ged-math-tests +2

Three survey questions need an approximation qualifier: T2Q33 implies 62.5 surveyed students, T25Q34 implies 37.5, and T34Q31 implies 87.5. The intended estimates remain defensible when the percentages are rounded, so these are wording defects, not additional unanswerable items. 

ged-math-tests +1

5. BLUEPRINT COVERAGE

Reference: GED Testing Service’s Assessment Guide for Educators: Mathematical Reasoning, June 2016 cover date, including its March 2016 edition note, together with the current official test-format pages checked for this audit. The guide specifies approximately 45% quantitative problem solving and 55% algebraic problem solving. 
ged.com

Its reporting-category allocation is:

Category	Approximate share
Rational-number problems	25%
Measurement and data problems	20%
Algebraic expressions and equations	30%
Graphs and functions	25%

These are blueprint allocations, not verified B22 percentages. B22 supplies no domain tags, and its fixed blocks cannot simply be relabeled to establish compliance. 
ged.com

Full-length simulator mismatch

Current official guidance describes about 46 questions, with approximately five non-calculator questions and 41 calculator-permitted questions. The official operational page specifies 115 minutes, two parts, reference sheets, and a mixture of multiple-choice and other response formats. 
ged.com
+1

B22 T1Q1–T36Q44 provides 44 four-option questions per form, with no part-specific metadata or non-multiple-choice items. Forty-four questions alone is not my sole reason for rejecting it—the official wording is “about 46”—but the export does not substantiate an authentic full-length design. Adding two questions to each form would not fix the missing formats and coverage.

The initial positions also lack a deliberately constructed number-sense section. T1Q1–T1Q5, for example, move through a system, an intercept, a linear equation, slope, and function evaluation. That is not evidence of a planned non-calculator skill allocation. 

ged-math-tests

Major coverage gaps
Area	Finding in B22
Rational-number foundations	Across T1Q1–T36Q44, no dedicated fraction/decimal ordering, numeric GCF/LCM, or scientific-notation tasks were found. Repeated whole-number unit-price questions such as T13Q5 do not replace that breadth.
Measurement and geometry	Every Q38–Q44 slot belongs to four templates. There are no area/perimeter/circumference tasks, Pythagorean side-length tasks, surface-area tasks, or non-box/composite-solid calculations. T1Q40–T1Q43 illustrates slots spent repeatedly identifying circle centers instead.
Data and graph interpretation	There are no actual graph or table stimuli anywhere in T1Q1–T36Q44. T1Q34–T1Q37 repeatedly calculate range from a plain list rather than interpreting a display.
Algebraic breadth	Only T29Q28 directly asks students to solve an expanded quadratic equation. There are another 13 factored-quadratic x-intercept questions, but these are outweighed by 111 vertex, 55 minimum, and 26 number-of-real-roots items.

The omitted foundational, measurement, display-reading, and quadratic-solving skills are represented in GED’s official study materials. The findings above are my classification of the bank, rather than tags supplied by the publisher. 
ged.com
 The sole direct expanded-quadratic solving item is explicitly identifiable in the export. 

ged-math-tests

Misplaced specialization

258 items, 16.29% of B22, belong to three families without an explicit matching specialist indicator in the published target list:

Family	Items	Examples
Circle center/radius from a circle equation	90	T1Q40–T1Q43; T2Q39
Function composition	120	T2Q19; T7Q20–T7Q22
Cubic factor-theorem questions	48	T1Q18; T1Q24

My finding is unsupported direct simulator mapping and excessive allocation, not a claim that GED can never ask an inference involving these concepts. Require a defensible target mapping or move them outside the full-length forms. Basic function evaluation should not be treated as justification for a large composition block. 
ged.com
 

ged-math-tests +1

Conversely, T2Q26’s rational-expression simplification is not automatically out of scope; that skill is explicitly represented in official GED material. 

ged-math-tests

 
ged.com

Finally, the guide calls for approximately 50% DOK 2 items and 30% mathematical-practice alignment. B22 has no such metadata, and clusters such as T1Q34–T1Q43 do not demonstrate the needed reasoning balance. I have not assigned a fabricated bank-wide DOK percentage. 
ged.com

6. STRUCTURAL CHECK
Independently recomputed results
Check	Result
Questions and forms	1,584; 36 forms of 44
IDs and numbering	Unique; Q1–Q44 present in every form
Choices	Four per item
Missing choices / invalid key labels	0 / 0
Exact normalized duplicate stems	0
Missing explanations	0
Explanations under 40 characters	719 — 45.39%
Explanation length	Median 43 characters; minimum 14; maximum 97
Mathematically equivalent option pairs	6 pairs in 6 items
Images / broken referenced image paths	0 / 0
Domain tags	None supplied

The count, distribution, missing-field, and short-explanation findings reproduce Section A. Its zero duplicate-choice result does not establish mathematical uniqueness: T1Q20, T2Q24, T6Q26, T24Q24, T32Q22, and T34Q16 pass literal-string checks while containing equivalent answers. 

ged-math-tests +1

The explanations are predominantly brief calculation lines rather than diagnostic teaching. T1Q19, for example, provides only the substitution result. Shortness is not itself counted as a mathematical error, but the bank should not present this as extensive answer analysis. 

ged-math-tests

No required figure was found to be missing. The problem is absence of visual tasks, not evidence that image files are broken.

Answer-key distribution

A = 413 (26.1%); B = 378 (23.9%); C = 386 (24.4%); D = 407 (25.7%).

This matches Section A and is not a release blocker by itself. 

ged-math-tests

Section A’s same-answer-run report is incomplete and crosses form boundaries

The actual result is 16 runs of at least four identical keys within individual forms. The printed report lists 15 entries, but two cross test boundaries:

Printed entry	Actual interpretation
“T3Q1 key C ×4”	T2Q42–T2Q44 plus T3Q1. This is not a four-answer run within T3.
“T16Q2 key D ×6”	T15Q41–T15Q44 plus T16Q1–T16Q2. T16 itself has no six-answer run.

Those boundary-spanning sequences are visible in the source. 

ged-math-tests +1

The printed list also omits T29Q32–T29Q35: A ×4, and T35Q6–T35Q10: D ×5. The latter is shown continuously in the source. 

ged-math-tests

The longest true within-form run is five, occurring at T23Q8–T23Q12 and T35Q6–T35Q10. These runs alone do not establish a defective shuffle, and they should not be removed merely to force alternation.

Longest-option cue rate

Lengths were measured as source-text characters after whitespace normalization, excluding option labels. This measures text length, not rendered pixel width.

Measurement	Result
Key is strictly longer than every distractor	73/1,584 = 4.61%
Key is tied for or uniquely longest	865/1,584 = 54.61%
Items with one uniquely longest option	677
Key is that uniquely longest option	73/677 = 10.78%
Uniquely longest option is a distractor	604/677 = 89.22%
All four options have equal length	262

The 54.61% inclusive figure is not an effective “choose the longest” advantage. Accounting for the actual tie sizes, the corresponding uniform-key baseline is 51.52%. Randomly choosing among the longest options would score 23.02% against the printed keys.

The stronger aggregate tendency is the reverse: a uniquely longest option is usually wrong. The fixed-fee verbal template remains a local exception: T2Q11, T16Q3, and T31Q5 have a 100% longest-correct cue.

Per-test cycle and length results

No deterministic repeating answer-key cycle was detected in any of the 36 forms under either check:

Exact whole-form periods 1–22.

Nonconstant local periods 2–6, spanning at least 12 items and three repetitions.

The final column below is only the best-fitting repeated four-letter permutation among all 24 possibilities. It is not a detected cycle. Because the best candidate is selected after searching, its maximum fit should not be compared naively with a 25% single-candidate baseline.

Each row covers that form’s Q1–Q44; both length columns are counts out of 44.

Test	Strictly longest key	Including ties	Maximum same-key run	Best four-letter fit
T1	3	26	3	BCDA — 15/44
T2	2	23	3	ABDC — 18/44
T3	2	21	4	ABDC — 15/44
T4	1	22	3	BACD — 17/44
T5	4	23	3	BDCA — 16/44
T6	3	25	3	DABC — 18/44
T7	3	27	3	BADC — 15/44
T8	0	23	3	BDAC — 16/44
T9	4	28	4	ADBC — 17/44
T10	1	22	4	BCDA — 19/44
T11	5	18	2	BDCA — 15/44
T12	2	26	3	BDCA — 16/44
T13	2	27	3	ACDB — 14/44
T14	1	23	2	DBCA — 21/44
T15	3	24	4	ACDB — 15/44
T16	5	23	3	BACD — 15/44
T17	1	20	3	ACDB — 14/44
T18	1	25	3	ACBD — 16/44
T19	2	27	3	CDBA — 16/44
T20	0	26	4	CDAB — 19/44
T21	3	24	3	ABCD — 15/44
T22	2	25	4	DBCA — 16/44
T23	2	26	5	ADCB — 15/44
T24	2	22	4	ADCB — 17/44
T25	0	20	3	BCDA — 19/44
T26	3	28	3	ADBC — 19/44
T27	1	21	4	ADCB — 14/44
T28	1	24	4	CABD — 18/44
T29	3	24	4	ADBC — 19/44
T30	1	22	3	BCDA — 18/44
T31	1	22	3	BACD — 16/44
T32	2	29	3	CADB — 13/44
T33	2	22	3	CADB — 18/44
T34	1	29	3	CADB — 14/44
T35	2	26	5	BCAD — 15/44
T36	2	22	2	ABCD — 14/44

The highest selected fit is T14: 21/44 = 47.7%. That does not establish a repeating cycle.

The 
B22 audit evidence ledger contains every item’s computed result, equivalent-option checks, explanation findings, all internal-repeat and cross-bank pairings, and complete per-test key sequences.

7. TOP FIXES

Withdraw the current full-length simulator designation pending reconstruction. The defect spans T1Q1–T36Q44; the recurring 44-item blocks do not establish GED simulator fidelity.

Quarantine all eight ambiguous items in Section 2. Repair the six equivalent-root option sets and the dependent systems T13Q2/T26Q3. Re-score affected attempts where retained responses permit it.

Correct the four substantive explanations. Remove the false uniqueness deductions in T13Q2/T26Q3 and sign errors in T22Q35/T28Q31.

Build an explicit GED form specification before selecting items. Replace the undifferentiated structure exemplified by T1Q1–T1Q44 with documented length, timing, calculator-part allocation, response formats, and reference-sheet access.

Restore foundational number-sense coverage. Replace some repeated opening-block tasks, such as those in T1Q1–T1Q15, with the missing rational-number skills; do not merely mark existing questions “no calculator.”

Replace misplaced specialization with core measurement and visual work. Prioritize circle-equation clusters such as T1Q40–T1Q43, composition clusters such as T7Q20–T7Q22, and cubic-factor items such as T1Q18/T1Q24.

Rebalance algebraic task variety and reasoning demands. Expand beyond vertex/minimum recognition; T29Q28 should not be the only direct expanded-quadratic solving item in 1,584 questions.

Deduplicate before form assembly. Address the 25 internal repeat groups and 90 cross-bank matches, starting with T24Q36/T24Q37, T5Q20/T5Q27, and T13Q5.

Improve distractors and context precision. Diversify the probability errors in T2Q31/T2Q32/T10Q34, remove the fixed-fee length cue in T2Q11/T16Q3/T31Q5, and qualify rounded survey percentages in T2Q33/T25Q34/T34Q31.

Make semantic and form-level validation release gates. Include unordered root-set comparison, system-rank checks, explanation assertions, and boundary-aware key-run reporting. Regression cases must include T1Q20, T13Q2, T22Q35, and the T15/T16 boundary.

8. SUMMARY ROW

| B22 — GED Math: 10 Practice Tests | 3.0/10 | 8 ambiguous; 0 wrong-valued | 4 | PULL | 44-item, all-MCQ template forms lack GED simulator coverage; 90 same-input/task overlaps with B14/B19. |