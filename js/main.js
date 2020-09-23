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

  //verify that firstOperand is null and the inputValue is not a Nan
  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
    //if operator property has been assignd an operator then do a calculation.
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
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

  if (!target.matches("button")) {
    return;
  }
  if (target.classList.contains("buttonOperator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("buttonDecimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }
  if (target.classList.contains("buttonClear")) {
    console.log("buttonClear", target.value);
    return;
  }
  inputDigit(target.value);
  updateDisplay();
});

// const displayValue = document.querySelector("#result");
// const decimal = document.querySelector("#decimal");
// const clear = document.querySelector("#clear");
// const nums = document.querySelectorAll(".buttonNumber");
// const operators = document.querySelectorAll(".buttonOperator");

// // variables to store the values ultimately for .eval method
// var display = "0";
// var pendingInput;
// var evalValueArray = [];

// // display funtion - displaying value//
// updateDisplay = (e) => {
//   var btnValue = e.target.innerText;
//   if (display === "0") {
//     display = "";
//   }
//   // appending the input to displayValue & display it//
//   display += btnValue;
//   displayValue.innerText = display;
// };

// //debuging fuction -alert//
// function debug() {
//   alert("test");
// }

// // calculation funtion//
// calculate = (e) => {
//   var operator = e.target.innerText;

//   switch (operator) {
//     case "+":
//       pendingInput = display;
//       display = "0";
//       displayValue.innerText = display;
//       evalValueArray.push(pendingInput);
//       evalValueArray.push("+");
//       break;
//     case "-":
//       pendingInput = display;
//       display = "0";
//       displayValue.innerText = display;
//       evalValueArray.push(pendingInput);
//       evalValueArray.push("-");
//       break;
//     case "x":
//       pendingInput = display;
//       display = "0";
//       displayValue.innerText = display;
//       evalValueArray.push(pendingInput);
//       evalValueArray.push("*");
//       break;
//     case "/":
//       pendingInput = display;
//       display = "0";
//       displayValue.innerText = display;
//       evalValueArray.push(pendingInput);
//       evalValueArray.push("/");
//       break;
//     case "=":
//       evalValueArray.push(display);
//       let evaluate = eval(evalValueArray.join(" "));
//       result = evaluate + "";
//       displayValue.innerText = result;
//       evalValueArray = [];
//       break;
//     default:
//       break;
//   }
// };

// // event listeners//
// Array.from(nums).forEach((element) =>
//   element.addEventListener("click", updateDisplay)
// );

// Array.from(operators).forEach((element) =>
//   element.addEventListener("click", calculatea)
// );
