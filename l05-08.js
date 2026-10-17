const { L, N, sel, inp, mat, lesson } = require('../../lib/h');
const S = 'python-beginners';
const ERR = L(`ошибку`, `an error`, `xatolik`);

// ───────────── Урок 5. Циклы (legacy co5) ─────────────
const l5 = lesson(S, 5, {
  legacy: 'co5',
  title: L(`Циклы`, `Loops`, `Sikllar`),
  goal: L(`Применять for и while и понимать range().`, `Use for and while and understand range().`, `for va while dan foydalanish va range() ni tushunish.`),
  theory: L(
    `Цикл for перебирает элементы последовательности, а range(n) выдаёт числа от 0 до n-1. Цикл while повторяется, пока условие истинно, поэтому внутри нужно менять переменную, иначе цикл бесконечен. break прерывает цикл, continue переходит к следующей итерации.`,
    `A for loop iterates over the elements of a sequence, and range(n) produces numbers from 0 to n-1. A while loop repeats as long as its condition is true, so a variable inside must change, otherwise the loop is infinite. break stops the loop, and continue jumps to the next iteration.`,
    `for sikli ketma-ketlik elementlarini birma-bir ko‘rib chiqadi, range(n) esa 0 dan n-1 gacha sonlarni beradi. while sikli sharti rost ekan, takrorlanadi, shuning uchun ichida o‘zgaruvchini o‘zgartirish kerak, aks holda sikl cheksiz bo‘ladi. break siklni to‘xtatadi, continue esa keyingi iteratsiyaga o‘tkazadi.`),
  code: N(`total = 0
for i in range(1, 5):
    total += i
print(total)  # 10`),
  task: L(`Выведите сумму чисел от 1 до 100 с помощью цикла.`, `Print the sum of the numbers from 1 to 100 using a loop.`, `Sikl yordamida 1 dan 100 gacha sonlar yig‘indisini chiqaring.`),
  solution: N(`total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)  # 5050`),
  summary: L(`for перебирает последовательность, while работает по условию. range(a, b, шаг) не включает b, break выходит из цикла.`,
    `for iterates over a sequence, while works by condition. range(a, b, step) does not include b, and break exits the loop.`,
    `for ketma-ketlikni ko‘rib chiqadi, while shart bo‘yicha ishlaydi. range(a, b, qadam) b ni o‘z ichiga olmaydi, break esa siklni tugatadi.`),
}, [
  sel('x', L(`Какие числа даст range(1, 4)?`, `Which numbers does range(1, 4) produce?`, `range(1, 4) qaysi sonlarni beradi?`),
    [N(`1, 2, 3, 4`), N(`1, 2, 3`), N(`0, 1, 2, 3`), N(`2, 3`)], 1,
    L(`range(1, 4) начинается с 1 и заканчивается перед 4: 1, 2, 3.`, `range(1, 4) starts at 1 and stops before 4: 1, 2, 3.`, `range(1, 4) 1 dan boshlanadi va 4 dan oldin tugaydi: 1, 2, 3.`),
    [L(`Конец диапазона не включается: 4 не попадает.`, `The end of the range is excluded, so 4 is not included.`, `Diapazon oxiri kirmaydi, shuning uchun 4 kiritilmaydi.`),
     L(`Это range(4); здесь начало указано явно — 1.`, `That is range(4); here the start is explicitly 1.`, `Bu range(4); bu yerda boshlanish aniq 1 deb ko‘rsatilgan.`),
     L(`Первое число включается: диапазон начинается с 1.`, `The first number is included: the range starts at 1.`, `Birinchi son kiradi: diapazon 1 dan boshlanadi.`)],
    L(`Начало включается, конец — нет.`, `The start is included, the end is not.`, `Boshi kiradi, oxiri kirmaydi.`),
    { verify: { py: `print(list(range(1, 4)))`, out: `[1, 2, 3]` } }),

  inp('x', L(`Что выведет код: total = 0; for i in range(3): total += i * 2; print(total)?`,
      `What does this code print: total = 0; for i in range(3): total += i * 2; print(total)?`,
      `Bu kod nima chiqaradi: total = 0; for i in range(3): total += i * 2; print(total)?`),
    [`6`],
    L(`i принимает значения 0, 1, 2, а к total добавляется 0, 2 и 4: итого 6.`, `i takes the values 0, 1, 2, and total gets 0, 2 and 4 added, giving 6.`, `i 0, 1, 2 qiymatlarini oladi, total ga 0, 2 va 4 qo‘shiladi: jami 6.`),
    L(`Выпишите значения i и добавляйте i * 2 по очереди.`, `Write out the values of i and add i * 2 one by one.`, `i qiymatlarini yozib chiqing va i * 2 ni ketma-ket qo‘shing.`),
    { code: N(`total = 0\nfor i in range(3):\n    total += i * 2\nprint(total)`),
      verify: { py: `total = 0\nfor i in range(3):\n    total += i * 2\nprint(total)`, out: `6` } }),

  sel('x', L(`Какие числа выведет цикл?`, `Which numbers does the loop print?`, `Sikl qaysi sonlarni chiqaradi?`),
    [N(`3, 2, 1`), N(`3, 2, 1, 0`), N(`1, 2, 3`), L(`бесконечный цикл`, `an infinite loop`, `cheksiz sikl`)], 0,
    L(`Выводятся 3, 2, 1. Когда n становится 0, условие n > 0 ложно и цикл завершается.`, `It prints 3, 2, 1. When n becomes 0, the condition n > 0 is false and the loop ends.`, `3, 2, 1 chiqadi. n 0 bo‘lganda n > 0 sharti yolg‘on bo‘ladi va sikl tugaydi.`),
    [L(`Когда n становится 0, условие n > 0 ложно и 0 не выводится.`, `When n becomes 0 the condition n > 0 is false, so 0 is not printed.`, `n 0 bo‘lganda n > 0 sharti yolg‘on, shuning uchun 0 chiqmaydi.`),
     L(`n уменьшается, поэтому числа идут от большего к меньшему.`, `n decreases, so the numbers go from larger to smaller.`, `n kamayadi, shuning uchun sonlar kattadan kichikka boradi.`),
     L(`n уменьшается на каждой итерации, и условие в итоге станет ложным.`, `n decreases every iteration, so the condition eventually becomes false.`, `n har iteratsiyada kamayadi, shart oxir-oqibat yolg‘on bo‘ladi.`)],
    L(`Что происходит с n на каждой итерации и когда условие станет ложным?`, `What happens to n each iteration, and when does the condition become false?`, `Har iteratsiyada n ga nima bo‘ladi va shart qachon yolg‘on bo‘ladi?`),
    { code: N(`n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1`),
      verify: { py: `n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1`, out: `3\n2\n1` } }),

  sel('x', L(`Какие числа выведет этот код?`, `Which numbers does this code print?`, `Bu kod qaysi sonlarni chiqaradi?`),
    [N(`0, 1, 2`), N(`0, 1, 2, 3`), N(`0, 1, 2, 3, 4`), N(`3`)], 0,
    L(`Цикл печатает 0, 1, 2. На i == 3 выполняется break и цикл завершается до print.`, `The loop prints 0, 1, 2. At i == 3, break runs and the loop ends before print.`, `Sikl 0, 1, 2 ni chiqaradi. i == 3 da break bajariladi va sikl print dan oldin tugaydi.`),
    [L(`При i == 3 break срабатывает до print, поэтому 3 не выводится.`, `At i == 3, break runs before print, so 3 is not printed.`, `i == 3 bo‘lganda break print dan oldin ishlaydi, shuning uchun 3 chiqmaydi.`),
     L(`break прерывает цикл, значения 3 и 4 не обрабатываются.`, `break stops the loop, so 3 and 4 are never processed.`, `break siklni to‘xtatadi, 3 va 4 qayta ishlanmaydi.`),
     L(`3 — это значение, на котором цикл остановился, но оно не выводится.`, `3 is the value at which the loop stopped, but it is not printed.`, `3 — sikl to‘xtagan qiymat, lekin u chiqarilmaydi.`)],
    L(`Где находится print относительно break по порядку выполнения?`, `Where is print relative to break in the order of execution?`, `Bajarilish tartibida print break ga nisbatan qayerda turadi?`),
    { code: N(`for i in range(5):\n    if i == 3:\n        break\n    print(i)`),
      verify: { py: `for i in range(5):\n    if i == 3:\n        break\n    print(i)`, out: `0\n1\n2` } }),

  sel('x', L(`Сколько раз выполнится тело цикла for i in range(0, 10, 2)?`, `How many times will the body of for i in range(0, 10, 2) run?`, `for i in range(0, 10, 2) sikli tanasi necha marta bajariladi?`),
    [N(`5`), N(`10`), N(`4`), N(`6`)], 0,
    L(`range(0, 10, 2) даёт 0, 2, 4, 6, 8 — пять итераций.`, `range(0, 10, 2) gives 0, 2, 4, 6, 8 — five iterations.`, `range(0, 10, 2) 0, 2, 4, 6, 8 ni beradi — beshta iteratsiya.`),
    [L(`10 — это количество чисел в range(10), а здесь шаг 2.`, `10 is the count for range(10); here the step is 2.`, `10 — range(10) dagi sonlar soni; bu yerda qadam 2.`),
     L(`Значения 0, 2, 4, 6, 8 — их пять, а не четыре.`, `The values 0, 2, 4, 6, 8 are five, not four.`, `0, 2, 4, 6, 8 qiymatlari beshta, to‘rtta emas.`),
     L(`Число 10 в диапазон не входит, значит значений пять.`, `10 is not in the range, so there are five values.`, `10 diapazonga kirmaydi, demak qiymatlar beshta.`)],
    L(`Выпишите значения: начало 0, шаг 2, конец не включается.`, `Write out the values: start 0, step 2, the end is excluded.`, `Qiymatlarni yozing: boshi 0, qadam 2, oxiri kirmaydi.`),
    { verify: { py: `print(len(range(0, 10, 2)))`, out: `5`, optionIsOutput: true } }),
]);

