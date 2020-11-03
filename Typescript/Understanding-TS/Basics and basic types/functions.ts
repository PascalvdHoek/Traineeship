function add(n1: number, n2: number): number {
  return n1 + n2;
}

// let combineValues : Function;

// Type is een functie die 2 number paramaters accepteert en een number returned
let combineValues: (a: number, b: number) => number;

combineValues = add;

console.log(combineValues(8, 8));

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(20, 20, (number) => console.log(number));
