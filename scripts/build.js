// Сборка: реестр 48 курсов + батчи из src/batches/<courseId>/ -> lumo_complete_content.json
const fs = require('fs');
const path = require('path');
const { categories, courses } = require('../src/registry');

const root = path.join(__dirname, '..');
const outFile = path.join(root, 'lumo_complete_content.json');
const legacy = { courses: {}, lessons: {} };

const outCourses = courses.map(([courseId, cat, level, hours, ru, en, uz], legacyIndex) => {
  const batchDir = path.join(root, 'src', 'batches', courseId);
  const batchFile = batchDir + '.js';
  let lessons = [];
  if (fs.existsSync(batchDir) || fs.existsSync(batchFile)) {
    lessons = require(fs.existsSync(batchDir) ? batchDir : batchFile);
  }
  legacy.courses[legacyIndex] = courseId;
  lessons.forEach((l) => { if (l.legacyId) legacy.lessons[l.legacyId] = l.lessonId; });
  const complete = lessons.length === 8 && lessons.every((l) => l.questions.length >= 5);
  return {
    courseId, legacyIndex, category: cat, level, hours,
    title: { ru, en, uz },
    status: complete ? 'complete' : (lessons.length ? 'partial' : 'pending'),
    lessons,
  };
});

const data = {
  schemaVersion: 1,
  languageCodes: ['ru', 'en', 'uz'],
  categories: Object.fromEntries(Object.entries(categories).map(([k, v]) => [k, { title: { ru: v.ru, en: v.en, uz: v.uz }, description: v.blurb }])),
  courses: outCourses,
};

fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'legacy_id_map.json'), JSON.stringify(legacy, null, 2) + '\n');

const done = outCourses.filter((c) => c.status === 'complete').length;
const lessonsN = outCourses.reduce((a, c) => a + c.lessons.length, 0);
const qN = outCourses.reduce((a, c) => a + c.lessons.reduce((b, l) => b + l.questions.length, 0), 0);
console.log(`Собрано: курсов в реестре ${outCourses.length}, завершённых ${done}, уроков ${lessonsN}, вопросов ${qN} -> lumo_complete_content.json`);
