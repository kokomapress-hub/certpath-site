# B5 — CSP Exam Study Guide — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/csp.json` — 180 questions / 3 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Score: 4.7/10 — PULL

Coverage audited: 180/180 questions, all keys and explanations, all three 60-question tests, and the complete structural report. No sampling. The bank itself confirms 180/180 items are present. 

csp

Audit dimension	Score
Answer-key correctness	7.5/10
Explanation accuracy	7.0/10
Item quality / distractors	5.0/10
CSP11 blueprint alignment	3.0/10
Structural hygiene	1.0/10

The largest problem is not the raw number of incorrect keys. It is that this does not function as a balanced CSP11 practice bank. The current official CSP11 blueprint is 25% Advanced Application of Safety Principles, 25% Program Management, 15% Risk Management, 9% Emergency Management, 6% Environmental Management, 10% Occupational Health and Applied Science, and 10% Training. 
BCSP
 BCSP's 2026 change index identifies an STS exam change but no CSP replacement, so CSP11 V.2024.04.24 remains the current published CSP blueprint in September 2026. 
BCSP

The bank is drastically overconcentrated in occupational health, emergency/fire, program-management trivia and regulation recall while Training is essentially absent and Advanced Safety Principles and Risk Management are badly underrepresented. Eleven questions are primarily ethics/tort/professional-practice material with no direct CSP11 objective.

Structural integrity is worse: the answer distribution is A 5.0%, B 59.4%, C 31.7%, D 3.9%. 91.1% of all answers are B or C, and Test 3 alone has 43 B answers out of 60. 

csp

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS

7 items.

T1Q24 — wrong key. Correct key: D (125%). The bank explicitly calculates 4/4+4/16=1.25 and then discards the 85 dBA component to force C. 

csp

 OSHA Appendix A explicitly gives reference durations of 4 hours at 95 dBA and 16 hours at 85 dBA and requires the fractions to be summed. The dose is therefore 100(4/4+4/16)=125%. 
osha.gov
+1

T1Q33 — no correct choice. The keyed answer says all three conventional fall-protection systems require a competent person to design and oversee installation. OSHA does not say that. Horizontal lifelines and certain PFAS anchorage arrangements require supervision by a qualified person; a fall-protection plan is prepared by a qualified person and its implementation supervised by a competent person. Standard guardrails and safety nets do not universally have the requirement stated in the question. Correct key: none as written. 

csp

 
OSHA
+1

T1Q38 — C and D are both defensible. In 2026 OSHA sets the same maximum penalty, $165,514 per violation, for both willful and repeated violations. The question asks which category has the highest monetary penalty and uniquely keys C. Correct key: C and D / rewrite. 

csp

 
OSHA
+1

T1Q58 — ambiguous ethical key. C may be appropriate when internal escalation can safely correct the problem, but the explanation invents an “internal channels first” requirement that is not stated in the current BCSP Code. BCSP instead requires certificants to hold safety and health paramount and advise employers, employees, the public and appropriate authorities of dangers and unacceptable risks. Because the stem says the employer is knowingly violating a rule that could cause serious injury but gives no immediacy/context, B and C cannot be cleanly distinguished. Correct key: context-dependent; rewrite. 

csp

 
BCSP

T2Q26 — scope makes C non-unique. The 10-foot rule at ≤50 kV cited by OSHA applies to unguarded energized overhead lines, not generically to every “exposed energized part.” The stem omits “overhead line” and conflates OSHA clearance rules with electrical approach-boundary terminology. Correct key: C only if rewritten to say unguarded overhead line at 50 kV or below. 

csp

 
OSHA

T3Q32 — key B confuses permission to perform energized work with the trigger for an energized electrical work permit. “De-energizing creates a greater hazard or is infeasible” provides justification for energized work; an EEWP requirement depends on the actual energized-work conditions/proximity, and some tasks such as testing and troubleshooting have permit exemptions. Correct key: none as written / rewrite. 

csp

 
NFPA Xchange
+1

T3Q34 — no correct choice. OSHA requires the annual/comprehensive crane inspection to be performed by a qualified person, not merely a “competent person.” B is therefore technically incorrect, while A/C/D are plainly false. Correct key: none; change B to “qualified person.” 

csp

 
OSHA
+1

3. EXPLANATION ERRORS

8 substantive explanation problems.

T1Q24 — explanation correctly reaches 125% and then incorrectly reverses itself to 100% by excluding 85 dBA. 

csp

