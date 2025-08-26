// Объявление переменных с присвоением значений через prompt
let title = prompt("Как называется ваш проект?", "myFirstProject_JavaScript");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = Number(prompt("Сколько будет стоить данная работа?", "12000"));
let adaptive = confirm("Нужен ли адаптив на сайте?");

// Вопросы по дополнительным услугам
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Дизайн");
let servicePrice1 = Number(prompt("Сколько это будет стоить?", "5000"));
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Наполнение контентом");
let servicePrice2 = Number(prompt("Сколько это будет стоить?", "3000"));

// Вычисление итоговой стоимости
let fullPrice = screenPrice + servicePrice1 + servicePrice2;

// Вычисление стоимости за вычетом отката посреднику
let rollback = 25; // процент отката
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
console.log("Стоимость за вычетом отката:", servicePercentPrice, "рублей");

// Конструкция условий для скидки
if (fullPrice > 30000) {
    console.log("Даем скидку в 10%");
} else if (fullPrice > 15000 && fullPrice <= 30000) {
    console.log("Даем скидку в 5%");
} else if (fullPrice > 0 && fullPrice <= 15000) {
    console.log("Скидка не предусмотрена");
} else if (fullPrice <= 0) {
    console.log("Что то пошло не так");
}

// Сохранение функционала из предыдущих уроков
console.log("Тип данных title:", typeof title);
console.log("Тип данных fullPrice:", typeof fullPrice);
console.log("Тип данных adaptive:", typeof adaptive);
console.log("Длина строки screens:", screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`);
console.log(`Стоимость разработки сайта ${fullPrice} рублей`);

let screensLower = screens.toLowerCase();
let screensArray = screensLower.split(", ");
console.log("Массив экранов в нижнем регистре:", screensArray);

let rollbackAmount = fullPrice * (rollback / 100);
console.log("Процент отката посреднику:", rollbackAmount, "рублей");

alert("Задание урока 3 выполнено! Проверьте консоль для просмотра результатов.");