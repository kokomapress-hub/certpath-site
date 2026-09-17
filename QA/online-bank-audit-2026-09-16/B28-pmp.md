# B28 — PMP Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/pmp.json` — 720 questions / 4 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

5.5/10 — PULL from exam-readiness use pending correction. Both measurements reproduce, with an important denominator distinction.

Check	Independently measured result
Single-answer key is the uniquely longest option, divided by all 720 items	351/720 — 48.75%
Same measurement, restricted to the 695 single-answer questions	351/695 — 50.50%
Test 1’s best-fitting repeating four-letter template	BCDA: 85/180 — 47.22%
Stronger pattern inside Test 1	T1Q60–T1Q133: 61/74 keys fit an ABCD rotation — 82.43%

Blueprint correction: the 42% People / 50% Process / 8% Business Environment distribution in your request is the former outline. PMI updated the exam in July 2026 to 33% / 41% / 26%. B28’s domain counts closely match that new distribution—not the former one. I have assessed current-exam readiness and separately shown the comparison with your stated target. 
Project Management Institute

The principal findings are five demonstrably incorrect numerical distractor rationales, two questions requiring premise or interpretation qualifications, substantial answer-length cueing, and patterned answer placement in Tests 1 and 2. Agile and hybrid content is present, but the claimed overall delivery-method mix is not substantiated by the supplied metadata or the text screening.

Assessment area	Score
Answer-key correctness in reviewed content	9.0/10 — provisional
Explanation accuracy in reviewed content	8.0/10 — provisional
Item quality and distractors	5.0/10
Current PMP blueprint alignment	7.0/10 — domain weights match; approach mix unverified
Structural hygiene and assessment integrity	3.0/10

These are editorial readiness judgments, not whole-bank accuracy percentages or a simple average.

Coverage: I mechanically processed all 720 items, 2,905 options, and 720 explanations, including 4,420 literal within-item option-pair comparisons. I read 314 complete items, comprising a reproducible 180-item stratified sample—15 per test-domain combination, seed 280028—plus targeted numerical, multiple-response, visual, and situational items. All 25 select-two questions were reviewed. I independently recomputed or numerically checked 71 quantity-based questions.

I did not independently fact-check every prose assertion in all 720 items. The actual images behind the 19 figure references were unavailable for inspection, and the live application’s scoring, shuffling, timing, and passage association were not tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

No incorrectly valued numerical key was found in the 71 quantity-based checks. Two reviewed questions nevertheless need qualification before their keyed answers can be considered adequately supported.

T2Q172 — The keyed recommendation requires evidence and permission absent from the stem — no uniquely justified replacement key

The two experiments produce different benefits: pair review reduces defect escapes but increases cycle time; generated test data reduces cycle time without changing defects. Key B proposes keeping the second experiment and rerunning the first only on higher-risk rules. However, the stem supplies no risk-stratified results demonstrating where the review benefit justifies its cost. It also explicitly requests a decision rather than another sprint of experimentation. 

pmp

The explanation introduces an unsupported distinction between high- and low-risk rules to make B preferable. A is not automatically correct either: combining two separately tested changes may produce interactions that the supplied results do not establish.

Correct conclusion: the item needs clearer decision constraints and evidence supporting targeted adoption. Do not simply re-key B to A. This is an underdetermined recommendation, not a wrong arithmetic result.

T3Q114 — Current-period SPI is used to assert whole-project schedule position — B’s calculation is correct, but its interpretation needs narrowing

The stem explicitly supplies EV and PV for the current reporting period:

SPI
period
	​

=
200,000
240,000
	​

=1.20.

That supports better-than-planned earned-value performance during that period. It does not establish that the project is cumulatively ahead. Key B and the explanation make that broader statement. 

pmp

A counterexample illustrates the distinction: previous cumulative EV/PV of $100,000/$200,000, followed by the stated current-period figures, gives:

SPI
cumulative
	​

=
200,000+200,000
100,000+240,000
	​

=0.85.

Correct conclusion: retain 1.20 as the period calculation, but identify the data as cumulative or limit the conclusion to the reporting period. No existing option expresses that distinction fully.

Multiple-response keys are not malformed

