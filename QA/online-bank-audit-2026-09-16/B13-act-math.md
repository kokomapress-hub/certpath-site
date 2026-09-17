# B13 — ACT Math Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/act-math.json` — 1530 questions / 34 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 6.0/10

Audit dimension	Score
Answer-key correctness	9.0/10
Explanation accuracy	7.0/10
Item quality and distractors	3.0/10
Exam-blueprint alignment	4.0/10
Structural hygiene	7.0/10

Eight items have scoring defects: six admit multiple correct choices, and two omit the answer at the precision requested. There are also 46 confirmed explanation defects. These are recurring generator failures, not isolated proofreading issues. The clearest example is T6Q18, where all four choices satisfy the system, but the explanation treats an identity as determining one particular solution. 

act-math

This is not a legacy 60-question ACT-format bank. Every drill contains 45 questions with four options, and its stated category allocation follows the Enhanced ACT’s 80%/20% split. The legacy Math test had 60 questions; Enhanced Math has 45, with answer choices reduced from five to four. The problem here is Enhanced-format packaging around narrow, repetitive, sometimes misclassified content, rather than an unchanged old-format bank. 

act-math +1

 
ACT
+1

Audit coverage: I independently recomputed all 1,530 items programmatically and checked all 6,120 options, including mathematical equivalence between choices. I directly read 289 unique items: positions Q1, Q12, Q23, Q34 and Q45 in every drill, the first example of each of 74 solving families, and every item flagged by the key, equivalence, explanation-pattern and ordinal checks. This is a full-bank computational audit with targeted editorial review—not a claim that every explanation received a separate manual copyedit. Explanation counts below are confirmed findings.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

T3Q21 — No choice satisfies the requested rounding.
The net change is 100(1.25×0.85−1)=6.25%. The stem asks for the nearest tenth of a percent, so the answer is +6.3%, not the keyed B, +6.25%. B is the correct unrounded result. Correct key: none as written; required answer +6.3%. 

act-math

T6Q18 — All four choices are correct.
The equations 5x+5y=45 and x+y=9 describe the same line. A (2,7), B (9,0), C (8,1), and D (1,8) all satisfy both equations. Correct key: A, B, C and D; no unique answer. This requires repairing or replacing the item, not selecting another single key. 

act-math

T12Q23 — Two choices express the same complete solution set.
∣3x∣=12 gives x=±4. B lists 4,−4; D lists −4,4. Changing the order does not change the solution set. Correct key: B and D. 

act-math

T13Q27 — Reversing the factors created a second correct answer.
Both A, (x−1)(x+1), and B, (x+1)(x−1), equal x
2
−1. Correct key: A and B. 

act-math

T15Q40 — No choice satisfies the requested rounding.
The net change is 100(1.15×0.75−1)=−13.75%. Rounded to the nearest tenth, this is −13.8%. The keyed A gives the unrounded value. Correct key: none as written; required answer −13.8%. 

act-math

T22Q29 — Adding or subtracting 0x does not distinguish choices.
A, x
2
+0x−16, and B, x
2
−0x−16, both equal (x−4)(x+4). Correct key: A and B. 

act-math

T29Q13 — Both correct choices and both distractors are equivalent pairs.
1.25×0.80=1, so the net change is zero. A, 0.0%, and B, 0%, are numerically identical; C, 5%, and D, 5.0%, are also identical. Decimal formatting cannot serve as the substantive distinction between these choices. Correct key: A and B. 

act-math

T30Q29 — Reversed factors again create two correct answers.
A, (x−4)(x+4), and B, (x+4)(x−4), both equal x
2
−16. Correct key: A and B. 

act-math(1)

Count: 8 scoring-defective items—6 ambiguous and 2 missing the correctly rounded answer. No additional key mismatch was found by the full-bank computational checks.

3. EXPLANATION ERRORS

Confirmed total: 46 distinct explanations—27 sign errors, 16 distance-calculation errors, one invalid inference, and two failures to complete the requested rounding.

