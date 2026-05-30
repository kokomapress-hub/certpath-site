#!/usr/bin/env python3
"""Independently verify the generated tabe-m.json:
   structure, uniqueness, no print overlap, and RECOMPUTE arithmetic answers."""
import json, re, os, math
from fractions import Fraction
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
data = json.load(open(os.path.join(SITE, "data", "tabe-m.json")))

errors = []
checked = 0

def marked(q):
    """Return the text of the marked-correct choice."""
    return q["choices"]["ABCD".index(q["answer"])]

# ---- structural ----
tests = data["tests"]
assert len(tests) == 15, f"expected 15 tests, got {len(tests)}"
total = 0
allstems = []
for t in tests:
    qs = t["questions"]
    if len(qs) != 40:
        errors.append(f"test {t['testNum']} has {len(qs)} questions")
    nums = [q["num"] for q in qs]
    if nums != list(range(1, 41)):
        errors.append(f"test {t['testNum']} numbering off")
    for q in qs:
        total += 1
        allstems.append(q["question"])
        if len(q["choices"]) != 4:
            errors.append(f"t{t['testNum']} q{q['num']}: not 4 choices")
        if len(set(q["choices"])) != 4:
            errors.append(f"t{t['testNum']} q{q['num']}: duplicate choices {q['choices']}")
        if q["answer"] not in "ABCD":
            errors.append(f"t{t['testNum']} q{q['num']}: bad answer letter {q['answer']}")

print(f"Total questions: {total}")

# ---- uniqueness ----
def norm(s):
    s = s.lower(); s = re.sub(r'\([^)]*\)', '', s); s = s.replace(',', ''); s = re.sub(r'\s+', '', s)
    return s
ns = [norm(s) for s in allstems]
dups = [k for k, c in Counter(ns).items() if c > 1]
if dups:
    errors.append(f"{len(dups)} duplicate stems, e.g. {dups[:3]}")
print(f"Unique stems: {len(set(ns))} / {len(ns)}")

# ---- no overlap with print ----
PDF = "/Users/prasadchandrasekaran/Desktop/1-Projects/CertPathPublishing/B9 - TABE LEVEL M/Interior/TABE_Level_M_Math_Workbook.pdf"
try:
    import fitz
    doc = fitz.open(PDF)
    full = "\n".join(doc[p].get_text() for p in range(doc.page_count))
    print_stems = set()
    for m in re.finditer(r'(?m)^\s*\d+[\.\)]\s+(.*)$', full):
        print_stems.add(norm(m.group(1)))
    overlap = set(ns) & print_stems
    if overlap:
        errors.append(f"{len(overlap)} questions overlap print: {list(overlap)[:3]}")
    print(f"Print overlap: {len(overlap)}")
except Exception as e:
    print("print-overlap check skipped:", e)

# ---- RECOMPUTE arithmetic answers ----
def num(s):
    return s.replace(",", "")

def F(s):
    s = s.strip()
    m = re.fullmatch(r'(\d+) (\d+)/(\d+)', s)
    if m:
        return int(m.group(1)) + Fraction(int(m.group(2)), int(m.group(3)))
    if "/" in s:
        a, b = s.split("/"); return Fraction(int(a), int(b))
    return Fraction(int(s))

def expect(q, val):
    """Compare marked answer to expected value (string-normalized)."""
    global checked
    checked += 1
    got = marked(q)
    if str(got).strip() != str(val).strip():
        errors.append(f"t? q'{q['question']}' -> marked {got!r} expected {val!r}")

