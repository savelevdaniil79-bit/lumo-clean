// Реестр 48 курсов Lumo. Порядок = старый числовой id в index.html (legacyIndex 0..47).
// Формат: [courseId, категория, уровень(0-2), часы, ru, en, uz]
// courseId — СТАБИЛЬНЫЙ slug. Никогда не меняйте уже выданные courseId.

const categories = {
  en: { ru: 'Английский язык', en: 'English Language', uz: 'Ingliz tili',
        blurb: { ru: 'Слова, грамматика и живая речь короткими сессиями.', en: 'Words, grammar and live speech in short sessions.', uz: 'Qisqa mashg‘ulotlarda so‘zlar, grammatika va jonli nutq.' } },
  fl: { ru: 'Другие языки', en: 'Other Languages', uz: 'Boshqa tillar',
        blurb: { ru: 'Базовая лексика и фразы для первых разговоров.', en: 'Basic vocabulary and phrases for first conversations.', uz: 'Birinchi suhbatlar uchun asosiy lug‘at va iboralar.' } },
  pr: { ru: 'Программирование', en: 'Programming', uz: 'Dasturlash',
        blurb: { ru: 'Практика кода: от синтаксиса до небольших проектов.', en: 'Coding practice: from syntax to small projects.', uz: 'Kod yozish amaliyoti: sintaksisdan kichik loyihalargacha.' } },
  ai: { ru: 'ИИ и AI-инструменты', en: 'AI and AI Tools', uz: 'AI va AI vositalari',
        blurb: { ru: 'Как использовать нейросети осознанно и с проверкой результата.', en: 'How to use neural networks consciously and verify the results.', uz: 'Neyron tarmoqlardan ongli foydalanish va natijani tekshirish.' } },
  ma: { ru: 'Математика', en: 'Mathematics', uz: 'Matematika',
        blurb: { ru: 'Наглядные объяснения и задачи с разбором.', en: 'Visual explanations and problems with worked solutions.', uz: 'Ko‘rgazmali tushuntirishlar va yechimlari bilan masalalar.' } },
  ds: { ru: 'Дизайн и UX/UI', en: 'Design and UX/UI', uz: 'Dizayn va UX/UI',
        blurb: { ru: 'Принципы дизайна и работа с интерфейсами.', en: 'Design principles and working with interfaces.', uz: 'Dizayn tamoyillari va interfeyslar bilan ishlash.' } },
  fi: { ru: 'Финансовая грамотность', en: 'Financial Literacy', uz: 'Moliyaviy savodxonlik',
        blurb: { ru: 'Деньги, бюджет и решения без паники.', en: 'Money, budgeting and decisions without panic.', uz: 'Pul, byudjet va vahimasiz qarorlar.' } },
  sc: { ru: 'Наука и технологии', en: 'Science and Technology', uz: 'Fan va texnologiya',
        blurb: { ru: 'Как устроен мир вокруг: просто о сложном.', en: 'How the world around us works: simple talk about complex things.', uz: 'Atrofimizdagi dunyo qanday ishlaydi: murakkab narsalar haqida oddiy tilda.' } },
  lo: { ru: 'Логика и мышление', en: 'Logic and Thinking', uz: 'Mantiq va fikrlash',
        blurb: { ru: 'Учимся рассуждать строго и замечать ошибки в аргументах.', en: 'Learning to reason rigorously and spot errors in arguments.', uz: 'Qat’iy mulohaza yuritish va dalillardagi xatolarni payqashni o‘rganish.' } },
  sk: { ru: 'Soft skills и карьера', en: 'Soft Skills and Career', uz: 'Soft skills va karyera',
        blurb: { ru: 'Навыки, которые пригодятся на учёбе и в работе.', en: 'Skills that will be useful in study and at work.', uz: 'O‘qishda va ishda foydali bo‘ladigan ko‘nikmalar.' } },
};

