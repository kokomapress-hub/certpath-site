# B11 — Digital SAT Math Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/sat-math.json` — 1540 questions / 35 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 5.4/10 — PULL

Coverage audited: 1,540/1,540 questions across all 35 drills. No sampling. I independently recomputed all 85 normalized mathematical template families, including equation solving, systems, inequalities, quadratic/radical/absolute-value items, equivalent expressions, percentages/probability/statistics, and geometry/trigonometry. The file contains the claimed 1,540 questions and 35 drills and is live/published. 

sat-math

Audit dimension	Score
Answer-key correctness	7.8/10
Explanation accuracy	6.5/10
Item quality / distractors	3.0/10
Digital SAT blueprint alignment	6.0/10
Structural hygiene	6.5/10

The bank has one genuinely strong structural feature: its stored domain tags are mathematically exact at 525 Algebra / 525 Advanced Math / 245 PSDA / 245 Geometry & Trigonometry, and every one of the 35 drills contains exactly 15/15/7/7 questions. 

sat-math

 That nominal mix falls inside College Board's current ranges of 13–15 Algebra, 13–15 Advanced Math, 5–7 PSDA, and 5–7 Geometry/Trig per 44-question Math section. College Board describes these as approximately 35% / 35% / 15% / 15%. 
SAT Suite of Assessments
+1

However, the clean percentages conceal major psychometric problems:

21 wrong or non-unique items.

4 dependent-system questions where all four answer choices are correct.

1 item with no correct answer at all.

16 further items with mathematically equivalent correct alternatives.

537 very short explanations.

Only 85 normalized stem templates generate all 1,540 questions; the top 40 templates account for 1,081/1,540 = 70.2%.

0 images/figures.

0 SPR/student-produced-response items despite College Board using SPRs for about 25% of Math.

No 22+22 adaptive module architecture or difficulty routing.

Major PSDA construct omissions: zero scatterplots/two-variable models, margin-of-error questions, statistical-claim/study-design questions, or standard-deviation questions.

At least 26 rate/unit-price questions are tagged Algebra even though College Board categorizes ratios, rates, proportional relationships, and units under PSDA.

For a live Digital SAT prep bank, those issues warrant PULL until corrected.

2. WRONG OR AMBIGUOUS KEYS

21/1,540 items are wrong or non-unique.

T1Q38 — A and D are both correct. Both simplify to x
2
−4. Correct response: A/D; retain only one. 

sat-math

T1Q39 — A and D are the identical line y=2x−3. Correct response: A/D. 

sat-math

T3Q28 — A and B are identical factorizations in reversed order. Correct response: A/B. 

sat-math

T6Q6 — A and B both equal y=−4x−1. Correct response: A/B. 

sat-math

T8Q10 — C and D give the same solution set {−10,10}. Correct response: C/D. 

sat-math

T8Q44 — no correct option. 1.15×0.75=0.8625, so the net change is −13.75%, which to the requested nearest tenth is −13.8%. B says −13.75%. Correct key: none; change B to −13.8%. 

sat-math

T10Q10 — A and D both give {−3,3}. Correct response: A/D. 

sat-math

T12Q5 — A = 0% and D = 0.0%. Both are correct. Correct response: A/D. 

sat-math

T12Q16 — A and D both give {−2,2}. Correct response: A/D. 

sat-math

T15Q9 — all four choices are correct. 4x+4y=32 is exactly four times x+y=8, so the system has infinitely many solutions; every listed ordered pair satisfies it. Correct key: none; rewrite item. 

sat-math

T15Q14 — all four choices are correct. 5x+5y=70 is equivalent to x+y=14. Correct key: none; rewrite item. 

sat-math

T17Q13 — all four choices are correct. 2x+2y=14 is equivalent to x+y=7. Correct key: none; rewrite item. 

sat-math

T21Q26 — B and C are the same unordered pair of x-intercepts, −1 and 1. Correct response: B/C. 

sat-math

