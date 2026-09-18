#!/usr/bin/env python3
"""Stamp the shared premium header/footer (single source: index.html) into the
other premium-shell pages, so navigation can never drift between pages.

Run from the repo root:  python3 scripts/build-premium-pages.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
index = (ROOT / "index.html").read_text(encoding="utf-8")

header = re.search(r'  <a class="cp-skip".*?<main id="main"', index, re.S).group(0).rsplit("<main", 1)[0].rstrip()
footer = re.search(r'  <footer class="cp-footer">.*?</footer>', index, re.S).group(0)

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <link rel="icon" type="image/png" href="/img/logo-mark.png">
  <link rel="canonical" href="https://certpathpublishing.store{path}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CertPath Publishing">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:url" content="https://certpathpublishing.store{path}">
{extra_head}  <script>document.documentElement.classList.add('cp-js');setTimeout(function(){{if(!window.__cpReady)document.documentElement.classList.remove('cp-js')}},2500);</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&display=swap" rel="stylesheet">
{styles}</head>
<body class="cp">
"""

PREMIUM_CSS = '  <link rel="stylesheet" href="/css/premium.css?v=10">\n'

EXAMS_MAIN = """  <main id="main">
    <section class="cp-pagehead cp-dark has-photo">
      <img class="cp-bgphoto" src="/img/photo/band-ridge.webp" alt="" width="1920" height="1280" decoding="async">
      <div class="cp-container">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Exam directory</span></nav>
        <h1 data-split>Find your <em>exam.</em></h1>
        <p class="cp-lead">Every exam with a published CertPath title, in one searchable place. Search by name or acronym, filter by field, or show only exams with free practice.</p>
      </div>
    </section>

    <section class="cp-section" data-finder data-sync-url data-detailed style="padding-top:clamp(2rem,4vw,3.5rem)">
      <div class="cp-container">
        <div class="cp-finder-bar">
          <div class="cp-field">
            <label for="examSearch">Search exams</label>
            <div class="cp-search">
              <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="6.25" fill="none" stroke="currentColor" stroke-width="1.75"/><path d="M13.5 13.5L18 18" stroke="currentColor" stroke-width="1.75"/></svg>
              <input type="search" id="examSearch" placeholder="e.g. PMP, journeyman, GED math" autocomplete="off">
              <button type="button" data-clear hidden aria-label="Clear search">✕</button>
            </div>
          </div>
          <div class="cp-chips" role="group" aria-label="Filter exams"></div>
        </div>
        <p class="cp-count" role="status" aria-live="polite"></p>
        <div class="cp-exam-grid">
          <ul>
            <li><a href="/pmp">PMP — Project Management Professional</a></li>
            <li><a href="/capm">CAPM — Certified Associate in Project Management</a></li>
            <li><a href="/cast">CAST — Construction and Skilled Trades</a></li>
            <li><a href="/poss">POSS — Plant Operator Selection System</a></li>
            <li><a href="/mechanical-aptitude">Mechanical Aptitude</a></li>
            <li><a href="/journeyman-electrician">Journeyman Electrician</a></li>
            <li><a href="/csp">CSP — Certified Safety Professional</a></li>
            <li><a href="/chst">CHST — Construction Health and Safety Technician</a></li>
            <li><a href="/ccrn">Adult CCRN</a></li><li><a href="/cnor">CNOR</a></li>
            <li><a href="/sat">Digital SAT Math</a></li><li><a href="/psat">PSAT/NMSQT Math</a></li>
            <li><a href="/act">ACT Math</a></li><li><a href="/ged">GED Math</a></li><li><a href="/tabe">TABE 11 &amp; 12 Math</a></li>
          </ul>
        </div>
        <div class="cp-finder-foot">
          <span>Counts come from the published product records — titles still in production are not listed.</span>
          <a class="cp-textlink" href="mailto:support@certpathpublishing.store?subject=Exam%20request">Don't see your exam? Tell us <span class="cp-arrow" aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <section class="cp-owner" aria-label="Book owners">
      <div class="cp-container cp-owner-inner">
        <p><b>Already have a CertPath book?</b> Your practice tests are one code away.</p>
        <a class="cp-btn cp-btn-navy" href="/access">Access my tests <span class="cp-arrow" aria-hidden="true">→</span></a>
      </div>
    </section>
  </main>

"""

# /access keeps every id that js/app.js drives (accessForm, emailGroup, email,
# code, errorMsg, testList, welcomeTitle, welcomeMsg, unlockedGrid). Issued codes,
# ?book= / ?code= parameters and localStorage keys are untouched.
ACCESS_MAIN = """  <main id="main" class="cp-access">
    <div class="cp-container">
      <div class="cp-access-panel form-card">
        <h1>Access your practice tests</h1>
        <p>Enter the code from your book to open its included practice tests.</p>

        <form id="accessForm" novalidate>
          <div class="form-group">
            <label for="code">Book access code</label>
            <input type="text" id="code" required autocomplete="off" autocapitalize="characters" spellcheck="false" aria-describedby="codeHint errorMsg">
            <div class="hint" id="codeHint">Printed on the last page of your book — for example <span style="font-family:ui-monospace,Menlo,monospace">CAST-XXXXX-XXXXX</span>. Paste it in; hyphens, spaces and capitals don't matter.</div>
          </div>
          <div class="form-group">
            <label for="firstName">First name <span style="font-weight:400;color:#526176">(optional)</span></label>
            <input type="text" id="firstName" autocomplete="given-name" maxlength="40">
            <div class="hint">So we can greet you — it appears at the top of the site on this browser.</div>
          </div>
          <div class="form-group" id="emailGroup">
            <label for="email">Email address</label>
            <input type="email" id="email" autocomplete="email" aria-describedby="emailHint">
            <div class="hint" id="emailHint">Used to register your access. We also send occasional study tips for your exam — unsubscribe any time.</div>
          </div>
          <button type="submit" class="btn btn-block btn-lg">Open my practice tests</button>
          <div class="message error" id="errorMsg" role="alert"></div>
        </form>
      </div>
      <p class="cp-access-help">Can't find your code, or it isn't working? <a href="mailto:support@certpathpublishing.store?subject=Help%20with%20my%20access%20code">Email support</a> — include the book title and we'll sort it out.</p>
    </div>

    <div id="testList" style="display: none;">
      <div class="section-header" style="margin: 3rem 0 2rem;">
        <div class="section-eyebrow">Your library</div>
        <h2 id="welcomeTitle">Your practice tests</h2>
        <p id="welcomeMsg"></p>
      </div>
      <div class="book-grid" id="unlockedGrid"></div>
    </div>
  </main>

"""

