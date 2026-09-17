# B17 — Digital PSAT/NMSQT Math Workbook — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/psat-math-workbook.json` — 1584 questions / 36 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 5.0/10

Audit dimension	Score
Answer-key correctness	9.0/10
Explanation accuracy	7.5/10
Item quality and distractors	2.5/10
Exam-blueprint alignment	2.0/10
Structural hygiene	5.5/10

Ten items have multiple correct answers. Seventeen explanations require correction. Seven system-of-equations questions offer four valid solutions while scoring only one—for example, T6Q7. Three further questions duplicate the correct solution set across choices. 

psat-math-workbook

The bank also contains 100 circle-topic items outside the PSAT-specific content specifications used for this audit, while omitting right-triangle and right-triangle trigonometry practice. Examples include T1Q38 and T7Q40. College Board’s public pages contain an inconsistency on this point; Section 5 identifies it and explains the benchmark used. 

psat-math-workbook +1

 
SAT Suite

B12 overlap: all 56 B17 task families already occur in B12. A conservative comparison also identifies 51 B17 items—3.2%—with the same mathematical givens and task, despite wording or ordering differences. Buying both primarily adds numerical variants, not additional kinds of practice.

Longest-option rate: the keyed answer is uniquely longest in 90/1,584 items—5.7%. Including ties, it is longest in 807/1,584—50.9%. The latter is not the success rate of a longest-answer strategy; Section 6 separates the measures.

Audit coverage: I independently recomputed all 1,584 items, evaluated all 6,336 options, and compared all 9,504 within-item option pairs for mathematical equivalence. No parser failures remained unresolved. Editorial review covered 366 complete items, including their explanations—23.1%: the opening three drills, fixed positions across all drills, representatives of every task family, every computationally flagged item, and targeted overlap/repetition examples. B12’s complete 1,540-item export was processed for comparison; this was not a second full manual audit of B12.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
Seven dependent systems have four correct choices

In each case, the first equation is a multiple of the second. The system has infinitely many solutions, and every offered ordered pair satisfies both equations.

Item	What is wrong	Correct key
T6Q7	2x+2y=18 and x+y=9 are equivalent. All offered points lie on x+y=9. Printed key: C.	A, B, C and D. 

psat-math-workbook


T20Q3	5x+5y=65 and x+y=13 are equivalent. Printed key: C is not uniquely correct.	A, B, C and D. 

psat-math-workbook


T21Q11	3x+3y=33 and x+y=11 are equivalent. Printed key: B is one of four valid choices.	A, B, C and D. 

psat-math-workbook


T29Q2	5x+5y=55 and x+y=11 are equivalent. All four choices work. Printed key: A.	A, B, C and D. 

psat-math-workbook


T31Q2	3x+3y=24 and x+y=8 are equivalent. Printed key: A is not uniquely determined.	A, B, C and D. 

psat-math-workbook


T34Q5	4x+4y=48 and x+y=12 are equivalent. Printed key: D is one of four valid choices.	A, B, C and D. 

psat-math-workbook


T36Q6	2x+2y=28 and x+y=14 are equivalent. Every offered point works. Printed key: D.	A, B, C and D. 

psat-math-workbook

These are underdetermined systems, not inconsistent systems. Changing the single-letter key would not repair them.

Three questions duplicate the correct solution set

T10Q24 — Reversing the intercept order creates a second correct choice — correct keys: A and B.

For y=(x+1)(x−1), the x-intercepts occur at x=−1 and x=1. A and B express the same complete set. Additionally, C, “x=−1 and x=−1,” and D, “x=−1,” express the same incomplete set; this item has equivalent distractors as well. 

psat-math-workbook

T19Q26 — Two options express the same absolute-value solutions — correct keys: B and C.

∣3x∣=6⟹x=±2.

B lists 2,−2; C lists −2,2. Their order does not distinguish the answers. 

psat-math-workbook

T30Q19 — Two choices contain the same quadratic intercepts — correct keys: B and C.

For y=(x+2)(x−2), both B and C give the complete set {−2,2}. 

psat-math-workbook