T1Q7’s A, B, T2Q17’s A, D, and the other 23 comma-separated keys are legitimate select-two answer sets. Every such item explicitly asks for two choices and supplies five options. Section A’s single-letter validator is inappropriate for these questions. They must not be “fixed” by deleting one correct selection. 

pmp +1

3. EXPLANATION ERRORS

Five confirmed defects occur in explanations of numerical distractors. The intended numerical keys remain correct.

Item	Incorrect explanation	Independently checked correction
T3Q60	Says 19 days results from using unweighted averages of the optimistic, most-likely, and pessimistic estimates.	Unweighted activity averages are 8, 8, and 7, totaling 23. The 19 comes from adding the most-likely estimates, 6+8+5. Key C = 21 remains correct.
T3Q61	Claims 1.67+1.0+1.67≈4.99.	The displayed rounded values total 4.34; the exact standard deviations total 4.333…. Neither gives 4.99. Key A ≈ 2.56 remains correct.
T3Q64	Says the $132,000 distractor results from forgetting the fee reduction.	Forgetting that reduction gives $120,000 + $10,000 = $130,000, not $132,000. Key D = $126,000 remains correct.
T3Q100	Says 1.50 divides by “remaining earned value” instead of remaining budget.	300,000/200,000=1.50 uses already-earned value as the denominator. Remaining budgeted work is $300,000. Key A = 1.20 remains correct.
T3Q121	Says −$0.86 computes the SPI ratio.	310,000/360,000=+0.8611…, positive and dimensionless. The distractor additionally introduces the wrong sign and dollar unit. Key B = −$50,000 remains correct.

The printed rationales contain these specific assertions. 

pmp +2

The T3Q60–T3Q62 intended calculations are:

E[T]=7+8+6=21,
SD[T]=
(
6
10
	​

)
2
+1
2
+(
6
10
	​

)
2
	​

≈2.56.

These use the conventional independent-activity variance assumption; the requested two-standard-deviation interval is approximately 15.88–26.12 days. The defect is in explaining the distractors, not those keyed calculations.

T2Q172 and T3Q114 also require rationale qualification for the unsupported recommendation and period-versus-cumulative inference described in Section 2. That makes seven distinct reviewed items with confirmed or qualified content findings: five numerical-rationale errors plus two premise/interpretation qualifications.

4. ITEM QUALITY
A. The reviewed content is situational, but repeated answer construction creates a shortcut

The dominant style in the 314 complete items reviewed is selecting an action in context, not recalling process names or lists of inputs and outputs. Examples include T1Q8’s technical disagreement, T2Q44’s backlog/change-control boundary, and T4Q21’s time-critical safety situation. 

pmp +2

However, many choices follow the same construction: the intended answer combines understand, involve, assess, tailor, and communicate, while alternatives either act prematurely, defer indefinitely, impose a unilateral answer, or document without acting. Repeating that structure can teach recognition of the “complete, balanced sentence” rather than judgment between credible alternatives.

T4Q104 illustrates the length imbalance: its keyed answer combines interpreting the burndown, confirming the goal, consulting the product owner, and considering further value. The alternatives propose overtime, declare the chart impossible, or deliberately slow down. The intended decision does not require close discrimination among plausible responses. 

pmp

This should not be converted into an artificial rule that the shortest answer is better. The correction is parallel specificity and plausible alternatives, not cosmetic padding.

B. Do not describe the bank as teaching “always analyze” or “never direct”

There are explicit counterexamples:

T4Q21 — C: direct the response during an acute, unfamiliar safety crisis, returning to collaboration when it stabilizes.

T4Q157 — D: execute an already prepared contingency when its defined trigger occurs, rather than restarting analysis. 

pmp

Those distinctions should survive revision. The problem is overuse of similar ideal-response patterns, not a universal absence of contextual judgment.

C. Confirmed near-duplicates reduce independence between forms
Items	Repeated decision
T1Q4 / T3Q2	Two teams produce incompatible work despite believing they followed the shared vision; investigate differing interpretations before prescribing a fix.
T3Q17 / T4Q17	Capable developers repeatedly escalate routine library or technical choices; coach ownership within boundaries.
T3Q15 / T4Q9	A conflict has apparently been resolved; confirm actions and follow up rather than assuming closure.

