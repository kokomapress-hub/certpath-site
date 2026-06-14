// Generate static per-exam landing pages (sat.html, ged.html, tabe.html,
// ccrn.html, cast.html) with a baked-in 10-question sample quiz.
// Run after changing books.json or question banks: node scripts/build-exam-pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://certpathpublishing.store';
const books = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/books.json'), 'utf8')).books;

const PAGES = [
  {
    file: 'sat.html',
    exam: 'Digital SAT Math',
    headline: 'Pass the <span class="gold">Digital SAT Math</span> Section',
    sub: 'Blueprint-aligned prep for the Digital SAT Math section — 44 questions, two adaptive modules, on-screen Desmos calculator. Try 10 real practice questions below, free.',
    quizSource: 'sat-math',
    relatedSlugs: ['sat-math', 'sat-math-workbook', 'sat-math-tests'],
    metaTitle: 'Digital SAT Math Prep — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Prepare for the Digital SAT Math section with blueprint-aligned study guides, 4,500+ practice questions, and free timed online tests. Try 10 free sample questions.',
    disclaimer: 'SAT® is a registered trademark of College Board, which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['How many questions are on the Digital SAT Math section?', 'The Digital SAT Math section has 44 questions across two 22-question adaptive modules, with 70 minutes total. The built-in Desmos calculator is available on every question.'],
      ['What topics does Digital SAT Math cover?', 'Four domains: Algebra (about 35%), Advanced Math (about 35%), Problem-Solving & Data Analysis (about 15%), and Geometry & Trigonometry (about 15%). Our books mirror this exact weighting.'],
      ['What is included with the CertPath SAT Math books?', 'Three SKUs: the complete study guide (lessons + 700+ questions), the workbook (700+ fresh drill problems), and 10 full-length practice tests. Every book unlocks 1,500+ additional timed online questions — and no question repeats across the three books.'],
      ['Are the online practice tests really free?', 'Yes. Every CertPath book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access to unlock timed, auto-scored practice tests on any device — no subscription.'],
      ['How do these questions compare to the real exam?', 'Questions follow the official College Board skill blueprint in format, difficulty range, and domain weighting, including multiple-choice and student-produced response formats.'],
    ],
  },
  {
    file: 'ged.html',
    exam: 'GED Math',
    headline: 'Pass the <span class="gold">GED Math</span> Test — No Math Background Needed',
    sub: 'Plain-language prep for GED Mathematical Reasoning, built from the ground up for adult learners. Try 10 real practice questions below, free.',
    quizSource: 'ged-math',
    relatedSlugs: ['ged-math', 'ged-math-workbook', 'ged-math-tests'],
    metaTitle: 'GED Math Prep — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Pass the GED Mathematical Reasoning test with plain-language study guides, 4,500+ practice questions, and free timed online tests. Try 10 free sample questions.',
    disclaimer: 'GED® is a registered trademark of the American Council on Education and GED Testing Service LLC, which are not affiliated with and do not endorse this publication.',
    faqs: [
      ['How hard is the GED math test?', 'GED Mathematical Reasoning is a 115-minute test with about 46 questions. Most test-takers find it manageable with focused practice — the key is steady work on the four content areas rather than cramming.'],
      ['What math is on the GED?', 'Four areas: quantitative problem solving with rational numbers, quantitative problem solving with measurement, algebraic problem solving with expressions and equations, and algebraic problem solving with graphs and functions.'],
      ['Can I use a calculator on the GED math test?', 'Yes — the on-screen TI-30XS calculator is available for most of the test. Our study guide includes a strategy chapter on using it efficiently.'],
      ['What is included with the CertPath GED Math books?', 'Three SKUs: the complete study guide, a 600+ problem workbook, and 10 full-length practice tests. Each book unlocks 1,500+ additional timed online questions, with no repeats across books.'],
      ['Are the online practice tests really free?', 'Yes. Every book has a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
    ],
  },
  {
    file: 'tabe.html',
    exam: 'TABE 11 & 12 Math',
    headline: 'Master <span class="gold">TABE 11 &amp; 12 Math</span> — Every Level, A to E',
    sub: 'The only TABE math workbook series with a book for each level — E, M, D, and A — written in plain language for adult learners. Try 10 real practice questions below, free.',
    quizSource: 'tabe-a',
    relatedSlugs: ['tabe-a', 'tabe-d', 'tabe-m', 'tabe-e'],
    metaTitle: 'TABE 11 & 12 Math Workbooks (Levels A, D, M, E) — Free Practice | CertPath Publishing',
    metaDesc: 'TABE 11 & 12 math prep for adult learners at every level — A, D, M, and E. Step-by-step workbooks with free timed online practice tests. Try 10 free sample questions.',
    disclaimer: 'TABE® is a registered trademark of Data Recognition Corporation (DRC), which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['What are the TABE levels and which book do I need?', 'TABE 11 & 12 has four levels: E (foundational), M (upper elementary), D (pre-high-school), and A (high-school equivalent). If you are unsure, start with the level your program assigned, or take the diagnostic pretest in any of our books — each one tells you whether to move up or down a level.'],
      ['What is on the TABE math test?', 'TABE 11 & 12 math covers numbers and quantity, algebra and functions, geometry, and statistics and probability, weighted by level. Our workbooks mirror the official domain weighting at each level.'],
      ['How is the CertPath TABE series different?', 'One dedicated book per level instead of a single generic book. Every concept is taught from the ground up in plain language, with 500-1,200+ problems per book and full-length timed practice tests matching the real format.'],
      ['Are the online practice tests really free?', 'Yes. Every book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
      ['Will these books help me get into a trade or training program?', 'TABE scores are widely used for workforce program placement and adult education. Higher placement means skipping remedial coursework — most readers prep for two to four weeks per level.'],
    ],
  },
  {
    file: 'ccrn.html',
    exam: 'Adult CCRN',
    headline: 'Pass the <span class="gold">Adult CCRN</span> on Your First Attempt',
    sub: 'Updated for the revised AACN test plan — complete critical-care review with detailed rationales, Synergy Model coverage, and 750+ online questions. Try 10 real practice questions below, free.',
    quizSource: 'ccrn',
    relatedSlugs: ['ccrn'],
    metaTitle: 'Adult CCRN Exam Prep (Revised AACN Test Plan) — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Adult CCRN exam prep updated for the revised AACN test plan. 3 full-length practice exams, 750+ online questions, detailed rationales. Try 10 free sample questions.',
    disclaimer: 'CCRN® is a registered trademark of the AACN Certification Corporation, which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['How many questions are on the Adult CCRN exam?', 'The Adult CCRN is a 150-question exam (125 scored, 25 unscored pilot items) with a 3-hour time limit. Roughly 80% covers clinical judgment and 20% covers professional caring and ethical practice.'],
      ['What changed in the revised AACN test plan?', 'The AACN periodically rebalances domain weightings and clinical content. Our book is mapped one-to-one to the current revised test plan — chapter weighting matches the exam blueprint, so you study in the same proportions you will be tested.'],
      ['Do I meet the requirements to sit for the CCRN?', 'AACN requires either 1,750 hours of direct care of acutely/critically ill adult patients in the last 2 years (875 in the most recent year), or 2,000 hours in the last 5 years (144 in the most recent year). Check aacn.org for current eligibility.'],
      ['What is included with the CertPath CCRN book?', 'A complete blueprint-aligned review with detailed rationales, Synergy Model coverage woven through every chapter, 3 full-length 150-question practice exams, and 750+ additional timed online questions via the free Exam Simulator.'],
      ['Are the online practice tests really free?', 'Yes. The book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored exams on any device.'],
    ],
  },
  {
    file: 'cast.html',
    exam: 'CAST',
    headline: 'Pass the <span class="gold">CAST Exam</span> on the First Try',
    sub: 'All-in-one prep for the EEI Construction and Skilled Trades test — graphic arithmetic, mechanical concepts, and reading comprehension. Try 10 real practice questions below, free.',
    quizSource: 'cast',
    relatedSlugs: ['cast', 'mech-apt', 'poss'],
    metaTitle: 'CAST Exam Study Guide (EEI Construction & Skilled Trades) — Free Practice | CertPath Publishing',
    metaDesc: 'CAST test prep for utility and skilled trades jobs. 3 full-length practice tests, 500+ questions, free timed online tests. Try 10 free sample questions.',
    disclaimer: 'CAST and the Construction and Skilled Trades Selection System are trademarks of their respective owners, who are not affiliated with and do not endorse this publication.',
    faqs: [
      ['What is the CAST test?', 'CAST (Construction and Skilled Trades) is the EEI selection test used by utilities and energy companies for trades roles — line worker, substation, meter, gas, and similar positions. It has four parts: graphic arithmetic, mechanical concepts, reading comprehension, and mathematical usage.'],
      ['What score do I need to pass the CAST?', 'Each employer sets its own cutoff, reported on a 1-10 index. Most utilities look for a minimum index around 4-6 for trades positions. Higher scores improve your ranking against other applicants.'],
      ['How should I prepare for the CAST?', 'Practice under timed conditions. The math is not advanced, but the pacing is aggressive — graphic arithmetic gives you about 30 problems in 30 minutes reading values off drawings. Our book includes 3 full-length timed tests that mirror the real pacing.'],
      ['What is included with the CertPath CAST book?', 'A complete review of all four test parts, 500+ practice questions with detailed answer explanations, 3 full-length practice tests, and free timed online practice tests (330 questions) via the access code in the book.'],
      ['Are the online practice tests really free?', 'Yes. The book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
    ],
  },
  {
    file: 'mechanical-aptitude.html',
    exam: 'Mechanical Aptitude',
    headline: 'Pass the <span class="gold">Mechanical Aptitude</span> Test',
    sub: 'Build real intuition for the Bennett (BMCT-II), Wiesen (WTMA), Ramsay, and other mechanical aptitude tests used to screen for skilled-trade and industrial jobs. Try 10 real practice questions below, free.',
    quizSource: 'mech-apt',
    relatedSlugs: ['mech-apt'],
    metaTitle: 'Mechanical Aptitude Test Prep (BMCT, Wiesen, Ramsay) — Free Practice | CertPath Publishing',
    metaDesc: 'Mechanical aptitude test prep for the Bennett (BMCT-II), Wiesen, and Ramsay tests. 3 full-length practice tests, 180+ online questions, free. Try 10 free sample questions.',
    disclaimer: 'BMCT, Wiesen (WTMA), Ramsay, and other named tests are trademarks of their respective owners (including NCS Pearson, Inc. and Ramsay Corporation), which are not affiliated with and do not endorse this publication.',
    faqs: [
      ['What is a mechanical aptitude test?', 'It measures your understanding of basic physical and mechanical principles — forces, levers, pulleys, gears, fluids, and simple machines. Employers in manufacturing, utilities, the military, and apprenticeship programs use it to predict how well you reason about mechanical problems on the job.'],
      ['Which tests does this book cover?', 'The most common ones: the Bennett Mechanical Comprehension Test (BMCT-II, about 55 questions in 25 minutes), the Wiesen Test of Mechanical Aptitude (WTMA, 60 questions in 30 minutes), and the Ramsay MAT. The underlying concepts overlap heavily, so one book prepares you for all of them.'],
      ['What topics are tested?', 'Simple machines (levers, pulleys, gears, inclined planes), forces and motion, gravity and momentum, fluids and pressure, energy, basic electricity, and everyday tool and shop knowledge.'],
      ['Do I need to be good at math?', 'No. Mechanical aptitude is conceptual, not computational — most questions are answered by reasoning about a picture or scenario. A calculator is usually not needed or allowed.'],
      ['What is included with the CertPath book?', 'A full concept review, 3 full-length timed practice tests, 180+ practice questions with explanations, and free timed online practice tests via the access code printed inside.'],
    ],
  },
  {
    file: 'journeyman-electrician.html',
    exam: 'Journeyman Electrician',
    headline: 'Pass the <span class="gold">Journeyman Electrician</span> Exam',
    sub: 'Code-based prep that teaches you to navigate the National Electrical Code under time pressure — aligned to the 2026 NEC, with an edition guide for jurisdictions still on 2017–2023. Try 10 real practice questions below, free.',
    quizSource: 'journeyman-elec',
    relatedSlugs: ['journeyman-elec'],
    metaTitle: 'Journeyman Electrician Exam Prep (2026 NEC) — Free Practice | CertPath Publishing',
    metaDesc: 'Journeyman electrician license exam prep based on the National Electrical Code. NEC navigation, calculations, 3 practice tests, free online questions. Try 10 free sample questions.',
    disclaimer: 'The National Electrical Code (NEC) and NFPA 70 are registered trademarks of the National Fire Protection Association (NFPA). ICC is a trademark of the International Code Council. Neither is affiliated with nor endorses this publication.',
    faqs: [
      ['What is on the journeyman electrician exam?', 'Most journeyman exams are open-book and based on the National Electrical Code: wiring and protection, wiring methods and materials, equipment for general use, special occupancies, services and feeders, branch circuits and conductors, motors, and general electrical theory. Many states use the ICC or a state-specific exam of roughly 80 questions in about 4 hours.'],
      ['Which NEC edition does the exam use?', 'It depends on your state — jurisdictions adopt the NEC on different cycles, so 2017, 2020, 2023, and 2026 are all in use somewhere. Our book is built on the 2026 NEC and includes an edition-comparison guide so you can translate the load-calculation rules back to an earlier code if your state is behind.'],
      ['Is the journeyman exam open book?', 'Usually yes. That makes code-navigation speed the real skill — knowing exactly which article and table to turn to. Our practice questions train that lookup habit, not just memorization.'],
      ['Can I use a calculator?', 'Yes, most journeyman exams allow a basic non-programmable calculator for load and conduit-fill calculations. Our book includes worked examples for every common calculation type.'],
      ['What is included with the CertPath book?', 'A full code-based review, calculation walkthroughs, 3 full-length practice tests, 180+ questions with explanations, and free timed online practice tests via the access code inside.'],
    ],
  },
  {
    file: 'poss.html',
    exam: 'POSS',
    headline: 'Pass the <span class="gold">POSS</span> Power Plant Operator Test',
    sub: 'Targeted prep for the EEI Plant Operator Selection System — the four-part battery utilities use to hire power-plant and operator trainees. Try 10 real practice questions below, free.',
    quizSource: 'poss',
    relatedSlugs: ['poss'],
    metaTitle: 'POSS Test Prep (EEI Plant Operator Selection System) — Free Practice | CertPath Publishing',
    metaDesc: 'POSS exam prep for utility power-plant operator jobs. Reading, math, mechanical concepts, and figural reasoning. 3 practice tests, free online questions. Try 10 free sample questions.',
    disclaimer: 'POSS and the EEI test batteries are administered by the Edison Electric Institute (EEI), which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['What is the POSS test?', 'POSS (Plant Operator Selection System) is an Edison Electric Institute battery used by utilities and power companies to screen applicants for plant-operator and operator-trainee roles. It is one of the most common pre-employment tests in the energy industry.'],
      ['What sections are on the POSS?', 'Four: Reading Comprehension, Mathematical Usage, Mechanical Concepts, and Assembly/Figural Reasoning (rotating and arranging shapes). Our book mirrors that mix, with the heaviest weight on math and mechanical reasoning.'],
      ['Is the POSS hard?', 'The content is not advanced, but it is timed and broad. Most candidates fail on pacing, not difficulty. Practicing all four section types under a clock — which our full-length tests do — is the single best preparation.'],
      ['Can I retake the POSS if I fail?', 'Retake windows are set by the hiring utility (often six months). A higher score also improves your ranking against other applicants, so it is worth preparing thoroughly the first time.'],
      ['What is included with the CertPath book?', 'A full review of all four sections, figural-reasoning diagrams, 3 full-length practice tests, 180+ questions with explanations, and free timed online practice tests via the access code inside.'],
    ],
  },
  {
    file: 'csp.html',
    exam: 'CSP',
    headline: 'Pass the <span class="gold">CSP</span> Exam — CSP11 Blueprint',
    sub: 'Complete prep for the BCSP Certified Safety Professional exam, rebuilt to the current CSP11 blueprint and its seven domains — including Risk Management, which older guides leave out. Try 10 real practice questions below, free.',
    quizSource: 'csp',
    relatedSlugs: ['csp', 'chst'],
    metaTitle: 'CSP Exam Prep (BCSP CSP11 Blueprint, 7 Domains) — Free Practice | CertPath Publishing',
    metaDesc: 'Certified Safety Professional (CSP) exam prep aligned to the current CSP11 blueprint and 7 domains. 500+ questions, free online tests. Try 10 free sample questions.',
    disclaimer: 'CSP and the Certified Safety Professional credential are administered by the Board of Certified Safety Professionals (BCSP), which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['What is the CSP exam?', 'The Certified Safety Professional exam is the BCSP credential for experienced safety professionals. The current exam has 200 questions (175 scored) in 5.5 hours and follows the CSP11 blueprint, effective August 1, 2025.'],
      ['What are the CSP exam domains?', 'Seven: Advanced Application of Safety Principles (25%), Program Management (25%), Risk Management (15%), Emergency Management (9%), Environmental Management (6%), Occupational Health and Applied Science (10%), and Training and Communication (10%). Our book is weighted to match exactly.'],
      ['Am I eligible for the CSP?', 'BCSP requires a qualifying degree, four years of safety experience where safety is at least half your duties, and holding the Associate Safety Professional (ASP) credential first. Always confirm the current requirements with BCSP.'],
      ['How is the CSP different from older study guides?', 'Many older guides still teach a 9-domain scheme that is missing Risk Management entirely. Our edition is rebuilt to the 7-domain CSP11 blueprint, so you study what is actually on the current exam.'],
      ['What is included with the CertPath book?', 'A full review of all seven CSP11 domains, 500+ practice questions with explanations, mixed practice sets, and free timed online practice tests via the access code inside.'],
    ],
  },
  {
    file: 'chst.html',
    exam: 'CHST',
    headline: 'Pass the <span class="gold">CHST</span> Construction Safety Exam',
    sub: 'Focused prep for the BCSP Construction Health and Safety Technician exam — built around the four CHST domains and real construction-site scenarios. Try 10 real practice questions below, free.',
    quizSource: 'chst',
    relatedSlugs: ['chst', 'csp'],
    metaTitle: 'CHST Exam Prep (Construction Health & Safety Technician) — Free Practice | CertPath Publishing',
    metaDesc: 'CHST exam prep aligned to the BCSP blueprint and its four domains. Construction safety scenarios, practice tests, free online questions. Try 10 free sample questions.',
    disclaimer: 'CHST and the Construction Health and Safety Technician credential are administered by the Board of Certified Safety Professionals (BCSP), which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['What is the CHST exam?', 'The Construction Health and Safety Technician exam is a BCSP credential for people who deliver safety on construction sites. The exam has 200 questions (176 scored) in 4 hours.'],
      ['What are the CHST exam domains?', 'Four: Hazard Identification and Control (about 37%), Safety Program Development and Management (about 22%), Leadership, Communication and Training (about 21%), and Emergency Preparedness and Incident Investigation (about 20%). Our book matches that weighting.'],
      ['Am I eligible for the CHST?', 'BCSP requires a minimum level of education plus construction safety experience. Requirements change periodically, so confirm the current criteria directly with BCSP before applying.'],
      ['How should I prepare for the CHST?', 'Focus on applying OSHA construction standards (29 CFR 1926) to site scenarios rather than memorizing rule numbers. Our questions are scenario-based to build that judgment, and the full-length tests rehearse the pacing.'],
      ['What is included with the CertPath book?', 'A full review of all four domains, scenario-based practice questions with explanations, full-length practice tests, and free timed online practice tests via the access code inside.'],
    ],
  },
  {
    file: 'psat.html',
    exam: 'PSAT/NMSQT Math',
    headline: 'Master <span class="gold">PSAT/NMSQT Math</span> — and Chase National Merit',
    sub: 'Digital PSAT/NMSQT Math prep built to the same blueprint as the Digital SAT, with the higher accuracy you need to compete for National Merit recognition. Try 10 real practice questions below, free.',
    quizSource: 'psat-math',
    relatedSlugs: ['psat-math', 'psat-math-workbook', 'psat-math-tests'],
    metaTitle: 'Digital PSAT/NMSQT Math Prep — Free Practice Questions | CertPath Publishing',
    metaDesc: 'Digital PSAT/NMSQT Math prep aligned to the College Board blueprint, with 4,500+ practice questions and free timed online tests. Try 10 free sample questions.',
    disclaimer: 'PSAT/NMSQT is a registered trademark of the College Board and the National Merit Scholarship Corporation, which are not affiliated with and do not endorse this publication.',
    faqs: [
      ['How is the PSAT/NMSQT scored and why does it matter?', 'The PSAT/NMSQT is digital and adaptive, scored on a 320–1520 scale. A strong junior-year score can qualify you for National Merit recognition and scholarships, which is why precision on the math section matters so much.'],
      ['What math is on the Digital PSAT?', 'Four domains: Algebra, Advanced Math, Problem-Solving and Data Analysis, and Geometry and Trigonometry. The format matches the Digital SAT, with a built-in Desmos calculator on every question.'],
      ['Is PSAT math the same as SAT math?', 'Nearly. The content domains and format are the same; the PSAT is slightly easier and shorter. Prep built to the SAT blueprint transfers directly, which is how our PSAT and SAT lines are designed.'],
      ['What is included with the CertPath PSAT Math books?', 'Three SKUs — study guide, workbook, and 10 practice tests — each unlocking 1,500+ additional timed online questions, with no question repeated across the three books.'],
      ['Are the online practice tests really free?', 'Yes. Each book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
    ],
  },
  {
    file: 'act.html',
    exam: 'ACT Math',
    headline: 'Pass <span class="gold">ACT Math</span> — Built for the Enhanced ACT',
    sub: 'Up-to-date prep for the enhanced ACT Math section, with blueprint-aligned practice across every category the test still rewards. Try 10 real practice questions below, free.',
    quizSource: 'act-math',
    relatedSlugs: ['act-math', 'act-math-workbook', 'act-math-tests'],
    metaTitle: 'ACT Math Prep (Enhanced ACT) — Free Practice Questions | CertPath Publishing',
    metaDesc: 'ACT Math prep for the enhanced ACT, blueprint-aligned with 4,500+ practice questions and free timed online tests. Try 10 free sample questions.',
    disclaimer: 'ACT is a registered trademark of ACT, Inc., which is not affiliated with and does not endorse this publication.',
    faqs: [
      ['What changed with the enhanced ACT?', 'The enhanced ACT shortened the test and made the science section optional, but the math section still rewards the same core skills. Our books are built to the current ACT math blueprint so you practice what is actually tested now.'],
      ['What topics are on ACT Math?', 'Pre-algebra and elementary algebra, intermediate algebra and coordinate geometry, plane geometry, and trigonometry. The questions get harder as the section goes on, so pacing strategy matters.'],
      ['Can I use a calculator on ACT Math?', 'Yes — a calculator is permitted on the entire ACT math section. Our study guide includes a chapter on using it efficiently without leaning on it for problems you should do by hand.'],
      ['What is included with the CertPath ACT Math books?', 'Three SKUs — study guide, workbook, and 10 practice tests — each unlocking 1,500+ additional timed online questions, with no repeats across the three books.'],
      ['Are the online practice tests really free?', 'Yes. Each book includes a unique access code printed on the last page. Enter it at certpathpublishing.store/access for timed, auto-scored tests on any device.'],
    ],
  },
];