Count: 10 multi-answer items. No additional wrong-letter-only item or item with no valid offered answer was found in the full computational pass.

3. EXPLANATION ERRORS
Seven explanations infer a particular solution from an identity

T6Q7, T20Q3, T21Q11, T29Q2, T31Q2, T34Q5 and T36Q6 — Each explanation reaches 0y=0, then incorrectly announces a particular value of y.

For example, T6Q7 reaches 0y=0 and concludes y=7, x=2. That pair satisfies the system, but nothing in the identity selects it over the other solutions. The same invalid inference appears in all seven listed explanations. Required correction: explain dependence and nonuniqueness, and repair the corresponding questions before restoring single-answer scoring. 

psat-math-workbook +2

Ten salary-decrease explanations contain false signed equalities

The decrease identified by each key is correct. The explanation incorrectly turns a negative quotient into a positive number.

Item	Incorrect equality	Required correction; retain key
T2Q32	(−10)/25=0.4	(−10)/25=−0.4; B, 40% decrease. 

psat-math-workbook


T6Q32	(−36)/120=0.3	(−36)/120=−0.3; A, 30% decrease. 

psat-math-workbook


T15Q35	(−16)/80=0.2	(−16)/80=−0.2; C, 20% decrease. 

psat-math-workbook


T16Q37	(−18)/120=0.15	(−18)/120=−0.15; B, 15% decrease. 

psat-math-workbook


T20Q35	(−5)/50=0.1	(−5)/50=−0.1; B, 10% decrease. 

psat-math-workbook


T22Q32	(−10)/100=0.1	(−10)/100=−0.1; B, 10% decrease. 

psat-math-workbook


T27Q34	(−30)/100=0.3	(−30)/100=−0.3; C, 30% decrease. 

psat-math-workbook


T28Q36	(−12)/120=0.1	(−12)/120=−0.1; A, 10% decrease. 

psat-math-workbook


T30Q33	(−4)/40=0.1	(−4)/40=−0.1; D, 10% decrease. 

psat-math-workbook


T33Q35	(−20)/80=0.25	(−20)/80=−0.25; B, 25% decrease. 

psat-math-workbook

Generator correction: distinguish signed percent change, (new−old)/old, from the positive magnitude of a decrease, (old−new)/old. Either convention works when used consistently.

T2Q32 and the other salary-template instances — units are also silently rescaled. A $10,000 decrease becomes “Change = −10” without declaring thousands of dollars. State the scaling or retain the original dollar amounts. This is separate from the false-equality count. 

psat-math-workbook

Confirmed explanation-error total: 17—seven invalid system inferences and ten sign errors. The seven system questions also appear in Section 2; they are not additional unique items.

4. ITEM QUALITY
B12 overlap: more numerical instances, not new task families

The comparison uses B17 T1Q1–T36Q44 and the complete B12 T1Q1–T35Q44 online-bank export—not the printed PSAT manuscript. B12’s retrieved export identifies its 1,540 questions and 35 tests. 

psat-math

Comparison measure	Result
Identical stems after normalizing case and whitespace	0 B17 items
Same mathematical givens and task after conservative normalization	51 B17 items — 3.2%
B17 task families already present in B12	56 of 56 — 100%
New B17 task families under this classification	0
Task families identified in B12	69

A task family here is an audit-defined solving template, such as evaluating two composed linear functions or reading a quadratic vertex from vertex form. It is not an official College Board construct code.

The 51 same-givens matches comprise 25 reordered mean-data questions, nine reversed-factor multiplication questions, nine reordered-factor intercept questions, four permuted box-dimension questions and four unit-price questions. I did not count questions merely because their final answers happen to match.

B17 item ↔ B12 item	Substantive overlap
B17 T1Q27 ↔ B12 T19Q44	(x−4)(x+6) versus (x+6)(x−4). Same factors, expansion and answer values. 

psat-math-workbook

 

psat-math


B17 T3Q31 ↔ B12 T2Q12	The same values 7–11 are reordered. Both ask for their mean, 9. 

psat-math-workbook

 

psat-math


B17 T5Q16 ↔ B12 T21Q16	The factors (x−1) and (x−2) are reversed; the requested intercepts remain 1 and 2. 

