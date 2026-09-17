# B19 — GED Math Workbook — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/ged-math-workbook.json` — 1540 questions / 35 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 4.5/10

Audit dimension	Score
Answer-key correctness	9.5/10
Explanation accuracy	8.0/10
Item quality and distractors	2.5/10
Exam-blueprint alignment	1.5/10
Structural hygiene	5.5/10

Four items have multiple correct answers, and eight explanations contain mathematical errors. Two dependent-system questions incorrectly score one point as uniquely correct; two other questions duplicate the correct solution set. The recurring salary template also turns negative quotients into positive numbers. 

ged-math-workbook +1

The larger release problem is GED alignment. The bank omits standalone foundational arithmetic families that B14 contains, while allocating substantial space to advanced-function procedures and circle-equation recognition. Examples include T1Q23/T1Q24 for cubic-factor parameters and T1Q38 for trigonometric ratios. Their mathematics is not the problem; their relevance and allocation within GED preparation are. 

ged-math-workbook +1

B14 overlap: 44 of B19’s 57 audit-defined task families already occur in B14, covering 1,181/1,540 items—76.7%. A conservative same-givens comparison finds 64 B19 items—4.2%—repeating a B14 mathematical task, including 14 identical normalized stems. B19 adds some different procedures, but it is not a well-balanced complement to B14.

Longest-option cue: the keyed answer is uniquely longest in 63/1,540 items—4.1%. Including ties, it is longest in 781/1,540—50.7%. The inclusive figure is not the success rate of a longest-answer strategy.

Audit coverage: I independently recomputed all 1,540 items, evaluated all 6,160 options, and checked all 9,240 within-item option pairs for mathematical equivalence. No parser failures remained unresolved. Direct editorial review covered 423 complete items and their explanations—27.5%: all of Tests 1–3 and 33–35; fixed positions across the remaining drills; representatives of every task family; all computationally flagged items; and targeted overlap, repetition and structural examples. B14’s complete 1,518-item export was processed for comparison, not subjected to another full manual editorial audit.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

T5Q6 — The system is dependent, and every offered point satisfies both equations — correct keys: A, B, C and D.

2x+2y=28

is simply twice x+y=14. The offered points (6,8), (7,7), (8,6), and (14,0) all work. Printed key A is not uniquely correct. 

ged-math-workbook

T9Q22 — Two options express the same complete solution set — correct keys: A and C.

∣x∣=8⟹x=−8 or x=8.

A lists −8,8; C lists 8,−8. Reversing the order does not change the set. Additionally, B, “x=8 only,” and D, “x=8,” are equivalent incomplete distractors. 

ged-math-workbook

T25Q1 — Another dependent system makes all four options correct — correct keys: A, B, C and D.

4x+4y=44 and x+y=11 describe the same line. A (11,0), B (7,4), C (4,7), and D (5,6) all satisfy it. Printed key C is arbitrary. 

ged-math-workbook

T26Q30 — Reversing the quadratic roots creates a second correct choice — correct keys: A and B.

x
2
+x−2=(x+2)(x−1)=0

gives x=−2 or x=1. A and B contain exactly those solutions. 

ged-math-workbook

Count: four multi-answer items. No additional wrong-letter-only item or item lacking a valid offered answer was found. The two system questions are underdetermined, not inconsistent; changing their single-letter keys would not repair them.

3. EXPLANATION ERRORS
Two explanations infer a particular solution from an identity

T5Q6 — 0y=0 does not imply y=8.

The explanation chooses y=8, x=6, but the identity imposes no further restriction beyond x+y=14. Required correction: explain dependence and nonuniqueness, and repair the corresponding single-answer item. 

ged-math-workbook

T25Q1 — 0y=0 does not imply y=7.

The remaining relationship is x+y=11. Nothing selects (4,7) over the other valid points. Required correction: remove the invalid inference and repair the question. 

ged-math-workbook

Six salary-decrease explanations contain false signed equalities

The decrease identified by each key is correct. The explanation incorrectly changes a negative quotient into a positive number.

Item	Incorrect displayed equality	Required correction; retain key
T12Q35	(−60)/200=0.3	(−60)/200=−0.3; A, 30% decrease. 

