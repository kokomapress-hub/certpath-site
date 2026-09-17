# B14 — GED Math Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/ged-math.json` — 1518 questions / 33 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall: 6.5/10

Audit dimension	Score
Answer-key correctness	10.0/10
Explanation accuracy	8.0/10
Item quality and distractors	4.0/10
Exam-blueprint alignment	3.5/10
Structural hygiene	7.0/10

No wrong, ambiguous, or answerless items were found by the full-bank mathematical checks. The release blockers are 17 explanations containing false signed equalities, substantial content misclassification, repeated templates, and missing GED response-format and visual-reasoning practice. For example, T5Q29 calculates a negative salary change but incorrectly displays its quotient as positive; T1Q3 classifies a median calculation as “functions.” 

ged-math +1

The apparent 45% quantitative / 55% algebraic alignment is not reliable. My content inventory found 162 statistics/probability items inside “functions” and 55 symbolic exponent-expression items inside “rational.” These require recoding before domain scores or blueprint-compliance claims can be trusted. Representative misclassifications include T1Q3, T1Q10, T1Q17 and T2Q2. 

ged-math +3

Audit coverage: I independently recomputed all 1,518 items, checked all 6,072 options, and compared all 9,108 within-item option pairs for mathematical equivalence. This included unordered solution sets, ordered coordinate pairs, algebraic identities, inequality solution sets, system consistency, contextual feasibility and requested rounding.

I directly read 301 unique complete items, including their explanations. Selection comprised Q1, Q12, Q23, Q34 and Q46 from every drill; the first example of each of the 70 solving families; all flagged salary, decimal-instruction and long-decimal cases; and targeted duplicate/run examples. This is full computational coverage with a 19.8% targeted editorial review, not a claim that every explanation received an independent manual copyedit.

Release decision: PULL. Do not continue presenting the current bank as comprehensive, blueprint-balanced GED Mathematical Reasoning preparation. This decision concerns coverage and instructional reliability—not demonstrated answer-key corruption.

2. WRONG OR AMBIGUOUS KEYS

T1Q1–T33Q46 — None found — retain the existing keys unless an item is subsequently rewritten.

The independent checks found:

Check	Result
Keyed option mathematically incorrect	0
More than one correct option	0
No correct option available	0
Mathematically equivalent correct-choice pairs	0
Mathematically equivalent distractor pairs	0
Parser failures left unresolved	0

T1Q26 and the other numerical system-solving items: the offered solutions were tested against both equations. No dependent system masquerading as a uniquely solvable system was found. T1Q26, for example, has the unique solution (5,2), correctly keyed A. 

ged-math

T1Q11 and the other nine successive-percent-change items: the answers satisfy the requested nearest-tenth precision. No unrounded-answer mismatch was found. T1Q11 correctly gives 100(1.10×0.85−1)=−6.5%, keyed C. 

ged-math

T32Q42 — Correct key D, 1/12. The sum 10 occurs through (4,6),(5,5),(6,4), giving 3/36=1/12. Its distractors 1/9, 1/10 and 10/36 are distinct. 

ged-math

3. EXPLANATION ERRORS
Seventeen salary-change explanations contain false equalities

In each item below, the key correctly identifies a decrease, but the explanation divides a negative number by a positive number and incorrectly prints a positive quotient.

Item	Incorrect displayed equality	Required correction; key remains
T5Q29	(−15)/100=0.15	(−15)/100=−0.15; C, 15% decrease. 

ged-math


T5Q31	(−60)/200=0.3	(−60)/200=−0.3; C, 30% decrease. 

ged-math


T5Q39	(−5)/25=0.2	(−5)/25=−0.2; A, 20% decrease. 

ged-math


T7Q22	(−36)/120=0.3	(−36)/120=−0.3; A, 30% decrease. 

ged-math


T8Q12	(−10)/50=0.2	(−10)/50=−0.2; C, 20% decrease. 

ged-math


T10Q19	(−48)/120=0.4	(−48)/120=−0.4; D, 40% decrease. 

ged-math


T14Q16	(−24)/60=0.4	(−24)/60=−0.4; D, 40% decrease. 

ged-math


T17Q16	(−4)/20=0.2	(−4)/20=−0.2; D, 20% decrease. 

ged-math


T18Q34	(−12)/120=0.1	(−12)/120=−0.1; A, 10% decrease. 

ged-math


T20Q19	(−6)/20=0.3	(−6)/20=−0.3; B, 30% decrease. 

ged-math


