'use strict'

const appData = {
    // Свойства
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: false,
    services: [], // Массив для хранения услуг с уникальными именами
    rollback: 25,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,

    // Вспомогательные методы для проверки данных
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

    // Генератор уникального имени услуги (усложненное задание №1)
    generateUniqueServiceName: function (baseName) {
        let counter = 1;
        let uniqueName = baseName;

        // Проверяем, существует ли уже услуга с таким именем
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

            // Генерируем уникальное имя и добавляем услугу (усложненное задание №1)
            const uniqueName = this.generateUniqueServiceName(serviceName.trim());
            this.services.push({
                name: uniqueName,
                price: Number(servicePriceInput.trim())
            });
        }
    },

    // Метод для получения суммы всех дополнительных услуг с использованием reduce (усложненное задание №2)
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

            // Вывод результатов
            this.logger();

            alert("Задание урока 8 выполнено! Проверьте консоль для просмотра результатов.");
        } catch (error) {
            alert(error.message);
        }
    }
};

// Запуск приложения
appData.start();