// --- helpers ---------------------------------------------------------------

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function sampleQuestions(slug, count) {
  const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', slug + '.json'), 'utf8'));
  const all = data.tests.flatMap(t => t.questions);
  // Even spread across the bank so the sample shows topic variety.
  const step = Math.floor(all.length / count);
  const picked = [];
  for (let i = 0; i < count; i++) picked.push(all[i * step]);
  return picked.map(q => ({ q: q.question, choices: q.choices, answer: q.answer, explanation: q.explanation }));
}

function bookCard(b) {
  return `
        <div class="lp-book-card">
          <a href="${b.amazonUrl}" target="_blank" rel="noopener"><img src="${b.cover}" alt="${esc(b.title)}" loading="lazy"></a>
          <h3>${esc(b.title)}</h3>
          <div class="meta">${b.testCount} online tests &middot; ${b.totalQuestions.toLocaleString()} questions included</div>
          <div class="row">
            <a href="${b.amazonUrl}" class="btn btn-sm" target="_blank" rel="noopener">Paperback $${b.paperbackPrice.toFixed(2)}</a>
            ${b.payhipEbookUrl ? `<a href="${b.payhipEbookUrl}" class="btn btn-sm btn-outline" target="_blank" rel="noopener">E-book $${b.ebookPrice.toFixed(2)}</a>` : ''}
          </div>
        </div>`;
}