T1Q33 — explanation incorrectly states that OSHA requires a competent person to design/oversee guardrails, PFAS and safety nets universally; the regulation distinguishes qualified and competent persons and applies those requirements much more narrowly. 

csp

T1Q38 — explanation says willful violations uniquely “carry the highest penalties”; in 2026 repeated violations have the same maximum. 

csp

T1Q58 — explanation falsely attributes an “internal channels first” rule to the BCSP Code of Ethics. BCSP's actual language includes advising appropriate authorities where danger/unacceptable risk exists. 

csp

T2Q25 — explanation says a mixture sum that “equals or exceeds 1.0” exceeds the limit. A sum of exactly 1.00 is at the combined limit, not above it. The answer B = 100% is fine; the interpretation sentence is not. 

csp

T2Q26 — explanation presents a 10-foot distance as a generic OSHA/NFPA rule for exposed energized parts; OSHA's cited 10-foot rule is specifically for unqualified persons near unguarded overhead lines ≤50 kV. 
OSHA

T3Q32 — explanation treats energized-work justification as equivalent to an EEWP requirement and omits permit exemptions.

T3Q34 — explanation repeatedly calls the required annual crane inspector a “competent person”; OSHA 1926.1412(f) says qualified person. 
OSHA

4. ITEM QUALITY

The bank is dominated by single-fact recall rather than the higher-order “apply/evaluate/analyze/determine” language that runs throughout CSP11.

T1Q26–T1Q52, T2Q26–T2Q52 and T3Q26–T3Q52 contain especially heavy OSHA/NFPA/regulatory/fire memorization. Items such as T1Q36, T1Q38, T1Q39, T1Q41, T1Q43, T1Q44, T1Q47; T2Q26, T2Q29, T2Q33, T2Q35–T2Q43; T3Q26, T3Q29, T3Q34, T3Q36–T3Q44 frequently ask for a number, citation category, agency, standard number or isolated requirement rather than professional judgment.

Several items have weak distractors that make the answer obvious without CSP-level knowledge: T1Q9, T1Q10, T1Q30, T1Q36, T1Q50; T2Q9, T2Q16, T2Q30, T2Q31, T2Q45, T2Q52; T3Q13, T3Q18, T3Q27, T3Q30, T3Q38, T3Q57–T3Q60. Typical distractors include obviously unsafe behavior, “ignore it,” “do nothing,” unrelated equipment functions, or absurd administrative choices.

T1Q17 relies on Heinrich's domino model and frames the “unsafe act/unsafe condition” domino as the practical prevention point. It is historically valid, but it is low-value relative to CSP11's stronger systems, PtD, risk-management and culture emphasis.

T1Q2 uses “severity rate” as though there is one universally standardized 200,000-hour formula. Unlike OSHA's defined recordable-incidence rates, “severity rate” conventions vary. The formula should be supplied in the stem if a calculation is desired.

T1Q8 similarly calls 200,000 hours the universal base for an “injury frequency rate.” It is specifically the OSHA incidence-rate base; other frequency-rate conventions exist. Rename it as an OSHA incidence-rate calculation.

T1Q31 is dated/incomplete for current NFPA 70E practice. Current NFPA materials describe two PPE-selection methods: incident-energy analysis or the arc-flash PPE category method. The item instead says PPE is determined by an “arc flash hazard analysis or incident energy calculation.” 
NFPA Document Information
+1

T2Q15 equates workers' compensation “no fault” with “strict liability.” That is loose legal terminology and is unnecessary for CSP11.

T3Q9, T3Q12 and T3Q16 are tort-law doctrine questions—elements of negligence, exclusive remedy, foreseeability—not direct CSP11 objectives.

T1Q58–T1Q60, T2Q58–T2Q60, T3Q59–T3Q60 devote eight questions to professional ethics/credential conduct despite ethics not being a named CSP11 domain or task. The topics are useful professionally, but they should not consume this much of a 180-question blueprint simulator.

5. BLUEPRINT COVERAGE

Official blueprint checked: BCSP CSP11 Examination Blueprint, V.2024.04.24, current published blueprint as of September 2026. 
BCSP

I assigned every question to its best-fit primary CSP11 domain. Some CSP questions naturally touch multiple objectives, so these counts are an audit classification rather than BCSP's own tagging.

