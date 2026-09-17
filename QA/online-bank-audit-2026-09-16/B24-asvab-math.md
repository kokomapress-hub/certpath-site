# B24 — ASVAB Math Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/asvab-math.json` — 1520 questions / 35 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

4.0/10 — not release-ready as an ASVAB AR/MK preparation bank.

Assessment area	Score
Answer-key correctness, including uniqueness and requested precision	9.9/10
Explanation accuracy	9.7/10
Item quality and distractors	3.0/10
ASVAB blueprint and subtest alignment	3.0/10
Structural hygiene	4.0/10

There are 13 answer-set defects: 11 multiple-answer questions and two questions missing the requested rounded answer. There are also 44 defective explanations: 42 mathematically false explanations and two that fail to complete the required rounding. Together, these affect 51 distinct items.

The main alignment problem is Arithmetic Reasoning: of the 760 AR-tagged items, 222 are bare arithmetic calculations and another 176 are context-free data/mean exercises. Together, 398/760 — 52.37% — provide no applied-scenario practice. These can serve as prerequisite exercises, but the AR label overstates their similarity to the official arithmetic-word-problem subtest. Examples include T1Q3, T1Q23, T1Q25, and T2Q4. 

asvab-math +2

 
ASVAB

Coverage: I processed all 1,520 items, all 6,080 options, and all 1,520 explanations, from T1Q1 through T35Q44. Every item was independently recomputed; all 9,120 within-item option pairs were checked for mathematical equivalence. The explanation pass performed 3,118 explicit checks of conclusions and selected intermediate steps, with no unprocessed items or explanations. Manual review covered representative question families and flagged cases—not 1,520 separate blind human reviews.

The live website’s calculator restrictions, timing, adaptive selection, rendering, and score conversion were not tested. Because this product is titled Math Prep, I have not treated mixed drill lengths alone as a release blocker.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
Eleven multiple-answer items
Item	What is wrong	Correct mathematical result / valid choices
T1Q28	A and D list the same roots of x
2
−4=0. Printed key: A.	A and D; x=−2,2. 

asvab-math


T14Q15	B and D give the same complete solution set for ∣x∣=6. Printed key: B.	B and D; x=−6,6. 

asvab-math


T14Q43	B and C differ only by +0x versus −0x. Printed key: B.	B and C; x
2
−25. 

asvab-math


T16Q7	A and D differ only by +0x versus −0x. Printed key: A.	A and D; x
2
−16. 

asvab-math


T19Q42	5x+5y=75 duplicates x+y=15. Every listed pair satisfies both equations. Printed key: B.	A, B, C, and D; infinitely many solutions on x+y=15. 

asvab-math


T21Q8	C and D are the same factorization with reversed factor order. Printed key: C.	C and D; (x+4)(x−4). 

asvab-math


T22Q24	4x+4y=36 duplicates x+y=9. Every listed pair is a solution. Printed key: B.	A, B, C, and D; infinitely many solutions on x+y=9. 

asvab-math


T24Q43	C, 0.0%, and D, 0%, have the same correct value. Printed key: C.	C and D; no net change. 

asvab-math


T25Q10	2x+2y=18 duplicates x+y=9. Every listed pair is a solution. Printed key: B.	A, B, C, and D; infinitely many solutions on x+y=9. 

asvab-math


T28Q36	4x+4y=44 duplicates x+y=11. Every listed pair is a solution. Printed key: D.	A, B, C, and D; infinitely many solutions on x+y=11. 

asvab-math


T30Q42	B and C differ only by −0x versus +0x. Printed key: C.	B and C; x
2
−9. 

asvab-math

Re-keying alone will not repair these items. The four systems are underdetermined, not inconsistent; their choices are different valid coordinate pairs, rather than equivalent options.

Two missing rounded answers
Item	What is wrong	Required answer
T10Q20	Requests the nearest tenth of a percent, but key B gives the unrounded +6.25%.	+6.3%, using ordinary school rounding. No option supplies it. 

asvab-math


T18Q18	Requests the nearest tenth, but key A gives the unrounded −13.75%.	−13.8%. No option supplies it. 

asvab-math

These are precision/instruction failures, not incorrect calculations of the exact percentage changes.

No other wrong-valued keys or unsolvable stems were found. Compliant, uniquely correct keyed items: 1,507/1,520 = 99.14%. The 13 defects affect 12 drills.

3. EXPLANATION ERRORS

44 explanations require correction. The groups below identify every affected item.

A. Twenty salary explanations reverse the sign of the quotient

Each prints a negative numerator divided by a positive denominator as a positive decimal. The final verbal answer, “decrease,” is correct, but the displayed equality is false.

