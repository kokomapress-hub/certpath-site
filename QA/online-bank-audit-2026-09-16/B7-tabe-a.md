# B7 — TABE 11 & 12 Math Workbook, Level A — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/tabe-a.json` — 1000 questions / 20 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 3.2/10 — PULL

Coverage audited: 1,000/1,000 questions across all 20 tests. No sampling. The complete bank was parsed and structurally checked; the dominant generated templates were independently recalculated, and the remaining item families were reviewed by mathematical category. The file itself confirms 1,000 actual questions across 20 tests. 

tabe-a

Audit dimension	Score
Answer-key correctness	8.5/10
Explanation accuracy	7.0/10
Item quality / distractors	1.5/10
TABE Level A blueprint alignment	1.0/10
Structural hygiene	4.0/10

The bank's core problem is not widespread bad arithmetic. Most keyed computations are mathematically correct. The problem is that this is not remotely representative of the current TABE 11/12 Level A Mathematics blueprint.

The current official Level A blueprint is:

Number and Quantity — 13%

Algebra — 28%

Functions — 28%

Geometry — 15%

Statistics and Probability — 16% 
Tabetest

Instead, 781 of the 1,000 questions come from only four recurring templates:

232 arithmetic-sequence questions

217 slope-from-two-points questions

200 direct f(x) substitution questions

132 factorable quadratic-equation questions

Worse, among Tests 4–20, those four templates account for 771/850 = 90.7% of the questions. Representative later tests visibly cycle through exactly these templates. 

tabe-a +2

The real TABE design emphasizes application in adult-appropriate contexts, including quantities, distance, time, weight, statistics and equations; item sets are intended to be integrated through meaningful mathematical contexts. 
Tabetest
 This bank becomes almost entirely isolated symbolic drills.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

I found 15 items with more than one mathematically correct answer. I did not find a broad systemic wrong-key pattern comparable to the blueprint problem—the dominant computational templates are generally keyed correctly.

Equivalent-answer defects

T3Q7 — keyed D = 1 1/18, but B = 19/18 is exactly the same value. The stem merely says “Compute,” with no required answer form.

T3Q8 — keyed B = 1/2, but D = 5/10 is also exactly correct. Again, the stem does not require simplest form.

T3Q27 — keyed B = 2, while D = 12/6, also exactly 2. The explanation itself computes 12/6 = 2, effectively proving two choices correct. 

tabe-a

T14Q45 — A and D both literally read −4, while −4 is the correct slope. 

tabe-a

0 versus −0 defects

These 11 items contain two correct zero choices because −0 = 0:

T12Q30, T12Q37, T15Q23, T17Q4, T17Q7, T17Q29, T17Q37, T19Q6, T19Q36, T19Q47, T20Q48.

For example, T20Q48 offers A = −0 and D = 0 for a horizontal line. Both represent the same slope. 

tabe-a

That gives 15 genuinely ambiguous keyed items.

Three superficially similar fraction items—T1Q6, T2Q6 and T2Q12—are not counted because the wording requires simplification/lowest terms, making the unreduced equivalent distractor distinguishable.

3. EXPLANATION ERRORS

There is no large cluster of arithmetic explanations producing mathematically false results. The explanation problem is instead a combination of answer-choice contradiction and extreme shallowness.

The same 15 ambiguous items have explanation-integrity defects because the reasoning arrives at a value represented by multiple options. T3Q27 is the clearest example: its explanation obtains 12/6 = 2 while B is 2 and D is 12/6. 

tabe-a

The zero-slope questions likewise explain that the slope is 0 while offering both 0 and −0. T14Q45 calculates −4 while displaying −4 twice. These explanations may contain correct mathematics, but they fail as explanations for a single-key multiple-choice item.

More importantly, the machine report identifies 625/1,000 explanations as “very short.” 

tabe-a

 That matches the bank: hundreds of explanations amount to little more than:

5^3 = 125

f(-3) = ...

Slope = ...

a_n = ...

Factor: ...

Tests 10 and 11 show the repetitive explanation structure clearly. 

tabe-a +1

For a workbook, these are frequently answer calculations rather than instructional explanations. They rarely explain why the method applies, common traps, interpretation, or checking.

4. ITEM QUALITY

This is the largest quality failure.

A. Tests 4–20 are effectively four question generators

Across the entire bank:

Template	Questions
Arithmetic sequence: find a
n
	​

	232
Find slope from two coordinate points	217
Substitute into f(x)=mx+b	200
Solve an easily factorable quadratic	132
Total	781

Tests 18 and 20 still look essentially the same as Tests 10 and 11: slope, direct function substitution, simple quadratic factoring, arithmetic sequence, repeat. 

tabe-a +1

There are no exact duplicate stems because the numbers change, but psychometrically these are massive near-duplicates.

