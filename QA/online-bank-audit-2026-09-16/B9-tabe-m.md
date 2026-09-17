# B9 — TABE 11 & 12 Math Workbook, Level M — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/tabe-m.json` — 600 questions / 15 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 5.8/10 — PULL

Coverage audited: 600/600 questions across all 15 tests, including every key and explanation plus the complete structural report. No sampling. The file contains the claimed 600 questions and 15 tests and is live/published. 

tabe-m

Audit dimension	Score
Answer-key correctness	8.2/10
Explanation accuracy	8.0/10
Item quality / distractors	4.3/10
TABE Level M blueprint alignment	5.8/10
Structural hygiene	6.8/10

This is substantially better aligned than B7 Level A and B8 Level D. At the broad-domain level, several allocations are close to the current official Level M blueprint. The major problem is within-domain fidelity: many official objectives requiring line plots, graphs, angle measurement/additivity, nets, surface area, equivalent-expression reasoning, inequalities on number lines, and richer adult-context applications are missing.

The current official TABE 11&12 Level M blueprint lists Measurement & Data 15%, Number & Operations in Base Ten 15%, Fractions 20%, Operations & Algebraic Thinking 10%, Geometry 10%, Expressions & Equations 15%, Ratios & Proportional Relationships 3%, Statistics & Probability 5%, and The Number System 5%. The published rounded percentages total 98%. 
Tabetest
+1

Most calculations are correctly keyed. The release blocker is the combination of 13 wrong/ambiguous items, 413 very short explanations, zero visual items, repeated shallow templates, and incomplete coverage of several important Level M standards.

Decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

13 items require correction.

T2Q11 — ambiguous. 372,427 contains a 2 in both the thousands and tens places. A = thousands and B = tens are therefore both legitimate responses to “the digit 2.” Key B is not unique. 

tabe-m

T2Q21 — ambiguous/no unique mode. In 1, 4, 17, 1, 4, both 1 and 4 occur twice. The bank keys 1 and incorrectly describes it as occurring most often. 

tabe-m

T4Q2 — ambiguous. 868,229 contains 2 in both the hundreds and tens positions. A and D can both answer the stem depending on which 2 is referenced. 

tabe-m

T5Q28 — two identical correct choices. B is (7, 7) and D is (7, 7) *. Both represent the required coordinate. 

tabe-m

T8Q10 — ambiguous. 2/2=1. B = 1/1 and D = 1 are mathematically equivalent. With “simplify to lowest terms,” both are defensible unless the required answer form is specified. 

tabe-m

T8Q40 — two identical correct choices. C is (5, 5) * and D is (5, 5). 

tabe-m

T12Q23 — WRONG KEY. Correct key C = 790. The bank keys 780 for rounding 785 to the nearest ten. Standard rounding gives 790. 

tabe-m

T12Q32 — ambiguous. 5, 15, 5, 3, 3 is bimodal: 5 and 3 each occur twice. Both A and C are modes. 

tabe-m

T13Q14 — two identical correct choices. C is (4, 4) * and D is (4, 4). 

tabe-m

T14Q13 — ambiguous. 2,621,650 contains a 2 in both the millions and ten-thousands places. A and B are both legitimate without identifying which digit is intended. 

tabe-m

T14Q21 — ambiguous/no unique mode. In 3, 3, 1, 1, 18, both 3 and 1 are modes. The bank keys 1 while claiming it occurs most often. 

tabe-m

T15Q1 — two identical correct choices. A is $5 * and D is $5; both give the correct unit rate. 

tabe-m

T15Q7 — two mathematically identical correct answers. A = 15.0; C = 15. No answer-form requirement distinguishes them. 

tabe-m

There are additional duplicated wrong distractor values that do not create multiple correct keys but still weaken items—for example reduced/unreduced equivalent fractions appearing simultaneously.

3. EXPLANATION ERRORS

7 definite explanation-integrity errors, plus 413 explanations that are too short to function as strong workbook instruction.

The definite defects are:

T2Q11 — explanation identifies only the tens-place 2, ignoring the second 2 in the thousands place. 

tabe-m

T2Q21 — “1 appears most often” is false; 1 and 4 each appear twice. 

tabe-m

T4Q2 — explanation identifies only the hundreds-place 2 even though the same numeral also occurs in the tens place. 

tabe-m

T12Q23 — explanation itself incorrectly rounds 785 to 780 instead of 790. 

tabe-m

T12Q32 — “5 appears most often” is false because 5 and 3 tie.

T14Q13 — explanation ignores the second 2 in 2,621,650.

T14Q21 — “1 appears most often” is false because 1 and 3 tie. 

tabe-m

The machine report flags 413/600 explanations as very short. 

tabe-m

Many explanations merely restate a computation:

84 x 7 = 588.

The middle value ... is 15.

A 5-sided polygon is a pentagon.

For a workbook, these are acceptable answer checks but weak teaching explanations. Higher-value explanations should identify the method and at least one relevant misconception when the skill warrants it.

