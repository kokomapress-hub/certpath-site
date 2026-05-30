#!/usr/bin/env python3
"""
Generate 600 unique, blueprint-faithful TABE 11&12 Level M math questions
for the online exam simulator (15 tests x 40 questions).

- Every answer is COMPUTED in Python (no hallucinated keys).
- No question duplicates the 284 print questions (PDF avoid-set).
- No two generated questions share a normalized stem.
- Per-test blueprint distribution mirrors the official Level M weighting.

Output: certpath-site/data/tabe-m.json  (tests rebuilt)
"""
import json, re, random, os
from fractions import Fraction

rng = random.Random(20260530)  # fixed seed -> reproducible

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
DATA = os.path.join(SITE, "data", "tabe-m.json")
PDF = "/Users/prasadchandrasekaran/Desktop/1-Projects/CertPathPublishing/B9 - TABE LEVEL M/Interior/TABE_Level_M_Math_Workbook.pdf"

# ----------------------------------------------------------------------------
# Avoid-set: normalized stems of all 284 print questions
# ----------------------------------------------------------------------------
def norm(s):
    s = s.lower()
    s = re.sub(r'\([^)]*\)', '', s)          # drop "(Place value)" style tags
    s = s.replace(',', '')
    s = re.sub(r'\s+', '', s)                 # remove whitespace
    return s

PRINT_STEMS = set()
try:
    import fitz
    doc = fitz.open(PDF)
    full = "\n".join(doc[p].get_text() for p in range(doc.page_count))
    for m in re.finditer(r'(?m)^\s*\d+[\.\)]\s+(.*)$', full):
        PRINT_STEMS.add(norm(m.group(1)))
    print(f"Loaded {len(PRINT_STEMS)} print stems to avoid")
except Exception as e:
    print("WARN: could not load PDF avoid-set:", e)

SEEN = set()  # normalized stems already generated

def fresh(question):
    k = norm(question)
    if k in PRINT_STEMS or k in SEEN:
        return False
    SEEN.add(k)
    return True

# ----------------------------------------------------------------------------
# Multiple-choice assembler
# ----------------------------------------------------------------------------
def pad_value(correct, i):
    s = str(correct)
    if re.fullmatch(r'-?\d+', s):
        return str(int(s) + i)
    if re.fullmatch(r'-?\d*\.\d+', s):
        return str(round(float(s) + i * 0.1, 2))
    m = re.fullmatch(r'(\d+)/(\d+)', s)
    if m:
        return f"{int(m.group(1)) + i}/{m.group(2)}"
    m = re.fullmatch(r'(\d+) (\d+)/(\d+)', s)
    if m:
        return f"{int(m.group(1)) + i} {m.group(2)}/{m.group(3)}"
    m = re.fullmatch(r'(-?\d+(?:\.\d+)?)(.*)', s)   # "24 sq cm" -> bump number
    if m:
        num = m.group(1)
        newnum = str(int(num) + i) if re.fullmatch(r'-?\d+', num) else str(round(float(num) + i, 2))
        return newnum + m.group(2)
    return s + (" " * i) + "*"

def mc(question, correct, distractors, explanation):
    correct = str(correct)
    pool = []
    for d in distractors:
        d = str(d)
        if d != correct and d not in pool:
            pool.append(d)
    i = 1
    while len(pool) < 3:
        cand = pad_value(correct, i)
        if cand != correct and cand not in pool:
            pool.append(cand)
        i += 1
        if i > 50:
            cand = correct + "#" * (len(pool) + 1)
            pool.append(cand)
    choices = [correct] + pool[:3]
    rng.shuffle(choices)
    ans = "ABCD"[choices.index(correct)]
    return {"question": question, "choices": choices, "answer": ans, "explanation": explanation}

# Fraction formatting helpers
def fr(f):
    f = Fraction(f)
    if f.denominator == 1:
        return str(f.numerator)
    return f"{f.numerator}/{f.denominator}"

def mixed(f):
    f = Fraction(f)
    if f.denominator == 1:
        return str(f.numerator)
    w = f.numerator // f.denominator
    r = f - w
    if w == 0:
        return f"{r.numerator}/{r.denominator}"
    return f"{w} {r.numerator}/{r.denominator}"

# ----------------------------------------------------------------------------
# Domain generators. Each returns a question dict (or None to retry).
# ----------------------------------------------------------------------------

# ---------- FRACTIONS ----------
def f_simplify():
    base = Fraction(rng.randint(1, 8), rng.randint(2, 9))
    k = rng.randint(2, 6)
    n, d = base.numerator * k, base.denominator * k
    correct = fr(base)
    q = f"Simplify {n}/{d} to lowest terms."
    dists = [f"{n}/{d}", fr(Fraction(n, d) if False else base * k / k)]  # placeholder
    dists = [f"{n//2}/{d//2}" if n % 2 == 0 and d % 2 == 0 else f"{n}/{d}",
             f"{base.numerator + 1}/{base.denominator}",
             f"{base.numerator}/{base.denominator + 1}"]
    return mc(q, correct, dists, f"GCF of {n} and {d} is {k}; {n}/{d} = {correct}.")

