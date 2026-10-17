const { L, N, sel, inp, mat, lesson } = require('../../lib/h');
const S = 'python-beginners';
const ERR = L(`ошибку`, `an error`, `xatolik`);

// ───────────── Урок 1. Переменные и вывод (legacy co1) ─────────────
const l1 = lesson(S, 1, {
  legacy: 'co1',
  title: L(`Переменные и вывод`, `Variables and Output`, `O‘zgaruvchilar va chiqarish`),
  goal: L(`Научиться создавать переменные и выводить значения на экран.`,
    `Learn to create variables and display values on the screen.`,
    `O‘zgaruvchilar yaratishni va qiymatlarni ekranga chiqarishni o‘rganish.`),
  theory: L(
    `Переменная — это имя, которое указывает на значение. Знак = в Python означает присваивание: справа вычисляется значение, слева задаётся имя. Функция print() показывает значения в консоли.`,
    `A variable is a name that refers to a value. In Python, the = sign means assignment: the value on the right is evaluated and the name on the left is set. The print() function displays values in the console.`,
    `O‘zgaruvchi — bu qiymatga ishora qiluvchi nom. Python’da = belgisi qiymat berishni bildiradi: o‘ng tomondagi qiymat hisoblanadi, chap tomonda esa nom belgilanadi. print() funksiyasi qiymatlarni konsolga chiqaradi.`),
  code: L(
`name = "Аня"
age = 17
print(name, age)
age = age + 1
print(age)`,
`name = "Anna"
age = 17
print(name, age)
age = age + 1
print(age)`,
`name = "Anora"
age = 17
print(name, age)
age = age + 1
print(age)`),
  task: L(`Создайте переменные city и year и выведите их одним вызовом print.`,
    `Create the variables city and year and print them with a single print call.`,
    `city va year o‘zgaruvchilarini yarating va ularni bitta print chaqiruvi bilan chiqaring.`),
  solution: L(`city = "Ташкент"\nyear = 2026\nprint(city, year)`,
    `city = "Tashkent"\nyear = 2026\nprint(city, year)`,
    `city = "Toshkent"\nyear = 2026\nprint(city, year)`),
  summary: L(`Переменная — имя для значения; = присваивает, print() выводит. Имена не начинаются с цифры, регистр важен.`,
    `A variable is a name for a value; = assigns, print() displays. Names cannot start with a digit, and case matters.`,
    `O‘zgaruvchi — qiymat uchun nom; = qiymat beradi, print() chiqaradi. Nomlar raqamdan boshlanmaydi, katta-kichik harf farqlanadi.`),
}, [
  sel('x', L(`Что делает строка x = 5 ?`, `What does the line x = 5 do?`, `x = 5 qatori nima qiladi?`),
    [L(`Сравнивает x с 5`, `Compares x with 5`, `x ni 5 bilan solishtiradi`),
     L(`Присваивает переменной x значение 5`, `Assigns the value 5 to the variable x`, `x o‘zgaruvchisiga 5 qiymatini beradi`),
     L(`Выводит 5 на экран`, `Prints 5 to the screen`, `5 ni ekranga chiqaradi`),
     L(`Создаёт функцию x`, `Creates a function named x`, `x nomli funksiya yaratadi`)], 1,
    L(`Знак = в Python — присваивание. Для сравнения используется ==.`, `The = sign in Python is assignment. Comparison uses ==.`, `Python’da = belgisi qiymat berishni bildiradi. Solishtirish uchun == ishlatiladi.`),
    [L(`Сравнение записывается через ==, а не =.`, `Comparison is written with ==, not =.`, `Solishtirish = emas, == bilan yoziladi.`),
     L(`За вывод отвечает print(), а не знак =.`, `Printing is done by print(), not by the = sign.`, `Chiqarish uchun = emas, print() javob beradi.`),
     L(`Функции создаются через def, а не знаком =.`, `Functions are created with def, not with the = sign.`, `Funksiyalar = bilan emas, def bilan yaratiladi.`)],
    L(`Вспомните, чем = отличается от ==.`, `Recall how = differs from ==.`, `= belgisi == dan nimasi bilan farq qilishini eslang.`)),

  sel('x', L(`Какое имя переменной допустимо в Python?`, `Which variable name is valid in Python?`, `Python’da qaysi o‘zgaruvchi nomi to‘g‘ri?`),
    [N(`2name`), N(`my-name`), N(`my_name`), N(`my name`)], 2,
    L(`Имя состоит из букв, цифр и _, не начинается с цифры и не содержит дефисов и пробелов. Поэтому подходит my_name.`,
      `A name consists of letters, digits and _, does not start with a digit, and has no hyphens or spaces, so my_name is valid.`,
      `Nom harflar, raqamlar va _ dan iborat bo‘ladi, raqamdan boshlanmaydi, defis va probel bo‘lmaydi. Shuning uchun my_name to‘g‘ri.`),
    [L(`Имя не может начинаться с цифры.`, `A name cannot start with a digit.`, `Nom raqamdan boshlanishi mumkin emas.`),
     L(`Дефис Python читает как минус.`, `Python reads a hyphen as a minus sign.`, `Python defisni minus belgisi deb o‘qiydi.`),
     L(`Пробел делит имя на две части.`, `A space splits the name into two parts.`, `Probel nomni ikki qismga bo‘lib yuboradi.`)],
    L(`Посмотрите на первый символ и на «лишние» знаки.`, `Look at the first character and any extra symbols.`, `Birinchi belgiga va ortiqcha belgilarga e’tibor bering.`)),

  sel('x', L(`Выполнен код: name = "Аня", затем Name = "Борис". Что выведет print(name)?`,
      `This code runs: name = "Anna", then Name = "Boris". What does print(name) output?`,
      `Kod bajarildi: name = "Anora", keyin Name = "Boris". print(name) nima chiqaradi?`),
    [L(`Аня`, `Anna`, `Anora`), L(`Борис`, `Boris`, `Boris`), L(`Аня Борис`, `Anna Boris`, `Anora Boris`), ERR], 0,
    L(`Python различает регистр: name и Name — разные переменные, поэтому name по-прежнему хранит «Аня».`,
      `Python is case-sensitive: name and Name are different variables, so name still holds “Anna”.`,
      `Python katta-kichik harfni farqlaydi: name va Name — turli o‘zgaruvchilar, shuning uchun name hamon “Anora”ni saqlaydi.`),
    [L(`Name — другая переменная, она не заменяет name.`, `Name is a different variable and does not replace name.`, `Name boshqa o‘zgaruvchi, u name ning o‘rnini bosmaydi.`),
     L(`print(name) выводит только одну переменную.`, `print(name) outputs only one variable.`, `print(name) faqat bitta o‘zgaruvchini chiqaradi.`),
     L(`Обе переменные созданы корректно, ошибки нет.`, `Both variables are created correctly, so there is no error.`, `Ikkala o‘zgaruvchi ham to‘g‘ri yaratilgan, xatolik yo‘q.`)],
    L(`name и Name пишутся по-разному. Считает ли их Python одним именем?`, `name and Name are spelled differently. Does Python treat them as one name?`, `name va Name har xil yoziladi. Python ularni bitta nom deb hisoblaydimi?`),
    { verify: { py: `name = "Anna"\nName = "Boris"\nprint(name)`, out: `Anna` } }),

  inp('x', L(`Что выведет код: x = 2; x = x + 3; print(x)?`, `What does this code print: x = 2; x = x + 3; print(x)?`, `Bu kod nima chiqaradi: x = 2; x = x + 3; print(x)?`),
    [`5`],
    L(`Сначала x = 2, затем x становится 2 + 3 = 5.`, `First x = 2, then x becomes 2 + 3 = 5.`, `Avval x = 2, keyin x ning qiymati 2 + 3 = 5 bo‘ladi.`),
    L(`Сначала вычисляется правая часть, потом результат записывается в x.`, `The right side is evaluated first, then the result is stored in x.`, `Avval o‘ng tomon hisoblanadi, keyin natija x ga yoziladi.`),
    { verify: { py: `x = 2\nx = x + 3\nprint(x)`, out: `5` } }),

  sel('x', L(`Что выведет print("a", "b")?`, `What does print("a", "b") output?`, `print("a", "b") nima chiqaradi?`),
    [N(`ab`), N(`a b`), N(`a, b`), N(`('a', 'b')`)], 1,
    L(`print() разделяет аргументы пробелом по умолчанию, поэтому результат — a b.`, `By default print() separates arguments with a space, so the result is a b.`, `print() odatda argumentlarni probel bilan ajratadi, shuning uchun natija a b bo‘ladi.`),
    [L(`Между аргументами автоматически ставится пробел.`, `A space is automatically placed between the arguments.`, `Argumentlar orasiga avtomatik probel qo‘yiladi.`),
     L(`Запятая в коде разделяет аргументы, но в вывод не попадает.`, `The comma in the code separates arguments but does not appear in the output.`, `Koddagi vergul argumentlarni ajratadi, lekin chiqishga tushmaydi.`),
     L(`Так выглядит кортеж, а print выводит значения по отдельности.`, `That is how a tuple looks; print outputs the values separately.`, `Bu kortej ko‘rinishi; print esa qiymatlarni alohida chiqaradi.`)],
    L(`Вспомните, что стоит между аргументами по умолчанию.`, `Recall what goes between arguments by default.`, `Standart holatda argumentlar orasida nima turishini eslang.`),
    { verify: { py: `print("a", "b")`, out: `a b`, optionIsOutput: true } }),
]);

