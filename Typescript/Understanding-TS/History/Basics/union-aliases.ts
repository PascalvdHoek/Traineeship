enum ResultType {
  Number = "as-number",
  String = "as-string",
}

type Combinable = number | string;
type CombinableLiteral = "as-number" | "as-string";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ResultType | CombinableLiteral
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === ResultType.Number
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 36, ResultType.Number);
console.log("Combined Ages", combinedAges);

const combinedAgesString = combine("30", "36", ResultType.Number);
console.log("Combined Ages and string", combinedAgesString);

const combinedNames = combine("Max", "Anna", ResultType.String);
console.log("Combined Names", combinedNames);
