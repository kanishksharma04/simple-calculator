// Calculator state
let currentInput = "0";   // what's currently being typed
let previousInput = null; // the operand entered before the operator
let operator = null;      // pending operator: + - * /
let resetOnNextInput = false; // true right after "=" or choosing an operator

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = currentInput;
}
