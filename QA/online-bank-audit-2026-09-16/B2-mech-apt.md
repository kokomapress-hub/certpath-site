# B2 — Mechanical Aptitude Study Guide — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/mech-apt.json` — 180 questions / 3 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

B2 — Mechanical Aptitude Study Guide Audit
1. VERDICT

Overall score: 5.9/10

Audit coverage: I read 180/180 questions, all choices, keys, and explanations, and independently recomputed every quantitative/mechanical calculation. Unlike B1, there are no figures at all in this bank: Section A reports 0 image-based questions across all 180 items. That is not merely cosmetic: it creates a major fidelity problem for BMCT-II and WTMA, both of which fundamentally use illustrated mechanical scenarios.

Area	Score	Finding
Answer-key correctness	8.8/10	Two definite wrong keys plus several genuinely ambiguous/no-unique-answer items.
Explanation accuracy	8.2/10	Mostly mathematically sound, but several explanations contradict the key, assume facts absent from the stem, or oversimplify the physics.
Item quality / distractors	5.4/10	Too formula-heavy, too text-heavy, substantial semantic duplication, weak spatial items without diagrams, and multiple under-specified stems.
Exam-blueprint alignment	2.8/10	Serious format mismatch for BMCT-II/WTMA and major content gaps for MecTest. MAT-4 itself is now discontinued.
Structural hygiene	4.5/10	Counts are clean, but answer-key distribution is highly predictable and semantic duplication is much greater than Section A's literal-duplicate count.

The mechanical calculations are generally accurate. The release problem is the product-to-exam match.

Pearson's BMCT-II is a 55-item, 25-minute assessment where each administration consists of illustrations of simple mechanisms and three answer options; Pearson explicitly says the items are based on frequently encountered mechanisms and are designed not to require specialized textbook knowledge. The current WTMA is 60 questions in 30 minutes and Ramsay states that every question uses a diagram with everyday objects. This bank has 60 questions per test, four options on every question, and zero diagrams.

For Ramsay, MAT-4 is officially discontinued as of 2026; its published format was 36 questions in 20 minutes across Household Objects, Work/Production & Maintenance, School/Science & Physics, and Hand & Power Tools. Ramsay also states that it was intended to measure aptitude rather than specific learned knowledge and emphasized everyday items/common knowledge. The current successor is MAT-5.

MecTest is a different construct again: a journey-level mechanical-maintenance knowledge test, 60 questions, covering Hydraulics & Pneumatics, Print Reading, Welding & Rigging, Power Transmission, Lubrication, Pumps & Piping, Mechanical Maintenance, Machines, and Tools & Equipment. Most of those areas are absent or seriously underrepresented here.

Release decision: PULL

2. WRONG OR AMBIGUOUS KEYS

T1Q57 — key D is wrong — correct key A. The stem gives a five-square plus-shaped net: one center square plus four attached sides. That forms an open-top box. Choice A correctly says there is no opposite face and the center becomes the bottom. Choice D incorrectly says the center square is open. More importantly, the explanation itself explicitly says the center square becomes the bottom and the top is open, directly contradicting key D.

T2Q14 — no fully correct option — intended A only after adding zero net torque. Static equilibrium for a rigid body requires both zero net force and zero net torque. Choice A says only “not moving and net force is zero”; the explanation itself adds the missing torque requirement.

T2Q23 — no unique correct key as written — intended C only if the question asks which machine is most appropriate for splitting. “Greatest mechanical advantage” cannot be determined from machine class alone; MA depends on dimensions/geometry. A suitably dimensioned lever can have greater MA than a particular wedge. The keyed explanation answers a different question: which device is suited to splitting.

T2Q31 — key A is wrong — correct key B. A crossed belt reverses direction, so a clockwise driver produces a counterclockwise driven pulley when both are viewed from the same side. The explanation first says the belt reverses direction and then incorrectly concludes that the driven pulley also turns clockwise. The bank itself gives the correct rule later at T3Q32.

T2Q48 — no unique correct answer — C is valid only with an adiabatic/rapid-compression assumption. Compressing a gas can raise temperature if heat does not escape, but sufficiently slow isothermal compression can leave temperature essentially unchanged. “Sealed” does not specify the thermodynamic process.

T2Q52 — ambiguous — no universally correct key without material grades/environment. “Stainless steel” and “aluminum” are families, not single corrosion behaviors. Resistance in saltwater depends heavily on alloy grade, chloride concentration, exposure geometry, galvanic coupling, etc. Key C may be the intended elementary answer, but it is not technically guaranteed from the information supplied.

