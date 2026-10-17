#!/usr/bin/env node
// Независимая проверка Python-кода: реально запускает python3.
//  1) Каждый вопрос с полем verify: вывод (или тип ошибки) должен совпасть с заявленным; при optionIsOutput
//     текст правильного варианта должен ДОСЛОВНО равняться выводу программы.
//  2) Каждый code и solution уроков (на ru, en и uz) должен запускаться без ошибок.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const file = path.join(__dirname, '..', 'lumo_complete_content.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

function run(code) {
  const r = spawnSync('python3', ['-I', '-c', code], { encoding: 'utf8', timeout: 5000 });
  return { out: (r.stdout || '').replace(/\r/g, '').trimEnd(), err: r.stderr || '', status: r.status };
}

const problems = [];
let checkedQ = 0, checkedSnippets = 0, pythonCourses = 0;

for (const c of data.courses) {
  let hasCode = false;
  for (const l of c.lessons) {
    for (const f of ['code', 'solution']) {
      if (!l[f]) continue;
      hasCode = true;
      for (const lang of ['ru', 'en', 'uz']) {
        checkedSnippets++;
        const r = run(l[f][lang]);
        if (r.status !== 0) problems.push(`${l.lessonId}.${f}[${lang}]: код падает: ${r.err.trim().split('\n').pop()}`);
      }
    }
    for (const q of l.questions) {
      if (!q.verify) continue;
      hasCode = true;
      checkedQ++;
      const r = run(q.verify.py);
      if (q.verify.err !== undefined) {
        if (r.status === 0 || !r.err.includes(q.verify.err)) problems.push(`${q.questionId}: ожидалась ошибка ${q.verify.err}, получено: ${r.status === 0 ? 'успешный запуск' : r.err.trim().split('\n').pop()}`);
        continue;
      }
      if (r.status !== 0) { problems.push(`${q.questionId}: код падает: ${r.err.trim().split('\n').pop()}`); continue; }
      if (r.out !== q.verify.out) problems.push(`${q.questionId}: вывод «${r.out}» ≠ заявленному «${q.verify.out}»`);
      if (q.verify.optionIsOutput) {
        if (q.type !== 'single_select') { problems.push(`${q.questionId}: optionIsOutput применим только к single_select`); continue; }
        const right = q.options.find((o) => o.optionId === q.correctOptionId).text.ru;
        if (right !== r.out) problems.push(`${q.questionId}: правильный вариант «${right}» ≠ реальному выводу «${r.out}»`);
      }
      if (q.type === 'text_input' && !q.acceptedAnswers.some((a) => a.trim().toLowerCase() === r.out.toLowerCase()))
        problems.push(`${q.questionId}: ни один из acceptedAnswers не равен реальному выводу «${r.out}»`);
    }
  }
  if (hasCode) pythonCourses++;
}

console.log(`Проверено запуском python3: вопросов с кодом ${checkedQ}, фрагментов кода уроков ${checkedSnippets} (курсов с кодом: ${pythonCourses})`);
if (problems.length) {
  console.error(`\n✖ Проблем: ${problems.length}`);
  problems.forEach((p) => console.error('  - ' + p));
  process.exit(1);
}
console.log('✔ Все проверенные ответы и примеры кода подтверждены реальным запуском.');
