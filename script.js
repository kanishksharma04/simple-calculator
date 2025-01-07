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
