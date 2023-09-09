const characters = [...Array(26).keys()]
  .map((i) => String.fromCharCode(65 + i)) // A-Z
  .concat([...Array(26).keys()].map((i) => String.fromCharCode(97 + i))) // a-z
  .concat([...Array(10).keys()].map((i) => String.fromCharCode(48 + i))) // 0-9
  .concat([
    "~",
    "`",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "{",
    "[",
    "}",
    "]",
    ",",
    "|",
    ":",
    ";",
    "<",
    ">",
    ".",
    "?",
    "/",
  ]);

const passwordsFirst = document.getElementById("firstPasswordText");
const passwordsSecond = document.getElementById("secondPasswordText");
const passLengthEl = document.getElementById("passlengthEl");
const symbolCheckEL = document.getElementById("symbolCheck");
const numberCheckEL = document.getElementById("numberCheck");
const numberArray = characters.filter((char) => /[0-9]/.test(char));
const characterArray = characters.filter((char) => /[a-zA-Z]/.test(char));
const symbolArray = characters.filter((char) => !/[a-zA-Z0-9]/.test(char));

function randomIndex(arrayLength) {
  return Math.floor(Math.random() * arrayLength);
}

function randomPassword(passwordLength) {
  let password = "";
  let arrayChoices = [];
  let arrLength = 0;
  const isSymbolChecked = symbolCheckEL.checked;
  const isNumberChecked = numberCheckEL.checked;

  if (isSymbolChecked && isNumberChecked) {
    arrayChoices = characters;
    arrLength = characters.length;
  } else if (isNumberChecked) {
    arrayChoices = numberArray.concat(characterArray);
    arrLength = numberArray.length + characterArray.length;
  } else if (isSymbolChecked) {
    arrayChoices = symbolArray.concat(characterArray);
    arrLength = symbolArray.length + characterArray.length;
  } else {
    arrayChoices = characterArray;
    arrLength = characterArray.length;
  }

  for (let i = 0; i < passwordLength; i++) {
    password += arrayChoices[randomIndex(arrLength)];
  }
  return password;
}

function generatePassword() {
  passwordsFirst.innerHTML = randomPassword(passLengthEl.value);
  passwordsSecond.innerHTML = randomPassword(passLengthEl.value);
}

function handleCopyToClipboard(event, tooltipClass) {
  const clickedElement = event.target;
  console.log(clickedElement);

  // Copy text to clipboard
  navigator.clipboard.writeText(clickedElement.textContent);

  // Find the next sibling element with the specified class and update its text content
  const tooltipElement = clickedElement.nextElementSibling;

  if (tooltipElement && tooltipElement.classList.contains(tooltipClass)) {
    console.log(tooltipElement);
    tooltipElement.textContent = "Copied";
  }
}

function resettooltipText(event) {
  const mouseOutElement = event.target;
  const tooltipElement = mouseOutElement.nextElementSibling;

  if (tooltipElement && tooltipElement.classList.contains("tooltip-text")) {
    console.log(tooltipElement);
    if (tooltipElement.textContent == "Copied") {
      tooltipElement.textContent = "Copy to text";
    }
  }
}

passwordsFirst.addEventListener("click", (event) => {
  handleCopyToClipboard(event, "tooltip-text");
});

passwordsSecond.addEventListener("click", (event) => {
  handleCopyToClipboard(event, "tooltip-text");
});

passwordsFirst.addEventListener("mouseover", (event) => {
  resettooltipText(event);
});

passwordsSecond.addEventListener("mouseover", (event) => {
  resettooltipText(event);
});

const tooltips = document.querySelectorAll(".tooltip");

tooltips.forEach((tooltip) => {
  const tooltipText = tooltip.getAttribute("data-title");
  const tooltipElement = document.createElement("div");
  tooltipElement.className = "tooltip-text";
  tooltipElement.textContent = tooltipText;
  tooltip.appendChild(tooltipElement);
});

// Tooltips