psat-math-workbook

 

psat-math


B17 T6Q43 ↔ B12 T30Q39	Box dimensions 7,10,5 become 10,5,7. Both volumes are 350. A changed distractor does not create a new mathematical task. 

psat-math-workbook

 

psat-math


B17 T7Q33 ↔ B12 T9Q40	Two pounds cost $6; find the price of seven pounds. Moving dollar notation between the stem and choices changes presentation, not the problem. 

psat-math-workbook

 

psat-math

Customer-value finding: most B17 questions have different numerical givens, but the workbook supplies a narrower collection of the same procedures. “Different questions” is defensible at a surface-text level; “distinct coverage” is not supported by this comparison.

The concentration increases substantially: B17 has 102 linear-composition items versus 26 in B12, 97 vertex-reading items versus 23, and 61 minimum-from-vertex-form items versus 14. The clusters in B17 T28Q16/Q17/Q20/Q24/Q27/Q28/Q29 and T7Q16/Q18/Q21–Q25 illustrate those repeated procedures. 

psat-math-workbook +1

Meanwhile, B12 T1Q15 tests the Pythagorean theorem, and B12 T6Q41 tests right-triangle trigonometric reasoning. No corresponding B17 task families were found. B17 therefore does not add complementary practice in those areas. 

psat-math

Internal duplication and assembly problems

T3Q31, T22Q35 and T34Q33 — Three presentations of the same mean problem. All use the multiset {7,8,9,10,11}; only ordering changes. Across B17, all 35 simple-mean items use five consecutive integers, with only 20 distinct underlying data sets. 

psat-math-workbook +1

T1Q1–T36Q44 — Conservative same-givens normalization identifies 27 repeated-task groups involving 58 items: 31 redundant copies beyond the first occurrence. This is stronger than an exact-stem comparison and narrower than labeling every same-template item a duplicate.

T7Q16, T7Q18 and T7Q21–T7Q25 — Seven vertex-reading questions in one drill. Five occur consecutively. Changing the coefficient or translating the vertex does not introduce a different representation or reasoning demand. 

psat-math-workbook

T28Q16, T28Q17, T28Q20, T28Q24 and T28Q27–T28Q29 — Seven compositions of two linear functions in one drill. This occupies 15.9% of that drill, without moving beyond nested substitution. 

psat-math-workbook

T1Q33 and T3Q32 — Different sample sizes, unchanged estimation task. Both use a population of 4,000 and a sample proportion of 30%; changing the sample from 400 to 500 does not change the calculation 0.30×4,000. These are not included in the strict same-givens count, but they further illustrate construct-level repetition. 

psat-math-workbook +1

Distractors and visible template artifacts

T10Q24 — Both correct choices and both distractors form equivalent pairs. A/B represent {−1,1}; C/D represent only {−1}. Across the bank, there are four equivalent-choice pairs in three items, counting T19Q26 and T30Q19. No additional equivalent-distractor-only item was found. 

psat-math-workbook +1

T1Q36; T2Q31 — Probability distractors exceed 1. Values such as 14/3 and 8/5 can be discarded without calculating the requested probability. T9Q35 similarly offers an original price of zero despite a positive price after discount. These are weak alternatives, not separate scoring defects. 

psat-math-workbook +2

T3Q17; T4Q13; T7Q25 — Unsimplified output remains visible: −3x+0, 5x+0, and a coefficient written as −1 before a squared factor. These are mathematically interpretable, but the remaining zero/identity coefficients make the generated presentation unnecessarily mechanical. 

psat-math-workbook +2

T1Q1–T36Q44 — No displayed graph, diagram or data-table stimulus was found. For example, T1Q30 asks about a “graph” but supplies only its equation. This is missing visual practice, not an established broken-image dependency. 

psat-math-workbook +1

5. BLUEPRINT COVERAGE
Official benchmark

The benchmark is College Board’s Assessment Framework for the Digital SAT Suite, version 3.01, August 2024, checked against its current program-specific educator specifications and content-domain pages on 16 September 2026. 
SAT Suite
+1

PSAT/NMSQT weights are not the SAT’s 35/35/15/15 allocation.

