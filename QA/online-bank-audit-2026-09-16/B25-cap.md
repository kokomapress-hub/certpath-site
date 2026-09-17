# B25 — CAP Exam Study Guide (IAAP Certified Administrative Professional) — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/cap.json` — 1500 questions / 10 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Revised score: 4.0/10 — the subject matter fits IAAP CAP, but the tests remain unsuitable for measuring exam readiness.

The previous wrong-credential finding is withdrawn. Administrative-professional content and IAAP references such as T1Q24 and T6Q6 are appropriate for this product. The earlier ISA-based blueprint score and exam-format comparison are superseded by this report. 

cap +1

B25’s overall domain allocation closely matches the current IAAP blueprint. The release blockers are instead the pervasive answer-placement cycle, the longest-answer cue, weak distractors, and confirmed factual/explanation defects.

Assessment area	Revised score
Answer-key correctness in reviewed content	9.0/10 — provisional
Explanation accuracy in reviewed content	8.5/10 — provisional
Item quality and distractors	1.0/10
IAAP CAP blueprint alignment	8.0/10 — provisional at performance-outcome level
Structural hygiene and assessment integrity	1.0/10

The first two scores are editorial assessments of reviewed content, not measured whole-bank accuracy percentages. The overall score gives substantial weight to whether these tests can meaningfully assess knowledge.

Both cue findings remain confirmed
Check	Rechecked result
Keyed answer is the single longest option by character count	1,124/1,500 — 74.93%
Test 7 matches ABCDABCD…, starting with A at Q1	110/150 — 73.33%

Coverage: I reprocessed all 1,500 items, 6,000 options, and 1,500 explanations, verified that the source is unchanged, and reran all 37 previously identified computational checks. Detailed content review uses the same 300-item stratified sample, revisited for this assessment: five randomly selected items from each test-domain combination, using seed 250025, plus targeted supplementary checks.

The full-bank structural pass includes 9,000 literal within-item option-pair comparisons. That is not a claim of complete semantic validation or independent factual verification of every prose assertion. No live application behavior or candidate-response statistics were tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

Two confirmed defective or underspecified items remain. Neither depends on the withdrawn ISA interpretation.

T8Q89 — Medical and exposure records incorrectly assigned one retention requirement

The stem combines employee medical and exposure records, then keys D: duration of employment plus thirty years. 

cap

The general requirements distinguish the two: employee medical records ordinarily require employment duration plus thirty years, whereas exposure records ordinarily require at least thirty years. Exceptions and more specific standards can apply. 
eCFR

Correct key: no option accurately states both general requirements. D would fit an appropriately qualified question about medical records alone. Retaining exposure records longer may be permissible, but that does not make the stated general requirement accurate.

T2Q62 — Browser startup page and homepage conflated

The question asks what to call the page that loads when a browser opens and keys D: Home page, without identifying the browser or configuration. 

cap

Chrome explicitly distinguishes a startup page from a homepage. They are not necessarily the same setting. 
Google Help

Correct key: underspecified as written; “startup page” is absent. D is defensible under some terminology or configurations, so this should be treated as an ambiguity—not a universally false answer.

No incorrect numerical key was found in the 37 recomputed cases. For example, T4Q88 correctly gives the weighted vendor score 8(0.5)+6(0.3)+9(0.2)=7.6, and T3Q94 correctly calculates $45,000/300=$150 per attendee. 

cap

These are confirmed findings, not an exhaustive whole-bank factual-error count.

3. EXPLANATION ERRORS

Three confirmed explanation defects remain, affecting three distinct items.

Item	What is wrong	Correct conclusion
T8Q89	Repeats the combined medical/exposure-record retention rule.	Distinguish the two general retention requirements and applicable exceptions.
T2Q62	Defines the homepage as the page displayed at browser launch without qualification.	Distinguish startup behavior from the homepage function, or specify the platform/configuration.
T8Q141	Calculates remaining cash as $75, then incorrectly says this should match cash on hand plus vouchers.	Remaining cash is $75; cash plus the $75 in vouchers reconciles to the original $150 fund.

The first two explanations repeat the defects in their respective questions. 

cap +1

For T8Q141:

Remaining cash=150−30−45=75
Cash plus vouchers=75+(30+45)=150.

Key B remains correct. The error is in the final reconciliation statement, not the subtraction. 

cap

4. ITEM QUALITY
A. Correct subject matter, but answers are too readily identifiable without the required knowledge

The problem is not that T7Q53 tests handling a colleague who takes credit for someone else’s work. That is appropriate administrative-professional content. The problem is that a detailed, measured response competes with shouting, sabotage, and doing nothing. The alternatives do not create a meaningful professional judgment task. 

cap

The same construction appears in T7Q54: a detailed response about including remote participants competes with delaying their recap, letting the room dominate, or turning off its microphone. 