For example, T1Q7 prints (−25)/100=0.25; it must be −0.25. T27Q1 similarly prints (−6)/50=0.12, rather than −0.12. 

asvab-math +1

Affected items	Correct signed quotient and interpretation
T1Q7, T1Q11	−0.25: 25% decrease
T1Q35, T14Q34, T17Q33, T25Q7	−0.30: 30% decrease
T2Q36, T11Q41, T19Q39, T32Q15	−0.20: 20% decrease
T2Q40, T8Q6, T24Q19, T32Q19	−0.10: 10% decrease
T3Q5, T17Q21, T29Q7	−0.40: 40% decrease
T23Q23, T24Q9	−0.15: 15% decrease
T27Q1	−0.12: 12% decrease

Existing keys remain correct for these twenty items. The later instances confirm that this is a repeated explanation-template defect, not an isolated typo. 

asvab-math +2

All 49 salary-change explanations also silently calculate in thousands of dollars. For example, T1Q19 reports “Change = 16” for a $16,000 increase. Label the units; this is not counted as 49 additional mathematical errors. 

asvab-math

B. Eighteen distance explanations subtract squared components

The negative vertical difference is incorrectly rendered outside the square:

(Δx)
2
−∣Δy∣
2
	​


The explanation then jumps to the correct positive sum. For example, T3Q42 equates 
25−144
	​

 with 
25+144
	​

. The negative sign belongs inside the squared difference, not between the two squared terms. 

asvab-math

Affected items	Correct squared-component calculation
T3Q42, T11Q14, T12Q3, T17Q24, T17Q42, T35Q4, T35Q32, T35Q34	
25+144
	​

=13
T4Q17, T11Q24, T31Q28, T35Q20	
36+64
	​

=10
T4Q37, T25Q24	
64+225
	​

=17
T13Q42	
81+144
	​

=15
T15Q16, T27Q10, T32Q34	
9+16
	​

=5

The final distances and existing keys are correct; the intermediate equations are not. The defect affects 18 of the 33 coordinate-distance items. 

asvab-math +2

C. Four system explanations manufacture a unique solution
Item	Invalid deduction	Correct conclusion
T19Q42	From 0y=0, asserts y=7, x=8.	y is free; x=15−y.
T22Q24	From 0y=0, asserts y=4, x=5.	y is free; x=9−y.
T25Q10	From 0y=0, asserts y=7, x=2.	y is free; x=9−y.
T28Q36	From 0y=0, asserts y=4, x=7.	y is free; x=11−y.

These explanations choose one arbitrary solution without acknowledging infinitely many others. 

asvab-math +2

D. Two explanations omit the requested rounding

T10Q20 — the factor 1.0625 is correct, but the final answer must complete the rounding to +6.3%.

T18Q18 — the factor 0.8625 is correct, but the final answer must complete the rounding to −13.8%. 

asvab-math +1

4. ITEM QUALITY
Duplicate distractors

Beyond the duplicate correct options in Section 2, six pairs duplicate incorrect answers:

Item	Equivalent incorrect choices
T7Q7	A/B: −5.0% and −5%
T8Q10	B/C: 4/36 and 1/9
T14Q15	A/C: x=6 and x=6 only
T17Q12	B/D: identical factors, differing only in spacing
T24Q43	A/B: 5.0% and 5%
T30Q2	A/D: x=6 and x=6 only

The source confirms numerical, algebraic, and wording duplicates that a literal-string comparison misses. 

asvab-math +2

Internal repetition

The conservative same-input/task comparison found 38 repeat groups containing 87 items, representing 49 repetitions beyond the first occurrence. This normalizes irrelevant ordering and equivalent input notation; it does not merge unrelated questions merely because they share an answer.

T28Q11 and T28Q33 ask for the mean of the same numbers, 19–23, reordered, within one drill. T23Q14 and T23Q44 ask for the same binomial expansion with factor order reversed. 

asvab-math +2

Across drills, T2Q38, T7Q1, T15Q29, and T34Q37 repeat the mean of 6–10. All 36 ordinary mean questions use five consecutive integers. The template therefore repeatedly makes the answer the middle integer, instead of providing varied data structures. T2Q38 is an example. 

asvab-math

Repeated giveaway distractors

63/85 marble-probability questions — 74.12% — contain an option greater than 1. Examples include T1Q5 B = 8/5 and T1Q33 C = 16/2. These can represent denominator mistakes, but the repeated immediately eliminable pattern weakens distractor variety. These are not additional wrong-key findings. 

asvab-math +1

Teaching and context defects