Domain	PSAT/NMSQT approximate weight
Algebra	35%
Advanced Math	32.5%
Problem-Solving and Data Analysis	20%
Geometry and Trigonometry	12.5%

These are the PSAT/NMSQT-specific specifications, not PSAT 8/9 specifications. 
SAT Suite

Above the PSAT ceiling: a documented scope problem

Yes—100 B17 items assess the SAT-only Circles topic under the detailed PSAT specifications. This is a content-scope finding, not a claim that all 100 questions are cognitively difficult. Reading a radius directly from an equation can be easy and still fall outside the specified PSAT topic coverage. 
SAT Suite

Complete B17 family	Count	Identifying examples
Radius from a circle equation	59	T1Q38, T2Q39–T2Q41. 

psat-math-workbook +1


Center from a circle equation	37	T2Q43, T3Q39. 

psat-math-workbook +1


Sector area	3	T1Q41, T5Q38, T19Q41—the complete three-item set. 

psat-math-workbook +2


Arc length	1	T7Q40. 

psat-math-workbook


Total	100	6.3% of the bank; 39.7% of its geometry-position items.

Official-source inconsistency: College Board’s student-facing PSAT Math overview lists Circles, while its detailed framework and current higher-education content-domain page identify Circles as SAT-only; the educator page’s PSAT table also omits it. I used the mutually consistent, program-specific specifications for this audit. I did not find a formal revised blueprint establishing that Circles has been added to PSAT. 
SAT Suite
+2
SAT Suite
+2

This does not exclude every calculation involving a round object. Standard area/volume applications are distinct from the separately defined Circles topic.

Additional advanced-topic scope review—not counted in the 100

T1Q18, T1Q26 and the other 36 cubic factor-theorem items — require explicit PSAT testing-point justification. These 38 questions require connecting a supplied linear factor to a polynomial root, then finding a constant. The detailed PSAT equivalent-expression coverage is narrower than SAT’s, but polynomial-function work is not categorically excluded. I therefore flag this family for scope adjudication rather than claiming that every cubic expression is above the PSAT ceiling. 

psat-math-workbook +1

 
SAT Suite
+1

T1Q16 and T14Q18 — rational-expression cancellation also needs explicit mapping. The detailed equivalent-expression table expressly includes simple rational-expression rewriting in the SAT column but not the corresponding PSAT list. These two mathematically correct items are additional scope-review cases, not counted as confirmed circle-topic exclusions. 

psat-math-workbook +1

 
SAT Suite

T1Q19, T1Q20 and T2Q28 should not be rejected merely for using absolute values, radicals or a discriminant. Simple absolute-value and radical equations and quadratic-solution reasoning fit the documented PSAT coverage. Likewise, right-triangle trigonometry is in scope for PSAT/NMSQT; the no-trigonometry restriction belongs to PSAT 8/9. 

psat-math-workbook +1

 
SAT Suite
+1

Difficulty limitation: the export contains no calibrated item-difficulty statistics or student-response evidence. I can identify scope mismatches and repetitive, low-complexity procedures; I cannot certify a psychometric PSAT difficulty ceiling from topic names alone.

Apparent domain quotas conceal content imbalance

T1Q1–T36Q44 — Every drill uses the same positional blocks: Q1–Q15 algebra-like tasks, Q16–Q30 advanced-math-like tasks, Q31–Q37 data/percentage tasks, and Q38–Q44 geometry. This produces apparent shares of 34.1%, 34.1%, 15.9% and 15.9%—closer to SAT-style allocation than PSAT’s.

There are no item-level domain tags to verify. My content classification moves 20 unit-price items, exemplified by T2Q12, into Problem-Solving and Data Analysis. Treating the 102 compositions of two linear functions, exemplified by T1Q21, as Algebra gives:

Classification	B17 count	Share of all 1,584
Algebra	622	39.3%
Advanced Math	438	27.7%
Problem-Solving and Data Analysis	272	17.2%
In-scope geometry families	152	9.6%
SAT-only circle-topic families	100	6.3%