T2Q56 — insufficient information; D is more defensible from the presented item. No cube net is actually shown or described precisely enough to identify the opposite face. The explanation invents an unstated “standard cross-shaped cube net.” Since the entire bank contains no images, this is not simply a missing path—it is an incomplete spatial item.

T2Q60 — both A and C are defensible — item invalid as single-key MCQ. A conventional horizontal mirror image of R moves the vertical stroke to the right and makes the bowl/leg face left. The explanation incorrectly claims the vertical stroke remains on the left.

T3Q58 — viewpoint ambiguity — A or B can follow depending on what “viewed directly from above” means. The actual oblique cross-section of a circular cylinder is an ellipse; its projection along the cylinder's axis can be circular. The stem never establishes the pipe orientation or viewing axis.

Wrong/ambiguous-key total: 9.

3. EXPLANATION ERRORS

T1Q57 — explanation supports A while the recorded key is D. Direct key/explanation contradiction.

T2Q14 — explanation correctly states that static equilibrium requires zero net force and zero net torque, but keyed option A does not include the torque requirement.

T2Q23 — explanation says a wedge is the “ideal” machine for splitting, but that does not establish that it necessarily has the greatest mechanical advantage, which is what the stem asks.

T2Q31 — internally contradictory explanation: “crossed belt reverses rotation” followed by a same-direction conclusion.

T2Q48 — explanation incorrectly presents temperature increase as unconditional. Compression temperature depends on heat transfer/process conditions.

T2Q52 — explanation treats generic stainless steel as categorically the most saltwater-corrosion-resistant option without specifying stainless grade or aluminum alloy.

T2Q54 — conflates resolution/least count with accuracy. A standard metric micrometer commonly resolves 0.01 mm, but its actual accuracy is an instrument specification and is not synonymous with the graduation size.

T2Q56 — explanation assumes a particular “standard cross-shaped cube net” that the stem never supplies.

T2Q60 — explanation incorrectly states that the vertical stroke of a mirrored R stays on the left. It does not in the ordinary horizontal mirror image.

T3Q39 — “equally and instantly” is too strong. Hydraulic liquid's low compressibility makes displacement/force transmission efficient, but pressure disturbances propagate at a finite wave speed; incompressibility is also not the sole reason Pascal pressure is transmitted throughout a static fluid.

T3Q58 — explanation says the top-down outline is “always a circle, regardless of how the pipe was cut.” That is only true for a specified projection/viewing direction; the physical cut face remains elliptical for the stated oblique cut.

Bad explanation total: 11.

4. ITEM QUALITY

T1Q1–T3Q60 — whole-bank visual-format defect. There are zero image questions. That is a major psychometric mismatch for two of the headline target tests. Pearson says each BMCT-II item presents an illustration of a simple mechanism; Ramsay says every WTMA question uses a diagram with everyday objects.

T1Q1–T1Q15, T2Q1–T2Q15, T3Q1–T3Q15 — excessive textbook/formula physics. Many require explicit calculation of acceleration, kinetic energy, spring energy, momentum, power, friction coefficients, projectile formulas, vector resultants, etc. This is useful mechanical-physics teaching but substantially more formula-based than BMCT-II/WTMA/MAT aptitude style.

T1Q21, T1Q35–T1Q44, T2Q18, T2Q32, T2Q35–T2Q45, T3Q30–T3Q44 — learned formula/technical-knowledge density is too high for MAT/WTMA-style aptitude. Ramsay specifically describes MAT as an aptitude assessment rather than a learned-knowledge test and says its questions were selected around everyday items/common knowledge.

T1Q27 — item dependency. “In the previous question…” makes this item non-self-contained. If tests are randomized, reviewed individually, or later reordered, the item fails.

T1Q57, T2Q56, T2Q60, T3Q58, T3Q60 — spatial reasoning is being attempted verbally rather than visually. This is especially problematic in a mechanical-aptitude product; T2Q56 is not answerable cleanly without the unstated net.

T1Q20 / T2Q20 / T3Q24 — exact three-test reuse of the wheelbarrow/second-class-lever item.

T1Q42 / T3Q41 — exact reuse of three 6-ohm resistors in parallel.

T1Q52 / T2Q51 / T3Q51 — same torque-wrench fact tested three times, with only minor wording changes.

T2Q49 / T3Q48 — exact bimetallic-strip concept/stem reuse.

T1Q17 / T3Q20 — essentially the same fixed-pulley/100-N calculation.

T2Q17 / T3Q17 — effectively the same 6 m / 1.5 m ramp question with the same answer.

T1Q26 / T3Q26 — same 15-tooth/45-tooth gear pair and 600 RPM calculation.