T21Q10	(−15)/50=0.3	(−15)/50=−0.3; B, 30% decrease. 

ged-math


T23Q2	(−80)/200=0.4	(−80)/200=−0.4; B, 40% decrease. 

ged-math


T27Q14	(−5)/20=0.25	(−5)/20=−0.25; A, 25% decrease. 

ged-math


T28Q33	(−30)/100=0.3	(−30)/100=−0.3; A, 30% decrease. 

ged-math


T28Q35	(−6)/40=0.15	(−6)/40=−0.15; A, 15% decrease. 

ged-math


T31Q35	(−32)/80=0.4	(−32)/80=−0.4; A, 40% decrease. 

ged-math


T31Q44	(−15)/60=0.25	(−15)/60=−0.25; B, 25% decrease. 

ged-math

Generator correction: distinguish signed percent change, (new−old)/old, from the positive magnitude of a decrease, (old−new)/old. Either approach works; mixing them produces the false equalities above.

T2Q20, T5Q29 and the other salary-template instances — undeclared unit scaling. The explanations also silently switch from dollars to thousands of dollars. For example, T2Q20 describes a $24,000 increase as “Change = 24.” Make the unit conversion explicit or retain the original dollar values throughout. This is a separate presentation defect, not an additional wrong key. 

ged-math +1

Confirmed mathematical explanation-error count: 17. The 30 decimal-method wording defects below are tracked separately rather than inflated into this false-calculation count.

4. ITEM QUALITY
Operation-independent explanation text: 30 items

The decimal template prints the same instruction for addition and multiplication:

“Line up the decimal points (or multiply, then place the decimal)”

T1Q13 and T2Q16 ask for addition, so “or multiply” is not an alternative method for the stated operation. T3Q12 and T4Q26 ask for multiplication, but the introductory addition-style instruction does not explain how to place the product’s decimal. The displayed numerical results are correct; the teaching text needs to be operation-specific. 

ged-math

Addition instances: T1Q13, T2Q16, T9Q4, T9Q31, T13Q3, T15Q22, T15Q24, T18Q32, T19Q43, T20Q43, T24Q20, T25Q3, T33Q10, T33Q41, T33Q44.

Multiplication instances: T3Q12, T4Q26, T6Q16, T10Q13, T12Q5, T13Q36, T13Q42, T14Q9, T17Q34, T19Q9, T22Q44, T24Q11, T29Q41, T32Q24, T32Q38.

These are the two branches of one defective explanation template. Repair both branches, retaining the independently verified numerical answers.

Raw floating-point output: four items

T7Q28, T9Q25, T10Q1, T21Q14 — distractors expose 0.3333333333333333 or its negative. Use an exact fractional representation when that is the intended mathematical quantity. The excessively long decimal makes the option visually unlike the others and exposes the generator’s internal numeric representation. Existing keys remain correct. 

ged-math

Exact-stem uniqueness conceals repeated mathematical tasks

T2Q6, T14Q37, T18Q41 and T21Q27 — the same five-number mean problem appears four times. Every item uses the multiset {10,11,12,13,14}; only its order and the option order change. All answers are 12. These are not four meaningfully different practice experiences. 

ged-math

Across T1Q1–T33Q46, my inventory found 32 simple-mean items, all using five consecutive integers, with only 15 distinct underlying data sets. That creates 17 repetitions beyond the first occurrence even though none has an identical stem string.

T4Q37 and T6Q33 — commutative duplication. The tasks 2/5×1/4 and 1/4×2/5 have the same answer and the same distractor values in a different order. This pair should be detected by a semantic duplicate check. 

ged-math

Drill assembly overuses individual templates

T32Q4, T32Q5, T32Q25, T32Q27, T32Q29, T32Q34 and T32Q45 — seven instances of the same elementary linear-equation procedure in one 46-item drill. That is 15.2% of the drill devoted to the same two-step operation. Changing coefficients does not supply seven different reasoning demands. 

ged-math

T14Q5, T14Q10, T14Q11 and T14Q41 — four system-classification questions in one drill all resolve through the same observation: equal slopes and different intercepts mean no solution. The keys are correct, but the assembly is repetitive and gives little practice distinguishing all possible system relationships. 

ged-math

Feasibility giveaways

T1Q10 — 9/4 is offered as a probability. This can be discarded without calculating the requested event probability. T2Q5 — −$5 is offered as an original price despite a positive price after discount. These are weak distractors, not scoring defects. 

ged-math +1

Scope extensions are taking space from missing core skills