ged-math-workbook


T15Q35	(−24)/200=0.12	(−24)/200=−0.12; D, 12% decrease. 

ged-math-workbook


T17Q37	(−30)/120=0.25	(−30)/120=−0.25; A, 25% decrease. 

ged-math-workbook


T18Q33	(−16)/80=0.2	(−16)/80=−0.2; C, 20% decrease. 

ged-math-workbook


T19Q32	(−20)/50=0.4	(−20)/50=−0.4; B, 40% decrease. 

ged-math-workbook


T23Q35	(−5)/50=0.1	(−5)/50=−0.1; B, 10% decrease. 

ged-math-workbook

The generator must distinguish signed percentage change, (new−old)/old, from the positive magnitude of a decrease, (old−new)/old. Either method works when applied consistently.

T12Q35 and the other salary-template instances — undeclared unit scaling also needs correction. A $60,000 decrease becomes “Change = −60” without declaring thousands of dollars. State the units or retain the original amounts. This is a presentation defect separate from the six false equalities. 

ged-math-workbook

Confirmed explanation-error total: eight—two invalid system inferences and six sign errors. The two system items also appear in Section 2; they are not additional unique questions.

4. ITEM QUALITY
Overlap with B14: some new procedures, but not a targeted complement

The comparison covers B19 T1Q1–T35Q44 against the complete B14 T1Q1–T33Q46 export. B14’s file identifies its 1,518 questions and 33 tests. 

ged-math

Comparison measure	Result
Identical stems after normalizing case and whitespace	14 B19 items — 0.9%
Same mathematical givens and task after conservative normalization	64 B19 items — 4.2%, including the 14 above
B19 task families already present in B14	44 of 57 — 77.2%
B19 items belonging to those shared families	1,181 — 76.7%
Additional B19 families under this classification	13 families / 359 items

A task family means an audit-defined solving procedure, not an official GED construct code. Combining two familiar procedures can create a different template without introducing an entirely new mathematical construct.

The 64 same-givens matches include 34 reordered mean-data questions, seven unit-price questions, five factor-order/intercept questions, five permuted box-volume questions, four binomial expansions and nine other matches. Questions were not counted merely because they had equal final answers.

B19 item ↔ B14 item	What is repeated
T12Q35 ↔ T5Q31	Identical salary-change stem, $200,000 to $140,000, with the same false signed equality in the explanation. 

ged-math-workbook

 

ged-math


T23Q12 ↔ T1Q27	Identical unit-price problem: four pounds cost $24; find the cost of seven pounds. Only option order changes. 

ged-math-workbook

 

ged-math


T25Q31 ↔ T2Q6	The same five values, 10–14, are reordered. Both ask for their mean, 12. 

ged-math-workbook

 

ged-math


T9Q18 ↔ T2Q30	The factors (x−1) and (x+4) are reversed; the requested intercepts remain 1 and −4. 

ged-math-workbook

 

ged-math


T19Q41 ↔ T19Q28	Box dimensions 9,7,12 become 7,12,9. The volume remains 756; a changed distractor does not create a different mathematical task. 

ged-math-workbook

 

ged-math

Customer-value finding: a buyer does receive some additional procedures, but much of the added coverage is not the foundational practice most obviously missing from a GED bank.

The new families include exponential growth/decay, repeated doubling, cubic-factor parameters, linear-function composition, quadratic minima/root counts, circle-equation recognition and trigonometry. Examples are T1Q16/T1Q18/T1Q19/T1Q21/T1Q23/T1Q38. Some are relevant extensions or combinations of GED skills; others have no matching GED assessment target, as discussed below. 

ged-math-workbook +1

Meanwhile, B19 drops entire B14 families: 85 fraction-operation/fraction-of-number items, 30 decimal-arithmetic items, 24 integer-arithmetic items, 24 order-of-operations items and 23 scientific-notation items have no corresponding standalone B19 family. Examples of the lost practice are B14 T1Q6, T1Q13, T1Q32, T1Q36 and T3Q16. 

ged-math +4

