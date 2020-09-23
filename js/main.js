const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  }
  //Overwrite displayValue if the current value is 0, otherwise apend the element
  else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(dot) {
  //fix appending dot to the first operand after pressing the operator key
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
  }
  //if the displayValue does not conatain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    //concat the decimal point
    calculator.displayValue += dot;
  }
}
function handleOperator(nextOperator) {
  //Destructure on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  //parseFloat to convert to number
  const inputValue = parseFloat(displayValue);
  // allow new operator to overwrite previous operator before the second operand is entered
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  //verify that firstOperand is null and the inputValue is not a Nan
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
    //if operator property has been assignd an operator then do a calculation.
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}
function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "*":
      return firstOperand * secondOperand;
    case "/":
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

function reset() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}

function updateDisplay() {
  //select the element with id of 'result'//
  const display = document.querySelector("#result");
  //update the element with the calculator's displayValue property//
  display.innerText = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".input");
keys.addEventListener("click", (event) => {
  //Access the clicked element since all keys are children of this element
  const { target } = event;
  const { value } = target;

  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "/":
    case "*":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all_clear":
      reset();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  //old code
  //   if (target.classList.contains("buttonOperator")) {
  //     handleOperator(target.value);
  //     updateDisplay();
  //     return;
  //   }
  //   if (target.classList.contains("buttonDecimal")) {
  //     inputDecimal(target.value);
  //     updateDisplay();
  //     return;
  //   }
  //   if (target.classList.contains("buttonClear")) {
  //     reset();
  //     updateDisplay();
  //     return;
  //   }
  //   inputDigit(target.value);
  updateDisplay();
});
