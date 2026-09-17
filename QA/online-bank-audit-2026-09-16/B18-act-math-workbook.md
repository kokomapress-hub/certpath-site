# B18 — ACT Math Workbook — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/act-math-workbook.json` — 1540 questions / 35 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 5.0/10

Audit dimension	Score
Answer-key correctness	9.5/10
Explanation accuracy	8.5/10
Item quality and distractors	2.5/10
Exam-blueprint alignment	1.5/10
Structural hygiene	5.5/10

Four items have multiple correct answers, and six explanations contain mathematical errors. Two dependent-system questions score one point as uniquely correct even though every offered point satisfies both equations. Two other questions duplicate the correct solution set. 

act-math-workbook +1

The larger problem is ACT alignment. Every drill contains 44 questions, arranged in the same four-block pattern as the SAT/PSAT workbooks. Enhanced ACT Math has 45 questions in 50 minutes. A workbook drill may legitimately contain 44 questions, but these sets do not constitute full Enhanced ACT forms, and their content lacks substantial ACT coverage. This is not an unchanged old 60-question ACT bank; it is a different, inadequately aligned configuration. 

act-math-workbook

 
ACT

B13 overlap: all 55 B18 solving-template families already occur in B13. A conservative comparison identifies 40 B18 items—2.6%—with the same mathematical givens and task, despite presentation changes. Most remaining items provide different numerical instances of existing procedures, not complementary coverage.

Longest-option cue: the keyed answer is uniquely longest in 63/1,540 items—4.1%. Including ties, it is longest in 744/1,540—48.3%. The latter is not the success rate of a longest-answer strategy.

Audit coverage: I independently recomputed all 1,540 items, evaluated all 6,160 options, and compared all 9,240 within-item option pairs for mathematical equivalence. No parser failures remained unresolved. Editorial review covered 385 complete items, including their explanations—25.0%: all items in Tests 1–3 and 35; fixed positions across every drill; representatives of all 55 families; all computationally flagged items; and targeted repetition, overlap and structural checks. B13’s complete 1,530-item export was processed for comparison, not subjected to another full manual audit.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

T9Q2 — The system is dependent, and all four choices satisfy it — correct keys: A, B, C and D.

4x+4y=32

is simply four times x+y=8. The options (7,1), (2,6), (1,7), and (8,0) all work. Printed key C is not uniquely correct. 

act-math-workbook

T17Q5 — Another dependent system admits every offered point — correct keys: A, B, C and D.

5x+5y=55 and x+y=11 describe the same line. A (8,3), B (11,0), C (3,8), and D (9,2) all satisfy both equations. Printed key A is arbitrary. 

act-math-workbook

T30Q17 — Two choices express the same complete solution set — correct keys: B and C.

∣3x∣=6⟹x=±2.

B lists 2,−2; C lists −2,2. Reversing the order does not distinguish solution sets. 

act-math-workbook

T30Q19 — Reversing the quadratic roots creates a second correct choice — correct keys: B and C.

x
2
+x−2=(x+2)(x−1)=0

gives x=−2 or x=1. B and C contain exactly those roots. 

act-math-workbook

Count: four multi-answer items. No additional wrong-letter-only item or item lacking a valid offered answer was found. The two defective systems are underdetermined, not inconsistent; changing their single-letter keys would not repair them.

3. EXPLANATION ERRORS
Two explanations infer a particular solution from an identity

T9Q2 — 0y=0 does not imply y=7. The explanation chooses y=7, x=1, but any point satisfying x+y=8 solves the system. Required correction: explain dependence and nonuniqueness, and repair the corresponding single-answer question. 

act-math-workbook

T17Q5 — 0y=0 does not imply y=3. The remaining relationship is x+y=11; nothing selects (8,3) over the other offered points. Required correction: remove the invalid inference and repair the item. 

act-math-workbook

Four salary-decrease explanations contain false signed equalities
Item	Incorrect displayed calculation	Required correction; retain key
T1Q32	(−10)/25=0.4	(−10)/25=−0.4; C, 40% decrease. 

act-math-workbook


T19Q32	(−10)/100=0.1	(−10)/100=−0.1; B, 10% decrease. 

act-math-workbook


T21Q35	(−8)/80=0.1	(−8)/80=−0.1; A, 10% decrease. 

act-math-workbook


T33Q32	(−10)/40=0.25	(−10)/40=−0.25; C, 25% decrease. 

act-math-workbook

The generator must distinguish signed percentage change, (new−old)/old, from the positive magnitude of a decrease, (old−new)/old. Either method works when used consistently.

