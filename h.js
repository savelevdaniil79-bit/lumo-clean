// Помощники для компактной записи уроков. Результат — полный формат lumo_complete_content.json.
const L = (ru, en, uz) => ({ ru, en, uz });          // текст на трёх языках
const N = (s) => ({ ru: s, en: s, uz: s });           // нейтральный текст (код, числа, True/False)
const LETTERS = ['A', 'B', 'C', 'D'];

// single_select: 4 варианта, c — индекс правильного, fb — отзывы ТОЛЬКО для неверных (в порядке следования)
function sel(id, text, opts, c, expl, fb, hint, extra = {}) {
  if (opts.length !== 4) throw new Error(`${id}: нужно 4 варианта`);
  if (fb.length !== 3) throw new Error(`${id}: нужно 3 отзыва для неверных вариантов`);
  const options = opts.map((o, i) => ({ optionId: LETTERS[i], text: o }));
  const optionFeedback = {};
  let k = 0;
  opts.forEach((_, i) => { if (i !== c) optionFeedback[LETTERS[i]] = fb[k++]; });
  const q = { questionId: id, type: 'single_select', text };
  if (extra.code) q.code = extra.code;
  Object.assign(q, { options, correctOptionId: LETTERS[c], explanations: expl, optionFeedback, hints: hint });
  if (extra.verify) q.verify = extra.verify;
  return q;
}

// text_input: ответ вводится вручную; answers — допустимые ответы (сравнение без регистра и пробелов по краям)
function inp(id, text, answers, expl, hint, extra = {}) {
  const q = { questionId: id, type: 'text_input', text };
  if (extra.code) q.code = extra.code;
  Object.assign(q, { acceptedAnswers: answers, explanations: expl, hints: hint });
  if (extra.verify) q.verify = extra.verify;
  return q;
}

// matching: pairs = [[left, right], ...]
function mat(id, text, pairs, expl, hint) {
  return { questionId: id, type: 'matching', text, pairs: pairs.map(([left, right]) => ({ left, right })), explanations: expl, hints: hint };
}

// Урок. n — номер 1..8. legacy — старый id урока из index.html (для переноса прогресса).
function lesson(slug, n, meta, questions) {
  const nn = String(n).padStart(2, '0');
  const lessonId = `${slug}.l${nn}`;
  questions.forEach((q, i) => { q.questionId = `${lessonId}.q${String(i + 1).padStart(2, '0')}`; });
  return {
    lessonId, order: n, ...(meta.legacy ? { legacyId: meta.legacy } : {}),
    title: meta.title, goal: meta.goal, theory: meta.theory,
    ...(meta.code ? { code: meta.code } : {}), task: meta.task,
    ...(meta.solution ? { solution: meta.solution } : {}), summary: meta.summary,
    questions,
  };
}

module.exports = { L, N, sel, inp, mat, lesson };