Additional reuse evidence: 349 B19 stems—22.7%—match B17’s PSAT workbook after case/whitespace normalization, and 345 also retain the same unordered options. For example, B19 T1Q1 = B17 T1Q1, and B19 T1Q6 = B17 T1Q7. Shared elementary mathematics is not inherently inappropriate; this comparison does not establish which bank was created first. It does reinforce the need for exam-specific selection rather than relying on the bank title. 

ged-math-workbook

 

psat-math-workbook

 

ged-math-workbook

 

psat-math-workbook

Internal duplication and clustering

T1Q1–T35Q44 — Conservative same-givens normalization identifies 29 repeated-task groups involving 66 items: 37 redundant copies beyond the first occurrence. These counts include reordered data and equivalent factor/dimension ordering, not merely repeated answers.

T25Q31 and T25Q35 — The same mean problem appears twice within one drill. Both use the multiset {10,11,12,13,14}. Across B19, all 39 simple-mean questions use five consecutive integers, with only 18 distinct underlying data sets. 

ged-math-workbook

T4Q2, T4Q8, T4Q10, T4Q11 and T4Q32–T4Q34 — Seven unit-price variants occupy 15.9% of one drill. Each uses the same pounds-and-cost procedure; the repetition does not supply different rate contexts or multistep decisions. 

ged-math-workbook

T7Q16, T7Q17, T7Q21, T7Q22 and T7Q26 — Five questions ask for the y-intercept of a quadratic already in standard form. Three even return the same intercept, −5. Different coefficients do not materially change the decision. 

ged-math-workbook

Equivalent and implausible distractors

T3Q19 — C and D are equivalent incomplete solutions — retain A. For ∣2x−6∣=6, the full solution set is {0,6}. “x=6” and “x=6 only” are not distinct distractors. 

ged-math-workbook

Across T3Q19, T9Q22 and T26Q30, there are four mathematically equivalent choice pairs. T9Q22 contributes both a correct-choice pair and a distractor pair. The dependent-system choices are different points, so their four-way validity is a separate defect. 

ged-math-workbook +1

T2Q31 — 16/6 is offered as a probability. Overall, 27 of the 51 marble-probability questions contain an option greater than 1, permitting elimination without the intended calculation. 

ged-math-workbook

T6Q31 — A negative original price is offered despite a positive price after discount — retain B, $20. The −$10 alternative is a feasibility giveaway, not another scoring error. 

ged-math-workbook

Presentation and missing visual practice

T33Q22 — “a 8% increase” should be “an 8% increase.” T3Q17 and T35Q17 repeat the final equation unnecessarily. These are template-cleanup issues, not additional mathematical-error counts. 

ged-math-workbook +2

T1Q1–T35Q44 — No displayed graph, geometric diagram or data-table stimulus was found. Questions such as T1Q17 refer to a graph but supply only its equation. The deficiency is missing visual interpretation practice, not a demonstrated broken-image dependency. 

ged-math-workbook +1

5. BLUEPRINT COVERAGE
Official benchmark

I checked against GED Testing Service’s Assessment Guide for Educators: Mathematical Reasoning, June 2016, including Appendix C, and cross-checked operational rules against the GED Educator Handbook, Edition 7, and current GED test-subject guidance on 16 September 2026. 
GED
+2
GED
+2

Official reporting category	Approximate allocation
Quantitative problem solving with rational numbers — Q1–Q3	25%
Quantitative problem solving in measurement, including data/probability — Q4–Q8	20%
Algebraic problem solving with expressions and equations — A1–A4	30%
Algebraic problem solving with graphs and functions — A5–A7	25%
Broad split	45% quantitative / 55% algebraic

These are GED allocations, not SAT-style domain percentages. 
GED
+3
GED
+3
GED
+3

The actual assembly is not a verified GED blueprint

T1Q1–T35Q44 — Every drill follows the same positional pattern: 15 linear-algebra-like questions, 15 nonlinear-expression/function questions, seven data/rate/percentage questions, and seven geometry questions. That yields 525/525/245/245 items.

The export has no item-level domain tags, and topTags is empty. Those four positional blocks should not be mistaken for the four GED reporting categories. 

ged-math-workbook

