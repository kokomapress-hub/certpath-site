// CertPath Publishing — marketing-page behaviour (2026 revamp).
// Everything here is progressive enhancement: every page reads and navigates
// without it. Not loaded on quiz/test screens.

(function () {
  'use strict';
  window.__cpReady = true;

  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  // ---------- Catalog: exams.json (directory) joined to books.json (products) ----------
  var catalogPromise = null;
  var bookPages = {};
  function bookHref(b) { return bookPages[b.slug] || b.amazonUrl || '/access?book=' + b.slug; }
  function loadCatalog() {
    if (catalogPromise) return catalogPromise;
    catalogPromise = Promise.all([
      fetch('/data/exams.json').then(function (r) { return r.json(); }),
      fetch('/data/books.json').then(function (r) { return r.json(); }),
      fetch('/data/book-pages.json').then(function (r) { return r.json(); }).catch(function () { return {}; })
    ]).then(function (res) {
      bookPages = res[2] || {};
      var bySlug = {};
      res[1].books.forEach(function (b) { bySlug[b.slug] = b; });
      var cats = {};
      res[0].categories.forEach(function (c) { cats[c.id] = c.label; });
      // Only exams with at least one published product are ever shown.
      var exams = res[0].exams.map(function (e) {
        var products = e.products.map(function (s) { return bySlug[s]; }).filter(function (b) { return b && b.published; });
        return Object.assign({}, e, { items: products, catLabel: cats[e.category] });
      }).filter(function (e) { return e.items.length; });
      var published = res[1].books.filter(function (b) { return b.published && b.cover && b.title.indexOf('Free ') !== 0; });
      return { exams: exams, categories: res[0].categories, published: published };
    });
    return catalogPromise;
  }

  function examLinks(e) {
    var first = e.items[0];
    var primary = e.route
      ? { href: e.route, label: 'Explore ' + e.acronym + ' prep', ext: false }
      : { href: bookHref(first), label: 'View the ' + e.acronym + ' book', ext: !bookPages[first.slug] && !!first.amazonUrl };
    var secondary = e.freePractice
      ? { href: e.route + (e.category === 'project' ? '' : '#sample-quiz'), label: 'Free practice' }
      : { href: '/sample?book=' + first.slug, label: 'Free sample' };
    return { primary: primary, secondary: secondary };
  }

  function examCard(e, i, detailed) {
    var l = examLinks(e);
    var first = e.items[0];
    var titles = detailed && e.items.length > 1
      ? '<ul class="cp-titles">' + e.items.map(function (b) { return '<li><a href="' + esc(bookHref(b)) + '">' + esc(b.title) + '</a></li>'; }).join('') + '</ul>'
      : '';
    return '' +
      '<article class="cp-exam is-entering" style="--cp-i:' + i + '">' +
        '<div class="cp-exam-cover"><img src="' + esc(first.cover) + '" alt="Cover of ' + esc(first.title) + '" width="170" height="220" loading="lazy" decoding="async"></div>' +
        '<div>' +
          '<span class="cp-exam-cat">' + esc(e.catLabel) + '</span>' +
          '<h3>' + esc(e.acronym) + '</h3>' +
          '<p class="cp-exam-full">' + esc(e.name) + (e.owner ? ' · ' + esc(e.owner) : '') + '</p>' +
          '<ul class="cp-exam-formats">' + e.formats.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
          titles +
          '<div class="cp-exam-actions">' +
            '<a class="cp-textlink" href="' + esc(l.primary.href) + '"' + (l.primary.ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l.primary.label) + ' <span class="cp-arrow" aria-hidden="true">' + (l.primary.ext ? '↗' : '→') + '</span></a>' +
            '<a class="cp-textlink is-quiet" href="' + esc(l.secondary.href) + '">' + esc(l.secondary.label) + '</a>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  // ---------- Header ----------
  function initHeader() {
    var header = $('.cp-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // "Explore exams" is a plain link in the HTML; upgrade it to a disclosure.
    var link = $('[data-mega-trigger]', header);
    var mega = $('.cp-mega', header);
    if (link && mega) {
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'cp-mega');
      btn.innerHTML = esc(link.textContent.trim()) + ' <svg class="cp-caret" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
      link.replaceWith(btn);
      var built = false;
      var setOpen = function (open) {
        btn.setAttribute('aria-expanded', String(open));
        mega.classList.toggle('is-open', open);
        if (open && !built) { built = true; buildMega(mega); }
      };
      btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
      doc.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setOpen(false); btn.focus(); }
      });
      doc.addEventListener('click', function (ev) {
        if (!header.contains(ev.target)) setOpen(false);
      });
      mega.addEventListener('focusout', function (ev) {
        if (ev.relatedTarget && !mega.contains(ev.relatedTarget) && ev.relatedTarget !== btn) setOpen(false);
      });
    }

    // Mobile drawer: modal, focus-trapped, background inert, focus returns to trigger.
    var menuBtn = $('.cp-menu-btn');
    var drawer = $('.cp-drawer');
    if (menuBtn && drawer) {
      var closeBtn = $('.cp-drawer-close', drawer);
      var others = function () { return $$('body > *').filter(function (n) { return n !== drawer && n.tagName !== 'SCRIPT'; }); };
      var open = function () {
        drawer.classList.add('is-open');
        menuBtn.setAttribute('aria-expanded', 'true');
        others().forEach(function (n) { n.inert = true; });
        doc.body.style.overflow = 'hidden';
        closeBtn.focus();
      };
      var close = function () {
        drawer.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        others().forEach(function (n) { n.inert = false; });
        doc.body.style.overflow = '';
        menuBtn.focus();
      };
      menuBtn.addEventListener('click', open);
      closeBtn.addEventListener('click', close);
      drawer.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') { close(); return; }
        if (ev.key !== 'Tab') return;
        var f = $$('a, button', drawer);
        if (ev.shiftKey && doc.activeElement === f[0]) { ev.preventDefault(); f[f.length - 1].focus(); }
        else if (!ev.shiftKey && doc.activeElement === f[f.length - 1]) { ev.preventDefault(); f[0].focus(); }
      });
    }
  }

  function buildMega(mega) {
    var inner = $('.cp-mega-inner', mega);
    loadCatalog().then(function (c) {
      inner.innerHTML = c.categories.map(function (cat) {
        var list = c.exams.filter(function (e) { return e.category === cat.id; })
          .sort(function (a, b) { return a.acronym.localeCompare(b.acronym); });
        if (!list.length) return '';
        return '<div><h3>' + esc(cat.label) + '</h3><ul>' + list.map(function (e) {
          var href = e.route || '/exams?q=' + encodeURIComponent(e.acronym);
          return '<li><a href="' + esc(href) + '">' + esc(e.acronym) + '<span>' + esc(e.name) + '</span></a></li>';
        }).join('') + '</ul></div>';
      }).join('');
    }).catch(function () { /* static fallback links stay in place */ });
  }

  // ---------- Reveal + gold path ----------
  function initReveal() {
    var targets = $$('[data-reveal], [data-draw]');
    if (!targets.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (n) { io.observe(n); });

    // Belt and braces: if observer callbacks are throttled (background tab,
    // embedded webview), a plain scroll check still un-hides what is on screen.
    var pending = false;
    window.addEventListener('scroll', function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () {
        pending = false;
        targets.forEach(function (n) {
          if (!n.classList.contains('is-in') && n.getBoundingClientRect().top < window.innerHeight * 0.92) n.classList.add('is-in');
        });
      });
    }, { passive: true });
  }

  // The approach path fills as the reader moves through the three steps.
  // Scroll-linked, never scroll-jacked: it only reads position.
  function initSteps() {
    var wrap = $('.cp-steps');
    if (!wrap) return;
    var steps = $$('.cp-step', wrap);
    if (reduceMotion) { steps.forEach(function (s) { s.classList.add('is-reached'); }); return; }
    var ticking = false;
    var update = function () {
      ticking = false;
      if (wrap.closest('.cp-story.is-pinned')) return; // the pinned story drives the path instead
      var r = wrap.getBoundingClientRect();
      var anchor = window.innerHeight * 0.62;
      var p = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
      wrap.style.setProperty('--cp-progress', p.toFixed(4));
      steps.forEach(function (s) {
        var node = $('.cp-step-node', s).getBoundingClientRect();
        s.classList.toggle('is-reached', node.top + node.height / 2 <= anchor);
      });
    };
    var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    update();
  }

  // ---------- Hero ----------
  function initHeroTabs() {
    var list = $('.cp-panel-tabs');
    if (!list) return;
    var tabs = $$('[role="tab"]', list);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        $('#' + t.getAttribute('aria-controls')).classList.toggle('is-active', on);
      });
      var tag = $('[data-panel-step]');
      if (tag) tag.textContent = tab.dataset.step;
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
        if (ev.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length], true);
      });
    });
  }

  function initHeroDepth() {
    var stage = $('.cp-stage');
    if (!stage || reduceMotion || window.innerWidth < 960) return;
    var book = $('.cp-stage-book', stage);
    var panel = $('.cp-panel', stage);
    var bg = $('.cp-hero > .cp-bgphoto');
    var ticking = false;
    var update = function () {
      ticking = false;
      var y = Math.min(window.scrollY, 700);
      book.style.transform = 'translate3d(0,' + (y * -0.05).toFixed(1) + 'px,0)';
      panel.style.transform = 'translate3d(0,' + (y * -0.1).toFixed(1) + 'px,0)';
      if (bg) bg.style.transform = 'translate3d(0,' + (y * 0.12).toFixed(1) + 'px,0)';
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  // ---------- Exam finder ----------
  function initFinder() {
    var root = $('[data-finder]');
    if (!root) return;
    var grid = $('.cp-exam-grid', root);
    var input = $('input[type="search"]', root);
    var clear = $('[data-clear]', root);
    var chipsEl = $('.cp-chips', root);
    var count = $('.cp-count', root);
    var limit = Number(root.dataset.limit || 0);
    var syncUrl = root.hasAttribute('data-sync-url');
    var detailed = root.hasAttribute('data-detailed');
    var state = { q: '', cat: 'all', free: false };
    var featured = (root.dataset.featured || '').split(',').filter(Boolean);

    if (syncUrl) {
      var p = new URLSearchParams(location.search);
      state.q = p.get('q') || '';
      state.cat = p.get('category') || 'all';
      state.free = p.get('practice') === 'free';
      input.value = state.q;
    }

    loadCatalog().then(function (c) {
      var chips = [{ id: 'all', label: 'All exams' }].concat(c.categories.filter(function (cat) {
        return c.exams.some(function (e) { return e.category === cat.id; });
      }));
      chipsEl.innerHTML = chips.map(function (ch) {
        return '<button type="button" class="cp-chip" data-cat="' + esc(ch.id) + '" aria-pressed="false">' + esc(ch.label) + '</button>';
      }).join('') + (syncUrl ? '<button type="button" class="cp-chip" data-free aria-pressed="false">Free practice available</button>' : '');

      var matches = function (e) {
        if (state.cat !== 'all' && e.category !== state.cat) return false;
        if (state.free && !e.freePractice) return false;
        if (!state.q) return true;
        var hay = [e.acronym, e.name, e.owner, e.catLabel].concat(e.aliases || [], e.items.map(function (b) { return b.title; })).join(' ').toLowerCase();
        return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
      };

      var render = function () {
        var all = c.exams.filter(matches);
        var filtering = state.q || state.cat !== 'all' || state.free;
        var shown = all;
        if (limit && !filtering) {
          // Homepage: one curated row spanning every field, not the first N records.
          shown = featured.length
            ? featured.map(function (id) { return all.filter(function (e) { return e.id === id; })[0]; }).filter(Boolean)
            : all.slice(0, limit);
        }
        $$('.cp-chip[data-cat]', chipsEl).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === state.cat)); });
        var freeChip = $('.cp-chip[data-free]', chipsEl);
        if (freeChip) freeChip.setAttribute('aria-pressed', String(state.free));
        clear.hidden = !state.q;

        if (!all.length) {
          grid.innerHTML = '<div class="cp-empty"><h3>No exams match “' + esc(state.q) + '”.</h3><p>Try an acronym such as PMP, CAST or GED — or <a href="mailto:support@certpathpublishing.store">tell us which exam you are preparing for</a>.</p><p style="margin-top:1rem"><button type="button" class="cp-btn cp-btn-ghost cp-btn-sm" data-reset>Show all exams</button></p></div>';
          count.textContent = 'No exams found.';
        } else {
          grid.innerHTML = shown.map(function (e, i) { return examCard(e, i, detailed); }).join('');
          count.textContent = filtering || !limit
            ? all.length + (all.length === 1 ? ' exam' : ' exams') + (filtering ? ' found' : ' with published CertPath titles')
            : 'Showing ' + shown.length + ' of ' + all.length + ' exams';
        }
        if (syncUrl) {
          var q = new URLSearchParams();
          if (state.q) q.set('q', state.q);
          if (state.cat !== 'all') q.set('category', state.cat);
          if (state.free) q.set('practice', 'free');
          var s = q.toString();
          history.replaceState(null, '', location.pathname + (s ? '?' + s : ''));
        }
      };

      var t;
      input.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(function () { state.q = input.value.trim(); render(); }, 120);
      });
      clear.addEventListener('click', function () { input.value = ''; state.q = ''; render(); input.focus(); });
      chipsEl.addEventListener('click', function (ev) {
        var b = ev.target.closest('.cp-chip');
        if (!b) return;
        if (b.hasAttribute('data-free')) state.free = !state.free; else state.cat = b.dataset.cat;
        render();
      });
      grid.addEventListener('click', function (ev) {
        if (!ev.target.closest('[data-reset]')) return;
        state = { q: '', cat: 'all', free: false }; input.value = ''; render(); input.focus();
      });
      render();
    }).catch(function () { /* the static no-JS list stays in place */ });
  }

  // ---------- Catalog shelf ----------
  function initShelf() {
    var shelf = $('.cp-shelf');
    if (!shelf) return;
    var prev = $('[data-shelf-prev]'), next = $('[data-shelf-next]');
    loadCatalog().then(function (c) {
      shelf.innerHTML = c.published.map(function (b) {
        var href = bookHref(b);
        var ext = !bookPages[b.slug] && !!b.amazonUrl;
        return '<a href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<span class="cp-tiltbox" data-tilt><img src="' + esc(b.cover) + '" alt="" width="192" height="248" loading="lazy" decoding="async"></span>' +
          esc(b.title) + (ext ? ' <span aria-hidden="true">↗</span><span class="cp-sr"> (opens Amazon)</span>' : '') + '</a>';
      }).join('');
      var sync = function () {
        prev.disabled = shelf.scrollLeft < 8;
        next.disabled = shelf.scrollLeft + shelf.clientWidth > shelf.scrollWidth - 8;
      };
      var by = function (dir) { shelf.scrollBy({ left: dir * shelf.clientWidth * 0.8, behavior: reduceMotion ? 'auto' : 'smooth' }); };
      prev.addEventListener('click', function () { by(-1); });
      next.addEventListener('click', function () { by(1); });
      shelf.addEventListener('scroll', sync, { passive: true });
      sync();
    }).catch(function () {});
  }

  // ---------- Working sample question ----------
  function initQuiz() {
    $$('.cp-quiz:not(.cp-story-reviewed)').forEach(function (quiz) {
      var opts = $$('.cp-opt', quiz);
      var explain = $('.cp-explain', quiz);
      var status = $('[data-quiz-status]', quiz);
      var reset = $('[data-quiz-reset]', quiz);
      opts.forEach(function (o) {
        o.addEventListener('click', function () {
          var right = o.hasAttribute('data-correct');
          opts.forEach(function (x) {
            x.disabled = true;
            if (x.hasAttribute('data-correct')) x.classList.add('is-right');
          });
          if (!right) o.classList.add('is-wrong');
          explain.hidden = false;
          status.textContent = right ? 'Correct.' : 'Not quite — the best answer is C.';
          reset.hidden = false;
        });
      });
      reset.addEventListener('click', function () {
        opts.forEach(function (x) { x.disabled = false; x.classList.remove('is-right', 'is-wrong'); });
        explain.hidden = true; status.textContent = ''; reset.hidden = true; opts[0].focus();
      });
    });
  }

  // ---------- Sample-page lightbox ----------
  function initLightbox() {
    var dlg = $('.cp-lightbox');
    if (!dlg || !dlg.showModal) return;
    $$('[data-lightbox]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        $('img', dlg).src = btn.dataset.lightbox;
        $('img', dlg).alt = btn.dataset.alt || '';
        dlg.showModal();
      });
    });
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); });
  }

  // ---------- YouTube: series tabs + click-to-play (no YouTube player loads until asked) ----------
  function initVideos() {
    var player = $('#ytPlayer');
    if (!player) return;
    var now = $('#ytNow');
    var tabs = $$('.cp-yt-tabs [role="tab"]');
    var items = $$('.cp-yt-item');

    var play = function (id, title) {
      var f = doc.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&modestbranding=1';
      f.title = title;
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.allowFullscreen = true;
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      player.innerHTML = '';
      player.appendChild(f);
      now.textContent = title;
      items.forEach(function (a) {
        if (a.dataset.yt === id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    };

    player.addEventListener('click', function (ev) {
      var poster = ev.target.closest('.cp-yt-poster');
      if (poster) play(poster.dataset.yt, now.textContent);
    });
    items.forEach(function (a) {
      a.addEventListener('click', function (ev) {
        if (ev.metaKey || ev.ctrlKey || ev.shiftKey) return; // let people open YouTube in a new tab
        ev.preventDefault();
        play(a.dataset.yt, a.dataset.title);
        if (window.innerWidth < 960) player.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        $('#' + t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (ev) {
        if (ev.key === 'ArrowRight') select(tabs[(i + 1) % tabs.length], true);
        if (ev.key === 'ArrowLeft') select(tabs[(i - 1 + tabs.length) % tabs.length], true);
      });
    });
  }

  // ---------- Headline: split into words so they can rise in ----------
  function initSplit() {
    $$('[data-split]').forEach(function (h) {
      if (reduceMotion) { h.classList.add('is-split'); return; }
      var label = h.textContent.replace(/\s+/g, ' ').trim();
      var holder = doc.createElement('span');
      holder.setAttribute('aria-hidden', 'true');
      var w = 0;
      var word = function (node) {
        var outer = doc.createElement('span'); outer.className = 'cp-w';
        var inner = doc.createElement('span'); inner.style.setProperty('--w', w++);
        inner.appendChild(node); outer.appendChild(inner); return outer;
      };
      Array.prototype.slice.call(h.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            holder.appendChild(/^\s+$/.test(part) ? doc.createTextNode(' ') : word(doc.createTextNode(part)));
          });
        } else { holder.appendChild(word(n.cloneNode(true))); }
      });
      h.setAttribute('aria-label', label);
      h.textContent = '';
      h.appendChild(holder);
      h.classList.add('is-split');
    });
  }

  // ---------- 3D tilt: one delegated listener covers static and generated covers ----------
  function initTilt() {
    if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return;
    var cur = null, frame = 0, last = null;
    var reset = function (el) { el.classList.remove('is-tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.style.setProperty('--ts', '1'); };
    var apply = function () {
      frame = 0;
      if (!cur || !last) return;
      var r = cur.getBoundingClientRect();
      var px = Math.max(0, Math.min(1, (last.clientX - r.left) / r.width));
      var py = Math.max(0, Math.min(1, (last.clientY - r.top) / r.height));
      cur.style.setProperty('--ry', ((px - 0.5) * 16).toFixed(2) + 'deg');
      cur.style.setProperty('--rx', ((0.5 - py) * 12).toFixed(2) + 'deg');
      cur.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
      cur.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      cur.style.setProperty('--ts', '1.03');
    };
    doc.addEventListener('pointermove', function (ev) {
      var t = ev.target.closest ? ev.target.closest('[data-tilt]') : null;
      if (cur && cur !== t) { reset(cur); cur = null; }
      if (!t) return;
      cur = t; last = ev; t.classList.add('is-tilting');
      if (!frame) frame = requestAnimationFrame(apply);
    }, { passive: true });
    doc.documentElement.addEventListener('pointerleave', function () { if (cur) { reset(cur); cur = null; } });
  }

  // ---------- Count-up for real catalog numbers ----------
  function initCount() {
    var els = $$('[data-count], .cp-stats-grid b');
    if (!els.length || reduceMotion || !('IntersectionObserver' in window)) return;
    var run = function (el) {
      var target = Number(el.dataset.count || el.textContent.replace(/[^0-9]/g, ''));
      if (!target || /[a-z]/i.test(el.textContent)) return;
      var suffix = el.dataset.suffix || '';
      var t0 = performance.now(), dur = 1100;
      var tick = function (now) {
        var k = Math.min(1, (now - t0) / dur);
        var eased = 1 - Math.pow(1 - k, 4);
        el.textContent = Math.round(target * eased).toLocaleString('en-US') + (k === 1 ? suffix : '');
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); run(en.target); } });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  // ---------- Pinned product story: page -> question -> explanation ----------
  function initStory() {
    var story = $('[data-story]');
    if (!story) return;
    var wrap = $('.cp-steps', story);
    var steps = $$('.cp-step', story);
    var quiz = $('.cp-quiz', story);
    var reviewed = null, active = -1, ticking = false;

    var buildReviewed = function () {
      if (reviewed || !quiz) return;
      reviewed = quiz.cloneNode(true);
      reviewed.classList.add('cp-story-reviewed');
      $$('[id]', reviewed).forEach(function (n) { n.removeAttribute('id'); });
      $$('.cp-opt', reviewed).forEach(function (o) { o.disabled = true; if (o.hasAttribute('data-correct')) o.classList.add('is-right'); });
      $('.cp-quiz-top span', reviewed).textContent = 'ANSWER REVIEW';
      var ex = $('.cp-explain', reviewed); ex.hidden = false;
      ex.insertAdjacentHTML('beforeend', ' <strong style="margin-top:.625rem">Closest distractor: A</strong>A draft to react to is not the same as co-creating shared understanding.');
      var st = $('[data-quiz-status]', reviewed); if (st) st.remove();
      var rs = $('[data-quiz-reset]', reviewed); if (rs && rs.parentNode) rs.parentNode.remove();
      steps[2].appendChild(reviewed);
      steps[2].setAttribute('data-swap', '');
      var hint = doc.createElement('p');
      hint.className = 'cp-story-hint';
      hint.innerHTML = '<i></i>Keep scrolling — the page, the question and the explanation follow in order.';
      wrap.appendChild(hint);
    };

    var eligible = function () { return !reduceMotion && window.innerWidth >= 1024 && window.innerHeight >= 760; };

    var update = function () {
      ticking = false;
      if (!story.classList.contains('is-pinned')) return;
      var r = story.getBoundingClientRect();
      var span = r.height - window.innerHeight;
      var p = Math.max(0, Math.min(1, (-r.top + window.innerHeight * 0.12) / span));
      var idx = p < 0.34 ? 0 : p < 0.68 ? 1 : 2;
      wrap.style.setProperty('--cp-progress', p.toFixed(4));
      if (idx === active) return;
      active = idx;
      steps.forEach(function (s, i) {
        s.classList.toggle('is-active', i === idx);
        s.classList.toggle('is-past', i < idx);
        s.classList.toggle('is-reached', i <= idx);
      });
    };

    var sync = function () {
      var on = eligible();
      if (on) buildReviewed();
      story.classList.toggle('is-pinned', on);
      if (!on) { steps.forEach(function (s) { s.classList.remove('is-active', 'is-past'); }); active = -1; }
      update();
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', sync);
    sync();
  }

  // ---------- One continuous gold path, drawn by scrolling ----------
  function initPathline() {
    var main = $('[data-pathline]');
    if (!main || reduceMotion) return;
    var line = doc.createElement('div');
    line.className = 'cp-pathline';
    line.setAttribute('aria-hidden', 'true');
    line.innerHTML = '<span class="cp-pathline-track"></span><span class="cp-pathline-fill"></span>';
    main.appendChild(line);
    var fill = $('.cp-pathline-fill', line);
    var nodes = [], top = 0, height = 0, ticking = false;

    var layout = function () {
      nodes.forEach(function (n) { n.el.remove(); });
      nodes = [];
      var mainRect = main.getBoundingClientRect();
      var box = $('.cp-container', main).getBoundingClientRect();
      var secs = $$(':scope > section', main);
      var first = secs[0].getBoundingClientRect();
      var lastHead = $('h2', secs[secs.length - 1]) || secs[secs.length - 1];
      top = first.bottom - mainRect.top;
      height = lastHead.getBoundingClientRect().top - mainRect.top - top + 24;
      line.style.left = Math.max(12, box.left - 30) + 'px';
      line.style.top = top + 'px';
      line.style.height = height + 'px';
      secs.slice(1).forEach(function (sec) {
        var head = $('.cp-eyebrow', sec) || $('h2', sec);
        if (!head || sec.hidden) return;
        var y = head.getBoundingClientRect().top - mainRect.top - top + 7;
        if (y < 0 || y > height) return;
        var el = doc.createElement('span');
        el.className = 'cp-pathline-node' + (sec.classList.contains('cp-dark') ? ' is-dark' : '');
        el.style.top = y + 'px';
        line.appendChild(el);
        nodes.push({ el: el, y: y });
      });
      update();
    };
    var update = function () {
      ticking = false;
      var tip = window.scrollY + window.innerHeight * 0.62 - (main.getBoundingClientRect().top + window.scrollY) - top;
      var k = Math.max(0, Math.min(1, tip / height));
      fill.style.transform = 'scaleY(' + k.toFixed(4) + ')';
      nodes.forEach(function (n) { n.el.classList.toggle('is-on', n.y <= tip); });
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', layout);
    window.addEventListener('load', layout);
    if ('ResizeObserver' in window) new ResizeObserver(layout).observe(main);
    layout();
  }

  // ---------- Shared-element transition: the clicked cover travels to its book page ----------
  function initCoverTransition() {
    doc.addEventListener('click', function (ev) {
      var a = ev.target.closest ? ev.target.closest('a[href^="/books/"]') : null;
      if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
      var img = $('img', a) || $('img', a.closest('.cp-exam') || a);
      if (!img) return;
      $$('.cp-bookhero-cover img').forEach(function (n) { n.style.viewTransitionName = 'none'; });
      img.style.viewTransitionName = 'book-cover';
    }, true);
  }

  // ---------- Reviews: shown only when real ones have been added ----------
  function initReviews() {
    var sec = $('[data-reviews]');
    if (!sec) return;
    fetch('/data/reviews.json').then(function (r) { return r.json(); }).then(function (d) {
      var list = (d.reviews || []).filter(function (r) { return r.quote && r.name; });
      if (!list.length) return;
      $('.cp-reviews-grid', sec).innerHTML = list.slice(0, 6).map(function (r) {
        var stars = Math.max(1, Math.min(5, Number(r.stars) || 5));
        return '<figure class="cp-review"><div class="cp-review-stars" aria-label="' + stars + ' out of 5 stars">' + '★★★★★'.slice(0, stars) + '</div>' +
          '<blockquote>“' + (/^[a-z]/.test(r.quote) ? '… ' : '') + esc(r.quote) + (/[.!?]$/.test(r.quote) ? '' : ' …') + '”</blockquote>' +
          '<figcaption><b>' + esc(r.name) + '</b>' + esc([r.exam, r.source].filter(Boolean).join(' · ')) +
          (r.url ? '<a class="cp-textlink" href="' + esc(r.url) + '" target="_blank" rel="noopener">Read the full review on Amazon <span class="cp-arrow" aria-hidden="true">↗</span></a>' : '') +
          '</figcaption></figure>';
      }).join('');
      sec.hidden = false;
    }).catch(function () {});
  }

  [initSplit, initTilt, initCount, initStory, initPathline, initCoverTransition, initReviews, initVideos, initHeader, initReveal, initSteps, initHeroTabs, initHeroDepth, initFinder, initShelf, initQuiz, initLightbox]
    .forEach(function (fn) { try { fn(); } catch (e) { doc.documentElement.classList.remove('cp-js'); if (window.console) console.error('[premium] ' + (fn.name || 'init') + ' failed', e); } });
})();