def f_equiv():
    num = rng.randint(1, 6); den = rng.randint(num + 1, 9)
    k = rng.randint(2, 6)
    tn, td = num * k, den * k
    q = f"Build an equivalent fraction for {num}/{den} with denominator {td}."
    correct = f"{tn}/{td}"
    dists = [f"{num + k}/{td}", f"{tn}/{td + 1}", f"{num}/{td}"]
    return mc(q, correct, dists, f"Multiply top and bottom by {k}: {num}/{den} = {tn}/{td}.")

def f_compare():
    while True:
        a = Fraction(rng.randint(1, 8), rng.randint(2, 9))
        b = Fraction(rng.randint(1, 8), rng.randint(2, 9))
        if a != b:
            break
    bigger = a if a > b else b
    q = f"Which fraction is greater: {fr(a)} or {fr(b)}?"
    correct = fr(bigger)
    smaller = fr(b if bigger == a else a)
    dists = [smaller, "They are equal", f"{bigger.numerator}/{bigger.denominator + 2}"]
    return mc(q, correct, dists, f"Common denominator shows {fr(bigger)} > {smaller}.")

def f_improper_to_mixed():
    w = rng.randint(1, 6); den = rng.randint(2, 9); r = rng.randint(1, den - 1)
    n = w * den + r
    q = f"Convert {n}/{den} to a mixed number."
    correct = f"{w} {r}/{den}"
    dists = [f"{w + 1} {r}/{den}", f"{w} {r - 1 if r > 1 else r + 1}/{den}", f"{r}/{den}"]
    return mc(q, correct, dists, f"{n} / {den} = {w} remainder {r}, so {w} {r}/{den}.")

def f_mixed_to_improper():
    w = rng.randint(1, 6); den = rng.randint(2, 9); r = rng.randint(1, den - 1)
    n = w * den + r
    q = f"Convert {w} {r}/{den} to an improper fraction."
    correct = f"{n}/{den}"
    dists = [f"{w + r}/{den}", f"{n}/{den + 1}", f"{w * r}/{den}"]
    return mc(q, correct, dists, f"{w} x {den} + {r} = {n}, so {n}/{den}.")

def f_add():
    a = Fraction(1, rng.randint(2, 6)); b = Fraction(1, rng.randint(2, 6))
    s = a + b
    q = f"{fr(a)} + {fr(b)} = ?"
    correct = fr(s)
    wrong = f"{a.numerator + b.numerator}/{a.denominator + b.denominator}"
    dists = [wrong, fr(a + b + Fraction(1, 12)) if (a + b).denominator else correct, fr(abs(a - b))]
    return mc(q, correct, dists, f"Common denominator: {fr(a)} + {fr(b)} = {correct}.")

def f_sub():
    while True:
        a = Fraction(rng.randint(1, 7), rng.randint(2, 8))
        b = Fraction(rng.randint(1, 7), rng.randint(2, 8))
        if a > b:
            break
    d = a - b
    q = f"{fr(a)} - {fr(b)} = ?"
    correct = fr(d)
    dists = [fr(a + b), f"{abs(a.numerator - b.numerator)}/{abs(a.denominator - b.denominator) or 1}", fr(d + Fraction(1, 10))]
    return mc(q, correct, dists, f"Common denominator: {fr(a)} - {fr(b)} = {correct}.")

def f_mult():
    a = Fraction(rng.randint(1, 5), rng.randint(2, 6)); b = Fraction(rng.randint(1, 5), rng.randint(2, 6))
    p = a * b
    q = f"{fr(a)} x {fr(b)} = ?"
    correct = fr(p)
    dists = [f"{a.numerator * b.numerator}/{a.denominator + b.denominator}", fr(a + b), fr(p + Fraction(1, 8))]
    return mc(q, correct, dists, f"Multiply across: ({a.numerator}x{b.numerator})/({a.denominator}x{b.denominator}) = {correct}.")

def f_whole_times():
    w = rng.randint(2, 9); den = rng.randint(2, 6); num = rng.randint(1, den - 1)
    p = w * Fraction(num, den)
    q = f"{w} x {num}/{den} = ?"
    correct = fr(p)
    dists = [f"{w * num}/{w * den}", fr(p + 1), f"{w + num}/{den}"]
    return mc(q, correct, dists, f"{w} x {num}/{den} = {w * num}/{den} = {correct}.")

def f_of_quantity():
    den = rng.choice([2, 3, 4, 5]); num = rng.randint(1, den - 1)
    whole = den * rng.randint(2, 8)
    val = Fraction(num, den) * whole
    q = f"What is {num}/{den} of {whole}?"
    correct = fr(val)
    dists = [str(int(val) + den), str(whole - int(val)), str(int(val) * 2)]
    return mc(q, correct, dists, f"{whole} / {den} = {whole // den}; x {num} = {correct}.")