These are confirmed conceptual repetitions, not an exhaustive near-duplicate count. Changing industry labels or team names does not necessarily create an independent assessment. 

pmp +1

D. Some explanations dismiss alternatives too absolutely

T2Q123 — retaining the appropriate traceability and backlog artifacts is defensible. However, saying that a backlog cannot satisfy formal traceability audits is too broad. The explanation should address the controls that would be lost by the proposed consolidation, rather than imply that a tool category inherently cannot support traceability. This is an editorial qualification, not a newly counted wrong key. 

pmp

T3Q103 — the numbers support both cost and schedule underperformance. A lower SPI than CPI does not, by itself, establish which problem is more consequential to the business. Qualify “worse” as the larger relative index shortfall rather than an overall severity judgment. 

pmp

E. Visual questions remain unverified—not proven broken

There are 19 image references. The uploaded file provides relative paths, not the actual image bytes. Consequently, I could not independently confirm that the plotted values, labels, or highlighted regions support their keys.

The affected IDs are T1Q178; T2Q27, Q101, Q114, Q120, Q121, Q150; T3Q88, Q96, Q103, Q111, Q118, Q126; T4Q95, Q104, Q114, Q124, Q159, Q170.

T3Q88 requires the network diagram to establish its path durations; T4Q95 requires the Gantt chart to verify the two-week overrun. Reading their explanations is not independent verification of those figures. 

pmp

This is an unresolved verification requirement, not a finding that 19 images are missing from the live website.

5. BLUEPRINT COVERAGE
Current reference: PMP Examination Content Outline — July 2026

The current allocation is People 33%, Process 41%, Business Environment 26%, with approximately 40% predictive and 60% adaptive/agile or hybrid. The delivery approaches span all three domains. 
Project Management Institute

Domain counts fit the current outline, not the former target

Every form, T1–T4, contains 59 People, 74 Process, and 47 Business Environment questions.

Domain	Your stated former target	Current July 2026 target	B28 count	B28 share
People	42%	33%	236	32.78%
Process	50%	41%	296	41.11%
Business Environment	8%	26%	188	26.11%

The bank’s domain counts reproduce Section A. 

pmp

Against the current outline, there is no material aggregate weighting defect. The largest deviation is approximately 0.22 percentage points, consistent with rounding to whole questions.

Against the former 42/50/8 target, the differences would be −9.22 points People, −8.89 Process, and +18.11 Business Environment. That comparison must not be mislabeled as a current-exam failure: PMI expressly documents the change from the former allocation to the new one. 
Project Management Institute

Is the agile/hybrid share really present?

Substantive agile and hybrid questions are present. A verified 50% share—or the current approximately 60% share—is not established.

The complete text screen produced:

Test range	Stems containing an explicit delivery-method or practice marker
T1Q1–T1Q180	20/180 — 11.11%
T2Q1–T2Q180	54/180 — 30.00%
T3Q1–T3Q180	39/180 — 21.67%
T4Q1–T4Q180	43/180 — 23.89%
Total	156/720 — 21.67%

The screen included terms such as agile, adaptive, hybrid, Scrum, sprint, iteration, Kanban, retrospective, backlog, product owner, WIP, velocity, cycle time, burnup/burndown, and MVP. Expanding the search to stems, options, and explanations finds 189/720 — 26.25%.

These are screening counts, not the actual delivery-method percentages. They include incidental wording and, in the broader screen, distractors. Conversely, they miss some implicit hybrid or passage-based content. Unmarked questions have not been automatically classified as predictive.

Examples make that distinction important:

T1Q63 tests genuinely hybrid delivery without using “hybrid” in its stem: fixed migration commitments versus evolving analytics, with coordinated interfaces.

T2Q44/T2Q76 test the boundary between backlog refinement and controlled baselines.

T4Q63–T4Q65 test Kanban flow through the shared Little’s Law passage, even though their question stems do not fully restate that context. 

pmp +2

By contrast, calling T1Q1’s team “hybrid” does not make its shared-vision decision dependent on hybrid delivery. That question could operate in several approaches without changing the intended action. 

pmp

