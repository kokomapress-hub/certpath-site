# B26 — CNOR Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/cnor.json` — 1500 questions / 10 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

3.0/10 — not release-ready. Both of your cue measurements are confirmed.

Check	Independently measured result
Keyed answer is the single longest option by character count	1,242/1,500 — 82.80%
Test 9 matches a repeating four-letter template	CDAB: 119/150 — 79.33%
Longest uninterrupted cyclic stretch in Test 9	T9Q23–T9Q141: 119 consecutive items

The principal clinical findings include an incorrect Aldrete blood-pressure threshold, an inadequate sprinkler-clearance answer, and questions that fail to distinguish MH susceptibility, preparation for anesthesia, and management of an actual MH crisis. These are separate from the answer-pattern defects.

I identified 10 items requiring key/stem correction or qualification and 11 explanations requiring correction or qualification, covering 12 distinct items. These are confirmed findings from the review described below—not an exhaustive whole-bank clinical error count.

Assessment area	Score
Answer-key correctness in reviewed content	8.0/10 — provisional
Explanation accuracy in reviewed content	7.5/10 — provisional
Item quality and distractors	1.0/10
Current CCI CNOR blueprint alignment	7.0/10 — aggregate weights match; detailed coverage unverified
Structural hygiene and assessment integrity	1.0/10

These are editorial readiness judgments, not measured accuracy percentages or a simple arithmetic average.

Coverage: The programmatic pass processed all 1,500 items, 6,000 options, and 1,500 explanations, including 9,000 literal within-item option-pair comparisons. Clinical review included 350 complete items, selected reproducibly as five items per test-domain combination using seed 260026, plus screening of every stem, keyed answer, and explanation in Infection Prevention and Emergency Situations—390 items. Those sets cover 640 distinct items before targeted follow-up.

I also checked quantitative concentration and threshold relationships, including T1Q12, T5Q139, and T10Q132. I did not independently verify every clinical assertion or semantically validate every option in all 1,500 questions. The live application’s shuffling, timing, rendering, and scoring were not tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
Highest-priority clinical and safety findings

T1Q12 — Modified Aldrete circulation criterion uses the wrong units — no option states the intended percentage threshold.

Key D says blood pressure within 20 mmHg of the preanesthetic level. The modified Aldrete criterion uses a difference within 20% of baseline, not a fixed 20 mmHg. The explanation incorrectly equates the two. 

cnor

 
OpenAnesthesia

For example, a 20 mmHg difference from an 80 mmHg baseline is:

20/80=25%,

not 20%. This can change the recovery score. D needs correction; reassigning the key to another existing option does not solve it.

T3Q120 — Ceiling and sprinkler clearances incorrectly combined — no adequate combined minimum is offered.

Key B specifies at least 5 inches below both the ceiling and sprinkler heads. CDC’s storage guidance distinguishes approximately 5 inches from the ceiling from 18 inches below sprinkler heads. The existing explanation mentions the 18-inch requirement, contradicting its keyed answer. 

cnor

 
CDC

Correct conclusion: separate the two clearances. T9Q108 already identifies the sprinkler-head clearance correctly, so B26 teaches conflicting rules. 

cnor

T9Q141 — An acute-MH question presumes circuit/absorbent changing without the critical treatment-priority qualification — stem requires revision.

The question asks why the circuit and CO₂ absorbent are changed during an MH crisis, with C describing removal of residual anesthetic and management of CO₂. The problem is not simply the physical rationale: it is the implied crisis workflow. 

cnor

The European Malignant Hyperthermia Group’s 2024 crisis guidance explicitly prioritizes stopping triggers, emergency treatment, ventilation, and appropriate filter use without wasting time changing the circuit or anesthesia machine. Preoperative workstation preparation and acute-crisis management must not be conflated. 
European Malignant Hyperthermia Group

Correct conclusion: qualify the procedural premise and priorities. Changing the letter alone will not fix this; option B’s “never changed” is also too absolute.

T10Q138 — MH susceptibility is treated as though an MH episode occurred — no ordinary discharge-criteria option is supplied.

Key C requires extended monitoring for recrudescence merely because an MH-susceptible patient had outpatient surgery. The explanation then introduces a triggering exposure or event that the stem never states. 

cnor

MHAUS distinguishes an actual MH event from an uneventful, nontriggering anesthetic: the latter does not require extended observation solely because of susceptibility, provided standard discharge criteria are met. 
MHAUS

Correct conclusion: the disposition depends on what occurred. The existing stem does not justify C.

T10Q136 — Corticosteroid benefit is presented without adequate evidence qualification — A needs revision.