T1Q32 and the other salary-template instances — units are silently rescaled. A $10,000 decrease becomes “Change = −10” without declaring thousands of dollars. State the scaling or retain the original dollar amounts. This is a separate presentation defect, not an additional wrong key. 

act-math-workbook

Confirmed explanation-error total: six—two invalid system inferences and four sign errors. The two system items also appear in Section 2; they are not additional unique questions.

4. ITEM QUALITY
Overlap with B13: different numbers, narrower practice

The comparison covers B18 T1Q1–T35Q44 against B13 T1Q1–T34Q45. B13’s export contains 1,530 questions across 34 tests. 

act-math

Comparison measure	Result
Identical stems after normalizing case and whitespace	0 B18 items
Same mathematical givens and task after conservative normalization	40 B18 items — 2.6%
B18 solving-template families already present in B13	55 of 55 — 100%
New B18 solving-template families under this classification	0

A family here means an audit-defined procedure, such as evaluating two composed linear functions or finding a mean. It is not an official ACT construct code. The 100% family overlap does not mean every question is an exact duplicate.

The 40 same-givens matches comprise 22 reordered mean-data questions, six unit-price questions, six reordered-factor intercept questions, four permuted box-dimension questions, one reversed-angle question and one reversed binomial product. Questions were not counted merely because their answers matched.

B18 item ↔ B13 item	What is repeated
T3Q32 ↔ T2Q3	Four pounds cost $16; find the cost of seven pounds. Moving dollar notation between the stem and choices does not change the calculation. 

act-math-workbook

 

act-math(1)


T5Q32 ↔ T15Q28	The values 3–7 are reordered; both questions ask for their mean, 5. 

act-math-workbook

 

act-math(1)


T9Q40 ↔ T16Q24	Box dimensions 10,5,2 become 10,2,5. The volume remains 100. 

act-math-workbook

 

act-math(1)


T10Q20 ↔ T3Q38	The same factors, (x−2) and (x−1), are reversed. Both ask for the same intercepts. 

act-math-workbook

 

act-math(1)


T26Q26 ↔ T30Q9	(x+5)(x−3) becomes (x−3)(x+5), preserving the product and distractor values. 

act-math-workbook

 

act-math(1)

Customer-value finding: B18 primarily supplies more numerical instances of procedures already practiced in B13. It does not establish complementary ACT coverage.

The concentration increases: box-volume questions rise from 17 in B13 to 81 in B18, while vertex-reading questions rise from nine to 57. Meanwhile, B13 includes complex-number operations, matrices, sequences and trigonometric tasks that have no corresponding B18 family. Examples are B13 T1Q2, T2Q1, T1Q24 and T2Q10. 

act-math +3

Additional template-reuse evidence: 331 B18 stems—21.5%—match B17 after case/whitespace normalization; 324 also retain the same unordered option set. For example, B18 T1Q2 and B17 T1Q2 are identical, and B18 T1Q7 matches B17 T1Q8. This demonstrates shared content, not the direction in which it was copied. Shared elementary mathematics is not itself out of scope; the problem is the absence of ACT-specific breadth around it. 

act-math-workbook

 

psat-math-workbook

 

act-math-workbook

 

psat-math-workbook

Internal duplication and excessive clustering

T1Q1–T35Q44 — Conservative same-givens normalization identifies 34 repeated-task groups involving 81 items: 47 redundant copies beyond the first occurrence. These include reordered data, commutative products and permuted dimensions—not simply equal answers.

T35Q32 and T35Q36 — The same mean problem appears twice within one drill. Both use {7,8,9,10,11}, merely reordered, and both answers are 9. Across B18, all 46 simple-mean questions use five consecutive integers, with only 19 distinct data sets. 

act-math-workbook +1

T3Q35, T8Q32, T11Q31, T12Q36 and T34Q37 — Five presentations of the same five-number data set. Every question asks for the mean of 23–27, which is 25. 

act-math-workbook +1

T1Q38–T1Q42 and T1Q44 — Six box-volume questions occupy one drill’s seven geometry positions. That is 85.7% of its geometry block, without changing the required procedure. 

act-math-workbook +1

T19Q38–T19Q40 and T19Q42–T19Q44 — Six third-angle calculations occupy another seven-item geometry block. This is coefficient variation rather than varied geometric reasoning. 

act-math-workbook

T22Q1, T22Q3, T22Q11 and T22Q15 — Four system-classification questions all resolve through the same observation: equal slopes and different intercepts mean no solution. All 42 items in this classification family use that same outcome. 

