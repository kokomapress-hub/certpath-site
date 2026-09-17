# B8 — TABE 11 & 12 Math Workbook, Level D — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/tabe-d.json` — 650 questions / 13 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 3.4/10 — PULL

Coverage audited: 650/650 questions, all answer keys and explanations across all 13 tests, plus the complete Section A structural report. No sampling. The file contains the claimed 650 questions and 13 tests and is currently published. 

tabe-d

Audit dimension	Score
Answer-key correctness	9.0/10
Explanation accuracy	6.5/10
Item quality / distractors	2.0/10
TABE Level D blueprint alignment	1.5/10
Structural hygiene	4.0/10

The calculations and keys are mostly correct. The serious failure is construct and blueprint fidelity.

The current official TABE 11&12 Level D Mathematics blueprint is:

The Number System — 21%

Expressions and Equations — 18%

Ratios and Proportional Relationships — 10%

Statistics and Probability — 22%

Functions — 11%

Geometry — 18%. 
Tabetest
+2
Tabetest
+2

This bank instead becomes overwhelmingly elementary arithmetic. My best-fit classification of all 650 questions gives approximately 55.4% The Number System, while Statistics & Probability falls to 3.4% and Functions to 1.4%.

Most decisively, every one of the 550 questions in Tests 3–13 belongs to only nine repetitive templates: integer addition/subtraction, basic multiplication, fraction multiplication, fraction addition, simple percentages, ratio partition, one-step linear equations, rectangle area, and Pythagorean triples.

The official Level D test includes substantially richer Grade 6–8 reasoning: proportional relationships, graph interpretation, simultaneous equations, transformations, scale drawings, bivariate statistics, random sampling, compound probability, and applied adult-context mathematics. 
Tabetest
+2
Tabetest
+2

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

I found 5 items where the keyed answer is not uniquely correct. I did not find a broader systematic wrong-key problem; I independently recomputed the dominant arithmetic, fraction, percent, ratio, equation, geometry and Pythagorean templates.

T1Q7 — A and D are mathematically identical. 4/9×6/8=24/72=1/3. A is 1/3; D is 24/72. Correct key: A or D; item must be fixed. 

tabe-d

T1Q47 — B and C are identical probabilities. There are 32 students playing sport out of 60, so 32/60=8/15. B is 8/15; C is 32/60. Correct key: B or C. 

tabe-d

T2Q25 — A and D are equivalent. Solving gives x<7. A says x < 7; D says x < 21/3, which is exactly the same inequality. Correct key: A or D. 

tabe-d

T2Q48 — B and C are identical probabilities. Blue probability is 5/15=1/3. B is 5/15; C is 1/3. Correct key: B or C. 

tabe-d

T8Q27 — exact duplicate correct options. Rectangle area is 70 square feet, and both A and C literally say 70. Correct key: A or C. 

tabe-d

A separate distractor defect occurs at T2Q5, where B = 8/20 and D = 2/5; those choices are mathematically identical, although neither is the correct answer.

3. EXPLANATION ERRORS

34 definite explanation errors share the same systematic wording defect.

These items correctly perform subtraction of a positive number but then falsely state:

“Subtracting a negative adds.”

Affected items:

T3Q14, T3Q15, T3Q21, T3Q22, T4Q5, T4Q29, T4Q36, T4Q50, T5Q38, T6Q5, T6Q8, T6Q16, T6Q39, T8Q16, T9Q25, T9Q26, T9Q31, T9Q42, T9Q49, T9Q50, T10Q35, T10Q36, T10Q38, T10Q39, T10Q47, T12Q12, T12Q26, T12Q27, T12Q28, T12Q40, T12Q42, T13Q41, T13Q46, T13Q47.

For example:

T3Q14: 1 - (18) = -17 is correct, but 18 is positive; nothing negative is being subtracted. 

tabe-d

T4Q29: 15 - (31) = -16 is correct, while the accompanying “subtracting a negative” explanation is false. 

tabe-d

T10Q35: -29 - (31) = -60 is correct, but again the explanation claims a negative was subtracted. 

tabe-d

These are important instructional defects because they teach the wrong sign rule even when the numeric answer happens to be correct.

The bank also has 420/650 explanations classified as very short by the machine report. 

tabe-d

 Hundreds are essentially answer computations such as “6 × 19 = 114” rather than instructional explanations. For a workbook, that is commercially weak even when technically correct.

The five ambiguous-key items in Section 2 also have explanation-integrity issues because their explanations do not acknowledge that another option represents the same value.

4. ITEM QUALITY
Tests 3–13 are template-generated remediation drills

The strongest defect is concentration.

Across Tests 3–13: 550/550 questions fall into only these nine families:

Repeated template	Questions in Tests 3–13
Integer addition/subtraction	131
Basic multiplication / decimal multiplication	116
Rectangle area	74
One-step linear equation	59
Fraction multiplication	47
Percent of a number	45
Fraction addition/subtraction	42
Ratio partition	30
Pythagorean theorem	6
Total	550

