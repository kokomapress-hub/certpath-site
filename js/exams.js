// One list of exams, shared by the home exam grid, the book-code router and the
// study hub (/study/<key>). books = the books.json slugs whose code (or pack key)
// opens this exam; course = the paid video course slug (/learn/<course>);
// yt = a free YouTube course; sheet = the cheatsheets/meta.json bank.
window.CP_EXAMS = [
  { key: 'pmp', short: 'PMP', name: 'Project Management Professional', field: 'Project management', page: '/pmp', books: ['pmp'], course: 'pmp', sheet: 'pmp', photo: '/img/photo/field-project.webp', pack: 'https://payhip.com/b/Atjx3' },
  { key: 'capm', short: 'CAPM', name: 'Certified Associate in Project Management', field: 'Project management', page: '/capm', books: ['capm'], course: 'capm', sheet: 'capm', photo: '/img/photo/field-project.webp' },
  { key: 'pmi-acp', short: 'PMI-ACP', name: 'PMI Agile Certified Practitioner', field: 'Project management', page: '/books/pmi-acp', books: ['pmi-acp'], sheet: 'pmi-acp', photo: '/img/photo/field-project.webp' },
  { key: 'cap', short: 'CAP', name: 'Certified Administrative Professional', field: 'Business', page: '/books/cap', books: ['cap'], sheet: 'cap', photo: '/img/photo/field-project.webp' },
  { key: 'cast', short: 'CAST', name: 'Construction and Skilled Trades test', field: 'Trades', page: '/cast', books: ['cast'], yt: 'https://www.youtube.com/playlist?list=PLJb4GZ4sHPDA', ytLessons: 10, photo: '/img/photo/field-trades.webp' },
  { key: 'journeyman', short: 'Journeyman', name: 'Journeyman Electrician (2026 NEC)', field: 'Trades', page: '/journeyman-electrician', books: ['journeyman-elec'], photo: '/img/photo/field-trades.webp' },
  { key: 'poss', short: 'POSS', name: 'Plant Operator Selection System', field: 'Trades', page: '/poss', books: ['poss'], photo: '/img/photo/field-trades.webp' },
  { key: 'mech-apt', short: 'Mech Aptitude', name: 'Mechanical Aptitude (BMCT, Wiesen, Ramsay)', field: 'Trades', page: '/mechanical-aptitude', books: ['mech-apt'], yt: 'https://www.youtube.com/playlist?list=PLFbmqdwVOD9Y', ytLessons: 30, sheet: 'mech-apt', photo: '/img/photo/field-trades.webp' },
  { key: 'csp', short: 'CSP', name: 'Certified Safety Professional', field: 'Safety', page: '/csp', books: ['csp'], photo: '/img/photo/field-trades.webp' },
  { key: 'chst', short: 'CHST', name: 'Construction Health & Safety Technician', field: 'Safety', page: '/chst', books: ['chst'], photo: '/img/photo/field-trades.webp' },
  { key: 'ccrn', short: 'CCRN', name: 'Adult Critical Care Registered Nurse', field: 'Nursing', page: '/ccrn', books: ['ccrn'], sheet: 'ccrn', photo: '/img/photo/field-healthcare.webp' },
  { key: 'cnor', short: 'CNOR', name: 'Certified Perioperative Nurse', field: 'Nursing', page: '/cnor', books: ['cnor'], sheet: 'cnor', photo: '/img/photo/field-healthcare.webp' },
  { key: 'cmsrn', short: 'CMSRN', name: 'Certified Medical-Surgical Registered Nurse', field: 'Nursing', page: '/books/cmsrn', books: ['cmsrn'], sheet: 'cmsrn', photo: '/img/photo/field-healthcare.webp' },
  { key: 'sat', short: 'SAT Math', name: 'Digital SAT Math', field: 'College admissions', page: '/sat', books: ['sat-math', 'sat-math-workbook', 'sat-math-tests'], course: 'sat-math', photo: '/img/photo/field-academic.webp', pack: 'https://payhip.com/b/KbAzN' },
  { key: 'psat', short: 'PSAT Math', name: 'PSAT/NMSQT Math', field: 'College admissions', page: '/psat', books: ['psat-math', 'psat-math-workbook', 'psat-math-tests'], photo: '/img/photo/psat-practice.webp' },
  { key: 'act', short: 'ACT Math', name: 'Enhanced ACT Math', field: 'College admissions', page: '/act', books: ['act-math', 'act-math-workbook', 'act-math-tests'], photo: '/img/photo/field-academic.webp' },
  { key: 'ged', short: 'GED Math', name: 'GED Mathematical Reasoning', field: 'Adult education', page: '/ged', books: ['ged-math', 'ged-math-workbook', 'ged-math-tests'], sheet: 'ged-math', photo: '/img/photo/step-review.webp' },
  { key: 'tabe-a', short: 'TABE A', name: 'TABE 11 & 12 Math · Level A', field: 'Adult education', page: '/tabe', books: ['tabe-a'], course: 'tabe-a', photo: '/img/photo/step-study.webp', pack: 'https://payhip.com/b/pw4Rs' },
  { key: 'tabe-d', short: 'TABE D', name: 'TABE 11 & 12 Math · Level D', field: 'Adult education', page: '/tabe', books: ['tabe-d'], course: 'tabe-d', photo: '/img/photo/step-study.webp', pack: 'https://payhip.com/b/Mavlg' },
  { key: 'tabe-m', short: 'TABE M', name: 'TABE 11 & 12 Math · Level M', field: 'Adult education', page: '/tabe', books: ['tabe-m'], course: 'tabe-m', photo: '/img/photo/step-study.webp', pack: 'https://payhip.com/b/tRLN4' },
  { key: 'tabe-e', short: 'TABE E', name: 'TABE 11 & 12 Math · Level E', field: 'Adult education', page: '/tabe', books: ['tabe-e'], course: 'tabe-e', photo: '/img/photo/step-study.webp', pack: 'https://payhip.com/b/vxU07' },
  { key: 'asvab', short: 'ASVAB Math', name: 'ASVAB Arithmetic Reasoning & Math Knowledge', field: 'Military', page: '/books/asvab-math', books: ['asvab-math'], photo: '/img/photo/step-practice.webp' }
];
window.CP_EXAM_FOR_BOOK = function (slug) {
  for (var i = 0; i < window.CP_EXAMS.length; i++) if (window.CP_EXAMS[i].books.indexOf(slug) > -1) return window.CP_EXAMS[i];
  return null;
};
