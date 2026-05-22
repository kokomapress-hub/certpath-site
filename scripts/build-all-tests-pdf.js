// Build a single .docx (then convert to PDF) with EVERY practice test question
// across all live CertPath books, separated by page breaks per book.
// Run with: node scripts/build-all-tests-pdf.js
// Then convert: soffice --headless --convert-to pdf <output.docx>

const fs = require('fs');
const path = require('path');
const docx = require(path.join('/Users/prasadchandrasekaran/Desktop/Claude Code/cast-book/node_modules/docx'));
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, PageBreak, LevelFormat } = docx;

const SITE_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(SITE_DIR, 'data');

const booksMeta = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'books.json'), 'utf8'));
const liveBooks = booksMeta.books.filter(b => b.published);

console.log(`Building PDF for ${liveBooks.length} live books...`);

const children = [];

// Cover / title page
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 4000, after: 400 },
  children: [new TextRun({ text: 'CertPath Publishing', bold: true, size: 48, color: '1B2A4A' })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: 'Complete Free Online Practice Tests', bold: true, size: 36 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 800 },
  children: [new TextRun({ text: 'Question bank for internal QA review', italics: true, size: 22, color: '6B7280' })],
}));

let totalQs = 0;
let totalTests = 0;

const BOOK_TITLE = (txt) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  alignment: AlignmentType.CENTER,
  spacing: { before: 200, after: 200 },
  children: [new TextRun({ text: txt, bold: true, size: 36, color: '1B2A4A' })],
});

const TEST_HEADER = (txt) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 360, after: 200 },
  border: { bottom: { color: 'FFB800', style: 'single', size: 12, space: 4 } },
  children: [new TextRun({ text: txt, bold: true, size: 28, color: '1B2A4A' })],
});

const QUESTION = (n, q) => new Paragraph({
  spacing: { before: 200, after: 80 },
  children: [
    new TextRun({ text: `${n}. `, bold: true, size: 22 }),
    new TextRun({ text: q, size: 22 }),
  ],
});

const CHOICE = (letter, text) => new Paragraph({
  indent: { left: 360 },
  spacing: { after: 40 },
  children: [
    new TextRun({ text: `${letter}. `, bold: true, size: 22 }),
    new TextRun({ text: text, size: 22 }),
  ],
});

const ANSWER = (letter, explanation) => new Paragraph({
  indent: { left: 360 },
  spacing: { before: 100, after: 80 },
  children: [
    new TextRun({ text: 'Answer: ', bold: true, size: 20, color: '047857' }),
    new TextRun({ text: letter, bold: true, size: 20, color: '047857' }),
    new TextRun({ text: ' — ', size: 20, color: '6B7280' }),
    new TextRun({ text: explanation || '', size: 20, color: '374151', italics: true }),
  ],
});

const PAGE_BREAK = () => new Paragraph({ children: [new PageBreak()] });

const CHOICE_LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Build content per book
liveBooks.forEach((book, idx) => {
  const filePath = path.join(DATA_DIR, `${book.slug}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`SKIP ${book.slug} — no JSON`);
    return;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Page break before every book (except first)
  children.push(PAGE_BREAK());

  // Book title
  children.push(BOOK_TITLE(book.title));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({
      text: `${data.tests.length} tests · ${data.tests.reduce((s, t) => s + t.questions.length, 0)} questions · ${data.timeMinutes} min each`,
      italics: true, size: 22, color: '6B7280',
    })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: `Access code: ${book.code}`, size: 20, color: '6B7280' })],
  }));

  data.tests.forEach((test) => {
    children.push(TEST_HEADER(`Practice Test ${test.testNum}`));
    test.questions.forEach((q) => {
      children.push(QUESTION(q.num, q.question));
      q.choices.forEach((c, i) => {
        children.push(CHOICE(CHOICE_LETTERS[i], c));
      });
      children.push(ANSWER(q.answer, q.explanation));
      totalQs++;
    });
    totalTests++;
  });

  console.log(`  ✓ ${book.title} → ${data.tests.length} tests, ${data.tests.reduce((s, t) => s + t.questions.length, 0)} Qs`);
});

// Footer summary page
children.push(PAGE_BREAK());
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 2000, after: 200 },
  children: [new TextRun({ text: 'Summary', bold: true, size: 32, color: '1B2A4A' })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: `${liveBooks.length} live books`, size: 24 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: `${totalTests} practice tests`, size: 24 })],
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: `${totalQs} questions with answers + explanations`, size: 24 })],
}));

const doc = new Document({
  creator: 'CertPath Publishing',
  title: 'CertPath — All Free Practice Tests',
  description: 'Internal QA dump of every question across the live website.',
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22 } },
    },
  },
  sections: [{
    properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    children,
  }],
});

const outDocx = path.join(SITE_DIR, 'CertPath_All_Free_Tests.docx');
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(outDocx, buf);
  console.log(`\nDocx written: ${outDocx}`);
  console.log(`Total: ${liveBooks.length} books · ${totalTests} tests · ${totalQs} questions`);
  console.log(`\nNext: convert to PDF with:\n  soffice --headless --convert-to pdf "${outDocx}" --outdir "${SITE_DIR}"`);
});
