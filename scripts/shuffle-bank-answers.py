#!/usr/bin/env python3
"""Break learnable answer-key patterns in an online question bank.

The bank generators placed the correct option by rotating through a fixed
sequence, so a test-taker could infer answers from position alone (the Adult
CCRN bank ran a B-A-D-C cycle at up to 100% per test). This script reshuffles
each question's choices with a deterministic, seeded shuffle and rewrites the
answer letter to match, leaving natural runs of repeated letters in place.

Questions whose explanation refers to an option by letter are left untouched,
because shuffling them would make the explanation wrong.

Usage:  python3 scripts/shuffle-bank-answers.py data/ccrn.json [--check]
"""
import json, re, sys, itertools, collections, hashlib

LETTERS = "ABCD"
LETTER_REF = re.compile(r"\b(?:option|choice|answer|distractor)s?\s+[A-D]\b|\(\s*[A-D]\s*\)|\b[A-D]\)\s")
# Parenthesised references only -- "(A)", "(A, D)". With --remap-letters these are
# rewritten through the same permutation as the choices, so the item can be shuffled
# instead of skipped. Word forms ("option C") are NOT remapped: a bank containing them
# still skips those items, because rewriting prose is not a mechanical change.
PAREN_REF = re.compile(r"\(\s*([A-D](?:\s*,\s*[A-D])*)\s*\)")
WORD_REF = re.compile(r"\b(?:option|choice|answer|distractor)s?\s+[A-D]\b")


def remap_explanation(text, order):
    """Rewrite parenthesised option letters through `order` (new index -> old index)."""
    new_of_old = {old: LETTERS[new] for new, old in enumerate(order)}
    def sub(m):
        letters = [c for c in m.group(1) if c in LETTERS]
        return "(" + ", ".join(new_of_old[LETTERS.index(c)] for c in letters) + ")"
    return PAREN_REF.sub(sub, text)

def rng_order(seed_text, n):
    """Deterministic Fisher-Yates order from a text seed."""
    h = hashlib.sha256(seed_text.encode("utf-8")).digest()
    idx = list(range(n))
    pos = 0
    for i in range(n - 1, 0, -1):
        if pos >= len(h):
            h += hashlib.sha256(h).digest()
        j = h[pos] % (i + 1)
        pos += 1
        idx[i], idx[j] = idx[j], idx[i]
    return idx

def stats(letters):
    counts = collections.Counter(letters)
    adj = sum(1 for i in range(1, len(letters)) if letters[i] == letters[i - 1])
    run = best_run = 1
    for i in range(1, len(letters)):
        if letters[i] == letters[i - 1]:
            run += 1; best_run = max(best_run, run)
        else:
            run = 1
    cycle = max(sum(1 for i, l in enumerate(letters) if l == c[i % 4]) / len(letters)
                for c in itertools.permutations(LETTERS))
    return counts, adj, best_run, cycle

def report(path, data):
    print(f"{path}")
    for t in data["tests"]:
        letters = [q["answer"] for q in t.get("questions", []) if q.get("choices")]
        if not letters:
            continue
        counts, adj, best_run, cycle = stats(letters)
        pct = {k: f"{100*counts[k]/len(letters):.0f}%" for k in LETTERS}
        flag = "  <-- PATTERN" if cycle > 0.35 else ""
        print(f"  test {t.get('testNum')}: {len(letters)} items {pct} adjacent {adj} longest run {best_run} best cycle {100*cycle:.1f}%{flag}")

def main():
    path = sys.argv[1]
    check_only = "--check" in sys.argv
    remap = "--remap-letters" in sys.argv
    data = json.load(open(path))
    if check_only:
        report(path, data)
        return
    changed = skipped = 0
    for t in data["tests"]:
        items = [q for q in t.get("questions", [])
                 if q.get("choices") and len(q["choices"]) == 4 and q.get("answer") in LETTERS]
        if remap:
            # Only prose ("option C") still forces a skip; parenthesised refs get remapped.
            skippable = [q for q in items if WORD_REF.search(q.get("explanation", ""))]
        else:
            skippable = [q for q in items if LETTER_REF.search(q.get("explanation", ""))]
        skipped += len(skippable)
        shufflable = [q for q in items if q not in skippable]
        # Try successive salts until the resulting key looks like chance rather than
        # a cycle, and has no absurd run. The salt only picks WHICH random shuffle is
        # used; it never nudges individual questions, so natural short runs survive.
        original = [(q, list(q["choices"]), q["answer"], q.get("explanation", "")) for q in shufflable]
        for salt in range(2000):
            letters = []
            for q, ch, ans, expl in original:
                correct = LETTERS.index(ans)
                order = rng_order(f'{t.get("testNum")}|s{salt}|{q.get("num")}|{q["question"]}', 4)
                q["choices"] = [ch[i] for i in order]
                q["answer"] = LETTERS[order.index(correct)]
                if remap:
                    q["explanation"] = remap_explanation(expl, order)
                letters.append(q["answer"])
            counts, adj, best_run, cycle = stats(letters)
            spread = max(counts.values()) / len(letters)
            if cycle <= 0.33 and best_run <= 5 and spread <= 0.30:
                break
        changed += len(shufflable)
    json.dump(data, open(path, "w"), ensure_ascii=False, separators=(",", ":"))
    note = "whose explanation names an option letter in prose" if remap else "whose explanation names an option letter"
    print(f"shuffled {changed} questions, skipped {skipped} {note}")
    report(path, data)

main()