Key A describes corticosteroids as adjuncts that may reduce biphasic reactions. Its distinction from immediate epinephrine is appropriate, but the preventive-benefit statement is not an established basis for recommending them. 

cnor

The AAAAI/ACAAI practice parameter advises against glucocorticoids as an intervention to prevent biphasic anaphylaxis because reliable preventive benefit has not been established. Resuscitation Council UK likewise advises against routine use, while allowing selected secondary indications after initial resuscitation. 
AAAAI
+1

Correct conclusion: preserve the distinction between secondary use and lifesaving initial treatment, but remove the unsupported implication of preventive efficacy. This is not a finding that corticosteroids are always contraindicated.

T1Q16 — “Not required in the time-out” depends on the checklist — D is not universally defensible.

The item keys D: estimated blood loss, then categorically excludes blood-loss discussion from the pre-incision time-out. It does not specify which checklist’s requirements govern the question. 

cnor

The WHO Surgical Safety Checklist explicitly includes the surgeon’s anticipated blood loss in the pre-incision discussion. That is different from documenting actual blood loss later. 
World Health Organization

Correct conclusion: specify the protocol and distinguish anticipated from actual blood loss. Do not teach D as a universal rule.

Additional answer-set, terminology, and currency findings

T1Q66 — The stem does not uniquely distinguish closed from open gloving — B and C are defensible.

The condition is simply donning gloves without bare hands touching the outside. Correctly performed open gloving also satisfies that condition. “Hands remain inside the gown sleeves” would distinguish closed gloving, but that restriction appears only in the explanation. 

cnor

 
BCcampus Open Publishing

Correct key as written: B and C are defensible. The description of closed gloving in the explanation is not itself false.

T1Q70 — FIFO is confused with FEFO — no option defines FIFO correctly.

Key C describes issuing the earliest-expiring stock first: first-expiring, first-out, rather than receipt-order first-in, first-out. The two sequences need not coincide. 

cnor

 
Microsoft Learn

Correct conclusion: FIFO follows receipt order. T5Q120 and T8Q41 correctly describe placing newer receipts behind older stock, creating another internal inconsistency. 

cnor +1

T8Q122 — Permitted single-use-device reprocessing is incorrectly restricted to external third parties — D is overbroad.

Key D and the explanation exclude facility reprocessing categorically. FDA regulates hospital and third-party reprocessors of single-use devices under applicable manufacturer requirements. 

cnor

 
U.S. Food and Drug Administration

Correct conclusion: distinguish regulated, validated reprocessing from unauthorized reuse. This does not make the casual IUSS, soaking, or high-level-disinfection alternatives acceptable.

T8Q150 — CNOR recertification by examination is obsolete — no current complete answer is offered.

Key D gives continuing education or reexamination. CCI discontinued recertification by examination effective January 1, 2021; the current standard route uses 300 professional-activity points over the five-year cycle, with eligibility requirements. 

cnor

 
Competency & Credentialing Institute

These ten entries include wrong thresholds, outdated statements, ambiguous choices, and inadequately qualified premises. They should not all be recorded as ten simple wrong-letter keys.

3. EXPLANATION ERRORS

Eleven rationales require correction or qualification. Nine accompany the Section 2 findings; two additional items retain their best available key.

Item	Explanation finding
T1Q12	Equates 20 mmHg with 20%, although their equivalence depends on the baseline.
T3Q120	Gives 18 inches below sprinklers, contradicting the keyed combined 5-inch clearance.
T9Q141	Presents circuit/absorbent changing as an acute-crisis task without the necessary distinction from changes that delay treatment.
T10Q138	Adds a triggering exposure or MH event absent from the stem to justify extended observation.
T10Q136	Presents biphasic-reaction reduction as a useful steroid benefit without explaining that reliable prevention has not been established.
T1Q16	Categorically excludes blood loss from pre-incision discussion; WHO includes anticipated blood loss.
T1Q70	Merges receipt-age rotation with expiration-priority rotation.
T8Q122	Incorrectly states that facilities cannot be regulated single-use-device reprocessors.
T8Q150	Repeats the discontinued examination-based recertification route.

The original statements and their contradictions are documented in the corresponding source items. 

cnor +4

T6Q136 — Cross-reactivity mechanism is oversimplified — key A remains the best supplied class choice.

The explanation attributes penicillin–cephalosporin cross-reactivity to the shared beta-lactam ring. The 2022 drug-allergy practice parameter identifies cross-reactivity as predominantly R1 side-chain-related; reactions attributable to the common ring are rare. The explanation needs that distinction rather than encouraging blanket equivalence between all penicillins and cephalosporins. 

