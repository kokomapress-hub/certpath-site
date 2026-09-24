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

PREMIUM_CSS = '  <link rel="stylesheet" href="/css/premium.css?v=11">\n'

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

MY_MAIN = """  <main id="main" class="cp-my">
    <div class="cp-container" id="myApp">
      <noscript><p class="cp-lead">Your study page needs JavaScript. You can still open your tests from <a href="/access">Access my tests</a>.</p></noscript>
    </div>
  </main>

"""

# ---------------------------------------------------------------------------
# /cast-course — free CAST video course (no gate). Lessons: data/cast-course.json,
# videos on R2 (cast/ prefix), thumbnails in img/cast-course/NN.webp (+ NN-sm.webp).
# ---------------------------------------------------------------------------
import html as _html
import json as _json

_course = _json.loads((ROOT / "data" / "cast-course.json").read_text(encoding="utf-8"))
_lessons = _course["lessons"]
_total_min = round(sum(l["seconds"] for l in _lessons) / 60)


def _mmss(s):
    return f"{s // 60}:{s % 60:02d}"


def _e(s):
    return _html.escape(s, quote=True)


_items = "\n".join(
    f'''              <li><a class="cp-yt-item" href="#lesson-{l["num"]}" data-lesson="{l["num"]}">
                <span class="cp-yt-thumb"><img src="/img/cast-course/{l["num"]}-sm.webp" alt="" width="240" height="135" loading="lazy" decoding="async"><em>{_mmss(l["seconds"])}</em><i class="cc-tick" aria-hidden="true">✓</i></span>
                <span class="cc-item-text"><small>Lesson {l["num"]} · {_e(l["module"])}</small><span class="cp-yt-name">{_e(l["title"])}</span></span></a></li>'''
    for l in _lessons)

_first = _lessons[0]
_ld = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "CAST Exam Prep — Free Video Course",
    "description": f"{len(_lessons)} free video lessons for the EEI CAST (Construction and Skilled Trades) test: mechanical concepts, reading comprehension, mathematical usage and graphic arithmetic.",
    "provider": {"@type": "Organization", "name": "CertPath Publishing", "sameAs": "https://certpathpublishing.store"},
    "isAccessibleForFree": True,
    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD", "category": "Free"},
    "hasCourseInstance": {"@type": "CourseInstance", "courseMode": "online", "courseWorkload": f"PT{_total_min}M"},
    "hasPart": [{
        "@type": "VideoObject",
        "name": f'CAST Lesson {l["num"]}: {l["title"]}',
        "description": f'CAST exam prep lesson {l["num"]} ({l["module"]}): {l["title"]}. Matches pages {l["pages"]} of the CertPath CAST Exam Study Guide.',
        "thumbnailUrl": f'https://certpathpublishing.store/img/cast-course/{l["num"]}.webp',
        "contentUrl": _course["videoBase"] + l["file"],
        "uploadDate": "2026-09-24",
        "duration": f'PT{l["seconds"] // 60}M{l["seconds"] % 60}S',
    } for l in _lessons],
}
# the player reads only what it needs; keep the payload small
_js_lessons = [{k: l[k] for k in ("num", "module", "title", "file", "seconds", "pages")} | ({"youtube": l["youtube"]} if l.get("youtube") else {}) for l in _lessons]

