# B16 — Digital SAT Math Workbook — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/sat-math-workbook.json` — 1584 questions / 36 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 5.5/10

Audit dimension	Score
Answer-key correctness	9.0/10
Explanation accuracy	7.5/10
Item quality and distractors	2.5/10
Exam-blueprint alignment	3.0/10
Structural hygiene	5.5/10

Eight items have scoring defects: seven admit multiple correct choices, and one omits the correctly rounded answer. Seventeen explanations require correction. Four system-of-equations items offer four valid solutions while incorrectly presenting one as uniquely determined—for example, T4Q15. 

sat-math-workbook

Buying both B11 and B16 mostly adds new numerical instances of existing procedures, not new types of practice. All 56 B16 task families occur in B11. There are no identical normalized stems across the two banks, but 56 B16 items—3.5%—repeat the same mathematical givens and task after accounting for changes such as reordered data, reversed factors and rearranged dimensions. Representative cross-bank repeats are documented in Section 4.

The keyed answer is the sole longest option in 78/1,584 items: 4.9%. Including ties, it is longest in 857/1,584: 54.1%. The distinction matters: numerous numerical choices tie in length. This bank does not exhibit the longest-answer shortcut found in B15.

Audit coverage: I independently recomputed all 1,584 items, evaluated all 6,336 options, and checked all 9,504 within-item option pairs for mathematical equivalence. No parser failures remained unresolved. Documented editorial review covered 281 complete items, including their explanations—17.7%: fixed positions across every drill, representatives of every solving family, all flagged items, and targeted repetition/comparison checks. The B11 comparison covered its complete 1,540-item export computationally; it was not a second full manual audit of B11.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

T1Q36 — No option meets the requested rounding — correct key: none as written; required answer +6.3%.

The compounded change is:

100(1.25×0.85−1)=6.25%.

The stem asks for the nearest tenth of a percent. Keyed C, +6.25%, is the unrounded result, not the required +6.3%. 

sat-math-workbook

T4Q15 — The two equations are dependent, and every offered point satisfies them — correct keys: A, B, C and D.

2x+2y=20 is simply twice x+y=10. All four points—(7,3), (8,2), (3,7), and (10,0)—are solutions. The system does not uniquely determine keyed A. 

sat-math-workbook

T12Q21 — Two options give the same complete solution set — correct keys: A and B.

∣3x∣=12 gives x=±4. A lists 4,−4; B lists −4,4. The order does not distinguish solution sets. 

sat-math-workbook

T15Q3 — Another dependent system makes all four options correct — correct keys: A, B, C and D.

3x+3y=18 and x+y=6 describe the same line. Each offered point—(6,0), (2,4), (1,5), and (5,1)—lies on it. 

sat-math-workbook

T24Q25 — Reversing the roots creates a second correct choice — correct keys: A and B.

∣2x∣=6 gives x=±3. Both A and B contain exactly those solutions. 

sat-math-workbook

T25Q14 — All four points solve the dependent system — correct keys: A, B, C and D.

5x+5y=35 is equivalent to x+y=7. A (2,5), B (5,2), C (7,0), and D (3,4) all satisfy both equations. 

sat-math-workbook

T25Q23 — Two choices give the same quadratic roots — correct keys: A and C.

x
2
−1=0 has solutions {−1,1}. A and C differ only in presentation order. 

sat-math-workbook

T30Q6 — All four choices satisfy the dependent system — correct keys: A, B, C and D.

4x+4y=44 and x+y=11 are equivalent. The options (6,5), (5,6), (11,0), and (7,4) are all valid. 

sat-math-workbook

Count: eight scoring-defective items. The four system questions are underdetermined, not inconsistent. They require item repair, not a different arbitrarily selected single key. No additional scoring mismatch was found in the full-bank computational pass.

3. EXPLANATION ERRORS
Twelve salary-change explanations contain false signed equalities

Affected IDs: T1Q33, T2Q37, T7Q35, T8Q35, T8Q36, T14Q36, T15Q31, T16Q35, T18Q36, T19Q37, T20Q35 and T36Q37.

Each explanation divides a negative salary change by a positive original salary, then incorrectly prints a positive quotient. The decrease identified by each key is correct.

For example, T1Q33 asserts:

60
−6
	​

=0.1.

It must instead show:

60
−6
	​

=−0.1=−10%,

interpreted as a 10% decrease. Retain key C. 

sat-math-workbook

The same error appears with decreases of 15%, 20%, 25%, 30% and 40%; it is a shared generator failure, not twelve independent slips. Examples include T8Q36, T14Q36, T19Q37 and T2Q37. 

