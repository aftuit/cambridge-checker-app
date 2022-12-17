import {
  camb7,
  camb8,
  camb9,
  camb10,
  camb11,
  camb12,
  camb13,
  camb14,
  camb15,
  camb16,
  camb17,
} from "./data.js";
// import { isUpdateAvailable } from "../serviceWorker.js";

let btn = document.getElementById("btn");
let number = document.getElementById("number");
let testNumber = document.getElementById("test-number");
let testType = document.getElementById("test-type");
let inputs = document.getElementById("inputs");
let form = document.getElementById("checkAnswers");
let passageNumber = document.getElementById("passage");
let filter = document.getElementById("filter-container");
let toast = document.getElementById("toast-wrap");
let trueAns = document.getElementById("true");
let wrongAns = document.getElementById("wrong");
let wrongAnsIndex = document.getElementById("wrongAnsIndex");
let wrongAnsShow = document.getElementById("wrong-ans-show");
let wrongAnsWrapper = document.getElementById("wrong-ans-wrapper");
let filterResult = document.getElementById("filter-result");
let check_camb_numb = document.getElementById("check_camb_numb");
let check_test_numb = document.getElementById("check_test_numb");
let check_test_type = document.getElementById("check_test_type");
let toastContent = document.getElementById("toast-content-id");
let toastCloser = document.getElementById("toast-closer");
let updateBtn = document.getElementById("update-btn");
// let infoUpdate = document.getElementById("info-updates");
let collapseBtn = document.getElementById("collapse-btn");
let downImg = document.getElementById("down-img");
let showList = document.getElementById("showList");
let containerResult = document.getElementById("container-result");
// let showUpdateAvailable = document.getElementById("showupdateavailable");

let cambNumbers = [
  camb7,
  camb8,
  camb9,
  camb10,
  camb11,
  camb12,
  camb13,
  camb14,
  camb15,
  camb16,
  camb17,
];
let selectedTestNumber;
let selectedCambNumber;
let selectNumb;
let inputLength = [];
let numberQuestion = 1;
let showNumberQuestion;

function create(elem) {
  return document.createElement(elem);
}

let divwrapp = create("div");
let buttonCheck = create("button");
let buttonCancel = create("button");
let buttonsWrapper = create("div");


function showListAnswers () {
  if(!showList.checked) {
    wrongAnsWrapper.classList.add("d-none");
    divwrapp.classList.add("opacity-0");
    
  } else {
    wrongAnsWrapper.classList.remove("d-none");
    divwrapp.classList.remove("opacity-0");
  } 
}
showListAnswers();
showList.onchange = showListAnswers;

let notcollapse = true;
collapseBtn.addEventListener("click", () => {
  if(notcollapse) {
    downImg.classList.add("arrow-img")
  } else {
    downImg.classList.remove("arrow-img")
  }
  notcollapse = !notcollapse;
})

// const checkOnlineStatus = async () => {
//   try {
//     const online = await fetch("../images/moon.png");
//     return online.status >= 200 && online.status < 300; 
//   } catch (err) {
//     return false; 
//   }
// };

// setInterval(async () => {
//   const result = await checkOnlineStatus();
//   if (result && isUpdateAvailable) {
//     infoUpdate.classList.remove("d-none");
//     showUpdateAvailable.classList.remove("opacity-0");
//   } else {
//     showUpdateAvailable.classList.add("opacity-0");
//     infoUpdate.classList.add("d-none");
//   }
// }, 2000);

updateBtn.addEventListener("click", () => {
  window.location.reload();
})

function getSelectedItems() {
  selectedCambNumber = number.value;
  selectedTestNumber = testNumber.value;
  selectNumb = cambNumbers[selectedCambNumber - 7];
  let newItem = selectNumb[selectedTestNumber].reading;
  if (testType.value === "reading") {
    inputLength = newItem[passageNumber.value];
    if (passageNumber.value == 0 || passageNumber.value == 3) {
      numberQuestion = 1;
    } else if (passageNumber.value == 1) {
      numberQuestion = +newItem[passageNumber.value - 1].length + 1;
    } else if (passageNumber.value == 2) {
      numberQuestion =
        +newItem[passageNumber.value - 1].length +
        +newItem[passageNumber.value - 2].length +
        1;
    }
    showNumberQuestion = numberQuestion;
    passageNumber.classList.remove("d-none");
  } else if (testType.value === "listening"){
    passageNumber.classList.add("d-none");
    inputLength = selectNumb[selectedTestNumber].listening;
    showNumberQuestion = 1;
  }
}
getSelectedItems();

number.onchange = getSelectedItems;
testNumber.onchange = getSelectedItems;
testType.onchange = getSelectedItems;
passageNumber.onchange = getSelectedItems;