T1Q33 / T2Q29 / T3Q33 — idler-gear function repeated in every test.

T1Q32 / T2Q30 / T3Q30 — single-start worm/40-tooth wheel concept repeated in every test.

T1Q56 / T3Q56 — identical painted 3×3×3 cube question.

T2Q58 / T3Q59 — essentially identical “view gear from opposite side” spatial question.

The structural algorithm reports only four literal duplicate-stem groups covering nine questions, but the semantic duplication is therefore much larger than Section A suggests.

T2Q53 — “low speed with heavy pressure” is an over-generalized machining rule. Correct feed/pressure depends on drill diameter, bit material, work hardening, cutting fluid and machine rigidity.

T3Q35 — “chain drive … does not slip” is acceptable as an introductory contrast with friction belts, but “cannot slip” in the explanation is too absolute; worn/mis-tensioned chains can jump teeth.

T3Q60 — mirror geometry is under-specified. “Mirror placed to the right” is not enough to define what counts as the object's left/right in the reflected coordinate system.

5. BLUEPRINT COVERAGE
BMCT-II — Pearson Bennett Mechanical Comprehension Test II

Official/current reference: Pearson BMCT-II item-bank design, current product; technical manual copyright 2014.

Pearson's official manual gives the following coverage in each 55-item administration:

BMCT-II content	Official items
Pulleys and Levers	7
Hydraulics	6
Resolution of Forces / Centrifugal Force / Inertia	6
Structures, Planes and Slopes	6
Gears and Belt Drives	5
Miscellaneous	6
Gravity and Velocity	4
Acoustics and Optics	3
Center of Gravity	3
Electricity	3
Heat	3
Shape and Volume	3

Pearson also specifies 55 illustrated items, 25 minutes and three answer options per question.

Alignment finding: poor.

T1Q1–T3Q60: all 180 bank items use four textual alternatives rather than Bennett's illustrated three-choice format.

T1Q1–T1Q15 / T2Q1–T2Q15 / T3Q1–T3Q15: over-weight algebraic/formula physics versus Bennett's application of principles through simple illustrated mechanisms.

T1Q1–T3Q60: acoustics is essentially absent. Optics is barely represented by mirror-related questions. Center-of-gravity content is essentially absent. Structures are thin. Gears, levers, hydraulics, electricity and heat are comparatively over-represented.

Wiesen Test of Mechanical Aptitude — WTMA

Official/current reference: Ramsay's 2026 WTMA product.

WTMA is 60 questions / 30 minutes and, critically, Ramsay states that each question uses a diagram with everyday objects.

Alignment finding: count matches, delivery construct does not.

Each CertPath test does contain 60 questions, but T1Q1–T3Q60 contain zero diagrams. The bank therefore matches WTMA length while missing its defining item presentation.

The high concentration of equations—e.g. T1Q1, T1Q4–T1Q12, T1Q21, T1Q35–T1Q44; T2Q4, T2Q6, T2Q13, T2Q18; T3Q3, T3Q10, T3Q13—also pushes the bank toward textbook science rather than everyday-object mechanical reasoning.

Ramsay Mechanical Aptitude Test — MAT-4 / current MAT-5

MAT-4 status: discontinued. Ramsay's 2026 product page explicitly says so. MAT-4 was 36 multiple-choice questions in 20 minutes, covering:

Household Objects

Work: Production and Maintenance

School: Science and Physics

Hand and Power Tools

Ramsay says it measures the ability to learn job activities and is not designed to measure specific knowledge and skills.

The current successor, MAT-5, retains the same 36-item/20-minute aptitude positioning and the same four public content categories.

Alignment finding: partial content coverage, weak exam simulation.

T1Q1–T3Q15 provides strong School/Science & Physics coverage.

T1Q16–T1Q40, T2Q16–T2Q40, T3Q16–T3Q40 provides production/mechanical-principle material.

T1Q51–T1Q55, T2Q51–T2Q55, T3Q51–T3Q55 provides some Hand & Power Tools/materials coverage.

But there is little genuine Household Objects content and too much advanced learned knowledge—worm gearing, compound gear calculations, electrical networks, metal heat treatment, corrosion, micrometers, etc.—for an assessment Ramsay describes as aptitude/common-knowledge oriented.

Ramsay MecTest

Official/current reference: MecTest Form A1/B3, 60 questions, journey-level mechanical-maintenance knowledge.

Official categories are:

Hydraulics & Pneumatics

Print Reading

Welding & Rigging

Power Transmission

Lubrication

Pumps & Piping

Mechanical Maintenance

Machines

Tools & Equipment

