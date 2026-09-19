#!/usr/bin/env python3
"""Generate one dedicated page per published book at /books/<slug>, modelled on
the /capm funnel: free practice (email) -> stats -> access code -> buy options.
The same page is the owner's home: once a valid code is entered (here or on
/access) it flips to the unlocked state and lists that book's practice tests.

Everything on the page is read from data/books.json, data/exams.json and the
book's own question bank, so counts can never drift from what is actually served.

Later: add `course` / `bundle` objects to a book's record in books.json and the
matching sections render automatically (see COURSE_SLOT / BUNDLE_SLOT below).

Run from the repo root:  python3 scripts/build-book-pages.py
"""
import html
import json
import math
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://certpathpublishing.store"
esc = lambda s: html.escape(str(s), quote=True)

index = (ROOT / "index.html").read_text(encoding="utf-8")
HEADER = re.search(r'  <a class="cp-skip".*?<main id="main"', index, re.S).group(0).rsplit("<main", 1)[0].rstrip()
FOOTER = re.search(r'  <footer class="cp-footer">.*?</footer>', index, re.S).group(0)

books = json.loads((ROOT / "data/books.json").read_text(encoding="utf-8"))["books"]
exams_doc = json.loads((ROOT / "data/exams.json").read_text(encoding="utf-8"))
by_slug = {b["slug"]: b for b in books}
REVIEWS = json.loads((ROOT / "data/reviews.json").read_text(encoding="utf-8")).get("reviews", [])
exam_of = {slug: e for e in exams_doc["exams"] for slug in e["products"]}

# Books that already have their own funnel page keep it.
OWN_PAGE = {"pmp": "/pmp", "capm": "/capm"}
SKIP = set(OWN_PAGE) | {"pmp-free", "capm-free"}


def bank_stats(book):
    """Real numbers from the question bank this book serves."""
    f = ROOT / "data" / f"{book['slug']}.json"
    if not f.exists():
        return None
    tests = json.loads(f.read_text(encoding="utf-8")).get("tests", [])
    if not tests:
        return None
    t1 = next((t for t in tests if t.get("testNum") == 1), tests[0])
    return dict(tests=len(tests), questions=sum(len(t["questions"]) for t in tests),
                sample=max(5, math.ceil(len(t1["questions"]) * 0.1)))  # same rule as js/sample.js


def kind(book):
    t = book["title"]
    if "10 Practice Tests" in t: return "Practice tests"
    if "Workbook" in t: return "Workbook"
    if "Practice Questions" in t: return "Practice questions"
    return "Study guide"


