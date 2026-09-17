# B27 — CMSRN Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/cmsrn.json` — 450 questions / 3 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

3.0/10 — PULL. Your longest-option measurement is confirmed.

The keyed answer is the single longest option in 322/450 items — 71.56%, measured by whitespace-normalized character count, excluding option labels.

The most urgent clinical defects are T1Q133 and T2Q141: both teach continuing insulin during DKA despite potassium below the current treatment threshold. T3Q96 gives the opposite, appropriate instruction, creating a direct safety contradiction within the bank. 

cmsrn +1

There is also a widespread explanation-integrity failure: 201/450 explanations — 44.67% — attach their reasoning to the wrong option letters. Some explicitly identify an unsafe distractor as correct or describe the actual correct choice as wrong. This is distinct from a wrong KEY: field.

Assessment area	Score
Answer-key correctness and clinical qualification	8.0/10 — provisional
Explanation accuracy and consistency	2.0/10
Item quality and distractors	2.0/10
Current CMSRN blueprint alignment	7.0/10 — aggregate weighting matches; task coverage incomplete
Structural hygiene and assessment integrity	3.0/10

Findings: ten key/stem corrections or qualifications, including the two unsafe DKA keys; 207 distinct explanations require correction or qualification. That explanation total comprises 201 option-letter mismatches plus 16 clinical-content findings, with ten overlapping. It does not mean 207 keyed clinical answers are wrong.

Coverage: I read all 450 complete items, 1,800 options, and 450 explanations, from T1Q1 through T3Q150, rather than sampling. The programmatic pass checked numbering, fields, 2,700 literal option-pair comparisons, duplication, lengths, domain counts, answer runs, and repeating templates. Explanation-reference candidates were compared against the displayed options across the complete bank. Clinical-source verification was targeted to high-risk and disputed claims; I did not independently source-check every clinical assertion. The live application and candidate-response statistics were not tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
Unsafe DKA instructions

T1Q133 — Continuing insulin at potassium 3.4 mEq/L is not the appropriate current protocol instruction — no fully correct option.

Printed key B combines potassium replacement with continuing insulin. Under the 2024 international hyperglycemic-crisis consensus, insulin should be withheld when potassium is below 3.5 mmol/L, with potassium replacement until it exceeds that threshold. The falling glucose does not override the potassium safety requirement. 

cmsrn

 
Springer

Correct conclusion: hold insulin because of hypokalemia and coordinate potassium correction. Existing A gives the wrong reason—falling glucose—so merely changing B to A would leave a defective question.

T2Q141 — Continuing insulin at potassium 3.2 mEq/L creates the same safety problem — no fully correct option.

Printed key D expressly continues insulin while adding potassium. Its explanation reinforces that instruction. Existing C stops insulin because glucose supposedly “normalized,” which is not the appropriate rationale. 

cmsrn

Correct conclusion: withhold insulin pending potassium correction, not because glucose is 250 mg/dL. T3Q96, key A, already teaches this distinction correctly for potassium 3.2 mEq/L. 

cmsrn

 
Springer

Other clinical premises and answer choices requiring qualification

T1Q4 — DNR is treated as establishing comfort-only care or a prohibition on intubation — stem underqualified; do not automatically re-key.

The patient has acute hypoxemia, a DNR order, and an unspecified advance directive. Key D’s supportive comfort measures are reasonable, but neither the stem nor the unspecified directive establishes that treatment of respiratory failure is limited to comfort care. The explanation assumes that limitation. 

cmsrn

Correct conclusion: distinguish DNR, DNI, and broader treatment preferences. A DNR order alone does not determine whether other life-sustaining treatments are wanted. None of the alternatives supplies a complete assessment-and-clarification response; A also bundles rapid response with a code protocol. 
AMA Code of Medical Ethics

T2Q148 — A higher-rate potassium prescription is accepted without the necessary administration context — D is necessary but insufficient.

The stem prescribes 20 mEq in 100 mL over one hour:

Rate=20 mEq/hour,Concentration=200 mEq/L.

Key D checks urine output and dilution but omits the access, infusion-pump, monitoring, and unit-protocol assumptions needed to judge this prescription. 

cmsrn

Manufacturer labeling gives a usual rate not exceeding 10 mEq/hour when serum potassium is above 2.5 mEq/L. Higher-rate replacement can be appropriate under defined monitored protocols; 20 mEq/hour is not universally prohibited, but its suitability cannot be established from this stem. 
DailyMed

T2Q146 — Automatic metformin withholding before contrast is asserted without renal-function or protocol information — C is underqualified.

The only supplied reason to hold metformin is a contrast-enhanced CT in two hours. No acute kidney injury, estimated glomerular filtration rate, or governing protocol is provided. 

cmsrn

The ACR manual does not require withholding metformin for intravenous iodinated contrast when there is no acute kidney injury and eGFR is at least 30. Other labeling or protocols can be more restrictive. Correct conclusion: provide the relevant risk factors and protocol before treating C as universally necessary. 
Sitecore

T2Q81 — Alcohol hand rub after C. difficile care is automatically classified as an error — A is not universally defensible.

The item lacks an outbreak, visibly soiled hands, or an explicit facility handwashing requirement. Its rationale treats lack of sporicidal activity as establishing a universal clinical prohibition. 

cmsrn

CDC guidance still permits—and generally prefers—alcohol-based hand sanitizer for routine care when hands are not visibly soiled, including CDI care; it encourages soap and water as an additional precaution during outbreaks. Correct conclusion: specify the context before keying A as requiring intervention. This is not a finding that soap and water are inappropriate. 
CDC

T2Q11 — A and B cannot be reliably distinguished as incorrect versus correct without that same context.

Key B, handwashing, is acceptable. However, A, alcohol hand rub after removing PPE, cannot categorically be excluded under CDC’s routine-care guidance. Correct conclusion: establish the outbreak, soiling, or policy condition that makes B uniquely intended. 

cmsrn

 
CDC

T1Q127 — The same hand-hygiene ambiguity appears again — retain B’s appropriate contact precautions, but qualify the exclusion of A.

B combines contact precautions with handwashing; A describes alcohol hand hygiene. The question asks which measure is correct, not which is the most complete bundle, and supplies no condition that categorically invalidates A. 

cmsrn

 
CDC

T3Q114 — A critically high aPTT is treated as sufficient indication for protamine — C is the correct antidote, but administration is not established.

The patient has an aPTT of 120 seconds; no active bleeding or other urgent-reversal indication is stated. The explanation nonetheless anticipates protamine on the basis of bleeding risk alone. 

cmsrn

Correct conclusion: distinguish holding or adjusting heparin and assessing bleeding from urgent reversal. ASH guidance reserves aggressive reversal for serious circumstances such as life-threatening bleeding. The question needs the clinical indication that makes protamine administration appropriate. 
American Society of Hematology

T3Q135 — “Never abruptly discontinue” TPN is an excessive absolute — D needs qualification, not substitution with A–C.

Glucose monitoring is appropriate. The attached claim that tapering is always required is too broad. 

cmsrn

A randomized study found no symptomatic hypoglycemia after abrupt discontinuation in selected adults with established enteral feeding. That does not justify indiscriminate interruption in every patient, but it disproves a universal mandatory-taper rule. Correct conclusion: account for insulin exposure, nutrition, hypoglycemia risk, and the prescribed transition plan. 
Sage Journals

3. EXPLANATION ERRORS
A. Systemic option-letter mismatch: 201 explanations

The rationale often describes the intended clinical action correctly but assigns it to an outdated letter.