There are also presentation-quality errors such as “A 8-sided polygon is a octagon” and “1 feet = 12 inches.”

4. ITEM QUALITY

The overall grade range is generally more appropriate than B7/B8, but the difficulty distribution clusters too heavily around routine Grade 4 skills and does not sufficiently exercise the upper end of Level M.

I normalized changing numerical values across all 600 stems. The bank reduces to only about 85 recurring stem families, and the 20 most common templates account for 282/600 questions — 47% of the entire bank.

The largest repeated families include:

Stem family	Approx. count
Classify an angle from its degree measure	24
Locate a point by moving right/up from origin	20
Find next term of a number pattern	20
Routine addition/subtraction templates	36
Basic multiplication template	18
Books-in-boxes multistep problem	15
“Times as many” stickers	15
Rectangle perimeter	12
Rectangle area	12
Rectangular-prism volume	12
Equivalent/reduced fraction families	22+

These skills belong in Level M, but repeatedly changing only numbers produces limited additional measurement value.

A particularly important quality gap is visual representation. The machine report shows 0 questions with images. 

tabe-m

 The official Level M blueprint explicitly includes line plots, angle measurement/sketching, coordinate systems, geometric figures and nets. 
Tabetest
+1

The official Level M sample material also includes gridded-response items, whereas every item in this bank is four-option multiple choice. 
Tabetest

Several questions are also distinctly low-complexity for a bank meant to span through grade-equivalent 5.9, for example:

naming a pentagon,

1/4+1/4,

3 × 1,

basic multiplication facts,

identifying acute/obtuse from a supplied number,

repeatedly reading coordinates created by moving right/up from the origin.

Those are valid lower-Level-M skills, but the bank needs substantially more multi-step, representational and reasoning-intensive work to cover the upper portion of Level M.

5. BLUEPRINT COVERAGE

Official source: current TABE 11&12 Mathematics Blueprint Overview — Level M, still linked from TABE's current 11&12 blueprint page. The document identifier is TB_BPMthM_042622, copyright 2022. 
Tabetest
+1

My best-fit classification of all 600 questions is:

Level M reporting area	Official weight	Bank	Bank %	Assessment
Measurement & Data	15%	103	17.2%	Slightly high
Number & Operations in Base Ten	15%	101	16.8%	Close
Number & Operations—Fractions	20%	120	20.0%	Excellent quantitatively
Operations & Algebraic Thinking	10%	78	13.0%	Overweight
Geometry	10%	36	6.0%	Underweight
Expressions & Equations	15%	90	15.0%	Excellent quantitatively
Ratios & Proportional Relationships	3%	24	4.0%	Close
Statistics & Probability	5%	30	5.0%	Excellent quantitatively
The Number System	5%	18	3.0%	Underweight

Because the official displayed percentages total 98%, expected raw counts should be treated as approximate.

Measurement & Data — quantity adequate, breadth incomplete

The official blueprint includes unit conversion, line plots with fractional measurements, volume, measuring/sketching angles, and additive angle reasoning. 
Tabetest

The bank has plenty of unit conversion, elapsed time, area/perimeter, volume and angle classification, but:

no line plots

essentially no fraction-data problems from line plots

no protractor/angle measurement representation

no angle-addition or unknown-angle problems.

The 24 “acute/obtuse/right” classification questions inflate this domain without covering its deeper objectives.

Number & Operations in Base Ten — one of the stronger areas

Coverage includes:

place value

rounding

whole-number addition/subtraction

multiplication/division

decimal comparison

decimal arithmetic.

This broadly matches the official Base Ten objectives. 
Tabetest

The weakness is repetition and limited explanation of place-value reasoning.

Fractions — strongest domain

The bank has a full 120/600 = 20%, matching the published weight exactly.

It covers:

equivalent fractions

simplification/comparison

mixed/improper conversion

addition/subtraction

fraction × whole number

fraction multiplication

division/share contexts.

That maps reasonably well to the official fraction standards. 
Tabetest

Missing or thin elements include visual fraction models, estimation/reasonableness, scaling interpretation, and richer contextual fraction problems.

Operations & Algebraic Thinking — overweight and repetitive

The official domain expects multiplicative comparisons, multistep whole-number problems, factor/multiple reasoning, prime/composite classification and patterns, including recognition of features not explicitly stated in the rule. 
Tabetest

The bank covers the first several pieces well, but its pattern questions almost always stop at:

“What is the next term?”

or

“What is the rule?”

There is virtually no reasoning about why a generated pattern has particular properties.

Geometry — clear coverage gap

Official Level M Geometry includes:

points/lines/segments/rays

perpendicular and parallel lines

coordinate systems

hierarchical properties of 2-D figures

nets and surface area of 3-D figures. 
Tabetest

The bank mostly contains:

coordinate points

polygon names

triangle classifications

faces/edges/vertices.

Missing or nearly absent:

parallel/perpendicular lines

drawing/identifying rays and segments

figure hierarchy

