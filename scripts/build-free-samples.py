#!/usr/bin/env python3
"""Assemble the free, ungated 25-question samples (data/free/<bank>.json).

Input : one authored file per bank, `new-<bank>.json`, in the letter-free format
        {bank, items:[{topic, question, correct, distractors[3], explanation, ...}]}
Checks: structure, option hygiene (length give-aways, duplicates, stray letter references),
        and ORIGINALITY — every stem is compared with all existing CertPath online questions
        and with the text of the printed books (word 5-gram containment + a numbers-masked
        template match for maths). Anything that overlaps is reported and excluded.
Output: data/free/<bank>.json in the normal bank shape, with option order shuffled by a
        seeded RNG so the answer letters are balanced, plus a report.

Usage: python3 scripts/build-free-samples.py <dir-with-new-files> [--booktext <dir>] [--write]
"""
import glob, json, os, random, re, sys
from collections import Counter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1]
BOOKTEXT = sys.argv[sys.argv.index("--booktext") + 1] if "--booktext" in sys.argv else None
WRITE = "--write" in sys.argv

WORD = re.compile(r"[a-z0-9]+")
def words(s): return WORD.findall(s.lower())
def grams(ws, n=5): return {" ".join(ws[i:i + n]) for i in range(len(ws) - n + 1)}
def template(s): return re.sub(r"\d+(?:[.,]\d+)?", "#", " ".join(words(s)))

# ---- index everything that already exists --------------------------------------------
existing_grams, existing_templates = set(), set()
n_existing = 0
for f in glob.glob(os.path.join(ROOT, "data", "*.json")):
    if os.path.basename(f) in ("books.json", "exams.json", "book-pages.json", "reviews.json"): continue
    try: d = json.load(open(f, encoding="utf-8"))
    except Exception: continue
    for t in d.get("tests", []):
        for q in t.get("questions", []):
            ws = words(q.get("question", ""))
            existing_grams |= grams(ws)
            if len(ws) >= 8: existing_templates.add(template(q["question"]))
            n_existing += 1
book_grams = set()
if BOOKTEXT:
    for f in glob.glob(os.path.join(BOOKTEXT, "*.txt")):
        book_grams |= grams(words(open(f, encoding="utf-8", errors="ignore").read()), 6)

def overlap(stem):
    ws = words(stem); g5, g6 = grams(ws), grams(ws, 6)
    online = len(g5 & existing_grams) / max(1, len(g5))
    book = len(g6 & book_grams) / max(1, len(g6)) if book_grams else 0.0
    return online, book, template(stem) in existing_templates

LETTER_REF = re.compile(r"\b(option|choice|answer)s?\s+[A-E]\b|\b[A-E]\s+is\s+(correct|wrong|incorrect)\b")

report, totals = {}, Counter()
os.makedirs(os.path.join(ROOT, "data", "free"), exist_ok=True)
for f in sorted(glob.glob(os.path.join(SRC, "new-*.json"))):
    bank = os.path.basename(f)[4:-5]
    try: items = json.load(open(f, encoding="utf-8"))["items"]
    except Exception as e:
        report[bank] = {"error": f"unreadable: {e}"}; continue
    problems, good, seen = [], [], set()
    for i, it in enumerate(items, 1):
        errs = []
        opts = [it.get("correct", "")] + list(it.get("distractors", []))
        if len(opts) != 4 or any(not str(o).strip() for o in opts): errs.append("needs 1 correct + 3 distractors")
        if len({re.sub(r"\s+", " ", str(o).strip().lower()) for o in opts}) != 4: errs.append("duplicate options")
        if len(words(it.get("question", ""))) < 8: errs.append("stem too short")
        if len(words(it.get("explanation", ""))) < 25: errs.append("explanation too thin")
        if LETTER_REF.search(it.get("explanation", "")) or LETTER_REF.search(it.get("question", "")): errs.append("refers to an option letter")
        lens = sorted(len(str(o)) for o in opts)
        if len(opts) == 4 and len(str(opts[0])) == lens[-1] and lens[-1] > 1.45 * lens[-2] and lens[-1] > 40: errs.append("correct option is conspicuously the longest")
        on, bk, tmpl = overlap(it.get("question", ""))
        # short, formulaic maths stems ("the function f is defined by ...") share stock phrases with
        # everything; hold them to a higher bar and rely on the numbers-masked template check instead
        bar = 0.35 if len(words(it.get("question", ""))) >= 30 else 0.6
        if on > bar: errs.append(f"overlaps an existing online question ({on:.0%} of 5-grams)")
        if bk > bar: errs.append(f"overlaps printed book text ({bk:.0%} of 6-grams)")
        if tmpl: errs.append("same template as an existing question (numbers changed)")
        if it.get("image") and not os.path.isfile(os.path.join(ROOT, it["image"].lstrip("/"))): errs.append("figure file missing: " + it["image"])
        key = template(it.get("question", ""))
        if key in seen: errs.append("duplicate within this set")
        seen.add(key)
        (problems.append({"n": i, "stem": it.get("question", "")[:90], "issues": errs}) if errs else good.append(it))
    report[bank] = {"authored": len(items), "clean": len(good), "problems": problems}
    totals["authored"] += len(items); totals["clean"] += len(good)

    if WRITE and good:
        rng = random.Random("certpath-free-" + bank)
        slots = (["A", "B", "C", "D"] * 7)[:len(good)]          # balanced answer letters
        rng.shuffle(slots)
        qs = []
        for n, (it, slot) in enumerate(zip(good, slots), 1):
            ds = list(it["distractors"]); rng.shuffle(ds)
            choices = ds[:]; choices.insert("ABCD".index(slot), it["correct"])
            q = {"num": n, "topic": it.get("topic", ""), "question": it["question"].strip(),
                 "choices": [str(c).strip() for c in choices], "answer": slot,
                 "explanation": it["explanation"].strip()}
            if it.get("image"):
                q["image"] = it["image"]; q["image_alt"] = it.get("image_alt", "Question figure")
            qs.append(q)
        out = {"slug": bank + "-free25", "title": "Free sample", "free": True,
               "note": "Original questions written for the free sample. They do not appear in the book or in the owners' online practice tests.",
               "tests": [{"testNum": 1, "questions": qs}]}
        json.dump(out, open(os.path.join(ROOT, "data", "free", bank + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

print(f"indexed {n_existing:,} existing online questions; book text {'on' if book_grams else 'off'} ({len(book_grams):,} 6-grams)")
for bank, r in report.items():
    if "error" in r: print(f"{bank:16} ERROR {r['error']}"); continue
    print(f"{bank:16} authored={r['authored']:2} clean={r['clean']:2}" + ("" if not r["problems"] else "  <-- " + "; ".join(f"#{p['n']}: {', '.join(p['issues'])}" for p in r["problems"][:6])))
print(dict(totals))
json.dump(report, open(os.path.join(SRC, "build-report.json"), "w"), indent=1)