Item	Actual key and displayed answer	Contradictory explanation
T1Q5	B: SBAR recommendation requesting evaluation and proposed actions	Says D supplies the recommendation and that only D is correct.
T1Q6	A: verify potassium dilution and pump use	Labels the lethal IV-push choice A, although it is D.
T1Q26	A: protamine	Calls A vitamin K; the displayed vitamin K choice is D.
T2Q49	B: honor the patient’s wishes and document the care plan	Begins “A is correct” and then says B is wrong.
T3Q18	C: promptly communicate potassium 6.8 mEq/L	Concludes that B is correct; displayed B delays action until the next routine morning draw.
T3Q148	A: stop family activation of PCA	Says A is wrong, while describing a different option that condones proxy dosing.

These are direct contradictions in the supplied text. 

cmsrn +3

Do not repair these by changing otherwise correct keys to match the old explanation letters. The observed pattern is consistent with options being reordered without remapping rationale references; the export does not prove the implementation that caused it.

Complete affected IDs:

Test 1 — 62: T1Q3, T1Q4, T1Q5, T1Q6, T1Q8, T1Q9, T1Q11, T1Q16, T1Q21, T1Q24, T1Q26, T1Q28, T1Q31, T1Q33, T1Q36, T1Q38, T1Q39, T1Q41, T1Q43, T1Q44, T1Q46, T1Q48, T1Q49, T1Q58, T1Q59, T1Q61, T1Q63, T1Q64, T1Q68, T1Q69, T1Q73, T1Q74, T1Q76, T1Q78, T1Q79, T1Q81, T1Q83, T1Q84, T1Q86, T1Q88, T1Q89, T1Q90, T1Q91, T1Q93, T1Q94, T1Q96, T1Q98, T1Q99, T1Q101, T1Q104, T1Q108, T1Q109, T1Q111, T1Q113, T1Q114, T1Q117, T1Q119, T1Q120, T1Q122, T1Q123, T1Q125, T1Q129.

Test 2 — 83: T2Q1, T2Q5, T2Q6, T2Q9, T2Q10, T2Q13, T2Q14, T2Q15, T2Q18, T2Q19, T2Q20, T2Q21, T2Q23, T2Q24, T2Q25, T2Q26, T2Q29, T2Q30, T2Q31, T2Q34, T2Q38, T2Q39, T2Q40, T2Q43, T2Q44, T2Q45, T2Q46, T2Q48, T2Q49, T2Q50, T2Q51, T2Q53, T2Q54, T2Q55, T2Q61, T2Q63, T2Q65, T2Q66, T2Q68, T2Q69, T2Q73, T2Q74, T2Q76, T2Q78, T2Q79, T2Q81, T2Q83, T2Q84, T2Q85, T2Q86, T2Q88, T2Q90, T2Q93, T2Q94, T2Q95, T2Q96, T2Q98, T2Q99, T2Q100, T2Q101, T2Q103, T2Q104, T2Q105, T2Q108, T2Q109, T2Q110, T2Q111, T2Q120, T2Q123, T2Q125, T2Q127, T2Q129, T2Q131, T2Q135, T2Q136, T2Q137, T2Q138, T2Q140, T2Q141, T2Q142, T2Q143, T2Q144, T2Q146.

Test 3 — 56: T3Q8, T3Q9, T3Q10, T3Q13, T3Q14, T3Q18, T3Q19, T3Q24, T3Q34, T3Q39, T3Q44, T3Q49, T3Q53, T3Q58, T3Q63, T3Q64, T3Q68, T3Q69, T3Q73, T3Q78, T3Q79, T3Q83, T3Q89, T3Q93, T3Q94, T3Q95, T3Q98, T3Q99, T3Q100, T3Q104, T3Q105, T3Q108, T3Q109, T3Q110, T3Q114, T3Q116, T3Q117, T3Q122, T3Q123, T3Q125, T3Q129, T3Q130, T3Q132, T3Q133, T3Q134, T3Q135, T3Q136, T3Q137, T3Q138, T3Q139, T3Q140, T3Q141, T3Q144, T3Q148, T3Q149, T3Q150.

