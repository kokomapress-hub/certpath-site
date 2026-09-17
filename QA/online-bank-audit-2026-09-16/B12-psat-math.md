# B12 — Digital PSAT/NMSQT Math Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/psat-math.json` — 1540 questions / 35 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 4.7/10 — PULL

Coverage audited: 1,540/1,540 questions across all 35 drills. No sampling. I parsed the complete bank, recalculated the standardized mathematical templates, tested solution sets and systems, checked algebraic equivalence among answer choices, audited all stored domain tags, and separately checked the bank against the PSAT/NMSQT ceiling rather than the SAT ceiling. The file contains the claimed 1,540 questions / 35 drills and is currently published. 

psat-math

Audit dimension	Score
Answer-key correctness	8.3/10
Explanation accuracy	6.3/10
Item quality / distractors	2.8/10
PSAT/NMSQT blueprint alignment	3.5/10
Structural hygiene	5.2/10

The headline domain percentages look impressively close to College Board's current PSAT/NMSQT specification. The bank stores 525 Algebra, 490 Advanced Math, 315 PSDA and 210 Geometry/Trig. 

psat-math

 That is 34.1% / 31.8% / 20.5% / 13.6%, compared with College Board's current approximately 35% / 32.5% / 20% / 12.5%. The official operational ranges are 13–15 / 12–14 / 7–9 / 4–6 questions respectively. 
SAT Suite of Assessments
+1

But that apparent alignment breaks down under content inspection:

17 wrong or non-unique live MCQs.

105 explicit circle questions, even though College Board states that circle skills are assessed only on the SAT, not PSAT/NMSQT. Those 105 questions are exactly half of the entire Geometry/Trig pool. 

psat-math

 
SAT Suite of Assessments
+1

32 rate/unit-price questions are tagged Algebra even though ratios, rates, proportional relationships and units belong to PSDA.

All 315 tagged PSDA questions reduce to seven narrow template categories, with no scatterplots/two-variable modeling and no standard-deviation/distribution-comparison work.

598 explanations are very short. 

psat-math

0 informational graphics/images. 

psat-math

0 student-produced-response questions, versus approximately 25% / 8–12 operational PSAT Math questions officially. 
SAT Suite of Assessments
+1

No 22+22 adaptive-module packaging, routing, pretest designation, or difficulty sequencing.

A substantial portion of the pool is too routine for a product positioned toward top-end/National Merit preparation, even though those easier skills themselves are within PSAT scope.

Decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

I found 17 items that cannot stand as single-key multiple-choice questions.

T8Q4 — ambiguous — correct C/D. C says x=8,−8; D says x=−8,8. Same solution set. 

psat-math

T10Q5 — ambiguous — correct B/C. x
2
−0x−9 and x
2
+0x−9 are identical. 

psat-math

T10Q13 — invalid/underdetermined — correct key: none; infinitely many solutions. 5x+5y=50 is exactly equivalent to x+y=10. Every one of A/B/C/D satisfies the system. 

psat-math

T10Q25 — ambiguous — correct B/C. Multiplication is commutative: (x−4)(x+4)=(x+4)(x−4). 

psat-math

T10Q38 — ambiguous — correct A/C. Both choices give the roots {−5,5}. 

psat-math

T11Q16 — invalid/underdetermined — correct key: none; infinitely many solutions. 5x+5y=75 and x+y=15 are the same equation; all four listed points satisfy both. 

psat-math

T11Q42 — no correct choice — correct result +6.2%. 1.25×0.85=1.0625, so the change is 6.25%, but the question explicitly asks for the nearest tenth of a percent: +6.2%. 

psat-math

T13Q17 — ambiguous — correct B/D. Both give {−2,2}. 

psat-math

T14Q32 — ambiguous — correct A/D. Both list the same x-intercepts 1 and −1. 

psat-math

T17Q38 — ambiguous — correct B/D. Both give {−5,5}. 

psat-math

T18Q30 — ambiguous — correct A/D. 0.0% and 0% are mathematically identical. 