A deliberately generous diagnostic classification counts the whole geometry block, the whole data/percentage block, 23 unit-price questions in the first block, and 42 repeated-doubling questions as quantitative:

Reviewer grouping	Count	Share
Quantitative-type tasks	555	36.0%
Remaining algebra/function-type tasks	985	64.0%

This is not a certified official target map. It even credits the circle-equation/trigonometry allocation to the quantitative side. Classifying another 81 exponential-rate questions as percentage applications instead would produce 41.3% quantitative / 58.7% algebraic. Neither bookkeeping approach establishes comprehensive 45/55 coverage.

Examples driving that classification include T1Q21 for doubling, T1Q19/T1Q22 for exponential-rate recognition, and T4Q2 for unit pricing. 

ged-math-workbook +1

Clearest off-target allocation: 85 items

My target-mapping finding is that 80 circle-equation questions and five trigonometric-ratio questions have no matching required procedure in the GED assessment targets. Treat these as extensions, not evidence of core GED coverage. This is a comparison with the published targets, not a claim that every difficult-looking expression is excluded. 
GED

Family	Count	Identifying items
Radius from a circle’s coordinate equation	42	T5Q43, T33Q38–T33Q39. 

ged-math-workbook +1


Center from a circle’s coordinate equation	38	T1Q39, T1Q41. 

ged-math-workbook +1


Find cosine from a supplied sine ratio	5	T1Q38, T2Q41, T3Q41, T5Q44, T12Q39—the complete set. 

ged-math-workbook +3


Total	85	5.5% of the bank; 34.7% of its geometry block.

Circle area and circumference are GED topics. That does not make locating a center from (x−h)
2
+(y−k)
2
=r
2
 the same target. GED’s measurement guidance emphasizes dimensions, area, circumference and formula application. 
GED

T1Q23/T1Q24 — The 26 cubic-factor-parameter items need explicit target justification. GED includes polynomial evaluation and factoring, so “contains a cubic” is not sufficient grounds for exclusion. The additional factor-theorem inference and its allocation need review.

T1Q19/T1Q22 — The 81 exponential growth/decay recognition items likewise need careful mapping. Some can function as percentage applications, but they do not substitute for the linear/quadratic evaluation and representation work emphasized in A7. 
GED

T1Q26 and the other rational-expression cancellation items should not be rejected merely as advanced mathematics. Rational-expression operations are explicitly included in GED algebra. Similarly, T2Q38’s 45–45–90 triangle can be solved using the Pythagorean theorem rather than memorizing a special-triangle rule. 

ged-math-workbook +1

 
GED

Material core-coverage gaps

Foundational numbers — T1Q20 illustrates symbolic exponent manipulation, not comprehensive numerical fluency. The full inventory contains no standalone fraction operations, decimal arithmetic, integer arithmetic, order-of-operations or scientific-notation family. Arithmetic occurs incidentally inside other questions, but that does not establish the foundational coverage specified in GED’s calculator-prohibited guidance. 

ged-math-workbook

 
GED

Ratios and practical applications — T4Q2/Q8/Q10/Q11/Q32–Q34 exemplify the concentration in one unit-price setting. The inventory lacks scale-drawing, measurement-conversion and varied multistep rate contexts. Those omissions contrast with GED’s high-impact ratio/scale indicators. 

ged-math-workbook

 
GED

Measurement — All 245 geometry-position questions belong to only seven families: 78 third-angle calculations, 68 rectangular-box volumes, 80 circle-equation readings, 14 special-right-triangle questions and five trigonometric-ratio questions. Examples are T1Q40/T1Q42/T1Q43. No area, perimeter, surface-area, cylinder-volume, composite-figure or unknown-dimension-from-area/volume family was found. 

ged-math-workbook

That is a substantial mismatch with the official measurement practice, which includes formula application across shapes and solving for missing dimensions. 
GED

Data and probability — 188 items are concentrated in 39 means, 30 medians, 37 ranges, 51 marble probabilities and 31 sample projections. T1Q32/T1Q33/T1Q36/T2Q31/T2Q35 identify these recurring formats. The inventory has no mode, weighted/missing mean, counting/permutation/combination, compound-event probability or displayed-data interpretation family. 

