> **⚠️ THIS AUDIT USED THE WRONG TARGET EXAM — superseded.**
>
> The prompt told ChatGPT the target was the **ISA Certified Automation Professional**. It is not: `books.json`
> categorises this bank under **Administrative & Office**, i.e. the **IAAP Certified Administrative Professional**.
> ChatGPT correctly detected that the content is administrative-professional material and therefore scored
> blueprint alignment 0/10 and the bank 1.0/10. **That verdict is an artefact of the wrong target.**
>
> Still valid from this run, because they are content-independent and were independently measured:
> * keyed answer is the single longest option in **1,124/1,500 = 74.93%** of items
> * Test 7 matches an A-B-C-D repeating key template in **110/150 = 73.33%** of items
>
> See `B25-cap.md` for the re-run against the correct IAAP CAP blueprint.

---

# B25 — CAP Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/cap.json` — 1500 questions / 10 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

1.0/10 for the stated ISA Certified Automation Professional target — PULL.

Both of your measurements are confirmed:

Check	Independently measured result	Finding
Keyed answer is the single longest option, measured in characters	1,124/1,500 — 74.93%	Confirmed
Test 7 matches A-B-C-D-A-B-C-D…, starting with A at Q1	110/150 — 73.33%	Confirmed

There is a more fundamental blocker: this is an administrative-professional bank, not an automation-professional bank. T1Q24 explicitly identifies IAAP as the association for the credential being tested. T6Q6 expressly describes CAP as validating an administrative professional’s knowledge. These are direct evidence of a credential mismatch, not merely a few off-topic questions. 

cap +1

ISA’s CAP concerns automation and controls in process and manufacturing systems. Office-administration questions do not become ISA-aligned because they use the same acronym or six numbered domain tags. 
isa.org

Assessment area	Score
Answer-key correctness within the reviewed administrative content	9.0/10 — provisional
Explanation accuracy within the reviewed content	8.5/10 — provisional
Item quality and distractors	1.0/10
ISA CAP blueprint alignment	0.0/10
Structural hygiene and assessment integrity	1.0/10

The first two scores are sample-based editorial judgments, not full-bank accuracy estimates. They do not offset the wrong-credential content or the two substantial answer cues.

Coverage: I mechanically processed all 1,500 items, 6,000 options, and 1,500 explanations, including 9,000 within-item literal option-pair comparisons, complete answer-sequence analysis, and option-length measurements. Detailed subject review covered a reproducible 300-item stratified sample: five items from each of the six tagged domains in each test, plus targeted supplementary checks. I independently recomputed 37 identified calculation, formula, date, and time cases; all had the expected uniquely keyed result.

I did not independently fact-check every prose assertion in all 1,500 items. The item-level factual defects below are confirmed findings, not an exhaustive error count. Literal option comparison is also not equivalent to complete semantic validation of all prose choices. The live application’s question shuffling, option shuffling, timing, and scoring were not tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

Two confirmed defective or underspecified items were identified in the reviewed material. The bank-wide credential mismatch is counted separately; I am not labeling all 1,500 keyed answers factually wrong.

T8Q89 — Two different retention requirements combined into one answer

The stem asks how long employee medical and exposure records must generally be retained. Key D gives duration of employment plus thirty years for both. The explanation repeats that combined rule. 

cap

Under the general provisions of 29 CFR 1910.1020(d)(1), medical records are generally retained for employment duration plus thirty years, while exposure records are generally retained for at least thirty years. Exceptions and more specific standards can apply. The item collapses those distinct requirements. 
OSHA
+1

Correct key: no option accurately states both general requirements. D would fit a properly qualified medical-record question. Keeping records longer may be permissible, but that does not make the item’s statement of the general mandated periods accurate.

T2Q62 — Browser startup page and homepage conflated

The question asks for the term describing the page that loads when a browser opens. Key D is Home page, without specifying the browser or configuration. 

cap

That is not a universally reliable definition. Chrome, for example, explicitly distinguishes the startup page, displayed on launch, from the homepage, reached using the Home button; they coincide only when configured that way. 
Google Help

Correct key: platform-dependent as written; “startup page” is absent. D is defensible under some terminology or configurations, so this is an underspecified item, not proof that D is wrong in every browser.

No wrong numerical key was found in the 37 computational cases checked. For example, T4Q88 correctly gives 8(0.5)+6(0.3)+9(0.2)=7.6, while T3Q94 correctly gives 45,000/300=$150 per attendee. Those results do not establish ISA relevance. 

cap

3. EXPLANATION ERRORS

Three confirmed explanation defects; two accompany the items above.