T22Q15 — B and C are the same factorization, merely commuted. Correct response: B/C. 

sat-math

T22Q18 — A and C both give {−5,5}. Correct response: A/C. 

sat-math

T23Q14 — A and C both simplify to x
2
−25. Correct response: A/C. 

sat-math

T26Q10 — B and C give the same x-intercepts, 2 and −2. Correct response: B/C. 

sat-math

T26Q26 — C and D both equal x
2
−4. Correct response: C/D. 

sat-math

T28Q10 — A and B are the same product in reversed order. Correct response: A/B. 

sat-math

T30Q29 — all four choices are correct. 2x+2y=18 is equivalent to x+y=9. Correct key: none; rewrite item. 

sat-math

T32Q42 — C and D give the same solution set {−2,1}. Correct response: C/D. 

sat-math

I also found equivalent wrong distractors that do not invalidate the key but still weaken the item. For example, T20Q6 has 4/36 and 1/9 as separate options.

3. EXPLANATION ERRORS

There are 21 answer/explanation-integrity defects, of which 5 contain definitely invalid mathematical reasoning or output.

The five substantive errors are:

T8Q44 — computes −13.75% but fails to obey the stem's instruction to round to the nearest tenth; the explanation should conclude −13.8%. 

sat-math

T15Q9 — after substitution produces 0y=0, then arbitrarily declares y=6. 0y=0 is an identity, so y is unrestricted. 

sat-math

T15Q14 — similarly turns 0y=0 into y=8. 

sat-math

T17Q13 — turns 0y=0 into y=2. 

sat-math

T30Q29 — turns 0y=0 into y=7. 

sat-math

Those four dependent-system explanations are especially serious pedagogically: they teach students to manufacture a value from an identity rather than recognize infinitely many solutions.

The remaining 16 ambiguous items generally contain mathematically correct explanations, but their explanations support a result represented by multiple answer choices, so they still fail as multiple-choice rationales.

Separately, the machine report identifies 537 very short explanations—about 34.9% of the bank. 

sat-math

 Many are little more than the final calculation. For Digital SAT prep, rationales should normally explain the reasoning path, relevant structure, or an efficient calculator/Desmos strategy where appropriate.

4. ITEM QUALITY
Template concentration is severe

After normalizing generated numerical values, I found only 85 distinct stem families across 1,540 questions.

Top 10 templates: 348/1,540 = 22.6%

Top 20: 624/1,540 = 40.5%

Top 40: 1,081/1,540 = 70.2%

Top 60: 1,387/1,540 = 90.1%

The largest individual families include:

Template family	Count
Rectangular-box volume	49
Function composition g(f(x))	36
Solve generated linear equation a(x−b)=cx+d	35
Direct linear-function evaluation	35
Five-value median	34
Interpret exponential decay	33
Compound linear inequality	33
Triangle third-angle	33
Expand two binomials	31
Quadratic y-intercept	29
Vertex from vertex form	29
“Infinitely many solutions” parameter k	29
Quadratic minimum from vertex form	29

Changing coefficients does not create the variety of reasoning, representation, and strategy seen in College Board material.

Obvious generator artifacts remain

Examples include recurring notation such as:

1x

+ (-3)

x + -3

x != 0

decimal slopes such as -0.3333333333333333x

They expose the underlying generator and make the product look less like authentic College Board material.

Zero visual/data-display content

The structural report records 0 questions with images. 

sat-math

That is particularly damaging for PSDA and Geometry/Trig. Across all 1,540 questions, I found:

0 scatterplot questions

0 two-variable data/model questions

0 margin-of-error questions

0 standard-deviation questions

0 observational-study/experiment questions

0 statistical-claim questions

0 tables/data tables

0 line-of-best-fit/regression questions

College Board explicitly includes two-variable models/scatterplots, inference and margin of error, and evaluating statistical claims within PSDA. 
SAT Suite of Assessments
+1

Geometry is also too formulaic

