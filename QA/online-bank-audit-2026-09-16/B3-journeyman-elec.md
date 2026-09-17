# B3 — Journeyman Electrician Exam Study Guide — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/journeyman-elec.json` — 180 questions / 3 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

Overall score: 4.4/10

Audit coverage: I read 180/180 questions, every answer choice, key, and explanation. I recomputed all numerical electrical calculations and reviewed all 144 questions containing explicit NEC references for 2026-edition fit. The most consequential finding is that substantial parts of the load-calculation section still use the 2023-and-earlier Article 220 framework. In the 2026 NEC, Article 220 load calculations moved to Article 120; dwelling feeder/service general load changed from 3 VA/ft² to 2 VA/ft², and the dwelling optional method changed from the first 10 kVA at 100% to the first 8 kVA at 100%. 
EC&M
+1

One limitation: the complete copyrighted final 2026 NEC text is not publicly searchable provision-by-provision. I verified changed provisions against NFPA's 2026 development/final-revision material and current 2026 NEC technical sources. For provisions apparently unchanged from 2023, I checked the citation and substance but could not independently compare every word against a licensed final-code copy.

Area	Score	Finding
Answer-key correctness	4.8/10	Roughly three dozen wrong, ambiguous, or no-correct-answer items, heavily concentrated in code questions.
Explanation accuracy	3.6/10	Numerous explanations reproduce superseded 2023 rules, obsolete section numbers, or internally inconsistent calculations.
Item quality / distractors	6.6/10	Generally usable exam-style stems, but too many questions depend on memorizing obsolete section numbers and some stems omit conditions necessary for one correct answer.
Exam-blueprint alignment	6.0/10	Broad journeyman subject coverage, but weak plan-reading/control coverage and an oversized grounding/load-calculation emphasis.
Structural hygiene	5.0/10	Counts are correct, but C/B answer-key concentration and very long same-key runs are poor commercial-test construction.

The structural report correctly shows 180 questions over three tests with no missing explanations, but the key distribution is extremely uneven: A 12.2%, B 35.0%, C 44.4%, D 8.3%. 

journeyman-elec

Release decision: PULL

The 2026-edition claim is currently unsafe for customers. This is not merely a citation-refresh problem: several 2026 changes alter the actual scored answer.

2. WRONG OR AMBIGUOUS KEYS

T1Q19 — wrong — correct answer depends on circuit conditions; D is not the general answer. The bank gives 24 in. for direct-buried UF under a one-/two-family driveway. The current Table 300.5 framework gives 18 in. for ordinary direct burial in that situation, with a reduced 12-in. rule available for qualifying residential 120-V-or-less, GFCI-protected circuits of limited amperage. The stem omits the conditions needed for one answer. 

journeyman-elec

T1Q20 — obsolete 2023 answer — correct A (2 VA/ft²) for 2026 feeder/service calculations. The bank keys 3 VA/ft² from old Table 220.12. The 2026 feeder/service dwelling load is 2 VA/ft² under Art. 120; 3 VA/ft² survives separately for determining the number of general branch circuits. 

journeyman-elec

 
EC&M

T1Q26 — no exact correct answer. The item cites the RMC bending table to answer an EMT question and gives 6 in. A 1-in. EMT bend is not properly established this way; bend method/radius must be specified.

T1Q31 — obsolete 2023 answer — correct A, 4,000 VA. 2,000 ft² × current 2 VA/ft² = 4,000 VA, not 6,000. 

journeyman-elec

 
EC&M

T1Q33 — wrong for 2026 — no offered answer. Four commercial kitchen units use the current four-unit Table 120.56 factor of 80%, making the demand 20 kW × .80 = 16 kW, not 13 kW.

T1Q40 — ambiguous/no correct selectable OCPD size. 125% of 50 A is 62.5 A, but when selecting an actual standard-size OCPD, 62.5 A is not a standard size. The stem should specify whether it wants calculated minimum ampacity or actual device size.

T1Q42 — no correct choice. Bonding's core NEC function is establishing electrical continuity and an effective ground-fault current path. “Limit voltage on equipment enclosures” does not adequately state the purpose the question claims to test. 