These are reviewer classifications, not verified publisher tags or official item classifications. The relevant unit-rate and linear-composition examples are visible in the bank. 

psat-math-workbook +1

Classification sensitivity: retaining all 102 compositions in Advanced Math instead yields 32.8% Algebra and 34.1% Advanced Math. The data-analysis deficit and circle-topic allocation remain unchanged. Regardless of bookkeeping, repeated linear substitution does not establish broad nonlinear preparation.

Missing PSAT-level breadth

Geometry — After separating the 100 circle-topic items, 150 of the remaining 152 questions are box volumes or triangle-third-angle calculations. The other two are cylinder volumes. The full inventory has no Pythagorean, right-triangle trigonometry, similarity, scale-factor or composite-figure task family. T1Q39/T1Q40/T1Q44 illustrate how the allocation is instead spent repeating angle subtraction. 

psat-math-workbook +1

Problem-Solving and Data Analysis — 109 direct mean/median/range items and 61 single-marble probability items do not supply interpretation breadth. T3Q31/T3Q35/T2Q34 and T1Q36/T2Q31 exemplify those families. No displayed scatterplot/model interpretation, conditional-probability or standard-deviation-comparison family was found. These are PSAT testing points. 

psat-math-workbook +2

 
SAT Suite

I am not treating missing margin-of-error calculations or observational-study/experiment evaluation as mandatory PSAT gaps: the detailed content-domain specifications mark those as SAT-only. 
SAT Suite

Advanced Math — 214 questions simply read a vertex, minimum or y-intercept from an already useful quadratic form. Examples are T1Q24, T1Q25 and T1Q30. No substantive nonlinear-system or displayed nonlinear-graph interpretation family was found. 

psat-math-workbook +1

Response formats and test structure

PSAT/NMSQT Math has 44 questions in 70 minutes, arranged as two 35-minute modules. The specification includes 40 operational and four pretest questions, with student-produced response accounting for approximately 25% of operational questions. 
SAT Suite
+1

T1Q1–T36Q44 — All 1,584 exported items are four-option multiple choice. There are no typed-response definitions, acceptable-answer sets or precision rules. Nor does splitting the current order after Q22 produce representative modules: all geometry is concentrated at Q38–Q44. 

psat-math-workbook

Calculator use is permitted throughout PSAT Math. The export provides no evidence of calculator strategy, adaptive routing or validated score conversion. Organized workbook drills need not reproduce adaptive delivery, but 44-item length alone does not establish a full-length PSAT simulation. 
SAT Suite

6. STRUCTURAL CHECK

Scope: T1Q1–T36Q44.

Section A field	Independent result
1,584 questions across 36 drills	Confirmed: 44 per drill.
Four choices per item	Confirmed: 6,336 options.
Invalid key letters or missing choices	None found.
Missing explanations	None found.
Duplicate choice strings	None found, but four mathematical-equivalence pairs occur in three items.
Duplicate normalized stems	None found, but conservative same-givens checks identify 27 repeated-task groups.
Very short explanations: 712	Reproduced using fewer than 40 characters, not words.
Image references	Zero. No explicit broken-image dependency established.
Tags	Empty topTags; no item-level domain/skill tags exposed.
Long same-answer runs	The displayed list is incomplete and includes one cross-drill run.

Section A’s basic string-level findings are reproduced, but those checks do not establish unique correct answers or distinct mathematical tasks. 

psat-math-workbook +1

Longest-option cue rate

I measured trimmed option-text character length, excluding the answer label while retaining signs, punctuation and internal spaces. This measures the export, not rendered visual width.

Measure	Count	Fraction
Keyed answer is strictly longer than every distractor	90	5.7%
Keyed answer is tied for longest	717	45.3%
Keyed answer is longest including ties	807	50.9%
All four options have identical character length	231	14.6%

The last row is a subset of tied cases, not an additional category.

Choosing uniformly among the longest options, including ties, would produce an expected 22.1% match to the supplied keys. Therefore 50.9% is not the accuracy of a longest-answer strategy. The bank does not show a useful overall longest-option shortcut. Numerical items such as T1Q2 and sign-sensitive coordinate choices such as T1Q30 explain why ties and formatting must be separated. 