Salary-change explanations: 27 false signed equalities

Affected IDs:
T1Q14, T1Q33, T2Q28, T2Q43, T7Q16, T8Q27, T9Q38, T10Q1, T11Q5, T14Q42, T16Q3, T17Q34, T18Q15, T21Q29, T21Q40, T21Q42, T23Q26, T23Q43, T24Q14, T24Q42, T28Q4, T28Q32, T29Q30, T30Q5, T30Q33, T33Q13, T34Q25.

What is wrong: Each explanation divides a negative change by a positive original salary and then displays a positive quotient. For example, T1Q14 asserts (−60)/200=0.3, whereas the quotient is −0.3. All 27 instances follow that same failure pattern. 

act-math(1)

Correction: Preserve the negative sign in the signed percent change, then interpret it as a decrease. Alternatively, calculate the positive magnitude of the decrease using original minus new salary. Do not mix those two approaches in one equality chain. The existing answer keys remain correct for these 27 items.

The salary explanations also scale dollar amounts to thousands without declaring the unit—for example, “Change = −60” for a $60,000 reduction in T1Q14. Make the scaling explicit while repairing the template. 

act-math(1)

Distance explanations: 16 incorrect squaring steps

Affected IDs:
T2Q20, T3Q16, T4Q33, T5Q14, T8Q42, T9Q12, T9Q40, T10Q2, T10Q9, T12Q21, T17Q13, T25Q38, T27Q7, T29Q2, T33Q26, T34Q11.

What is wrong: When the vertical difference is negative, the explanation prints subtraction of a positive square, then silently changes that subtraction into addition. T2Q20, for example, contains:

9
2
−12
2
	​

=
81+144
	​

.

That equality is false. The correct substitution is:

9
2
+(−12)
2
	​

=
81+144
	​

=15.

All 16 explanations contain this negative-coordinate formatting/calculation failure. Their final answers and keys remain correct. 

act-math(1)

Invalid inference and unfinished rounding

T6Q18 — An identity is presented as determining a unique value.
The explanation reaches 0y=0, then announces y=8. Nothing in that identity selects 8. The system has infinitely many solutions, including every offered pair. Correction: explain dependence and nonuniqueness; withdraw the single-key item. 

act-math

T3Q21 — The explanation stops at the exact result instead of the requested rounded result.
Correction: finish at +6.3%, not +6.25%. The underlying multiplication is correct. 

act-math

T15Q40 — The same rounding omission occurs.
Correction: finish at −13.8%, not −13.75%. Again, the multiplication itself is correct. 

act-math

The 46 count excludes merely short explanations and grammar defects. Three items—T3Q21, T6Q18 and T15Q40—also appear in the scoring-defect count.

4. ITEM QUALITY
Equivalent distractors remain in four otherwise correctly keyed items

These are additional to the equivalent correct choices identified in Section 2.

Item	Defect	Key to retain
T11Q42	A, 4/36, and C, 1/9, are identical distractors.	B: 1/12. 

act-math(1)


T20Q13	A, 4/6, and B, 2/3, are identical distractors.	D: 1/3. 

act-math(1)


T20Q43	A, −5.0%, and D, −5%, are identical distractors.	C: −10.0%. 

act-math(1)


T25Q23	B, 6/10, and C, 3/5, are identical distractors.	D: 2/5. 

act-math(1)

Across the bank, the equivalence check found nine affected items containing ten equivalent-choice pairs. T29Q13 contributes two pairs. T6Q18 is a separate multi-answer failure: its choices are different points, but all are valid solutions.

Repetition extends well beyond exact duplicate stems

T1Q17, T1Q23 and T1Q29 repeat the midpoint procedure three times in the same drill. T1Q13, T1Q15 and T1Q20 similarly repeat the same “not blue” marble calculation. These are numerical variants rather than meaningful changes in reasoning or representation. 

act-math +4

