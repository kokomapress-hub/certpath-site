# B41 — PMI-ACP Exam Prep — ChatGPT audit of the online question bank

**Date:** 2026-09-16 · **Bank:** `data/pmi-acp.json` — 720 questions / 6 tests
**Auditor:** ChatGPT (GPT-5 Thinking, effort High), single thread https://chatgpt.com/c/6aaa53d6-b06c-83ed-a161-8c81ac48b4c1
**Input:** complete bank (every stem, choice, key, explanation, passage) + machine-computed structural report.

---

1. VERDICT

6.0/10 — PULL from scored-test/readiness use pending correction and verification of the interactive records.

This bank is built around the current four-domain PMI-ACP outline, not the retired seven-domain outline. Its complete domain allocation closely matches Mindset 28%, Leadership 25%, Product 19%, and Delivery 28%. The outline’s age is not the release blocker. 
Project Management Institute

The principal findings are four key/stem qualifications, eleven explanation corrections or qualifications, and 29 interactive records whose response elements and scoring keys are absent from the export. The latter could be an export defect rather than a live-site defect; their live functionality remains unverified.

The option-length analysis reveals a different problem from the preceding banks:

Check	Independently measured result
Single-answer key is uniquely longest	60/639 — 9.39%
Single-answer key is uniquely second-longest	382/639 — 59.78%
Select-two questions where the two longest options are exactly the correct pair	37/52 — 71.15%
Strongest whole-test four-letter fit	Test 5, CDBA: 45/120 — 37.50%

The low longest-answer rate does not establish freedom from length cues. A raw-text strategy selecting the second-longest option, randomizing boundary ties, would score an expected 62.87% on the single-answer items against the printed keys. Test 5 also has a statistically unusual partial four-position association, although no exact repeating cycle was found.

Assessment area	Score
Answer-key correctness in reviewed content	8.5/10 — provisional
Explanation accuracy in reviewed content	7.0/10 — provisional
Item quality and distractors	4.0/10
Current PMI-ACP blueprint alignment	8.0/10 — domain totals match; task-level allocation unverified
Structural hygiene and assessment integrity	4.0/10

These are editorial readiness judgments, not measured whole-bank accuracy percentages or an arithmetic average.

Coverage: I processed all 720 records, 2,816 displayed options, and 720 explanations, including 4,354 literal within-item option-pair comparisons. Detailed review covered 292 systematically selected records—263 complete-choice items and all 29 incomplete interactive records—plus targeted follow-up. Selection used eight items from each test-domain combination, seed 410030, then added all multi-select records, all incomplete interactive records, and targeted exhibit/metric questions. All 52 select-two items were reviewed. Independent numerical work covered 29 item-level checks and quantitative checks on 17 supplied exhibits.

This was not independent source verification of every assertion in all 720 explanations or exhaustive semantic-equivalence checking of every prose option. The live application’s rendering, shuffling, scoring, and timing were not tested.

Release decision: PULL.

2. WRONG OR AMBIGUOUS KEYS
T1Q14 — The preferred answer assumes early releasable slices despite the stated integrated-launch constraint — D is not uniquely supported; C is defensible

The thermostat initiative explicitly requires one integrated launch about ten months away before revenue appears. Key D then requires sequencing that initiative into early releasable slices to test enrollment. The explanation uses those releases to dismiss C’s sensitivity analysis. 

pmi-acp

Testing enrollment assumptions early is a reasonable objective, but the item does not establish that early product releases are technically feasible. A demand experiment, prototype, or enrollment test is not necessarily a releasable slice of the integrated system.

Correct conclusion: either establish the feasibility of incremental releases or distinguish demand testing from product release. C is defensible under the explicit constraint; D cannot be treated as uniquely superior without additional information. This needs a premise correction, not an automatic letter substitution.

T6Q34 — Two options satisfy the stated Little’s Law target; the rationale invents overtime to reject one — A and C are mathematically valid

The current averages are 18 items and six completions per week. Both proposed alternatives produce two weeks:

