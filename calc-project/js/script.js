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

// УСЛОЖНЕННОЕ ЗАДАНИЕ 14.1, 14.2: элементы для CMS
const cmsCheckbox = document.getElementById('cms-open');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');
const cmsSelect = document.getElementById('cms-select');
const cmsOtherInput = document.getElementById('cms-other-input');
const cmsOtherInputBlock = document.querySelector('.hidden-cms-variants .main-controls__input');

// Переменная для отслеживания состояния расчета
let isCalculated = false;

// ЗАДАНИЕ 14.1: Перевод на стрелочные функции (кроме методов объекта)

// Проверка состояния кнопки "Рассчитать"
const checkCalculateButton = () => {
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
};

// Обработчик для range input
if (rangeInput && rangeValue) {
    rangeInput.addEventListener('input', () => {
        rangeValue.textContent = rangeInput.value + '%';
        appData.rollback = Number(rangeInput.value);

        // УСЛОЖНЕННОЕ ЗАДАНИЕ 14: пересчет стоимости после расчета
        if (isCalculated) {
            updateRollbackPrice();
        }
    });
}

// Функция для обновления стоимости с учетом отката
const updateRollbackPrice = () => {
    const rollbackPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)));
    if (totalInputs.length >= 5) {
        totalInputs[4].value = rollbackPrice + ' руб.';
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    checkCalculateButton();

    screenBlocks.forEach(block => {
        const select = block.querySelector('select');
        const input = block.querySelector('input[type="text"]');

        if (select) select.addEventListener('change', checkCalculateButton);
        if (input) input.addEventListener('input', checkCalculateButton);
    });
});

