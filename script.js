'use strict'

// Функция для проверки и преобразования в число с обработкой пробелов
function parseNumberInput(input) {
    if (input === null) {
        return null;
    }

    // Убираем пробелы в начале и конце
    let trimmedInput = input.trim();

    // Проверяем, является ли значение числом
    if (trimmedInput === '' || isNaN(trimmedInput)) {
        return NaN;
    }

    return Number(trimmedInput);
}

// Получение данных от пользователя
let title = prompt("Как называется ваш проект?", "калькулятор верстки");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let adaptive = confirm("Нужен ли адаптив на сайте?");

// 1. Получение screenPrice с помощью do while
let screenPrice;
do {
    let screenPriceInput = prompt("Сколько будет стоить данная работа?", "12000");
    screenPrice = parseNumberInput(screenPriceInput);

    if (screenPrice === null) {
        // Пользователь нажал отмену - выходим из цикла
        break;
    } else if (isNaN(screenPrice)) {
        alert("Пожалуйста, введите числовое значение!");
    }
} while (isNaN(screenPrice));

// Если пользователь отменил ввод, прекращаем выполнение
if (screenPrice === null) {
    alert("Вы отменили ввод стоимости работы. Программа завершена.");
    throw new Error("Ввод отменен пользователем");
}

// Вопросы по дополнительным услугам
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Дизайн");

// 2. Проверка введенных данных для servicePrice1
let servicePrice1;
do {
    let servicePrice1Input = prompt("Сколько это будет стоить?", "5000");
    servicePrice1 = parseNumberInput(servicePrice1Input);

    if (servicePrice1 === null) {
        // Пользователь нажал отмену - выходим из цикла
        break;
    } else if (isNaN(servicePrice1)) {
        alert("Пожалуйста, введите числовое значение!");
    }
} while (isNaN(servicePrice1));

// Если пользователь отменил ввод, прекращаем выполнение
if (servicePrice1 === null) {
    alert("Вы отменили ввод стоимости услуги. Программа завершена.");
    throw new Error("Ввод отменен пользователем");
}

let service2 = prompt("Какой дополнительный тип услуги нужен?", "Наполнение контентом");

// Проверка введенных данных для servicePrice2
let servicePrice2;
do {
    let servicePrice2Input = prompt("Сколько это будет стоить?", "3000");
    servicePrice2 = parseNumberInput(servicePrice2Input);

    if (servicePrice2 === null) {
        // Пользователь нажал отмену - выходим из цикла
        break;
    } else if (isNaN(servicePrice2)) {
        alert("Пожалуйста, введите числовое значение!");
    }
} while (isNaN(servicePrice2));

// Если пользователь отменил ввод, прекращаем выполнение
if (servicePrice2 === null) {
    alert("Вы отменили ввод стоимости услуги. Программа завершена.");
    throw new Error("Ввод отменен пользователем");
}

// 3. Приведение типов к нужным
title = String(title).trim();
screens = String(screens).trim();
service1 = String(service1).trim();
service2 = String(service2).trim();
screenPrice = Number(screenPrice);
servicePrice1 = Number(servicePrice1);
servicePrice2 = Number(servicePrice2);
adaptive = Boolean(adaptive);

// 1. Function expression - сумма всех дополнительных услуг
const getAllServicePrices = function () {
    return servicePrice1 + servicePrice2;
};
let allServicePrices = getAllServicePrices();

// 2. Function declaration - сумма стоимости верстки и дополнительных услуг
function getFullPrice() {
    return screenPrice + allServicePrices;
}
let fullPrice = getFullPrice();

// 3. Function declaration - форматирование title
function getTitle() {
    return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
}
title = getTitle();

// 4. Function declaration - итоговая стоимость за вычетом процента отката
function getServicePercentPrices() {
    let rollback = 25; // процент отката
    return Math.ceil(fullPrice - (fullPrice * (rollback / 100)));
}
let servicePercentPrice = getServicePercentPrices();

// 5. Функция для вывода типа переменной
function showTypeOf(variable) {
    console.log(typeof variable);
}

// 6. Функция для получения сообщения о скидке
function getRollbackMessage(price) {
    if (price > 30000) {
        return "Даем скидку в 10%";
    } else if (price > 15000 && price <= 30000) {
        return "Даем скидку в 5%";
    } else if (price > 0 && price <= 15000) {
        return "Скидка не предусмотрена";
    } else if (price <= 0) {
        return "Что то пошло не так";
    }
}

// Очищаем консоль
console.clear();

// Вывод только требуемой информации
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);

console.log("Типы экранов для разработки:", screens);
console.log(getRollbackMessage(fullPrice));
console.log("Стоимость за вычетом процента отката:", servicePercentPrice, "рублей");

alert("Задание урока 5 выполнено! Проверьте консоль для просмотра результатов.");