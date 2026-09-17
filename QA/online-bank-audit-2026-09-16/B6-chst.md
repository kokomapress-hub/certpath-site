# B6 — CHST Exam Study Guide — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/chst.json` — 180 questions / 3 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 7.8/10 — SHIP WITH FIXES

Coverage audited: 180/180 questions, all 180 keys and explanations, all three tests, and the complete Section A structural report. No sampling. The bank contains the claimed 180 questions across three tests. 

chst

Audit dimension	Score
Answer-key correctness	8.3/10
Explanation accuracy	7.8/10
Item quality / distractors	6.5/10
CHST5 blueprint alignment	8.7/10
Structural hygiene	9.5/10

This bank is structurally far stronger than B4/B5. The answer keys are exactly balanced at 45 A / 45 B / 45 C / 45 D, with no long same-answer runs, exact duplicate stems, missing explanations, or invalid keys. 

chst

The numerical blueprint allocation is also exceptionally close to current CHST5. The main remaining risks are six wrong/ambiguous items, several inaccurate regulatory explanations, excessive regulation-number/threshold recall, and notable gaps inside otherwise correctly weighted domains.

Release decision: SHIP WITH FIXES.

2. WRONG OR AMBIGUOUS KEYS

6 items.

T2Q12 — A is not universally correct as written — no correct choice. The bank says GFCIs are required for all 120-V, single-phase, 15/20-A temporary receptacles. 

chst

 OSHA 1926.404(b)(1) permits an employer to protect construction workers using either GFCIs or an assured equipment grounding conductor program (AEGCP). A becomes correct only if the stem specifies that the employer is using the GFCI option. 
OSHA
+1

T3Q9 — keyed A is wrong — correct key C. The bank calls horizontal arm + thumb down the signal for “Lower the Load.” 

chst

 OSHA's standard signal chart says LOWER = arm/index finger pointing downward while making small circles; horizontal arm/thumb down means LOWER BOOM. 
OSHA

T3Q14 — insufficient information to classify the manhole as permit-required — no unique correct key. The basic manhole description establishes a confined space, but a permit-required confined space additionally must contain or potentially contain a hazardous atmosphere, engulfment hazard, trapping/asphyxiation configuration, or another serious hazard. The stem establishes none of these. 

chst

 
OSHA

T3Q24 — hospital transport does not establish a 24-hour OSHA reporting requirement — no correct key as written. The stem says only that the worker was “transported to the hospital,” then keys 24 hours as an inpatient hospitalization. 

chst

 OSHA defines reportable inpatient hospitalization as formal admission to inpatient service for care or treatment; ER transport, an overnight stay, observation, or diagnostics alone does not establish reportability. 
OSHA
+1

T3Q40 — keyed A overstates 1926.417 — no correct choice as written. The item says OSHA 1926.417 requires de-energizing, locking and tagging, and zero-energy verification. 

chst

 OSHA actually requires deactivated controls to be tagged and de-energized equipment/circuits to be rendered inoperative and tagged. OSHA has explicitly stated that 1926.417 does not require a lock; other means of rendering equipment inoperative are permitted. 
OSHA
+1

T3Q52 — D is a valid route but not the only OSHA-compliant route — no unique correct key. The bank says Subpart CC requires certification by an accredited crane-operator testing organization. 

chst

 Current 1926.1427 also recognizes qualifying state/local licensing, audited employer programs, and U.S. military qualifications in applicable circumstances. 
OSHA
+1

3. EXPLANATION ERRORS

9 substantive explanation defects.

T1Q7 — key D is correct, but 1.5H:1V is approximately 34° from horizontal, not 53°. The 53° figure corresponds roughly to the steeper Type A ¾H:1V slope. 

chst

T1Q36 — key D is reasonable, but the explanation adds that the construction PPE assessment “must be documented and certified.” Current 1926.95 does not contain the general-industry-style written hazard-assessment certification requirement; its current provisions address when PPE is necessary, fit, selection and payment. 

chst

 
OSHA

T1Q39 — the explanation says both OSHA 1926.352 and NFPA 51B require at least a 30-minute post-work fire watch. OSHA instead requires a fire watch for a “sufficient period”, with no universal 30-minute minimum. 

chst

 
OSHA
 NFPA 51B also moved away from treating 30 minutes as the universal baseline; its committee established a one-hour baseline, with circumstances permitting reduction. 
NFPA Document Information
+1

T2Q12 — the explanation cites 1926.405(a)(2)(ii); the applicable ground-fault provision is 1926.404(b)(1)(ii), and it omits the AEGCP alternative. 