T1Q17, T2Q14, and the other 18 decimal-multiplication explanations begin with a catch-all instruction to line up decimal points. The parenthetical mentions multiplying and placing the decimal, but the explanation should teach the multiplication procedure explicitly. This is a pedagogical clarity issue, not twenty additional wrong numerical answers. 

asvab-math +1

T13Q5, T20Q38, T21Q39, T26Q15, T26Q31, and T30Q3 give sample percentages implying fractional people: respectively 87.5, 37.5, 37.5, 62.5, 87.5, and 37.5 students. Identify those percentages as rounded. The intended population estimates remain defensible, so these are context defects rather than additional missing-answer items.

No question was found to require an unavailable figure. However, T1Q1–T35Q44 contains no visual stimuli at all. Geometry questions such as T1Q20 and T1Q32 are entirely verbal; the official MK samples include a diagram-based volume question. This is a representation-variety gap, not a broken-image finding. 

asvab-math +1

 
ASVAB

5. BLUEPRINT COVERAGE
Reference and scope

The reference is the official ASVAB Testing Program’s ASVAB Subtests description, updated April 8, 2025, its official AR/MK sample items, and What to Expect When You Take the ASVAB, updated July 24, 2025. The two relevant constructs are AR: arithmetic word-problem solving, and MK: high-school mathematics principles. 
ASVAB
+1

I did not establish a current public, detailed topic-percentage blueprint from those sources. Therefore, the content concentrations below are audit findings—not purported violations of invented official percentage quotas.

AR: tagged balance does not establish construct alignment

The export’s 760 AR / 760 MK split is numerically correct, but the AR pool contains:

AR-tagged content	Items
Bare fraction, integer, decimal, and order-of-operations calculations	222
Context-free mean, median, range, and missing-number-from-mean exercises	176
Remaining contextual scenarios	362
Total AR-tagged	760

The clearest mismatch is the 222 bare calculations, such as T1Q3, T1Q23, T2Q2, and T2Q4. The 176 data exercises vary in reasoning demand; they should not all be discarded, but they do not supply the missing applied-scenario breadth. 

asvab-math +2

The remaining AR coverage is concentrated in recurring salary, discount, generic unit-price, marble, and school-survey situations. There are 61 unit-price questions, but no time-rate/unit-conversion scenarios across T1Q1–T35Q44. Official AR samples explicitly include rate problems involving elapsed time and unit interpretation. T1Q43’s pounds-to-cost calculation does not replace that breadth. 

asvab-math

 
ASVAB

Data summaries, missing/weighted means, school-sample projections, and probability together occupy 337/760 AR slots — 44.34%. That is a concentration finding, not an official maximum. Repeated slots such as T1Q1, T1Q15, and T1Q29 would be better used to broaden contextual reasoning. 

asvab-math +2

MK: relevant subjects, but predominantly narrow procedural variants

The MK pool contains 33 solver families, including algebraic manipulation, equations, powers, scientific notation, and geometry. The problem is not that these topics must be removed: it is the limited variation within them.

Examples include T1Q8/T1Q38, repeated exponent application, and T2Q9/T2Q27, direct Pythagorean calculations. Most geometry requires direct substitution into a formula, rather than interpreting a diagram or combining relationships. 

asvab-math +3

I found no basis for declaring an entire mathematical family here categorically outside ASVAB scope. Elementary arithmetic also has a legitimate foundational role. The needed correction is better classification, broader application, and stronger item variation—not replacing the bank with unnecessarily advanced mathematics.

Difficulty and delivery: CAT versus paper

Simple questions are not inherently unrealistic: the official paper test spans a broad difficulty range, and CAT selects questions according to the examinee’s evolving ability estimate. B24’s easy procedural items are not the problem by themselves; the bank lacks evidence of a calibrated harder range and authentic adaptive selection. 
ASVAB

The current proctored specifications are:

Version	AR	MK
CAT, without tryout questions	15 scored questions; 55 minutes	15 scored questions; 31 minutes
CAT, with tryout questions	15 scored + 15 possible tryout; 113 minutes	15 scored + 15 possible tryout; 65 minutes
Paper-and-pencil	30 questions; 36 minutes	25 questions; 24 minutes

Tryout questions are unscored and occur in selected subtests. Calculators are prohibited. These are the current published specifications, not the older timing figures commonly repeated in preparation materials. 
ASVAB

T1–T35 are mixed practice drills, not intact AR or MK subtests. Their global AR/MK alternation does not reproduce either administration. This is acceptable for clearly labeled mixed practice, but separate assessment modes would need authentic subtest lengths and rules.

