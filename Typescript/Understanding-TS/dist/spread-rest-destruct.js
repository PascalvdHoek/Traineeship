"use strict";
// const add = (a: number, b: number) => {
//   return a + b;
// };
// console.log(add(2, 4));
// const add = (a: number, b: number = 1) => a + b;
const printOutput = (output) => console.log(output);
printOutput("Hello world");
const button2 = document.querySelector("button");
if (button2) {
    button2.addEventListener("click", (event) => {
        console.log(event);
    });
}
const hobbies = ["fishing", "running"];
const activeHobbies = ["hiking"];
activeHobbies.push(...hobbies);
const person = {
    namePerson: "Max",
    age: 30,
};
// rest parameter
const coppiedPerson = Object.assign({}, person);
const add = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return (curResult += curValue);
    }, 0);
};
const addedNumbers = add(1, 2, 3, 4, 56, 3);
console.log(addedNumbers);
// array destructuring
const [hobby1, hobby2, ...remaining] = hobbies;
// object destructuring
const { namePerson, age } = person;