act-math-workbook

Equivalent and giveaway distractors

T20Q20 — B and C are equivalent distractors — retain key A.

For ∣2x−4∣=4, the complete solution set is {0,4}. B, “x=4 only,” and C, “x=4,” express the same incomplete answer. Replace one with a genuinely different misconception. Together with T30Q17 and T30Q19, this produces three equivalent-choice pairs in three items. 

act-math-workbook

T1Q31 and T1Q37 — Probability distractors exceed 1. The offered 12/5 and 14/3 can be discarded before performing the intended calculation. 41 of the 65 marble-probability items contain at least one such option. These are distractor-quality defects, not additional wrong keys. 

act-math-workbook +1

T2Q11 — The fixed-fee interpretation is conspicuously longer than its alternatives. All 11 fixed-fee interpretation items have the key as the sole longest option, although the bank’s overall longest-option strategy is not advantageous. 

act-math-workbook

Wording and presentation

T2Q37, T15Q36 and T34Q34 — Clarify that survey percentages are rounded. The stated sample sizes and percentages imply 87.5, 87.5 and 37.5 respondents respectively. Rounded survey percentages are legitimate, so these are wording flags, not scoring defects; the projection keys remain valid. 

act-math-workbook +2

T1Q16 — “A 8% increase” should be “an 8% increase.” T1Q9 and T1Q28 repeat their final equation unnecessarily. These are template-cleanup issues, separate from the six mathematical explanation errors. 

act-math-workbook +2

T1Q1–T35Q44 — No displayed graph, data table or geometric diagram was found. Items such as T2Q21 mention a graph but supply an equation and ask for its vertex. No explicit broken-image dependency was established; the defect is missing visual interpretation practice. 

act-math-workbook +1

5. BLUEPRINT COVERAGE
Official benchmark

The benchmark is ACT’s Design Framework for the ACT Enhancements, version 2026.3, February 2026, using the final Table 2.2, checked alongside ACT’s current Mathematics Test Description on 16 September 2026. 
ACT
+1

Enhanced ACT reporting category	Official allocation	Scored items
Number and Quantity	10–12%	4–5
Algebra	17–20%	7–8
Functions	17–20%	7–8
Geometry	17–20%	7–8
Statistics and Probability	12–15%	5–6
Preparing for Higher Math subtotal	80%	33
Integrating Essential Skills	20%	8
Modeling—overlapping the other categories	At least 20%	At least 8

The section contains 41 scored questions plus four embedded field-test questions, not 45 scored questions. Modeling is an overlapping classification, not another slice added to the total. 
ACT

B18 has four positional blocks, not a verified ACT allocation

T1Q1–T35Q44 — Every drill follows this arrangement:

Positions in every drill	Observed content block	Bank total
Q1–Q15	Linear equations, lines, systems and related tasks	525 — 34.1%
Q16–Q30	Nonlinear expressions, equations and functions	525 — 34.1%
Q31–Q37	Data summaries, probability, percentages and rates	245 — 15.9%
Q38–Q44	Geometry	245 — 15.9%

These are my descriptions of the assembly, not publisher-supplied ACT tags. Section A’s topTags is empty, and Section B exposes no item-level reporting categories. B13, in contrast, supplies six ACT-category totals. 

act-math-workbook

 

act-math

An exact, officially adjudicated B18 domain distribution cannot be certified from this metadata. Nevertheless, the content inventory establishes the following imbalances.

Number and Quantity: severe undercoverage

T1Q26 and T4Q20 represent the bank’s only 25 explicit number-properties items: 20 exponent-quotient questions and five power-of-a-power questions. That is 1.6% of the bank, with no complex-number, vector, matrix or scientific-notation family. 

act-math-workbook +1

This is not evidence of a complete Number and Quantity allocation. ACT expressly retains real/complex-number reasoning, rational exponents, vectors and matrices. The shorter test has not eliminated those topics. 
ACT

Functions: heavy repetition rather than broad coverage

T1Q19, T2Q18, T2Q21 and T2Q22 exemplify 67 linear-composition questions, 50 minimum-from-vertex-form questions, 57 vertex-reading questions and 55 quadratic-y-intercept questions. The last three alone account for 162 items. 

act-math-workbook +2

My function-oriented grouping contains 431 items—28.0%, above the official Functions allocation. Some could reasonably receive a different primary category, so this is a diagnostic classification, not a certified ACT tag count. The missing breadth is less debatable: no piecewise-function, logarithmic-function, inverse-construction, domain/range or sequence family was found. ACT includes these broader function relationships and representations. 
ACT
+1

