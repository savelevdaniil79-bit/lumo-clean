#!/usr/bin/env node
// Валидатор lumo_complete_content.json
//   npm run validate:content   — СТРОГО: 48 курсов × 8 уроков, ≥5 вопросов на урок, ≥1920 уникальных вопросов. Падает, пока контент неполный.
//   npm run validate:partial   — проверяет качество того, что уже написано; показывает прогресс; код 0, если ошибок качества нет.
const fs = require('fs');
const path = require('path');
const { courses: registry } = require('../src/registry');

const args = process.argv.slice(2);
const PARTIAL = args.includes('--partial');
const file = args.find((a) => !a.startsWith('--')) || path.join(__dirname, '..', 'lumo_complete_content.json');

const LANGS = ['ru', 'en', 'uz'];
const TYPES = ['single_select', 'true_false', 'text_input', 'matching'];
const REQ = { courses: 48, lessonsPerCourse: 8, minQuestionsPerLesson: 5, minQuestions: 1920 };
const STUB = /\b(todo|tbd|fixme|lorem)\b|translation coming soon|перевод позже|скоро будет|\?\?\?|xxx/i;
const CYR = /[\u0400-\u04FF]/;

const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

function fail(msg) { console.error('✖ ' + msg); process.exit(1); }

let data;
try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { fail(`Не удалось прочитать JSON (${file}): ${e.message}`); }

if (data.schemaVersion !== 1) err('root', 'schemaVersion должен быть 1');
if (JSON.stringify(data.languageCodes) !== JSON.stringify(LANGS)) err('root', 'languageCodes должен быть ["ru","en","uz"]');
if (!Array.isArray(data.courses)) fail('Поле courses отсутствует или не массив');

// проверка трёхъязычного поля; opts.code — поле с кодом (идентичность языков допустима)
function tri(v, where, opts = {}) {
  if (!v || typeof v !== 'object') return err(where, 'ожидается объект {ru,en,uz}');
  for (const l of LANGS) {
    if (typeof v[l] !== 'string' || !v[l].trim()) return err(where, `пустой или отсутствует язык «${l}»`);
    if (STUB.test(v[l])) err(where, `заглушка в «${l}»`);
  }
  for (const l of ['en', 'uz']) if (CYR.test(v[l])) err(where, `кириллица в поле «${l}»`);
  if (CYR.test(v.ru) && !opts.code) {
    if (v.en === v.ru) err(where, 'en совпадает с ru (непереведённая копия)');
    if (v.uz === v.ru) err(where, 'uz совпадает с ru (непереведённая копия)');
    if (v.en === v.uz && v.en.length > 25) err(where, 'en совпадает с uz');
  }
}

const regIds = new Set(registry.map((r) => r[0]));
const seenCourse = new Set(), seenLesson = new Set(), seenQ = new Set(), seenText = new Map();
let nLessons = 0, nQuestions = 0, completeCourses = 0;
const byType = {};
const norm = (s) => s.toLowerCase().replace(/\s+/g, ' ').trim();
const pad = (n) => String(n).padStart(2, '0');

