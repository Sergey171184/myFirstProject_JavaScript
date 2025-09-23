'use strict'

// Получаем все элементы со страницы в самом верху кода

// 1. Получить заголовок "Калькулятор верстки" через метод getElementsByTagName
const titleElement = document.getElementsByTagName('h1')[0];

// 2. Получить кнопки "Рассчитать" и "Сброс" через метод getElementsByClassName
const handlerButtons = document.getElementsByClassName('handler_btn');

// 3. Получить кнопку "+" под выпадающим списком через метод querySelector
const screenBtn = document.querySelector('.screen-btn');

// 4. Получить все элементы с классом other-items в две разные переменные
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');

// 5. Получить input type=range через его родителя с классом rollback одним запросом через метод querySelector
const rangeInput = document.querySelector('.rollback input[type="range"]');

// 6. Получить span с классом range-value через его родителя с классом rollback одним запросом через метод querySelector
const rangeValue = document.querySelector('.rollback .range-value');

// 7. Получить все инпуты с классом total-input справа через метод getElementsByClassName
const totalInputs = document.getElementsByClassName('total-input');

// 8. Получить все блоки с классом screen в изменяемую переменную (let) через метод querySelectorAll
let screenBlocks = document.querySelectorAll('.screen');

// Проверяем, что все элементы найдены
console.log('Заголовок:', titleElement);
console.log('Кнопки handler:', handlerButtons);
console.log('Кнопка +:', screenBtn);
console.log('Элементы percent:', percentItems);
console.log('Элементы number:', numberItems);
console.log('Range input:', rangeInput);
console.log('Range value:', rangeValue);
console.log('Total inputs:', totalInputs);
console.log('Screen blocks:', screenBlocks);

