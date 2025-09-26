'use strict'

// Выполнение задания по манипуляции DOM для страницы "You don't know JS"

document.addEventListener('DOMContentLoaded', () => {
    // 1. Восстановить порядок книг
    const booksContainer = document.querySelector('.books');
    const books = [...booksContainer.children];

    books.sort((a, b) =>
        parseInt(a.querySelector('h2 a').textContent.match(/\d+/)[0]) -
        parseInt(b.querySelector('h2 a').textContent.match(/\d+/)[0])
    );

    booksContainer.append(...books);

    // 2. Заменить фон
    document.body.style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

    // 3. Исправить заголовок в книге 3
    const book3Link = document.querySelector('.book:nth-child(3) h2 a');
    book3Link.textContent = book3Link.textContent.replace('Пропопипы', 'Прототипы');

    // 4. Удалить рекламу
    document.querySelector('.adv').remove();

    // 5. Восстановить порядок глав во второй и пятой книге
    const sortChapters = (bookIndex, correctOrder) => {
        const book = document.querySelector(`.book:nth-child(${bookIndex})`);
        const chapters = [...book.querySelectorAll('li')];
        chapters.sort((a, b) => correctOrder.indexOf(a.textContent) - correctOrder.indexOf(b.textContent));
        book.querySelector('ul').append(...chapters);
    };

    // Сортируем книги 2 и 5
    sortChapters(2, [
        'Введение', 'Предисловие', 'Глава 1: Что такое область видимости?',
        'Глава 2: Лексическая область видимости', 'Глава 3: Область видимости: функции против блоков',
        'Глава 4: Поднятие переменных (Hoisting)', 'Глава 5: Замыкание области видимости',
        'Приложение A: Динамическая область видимости', 'Приложение B: Полифиллинг блочной области видимости',
        'Приложение C: Лексический this', 'Приложение D: Благодарности!'
    ]);

    sortChapters(5, [
        'Введение', 'Предисловие', 'Глава 1: Асинхронность: Сейчас и Тогда',
        'Глава 2: Колбеки', 'Глава 3: Обещания', 'Глава 4: Генераторы',
        'Глава 5: Производительность программы', 'Глава 6: Бенчмаркинг и настройка',
        'Приложение A: Библиотека: asynquence', 'Приложение B: Расширенные асинхронные шаблоны',
        'Приложение C: Благодарности!'
    ]);

    // 6. Добавить главу 8 в книгу 6
    const book6Items = [...document.querySelectorAll('.book:nth-child(6) li')];
    const chapter7 = book6Items.find(li => li.textContent.includes('Глава 7'));
    if (chapter7) {
        chapter7.insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>');
    }
});