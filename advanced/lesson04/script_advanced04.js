// Функция для обработки строки
function processString(input) {
    // Проверяем, является ли аргумент строкой
    if (typeof input !== 'string') {
        alert("Аргумент должен быть строкой!");
        return;
    }

    // Убираем пробелы в начале и конце строки
    let trimmedString = input.trim();

    // Если строка длиннее 30 символов, обрезаем и добавляем многоточие
    if (trimmedString.length > 30) {
        return trimmedString.substring(0, 30) + '...';
    }

    return trimmedString;
}

// Тестирование функции
console.log("Обработка строки:");
console.log(processString("   Это очень длинная строка, которая должна быть обрезана после 30 символов   "));
console.log(processString("Короткая строка"));
console.log(processString(123)); // Вызовет предупреждение

alert("Усложненное задание урока 4 выполнено! Проверьте консоль для просмотра результатов.");