Required correction: assign and independently review an explicit delivery-method tag for every item, identifying why that approach matters. Do not reach the desired percentage by counting every collaboration, coaching, or continuous-improvement question as agile.

“PMI mindset” versus memorization

The reviewed material tests collaboration, value, governance, stakeholder needs, and context-dependent sequencing. It should not be characterized as primarily a process-name memorization bank. However, situational wording alone does not establish difficulty: T2Q172 demonstrates how an attractive “targeted, balanced” response can depend on facts the scenario never provides.

For Scrum-related items, retain the distinction between protecting the Sprint Goal and freezing all scope: the Scrum Guide permits scope clarification and renegotiation as learning occurs. T4Q104’s conditional consideration of additional value is not automatically invalid simply because the Sprint has started. 
Scrum Guides

Format and current-exam claims

The current exam delivers 180 questions, including 170 scored and ten pretest items, over 240 minutes, with multiple-response and other formats. B28 matches the delivered question count. Its scored/pretest allocation, timing, interactive formats, and case-study workflow were not auditable from this export. 
Project Management Institute

The ten supplied passages establish that case data exists; they do not demonstrate that each “refer to the scenario” item remains correctly associated with its passage during live delivery or shuffling. T2Q115–T2Q117 are regression cases for that association. 

pmp

6. STRUCTURAL CHECK
Section A verification
Check	Independently verified result
Questions / tests	720 / 4, each with 180 items
IDs and numbering	Unique; complete within each test
Choice counts	695 four-option questions; 25 five-option questions
Actual malformed answer sets	0
Section A’s “25 invalid keys”	False positives from treating select-two keys as single letters
Missing choices / explanations	0 / 0
Exact whitespace-normalized duplicate stems	0
Literal duplicate options	0 across 4,420 comparisons
Exact duplicate explanations	0
Explanations under 40 characters	0
Explanation length	187 minimum; 443 median; 749 maximum characters
Supplied passages	10
Referenced images	19; actual image contents unverified

Section A’s counts largely reproduce, but its validation logic mishandles multiple-response items. Literal uniqueness also does not establish semantic independence, as the near-duplicate pairs in Section 4 demonstrate. 

pmp

Answer distribution and same-letter runs

The reported A177/B176/C173/D169 totals describe the 695 single-answer items, not all 720. They exclude the 25 answer sets and should be labeled accordingly. The aggregate single-answer distribution is not itself a release blocker. 

pmp

There are six true within-test single-answer runs of at least four:

T2Q1–Q5 D×5; T2Q64–Q70 B×7; T2Q103–Q107 A×5; T2Q134–Q137 A×4; T3Q6–Q9 A×4; T4Q2–Q8 A×7.

Section A incorrectly reports T2Q20 D×5, crossing select-two T2Q17, and T2Q107 A×6, crossing select-two T2Q102. The latter uninterrupted A run is five, not six. These response sets must break a single-letter run calculation. 

pmp +1

Natural same-letter runs should not be suppressed merely to force alternation.

Longest-option cue
Measurement	Result
Single-answer key strictly longest, divided by all items	351/720 — 48.75%
Single-answer key strictly longest, correct single-answer denominator	351/695 — 50.50%
Single-answer key tied for or uniquely longest	405/695 — 58.27%
Single-answer items with one uniquely longest option	622
Key is that option, among those 622	351/622 — 56.43%
Single-answer items tied for maximum length	73
All four options equal in length	22
Key strictly longest by word count	147/695 — 21.15%

The approximately 49% result is therefore reproduced under the character-count, all-item denominator convention. It should not obscure the 50.50% rate among eligible single-answer questions.

Choosing the longest option and choosing randomly among ties would yield an expected 53.41% on the 695 single-answer items against the printed keys. The tie-inclusive uniform-key baseline is 29.57%, below the observed 58.27%.

For the select-two format, 14/25 items have both correct choices strictly longer than every distractor. That is a separate two-answer cue; it cannot be combined indiscriminately with the single-answer calculation.

These measurements describe source text, not rendered visual width or validated candidate behavior.

Per-test cue and cycle findings

Patterns were evaluated against original question positions, preserving multiple-response positions rather than deleting them and shifting subsequent questions.