T1Q5, representing 15 two-variable inequality point-testing items, does not directly match the named one-variable inequality targets. T1Q33, representing nine absolute-value equations, and T3Q9, representing 28 radical equations, likewise need explicit justification as extensions rather than automatic credit toward core target coverage. Numerical absolute value and square-root computation are not the same tasks as solving those equation families. 

ged-math +2

 
GED
+1

T1Q7 and T1Q15, representing 14 arc-length and 23 sector-area items, are not automatically invalid GED applications: they can use proportions and circle relationships. However, repeatedly testing these extensions while omitting surface area, composite solids and other core measurement work is a poor allocation. Do not treat their presence as a substitute for the missing targets. 

ged-math +1

Visual practice is absent, not demonstrably broken

T1Q1–T33Q46 — no supplied graph, table, diagram or image-based stimulus was found in the complete inventory. I did not find a question that explicitly depends on an unavailable figure: items such as T1Q1 provide their coordinates in text. The defect is the absence of visual interpretation and interaction practice, not a proven missing-image-file error. 

ged-math +1

5. BLUEPRINT COVERAGE
Official benchmark

I checked against GED Testing Service’s Assessment Guide for Educators: Mathematical Reasoning, June 2016, including its assessment targets and Appendix C allocations. This remains linked from GED’s current educator resources. I cross-checked the operational rules against the GED Educator Handbook, Edition 7, current test-subject pages and calculator-prohibited guidance, accessed 16 September 2026. This is not an invented “2026 blueprint.” 
GED
+2
GED
+2

The official broad allocation remains 45% quantitative problem solving and 55% algebraic problem solving. 
GED

The declared allocations look aligned—but the labels do not describe the content accurately
Official content grouping	Official allocation	Corresponding bank label	Bank count	Per drill
Rational numbers, Q1–Q3	25%	rational	396 — 26.1%	12
Measurement, data and probability, Q4–Q8	20%	measurement	297 — 19.6%	9
Expressions and equations, A1–A4	30%	algebra	462 — 30.4%	14
Graphs and functions, A5–A7	25%	functions	363 — 23.9%	11

Official allocations are from Appendix C; bank totals were independently reproduced from the item labels. 
GED
+3
GED
+3
GED
+3
 

ged-math

T1Q3, T1Q10 and T32Q42 illustrate the main coding failure: statistics and probability have been placed under “functions.” There are 162 such items, or 44.6% of that label. Their distribution is 32 means, 29 medians, 30 ranges, six missing-value means, 11 weighted means, 17 sample projections, 36 marble probabilities and one dice probability. 

ged-math +2

T1Q17, T2Q2 and T4Q15 illustrate the opposite error: 55 symbolic exponent-expression simplifications are counted as “rational” rather than algebraic expression work. 

ged-math +2

A diagnostic recode, retaining the bank’s geometry grouping but correcting those two misclassifications, gives:

Broad grouping	Recomputed count	Share
Quantitative	800	52.7%
Algebraic	718	47.3%

This is not a certified final target map. The 81 coordinate-distance/midpoint items and the extension families still need individual target assignments. Moving all 81 coordinate items to algebraic bookkeeping would instead produce 47.4% quantitative / 52.6% algebraic. That sensitivity is precisely why the current labels cannot establish compliance.

The more robust finding is that only 201 items remain in the actual function/line families, and none provides genuine graph- or table-based interpretation.

Material coverage gaps

The following are findings from the complete T1Q1–T33Q46 family inventory; the cited IDs identify the existing content that currently occupies the relevant allocation.

Area	Bank finding
Foundational number sense	T1Q17/T2Q2 emphasize symbolic exponent rules, but the inventory contains no fraction/decimal ordering, LCM/GCF, number-line absolute-distance, cube-root or undefined-expression task family. These omissions are conspicuous against GED’s own study examples and calculator-prohibited guidance. 

ged-math +1

 
GED
+1

Applied ratios and measurement conversions	T1Q2, T1Q18 and T1Q27 exemplify 52 unit-price questions, all built around the same pounds-and-cost structure. The inventory has no scale-drawing or unit-conversion task family. 

ged-math +2


Three-dimensional measurement	T1Q4/T3Q8 represent 32 rectangular-box volumes and 18 cylinder volumes. There are no surface-area tasks, other solid-volume families, composite-solid tasks or reverse problems finding a dimension from volume/surface area. 

ged-math +1


Data interpretation	T1Q3/T2Q40 represent list-based summaries, not interpretation of displayed data. No chart, frequency-table, box-plot, histogram or scatter-plot task family was found. Mode is also absent. 

