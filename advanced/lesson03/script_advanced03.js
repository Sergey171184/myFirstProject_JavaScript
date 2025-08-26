// 1. Вывод дней недели на русском или английском
let lang = 'ru'; // может быть 'ru' или 'en'

// a) через if
console.log("Решение через if:");
if (lang === 'ru') {
    console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
} else if (lang === 'en') {
    console.log('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
}

// b) через switch-case
console.log("Решение через switch-case:");
switch (lang) {
    case 'ru':
        console.log('понедельник, вторник, среда, четверг, пятница, суббота, воскресенье');
        break;
    case 'en':
        console.log('monday, tuesday, wednesday, thursday, friday, saturday, sunday');
        break;
}

// c) через многомерный массив без if и switch
console.log("Решение через многомерный массив:");
let days = {
    'ru': ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'],
    'en': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
};
console.log(days[lang].join(', '));

// 2. Проверка значения переменной namePerson с помощью тернарных операторов
let namePerson = "Артем"; // может быть любым значением

let role = namePerson === "Артем"
    ? "директор"
    : namePerson === "Александр"
        ? "преподаватель"
        : "студент";

console.log("Роль:", role);

alert("Усложненное задание урока 3 выполнено! Проверьте консоль для просмотра результатов.");