# B10 — TABE 11 & 12 Math Workbook, Level E — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/tabe-e.json` — 490 questions / 14 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 3.8/10 — PULL

Coverage audited: 490/490 questions across all 14 tests, including every answer key and explanation plus the complete machine structural report. No sampling. The bank contains the claimed 490 questions and 14 tests and is live/published. 

tabe-e

Audit dimension	Score
Answer-key correctness	8.7/10
Explanation accuracy	5.8/10
Item quality / distractors	2.4/10
TABE Level E blueprint alignment	2.1/10
Structural hygiene	5.0/10

The current official TABE 11&12 Level E Mathematics blueprint is:

Number & Operations in Base Ten — 28%

Number & Operations—Fractions — 12%

Operations & Algebraic Thinking — 22%

Measurement & Data — 28%

Geometry — 10%. 
Tabetest

The bank is extremely unbalanced against that design. My best-fit classification of all 490 items gives approximately:

Base Ten: 58.4%

Fractions: 2.9%

Operations & Algebraic Thinking: 24.1%

Measurement & Data: 13.9%

Geometry: 0.8%

Most seriously, Tests 3–14—420 questions—contain zero Fractions-domain questions and zero meaningful Geometry-domain questions. Almost all breadth is concentrated in Tests 1–2.

The bank also collapses into a small number of templates: the top 11 stem families account for 426/490 = 86.9% of all questions.

Decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

I found 6 wrong or non-unique items.

T3Q16 — ambiguous. “Place value of 4 in 9434.” There are two 4s: one in the hundreds place and one in the ones place. The key chooses B/hundreds, but D/ones is also valid. 

tabe-e

T8Q20 — ambiguous. “Place value of 5 in 5995.” The number contains a 5 in both the thousands and ones places. Key A is not uniquely determined. 

tabe-e

T11Q2 — WRONG. Correct key: A = 950. The item asks to round 945 to the nearest ten but keys 940. Standard grade-level rounding gives 950. 

tabe-e

T11Q8 — ambiguous. “Place value of 3 in 9333.” There are 3s in the hundreds, tens and ones places. Key B/tens is only one of three possible answers. 

tabe-e

T11Q18 — ambiguous. “Place value of 6 in 6690.” The two 6s occupy the thousands and hundreds places. Key A is not unique. 

tabe-e

T12Q10 — ambiguous. “Place value of 6 in 6760.” The two 6s are in the thousands and tens places. Key C/thousands is not unique. 

tabe-e

I independently recomputed the bank's dominant addition, subtraction, multiplication, division, comparison, rounding and elapsed-time templates. Apart from T11Q2, I did not find a systemic arithmetic-key problem.

3. EXPLANATION ERRORS

There are 38 definite explanation defects, plus 409/490 explanations classified as very short by the structural report. 

tabe-e

A. T11Q2 is mathematically wrong

The explanation says:

945 rounds to 940.

It should be 950. 

tabe-e

B. 37 place-value explanations use a systematically false sentence

Beginning in Test 3, the generated rationale repeatedly says things such as:

“Counting from the right: each digit's position names hundreds.”

or:

“each digit's position names thousands.”

That wording is false: each position does not have the same place name. Only the target digit occupies that specific place.

Affected items:

T3Q7, T3Q16, T3Q18, T3Q20, T3Q28, T5Q6, T5Q29, T6Q19, T7Q30, T7Q34, T8Q7, T8Q16, T8Q20, T8Q21, T8Q22, T8Q35, T9Q20, T9Q26, T9Q33, T10Q5, T10Q13, T10Q14, T10Q16, T10Q25, T11Q8, T11Q15, T11Q18, T11Q29, T12Q5, T12Q10, T12Q22, T13Q6, T13Q9, T13Q17, T14Q2, T14Q24, T14Q34.

For example, T3Q7 says every digit's position “names hundreds” before correctly identifying the target digit as hundreds. 

tabe-e

The fix is simple:

“Counting from the right gives ones, tens, hundreds, thousands. The 1 is in the hundreds place.”

C. Explanations are overwhelmingly answer checks, not instruction

Examples include:

EXPL: 81.

EXPL: 60.

EXPL: 48.

EXPL: Subtract: 568 - 444 = 124.

The report flags 409 very-short explanations, meaning more than 83% of the bank lacks substantive teaching rationale. 

tabe-e

For an elementary workbook, this matters commercially: learners at Level E benefit particularly from place-value language, regrouping strategy, visual fraction reasoning, multiplication/division relationships, and measurement reasoning—not just the final arithmetic statement.

4. ITEM QUALITY

The largest problem is extreme template concentration.