cap

Item	Correct option length	Other option lengths	Defect
T1Q33 — C	87 characters	54, 38, 57	Only the correct choice provides a complete, qualified purpose.
T1Q34 — D	83	43, 46, 36	The definition of concise communication is conspicuously longest.
T7Q53 — A	96	43, 41, 39	Professional conduct is both longest and opposed by extreme alternatives.
T7Q54 — C	94	51, 44, 31	The only fully developed, constructive action is the key.

The option texts substantiate these measurements. 

cap +1

Option shuffling will not fix this. It changes the correct letter but leaves the longest, most reasonable sentence recognizable.

B. Recall questions are legitimate; pervasive giveaways are not

IAAP describes its questions as assessing factual recognition, conceptual understanding, and practical application. Therefore, basic terminology items such as T1Q1 and T7Q9 are not inherently inappropriate. 
YMAWS
 

cap

The concern is that numerous apparent scenarios—such as T7Q53/T7Q54—can be answered through wording and obvious social desirability rather than the intended competency. I have not assigned empirical difficulty or discrimination values without candidate-response data.

C. Confirmed near-duplicates reduce test independence
Items	Repeated assessment
T6Q29 / T7Q4	Definition of professional networking, with minor wording changes.
T5Q60 / T6Q34	Muting during video meetings; the explanation is identical.
T7Q15 / T7Q20	Sending a personalized follow-up after meeting a conference contact, repeated within Test 7.

These are confirmed conceptual repetitions despite zero exact duplicate stems. They are not an exhaustive near-duplicate count. 

cap +1

D. Some wording and tagging need clarification, not re-keying

T7Q52 — the keyed option says “24 business hours,” while the explanation says “one business day.” Those expressions are not reliably interchangeable. Clarify the intended response window rather than presenting an imprecise convention as a precise rule. This is a wording qualification, not an additional confirmed wrong key. 

cap

T7Q56 — shared, reservable workspaces are tagged Domain 3. The primary competency is more naturally the current Domain 4 office-setting outcome; the existence of a booking app does not by itself make the item a software competency. T5Q60/T6Q34, which test essentially the same behavior under different domains, also show why primary and secondary outcome tags are needed. These are classification-review findings, not factual-key defects. 

cap +1

 
YMAWS

E. Do not “repair” the intentional capitalization distinctions

T4Q49 asks which complimentary close is capitalized correctly. The four choices deliberately differ in capitalization, and D, “Yours truly,” is the intended answer. Section A’s duplicate warning is a normalization false positive. 

cap

Similarly, punctuation and word-form distinctions in T9Q33, T10Q39, and T10Q45 must survive any automated duplicate checker. 

cap

5. BLUEPRINT COVERAGE
Reference: current published IAAP blueprint, effective Fall 2023

The controlling reference is the IAAP CAP Body of Knowledge effective Fall 2023, developed following its July 2022 job analysis, together with the 2024 IAAP Certification Handbook. The older domain wording in the request has been replaced by the successor names below. 
YMAWS
+1

Overall domain weighting is closely aligned

The handbook supplies a 200-item allocation, allowing comparison without relying solely on rounded percentages.

Current IAAP domain	Handbook allocation	Share derived from those counts	B25 items	B25 share
1. Organizational Culture and Leadership	40	20.00%	300	20.00%
2. Business Communication and Deliverables	31	15.50%	232	15.47%
3. Software, Data, and the Internet	20	10.00%	150	10.00%
4. Office and Records Management	33	16.50%	248	16.53%
5. Meeting, Event, and Project Management	38	19.00%	285	19.00%
6. Operational Functions	38	19.00%	285	19.00%
Total	200	100%	1,500	100%

The official counts come from the handbook; B25’s counts were independently reproduced from every item’s tag. 
YMAWS
 

cap

Important rounding distinction: IAAP prints whole-number percentages of 20, 16, 10, 17, 19, and 19, which sum to 101%. Its item counts show the underlying 15.5% and 16.5% allocations. I have labeled the calculated shares explicitly rather than silently changing the published figures. 
YMAWS
+1

Scaled to 1,500 questions, the handbook allocation gives 300, 232.5, 150, 247.5, 285, and 285. B25 differs by only half an item in Domains 2 and 4.

There is no material aggregate over- or under-weighted domain finding. The previous zero-alignment conclusion is withdrawn.

Performance-outcome coverage still needs work

Matching domain totals does not establish that all competencies within each domain have adequate depth. B25 supplies domain numbers, but no item-to-performance-outcome mapping.