def f_div():
    a = Fraction(rng.randint(1, 5), rng.randint(2, 6)); b = Fraction(rng.randint(1, 5), rng.randint(2, 6))
    qt = a / b
    q = f"({fr(a)}) / ({fr(b)}) = ?"
    correct = fr(qt)
    dists = [fr(a * b), fr(b / a) if a else correct, fr(qt + Fraction(1, 6))]
    return mc(q, correct, dists, f"Multiply by the reciprocal: {fr(a)} x {fr(b.denominator, b.numerator)} = {correct}.")

def f_div_whole():
    den = rng.randint(2, 6); num = rng.randint(1, den - 1); w = rng.randint(2, 8)
    qt = Fraction(num, den) / w
    q = f"({num}/{den}) / {w} = ?"
    correct = fr(qt)
    dists = [f"{num}/{den * w + 1}", fr(Fraction(num, den) * w), f"{num * w}/{den}"]
    return mc(q, correct, dists, f"Dividing by {w} multiplies the denominator: {num}/{den * w} = {correct}.")

def f_word_share():
    den = rng.choice([2, 3, 4]); num = rng.randint(1, den - 1); people = rng.randint(2, 6)
    each = Fraction(num, den) / people
    q = f"If {people} people share {num}/{den} of a pizza equally, how much does each get?"
    correct = fr(each)
    dists = [f"{num}/{den * people + 1}", fr(Fraction(num, den) * people), f"{num * people}/{den}"]
    return mc(q, correct, dists, f"({num}/{den}) / {people} = {num}/{den * people} = {correct} of a pizza.")

def f_word_servings():
    den = rng.choice([2, 4]); num = rng.randint(1, den - 1); cups = rng.randint(2, 9)
    serv = cups / Fraction(num, den)
    q = f"How many {num}/{den}-cup servings are in {cups} cups?"
    correct = fr(serv)
    dists = [str(int(serv) + 1), str(cups), fr(cups * Fraction(num, den))]
    return mc(q, correct, dists, f"{cups} / ({num}/{den}) = {cups} x {den}/{num} = {correct} servings.")

FRACTION_TEMPLATES = [f_simplify, f_equiv, f_compare, f_improper_to_mixed, f_mixed_to_improper,
                      f_add, f_sub, f_mult, f_whole_times, f_of_quantity, f_div, f_div_whole,
                      f_word_share, f_word_servings]

# ---------- BASE TEN ----------
PLACES = [("ones", 1), ("tens", 10), ("hundreds", 100), ("thousands", 1000),
          ("ten thousands", 10000), ("hundred thousands", 100000), ("millions", 1000000)]

def b_place():
    nplaces = rng.randint(4, 7)
    digits = [rng.randint(1, 9)] + [rng.randint(0, 9) for _ in range(nplaces - 1)]
    num = int("".join(map(str, digits)))
    pos = rng.randint(0, nplaces - 1)
    digit = digits[nplaces - 1 - pos]
    name = PLACES[pos][0]
    q = f"What is the place value of the digit {digit} in {num:,}?"
    correct = name
    others = [p[0] for p in PLACES[:max(nplaces, 4)] if p[0] != name]
    rng.shuffle(others)
    return mc(q, correct, others[:3], f"Counting from the right, {digit} sits in the {name} place.")

