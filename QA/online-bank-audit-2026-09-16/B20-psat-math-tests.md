# B20 — Digital PSAT/NMSQT Math: 10 Practice Tests — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/psat-math-tests.json` — 1584 questions / 36 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 4.0/10

Audit dimension	Score
Answer-key correctness	9.0/10
Explanation accuracy	8.0/10
Item quality and distractors	2.0/10
Exam-blueprint alignment and simulator fidelity	1.0/10
Structural hygiene	5.5/10

The supplied forms are not faithful full-length Digital PSAT/NMSQT Math simulations. They have the correct total length, but every form separates topics into the same four blocks. Splitting them after Q22 leaves all 36 first modules without geometry and 23 first modules without Problem-Solving and Data Analysis. The real test includes all four domains in each module. The export also contains exclusively multiple-choice items, with no student-produced-response definitions. 

psat-math-tests

 
SAT Suite

Nine items have multiple correct answers, and seven explanations contain confirmed mathematical errors. The most serious generator failure is T9Q10, where all four points solve the dependent system but the explanation arbitrarily selects one. 

psat-math-tests

Overlap: all 51 B20 solving-template families already occur in both B12 and B17. Conservative same-givens matching identifies 56 B20 items overlapping B12, 83 overlapping B17, and 103 overlapping either bank—6.5% of B20, after removing overlap between those counts.

Longest-option cue: the keyed answer is uniquely longest in 86/1,584 items—5.4%. Including ties, it is longest in 854/1,584—53.9%. The inclusive figure is not a longest-answer strategy’s accuracy.

Audit coverage: I independently recomputed all 1,584 items, evaluated all 6,336 options, and checked all 9,504 within-item option pairs for mathematical equivalence. No parser failures remained unresolved. Direct editorial review covered 381 complete items and their explanations—24.1%: all of Tests 1, 2 and 36; fixed positions across all forms; representatives of every solving family; every computationally flagged item; and targeted overlap, repetition and sequencing examples. The complete B12 and B17 exports were processed for comparison, not subjected to another full manual editorial audit.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
One dependent system has four correct choices

T9Q10 — The equations are equivalent, and every offered point satisfies both — correct keys: A, B, C and D.

5x+5y=25

is simply five times x+y=5. A (4,1), B (1,4), C (2,3), and D (5,0) all work. Printed key B is not uniquely correct. This system is underdetermined, not inconsistent; changing its single-letter key would not repair it. 

psat-math-tests

Eight absolute-value items duplicate the correct solution set

In each item, reversing the order of the two roots creates a second correct option.

