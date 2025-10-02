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

// === РЕАЛИЗАЦИЯ УРОКА №12 ===

// 1. Запретить нажатие кнопки "Рассчитать" если не выбран ни один тип экрана
function checkCalculateButton() {
    const startBtn = document.getElementById('start');
    let hasValidScreen = false;

    screenBlocks = document.querySelectorAll('.screen');
    screenBlocks.forEach(block => {
        const select = block.querySelector('select');
        const input = block.querySelector('input[type="text"]');

        if (select && select.value !== '' && input && input.value.trim() !== '' && !isNaN(input.value)) {
            hasValidScreen = true;
        }
    });

    startBtn.disabled = !hasValidScreen;
}

// 2. Обработчик для input[type=range] в блоке .rollback
if (rangeInput && rangeValue) {
    rangeInput.addEventListener('input', function () {
        rangeValue.textContent = this.value + '%';
        appData.rollback = Number(this.value);

        // УСЛОЖНЕННОЕ ЗАДАНИЕ: пересчет стоимости с учетом отката после расчета
        if (appData.calculated) {
            appData.addPrices();
        }
    });
}

// Инициализация проверки кнопки при загрузке
document.addEventListener('DOMContentLoaded', function () {
    checkCalculateButton();

    screenBlocks.forEach(block => {
        const select = block.querySelector('select');
        const input = block.querySelector('input[type="text"]');

        if (select) select.addEventListener('change', checkCalculateButton);
        if (input) input.addEventListener('input', checkCalculateButton);
    });
});

// Обработчик для кнопки добавления новых экранов
if (screenBtn) {
    screenBtn.addEventListener('click', function () {
        const firstScreen = document.querySelector('.screen');
        if (firstScreen) {
            const newScreen = firstScreen.cloneNode(true);

            const select = newScreen.querySelector('select');
            const input = newScreen.querySelector('input[type="text"]');
            if (select) select.value = '';
            if (input) input.value = '';

            firstScreen.parentNode.insertBefore(newScreen, screenBtn);

            screenBlocks = document.querySelectorAll('.screen');

            if (select) select.addEventListener('change', checkCalculateButton);
            if (input) input.addEventListener('input', checkCalculateButton);

            checkCalculateButton();
        }
    });
}

