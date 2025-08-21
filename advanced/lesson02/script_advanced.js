// Создание переменной num со значением 266219 (тип данных число)
let num = 266219;
console.log("Исходное число:", num);

// Вычисление произведения цифр числа
let digits = num.toString().split('');
let product = 1;

for (let i = 0; i < digits.length; i++) {
    product *= parseInt(digits[i]);
}

console.log("Произведение цифр числа:", product);

// Возведение результата в степень 3
let poweredResult = product ** 3;
console.log("Результат возведения в степень 3:", poweredResult);

// Вывод первых 2 цифр полученного числа
let firstTwoDigits = poweredResult.toString().substring(0, 2);
console.log("Первые две цифры полученного числа:", firstTwoDigits);

// Вывод модального окна
alert("Усложненное задание урока 2 выполнено! Проверьте консоль для просмотра результатов.");