const courses = [
  // --- en ---
  ['english-from-scratch', 'en', 0, 12, 'Английский с нуля', 'English from Scratch', 'Noldan ingliz tili'],
  ['english-for-travel', 'en', 0, 6, 'Английский для путешествий', 'English for Travel', 'Sayohat uchun ingliz tili'],
  ['spoken-english', 'en', 1, 10, 'Разговорный английский', 'Conversational English', 'So‘zlashuv ingliz tili'],
  ['english-for-it', 'en', 1, 8, 'Английский для IT', 'English for IT', 'IT uchun ingliz tili'],
  ['business-english', 'en', 2, 10, 'Деловой английский', 'Business English', 'Biznes ingliz tili'],
  ['grammar-made-fun', 'en', 1, 9, 'Грамматика без скуки', 'Grammar Without the Boredom', 'Zerikmasdan grammatika'],
  ['english-listening', 'en', 1, 7, 'Английский на слух', 'English Listening', 'Ingliz tilini eshitib tushunish'],
  ['ielts-prep', 'en', 2, 20, 'Подготовка к IELTS', 'IELTS Preparation', 'IELTSga tayyorgarlik'],
  // --- fl ---
  ['spanish-from-scratch', 'fl', 0, 12, 'Испанский с нуля', 'Spanish from Scratch', 'Noldan ispan tili'],
  ['german-from-scratch', 'fl', 0, 12, 'Немецкий с нуля', 'German from Scratch', 'Noldan nemis tili'],
  ['french-from-scratch', 'fl', 0, 12, 'Французский с нуля', 'French from Scratch', 'Noldan fransuz tili'],
  ['chinese-first-steps', 'fl', 0, 14, 'Китайский: первые шаги', 'Chinese: First Steps', 'Xitoy tili: birinchi qadamlar'],
  ['italian-for-travel', 'fl', 0, 6, 'Итальянский для путешествий', 'Italian for Travel', 'Sayohat uchun italyan tili'],
  ['japanese-kana', 'fl', 0, 8, 'Японский: хирагана и катакана', 'Japanese: Hiragana and Katakana', 'Yapon tili: hiragana va katakana'],
  // --- pr ---
  ['python-beginners', 'pr', 0, 3, 'Python для начинающих', 'Python for Beginners', 'Boshlovchilar uchun Python'],
  ['javascript-from-scratch', 'pr', 0, 12, 'JavaScript с нуля', 'JavaScript from Scratch', 'Noldan JavaScript'],
  ['html-css', 'pr', 0, 8, 'HTML и CSS', 'HTML and CSS', 'HTML va CSS'],
  ['react', 'pr', 1, 14, 'React', 'React', 'React'],
  ['git-github', 'pr', 0, 4, 'Git и GitHub', 'Git and GitHub', 'Git va GitHub'],
  ['sql-for-data-analysis', 'pr', 1, 8, 'SQL для анализа данных', 'SQL for Data Analysis', 'Ma’lumotlar tahlili uchun SQL'],
  ['typescript-in-practice', 'pr', 2, 10, 'TypeScript на практике', 'TypeScript in Practice', 'Amaliyotda TypeScript'],
  ['algorithms-data-structures', 'pr', 2, 16, 'Алгоритмы и структуры данных', 'Algorithms and Data Structures', 'Algoritmlar va ma’lumotlar tuzilmalari'],
  // --- ai ---
  ['ml-basics', 'ai', 1, 12, 'Основы машинного обучения', 'Machine Learning Basics', 'Mashinaviy o‘qitish asoslari'],
  ['effective-chatgpt', 'ai', 0, 5, 'Эффективная работа с ChatGPT', 'Working Effectively with ChatGPT', 'ChatGPT bilan samarali ishlash'],
  ['prompt-engineering', 'ai', 1, 6, 'Промпт-инжиниринг', 'Prompt Engineering', 'Prompt muhandisligi'],
  ['ai-for-study-research', 'ai', 0, 4, 'AI для учёбы и исследований', 'AI for Study and Research', 'O‘qish va tadqiqot uchun AI'],
  ['ai-ethics-risks', 'ai', 1, 4, 'Этика и риски ИИ', 'AI Ethics and Risks', 'AI etikasi va xavflari'],
  // --- ma ---
  ['math-basics', 'ma', 0, 8, 'Основы математики', 'Math Basics', 'Matematika asoslari'],
  ['algebra-without-fear', 'ma', 1, 10, 'Алгебра без страха', 'Algebra Without Fear', 'Qo‘rqmasdan algebra'],
  ['geometry-visual', 'ma', 1, 10, 'Геометрия наглядно', 'Geometry Made Visual', 'Ko‘rgazmali geometriya'],
  ['probability-theory', 'ma', 2, 12, 'Теория вероятностей', 'Probability Theory', 'Ehtimollar nazariyasi'],
  // --- ds ---
  ['ui-ux-design', 'ds', 0, 10, 'UI/UX-дизайн', 'UI/UX Design', 'UI/UX dizayn'],
  ['figma-beginners', 'ds', 0, 6, 'Figma для начинающих', 'Figma for Beginners', 'Boshlovchilar uchun Figma'],
  ['typography-basics', 'ds', 1, 5, 'Основы типографики', 'Typography Basics', 'Tipografiya asoslari'],
  ['color-composition', 'ds', 1, 6, 'Цвет и композиция', 'Color and Composition', 'Rang va kompozitsiya'],
  // --- fi ---
  ['personal-finance', 'fi', 0, 5, 'Личные финансы', 'Personal Finance', 'Shaxsiy moliya'],
  ['investment-literacy', 'fi', 1, 8, 'Инвестиционная грамотность', 'Investment Literacy', 'Investitsion savodxonlik'],
  ['student-budget', 'fi', 0, 3, 'Бюджет студента', 'Student Budget', 'Talaba byudjeti'],
  ['taxes-documents', 'fi', 1, 4, 'Налоги и документы', 'Taxes and Documents', 'Soliqlar va hujjatlar'],
  // --- sc ---
  ['how-internet-works', 'sc', 0, 4, 'Как работает интернет', 'How the Internet Works', 'Internet qanday ishlaydi'],
  ['physics-basics', 'sc', 1, 10, 'Основы физики', 'Physics Basics', 'Fizika asoslari'],
  ['neuroscience-for-learning', 'sc', 1, 6, 'Нейронаука для учёбы', 'Neuroscience for Learning', 'O‘qish uchun neyrobiologiya'],
  // --- lo ---
  ['critical-thinking', 'lo', 0, 6, 'Критическое мышление', 'Critical Thinking', 'Tanqidiy fikrlash'],
  ['logic-puzzles', 'lo', 0, 5, 'Логические задачи', 'Logic Puzzles', 'Mantiqiy masalalar'],
  ['cognitive-biases', 'lo', 1, 5, 'Когнитивные искажения', 'Cognitive Biases', 'Kognitiv xatoliklar'],
  // --- sk ---
  ['public-speaking', 'sk', 0, 6, 'Публичные выступления', 'Public Speaking', 'Ommaviy nutq so‘zlash'],
  ['interview-prep', 'sk', 1, 5, 'Подготовка к собеседованию', 'Interview Preparation', 'Suhbatga tayyorgarlik'],
  ['time-management', 'sk', 0, 4, 'Тайм-менеджмент', 'Time Management', 'Vaqtni boshqarish'],
];

module.exports = { categories, courses };