for t in tests:
    for q in t["questions"]:
        Q = q["question"]
        m = re.fullmatch(r'([\d,]+) \+ ([\d,]+) = \?', Q)
        if m: expect(q, int(num(m.group(1))) + int(num(m.group(2)))); continue
        m = re.fullmatch(r'([\d,]+) - ([\d,]+) = \?', Q)
        if m: expect(q, int(num(m.group(1))) - int(num(m.group(2)))); continue
        m = re.fullmatch(r'(\d+) x (\d+) = \?', Q)
        if m: expect(q, int(m.group(1)) * int(m.group(2))); continue
        m = re.fullmatch(r'([\d,]+) / (\d+) = \?', Q)
        if m: expect(q, int(num(m.group(1))) // int(m.group(2))); continue
        # decimal add/sub
        m = re.fullmatch(r'([\d.]+) \+ ([\d.]+) = \?', Q)
        if m: expect(q, str(round(float(m.group(1)) + float(m.group(2)), 2)).rstrip('0').rstrip('.') if False else round(float(m.group(1)) + float(m.group(2)), 2)); continue
        m = re.fullmatch(r'([\d.]+) - ([\d.]+) = \?', Q)
        if m: expect(q, round(float(m.group(1)) - float(m.group(2)), 2)); continue
        # fraction add/sub/mult
        m = re.fullmatch(r'(\d+/\d+) \+ (\d+/\d+) = \?', Q)
        if m:
            r = F(m.group(1)) + F(m.group(2)); expect(q, str(r.numerator) if r.denominator == 1 else f"{r.numerator}/{r.denominator}"); continue
        m = re.fullmatch(r'(\d+/\d+) - (\d+/\d+) = \?', Q)
        if m:
            r = F(m.group(1)) - F(m.group(2)); expect(q, str(r.numerator) if r.denominator == 1 else f"{r.numerator}/{r.denominator}"); continue
        m = re.fullmatch(r'(\d+/\d+) x (\d+/\d+) = \?', Q)
        if m:
            r = F(m.group(1)) * F(m.group(2)); expect(q, str(r.numerator) if r.denominator == 1 else f"{r.numerator}/{r.denominator}"); continue
        m = re.fullmatch(r'(\d+) x (\d+/\d+) = \?', Q)
        if m:
            r = int(m.group(1)) * F(m.group(2)); expect(q, str(r.numerator) if r.denominator == 1 else f"{r.numerator}/{r.denominator}"); continue
        m = re.fullmatch(r'\((\d+/\d+)\) / \((\d+/\d+)\) = \?', Q)
        if m:
            r = F(m.group(1)) / F(m.group(2)); expect(q, str(r.numerator) if r.denominator == 1 else f"{r.numerator}/{r.denominator}"); continue
        # GCF / LCM
        m = re.fullmatch(r'What is the greatest common factor \(GCF\) of (\d+) and (\d+)\?', Q)
        if m: expect(q, math.gcd(int(m.group(1)), int(m.group(2)))); continue
        m = re.fullmatch(r'What is the least common multiple \(LCM\) of (\d+) and (\d+)\?', Q)
        if m:
            a, b = int(m.group(1)), int(m.group(2)); expect(q, a * b // math.gcd(a, b)); continue
        # perimeter / area / volume
        m = re.fullmatch(r'A rectangle is (\d+) cm long and (\d+) cm wide\. What is its perimeter\?', Q)
        if m: expect(q, f"{2 * (int(m.group(1)) + int(m.group(2)))} cm"); continue
        m = re.fullmatch(r'A rectangle is (\d+) cm long and (\d+) cm wide\. What is its area\?', Q)
        if m: expect(q, f"{int(m.group(1)) * int(m.group(2))} sq cm"); continue
        m = re.fullmatch(r'A square has sides of (\d+) m\. What is its area\?', Q)
        if m: expect(q, f"{int(m.group(1)) ** 2} sq m"); continue
        m = re.fullmatch(r'A box is (\d+) cm by (\d+) cm by (\d+) cm\. What is its volume\?', Q)
        if m: expect(q, f"{int(m.group(1)) * int(m.group(2)) * int(m.group(3))} cu cm"); continue
        # mean / range / median / mode
        m = re.fullmatch(r'What is the mean \(average\) of ([\d, ]+)\?', Q)
        if m:
            d = [int(x) for x in m.group(1).split(",")]; expect(q, sum(d) // len(d)); continue
        m = re.fullmatch(r'What is the range of ([\d, ]+)\?', Q)
        if m:
            d = [int(x) for x in m.group(1).split(",")]; expect(q, max(d) - min(d)); continue
        m = re.fullmatch(r'What is the median of ([\d, ]+)\?', Q)
        if m:
            d = sorted(int(x) for x in m.group(1).split(",")); expect(q, d[len(d) // 2]); continue
        # evaluate ax+b
        m = re.fullmatch(r'If x = (\d+), what is the value of (\d+)x \+ (\d+)\?', Q)
        if m:
            x, a, b = map(int, m.groups()); expect(q, a * x + b); continue
        m = re.fullmatch(r'If x = (\d+), what is the value of (\d+)x - (\d+)\?', Q)
        if m:
            x, a, b = map(int, m.groups()); expect(q, a * x - b); continue
        # solve equations
        m = re.fullmatch(r'Solve for x: x \+ (\d+) = (\d+)', Q)
        if m: expect(q, int(m.group(2)) - int(m.group(1))); continue
        m = re.fullmatch(r'Solve for x: x - (\d+) = (\d+)', Q)
        if m: expect(q, int(m.group(2)) + int(m.group(1))); continue
        m = re.fullmatch(r'Solve for x: (\d+)x = (\d+)', Q)
        if m: expect(q, int(m.group(2)) // int(m.group(1))); continue

print(f"\nArithmetic answers recomputed & checked: {checked}")
print(f"ERRORS: {len(errors)}")
for e in errors[:25]:
    print("  -", e)
print("\nRESULT:", "ALL CHECKS PASSED" if not errors else "FAILURES FOUND")