journeyman-elec

T1Q48 — ambiguous. “AC motor” is too broad for a universal 250% inverse-time-breaker answer; Table 430.52 depends on motor type.

T1Q57 — two correct answers: B and C. Current dwelling AFCI requirements include kitchens and bedrooms. The bank keys only bedrooms. The 2026 material places the locations under 210.12(B), not the old citation used here. 

journeyman-elec

T2Q16 — ambiguous — default rule points to A unless 75°C equipment is identified/listed. “Either 60 or 75°C” omits the termination-rating conditions that determine which column may be used.

T2Q17 — ambiguous under 2026. Current 230.70 distinguishes one-/two-family dwelling service disconnect placement from other occupancies. The old generic “nearest point of entrance” formulation is no longer universally correct.

T2Q20 — wrong — no correct choice. A T-rated switch concerns tungsten-filament loads; the item incorrectly associates T-rating with generic inductive loading above 80%.

T2Q22 — wrong as written — correct B if literally asking current-carrying conductors. General ampacity adjustment begins when there are more than three current-carrying conductors. The explanation instead answers the special NM-cable-through-an-opening rule. 

journeyman-elec

T2Q31 — obsolete 2023 answer — correct A, 6,000 VA. 3,000 ft² × 2 VA/ft² = 6,000 VA. 

journeyman-elec

T2Q32 — wrong — no correct choice. The 180-VA-per-receptacle/yoke calculation does not apply to ordinary dwelling general-use receptacles, which are incorporated in the dwelling general-load calculation.

T2Q37 — obsolete — no offered correct answer. The bank uses 3.5 VA/ft² for offices. Current 2026 load-table treatment is 1.3 VA/ft², so none of A–D is correct.

T2Q50 — wrong — correct C (175%) as the normal Table 430.52 value. The keyed 225% is the permitted increase under qualifying motor-starting circumstances, not the basic maximum value that the stem asks for. 

journeyman-elec

T2Q52 — wrong/overrestrictive — no correct general answer. The NEC does not universally require every >100-hp motor disconnect to be only a circuit breaker or molded-case switch.

T2Q57 — no universally correct answer. Current 625.40 does not say every EVSE must have its own dedicated branch circuit regardless of rating/configuration; the rule has thresholds and managed-system provisions.

T2Q58 — wrong/ambiguous — no correct generic answer. PV rapid shutdown has different limits inside versus outside the array boundary: the bank's blanket “30 V within 30 seconds” rule is incomplete. Current NFPA text includes an 80-V inside-boundary pathway or listed PV hazard-control system. 
NFPA Document Information

T2Q59 — unsupported/wrong — no correct answer. The cited 480.9(A) no longer establishes the claimed six-inch terminal-to-grounded-surface clearance; current 480.9 concerns battery support systems.

T3Q11 — wrong — no correct answer. Current 210.8(F) concerns dwelling outdoor outlets, including the 2026 60-A framework; it is not the generic non-dwelling 250-V/50-A receptacle rule described by the question. 

journeyman-elec

 
NFPA Document Information

T3Q13 — wrong — correct D, 115 A. Current Table 310.16 gives 3 AWG copper in the 90°C column 115 A, not 110 A. The keyed C is incorrect. 

journeyman-elec

T3Q15 — ambiguous — both A and C are standard sizes. NEC 240.6(A) includes both 45 A and 80 A standard OCPD ratings, so the single key C is invalid.

T3Q17 — wrong — no correct answer. Current 422.12 requires central heating equipment other than fixed electric space heating to have an individual branch circuit; it does not impose the claimed 125%-of-nameplate rule. 

journeyman-elec

 
NFPA Document Information

T3Q18 — wrong — no correct answer. The current dwelling hallway lighting-outlet requirement does not use the bank's old 10-ft threshold.

T3Q21 — wrong — correct A, 1/4 in. The bank's 3/4-in. PVC thermal-movement threshold is obsolete.