psat-math

T18Q33 — ambiguous — correct B/C. Both give {−2,1}. 

psat-math

T22Q18 — ambiguous — correct C/D. x
2
−0x−16=x
2
+0x−16. 

psat-math

T24Q4 — ambiguous — correct A/B. The two factors are merely reversed. 

psat-math

T27Q40 — no correct choice — correct result −13.8%. 1.15×0.75=0.8625, or −13.75%; nearest tenth is −13.8%, not keyed −13.75%. 

psat-math

T29Q5 — invalid/underdetermined — correct key: none; infinitely many solutions. 2x+2y=24 is the same equation as x+y=12; all four points are valid. 

psat-math

T33Q7 — ambiguous — correct B/C. Both choices represent x=±6. 

psat-math

These defects are exactly the sort of failure an algebraic-equivalence validator should catch but the current exact-text duplicate detector does not: Section A reports zero duplicate choice sets. 

psat-math

3. EXPLANATION ERRORS

There are 5 definite substantive explanation errors, plus the explanation-integrity issue attached to all 17 defective MCQs.

The five substantive errors are:

T10Q13 — substitution reaches 0y=0, which means the equations are dependent and there are infinitely many solutions. The explanation instead invents y = 2. 

psat-math

T11Q16 — reaches 0y=0, then incorrectly declares y = 7. 

psat-math

T29Q5 — reaches 0y=0, then incorrectly declares y = 7. 

psat-math

T11Q42 — correctly computes 6.25% but fails the requested rounding to the nearest tenth; the explanation should conclude 6.2%. 

psat-math

T27Q40 — correctly computes −13.75% but fails to round to −13.8%. 

psat-math

The dependent-system errors are particularly important: they teach a mathematically false inference—0y=0 does not determine a value for y.

Commercially, explanation depth is also weak. The machine report identifies 598/1,540 explanations as very short = 38.8% of the bank. 

psat-math

There are repeated generator-style rationales such as:

“Subtract exponents: 5 - 2 = 3.”

“Set x = 0: y = 4.”

duplicate endings such as x = 3; x = 3.

Those are answer checks rather than National-Merit-oriented teaching rationales. Harder items should explain structure, efficient strategy, and when appropriate a Desmos route.

4. ITEM QUALITY
Above the PSAT/NMSQT ceiling: 105 circle questions

This is the largest content defect.

The machine report itself records skill:Circles = 105. 

psat-math

 Examples begin immediately with circle area and circumference questions such as T1Q3/T1Q4. 

psat-math

College Board's current specification explicitly says:

PSAT/NMSQT Geometry/Trig includes Area and volume; Lines, angles, and triangles; Right triangles and right-triangle trigonometry.

Circle skills and knowledge are assessed only on the SAT. 
SAT Suite of Assessments
+1

So these are not merely “a little hard.” They are wrong-program content.

That includes recurring templates involving:

circle center/radius

circle area/circumference

arc length

sector area.

Below the desired preparation band: too much routine work

Easy questions are legitimate on an adaptive PSAT—the first module deliberately includes a range of difficulty. The problem is concentration, particularly for a product positioned as high-end PSAT/NMSQT preparation.

A conservative count finds 366/1,540 = 23.8% of the entire bank in just eight highly routine families:

Routine family	Count
Mean / median / range	77
Basic discount calculations	73
Constant unit-rate problems	56
Salary percent change	35
Sample-proportion extrapolation	34
Rectangular-box volume	33
Simple exponent quotient x
a
/x
b
	31
Triangle third-angle	27

And that count excludes other very easy recurring families such as direct function evaluation, quadratic y-intercepts, circle-radius extraction, and simple exponential-rate recognition.

For example, the bank opens with items such as x
5
/x
2
, whose entire explanation is exponent subtraction. 

psat-math

 It also repeatedly asks for the y-intercept of a quadratic simply by setting x=0, or the range of five small integers. 

psat-math

These questions are not individually out of scope; they are simply too prevalent for a bank meant to develop performance at the upper PSAT/NMSQT range.