Item	What is wrong	Correct keys
T2Q23	(	x
T5Q28	(	4x
T9Q24	(	2x
T18Q28	(	2x
T26Q28	(	4x
T31Q20	(	3x
T32Q26	(	2x
T36Q28	(	x

These failures affect eight of the 39 absolute-value-equation items—20.5% of that family. The zero constant is exposing a predictable generator defect.

Count: nine multi-answer items. No additional wrong-letter-only item or item lacking a valid offered answer was found in the full computational pass.

3. EXPLANATION ERRORS
One explanation infers a particular solution from an identity

T9Q10 — 0y=0 does not imply y=4.

The explanation chooses y=4, x=1, but the identity adds no restriction to x+y=5. Required correction: explain dependence and nonuniqueness, and repair the single-answer question. 

psat-math-tests

Six salary-decrease explanations contain false signed equalities

The percentage decrease identified by each key is correct. The explanation incorrectly turns a negative quotient into a positive number.

Item	Incorrect displayed equality	Required correction; retain key
T4Q32	(−8)/20=0.4	(−8)/20=−0.4; C, 40% decrease. 

psat-math-tests


T5Q33	(−12)/40=0.3	(−12)/40=−0.3; A, 30% decrease. 

psat-math-tests


T15Q32	(−24)/60=0.4	(−24)/60=−0.4; B, 40% decrease. 

psat-math-tests


T20Q35	(−24)/200=0.12	(−24)/200=−0.12; B, 12% decrease. 

psat-math-tests


T25Q37	(−40)/200=0.2	(−40)/200=−0.2; B, 20% decrease. 

psat-math-tests


T29Q37	(−32)/80=0.4	(−32)/80=−0.4; D, 40% decrease. 

psat-math-tests

The generator must distinguish signed percentage change, (new−old)/old, from the positive magnitude of a decrease, (old−new)/old. Either method works when used consistently.

T4Q32 and the other salary-template instances — units are also silently rescaled. An $8,000 reduction becomes “Change = −8” without declaring thousands of dollars. State the scaling or retain the original dollar amounts. This is a presentation defect separate from the six false equalities. 

psat-math-tests

Confirmed explanation-error total: seven—one invalid system inference and six sign errors. T9Q10 also appears in Section 2; it is not an additional unique question.

4. ITEM QUALITY
Overlap with B12 and B17

The comparison covers B20 T1Q1–T36Q44, B12 T1Q1–T35Q44, and B17 T1Q1–T36Q44. These are the online-bank exports, not the printed books. 

psat-math

 

psat-math-workbook

Comparison measure	Against B12	Against B17
Identical stems after case/whitespace normalization	0	0
Same mathematical givens and task after conservative normalization	56 — 3.5%	83 — 5.2%
B20 solving-template families already present	51 of 51	51 of 51
New B20 solving-template families	0	0

Across the two comparison banks, 103 distinct B20 items—6.5%—repeat a same-givens task. Thirty-six match both banks, so adding 56 and 83 would overstate the combined count.

A solving-template family is an audit-defined procedure, not an official College Board construct code. The 100% family overlap does not mean every item is an exact duplicate. It means B20 supplies no new type of solving procedure under this classification.

The detected matches include reordered data sets, permuted box dimensions, reversed factors and unit-price wording changes. Questions were not counted merely because their final answers matched.

B20 item and comparison item	Substantive repetition
B20 T2Q6 ↔ B12 T10Q34	Two pounds cost $16; find the cost of five pounds. Dollar notation moves between the stem and choices, but the task remains unchanged. 

psat-math-tests

 

psat-math


B20 T2Q24 ↔ B12 T31Q18	(x+2)(x−5) becomes (x−5)(x+2). Same product and distractor values. 

psat-math-tests

 

psat-math


B20 T3Q33 ↔ B12 T2Q12 ↔ B17 T3Q31	The same values 7–11 are reordered. All ask for the mean, 9. 

psat-math-tests

 

psat-math

 

psat-math-workbook


B20 T1Q38 ↔ B17 T31Q39	Box dimensions 10,11,2 become 2,11,10. Both volumes are 220. 

psat-math-tests

 

psat-math-workbook


B20 T3Q35 ↔ B17 T8Q12	Three pounds cost $9; find the price of six pounds. The mathematical givens and procedure are identical. 

psat-math-tests

 

psat-math-workbook

Customer-value finding: B20 mostly adds numerical variants of existing procedures. Its proposed distinction—full-length simulation—is precisely what the supplied assembly fails to deliver. It cannot establish independent readiness merely by rearranging and resampling familiar templates.

The concentration increases rather than broadens:

Solving family	B12	B17	B20
Composition of two linear functions	26	102	186
Vertex read from vertex form	23	97	110
Minimum read from vertex form	14	61	94
Rectangular-box volume	33	72	92

B20 examples are T1Q19/T1Q23/T1Q29, T2Q18/T2Q20/T2Q25/T2Q28/T2Q30, and T36Q16/T36Q20/T36Q24. These repeat substitution or reading an already-exposed value rather than introduce different representations. 

psat-math-tests +4

Internal duplication and excessive clustering

T1Q1–T36Q44 — Conservative same-givens normalization identifies 29 repeated-task groups involving 79 positions: 50 redundant occurrences beyond the first.

T14Q31/T14Q33 repeat the same mean problem using 12–16. T26Q32/T26Q34 repeat the mean of 19–23, including identical option order. Across B20, all 53 simple-mean items use five consecutive integers, with only 19 distinct underlying data sets. 

psat-math-tests

T34Q16, Q18–Q23, Q25–Q27 and Q30 — Eleven of one form’s 44 questions require composition of two linear functions. That is 25% of the entire form, and 73.3% of its nominal advanced-math block. It does not resemble balanced sampling of readiness skills. 

psat-math-tests

T36Q38–Q42 and T36Q44 — Six of the final seven questions repeat third-angle subtraction. The remaining question, T36Q43, is direct box-volume multiplication. This ending is particularly unsuitable for representing the upper difficulty range of a second module. 

psat-math-tests

T1Q13 and T36Q9/T36Q10 — System-classification practice repeatedly yields the same outcome. All 22 items in this family present parallel lines with different intercepts and therefore no solution. The keys are correct; the coverage is narrow. 

psat-math-tests +1

Equivalent and implausible distractors

T12Q18 — A and C are equivalent incomplete solutions — retain key B.

For ∣2x−4∣=4, the complete solution set is {0,4}. “x=4” and “x=4 only” are not distinct distractors. 

psat-math-tests

T2Q23 and T36Q28 also have equivalent distractor pairs in addition to their duplicated correct answers. Across the bank, there are 11 mathematically equivalent choice pairs in nine items: eight correct-choice pairs and three distractor pairs. The dependent system’s four choices are different points, so its failure is separate. 

psat-math-tests +1

T1Q37 — 13/8 is offered as a probability. Overall, 41 of 61 marble-probability items contain an option greater than 1. T2Q32 offers an original price of zero despite a positive price after discount. These permit elimination before performing the intended calculation. 

psat-math-tests +1

T1Q5 — The fixed-fee interpretation is conspicuously longer than the alternatives. All six fixed-fee items exhibit this local cue, although the bank-wide longest-option strategy is not advantageous. 

psat-math-tests

Visual and contextual fidelity

T1Q1–T36Q44 — No displayed graph, geometric diagram or data-table stimulus was found. A question mentioning a graph, such as T1Q18, instead gives an equation and asks for a value directly visible in its form. No explicit dependence on a missing figure was established; the defect is missing visual interpretation practice. 

psat-math-tests +1

T2Q31 — The survey percentage needs an approximation qualifier. Exactly 25% of 250 respondents would be 62.5 people. A rounded percentage is plausible, but that rounding should be stated. The projected answer remains 2,500; this is not another scoring defect. 

psat-math-tests

5. BLUEPRINT COVERAGE
Official benchmark

I used College Board’s Assessment Framework for the Digital SAT Suite, version 3.01, August 2024, cross-checked against the Fall 2026 PSAT/NMSQT Student Guide and current program-specific content specifications on 16 September 2026. The target is the standard adaptive PSAT/NMSQT Math section, not PSAT 8/9 or the SAT. 
SAT Suite
+1

Simulator structure: length matches; assembly does not

The real Math section has two separately timed 35-minute modules, each containing 20 operational questions and two pretest questions. Each module samples all four domains and proceeds from easier to harder questions. 
SAT Suite

T1Q1–T36Q44 — Every supplied form uses this sequence:

Positions	Observed block	Consequence of splitting after Q22
Q1–Q15	Linear equations, lines, systems and related tasks	All appear in the first half.
Q16–Q30	Nonlinear expressions/functions and linear compositions	Seven positions in the first half; eight in the second.
Q31–Q37	Data summaries, probability, percentages and rates	Entire block appears in the second half.
Q38–Q44	Geometry	Entire block appears in the second half.

This is topic-block assembly, not a representative module design. The first and last supplied forms exhibit the same ordering. 

psat-math-tests +3

The computational consequences are:

T1Q1–T36Q22 — All 36 first halves contain zero geometry items. Only 17 unit-price questions supply identifiable Problem-Solving and Data Analysis content in these halves, distributed across 13 forms. Thus 23 first halves also contain zero items from that domain.

T1Q23–T36Q44 — Every second half concentrates all seven geometry positions and all seven dedicated data/percentage positions. Renaming these halves “Module 1” and “Module 2” would not repair the imbalance.

Difficulty progression is not established

T1Q21 → T1Q22 — A factor-theorem calculation is followed by a direct y-intercept reading at the end of the putative first module. The sequence follows the topic block, not an evident progression in reasoning demand. 

psat-math-tests

T36Q38–Q44 — The putative second module ends with six angle-subtraction questions and one box-volume calculation. That supplies repeated routine work, not evidence of the intended harder-question range. 

psat-math-tests

The export contains no calibrated difficulty estimates, response-time data or student-response evidence. Therefore I am not assigning a psychometrically measured percentage of “too easy” items. The defensible finding is that the bank does not demonstrate difficulty-calibrated module assembly and contains substantial procedural repetition at positions that should help distinguish stronger performance.

Adaptive routing, timing and scoring remain unverified

The actual test routes students to a second module based on first-module performance. Both second-module routes contain mixed difficulty; they differ in their distribution of difficulty, not by making every question easy or every question hard. Scores use information from both modules. 
SAT Suite

T1Q1–T36Q44 — The export contains no module assignments, alternate-route definitions, routing rule, difficulty metadata or calibrated scoring model. This does not prove that the live website lacks such code elsewhere. It means this export does not establish those capabilities, while its supplied ordering demonstrably fails balanced module construction.

The live implementation also needs independent verification of separate timers, module transitions, permitted review within a module, calculator/reference access and answer-input behavior. The current guide describes embedded calculator and reference tools; none is documented by the question export. 
SAT Suite

A raw percentage correct on these repeated templates should not be represented as a validated PSAT score prediction. Official scoring is not simply a fixed conversion from the number correct; item characteristics can affect the resulting score. 
SAT Suite

Response-format failure

T1Q1–T36Q44 — All 1,584 items are four-option multiple choice. No student-produced-response definitions, accepted-answer sets or entry instructions are exported. 

psat-math-tests

The formal specification allocates approximately 75% multiple choice and 25% student-produced response among operational Math questions—approximately 8–12 student-produced responses out of 40 operational questions. This is a material simulator mismatch, not merely an optional workbook feature. 
SAT Suite

Hiding options is insufficient: the scoring system must handle appropriate numerical forms and the stem must specify what to enter. For example, the complete-set wording in T2Q23 would need separate design consideration rather than automatic conversion into a single numeric-entry box. 

psat-math-tests

Domain weighting
Domain	Official PSAT/NMSQT allocation	B20’s apparent positional allocation
Algebra	35%	540 — 34.1%
Advanced Math	32.5%	540 — 34.1%
Problem-Solving and Data Analysis	20%	252 — 15.9%
Geometry and Trigonometry	12.5%	252 — 15.9%

Official weights are program-specific; B20’s column describes its observed blocks, not verified publisher tags. The export’s topTags is empty. 
SAT Suite
 

psat-math-tests

Moving the 17 first-block unit-price questions into Problem-Solving and Data Analysis produces 523 Algebra-like items—33.0%—and 269 data-analysis items—17.0%. Geometry remains 15.9%.

There is also a material classification ambiguity: 186 nominal advanced-block items compose two linear functions. Assigning them to Algebra instead produces 44.8% Algebra and 22.3% Advanced Math. I would not certify either allocation as official without item-level adjudication. Regardless of classification, repeated linear substitution does not establish broad nonlinear preparation. T34’s eleven-item composition cluster illustrates the problem. 

psat-math-tests

Seventy circle-equation items are outside the detailed PSAT specifications

T1Q40/T1Q42 and T35Q43 exemplify 49 circle-radius and 21 circle-center questions—70 items, or 4.4% of the bank and 27.8% of its geometry block. 

psat-math-tests +1

The detailed framework and current content-domain page identify the Circles topic as SAT-only. The Fall 2026 PSAT guide likewise omits that topic from its geometry testing points. I therefore count these coordinate-circle questions as off-target for the specified PSAT simulator. This does not exclude ordinary area/volume applications involving round objects. 
SAT Suite
+1

Official-source inconsistency remains: a student-facing PSAT overview lists Circles. It conflicts with the detailed specifications and current guide used here. That conflict should be documented rather than silently treating SAT and PSAT scope as identical. 
SAT Suite

T1Q21/T1Q25 — The 39 cubic-factor-parameter items need explicit testing-point justification. A cubic expression is not automatically beyond PSAT scope, but repeatedly invoking the factor theorem is not a substitute for demonstrating coverage of the specified nonlinear tasks. I have not added these 39 items to the confirmed 70-item circle count. 

psat-math-tests +1

Missing breadth

Geometry — T1Q38/T1Q39/T1Q40 and T35Q43 represent the entire four-family allocation: 92 box volumes, 90 third-angle calculations, 49 circle-radius readings and 21 circle-center readings. There is no right-triangle/Pythagorean, right-triangle trigonometry, similarity, scale-factor or composite-figure family. Right-triangle trigonometry is within PSAT/NMSQT scope; it is not excluded as it is for PSAT 8/9. 

psat-math-tests +1

 
SAT Suite

Data analysis — T1Q31–Q37 illustrate the repeated list-summary and marble-probability formats. The bank contains 126 simple mean/median/range items, 61 marble-probability items and 23 sample projections, but no displayed scatterplot/model interpretation, conditional-probability or standard-deviation-comparison family. Those are relevant PSAT testing points. 

psat-math-tests

 
SAT Suite

Advanced Math — T1Q16/T1Q18/T1Q19/T1Q22 illustrate how 420 of the 540 positions—77.8%—are filled by linear composition or directly reading a quadratic’s vertex, minimum or y-intercept. There are only three general quadratic-equation-solving items, five binomial-product items and one rational-expression item. No substantive nonlinear-system or displayed nonlinear-graph interpretation family was found. 

psat-math-tests +1

Algebra — T1Q8–Q10 repeatedly evaluate linear functions, while T1Q13 tests one system outcome. There is no meaningful use of displayed tables/graphs to translate, compare or construct linear relationships. The quantity of substitutions does not establish representation breadth. 

psat-math-tests +1

6. STRUCTURAL CHECK

Scope: T1Q1–T36Q44.

Section A finding	Independent result
1,584 questions across 36 forms	Confirmed: exactly 44 per form.
Four choices per item	Confirmed: 6,336 options.
Invalid key letters or missing choices	None found.
Missing explanations	None found.
Duplicate choice strings	None found, but 11 mathematical-equivalence pairs occur in nine items.
Duplicate normalized stems	None within B20, but 29 same-givens repeated-task groups occur.
Very short explanations: 772	Reproduced using fewer than 40 characters, not words.
Image references	Zero; no explicit broken-image dependency established.
Domain/skill tags	No item-level tags exposed; topTags empty.
Long same-answer runs	All 14 global runs are listed, but one crosses a form boundary.

Section A’s string/count findings are reproduced. They do not establish unique correct answers, independent practice or simulator fidelity. 

psat-math-tests

The title’s “10 Practice Tests” versus 36 online forms is not itself a defect. This audit concerns the uploaded online bank. I have not inferred a mismatch in the printed book’s promised contents from that title alone. 

psat-math-tests

Longest-option cue rate

Lengths exclude the answer letter and retain mathematical signs, punctuation and internal spaces.

Measure	Count	Fraction
Keyed answer is uniquely longest	86	5.4%
Keyed answer is tied for longest	768	48.5%
Keyed answer is longest including ties	854	53.9%
All four options have identical length	271	17.1%

The final row is a subset of tied cases, not an additional category.

Choosing uniformly among the longest options would produce an expected 23.1% match to the supplied keys. Therefore 53.9% must not be presented as a successful longest-answer heuristic. There is no positive bank-wide advantage, although the six fixed-fee items, exemplified by T1Q5, retain a local length cue. 

psat-math-tests

Answer distribution and periodicity

The supplied totals are reproduced: A400, B399, C406 and D379. The best-fitting repeating permutation of A/B/C/D matches 443/1,584 keys—28.0%. This optimized descriptive check does not show near-deterministic cycling, and it does not justify changing correct answers to force equal letter totals. 

psat-math-tests

Same-letter runs

There are 13 within-form runs of at least four identical keys, with a maximum length of six.

T16Q34–T16Q39 is the six-C run. It is real, but the run itself is not evidence that the keys are wrong. 

psat-math-tests

T33Q42–T33Q44 followed by T34Q1 produces Section A’s “T34Q1 key A ×4.” It crosses a form boundary. Unlike several earlier banks, this report’s global list is complete rather than truncated; the correction is to reset detection at each form boundary. 

psat-math-tests

Explanation length

772/1,584 = 48.7% of explanations are under 40 characters; median length is 41 characters.

Short explanations are not automatically defective: T1Q17 can explain its direct y-intercept calculation briefly. Conversely, the longer T9Q10 explanation teaches an invalid inference. For a commercial simulator, correctness and instructional sufficiency—not a character minimum—should control release. 

psat-math-tests +1

7. TOP FIXES

Quarantine the nine multi-answer items: T2Q23, T5Q28, T9Q10, T9Q24, T18Q28, T26Q28, T31Q20, T32Q26 and T36Q28. Review affected customer scores; do not preserve arbitrary single keys.

Rebuild all 36 forms as actual modules, not halves of topic blocks. Across T1Q1–T36Q44, assign two balanced 22-question modules, each sampling all four domains. The current Q38–Q44 geometry block must not remain wholly in Module 2.

Validate adaptive routing and difficulty assembly before restoring simulator claims. Use independently specified Module 1 and alternate Module 2 routes. Replace the repeated routine ending exemplified by T36Q38–Q44; random shuffling alone will not create calibrated progression.

Implement purpose-built student-produced responses and test their scoring. Address the all-multiple-choice format across T1Q1–T36Q44. Validate accepted numerical forms and instructions rather than automatically hiding choices, especially for complete-solution-set stems such as T2Q23.

Repair the shared mathematical generators. Normalize unordered solution sets for all eight defective absolute-value items; require unique solvability for T9Q10-type systems; replace the equivalent distractor in T12Q18.

Correct all seven faulty explanations. Repair T9Q10 and the six salary calculations listed in Section 3. Retain valid salary keys, preserve negative quotients and declare units.

Remove or segregate the 70 coordinate-circle items from core PSAT simulations under the detailed specifications. Start with T1Q40/T1Q42/T35Q43. Replace their allocation with missing right-triangle, trigonometric, similarity and visual-geometry tasks; document the conflicting overview page.

Diversify the item pool and impose family-concentration limits. Reduce T34’s eleven-composition cluster, T36’s six-angle ending and T1Q31–Q37-style data repetition. Add nonlinear systems, graphical interpretation, conditional probability and varied algebraic representations.

Differentiate B20 from B12/B17 and enforce semantic deduplication. Remove same-givens repeats such as B20 T2Q6/T2Q24/T3Q33/T1Q38/T3Q35, and prevent within-form duplicates such as T14Q31/T14Q33 and T26Q32/T26Q34. Reused practice items should not masquerade as fresh readiness measurements.

Verify production delivery and rerun the complete regression audit. Check separate timers, module transitions, review restrictions, calculator/reference access, response entry and scoring claims. Correct the cross-boundary run around T33Q44/T34Q1, and retain separate strict-longest and tied-longest metrics.

8. SUMMARY ROW

| B20 — Digital PSAT/NMSQT Math: 10 Practice Tests | 4.0/10 | 9 multi-answer items | 7 confirmed | PULL | Length-correct but not a faithful simulator: unbalanced module halves, no typed responses; all 51 task families shared with B12/B17, 103 same-givens overlaps; uniquely longest key 5.4%. |