sat-math-workbook +2

Required correction: preserve the sign when calculating signed percentage change. Alternatively, calculate a positive decrease magnitude using original minus new salary—but do not mix the two conventions within one equality chain.

T1Q33 and the other salary-template instances — undeclared unit scaling also needs correction. The explanation changes a $6,000 reduction into “Change = −6” without declaring thousands of dollars. Either label the units or retain the original dollar amounts. This is a presentation issue separate from the twelve false equalities. 

sat-math-workbook

Four explanations infer a particular solution from an identity
Item	Invalid inference	Required correction
T4Q15	0y=0, therefore y=3.	The identity imposes no additional restriction; infinitely many points satisfy x+y=10. 

sat-math-workbook


T15Q3	0y=0, therefore y=5.	The remaining relationship is x+y=6; no unique pair follows. 

sat-math-workbook


T25Q14	0y=0, therefore y=5.	The remaining relationship is x+y=7; every offered pair works. 

sat-math-workbook


T30Q6	0y=0, therefore y=5.	The remaining relationship is x+y=11; the chosen value is arbitrary. 

sat-math-workbook

These explanations teach an incorrect method of interpreting dependent systems. Repair the generation conditions and the explanations together.

One explanation fails to complete the requested rounding

T1Q36 — The explanation stops at 6.25% — required endpoint: +6.3%. Its multiplication is correct, but it does not answer the stated precision requirement. 

sat-math-workbook

Confirmed total: 17 explanation corrections—12 sign errors, four invalid system inferences and one rounding omission. Five of these items also appear in the scoring-defect list; they are not additional unique defective questions.

4. ITEM QUALITY
B11 overlap: different wording is not necessarily different practice

I compared B16 T1Q1–T36Q44 with the complete B11 T1Q1–T35Q44 export. B11’s retrieved file identifies it as the separate 1,540-question Digital SAT Math Prep bank. 

sat-math

Comparison measure	Result
Identical stems after normalizing case and whitespace	0 B16 items
Same mathematical givens and task after conservative normalization	56 B16 items — 3.5%
B16 task families also present in B11	56 of 56 — 100%
New B16 task families under this classification	0
Task families identified in B11	72

Here, a task family means an audit-defined solving template, such as finding a quadratic’s vertex from vertex form or computing a simple mean. These are not official College Board construct codes.

The 56 same-givens matches comprise 28 reordered mean-data questions, 12 reordered box-dimension questions, eight unit-price questions, five reversed-factor multiplication questions and three reordered-factor root questions. This is a detected substantive-repeat count, not a claim that every remaining item is conceptually unique.

Examples:

B16 item ↔ B11 item	What is repeated
T3Q36 ↔ T3Q29	The same five values, 10–14, are reordered. Both ask for their mean, 12, and offer the same options. 

sat-math-workbook

 

sat-math


T7Q25 ↔ T1Q2	(x+4)(x−5) becomes (x−5)(x+4). The product and distractor set are unchanged. 

sat-math-workbook

 

sat-math


T5Q44 ↔ T2Q15	Box dimensions 11,7,8 become 8,11,7. The volume remains 616; changing a distractor does not change the mathematical task. 

sat-math-workbook

 

sat-math


T6Q5 ↔ T21Q30	Three pounds cost $21; find the cost of ten pounds. Moving the dollar notation between the stem and choices does not create a new problem. 

sat-math-workbook

 

sat-math


T2Q28 ↔ T13Q34	The same factors with roots −4 and −1 are presented in the opposite order. 

sat-math-workbook

 

sat-math

Customer-value finding: most B16 stems use different numerical inputs, but the bank does not add a new family of reasoning tasks. It principally supplies more repetitions of a narrower subset of B11’s practice.

The concentration increases markedly: B16 has 130 linear-function-composition items versus 36 in B11, 81 box-volume items versus 49, and 77 third-angle items versus 33. Examples of these repeated workbook families include T1Q16, T1Q38 and T3Q38–T3Q43. 

sat-math-workbook +2

Conversely, B11 includes right-triangle/Pythagorean practice at T4Q34, trigonometric-ratio reasoning at T7Q43, and special-right-triangle practice at T10Q19. No corresponding B16 task families were found. Thus the workbook is not filling those areas with distinct practice; it omits them. 

sat-math

Three otherwise correctly keyed items have equivalent distractors
Item	Defect	Key to retain
T2Q36	A, 1/2, and C, 4/8, are identical distractors.	B: 1/3. 

sat-math-workbook