psat-math-workbook +1

Answer distribution and periodicity

The supplied totals are reproduced: A370, B400, C396 and D418. The best-fitting repeating A/B/C/D permutation across the complete bank matches 418/1,584 keys—26.4%, not a near-deterministic sequence. This is an optimized descriptive check, not proof of overall test validity. There is no justification for changing correct answers to force exact letter quotas. 

psat-math-workbook

Same-letter runs

There are 21 within-drill runs of at least four identical keys, with a maximum length of five.

T6Q44–T7Q3 — The report’s “T7Q3 key C ×4” crosses a drill boundary. It joins the last C of Test 6 to the first three Cs of Test 7; it is not a four-C run inside Test 7. 

psat-math-workbook

The displayed list also omits later runs, including T16Q31–T16Q35, D ×5, and T35Q41–T35Q44, D ×4. Report an uncapped total separately from the displayed examples, and reset detection at each drill boundary. These runs do not themselves show incorrect keys. 

psat-math-workbook +1

Explanation length

712/1,584 = 44.9% of explanations are under 40 characters; median length is 43 characters.

That count should trigger instructional review, not automatic rejection. T1Q42 can explain its direct volume calculation briefly, whereas the longer T6Q7 explanation teaches an invalid inference. Correctness and sufficient reasoning matter more than a character minimum. 

psat-math-workbook +1

7. TOP FIXES

Quarantine all 10 multi-answer items: T6Q7, T10Q24, T19Q26, T20Q3, T21Q11, T29Q2, T30Q19, T31Q2, T34Q5 and T36Q6. Review affected customer scores; do not arbitrarily preserve one letter where several choices are valid.

Fix the dependent-system generator. For the seven listed system items, require a unique solution when the stem asks for one. Test every offered point against both equations, and reject explanations that infer a numerical value from 0=0.

Remove or segregate the 100 SAT-only circle-topic items from scored PSAT-aligned practice. The affected families are circle-equation radius/center, the three sector items T1Q41/T5Q38/T19Q41, and arc item T7Q40. Document the official-source inconsistency rather than silently assuming SAT and PSAT coverage are identical.

Repair the 10 salary-decrease explanations listed in Section 3. Preserve negative quotients, identify decreases correctly and declare units. Their existing keys remain valid.

Replace displaced geometry content with missing PSAT tasks. Reduce repetitions such as T1Q39/T1Q40/T1Q44 and add Pythagorean, right-triangle trigonometry, similarity, scale and composite-figure reasoning.

Add set-based and semantic duplicate validation. Normalize solution sets for T10Q24/T19Q26/T30Q19, data multisets for T3Q31/T22Q35/T34Q33, and reordered factors/dimensions. Exact-string comparisons are insufficient.

Differentiate B17 from B12 deliberately. Remove same-givens repeats such as B17 T1Q27/T3Q31/T5Q16/T6Q43/T7Q33 and allocate complementary representations and reasoning tasks—not merely new coefficients.

Rebuild domain mapping and reduce family crowding. Review unit-price placement such as T2Q12, the linear-composition cluster in T28, and the vertex cluster in T7. Target PSAT’s 35/32.5/20/12.5 allocation rather than SAT-like blocks.

Add visual and student-produced-response practice with tested scoring. Convert the allocation—not merely hide choices—to include graph/table interpretation, conditional probability, standard-deviation comparison and purpose-built typed answers. Existing list-based items such as T3Q31/T3Q35/T2Q34 do not cover those representations.

Resolve remaining scope flags and validate difficulty before making readiness claims. Map the 38 cubic-factor items, represented by T1Q18/T1Q26, and the rational-expression items T1Q16/T14Q18 explicitly. Then rerun the complete mathematical audit, enforce assembly limits and correct cross-drill reporting around T6Q44/T7Q1–Q3.

8. SUMMARY ROW

| B17 — Digital PSAT/NMSQT Math Workbook | 5.0/10 | 10 multi-answer items | 17 confirmed | PULL | 100 SAT-only circle-topic items under the detailed PSAT specifications; all 56 task families overlap B12; uniquely longest key in 5.7%. |