ged-math +1


Counting and probability breadth	T1Q10/T1Q29/T32Q42 represent 36 single-marble probability items and one dice-sum item. No permutations/combinations family was found. The single dice item should not be treated as broad compound-event coverage. 

ged-math +2


Algebraic breadth	T1Q23/T1Q28/T1Q37 repeat direct equation solving. T1Q45 illustrates the integer-root quadratic approach. The inventory lacks contextual quadratic-model construction and broader quadratic methods; six rational-expression simplification items do not establish coverage of the full range of rational-expression operations. 

ged-math +3


Graphs and functions	T1Q14/T1Q31/T1Q35 test reading a coefficient, reading vertex form or substitution. There is no function-identification task using a table/graph, no graph-based interval interpretation, and no comparison of functions presented in different representations. 

ged-math +2

The measurement, data, counting and representation gaps concern explicit assessment targets—not a preference for making the bank harder. 
GED
+1

Calculator rules: absent implementation evidence

The current GED test allows 115 minutes, has a calculator-prohibited opening and permits an onscreen calculator in Part 2. A personal TI-30XS is allowed for U.S. test-center delivery; remotely proctored testing prohibits a physical calculator. GED’s handbook separately specifies virtual-calculator use for international students. 
GED
+2
GED
+2

GED’s calculator-prohibited teaching guidance describes that portion as approximately 12% of the test’s points, covering foundational arithmetic and number sense—not half the test. 
GED

T1Q1–T33Q46 — the export supplies no calculator-permission flags, opening-section designation or calculator instructions. T1Q1–T1Q5 mix coordinate distance, unit pricing, median, volume and two-variable inequality testing; that sequence does not demonstrate deliberate construction of the calculator-prohibited portion. This is an evidence/implementation gap, not a false calculator rule printed in the bank. 

ged-math

Formula-sheet rules: distinguish provided formulas from derived ones

GED supplies a formula sheet emphasizing application rather than memorization. The official sheet includes standard area/volume formulas, slope, the quadratic formula and the Pythagorean theorem. Its entry named “distance formula” is d=rt, not the coordinate-distance formula. It does not list midpoint, arc-length or sector-area formulas. 
GED

T1Q1, T1Q7, T1Q9 and T1Q15 — do not imply that their coordinate-distance, arc, midpoint and sector formulas are all directly supplied on the GED sheet. Coordinate distance can be derived using the supplied Pythagorean relationship; arc and sector work can use proportional reasoning. Those distinctions need to be taught. 

ged-math +2

T1Q4/T3Q8 — formula use is almost entirely direct substitution in the solid-volume families. Broaden it to selecting a relevant formula, interpreting its variables and solving for an unknown dimension.

Fill-in-the-blank and other response formats: missing

GED explicitly includes fill-in-the-blank, drag-and-drop, drop-down and select-an-area/hot-spot items, alongside multiple choice. Its official calculator-prohibited examples include entering a radical expression using the symbol selector, so typed-response practice is not limited to entering whole numbers. 
GED
+1

T1Q1–T33Q46 — all 1,518 exported items have four options and one letter key. There are no exported constructed-response definitions, accepted-answer sets, precision/tolerance rules or symbol-entry instructions. 

ged-math

T1Q23, T3Q16 and T1Q45 illustrate distinct response demands that should receive purpose-built typed-answer practice: a numerical solution, a fractional value and a complete solution set. Merely hiding their choices would not validate a fill-in-the-blank scoring implementation. 

ged-math +2

The option-equivalence audit performed here does not test an unseen typed-answer engine. No fixed GED fill-in-the-blank percentage is asserted.

6. STRUCTURAL CHECK

Scope: T1Q1–T33Q46.

Section A finding	Independent result
1,518 questions / 33 drills	Confirmed: every drill has exactly 46 questions.
Four choices per item	Confirmed: 6,072 options.
Invalid key letters: zero	Confirmed.
Missing choices/explanations: zero	Confirmed.
Duplicate choice sets: zero	Confirmed, including the stronger mathematical-equivalence check.
Duplicate stems: zero	Confirmed at the normalized-string level only. Reordered data and commutative duplicates remain.
Very short explanations: 503	Reproduced using fewer than 40 characters, not words.
Image references: zero	Confirmed in the export.
Domain totals	Confirmed numerically; not validated semantically.
Long same-answer runs	The displayed list is incomplete and includes a cross-drill run.

The relevant supplied report fields are in Section A. 

ged-math +1

