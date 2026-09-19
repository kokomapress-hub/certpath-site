// Build the free two-page cheat sheets: cheatsheets/src/<bank>.json -> cheatsheets/build/<bank>.pdf (git-ignored).
// Only sheets listed in cheatsheets/cleared.txt (auditor >= 9.0) are copied to cheatsheets/<bank>.pdf and offered on the
// site - that copy is done by scripts/build-cheatsheet-meta.py.
// Usage: node scripts/build-cheatsheets.js [bank ...]      (no args = every source file)
// Header strip = the book's title, footer strip = website + QR code (from scripts/build-cheatsheet-meta.py).
// Each sheet must be EXACTLY two US-Letter pages; the build fails loudly when content overflows
// a page (a third CSS column appears) or leaves a page more than ~35 % empty.
//
// Source shape:
// { "bank": "cast", "exam": "CAST", "title": "CAST Test Cheat Sheet", "subtitle": "one line",
//   "pages": [ { "heading": "Page theme", "blocks": [ BLOCK, ... ] }, { ... } ] }
// BLOCK = { "type": "facts",    "title": "...", "rows": [["label","value"], ...] }
//       | { "type": "formulas", "title": "...", "items": [["name","formula","note (optional)"], ...] }
//       | { "type": "list",     "title": "...", "items": ["...", ...] }
//       | { "type": "steps",    "title": "...", "items": ["...", ...] }
//       | { "type": "table",    "title": "...", "head": ["a","b","c"], "rows": [[...], ...] }
//       | { "type": "tip",      "text": "..." }
// Inline markup allowed in any string: <b> <i> <sub> <sup> only.
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'cheatsheets', 'src');
const OUT = path.join(ROOT, 'cheatsheets');
const META = fs.existsSync(path.join(OUT, 'meta.json')) ? JSON.parse(fs.readFileSync(path.join(OUT, 'meta.json'), 'utf8')) : {};

const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/&lt;(\/?)(b|i|sub|sup)&gt;/g, '<$1$2>');