// ───────────── Урок 2. Типы данных и операции (legacy co2) ─────────────
const l2 = lesson(S, 2, {
  legacy: 'co2',
  title: L(`Типы данных и операции`, `Data Types and Operations`, `Ma’lumot turlari va amallar`),
  goal: L(`Различать int, float, str, bool и применять арифметические операции.`,
    `Distinguish int, float, str and bool and apply arithmetic operations.`,
    `int, float, str va bool turlarini ajratish hamda arifmetik amallarni qo‘llash.`),
  theory: L(
    `У каждого значения есть тип: целое int (7), дробное float (3.5), строка str и логическое bool (True или False). Для чисел доступны +, -, *, / (результат всегда float), // (целая часть деления), % (остаток) и ** (степень). Порядок выполнения: сначала **, затем *, /, //, %, и в конце + и -.`,
    `Every value has a type: integer int (7), floating-point float (3.5), string str, and boolean bool (True or False). Numbers support +, -, *, / (the result is always a float), // (floor division), % (remainder) and ** (power). Order of evaluation: ** first, then *, /, //, %, and finally + and -.`,
    `Har bir qiymatning turi bor: butun son int (7), kasr son float (3.5), satr str va mantiqiy bool (True yoki False). Sonlar uchun +, -, *, / (natija doim float), // (butun qismli bo‘lish), % (qoldiq) va ** (daraja) amallari mavjud. Bajarilish tartibi: avval **, keyin *, /, //, %, oxirida + va -.`),
  code: N(`print(7 / 2)   # 3.5
print(7 // 2)  # 3
print(7 % 2)   # 1
print(2 ** 5)  # 32
print(type(3.0))`),
  task: L(`Узнайте, сколько полных часов и минут в 135 минутах, используя // и %.`,
    `Find the number of full hours and remaining minutes in 135 minutes using // and %.`,
    `// va % yordamida 135 daqiqada nechta to‘liq soat va necha daqiqa qolishini toping.`),
  solution: N(`minutes = 135\nprint(minutes // 60, minutes % 60)  # 2 15`),
  summary: L(`Типы int, float, str, bool. Оператор / даёт float, // — целую часть, % — остаток, ** — степень.`,
    `Types int, float, str, bool. The / operator gives a float, // gives the floor, % the remainder, ** the power.`,
    `int, float, str, bool turlari. / operatori float beradi, // — butun qismini, % — qoldiqni, ** — darajani.`),
}, [
  sel('x', L(`Чему равно 17 // 5?`, `What is 17 // 5?`, `17 // 5 nimaga teng?`),
    [N(`3`), N(`3.4`), N(`4`), N(`2`)], 0,
    L(`17 = 5·3 + 2, поэтому // возвращает 3.`, `17 = 5·3 + 2, so // returns 3.`, `17 = 5·3 + 2, shuning uchun // 3 ni qaytaradi.`),
    [L(`Это результат обычного деления /, а не //.`, `That is the result of regular division /, not //.`, `Bu // emas, oddiy bo‘lish / natijasi.`),
     L(`// отбрасывает дробную часть вниз, а не округляет вверх.`, `// floors the result; it does not round up.`, `// natijani pastga yaxlitlaydi, yuqoriga emas.`),
     L(`2 — это остаток (17 % 5), а не целая часть.`, `2 is the remainder (17 % 5), not the quotient.`, `2 — bu qoldiq (17 % 5), bo‘linma emas.`)],
    L(`Сколько раз 5 целиком помещается в 17?`, `How many times does 5 fit entirely into 17?`, `17 ichiga 5 necha marta to‘liq sig‘adi?`),
    { verify: { py: `print(17 // 5)`, out: `3`, optionIsOutput: true } }),

  inp('x', L(`Чему равно 23 % 6?`, `What is 23 % 6?`, `23 % 6 nimaga teng?`), [`5`],
    L(`23 = 6·3 + 5, поэтому остаток от деления равен 5.`, `23 = 6·3 + 5, so the remainder is 5.`, `23 = 6·3 + 5, shuning uchun qoldiq 5 ga teng.`),
    L(`Остаток — это то, что не поместилось в целое число делителей.`, `The remainder is what is left over after whole divisors fit in.`, `Qoldiq — bo‘luvchi butun marta sig‘gandan keyin ortib qolgan qism.`),
    { verify: { py: `print(23 % 6)`, out: `5` } }),

  sel('x', L(`Какой тип вернёт type(10 / 5)?`, `What type does type(10 / 5) return?`, `type(10 / 5) qanday tur qaytaradi?`),
    [N(`int`), N(`float`), N(`str`), N(`bool`)], 1,
    L(`Оператор / всегда возвращает float, поэтому 10 / 5 даёт 2.0 типа float.`, `The / operator always returns a float, so 10 / 5 gives 2.0 of type float.`, `/ operatori doim float qaytaradi, shuning uchun 10 / 5 float turidagi 2.0 beradi.`),
    [L(`Часто ожидают int, но / не возвращает целое.`, `People often expect int, but / never returns an integer.`, `Ko‘pincha int kutiladi, lekin / hech qachon butun son qaytarmaydi.`),
     L(`Результат деления — число, а не строка.`, `The result of division is a number, not a string.`, `Bo‘lish natijasi son, satr emas.`),
     L(`bool — это только True или False.`, `bool is only True or False.`, `bool faqat True yoki False bo‘ladi.`)],
    L(`Что всегда возвращает оператор /?`, `What does the / operator always return?`, `/ operatori doim nimani qaytaradi?`),
    { verify: { py: `print(type(10 / 5))`, out: `<class 'float'>` } }),

  sel('x', L(`Что выведет print(8 / 2)?`, `What does print(8 / 2) output?`, `print(8 / 2) nima chiqaradi?`),
    [N(`4`), N(`4.0`), N(`2`), N(`16`)], 1,
    L(`Оператор / всегда возвращает float, поэтому будет 4.0, а не 4.`, `The / operator always returns a float, so the result is 4.0, not 4.`, `/ operatori doim float qaytaradi, shuning uchun natija 4 emas, 4.0 bo‘ladi.`),
    [L(`Это был бы результат 8 // 2, но / даёт float.`, `That would be 8 // 2, but / gives a float.`, `Bu 8 // 2 natijasi bo‘lardi, lekin / float beradi.`),
     L(`Это результат 8 / 4, а не 8 / 2.`, `That is the result of 8 / 4, not 8 / 2.`, `Bu 8 / 4 natijasi, 8 / 2 emas.`),
     L(`16 — это результат 8 * 2.`, `16 is the result of 8 * 2.`, `16 — bu 8 * 2 natijasi.`)],
    L(`Обратите внимание на тип результата, а не только на число.`, `Pay attention to the type of the result, not only the number.`, `Faqat songa emas, natija turiga ham e’tibor bering.`),
    { verify: { py: `print(8 / 2)`, out: `4.0`, optionIsOutput: true } }),

  sel('x', L(`Чему равно 2 + 3 ** 2?`, `What is 2 + 3 ** 2?`, `2 + 3 ** 2 nimaga teng?`),
    [N(`11`), N(`25`), N(`13`), N(`8`)], 0,
    L(`Сначала выполняется **: 3 ** 2 = 9, затем 2 + 9 = 11.`, `** is evaluated first: 3 ** 2 = 9, then 2 + 9 = 11.`, `Avval ** bajariladi: 3 ** 2 = 9, keyin 2 + 9 = 11.`),
    [L(`Степень выполняется раньше сложения: сначала 3 ** 2 = 9, затем 2 + 9.`, `Exponentiation comes before addition: first 3 ** 2 = 9, then 2 + 9.`, `Daraja qo‘shishdan oldin bajariladi: avval 3 ** 2 = 9, keyin 2 + 9.`),
     L(`13 получилось бы как 2² + 3², но степень относится только к 3.`, `13 would be 2² + 3², but the exponent applies only to 3.`, `13 — bu 2² + 3² bo‘lardi, lekin daraja faqat 3 ga tegishli.`),
     L(`8 — это 2 ** 3, а здесь основание 3, а показатель 2.`, `8 is 2 ** 3, but here the base is 3 and the exponent is 2.`, `8 — bu 2 ** 3; bu yerda esa asos 3, daraja 2.`)],
    L(`Какой оператор имеет более высокий приоритет: + или **?`, `Which operator has higher precedence: + or **?`, `Qaysi operator ustunroq: + yoki **?`),
    { verify: { py: `print(2 + 3 ** 2)`, out: `11`, optionIsOutput: true } }),
]);