CAST_COURSE_HEAD = f"""  <meta property="og:image" content="https://certpathpublishing.store/img/cast-course/01.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">{_json.dumps(_ld, ensure_ascii=False)}</script>
  <style>
    #course {{ scroll-margin-top: 5rem; }}
    .cc-player .cp-yt-player video {{ position: absolute; inset: 0; width: 100%; height: 100%; background: #000; }}
    .cc-now {{ margin-top: 1.25rem; }}
    .cc-now small {{ display: block; font-size: .75rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--cp-bronze); margin-bottom: .375rem; }}
    .cc-now h2 {{ font-size: clamp(1.25rem, 2vw, 1.5rem); font-weight: 650; letter-spacing: -.02em; line-height: 1.3; color: var(--cp-navy); }}
    .cc-now p {{ margin-top: .5rem; font-size: .9375rem; color: var(--cp-muted); }}
    .cc-actions {{ display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.25rem; align-items: center; }}
    .cc-actions .cc-yt {{ font-size: .875rem; font-weight: 600; }}
    .cc-side-head {{ display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; padding: .25rem .5rem .75rem; }}
    .cc-side-head b {{ font-size: 1rem; color: var(--cp-navy); }}
    .cc-side-head span {{ font-size: .8125rem; color: var(--cp-muted); font-variant-numeric: tabular-nums; }}
    .cc-bar {{ height: 6px; border-radius: 3px; background: #ECEEF1; margin: 0 .5rem .875rem; overflow: hidden; }}
    .cc-bar i {{ display: block; height: 100%; width: 0; background: var(--cp-gold); transition: width var(--cp-medium) var(--cp-ease); }}
    .cc-side .cp-yt-list ol {{ max-height: 34rem; }}
    .cc-item-text {{ display: grid; gap: .125rem; min-width: 0; }}
    .cc-item-text small {{ font-size: .6875rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--cp-muted); }}
    .cc-tick {{ position: absolute; left: .25rem; top: .25rem; display: none; place-items: center; width: 1.25rem; height: 1.25rem; border-radius: 50%; background: var(--cp-green); color: #fff; font: 700 .6875rem var(--cp-sans); font-style: normal; }}
    .cp-yt-item.is-done .cc-tick {{ display: grid; }}
    .cc-book {{ display: grid; grid-template-columns: minmax(0, 12rem) 1fr; gap: clamp(1.5rem, 4vw, 3.5rem); align-items: center; }}
    .cc-book img {{ width: 100%; height: auto; border-radius: 6px; box-shadow: var(--cp-shadow); }}
    .cc-book ul {{ margin: 1.25rem 0 1.75rem; padding-left: 1.125rem; display: grid; gap: .5rem; color: var(--cp-body); }}
    .cc-book .cc-btns {{ display: flex; flex-wrap: wrap; gap: .75rem; }}
    .cc-note {{ margin-top: 2.5rem; font-size: .8125rem; line-height: 1.6; color: var(--cp-muted); max-width: 52rem; }}
    @media (max-width: 40rem) {{ .cc-book {{ grid-template-columns: 1fr; }} .cc-book img {{ max-width: 11rem; }} }}
  </style>
"""

CAST_COURSE_MAIN = f"""  <main id="main">
    <section class="cp-pagehead cp-dark">
      <div class="cp-container">
        <nav class="cp-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/cast">CAST</a><span aria-hidden="true">/</span><span>Free video course</span></nav>
        <h1 data-split>The CAST video course. <em>Free.</em></h1>
        <p class="cp-lead">{len(_lessons)} short lessons, about {_total_min} minutes in all, covering every part of the EEI CAST test: mechanical concepts, reading comprehension, math and graphic arithmetic. No sign-up, no email. Each lesson points you to the matching pages of the CertPath CAST Exam Study Guide.</p>
        <div class="cp-hero-actions" style="margin-top:2rem;display:flex;flex-wrap:wrap;gap:.75rem">
          <a class="cp-btn cp-btn-primary" href="#course">Start lesson 1 <span class="cp-arrow" aria-hidden="true">→</span></a>
          <a class="cp-btn cp-btn-ghost" href="/sample?book=cast">Try free CAST questions</a>
        </div>
      </div>
    </section>

    <section class="cp-section cp-yt" id="course" aria-label="Video lessons" style="padding-top:clamp(2rem,4vw,3.5rem)">
      <div class="cp-container">
        <div class="cp-yt-grid cc-player">
          <div>
            <div class="cp-yt-player" id="ccPlayer">
              <button type="button" class="cp-yt-poster" id="ccPoster" aria-label="Play lesson {_first["num"]}: {_e(_first["title"])}">
                <img id="ccPosterImg" src="/img/cast-course/{_first["num"]}.webp" alt="" width="1280" height="720" decoding="async">
                <span class="cp-yt-play" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>
              </button>
            </div>
            <div class="cc-now">
              <small id="ccTag">Lesson {_first["num"]} · {_e(_first["module"])}</small>
              <h2 id="ccTitle">{_e(_first["title"])}</h2>
              <p id="ccPages">Study guide pages {_first["pages"]} · {_mmss(_first["seconds"])}</p>
            </div>
            <div class="cc-actions">
              <button type="button" class="cp-btn cp-btn-navy" id="ccNext">Next lesson <span class="cp-arrow" aria-hidden="true">→</span></button>
              <a class="cc-yt" id="ccYt" href="#" target="_blank" rel="noopener" hidden>Also on YouTube ↗</a>
            </div>
          </div>
          <div class="cp-yt-side cc-side">
            <div class="cc-side-head"><b>Course lessons</b><span id="ccCount">0 of {len(_lessons)} watched</span></div>
            <div class="cc-bar" aria-hidden="true"><i id="ccBar"></i></div>
            <div class="cp-yt-list">
              <ol>
{_items}
              </ol>
            </div>
          </div>
        </div>
        <p class="cc-note">A lesson is marked watched once you reach 90% of it; progress is saved in this browser only. Videos stream from CertPath's own servers. Nothing loads until you press play.</p>
      </div>
    </section>

    <section class="cp-section" style="padding-top:0">
      <div class="cp-container cc-book">
        <a href="/books/cast"><img src="/img/covers/cast.webp" alt="CAST Exam Study Guide by CertPath Publishing" width="400" height="600" loading="lazy" decoding="async"></a>
        <div>
          <span class="cp-eyebrow">Built to pair with the book</span>
          <h2 class="cp-h2">Watch the lesson, then <em>practice it.</em></h2>
          <ul>
            <li>The <b>CAST Exam Study Guide</b> covers all four test parts, with worked examples for every lesson here.</li>
            <li>3 full-length practice tests in the book, with detailed answer explanations.</li>
            <li>330 timed online questions, opened with the access code printed in the book.</li>
          </ul>
          <div class="cc-btns">
            <a class="cp-btn cp-btn-primary" href="https://www.amazon.com/dp/B0GWWTVNPM" target="_blank" rel="noopener">Get the book on Amazon <span class="cp-arrow" aria-hidden="true">↗</span></a>
            <a class="cp-btn cp-btn-ghost" href="/books/cast">Online practice tests</a>
            <a class="cp-btn cp-btn-ghost" href="/cast">About the CAST test</a>
          </div>
          <p class="cc-note">CAST (Construction and Skilled Trades) is a selection test administered for Edison Electric Institute member companies. The Edison Electric Institute is not affiliated with and does not endorse CertPath Publishing or this course.</p>
        </div>
      </div>
    </section>
  </main>

"""

