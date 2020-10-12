//TO DO
// edge case - /0 error
// add positive, negative symbol
// add keyboard id corresponding to buttons

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  //check if the digits entered are the second operand
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
  //fix appending dot to the first operand issue after pressing the operator key
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
  //parseFloat to convert to a number
  const inputValue = parseFloat(displayValue);
  // allow new operator to overwrite previous operator if the second operand has not been entered
  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }
  //verify that firstOperand is null and the inputValue is not a Nan
  if (firstOperand === null && !isNaN(inputValue)) {
    //assign display value to the first operand property
    calculator.firstOperand = inputValue;
    //if operator property has been assignd an operator then do the calculation.
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    //fix long tail decimal memory issue
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    //assign the calculated result to the first operand property readying for the next calculation if needed.
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
//event listner
keys.addEventListener("click", (event) => {
  //Access the clicked element since all keys are children of .input
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
