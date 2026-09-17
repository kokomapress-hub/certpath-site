# B33 — CAPM Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/capm.json` — 750 questions / 5 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

6.0/10 — PULL from scored-test/readiness use pending corrections and verification of the interactive items.

The domain-weighting concern is largely a reporting error, not an actual allocation failure. Counting every item’s printed domain tag gives 36.00% Fundamentals, 17.33% Predictive, 20.00% Agile, and 26.67% Business Analysis. Section A excludes the 25 matching/ordering items from its domain totals, making Predictive appear substantially underrepresented. Those omitted items still have domain tags in Section B. 

capm +1

The principal findings are:

25 interactive records cannot be answered or scored independently from this export: their response elements and matching/ordering keys are absent.

One ethics answer requires qualification, and seven explanations require correction or qualification.

The correct answer is uniquely longest in 313/691 single-answer items — 45.30%.

No repeating four-letter cycle was detected, but there are two separate answer-position cues: A is correct in only 4/133 single-answer questions within Q1–Q30, and E is never correct in any of the 34 select-two questions.

The missing interactive data may be an export limitation rather than a live-site defect. That distinction must be verified; I am not claiming that all 25 are broken on the website.

Assessment area	Score
Answer-key correctness in reviewed content	9.0/10 — provisional
Explanation accuracy in reviewed content	8.0/10 — provisional
Item quality and distractors	5.0/10
Current CAPM blueprint alignment	8.0/10 — domain allocation matches; task-level coverage needs verification
Structural hygiene and assessment integrity	4.0/10

Coverage: I processed all 750 records, 2,934 displayed options, and 750 explanations, including 4,486 literal within-item option-pair comparisons. I screened every stem and reviewed 382 records in full as exported: 357 complete-choice items plus the 25 incomplete interactive records. This comprises a 300-item stratified sample—15 per test-domain combination, seed 330029—plus 82 targeted records. All 34 multiple-response items were reviewed. I independently checked 22 numerical/work-calendar items.

This was not independent factual verification of every assertion in all 750 explanations, nor exhaustive semantic-equivalence testing of every prose option. The live renderer, scoring, timing, and candidate-response data were not tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
T2Q74 — Disclosure alone does not authorize continued participation in a conflicted decision — D requires qualification

The project manager discovers that a bidder is a longtime personal friend. Key D says to continue scoring every bid against the same criteria while disclosing the relationship. The explanation treats that combination as sufficient. 

capm

PMI’s Code of Ethics, section 4.3.2, requires a conflicted practitioner to refrain from participating in or influencing the decision unless and until disclosure, an approved mitigation plan, and appropriate stakeholder consent permit participation. Consistent scoring criteria do not independently resolve the conflict. 
Project Management Institute

Correct conclusion: disclose the relationship and refrain from influencing the decision until participation is appropriately authorized. D is the closest supplied answer but is incomplete; none of A–C is a suitable replacement. Do not simply change its key letter.

T5Q110 already handles the corresponding family-relationship scenario by disclosure and stepping out of the decision. Use it as an internal consistency check. 

capm

Twenty-five interactive answer keys are unverifiable from the supplied record

These records contain a matching or ordering instruction, KEY: None, and an explanation—but no response tokens, matching columns, correct pairings, or machine-readable sequence.

Test	Affected items
T1	T1Q28, T1Q33, T1Q38, T1Q41, T1Q56, T1Q65. 

capm


T2	T2Q16, T2Q104, T2Q119, T2Q123. 

capm


T3	T3Q4, T3Q27, T3Q124, T3Q133. 

capm


T4	T4Q2, T4Q31, T4Q35, T4Q42, T4Q129. 

capm


T5	T5Q5, T5Q18, T5Q34, T5Q93, T5Q95, T5Q143. 

capm

Correct keys: not independently recoverable as complete response mappings from the export. Some explanations describe an intended sequence, but treating that prose as proof of the actual scoring configuration would be circular.

T5Q18 is particularly incomplete: it asks candidates to match estimate classes to accuracy ranges, yet neither the ranges nor their answer mapping appears anywhere in the exported item. 

capm

Matching and drag-and-drop questions are legitimate CAPM formats. The defect here is missing auditable item data, not the absence of A–D choices by itself. 
Project Management Institute