def page(book, stats):
    slug, title, short = book["slug"], book["title"], book.get("shortName") or book["title"]
    exam = exam_of.get(slug)
    url = f"/books/{slug}"
    exam_name = exam["name"] if exam else title
    if exam:  # plural, generic exam families read better without the article
        exam_name = exam_name[0].lower() + exam_name[1:] if exam["id"] in ("mech-apt", "journeyman") else "the " + exam_name
    owner = f" ({exam['owner']})" if exam and exam.get("owner") else ""
    desc = (f"{kind(book)} for {exam_name}{owner}. The book includes an access code for "
            f"{stats['tests']} timed online practice tests — {stats['questions']:,} questions, each with a written explanation.")
    has_bonus = (ROOT / "bonus-pdfs" / f"{slug}-cheatsheet.pdf").exists()

    siblings = [by_slug[s] for s in (exam["products"] if exam else []) if s != slug and by_slug.get(s, {}).get("published")]
    sib_html = "".join(
        f'<a class="cp-sib" href="{OWN_PAGE.get(s["slug"], "/books/" + s["slug"])}"><img src="{esc(s["cover"])}" alt="" width="85" height="110" loading="lazy" decoding="async">'
        f'<span><b>{esc(s["title"])}</b>{esc(kind(s))}</span></a>' for s in siblings)

    formats = []
    if book.get("amazonUrl"):
        formats.append(f'''<article class="cp-format">
            <span class="cp-type">Paperback</span><h3>Print edition</h3>
            <p>The full {esc(kind(book).lower())}, with your access code for the online practice tests printed on the last page.</p>
            <a class="cp-btn cp-btn-navy" href="{esc(book["amazonUrl"])}" target="_blank" rel="noopener">Buy paperback on Amazon <span class="cp-arrow" aria-hidden="true">↗</span></a>
            <span class="cp-seller">Sold and shipped by Amazon. Price shown at checkout.</span></article>''')
    if book.get("payhipEbookUrl"):
        formats.append(f'''<article class="cp-format">
            <span class="cp-type">E-book · PDF</span><h3>Digital edition</h3>
            <p>The same book as a PDF to read on any device. Includes the same access code.</p>
            <a class="cp-btn cp-btn-ghost" href="{esc(book["payhipEbookUrl"])}" target="_blank" rel="noopener">Buy the e-book <span class="cp-arrow" aria-hidden="true">↗</span></a>
            <span class="cp-seller">Sold direct. Checkout is handled by Payhip.</span></article>''')
    buy = f'''
    <section class="cp-section" id="buy" data-visitor-only>
      <div class="cp-container">
        <div class="cp-section-head" data-reveal>
          <span class="cp-eyebrow">Get the book</span>
          <h2 class="cp-h2">Choose your <em>format.</em></h2>
          <p class="cp-lead">Every format includes the access code for all {stats['tests']} online practice tests.</p>
        </div>
        <div class="cp-formats" data-reveal>{''.join(formats)}</div>
      </div>
    </section>''' if formats else ""

    hub = ""
    if exam and exam.get("route"):
        hub = f'<a class="cp-textlink" href="{exam["route"]}">About the {esc(exam["acronym"])} exam — format and FAQ <span class="cp-arrow" aria-hidden="true">→</span></a>'
    related = f'''
    <section class="cp-section" style="padding-top:0" data-visitor-only>
      <div class="cp-container">
        <div class="cp-section-head" data-reveal><span class="cp-eyebrow">Same exam</span><h2 class="cp-h2">More for {esc(exam["acronym"])}.</h2></div>
        <div class="cp-sibs" data-reveal>{sib_html}</div>
        <p style="margin-top:1.5rem">{hub}</p>
      </div>
    </section>''' if siblings else (f'<div class="cp-container" style="padding-bottom:var(--cp-section)" data-visitor-only>{hub}</div>' if hub else "")

    rv = [r for r in REVIEWS if r.get("slug") == slug]
    review_html = ""
    if rv:
        cards = "".join(
            f'''<figure class="cp-review"><div class="cp-review-stars" aria-label="{int(r["stars"])} out of 5 stars">{"★" * int(r["stars"])}</div>
            <blockquote>“{"… " if r["quote"][0].islower() else ""}{esc(r["quote"])}{"" if r["quote"][-1] in ".!?" else " …"}”</blockquote>
            <figcaption><b>{esc(r["name"])}</b>{esc(r["source"])}<a class="cp-textlink" href="{esc(r["url"])}" target="_blank" rel="noopener">Read the full review on Amazon <span class="cp-arrow" aria-hidden="true">↗</span></a></figcaption></figure>''' for r in rv)
        review_html = f'''
    <section class="cp-section cp-reviews" style="padding-bottom:0" data-visitor-only>
      <div class="cp-container">
        <div class="cp-section-head" data-reveal><span class="cp-eyebrow">What readers say</span><h2 class="cp-h2">In their <em>own words.</em></h2></div>
        <div class="cp-reviews-grid" data-reveal>{cards}</div>
      </div>
    </section>'''

    ld = json.dumps({"@context": "https://schema.org", "@graph": [
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Exam directory", "item": SITE + "/exams"},
            {"@type": "ListItem", "position": 3, "name": title, "item": SITE + url}]},
        {"@type": "Book", "name": title, "image": SITE + book["cover"], "url": SITE + url,
         "publisher": {"@type": "Organization", "name": "CertPath Publishing"}}]}, ensure_ascii=False)

    cfg = json.dumps({"slug": slug, "title": title, "short": short, "tests": stats["tests"],
                      "sequential": bool(book.get("sequential")), "bonus": has_bonus}, ensure_ascii=False)

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)} — Free Practice &amp; Online Tests | CertPath Publishing</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="icon" type="image/png" href="/img/logo-mark.png">
  <link rel="canonical" href="{SITE}{url}">
  <meta property="og:type" content="product">
  <meta property="og:site_name" content="CertPath Publishing">
  <meta property="og:title" content="{esc(title)} — CertPath Publishing">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{SITE}{url}">
  <meta property="og:image" content="{SITE}{esc(book["cover"])}">
  <script type="application/ld+json">{ld}</script>
  <script>addEventListener('pagereveal',function(e){{if(e.viewTransition)document.documentElement.classList.add('cp-vt')}});</script>
  <script>document.documentElement.classList.add('cp-js');setTimeout(function(){{if(!window.__cpReady)document.documentElement.classList.remove('cp-js')}},2500);</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/premium.css?v=10">
  <link rel="preload" as="image" href="{esc(book["cover"])}" fetchpriority="high">
