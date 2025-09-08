'use strict'

// 1. Создание массива с 7 многозначными числами в виде строк
let arr = ["123", "222", "333", "444", "555", "4848", "2577"];

console.log("Числа, начинающиеся с 2 или 4:");
for (let i = 0; i < arr.length; i++) {
    let firstChar = arr[i].charAt(0);
    if (firstChar === '2' || firstChar === '4') {
        console.log(arr[i]);
    }
}

// 2. Вывод простых чисел от 1 до 100
console.log("\nПростые числа от 1 до 100:");

// Функция для проверки, является ли число простым
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}

// Вывод простых чисел и их делителей
for (let i = 1; i <= 100; i++) {
    if (isPrime(i)) {
        console.log(`${i} - Делители этого числа: 1 и ${i}`);
    }
}

alert("Усложненное задание урока 5 выполнено! Проверьте консоль для просмотра результатов.");