B. Clinical content requiring correction or qualification: 16 explanations
Affected items	Clinical-content issue
T1Q133, T2Q141	Reinforce continuing insulin despite clinically important hypokalemia.
T1Q4, T3Q89	Overextend DNR into restrictions on other treatment without establishing the patient’s wishes.
T2Q146	Presents contrast-related metformin withholding as universal.
T2Q148	Does not resolve the higher-rate potassium prescription’s access and monitoring requirements.
T1Q21, T1Q127, T2Q11, T2Q81, T2Q150	Present soap-and-water-only CDI care as universal rather than identifying the governing circumstances.
T3Q114	Conflates identifying the heparin antidote with establishing a reversal indication.
T3Q135	States that TPN tapering is universally required.
T2Q61, T2Q127	Teach paper-bag rebreathing as treatment for hyperventilation-related respiratory alkalosis.
T3Q131	Generalizes a half-to-two-thirds dose as typical for long-acting basal insulin without identifying the product or protocol.

The first thirteen entries follow the issues above. T3Q89’s comfort-measure key C remains the best supplied response, but its explanation wrongly treats intubation or other aggressive treatment as necessarily violating DNR. 

cmsrn

 
AMA Code of Medical Ethics

For T2Q61/T2Q127, the intended hypocalcemia response remains appropriate. The secondary teaching about paper bags is not: ANZCOR strongly advises against rebreathing techniques because they can produce dangerously low oxygen levels. 

cmsrn

 
Your Site Name

For T3Q131, key C’s request to clarify perioperative orders is appropriate. The rationale needs product-specific guidance; published glargine guidance commonly uses 80%, with individualized exceptions, rather than a universal half-to-two-thirds dose. 

cmsrn

 
UKCPA Perioperative Handbook

Count reconciliation: 201 letter-reference defects + 16 clinical-content findings − ten overlaps = 207 distinct affected explanations.

4. ITEM QUALITY
A. The longest-answer cue reflects how the choices are written

The keyed choice often combines the complete assessment, communication, safety, and documentation response; distractors offer a single inadequate or obviously inappropriate action.

Item	Correct option length	Other lengths	Observable weakness
T1Q22 — B	164 characters	92, 93, 92	The correct change-management response is substantially more developed.
T1Q43 — A	96	70, 39, 59	Essential transfer information competes with staff names, visitor policy, and meal preferences.
T3Q18 — C	78	55, 70, 63	Correct communication competes with ignoring severe hyperkalemia, delaying it, or giving potassium.

The original options show these imbalances. 

cmsrn +1

Basic safety questions are appropriate. The problem is that repeated implausible alternatives allow learners to succeed without distinguishing among credible nursing decisions. Shuffling options does not remove this length-and-wording cue.

B. Repetition inflates apparent breadth

T1Q16 and T1Q18 ask essentially the same delegation decision: routine vital-sign collection on a stable patient versus tasks requiring nursing judgment. They occur two questions apart under different domain tags. T1Q35 returns to the same broad boundary through care planning. 

cmsrn +1

T1Q24 and T1Q54 both test choosing teach-back rather than passive information delivery. They are not identical tasks, but represent closely related coverage rather than two wholly independent competencies. 

cmsrn +1

The complete stem scan found 63 items mentioning UAP, LPN, or LVN—14% of the bank. This is a reproducible keyword count, not a claim that all 63 are duplicates or an official maximum for delegation content.

C. Contradictory repeated teaching is more serious than redundancy

T1Q133/T2Q141/T3Q96 do not simply repeat DKA. They teach incompatible actions for low potassium. Likewise, T2Q49 correctly explains that DNR does not withdraw other treatment, while T1Q4/T3Q89 overextend that order. These require cross-bank consistency checks, not just isolated proofreading. 

cmsrn +2

D. Longer explanations are not necessarily more useful

B27 supplies substantially developed rationales, but T1Q6, T3Q18, and T3Q148 show how detailed explanations can amplify rather than resolve confusion when their references are wrong. The repair must preserve the distinction between the option’s clinical content and its displayed letter.

