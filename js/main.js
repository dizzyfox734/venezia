const startBtn = document.querySelector("#startBtn");
const wordInput = document.querySelector("#wordInput");
const dashBoard = document.querySelector("#dashboard");
const goalLine = document.querySelector("#goalLine");
const scoreBox = document.querySelector("#scoreBox");
const hpBox = document.querySelector("#hpBox");

const HIDDEN_CLASSNAME = "hidden";
const SPEED = 5;
const MaxPosition = 1300;

let flag = false;
// 네이버 사전에서 가져올 수 있으면 좋을 듯
const wordStore = [
  "Venezia",
  "Project",
  "Game",
  "Romeo",
  "LuBu",
  "Tomato",
  "Pikachu",
];
const numberOfWord = wordStore.length;
let spanStore = [];
let hp;
let score;

function createWord() {
  const span = document.createElement("span");
  const wordPick = Math.floor(Math.random() * numberOfWord);

  span.innerText = wordStore[wordPick];
  span.style.position = "absolute";
  span.style.top = "-20px";
  span.style.left = `${Math.floor(Math.random() * MaxPosition) + 50}px`;

  dashBoard.appendChild(span);
  spanStore.push(span);
}

function printScore() {
  scoreBox.innerText = `SCORE: ${score}`;
}

function printHP() {
  switch (hp) {
    case 5:
      hpBox.innerText = `HP: ♥ ♥ ♥ ♥ ♥`;
      break;
    case 4:
      hpBox.innerText = `HP: ♥ ♥ ♥ ♥`;
      break;
    case 3:
      hpBox.innerText = `HP: ♥ ♥ ♥`;
      break;
    case 2:
      hpBox.innerText = `HP: ♥ ♥`;
      break;
    case 1:
      hpBox.innerText = `HP: ♥`;
      break;
    default:
      hpBox.innerText = `HP:`;
      flag = false;
      endGame();
  }
}

function endGame() {
  if (confirm("RETRY AGAIN?")) {
    location.reload();
  }
}

// WHEN spanWord arrive at goalLine, REMOVE and REDUCE hp
function dropWord() {

  if (flag) {
    for (let i = 0; i < spanStore.length; i++) {
      spanStore[i].style.top = parseInt(spanStore[i].style.top) + SPEED + "px";

      if (parseInt(spanStore[i].style.top) > 678) {
        hp--;
        dashBoard.removeChild(spanStore[i]);
        spanStore.splice(i, 1);
        i--;
        printHP();
      }
    }
  }
}

function startGame(event) {
  event.preventDefault();
  startBtn.classList.add(HIDDEN_CLASSNAME);
  scoreBox.classList.remove(HIDDEN_CLASSNAME);
  hpBox.classList.remove(HIDDEN_CLASSNAME);
  goalLine.classList.remove(HIDDEN_CLASSNAME);

  flag = true;
  score = 0;
  hp = 5;

  setTimeout(endGame, 60000); // Time limit: 1min

  setInterval(createWord, 1000);

  // IF input == spanWord => REMOVE spanWord
  wordInput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      // INPUT ENTER
      for (let i = 0; i < spanStore.length; i++) {
        if (spanStore[i].innerText == wordInput.value) {
          dashBoard.removeChild(spanStore[i]);
          spanStore.splice(i, 1);

          score += 100;
          printScore();

          break; // Prevent duplicate deletion
        }
      }
      wordInput.value = "";
    }
  });

  setInterval(dropWord, 200);
}

startBtn.addEventListener("click", startGame);