function block(b) {
  const t = b.title ? `<h3>${esc(b.title)}</h3>` : '';
  switch (b.type) {
    case 'facts':
      return `<section class="b">${t}<table class="facts">${b.rows.map(r => `<tr><th>${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}</table></section>`;
    case 'formulas':
      return `<section class="b">${t}<div class="fx">${b.items.map(i => `<div class="f"><span class="fn">${esc(i[0])}</span><span class="fv">${esc(i[1])}</span>${i[2] ? `<span class="fnote">${esc(i[2])}</span>` : ''}</div>`).join('')}</div></section>`;
    case 'list':
      return `<section class="b">${t}<ul>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></section>`;
    case 'steps':
      return `<section class="b">${t}<ol>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ol></section>`;
    case 'table':
      return `<section class="b">${t}<table class="grid"><thead><tr>${b.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;
    case 'tip':
      return `<section class="b tip"><b>Tip</b> ${esc(b.text)}</section>`;
    default:
      throw new Error('unknown block type: ' + b.type);
  }
}

function html(d) {
  const m = META[d.bank] || { book: d.title, url: 'https://certpathpublishing.store', short: d.exam };
  const qrFile = path.join(OUT, 'qr', d.bank + '.svg');
  const qr = fs.existsSync(qrFile) ? fs.readFileSync(qrFile, 'utf8') : '';
  const pages = d.pages.map((p, i) => `
  <div class="page">
    <header><div><div class="brand">FREE CHEAT SHEET</div><h1>${esc(m.book)}</h1></div><div class="pg">${esc(p.heading)}<span>Page ${i + 1} of 2</span></div></header>
    <div class="cols">${p.blocks.map(block).join('')}</div>
    <footer>
      <div class="ft"><div class="site">certpathpublishing.store</div>
        <div class="cta">Scan for 25 free ${esc(m.short)} practice questions — no email, no signup.</div>
        <div class="fine">CertPath Publishing is an independent publisher, not affiliated with or endorsed by the exam owner. Confirm current exam rules with the official source.</div></div>
      <div class="qr">${qr}</div>
    </footer>
  </div>`).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(m.book)} — Free Cheat Sheet</title><style>
  @page { size: Letter; margin: 0 }
  * { box-sizing: border-box } html, body { margin: 0 }
  body { font: 8.8pt/1.34 "Helvetica Neue", Helvetica, Arial, sans-serif; color: #14213a; -webkit-print-color-adjust: exact; print-color-adjust: exact }
  .page { width: 8.5in; height: 11in; display: flex; flex-direction: column; page-break-after: always; overflow: hidden }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: .3in; background: #0E1F3F; color: #fff; padding: .3in .45in .17in; border-bottom: 3px solid #DDA63B }
  .brand { font-size: 6.8pt; letter-spacing: .16em; color: #DDA63B; font-weight: 700 }
  h1 { font: 600 17pt/1.1 Georgia, "Times New Roman", serif; margin: .04in 0 0 }
  .pg { text-align: right; font-weight: 700; font-size: 9pt; white-space: nowrap } .pg span { display: block; font-weight: 400; font-size: 7pt; color: #b9c2d6; margin-top: 2pt }
  .cols { flex: 1 1 0; min-height: 0; margin: .17in .45in .1in; column-count: 2; column-gap: .24in; column-fill: auto; overflow: hidden }
  .b { break-inside: avoid; margin: 0 0 .12in }
  h3 { margin: 0 0 .04in; font: 700 8.4pt/1.2 "Helvetica Neue", Helvetica, Arial, sans-serif; letter-spacing: .05em; text-transform: uppercase; color: #805600; border-bottom: 1.5px solid #DDA63B; padding-bottom: .025in }
  ul, ol { margin: 0; padding-left: .16in } li { margin: 0 0 1.6pt }
  table { border-collapse: collapse; width: 100% } th, td { text-align: left; vertical-align: top; padding: 1.6pt 3pt 1.6pt 0 }
  .facts th { width: 36%; font-weight: 700; color: #0E1F3F } .facts tr + tr th, .facts tr + tr td { border-top: 1px solid #e6e9ef }
  .grid th { background: #0E1F3F; color: #fff; font-size: 7.6pt; padding: 2pt 4pt } .grid td { padding: 2pt 4pt; border-bottom: 1px solid #e6e9ef }
  .f { display: grid; grid-template-columns: 34% 1fr; column-gap: 5pt; padding: 1.8pt 0; border-top: 1px solid #e6e9ef } .f:first-child { border-top: 0 }
  .fn { font-weight: 700; color: #0E1F3F } .fv { font-family: Georgia, "Times New Roman", serif; font-size: 9.2pt } .fnote { grid-column: 2; font-size: 7.5pt; color: #526176 }
  .tip { background: #FBF8F1; border-left: 3px solid #DDA63B; padding: .06in .09in } .tip b { color: #805600; text-transform: uppercase; letter-spacing: .06em; font-size: 7.4pt; margin-right: 3pt }
  footer { display: flex; justify-content: space-between; align-items: center; gap: .3in; background: #0E1F3F; color: #fff; padding: .12in .45in; border-top: 3px solid #DDA63B }
  .site { font: 600 13pt/1.1 Georgia, "Times New Roman", serif; color: #DDA63B } .cta { font-size: 8.4pt; margin-top: 2pt } .fine { font-size: 6.2pt; color: #b9c2d6; margin-top: 3pt; max-width: 5.6in }
  .qr { flex: none; width: .78in; height: .78in; background: #fff; padding: .03in; border-radius: 3px } .qr svg { width: 100%; height: 100%; display: block }
  </style></head><body>${pages}</body></html>`;
}

(async () => {
  const want = process.argv.slice(2);
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.json') && (!want.length || want.includes(f.replace('.json', ''))));
  fs.mkdirSync(path.join(OUT, 'build'), { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  let bad = 0;
  for (const f of files) {
    const bank = f.replace('.json', '');
    let d;
    try { d = JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')); } catch (e) { console.log(`${bank.padEnd(18)} INVALID JSON: ${e.message}`); bad++; continue; }
    if (!d.pages || d.pages.length !== 2) { console.log(`${bank.padEnd(18)} needs exactly 2 pages`); bad++; continue; }
    const page = await browser.newPage();
    await page.setContent(html(d), { waitUntil: 'load' });
    const fit = await page.evaluate(() => [...document.querySelectorAll('.cols')].map(c => {
      const last = c.lastElementChild.getBoundingClientRect(), box = c.getBoundingClientRect();
      const overflow = c.scrollWidth > c.clientWidth + 2 || last.bottom > box.bottom + 1;
      const inCol2 = last.left > box.left + box.width / 2;
      const fill = inCol2 ? 0.5 + 0.5 * (last.bottom - box.top) / box.height : 0.5 * (last.bottom - box.top) / box.height;
      return { overflow, fill: Math.round(fill * 100) };
    }));
    const msg = fit.map((p, i) => `p${i + 1} ${p.overflow ? 'OVERFLOW' : p.fill + '% full'}`).join(', ');
    const ok = fit.every(p => !p.overflow && p.fill >= 65);
    if (ok) await page.pdf({ path: path.join(OUT, 'build', bank + '.pdf'), format: 'Letter', printBackground: true, preferCSSPageSize: true });
    else bad++;
    console.log(`${bank.padEnd(18)} ${ok ? 'OK ' : 'FIX'}  ${msg}`);
    await page.close();
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
})();