Item	Explanation defect	Required correction
T8Q89	States one general retention period for both medical and exposure records.	Distinguish the two regulatory defaults and applicable exceptions.
T2Q62	Defines a homepage as the page displayed when a browser launches, without qualification.	Distinguish startup behavior from the homepage function or specify the intended platform/configuration.
T8Q141	Correctly calculates remaining cash as $75, then says that amount should match cash on hand plus vouchers.	Remaining cash is $75; cash plus $75 of vouchers reconciles to the original $150 fund.

The first two explanations reproduce the unsupported generalizations in their stems. 

cap +1

 
Google Help
+1

For T8Q141, the reconciliation is:

Remaining cash=150−30−45=75
Cash plus documented vouchers=75+(30+45)=150.

Key B remains correct. The defective statement is the explanation’s final reconciliation claim. 

cap

4. ITEM QUALITY
A. Wrong credential, not merely uneven coverage

The mismatch is explicit in T1Q24, T6Q6, T7Q15, T7Q16, and T7Q27, which reference IAAP or administrative-professional certification and development. T7Q15 even places its scenario at an IAAP conference. 

cap +3

The broader content is consistent with that identity:

Example	What the bank actually tests
T1Q54	Word-processing heading styles
T4Q49	Capitalization of a business-letter complimentary close
T5Q60 / T6Q34	Muting microphones during video meetings
T7Q94	An assistant preparing an executive’s international-business etiquette briefing
T1Q104	Planning a corporate conference

These are not isolated references inside an otherwise technical automation bank. They exemplify the recurring administrative tasks being assessed. 

cap +4

The export alone cannot establish whether the wrong bank was authored or the wrong bank was linked to the product. Both possibilities require checking before customers are directed to it again.

B. The longest-answer cue is substantive and exploitable

The correct option is repeatedly the only one that combines a reasonable action, its qualifications, and its justification. The distractors are shorter, incomplete, or obviously inappropriate.

Item	Correct option length	Other option lengths	Observed cue
T1Q33 — C	87 characters	54, 38, 57	The correct style-guide purpose is the most elaborated choice.
T1Q34 — D	83	43, 46, 36	Even the definition of concise is the conspicuously longest option.
T7Q53 — A	96	43, 41, 39	The professional response is much longer than three extreme alternatives.
T7Q54 — C	94	51, 44, 31	The inclusive meeting response combines several sensible actions.

Lengths exclude labels and normalize whitespace. The source choices show the imbalance directly. 

cap +1

T7Q53 is particularly weak: a measured private discussion competes with shouting, sabotage, and doing nothing. That combination tests recognition of the obviously professional sentence more than discrimination among plausible responses. 

cap

Shuffling options cannot remove this cue. It moves the long answer to a different letter but leaves its length and wording recognizable.

C. Confirmed near-duplicates
Items	Repetition
T6Q29 / T7Q4	The same definition of professional networking with trivial wording changes.
T5Q60 / T6Q34	The same mute-when-not-speaking decision, with identical explanation text.
T7Q15 / T7Q20	The same personalized conference-contact follow-up decision, repeated within Test 7.

These examples are confirmed conceptual repetitions, despite the absence of exact duplicate stems. They are not an exhaustive near-duplicate count. 

cap +1

D. Case-sensitive distractors must not be incorrectly deleted

T4Q49 is not a defective duplicate-choice question. It asks which complimentary close is capitalized correctly:

yours Truly, / YOURS TRULY, / Yours Truly, / Yours truly,

The capitalization is the tested distinction, and D is the intended unique answer. A case-insensitive duplicate checker destroys the information necessary to evaluate this item. 

cap

E. Missing technical assessment evidence

Across T1Q1–T10Q150, the full-text scan found no occurrences of core automation markers such as PLC, DCS, PID, SCADA, HMI, SIS, SIL, instrumentation, commissioning, or IEC. Keyword absence alone would not prove missing coverage, but here it supports the explicit credential references and the administrative content observed in the detailed review.

There are also no supplied figures or diagrams. I found no item that demonstrably depends on a missing attachment, so this is not a broken-image finding. The substantive problem is that the supplied material does not demonstrate technical automation assessment.

5. BLUEPRINT COVERAGE

Reference: ISA’s 2024 CAP Content Outline, labeled “As of December 2024” on its current CAP Body of Knowledge page, checked for this audit. The published allocation is: 
isa.org

Official ISA CAP domain	Published weight	Published item allocation
1. Feasibility Study	12%	21
2. Definition	14%	25
3. System Design	23%	40
4. Development	16%	28
5. Deployment	15%	27
6. Operation and Maintenance	20%	34
Total	100%	175