A: 18/9=2,C: 12/6=2.

Key C reduces WIP while protecting throughput. That can be a defensible operational preference, but the explanation rejects A by asserting that its increased throughput comes from extended hours. Option A never says that. 

pmi-acp

Correct conclusion: A and C meet the formula. To make C uniquely intended, state the relevant capacity or intervention constraint rather than inventing it in the rationale.

T6Q93 provides the missing distinction explicitly: throughput capacity cannot increase in the available timeframe. Its WIP-reduction answer is therefore supported by a constraint absent from T6Q34. 

pmi-acp

T6Q57 — Payback timing and the cost of deferral are insufficiently specified — A requires qualification

Initiative X supposedly has a 30-month payback, but its benefits depend on a regulation taking effect in 36 months. Those statements need a common time origin or an explanation of other earlier cash flows. Key A additionally asserts that deferring X costs little, although no implementation lead time is provided. 

pmi-acp

The rationale goes further: a rule effective in 36 months supposedly means the work need not begin this quarter. That does not follow without knowing how long preparation takes.

Correct conclusion: A may remain preferable after clarification, but its full reasoning is not established. Specify cash-flow timing, benefit dependency, and readiness lead time. No existing alternative supplies a complete correction.

T4Q99 — “Under 1.5 weeks” is answered with exactly 1.5 weeks — C is directionally appropriate but imprecise

The intended calculation is:

12/8=1.5 weeks.

That is not strictly under 1.5 weeks. At an unchanged throughput of eight items per week, the strict target requires average WIP below 12. 

pmi-acp

Correct conclusion: retain C’s direction but reconcile the target and threshold. “About 12” does not precisely resolve the distinction. This is a wording/precision qualification, not a division error or a major blocker by itself.

Twenty-nine interactive keys cannot be independently validated from the export

These records provide matching instructions and explanations but omit the actual left/right elements and their correct pairings.

Test	Unverifiable interactive records
T1	T1Q18, T1Q112, T1Q114
T2	T2Q2, T2Q13, T2Q17, T2Q51, T2Q81
T3	T3Q23, T3Q37, T3Q49, T3Q66, T3Q85, T3Q111, T3Q115
T4	T4Q7, T4Q11, T4Q43, T4Q59, T4Q83
T5	T5Q27, T5Q62, T5Q68, T5Q69, T5Q115
T6	T6Q17, T6Q43, T6Q64, T6Q106

The first three tests’ incomplete records are documented in the source, as are the remaining three tests’. 

pmi-acp +1

For example, T1Q112 requests pairs such as 1-A, but neither numbered signals nor lettered interpretations appear. T6Q106 asks for distinctions between testing practices without supplying the matching elements. Their explanatory prose is not proof of the actual scoring configuration. 

pmi-acp +1

Correct keys: unverifiable as response mappings from the supplied file. Matching questions are legitimate; KEY: None is not automatically a live defect when another payload contains the mapping. That payload must be inspected before these records are counted as validated.

3. EXPLANATION ERRORS

Eleven distinct rationales require correction or qualification. Four accompany the Section 2 findings; seven additional explanations have the following defects.

Five explanations misdescribe an option or the supplied data
Item	Incorrect statement	Correct treatment
T1Q5 — key B retained	Describes the rejected alternative as asking the sponsor to rank deliverables.	Option C asks the two Product Owners to compare portfolio value. Explain that actual alternative.
T1Q98 — key B retained	Says A accepts all four capabilities into the first release and merely rearranges them.	A explicitly ships the highest-ranked capabilities first and defers the rest. Its weakness is marketing-led prioritization without validating the minimum need—not an all-at-once commitment.
T2Q93 — key D retained	Criticizes recording missing acceptance criteria as technical debt.	No option proposes that. C proposes writing criteria while coding starts.
T5Q16 — key D retained	Changes A’s aggregate health score into a ranking of teams, and B’s product-leadership decision into sponsor escalation.	Address the actual dashboard and authority described by those options.
T4Q112 — key A retained	Calls the development band stable.	It increases from 5 to 12 items. Testing still grows faster and reaches 22; the intended comparison survives without the false assertion.