Multiple-response keys are not invalid single-answer keys

All 34 five-option questions have syntactically valid two-letter answer sets. T1Q2’s A,C correctly selects the two supplied contract-risk statements; it must not be reduced to one answer merely to satisfy Section A’s validator. 

capm

However, T1Q2 alone does not explicitly state the required number of selections in its stem. Add an unambiguous selection instruction or verify that the interface supplies one.

No incorrectly valued numerical key was found in the 22 numerical/work-calendar checks. For example:

T2Q107: max(3+5+4+2,3+7+6+2)=18

so C, A–C–E–F at 18 days, remains correct.

T4Q133: EAC=
0.80
200,000
	​

=250,000

so C remains correct. 

capm +1

3. EXPLANATION ERRORS

Seven distinct explanations require correction or qualification.

T2Q55, T4Q90, T5Q92 — Definition of Done is misclassified in formal Scrum terminology

All three explanations say that Scrum formalizes the Definition of Done as an artifact. 

capm +1

In the November 2020 Scrum Guide, the Definition of Done is the commitment associated with the Increment. It is not a fourth named Scrum artifact. The relevant correction is to the formal taxonomy—not to prohibit teams outside Scrum from using a shared completion standard. 
Scrum Guides

Existing keys remain appropriate: T2Q55 C; T4Q90 D; T5Q92 C.

T1Q110, T3Q42, T5Q22 — Fixed iteration length is turned into a blanket prohibition on considering new work

These explanations state that newly discovered work goes to a later iteration because the timebox is fixed. Their underlying distinction—do not extend the iteration merely to fit more work—is sound. The blanket conclusion about scope is not. 

capm +1

Scrum permits scope clarification and renegotiation with the Product Owner as learning occurs, provided the Sprint Goal is protected. A fixed timebox does not make the Sprint Backlog immutable. 
Scrum Guides

D remains the best supplied answer in these items. The explanations should distinguish deferring work, renegotiating work, and unilaterally inserting work—not teach that all new work must wait.

T3Q95 already provides the needed distinction: Sprint work is negotiated with Developers rather than dictated by the Product Owner. 

capm

T2Q74 — Conflict-of-interest explanation omits the conditions for continuing participation

The explanation endorses scoring while disclosing, without addressing authorization to continue after a conflict is identified. Correct it consistently with the decision-making restriction discussed in Section 2. 

capm

Count: three terminology errors, three overgeneralized timebox explanations, and one ethics qualification. These are seven rationale findings, not seven incorrectly valued keys.

4. ITEM QUALITY
A. CAPM-level scenarios are not automatically misplaced PMP questions

I found no confirmed PMP-only, senior-level situational-judgment item among the 357 complete-choice items reviewed. The main pattern is identifying or applying a foundational concept within a short scenario.

CAPM is not scenario-free: PMI’s official sample questions include contextual requirements prioritization, artifact selection, and a select-two charter question. Its outline also explicitly requires applying ethics and choosing tools for situations. 
Project Management Institute
+1

The following should not be removed merely because they ask what someone should do:

Item	Competency actually being tested
T1Q70	Recognizing the sponsor’s authority after the project manager’s attempts to resolve a cross-department blocker have failed.
T2Q58	Selecting a timeboxed spike when technical uncertainty prevents estimation.
T3Q25	Distinguishing analysis and recommendations from authority to commit scope.
T4Q127	Recognizing that required formal acceptance is still needed despite a successful demonstration.
T5Q46	Following an established communications framework and using the appropriate change mechanism.

These are bounded applications with relevant constraints supplied in the stems—not the kind of poorly specified, competing strategic trade-off that requires inventing senior-management assumptions. 

capm

T1Q65 is an unresolved depth-check candidate, because it asks candidates to order a response to schedule slippage but omits the steps. Its topic can fit CAPM; the missing response elements prevent a judgment about the actual difficulty or sequencing ambiguity. 

capm

B. Five questions test exam trivia, not Business Analysis competence

T1Q43, T2Q10, T3Q108, T4Q70, and T5Q134 all ask candidates to identify the Business Analysis domain’s exam weighting or rank. Their factual answers are consistent with the published allocation, but they assess familiarity with the exam rather than the domain’s professional competencies. 

capm