cnor

 
AAAAI

T7Q130 — “Preferred antiarrhythmic” overstates the evidence — key B remains the best supplied option.

Amiodarone is appropriate among the listed choices, but the explanation calls it the preferred antiarrhythmic. The 2025 AHA guidance permits amiodarone or lidocaine for shock-refractory VF/pulseless VT; it does not establish the superiority implied by this wording. 

cnor

 
cpr.heart.org

T1Q66 is not counted as an explanation error: its description of closed gloving is accurate; the stem is insufficiently restrictive.

4. ITEM QUALITY
A. Implausible distractors substantially weaken the clinical judgment tasks

T2Q1 asks what does not belong in a PACU handoff and supplies the surgeon’s vacation schedule. T4Q37 contrasts appropriate retained-item prevention with hiding sponges in the wound, using one sponge, or skipping counts. These alternatives make the answer identifiable without meaningful perioperative discrimination. 

cnor

T9Q19 asks for the nursing diagnosis for an immobilized patient during a six-hour spinal procedure, with alternatives involving breastfeeding, diversional activity, and enhanced nutrition. The clinically relevant answer is also much longer. 

cnor

The issue is not that basic safety questions should be removed. It is that assessments should distinguish knowledge through plausible alternatives, rather than through obviously irrelevant or unsafe behavior.

B. The length cue is visible in the item construction

T9Q23 is especially conspicuous: the correct complete outcome statement is 107 characters, against alternatives of 32, 22, and 12 characters. One “most complete statement” item can naturally have this structure; its repeated use across a bank is a different problem. 

cnor

T9Q19’s correct choice is 89 characters, versus 23, 30, and 32 for the distractors. The measurement is therefore not just a statistical curiosity: it reflects how the answer choices were written. 

cnor

C. Near-repetition reduces independent coverage
Items	Repetition or local cue
T1Q4 / T1Q96	The same three Universal Protocol components, tested twice within Test 1 under different domain tags.
T1Q123 / T1Q125	The same primary function of an enzymatic detergent, two questions apart.
T1Q104 / T1Q114	Closely related point-of-use timing and prevent-drying rationale; different questions, but substantial overlap.

These are confirmed examples, not an exhaustive near-duplicate count. 

cnor +1

D. A further high-risk qualification needs specialist review

T7Q118 — Airborne precautions in an operating room need a defined engineering context.

The keyed answer combines a negative-pressure setup, an anteroom, N95 use, and facility policy. It must not be read as an instruction to casually switch a routine OR to negative pressure. CDC distinguishes standard positive-pressure operating-room ventilation from engineered airborne-infection controls and appropriate induction/recovery arrangements. 

cnor

 
CDC

Because the choice includes a potentially appropriate anteroom/per-policy pathway, I have not counted it as a definite wrong key. It needs more precise scenario and engineering assumptions.

E. No confirmed missing-figure defect

No item was found to depend on an unavailable image, but T1Q1–T10Q150 supplies no visual stimuli. That is a representation-variety limitation, not proof of broken assets. More useful assessment could involve interpreting a supplied record, equipment setup, label, or clinical trend—not simply adding decorative figures.

5. BLUEPRINT COVERAGE
Current reference: CCI CNOR Candidate Handbook, May 2026

The controlling reference is the CNOR Candidate Handbook, version 5.2026, together with CCI’s current exam page and detailed task-and-knowledge statements. The bank’s seven-domain aggregate percentages match the currently published blueprint. 
HubSpot
+1

Current CCI subject area	Published weight	Published scored items	B26 items
1. Pre/postoperative Patient Assessment and Diagnosis	15%	28	225 — 15%
2. Individualized Plan of Care Development and Expected Outcome Identification	8%	15	120 — 8%
3a. Patient Care and Safety	25%	46	Combined below
3b. Management of Personnel, Services and Materials	9%	17	Domain 3 combined: 510 — 34%
4. Communication and Documentation	11%	20	165 — 11%
5. Infection Prevention and Control of Environment, Instrumentation and Supplies	16%	30	240 — 16%
6. Emergency Situations	10%	19	150 — 10%
7. Professional Accountabilities	6%	10	90 — 6%

The CCI figures are from the handbook; the B26 counts were reproduced from the item tags. Published percentages are rounded and should not be reverse-engineered into different exact item allocations. 
HubSpot
 

cnor

There is no aggregate domain-weighting defect. However, B26 uses only a combined tag “3,” so the 25%/9% internal split is not independently auditable from its metadata.

Do not apply the announced 2027 blueprint prematurely