CSP11 domain	Official	Expected in 180	Bank best-fit	Bank %	Finding
1. Advanced Application of Safety Principles	25%	45	22	12.2%	Severely underweighted
2. Program Management	25%	45	56	31.1%	Overweighted
3. Risk Management	15%	27	14	7.8%	About half required weight
4. Emergency Management	9%	~16	27	15.0%	Substantially overweighted
5. Environmental Management	6%	~11	10	Close	
6. Occupational Health & Applied Science	10%	18	38	More than double	
7. Training	10%	18	2	Essentially absent	
Outside/directly unmatched	—	—	11	6.1%	Ethics/tort/professional credential material

The official CSP11 percentages and domain objectives are explicit in BCSP's current blueprint. Domains 1–3 are 25/25/15%; Domains 4–7 are 9/6/10/10%. 
BCSP

Domain 1 — Advanced Application of Safety Principles: badly underweighted

Strong matches are principally T1Q26–T1Q28, T1Q31, T1Q33; T2Q26, T2Q29, T2Q31–T2Q36; T3Q26–T3Q34, T3Q38, T3Q58.

Missing or very thin CSP11 topics include facility life safety, fleet safety, powered industrial trucks/forklifts, aerial lifts, rigging/material handling, tools/hand tools/ladders/robotics, safety design criteria, process-flow diagrams, chemical compatibility and broader Prevention-through-Design application. BCSP assigns this entire domain 25%. 
BCSP

Domain 2 — Program Management: overweighted but uneven

The bank has abundant statistics, rates, culture, investigation and compliance material—e.g. T1Q1–T1Q9, T1Q11–T1Q18, T2Q1–T2Q18, T3Q1–T3Q18—but CSP11 also specifically expects document-management principles, project management/RACI, leadership theories, communication styles, procurement, budget development, timelines, confidence intervals and Pareto analysis. These are largely absent despite the overall domain being overweight.

Domain 3 — Risk Management: substantially underweight

Relevant items include T1Q10, T1Q13, T1Q19–T1Q21; T2Q7, T2Q19–T2Q20, T2Q23, T2Q34; T3Q21–T3Q22, T3Q24.

CSP11 expects 15%, including risk avoidance, retention, sharing/transfer, loss prevention/reduction, monitoring and communicating organizational risk. The bank concentrates on risk matrices/analysis methods but gives little coverage to financial risk-treatment strategy. 
BCSP

Domain 4 — Emergency Management: overweight

T1Q41, T1Q44–T1Q52; T2Q30, T2Q44–T2Q52; T3Q35, T3Q45–T3Q52 create a large block of fire/ICS/emergency material.

CSP11 allocates only 9%, and additionally calls for severe weather, nuclear incidents, natural disasters, terrorism, chemical spills, utility systems, cyber security, workplace violence, disaster recovery and hazmat transportation/security. Most of the bank is instead fire extinguisher/sprinkler/ICS recall.

Domain 5 — Environmental Management: approximately correct quantity, incomplete breadth

Examples: T1Q34, T1Q39–T1Q42; T2Q38, T2Q40; T3Q37, T3Q39, T3Q43–T3Q44.

However, the domain is dominated by environmental-law recognition. CSP11 explicitly includes pollution prevention, sustainability, supply chain, reduce/reuse/recycle, aging infrastructure, asbestos, climate change and ESG; most are absent. 
BCSP

Domain 6 — Occupational Health and Applied Science: massively overweight

Approximately 38/180 items fit here, including T1Q5, T1Q23–T1Q24, T1Q29–T1Q30, T1Q32, T1Q35, T1Q53–T1Q57; T2Q6, T2Q21–T2Q28, T2Q42, T2Q53–T2Q57; T3Q4, T3Q19–T3Q20, T3Q23, T3Q25, T3Q28, T3Q36, T3Q49, T3Q53–T3Q57.

Despite overcoverage, CSP11's toxicology, epidemiology/public health, radiation, biological hazards, indoor air quality, nanoparticles, lasers and chemistry/containment calculations receive little or no attention.

Domain 7 — Training: critical gap

Only T3Q15 strongly tests an actual CSP11 Training objective by asking about training-program effectiveness. T1Q47 asks for a HAZWOPER training-hour requirement but does not assess needs analysis, program development, implementation, adult learning or training methodology.

CSP11 allocates 10%—about 18 questions in a 180-item bank. It explicitly covers needs assessment, competencies, training materials, learning styles, continuous improvement, effectiveness measures, classroom/online/simulation/AI/coaching/OJT methods and adult-learning principles. 
BCSP

This is the single largest blueprint omission.

Material with no direct CSP11 objective

