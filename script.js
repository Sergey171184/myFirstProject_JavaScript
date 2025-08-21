// Объявление переменных
let title = "myFirstProject_JavaScript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 12000;
let rollback = 25;
let fullPrice = 50000;
let adaptive = true;

// Вывод в консоль типа данных значений переменных
console.log("Тип данных title:", typeof title);
console.log("Тип данных fullPrice:", typeof fullPrice);
console.log("Тип данных adaptive:", typeof adaptive);

// Вывод в консоль длины строки из переменной screens
console.log("Длина строки screens:", screens.length);

// Вывод стоимости верстки экранов и разработки сайта
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

// Приведение строки screens к нижнему регистру и разбиение на массив
let screensLower = screens.toLowerCase();
let screensArray = screensLower.split(", ");
console.log("Массив экранов в нижнем регистре:", screensArray);

// Вычисление и вывод процента отката посреднику
let rollbackAmount = fullPrice * (rollback / 100);
console.log("Процент отката посреднику:", rollbackAmount, "рублей");

// Вывод модального окна
alert("Задание урока 2 выполнено! Проверьте консоль для просмотра результатов.");