T8Q9 and T8Q34 are a stronger semantic duplicate: both ask for the mean of the same five numbers, 9 through 13, merely presented in a different order. Both answers are 11. An exact-stem comparison misses this duplication. 

act-math +1

T1Q6 and T2Q30 retain the same population of 5,000 and the same 20% sample proportion, changing the sample size from 500 to 100. Both still require exactly 0.20×5,000. That alteration does not test a different statistical decision. 

act-math +1

Distractors are sometimes dismissible without doing the intended work

T1Q13 offers 14/5 as a probability. T4Q30 offers a negative original price, and T8Q17 offers an original price of zero despite a positive price after discount. These can be eliminated using basic feasibility alone. Such distractors are not automatically forbidden, but repeating this approach weakens the bank’s challenge. 

act-math +2

Visible generator artifacts

T5Q24, T21Q22, T27Q33 and T28Q35 — “3th term” should be “3rd term.” Repair the ordinal-generation function, not just these four strings. 

act-math(1)

T13Q27, T22Q29 and T30Q29 retain zero-coefficient terms that collapse supposedly different choices into the same expression. Here, unsimplified output is not merely cosmetic; it creates scoring defects. 

act-math +1

 

act-math(1)

Figures and presentation

For T1Q1–T34Q45, the export contains no image references. I did not identify an item that explicitly requires a missing supplied figure; for example, T1Q45 provides the radius and sector angle in its text. The defect is absent visual practice, not a demonstrated broken-image dependency. 

act-math +1

The export alone does not establish whether notation such as the flat matrix in T2Q1 is rendered properly on the customer-facing interface. That requires a separate interface check. 

act-math

5. BLUEPRINT COVERAGE

Official benchmark: ACT’s Design Framework for the ACT Enhancements, version 2026.3, February 2026, particularly the final Table 2.2, checked alongside ACT’s current Mathematics Test Description. 
ACT
+2
ACT
+2

Format and category allocation

Enhanced Math contains 45 questions in 50 minutes: 41 scored questions and four embedded field-test questions. 
ACT

For T1Q1–T34Q45, the bank’s declared domain allocation is identical in every drill:

Reporting category	Current Enhanced allocation	Bank total	Per 45-item drill
Number & Quantity	10–12%	170 — 11.1%	5
Algebra	17–20%	272 — 17.8%	8
Functions	17–20%	272 — 17.8%	8
Geometry	17–20%	306 — 20.0%	9
Statistics & Probability	12–15%	204 — 13.3%	6
Integrating Essential Skills	20%	306 — 20.0%	9

The first five categories collectively form Preparing for Higher Math: 80%. Official percentages and the supplied totals support the comparison above. 
ACT
 

act-math

On the supplied labels, no main category is outside its Enhanced percentage range. Calling Geometry “overweight” merely because the drill contains nine questions would confuse a 45-item practice denominator with the official 41-scored-item denominator.

ACT’s final scored-item blueprint specifies 33 Preparing for Higher Math items and eight Integrating Essential Skills items. The five Higher Math subcategory ranges are respectively 4–5, 7–8, 7–8, 7–8 and 5–6 scored items. Modeling overlaps the other categories rather than adding another slice to the total. 
ACT

The apparent alignment weakens substantially when the content is examined

The following counts are my classification of the full bank’s solving families, not additional metadata copied from Section A.

Statistics & Probability — nominally 204 items, but only six recurring task families.
There are 53 range questions, 48 sample-to-population projections, 47 “not blue” marble questions, 39 “red marble” questions, 14 combinations questions and three dice-sum questions. The first four account for 187/204, or 91.7%, of the category. Examples include T1Q43, T1Q6, T1Q13 and T3Q42. 

act-math +3