The genuinely harder Advanced Math is generally within the PSAT ceiling

I would not remove items solely because they involve:

quadratics

polynomial expressions

rational expressions

radicals

absolute value

exponential models.

College Board explicitly includes absolute value, quadratic, exponential, polynomial, rational, radical and other nonlinear equations in PSAT/NMSQT Advanced Math. 
satsuite.collegeboard.org

So the major above-ceiling issue is circles, not the bank's algebraic Advanced Math content.

PSDA is template-narrow

All 315 tagged PSDA questions fall into only these seven families:

PSDA family	Count
Mean / median / range	77
Discounts	73
Simple probability	60
Salary percent change	35
Sample extrapolation	34
Unit rate	24
Compound percent change	12
Total	315

There are zero actual:

scatterplots

two-variable data models

standard-deviation/distribution-comparison questions

conditional-probability representations

data tables

lines of best fit.

Yet those are explicitly part of current PSAT/NMSQT PSDA. 
satsuite.collegeboard.org

No graphics

The bank has 0 images/graphics. 

psat-math

 College Board notes that selected PSAT/NMSQT Math questions use informational graphics. 
SAT Suite of Assessments

This makes the data-analysis and geometry practice substantially less authentic.

5. BLUEPRINT COVERAGE

Official reference: College Board's current live Math Specifications, supported by the Assessment Framework for the Digital SAT Suite, Version 3.01, August 2024, and the current PSAT/NMSQT Student Guide. College Board states that the different SAT Suite tests measure related skills while matching scope and difficulty to the target grade level. 
SAT Suite of Assessments
+1

Nominal stored distribution
Domain	Current PSAT/NMSQT specification	Bank tags	Bank %
Algebra	≈35%, 13–15	525	34.1%
Advanced Math	≈32.5%, 12–14	490	31.8%
PSDA	≈20%, 7–9	315	20.5%
Geometry & Trigonometry	≈12.5%, 4–6	210	13.6%

SAT Suite of Assessments

Every one of the 35 drills is tagged exactly:

15 Algebra + 14 Advanced Math + 9 PSDA + 6 Geometry/Trig = 44 questions.

So purely by labels, the bank looks excellent.

But the labels overstate alignment
1. Thirty-two Algebra items belong in PSDA

The bank inconsistently tags the same construct.

For example:

T1Q17 asks a constant-unit-price rate question and is tagged Algebra.

T1Q18 asks essentially the same constant-unit-price rate question and is tagged PSDA. 

psat-math

College Board explicitly places ratios, rates, proportional relationships and units in PSDA. 
satsuite.collegeboard.org

I found 32 Algebra-tagged unit-rate questions. Reclassifying just those obvious cases changes the bank approximately to:

Domain	Semantically adjusted
Algebra	493 = 32.0%
Advanced Math	490 = 31.8%
PSDA	347 = 22.5%
Geometry/Trig	210 = 13.6%

Those miscategorizations affect 24 of the 35 drills.

2. Half of Geometry/Trig is SAT-only

Of the bank's 210 Geometry/Trig items, 105 are explicit circles. 

psat-math

College Board explicitly states that circles are assessed only on the SAT. 
SAT Suite of Assessments

That leaves only 105 PSAT-scope Geometry/Trig questions = 6.8% of the full bank supporting a target domain of approximately 12.5%.

The 105 removed slots should be rebuilt with PSAT-appropriate:

area/volume and scale-factor problems

parallel lines/transversals

angle relationships

triangle similarity/congruence

Pythagorean theorem

right-triangle trig.

3. PSDA percentage is numerically right but construct coverage is poor

Current PSAT/NMSQT PSDA includes:

ratios/rates/units

percentages

one-variable distributions and center/spread

two-variable models and scatterplots

probability and conditional probability

inference from sample statistics. 
satsuite.collegeboard.org

The bank concentrates essentially all PSDA volume in seven simple generators and completely misses several of those representations.