The first four mismatches are directly visible between choices and rationales. 

pmi-acp

For T4Q112, the development queue is:

29−24=5in week 1,78−66=12in week 8.

Its complete sequence is 5, 6, 7, 8, 9, 10, 11, 12, not a stable band. The exhibit and explanation contradict each other on that point. 

pmi-acp +1

T4Q57 — Snapshot ratios are presented as observed historical average cycle times — C remains the intended best answer

The explanation divides end-week WIP by that week’s completions:

11/5=2.2,26/2=13,

then claims average cycle time has increased from roughly two to thirteen weeks. But the exhibit supplies weekly inventory snapshots and weekly output, not the matched averages or item-level start/finish observations necessary to establish those historical cycle times. 

pmi-acp +1

Little’s Law concerns appropriately defined averages; finite observation windows require care about time averages and boundary items. The arithmetic is correct, but the asserted measured result is unsupported. Report the growing review queue and declining completions without claiming that these two ratios establish actual average cycle times. 
Project Production Institute

T4Q110 — FIFO is incorrectly made a condition of Little’s Law — B remains the best supplied answer

The rationale says the law holds only with approximately first-in, first-out service. Little’s Law itself is independent of service order. FIFO can matter when translating a system average into a forecast for a particular request joining the back of a queue; those are different propositions. 

pmi-acp

 
Project Production Institute

Four associated qualifications

T1Q14 assumes feasible early releasable slices; T6Q34 invents overtime; T6Q57 assumes negligible cost of deferral without lead-time information; T4Q99 treats exactly 1.5 weeks as satisfying a strict “under” target. These are included in the eleven-rationale total, not counted again as additional items.

Count: five option/data misdescriptions + two metric/theorem qualifications + four associated premise/precision qualifications = eleven distinct explanations. This is not an exhaustive whole-bank factual-error count.

4. ITEM QUALITY
A. Length balancing has left a strong second-longest-answer pattern

Several items make the intended answer only slightly shorter than a distractor:

Item	Key	Option lengths A/B/C/D	Key’s length rank
T1Q10	D	239 / 209 / 229 / 232	Second
T1Q11	A	112 / 114 / 104 / 106	Second
T3Q45	B	182 / 199 / 200 / 181	Second
T5Q114	D	188 / 167 / 171 / 183	Second

The source choices support these measurements. 

pmi-acp +2

This does not prove that candidates can visually distinguish every one-character difference, nor establish how the pattern arose. It does establish a raw-text answer-construction bias. Replacing a longest-answer cue with a second-longest cue does not produce length-independent alternatives.

The select-two format has the opposite concentration: T1Q1, T1Q2, and T1Q7, among others, place the complete constructive actions in the two longest choices. Those three are examples of the 37/52 measured cases. 

pmi-acp +1

B. Several distractor explanations defeat alternatives by changing their premises

T1Q14, T6Q34, T1Q98, and T5Q16 illustrate the same underlying defect: the intended answer is supported by adding a favorable assumption or making a rival worse than its actual wording permits.

A situational question needs the deciding constraint in the stem or choices. A lengthy rationale cannot retroactively supply it.

C. Repeated scenarios reduce independence between tests
Items	Repeated assessment
T1Q2 / T2Q102 / T4Q39	Teams repeatedly solve integration problems independently; select a community of practice and direct cross-team sharing rather than centralized approvals or reporting.
T3Q79 / T4Q96	A sole knowledgeable engineer is approaching leave; distribute knowledge through pairing/mobbing rather than documentation-only handover or replacement hiring.

These are confirmed near-repeats, not an exhaustive duplicate count. Their organizational details differ, but the deciding competency and alternative structure are substantially alike. 

pmi-acp +3

The quantitative review likewise contains 18 applications of the WIP/throughput relationship. Repetition can support practice, but it should not be mistaken for eighteen distinct kinds of quantitative reasoning.