buttonCancel.addEventListener("click", () => {
  divwrapp.remove();
  showList.checked = false;
  buttonsWrapper.classList.add("d-none");
  containerResult.classList.remove("showing");
  showListAnswers();
  filterResult.classList.add("d-none");
  filter.classList.remove("d-none");
  toast.classList.remove("show");
  testType.value === "reading"?
  showNumberQuestion = numberQuestion:
  showNumberQuestion = 1;
});
toastCloser.addEventListener("click", () => {
  toastContent.classList.add("d-none");
});

function getTestNumber(numb) {
  switch (numb) {
    case "testOne":
      return "1";
    case "testTwo":
      return "2";
    case "testThree":
      return "3";
    case "testFour":
      return "4";
  }
}

btn.addEventListener("click", () => {
  containerResult.classList.add("showing");
  filter.classList.add("d-none");
  buttonsWrapper.classList.remove("d-none");
  filterResult.classList.remove("d-none");
  divwrapp.remove();
  divwrapp = create("div");
  toastContent.classList.add("d-none");

  check_camb_numb.innerHTML = selectedCambNumber;
  check_test_numb.innerHTML = getTestNumber(selectedTestNumber);
  check_test_type.innerHTML =
    testType.value === "reading"
      ? passageNumber.value == 3
        ? "READING"
        : `READING passage ${eval(+passageNumber.value + 1)}`
      : "LISTENING";

  inputLength.forEach((_, index) => {
    let div = create("div");
    let input = create("input");
    let label = create("label");
    input.type = "text";
    input.autocomplete = "off";
    input.id = "text-" + index;
    input.name = "answer-" + index;
    label.for = "text-" + index;
    label.innerHTML = +showNumberQuestion+ +index + ")";
    label.value = index + 1;
    div.classList.add("input-wrapper");
    div.classList.add("col-12");
    div.classList.add("col-md-4");
    div.classList.add("col-sm-6");
    div.classList.add("d-flex");
    div.classList.add("align-middle");
    div.classList.add("mt-3");
    input.classList.add("w-80");
    input.classList.add("border");
    input.classList.add("form-control");
    input.classList.add("border-3");
    input.classList.add("w-100");
    input.classList.add("ms-1");
    divwrapp.classList.add("row");
    divwrapp.classList.add("row__");
    divwrapp.classList.add("px-3");
    
    div.appendChild(label);
    div.appendChild(input);

    divwrapp.appendChild(div);
  });
  buttonCheck.id = "checkbtn";
  buttonCheck.type = "submit";
  buttonCheck.classList.add("btn");
  buttonCheck.classList.add("btn-primary");
  buttonCheck.classList.add("btn-primary1");
  buttonCheck.classList.add("d-block");
  buttonCheck.classList.add("my-2");
  buttonCheck.classList.add("mx-auto");
  buttonCheck.classList.add("btn-block");
  buttonCheck.classList.add("w-100");
  buttonCancel.id = "cancelbtn";
  buttonCancel.type = "button";
  buttonCancel.classList.add("btn");
  buttonCancel.classList.add("mx-auto");
  buttonCancel.classList.add("btn-block");
  buttonCancel.classList.add("w-100");
  buttonCancel.classList.add("btn-danger");
  buttonCancel.classList.add("btn-danger1");
  buttonCancel.classList.add("d-block");
  buttonCancel.classList.add("mb-3");
  buttonCheck.innerHTML = "Check";
  buttonCancel.innerHTML = "Cancel";

  buttonsWrapper.classList.add("buttonsWrapper");
  
  buttonsWrapper.appendChild(buttonCheck);
  buttonsWrapper.appendChild(buttonCancel);
  inputs.appendChild(divwrapp);
  inputs.appendChild(buttonsWrapper);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let newArray = Array.from(e.target.elements);
  let newnewArray = [];
  showListAnswers();
  newArray.forEach(
    (item, index) =>
      index !== newArray.length - 1 &&
      index !== newArray.length - 2 &&
      newnewArray.push(item.value.toLowerCase().trim())
  );

  Array.from(form).forEach((item) => item.classList.remove("border-danger"));
  Array.from(form).forEach((item) => item.classList.remove("border-success"));

  let wrongAnswersIndex = [];
  newnewArray.forEach((item, index) => {
    if (!inputLength[index].includes(item.toLowerCase().trim())) {
      Array.from(form)[index].classList.add("border-danger");
      wrongAnswersIndex.push(index);
    } else {
      Array.from(form)[index].classList.add("border-success");
    }
  });

  let wrongAnswers = wrongAnswersIndex.length;
  let trueAnswers = newnewArray.length - wrongAnswers;

  trueAns.innerHTML = trueAnswers;
  wrongAns.innerHTML = wrongAnswers;
  if (wrongAnswers == 0) {
    wrongAnsShow.classList.add("d-none");
  } else {
    wrongAnsShow.classList.remove("d-none");
    let indexWrongs = wrongAnswersIndex.map((item) => item + showNumberQuestion ).join(" , ");
    wrongAnsIndex.innerHTML = indexWrongs;
  }
  toastContent.classList.remove("d-none");
  toast.classList.add("show");
});



if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceWorker.js")
    })
}