Importantly, the bank is correct not to include SAT-only margin-of-error and observational-study/experiment content; College Board reserves those extensions for SAT. 
SAT Suite of Assessments

6. STRUCTURAL CHECK

The underlying database structure is clean in several respects:

1,540 actual questions

35 actual drills

44 per drill

all questions have four choices

no invalid key letters

no missing explanations. 

psat-math

Overall key balance is healthy:

A 393 — 25.5%

B 403 — 26.2%

C 376 — 24.4%

D 368 — 23.9%. 

psat-math

There are nevertheless 15 four-answer same-key runs. 

psat-math

The machine report also finds 3 exact duplicate stem groups / 7 questions. 

psat-math

 Semantic repetition is much larger than exact duplication.

Response format is not authentic

All 1,540/1,540 questions are four-choice MCQ. 

psat-math

College Board's PSAT/NMSQT specification calls for approximately:

28–32 MC operational questions

8–12 SPR operational questions

per form—roughly 75% MC / 25% student-produced response. 
SAT Suite of Assessments
+1

This bank has zero SPR items.

Adaptive structure is absent

The actual PSAT/NMSQT Math section is:

44 total questions

two 35-minute modules

each module has 20 operational + 2 pretest questions

Module 2 is adaptively selected based on Module 1 performance

questions within modules progress broadly from easier to harder. 
SAT Suite of Assessments
+1

The bank has the correct total of 44 per drill, but no:

Module 1 / Module 2 designation

higher/lower Module 2 routes

pretest designation

difficulty metadata

easiest-to-hardest sequencing.

If the 35 units are marketed only as broad 44-question drills, this is less serious. If they are presented as realistic PSAT/NMSQT simulations, it is a major authenticity gap.

Calculator format

There is no obsolete no-calculator section, which is correct. College Board permits an approved non-CAS calculator or embedded Desmos throughout the Math section. 
SAT Suite of Assessments

However, the absence of graphs/tables and Desmos-friendly modeling means the bank does little to train the calculator environment students actually encounter.

7. TOP FIXES

Remove and replace all 105 circle questions. They are SAT-only and therefore above the PSAT/NMSQT content ceiling.

Fix the 17 defective MCQs immediately, especially the three dependent systems and two rounding/no-answer items.

Add algebraic-equivalence validation to the generator: canonicalize factor order, zero coefficients, unordered solution sets, percentages/fractions and symbolic expressions before publishing choices.

Add a linear-system rank check. A generator must distinguish unique, inconsistent and dependent systems before creating ordered-pair choices.

Rebuild PSDA breadth: add scatterplots, two-variable models, distribution comparison/standard deviation, conditional probability and stronger sample-inference items.

Correct the 32 Algebra→PSDA unit-rate tags, then rebalance domain allocation by actual construct rather than stored generator label.

Introduce 8–12 SPR-style questions per realistic 40-operational-question form, instead of 100% MCQ.

Create authentic adaptive practice architecture: 22-question Module 1 plus easier/harder 22-question Module 2 paths with difficulty metadata and easy→hard ordering within modules.

Raise the upper difficulty tail. Retain necessary easy items, but sharply reduce repeated range/mean/unit-rate/discount/exponent-rule drills and add more multi-step, representation-switching and strategic problems suitable for students targeting the top PSAT range.

Upgrade commercial QA: replace the 598 thin explanations, add informational graphics, remove generator artifacts, validate rounding instructions automatically, detect semantic duplicates, and enforce misconception-based rather than random distractors.

8. SUMMARY ROW

| Digital PSAT/NMSQT Math Prep (B12) | 4.7/10 | 17 | 5 definite substantive explanation errors / 17 answer-explanation integrity defects (+598 very short explanations) | PULL | Nominal PSAT domain weights are almost perfect, but 105 SAT-only circle questions occupy half the Geometry/Trig pool, PSDA lacks major tested representations, 32 rate items are mis-tagged, 17 MCQs are defective, and the bank has zero SPRs, zero graphics and no adaptive-module structure. |