ged-math-workbook +3

Those missing skills appear in GED’s published performance descriptors; more reordered mean lists do not fill them. 
GED

Graphs and functions — 172 items directly read a quadratic y-intercept, vertex or minimum: 76, 57 and 39 respectively. T7Q16/Q17/Q21/Q22/Q26 demonstrate the simplest branch. There are no displayed graph/table comparisons or function-identification tasks, despite those being explicit A7 indicators. 

ged-math-workbook

 
GED

Expressions and equations — The inventory is much narrower than its apparent algebra emphasis. For example, there are only five items in the general-quadratic-equation-solving family, including T1Q29 and defective T26Q30. This does not include the separate factored-intercept or root-count families. There is no meaningful contextual quadratic-model construction, and rational-expression work is confined to cancellation rather than varied operations. 

ged-math-workbook +2

 
GED

Calculator, formula-sheet and response-format rules

The current GED Mathematical Reasoning test allows 115 minutes, with an initial calculator-prohibited part and onscreen calculator access in Part 2. A personal TI-30XS is permitted at a test center. GED supplies a calculator reference sheet and math formula sheet. 
GED

T1Q1–T35Q44 — The export exposes no calculator-permission flags, designated opening section or tool-access instructions. T1Q1–T1Q5 primarily test functions, equations and systems; they do not establish coverage of the required foundational opening. GED’s calculator-prohibited guidance describes approximately 12% of points, not half the test. 

ged-math-workbook

 
GED

T1Q38/T1Q39 — Do not imply that the supplied GED formula sheet provides trigonometric ratios or the coordinate-circle equation. It does not. It does provide, among other relationships, standard measurement formulas, the quadratic formula and the Pythagorean theorem. Absence from the sheet alone does not prove a topic is out of scope; the assessment-target comparison is the controlling distinction. 

ged-math-workbook

 
GED

T1Q1–T35Q44 — All 1,540 exported items are four-option multiple choice. There are no fill-in-the-blank definitions, accepted-answer sets or input/tolerance rules. GED also uses fill-in-the-blank, drag-and-drop, drop-down and select-an-area items. 

ged-math-workbook

 
GED

The mathematical-equivalence check here does not validate an unseen typed-response engine. Questions such as T1Q29 also demonstrate why simply hiding choices is insufficient: complete solution sets need appropriate instructions and scoring. 

ged-math-workbook

The 44-question drill length is not, by itself, a scoring defect. Workbook drills may vary in length. The export does not establish authentic timing, section transitions, tool access or a validated GED score conversion, so these sets should not be treated as verified simulations solely because they are labeled tests.

6. STRUCTURAL CHECK

Scope: T1Q1–T35Q44.

Section A finding	Independent result
1,540 questions across 35 drills	Confirmed: exactly 44 per drill.
Four choices per item	Confirmed: 6,160 options.
Invalid key letters or missing choices	None found.
Missing explanations	None found.
Duplicate choice strings	None found, but four mathematical-equivalence pairs occur in three items.
Duplicate normalized stems	None found within B19, but 29 same-givens repeated-task groups occur.
Very short explanations: 671	Reproduced using fewer than 40 characters, not words.
Image references	Zero; no explicit broken-image dependency established.
Domain/skill tags	No item-level tags exposed; topTags empty.
Long same-answer runs	The displayed list is truncated and includes a cross-drill sequence.

Section A’s basic string/count checks are reproduced. They do not establish mathematical uniqueness or distinct practice. 

ged-math-workbook

Longest-option cue rate

Lengths exclude the answer letter and retain mathematical signs, punctuation and internal spaces.

Measure	Count	Fraction
Keyed answer is uniquely longest	63	4.1%
Keyed answer is tied for longest	718	46.6%
Keyed answer is longest including ties	781	50.7%
All four options have identical length	283	18.4%

The final row is a subset of tied cases, not an additional category.

Choosing uniformly among the longest options would produce an expected 20.6% match to the supplied keys. Therefore 50.7% is not a successful longest-answer heuristic. There is no positive bank-wide longest-option advantage, although individual templates remain conspicuous—for example, the extended fixed-fee answer in T1Q12. 

