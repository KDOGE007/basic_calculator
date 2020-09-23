const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};
function inputDigit(digit) {
  const { displayValue } = calculator;
  //Overwrite displayValue if the current value is 0, otherwise apend the element
  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
}

function updateDisplay() {
  //select the element with id of 'result'//
  const display = document.querySelector("#result");
  //update the element with the object 'calculator' displayValue property//
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
    console.log("buttonOperator", target.value);
    return;
  }
  if (target.classList.contains("buttonDecimal")) {
    console.log("buttonDecimal", target.value);
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