D. The bank should not be described as teaching “never escalate” or “always be hands-off”

T6Q13 supports evidence-based escalation when the team cannot remove an external constraint. T2Q75 supports temporarily stronger direction for a team lacking contextual knowledge, with an explicit transition toward autonomy. These are important counterexamples to a blanket characterization of the bank’s mindset. 

pmi-acp +1

The issue is inconsistent discrimination in particular questions—not that all situational leadership or escalation content is wrong.

E. Exhibit clarity and delivery association require verification

T1Q81’s exhibit assigns the executive-dashboard slice $60,000 of expected benefit while also stating “No measurable benefit identified.” Clarify whether that number is hypothetical, validated, or unsupported. The item’s ratio comparison should not silently treat an unsupported figure as equivalent evidence. This is an exhibit qualification, not an additional wrong-key finding. 

pmi-acp +1

There are 26 supplied exhibits and 25 questions explicitly referring to an exhibit. Text tables are present; they should not be classified as missing figures merely because no PNG is attached. What remains unverified is whether the live application correctly associates each question with its exhibit during navigation and shuffling.

5. BLUEPRINT COVERAGE
Reference: current posted PMI-ACP Examination Content Outline

The official document retains November 2024 on its title page and identifies March 2026 in its revision footers. It was checked for this audit on September 17, 2026. Its four domains are the basis of this assessment. 
Project Management Institute

Current domain	Official weight	All B41 records	Actual share	Difference
Mindset	28%	204	28.33%	+0.33 percentage points
Leadership	25%	180	25.00%	0.00
Product	19%	138	19.17%	+0.17
Delivery	28%	198	27.50%	−0.50
Total	100%	720	100%	

Every form contains 34 Mindset / 30 Leadership / 23 Product / 33 Delivery records. These differences are consistent with rounding to whole questions; there is no material aggregate weighting failure. The official weights are independently confirmed by PMI’s credential page. 
Project Management Institute

The evidence does not support labeling this a retired-seven-domain bank

This conclusion is based on both the metadata and reviewed content:

T3Q23/T5Q115 address complexity-based decision approaches; T1Q10 addresses privacy as part of value delivery; T4Q39 addresses cross-team knowledge sharing; and T6Q66 addresses tailoring under regulatory constraints. Those are substantive current-outline applications, not merely old questions relabeled with four new headings. 

pmi-acp +4

Overlapping agile topics do not establish retired-outline leakage. Conflict management, customer engagement, planning, and improvement remain relevant. The current outline also addresses organizational alignment and cross-team work, so the presence of program-level scenarios is not automatically PMP contamination. 
Project Management Institute

Section A’s domain totals exclude the 29 matching records
Domain	Section A: choice-bearing records	Omitted matching records	Complete total
Mindset	195	9	204
Leadership	173	7	180
Product	130	8	138
Delivery	193	5	198
Total	691	29	720

The reported totals are therefore incomplete for the whole bank, although they approximately preserve its relative weighting. The omitted records still carry domain tags. 

pmi-acp +1

Task-level breadth is not established by the four totals

The export contains domain labels but no auditable item-to-task/enabler mapping. The repeated knowledge-sharing decisions and repeated Little’s Law substitutions demonstrate why correct percentages alone do not establish balanced coverage within each domain.

T1Q14/T6Q57 also show that adding financial terminology does not establish sound value-based reasoning. NPV and IRR are within the current scope; the required correction is the reasoning and input sufficiency, not removing finance from the bank. 
Project Management Institute

I found no basis for declaring an entire reviewed framework family outside the current PMI-ACP scope. I have also not invented minimum counts for individual tools or techniques that PMI does not prescribe.

Format alignment

The current exam contains 120 questions—100 scored and 20 pretest—in three hours, with multiple-response, drag-and-drop, and exhibit formats. It has a ten-minute break after question 60 and review, after which earlier questions cannot be revisited. B41 matches the delivered question count, but its timing, section behavior, scored/pretest treatment, and interactive scoring remain unverified. 
Project Management Institute

