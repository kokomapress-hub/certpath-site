// Extract practice test questions from all 10 book source directories by executing
// the test files with shimmed helpers that record every questionOnly() and answerKey() call.

const fs = require("fs");
const path = require("path");
const Module = require("module");

const BOOKS_DIR = "/Users/prasadchandrasekaran/Desktop/Claude Code";
const OUTPUT_DIR = "/Users/prasadchandrasekaran/Desktop/Claude Code/certpath-website/data";

const BOOKS = [
  { slug: "cast", dir: "cast-book", title: "CAST Exam Study Guide", code: "CAST-OHGI1-JNYT7",
    testFiles: ["part5-test1.js", "part5-test2.js", "part5-test3.js"], timeMinutes: 87 },
  { slug: "mech-apt", dir: "mech-apt-book", title: "Mechanical Aptitude Study Guide", code: "MECH-XAJI0-Y6DPB",
    testFiles: ["part9-test1.js", "part9-test2.js", "part9-test3.js"], timeMinutes: 60 },
  { slug: "journeyman-elec", dir: "journeyman-elec-book", title: "Journeyman Electrician Exam Study Guide", code: "ELEC-BDOD6-BTL4F",
    testFiles: ["part8-test1.js", "part8-test2.js", "part8-test3.js"], timeMinutes: 120 },
  { slug: "poss", dir: "poss-book", title: "POSS Exam Study Guide", code: "POSS-2LI3E-RUWFW",
    testFiles: ["part5-test1.js", "part5-test2.js", "part5-test3.js"], timeMinutes: 77 },
  { slug: "csp", dir: "csp-book", title: "CSP Exam Study Guide", code: "CSP-D8F04-0KMZ8",
    testFiles: ["part7-test1.js", "part7-test2.js", "part7-test3.js"], timeMinutes: 90 },
  { slug: "chst", dir: "chst-book", title: "CHST Exam Study Guide", code: "CHST-CPIQJ-5U07R",
    testFiles: ["part5-test1.js", "part5-test2.js", "part5-test3.js"], timeMinutes: 90 },
  { slug: "nhie", dir: "nhie-book", title: "Home Inspector Exam Study Guide", code: "NHIE-OG6WS-Z4YE9",
    testFiles: ["part6-test1.js", "part6-test2.js", "part6-test3.js"], timeMinutes: 120 },
  { slug: "sts", dir: "sts-book", title: "STS Exam Study Guide", code: "STS-3H7RO-WGGPI",
    testFiles: ["part5-test1.js", "part5-test2.js", "part5-test3.js"], timeMinutes: 60 },
  { slug: "cpt", dir: "cpt-book", title: "MSSC CPT Exam Study Guide", code: "CPT-2ILBI-0PCA7",
    testFiles: ["part5-test1.js", "part5-test2.js", "part5-test3.js"], timeMinutes: 90 },
  { slug: "ncidq", dir: "ncidq-book", title: "NCIDQ Exam Study Guide", code: "NCDQ-TM9CT-MJ8L2",
    testFiles: ["part4-test1.js", "part4-test2.js", "part4-test3.js"], timeMinutes: 180 },
];

// Build a shimmed styles.js module that records all helper calls
function buildShimmedStyles(captures) {
  return {
    // Constants
    SP: { NONE: 0, SMALL: 60, MEDIUM: 120, LARGE: 240, XLARGE: 360, XXLARGE: 480 },
    FONT: { BODY: 24, SMALL: 20, LARGE: 28, CHAPTER: 36, PART: 40, TITLE: 56, SUBTITLE: 32 },
    PAGE_WIDTH: 12240, PAGE_HEIGHT: 15840, MARGIN: 1440, MARGIN_TOP: 1440, MARGIN_BOTTOM: 1440,
    MARGIN_LEFT: 1440, MARGIN_RIGHT: 1440, CONTENT_WIDTH: 9360,
    numberingConfig: [], docStyles: {},
    // No-op helpers (return placeholder objects/arrays)
    para: () => ({ type: "para" }),
    multiPara: () => ({ type: "multiPara" }),
    spacer: () => ({ type: "spacer" }),
    pageBreak: () => ({ type: "pageBreak" }),
    heading1: () => ({ type: "heading1" }),
    heading2: () => ({ type: "heading2" }),
    heading3: () => ({ type: "heading3" }),
    body: () => ({ type: "body" }),
    bullet: () => ({ type: "bullet" }),
    numbered: () => ({ type: "numbered" }),
    simpleTable: () => ({ type: "table" }),
    tipBox: () => [{ type: "tipBox" }],
    exampleBox: () => [{ type: "exampleBox" }],

    // RECORDING helpers
    question: (num, text, choices, answer, explanation) => {
      captures.questions[num] = { text, choices };
      if (answer) captures.answers[num] = { letter: String(answer).trim().toUpperCase(), explanation: explanation || "" };
      return [{ type: "question" }];
    },
    questionOnly: (num, text, choices) => {
      captures.questions[num] = { text, choices };
      return [{ type: "questionOnly" }];
    },
    answerKey: (num, letter, explanation) => {
      captures.answers[num] = { letter: String(letter).trim().toUpperCase(), explanation: explanation || "" };
      return [{ type: "answerKey" }];
    },
  };
}

