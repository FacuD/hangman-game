const $ = (el) => document.querySelector(el);

// Constants
const wordContainer = $("#word-container");
const usedLettersContainer = $("#used-letters");
const startButton = $("#start-button");
const wordDisplay = $("#word-display");

// Canvas Initialize
let canvas = $("#canvas");
let ctx = canvas.getContext("2d");
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const hangmanBody = [
  [4, 2, 1, 1],
  [4, 3, 1, 2],
  [3, 5, 1, 1],
  [5, 5, 1, 1],
  [3, 3, 1, 1],
  [5, 3, 1, 1],
];

let choosenWord, usedLetters, mistakes, hits;

const addLetterToUsedLetters = (letter) => {
  const letterElement = document.createElement("span");
  letterElement.innerHTML = letter;
  usedLettersContainer.appendChild(letterElement);
};

const addHangmanBodyPart = (bodyPart) => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(...bodyPart);
};

const wrongLetter = (letter) => {
  addHangmanBodyPart(hangmanBody[mistakes]);
  mistakes++;
  if (mistakes === hangmanBody.length) endGame();
};

const showWord = () => {
  let word = document.createElement("span");
  word.innerHTML = choosenWord.join("");
  wordDisplay.innerText = "The word was: ";
  wordDisplay.appendChild(word);
};

const endGame = () => {
  document.removeEventListener("keydown", handleKeyPress);
  startButton.style.display = "block";
  startButton.innerHTML = "Play Again";
  showWord();
};

const correctLetter = (letter) => {
  const { children } = wordContainer;
  for (let i = 0; i < children.length; i++) {
    if (children[i].innerHTML === letter) {
      children[i].classList.toggle("hidden");
      hits++;
    }
  }
  if (hits === choosenWord.length) endGame();
};

const validateLetter = (letter) => {
  if (choosenWord.includes(letter)) {
    correctLetter(letter);
  } else {
    wrongLetter(letter);
  }
  addLetterToUsedLetters(letter);
  usedLetters.push(letter);
};

const isDictionary = (letter) => {
  return letter.match(/^[a-zñ]$/i);
};

const handleKeyPress = (e) => {
  let newLetter = e.key.toUpperCase();
  if (isDictionary(newLetter) && !usedLetters.includes(newLetter)) {
    validateLetter(newLetter);
  }
};

const drawWord = () => {
  choosenWord.forEach((letter) => {
    const letterElement = document.createElement("span");
    letterElement.innerHTML = letter;
    letterElement.classList.add("letter");
    letterElement.classList.add("hidden");
    wordContainer.appendChild(letterElement);
  });
};

const separateWord = (word) => {
  choosenWord = word.toUpperCase().split("");
};

const drawGallow = () => {
  ctx.canvas.width = 120;
  ctx.canvas.height = 160;
  ctx.scale(20, 20);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#63462D";
  ctx.fillRect(0, 7, 4, 1);
  ctx.fillRect(1, 0, 1, 8);
  ctx.fillRect(2, 0, 3, 1);
  ctx.fillRect(4, 1, 1, 1);
};

const startGame = () => {
  usedLetters = [];
  mistakes = 0;
  hits = 0;
  wordContainer.innerHTML = "";
  wordDisplay.innerHTML = "";
  usedLettersContainer.innerHTML = "";
  startButton.style.display = "none";
  drawGallow();
  fetchRandomWord().then(separateWord).then(drawWord);
  document.addEventListener("keydown", handleKeyPress);
};

startButton.addEventListener("click", startGame);
