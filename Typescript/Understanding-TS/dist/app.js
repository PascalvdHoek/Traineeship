"use strict";
// interface Admin {
//   name: string;
//   privileges: string[];
// }
// interface Employee {
//   name: string;
//   startDate: Date;
// }
// interface ElevatedEmployee extends Employee, Admin {}
const e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add("Max", "Schwarz");
result.split(" ");
const e2 = {
    name: "Boss",
    privileges: ["play the boss"],
};
function printEmployeeInformation(emp) {
    console.log(emp.name);
    if ("privileges" in emp) {
        console.log(emp.privileges);
    }
    if ("startDate" in emp) {
        console.log(emp.startDate);
    }
}
class Car {
    drive() {
        console.log("Driving....");
    }
}
class Truck {
    drive() {
        console.log("Driving Truck ....");
    }
    loadCargo(amount) {
        console.log("Loading Cargo ... " + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(10);
    }
    vehicle.drive();
}
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed: ", speed);
}
moveAnimal({ type: "horse", runningSpeed: 20 });
moveAnimal({ type: "bird", flyingSpeed: 80 });
/* Type Casting */
// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
const userInputElement = document.getElementById("user-input");
userInputElement.value = "Hi there!";
const errorBag = {
    email: "Not a valid email",
    username: "Use a capital letter",
};
/** Nullish coalescing */
let userInput = "";
console.log(userInput || "Dfeaul");