Domain	Source-based assessment and priority
1	Organizational structures, leadership, strategy, and networking are represented—for example T1Q1, T7Q9, and T8Q19. However, the full-text scan found no explicit Six Sigma/TQM assessment. That is a specific gap, not an absence of strategic-planning content.
2	Actual language application exists in T9Q33/T10Q39/T10Q45. Much of the reviewed practice nevertheless isolates a single word, punctuation mark, or broad communication principle. Add richer editing and document-review decisions rather than more reworded definitions.
3	T8Q59/T8Q61 demonstrate that file-conversion and data-transfer topics are present; they should not be reported as missing. The next priority is more interpretation of supplied data and multi-step software decisions, rather than terminology alone.
4	Records, procurement, calendars, and office operations are represented in T1Q69/T1Q71/T1Q72. The issue is reliable application: correct T8Q89, stabilize classifications such as T7Q56, and reduce repeated elementary filing definitions.
5	Meetings, travel, events, and projects are appropriate. T1Q104 tests initial event planning, while T7Q107 supplies both path totals and asks which determines duration. Retain foundational items, but add more decisions among plausible competing constraints rather than relying on obvious alternatives.
6	HR, inclusion, banking, and financial tasks belong here. T3Q149/T7Q145 cover individual reconciliation adjustments, but these do not establish proficiency with a complete reconciliation. T4Q145 defines disability diversity; it does not demonstrate applied handling of an accommodation situation.

The named productivity-system, accommodation, data, and financial-statement competencies come from the current BOK. The judgments about depth and redundancy are audit findings from B25, not official IAAP difficulty ratings. 
YMAWS

The source examples support the distinction between present and adequately developed: T8Q19 is a KPI definition; T8Q59/T8Q61 address conversion and transfer; T3Q149/T7Q145 are single-adjustment reconciliation questions. 

cap +1

DEI, workplace harassment, professional networking, and office-software content are not scope defects for IAAP CAP. For example, T1Q123/T1Q129 and T7Q15 concern relevant administrative competencies. 

cap +2

Test length and score interpretation

The 2024 handbook specifies 200–225 multiple-choice questions in three hours. B25’s T1–T10 contain 150 each. They are therefore shorter practice forms, not full-length reproductions of that published format. This is not independently a PULL-level defect when they are clearly labeled shorter practice tests. 
YMAWS

IAAP uses equated, scaled scores. The content-blind percentages measured below must not be interpreted as official CAP passing scores, and B25 has no supplied validation supporting such a conversion. 
YMAWS

6. STRUCTURAL CHECK
Section A verification
Check	Independent result
Total questions / tests	1,500 / 10
Questions per test	150 throughout
IDs and numbering	Unique; Q1–Q150 present in every test
Options per question	Four throughout
Missing options / invalid key labels	0 / 0
Exact whitespace-normalized duplicate stems	0
Case-sensitive literal duplicate options	0
Section A’s T4Q49 warning	False positive: capitalization is the assessed distinction
Missing explanations	0
Explanations under 40 characters	0
Explanation length	52 minimum; 104 median; 174 maximum characters
Unique explanation texts	1,499; T5Q60/T6Q34 share one
Same-letter runs of four or more	0
Images / missing referenced image files	0 / 0

Section A’s basic integrity checks largely reproduce. They do not detect the principal assessment defects. 

cap

Zero exact duplicate stems does not establish 1,500 independent assessments, as T7Q15/T7Q20 demonstrates. Explanation lengths are adequate for short feedback in many cases, but length does not establish accuracy or useful distractor analysis. T8Q141 remains an example of a substantive error in a nontrivial-length explanation. 

cap +1

Longest-option cue

Lengths use whitespace-normalized source characters, excluding A/B/C/D labels—not rendered pixel width.

Measurement	Result
Key strictly longest by characters	1,124/1,500 — 74.93%
Key tied for or uniquely longest	1,188/1,500 — 79.20%
Questions with one uniquely longest option	1,401
Key is that option, among those 1,401	80.23%
Questions tied for maximum length	99
All four choices equal in length	22
Key strictly longest by word count	947/1,500 — 63.13%

A strategy of choosing the longest option and randomly selecting among tied longest choices produces an expected 1,149/1,500 — 76.60% against the printed keys.

This is not primarily a tie artifact. The observed tie-inclusive rate is 79.20%, compared with 27.55% under uniformly assigned keys using the same length configurations.

The cue affects every domain. The strictly-longest-key rate ranges from 62.00% in Domain 3 to 85.61% in Domain 5. T1Q33/T1Q34/T7Q53/T7Q54 provide concrete examples. 

cap +1

Test 7: the 73.33% match understates the local regularity

For a fixed ABCDABCD… sequence anchored at Q1:

Test 7 interval	Matches
Q1–Q53	53/53
Q54–Q93	0/40
Q94–Q150	57/57
Total	110/150 — 73.33%