T19Q30	A, “x=6 only,” and D, “x=6,” express the same incomplete solution. The full set is {0,6}.	C. 

sat-math-workbook


T26Q34	A, 6/10, and C, 3/5, are identical distractors.	B: 2/5. 

sat-math-workbook

Together with the three equivalent-correct-choice cases in Section 2, this gives six equivalent-choice pairs in six items. The four dependent systems are separate failures: their choices are distinct points, but all are valid.

Repetition within B16 is also substantial

T1Q1–T36Q44 — Conservative same-givens normalization found 31 repeated-task groups involving 67 items: 36 redundant copies beyond the first occurrence. These are not merely items with equal final answers.

T6Q31, T8Q34 and T15Q35 exemplify the problem: all ask for the mean of the same five integers, 16–20, with their order changed. All answers are 18. Across the bank, all 36 simple-mean questions use five consecutive integers, and there are only 18 distinct underlying data sets. 

sat-math-workbook

T3Q38–T3Q43 — Six consecutive items ask for a triangle’s third angle. That occupies six of the drill’s seven geometry positions and 13.6% of the entire drill, without changing the required procedure. 

sat-math-workbook

T1Q38, T1Q39, T1Q40, T1Q41 and T1Q44 — Five box-volume questions occupy the same drill’s seven geometry positions. These are coefficient variations, not a progression through different geometric relationships. 

sat-math-workbook +1

Presentation artifacts and weak alternatives

T1Q1, T1Q14 and T2Q30 — Unsimplified sign formatting exposes the generator. Examples include 4x + -10, (x + -3)/4, and (x - -1)(x - -2). These expressions can be mathematically interpreted, but they need normal mathematical typesetting and sign simplification. 

sat-math-workbook +2

T1Q32 and T3Q31 — Probability distractors exceed 1. The offered 7/6 and 15/3 can be rejected before performing the intended probability calculation. They are weak distractors, not scoring errors. 

sat-math-workbook +1

T1Q1–T36Q44 — No visual-data or diagram-based practice was found. Questions mentioning a “graph,” such as T1Q18 and T1Q21, supply equations and ask learners to read their structure; they do not require interpreting a displayed graph. No explicit dependence on a missing figure was established. 

sat-math-workbook +1

5. BLUEPRINT COVERAGE
Official benchmark

The benchmark is College Board’s Assessment Framework for the Digital SAT Suite, version 3.01, August 2024, checked against its current SAT content pages on 16 September 2026. The SAT operational-question targets remain approximately 35% Algebra, 35% Advanced Math, 15% Problem-Solving and Data Analysis, and 15% Geometry and Trigonometry. 
SAT Suite

Apparent quotas versus actual content

T1Q1–T36Q44 — The export contains no item-level domain labels, and topTags is empty. Consequently, the following is a reviewer classification, not verification of supplied tags. 

sat-math-workbook

Every drill follows the same broad positional structure: 15 algebra-like items, 15 advanced-math-like items, seven data/percentage items, then seven geometry items. Those slots imply 540/540/252/252, or 34.1%/34.1%/15.9%/15.9%—reasonable rounding if the contents actually support the categories.

Two content distinctions change that interpretation. Twenty-eight unit-price items appear in the first block, although rates and proportional relationships belong to Problem-Solving and Data Analysis. Also, 130 compositions in the second block use two linear functions, rather than testing nonlinear relationships. Examples are T2Q2 and T1Q16/T1Q23/T1Q24. 

sat-math-workbook +2

 
SAT Suite
+1

Classifying those linear-only compositions as Algebra produces:

Domain	Official approximate weight	Reviewer-classified B16 count	B16 share
Algebra	35%	642	40.5%
Advanced Math	35%	410	25.9%
Problem-Solving and Data Analysis	15%	280	17.7%
Geometry and Trigonometry	15%	252	15.9%

Official weights are from the framework’s operational-question distribution. B16 counts are my full-bank content classification. 
SAT Suite

Classification sensitivity: leaving all 130 compositions in Advanced Math instead yields 32.3% Algebra and 34.1% Advanced Math, with the other categories unchanged. Without authoritative item tags, I would not present the precise 25.9% figure as an official mapping. The robust finding is that 130 repeated linear substitutions do not establish broad nonlinear preparation, regardless of the label assigned to them.

Within-domain omissions are more serious than quota rounding

Geometry and Trigonometry — 249 of 252 items, or 98.8%, come from four families.

Those families are 81 rectangular-box volumes, 77 triangle-third-angle calculations, 64 circle-radius readings and 27 circle-center readings. Representative IDs are T1Q38, T1Q43, T2Q39 and T1Q42. The remaining three questions are one arc-length and two sector-area items. 