T3Q31 — obsolete 2023 calculation — correct A, 7,500 VA. 1,500 ft² × 2 VA = 3,000 VA, plus 3,000 VA small-appliance circuits and 1,500 VA laundry = 7,500 VA, not 9,000. 

journeyman-elec

T3Q34 — obsolete 2023 calculation — no correct choice. In 2026 the optional method uses the first 8 kVA at 100% plus 40% of the remainder. For 45 kVA: 8 + (.40 × 37) = 22.8 kVA. The bank's 24 kVA uses the superseded first-10-kVA rule. 

journeyman-elec

 
EC&M

T3Q38 — wrong 2026 value — no offered answer. Current warehouse/storage load is 0.3 VA/ft²; 20,000 ft² therefore gives 6,000 VA, not 5,000 VA.

T3Q39 — wrong — correct B, 180 VA. The bank incorrectly multiplies 180 VA × 5. The rule is 180 VA for each 5-ft section or fraction thereof of multioutlet assembly under the applicable condition, not 180 VA per foot. 

journeyman-elec

T3Q50 — ambiguous. The generic “AC motor” wording is too broad for one universal instantaneous-trip percentage; Table 430.52 contains motor-type-dependent values, including higher treatment for specified motor designs.

T3Q51 — wrong calculation — correct A, 43.7 A. A motor with SF 1.0 uses 115% under the stated rule: 38 × 1.15 = 43.7 A. The explanation says 115% but accidentally calculates 38 × 1.10 = 41.8 A, producing keyed C. 

journeyman-elec

T3Q58 — wrong — no correct answer. Article 694.22 does not establish the claimed “over 80 V DC = rapid shutdown” requirement. The question appears to transplant PV-style rapid-shutdown language into small wind requirements. 

journeyman-elec

Answer-level defects identified: 34 definite/strongly ambiguous items.

3. EXPLANATION ERRORS

The most serious explanation failures are the same items whose keys fail above: T1Q19, T1Q20, T1Q26, T1Q31, T1Q33, T1Q40, T1Q42, T1Q48, T1Q57; T2Q16, T2Q17, T2Q20, T2Q22, T2Q31, T2Q32, T2Q37, T2Q50, T2Q52, T2Q57, T2Q58, T2Q59; T3Q11, T3Q13, T3Q15, T3Q17, T3Q18, T3Q21, T3Q31, T3Q34, T3Q38, T3Q39, T3Q50, T3Q51, T3Q58.

In addition, the following answers may survive, but their citations/explanations are not 2026-clean:

T1Q32, T1Q34, T1Q36, T1Q37; T2Q34, T2Q36, T2Q38, T2Q39; T3Q32, T3Q37 — still cite Article 220 load-calculation provisions. In the 2026 NEC this calculation material was reorganized into Article 120. 
EC&M
+1

T1Q36 is especially important: the answer “40%” survives, but “first 10 kVA at 100%” does not; 2026 uses first 8 kVA at 100%. 

journeyman-elec

T1Q11, T2Q11 — explanations still describe GFCI scope using older “125-V, 15- and 20-A receptacle” language rather than the broader modern scope.

T1Q29 — the 40% enclosure wiring-space concept is cited to the wrong/obsolete location; 2026 restructuring places it at 312.11(A), not 312.6(A).

T1Q38 — 1,500 VA per small-appliance circuit is substantively valid, but 210.11(C)(1) establishes the required circuits; the load-calculation treatment belongs in current Article 120.

T2Q25, T3Q22 — nail/screw protection belongs to 300.4(A)(1); both explanations cite 334.108.

T2Q27 — 20% wireway conductor fill is miscited to 376.22(B); the general fill rule is in 376.22(A).

T2Q30 — stem cites 334.15(B), while its own explanation correctly switches to 334.23.

T2Q43 — stem cites 250.52(A)(2) for a rod electrode; rod electrodes are addressed under 250.52(A)(5), with installation requirements elsewhere in 250.53.

T2Q45 — stem says 250.64(B), while the splice/joint rule is 250.64(C); 2026 also expands permitted accessible listed grounding/bonding splice methods.

T2Q60 — ESS disconnect requirement is now at 706.15, not 706.7.

