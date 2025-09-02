'use strict'

// Объявление переменных с присвоением значений через prompt
let title = prompt("Как называется ваш проект?", "калькулятор верстки");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = Number(prompt("Сколько будет стоить данная работа?", "12000"));
let adaptive = confirm("Нужен ли адаптив на сайте?");

// Вопросы по дополнительным услугам
let service1 = prompt("Какой дополнительный тип услуги нужен?", "Дизайн");
let servicePrice1 = Number(prompt("Сколько это будет стоить?", "5000"));
let service2 = prompt("Какой дополнительный тип услуги нужен?", "Наполнение контентом");
let servicePrice2 = Number(prompt("Сколько это будет стоить?", "3000"));

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
    // Убираем пробелы в начале и конце, затем преобразуем первый символ к верхнему регистру, остальные к нижнему
    return title.trim().charAt(0).toUpperCase() + title.trim().slice(1).toLowerCase();
}
title = getTitle();

// 4. Function declaration - итоговая стоимость за вычетом процента отказа
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

alert("Задание урока 4 выполнено! Проверьте консоль для просмотра результатов.");