No item was found to require an unavailable figure. There are no visual stimuli, but that is a representation-variety limitation—not a confirmed broken-image defect.

5. BLUEPRINT COVERAGE

Reference: the currently published 2023 CMSRN Exam Blueprint, effective May 15, 2023, contained in the MSNCB CMSRN Certification Handbook, last updated July 2025. 
MSNBC

Official domain	Published weight	Scored items	B27 items	B27 share
Patient/Care Management	32%	40	144	32.00%
Holistic Patient Care	15%	19	66	14.67%
Elements of Interprofessional Care	17%	21	78	17.33%
Professional Concepts	15%	19	66	14.67%
Nursing Teamwork and Collaboration	21%	26	96	21.33%

Official allocations come from the handbook; B27’s counts were independently reproduced. Each test has 48 pcm, 22 hol, 26 inter, 22 prof, and 32 team items. The small differences from published percentages are rounding effects, not material weighting defects. 
MSNBC
 

cmsrn

There is no material aggregate domain-weighting mismatch. This should not be assessed against an obsolete body-system percentage distribution.

Task-level coverage is less convincing

Across T1Q1–T3Q150, the complete review and stem searches did not establish explicit coverage of several published competencies: research-process application, budget/fiscal stewardship, postmortem care, organ-donation processes, death-reporting requirements, human trafficking, and FMEA. These are task-level gaps, not invented disease quotas. 
MSNBC

Repeated delegation examples such as T1Q16/T1Q18/T1Q35, and repeated teach-back selections such as T1Q24/T1Q54, illustrate where additional questions are not necessarily expanding competency coverage. The bank needs item-to-task mapping, not merely the existing five domain labels. 

cmsrn

Professional, communication, cultural-care, and disaster questions are not automatically off-scope. For example, T1Q12’s START scenario and T1Q42’s incident-command question should not be rejected merely because they are not disease-specific. 

cmsrn +1

Test length matches; scoring fidelity is unverified

The exam has 150 questions: 125 scored and 25 unscored, with three hours available. B27 therefore has the correct delivered question count per test. The export does not identify a scored/unscored allocation or establish live timing and score conversion. 
MSNBC

A raw percentage from these forms—especially one inflated by the length cue—must not be presented as a validated CMSRN readiness prediction.

6. STRUCTURAL CHECK
Section A verification
Check	Independent result
Questions / tests	450 / 3, confirmed
Questions per test	150 throughout
IDs and numbering	Unique; complete in every test
Options	Four throughout
Missing options / invalid key labels	0 / 0
Exact whitespace-normalized duplicate stems	0
Literal duplicate option pairs	0 across 2,700 comparisons
Missing explanations / explanations under 40 characters	0 / 0
Explanation length	283 minimum; 521.5 median; 873 maximum characters
Exact duplicate explanations	0
Same-letter runs of at least four	9, matching Section A
Images / confirmed missing required image files	0 / 0

Section A’s reported basic checks reproduce. They do not detect the 201 rationale-letter mismatches or distinguish a complete, clinically safe answer from an inadequately qualified one. 

cmsrn

Longest-option cue: confirmed

Lengths are source characters after whitespace normalization, excluding labels, not rendered pixel width.

Measurement	Result
Key is strictly longest	322/450 — 71.56%
Key is tied for or uniquely longest	334/450 — 74.22%
Questions with one uniquely longest option	433
Key is that option, among those 433	322/433 — 74.36%
Questions tied for maximum length	17
All four choices equal in length	1
Key is strictly longest by word count	247/450 — 54.89%

Choosing the longest option and randomly selecting among tied longest options would produce an expected 327.58/450—72.80% against the printed keys, without using clinical knowledge.

The tie-inclusive uniform-key baseline is 26.11%, so ties do not explain away the observed 74.22% result.

Per-test lengths and cycles