function renderPage(cfg) {
  const related = cfg.relatedSlugs.map(s => books.find(b => b.slug === s)).filter(b => b && b.published);
  const heroBook = related[0];
  const questions = sampleQuestions(cfg.quizSource, 10);

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cfg.faqs.map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(cfg.metaTitle)}</title>
  <meta name="description" content="${esc(cfg.metaDesc)}">
  <link rel="icon" type="image/png" href="/img/logo-mark.png">
  <link rel="canonical" href="${SITE}/${cfg.file.replace('.html', '')}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="CertPath Publishing">
  <meta property="og:title" content="${esc(cfg.metaTitle)}">
  <meta property="og:description" content="${esc(cfg.metaDesc)}">
  <meta property="og:url" content="${SITE}/${cfg.file.replace('.html', '')}">
  <meta property="og:image" content="${SITE}${heroBook.cover.replace(/\.webp$/, '.png')}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/style.css?v=10">
  <link rel="stylesheet" href="/css/landing.css?v=1">
  <script type="application/ld+json">${JSON.stringify(faqLd)}</script>
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="logo">
        <svg class="logo-shield" viewBox="0 0 40 40" width="36" height="36" aria-hidden="true"><path fill="#1B2A4A" d="M6 4h22l6 6v20l-14 6L6 30V4z"/><rect x="12" y="14" width="16" height="3" fill="#fff"/><rect x="12" y="20" width="16" height="3" fill="#fff"/></svg>
        <span class="logo-text">CertPath <span class="gold">Publishing</span></span>
      </a>
      <nav class="nav">
        <a href="/">Home</a>
        <a href="/#books">Study Guides</a>
        <a href="/access" class="btn-nav">Access Tests</a>
      </nav>
    </div>
  </header>

  <section class="lp-hero">
    <div class="lp-hero-inner">
      <div>
        <h1>${cfg.headline}</h1>
        <p class="lp-sub">${cfg.sub}</p>
        <div class="lp-hero-cta">
          <a href="#sample-quiz" class="btn btn-lg">Try 10 Free Questions</a>
          <a href="${heroBook.amazonUrl}" class="btn btn-secondary btn-lg" target="_blank" rel="noopener">Get the Book — $${heroBook.paperbackPrice.toFixed(2)}</a>
        </div>
        <div class="lp-trust">
          <div><strong>${related.reduce((s, b) => s + b.totalQuestions, 0).toLocaleString()}+</strong> online questions</div>
          <div><strong>${related.reduce((s, b) => s + b.testCount, 0)}</strong> timed practice tests</div>
          <div><strong>FREE</strong> with every book</div>
        </div>
      </div>
      <div class="lp-hero-cover">
        <a href="${heroBook.amazonUrl}" target="_blank" rel="noopener"><img src="${heroBook.cover}" alt="${esc(heroBook.title)}" loading="eager"></a>
      </div>
    </div>
  </section>

  <section class="lp-quiz-section" id="sample-quiz">
    <div class="lp-quiz-wrap">
      <div class="lp-section-head" style="margin-bottom: 2rem;">
        <div class="eyebrow">Free Sample</div>
        <h2>Try 10 Real ${esc(cfg.exam)} Questions</h2>
        <p>Straight from our question bank — answer each one and see the step-by-step explanation instantly.</p>
      </div>
      <div class="lp-quiz-frame">
        <div class="lp-quiz-top">
          <div class="crumb">${esc(cfg.exam)} &middot; Free Sample Quiz</div>
          <div class="crumb" id="lpCounter">1 / 10</div>
        </div>
        <div class="lp-quiz-progress"><div class="lp-quiz-progress-fill" id="lpProgress"></div></div>
        <div class="lp-quiz-body" id="lpBody"></div>
      </div>
    </div>
  </section>

  <section class="lp-books">
    <div class="lp-books-inner">
      <div class="lp-section-head">
        <div class="eyebrow">The Books</div>
        <h2>Complete ${esc(cfg.exam)} Prep</h2>
        <p>Every book includes free timed online practice tests — no subscription, no repeats between books.</p>
      </div>
      <div class="lp-books-grid">${related.map(bookCard).join('')}</div>
    </div>
  </section>

  <section class="lp-faq">
    <div class="lp-faq-inner">
      <div class="lp-section-head" style="margin-bottom: 2rem;">
        <div class="eyebrow">FAQ</div>
        <h2>${esc(cfg.exam)} — Common Questions</h2>
      </div>
      ${cfg.faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n      ')}
    </div>
  </section>

  <footer class="footer">
    <div class="footer-bottom" style="border: none; padding: 2rem; text-align: center;">
      <p>&copy; 2026 CertPath Publishing. All rights reserved.</p>
      <p style="margin-top: 0.5rem; font-size: 0.78rem; opacity: 0.7;">${esc(cfg.disclaimer)}</p>
    </div>
  </footer>

  <script>
  (function () {
    var QUESTIONS = ${JSON.stringify(questions)};
    var EXAM = ${JSON.stringify(cfg.exam)};
    var idx = 0, score = 0, answered = false;
    var body = document.getElementById('lpBody');
    var counter = document.getElementById('lpCounter');
    var progress = document.getElementById('lpProgress');
    var LETTERS = ['A', 'B', 'C', 'D', 'E'];

    function render() {
      var q = QUESTIONS[idx];
      answered = false;
      counter.textContent = (idx + 1) + ' / ' + QUESTIONS.length;
      progress.style.width = ((idx) / QUESTIONS.length * 100) + '%';
      body.innerHTML = '<div class="lp-qnum">Question ' + (idx + 1) + ' of ' + QUESTIONS.length + '</div>' +
        '<div class="lp-question"></div><div id="lpChoices"></div><div id="lpAfter"></div>';
      body.querySelector('.lp-question').textContent = q.q;
      var wrap = document.getElementById('lpChoices');
      q.choices.forEach(function (c, i) {
        var btn = document.createElement('button');
        btn.className = 'lp-choice';
        btn.innerHTML = '<span class="letter">' + LETTERS[i] + '</span><span></span>';
        btn.querySelector('span:last-child').textContent = c;
        btn.addEventListener('click', function () { pick(i, btn); });
        wrap.appendChild(btn);
      });
    }

    function pick(i, btn) {
      if (answered) return;
      answered = true;
      var q = QUESTIONS[idx];
      var correctIdx = LETTERS.indexOf(q.answer);
      var btns = body.querySelectorAll('.lp-choice');
      btns.forEach(function (b) { b.disabled = true; });
      btns[correctIdx].classList.add('correct');
      if (i === correctIdx) { score++; } else { btn.classList.add('wrong'); }
      var after = document.getElementById('lpAfter');
      var explain = document.createElement('div');
      explain.className = 'lp-explain';
      explain.innerHTML = '<strong>' + (i === correctIdx ? 'Correct. ' : 'Answer: ' + q.answer + '. ') + '</strong>';
      explain.appendChild(document.createTextNode(q.explanation || ''));
      after.appendChild(explain);
      var next = document.createElement('button');
      next.className = 'btn lp-next';
      next.textContent = idx === QUESTIONS.length - 1 ? 'See My Score' : 'Next Question';
      next.addEventListener('click', function () {
        idx++;
        if (idx < QUESTIONS.length) render(); else result();
      });
      after.appendChild(next);
    }

    function result() {
      counter.textContent = 'Done';
      progress.style.width = '100%';
      var pct = Math.round(score / QUESTIONS.length * 100);
      var verdict = pct >= 80 ? 'Strong start — polish the gaps and you are ready.' :
                    pct >= 50 ? 'Solid base — focused practice will close the gap fast.' :
                    'A structured study plan will make a big difference. That is exactly what the book is for.';
      body.innerHTML =
        '<div class="lp-result">' +
          '<div class="lp-score-ring">' + score + '<span class="of"> / ' + QUESTIONS.length + '</span></div>' +
          '<h3>You scored ' + pct + '%</h3>' +
          '<p>' + verdict + ' Want a free ' + EXAM + ' study plan and exclusive launch discounts? Drop your email below.</p>' +
          '<form class="lp-email-form" id="lpEmailForm">' +
            '<input type="email" id="lpEmail" required placeholder="you@example.com" autocomplete="email">' +
            '<button type="submit" class="btn">Send My Study Plan</button>' +
          '</form>' +
          '<div class="lp-email-msg" id="lpEmailMsg"></div>' +
          '<div class="or">— or —</div>' +
          '<a href="#" id="lpRetry" class="btn btn-outline btn-sm" style="color: var(--navy); border-color: var(--navy);">Retake the Quiz</a>' +
        '</div>';
      document.getElementById('lpRetry').addEventListener('click', function (e) {
        e.preventDefault(); idx = 0; score = 0; render();
      });
      document.getElementById('lpEmailForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('lpEmail').value.trim();
        var msg = document.getElementById('lpEmailMsg');
        if (!email) return;
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, accessCode: 'FREE-SAMPLE', book: EXAM + ' sample quiz (' + score + '/' + QUESTIONS.length + ')' }),
        }).then(function () {
          msg.className = 'lp-email-msg ok';
          msg.textContent = 'Done! Check your inbox in the next few minutes.';
        }).catch(function () {
          msg.className = 'lp-email-msg err';
          msg.textContent = 'Something went wrong — please try again.';
        });
      });
    }

    render();
  })();
  </script>
  <script src="/js/floating-unlock.js"></script>
</body>
</html>
`;
}

// --- main -------------------------------------------------------------------

for (const cfg of PAGES) {
  const html = renderPage(cfg);
  fs.writeFileSync(path.join(ROOT, cfg.file), html);
  console.log(`✓ ${cfg.file} (${cfg.exam}) — 10 sample Qs from ${cfg.quizSource}.json`);
}
console.log('\nDone. Remember: node scripts/build-sitemap.js to refresh the sitemap.');