For CAT, adaptation is item-by-item, not SAT-style module routing. Previously answered questions cannot be revisited; paper examinees can review within the current subtest. None of that behavior is auditable from T1Q1–T35Q44 alone. 
ASVAB
+1

AFQT role and score claims

The AFQT is derived from AR, MK, Word Knowledge, and Paragraph Comprehension, not from the two math subtests alone. The documented composite is:

AFQT composite=AR+MK+2VE

Here, VE is the standardized verbal composite derived from WK and PC—not a raw percentage or a simple count of correct verbal answers. The composite is converted to a percentile; AR and MK each enter with coefficient one. 
ASVAB

The reported AFQT score is a percentile from 1–99, not percent correct. Official scoring uses calibrated item-response methods and equating for both CAT and paper versions. Therefore, a raw score on T1Q1–T35Q44 cannot substantiate an AFQT percentile or enlistment-readiness prediction without separate validation. 
ASVAB

The absence of WK/PC questions is not a defect in a math-only product. The limitation is that this bank cannot, by itself, measure the complete AFQT construct. No live AFQT conversion was supplied or tested.

6. STRUCTURAL CHECK
Independently recomputed results
Check	Result
Total items / drills	1,520 / 35
Drill lengths	T1–T20: 43 each; T21–T35: 44 each
IDs and numbering	Unique; complete within each drill
Options	Four per item
Missing choices / invalid key labels	0 / 0
Exact whitespace-normalized duplicate stems	0
Mathematically equivalent option pairs	13 pairs across 11 items
Missing explanations	0
Explanations under 40 characters	547 — 35.99%
Explanation length	Minimum 14, median 45, maximum 97 characters
Domain totals	760 AR / 760 MK
Within-drill same-key runs of at least four	18
Images / broken referenced image paths	0 / 0

Section A’s basic counts, key distribution, missing fields, and short-explanation total reproduce. Its zero duplicate-choice result fails semantic validation: T14Q43, T17Q12, and T24Q43, for example, contain equivalent choices. 

asvab-math +3

Domain tags are verifiable; the original per-item skill tags are not included in Section B. The aggregate skill counts cannot be independently traced item by item from the export. My 58-family classification is separate from those publisher tags. 

asvab-math

Short explanations are not automatically erroneous, but statements such as T1Q23’s “Watch the signs” provide little diagnostic teaching. The commercial issue is the combination of terse feedback and repeated false intermediate steps, not length alone. 

asvab-math

Answer-key distribution and runs

A = 412 (27.1%); B = 385 (25.3%); C = 360 (23.7%); D = 363 (23.9%). This matches Section A and is not, by itself, a release blocker. 

asvab-math

The printed run report has two cross-drill false alarms:

Printed entry	Actual sequence
“T17Q1 A ×4”	T16Q41–T16Q43 plus T17Q1
“T24Q3 D ×5”	T23Q43–T23Q44 plus T24Q1–T24Q3

Neither is a run of that length inside the named drill. 

asvab-math +1

It also omits five genuine runs: T30Q4–Q7 D×4; T30Q9–Q12 D×4; T32Q1–Q4 C×4; T32Q7–Q10 B×4; and T35Q26–Q29 B×4.

The longest true within-drill run is five, occurring in T6, T21, T22, T25, and T26. Natural runs should not be suppressed simply to force alternation.

Longest-option cue rate

Length means whitespace-normalized source-text characters, excluding option labels. These are printed-key measurements, not rendered-width measurements.

Measurement	Result
Key is strictly longer than every distractor	54/1,520 = 3.55%
Key is tied for or uniquely longest	959/1,520 = 63.09%
Items with one uniquely longest option	491
Key is that uniquely longest option	54/491 = 11.00%
Uniquely longest option is a distractor	437/491 = 89.00%
All four choices have equal length	487

The high tie-inclusive percentage is mostly a tie effect: the corresponding uniform-key baseline is 62.81%. Randomly selecting among the longest choices would score 22.29% against the printed keys.

There is no useful overall “choose the longest” advantage. The stronger tendency is the reverse: a uniquely longest choice is usually a distractor.

Separated by publisher subtest tags:

Pool	Strictly longest key	Including ties
AR, 760 items	33 — 4.34%	557 — 73.29%
MK, 760 items	21 — 2.76%	402 — 52.89%
Per-drill answer-key cycles

No exact repeating cycle was found in any of the 35 complete drill sequences, or in the 70 separately extracted AR/MK drill sequences.

Checks covered whole-sequence periods up to half the sequence length, plus nonconstant local periods of 2–6 spanning at least 12 items and three repetitions.