def b_round():
    place, pname = rng.choice([(10, "ten"), (100, "hundred"), (1000, "thousand")])
    num = rng.randint(place * 3, place * 95)
    correct = int(round(num / place) * place)
    q = f"Round {num:,} to the nearest {pname}."
    dists = [str(correct + place), str(correct - place), str((num // place) * place if (num // place) * place != correct else correct + 2 * place)]
    return mc(q, correct, dists, f"The digit after the {pname}s place decides rounding -> {correct:,}.")

def b_add():
    a = rng.randint(120, 8900); b = rng.randint(120, 8900)
    q = f"{a:,} + {b:,} = ?"
    correct = a + b
    return mc(q, correct, [a + b + 10, a + b - 100, a + b + 1], f"{a} + {b} = {correct}.")

def b_sub():
    a = rng.randint(2000, 9000); b = rng.randint(200, a - 100)
    q = f"{a:,} - {b:,} = ?"
    correct = a - b
    return mc(q, correct, [a - b + 100, a - b - 10, a - b + 1], f"{a} - {b} = {correct}.")

def b_mult():
    a = rng.randint(12, 99); b = rng.randint(3, 29)
    q = f"{a} x {b} = ?"
    correct = a * b
    return mc(q, correct, [a * b + b, a * b - a, a * b + 10], f"{a} x {b} = {correct}.")

def b_div():
    b = rng.randint(3, 12); ans = rng.randint(12, 99); a = b * ans
    q = f"{a:,} / {b} = ?"
    correct = ans
    return mc(q, correct, [ans + 1, ans - 1, ans + 10], f"{b} x {ans} = {a}, so {a} / {b} = {ans}.")

def b_dec_add():
    a = round(rng.uniform(0.1, 9.9), 1); b = round(rng.uniform(0.1, 9.9), 1)
    correct = round(a + b, 1)
    q = f"{a} + {b} = ?"
    dists = [round(a + b + 0.1, 1), round(a * b, 1), int(a + b)]
    return mc(q, str(correct), [str(x) for x in dists], f"{a} + {b} = {correct}.")

def b_dec_sub():
    a = round(rng.uniform(2.0, 9.9), 2); b = round(rng.uniform(0.1, a - 0.1), 2)
    correct = round(a - b, 2)
    q = f"{a} - {b} = ?"
    dists = [round(a - b + 0.1, 2), round(a + b, 2), round(a - b - 0.01, 2)]
    return mc(q, str(correct), [str(x) for x in dists], f"{a} - {b} = {correct}.")

def b_dec_x10():
    a = round(rng.uniform(0.1, 9.9), 2); f = rng.choice([10, 100])
    correct = round(a * f, 2)
    q = f"{a} x {f} = ?"
    cs = str(correct).rstrip('0').rstrip('.') if '.' in str(correct) else str(correct)
    dists = [round(a * f * 10, 2), round(a / f, 4), round(a + f, 2)]
    return mc(q, cs, [str(x) for x in dists], f"Multiplying by {f} shifts the decimal: {a} x {f} = {cs}.")

def b_dec_compare():
    a = round(rng.uniform(0.1, 9.99), 2); b = round(rng.uniform(0.1, 9.99), 2)
    while a == b:
        b = round(rng.uniform(0.1, 9.99), 2)
    correct = str(max(a, b))
    q = f"Which decimal is greater: {a} or {b}?"
    dists = [str(min(a, b)), "They are equal", str(round(max(a, b) + 0.01, 2))]
    return mc(q, correct, dists, f"Compare place by place: {max(a, b)} > {min(a, b)}.")

BASETEN_TEMPLATES = [b_place, b_round, b_add, b_sub, b_mult, b_div,
                     b_dec_add, b_dec_sub, b_dec_x10, b_dec_compare]

# ---------- MEASUREMENT & DATA ----------
def m_perimeter():
    l = rng.randint(3, 25); w = rng.randint(2, 20)
    correct = 2 * (l + w)
    q = f"A rectangle is {l} cm long and {w} cm wide. What is its perimeter?"
    return mc(q, f"{correct} cm", [f"{l * w} cm", f"{l + w} cm", f"{correct + 4} cm"],
              f"Perimeter = 2(L + W) = 2({l} + {w}) = {correct} cm.")

def m_area_rect():
    l = rng.randint(3, 25); w = rng.randint(2, 20)
    correct = l * w
    q = f"A rectangle is {l} cm long and {w} cm wide. What is its area?"
    return mc(q, f"{correct} sq cm", [f"{2 * (l + w)} sq cm", f"{l + w} sq cm", f"{correct + l} sq cm"],
              f"Area = L x W = {l} x {w} = {correct} sq cm.")

def m_area_square():
    s = rng.randint(3, 20)
    correct = s * s
    q = f"A square has sides of {s} m. What is its area?"
    return mc(q, f"{correct} sq m", [f"{4 * s} sq m", f"{2 * s} sq m", f"{correct + s} sq m"],
              f"Area = side x side = {s} x {s} = {correct} sq m.")

def m_volume():
    l = rng.randint(2, 10); w = rng.randint(2, 8); h = rng.randint(2, 6)
    correct = l * w * h
    q = f"A box is {l} cm by {w} cm by {h} cm. What is its volume?"
    return mc(q, f"{correct} cu cm", [f"{l * w} cu cm", f"{2 * (l + w + h)} cu cm", f"{correct + l} cu cm"],
              f"Volume = L x W x H = {l} x {w} x {h} = {correct} cu cm.")

def m_convert():
    kind = rng.choice([
        ("feet", "inches", 12), ("yards", "feet", 3), ("minutes", "seconds", 60),
        ("hours", "minutes", 60), ("meters", "centimeters", 100), ("kilograms", "grams", 1000),
        ("liters", "milliliters", 1000), ("weeks", "days", 7),
    ])
    big, small, factor = kind
    n = rng.randint(2, 12)
    correct = n * factor
    q = f"How many {small} are in {n} {big}?"
    return mc(q, correct, [n + factor, n * factor // 2 if factor % 2 == 0 else n * factor + 1, factor],
              f"1 {big[:-1] if big.endswith('s') else big} = {factor} {small}, so {n} x {factor} = {correct}.")

def m_elapsed():
    h1 = rng.randint(1, 9); m1 = rng.choice([0, 15, 30, 45])
    dur = rng.choice([30, 45, 60, 90, 120])
    total = h1 * 60 + m1 + dur
    eh, em = (total // 60) % 12 or 12, total % 60
    q = f"A movie starts at {h1}:{m1:02d} and lasts {dur} minutes. What time does it end?"
    correct = f"{eh}:{em:02d}"
    dists = [f"{(eh % 12) + 1}:{em:02d}", f"{eh}:{(em + 15) % 60:02d}", f"{eh}:{(em + 30) % 60:02d}"]
    return mc(q, correct, dists, f"{h1}:{m1:02d} + {dur} min = {correct}.")

def m_table_total():
    days = ["Mon", "Tue", "Wed", "Thu"]
    vals = [rng.randint(3, 20) for _ in days]
    correct = sum(vals)
    tbl = ", ".join(f"{d} {v}" for d, v in zip(days, vals))
    q = f"A shop's sales table shows: {tbl}. What is the total for all four days?"
    return mc(q, correct, [correct - vals[0], correct + 5, max(vals) * len(days)],
              f"Add them: {' + '.join(map(str, vals))} = {correct}.")

def m_money():
    price = round(rng.uniform(1.25, 9.75), 2); qty = rng.randint(2, 6)
    correct = round(price * qty, 2)
    q = f"One notebook costs ${price:.2f}. How much do {qty} notebooks cost?"
    return mc(q, f"${correct:.2f}", [f"${price + qty:.2f}", f"${correct + 1:.2f}", f"${round(price * (qty + 1), 2):.2f}"],
              f"${price:.2f} x {qty} = ${correct:.2f}.")

MEASDATA_TEMPLATES = [m_perimeter, m_area_rect, m_area_square, m_volume, m_convert,
                      m_elapsed, m_table_total, m_money]

# ---------- EXPRESSIONS & EQUATIONS ----------
def e_eval():
    a = rng.randint(2, 9); b = rng.randint(1, 12); x = rng.randint(2, 9)
    correct = a * x + b
    q = f"If x = {x}, what is the value of {a}x + {b}?"
    return mc(q, correct, [a + x + b, a * x - b, a * x + b + x], f"{a}({x}) + {b} = {a * x} + {b} = {correct}.")

def e_eval_sub():
    a = rng.randint(2, 9); b = rng.randint(1, 10); x = rng.randint(3, 10)
    correct = a * x - b
    q = f"If x = {x}, what is the value of {a}x - {b}?"
    return mc(q, correct, [a * x + b, a + x - b, a * x - b - 1], f"{a}({x}) - {b} = {a * x} - {b} = {correct}.")

def e_solve_add():
    x = rng.randint(3, 25); a = rng.randint(2, 30)
    b = x + a
    q = f"Solve for x: x + {a} = {b}"
    return mc(q, x, [b + a, x + 1, a], f"Subtract {a} from both sides: x = {b} - {a} = {x}.")

def e_solve_sub():
    x = rng.randint(10, 40); a = rng.randint(2, 9)
    b = x - a
    q = f"Solve for x: x - {a} = {b}"
    return mc(q, x, [b - a, x + 1, b], f"Add {a} to both sides: x = {b} + {a} = {x}.")

def e_solve_mult():
    x = rng.randint(2, 12); a = rng.randint(2, 9)
    b = a * x
    q = f"Solve for x: {a}x = {b}"
    return mc(q, x, [b, x + a, b // a + 1], f"Divide both sides by {a}: x = {b} / {a} = {x}.")

def e_solve_div():
    x = rng.randint(2, 9); a = rng.randint(2, 8)
    b = x  # x/a = b? choose so integer
    val = rng.randint(2, 8)
    # x / a = val -> x = a*val
    x = a * val
    q = f"Solve for x: x / {a} = {val}"
    return mc(q, x, [val, x + a, val * (a + 1)], f"Multiply both sides by {a}: x = {val} x {a} = {x}.")

def e_func_table():
    a = rng.randint(2, 6); b = rng.randint(0, 8); inp = rng.randint(2, 9)
    correct = a * inp + b
    rule = f"y = {a}x + {b}" if b else f"y = {a}x"
    q = f"A function table follows the rule {rule}. When x = {inp}, what is y?"
    return mc(q, correct, [a + inp + b, a * inp, correct + a], f"y = {a}({inp}) + {b} = {correct}.")

def e_two_step_expr():
    a = rng.randint(2, 6); b = rng.randint(2, 9); c = rng.randint(1, 10)
    x = rng.randint(2, 8)
    correct = a * (x + b) - c if rng.random() < 0.5 else a * x + b - c
    # keep simple deterministic form:
    correct = a * x + b - c
    q = f"If x = {x}, evaluate {a}x + {b} - {c}."
    return mc(q, correct, [a * x + b + c, a * x - b - c, a + x + b - c], f"{a}({x}) + {b} - {c} = {a * x} + {b} - {c} = {correct}.")

def e_inequality():
    a = rng.randint(2, 6); val = rng.randint(2, 8); b = a * val + rng.randint(1, 5)
    # solve a*x < b -> x < b/a ; ask greatest whole number
    import math
    correct = (b - 1) // a
    q = f"What is the greatest whole number x for which {a}x < {b}?"
    return mc(q, correct, [correct + 1, correct - 1, b // a + 1], f"{a} x {correct} = {a * correct} < {b}, but {a} x {correct + 1} = {a * (correct + 1)} is not < {b}.")

EXPR_TEMPLATES = [e_eval, e_eval_sub, e_solve_add, e_solve_sub, e_solve_mult,
                  e_solve_div, e_func_table, e_two_step_expr, e_inequality]

# ---------- GEOMETRY ----------
POLY = {3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon", 8: "octagon"}
def g_polygon():
    n = rng.choice(list(POLY))
    q = f"What is the name of a polygon with {n} sides?"
    correct = POLY[n]
    others = [v for k, v in POLY.items() if k != n]
    rng.shuffle(others)
    return mc(q, correct, others[:3], f"A {n}-sided polygon is a {correct}.")

SOLIDS = {"cube": (6, 12, 8), "rectangular prism": (6, 12, 8), "square pyramid": (5, 8, 5),
          "triangular prism": (5, 9, 6), "cylinder": (3, 2, 0)}
def g_solid():
    name = rng.choice(["cube", "square pyramid", "triangular prism"])
    faces, edges, verts = SOLIDS[name]
    attr = rng.choice([("faces", faces), ("edges", edges), ("vertices", verts)])
    q = f"How many {attr[0]} does a {name} have?"
    correct = attr[1]
    return mc(q, correct, [correct + 1, correct - 1, correct + 2], f"A {name} has {correct} {attr[0]}.")

def g_angle():
    deg = rng.randint(10, 170)
    if deg < 90:
        kind = "acute"
    elif deg == 90:
        kind = "right"
    else:
        kind = "obtuse"
    if deg == 90:
        deg = 90; kind = "right"
    q = f"An angle measures {deg} degrees. What type of angle is it?"
    correct = kind
    return mc(q, correct, [x for x in ["acute", "right", "obtuse", "straight"] if x != correct][:3],
              f"An angle of {deg} degrees is {correct} (acute < 90, right = 90, obtuse > 90).")

def g_coord():
    x = rng.randint(1, 9); y = rng.randint(1, 9)
    q = f"Starting at the origin, you move {x} units right and {y} units up. What are the coordinates of the point?"
    correct = f"({x}, {y})"
    dists = [f"({y}, {x})", f"({x}, {y + 1})", f"({x + 1}, {y})"]
    return mc(q, correct, dists, f"Right is the x-value, up is the y-value: ({x}, {y}).")

def g_triangle_class():
    kind = rng.choice([("all three sides equal", "equilateral"),
                       ("exactly two sides equal", "isosceles"),
                       ("no sides equal", "scalene")])
    q = f"A triangle has {kind[0]}. What type of triangle is it?"
    correct = kind[1]
    return mc(q, correct, [x for x in ["equilateral", "isosceles", "scalene", "right"] if x != correct][:3],
              f"A triangle with {kind[0]} is {correct}.")

GEOM_TEMPLATES = [g_polygon, g_solid, g_angle, g_coord, g_triangle_class]

# ---------- OPERATIONS & ALGEBRAIC THINKING ----------
def o_two_step():
    boxes = rng.randint(3, 9); per = rng.randint(6, 15); removed = rng.randint(2, 12)
    correct = boxes * per - removed
    q = f"{boxes} boxes each hold {per} books. Then {removed} books are removed. How many books are left?"
    return mc(q, correct, [boxes * per, correct - removed, boxes * per + removed],
              f"{boxes} x {per} = {boxes * per}; {boxes * per} - {removed} = {correct}.")

def o_compare():
    a = rng.randint(3, 12); times = rng.randint(2, 6)
    correct = a * times
    q = f"Maria has {a} stickers. Jordan has {times} times as many. How many does Jordan have?"
    return mc(q, correct, [a + times, correct + a, a * (times + 1)], f"{times} times {a} = {correct}.")

def o_arith_seq():
    start = rng.randint(2, 9); step = rng.randint(2, 9)
    seq = [start + step * i for i in range(4)]
    correct = seq[-1] + step
    q = f"What is the next term: {', '.join(map(str, seq))}, ?"
    return mc(q, correct, [correct + step, correct - 1, seq[-1] + step + 1], f"Add {step} each time: {seq[-1]} + {step} = {correct}.")

def o_geo_seq():
    start = rng.choice([1, 2, 3]); ratio = rng.choice([2, 3])
    seq = [start * ratio ** i for i in range(4)]
    correct = seq[-1] * ratio
    q = f"What is the next term: {', '.join(map(str, seq))}, ?"
    return mc(q, correct, [seq[-1] + ratio, correct + start, seq[-1] * (ratio + 1)], f"Multiply by {ratio} each time: {seq[-1]} x {ratio} = {correct}.")

def o_rule():
    start = rng.randint(1, 6); step = rng.randint(2, 6)
    seq = [start + step * i for i in range(4)]
    q = f"What is the rule for this pattern: {', '.join(map(str, seq))}?"
    correct = f"Add {step}"
    return mc(q, correct, [f"Add {step + 1}", f"Multiply by {step}", f"Subtract {step}"],
              f"Each term increases by {step}.")

OPS_TEMPLATES = [o_two_step, o_compare, o_arith_seq, o_geo_seq, o_rule]

# ---------- STATISTICS ----------
def s_mean():
    n = rng.choice([4, 5]);
    while True:
        data = [rng.randint(2, 20) for _ in range(n)]
        if sum(data) % n == 0:
            break
    correct = sum(data) // n
    q = f"What is the mean (average) of {', '.join(map(str, data))}?"
    return mc(q, correct, [correct + 1, sum(data), max(data)], f"Sum = {sum(data)}; {sum(data)} / {n} = {correct}.")

def s_median():
    n = rng.choice([5, 7])
    data = sorted(rng.sample(range(1, 30), n))
    correct = data[n // 2]
    q = f"What is the median of {', '.join(map(str, data))}?"
    return mc(q, correct, [data[0], data[-1], (data[0] + data[-1]) // 2], f"The middle value of the ordered list is {correct}.")

def s_mode():
    base = [rng.randint(1, 9) for _ in range(3)]
    m = rng.choice(base)
    data = base + [m, rng.randint(10, 19)]
    rng.shuffle(data)
    correct = m
    q = f"What is the mode of {', '.join(map(str, data))}?"
    return mc(q, correct, [max(data), min(data), sum(data) // len(data)], f"{m} appears most often, so the mode is {m}.")

def s_range():
    data = [rng.randint(1, 40) for _ in range(5)]
    correct = max(data) - min(data)
    q = f"What is the range of {', '.join(map(str, data))}?"
    return mc(q, correct, [max(data), min(data), correct + 1], f"Range = max - min = {max(data)} - {min(data)} = {correct}.")

def s_statistical_q():
    good = rng.choice([
        "How many minutes do students in my class spend on homework each night?",
        "What are the heights of the players on the team?",
        "How old are the trees in the park?",
    ])
    bad = ["How old am I?", "What is the capital of France?", "How tall is the teacher?"]
    q = "Which of these is a statistical question?"
    return mc(q, good, bad, "A statistical question anticipates variability in the data you collect.")

STATS_TEMPLATES = [s_mean, s_median, s_mode, s_range, s_statistical_q]

# ---------- THE NUMBER SYSTEM ----------
import math
def n_gcf():
    g = rng.randint(2, 9); a = g * rng.randint(2, 7); b = g * rng.randint(2, 7)
    while math.gcd(a, b) != g or a == b:
        g = rng.randint(2, 9); a = g * rng.randint(2, 7); b = g * rng.randint(2, 7)
    correct = math.gcd(a, b)
    q = f"What is the greatest common factor (GCF) of {a} and {b}?"
    return mc(q, correct, [correct * 2, correct + 1, a], f"The largest factor shared by {a} and {b} is {correct}.")

def n_lcm():
    a = rng.randint(2, 9); b = rng.randint(2, 12)
    while a == b:
        b = rng.randint(2, 12)
    correct = a * b // math.gcd(a, b)
    q = f"What is the least common multiple (LCM) of {a} and {b}?"
    return mc(q, correct, [a * b, correct + a, correct - b], f"The smallest number both {a} and {b} divide into is {correct}.")

def n_div_frac():
    a = Fraction(rng.randint(1, 5), rng.randint(2, 6)); b = Fraction(rng.randint(1, 5), rng.randint(2, 6))
    qt = a / b
    q = f"Divide: {fr(a)} / {fr(b)} = ?"
    return mc(q, fr(qt), [fr(a * b), fr(b / a), fr(qt + Fraction(1, 7))],
              f"Multiply by the reciprocal: {fr(a)} x {fr(b.denominator, b.numerator)} = {fr(qt)}.")

def n_is_prime():
    primes = [11, 13, 17, 19, 23, 29, 31, 37]
    comps = [12, 15, 18, 21, 25, 27, 33, 35]
    if rng.random() < 0.5:
        n = rng.choice(primes); correct = "Prime"
    else:
        n = rng.choice(comps); correct = "Composite"
    q = f"Is {n} a prime or composite number?"
    return mc(q, correct, ["Prime" if correct == "Composite" else "Composite", "Neither", "Both"][:3],
              f"{n} is {correct.lower()}.")

def n_factors():
    n = rng.choice([12, 16, 18, 20, 24, 28, 30, 36])
    facs = [d for d in range(1, n + 1) if n % d == 0]
    correct = len(facs)
    q = f"How many factors does {n} have?"
    return mc(q, correct, [correct + 1, correct - 1, correct + 2], f"The factors of {n} are {', '.join(map(str, facs))} -> {correct} factors.")

NUMSYS_TEMPLATES = [n_gcf, n_lcm, n_div_frac, n_is_prime, n_factors]

# ---------- RATIOS ----------
def r_simplify():
    g = rng.randint(2, 6); a = g * rng.randint(1, 6); b = g * rng.randint(1, 6)
    gg = math.gcd(a, b)
    correct = f"{a // gg}:{b // gg}"
    q = f"Write the ratio {a}:{b} in simplest form."
    return mc(q, correct, [f"{a}:{b}", f"{a // gg + 1}:{b // gg}", f"{b // gg}:{a // gg}"],
              f"Divide both parts by the GCF {gg}: {correct}.")

def r_unit_rate():
    units = rng.randint(2, 8); total = units * rng.randint(2, 9)
    correct = total // units
    item = rng.choice(["apples", "pencils", "bottles", "books"])
    q = f"{units} {item} cost ${total}. What is the cost per item (unit rate)?"
    return mc(q, f"${correct}", [f"${correct + 1}", f"${total}", f"${units}"], f"${total} / {units} = ${correct} each.")

def r_equiv():
    a = rng.randint(1, 6); b = rng.randint(1, 6); k = rng.randint(2, 6)
    q = f"If the ratio is {a}:{b}, what is the equivalent ratio when the first term is {a * k}?"
    correct = f"{a * k}:{b * k}"
    return mc(q, correct, [f"{a * k}:{b}", f"{a * k}:{b + k}", f"{a * k}:{b * k + 1}"],
              f"Multiply both terms by {k}: {a * k}:{b * k}.")

def r_rate_word():
    rate = rng.randint(2, 9); time = rng.randint(2, 8)
    correct = rate * time
    q = f"A printer prints {rate} pages per minute. How many pages in {time} minutes?"
    return mc(q, correct, [rate + time, correct + rate, rate * (time + 1)], f"{rate} x {time} = {correct} pages.")

RATIO_TEMPLATES = [r_simplify, r_unit_rate, r_equiv, r_rate_word]

# ----------------------------------------------------------------------------
# Build pools per domain
# ----------------------------------------------------------------------------
DOMAINS = [
    ("Fractions", FRACTION_TEMPLATES, 120),
    ("BaseTen", BASETEN_TEMPLATES, 90),
    ("MeasData", MEASDATA_TEMPLATES, 90),
    ("Expr", EXPR_TEMPLATES, 90),
    ("Geometry", GEOM_TEMPLATES, 60),
    ("Ops", OPS_TEMPLATES, 60),
    ("Stats", STATS_TEMPLATES, 30),
    ("NumSys", NUMSYS_TEMPLATES, 30),
    ("Ratios", RATIO_TEMPLATES, 30),
]
# per-test counts (sum 40)
PER_TEST = {"Fractions": 8, "BaseTen": 6, "MeasData": 6, "Expr": 6,
            "Geometry": 4, "Ops": 4, "Stats": 2, "NumSys": 2, "Ratios": 2}

def build_pool(name, templates, count):
    out = []
    ti = 0
    attempts = 0
    while len(out) < count:
        attempts += 1
        if attempts > count * 500:
            raise RuntimeError(f"Could not generate enough unique for {name} ({len(out)}/{count})")
        tmpl = templates[ti % len(templates)]
        ti += 1
        try:
            q = tmpl()
        except Exception:
            continue
        if q is None:
            continue
        if not fresh(q["question"]):
            continue
        # validate: 4 distinct choices, answer letter valid, correct in choices
        if len(set(q["choices"])) != 4:
            continue
        out.append(q)
    return out

pools = {name: build_pool(name, tmpls, cnt) for name, tmpls, cnt in DOMAINS}

# ----------------------------------------------------------------------------
# Distribute into 15 tests of 40, blueprint-faithful, then shuffle within test
# ----------------------------------------------------------------------------
NTESTS = 15
cursors = {name: 0 for name in pools}
tests = []
for t in range(NTESTS):
    qs = []
    for name in PER_TEST:
        k = PER_TEST[name]
        c = cursors[name]
        qs.extend(pools[name][c:c + k])
        cursors[name] += k
    rng.shuffle(qs)
    for i, q in enumerate(qs, 1):
        q["num"] = i
    # reorder keys: num first
    qs = [{"num": q["num"], "question": q["question"], "choices": q["choices"],
           "answer": q["answer"], "explanation": q["explanation"]} for q in qs]
    tests.append({"testNum": t + 1, "questions": qs})

# ----------------------------------------------------------------------------
# Write tabe-m.json
# ----------------------------------------------------------------------------
data = json.load(open(DATA))
data["timeMinutes"] = 900   # 900/600*40 = 60 min per 40-q test
data["tests"] = tests
json.dump(data, open(DATA, "w"), indent=2, ensure_ascii=False)

total = sum(len(t["questions"]) for t in tests)
print(f"WROTE {DATA}: {NTESTS} tests, {total} questions")
# answer letter distribution sanity
from collections import Counter
ctr = Counter(q["answer"] for t in tests for q in t["questions"])
print("Answer distribution:", dict(ctr))