3-D nets

surface area from nets.

This is why the bank's approximate 6% is materially below the official 10%.

Expressions & Equations — correct percentage, incomplete construct

The bank lands almost exactly at 15%, but heavily concentrates on:

direct substitution

x+p=q

px=q

elementary function tables

“greatest whole number” inequality questions.

The official blueprint also expects:

writing inequalities from conditions

representing inequality solutions on number lines

dependent/independent variable relationships using graphs and tables

distributive property

equivalent expressions

reasoning about which values make equations/inequalities true. 
Tabetest
+1

Those areas are very thin or absent.

Statistics & Probability — percentage correct, construct very weak

The bank contains approximately 30 items = 5%, but they are overwhelmingly:

mean

median

mode

range

plus one statistical-question identification item.

The official blueprint expects understanding distributions and displaying data using dot plots, histograms and box plots. 
Tabetest

The bank contains zero actual data-display graphics, making this domain numerically correct but psychometrically incomplete.

Ratios and Proportional Relationships

Unit-rate questions are present and generally appropriate. The official Level M blueprint's principal 6.RP.2 objective is contextual understanding of unit rate. 
Tabetest

Some bank items instead emphasize mechanically simplifying or scaling ratios, which is related but not as closely targeted as contextual rate reasoning.

The Number System

The bank covers GCF/LCM and multi-digit division, but its fraction-division questions are usually fraction ÷ whole number, not the richer fraction ÷ fraction reasoning required by 6.NS.1. Official Level M also explicitly includes fluent multi-digit division and GCF/LCM. 
Tabetest

6. STRUCTURAL CHECK

The basic structure is good:

600/600 questions

15/15 tests

exactly 40 questions per test

all questions have four choices

no invalid answer-key letters

no missing explanations

no exact duplicate stems reported. 

tabe-m

The 40-question test length exactly matches the official TABE 11&12 Level M Mathematics item count. Official maximum testing time is 55 minutes for Part 1 plus 10 minutes for Part 2. 
Tabetest

Overall key balance is healthy:

A 159 — 26.5%

B 132 — 22.0%

C 148 — 24.7%

D 161 — 26.8%. 

tabe-m

Per-test balance is less even but not severely exploitable. The largest skew is Test 15: D = 17/40 = 42.5%.

I independently recomputed the same-key runs. Within individual tests the ≥4 runs are:

T3Q10–Q14 D×5; T4Q5–Q8 D×4; T10Q6–Q9 D×4; T11Q5–Q8 B×4; T14Q2–Q6 A×5.

The machine report's additional T7Q3 B×4 is a cross-test-boundary sequence: T6 ends on B and T7 begins B/B/B; Test 7 itself starts with only three consecutive B keys. 

tabe-m

Structural weaknesses remain:

413 very short explanations

0 images

no blueprint/domain tags

13 mathematically non-unique/wrong items that exact-string duplicate detection largely misses

all 600 questions use the same conventional four-option format despite official sample materials demonstrating alternative response formats.

7. TOP FIXES

Correct the 13 wrong/ambiguous items immediately, especially T12Q23 and the duplicated-coordinate/unit-rate choices.

Fix the three repeated-digit place-value questions—T2Q11, T4Q2 and T14Q13—by underlining or otherwise identifying the intended occurrence of the digit.

Replace all three bimodal “mode” defects—T2Q21, T12Q32 and T14Q21—with data sets having one unique mode, or explicitly ask for both modes.

Raise Geometry from ~6% toward the published 10% with parallel/perpendicular lines, rays/segments, figure hierarchies, 3-D nets and surface-area questions.

Add genuine visual Measurement/Data and Statistics items: line plots, dot plots, histograms, box plots, angle diagrams and coordinate grids.

Keep the excellent 20% Fractions quantity but increase depth through visual models, reasonableness/estimation, contextual multiplication/division and scaling interpretation.

Rebuild a meaningful portion of the 90 Expressions/Equations questions around writing equations/inequalities, equivalent expressions, distributive property, number-line solutions and relationships represented by tables/graphs rather than direct substitution only.

Reduce repeated low-complexity templates, especially the 24 angle-classification, 20 origin-coordinate and 20 next-term questions; replace them with higher-reasoning Level M variants.

Upgrade the 413 short explanations from answer checks to brief teaching rationales, especially for fractions, expressions, ratios, data and geometry.

Add release metadata and validation gates: official TABE domain/standard, difficulty band, visual/representation type, contextual/application flag, mathematical-equivalence detection for choices, semantic-template duplication, and per-test answer-position balance.

8. SUMMARY ROW

| TABE 11 & 12 Math Workbook Level M (B9) | 5.8/10 | 13 | 7 definite explanation errors (+413 very short explanations) | PULL | Broad Level M percentages are surprisingly close—Fractions 20%, Expressions/Equations 15%, Statistics 5%—but coverage is shallow inside several domains, Geometry is underweight, visual/data standards are largely absent, and 13 live items have wrong or non-unique answers. |