The 29 KEY: None records must not be assumed to be intentional pretest questions.

6. STRUCTURAL CHECK
Section A: independently verified results
Check	Result
Records / tests	720 / 6, each with 120
IDs and numbering	Unique; Q1–Q120 complete in every test
Displayed options	2,816
Formats	639 four-option single-answer; 52 five-option select-two; 29 incomplete matching records
Invalid keys among choice-bearing records	0
Section A’s 52 “invalid keys”	False positives from applying a single-letter rule to answer sets
Select-two instructions	All 52 explicitly require two choices
Exact whitespace-normalized duplicate stems	0
Literal duplicate option pairs	0 across 4,354 comparisons
Missing explanations / explanations under 40 characters	0 / 0
Explanation length	553 minimum; 943 median; 1,580 maximum characters
Exact duplicate explanations	0
True uninterrupted same-letter runs of four or more	5, not the nine reported entries
Declared image references	0; text exhibits are supplied separately

Section A’s format counts reproduce, but its answer-set validation and run calculation need correction. 

pmi-acp

The 52 multi-select keys are internally valid: each contains two distinct letters that exist among its five choices. E is genuinely used—21 correct appearances—rather than functioning as an automatically wrong fifth option. This is syntax and placement validation, not a claim that every prose choice has been exhaustively fact-checked.

The lengthy explanations provide room for distractor analysis, but T1Q98/T5Q16 show that length does not guarantee fidelity to the options. Exact-stem uniqueness similarly does not establish independence between forms.

Longest-option cue

Measurements use whitespace-normalized source characters, excluding labels, not rendered width.

Measurement	Result
Single-answer key strictly longest	60/639 — 9.39%
Key tied for or uniquely longest	69/639 — 10.80%
Single-answer items with one uniquely longest option	617
Key is that uniquely longest option	60/617 — 9.72%
Uniquely longest option is a distractor	557/617 — 90.28%
Ties for maximum length	22
All four options equal in length	1
Key strictly longest by word count	73/639 — 11.42%

A longest-option strategy with random tie handling would score an expected 10.00% against the printed single-answer keys.

Second-longest and multiple-response cues
Measurement	Result
Single-answer key uniquely second-longest	382/639 — 59.78%
Items possessing a uniquely second-longest option	579
Key is that option, among those 579	382/579 — 65.98%
Expected score from selecting the second-length position, randomizing boundary ties	401.75/639 — 62.87%
Select-two items answered correctly by choosing the two longest options	37/52 — 71.15%

“Uniquely second-longest” means one option is strictly longer and two are strictly shorter. The tie-adjusted strategy selects the length occupying second place when the four lengths are sorted, then chooses randomly among options at that length.

These are content-blind raw-text measurements, not observed candidate scores or official PMI-ACP passing probabilities.

Per-test length and cycle results

Four-letter templates were tested against original question positions. Multiple-response and keyless positions were not deleted to shift subsequent answers.

Test	Single-answer items	Uniquely longest key	Uniquely second-longest key	Best four-letter fit across all 120 positions	Maximum same-letter run
T1	106	13 — 12.26%	58 — 54.72%	DBAC: 35/120 — 29.17%	3
T2	105	12 — 11.43%	64 — 60.95%	DABC: 36/120 — 30.00%	4
T3	107	8 — 7.48%	62 — 57.94%	ABDC: 36/120 — 30.00%	5
T4	106	9 — 8.49%	66 — 62.26%	BADC: 33/120 — 27.50%	5
T5	107	13 — 12.15%	68 — 63.55%	CDBA: 45/120 — 37.50%; review flag	3
T6	108	5 — 4.63%	64 — 59.26%	BCAD: 34/120 — 28.33%	5

No exact whole-test cycle of periods 1–60 was found. No nonconstant local period of 2–6 persisted for at least 12 consecutive single-answer items and three repetitions.