// Сохраняем весь исходный функционал с минимальными изменениями
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: false,
    services: [],
    rollback: 0, // Изменено по заданию №2
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    calculated: false, // Добавлено для усложненного задания

    // === ИЗМЕНЕНИЕ ДЛЯ ЗАДАНИЯ №4: обновленный метод addScreens ===
    addScreens: function () {
        this.screens = [];
        screenBlocks = document.querySelectorAll('.screen');

        screenBlocks.forEach(block => {
            const select = block.querySelector('select');
            const input = block.querySelector('input[type="text"]');

            if (select && select.value !== '' && input && input.value.trim() !== '' && !isNaN(input.value)) {
                this.screens.push({
                    type: select.options[select.selectedIndex].text,
                    price: Number(select.value),
                    // ДОБАВЛЕНО В РАМКАХ ЗАДАНИЯ №4: свойство count
                    count: Number(input.value)
                });
            }
        });
    },

    // === ИЗМЕНЕНИЕ ДЛЯ ЗАДАНИЯ №3 и №4: обновленный метод addPrices ===
    addPrices: function () {
        // Расчет стоимости экранов с учетом количества
        this.screenPrice = this.screens.reduce((sum, screen) => {
            return sum + (screen.price * screen.count);
        }, 0);

        // Расчет дополнительных услуг
        this.allServicePrices = 0;

        percentItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const input = item.querySelector('input[type="text"]');
            if (checkbox && checkbox.checked && input) {
                this.allServicePrices += this.screenPrice * (Number(input.value) / 100);
            }
        });

        numberItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const input = item.querySelector('input[type="text"]');
            if (checkbox && checkbox.checked && input) {
                this.allServicePrices += Number(input.value);
            }
        });

        this.fullPrice = this.screenPrice + this.allServicePrices;

        // === ИЗМЕНЕНИЕ ДЛЯ ЗАДАНИЯ №3: перенос логики из getServicePercentPrice ===
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

        // Обновление интерфейса
        if (totalInputs.length >= 5) {
            totalInputs[0].value = this.screenPrice + ' руб.';

            // === ИЗМЕНЕНИЕ ДЛЯ ЗАДАНИЯ №4: вывод общего количества экранов ===
            const totalScreens = this.screens.reduce((sum, screen) => sum + screen.count, 0);
            totalInputs[1].value = totalScreens;

            totalInputs[2].value = this.allServicePrices + ' руб.';
            totalInputs[3].value = this.fullPrice + ' руб.';
            totalInputs[4].value = this.servicePercentPrice + ' руб.';
        }

        this.calculated = true; // Для усложненного задания
    },

    // Сохраняем все исходные методы без изменений
    isStringValid: function (input) {
        if (input === null) return false;
        const trimmed = input.trim();
        return trimmed !== '' && !/^\d+$/.test(trimmed);
    },

    isNumberValid: function (input) {
        if (input === null) return false;
        const trimmed = input.trim();
        return trimmed !== '' && !isNaN(trimmed) && !isNaN(parseFloat(trimmed));
    },

    generateUniqueServiceName: function (baseName) {
        let counter = 1;
        let uniqueName = baseName;

        while (this.services.some(service => service.name === uniqueName)) {
            uniqueName = `${baseName} (${counter})`;
            counter++;
        }

        return uniqueName;
    },

    asking: function () {
        do {
            this.title = prompt("Как называется ваш проект?", "калькулятор верстки") || "";
            if (!this.isStringValid(this.title)) {
                alert("Пожалуйста, введите текстовое значение (не только цифры)!");
            }
        } while (!this.isStringValid(this.title));

        do {
            this.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные") || "";
            if (!this.isStringValid(this.screens)) {
                alert("Пожалуйста, введите текстовое значение (не только цифры)!");
            }
        } while (!this.isStringValid(this.screens));

        let screenPriceInput;
        do {
            screenPriceInput = prompt("Сколько будет стоить данная работа?", "12000");
            if (!this.isNumberValid(screenPriceInput)) {
                alert("Пожалуйста, введите числовое значение!");
            }
        } while (!this.isNumberValid(screenPriceInput));
        this.screenPrice = Number(screenPriceInput.trim());

        this.adaptive = confirm("Нужен ли адаптив на сайте?");

        for (let i = 0; i < 2; i++) {
            let serviceName, servicePriceInput;

            do {
                serviceName = prompt("Какой дополнительный тип услуги нужен?", i === 0 ? "Дизайн" : "Наполнение контентом") || "";
                if (!this.isStringValid(serviceName)) {
                    alert("Пожалуйста, введите текстовое значение (не только цифры)!");
                }
            } while (!this.isStringValid(serviceName));

            do {
                servicePriceInput = prompt("Сколько это будет стоить?", i === 0 ? "5000" : "3000");
                if (!this.isNumberValid(servicePriceInput)) {
                    alert("Пожалуйста, введите числовое значение!");
                }
            } while (!this.isNumberValid(servicePriceInput));

            const uniqueName = this.generateUniqueServiceName(serviceName.trim());
            this.services.push({
                name: uniqueName,
                price: Number(servicePriceInput.trim())
            });
        }
    },

    getAllServicePrices: function () {
        this.allServicePrices = this.services.reduce((sum, service) => sum + service.price, 0);
        return this.allServicePrices;
    },

    getFullPrice: function () {
        this.fullPrice = this.screenPrice + this.allServicePrices;
        return this.fullPrice;
    },

    getTitle: function () {
        this.title = this.title.trim().charAt(0).toUpperCase() + this.title.trim().slice(1).toLowerCase();
        return this.title;
    },

    // === УДАЛЕНО В РАМКАХ ЗАДАНИЯ №5: метод getRollbackMessage удален ===
    /* getRollbackMessage: function (price) {
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
    }, */

    // === ИЗМЕНЕНИЕ: метод getServicePercentPrices оставлен для обратной совместимости ===
    getServicePercentPrices: function () {
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));
        return this.servicePercentPrice;
    },

    logger: function () {
        console.clear();

        console.log("Тип данных title:", typeof this.title);
        console.log("Тип данных fullPrice:", typeof this.fullPrice);
        console.log("Тип данных adaptive:", typeof this.adaptive);

        console.log("Типы экранов для разработки:", this.screens);
        // console.log(this.getRollbackMessage(this.fullPrice)); // Удалено из-за удаления метода
        console.log("Стоимость за вычетом процента отката:", this.servicePercentPrice, "рублей");

        console.log("\nСписок услуг:");
        this.services.forEach((service, index) => {
            console.log(`${index + 1}. ${service.name}: ${service.price} рублей`);
        });

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

    // Обновленный метод start для работы с интерфейсом
    start: function () {
        try {
            this.addScreens();
            this.addPrices();

            if (rangeValue) {
                rangeValue.textContent = this.rollback + '%';
            }

            const resetBtn = document.getElementById('reset');
            if (resetBtn) {
                resetBtn.style.display = 'block';
            }

        } catch (error) {
            alert(error.message);
        }
    }
};

// Обработчик для кнопки "Рассчитать"
const startBtn = document.getElementById('start');
if (startBtn) {
    startBtn.addEventListener('click', function () {
        appData.start();
    });
}

// Обработчик для кнопки "Сброс"
const resetBtn = document.getElementById('reset');
if (resetBtn) {
    resetBtn.addEventListener('click', function () {
        screenBlocks = document.querySelectorAll('.screen');
        screenBlocks.forEach((block, index) => {
            if (index > 0) {
                block.remove();
            } else {
                const select = block.querySelector('select');
                const input = block.querySelector('input[type="text"]');
                if (select) select.value = '';
                if (input) input.value = '';
            }
        });

        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        if (rangeInput) {
            rangeInput.value = 0;
            rangeValue.textContent = '0%';
            appData.rollback = 0;
        }

        Array.from(totalInputs).forEach(input => {
            input.value = '0';
        });

        resetBtn.style.display = 'none';
        appData.calculated = false;

        checkCalculateButton();
    });
}

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