They occupy 5/200 BA-tagged slots—2.5% of that pool. Move them to orientation material and replace those scored-practice slots with actual BA tasks. This is a scope/use finding, not a wrong-key finding.

C. Reworded repeats limit independence between tests

T1Q6, T2Q125, T3Q90, T4Q96, and T5Q43 all present essentially the same elicitation decision: gain deep insight from one experienced person through an interview, rather than a broad survey, brainstorming, or an unrelated document. Changing the expert’s profession does not create a substantially different assessment. 

capm

T1Q90, T2Q2, and T4Q19 repeat the portfolio-versus-program distinction and use identical explanation text. 

capm

These are confirmed examples, not an exhaustive semantic-duplicate count. Repetition can be useful in learning drills, but repeated decisions across purportedly independent tests can inflate apparent progress.

D. Some distractors give away the answer through completeness and length
Item	Correct option length	Other option lengths	Finding
T4Q68 — A	162 characters	60, 104, 54	The key gives both definitions and their sequence; alternatives are markedly less complete.
T5Q74 — A	174	41, 111, 84	The key fully defines both compared concepts, while the shortest distractor merely calls them identical.
T1Q16 — D	116	90, 91, 92	The substantive interdependence explanation competes with obviously absolute claims.

The original options demonstrate the construction pattern. 

capm +1

This is not a recommendation to make every option identical in length. The correction is to give distractors comparable specificity and a plausible misconception, rather than adding filler.

E. Preserve distinctions without turning them into universal prohibitions

The recurring “BA never owns backlog order” takeaway in T5Q47 is too absolute as a statement about people’s job titles. The relevant distinction is that performing analysis does not itself confer Product Owner accountability; the same person may hold additional responsibilities. The key’s core role distinction is defensible, so I have not added it to the wrong-key count. 

capm

The Scrum Guide also distinguishes delegated backlog-management work from the Product Owner’s retained accountability. Avoid teaching “may help order” and “is accountable for ordering” as though they were the same question. 
Scrum Guides

5. BLUEPRINT COVERAGE
Reference: current published CAPM Examination Content Outline — 2023 Exam Update

The current PMI allocation remains 36% Fundamentals, 17% Predictive, 20% Agile, and 27% Business Analysis, checked for this audit on September 17, 2026. 
Project Management Institute

Full tagged allocation is within normal whole-question rounding
Domain	Official weight	All B33 records	Actual share	Difference
Project Management Fundamentals and Core Concepts	36%	270	36.00%	0.00 percentage points
Predictive, Plan-Based Methodologies	17%	130	17.33%	+0.33
Agile Frameworks/Methodologies	20%	150	20.00%	0.00
Business Analysis Frameworks	27%	200	26.67%	−0.33
Total	100%	750	100%	

Every form uses 54 Fundamentals / 26 Predictive / 30 Agile / 40 BA. Against a 150-question practice allocation, the fractional targets are 54, 25.5, 30, and 40.5. There is no material aggregate over- or under-weighting finding.

Section A omits the interactive items from domain totals
Domain	Section A / records with choices	Omitted interactive records	Full tagged total
Fundamentals	268	2	270
Predictive	110	20	130
Agile	149	1	150
Business Analysis	198	2	200
Total	725	25	750

The reported counts are therefore accurate for the choice-bearing subset, but incomplete as a description of the whole bank. 

capm

The practical risk remains substantial: 20/130 Predictive records—15.38%—are among the unverifiable interactive exports. Among the 725 fully specified choice records, Predictive represents only 110/725—15.17%. That does not prove the live site underdelivers Predictive coverage; it shows why the missing payloads matter disproportionately.

Task coverage is less balanced than the four totals suggest

Predictive calculations are unevenly distributed. Of the 22 numerical/work-calendar questions checked, 14 are Predictive-tagged: three in T1, four in T2, three in T3, four in T4, and none in T5. Test 5’s numerical item, T5Q24, is tagged Fundamentals and concerns effort versus duration. 

capm

The outline explicitly includes critical-path application and cost/schedule-variance calculations. There is no published minimum numerical-question count that I can apply here, but T5Q1–T5Q150 does not demonstrate the same calculation-practice breadth as the other forms. Repeated definition questions such as T5Q99 do not substitute for that practice. 
Project Management Institute
 

capm