sat-math-workbook +2

No right-triangle trigonometry, Pythagorean/special-right-triangle task family, similarity reasoning, scale-factor reasoning or composite-figure work was found. Right triangles and trigonometry are explicitly part of the domain; seven questions called “geometry” do not establish coverage of it. 
SAT Suite

Problem-Solving and Data Analysis — calculations replace interpretation.

T1Q32/T1Q34 exemplify 50 single-marble probability questions. T2Q33, T1Q35 and T3Q37 represent 109 direct mean, median and range questions. T3Q35 exemplifies sample-proportion projection. The inventory contains no scatterplot/model interpretation, conditional-probability task family, margin-of-error reasoning, comparison of standard deviations, or observational-study/experiment evaluation. 

sat-math-workbook +2

These are named College Board testing points, not optional enhancements outside the target. 
SAT Suite

Advanced Math — repeated equation reading dominates several allocations.

There are 74 minimum-value, 61 vertex and 59 quadratic-y-intercept questions: 194 items. T2Q27, T1Q21 and T1Q18 illustrate how directly the requested value is exposed by the supplied form. The bank also repeats cubic-factor substitution 47 times, represented by T1Q17. 

sat-math-workbook +3

There is no substantive nonlinear-system family or graph-based nonlinear interpretation. Simple radical equations and integer-root factoring provide some relevant content, but not the full range of reasoning described in the Advanced Math specification. 
SAT Suite

Algebra — repeated procedural forms do not establish representation or modeling breadth.

T1Q7–T1Q9 repeat coordinate-slope calculation, while T1Q3/T1Q4/T1Q10/T1Q11 repeatedly solve a linear function for its input. The bank has no displayed graph/table translation or comparison tasks. Those would test connections among representations, rather than another set of coefficients in the same operation. 

sat-math-workbook +1

 
SAT Suite

I did not identify a clear out-of-scope mathematical family that should be removed simply for being absent from SAT content. The central problem is missing breadth and excessive repetition, not that basic arithmetic or elementary algebra is prohibited.

Response formats and simulation fidelity

The digital SAT Math section has 44 questions in 70 minutes, divided into two 35-minute modules. The second module adapts to first-module performance. Questions from all four domains appear in each module. 
SAT Suite
+1

T1Q1–T36Q44 — all 1,584 items are four-option multiple choice. The export contains no student-produced-response items or typed-answer scoring definitions. College Board’s specification allocates approximately 25% of operational Math questions to student-produced response—8–12 of the 40 operational questions; four additional questions are embedded pretest items. 

sat-math-workbook

 
SAT Suite

T1Q1–T1Q44 and the equivalent positions in every drill — mechanically splitting the current order after Q22 would not create representative SAT modules. All geometry is concentrated at Q38–Q44. The ordering is acceptable as an explicitly organized workbook exercise, but not evidence of an authentic two-module simulation.

The calculator is permitted throughout SAT Math, with an embedded Desmos calculator available. B16 provides no explicit tool-use or calculator-strategy practice in the export. This is a preparation gap, not evidence that the live interface forbids calculators. 
SAT Suite

A workbook need not reproduce adaptive delivery for every drill. It does need accurate claims: 36 sets of 44 questions are not, by that count alone, 36 validated digital SAT simulations or score predictors.

6. STRUCTURAL CHECK

Scope: T1Q1–T36Q44.

Section A field	Independent result
1,584 questions across 36 drills	Confirmed: 44 per drill.
Four choices per item	Confirmed: 6,336 options.
Invalid key letters or missing choices	None found.
Missing explanations	None found.
Identical choice strings within an item	None found, but six mathematical-equivalence pairs were found.
Duplicate normalized stems	None found, but 31 same-givens repeated-task groups were found.
Very short explanations: 686	Reproduced using fewer than 40 characters, not words.
Images/missing image files	Zero image references; no broken referenced figure established.
Tags	No item-level domain/skill labels exposed; topTags is empty.
Long same-answer runs	The displayed list is truncated and includes a cross-drill run.

The supplied report supports its basic counts; its string-level checks do not test mathematical equivalence or uniqueness of the correct response. 

sat-math-workbook

Longest-option fraction

I measured trimmed option-text character length, excluding the A/B/C/D label but retaining mathematical signs, punctuation and internal spaces. These results concern the exported text, not rendered pixel width.