My normalized stem analysis found:

Repeated family	Count
Addition computation	65
Elapsed-time “movie starts…”	49
Write number in words	44
Subtraction computation	44
Place-value identification	39
Multiplication fact	38+
Division fact	38+
Whole-number comparison	36
“Pencil costs $X; how much for N?”	30
Round to nearest ten	23
Round to nearest hundred	20

Those 11 families alone account for 426/490 questions = 86.9%.

Tests 3–14 are especially narrow

After Test 2, the bank is overwhelmingly:

3-digit addition/subtraction

read/write/place-value

rounding

multiplication/division facts

elapsed time

repeated pencil-cost multiplication.

There are no fraction questions at all in Tests 3–14, despite Fractions being an official 12% domain.

There are also essentially no Geometry-domain questions in those 12 tests.

Distractors are often obviously synthetic

Examples include:

T4Q14: 4 ÷ 2 includes 73 as a distractor. 

tabe-e

T6Q5: 365 + 647 includes 88. 

tabe-e

T7Q27: 286 + 639 includes 1. 

tabe-e

T11Q16: 9 ÷ 3 includes 58. 

tabe-e

These are not misconception-based distractors. They reduce the effective difficulty because students can eliminate them without doing the mathematics.

Duplicate choices

The machine report detects one exact duplicate-choice set:

T4Q4 — B and D both say “two hundred eighteen.” The key A is still uniquely correct, so this is not a wrong-key item, but it is a defective distractor set. 

tabe-e

Zero visual items

The report shows questionsWithImages = 0. 

tabe-e

That is a serious issue for Level E. The official sample questions use actual figures, pictures, and fraction models—for example an area diagram, an illustrated object for measurement estimation, and a shaded fraction model. 
Tabetest
+1

Grade-level fit

The bank's dominant arithmetic is generally appropriate to Grades 2–3, so the problem is not that it is broadly too difficult.

The problem is that it is too narrow and too procedural for the full grade-equivalent 2.0–3.9 range.

Conversely, the recurring questions such as:

“A pencil costs $1.25. How much do 7 pencils cost?”

implicitly require multiplication with decimal money notation. That is not one of the listed Level E standards and is less cleanly aligned than whole-number multiplication/division contexts.

5. BLUEPRINT COVERAGE

The official current TABE 11&12 Level E blueprint remains linked on TABE's official 11&12 blueprint page. It covers five reporting areas at 28/12/22/28/10%. 
Tabetest
+1

Full-bank best-fit mapping

I classified every one of the 490 questions by its primary construct. For generosity, the repeated pencil/money multiplication problems are counted under Operations & Algebraic Thinking rather than treated as outside the listed blueprint.

Level E domain	Official	Expected /490	Bank	Bank %	Finding
Number & Operations in Base Ten	28%	~137	286	58.4%	Extreme overweight
Number & Operations—Fractions	12%	~59	14	2.9%	Critical undercoverage
Operations & Algebraic Thinking	22%	~108	118	24.1%	Close numerically
Measurement & Data	28%	~137	68	13.9%	About half required weight
Geometry	10%	49	4	0.8%	Near-total omission
Number & Operations in Base Ten — 58.4% vs 28%

This dominates the bank.

The official domain includes place value, rounding, skip-counting, addition/subtraction within 1000, reading/writing numbers, multiplying one-digit numbers by multiples of 10, comparison and place-value-based reasoning. 
Tabetest

The bank does cover those skills, but disproportionately:

65 addition problems

44 subtraction problems

44 number-name questions

39 place-value questions

43 rounding questions

38 whole-number comparison questions.

This turns a five-domain exam into essentially a Base Ten workbook.

Fractions — 2.9% vs 12%

The official standards require:

understanding unit fractions and a/b

fractions on number lines

equivalent fractions

comparison by reasoning about size. 
Tabetest

The bank has only 14 best-fit fraction items, nearly all confined to Tests 1–2.

Tests 3 through 14 contain zero fraction-domain items.

Missing or very weak:

visual fraction models

number-line representation

equivalent-fraction reasoning

comparing fractions with visual/benchmark reasoning

partitioning in varied representations.

Operations & Algebraic Thinking — quantity acceptable, depth shallow

The official 22% domain is broad. It includes:

one- and two-step word problems

interpreting products and quotients

multiplication/division word problems

unknown factors

properties of operations

multiplication/division fluency

two-step problems with reasonableness checks

explaining arithmetic patterns. 
Tabetest

The bank has enough raw items, but a large proportion are simple facts:

7 × 8

36 ÷ 9

or repeated money multiplication.

