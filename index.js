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
  passwordsFirst.textContent = randomPassword(passLengthEl.value);
  passwordsSecond.textContent = randomPassword(passLengthEl.value);
}
