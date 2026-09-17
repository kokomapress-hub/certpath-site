# Cross-bank answer-cue analysis — all 30 published online question banks

**Date:** 2026-09-16 · **Method:** deterministic script (`pattern_check.py`) run locally against `data/*.json`, not an LLM judgement. Reproducible.

Two test-taking shortcuts were checked on every bank:

1. **Repeating answer-key cycle** — the best-matching repeating 4-letter template (all permutations × offsets), per test and per bank.
2. **Longest-option cue** — how often the keyed answer is the single longest choice by character count ("tie%" = keyed answer ties for longest).

```
book                       n  cycle       cycle%  longest%  tie%  worst test
--------------------------------------------------------------------------------
B1 cast                  330  B-D-C-A      27.6%     36.4% 26.1%  T3 B-C-A-D 35%
B2 mech-apt              180  D-A-B-C      29.4%     19.4% 22.8%  T2 D-B-A-C 35%
B3 journeyman-elec       180  B-D-A-C      31.1%     17.8% 49.4%  T1 B-D-A-C 33%
B4 poss                  180  B-C-A-D      30.0%     27.2% 35.0%  T3 B-D-A-C 38%
B5 csp                   180  A-B-D-C      28.9%     63.9% 11.1%  T2 B-A-D-C 37%
B6 chst                  180  C-B-A-D      31.1%     63.3% 13.9%  T2 A-B-C-D 42%
B7 tabe-a               1000  D-A-B-C      27.4%      2.8% 66.5%  T16 B-C-D-A 50%
B8 tabe-d                650  B-A-C-D      27.4%      2.9% 72.2%  T1 D-B-A-C 46%
B9 tabe-m                600  C-B-D-A      28.7%      1.3% 62.5%  T4 B-D-A-C 42%
B10 tabe-e               490  B-A-C-D      28.6%      4.3% 70.2%  T9 B-A-C-D 49%
B11 sat-math            1540  D-A-B-C      26.6%      4.8% 44.9%  T17 A-C-B-D 52%
B12 psat-math           1540  A-B-C-D      27.7%      4.2% 46.5%  T15 A-B-C-D 50%
B13 act-math            1530  D-A-B-C      26.3%      5.4% 52.7%  T13 C-A-B-D 44%
B14 ged-math            1518  C-B-D-A      27.2%      3.9% 49.7%  T11 C-B-D-A 46%
B15 ccrn                 750  C-A-B-D      28.1%     90.5%  1.6%  T2 A-D-C-B 33%
B16 sat-math-workbook   1584  D-B-A-C      27.0%      4.9% 49.2%  T35 A-C-D-B 48%
B17 psat-math-workbook  1584  D-B-C-A      26.4%      5.7% 45.3%  T6 C-D-B-A 48%
B18 act-math-workbook   1540  D-C-A-B      28.3%      4.1% 44.2%  T9 A-C-D-B 45%
B19 ged-math-workbook   1540  A-D-B-C      27.3%      4.1% 46.6%  T10 A-D-B-C 48%
B20 psat-math-tests     1584  A-C-D-B      28.0%      5.4% 48.5%  T16 B-A-C-D 43%
B21 act-math-tests      1584  D-A-B-C      25.7%      4.5% 48.4%  T12 A-B-D-C 45%
B22 ged-math-tests      1584  B-D-C-A      27.4%      4.6% 50.0%  T14 D-B-C-A 48%
B23 sat-math-tests      1540  A-D-C-B      26.9%      4.8% 48.2%  T18 A-D-C-B 55%
B27 cmsrn                450  B-A-C-D      29.8%     71.6%  2.7%  T1 B-A-C-D 38%
B25 cap                 1500  A-B-C-D      41.0%     74.9%  4.3%  T7 A-B-C-D 73%
B26 cnor                1500  A-D-C-B      27.7%     82.8%  1.8%  T9 C-D-A-B 79%
B24 asvab-math          1520  A-C-B-D      27.0%      3.6% 59.5%  T33 A-D-B-C 43%
B28 pmp                  720  A, D-A, C-A, B-A    7.9%     48.8%  7.5%  T1 B-C-D-A 47%
B41 pmi-acp              691  A,D-A,E-A-A,C    7.8%      8.3%  1.2%  T3 B,E-A-B-C 25%
B33 capm                 725  B-A,C-A,D-A   15.3%     41.7%  6.4%  T5 A,B-A-A,D-B 18%
```

## What this means

### The longest-answer cue is real and severe in the certification banks

| Bank | Keyed answer is the longest option |
|---|---|
| B15 CCRN | **90.5%** |
| B26 CNOR | **82.8%** |
| B25 CAP | **74.9%** |
| B27 CMSRN | **71.6%** |
| B5 CSP | **63.9%** |
| B6 CHST | **63.3%** |
| B28 PMP | 48.8% |
| B33 CAPM | 41.7% |

A candidate who simply picks the longest option scores far above chance (25%) on these banks without reading the stem. The math banks are clean on this measure (1-6%), because their options are numeric.

### CORRECTION — the four-letter key cycle is real, and CCRN was already fixed

An earlier draft of this file said the B15 cycle finding "does not reproduce." That was wrong, and the reason matters: `data/ccrn.json` had **already been repaired** by commit `9eb82a9` ("CCRN online bank (B15): break the B-A-D-C answer-key cycle", 2026-09-16 17:48) before this check ran. The audit found the defect in the shipped bank; the fix reshuffled every question's choices with a seeded shuffle and rewrote the answer letters. Measuring the post-fix file naturally returned chance level.

The cycle is still live in other banks. Worst single test per bank:

| Bank | Worst test | Best-fitting 4-letter cycle |
|---|---|---|
| B26 CNOR | Test 9 (150 items) | **79%** |
| B25 CAP | Test 7 (150 items) | **73%** |
| B23 SAT Math Tests | Test 18 (44 items) | 55% |
| B11 Digital SAT Math | Test 17 (44 items) | 52% |
| B7 TABE Level A | Test 16 (50 items) | 50% |
| B12 Digital PSAT Math | Test 15 (44 items) | 50% |
| B28 PMP | Test 1 (180 items) | 47% |

Read the small tests (44-50 items) with care: taking the best of 24 permutations on 44 items lands near 35-40% by chance alone, so only the large-sample results — CNOR 79% and CAP 73% on 150-item tests — are unambiguous. The remedy already exists: `scripts/shuffle-bank-answers.py <bank.json>` reshuffles choices deterministically, skips any question whose explanation names an option by letter, and prints the before/after distribution.

### Ties matter in the math banks

The TABE banks show very high tie rates (B8 72.2%, B10 70.2%, B7 66.5%), i.e. the keyed numeric answer is frequently among the longest strings. Weaker than a sole-longest cue, but still a length signal worth flattening.