Answer-key distribution

A = 382, B = 416, C = 340, D = 380. The distribution does not warrant changing correct keys or imposing an exact 25% quota. Repairing coverage and explanations has much higher value. 

ged-math

The run report needs per-drill boundaries and an uncapped total

My recomputation found 19 runs of at least four identical letters within individual drills, or 21 when the bank is incorrectly treated as one continuous sequence.

T18Q46–T19Q3 — the reported “T19Q3 key A ×4” crosses the drill boundary. There are three initial A answers in T19, preceded by the final A in T18—not a four-answer run inside T19. 

ged-math

The displayed list also omits later within-drill runs, including T27Q39–T27Q43, B ×5, and T28Q18–T28Q22, B ×5. Section A appears to show only the first 15 global runs. Report the full count separately from any truncated example list. 

ged-math +1

These runs are not evidence that the corresponding keys are wrong.

Short explanations and hidden duplication

503/1,518 = 33.1% of explanations are under 40 characters. That threshold alone is unsuitable as a commercial-quality verdict: T1Q4 gives a complete calculation in a short explanation, whereas the longer T5Q29 contains a false equality. Judge instructional sufficiency, not character count. 

ged-math +1

T2Q6/T14Q37/T18Q41/T21Q27 and T4Q37/T6Q33 demonstrate why “zero duplicate stems” is not equivalent to “zero duplicated mathematical tasks.” Add canonical data-set, expression and context checks to the structural pipeline. 

ged-math +1

The individual skill tags behind Section A’s topTags are not exposed throughout Section B. I reproduced the visible domain counts, but cannot independently certify every hidden skill-tag aggregate from its printed total alone.

7. TOP FIXES

Repair all 17 salary-decrease explanations listed in Section 3. Start with the shared generator responsible for T5Q29/T5Q31, preserve signed arithmetic and state units. Do not change their correct answer keys.

Replace the current domain-label bookkeeping with item-level GED target mapping. Recode the statistics/probability families exemplified by T1Q3/T1Q10/T32Q42 and the symbolic exponent families exemplified by T1Q17/T2Q2/T4Q15. Recalculate domain reports before making alignment claims.

Add genuine graph and table interpretation. Replace part of the repeated list-statistics allocation represented by T2Q6/T14Q37/T18Q41/T21Q27 with visual-data tasks, and part of T1Q14/T1Q31-style equation reading with graph-based function interpretation.

Implement and validate constructed-response practice. Use purpose-built numerical, fractional and symbolic-response items—not simply hidden options from T1Q23/T3Q16/T1Q45. Test equivalent valid forms, complete solution sets, requested precision and invalid-input rejection.

Create an explicit calculator-prohibited opening and Part 2 tool workflow. Across T1Q1–T33Q46, supply section flags and verified calculator/formula-sheet access. Do not assume that the present T1Q1–T1Q5 sequence establishes the required opening-section coverage.

Restore missing foundational number-sense coverage. Reduce the 55 symbolic exponent variants represented by T1Q17/T2Q2/T4Q15 to create space for ordering, factors/multiples, numerical roots, undefined expressions and number-line reasoning.

Rebuild measurement breadth and formula application. Diversify the box/cylinder families represented by T1Q4/T3Q8. Add surface area, other solids, composite figures and unknown-dimension problems; reduce repetitive coordinate and arc/sector allocations such as T1Q1/T1Q7/T1Q9/T1Q15.

Constrain extensions and broaden core algebra. Review the families represented by T1Q5, T1Q33 and T3Q9 against named targets. Redirect excess extension coverage toward contextual equations, varied systems, rational-expression operations and quadratic reasoning.

Add semantic duplicate and within-drill family limits. Detect the reordered-mean quartet and commutative fraction pair above. Prevent assemblies such as T32Q4/Q5/Q25/Q27/Q29/Q34/Q45 and T14Q5/Q10/Q11/Q41 from crowding out other skills.

Repair presentation templates and the audit report. Separate addition/multiplication explanations for the 30 listed decimal items; remove raw repeating-decimal output from T7Q28/T9Q25/T10Q1/T21Q14; reset run detection at drill boundaries and report uncapped totals. Rerun the full mathematical checks after regeneration.

8. SUMMARY ROW

| B14 — GED Math Prep | 6.5/10 | 0 found across all 1,518 items | 17 confirmed mathematical errors; 30 additional instruction-quality flags | PULL | Correct keys, but unreliable domain mapping, repetitive coverage, missing visual and typed-response practice, and recurring explanation defects. |