There is very little:

unknowns in varied positions

interpreting quotients conceptually

associative/distributive-property reasoning

estimation/reasonableness

explanation of arithmetic patterns.

Measurement & Data — 13.9% vs 28%

Official Level E places 28% here—the joint-heaviest domain.

It includes:

telling and measuring time

elapsed-time word problems

measuring length in different units

mass and liquid volume

estimation

scaled picture/bar graphs

line plots

area

perimeter and unknown-side problems. 
Tabetest

The bank does have 49 elapsed-time questions, which heavily inflate apparent coverage, but misses much of the domain's breadth:

essentially no ruler measurement

very little mass/liquid-volume reasoning

no real measurement-scale graphics

no line plots

almost no scaled graph reasoning

little “how much longer” comparison

very little area reasoning beyond direct formulas

no same-perimeter/different-area reasoning.

Only the first two tests contain meaningful graph or measurement-variety questions.

Geometry — 0.8% vs 10%

This is the most severe gap.

The blueprint expects:

identification/drawing of triangles, quadrilaterals, pentagons, hexagons and cubes

recognizing shared shape attributes

rhombi, rectangles and squares as quadrilaterals

partitioning shapes into equal areas/fractions. 
Tabetest

The bank has only about 4 primary Geometry items.

Nearly all are in Tests 1–2:

hexagon sides

square/rectangle hierarchy

rhombus property

octagon sides.

There is no genuine drawing/visual classification work, and no Geometry coverage at all across most of the product.

6. STRUCTURAL CHECK

The machine report correctly shows:

490 actual questions

14 actual tests

exactly 35 questions per test

all have four choices

no missing explanations

no invalid key letters

no exact duplicate stems. 

tabe-e

Overall key distribution:

A: 104 — 21.2%

B: 142 — 29.0%

C: 135 — 27.6%

D: 109 — 22.2%. 

tabe-e

Overall balance is tolerable, but individual tests have severe patterns.

Test 1

A = 8

B = 16

C = 11

D = 0

Test 2

A = 3

B = 18

C = 14

D = 0

So in the first 70 questions, the correct answer is never D.

Test 2 also contains:

T2Q5–Q11: B ×7

T2Q19–Q22: B ×4

T2Q30–Q35: C ×6

The machine report correctly identifies these and the other long runs. 

tabe-e

Additional structural concerns:

409 very-short explanations

0 visual/image items

no domain/objective tags

one duplicate-choice set

semantic/template duplication is massive despite zero exact duplicate stems.

There is also an exam-format issue: official TABE 11&12 Level E Mathematics has 40 items, while every bank test here has 35. Official maximum testing time is 65 minutes. 
Tabetest

If these are advertised merely as 35-question practice sets, that is acceptable. If presented as full-length simulated TABE Level E tests, the format is inaccurate.

7. TOP FIXES

Rebuild the blueprint distribution: reduce Base Ten from 286 toward roughly 137 questions and use those slots for Fractions, Measurement/Data and Geometry.

Increase Fractions from 14 to roughly 59 items, distributed across all 14 tests—not confined to Tests 1–2.

Increase Geometry from 4 to roughly 49 items, including visual shape classification, quadrilateral hierarchy and equal-partition questions.

Increase Measurement & Data from ~68 toward ~137, particularly mass, liquid volume, rulers/length comparison, scaled graphs, line plots, area reasoning and perimeter problem solving.

Fix the six wrong/ambiguous items: T3Q16, T8Q20, T11Q2, T11Q8, T11Q18 and T12Q10.

Rewrite all 37 generated place-value explanations so they correctly describe ones/tens/hundreds/thousands rather than saying every position “names” the target place.

Replace hundreds of near-duplicate templates. The top 11 families currently make up 86.9% of the bank.

Add real visuals. Level E especially needs fraction models, rulers, graphs, area figures and shape representations; the current bank has zero images.

Replace random distractors with misconception-based distractors and fix T4Q4's duplicate wrong choices.

Add release metadata and QA gates: official domain/standard, grade level, complexity, visual-representation requirement, semantic-template similarity, repeated-target-digit detection, rounding validation, duplicate-choice detection, and per-test key distribution.

8. SUMMARY ROW

| TABE 11 & 12 Math Workbook Level E (B10) | 3.8/10 | 6 | 38 definite explanation defects (+409 very short explanations) | PULL | The bank is dominated by Base Ten (~58% vs 28%); Fractions (~3% vs 12%) and Geometry (<1% vs 10%) are nearly absent, Tests 3–14 contain no real fraction/geometry coverage, and 86.9% of all items come from just 11 repeated stem families. |