Geometry: almost entirely four elementary procedures

T1Q38, T1Q43, T2Q38 and T2Q42 represent the four dominant families:

Family	Count
Third angle of a triangle	84
Rectangular-box volume	81
Radius from a circle equation	55
Center from a circle equation	23
Arc length	2
Total geometry-block items	245

Thus 243/245—99.2%—of the geometry block comes from four elementary procedures. The only other family is arc length, represented by T4Q39. 

act-math-workbook +4

No Pythagorean/right-triangle, trigonometric, similarity, surface-area, composite-figure or geometric-transformation family was found. These omissions matter against ACT’s stated geometric breadth. Circle equations and arc length are in scope for ACT; they should not be removed simply because the preceding audit concerned PSAT. 
ACT

Statistics and Probability: an apparent count masks elementary coverage

T1Q33, T1Q35, T1Q36, T2Q31 and T3Q35 exemplify 199 statistics/probability-related questions—12.9% of the bank: 46 means, 31 medians, 33 ranges, 65 marble probabilities and 24 sample-to-population projections. 

act-math-workbook +2

That does not establish 12.9% valid Preparing for Higher Math statistical coverage. ACT also places elementary summaries, informal sampling estimates and basic probability within Integrating Essential Skills. The inventory lacks displayed statistical interpretation, bivariate relationships, distribution comparisons, conditional-probability reasoning, expected value and counting/permutation/combination families. 
ACT
+1

Integrating Essential Skills: overconcentration without sufficient integration

Using a conservative primary-task grouping of basic volume/angle work, averages, elementary probability, informal estimation, rates and percentages gives 427 IES-type items—27.7%, before considering simple linear-equation items. Examples include T1Q34, T1Q38, T1Q43 and T3Q32. This is a reviewer classification, not an official item adjudication. 

act-math-workbook +3

The problem is not merely exceeding the 20% allocation: most of these items isolate one procedure rather than require the chained, nonroutine reasoning described for IES. 
ACT

Algebra and Modeling: breadth remains unverified

T22Q1/Q3/Q11/Q15 demonstrate repeated no-solution classification; T12Q27 represents just three rational-expression cancellation items. The inventory contains no substantive nonlinear-system family or varied rational-equation problems requiring domain/extraneous-solution decisions. This is narrow practice despite the large algebra-like block. 

act-math-workbook +1

T2Q11 does interpret a model parameter, so Modeling should not be described as absent. However, there are no Modeling cross-tags, and the bank does not establish the required coverage of producing, interpreting, evaluating and improving models. Repeating fixed-fee identification is insufficient evidence. 

act-math-workbook

 
ACT

Format and difficulty

T1Q1–T35Q44 — Four-option multiple choice is appropriate for Enhanced ACT. Missing typed responses or adaptive second modules is not a defect here. The actual problems are the 44-item configuration when used as a full simulation, unverified timing/scoring, and absent ACT-specific assembly controls. 

act-math-workbook

 
ACT

The final blueprint orders questions by increasing difficulty. Late items such as T35Q39, T35Q41, T35Q42 and T35Q44 remain direct box-volume or angle-subtraction tasks. The export supplies neither calibrated difficulty statistics nor evidence of exam-like progression. As organized drills this ordering can be intentional; as full simulations it requires redesign. 

act-math-workbook

 
ACT

6. STRUCTURAL CHECK

Scope: T1Q1–T35Q44.

Section A finding	Independent result
1,540 questions across 35 drills	Confirmed: exactly 44 per drill.
Four choices per item	Confirmed: 6,160 options.
Invalid key letters or missing choices	None found.
Missing explanations	None found.
Duplicate choice strings	None found, but three mathematical-equivalence pairs occur in three items.
Duplicate normalized stems	None found, but 34 same-givens repeated-task groups occur.
Very short explanations: 650	Reproduced using fewer than 40 characters, not words.
Images and missing image files	Zero references; no broken referenced figure established.
Domain/skill tags	No item-level tags exposed; topTags empty.
Long same-answer runs	The displayed list uses cross-drill sequences and is truncated.

Section A is largely accurate as a string/count report. It does not establish mathematical uniqueness, distinct practice or ACT alignment. 

act-math-workbook

Longest-option cue rate

Lengths exclude the answer label and retain mathematical signs, punctuation and internal spaces.

Measure	Count	Fraction
Keyed answer is uniquely longest	63	4.1%
Keyed answer is tied for longest	681	44.2%
Keyed answer is longest including ties	744	48.3%
All four options have equal length	250	16.2%