// ───────────── Урок 3. Строки (legacy co3) ─────────────
const l3 = lesson(S, 3, {
  legacy: 'co3',
  title: L(`Строки`, `Strings`, `Satrlar`),
  goal: L(`Работать со строками: склеивать, брать длину, срезы и методы.`,
    `Work with strings: concatenation, length, slices and methods.`,
    `Satrlar bilan ishlash: birlashtirish, uzunlik, kesimlar va metodlar.`),
  theory: L(
    `Строка — последовательность символов. Строки можно склеивать (+), повторять (*), измерять через len() и брать символы по индексу s[0]. Отрицательный индекс считает с конца: s[-1] — последний символ. Срез s[a:b] берёт символы с индексами от a до b-1. Методы upper(), lower(), strip() возвращают новую строку, а исходная не меняется.`,
    `A string is a sequence of characters. Strings can be joined (+), repeated (*), measured with len(), and accessed by index s[0]. A negative index counts from the end: s[-1] is the last character. A slice s[a:b] takes the characters from index a to b-1. The methods upper(), lower() and strip() return a new string; the original does not change.`,
    `Satr — belgilar ketma-ketligi. Satrlarni birlashtirish (+), takrorlash (*), len() bilan o‘lchash va s[0] kabi indeks bo‘yicha belgini olish mumkin. Manfiy indeks oxiridan sanaydi: s[-1] — oxirgi belgi. s[a:b] kesimi a indeksdan b-1 indeksgacha bo‘lgan belgilarni oladi. upper(), lower(), strip() metodlari yangi satr qaytaradi, asl satr o‘zgarmaydi.`),
  code: N(`s = "Lumo"
print(s[0])          # L
print(s[1:3])        # um
print(s.upper())     # LUMO
print(len(s) * "-")  # ----`),
  task: L(`Дана строка " python ". Выведите её без пробелов по краям заглавными буквами.`,
    `Given the string " python ", print it without surrounding spaces in capital letters.`,
    `" python " satri berilgan. Uni chetlaridagi probellarsiz, bosh harflarda chiqaring.`),
  solution: N(`s = " python "\nprint(s.strip().upper())  # PYTHON`),
  summary: L(`Строки можно склеивать, повторять и нарезать. Индексы идут с нуля, методы возвращают новую строку.`,
    `Strings can be joined, repeated and sliced. Indexes start at zero, and methods return a new string.`,
    `Satrlarni birlashtirish, takrorlash va kesish mumkin. Indekslar noldan boshlanadi, metodlar yangi satr qaytaradi.`),
}, [
  sel('x', L(`Что выведет print("Lumo"[1:3])?`, `What does print("Lumo"[1:3]) output?`, `print("Lumo"[1:3]) nima chiqaradi?`),
    [N(`Lu`), N(`um`), N(`umo`), N(`mo`)], 1,
    L(`Срез [1:3] берёт символы с индексами 1 и 2: «u» и «m».`, `The slice [1:3] takes the characters at indexes 1 and 2: “u” and “m”.`, `[1:3] kesimi 1 va 2 indeksdagi belgilarni oladi: “u” va “m”.`),
    [L(`Срез начинается с индекса 1, а не с 0.`, `The slice starts at index 1, not 0.`, `Kesim 0 emas, 1-indeksdan boshlanadi.`),
     L(`Конец среза не включается, символ с индексом 3 не берётся.`, `The end of a slice is excluded, so index 3 is not taken.`, `Kesimning oxiri kirmaydi, 3-indeksdagi belgi olinmaydi.`),
     L(`«mo» — это срез [2:4], а не [1:3].`, `“mo” is the slice [2:4], not [1:3].`, `“mo” — bu [2:4] kesimi, [1:3] emas.`)],
    L(`Выпишите индексы: L — 0, u — 1 ...`, `Write out the indexes: L is 0, u is 1 ...`, `Indekslarni yozib chiqing: L — 0, u — 1 ...`),
    { verify: { py: `print("Lumo"[1:3])`, out: `um`, optionIsOutput: true } }),

  inp('x', L(`Чему равно len("a b")?`, `What is len("a b")?`, `len("a b") nimaga teng?`), [`3`],
    L(`В строке три символа: «a», пробел и «b».`, `The string has three characters: “a”, a space and “b”.`, `Satrda uchta belgi bor: “a”, probel va “b”.`),
    L(`Пробел — тоже символ.`, `A space is a character too.`, `Probel ham belgi hisoblanadi.`),
    { verify: { py: `print(len("a b"))`, out: `3` } }),

  sel('x', L(`Что выведет print("ab" * 3)?`, `What does print("ab" * 3) output?`, `print("ab" * 3) nima chiqaradi?`),
    [N(`ab3`), N(`ababab`), N(`aaabbb`), ERR], 1,
    L(`Умножение строки на число повторяет её целиком: ababab.`, `Multiplying a string by a number repeats the whole string: ababab.`, `Satrni songa ko‘paytirish uni butunlay takrorlaydi: ababab.`),
    [L(`Число не приписывается, а задаёт количество повторов.`, `The number is not appended; it sets the number of repetitions.`, `Son qo‘shilmaydi, u takrorlar sonini bildiradi.`),
     L(`Повторяется вся строка целиком, а не каждый символ.`, `The whole string is repeated, not each character.`, `Butun satr takrorlanadi, har bir belgi emas.`),
     L(`Умножение строки на целое число допустимо.`, `Multiplying a string by an integer is allowed.`, `Satrni butun songa ko‘paytirish mumkin.`)],
    L(`Что повторяется: один символ или вся строка?`, `What is repeated: one character or the whole string?`, `Nima takrorlanadi: bitta belgimi yoki butun satrmi?`),
    { verify: { py: `print("ab" * 3)`, out: `ababab`, optionIsOutput: true } }),

  sel('x', L(`Что выведет код: s = "hi"; s.upper(); print(s)?`, `What does this code print: s = "hi"; s.upper(); print(s)?`, `Bu kod nima chiqaradi: s = "hi"; s.upper(); print(s)?`),
    [N(`hi`), N(`HI`), N(`None`), ERR], 0,
    L(`Строки неизменяемы: upper() вернул новую строку, но она не была сохранена, поэтому s по-прежнему «hi».`,
      `Strings are immutable: upper() returned a new string, but it was not stored, so s is still “hi”.`,
      `Satrlar o‘zgarmas: upper() yangi satr qaytardi, lekin u saqlanmadi, shuning uchun s hamon “hi”.`),
    [L(`upper() возвращает новую строку, а s остаётся прежней.`, `upper() returns a new string, while s stays the same.`, `upper() yangi satr qaytaradi, s esa o‘zgarmaydi.`),
     L(`print(s) выводит значение s, а не результат upper().`, `print(s) outputs the value of s, not the result of upper().`, `print(s) s qiymatini chiqaradi, upper() natijasini emas.`),
     L(`Вызов s.upper() корректен, ошибки нет.`, `s.upper() is a valid call, so there is no error.`, `s.upper() to‘g‘ri chaqiruv, xatolik yo‘q.`)],
    L(`Присвоили ли мы результат upper() переменной?`, `Did we assign the result of upper() to a variable?`, `upper() natijasi o‘zgaruvchiga berildimi?`),
    { verify: { py: `s = "hi"\ns.upper()\nprint(s)`, out: `hi`, optionIsOutput: true } }),

  sel('x', L(`Какой символ выведет print("Python"[-1])?`, `Which character does print("Python"[-1]) output?`, `print("Python"[-1]) qaysi belgini chiqaradi?`),
    [N(`P`), N(`n`), N(`o`), N(`y`)], 1,
    L(`Индекс -1 указывает на последний символ — «n».`, `Index -1 refers to the last character, “n”.`, `-1 indeks oxirgi belgini bildiradi — “n”.`),
    [L(`P — это s[0], первый символ.`, `P is s[0], the first character.`, `P — s[0], birinchi belgi.`),
     L(`Предпоследний символ — это индекс -2.`, `The second-to-last character is index -2.`, `Oxirgidan oldingi belgi -2 indeksga to‘g‘ri keladi.`),
     L(`y — это индекс 1 (или -5), а не -1.`, `y is index 1 (or -5), not -1.`, `y — 1 indeks (yoki -5), -1 emas.`)],
    L(`Отрицательные индексы отсчитываются с конца.`, `Negative indexes count from the end.`, `Manfiy indekslar oxiridan sanaladi.`),
    { verify: { py: `print("Python"[-1])`, out: `n`, optionIsOutput: true } }),
]);

