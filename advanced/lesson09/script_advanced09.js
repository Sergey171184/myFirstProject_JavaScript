'use strict'

// Функция для склонения слов в зависимости от числа
function declineWord(number, words) {
    // words = ['час', 'часа', 'часов']
    number = Math.abs(number) % 100;
    let num = number % 10;

    if (number > 10 && number < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];

    return words[2];
}

// Функция для добавления 0 перед значениями из одной цифры
function addLeadingZero(number) {
    return number < 10 ? '0' + number : number;
}

// Функция для форматирования даты в формате (а)
function formatDateA(date) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourWord = declineWord(hours, ['час', 'часа', 'часов']);
    const minuteWord = declineWord(minutes, ['минута', 'минуты', 'минут']);
    const secondWord = declineWord(seconds, ['секунда', 'секунды', 'секунд']);

    return `Сегодня ${dayName}, ${day} ${month} ${year} года, ${hours} ${hourWord} ${minutes} ${minuteWord} ${seconds} ${secondWord}`;
}

// Функция для форматирования даты в формате (б)
function formatDateB(date) {
    const day = addLeadingZero(date.getDate());
    const month = addLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = addLeadingZero(date.getHours());
    const minutes = addLeadingZero(date.getMinutes());
    const seconds = addLeadingZero(date.getSeconds());

    return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
}

// Функция для обновления даты и времени на странице
function updateDateTime() {
    const now = new Date();

    const formatA = formatDateA(now);
    const formatB = formatDateB(now);

    // Создаем элементы для вывода
    let outputA = document.getElementById('datetime-format-a');
    let outputB = document.getElementById('datetime-format-b');

    if (!outputA) {
        outputA = document.createElement('div');
        outputA.id = 'datetime-format-a';
        outputA.style.margin = '10px 0';
        outputA.style.padding = '10px';
        outputA.style.backgroundColor = '#f0f8ff';
        outputA.style.border = '1px solid #007bff';
        outputA.style.borderRadius = '5px';
        document.body.appendChild(outputA);
    }

    if (!outputB) {
        outputB = document.createElement('div');
        outputB.id = 'datetime-format-b';
        outputB.style.margin = '10px 0';
        outputB.style.padding = '10px';
        outputB.style.backgroundColor = '#fff0f5';
        outputB.style.border = '1px solid #ff69b4';
        outputB.style.borderRadius = '5px';
        document.body.appendChild(outputB);
    }

    outputA.textContent = formatA;
    outputB.textContent = formatB;
}

// Запускаем обновление каждую секунду
document.addEventListener('DOMContentLoaded', function () {
    // Первоначальное обновление
    updateDateTime();

    // Обновление каждую секунду
    setInterval(updateDateTime, 1000);
});