
#!/usr/bin/env node
// Независимая проверка Python-кода.
// 1. Проверяет вывод или ожидаемый тип ошибки.
// 2. Проверяет code и solution уроков на ru, en, uz.
// 3. Показывает реальные ошибки запуска Python.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const file = path.join(__dirname, '..', 'lumo_complete_content.json');

if (!fs.existsSync(file)) {
  console.error(`Не найден файл контента: ${file}`);
  process.exit(1);
}

let data;

try {
  data = JSON.parse(fs.readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`Ошибка чтения JSON: ${e.message}`);
  process.exit(1);
}

function run(code) {
  const r = spawnSync(
    'python3',
    ['-I', '-c', String(code ?? '')],
    {
      encoding: 'utf8',
      timeout: 5000,
      maxBuffer: 1024 * 1024
    }
  );

  return {
    out: (r.stdout || '').replace(/\r/g, '').trimEnd(),
    err: r.stderr || '',
    status: r.status,
    error: r.error || null,
    signal: r.signal || null
  };
}

function failureReason(r) {
  if (r.error) {
    if (r.error.code === 'ENOENT') {
      return 'Не найден python3. Установи Python 3 в среде сборки.';
    }

    if (r.error.code === 'ETIMEDOUT') {
      return 'Превышено время выполнения (5 секунд).';
    }

    return `${r.error.code || 'Ошибка запуска'}: ${r.error.message}`;
  }

  const details = r.err.trim();
  if (details) {
    return details.split('\n').pop();
  }

  if (r.signal) {
    return `процесс завершён сигналом ${r.signal}`;
  }

  return `код завершения ${r.status}`;
}

const problems = [];
let checkedQ = 0;
let checkedSnippets = 0;
let pythonCourses = 0;

if (!Array.isArray(data.courses)) {
  console.error('Ошибка структуры: data.courses должен быть массивом.');
  process.exit(1);
}

for (const c of data.courses) {
  let hasCode = false;

  for (const l of c.lessons || []) {
    for (const f of ['code', 'solution']) {
      if (!l[f]) continue;

      hasCode = true;

      for (const lang of ['ru', 'en', 'uz']) {
        if (typeof l[f][lang] !== 'string') {
          problems.push(
            `${l.lessonId}.${f}[${lang}]: отсутствует текст кода`
          );
          continue;
        }

        checkedSnippets++;
        const r = run(l[f][lang]);

        if (r.error || r.status !== 0) {
          problems.push(
            `${l.lessonId}.${f}[${lang}]: ${failureReason(r)}`
          );
        }
      }
    }

    for (const q of l.questions || []) {
      if (!q.verify) continue;

      hasCode = true;
      checkedQ++;

      const r = run(q.verify.py);

      if (q.verify.err !== undefined) {
        if (r.error) {
          problems.push(
            `${q.questionId}: не удалось проверить ожидаемую ошибку: ${failureReason(r)}`
          );
        } else if (r.status === 0 || !r.err.includes(q.verify.err)) {
          problems.push(
            `${q.questionId}: ожидалась ошибка "${q.verify.err}", получено: ${
              r.status === 0 ? 'успешный запуск' : failureReason(r)
            }`
          );
        }

        continue;
      }

      if (r.error || r.status !== 0) {
        problems.push(
          `${q.questionId}: код падает: ${failureReason(r)}`
        );
        continue;
      }

      if (r.out !== q.verify.out) {
        problems.push(
          `${q.questionId}: вывод «${r.out}» ≠ заявленному «${q.verify.out}»`
        );
      }

      if (q.verify.optionIsOutput) {
        if (q.type !== 'single_select') {
          problems.push(
            `${q.questionId}: optionIsOutput применим только к single_select`
          );
          continue;
        }

        const right = (q.options || []).find(
          (o) => o.optionId === q.correctOptionId
        );

        if (!right || !right.text || typeof right.text.ru !== 'string') {
          problems.push(
            `${q.questionId}: не найден текст правильного варианта на русском`
          );
        } else if (right.text.ru !== r.out) {
          problems.push(
            `${q.questionId}: правильный вариант «${right.text.ru}» ≠ реальному выводу «${r.out}»`
          );
        }
      }

      if (
        q.type === 'text_input' &&
        !Array.isArray(q.acceptedAnswers)
      ) {
        problems.push(
          `${q.questionId}: acceptedAnswers должен быть массивом`
        );
      } else if (
        q.type === 'text_input' &&
        !q.acceptedAnswers.some(
          (a) =>
            typeof a === 'string' &&
            a.trim().toLowerCase() === r.out.toLowerCase()
        )
      ) {
        problems.push(
          `${q.questionId}: ни один acceptedAnswers не равен реальному выводу «${r.out}»`
        );
      }
    }
  }

  if (hasCode) pythonCourses++;
}

console.log(
  `Проверено запуском python3: вопросов с кодом ${checkedQ}, ` +
  `фрагментов кода уроков ${checkedSnippets} ` +
  `(курсов с кодом: ${pythonCourses})`
);

if (problems.length) {
  console.error(`\n✖ Проблем: ${problems.length}`);
  problems.forEach((p) => console.error('  - ' + p));
  process.exit(1);
}

console.log(
  '✔ Все проверенные ответы и примеры кода подтверждены реальным запуском'
);