The inventory contains no corresponding breadth in statistical graph interpretation, bivariate relationships, distributions, formal inference or conditional-probability reasoning. Moreover, ACT’s framework places basic probability, data summaries and informal sample-based estimation under Integrating Essential Skills. Consequently, labels on items such as T1Q6, T1Q13 and T1Q43 need substantive recoding review; the tagged 13.3% is not evidence of equivalent Higher Math statistical coverage. 
ACT

Geometry — 75.2% of the tagged category is concentrated in five elementary procedures.
Midpoints account for 69 items, third triangle angles for 60, circle radii for 36, distances for 33 and circle centers for 32: 230 of 306 items. Representative IDs are T1Q17, T1Q8, T2Q18, T2Q20 and T2Q32. The remaining families still do not supply meaningful coverage of geometric transformations, similarity reasoning, composite figures or surface-area problems. 

act-math +4

Number & Quantity — complex-number practice dominates the category.
Complex multiplication, complex addition and powers of i account for 90/170 items, or 52.9%. Examples are T1Q42, T1Q2 and T3Q15. The inventory has no vector questions and lacks substantive rational-exponent reasoning. The issue is allocation and breadth—not that complex numbers or matrices have become obsolete. Both remain within ACT’s stated scope. 

act-math +2

 
ACT

Functions — equation reading and substitution substantially outweigh representation and interpretation.
Examples include T1Q19 for substitution, T3Q19 for reading a constant as the y-intercept, and T1Q10 for identifying a vertex from vertex form. The inventory lacks domain/range analysis, piecewise-function tasks, inverse-function construction and genuine graph-based interpretation. Replacing some numeric variants with those task types would address missing breadth rather than merely increasing question count. 

act-math +2

Algebra — breadth is constrained by highly standardized equation forms.
For example, T2Q21 and T2Q22 cover cancellation in rational expressions, but that does not establish coverage of solving rational equations with domain restrictions. Systems practice includes the invalid dependent-system item T6Q18, while the inventory lacks nonlinear-system reasoning. 

act-math +1

Integrating Essential Skills — the label often accompanies isolated procedures rather than integration.
T4Q20 asks only for a decimal-to-percent conversion; T6Q14 asks only for a fraction-to-decimal conversion; T1Q36 asks for a direct mean. These are not individually invalid, but repeatedly filling the category this way does not establish the intended breadth of chained, nonroutine problem solving. 

act-math +2

 
ACT

Modeling — coverage cannot be certified from this export.
ACT specifies an overlapping Modeling allocation of at least approximately 20%. The export does not provide item-level Modeling flags. T3Q17 interprets a model parameter and T2Q16 applies a cost model, so the bank should not be described as having zero modeling. It needs explicit cross-tagging and review, particularly for evaluating or improving models rather than merely substituting into them. 
ACT
 

act-math +1

Exam simulation remains unverified.
The official blueprint orders questions by increasing difficulty. Late positions such as T1Q43 and T8Q45 still contain elementary range or y-intercept tasks, so the bank does not demonstrate an exam-like difficulty progression. The export contains no usable evidence about the live timer, field-test handling or score conversion. 
ACT
 

act-math +1

Scoring all 45 questions is permissible for a practice drill. It should not be represented as an official-style scored form or validated ACT score prediction without an appropriate scoring design.

6. STRUCTURAL CHECK

Scope: T1Q1–T34Q45.

Section A finding	Independent audit result
1,530 questions across 34 tests	Confirmed: every drill has exactly 45 items.
Four choices per item	Confirmed: 6,120 choices overall.
Invalid answer-key letters: zero	Confirmed structurally. This does not mean every keyed item has a unique correct answer.
Missing choices/explanations: zero	Confirmed.
Duplicate choices: zero	Confirmed only for identical choice strings within an item. Mathematical equivalence identifies nine affected items.
Four duplicate-stem groups/eight affected items	Confirmed.
Very short explanations: 485	Reproduced using fewer than 40 characters, not fewer than 40 words.
Long same-answer runs: 14	Confirmed. The reported IDs identify the ends of those runs.
Images: zero	Confirmed in the export. No broken referenced image was established.