That means no Statistics & Probability and effectively no Functions appear anywhere in Tests 3–13.

Difficulty is skewed below the upper Level D range

Many items are legitimate Grade 6 prerequisite skills individually, but their volume and simplicity make the bank inappropriate for a Level D product covering grade-equivalent 6.0–8.9.

Examples include:

T7Q5: 0×12

T7Q7: 10% of 100

T8Q10: (−11)(−1)

T10Q34: 1.0×1.2

T11Q13: 1.0×0.1

T13Q45: 3×1

Those are far below what should dominate a Grade 6–8.9 assessment.

The official Level D blueprint's High-emphasis objectives include constructing simple equations/inequalities from problems and recognizing/representing proportional relationships—not merely solving hundreds of decontextualized one-step equations. 
Tabetest

Rectangle area is massively recycled

There are 74 separate “rectangle is X ft by Y ft; find its area” questions.

Examples span T3Q1, T3Q6, T3Q10, T3Q20, T3Q30, T3Q33, T3Q37, T3Q39, T3Q40, T3Q47, T3Q50 and continue through Tests 4–13.

Changing only the side lengths does not produce meaningful new assessment items.

Distractors frequently look machine-generated

Numerous choices are unrelated random values rather than plausible misconception-based distractors. Examples include:

T3Q8: 20% of 50 includes 87.

T5Q11: 2/3+2/5 includes 87.

T6Q13: fraction addition includes 77.

T11Q24: ratio item includes 84.

T13Q4: fraction addition includes 20.

These choices reduce discrimination because they can be rejected without solving the problem.

No figures or authentic graphs

The report says questionsWithImages = 0. 

tabe-d

That materially harms Level D alignment because the official blueprint explicitly calls for:

scale drawings

rotations/reflections/translations

similarity and dilation

graphing proportional relationships

comparing representations

scatter plots

bivariate data patterns. 
Tabetest
+2
Tabetest
+2

The first two tests occasionally describe a histogram, scatter plot or table in words, but the entire 650-item bank contains no actual visual mathematical representation.

Adult-context fidelity is weak

TABE states that Mathematics emphasizes application to routine adult tasks involving quantities, time, distance, weight, statistics and equations, with item sets integrated through mathematical contexts appropriate for adults. 
Tabetest
+1

Most of this bank instead asks bare computations. Official Level D sample items include a probability scenario, rate/unit conversion, route on a coordinate grid, and applied geometry. 
Tabetest
+1

5. BLUEPRINT COVERAGE

Current official reference: TABE 11&12 Mathematics Blueprint Overview — Level D, currently linked from TABE's official blueprint page in September 2026. The current PDF is copyright 2022. 
Tabetest
+1

Official distribution vs this bank
Level D reporting area	Official	Expected /650	Bank best-fit	Bank %	Finding
The Number System	21%	~137	360	55.4%	Extreme overcoverage
Expressions & Equations	18%	~117	83	12.8%	Underweight
Ratios & Proportional Relationships	10%	65	82	12.6%	Moderately overweight
Statistics & Probability	22%	143	22	3.4%	Critical omission
Functions	11%	~72	9	1.4%	Critical omission
Geometry	18%	117	94	14.5%	Underweight and very narrow

This classification assigns each question to its primary construct; the file contains no official domain tags.

The Number System — 55.4% vs 21%

This area dominates because of hundreds of signed-integer, fraction and decimal computations.

But even here, blueprint breadth is weak. Official Level D requires:

real-world interpretation of positive/negative numbers

rational numbers on number lines

ordering and absolute value

coordinate-plane reasoning

rational-number operations

distinguishing rational/irrational values and approximation. 
Tabetest

The bank mostly tests calculation, not conceptual interpretation.

Expressions and Equations — 12.8% vs 18%

The bank contains many one-step equations, but misses much of the official construct:

integer exponent properties

rewriting expressions contextually

square/cube-root equations

multi-step real-life rational-number problems

scientific-notation magnitude comparison

constructing equations/inequalities from contexts

simultaneous linear equations. 
Tabetest
+1

8.EE.8 simultaneous equations is essentially absent.

Ratios and Proportional Relationships — quantity adequate, depth poor

There are many percent and fixed “piece set ratio” questions, but Level D expects:

complex unit rates

recognition and representation of proportional relationships

tables/graphs/equations

multistep percent problems involving interest, tax, markup, markdown, gratuity, commission, fees and percent error. 
Tabetest

The bank overwhelmingly uses “What is X% of Y?” and “A set is in ratio A:B; how many are in the larger group?”

Statistics & Probability — 3.4% vs 22%

This is the worst blueprint gap.

All substantive coverage is concentrated almost entirely in T1Q40–T1Q50 and T2Q40–T2Q50.