// ───────────── Урок 4. Условия (legacy co4) ─────────────
const l4 = lesson(S, 4, {
  legacy: 'co4',
  title: L(`Условия`, `Conditions`, `Shartlar`),
  goal: L(`Строить ветвления с if, elif и else и использовать сравнения.`,
    `Build branches with if, elif and else and use comparisons.`,
    `if, elif va else bilan tarmoqlanishlar tuzish va solishtirishlardan foydalanish.`),
  theory: L(
    `Условная конструкция выполняет блок кода, только если выражение истинно. Блок задаётся отступом в 4 пробела. Сравнения: ==, !=, <, >, <=, >=. Условия объединяются через and, or, not. Ветка elif проверяется, только если предыдущие условия ложны.`,
    `A conditional statement runs a block of code only if the expression is true. A block is defined by an indentation of 4 spaces. Comparisons: ==, !=, <, >, <=, >=. Conditions are combined with and, or, not. An elif branch is checked only if the previous conditions are false.`,
    `Shartli konstruksiya kod blokini faqat ifoda rost bo‘lganda bajaradi. Blok 4 ta probel bilan belgilanadi. Solishtirishlar: ==, !=, <, >, <=, >=. Shartlar and, or, not yordamida birlashtiriladi. elif tarmog‘i faqat oldingi shartlar yolg‘on bo‘lsagina tekshiriladi.`),
  code: N(`score = 72
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")`),
  task: L(`Если число n делится на 2 без остатка, выведите «чётное», иначе «нечётное».`,
    `If the number n is divisible by 2 without a remainder, print "even", otherwise "odd".`,
    `Agar n soni 2 ga qoldiqsiz bo‘linsa, "juft", aks holda "toq" deb chiqaring.`),
  solution: L(`n = 7\nif n % 2 == 0:\n    print("чётное")\nelse:\n    print("нечётное")`,
    `n = 7\nif n % 2 == 0:\n    print("even")\nelse:\n    print("odd")`,
    `n = 7\nif n % 2 == 0:\n    print("juft")\nelse:\n    print("toq")`),
  summary: L(`if, elif и else выбирают ветку выполнения. Сравнения дают bool, условия объединяются через and, or, not.`,
    `if, elif and else select the execution branch. Comparisons produce bool, and conditions are combined with and, or, not.`,
    `if, elif va else bajarilish tarmog‘ini tanlaydi. Solishtirishlar bool beradi, shartlar and, or, not bilan birlashtiriladi.`),
}, [
  sel('x', L(`Что выведет код из примера урока при score = 90?`, `What does the lesson example code print when score = 90?`, `Dars misolidagi kod score = 90 bo‘lganda nima chiqaradi?`),
    [N(`A`), N(`B`), N(`C`), L(`ничего`, `nothing`, `hech narsa`)], 0,
    L(`90 >= 90 истинно, поэтому выполняется первая ветка и выводится A.`, `90 >= 90 is true, so the first branch runs and A is printed.`, `90 >= 90 rost, shuning uchun birinchi tarmoq bajariladi va A chiqadi.`),
    [L(`Первое условие score >= 90 уже истинно, до elif дело не дойдёт.`, `The first condition score >= 90 is already true, so elif is never reached.`, `Birinchi shart score >= 90 allaqachon rost, elif ga o‘tilmaydi.`),
     L(`else выполняется, только если все условия выше ложны.`, `else runs only if all conditions above are false.`, `else faqat yuqoridagi barcha shartlar yolg‘on bo‘lsa bajariladi.`),
     L(`Одна из веток всегда выполнится: в конструкции есть else.`, `One of the branches always runs because the construction has an else.`, `Konstruksiyada else bor, shuning uchun biror tarmoq doim bajariladi.`)],
    L(`Проверяйте условия сверху вниз и остановитесь на первом истинном.`, `Check conditions top to bottom and stop at the first true one.`, `Shartlarni yuqoridan pastga tekshiring va birinchi rost shartda to‘xtang.`),
    { code: N(`score = 90\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")`),
      verify: { py: `score = 90\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")`, out: `A`, optionIsOutput: true } }),

  sel('x', L(`Что выведет print(3 == 3.0)?`, `What does print(3 == 3.0) output?`, `print(3 == 3.0) nima chiqaradi?`),
    [N(`True`), N(`False`), N(`3`), ERR], 0,
    L(`Оператор == сравнивает значения: 3 и 3.0 равны, результат True.`, `The == operator compares values: 3 and 3.0 are equal, so the result is True.`, `== operatori qiymatlarni solishtiradi: 3 va 3.0 teng, natija True.`),
    [L(`== сравнивает значения, а 3 равно 3.0.`, `== compares values, and 3 equals 3.0.`, `== qiymatlarni solishtiradi, 3 esa 3.0 ga teng.`),
     L(`Сравнение возвращает bool, а не число.`, `A comparison returns a bool, not a number.`, `Solishtirish son emas, bool qaytaradi.`),
     L(`Сравнивать int и float можно.`, `An int and a float can be compared.`, `int va float ni solishtirish mumkin.`)],
    L(`Сравниваются значения, а не типы.`, `Values are compared, not types.`, `Qiymatlar solishtiriladi, turlar emas.`),
    { verify: { py: `print(3 == 3.0)`, out: `True`, optionIsOutput: true } }),

  sel('x', L(`Какое условие записано с синтаксической ошибкой?`, `Which condition is written with a syntax error?`, `Qaysi shart sintaktik xato bilan yozilgan?`),
    [N(`if x > 5:`), N(`if x = 5:`), N(`if x != 5:`), N(`if x == 5:`)], 1,
    L(`В условии нужно сравнение ==. Одиночный = — присваивание, оно не может стоять в условии if.`,
      `A condition needs the comparison ==. A single = is assignment and cannot be used in an if condition.`,
      `Shartda == solishtirish kerak. Yagona = qiymat berish bo‘lib, if shartida turishi mumkin emas.`),
    [L(`Это корректное сравнение: > — допустимый оператор.`, `This is a valid comparison: > is a valid operator.`, `Bu to‘g‘ri solishtirish: > yaroqli operator.`),
     L(`!= — оператор «не равно», запись верна.`, `!= is the “not equal” operator; the syntax is correct.`, `!= — “teng emas” operatori, yozuv to‘g‘ri.`),
     L(`== — корректная проверка на равенство.`, `== is the correct equality check.`, `== — tenglikni tekshirishning to‘g‘ri usuli.`)],
    L(`Какой оператор проверяет равенство?`, `Which operator checks equality?`, `Tenglikni qaysi operator tekshiradi?`)),

  inp('x', L(`Что выведет print(5 > 3 and 2 > 4)? Ответьте True или False.`, `What does print(5 > 3 and 2 > 4) output? Answer True or False.`, `print(5 > 3 and 2 > 4) nima chiqaradi? True yoki False deb javob bering.`), [`False`],
    L(`and истинно, только если истинны оба условия; 2 > 4 ложно, значит результат False.`, `and is true only if both conditions are true; 2 > 4 is false, so the result is False.`, `and faqat ikkala shart rost bo‘lsagina rost; 2 > 4 yolg‘on, demak natija False.`),
    L(`and требует, чтобы обе части были истинны.`, `and requires both parts to be true.`, `and ikkala qism ham rost bo‘lishini talab qiladi.`),
    { verify: { py: `print(5 > 3 and 2 > 4)`, out: `False` } }),

  sel('x', L(`Чему равно значение выражения not (2 > 1 and 3 > 4)?`, `What is the value of the expression not (2 > 1 and 3 > 4)?`, `not (2 > 1 and 3 > 4) ifodasining qiymati nimaga teng?`),
    [N(`True`), N(`False`), N(`None`), ERR], 0,
    L(`2 > 1 истинно, 3 > 4 ложно, and даёт False, а not False — это True.`, `2 > 1 is true, 3 > 4 is false, and gives False, and not False is True.`, `2 > 1 rost, 3 > 4 yolg‘on, and False beradi, not False esa True.`),
    [L(`Сначала (2 > 1 and 3 > 4) даёт False, а not меняет его на True.`, `First (2 > 1 and 3 > 4) gives False, and not turns it into True.`, `Avval (2 > 1 and 3 > 4) False beradi, not esa uni True ga aylantiradi.`),
     L(`Логические операции здесь возвращают True или False, а не None.`, `Logical operations here return True or False, not None.`, `Mantiqiy amallar bu yerda True yoki False qaytaradi, None emas.`),
     L(`Выражение корректно: скобки расставлены верно.`, `The expression is valid: the parentheses are correct.`, `Ifoda to‘g‘ri: qavslar to‘g‘ri qo‘yilgan.`)],
    L(`Сначала вычислите выражение в скобках.`, `Evaluate the expression in parentheses first.`, `Avval qavs ichidagi ifodani hisoblang.`),
    { verify: { py: `print(not (2 > 1 and 3 > 4))`, out: `True`, optionIsOutput: true } }),
]);

module.exports = [l1, l2, l3, l4];