The supplied structural report documents these fields, but its string-level checks do not test mathematical validity. 

act-math

Exact duplicate-stem pairs:
T2Q28/T11Q5; T21Q24/T26Q45; T21Q40/T29Q30; T21Q42/T24Q42. These are four redundant copies across eight affected positions—not eight additional unique questions. 

act-math

Answer-key distribution: A = 390, B = 378, C = 376, D = 386. The overall distribution does not justify a rebalancing intervention. Fixing mathematical correctness is more important than forcing letter quotas. 

act-math

Run interpretation: “T2Q33 key C ×5” means T2Q29–T2Q33, not five C answers beginning at T2Q33. Similarly, the six-C run ends at T3Q29, beginning at T3Q24. These runs are not themselves proof of a defective key. 

act-math

Explanation length: The 485 short explanations constitute 31.7% of the bank. A concise explanation such as T1Q13 can fully explain a one-step probability calculation; character count alone should not trigger rejection. By contrast, T6Q18 has a longer explanation that teaches an invalid inference. The release criterion should be correctness and instructional sufficiency, not a minimum length. 

act-math +1

Tag verification limitation: The domain totals can be independently reproduced. Section B does not expose all underlying skill tags, so I cannot independently certify every “topTags” skill count merely from its printed aggregate. 

act-math

7. TOP FIXES

Immediately quarantine the eight scoring-defective items: T3Q21, T6Q18, T12Q23, T13Q27, T15Q40, T22Q29, T29Q13 and T30Q29. Review affected historical scores where records permit. Do not resolve multi-answer items by arbitrarily retaining one letter.

Add generator-level uniqueness constraints. T6Q18 requires a nonzero determinant when a unique system solution is intended. T12Q23 requires solution-set normalization. T13Q27, T22Q29 and T30Q29 require symbolic equivalence checks; T29Q13 requires numeric normalization.

Regenerate all 16 defective distance explanations, beginning with T2Q20 and ending with T34Q11 in the complete ID list above. Parenthesize negative differences before squaring and validate every displayed equality.

Regenerate all 27 defective salary-decrease explanations, from T1Q14 through T34Q25 in the listed set. Preserve signed changes or explicitly use decrease magnitudes; declare the dollar units.

Enforce the requested precision consistently across stem, choices and explanation. T3Q21 and T15Q40 need correctly rounded offered answers. T29Q13 demonstrates why decimal formatting must also be normalized during duplicate checks.

Replace the equivalent distractors in T11Q42, T20Q13, T20Q43 and T25Q23. Retain their valid keys, but supply three genuinely distinct incorrect alternatives.

Rebuild the Statistics & Probability allocation rather than merely relabeling it. Replace part of the range/projection/marble concentration represented by T1Q43, T1Q6, T1Q13 and T3Q42 with the missing statistical task types; then audit the PHM/IES classification.

Diversify representations and reasoning across Geometry, Functions and Number & Quantity. Reduce repetitions represented by T1Q17/T1Q23/T1Q29, T1Q19/T3Q19 and T1Q42/T1Q2/T3Q15. Add graph-based work, geometric reasoning, vectors and broader function tasks.

Apply semantic duplicate controls during drill assembly. Block reordered-dataset duplicates such as T8Q9/T8Q34, exact duplicate-stem pairs, and excessive same-family repetition within a single drill.

Separate drill practice from exam simulation and validate the latter explicitly. Across T1Q1–T34Q45, verify timing, scoring design and difficulty order; cross-tag Modeling examples such as T3Q17/T2Q16. Do not infer simulation fidelity from the 45-question count alone.

8. SUMMARY ROW

| B13 — ACT Math Prep | 6.0/10 | 8: 6 ambiguous, 2 missing rounded answers | 46 confirmed | PULL | Enhanced-format allocation, not legacy 60-question ACT; scoring defects, repeated explanation errors and severe within-domain coverage gaps. |