</head>
<body class="cp" data-book-state="visitor">
{HEADER}

  <main id="main">
    <section class="cp-hero cp-bookhero cp-dark has-photo">
      <img class="cp-bgphoto" src="/img/photo/hero-study.webp" alt="" width="1920" height="1280" decoding="async">
      <svg class="cp-hero-rings" viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="120" style="--o:.34" opacity=".34"/><circle cx="200" cy="200" r="160" style="--o:.2" opacity=".2"/><circle cx="200" cy="200" r="199" style="--o:.1" opacity=".1"/></svg>
      <div class="cp-container cp-bookhero-grid">
        <div>
          <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/exams">Exams</a><span aria-hidden="true">/</span><span>{esc(short)}</span></nav>
          <span class="cp-eyebrow">{esc(exam["catLabel"] if exam and exam.get("catLabel") else book.get("category", ""))} · {esc(kind(book))}</span>
          <h1 data-split>{esc(title)}</h1>
          <p class="cp-hero-copy">{esc(desc)}</p>

          <!-- Visitor: 25 free questions — no email, no signup -->
          <div class="cp-gate" data-visitor-only>
            <h2>Try 25 tough {esc(short)} questions — free</h2>
            <a class="cp-btn cp-btn-primary cp-gate-start" href="/sample?book={esc(slug)}">Start the 25 free questions <span class="cp-arrow" aria-hidden="true">→</span></a>
            <ul class="cp-gate-proof"><li>No email, no signup</li><li>Full explanation after every answer</li><li>New questions — not in the book or the online tests</li></ul>
            <p class="cp-gate-note">Already own the book? <a href="#owner">Enter your access code →</a></p>
          </div>

          <!-- Owner: this book's practice tests -->
          <div class="cp-gate cp-tests" data-owner-only hidden>
            <h2>Your practice tests</h2>
            <p class="cp-gate-note" style="margin:0 0 1rem">Timed and auto-scored, with an explanation for every question.</p>
            <div class="cp-tests-grid" id="testsGrid"></div>
            <p class="cp-gate-note" id="seqNote" hidden>Tests unlock in order — finish one to open the next.</p>
            {f'<p style="margin-top:1rem"><a class="cp-textlink" href="/bonus-pdfs/{esc(slug)}-cheatsheet.pdf" download>Download your formula cheat sheet (PDF) <span class="cp-arrow" aria-hidden="true">↓</span></a></p>' if has_bonus else ''}
          </div>
        </div>
        <div class="cp-bookhero-cover" data-tilt><img src="{esc(book["cover"])}" alt="Cover of {esc(title)}" width="425" height="550" fetchpriority="high"></div>
      </div>
    </section>

    <section class="cp-stats cp-dark" aria-label="What the online practice includes">
      <div class="cp-container cp-stats-grid">
        <div><b>{stats["tests"]}</b><span>Timed practice tests</span></div>
        <div><b>{stats["questions"]:,}</b><span>Online questions</span></div>
        <div><b>{book["timeMinutes"]}</b><span>Minutes per test</span></div>
        <div><b>Every</b><span>Question explained</span></div>
      </div>
    </section>

    <section class="cp-section cp-ownerform" id="owner" data-visitor-only>
      <div class="cp-container">
        <div class="cp-access-panel" data-reveal>
          <span class="cp-eyebrow">Already have the book?</span>
          <h2>Enter your access code</h2>
          <p>It's printed on the last page of your book. Your {stats["tests"]} practice tests open right here.</p>
          <form id="codeForm" novalidate>
            <div class="form-group">
              <label for="code">Book access code</label>
              <input type="text" id="code" required autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="codeMsg">
              <div class="hint">Paste it in — hyphens, spaces and capitals don't matter.</div>
            </div>
            <div class="form-group">
              <label for="ownerName">First name <span style="font-weight:400;color:#526176">(optional)</span></label>
              <input type="text" id="ownerName" autocomplete="given-name" maxlength="40">
            </div>
            <div class="form-group">
              <label for="ownerEmail">Email address</label>
              <input type="email" id="ownerEmail" required autocomplete="email">
              <div class="hint">Used to register your access. We also send occasional study tips — unsubscribe any time.</div>
            </div>
            <button type="submit">Open my practice tests</button>
            <div class="message error" id="codeMsg" role="alert"></div>
          </form>
        </div>
        <p class="cp-access-help">Code not working? <a href="mailto:support@certpathpublishing.store?subject=Help%20with%20my%20access%20code%20%E2%80%94%20{esc(short).replace(" ", "%20")}">Email support</a> and we'll sort it out.</p>
      </div>
    </section>

    <section class="cp-section cp-ownernext" data-owner-only hidden>
      <div class="cp-container cp-owner-inner">
        <p id="alsoUnlocked"><b>Have another CertPath book?</b> Add its code and its tests appear on its own page.</p>
        <a class="cp-btn cp-btn-ghost" href="/access">My library &amp; codes <span class="cp-arrow" aria-hidden="true">→</span></a>
      </div>
    </section>

    <!-- COURSE_SLOT: video course section renders here once books.json has a `course` object for this slug. -->
    <!-- BUNDLE_SLOT: complete-system / bundle offer renders here once books.json has a `bundle` object for this slug. -->
{review_html}
{buy}
{related}
  </main>

