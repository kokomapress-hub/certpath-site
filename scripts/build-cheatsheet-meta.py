#!/usr/bin/env python3
"""Per-exam metadata for the free cheat sheets: the book title shown in the header strip, the page the
QR code points to, and the QR itself (cheatsheets/qr/<bank>.svg). Run before scripts/build-cheatsheets.js."""
import json, os, shutil, segno
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://certpathpublishing.store"
books = json.load(open(os.path.join(ROOT, "data", "books.json")))["books"]
pages = json.load(open(os.path.join(ROOT, "data", "book-pages.json")))
os.makedirs(os.path.join(ROOT, "cheatsheets", "qr"), exist_ok=True)
meta = {}
cleared_file = os.path.join(ROOT, "cheatsheets", "cleared.txt")
cleared = {l.split()[0] for l in open(cleared_file) if l.strip() and not l.startswith("#")} if os.path.isfile(cleared_file) else set()
for b in books:
    if not b.get("published"): continue
    bank = b.get("bank") or b["slug"]
    if bank in meta or bank.endswith("-free"): continue      # first (main) title of each bank wins
    path = {"pmp": "/pmp", "capm": "/capm"}.get(bank) or pages.get(b["slug"]) or "/books/" + b["slug"]
    meta[bank] = {"book": b["title"], "short": b.get("shortName") or b["title"], "slug": b["slug"], "url": SITE + path,
                  "ready": False}   # only ready sheets are offered on the site
    segno.make(SITE + path, error="m").save(os.path.join(ROOT, "cheatsheets", "qr", bank + ".svg"),
                                             omitsize=True, border=2, dark="#0E1F3F", light="#ffffff", xmldecl=False, svgns=True, nl=False)
for bank, m in meta.items():           # publish only audited-and-cleared sheets
    built, live = os.path.join(ROOT, "cheatsheets", "build", bank + ".pdf"), os.path.join(ROOT, "cheatsheets", bank + ".pdf")
    if bank in cleared and os.path.isfile(built):
        shutil.copyfile(built, live); m["ready"] = True
    elif os.path.isfile(live):
        os.remove(live)
json.dump(meta, open(os.path.join(ROOT, "cheatsheets", "meta.json"), "w"), indent=1)
print(len(meta), "banks;", "live:", ", ".join(sorted(b for b, m in meta.items() if m["ready"])) or "none")