The current ISA exam is 175 multiple-choice questions over four hours. Each B25 form contains 150 questions. That is an acceptable possible practice length, but it is 25 questions short if represented as a current full-length ISA mock exam. The export does not establish how the live tests are advertised or timed. 
isa.org

The bank’s numbered tags represent different content
Export tag	Items	Share	Observed content—not an ISA domain mapping
1	300	20.00%	Organizational structures, leadership, professional conduct and networking
2	232	15.47%	Business communication, document presentation and etiquette
3	150	10.00%	Office software, browsers, collaboration and basic information technology
4	248	16.53%	Records, filing, executive calendars and office procurement
5	285	19.00%	Meetings, events, business travel and general project management
6	285	19.00%	Accounting, payments, human resources and workplace practices

The counts reproduce Section A. The descriptions summarize observed content, rather than treating the numeric IDs as evidence of ISA alignment. T1Q1, T1Q31, T1Q54, T1Q69, T1Q94, and T1Q123 mark those six different content blocks in Test 1. 

cap +6

It would be incorrect to describe this simply as “Domain 1 overweight and Domain 3 underweight.” The categories themselves are different.

The missing substantive coverage includes automation feasibility and requirements, control-system and instrument design, control programming and interfaces, factory/site testing and startup, and lifecycle diagnostics and maintenance. These are central to the official outline, not optional enrichment. 
isa.org

Some material is potentially transferable: T4Q88 tests weighted vendor evaluation, and T7Q55 tests database primary keys. Such foundational concepts could support an automation curriculum. They do not compensate for an entire bank organized around a different profession. 

cap +1

Neither renaming the domain tags nor changing the book title would establish blueprint compliance.

6. STRUCTURAL CHECK
Section A: confirmed and refuted findings
Check	Independent finding
Total questions / tests	1,500 / 10, confirmed
Questions per test	150 in every test
Item IDs and numbering	Unique; Q1–Q150 present in each test
Options	Four per item
Invalid key labels / missing options	0 / 0
Exact whitespace-normalized duplicate stems	0
Case-sensitive literal duplicate options	0
Section A’s T4Q49 duplicate warning	False positive for this capitalization item
Missing explanations	0
Explanations below 40 characters	0
Explanation length	52 minimum; 104 median; 174 maximum characters
Unique explanation texts	1,499; T5Q60/T6Q34 share one
Same-letter runs of four or more	0, confirmed
Images / missing referenced figure files	0 / 0

The counts and missing-field checks largely reproduce Section A, but they do not establish assessment quality. T4Q49 demonstrates why normalization must respect what an item tests; T5Q60/T6Q34 demonstrates why exact-stem uniqueness does not establish substantive uniqueness. 

cap +2

Longest-option cue: verified and explained
Measurement	Result
Key is strictly longest by characters	1,124/1,500 — 74.93%
Key is tied for or uniquely longest	1,188/1,500 — 79.20%
Questions possessing one uniquely longest option	1,401
Key is that option, among those 1,401	1,124/1,401 — 80.23%
Questions with a tie for longest	99
Questions with all four options equal in character length	22
Key is strictly longest by word count	947/1,500 — 63.13%

Your approximately 75% result therefore holds under character length, with ties excluded. Word count gives a different, still substantial cue. Neither measurement represents actual rendered pixel width.

A content-blind strategy of choosing the longest option and selecting randomly among tied longest options has an expected score of 1,149/1,500 — 76.60% against the printed keys. This is a measured vulnerability of T1Q1–T10Q150, not a prediction of an official CAP passing score.

Unlike the preceding mathematical banks, ties do not explain away the result. The observed tie-inclusive rate is 79.20%, versus 27.55% under a uniform-key baseline using the same option-length configurations.

Test 7: exactly where the 73.33% comes from

For the fixed sequence starting A at Q1, B at Q2, C at Q3, D at Q4:

Test 7 interval	Matches to the fixed ABCD sequence
Q1–Q53	53/53
Q54–Q93	0/40
Q94–Q150	57/57
Total	110/150 — 73.33%

The middle forty questions do not become random. They continue cycling in shifted phases. The transitions at T7Q53→Q54, T7Q68→Q69, and T7Q93→Q94 show the phase changes. 

cap +2

Every tagged domain block in Test 7 follows an exact rotation of ABCD. Thus, “73% whole-test match” understates its local regularity.

Per-test results

All counts below are out of 150. “Best rotation” searches only the four rotations ABCD, BCDA, CDAB, DABC, with the chosen sequence anchored at Q1.