CAST_COURSE_JS = """  <script>
(function(){
  var L=""" + _json.dumps(_js_lessons, ensure_ascii=False) + """;
  var BASE='""" + _course["videoBase"] + """', KEY='certpath_cast_course_progress', DONE_AT=0.9;
  var $=function(id){return document.getElementById(id)};
  var player=$('ccPlayer'), items=[].slice.call(document.querySelectorAll('.cc-side .cp-yt-item'));
  function prog(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
  function save(p){try{localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}}
  function mmss(s){return Math.floor(s/60)+':'+('0'+s%60).slice(-2)}
  var cur=L[0];
  function paint(){
    var p=prog(), n=0;
    items.forEach(function(a){var d=!!p[a.dataset.lesson]; if(d)n++; a.classList.toggle('is-done',d);});
    $('ccCount').textContent=n+' of '+L.length+' watched';
    $('ccBar').style.width=Math.round(n/L.length*100)+'%';
  }
  function show(l){
    cur=l;
    $('ccTag').textContent='Lesson '+l.num+' · '+l.module;
    $('ccTitle').textContent=l.title;
    $('ccPages').textContent='Study guide pages '+l.pages+' · '+mmss(l.seconds);
    var yt=$('ccYt'); if(l.youtube){yt.href='https://www.youtube.com/watch?v='+l.youtube; yt.hidden=false;} else yt.hidden=true;
    items.forEach(function(a){ if(a.dataset.lesson===l.num) a.setAttribute('aria-current','true'); else a.removeAttribute('aria-current'); });
  }
  function poster(l){
    player.innerHTML='<button type="button" class="cp-yt-poster" aria-label="Play lesson '+l.num+'"><img src="/img/cast-course/'+l.num+'.webp" alt="" width="1280" height="720" decoding="async"><span class="cp-yt-play" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button>';
  }
  function play(l){
    var v=document.createElement('video');
    v.controls=true; v.autoplay=true; v.playsInline=true; v.preload='metadata';
    v.poster='/img/cast-course/'+l.num+'.webp'; v.src=BASE+l.file;
    v.setAttribute('controlsList','nodownload');
    v.addEventListener('timeupdate',function(){
      if(v.duration && v.currentTime/v.duration>=DONE_AT){var p=prog(); if(!p[l.num]){p[l.num]=Date.now(); save(p); paint();}}
    });
    v.addEventListener('ended',function(){var i=L.indexOf(l); if(i<L.length-1) go(L[i+1],false);});
    v.addEventListener('error',function(){player.innerHTML='<div style="position:absolute;inset:0;display:grid;place-items:center;color:#fff;padding:1.5rem;text-align:center">This lesson could not load. Please refresh, or email support@certpathpublishing.store.</div>';});
    player.innerHTML=''; player.appendChild(v);
    var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){});
  }
  function go(l,autoplay){
    show(l);
    if(autoplay) play(l); else poster(l);
    if(history.replaceState) history.replaceState(null,'','#lesson-'+l.num);
  }
  player.addEventListener('click',function(ev){ if(ev.target.closest('.cp-yt-poster')) play(cur); });
  items.forEach(function(a){
    a.addEventListener('click',function(ev){
      ev.preventDefault();
      go(L.filter(function(l){return l.num===a.dataset.lesson})[0],true);
      if(window.innerWidth<960) player.scrollIntoView({block:'center',behavior:'smooth'});
    });
  });
  $('ccNext').addEventListener('click',function(){ go(L[(L.indexOf(cur)+1)%L.length],true); });
  var m=/^#lesson-(\\d\\d)$/.exec(location.hash), start=m&&L.filter(function(l){return l.num===m[1]})[0];
  if(start){ go(start,false); document.getElementById('course').scrollIntoView(); } else show(cur);
  paint();
})();
  </script>
"""