data.courses.forEach((c, ci) => {
  const cw = `courses[${ci}]${c && c.courseId ? ' ' + c.courseId : ''}`;
  if (!c.courseId) return err(cw, 'нет courseId');
  if (!regIds.has(c.courseId)) err(cw, 'courseId отсутствует в реестре 48 курсов');
  if (seenCourse.has(c.courseId)) err(cw, 'повторяющийся courseId');
  seenCourse.add(c.courseId);
  tri(c.title, `${cw}.title`);
  const lessons = c.lessons;
  if (!Array.isArray(lessons)) return err(cw, 'lessons не массив');
  if (lessons.length > REQ.lessonsPerCourse) err(cw, `уроков больше ${REQ.lessonsPerCourse}`);
  if (!PARTIAL && lessons.length !== REQ.lessonsPerCourse) err(cw, `уроков ${lessons.length}, нужно ${REQ.lessonsPerCourse}`);
  let courseOk = lessons.length === REQ.lessonsPerCourse;

  lessons.forEach((l, li) => {
    const lw = `${cw} / lesson ${li + 1}`;
    nLessons++;
    if (l.order !== li + 1) err(lw, `order должен быть ${li + 1}`);
    if (l.lessonId !== `${c.courseId}.l${pad(li + 1)}`) err(lw, `lessonId должен быть ${c.courseId}.l${pad(li + 1)}`);
    if (seenLesson.has(l.lessonId)) err(lw, 'повторяющийся lessonId');
    seenLesson.add(l.lessonId);
    ['title', 'goal', 'theory', 'task', 'summary'].forEach((f) => tri(l[f], `${lw}.${f}`));
    if (l.code) tri(l.code, `${lw}.code`, { code: true });
    if (l.solution) tri(l.solution, `${lw}.solution`, { code: true });
    const qs = l.questions;
    if (!Array.isArray(qs)) { courseOk = false; return err(lw, 'questions не массив'); }
    if (qs.length < REQ.minQuestionsPerLesson) { courseOk = false; err(lw, `вопросов ${qs.length}, нужно минимум ${REQ.minQuestionsPerLesson}`); }

    qs.forEach((q, qi) => {
      const qw = `${lw} / q${qi + 1}`;
      nQuestions++;
      if (q.questionId !== `${l.lessonId}.q${pad(qi + 1)}`) err(qw, `questionId должен быть ${l.lessonId}.q${pad(qi + 1)}`);
      if (seenQ.has(q.questionId)) err(qw, 'повторяющийся questionId');
      seenQ.add(q.questionId);
      if (!TYPES.includes(q.type)) return err(qw, `недопустимый type «${q.type}»`);
      byType[q.type] = (byType[q.type] || 0) + 1;
      tri(q.text, `${qw}.text`);
      if (q.code) tri(q.code, `${qw}.code`, { code: true });
      tri(q.explanations, `${qw}.explanations`);
      tri(q.hints, `${qw}.hints`);

      // дубликаты вопросов
      if (q.text && q.text.ru) {
        const key = norm(q.text.ru) + '|' + (q.code ? norm(q.code.ru) : '');
        if (seenText.has(key)) err(qw, `дубликат вопроса ${seenText.get(key)}`);
        else seenText.set(key, q.questionId);
      }

      if (q.type === 'single_select' || q.type === 'true_false') {
        const need = q.type === 'single_select' ? 4 : 2;
        if (!Array.isArray(q.options) || q.options.length !== need) return err(qw, `нужно ровно ${need} варианта(ов)`);
        const ids = q.options.map((o) => o.optionId);
        if (new Set(ids).size !== ids.length) err(qw, 'повторяющиеся optionId');
        q.options.forEach((o, i) => tri(o.text, `${qw}.options[${i}]`));
        const texts = q.options.map((o) => o.text && o.text.ru && o.text.ru.replace(/\s+/g, ' ').trim());
        if (new Set(texts).size !== texts.length) err(qw, 'одинаковые варианты ответа');
        if (!ids.includes(q.correctOptionId)) return err(qw, 'correctOptionId не входит в варианты');
        const fb = q.optionFeedback || {};
        q.options.forEach((o) => {
          if (o.optionId === q.correctOptionId) return;
          if (!fb[o.optionId]) err(qw, `нет объяснения для неверного варианта ${o.optionId}`);
          else tri(fb[o.optionId], `${qw}.optionFeedback.${o.optionId}`);
        });
        // подсказка не должна раскрывать ответ
        const right = q.options.find((o) => o.optionId === q.correctOptionId).text;
        if (right && q.hints) LANGS.forEach((l) => {
          const r = right[l] && norm(right[l]);
          if (r && r.length >= 4 && q.hints[l] && norm(q.hints[l]).includes(r)) err(qw, `подсказка (${l}) раскрывает правильный ответ`);
        });
      } else if (q.type === 'text_input') {
        if (!Array.isArray(q.acceptedAnswers) || !q.acceptedAnswers.length || q.acceptedAnswers.some((a) => typeof a !== 'string' || !a.trim())) err(qw, 'acceptedAnswers должен быть непустым массивом строк');
      } else if (q.type === 'matching') {
        if (!Array.isArray(q.pairs) || q.pairs.length < 3) return err(qw, 'нужно минимум 3 пары');
        q.pairs.forEach((p, i) => { tri(p.left, `${qw}.pairs[${i}].left`); tri(p.right, `${qw}.pairs[${i}].right`); });
        const rights = q.pairs.map((p) => p.right && p.right.ru);
        if (new Set(rights).size !== rights.length) err(qw, 'повторяющиеся значения в правой колонке');
      }
      if (q.verify) {
        if (typeof q.verify.py !== 'string' || (q.verify.out === undefined && q.verify.err === undefined)) err(qw, 'verify: нужны py и out/err');
      }
    });
  });
  if (courseOk) completeCourses++;
});

// ---- итоговые требования ----
if (!PARTIAL) {
  if (data.courses.length !== REQ.courses) err('итого', `курсов ${data.courses.length}, нужно ровно ${REQ.courses}`);
  for (const id of regIds) if (!seenCourse.has(id)) err('итого', `в файле нет курса ${id}`);
  const need = REQ.courses * REQ.lessonsPerCourse;
  if (nLessons !== need) err('итого', `уроков ${nLessons}, нужно ровно ${need}`);
  if (nQuestions < REQ.minQuestions) err('итого', `вопросов ${nQuestions}, нужно минимум ${REQ.minQuestions}`);
}

// ---- отчёт ----
const pct = (a, b) => `${a}/${b} (${Math.round((a / b) * 100)}%)`;
console.log(`Режим: ${PARTIAL ? 'частичный (качество готовой части)' : 'СТРОГИЙ (итоговая приёмка)'}`);
console.log(`Курсов в файле:           ${data.courses.length} (реестр: ${registry.length})`);
console.log(`Курсов полностью готово:  ${pct(completeCourses, REQ.courses)}`);
console.log(`Уроков:                   ${pct(nLessons, REQ.courses * REQ.lessonsPerCourse)}`);
console.log(`Уникальных вопросов:      ${pct(nQuestions, REQ.minQuestions)}`);
console.log(`Языковых записей:         ${nQuestions * 3} из ${REQ.minQuestions * 3} (вопрос × ru/en/uz)`);
console.log(`Типы вопросов:            ${Object.entries(byType).map(([k, v]) => `${k}=${v}`).join(', ') || '—'}`);

if (errors.length) {
  console.error(`\n✖ Найдено проблем: ${errors.length}`);
  errors.slice(0, 60).forEach((e) => console.error('  - ' + e));
  if (errors.length > 60) console.error(`  … и ещё ${errors.length - 60}`);
  process.exit(1);
}
console.log(PARTIAL ? '\n✔ Готовая часть контента прошла все проверки качества.' : '\n✔ Контент полностью соответствует требованиям.');