CCI states that its consolidated six-competency-area structure launches in 2027. The adoption announcement does not make the existing seven-domain bank automatically obsolete for the current exam. Maintain a separate transition plan rather than silently mixing the two blueprints. 
Competency & Credentialing Institute

Important task-level gaps and imbalances remain

Emergency breadth is narrower than the domain label implies. The current detailed task statements include natural disasters, terrorism/mass-casualty situations, active shooters, toxic exposures, and fire/laser emergencies. B26’s full-stem scan found no explicit disaster, active-shooter, or mass-casualty questions. The reviewed emergency content instead repeatedly covers MH, hemorrhage, anaphylaxis, LAST, and resuscitation. Keyword absence is not proof of every possible conceptual omission, but the review did not establish that broader emergency coverage. 
HubSpot

Examples of the concentration include T1Q127/T1Q129/T1Q131, repeated MH recognition or trigger tasks, and T7Q127/T7Q129/T7Q131/T7Q133, closely spaced LAST definition, treatment, and symptom questions. These subjects are in scope; the concern is what repeated coverage displaces. 

cnor +2

Care planning and assessment need more application, not only taxonomy. T1Q26/T1Q28/T1Q30/T1Q32/T1Q34 repeatedly identify model domains, while T9Q19/T9Q23 make their intended answer conspicuous through the alternatives. Their inclusion does not establish balanced decision-making depth. 

cnor +1

Communication and infection-prevention weights are present, but duplicate content inflates apparent breadth. T1Q4/T1Q96 and T1Q123/T1Q125 illustrate why question counts alone cannot establish distinct task coverage. 

cnor +1

Professional-accountability content requires currency control. T8Q150’s obsolete recertification route is directly relevant to this domain. A source-date field would make such maintenance auditable. 

cnor

I found no basis for declaring an entire clinical family categorically outside CNOR scope. The more important problems are clinical accuracy, task-level breadth, repeated definitions, and assessment cues.

Practice length versus full-length simulation

The current exam is 200 multiple-choice questions—185 scored and 15 unscored—with 3 hours 45 minutes available. B26’s tests contain 150 each. They are shorter practice forms, not full-length replicas. That alone is not a PULL-level defect when accurately labeled; unsupported full-length or official-score claims would be. 
HubSpot
+1

6. STRUCTURAL CHECK
Section A: independently verified results
Check	Result
Questions / tests	1,500 / 10, confirmed
Questions per test	150 throughout
IDs and numbering	Unique; Q1–Q150 present in every test
Choices	Four per item
Invalid key labels / missing options	0 / 0
Exact whitespace-normalized duplicate stems	0
Literal duplicate option pairs	0 across 9,000 comparisons
Missing explanations	0
Explanations under 40 characters	0
Explanation length	84 minimum; 145.5 median; 235 maximum characters
Exact duplicate explanations	0
Same-letter runs of four or more	0
Images / confirmed broken referenced images	0 / 0

Section A’s basic structural findings reproduce. However, its checks do not establish semantic uniqueness: T1Q66 still has two defensible techniques despite different option strings. Nor does exact-stem uniqueness establish independent learning coverage, as T1Q4/T1Q96 demonstrates. 

cnor +2

The explanation lengths are adequate for brief feedback, but length is not accuracy. T1Q12 and T10Q138 contain substantive problems despite full-sentence rationales. 

cnor +1

Longest-option cue: confirmed

Lengths are whitespace-normalized source characters, excluding option labels, not rendered pixel width.

Measurement	Result
Key is strictly longest by characters	1,242/1,500 — 82.80%
Key is tied for or uniquely longest	1,269/1,500 — 84.60%
Items with one uniquely longest option	1,465
Key is that uniquely longest option	1,242/1,465 — 84.78%
Items tied for maximum length	35
All four options equal in length	5
Key is strictly longest by word count	1,114/1,500 — 74.27%

A content-blind strategy of choosing the longest option and randomly choosing among tied longest options has an expected score of 1,253.75/1,500 — 83.58% against the printed keys.

This is not primarily a tie artifact. The observed tie-inclusive rate is 84.60%, versus 25.82% under uniformly assigned keys with the same length configurations.

Test 9 is especially exposed: 143/150—95.33%—of its keys are uniquely longest. This heuristic result must not be interpreted as an official CNOR score or passing probability.

Test 9’s four-letter template

The best whole-test template is:

C–D–A–B–C–D–A–B…, anchored at Q1.

Interval	Matches to that fixed CDAB template
T9Q1–T9Q22	0/22
T9Q23–T9Q141	119/119
T9Q142–T9Q150	0/9
Total	119/150 — 79.33%