// ───────────── Урок 6. Списки (legacy co6) ─────────────
const l6 = lesson(S, 6, {
  legacy: 'co6',
  title: L(`Списки`, `Lists`, `Ro‘yxatlar`),
  goal: L(`Создавать списки и менять их с помощью индексов и методов.`, `Create lists and modify them with indexes and methods.`, `Ro‘yxatlar yaratish va ularni indekslar hamda metodlar yordamida o‘zgartirish.`),
  theory: L(
    `Список — упорядоченная изменяемая коллекция: [1, "a", True]. Элементы берутся по индексу, а отрицательный индекс считает с конца. Метод append добавляет элемент в конец, remove удаляет значение, sort сортирует на месте. Функции len, sum и max работают со списками чисел. Присваивание b = a не копирует список: обе переменные указывают на один и тот же список.`,
    `A list is an ordered, mutable collection: [1, "a", True]. Elements are accessed by index, and a negative index counts from the end. The append method adds an element to the end, remove deletes a value, and sort sorts in place. The functions len, sum and max work with lists of numbers. The assignment b = a does not copy the list: both variables refer to the same list.`,
    `Ro‘yxat — tartiblangan va o‘zgartiriladigan to‘plam: [1, "a", True]. Elementlar indeks bo‘yicha olinadi, manfiy indeks esa oxiridan sanaydi. append metodi elementni oxiriga qo‘shadi, remove qiymatni o‘chiradi, sort ro‘yxatni joyida saralaydi. len, sum va max funksiyalari sonlar ro‘yxati bilan ishlaydi. b = a tayinlash ro‘yxatdan nusxa olmaydi: ikkala o‘zgaruvchi bir xil ro‘yxatga ishora qiladi.`),
  code: N(`nums = [3, 1, 2]
nums.append(5)
nums.sort()
print(nums)      # [1, 2, 3, 5]
print(nums[-1])  # 5`),
  task: L(`Дан список оценок [4, 5, 3, 5]. Выведите среднее значение через sum и len.`, `Given the list of grades [4, 5, 3, 5], print the average using sum and len.`, `[4, 5, 3, 5] baholar ro‘yxati berilgan. sum va len yordamida o‘rtacha qiymatni chiqaring.`),
  solution: N(`grades = [4, 5, 3, 5]\nprint(sum(grades) / len(grades))  # 4.25`),
  summary: L(`Список хранит элементы по порядку. Индексы идут с нуля, -1 — последний; append, remove и sort изменяют список.`,
    `A list stores elements in order. Indexes start at zero and -1 is the last; append, remove and sort modify the list.`,
    `Ro‘yxat elementlarni tartib bilan saqlaydi. Indekslar noldan boshlanadi, -1 — oxirgisi; append, remove va sort ro‘yxatni o‘zgartiradi.`),
}, [
  sel('x', L(`Что выведет print([10, 20, 30][-1])?`, `What does print([10, 20, 30][-1]) output?`, `print([10, 20, 30][-1]) nima chiqaradi?`),
    [N(`10`), N(`20`), N(`30`), ERR], 2,
    L(`Индекс -1 — последний элемент списка, то есть 30.`, `Index -1 is the last element of the list, which is 30.`, `-1 indeks ro‘yxatning oxirgi elementi, ya’ni 30.`),
    [L(`10 — это элемент с индексом 0.`, `10 is the element at index 0.`, `10 — 0-indeksdagi element.`),
     L(`20 — это индекс 1 или -2.`, `20 is index 1 or -2.`, `20 — 1 yoki -2 indeks.`),
     L(`Отрицательные индексы допустимы.`, `Negative indexes are allowed.`, `Manfiy indekslar ruxsat etilgan.`)],
    L(`Отрицательный индекс отсчитывается с конца.`, `A negative index is counted from the end.`, `Manfiy indeks oxiridan sanaladi.`),
    { verify: { py: `print([10, 20, 30][-1])`, out: `30`, optionIsOutput: true } }),

  sel('x', L(`Что выведет код?`, `What does this code print?`, `Bu kod nima chiqaradi?`),
    [N(`[1, 2, 3]`), N(`[1, 2]`), N(`[3]`), ERR], 0,
    L(`b = a не копирует список, обе переменные ссылаются на один объект, поэтому добавление через b видно и в a.`,
      `b = a does not copy the list; both variables refer to one object, so an append through b is visible in a too.`,
      `b = a ro‘yxatdan nusxa olmaydi, ikkala o‘zgaruvchi bitta obyektga ishora qiladi, shuning uchun b orqali qo‘shilgan element a da ham ko‘rinadi.`),
    [L(`Список не копировался: b — это тот же список, что и a.`, `The list was not copied: b is the same list as a.`, `Ro‘yxatdan nusxa olinmadi: b — a bilan bir xil ro‘yxat.`),
     L(`append добавляет элемент к списку, а не заменяет его.`, `append adds an element to the list; it does not replace it.`, `append ro‘yxatga element qo‘shadi, uni almashtirmaydi.`),
     L(`Код корректен и выполняется без ошибок.`, `The code is valid and runs without errors.`, `Kod to‘g‘ri va xatosiz bajariladi.`)],
    L(`Копируется ли список при b = a?`, `Is the list copied by b = a?`, `b = a da ro‘yxatdan nusxa olinadimi?`),
    { code: N(`a = [1, 2]\nb = a\nb.append(3)\nprint(a)`),
      verify: { py: `a = [1, 2]\nb = a\nb.append(3)\nprint(a)`, out: `[1, 2, 3]`, optionIsOutput: true } }),

  inp('x', L(`Чему равно len([1, 2, [3, 4]])?`, `What is len([1, 2, [3, 4]])?`, `len([1, 2, [3, 4]]) nimaga teng?`), [`3`],
    L(`Вложенный список считается одним элементом, всего их три.`, `A nested list counts as one element, so there are three.`, `Ichma-ich ro‘yxat bitta element hisoblanadi, jami uchta.`),
    L(`Сколько элементов на верхнем уровне?`, `How many elements are there at the top level?`, `Yuqori darajada nechta element bor?`),
    { verify: { py: `print(len([1, 2, [3, 4]]))`, out: `3` } }),

  sel('x', L(`Что выведет print(nums.sort()) для nums = [3, 1, 2]?`, `What does print(nums.sort()) output for nums = [3, 1, 2]?`, `nums = [3, 1, 2] uchun print(nums.sort()) nima chiqaradi?`),
    [N(`[1, 2, 3]`), N(`None`), N(`[3, 1, 2]`), ERR], 1,
    L(`Метод sort() меняет список на месте и возвращает None, поэтому print выводит None.`, `The sort() method changes the list in place and returns None, so print outputs None.`, `sort() metodi ro‘yxatni joyida o‘zgartiradi va None qaytaradi, shuning uchun print None chiqaradi.`),
    [L(`sort() сортирует список на месте и ничего не возвращает.`, `sort() sorts the list in place and returns nothing.`, `sort() ro‘yxatni joyida saralaydi va hech narsa qaytarmaydi.`),
     L(`print выводит результат вызова sort(), а не сам список.`, `print outputs the return value of sort(), not the list itself.`, `print sort() qaytargan qiymatni chiqaradi, ro‘yxatning o‘zini emas.`),
     L(`Вызов корректен, ошибки нет.`, `The call is valid, so there is no error.`, `Chaqiruv to‘g‘ri, xatolik yo‘q.`)],
    L(`Что возвращает метод, изменяющий список на месте?`, `What does a method that changes a list in place return?`, `Ro‘yxatni joyida o‘zgartiradigan metod nimani qaytaradi?`),
    { verify: { py: `nums = [3, 1, 2]\nprint(nums.sort())`, out: `None`, optionIsOutput: true } }),

  sel('x', L(`Чему равно sum([4, 5, 3, 5]) / len([4, 5, 3, 5])?`, `What is sum([4, 5, 3, 5]) / len([4, 5, 3, 5])?`, `sum([4, 5, 3, 5]) / len([4, 5, 3, 5]) nimaga teng?`),
    [N(`4.25`), N(`4`), N(`17`), N(`4.5`)], 0,
    L(`Сумма 4 + 5 + 3 + 5 = 17, элементов 4, среднее 17 / 4 = 4.25.`, `The sum 4 + 5 + 3 + 5 = 17, there are 4 elements, so the average is 17 / 4 = 4.25.`, `Yig‘indi 4 + 5 + 3 + 5 = 17, elementlar 4 ta, o‘rtacha 17 / 4 = 4.25.`),
    [L(`Результат деления / — float, он не округляется до 4.`, `The result of / is a float; it is not rounded to 4.`, `/ natijasi float, u 4 gacha yaxlitlanmaydi.`),
     L(`17 — это только сумма, её ещё нужно разделить на количество.`, `17 is only the sum; it still has to be divided by the count.`, `17 — faqat yig‘indi, uni hali elementlar soniga bo‘lish kerak.`),
     L(`Сумма 17, элементов 4: 17 / 4 = 4.25, а не 4.5.`, `The sum is 17 and there are 4 elements: 17 / 4 = 4.25, not 4.5.`, `Yig‘indi 17, elementlar 4 ta: 17 / 4 = 4.25, 4.5 emas.`)],
    L(`Сложите все числа и разделите на их количество.`, `Add all the numbers and divide by how many there are.`, `Barcha sonlarni qo‘shing va ularning soniga bo‘ling.`),
    { verify: { py: `print(sum([4, 5, 3, 5]) / len([4, 5, 3, 5]))`, out: `4.25`, optionIsOutput: true } }),
]);