The cycle search checked all 24 four-letter permutations, exact whole-test periods 1–75, and nonconstant local periods 2–6 extending for at least 12 items and three repetitions.

No exact repeating key cycle was detected in any test under those checks. The best-fit column below is a selected post-hoc fit, not a detected cycle.

Test	Strictly longest key	Including ties	Best four-letter fit	Maximum same-letter run
T1	112/150 — 74.67%	115	BACD: 57/150 — 38.00%	4
T2	104/150 — 69.33%	106	CDAB: 45/150 — 30.00%	4
T3	106/150 — 70.67%	113	CBDA: 49/150 — 32.67%	5

The nine same-letter runs are:

T1: T1Q53–T1Q56 B×4; T1Q79–T1Q82 D×4; T1Q88–T1Q91 A×4; T1Q121–T1Q124 A×4.

T2: T2Q35–T2Q38 B×4; T2Q112–T2Q115 C×4.

T3: T3Q2–T3Q6 B×5; T3Q31–T3Q34 C×4; T3Q71–T3Q74 B×4.

Section A records their ending items correctly. These natural runs are not release blockers, and there is no basis here for forcing alternation.

The overall distribution is A114/B114/C111/D111; every test has A38/B38/C37/D37. That is tightly balanced, but balance alone neither proves randomization nor establishes a cycle. 

cmsrn

Runtime limitation: actual shuffling could change positional statistics. It would not remove the longest-answer cue, and any option shuffling must also preserve correct explanation references.

The 
B27 audit evidence ledger contains all item-level measurements, the complete 201-item reference-error list, clinical findings, numerical checks, domain allocations, key sequences, and review limitations.

7. TOP FIXES

Quarantine T1Q133 and T2Q141 immediately. Correct the low-potassium DKA instructions and reconcile them with T3Q96. Do not re-key to an option that stops insulin for the wrong reason.

Repair all 201 explanation-letter mismatches at the source. Prioritize T1Q6, T1Q26, T3Q18, and T3Q148. Associate rationales with stable option identifiers, then render the final letters; do not rely on editing scattered letter strings.

Separate DNR from DNI and comfort-only care. Correct T1Q4/T3Q89 and preserve the distinction already articulated in T2Q49. State the actual treatment preferences rather than assuming them.

Resolve medication-administration premises. Supply the missing monitoring/access context in T2Q148, renal/protocol context in T2Q146, and urgent-reversal indication in T3Q114.

Remove unsafe or excessive secondary teaching. Correct paper-bag statements in T2Q61/T2Q127, the universal TPN-taper claim in T3Q135, and the basal-insulin dose generalization in T3Q131.

Make CDI questions source- and setting-specific. Review T1Q21, T1Q127, T2Q11, T2Q81, and T2Q150 together. Distinguish appropriate handwashing from an unsupported claim that alcohol hand hygiene is always an error.

Rewrite the longest-answer construction pattern. Begin with T1Q22/T1Q43/T3Q18, then inspect every form. Use comparably specific, clinically plausible alternatives rather than merely padding distractors.

Deduplicate and expand task coverage. Reduce repeated decisions such as T1Q16/T1Q18/T1Q35 and T1Q24/T1Q54 to make space for the missing published competencies.

Validate assessment-mode claims. Preserve the correct 150-question length for T1–T3, but verify timing, scoring treatment, delivered option order, and explanation consistency. Withdraw unsupported readiness predictions.

Require a clinical and technical release gate. Use T1Q133, T2Q141, T3Q18, T3Q148, and T2Q146 as regression cases, with source dates and independent medical-surgical nursing review before restoring the bank.

8. SUMMARY ROW

| B27 — CMSRN Exam Prep | 3.0/10 | 2 unsafe DKA keys + 8 key/stem qualifications | 207 affected: 201 letter mismatches plus 16 overlapping clinical findings | PULL | 71.56% uniquely-longest cue; systemic rationale-letter corruption and unsafe low-potassium DKA instructions; no detected repeating key cycle. |