The 245 tagged Geometry/Trig questions nominally hit all four headings, but coverage is dominated by:

49 rectangular-prism volumes

circles—especially center/radius extraction

33 triangle-angle-sum questions

Pythagorean/special-triangle routines.

There are no meaningful similarity/congruence, transversal-angle, surface-area, scale-factor, radian/unit-circle, or tangent problems. College Board's current question bank explicitly includes these broader manifestations of the Geometry/Trig skills. 
SAT Suite of Assessments

Four exact duplicate stem groups

The machine audit identifies 4 exact duplicate-stem groups / 8 questions, including T1Q13/T14Q20 and T11Q28/T18Q35. 

sat-math

More importantly, exact duplicates substantially understate the repetition because numeric parameter substitution prevents otherwise identical templates from matching literally.

5. BLUEPRINT COVERAGE
Current College Board blueprint

As of September 2026, College Board's current SAT Math specification is:

Domain	Published weighting	Questions / 44
Algebra	≈35%	13–15
Advanced Math	≈35%	13–15
Problem-Solving & Data Analysis	≈15%	5–7
Geometry & Trigonometry	≈15%	5–7

The section is 44 questions in 70 minutes, divided into two 22-question, 35-minute modules. Module 1 contains mixed difficulty; Module 2 is routed to a relatively higher- or lower-difficulty path based on Module 1 performance. 
SAT Suite of Assessments
+1

Stored domain distribution

The bank's tags are almost artificially perfect:

Domain	Bank	Bank %
Algebra	525	34.1%
Advanced Math	525	34.1%
PSDA	245	15.9%
Geometry & Trigonometry	245	15.9%

Every drill has exactly:

15 Algebra + 15 Advanced Math + 7 PSDA + 7 Geometry/Trig = 44.

At the headline level, this is excellent.

But at least 26 Algebra tags are substantively wrong

The same unit-rate template is assigned inconsistently. For example:

T1Q24, “5 pounds cost $35 … cost of 8 pounds?” is tagged Algebra. 

sat-math

T1Q27, the same constant-unit-price construct, is tagged PSDA. 

sat-math

College Board places ratios, rates, proportional relationships, and units explicitly under PSDA. 
SAT Suite of Assessments

I found 26 Algebra-tagged constant-unit-price questions. Reclassifying only those obvious cases changes the actual content mix approximately to:

Algebra: 499 = 32.4%

Advanced Math: 525 = 34.1%

PSDA: 271 = 17.6%

Geometry/Trig: 245 = 15.9%

And 18 of 35 drills then fall outside College Board's 13–15 Algebra / 5–7 PSDA ranges.

Advanced Math breadth is incomplete

College Board includes:

Equivalent expressions

Nonlinear equations in one variable

Systems of equations in two variables

Nonlinear functions. 
SAT Suite of Assessments

The bank has extensive quadratics, exponent rules, exponential models, rational expressions, radicals and absolute values—but zero Advanced-Math-tagged systems of equations in two variables. All 66 system questions occur under Algebra and are linear.

PSDA is the biggest substantive blueprint weakness

Although the bank hits 15.9% by tag, its 245 PSDA questions come from only 12 normalized stem families. They overwhelmingly cover:

percentages/discounts

unit rates

mean/median/range

simple marble/dice probability

sample-proportion extrapolation.

It entirely omits several explicitly published SAT skills: two-variable models and scatterplots, margin of error, and evaluating statistical claims from observational studies/experiments. 
SAT Suite of Assessments
+1

Adaptive structure — not reproduced

College Board's Math section has two 22-question modules; the second module's difficulty depends on performance in the first. 
SAT Suite of Assessments
+1

These files instead contain 35 fixed 44-question sequences:

no Module 1 / Module 2 designation

no routing

no difficulty metadata

no higher/lower second-module forms.

Thus each 44-question drill has the right length, but not the Digital SAT's adaptive test architecture.

Response format — major mismatch

Every one of the 1,540 bank questions has exactly four choices. 