T1Q58–T1Q60, T2Q58–T2Q60, T3Q9, T3Q12, T3Q16, T3Q59, T3Q60 are predominantly BCSP ethics, tort doctrine or credential/professional-practice questions. Some are useful supplemental study, but they should not displace heavily underrepresented CSP11 objectives.

6. STRUCTURAL CHECK

Section A's structural counts are correct: 180 questions, three tests, four options on every item, zero missing explanations, zero exact duplicate stems, zero duplicate choice sets and zero invalid answer keys. 

csp

The answer-position distribution is not acceptable for a commercial practice bank:

Key	Count	Percentage
A	9	5.0%
B	107	59.4%
C	57	31.7%
D	7	3.9%

csp

Per test:

Test 1: A 5 / B 28 / C 24 / D 3

Test 2: A 1 / B 36 / C 20 / D 3

Test 3: A 3 / B 43 / C 13 / D 1

A customer who simply favors B on uncertain questions receives a huge artificial advantage. By Test 3, B is correct 71.7% of the time.

Section A's same-answer-run flags are substantially correct. Actual ≥4-answer runs are:

T1Q6–T1Q9 B×4; T2Q11–T2Q16 B×6; T3Q10–T3Q14 B×5; T3Q16–T3Q19 B×4; T3Q21–T3Q27 B×7; T3Q30–T3Q34 B×5; T3Q36–T3Q39 B×4; T3Q41–T3Q44 B×4; T3Q46–T3Q49 B×4; T3Q57–T3Q60 B×4. The machine report itself identifies these long runs. 

csp

The B×7 run at T3Q21–T3Q27 is particularly damaging.

There are no exact duplicate stems, but strong concept repetition remains. Examples include T1Q3/T3Q2 fault-tree gates; T1Q1/T2Q1/T3Q1 incident-rate calculations; T1Q19/T2Q19/T3Q21–T3Q22 risk concepts; T1Q53/T2Q53/T3Q53 NIOSH lifting; and large repeated blocks of fire and ergonomics.

The bank has no item/domain tags, which makes this CSP11 imbalance much harder to catch automatically. 

csp

7. TOP FIXES

T3Q15 plus the rest of all three tests — build ~16–18 genuine CSP11 Domain 7 Training items. Cover needs assessment, learning objectives, adult learning, delivery methods, coaching/OJT, simulations, AI/computer-based training, evaluation and continuous improvement.

T1Q26–T3Q58 — add ~20–25 Domain 1 items on PtD, fleet, facility life safety, forklifts/aerial lifts, materials handling, rigging, hand/power tools, ladders, robotics and deeper process-safety application.

T1Q10/T1Q13/T1Q19–21/T2Q19–23/T3Q21–24 — roughly double Risk Management coverage and add avoidance/retention/sharing/transfer and monitoring/communication of risk.

T1Q44–52/T2Q30,T2Q44–52/T3Q35,T3Q45–52 — cut the oversized fire/emergency block and redistribute those slots to Domains 1, 3 and 7.

T1Q53–57/T2Q53–57/T3Q53–57 plus IH blocks — reduce repetitive occupational-health/ergonomics coverage from ~21% toward CSP11's 10%, while adding missing toxicology, epidemiology, radiation, biological hazards and applied chemistry.

T1Q24, T1Q33, T1Q38, T1Q58, T2Q26, T3Q32, T3Q34 — correct or replace all seven wrong/ambiguous-key items before reopening the bank.

All 180 items — completely rebalance answer positions. Target roughly 40–50 of each A/B/C/D across 180 and prohibit runs longer than three during automated QA.

T1Q58–60, T2Q58–60, T3Q9, T3Q12, T3Q16, T3Q59–60 — remove or sharply reduce non-blueprint ethics/tort/credential material and use those slots for missing CSP11 objectives.

T1Q36–43/T2Q26–43/T3Q26–44 — reduce regulation-number memorization and write more scenario/application questions using the CSP11 verbs apply, evaluate, analyze, determine.

All 180 items — add CSP11 domain/task tags and a release gate that checks domain percentages, answer-position distribution, long key runs, current regulatory editions and calculation consistency before any future bank goes live.

8. SUMMARY ROW

| CSP Exam Study Guide (B5) | 4.7/10 | 7 | 8 | PULL | Severe CSP11 blueprint imbalance—Training is virtually absent, Occupational Health/Emergency are heavily overweight, and 59.4% of all answers are B—with seven wrong or ambiguous keys. |