// ───────────── Урок 7. Функции (legacy co7) ─────────────
const l7 = lesson(S, 7, {
  legacy: 'co7',
  title: L(`Функции`, `Functions`, `Funksiyalar`),
  goal: L(`Объявлять функции с параметрами и возвращать результат через return.`, `Define functions with parameters and return results with return.`, `Parametrli funksiyalarni e’lon qilish va natijani return orqali qaytarish.`),
  theory: L(
    `Функция — именованный блок кода, который можно вызывать многократно. Она объявляется через def, параметры перечисляются в скобках. return отдаёт результат вызывающему коду, а без return функция возвращает None. Переменные внутри функции локальные.`,
    `A function is a named block of code that can be called many times. It is defined with def, and parameters are listed in parentheses. return hands the result back to the calling code, and without return a function returns None. Variables inside a function are local.`,
    `Funksiya — ko‘p marta chaqirish mumkin bo‘lgan nomlangan kod bloki. U def yordamida e’lon qilinadi, parametrlar qavs ichida sanaladi. return natijani chaqiruvchi kodga qaytaradi, return bo‘lmasa funksiya None qaytaradi. Funksiya ichidagi o‘zgaruvchilar lokal bo‘ladi.`),
  code: N(`def square(x):
    return x * x

print(square(4))  # 16`),
  task: L(`Напишите функцию is_even(n), которая возвращает True для чётных чисел.`, `Write a function is_even(n) that returns True for even numbers.`, `Juft sonlar uchun True qaytaradigan is_even(n) funksiyasini yozing.`),
  solution: N(`def is_even(n):\n    return n % 2 == 0\n\nprint(is_even(10))  # True`),
  summary: L(`def объявляет функцию, return возвращает результат. Параметры — имена в определении, аргументы — значения при вызове.`,
    `def defines a function, return gives back a result. Parameters are names in the definition, arguments are values at the call.`,
    `def funksiyani e’lon qiladi, return natijani qaytaradi. Parametrlar — ta’rifdagi nomlar, argumentlar — chaqiruvdagi qiymatlar.`),
}, [
  sel('x', L(`Какая строка правильно объявляет функцию greet с параметром name?`, `Which line correctly defines a function greet with a parameter name?`, `Qaysi qator name parametrli greet funksiyasini to‘g‘ri e’lon qiladi?`),
    [N(`def greet(name):`), N(`function greet(name):`), N(`def greet name:`), N(`func greet(name)`)], 0,
    L(`Правильный синтаксис: def, имя, параметры в скобках и двоеточие.`, `The correct syntax is def, a name, parameters in parentheses and a colon.`, `To‘g‘ri sintaksis: def, nom, qavs ichida parametrlar va ikki nuqta.`),
    [L(`В Python для объявления функции используется def, а не function.`, `Python uses def to define a function, not function.`, `Python’da funksiya def bilan e’lon qilinadi, function bilan emas.`),
     L(`Параметры нужно писать в круглых скобках.`, `Parameters must be written in parentheses.`, `Parametrlar qavs ichida yozilishi kerak.`),
     L(`Нет ключевого слова def и двоеточия в конце.`, `There is no def keyword and no colon at the end.`, `def kalit so‘zi ham, oxiridagi ikki nuqta ham yo‘q.`)],
    L(`Вспомните ключевое слово, скобки и двоеточие.`, `Recall the keyword, the parentheses and the colon.`, `Kalit so‘z, qavslar va ikki nuqtani eslang.`)),

  inp('x', L(`Чему равно square(3) + square(2) для функции square из примера урока?`, `What is square(3) + square(2) for the square function from the lesson example?`, `Dars misolidagi square funksiyasi uchun square(3) + square(2) nimaga teng?`), [`13`],
    L(`square(3) = 9, square(2) = 4, сумма равна 13.`, `square(3) = 9, square(2) = 4, and the sum is 13.`, `square(3) = 9, square(2) = 4, yig‘indi 13 ga teng.`),
    L(`Вызовите функцию дважды и сложите результаты.`, `Call the function twice and add the results.`, `Funksiyani ikki marta chaqiring va natijalarni qo‘shing.`),
    { verify: { py: `def square(x):\n    return x * x\n\nprint(square(3) + square(2))`, out: `13` } }),

  sel('x', L(`Что выведет этот код?`, `What does this code print?`, `Bu kod nima chiqaradi?`),
    [N(`4`), N(`None`), N(`2`), ERR], 1,
    L(`В функции нет return, поэтому она возвращает None, и print выводит None.`, `The function has no return, so it returns None, and print outputs None.`, `Funksiyada return yo‘q, shuning uchun u None qaytaradi va print None chiqaradi.`),
    [L(`Значение y вычислено, но функция его не возвращает.`, `y is computed, but the function does not return it.`, `y hisoblanadi, lekin funksiya uni qaytarmaydi.`),
     L(`2 — это аргумент, а не результат функции.`, `2 is the argument, not the function's result.`, `2 — argument, funksiya natijasi emas.`),
     L(`Функция без return допустима и возвращает None.`, `A function without return is allowed and returns None.`, `return siz funksiya ruxsat etilgan va None qaytaradi.`)],
    L(`Есть ли в функции return?`, `Does the function contain a return?`, `Funksiyada return bormi?`),
    { code: N(`def f(x):\n    y = x * 2\n\nprint(f(2))`),
      verify: { py: `def f(x):\n    y = x * 2\n\nprint(f(2))`, out: `None`, optionIsOutput: true } }),

  sel('x', L(`Что произойдёт при запуске этого кода?`, `What happens when this code runs?`, `Bu kod ishga tushirilganda nima bo‘ladi?`),
    [N(`10`), N(`None`), N(`NameError`), N(`0`)], 2,
    L(`x создана внутри f и существует только там. Снаружи имя x не определено, возникает NameError.`, `x is created inside f and exists only there. Outside, the name x is not defined, so a NameError occurs.`, `x f ichida yaratilgan va faqat o‘sha yerda mavjud. Tashqarida x nomi aniqlanmagan, NameError yuzaga keladi.`),
    [L(`x локальна и после выхода из функции недоступна.`, `x is local and not accessible after the function ends.`, `x lokal bo‘lib, funksiya tugagach mavjud emas.`),
     L(`None возвращает функция, но здесь выводится x, а не вызов функции.`, `The function returns None, but here we print x, not the function call.`, `None funksiyadan qaytadi, lekin bu yerda x chiqariladi, chaqiruv emas.`),
     L(`Значение 0 нигде не задавалось.`, `The value 0 was never assigned anywhere.`, `0 qiymati hech qayerda berilmagan.`)],
    L(`Где создана x и где к ней обращаются?`, `Where is x created and where is it accessed?`, `x qayerda yaratilgan va unga qayerda murojaat qilinmoqda?`),
    { code: N(`def f():\n    x = 10\n\nf()\nprint(x)`),
      verify: { py: `def f():\n    x = 10\n\nf()\nprint(x)`, err: `NameError` } }),

  sel('x', L(`Чем параметр отличается от аргумента?`, `How does a parameter differ from an argument?`, `Parametr argumentdan nimasi bilan farq qiladi?`),
    [L(`Ничем, это синонимы`, `No difference; they are synonyms`, `Farqi yo‘q, ular sinonim`),
     L(`Параметр — имя в определении функции, аргумент — значение при вызове`, `A parameter is a name in the function definition; an argument is the value passed in a call`, `Parametr — funksiya ta’rifidagi nom, argument — chaqiruvda uzatiladigan qiymat`),
     L(`Аргумент — имя в определении, параметр — значение при вызове`, `An argument is a name in the definition; a parameter is the value passed in a call`, `Argument — ta’rifdagi nom, parametr — chaqiruvda uzatiladigan qiymat`),
     L(`Параметры бывают только у встроенных функций`, `Only built-in functions have parameters`, `Parametrlar faqat o‘rnatilgan funksiyalarda bo‘ladi`)], 1,
    L(`В def square(x) x — параметр, а в square(4) число 4 — аргумент.`, `In def square(x), x is a parameter, and in square(4) the number 4 is an argument.`, `def square(x) da x — parametr, square(4) da esa 4 soni — argument.`),
    [L(`Термины связаны, но означают разное: определение и вызов.`, `The terms are related but mean different things: definition versus call.`, `Atamalar bog‘liq, lekin turli ma’noga ega: ta’rif va chaqiruv.`),
     L(`Здесь термины перепутаны местами.`, `Here the terms are swapped.`, `Bu yerda atamalar almashtirib qo‘yilgan.`),
     L(`Параметры есть у любых функций, в том числе у ваших.`, `Any function has parameters, including your own.`, `Parametrlar har qanday funksiyada bor, jumladan sizning funksiyangizda ham.`)],
    L(`Где в коде появляется имя, а где конкретное значение?`, `Where in the code does a name appear, and where a concrete value?`, `Kodda nom qayerda, aniq qiymat esa qayerda paydo bo‘ladi?`)),
]);