PAGES = [
    dict(out="exams.html", path="/exams",
         title="Exam Directory — Find Your Exam | CertPath Publishing",
         desc="Search every exam with a published CertPath study guide: PMP, CAPM, CAST, POSS, CSP, CHST, CCRN, CNOR, SAT, ACT, GED, TABE and more. Filter by field or free practice.",
         extra_head="", styles=PREMIUM_CSS, main=EXAMS_MAIN,
         scripts='  <script src="/js/premium.js?v=10" defer></script>\n'),
    dict(out="access.html", path="/access",
         title="Access My Practice Tests — CertPath Publishing",
         desc="Enter the access code printed in your CertPath book to open its included online practice tests.",
         extra_head="",
         # legacy style.css still styles the unlocked-library cards that app.js renders
         styles='  <link rel="stylesheet" href="/css/style.css?v=12">\n' + PREMIUM_CSS + '  <link rel="stylesheet" href="/css/premium-bridge.css?v=1">\n',
         main=ACCESS_MAIN,
         scripts='  <script src="/js/premium.js?v=10" defer></script>\n  <script src="/js/app.js?v=20260918g"></script>\n'),
]

for p in PAGES:
    html = HEAD.format(**{k: p[k] for k in ("title", "desc", "path", "extra_head", "styles")})
    html += header + "\n\n" + p["main"] + footer + "\n\n" + p["scripts"] + "</body>\n</html>\n"
    if p["out"] == "exams.html":
        html = html.replace('<a href="/exams" data-mega-trigger>', '<a href="/exams" data-mega-trigger aria-current="page">')
    (ROOT / p["out"]).write_text(html, encoding="utf-8")
    print("wrote", p["out"], len(html))


# ---------------------------------------------------------------------------
# Legacy pages: swap only the header and footer for the shared premium shell,
# leaving each page's own content, sample-quiz logic and structured data alone.
# Idempotent — safe to re-run (also after scripts/build-exam-pages.js regenerates
# the landing pages). quiz.html and pmp-exams.html are deliberately excluded:
# test and owned-material screens stay free of marketing chrome and motion.
# ---------------------------------------------------------------------------
LEGACY = ["cast", "poss", "mechanical-aptitude", "journeyman-electrician", "csp", "chst",
          "ccrn", "cnor", "sat", "psat", "act", "ged", "tabe", "sample", "ebook", "404",
          "blog/index", "blog/2026-04-18-welcome"]

SHELL_HEAD = ('  <!-- premium-shell -->\n'
              '  <script>document.documentElement.classList.add(\'cp-js\');setTimeout(function(){if(!window.__cpReady)document.documentElement.classList.remove(\'cp-js\')},2500);</script>\n'
              '  <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&display=swap" rel="stylesheet">\n'
              + PREMIUM_CSS +
              '  <link rel="stylesheet" href="/css/premium-bridge.css?v=1">\n')

for name in LEGACY:
    f = ROOT / (name + ".html")
    html = f.read_text(encoding="utf-8")
    html = re.sub(r'[ \t]*<header class="site-header">.*?</header>', lambda m: header, html, count=1, flags=re.S)
    html = re.sub(r'[ \t]*<a class="cp-skip".*?<div class="cp-drawer".*?\n  </div>', lambda m: header, html, count=1, flags=re.S)
    html = re.sub(r'[ \t]*<footer class="(?:footer|cp-footer)".*?</footer>', lambda m: footer, html, count=1, flags=re.S)
    if "<!-- premium-shell -->" not in html:
        html = html.replace("</head>", SHELL_HEAD + "</head>", 1)
        html = re.sub(r"<body(\s[^>]*)?>", '<body class="cp">', html, count=1)
        html = html.replace("</body>", '  <script src="/js/premium.js?v=10" defer></script>\n</body>', 1)
        # the floating unlock pill duplicates the header's "Access my tests"
        html = re.sub(r'\s*<script src="/js/floating-unlock\.js[^"]*"></script>', "", html)
    # keep cache-busting versions in step with the shell (css/js are cached for a year)
    html = re.sub(r'premium\.css\?v=\d+', 'premium.css?v=10', html)
    html = re.sub(r'premium\.js\?v=\d+', 'premium.js?v=10', html)
    if 'id="main"' not in html:
        html = html.replace('class="cp-skip" href="#main"', 'class="cp-skip" href="#content"', 1)
    f.write_text(html, encoding="utf-8")
    print("stamped", f.name)