Business Analysis needs more supplied-data application. Questions such as T4Q127 test a readiness principle, but they do not require inspecting an actual traceability matrix or backlog to determine which required items remain incomplete. The task-level blueprint expressly includes that kind of readiness determination. 

capm

 
Project Management Institute

Do not remove comparison questions solely because their answer names another approach. A Predictive-versus-Adaptive suitability question can legitimately sit in either comparison domain. Nor should all stakeholder-communication items be moved out of BA: that domain expressly includes choosing communication channels. 
Project Management Institute

Format and administration

The official exam contains 150 questions—135 scored and 15 pretest—with three hours available. It includes interactive formats and a ten-minute break after question 75, after which the first section cannot be revisited. B33 has the right total length, but its live timing, section behavior, scored/pretest treatment, and interactive scoring are unverified. 
Project Management Institute

The 25 incomplete records must not be assumed to be intentional unscored items merely because they lack an exported answer.

6. STRUCTURAL CHECK
Section A: confirmed findings and reporting defects
Check	Independent result
Records / tests	750 / 5, each with 150 records
IDs and numbering	Unique; Q1–Q150 present in each form
Displayed options	2,934
Question formats	691 four-option single-answer; 34 five-option select-two; 25 matching/ordering records without response payloads
Malformed answer sets among choice-bearing records	0
Section A’s 34 “invalid keys”	False positives from single-answer validation
Missing interactive response data	25 confirmed in export; live status unknown
Exact whitespace-normalized duplicate stems	0
Literal duplicate option pairs	0 across 4,486 comparisons
Missing explanations / explanations under 40 characters	0 / 0
Whitespace-normalized explanation length	188 minimum; 400 median; 677 maximum characters
Exact duplicate explanations	Four groups containing nine records
True uninterrupted same-letter runs of four or more	Six, not the eleven reported entries
Declared image references	0

Section A’s basic counts reproduce, but its validators and domain aggregation are not format-aware. 

capm

The duplicate-explanation groups are T1Q90/T2Q2/T4Q19; T2Q88/T3Q55; T2Q106/T5Q80; and T2Q127/T3Q38. Exact duplication is not automatically a factual error, but it reinforces the need to assess independence between forms rather than relying on unique stems.

Longest-option cue

Lengths are whitespace-normalized source characters, excluding labels, not rendered pixel width. The primary denominator excludes select-two and keyless records.

Measurement	Result
Single-answer key is strictly longest	313/691 — 45.30%
Same numerator divided by all bank records	313/750 — 41.73%
Single-answer key is tied for or uniquely longest	361/691 — 52.24%
Single-answer items with one uniquely longest option	623
Key is that option, among those 623	313/623 — 50.24%
Items tied for maximum length	68
All four options equal in length	8
Key strictly longest by word count	203/691 — 29.38%

Choosing the longest option and selecting randomly among tied longest choices would produce an expected 48.24% on the single-answer items against the printed keys, without using subject knowledge.

The observed 52.24% tie-inclusive rate exceeds the 28.44% uniform-key baseline for these same option-length configurations. The result is not explained away by ties.

For select-two questions, T1Q22, T1Q40, T5Q64, and T5Q84 have both correct options strictly longer than every distractor: 4/34—11.76%. This is a separate two-answer measurement.

Per-test lengths and four-letter fits

The template search evaluated all 24 permutations of A/B/C/D, anchored to the original question numbers. Multiple-response and keyless positions were retained rather than deleted and used to shift subsequent keys.

No exact repeating four-letter cycle was detected. No qualifying local nonconstant period of 2–6 extended for at least 12 consecutive single-answer items and three repetitions.

Test	Single-answer items	Strictly longest key	Including ties	Best four-letter fit across all 150 positions	Maximum same-letter run
T1	136	78 — 57.35%	86	CBDA: 41/150 — 27.33%	4
T2	140	67 — 47.86%	80	DBCA: 43/150 — 28.67%	4
T3	139	48 — 34.53%	59	ABCD: 44/150 — 29.33%	3
T4	140	54 — 38.57%	58	BCAD/BCDA: 44/150 — 29.33%	4
T5	136	66 — 48.53%	78	BCDA/BDCA: 40/150 — 26.67%	3

These are selected best fits, not detected cycles.

Two noncyclic placement cues remain

