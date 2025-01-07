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

function handleAction(action, value) {
  switch (action) {
    case "number":
      inputNumber(value);
      break;
    case "decimal":
      inputDecimal();
      break;
    case "operator":
      chooseOperator(value);
      break;
    case "equals":
      calculate();
      break;
    case "clear":
      clearAll();
      break;
    case "delete":
      deleteLast();
      break;
  }
  updateDisplay();
}

// Wire up button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const { action, value } = button.dataset;
    handleAction(action, value);
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    handleAction("number", e.key);
  } else if (e.key === ".") {
    handleAction("decimal");
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    handleAction("operator", e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    handleAction("equals");
  } else if (e.key === "Escape") {
    handleAction("clear");
  } else if (e.key === "Backspace") {
    handleAction("delete");
  }
});

updateDisplay();