The final row is a subset of tied cases, not an additional category.

Choosing uniformly among tied longest options would produce an expected 20.0% match to the supplied keys. Therefore 48.3% must not be reported as a successful longest-answer heuristic. This bank has no overall positive longest-option advantage, although local templates such as T2Q11’s fixed-fee family remain conspicuous. 

act-math-workbook

Answer distribution and patterns

The supplied counts are reproduced: A407, B359, C378, D396. There is no basis for changing correct answers to force equal letter quotas. 

act-math-workbook

The best-fitting repeating permutation of A/B/C/D matches 436/1,540 keys—28.3%. This is an optimized descriptive check, not a formal validity test; it does not show the near-deterministic cycling seen in B15.

Same-letter runs

There are 15 within-drill runs of at least four identical keys, with a maximum length of seven.

T14Q33–T14Q39 is the seven-D run. It exists within one drill, but does not itself prove a scoring defect. 

act-math-workbook

T1Q43–T2Q3 produces the report’s “T2Q3 key A ×5,” but crosses a drill boundary. Likewise, “T23Q1 key C ×5” joins T22Q41–T22Q44 to T23Q1. 

act-math-workbook +1

The global scan finds 16 qualifying runs, but Section A prints only the first 15, omitting T33Q18–T33Q21, C ×4. Reset detection at drill boundaries and report an uncapped count separately from displayed examples. 

act-math-workbook +1

Explanation length

650/1,540 = 42.2% of explanations are under 40 characters; the median is 44 characters.

Length alone is not a suitable commercial-quality threshold. T1Q38 explains direct multiplication briefly; the longer T9Q2 explanation teaches an invalid inference. Correctness and instructional sufficiency must control the release decision. 

act-math-workbook +1

7. TOP FIXES

Quarantine T9Q2, T17Q5, T30Q17 and T30Q19. Review affected customer scores. Do not preserve arbitrary single keys where multiple choices are correct.

Repair the shared mathematical generators. Require unique solvability for the system templates behind T9Q2/T17Q5; normalize complete solution sets for T30Q17/T30Q19; replace the equivalent distractor in T20Q20.

Correct all six faulty explanations. Repair the two identity-to-solution inferences and the signed salary calculations in T1Q32, T19Q32, T21Q35 and T33Q32. Retain the valid salary keys and make units explicit.

Rebuild ACT-specific mapping and assembly across T1Q1–T35Q44. Replace the untagged 15/15/7/7 structure with auditable ACT reporting categories and Modeling cross-tags. For full simulations, use 45 questions and verified 50-minute delivery; adding one question alone will not solve the coverage problem.

Restore Number and Quantity breadth. Reduce the repetition represented by T1Q26/T4Q20 and add real/complex-number reasoning, rational exponents, vectors and matrices. B13 T1Q2/T2Q1 demonstrate coverage that the workbook currently loses.

Rebuild geometry practice. Replace part of the six-box cluster in T1Q38–Q42/Q44 and the six-angle cluster in T19Q38–Q40/Q42–Q44 with right triangles, trigonometry, similarity, surface area, transformations and visual reasoning.

Separate elementary IES practice from higher-level statistics. Recode and diversify the families represented by T1Q33/T1Q35/T1Q36/T2Q31/T3Q35. Add data interpretation, bivariate relationships, conditional probability and counting rather than more marble or consecutive-integer questions.

Broaden function and algebra decisions. Reduce direct-reading clusters such as T27Q16/Q18/Q23/Q27/Q28 and no-solution repetition in T22Q1/Q3/Q11/Q15. Add varied representations, domain/range, inverse and piecewise functions, and more demanding systems.

Differentiate B18 from B13 and enforce semantic deduplication. Remove the detected same-givens repeats, including B18 T3Q32/T5Q32/T9Q40/T10Q20/T26Q26. Prevent within-drill repeats such as T35Q32/T35Q36 and cap same-family concentration.

Repair reporting and presentation, then rerun the complete pass. Separate unique-longest from tied-longest metrics; correct boundary handling around T1Q44/T2Q1 and T22Q44/T23Q1; report the omitted T33Q18–Q21 run; clarify the three rounded-survey examples and clean repeated/unsimplified explanation text.

8. SUMMARY ROW

| B18 — ACT Math Workbook | 5.0/10 | 4 multi-answer items | 6 confirmed | PULL | 44-item SAT-style assembly, major Enhanced ACT coverage gaps; all 55 task families overlap B13, with 40 same-givens repeats; uniquely longest key 4.1%. |