B. The first three tests are often far below Level A

The opposite problem occurs in the early material. Test 1 opens with:

4-digit addition

4-digit subtraction

whole-number multiplication

whole-number division

elementary signed-number arithmetic

reducing a basic fraction 

tabe-a

Those are useful remediation skills, but they are not an appropriate foundation for a product marketed specifically as Level A, grade-equivalent 9.0–12.9 practice tests unless explicitly segregated as prerequisite review.

Basic fraction operations, simple percentages, mean/median/range, elementary probability and elementary geometry dominate substantial parts of Tests 1–3.

C. No graphical items

The structural report shows questionsWithImages = 0. 

tabe-a

That is a direct construct problem because Level A explicitly includes:

graphing functions and identifying graph features — High emphasis

interpreting function graphs/tables — Medium

estimating rate of change from graphs — Medium

comparing differently represented functions

dot plots, histograms and box plots

two-way frequency tables

linear models in data contexts. 
Tabetest

A 1,000-question bank with zero graphs or statistical displays cannot adequately train these objectives.

D. Adult application/context is almost absent

TABE specifically describes Mathematics as application-focused and says item sets are integrated through mathematical contexts appropriate for adults. 
Tabetest
+1

Most of Tests 4–20 are naked symbolic prompts:

Find the slope...

If f(x)=..., find f(...).

In an arithmetic sequence...

Solve x
2
+....

There is little interpretation, modeling, decision-making, measurement, data, workplace context, comparison of representations, or multistep problem solving.

E. Six questions have only three choices

The report correctly identifies 6 three-option items instead of four:

T4Q33, T5Q20, T5Q22, T5Q41, T6Q1, T6Q22.

T4Q33 visibly stops after option C. 

tabe-a

F. Distractor generation is visibly synthetic

Examples contain implausible random distractors such as 95, 86, 93, etc., unrelated to likely mathematical misconceptions. In T10Q1, for example, an arithmetic-sequence question includes 95 alongside the plausible nearby choices. 

tabe-a

Strong TABE distractors should normally represent errors such as:

wrong sign

wrong operation

incorrect exponent rule

confusing slope/intercept

denominator error

misunderstanding a graph

misinterpreting a statistical measure.

Random numbers mostly measure whether the learner can perform one routine calculation.

5. BLUEPRINT COVERAGE
Official blueprint

The current TABE 11&12 Mathematics Level A blueprint currently linked by TABE uses five reporting areas. The PDF itself carries a 2016 copyright but does not print a separate revision/effective-date identifier; TABE's current blueprint page still links it for TABE 11&12. 
Tabetest
+1

Official Level A area	Official weight	Expected in a 1,000-Q bank
Number and Quantity	13%	~130
Algebra	28%	~280
Functions	28%	~280
Geometry	15%	~150
Statistics and Probability	16%	~160
Best-fit classification of this bank

I classified all 1,000 stems by their primary mathematical construct. This is an audit classification rather than publisher metadata; arithmetic sequences were placed in Functions and logarithms in Number/Quantity as their nearest broad category.

Area	Official	Bank approx.	Bank %	Assessment
Number and Quantity	13%	89	8.9%	Underweight and often too elementary
Algebra	28%	162	16.2%	Severely underweight
Functions	28%	658	65.8%	Massively overweight
Geometry	15%	63	6.3%	Severely underweight
Statistics & Probability	16%	20	2.0%	Near-total failure
Other	—	8	0.8%	Miscellaneous

And even the 65.8% Functions figure overstates genuine blueprint alignment, because 232 questions are the same arithmetic-sequence formula and many of the 217 “function-like” slope questions simply calculate slope from two ordered pairs.

Number and Quantity — weak alignment

The Level A blueprint particularly emphasizes N.Q.1, using and interpreting units in multistep problems, as High emphasis, plus rational exponents/radicals and appropriate measurement accuracy. 
Tabetest

The bank instead gives basic arithmetic, elementary fractions/percentages, simple powers and 16 logarithm drills. There is very little:

dimensional analysis

choosing units

interpreting units in formulas

scale/origin in graphs

measurement precision

rational-exponent reasoning.

Algebra — badly underweighted and narrow

Officially Algebra is 28% and includes polynomial operations, creating equations, modeling constraints, inequalities, systems, reasoning about solutions and interpreting graphs as solution sets. 
Tabetest

The bank contains 132 factorable quadratic equations, but only:

3 systems-of-equations questions

about 7 polynomial-operation questions

very little equation creation from context

essentially no modeling constraints

essentially no interpretation of solution viability

no meaningful graph-based A.REI.10 work.

The bank therefore has a lot of quadratics without having broad Algebra coverage.

Functions — huge quantity, poor blueprint depth