Test	Uniquely longest single-answer key	Best four-letter template	Matches across all 180 positions
T1	80/179 — 44.69%	BCDA	85/180 — 47.22%
T2	84/172 — 48.84%	DCAB	56/180 — 31.11%
T3	79/172 — 45.93%	CBDA	59/180 — 32.78%
T4	108/172 — 62.79%	DABC or DBAC	59/180 — 32.78%

Each best fit was selected from all 24 four-letter permutations. A selected maximum is not appropriately judged against a naive 25% single-template baseline.

Test 1 nevertheless contains direct evidence of local patterned placement:

Exact stretch	Pattern anchored at its first item
T1Q22–Q33	BDCA, 12 items
T1Q66–Q77	CDAB, 12 items
T1Q84–Q97	ABCD, 14 items
T1Q102–Q115	CDAB, 14 items
T2Q75–Q89	ABCD, 15 items

Additionally, T2Q3–Q16 repeats DDDC for 14 items. That is a four-position pattern, but not a permutation containing each letter once.

Across the complete Test 1 Process block, T1Q60–T1Q133, an ABCD rotation matches 61/74 — 82.43%. This is a more consequential finding than the whole-test 47.22% fit.

No exact whole-test period of 1–90 was found. Tests 3 and 4 had no qualifying local nonconstant period of 2–6 extending for at least 12 items and three repetitions under the specified check.

Runtime limitation: genuine runtime randomization could disrupt positional patterns. It would not remove answer-length cues, and it must preserve passage association and rationale-to-option mapping.

The 
B28 audit evidence ledger contains all item-level measurements, the 314 reviewed IDs, 71 numerical checks, approach-screen rules, complete key sequences, local cycles, source references, and limitations.

7. TOP FIXES

Remove the demonstrated positional patterns before using the forms for readiness assessment. Prioritize T1Q60–Q133, especially T1Q84–Q97/T1Q102–Q115, and T2Q75–Q89. Derive keys from final option placement rather than enforcing cyclic balance.

Correct the five numerical distractor rationales. Repair T3Q60, T3Q61, T3Q64, T3Q100, and T3Q121 without changing their correctly valued keys.

Resolve the two underqualified items. Supply the missing decision evidence in T2Q172 and distinguish period from cumulative performance in T3Q114.

Make validators format-aware. Preserve the 25 select-two sets, including T1Q7/T2Q17/T2Q102, and validate selection count, exact-set scoring, and explanation references. Stop treating these as malformed single-answer keys.

Revise the longest-answer construction pattern. Review all forms, with particular attention to T4Q1–Q180, where 108/172 single-answer keys are uniquely longest. Use comparably specific, plausible alternatives rather than filler.

Retain the current domain allocation and correct version labeling. The 59/74/47 allocation in each test matches July 2026. Do not rebalance this current-exam bank to 42/50/8 merely because that former distribution appears in the brief.

Create auditable delivery-method and task mappings. Use T1Q63/T2Q44/T2Q76 as genuinely method-dependent examples; distinguish them from incidental labels such as T1Q1. Validate the current approximately 60% adaptive/agile-hybrid mix rather than assuming it.

Reduce repeated scenarios and default-response cues. Address T1Q4/T3Q2, T3Q17/T4Q17, and T3Q15/T4Q9, while retaining contextual exceptions such as T4Q21/T4Q157.

Validate every visual item and passage association in the delivered application. Prioritize T1Q178, T3Q88, T4Q95, and the shared network questions T2Q115–Q117. Do not mark assets verified from paths alone.

Verify current full-length workflow and readiness claims. For T1–T4, test timing, case presentation, multiple-response handling, section transitions, and score reporting. Reaudit the assembled forms—not only isolated corrected items—before restoring exam-readiness use.

8. SUMMARY ROW

| B28 — PMP Exam Prep | 5.5/10 | 2 premise/interpretation qualifications; no wrong numerical key found in 71 checks | 5 confirmed numerical-rationale errors + 2 associated qualifications | PULL | Current 33/41/26 weights match; agile/hybrid proportion unverified; 48.75% all-item longest cue and T1 cycle 47.22%, with 82.43% Process-block fit. |