Early questions almost exclude A. Across each form’s Q1–Q30, there are 133 single-answer items, and only four have key A:

T1Q30, T3Q29, T5Q2, and T5Q11.

That is 4/133—3.01%, compared with 173/558—31.00% in Q31–Q150. Tests 2 and 4 contain no single-answer A key in their first thirty positions. The four early exceptions are identifiable in the source. 

capm

E is never correct in the 34 select-two questions. Correct-letter appearances are A22/B16/C15/D15/E0. Candidates who recognize this can eliminate the fifth choice without evaluating it. This is an observed placement defect, not proof of a particular generator implementation.

Same-answer runs are miscounted across other formats

The six genuine uninterrupted runs are:

T1Q3–Q6 B×4; T1Q24–Q27 C×4; T1Q94–Q97 A×4; T2Q12–Q15 D×4; T2Q58–Q61 A×4; T4Q16–Q19 D×4.

Section A’s T1Q29 C×5 bridges keyless T1Q28; T2Q17 D×5 bridges keyless T2Q16. Its apparent runs ending at T2Q146, T3Q14, T3Q141, T5Q37, and T5Q90 also cross multiple-response or keyless records and are not uninterrupted single-letter runs. 

capm

The aggregate A177/B172/C171/D171 counts describe the 691 single-answer items, not all 750. They are broadly balanced overall, but conceal the early-position imbalance. Natural runs themselves are not blockers and should not be artificially removed.

Runtime limitation: genuine delivery-time randomization could disrupt positional cues. It would not remove the longest-answer cue and must preserve matching keys, multiple-response sets, and explanation references.

The 
B33 CAPM audit evidence ledger contains every item’s measurements, all reviewed IDs, the 22 numerical checks, domain reconciliation, key sequences, format gaps, findings, and limitations.

7. TOP FIXES

Export and validate the complete payloads for all 25 interactive records. Prioritize T1Q28/T1Q33/T5Q18. Verify response elements, matching/order keys, scoring, and live display before counting them as validated test questions.

Remove the noncyclic answer-position cues. Review Q1–Q30 in T1–T5, especially Tests 2 and 4, and all 34 select-two items. Use final option order to derive keys rather than predictable placement constraints.

Correct formal Scrum terminology in T2Q55, T4Q90, and T5Q92. Preserve their appropriate completion-standard answers while identifying the Definition of Done as the Increment’s commitment.

Qualify the conflict-of-interest response in T2Q74. Disclosure and consistent scoring do not alone authorize continued participation. Reconcile the teaching with T5Q110.

Correct the fixed-timebox generalizations in T1Q110, T3Q42, and T5Q22. Preserve the fixed duration while allowing appropriate scope negotiation without jeopardizing the Sprint Goal; use T3Q95 as a consistency check.

Rewrite the longest-answer construction pattern. Start with T4Q68/T5Q74, then review every form, especially T1Q1–T1Q150. Make distractors comparably specific and plausible rather than merely longer.

Replace exam-trivia slots with BA competencies. Move T1Q43/T2Q10/T3Q108/T4Q70/T5Q134 outside scored practice while retaining the near-matching four-domain allocation.

Balance practical task coverage within each form. Add direct Predictive calculation practice to T5, and strengthen supplied-backlog/traceability interpretation beyond general readiness statements such as T4Q127. Do not invent numerical quotas that PMI has not published.

Reduce repeated decisions across forms. Review the interview sequence T1Q6/T2Q125/T3Q90/T4Q96/T5Q43 and the repeated portfolio items T1Q90/T2Q2/T4Q19. Retain legitimate CAPM scenarios rather than stripping context indiscriminately.

Make the validation and assessment workflow format-aware. Correct T1Q2’s selection instruction, Section A’s false invalid-key warnings, and runs crossing T1Q28/T2Q16. Verify the 150-item, three-hour workflow and section transition, without making unsupported official-score or readiness claims.

8. SUMMARY ROW

| B33 — CAPM Exam Prep, bank 29 of 30 | 6.0/10 | 1 ethics qualification; 25 interactive keys unverifiable from export; no numerical-key errors found in 22 checks | 7 corrections/qualifications | PULL | Full domain weights match; no confirmed PMP-only judgment drift; 45.30% uniquely-longest cue, early-A suppression, and E never keyed in select-two items. |