chst

T3Q9 — explanation teaches the wrong crane signal, confusing “Lower” with “Lower Boom.” 

chst

T3Q14 — explanation incorrectly treats the three basic confined-space criteria plus a statement that the space “may” have hazards as sufficient to establish permit-required status. 

chst

T3Q40 — explanation attributes mandatory locking and zero-energy verification to 1926.417 when that construction provision does not prescribe lockout in those terms. 
OSHA
+1

T3Q52 — explanation incorrectly presents accredited third-party certification as the sole 1926.1427 certification route. 

chst

T3Q56 — key B is essentially correct, but the explanation cites 1926.32(f), which defines competent person. “Designated person” is 1926.32(i) and means “authorized person” as defined in paragraph (d). 

chst

 
OSHA

4. ITEM QUALITY

T1Q15 — internal regulatory contradiction. The stem says the egress requirement starts when a trench is 5 feet deep or more, while its own explanation correctly says OSHA's threshold is 4 feet or deeper. The requested 25-foot travel-distance answer remains correct, but the stem teaches the wrong trigger depth. T1Q15 should be corrected.

T2Q5 — unstable “most common” statistic. Asking which crane fatality type is “MOST common” without defining a data period/source makes the answer time-sensitive. T2Q5 should test a stable hazard principle rather than an historical ranking.

T1Q50/T1Q52 — over-specific attribution to 1926.21. OSHA 1926.21(b)(2) requires instruction in recognition and avoidance of unsafe conditions, but it does not itself state the bank's exact universal formulation of “before initial assignment and as needed.” 
OSHA

T2Q57 — worker refusal rights are oversimplified. The answer—investigate the concern and assess the hazard—is good field practice, but the explanation implies any worker who perceives imminent danger has an unconditional OSHA right to refuse. OSHA protection depends on several conditions, including a good-faith and reasonable belief of death/serious injury, insufficient time for normal enforcement, and ordinarily asking the employer to correct the condition. 
OSHA

There is also too much low-level regulation-number and numeric-threshold recall for a professional CHST simulator. Examples include T1Q1, T1Q7–T1Q10, T1Q13–T1Q17, T1Q19, T1Q22–T1Q23, T1Q31, T1Q37, T1Q40–T1Q44; T2Q1, T2Q3–T2Q8, T2Q10, T2Q12–T2Q13, T2Q17, T2Q20, T2Q23, T2Q30, T2Q33, T2Q36–T2Q41; T3Q2–T3Q6, T3Q10, T3Q13, T3Q16, T3Q18, T3Q20–T3Q21, T3Q28, T3Q31, T3Q38, T3Q42–T3Q47. These are useful facts, but CSP/CHST-style preparation should force more application to realistic construction situations.

Distractor quality is frequently weak. T2Q34 offers “repaint the crane to remove damage evidence”; T3Q36 offers company picnics and free parking; T3Q59 uses a payroll schedule. These make the correct answer obvious without requiring CHST competence.

Exact stem duplication is zero, but there is substantial concept recycling:

T1Q35/T1Q38/T2Q35/T2Q38/T3Q35 — multi-employer categories.

T1Q23/T1Q26/T2Q23/T2Q30/T3Q24 — OSHA reporting timeframes.

T1Q18/T1Q53/T1Q59/T2Q43/T2Q46/T2Q49/T3Q4/T3Q6/T3Q56 — competent/qualified/designated-person definitions.

T1Q37/T1Q48/T1Q50/T1Q52/T2Q48/T2Q52/T2Q55–T2Q60/T3Q49–T3Q60 — training, communication and leadership.

5. BLUEPRINT COVERAGE

Official blueprint: BCSP CHST5 Examination Blueprint, V.2022.04.12, implemented for all candidates on August 1, 2024. BCSP's 2026 changes index lists an STS exam update but no later CHST revision, and BCSP's current CHST page continues to link the CHST blueprint. 
BCSP
+2
BCSP
+2

The four current domains are:

CHST5 domain	Official weight	Expected /180	Bank	Bank weight
1. Hazard and Risk Identification and Control	36.6%	~66	66	36.7%
2. Emergency Preparedness, Incident Investigation, and Response	19.9%	~36	36	20.0%
3. Safety Program Development, Implementation, and Sustainment	22.5%	~41	39	21.7%
4. Leadership, Communication, and Training	21.0%	~38	39	21.7%