Test	Strictly longest key	Including ties	Fixed ABCD matches	Best whole-test rotation	Longest uninterrupted cyclic stretch
T1	100 — 66.67%	109	49 — 32.67%	CDAB: 52	Q94–Q123: 30 items
T2	108 — 72.00%	112	30 — 20.00%	CDAB: 74	Q1–Q30: 30
T3	105 — 70.00%	117	53 — 35.33%	ABCD/CDAB tied: 53	Q1–Q53: 53
T4	109 — 72.67%	122	16 — 10.67%	CDAB: 90	Q94–Q150: 57
T5	111 — 74.00%	115	53 — 35.33%	ABCD: 53	Q94–Q122: 29
T6	122 — 81.33%	125	30 — 20.00%	CDAB: 47	Q1–Q30: 30
T7	117 — 78.00%	121	110 — 73.33%	ABCD: 110	Q94–Q150: 57
T8	116 — 77.33%	120	43 — 28.67%	DABC: 48	Q1–Q30: 30
T9	116 — 77.33%	120	58 — 38.67%	CDAB: 68	Q31–Q69: 39
T10	120 — 80.00%	127	29 — 19.33%	DABC: 51	Q27–Q54: 28

The low fixed-ABCD percentage for T4 is therefore not evidence of randomization: a different starting phase matches 60% of that test, and its final 57 keys cycle without interruption.

Bank-wide block pattern

Fitting an ABCD rotation separately to each of the 60 test-domain blocks produces:

1,468/1,500 matches — 97.87%.

47 of the 60 blocks are perfectly cyclic. Tests 3, 7, 8, and 9 have perfect cycles in all six blocks.

This is a post-hoc structural diagnostic, not an independently validated prediction algorithm. Nevertheless, the exact uninterrupted sequences are sufficient to establish a serious key-pattern defect.

Section A’s 375 A / 375 B / 375 C / 375 D distribution and absence of long same-letter runs conceal this problem. A sequence can be perfectly balanced and have no repeated adjacent letters while remaining highly predictable. 

cap +1

The sequence evidence is consistent with a cyclic answer-placement process whose phase changes at content boundaries. It does not establish the exact generator implementation or who introduced it.

The 
B25 audit evidence ledger contains all 1,500 item-level length measurements, complete key sequences, block fits, the 300 sampled IDs, the 37 computational checks, confirmed defects, and review limitations.

7. TOP FIXES

Remove this bank from the ISA CAP product immediately. The credential mismatch is explicit in T1Q24/T6Q6/T7Q27 and affects the suitability of T1Q1–T10Q150 as a whole.

Trace the book-to-bank mapping before rebuilding content. Determine whether cap is linked to the wrong source or whether the questions were authored for the wrong credential. Use the explicit IAAP references in T1Q24 and T6Q6 as regression checks against future routing mistakes.

Build a new ISA-specific item-to-task blueprint. Do not recycle tags 1–6 as ISA domain IDs. The administrative blocks beginning at T1Q1/Q31/Q54/Q69/Q94/Q123 require replacement or individually justified remapping.

Eliminate cyclic answer placement across every test. T7Q1–Q150, T3Q1–Q53, and T4Q94–Q150 are essential regression sequences. Derive the answer key from the final option order rather than assigning letters through a repeating template.

Remove the longest-answer cue through item revision, not shuffling alone. Start with T1Q33/T1Q34/T7Q53/T7Q54. Keep alternatives parallel in specificity and structure, with plausible competing decisions.

Do not use current scores as evidence of ISA readiness. The content-blind vulnerabilities affect T1Q1–T10Q150. Preserve affected attempt records and identify which customer-facing readiness claims need correction.

Correct the confirmed factual and explanation defects before reusing any content. Address T8Q89, T2Q62, and T8Q141. Their possible reuse elsewhere does not make them acceptable unchanged.

Remove confirmed redundant tasks and audit broader repetition. Review T6Q29/T7Q4, T5Q60/T6Q34, and T7Q15/T7Q20. Do not equate different wording with a different assessed skill.

Make validation sensitive to question purpose. Preserve capitalization distinctions in T4Q49, but add tests for phase-shifted cycles and answer-length cues across T1–T10. Existing literal checks miss the main defects.

Validate the replacement bank before restoring access. Require independent automation-specialist review, auditable domain/task mapping, defensible distractors, and appropriate test-mode specifications. Do not relabel T1Q1–T10Q150 as publication-ready IAAP preparation without a separate audit against that credential.

8. SUMMARY ROW

| B25 — CAP Exam Prep | 1.0/10 for ISA target | 2 confirmed defective/underspecified items; sampled factual review | 3 confirmed; not exhaustive | PULL | Wrong CAP credential: administrative rather than automation; 74.93% uniquely-longest cue; T7 ABCD 73.33%; blockwise cycle fit 97.87%. |