// ───────────── Урок 8. Словари и ошибки (legacy co8) ─────────────
const l8 = lesson(S, 8, {
  legacy: 'co8',
  title: L(`Словари и ошибки`, `Dictionaries and Errors`, `Lug‘atlar va xatoliklar`),
  goal: L(`Хранить данные в словарях и обрабатывать ошибки через try/except.`, `Store data in dictionaries and handle errors with try/except.`, `Ma’lumotlarni lug‘atlarda saqlash va xatoliklarni try/except orqali qayta ishlash.`),
  theory: L(
    `Словарь хранит пары ключ: значение и быстро ищет по ключу: user = {"name": "Аня", "age": 17}. Значение берётся через user["name"], а метод get возвращает None вместо ошибки, если ключа нет. Новая пара добавляется присваиванием: d["b"] = 2. Исключения вроде ZeroDivisionError можно перехватить блоком try/except, чтобы программа не падала.`,
    `A dictionary stores key: value pairs and looks up by key quickly: user = {"name": "Anna", "age": 17}. A value is read with user["name"], and the get method returns None instead of an error if the key is missing. A new pair is added by assignment: d["b"] = 2. Exceptions such as ZeroDivisionError can be caught with a try/except block so the program does not crash.`,
    `Lug‘at kalit: qiymat juftliklarini saqlaydi va kalit bo‘yicha tez qidiradi: user = {"name": "Anora", "age": 17}. Qiymat user["name"] orqali olinadi, get metodi esa kalit bo‘lmasa xatolik o‘rniga None qaytaradi. Yangi juftlik qiymat berish orqali qo‘shiladi: d["b"] = 2. ZeroDivisionError kabi istisnolarni try/except bloki bilan ushlash mumkin, shunda dastur to‘xtab qolmaydi.`),
  code: L(
`user = {"name": "Аня", "age": 17}
print(user["name"])      # Аня
print(user.get("city"))  # None
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Делить на ноль нельзя")`,
`user = {"name": "Anna", "age": 17}
print(user["name"])      # Anna
print(user.get("city"))  # None
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Division by zero is not allowed")`,
`user = {"name": "Anora", "age": 17}
print(user["name"])      # Anora
print(user.get("city"))  # None
try:
    print(10 / 0)
except ZeroDivisionError:
    print("Nolga bo‘lish mumkin emas")`),
  task: L(`Создайте словарь prices с двумя товарами. Выведите цену одного и выведите 0 для отсутствующего товара через get.`,
    `Create a dictionary prices with two products. Print the price of one and print 0 for a missing product using get.`,
    `Ikki mahsulotli prices lug‘atini yarating. Birining narxini chiqaring va mavjud bo‘lmagan mahsulot uchun get yordamida 0 chiqaring.`),
  solution: L(`prices = {"хлеб": 30, "молоко": 80}\nprint(prices["хлеб"])\nprint(prices.get("сыр", 0))  # 0`,
    `prices = {"bread": 30, "milk": 80}\nprint(prices["bread"])\nprint(prices.get("cheese", 0))  # 0`,
    `prices = {"non": 30, "sut": 80}\nprint(prices["non"])\nprint(prices.get("pishloq", 0))  # 0`),
  summary: L(`Словарь — пары ключ: значение, get безопасно ищет ключ. try/except перехватывает ошибку и не даёт программе упасть.`,
    `A dictionary holds key: value pairs, and get looks up a key safely. try/except catches an error and keeps the program from crashing.`,
    `Lug‘at — kalit: qiymat juftliklari, get kalitni xavfsiz qidiradi. try/except xatolikni ushlaydi va dasturning to‘xtashiga yo‘l qo‘ymaydi.`),
}, [
  sel('x', L(`Как получить значение по ключу "name" из словаря user?`, `How do you get the value for the key "name" from the dictionary user?`, `user lug‘atidan "name" kaliti bo‘yicha qiymatni qanday olish mumkin?`),
    [N(`user.name`), N(`user["name"]`), N(`user(name)`), N(`user{name}`)], 1,
    L(`Значение по ключу берётся в квадратных скобках: user["name"].`, `A value by key is read in square brackets: user["name"].`, `Kalit bo‘yicha qiymat kvadrat qavsda olinadi: user["name"].`),
    [L(`Точечная запись — для атрибутов, а у словаря значения берутся по ключу.`, `Dot notation is for attributes; dictionary values are read by key.`, `Nuqta bilan yozish atributlar uchun; lug‘atda qiymat kalit bo‘yicha olinadi.`),
     L(`Круглые скобки означают вызов функции.`, `Parentheses mean a function call.`, `Yumaloq qavslar funksiya chaqiruvini bildiradi.`),
     L(`Фигурные скобки используются при создании словаря, а не для доступа.`, `Curly braces are used to create a dictionary, not to access it.`, `Figurali qavslar lug‘at yaratishda ishlatiladi, unga murojaat qilishda emas.`)],
    L(`Вспомните, как вы брали элемент списка по индексу.`, `Recall how you accessed a list element by index.`, `Ro‘yxat elementini indeks bo‘yicha qanday olganingizni eslang.`)),

  sel('x', L(`Что вернёт user.get("city"), если ключа "city" в словаре нет?`, `What does user.get("city") return if the key "city" is not in the dictionary?`, `Lug‘atda "city" kaliti bo‘lmasa, user.get("city") nima qaytaradi?`),
    [L(`ошибку KeyError`, `a KeyError`, `KeyError xatoligi`), N(`None`), L(`пустую строку`, `an empty string`, `bo‘sh satr`), N(`0`)], 1,
    L(`get возвращает None, если ключа нет и значение по умолчанию не задано.`, `get returns None if the key is missing and no default value is given.`, `Kalit bo‘lmasa va standart qiymat berilmagan bo‘lsa, get None qaytaradi.`),
    [L(`KeyError возникает при user["city"], а get безопаснее.`, `A KeyError occurs with user["city"], while get is safer.`, `KeyError user["city"] da yuzaga keladi, get esa xavfsizroq.`),
     L(`Пустая строка не подставляется автоматически.`, `An empty string is not substituted automatically.`, `Bo‘sh satr avtomatik qo‘yilmaydi.`),
     L(`0 вернётся, только если указать его вторым аргументом get.`, `0 is returned only if it is passed as the second argument of get.`, `0 faqat get ning ikkinchi argumenti sifatida berilsagina qaytadi.`)],
    L(`Для чего нужен get, если есть квадратные скобки?`, `Why is get needed if square brackets exist?`, `Kvadrat qavslar bo‘lsa, get nima uchun kerak?`),
    { verify: { py: `user = {"name": "Anna"}\nprint(user.get("city"))`, out: `None`, optionIsOutput: true } }),

  sel('x', L(`Чему равно len(d) после выполнения кода?`, `What is len(d) after this code runs?`, `Kod bajarilgandan keyin len(d) nimaga teng?`),
    [N(`1`), N(`2`), N(`3`), ERR], 1,
    L(`После присваивания в словаре два ключа, поэтому len(d) равно 2.`, `After the assignment the dictionary has two keys, so len(d) is 2.`, `Qiymat berilgandan keyin lug‘atda ikkita kalit bor, shuning uchun len(d) 2 ga teng.`),
    [L(`Присваивание по новому ключу добавляет пару, а не заменяет словарь.`, `Assigning to a new key adds a pair; it does not replace the dictionary.`, `Yangi kalitga qiymat berish juftlik qo‘shadi, lug‘atni almashtirmaydi.`),
     L(`В словаре два ключа: "a" и "b".`, `The dictionary has two keys: "a" and "b".`, `Lug‘atda ikkita kalit bor: "a" va "b".`),
     L(`Добавлять ключи присваиванием можно.`, `You can add keys by assignment.`, `Kalitlarni qiymat berish orqali qo‘shish mumkin.`)],
    L(`Что делает присваивание по ключу, которого ещё нет?`, `What does assigning to a key that does not exist yet do?`, `Hali mavjud bo‘lmagan kalitga qiymat berish nima qiladi?`),
    { code: N(`d = {"a": 1}\nd["b"] = 2\nprint(len(d))`),
      verify: { py: `d = {"a": 1}\nd["b"] = 2\nprint(len(d))`, out: `2`, optionIsOutput: true } }),

  sel('x', L(`Какое исключение возникает при выполнении 10 / 0?`, `Which exception is raised when 10 / 0 is executed?`, `10 / 0 bajarilganda qaysi istisno yuzaga keladi?`),
    [N(`ValueError`), N(`TypeError`), N(`ZeroDivisionError`), N(`IndexError`)], 2,
    L(`Деление на ноль вызывает ZeroDivisionError.`, `Division by zero raises ZeroDivisionError.`, `Nolga bo‘lish ZeroDivisionError ni keltirib chiqaradi.`),
    [L(`ValueError — неподходящее значение, например int("abc").`, `ValueError means an inappropriate value, such as int("abc").`, `ValueError — mos kelmaydigan qiymat, masalan int("abc").`),
     L(`TypeError — операция над несовместимыми типами.`, `TypeError means an operation on incompatible types.`, `TypeError — mos kelmaydigan turlar ustida amal.`),
     L(`IndexError — выход за границы списка.`, `IndexError means going outside the bounds of a list.`, `IndexError — ro‘yxat chegarasidan chiqib ketish.`)],
    L(`Название ошибки говорит о делении.`, `The name of the error refers to division.`, `Xatolik nomi bo‘lishga ishora qiladi.`),
    { verify: { py: `print(10 / 0)`, err: `ZeroDivisionError` } }),

  mat('x', L(`Сопоставьте типы данных с их описанием.`, `Match the data types with their descriptions.`, `Ma’lumot turlarini ularning tavsifi bilan moslashtiring.`),
    [[N(`int`), L(`целое число`, `whole number`, `butun son`)],
     [N(`str`), L(`строка`, `string`, `satr`)],
     [N(`dict`), L(`пары ключ-значение`, `key-value pairs`, `kalit-qiymat juftliklari`)],
     [N(`bool`), L(`True или False`, `True or False`, `True yoki False`)]],
    L(`Каждый тип данных хранит свой вид значений.`, `Each data type stores its own kind of value.`, `Har bir ma’lumot turi o‘z qiymat turini saqlaydi.`),
    L(`Начните с пары, в которой вы уверены больше всего.`, `Start with the pair you are most sure about.`, `Eng ishonchli juftlikdan boshlang.`)),
]);

module.exports = [l5, l6, l7, l8];