The bank appears intentionally organized as Q1–22 / Q23–34 / Q35–47 / Q48–60 in each test, producing almost exact CHST5 weighting. Official BCSP weights confirm 36.6%, 19.9%, 22.5%, and 21.0%. 
BCSP
+2
BCSP
+2

Domain 1 — weight excellent; breadth needs expansion. Falls, excavations, scaffolds, cranes, confined spaces, silica/lead and electrical hazards are very heavily represented. Underrepresented official CHST5 knowledge includes material handling/storage, housekeeping, powder-actuated tools, broader hand/power-tool hazards, radiation, extreme climates, safety-through-design, simultaneous trades, biological hazards, ergonomics, and monitoring/testing instruments. 
BCSP

Domain 2 — weight excellent; too investigation-heavy. T1Q23–T1Q34, T2Q23–T2Q34, T3Q23–T3Q34 provide good incident-investigation coverage, but BCSP also explicitly expects ICS, crisis management, environmental-contamination response plans, emergency-response equipment, universal precautions, exercises/drills, emergency coordination, and resumption of operations. These are thin or absent. 
BCSP

Domain 3 — close weight; excessive compliance trivia. T1Q35–T1Q47, T2Q35–T2Q47, T3Q35–T3Q47 cover standards, multi-employer responsibilities, records, plans and inspections well. Less visible are manufacturer manuals/directives, basic risk-management concepts, trend analysis, and evaluation of construction means and methods, all specifically named in CHST5. 
BCSP

Domain 4 — close weight and broadly useful, but incomplete. Training, toolbox talks, multilingual communication, worker participation and leadership receive substantial treatment in T1Q48–T1Q60, T2Q48–T2Q60, T3Q48–T3Q60. Missing or thin objectives include confidentiality requirements, when to consult manufacturers/suppliers/SMEs, Total Worker Health, document management, and broader leading risk-management strategies. 
BCSP

Bottom line: numerical blueprint alignment is excellent; the next improvement should be within-domain breadth, not changing the four domain percentages.

6. STRUCTURAL CHECK

Section A is accurate:

180/180 questions; 3/3 tests

Four options on every item

No invalid answer keys

No exact duplicate stems or choice sets

No missing explanations

No very short explanations

No ≥4 identical-answer runs

Exactly 45 A / 45 B / 45 C / 45 D overall. 

chst

I independently recomputed the distribution. It is also exactly balanced within each individual 60-question test: 15 A, 15 B, 15 C, 15 D. The longest same-answer run is only two questions.

That is excellent for avoiding the severe exploitable key bias seen in earlier banks. It is somewhat too perfectly engineered—exactly 15 of each letter in every test is not necessary—but it does not create the commercial problem that a strong B/C bias does.

The main structural weakness is no domain/task metadata at all (topTags: {}). 

chst

 Given how well this bank was evidently constructed around CHST5, explicit domain and blueprint-objective tags should be added so future edits cannot silently distort the balance.

7. TOP FIXES

T3Q9 — fix immediately: key C, not A; correct the “Lower” versus “Lower Boom” signal.

T3Q40 — replace/rewrite: 1926.417 does not mandate the lockout formulation currently keyed.

T2Q12 — rewrite to acknowledge GFCI versus AEGCP: A is correct only when the GFCI option is being used.

T3Q24 — add “formally admitted as an inpatient for treatment” before testing the 24-hour reporting rule.

T3Q14 — supply a specific permit-space hazard before classifying the manhole as permit-required.

T3Q52 — rewrite around one specific operator-certification route rather than implying accredited third-party certification is OSHA's only route.

T1Q7/T1Q15/T1Q36/T1Q39/T2Q12/T3Q56 — correct the embedded regulatory inaccuracies and citation errors.

All three Domain 1 blocks — diversify away from repeated fall/scaffold/excavation recall into material handling, tools, housekeeping, PtD, simultaneous trades, ergonomics, biological/radiation/extreme-climate hazards and monitoring instruments.

All three Domain 2 blocks — add ICS/crisis management, emergency drills, environmental releases, universal precautions and recovery/resumption scenarios while reducing repetitive reporting/investigation items.

All 180 items — add CHST5 domain + objective tags and raise scenario complexity. Keep the excellent 66/36/39/39 domain distribution, but replace a portion of citation/threshold memorization and giveaway distractors with field-judgment scenarios.

8. SUMMARY ROW

| CHST Exam Study Guide (B6) | 7.8/10 | 6 | 9 | SHIP WITH FIXES | Excellent CHST5 domain weighting and answer-key hygiene, but six wrong/ambiguous items and several current OSHA/NFPA accuracy issues need correction before the live bank is considered clean. |