T3Q14 — the six-foot appliance-receptacle concept is miscited to 210.52(G)(1); this is not the garage provision cited.

T3Q23 — stem cites 300.4(G), but the explanation itself switches to the applicable 300.4(D) framing-member rule.

T3Q24 — refers to a nonexistent “Table 358.30(A)” rather than the securing/supporting section.

T3Q26 — stem cites 320.15 while its explanation correctly points to 320.24 for bending radius.

T3Q42 — ground-ring subsection is miscited; the bank's “250.52(A)(7)” reference does not match the current ground-ring provision.

T3Q45 — stem cites 250.64(E), while its own explanation says the severe-physical-damage requirement is 250.64(B).

T3Q47 — stem cites 250.24(A)(5), while the explanation invokes the applicable grounded-conductor service-disconnect provision at 250.24(C).

T3Q52 — stem cites 430.53(D), but the explanation correctly identifies the motor-compressor conductor rule as 440.32.

T3Q54 — dwelling AFCI locations are under current 210.12(B) rather than the subsection cited by the bank.

Taken together, well over 50 questions contain either a substantive explanation error or a 2026 citation/edition defect. The dominant pattern is not random miscitation: it is systematic retention of earlier-code material.

4. ITEM QUALITY

T1Q20/T1Q31, T2Q31, T3Q31 are particularly damaging because the same obsolete 3 VA/ft² concept is repeatedly trained and scored across the three tests. This teaches customers the wrong 2026 calculation multiple times.

T1Q36/T3Q34 similarly rehearse the superseded 10-kVA optional-method breakpoint, increasing rather than mitigating the edition error.

T1Q57/T3Q54 test essentially the same AFCI requirement but use outdated subsection framing and, in T1Q57, create two correct choices.

T1Q19, T1Q48, T2Q16, T2Q17, T2Q22, T3Q50 omit conditions necessary for a unique NEC answer. Journeyman questions can legitimately test exceptions and conditional rules, but the conditions have to be stated.

T3Q51 is a serious commercial-quality defect because the explanation literally states 115% and then performs a 110% multiplication.

T2Q59/T3Q58 are the weakest code items: both attach a concrete numerical requirement to a cited section that does not support the asserted rule.

T1Q1–T1Q10, T2Q1–T2Q10, T3Q1–T3Q10 provide basic theory/calculation coverage, but are substantially easier than many jurisdictional journeyman calculations.

T1Q11–T3Q60 rely almost entirely on text recall/calculation. There are no plan-reading figures, wiring diagrams, one-lines, conductor-layout diagrams, box diagrams, or raceway-fill visual problems. Section A confirms zero image questions. 

journeyman-elec

5. BLUEPRINT COVERAGE

There is no single national Journeyman Electrician examination blueprint; licensing examinations vary by jurisdiction. For a current 2026-NEC benchmark, I used the Texas Journeyman Electrician examination outline / PSI-TDLR Candidate Information Bulletin effective September 1, 2026, which explicitly transitioned the examination reference to the 2026 NEC. Its domains cover electrical theory/definitions/plans, services and separately derived systems, feeders, branch circuits and conductors, wiring methods/materials, equipment/devices, motors/generators, controls/disconnects, special occupancies/equipment/conditions, renewable energy, and a separate calculation component. 
PSI Exams
+1

Against that benchmark:

T1Q1–T1Q10, T2Q1–T2Q10, T3Q1–T3Q10 — theory is somewhat over-weighted and comparatively elementary.

T1Q11–T1Q20, T2Q11–T2Q20, T3Q11–T3Q20 — branch/service material is substantial, but the 2026 migration errors badly compromise this coverage.

T1Q21–T1Q30, T2Q21–T2Q30, T3Q21–T3Q30 — wiring methods/materials are well represented numerically, although several citations are wrong.

T1Q31–T1Q40, T2Q31–T2Q40, T3Q31–T3Q40 — calculations are heavily represented, but this is precisely the section most contaminated by 2023 Article 220 values and references.

T1Q41–T1Q47, T2Q41–T2Q47, T3Q41–T3Q47 — grounding/bonding is relatively over-weighted.

