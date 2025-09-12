'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: false,
    service1: '',
    servicePrice1: 0,
    service2: '',
    servicePrice2: 0,
    rollback: 25,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    // Методы
    // Функция для проверки и преобразования в число с обработкой пробелов
    parseNumberInput: function (input) {
        if (input === null) {
            return null;
        }

        let trimmedInput = input.trim();
        if (trimmedInput === '' || isNaN(trimmedInput)) {
            return NaN;
        }

        return Number(trimmedInput);
    },

    // Метод для получения данных от пользователя
    asking: function () {
        this.title = prompt("Как называется ваш проект?", "калькулятор верстки");
        this.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");

        // Получение screenPrice
        do {
            let screenPriceInput = prompt("Сколько будет стоить данная работа?", "12000");
            this.screenPrice = this.parseNumberInput(screenPriceInput);

            if (this.screenPrice === null) {
                break;
            } else if (isNaN(this.screenPrice)) {
                alert("Пожалуйста, введите числовое значение!");
            }
        } while (isNaN(this.screenPrice));

        if (this.screenPrice === null) {
            throw new Error("Ввод отменен пользователем");
        }

        this.adaptive = confirm("Нужен ли адаптив на сайте?");

        // Вопросы по дополнительным услугам
        this.service1 = prompt("Какой дополнительный тип услуги нужен?", "Дизайн");

        do {
            let servicePrice1Input = prompt("Сколько это будет стоить?", "5000");
            this.servicePrice1 = this.parseNumberInput(servicePrice1Input);

            if (this.servicePrice1 === null) {
                break;
            } else if (isNaN(this.servicePrice1)) {
                alert("Пожалуйста, введите числовое значение!");
            }
        } while (isNaN(this.servicePrice1));

        if (this.servicePrice1 === null) {
            throw new Error("Ввод отменен пользователем");
        }

        this.service2 = prompt("Какой дополнительный тип услуги нужен?", "Наполнение контентом");

        do {
            let servicePrice2Input = prompt("Сколько это будет стоить?", "3000");
            this.servicePrice2 = this.parseNumberInput(servicePrice2Input);

            if (this.servicePrice2 === null) {
                break;
            } else if (isNaN(this.servicePrice2)) {
                alert("Пожалуйста, введите числовое значение!");
            }
        } while (isNaN(this.servicePrice2));

        if (this.servicePrice2 === null) {
            throw new Error("Ввод отменен пользователем");
        }
    },

    // Метод для получения суммы всех дополнительных услуг
    getAllServicePrices: function () {
        this.allServicePrices = this.servicePrice1 + this.servicePrice2;
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
    getRollbackMessage: function () {
        if (this.fullPrice > 30000) {
            return "Даем скидку в 10%";
        } else if (this.fullPrice > 15000 && this.fullPrice <= 30000) {
            return "Даем скидку в 5%";
        } else if (this.fullPrice > 0 && this.fullPrice <= 15000) {
            return "Скидка не предусмотрена";
        } else if (this.fullPrice <= 0) {
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
        console.log(this.getRollbackMessage());
        console.log("Стоимость за вычетом процента отката:", this.servicePercentPrice, "рублей");

        // Вывод всех свойств и методов объекта с помощью for in
        console.log("\nВсе свойства и методы объекта appData:");
        for (let key in this) {
            if (typeof this[key] !== 'function') {
                console.log(`${key}: ${this[key]}`);
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
            this.service1 = String(this.service1).trim();
            this.service2 = String(this.service2).trim();
            this.screenPrice = Number(this.screenPrice);
            this.servicePrice1 = Number(this.servicePrice1);
            this.servicePrice2 = Number(this.servicePrice2);
            this.adaptive = Boolean(this.adaptive);

            // Выполнение расчетов
            this.getAllServicePrices();
            this.getFullPrice();
            this.getTitle();
            this.getServicePercentPrices();

            // Вывод результатов
            this.logger();

            alert("Задание урока 7 выполнено! Проверьте консоль для просмотра результатов.");
        } catch (error) {
            alert(error.message);
        }
    }
};

// Запуск приложения
appData.start();
