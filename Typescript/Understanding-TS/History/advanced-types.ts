type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date;
// }

// interface ElevatedEmployee extends Employee, Admin {}

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
/**  function overload */

function add(a: number, b: number): number;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: string, b: string): string;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Max', 'Schwarz');
result.split(' ');

//My solution, works in Javascript, but not in Typescript
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === typeof b) {
//     return a + b;
//   }
//   return +a + +b;
// }

type UnknownEmployee = Employee | Admin;

const e2: UnknownEmployee = {
    name: 'Boss',
    privileges: ['play the boss'],
};

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    if ('privileges' in emp) {
        console.log(emp.privileges);
    }
    if ('startDate' in emp) {
        console.log(emp.startDate);
    }
}

class Car {
    drive() {
        console.log('Driving....');
    }
}

class Truck {
    drive() {
        console.log('Driving Truck ....');
    }

    loadCargo(amount: number) {
        console.log('Loading Cargo ... ' + amount);
    }
}

type Verhicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Verhicle) {
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(10);
    }
    vehicle.drive();
}

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed: number;

    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ', speed);
}

moveAnimal({ type: 'horse', runningSpeed: 20 });
moveAnimal({ type: 'bird', flyingSpeed: 80 });

/* Type Casting */

// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
const userInputElement = document.getElementById(
    'user-input'
) as HTMLInputElement;

userInputElement.value = 'Hi there!';

/* Index properties */

interface ErrorContainer {
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Use a capital letter',
};
/** Nullish coalescing */

let userInput = '';
console.log(userInput || 'Dfeaul');