The final column below is the best-fitting repeated permutation of A/B/C/D among all 24 permutations. It is descriptive—not a detected cycle or proof of manipulation. Both length columns are counts.

Drill	Items	Strict longest	Including ties	Maximum run	Best four-letter fit
T1	43	2	27	3	ADBC: 15/43
T2	43	0	31	3	DABC: 17/43
T3	43	0	25	3	BDCA: 18/43
T4	43	2	28	3	CADB: 14/43
T5	43	0	29	3	ADBC: 14/43
T6	43	3	31	5	ABCD: 16/43
T7	43	4	31	4	DCAB: 16/43
T8	43	2	32	4	DBAC: 14/43
T9	43	1	20	3	ADCB: 15/43
T10	43	1	27	4	ACDB: 16/43
T11	43	3	29	4	DCBA: 17/43
T12	43	2	25	3	ACBD: 18/43
T13	43	0	24	3	ABCD: 16/43
T14	43	1	27	3	ADCB: 18/43
T15	43	1	23	3	DCBA: 18/43
T16	43	2	25	3	ABDC: 16/43
T17	43	1	26	3	ABCD: 14/43
T18	43	4	26	2	DABC: 16/43
T19	43	0	26	3	CDAB: 15/43
T20	43	0	25	2	BCDA: 16/43
T21	44	2	27	5	ADCB: 15/44
T22	44	3	25	5	ACDB: 16/44
T23	44	2	33	3	ABDC: 16/44
T24	44	2	31	3	CABD: 18/44
T25	44	2	30	5	CADB: 17/44
T26	44	1	29	5	DCAB: 16/44
T27	44	1	28	3	ACDB: 13/44
T28	44	1	25	3	CDAB: 17/44
T29	44	2	24	3	BCAD: 16/44
T30	44	2	32	4	ACDB: 14/44
T31	44	1	28	3	CDAB: 15/44
T32	44	0	28	4	BCDA: 18/44
T33	44	1	30	3	ADBC: 19/44
T34	44	3	28	3	ABDC: 16/44
T35	44	2	24	4	ABDC: 16/44

The 
B24 audit evidence ledger contains all item results, option-equivalence checks, explanation assertions, internal-repeat groups, complete key sequences, and the separate AR/MK sequence checks.

7. TOP FIXES

Quarantine the 13 answer-set defects. Start with T1Q28, T14Q43, T19Q42, and T24Q43; repair the generators, not just individual key letters. Re-score affected retained attempts where possible.

Correct all 18 distance derivations. Fix negative-component formatting at its source; use T3Q42, T4Q17, T13Q42, and T35Q34 as regression cases.

Correct all 20 salary sign errors and label monetary units. Regression cases: T1Q7, T14Q34, T23Q23, and T27Q1.

Repair dependent-system reasoning and rounding completion. Remove false uniqueness in T19Q42/T22Q24/T25Q10/T28Q36, and complete the requested precision in T10Q20/T18Q18.

Separate prerequisite arithmetic from authentic AR practice. Reclassify or contextualize the bare calculations represented by T1Q3, T1Q23, T2Q2, and T2Q4; do not count all 760 tagged items as equivalent AR-style preparation.

Broaden applied AR scenarios. Replace some repeated school-survey, marble, and generic unit-price slots—such as T1Q1, T1Q15, T1Q29, and T1Q43—with varied time-rate, unit-conversion, and multistep practical reasoning.

Provide distinct practice and assessment modes. Keep T1–T35 as explicitly labeled mixed drills, or assemble separate AR/MK assessments with the appropriate paper or proctored-CAT rules. Do not describe static alternation as adaptation.

Deduplicate and diversify distractors. Address T28Q11/T28Q33, T23Q14/T23Q44, and the six duplicated-distractor pairs; reduce the repeated probability-above-one cue exemplified by T1Q5/T1Q33.

Improve worked teaching and visual variety. Replace catch-all decimal instructions in T1Q17/T2Q14 and add diagram-based geometry alongside verbal tasks such as T1Q20/T1Q32.

Repair release diagnostics and score labeling. Reset run checks at boundaries such as T16Q43/T17Q1 and T23Q44/T24Q1, expose per-item skill tags, and keep scores from T1–T35 labeled as practice results unless a separate ASVAB/AFQT validation supports stronger claims.

8. SUMMARY ROW

| B24 — ASVAB Math Prep | 4.0/10 | 11 multiple-answer + 2 rounding-answer defects | 44: 42 false + 2 precision failures | PULL | 51 distinct defective items; AR pool overstates applied-word-problem coverage; no detected key cycle. |