sat-math

College Board states that approximately 75% of SAT Math questions are four-option multiple choice and the remainder are student-produced response (SPR). 
SAT Suite of Assessments

A representative 44-question practice test therefore needs roughly 11 SPR-style questions. Across 35 full sections that would be on the order of 385 SPR opportunities. This bank has zero.

Calculator policy

This aspect is compatible: the bank creates no separate no-calculator section. College Board currently allows an approved non-CAS handheld calculator throughout Math or the built-in Bluebook Desmos scientific/graphing calculator. 
SAT Suite of Assessments

However, the bank does little to simulate the kind of graph/table/Desmos-enabled reasoning that makes calculator fluency relevant.

6. STRUCTURAL CHECK

The basic database structure is healthy:

1,540/1,540 questions

35/35 drills

44 questions per drill

all 1,540 have four answer choices

no missing explanations

no invalid answer-key letters. 

sat-math

Overall key distribution is also good:

A: 390 — 25.3%

B: 413 — 26.8%

C: 360 — 23.4%

D: 377 — 24.5%. 

sat-math

But the template generator creates suspicious within-drill runs. The longest is:

T7Q22–Q28: B ×7

Other runs include:

T15: D ×5

T31: B ×5

multiple four-answer runs.

The structural report lists 13 such long runs. 

sat-math

Other release-hygiene failures:

21 mathematically defective MCQs despite the machine duplicate-choice detector reporting zero.

This demonstrates that exact-string duplicate checking is insufficient; algebraic-equivalence checking is required.

537 short explanations.

0 figures/images.

0 SPRs.

0 module/difficulty structure.

4 exact duplicate-stem groups.

Domain tags are numerically balanced but not reliably semantically classified.

The machine report's duplicateChoiceSets: [] is therefore materially misleading: many duplicate choices are mathematically, rather than textually, equivalent.

7. TOP FIXES

Immediately fix all 21 wrong/ambiguous live items, prioritizing T15Q9, T15Q14, T17Q13, T30Q29 and T8Q44.

Add symbolic-equivalence QA before publication. Normalize polynomials, equations, factor order, unordered root sets, percentages and rational numbers before accepting four “unique” choices.

Add a system-rank/dependency validator. Any generated two-equation system must be checked for unique/no/infinite solutions before answer choices are built.

Rebuild the PSDA pool, especially scatterplots/two-variable models, standard deviation/distribution comparison, margin of error, conditional probability and observational-study/experimental-design questions.

Correct domain tagging. Move the 26 obvious Algebra-tagged unit-rate items to PSDA and rebalance each drill by actual construct rather than generator label.

Introduce SPR questions at approximately authentic frequency. A 44-question SAT Math simulation should not contain 44/44 multiple-choice items.

Implement authentic 22+22 module packaging, with Module 1 mixed difficulty and appropriately differentiated higher/lower Module 2 forms if these are marketed as SAT simulations.

Cut semantic template repetition dramatically. With just 85 stem families and 70.2% of questions coming from the top 40, hundreds should be replaced by genuinely different reasoning and representation types.

Add authentic graphs, tables, scatterplots and geometry figures, plus Desmos-friendly questions; zero visual items is not representative of Digital SAT Math.

Upgrade explanation and generation QA: improve the 537 thin rationales, eliminate generator syntax such as 1x, + (-3) and long machine decimals, check same-answer runs, and validate all answer choices numerically and symbolically before deployment.

8. SUMMARY ROW

| Digital SAT Math Prep (B11) | 5.4/10 | 21 | 21 answer/explanation-integrity defects, including 5 factually invalid explanations (+537 very short explanations) | PULL | Nominal 35/35/15/15 domain weighting is excellent, but symbolic QA exposes 21 defective items; the bank is heavily template-generated, omits major PSDA constructs, has zero SPRs/visuals, mis-tags rate questions, and does not reproduce the Digital SAT's 22+22 adaptive module structure. |