ged-math-workbook

Answer distribution and periodicity

The supplied counts are reproduced: A377, B381, C376 and D406. The best-fitting repeating permutation of A/B/C/D matches 420/1,540 keys—27.3%. This is an optimized descriptive check, not a formal validity test; it does not show a near-deterministic cycle. There is no justification for changing correct answers simply to force equal letter totals. 

ged-math-workbook

Same-letter runs

There are 17 within-drill runs of at least four identical keys, with a maximum length of six.

T16Q9–T16Q14 is the six-B run. It is real, but the run itself is not evidence that the keys are wrong. 

ged-math-workbook

T5Q42–T5Q44 followed by T6Q1 produces Section A’s “T6Q1 key C ×4.” That crosses a drill boundary; there is no four-C run inside Test 6. 

ged-math-workbook

The global scan finds 18 qualifying runs, but Section A prints only the first 15. Later omissions include the cross-boundary T30Q41–T31Q1, C ×5, and the within-drill T35Q25–T35Q29, A ×5. Reset detection at each drill boundary and report the full count separately from examples. 

ged-math-workbook +2

Explanation length

671/1,540 = 43.6% of explanations are under 40 characters; median length is 43.5 characters.

That is an instructional-review signal, not an automatic failure threshold. T1Q42 can explain its direct volume calculation briefly, while the longer T5Q6 explanation teaches an invalid inference. Correctness and sufficient reasoning matter more than a character minimum. 

ged-math-workbook +1

7. TOP FIXES

Quarantine T5Q6, T9Q22, T25Q1 and T26Q30. Review affected customer scores; do not retain arbitrary single keys where multiple choices are correct.

Repair the system and solution-set generators. Require unique solvability for T5Q6/T25Q1-type questions, normalize unordered roots for T9Q22/T26Q30, and replace the equivalent distractor in T3Q19.

Correct all eight defective explanations. Repair the two identity-to-solution inferences and the six salary calculations listed in Section 3. Preserve the valid salary keys and declare units explicitly.

Rebuild item-level GED target mapping across T1Q1–T35Q44. Replace the untagged 15/15/7/7 assembly with auditable GED reporting categories. Verify the quantitative/algebraic allocation rather than inferring it from position.

Segregate the 85 circle-equation/trigonometry items from core GED-aligned practice. Start with T1Q38/T1Q39/T1Q41 and the complete five-item trigonometry list. Adjudicate the exponential and cubic-factor families separately; do not discard valid rational-expression work such as T1Q26.

Restore foundational arithmetic lost from B14. Use the gaps illustrated by B14 T1Q6/T1Q13/T1Q32/T1Q36/T3Q16 to rebuild numerical fluency. B19 T1Q20’s symbolic exponent rule is not a substitute.

Rebuild measurement breadth. Reduce repetitions such as B19 T1Q40/T1Q42/T1Q44 and add area, perimeter, surface area, other solids, composite figures and unknown-dimension problems using the supplied GED formulas.

Add visual and constructed-response practice with validated scoring. Diversify T1Q32/T1Q33/T1Q36-style data tasks and T7Q16/Q17/Q21/Q22/Q26-style equation reading. Include graph/table interpretation, varied probability and purpose-built typed responses.

Differentiate B19 from B14 and constrain repetitive assembly. Remove same-givens repeats such as B19 T12Q35/T23Q12/T25Q31/T9Q18/T19Q41; prevent within-drill duplicates such as T25Q31/T25Q35 and seven-question clusters such as the T4 unit-price set.

Validate delivery and rerun the full audit. Check the calculator-prohibited opening, Part 2 tools, formula-sheet access and any simulation claims. Correct boundary handling around T5Q44/T6Q1 and T30Q44/T31Q1, report uncapped structural totals, and retain separate strict-longest and tied-longest metrics.

8. SUMMARY ROW

| B19 — GED Math Workbook | 4.5/10 | 4 multi-answer items | 8 confirmed | PULL | Major GED coverage mismatch; 44/57 task families shared with B14, 64 same-givens repeats, and uniquely longest key in 4.1%. |