Alignment finding: seriously incomplete.

Well represented:
T1Q26–T1Q40, T2Q26–T2Q40, T3Q26–T3Q40 — power transmission and basic hydraulics.

Partly represented:
T1Q51–T1Q55, T2Q51–T2Q55, T3Q51–T3Q55 — tools/materials/machines.

Effectively missing across T1Q1–T3Q60:
Print Reading; Welding & Rigging; Lubrication; Pumps & Piping; meaningful Pneumatics; real Mechanical Maintenance/troubleshooting.

That makes this bank unsuitable as a representative MecTest mock despite matching MecTest's 60-item length.

6. STRUCTURAL CHECK

Section A's basic counts are correct: 180 questions, 3 tests, 60 questions each, four choices on every item, no invalid answer-key letters, no missing explanations.

The overall key distribution is:

A: 27 — 15.0%

B: 82 — 45.6%

C: 59 — 32.8%

D: 12 — 6.7%

My per-test recomputation makes the problem clearer:

Test	A	B	C	D
Test 1	7	26	19	8
Test 2	10	26	21	3
Test 3	10	30	19	1

T3Q1–T3Q60: B is correct on exactly half the test, while D is correct only once. This is unacceptable answer-position predictability for a commercial practice bank.

Section A's long-run findings are confirmed, including four consecutive B answers around T2Q38–T2Q41, four consecutive B answers around T2Q56–T2Q59, and five consecutive B answers T3Q51–T3Q55. The runs are less concerning than the overall key-position skew.

Section A correctly identifies four literal duplicate-stem groups / nine questions. It does not detect the much larger number of semantic near-duplicates listed in Section 4.

The three very-short explanations reported by Section A—T1Q18, T2Q45, T3Q6—are indeed brief, but brevity itself is not a serious defect because all three still contain the necessary calculation.

The missingImageFiles: 0 result is technically correct but potentially misleading: there are no missing image paths because the bank references no images at all. For BMCT-II and WTMA alignment, that is a more serious problem than missing image files would have been.

7. TOP FIXES

T1Q1–T3Q60 — rebuild the practice architecture around the actual target tests. A single generic 60-question, four-choice, text-only format cannot realistically simulate BMCT-II, WTMA, MAT-4/5 and MecTest.

T1Q1–T3Q60 — add diagram-based mechanical reasoning for BMCT-II and WTMA. BMCT-II requires illustrated mechanisms and three-choice items; WTMA explicitly uses diagrams with everyday objects on every item.

T1Q1–T3Q60 — create a separate MecTest-oriented pool covering the missing official areas: Print Reading, Welding & Rigging, Lubrication, Pumps & Piping, Pneumatics and Mechanical Maintenance/troubleshooting.

Update MAT-4 positioning throughout the product to account for its 2026 discontinued status and current MAT-5 successor. MAT-4 terminology can be retained historically if needed, but it should not be presented as the current Ramsay form.

T1Q57 and T2Q31 — fix the two definite wrong keys immediately. These are direct customer-facing scoring errors.

T2Q14, T2Q23, T2Q48, T2Q52, T2Q56, T2Q60 and T3Q58 — repair or replace the ambiguous items. Each currently lacks a unique defensible answer under its exact wording.

T1Q57, T2Q31, T2Q48, T2Q54, T2Q56, T2Q60, T3Q39 and T3Q58 — correct the explanation-level technical defects before republishing.

T1Q1–T3Q60 — rebalance the answer keys. Target roughly even A/B/C/D placement within each 60-question bank; Test 3's 30 B keys versus one D key is especially conspicuous.

T1Q20/T2Q20/T3Q24, T1Q17/T3Q20, T2Q17/T3Q17, T1Q26/T3Q26, T1Q33/T2Q29/T3Q33, T1Q32/T2Q30/T3Q30, T1Q52/T2Q51/T3Q51, T1Q56/T3Q56 and related clones — replace repeated constructs with genuinely new mechanisms.

T1Q1–T1Q15, T2Q1–T2Q15, T3Q1–T3Q15 — reduce formula-first textbook calculations and shift more items toward rapid qualitative mechanical reasoning, especially for the Bennett/Wiesen/MAT portions.

8. SUMMARY ROW

| B2 — Mechanical Aptitude Study Guide | 5.9/10 | 9 | 11 | PULL | Mechanics are mostly calculated correctly, but the bank is text-only and formula-heavy, badly mismatches BMCT-II/WTMA formats, omits major MecTest domains, uses a discontinued MAT-4 target, and has severe answer-key skew. |

Add an executive-priority action plan
Resolve score and count inconsistencies