// Сохраняем весь функционал из lesson08 без изменений
const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: false,
    services: [],
    rollback: 25,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    // Проверка, что строка содержит не только цифры
    isStringValid: function (input) {
        if (input === null) return false;
        const trimmed = input.trim();
        return trimmed !== '' && !/^\d+$/.test(trimmed);
    },

    // Проверка, что значение является числом
    isNumberValid: function (input) {
        if (input === null) return false;
        const trimmed = input.trim();
        return trimmed !== '' && !isNaN(trimmed) && !isNaN(parseFloat(trimmed));
    },

    // Генератор уникального имени услуги
    generateUniqueServiceName: function (baseName) {
        let counter = 1;
        let uniqueName = baseName;

        while (this.services.some(service => service.name === uniqueName)) {
            uniqueName = `${baseName} (${counter})`;
            counter++;
        }

        return uniqueName;
    },

    // Метод для получения данных от пользователя с проверкой
    asking: function () {
        // Запрос названия проекта
        do {
            this.title = prompt("Как называется ваш проект?", "калькулятор верстки") || "";
            if (!this.isStringValid(this.title)) {
                alert("Пожалуйста, введите текстовое значение (не только цифры)!");
            }
        } while (!this.isStringValid(this.title));

        // Запрос типов экранов
        do {
            this.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные") || "";
            if (!this.isStringValid(this.screens)) {
                alert("Пожалуйста, введите текстовое значение (не только цифры)!");
            }
        } while (!this.isStringValid(this.screens));

        // Запрос стоимости работы
        let screenPriceInput;
        do {
            screenPriceInput = prompt("Сколько будет стоить данная работа?", "12000");
            if (!this.isNumberValid(screenPriceInput)) {
                alert("Пожалуйста, введите числовое значение!");
            }
        } while (!this.isNumberValid(screenPriceInput));
        this.screenPrice = Number(screenPriceInput.trim());

        this.adaptive = confirm("Нужен ли адаптив на сайте?");

        // Запрос дополнительных услуг (2 услуги) с проверкой на уникальность имен
        for (let i = 0; i < 2; i++) {
            let serviceName, servicePriceInput;

            // Запрос названия услуги
            do {
                serviceName = prompt("Какой дополнительный тип услуги нужен?", i === 0 ? "Дизайн" : "Наполнение контентом") || "";
                if (!this.isStringValid(serviceName)) {
                    alert("Пожалуйста, введите текстовое значение (не только цифры)!");
                }
            } while (!this.isStringValid(serviceName));

            // Запрос стоимости услуги
            do {
                servicePriceInput = prompt("Сколько это будет стоить?", i === 0 ? "5000" : "3000");
                if (!this.isNumberValid(servicePriceInput)) {
                    alert("Пожалуйста, введите числовое значение!");
                }
            } while (!this.isNumberValid(servicePriceInput));

            // Генерируем уникальное имя и добавляем услугу
            const uniqueName = this.generateUniqueServiceName(serviceName.trim());
            this.services.push({
                name: uniqueName,
                price: Number(servicePriceInput.trim())
            });
        }
    },

    // Метод для получения суммы всех дополнительных услуг с использованием reduce
    getAllServicePrices: function () {
        this.allServicePrices = this.services.reduce((sum, service) => sum + service.price, 0);
        return this.allServicePrices;
    },

    // Метод для получения полной стоимости
    getFullPrice: function () {
        this.fullPrice = this.screenPrice + this.allServicePrices;
        return this.fullPrice;
    },

    // Метод для форматирования title
    getTitle: function () {
        this.title = this.title.trim().charAt(0).toUpperCase() + this.title.trim().slice(1).toLowerCase();
        return this.title;
    },

    // Метод для получения стоимости за вычетом процента отката
    getServicePercentPrices: function () {
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
        return this.servicePercentPrice;
    },

    // Метод для получения сообщения о скидке
    getRollbackMessage: function (price) {
        if (price > 30000) {
            return "Даем скидку в 10%";
        }
        if (price > 15000 && price <= 30000) {
            return "Даем скидку в 5%";
        }
        if (price > 0 && price <= 15000) {
            return "Скидка не предусмотрена";
        }
        if (price <= 0) {
            return "Что то пошло не так";
        }
    },

    // Метод для вывода информации в консоль
    logger: function () {
        console.clear();

        console.log("Тип данных title:", typeof this.title);
        console.log("Тип данных fullPrice:", typeof this.fullPrice);
        console.log("Тип данных adaptive:", typeof this.adaptive);

        console.log("Типы экранов для разработки:", this.screens);
        console.log(this.getRollbackMessage(this.fullPrice));
        console.log("Стоимость за вычетом процента отката:", this.servicePercentPrice, "рублей");

        // Вывод информации об услугах
        console.log("\nСписок услуг:");
        this.services.forEach((service, index) => {
            console.log(`${index + 1}. ${service.name}: ${service.price} рублей`);
        });

        // Вывод всех свойств и методов объекта с помощью for in
        console.log("\nВсе свойства и методы объекта appData:");
        for (let key in this) {
            if (typeof this[key] !== 'function') {
                if (Array.isArray(this[key])) {
                    console.log(`${key}:`, this[key]);
                } else {
                    console.log(`${key}: ${this[key]}`);
                }
            } else {
                console.log(`${key}: function`);
            }
        }
    },

    // Главный метод, запускающий весь процесс
    start: function () {
        try {
            this.asking();

            // Приведение типов к нужным
            this.title = String(this.title).trim();
            this.screens = String(this.screens).trim();
            this.screenPrice = Number(this.screenPrice);
            this.adaptive = Boolean(this.adaptive);

            // Выполнение расчетов
            this.getAllServicePrices();
            this.getFullPrice();
            this.getTitle();
            this.getServicePercentPrices();

            // Вывод результатов в консоль
            this.logger();

            // Обновляем значения на странице, если элементы существуют
            if (totalInputs.length >= 5) {
                totalInputs[0].value = this.screenPrice + ' руб.'; // Стоимость верстки
                totalInputs[2].value = this.allServicePrices + ' руб.'; // Стоимость доп. услуг
                totalInputs[3].value = this.fullPrice + ' руб.'; // Итоговая стоимость
                totalInputs[4].value = this.servicePercentPrice + ' руб.'; // Стоимость с учетом отката
            }

            if (rangeValue) {
                rangeValue.textContent = this.rollback + '%';
            }

            alert("Задание урока 9 выполнено! Проверьте консоль для просмотра результатов.");
        } catch (error) {
            alert(error.message);
        }
    }
};

// Запуск приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    appData.start();
});