function extractFromTestFile(bookDir, testFile) {
  const captures = { questions: {}, answers: {} };
  const fpath = path.join(BOOKS_DIR, bookDir, testFile);
  if (!fs.existsSync(fpath)) return null;

  // Intercept require("./styles") to return our shim
  const stylesPath = path.join(BOOKS_DIR, bookDir, "styles.js");
  const originalLoad = Module._load;
  const shim = buildShimmedStyles(captures);
  Module._load = function (request, parent, ...rest) {
    if (request === "./styles" && parent && parent.filename && parent.filename.startsWith(path.join(BOOKS_DIR, bookDir))) {
      return shim;
    }
    if (request === "docx") {
      // Stub docx
      return {
        Paragraph: function () {}, TextRun: function () {}, AlignmentType: {},
        HeadingLevel: {}, PageBreak: function () {}, TableOfContents: function () {},
        TabStopType: {}, TabStopPosition: {}, PositionalTab: function () {},
        PositionalTabAlignment: {}, PositionalTabRelativeTo: {}, PositionalTabLeader: {},
        BorderStyle: {}, ImageRun: function () {}, Table: function () {}, TableRow: function () {},
        TableCell: function () {}, WidthType: {}, ShadingType: {}, LevelFormat: {},
      };
    }
    return originalLoad.call(this, request, parent, ...rest);
  };

  // Clear cache for this file
  delete require.cache[require.resolve(fpath)];
  delete require.cache[stylesPath];

  try {
    const mod = require(fpath);
    // Find the build function (buildTest1, buildTest2, etc.)
    const buildFn = Object.values(mod).find(v => typeof v === "function");
    if (buildFn) buildFn();
  } catch (e) {
    console.log(`    ERROR: ${e.message}`);
  } finally {
    Module._load = originalLoad;
  }

  // Combine
  const result = [];
  const nums = Object.keys(captures.questions).map(n => parseInt(n, 10)).sort((a, b) => a - b);
  for (const num of nums) {
    const q = captures.questions[num];
    const a = captures.answers[num];
    if (!q || !a || !q.choices || q.choices.length !== 4) continue;
    result.push({
      num,
      question: q.text,
      choices: q.choices,
      answer: a.letter,
      explanation: a.explanation,
    });
  }
  return result;
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const summary = [];
const booksMeta = [];

for (const book of BOOKS) {
  console.log(`\n=== ${book.title} ===`);
  const bookOut = {
    slug: book.slug,
    title: book.title,
    code: book.code,
    timeMinutes: book.timeMinutes,
    tests: [],
  };
  for (let i = 0; i < book.testFiles.length; i++) {
    const fname = book.testFiles[i];
    const questions = extractFromTestFile(book.dir, fname);
    if (!questions) {
      console.log(`  Test ${i + 1}: FILE MISSING`);
      continue;
    }
    console.log(`  Test ${i + 1}: ${questions.length} questions`);
    bookOut.tests.push({ testNum: i + 1, questions });
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, `${book.slug}.json`), JSON.stringify(bookOut, null, 2));

  const totalQs = bookOut.tests.reduce((sum, t) => sum + t.questions.length, 0);
  booksMeta.push({
    slug: book.slug,
    title: book.title,
    code: book.code,
    timeMinutes: book.timeMinutes,
    testCount: bookOut.tests.length,
    totalQuestions: totalQs,
  });
  summary.push(`  ${book.title}: ${totalQs} questions`);
}

fs.writeFileSync(path.join(OUTPUT_DIR, "books.json"), JSON.stringify({
  books: booksMeta,
  adminCode: "CERTPATH-ADMIN-2026",
}, null, 2));

console.log("\n=== SUMMARY ===");
summary.forEach(s => console.log(s));
const grandTotal = booksMeta.reduce((sum, b) => sum + b.totalQuestions, 0);
console.log(`\nGRAND TOTAL: ${grandTotal} questions across ${booksMeta.length} books`);
console.log(`Data written to: ${OUTPUT_DIR}`);