The official domain includes:

scatter plots and bivariate association

random sampling/inference

comparing populations

probability models

compound events

simulations. 
Tabetest

From T3Q1 through T13Q50 there are effectively zero statistics/probability items.

A 650-question Level D bank should contain approximately 143 such items, not about 22.

Functions — 1.4% vs 11%

Only about 9 questions reasonably fit the Functions domain, concentrated in Tests 1–2.

Official Level D requires interpreting y=mx+b, distinguishing linear from nonlinear functions, constructing linear functions from relationships, determining rate of change and initial value, and comparing representations. 
Tabetest

The bank abandons this entire construct after Test 2.

Geometry — 14.5% vs 18%, but falsely inflated by rectangle drills

Geometry appears numerically less deficient because 74 rectangle-area questions count toward it.

Official Geometry requires far broader work:

scale drawings

congruence through transformations

circle formulas

similarity

angle relationships

area/volume/surface area of composite 2-D and 3-D figures

Pythagorean theorem

coordinate distance. 
Tabetest
+1

There is almost no scale drawing, transformation, angle-equation or composite-geometry work.

6. STRUCTURAL CHECK

The machine report correctly shows:

650 questions / 13 tests

all 650 have four options

no missing explanations

no invalid key letters

no exact duplicate stems

one exact duplicate-choice defect: T8Q27. 

tabe-d

Overall answer distribution is acceptable:

A: 167 = 25.7%

B: 189 = 29.1%

C: 156 = 24.0%

D: 138 = 21.2%. 

tabe-d

Individual tests are much less balanced:

T1: A12 / B23 / C14 / D1

T2: A11 / B22 / C12 / D5

T12: A4 / B17 / C13 / D16

T13: A13 / B9 / C10 / D18

Test 1 is especially exploitable: 46% B and only one D answer.

Actual ≥4-key runs are:

T1Q46–T1Q50 B×5; T2Q12–T2Q15 B×4; T4Q10–T4Q13 B×4; T5Q4–T5Q7 A×4; T6Q35–T6Q38 D×4; T10Q9–T10Q13 C×5; T10Q18–T10Q21 D×4; T10Q32–T10Q35 A×4; T11Q5–T11Q8 A×4.

These match the machine report. 

tabe-d

Additional structural problems:

420/650 very-short explanations.

0 visual/image questions.

no domain/objective tags.

semantic duplication is huge despite zero exact duplicate stems.

five items have non-unique correct choices after mathematical equivalence is considered.

There is also a simulation-format mismatch: the current official TABE Level D Mathematics test has 40 total items, whereas every bank test here has 50 questions. Official maximum testing time for Level D Math is 35 minutes for Part 1 and 30 minutes for Part 2. 
Tabetest
 If these 50-question units are meant only as practice sets, that is acceptable; if marketed as realistic/full-length practice tests, it is inaccurate.

7. TOP FIXES

Rebuild Tests 3–13. Do not merely vary the numbers; all 550 questions currently collapse into nine elementary templates.

Raise Statistics & Probability from ~22 to roughly 143 questions and distribute them throughout all 13 tests, not only Tests 1–2.

Raise Functions from ~9 to roughly 72 questions, including linear/nonlinear classification, tables, graphs, rate of change, initial value and multiple representations.

Reduce Number System computation from ~360 toward roughly 137 questions. Preserve signed/rational-number work, but add conceptual number-line, absolute-value, irrational-number and contextual reasoning.

Rebuild Geometry breadth: sharply reduce the 74 rectangle-area clones and add scale drawings, transformations, similarity, angle equations, composite geometry, surface area, volume and coordinate problems.

Expand Expressions & Equations to full Level D depth: multistep contextual equations, inequalities, exponent laws, roots, scientific notation and simultaneous equations.

Fix T1Q7, T1Q47, T2Q25, T2Q48 and T8Q27 so every multiple-choice item has exactly one mathematically valid answer; also repair duplicated wrong distractors such as T2Q5.

Correct the 34 false “Subtracting a negative adds” explanations where the subtracted quantity is actually positive.

Replace the 420 thin explanations and machine-generated distractors with instructional rationales and misconception-based alternatives appropriate to Grade 6–8 learners.

Add blueprint metadata and release gates: domain/standard, grade-band difficulty, representation type, adult-context flag, semantic-template similarity, equivalent-choice detection, per-test key balance, and a distinction between 50-question practice sets and the official 40-item exam format.

8. SUMMARY ROW

| TABE 11 & 12 Math Workbook Level D (B8) | 3.4/10 | 5 ambiguous | 34 definite explanation errors (+420 very short explanations) | PULL | Keys are largely mathematically correct, but Tests 3–13 are entirely nine repetitive elementary templates; Number System swells to ~55% while Statistics (~3%) and Functions (~1%) are almost absent against the current 21/18/10/22/11/18 Level D blueprint. |