T1Q48–T1Q53, T2Q48–T2Q53, T3Q48–T3Q53 — motors receive reasonable coverage, but generators and motor-control circuitry are thin.

T1Q54–T1Q60, T2Q54–T2Q60, T3Q54–T3Q60 — special occupancies/equipment and renewables are sampled, but unevenly; several of the most specialized items are themselves erroneous.

Underrepresented or essentially missing across T1Q1–T3Q60: plan reading, one-line/wiring diagrams, control circuits, generator calculations, substantial feeder calculations, equipment/device application, data/communications topics, and several special-occupancy/application areas.

The bank therefore has reasonable topic breadth but insufficient fidelity to a current 2026-NEC journeyman blueprint.

6. STRUCTURAL CHECK

Section A's top-level findings are confirmed: 180 questions, three 60-question tests, all four-choice items, no invalid key letters, no missing explanations, and no literal duplicate stems. 

journeyman-elec

The answer distribution is not commercially acceptable:

Test	A	B	C	D
Test 1	8	21	25	6
Test 2	7	28	21	4
Test 3	7	14	34	5
Total	22	63	80	15

A candidate selecting C on every Test 3 question would score 56.7% before knowing any electrical code.

Section A's same-answer-run warning is therefore meaningful, especially T2Q35–T2Q41 = C seven times consecutively and the five-C run terminating at T3Q49. 

journeyman-elec

Section A finds no literal duplicate stems, which is accurate, but semantic repetition exists—particularly the repeated dwelling-load, grounding, AFCI, motor-table, and conductor-support constructs.

The six “very short explanations” are correctly identified, but explanation length is not the real problem. 

journeyman-elec

 The larger defect is that many longer explanations confidently teach obsolete code.

7. TOP FIXES

T1Q20/T1Q31/T2Q31/T3Q31 — replace every 3-VA/ft² dwelling feeder/service calculation with the 2026 2-VA/ft² rule.

T1Q32–T1Q39, T2Q31–T2Q39, T3Q31–T3Q39 — migrate the entire load-calculation bank from old Article 220 citations to 2026 Article 120 and recalculate every affected answer. This is the highest-volume edition defect.

T1Q36/T3Q34 — change the optional dwelling calculation from first 10 kVA to first 8 kVA at 100%; recalculate T3Q34 to 22.8 kVA. 
EC&M

T1Q33/T2Q37/T3Q38/T3Q39 — rebuild the commercial load-table questions from the actual 2026 tables. These presently contain obsolete demand/unit-load values.

T2Q50/T3Q50/T3Q51 — comprehensively re-audit the motor protection questions against current Table 430.52 and 430.32. T3Q51 has an outright arithmetic/key contradiction.

T3Q11/T3Q17/T3Q18/T3Q21/T3Q58 — remove or rewrite the provisions whose underlying 2026 rule is materially different from the bank's claimed rule.

T1Q57/T3Q54 plus T1Q11/T2Q11 — refresh AFCI/GFCI questions against the current 210.8 and 210.12 organization and scope. Avoid old voltage/amperage wording.

T1Q26/T1Q29/T2Q25/T2Q30/T2Q43/T2Q45/T2Q60/T3Q14/T3Q22/T3Q23/T3Q26/T3Q42/T3Q45/T3Q47/T3Q52 — perform a section-number migration pass. These have wrong, superseded, or internally inconsistent citations even where the underlying answer may survive.

T1Q1–T3Q60 — rebalance correct-answer positions. Test 3's 34 C keys versus five D keys is especially exploitable.

T1Q1–T3Q60 — add representative 2026-NEC plan-reading, diagram, control, feeder and equipment-application questions rather than using 180 purely textual items.

8. SUMMARY ROW

| B3 — Journeyman Electrician Exam Study Guide | 4.4/10 | 34 | 50+ | PULL | The bank still contains systematic 2023-and-earlier NEC material—especially old Article 220 dwelling/commercial load rules—causing numerous wrong 2026 answers, stale citations, and customer-facing calculations. |