// Обработчик для кнопки добавления экранов
if (screenBtn) {
    screenBtn.addEventListener('click', () => {
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

// УСЛОЖНЕННОЕ ЗАДАНИЕ 14.1: Открытие блока CMS при выборе чекбокса
if (cmsCheckbox && hiddenCmsVariants) {
    cmsCheckbox.addEventListener('change', () => {
        if (cmsCheckbox.checked) {
            hiddenCmsVariants.style.display = 'flex'; // display: flex для блока CMS
        } else {
            hiddenCmsVariants.style.display = 'none';
            if (cmsSelect) cmsSelect.value = '';
            if (cmsOtherInputBlock) {
                cmsOtherInputBlock.style.display = 'none';
                cmsOtherInput.value = '';
            }
        }
    });
}

// УСЛОЖНЕННОЕ ЗАДАНИЕ 14.2: Показ input для "Другое" в CMS
if (cmsSelect && cmsOtherInputBlock) {
    cmsSelect.addEventListener('change', () => {
        if (cmsSelect.value === 'other') {
            cmsOtherInputBlock.style.display = 'block'; // Показ input для "Другое"
        } else {
            cmsOtherInputBlock.style.display = 'none';
            cmsOtherInput.value = '';
        }
    });
}

// ЗАДАНИЕ 14.2: Объект appData с использованием this
const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: false,
    services: [],
    rollback: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    calculated: false,
    cmsPrice: 0,

    // Добавление экранов с учетом количества
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
                    count: Number(input.value)
                });
            }
        });
    },

    // Расчет всех цен
    addPrices: function () {
        // Расчет стоимости экранов
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

        // УСЛОЖНЕННОЕ ЗАДАНИЕ 14.3: расчет стоимости CMS
        this.cmsPrice = 0;
        if (cmsCheckbox && cmsCheckbox.checked) {
            if (cmsSelect && cmsSelect.value === 'other' && cmsOtherInput && cmsOtherInput.value) {
                this.cmsPrice = this.screenPrice * (Number(cmsOtherInput.value) / 100);
            } else if (cmsSelect && cmsSelect.value !== '' && cmsSelect.value !== 'other') {
                this.cmsPrice = this.screenPrice * (Number(cmsSelect.value) / 100);
            }
        }

        // Полная стоимость
        this.fullPrice = this.screenPrice + this.allServicePrices + this.cmsPrice;

        // Расчет стоимости с учетом отката
        this.servicePercentPrice = Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100)));

        // Обновление интерфейса
        if (totalInputs.length >= 5) {
            totalInputs[0].value = this.screenPrice + ' руб.';

            const totalScreens = this.screens.reduce((sum, screen) => sum + screen.count, 0);
            totalInputs[1].value = totalScreens;

            totalInputs[2].value = this.allServicePrices + ' руб.';
            totalInputs[3].value = this.fullPrice + ' руб.';
            totalInputs[4].value = this.servicePercentPrice + ' руб.';
        }

        this.calculated = true;
        isCalculated = true;
    },

    // ЗАДАНИЕ 14.4: Метод reset()
    reset: function () {
        // Сброс свойств объекта
        this.title = '';
        this.screens = [];
        this.screenPrice = 0;
        this.adaptive = false;
        this.services = [];
        this.rollback = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.allServicePrices = 0;
        this.calculated = false;
        this.cmsPrice = 0;

        // ЗАДАНИЕ 14.4.1: Смена кнопок (Сброс -> Рассчитать)
        const startBtn = document.getElementById('start');
        const resetBtn = document.getElementById('reset');
        if (startBtn) startBtn.style.display = 'block';
        if (resetBtn) resetBtn.style.display = 'none';

        // ЗАДАНИЕ 14.4.2: Удаление дополнительных элементов и сброс значений
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

        // Сброс чекбоксов
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // УСЛОЖНЕННОЕ ЗАДАНИЕ 14.4: сброс состояния CMS
        if (hiddenCmsVariants) {
            hiddenCmsVariants.style.display = 'none';
        }
        if (cmsSelect) {
            cmsSelect.value = '';
        }
        if (cmsOtherInputBlock) {
            cmsOtherInputBlock.style.display = 'none';
            cmsOtherInput.value = '';
        }

        // Сброс range
        if (rangeInput) {
            rangeInput.value = 0;
        }
        if (rangeValue) {
            rangeValue.textContent = '0%';
        }

        // ЗАДАНИЕ 14.4.3: Разблокировка полей
        const leftInputs = document.querySelectorAll('.main-controls input[type="text"]');
        const leftSelects = document.querySelectorAll('.main-controls select');

        leftInputs.forEach(input => {
            input.disabled = false;
        });

        leftSelects.forEach(select => {
            select.disabled = false;
        });

        // Сброс итоговых значений
        Array.from(totalInputs).forEach(input => {
            input.value = '0';
        });

        // Обновление состояния кнопки
        checkCalculateButton();

        isCalculated = false;
    },

    // Методы для совместимости
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

    // Основной метод расчета
    start: function () {
        try {
            this.addScreens();
            this.addPrices();

            if (rangeValue) {
                rangeValue.textContent = this.rollback + '%';
            }

            // ЗАДАНИЕ 14.3: Блокировка полей после расчета
            const leftInputs = document.querySelectorAll('.main-controls input[type="text"]');
            const leftSelects = document.querySelectorAll('.main-controls select');

            leftInputs.forEach(input => {
                input.disabled = true;
            });

            leftSelects.forEach(select => {
                select.disabled = true;
            });

            // Смена кнопок (Рассчитать -> Сброс)
            const startBtn = document.getElementById('start');
            const resetBtn = document.getElementById('reset');
            if (startBtn) startBtn.style.display = 'none';
            if (resetBtn) resetBtn.style.display = 'block';

        } catch (error) {
            alert(error.message);
        }
    }
};

// Обработчики кнопок
const startBtn = document.getElementById('start');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        appData.start();
    });
}

const resetBtn = document.getElementById('reset');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        appData.reset();
    });
}

// Проверка элементов в консоли
console.log('Заголовок:', titleElement);
console.log('Кнопки handler:', handlerButtons);
console.log('Кнопка +:', screenBtn);
console.log('Элементы percent:', percentItems);
console.log('Элементы number:', numberItems);
console.log('Range input:', rangeInput);
console.log('Range value:', rangeValue);
console.log('Total inputs:', totalInputs);
console.log('Screen blocks:', screenBlocks);
console.log('CMS checkbox:', cmsCheckbox);
console.log('Hidden CMS variants:', hiddenCmsVariants);