// Calculator state
let currentInput = "0";   // what's currently being typed
let previousInput = null; // the operand entered before the operator
let operator = null;      // pending operator: + - * /
let resetOnNextInput = false; // true right after "=" or choosing an operator

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = currentInput;
}

function inputNumber(digit) {
  if (currentInput === "Error" || resetOnNextInput) {
    currentInput = digit;
    resetOnNextInput = false;
    return;
  }
  currentInput = currentInput === "0" ? digit : currentInput + digit;
}

function inputDecimal() {
  if (currentInput === "Error" || resetOnNextInput) {
    currentInput = "0.";
    resetOnNextInput = false;
    return;
  }
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function deleteLast() {
  if (currentInput === "Error" || resetOnNextInput) {
    clearAll();
    return;
  }
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
}

function clearAll() {
  currentInput = "0";
  previousInput = null;
  operator = null;
  resetOnNextInput = false;
}

function chooseOperator(nextOperator) {
  if (currentInput === "Error") return;

  // Chain calculations: if an operator is already pending, resolve it first
  if (operator !== null && !resetOnNextInput) {
    calculate();
  }

  previousInput = currentInput;
  operator = nextOperator;
  resetOnNextInput = true;
}

function calculate() {
  if (operator === null || previousInput === null) return;

  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        currentInput = "Error";
        operator = null;
        previousInput = null;
        resetOnNextInput = true;
        return;
      }
      result = a / b;
      break;
    default:
      return;
  }

  // Trim floating point noise (e.g. 0.1 + 0.2)
  currentInput = String(Math.round(result * 1e10) / 1e10);
  operator = null;
  previousInput = null;
  resetOnNextInput = true;
}