Test 5 nevertheless has an unusual partial association. Its CDBA template matches 45/107 eligible single-answer positions, or 45/120 when all positions are retained in the denominator. In 200,000 random permutations preserving Test 5’s exact letter totals and all non-single-answer positions, and searching all 24 templates each time, 479 trials produced a fit at least that high.

The estimated probability is approximately 0.0024, or 0.0144 after a conservative six-form adjustment for this template screen. That warrants reviewing the placement process; it is not proof of a deterministic cycle or deliberate manipulation.

Same-letter run reporting

The five genuine runs are:

T2Q38–Q41 B×4; T3Q68–Q72 C×5; T4Q90–Q94 B×5; T6Q86–Q90 C×5; T6Q112–Q115 D×4.

Section A’s four additional entries improperly bridge another format:

Reported entry	Intervening record that breaks the run
T1Q44 C×4	T1Q43, select-two B,E
T2Q104 C×5	T2Q102, select-two A,E
T3Q26 C×5	T3Q23, keyless matching
T4Q62 A×4	T4Q59, keyless matching

The intervening records and subsequent keys are visible in the source. 

pmi-acp +3

The aggregate A158/B180/C179/D122 distribution describes the 639 single-answer items, not all 720 records. D’s lower frequency is not independently a release blocker. Natural same-letter runs should not be artificially removed.

Runtime limitation: delivery-time randomization could disrupt positional associations. It would not remove option-length cues and must preserve multi-select sets, matching pairs, exhibit links, and rationale references.

The 
B41 audit evidence ledger contains all item-level measurements, reviewed IDs, quantitative checks, missing-payload IDs, key sequences, the Test 5 randomization analysis, sources, and limitations.

7. TOP FIXES

Export and validate all 29 interactive payloads. Start with T1Q18/T1Q112/T6Q106. Verify both matching lists, correct pairings, scoring, and delivered display before counting those records as validated.

Remove the second-longest-answer and two-longest-pair biases. Review T1Q10/T1Q11/T3Q45/T5Q114 and all 52 select-two items. Do not merely shift correct answers from one predictable length rank to another.

Repair the unsupported economic premises. Clarify release feasibility in T1Q14 and cash-flow timing/readiness lead time in T6Q57. Make the deciding evidence available before the learner answers.

Resolve T6Q34’s ambiguity without inventing overtime. Both A and C satisfy the numerical target. Specify the operational constraint; use T6Q93 as an internal comparison.

Correct the four option-description mismatches. Repair T1Q5, T1Q98, T2Q93, and T5Q16 so each rationale evaluates the actual displayed alternative.

Correct the flow-metric teaching. Fix T4Q112’s development-band statement, T4Q57’s unsupported cycle-time inference, T4Q110’s FIFO condition, and T4Q99’s strict-target wording.

Retain the current four-domain allocation, but add task/enabler mapping. For T1–T6, distinguish domain counts from verified competency coverage. Do not replace the current structure with the retired seven-domain outline.

Investigate Test 5’s partial CDBA association and repair format-aware diagnostics. Review T5Q1–T5Q120, and ensure records such as T1Q43/T2Q102/T3Q23/T4Q59 break single-letter run calculations.

Reduce repeated decisions and clarify exhibit evidence. Address T1Q2/T2Q102/T4Q39, T3Q79/T4Q96, and T1Q81’s inconsistent benefit labeling. Preserve contextual exceptions such as T2Q75/T6Q13.

Validate the assembled assessment workflow before restoring readiness claims. For T1–T6, test the 120-item delivery, timing, section break, exhibit associations, multi-select scoring, and final option-to-rationale consistency—not only isolated corrected questions.

8. SUMMARY ROW

| B41 — PMI-ACP Exam Prep | 6.0/10 | 4 key/stem qualifications; 29 interactive mappings unverifiable from export | 11 corrections/qualifications; reviewed findings, not exhaustive | PULL | Current four-domain ECO, not retired seven; 59.78% uniquely second-longest cue, 71.15% two-longest multi-select cue, and T5 partial CDBA association. |