PAGES = [
    dict(out="exams.html", path="/exams",
         title="Exam Directory — Find Your Exam | CertPath Publishing",
         desc="Search every exam with a published CertPath study guide: PMP, CAPM, CAST, POSS, CSP, CHST, CCRN, CNOR, SAT, ACT, GED, TABE and more. Filter by field or free practice.",
         extra_head="", styles=PREMIUM_CSS, main=EXAMS_MAIN,
         scripts='  <script src="/js/premium.js?v=13" defer></script>\n'),
    dict(out="access.html", path="/access",
         title="Access My Practice Tests — CertPath Publishing",
         desc="Enter the access code printed in your CertPath book to open its included online practice tests.",
         extra_head="",
         # legacy style.css still styles the unlocked-library cards that app.js renders
         styles='  <link rel="stylesheet" href="/css/style.css?v=12">\n' + PREMIUM_CSS + '  <link rel="stylesheet" href="/css/premium-bridge.css?v=1">\n',
         main=ACCESS_MAIN,
         scripts='  <script src="/js/premium.js?v=13" defer></script>\n  <script src="/js/app.js?v=20260923"></script>\n'),
    dict(out="my.html", path="/my",
         title="My Study Page — CertPath Publishing",
         desc="Your CertPath practice tests, scores, unfinished attempts and free cheat sheets in one place.",
         extra_head='  <meta name="robots" content="noindex">\n', styles=PREMIUM_CSS, main=MY_MAIN,
         scripts='  <script src="/js/premium.js?v=13" defer></script>\n  <script src="/js/my.js?v=1" defer></script>\n'),
    dict(out="cast-course.html", path="/cast-course",
         title="Free CAST Exam Video Course — 10 Lessons | CertPath Publishing",
         desc=f"Free CAST test prep video course: {len(_lessons)} lessons (about {_total_min} minutes) on mechanical concepts, reading comprehension, math and graphic arithmetic for the EEI Construction and Skilled Trades test. No sign-up.",
         extra_head=CAST_COURSE_HEAD, styles=PREMIUM_CSS, main=CAST_COURSE_MAIN,
         scripts='  <script src="/js/premium.js?v=13" defer></script>\n' + CAST_COURSE_JS),
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
          "blog/index", "blog/2026-04-18-welcome", "privacy", "terms", "refunds"]

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
        html = html.replace("</body>", '  <script src="/js/premium.js?v=13" defer></script>\n</body>', 1)
        # the floating unlock pill duplicates the header's "Access my tests"
        html = re.sub(r'\s*<script src="/js/floating-unlock\.js[^"]*"></script>', "", html)
    # keep cache-busting versions in step with the shell (css/js are cached for a year)
    html = re.sub(r'premium\.css\?v=\d+', 'premium.css?v=11', html)
    html = re.sub(r'premium\.js\?v=\d+', 'premium.js?v=13', html)
    if 'id="main"' not in html:
        html = html.replace('class="cp-skip" href="#main"', 'class="cp-skip" href="#content"', 1)
    f.write_text(html, encoding="utf-8")
    print("stamped", f.name)