The official blueprint expects function notation, graph/table interpretation, average rate of change, graphing functions, exponential growth/decay, comparison across representations and contextual parameter interpretation. F.IF.7 graphing functions is High emphasis. 
Tabetest

The bank instead contains:

200 direct f(x) substitutions

217 slopes between two points

232 arithmetic-sequence term calculations.

It provides almost none of the most important representation work:

interpret graph features

interpret tables

sketch graphs

compare two functions in different representations

classify exponential growth/decay

interpret slope/intercept contextually.

Geometry — substantially underweight

Geometry is officially 15%. The blueprint specifically includes similarity/congruence, geometric measurement, volume of cylinders, pyramids, cones and spheres, and density/modeling based on area and volume; volume is marked High emphasis. 
Tabetest

The bank has only about 63 Geometry items, heavily skewed toward:

right-triangle/Pythagorean drills

circle area/circumference

a handful of exact trig values.

There are only 5 volume questions in the entire 1,000-question bank, mostly boxes/cubes/cylinders, with effectively no proper pyramid/cone/sphere coverage or density modeling.

Statistics and Probability — critical blocker

Official weight: 16%, approximately 160 questions in a 1,000-item bank.

Bank: roughly 20 questions.

The official Level A standards require:

dot plots, histograms, box plots

distribution shape, center and spread

effects of outliers

two-way frequency tables

joint/marginal/conditional relative frequency

associations/trends

interpretation of slope/intercept of linear models

correlation versus causation. 
Tabetest

The bank mostly stops at mean, median, mode, range and elementary dice/card probability. There are no graphical displays and essentially none of the Level A statistical reasoning above.

This is the single clearest content gap.

6. STRUCTURAL CHECK

The basic inventory is correct:

1,000 actual questions

20 actual tests

published/live

no missing explanations

no invalid answer-key letters

no exact duplicate stems. 

tabe-a +1

Overall answer positions are reasonably balanced:

A = 263 / 26.3%

B = 266 / 26.6%

C = 249 / 24.9%

D = 222 / 22.2%. 

tabe-a

But individual tests are much weaker. For example:

Test 1: A14 / B18 / C16 / D2

Test 2: A21 / B14 / C14 / D1

Test 3: A12 / B25 / C10 / D3

Test 2 contains a nine-question A run, T2Q24–T2Q32. The machine report identifies 15 long same-key runs overall. 

tabe-a

Other structural defects:

994 four-choice + 6 three-choice items 

tabe-a

10 exact duplicate-choice sets detected automatically 

tabe-a

additional mathematically equivalent options such as 0/-0, 2/12÷6, etc. were not captured by the exact-text duplicate detector

625 very short explanations 

tabe-a

0 image/graph items 

tabe-a

no topic/domain tags (topTags: {}) 

tabe-a

exact-stem duplicate count is zero, but semantic/template recycling is extreme.

7. TOP FIXES

Rebuild Tests 4–20 rather than lightly editing them. With 90.7% of those 850 questions coming from four templates, this is a bank-design problem, not a proofreading problem.

Rebalance to the official 13/28/28/15/16 blueprint. For a 1,000-question bank, target roughly 130 Number & Quantity / 280 Algebra / 280 Functions / 150 Geometry / 160 Statistics & Probability.

Add ~140+ genuine Level A Statistics items. Include histograms, box plots, dot plots, two-way tables, relative frequencies, distributions/outliers, linear-model interpretation and correlation versus causation.

Replace hundreds of arithmetic-sequence/slope/function-substitution clones. Keep perhaps a modest representative set; use the freed slots for missing standards.

Add graphical and tabular questions. A Level A bank cannot remain at 0 image/graph items when high- and medium-emphasis objectives explicitly depend on graph and plot interpretation.

Fix all 15 ambiguous-key items, especially all 0 versus −0 cases, T3Q7, T3Q8, T3Q27 and T14Q45.

Fix the six 3-choice items and all ten exact duplicate-choice defects.

Rewrite Tests 1–3 to Level A difficulty. Basic whole-number arithmetic, elementary fractions and straightforward percent questions belong in prerequisite review, not as a large share of Level A practice tests.

Rewrite explanations as teaching explanations. Replace the 625 one-line calculations with method + reasoning + common trap where appropriate.

Add item metadata and automated release gates: official domain, standard/objective, difficulty, representation type, context type, answer-equivalence detection, minimum four unique choices, semantic-duplicate checks and per-test answer-position balance.

8. SUMMARY ROW

| TABE 11 & 12 Math Workbook Level A (B7) | 3.2/10 | 15 | 15 answer/explanation-integrity defects (+625 very short explanations) | PULL | Mathematics is mostly keyed correctly, but 78.1% of the entire 1,000-question bank comes from four repetitive templates; Functions-like drills dominate ~65.8% while Statistics is only ~2%, with zero graph/data-display items and major Level A blueprint/grade-fidelity failures. |