Measure across T1Q1–T36Q44	Count	Fraction
Keyed answer is strictly longer than every distractor	78	4.9%
Keyed answer is tied for longest	779	49.2%
Keyed answer is longest including ties	857	54.1%
All four options have identical character length	287	18.1%

The last row is a subset of tied cases, not an additional category.

Choosing randomly among tied longest options would yield an expected 22.7% match to the supplied keys. Thus 54.1% should not be reported as the success rate of a longest-option strategy. T1Q1 illustrates a short keyed number; T1Q42 illustrates how minus signs alone can make a coordinate answer longer. 

sat-math-workbook +1

Key distribution and periodicity

The supplied counts are reproduced: A407, B393, C378, D406. There is no basis for changing correct answers merely to force exact letter quotas. 

sat-math-workbook

The best-fitting repeating permutation of A/B/C/D across the complete bank matches 427/1,584 keys—27.0%, not the near-deterministic pattern found in B15. This is an optimized descriptive check, not a separate validation of item quality.

Same-letter runs

There are 23 within-drill runs of at least four identical keys, with a maximum length of five.

T7Q41–T7Q44 followed by T8Q1–T8Q2 produces the report’s “T8Q2 key B ×6.” That sequence crosses a drill boundary; there is no six-B run inside Test 8. 

sat-math-workbook

The displayed list also omits later runs, including T24Q2–T24Q6, B ×5. Section A displays only its first 15 examples. Report the complete count separately and reset run detection at each drill boundary. These runs are not, by themselves, scoring defects. 

sat-math-workbook +1

Explanation length

686/1,584 = 43.3% of explanations are under 40 characters; the median is 44 characters.

Length alone is not a sound rejection rule. T1Q38 can explain a direct volume calculation briefly. Conversely, T4Q15 uses a longer explanation to teach an invalid inference. Apply correctness and instructional-sufficiency checks rather than a minimum-character requirement. 

sat-math-workbook +1

7. TOP FIXES

Quarantine the eight scoring-defective items: T1Q36, T4Q15, T12Q21, T15Q3, T24Q25, T25Q14, T25Q23 and T30Q6. Review affected customer scores; do not arbitrarily retain one letter where multiple choices are valid.

Fix system-generation constraints. T4Q15, T15Q3, T25Q14 and T30Q6 require a uniqueness check before release. Reject dependent systems when the task demands one solution, and verify every offered point against both equations.

Add mathematical option normalization. Normalize unordered solution sets for T12Q21/T24Q25/T25Q23, fractions for T2Q36/T26Q34, and equivalent single-solution wording for T19Q30. Exact-string duplicate detection is insufficient.

Regenerate the twelve defective salary explanations and complete T1Q36’s rounding. Preserve signed arithmetic, declare dollar units, and validate the requested precision against both the options and explanation.

Rebuild geometry coverage rather than adding more numerical variants. Replace part of the box-volume and third-angle concentration exemplified by T1Q38–T1Q44 and T3Q38–T3Q43 with right triangles, trigonometry, similarity, scale and composite-figure reasoning.

Differentiate B16 from B11 deliberately. Remove the detected same-givens repeats, including B16 T3Q36/T7Q25/T5Q44/T6Q5/T2Q28. Assign the workbook complementary tasks and representations rather than relying on different numbers to establish distinct practice.

Add purpose-built student-produced-response items and validate their scoring. Cover integer, decimal and fractional entry, equivalent acceptable forms and requested precision. Do not treat hiding the options of items such as T1Q1 or T1Q36 as sufficient implementation.

Broaden data-analysis and nonlinear reasoning. Reduce repetitions represented by T1Q32/T1Q34/T2Q33 and T1Q18/T1Q21/T2Q27. Add graphical interpretation, conditional probability, statistical inference, study design and nonlinear-system tasks.

Implement explicit domain/skill mapping and assembly limits. Review the 130 linear compositions represented by T1Q16/T1Q23/T1Q24 and the misplaced unit-rate tasks such as T2Q2. Limit same-family clustering and distinguish organized drills from exam simulations.

Repair presentation and structural reporting, then rerun the full audit. Normalize signs in T1Q1/T1Q14/T2Q30, detect reordered-data duplicates such as T6Q31/T8Q34/T15Q35, and correct cross-drill run reporting around T7Q44/T8Q1. Preserve separate longest-option metrics for strict wins and ties.

8. SUMMARY ROW

| B16 — Digital SAT Math Workbook | 5.5/10 | 8: seven multi-answer, one missing rounded answer | 17 confirmed | PULL | All 56 task families overlap B11; 56 same-givens repeats, major coverage gaps, and keyed answer uniquely longest in 4.9%. |