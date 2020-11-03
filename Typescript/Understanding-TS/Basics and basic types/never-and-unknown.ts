let userInput: unknown;
let userName: string;

userInput = 5;
userName = "Flip";

// this isnt possible because Type unknown isnt assignable to String
// userName = userInput;

if (typeof userInput === "string") {
  userName = userInput;
}

function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError("an error occurred!", 500);