The middle forty keys are not random. They continue in shifted ABCD phases. The boundaries at T7Q53→Q54, T7Q68→Q69, and T7Q93→Q94 show the phase changes. 

cap +2

All six tagged domain blocks in Test 7 follow an exact rotation of ABCD.

Per-test results

“Best rotation” searches the four rotations ABCD, BCDA, CDAB, DABC, anchored at Q1. Counts are out of 150.

Test	Strictly longest key	Fixed ABCD match	Best whole-test rotation	Longest uninterrupted cyclic stretch
T1	100 — 66.67%	49 — 32.67%	CDAB: 52	Q94–Q123: 30 items
T2	108 — 72.00%	30 — 20.00%	CDAB: 74	Q1–Q30: 30
T3	105 — 70.00%	53 — 35.33%	ABCD/CDAB: 53	Q1–Q53: 53
T4	109 — 72.67%	16 — 10.67%	CDAB: 90	Q94–Q150: 57
T5	111 — 74.00%	53 — 35.33%	ABCD: 53	Q94–Q122: 29
T6	122 — 81.33%	30 — 20.00%	CDAB: 47	Q1–Q30: 30
T7	117 — 78.00%	110 — 73.33%	ABCD: 110	Q94–Q150: 57
T8	116 — 77.33%	43 — 28.67%	DABC: 48	Q1–Q30: 30
T9	116 — 77.33%	58 — 38.67%	CDAB: 68	Q31–Q69: 39
T10	120 — 80.00%	29 — 19.33%	CDAB/DABC: 51	Q27–Q54: 28

Fitting an ABCD rotation separately to each of the 60 test-domain blocks gives:

1,468/1,500 matches — 97.87%; 47 of 60 blocks perfectly cyclic.

Tests 3, 7, 8, and 9 have perfect cycles in every tagged domain block. This is a post-hoc diagnostic, not a validated prediction algorithm, but the exact uninterrupted stretches demonstrate a serious placement pattern.

The overall 375 A / 375 B / 375 C / 375 D distribution does not establish effective randomization. Perfect balance and zero long same-letter runs can coexist with highly predictable ordering. 

cap +1

Runtime limitation: these measurements describe the supplied export. Genuine runtime shuffling could disrupt positional cycles; it would not remove the longest-answer cue. The live delivery implementation must be checked rather than assumed.

The 
corrected B25 IAAP audit evidence ledger records the rechecked metrics, all item IDs, sample selection, 37 fresh computational checks, official allocation comparison, retained defects, and withdrawn ISA-specific conclusions.

7. TOP FIXES

Eliminate cyclic answer placement across T1–T10. Use T7Q1–Q150, T3Q1–Q53, and T4Q94–Q150 as regression cases. Derive keys from the final option order rather than a repeating letter template.

Rewrite the answer choices responsible for the longest-answer cue. Start with T1Q33/T1Q34/T7Q53/T7Q54. Make options comparable in specificity and grammatical structure, with plausible competing answers—not padding added to distractors.

Correct the confirmed content defects. Repair T8Q89, T2Q62, and T8Q141, and issue item-specific corrections for affected retained attempts where appropriate.

Keep the IAAP subject matter and near-matching domain allocation. Replace the superseded ISA audit assumptions; do not discard appropriate items such as T1Q24/T6Q6 or replace office content with automation material.

Add auditable performance-outcome mapping. Resolve primary/secondary classifications for T7Q56 and T5Q60/T6Q34, then check each form for coverage beyond its six domain totals.

Address specific competency gaps rather than indiscriminately increasing difficulty. Expand the strategic-productivity coverage beyond T7Q9/T8Q19, and applied accommodation coverage beyond T4Q145.

Add richer work-product interpretation. Build on the elementary editing, data-transfer, and reconciliation tasks represented by T9Q33, T8Q61, T3Q149, and T7Q145 with more substantial supplied documents or data and plausible alternatives.

Deduplicate within and across tests. Address T7Q15/T7Q20, T6Q29/T7Q4, and T5Q60/T6Q34 before using the forms as independent measures of progress.

Label the 150-item forms accurately. For T1–T10, distinguish shorter practice from full-length simulation and avoid unsupported official-score predictions. Align any full-length mode with the current published IAAP format.

Strengthen release validation and source maintenance. Preserve meaningful case/punctuation differences in T4Q49/T10Q39, clarify wording such as T7Q52, and require length-cue, phase-shifted-cycle, factual-source, and live-delivery checks before restoring readiness claims.

8. SUMMARY ROW

| B25 — IAAP CAP Exam Prep, corrected-target audit | 4.0/10 | 2 confirmed defective/underspecified; sampled review | 3 confirmed; not exhaustive | PULL | Correct IAAP subject matter and closely matched domain allocation; 74.93% longest-answer cue and pervasive cyclic keys invalidate readiness use. |