The central stretch is exactly cyclic, not merely statistically similar. T9Q141 is C and T9Q142 is A, marking a phase break rather than continuation to D. 

cnor

Per-test cue and cycle results

The best-template search evaluated all 24 permutations of A/B/C/D. The winners were rotations of ABCD. “Best fit” is a descriptive post-hoc fit; the uninterrupted stretches provide stronger evidence of patterned placement.

Test	Uniquely longest key	Best four-letter template	Whole-test matches	Longest uninterrupted cyclic stretch
T1	105 — 70.00%	BCDA	62 — 41.33%	Q27–Q86: 60 items
T2	105 — 70.00%	ABCD	60 — 40.00%	Q36–Q86: 51
T3	111 — 74.00%	CDAB	66 — 44.00%	Q87–Q126: 40
T4	118 — 78.67%	CDAB	96 — 64.00%	Q36–Q80: 45
T5	123 — 82.00%	BCDA	63 — 42.00%	Q24–Q86: 63
T6	127 — 84.67%	BCDA	66 — 44.00%	Q35–Q85: 51
T7	133 — 88.67%	ABCD	83 — 55.33%	Q35–Q102: 68
T8	137 — 91.33%	DABC	88 — 58.67%	Q35–Q85: 51
T9	143 — 95.33%	CDAB	119 — 79.33%	Q23–Q141: 119
T10	140 — 93.33%	BCDA	61 — 40.67%	Q35–Q85: 51

Fitting an ABCD rotation separately within each of the 70 test-domain blocks produces:

1,465/1,500 matches — 97.67%; 61 of 70 blocks are perfectly cyclic.

This is consistent with cyclic answer placement whose phase changes at content boundaries. It does not establish the exact implementation or who introduced it.

The 375 A / 375 B / 375 C / 375 D distribution and absence of long same-letter runs therefore conceal a major defect. Balance is not randomness. 

cnor

Runtime limitation: genuine runtime question/option shuffling could disrupt the exported positional pattern. It would not remove the longest-answer cue. The live implementation needs verification, not assumption.

The 
B26 audit evidence ledger contains all item-level measurements, key sequences, block fits, sample IDs, review coverage, clinical findings, quantitative checks, and source references.

7. TOP FIXES

Quarantine the high-priority clinical items before further use. Prioritize T1Q12, T3Q120, T9Q141, T10Q138, T10Q136, and T1Q16. Preserve affected attempt records and issue item-specific corrections where appropriate.

Separate MH susceptibility, preoperative preparation, and actual crisis/recovery management. T9Q141/T10Q138 must not require students to invent an event or learn a treatment-delaying workflow.

Correct the threshold and answer–rationale conflicts. Fix T1Q12’s percentage criterion and T3Q120’s sprinkler minimum; reconcile them with the correct information already present in T9Q108.

Update evidence-sensitive treatment explanations. Address T10Q136, T6Q136, and T7Q130, retaining appropriate best answers where the defect lies in the rationale rather than the letter.

Eliminate cyclic key placement throughout all ten forms. Regression tests must include T9Q23–Q141, T7Q35–Q102, and T5Q24–Q86. Derive keys from final option order, not a repeated sequence.

Rewrite the longest-answer construction pattern. Begin with T9Q19/T9Q23, then review every test. Use comparably specific, clinically plausible alternatives; option shuffling or padding alone is insufficient.

Correct remaining terminology, scope, and currency defects. Repair T1Q66, T1Q70, T8Q122, and T8Q150. Resolve T7Q118’s engineering assumptions without turning its qualified option into an unsupported blanket rule.

Preserve current domain weights but build task-level coverage. Reduce repetitions such as T1Q4/T1Q96 and T1Q123/T1Q125 to create space for broader emergency and applied decision-making coverage.

Make assessment modes and claims accurate. Label T1–T10 as 150-item practice forms unless rebuilt for the official format. Do not use cue-inflated raw scores as evidence of CNOR readiness.

Require a clinical-source and live-delivery release gate. For items such as T1Q12, T6Q136, T8Q122, and T10Q136, record the governing source, edition/date, context, and reviewer. Validate both exported and delivered key behavior, then obtain independent perioperative clinical review before restoring readiness claims.

8. SUMMARY ROW

| B26 — CNOR Exam Prep | 3.0/10 | 10 key/stem corrections or qualifications; review not exhaustive | 11 rationale corrections or qualifications; 12 distinct items overall | PULL | Clinical safety defects plus 82.80% uniquely-longest cue; T9 CDAB 79.33%, with 119 consecutive cyclic keys. |