{FOOTER}

  <script>window.CP_BOOK = {cfg};</script>
  <script src="/js/premium.js?v=12" defer></script>
  <script src="/js/app.js?v=20260918g" defer></script>
  <script src="/js/book.js?v=4" defer></script>
</body>
</html>
'''


cats = {c["id"]: c["label"] for c in exams_doc["categories"]}
for e in exams_doc["exams"]:
    e["catLabel"] = cats[e["category"]]

out = ROOT / "books"
out.mkdir(exist_ok=True)
pages = {}
for b in books:
    if not b.get("published") or b["slug"] in SKIP:
        continue
    st = bank_stats(b)
    if not st:
        print("SKIP (no question bank):", b["slug"]); continue
    if (st["tests"], st["questions"]) != (b.get("testCount"), b.get("totalQuestions")):
        print(f"NOTE {b['slug']}: books.json says {b.get('testCount')} tests / {b.get('totalQuestions')} Qs, bank has {st['tests']} / {st['questions']} — page uses the bank")
    doc = page(b, st)
    # a title whose free 25-question set has not cleared audit yet keeps the older sample, described honestly
    if not (ROOT / "data" / "free" / f"{b.get('bank') or b['slug']}.json").is_file():
        doc = (re.sub(r"Try 25 tough (.*?) questions — free", r"Try \1 sample questions — free", doc).replace("Start the 25 free questions", "Start the free sample questions")
                  .replace("<li>New questions — not in the book or the online tests</li>", ""))
    (out / f"{b['slug']}.html").write_text(doc, encoding="utf-8")
    pages[b["slug"]] = f"/books/{b['slug']}"

pages.update(OWN_PAGE)
(ROOT / "data" / "book-pages.json").write_text(json.dumps(pages, indent=1) + "\n", encoding="utf-8")
print(f"wrote {len(pages) - len(OWN_PAGE)} book pages + data/book-pages.json")
