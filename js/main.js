const startBtn = document.querySelector("#startBtn");
const wordInput = document.querySelector("#wordInput");
const dashBoard = document.querySelector("#dashboard");
const goalLine = document.querySelector("#goalLine");
const scoreBox = document.querySelector("#scoreBox");
const hpBox = document.querySelector("#hpBox");

const HIDDEN_CLASSNAME = "hidden";
const SPEED = 5;

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
let spanStore = [];
let MaxPositionOfWord;
let hp;
let score;

function createWord() {
  const numberOfWord = wordStore.length;
  MaxPositionOfWord = dashBoard.clientWidth - 100;

  for (let i = 0; i < numberOfWord; i++) {
    const span = document.createElement("span");
    const wordPick = Math.floor(Math.random() * numberOfWord);

    span.innerText = wordStore[wordPick];
    span.style.position = "absolute";
    span.style.top = "-20px";
    span.style.left = `${Math.floor(Math.random() * MaxPositionOfWord) + 50}px`;

    dashBoard.appendChild(span);
    spanStore.push(span);

    
  }

  console.log(numberOfWord);
  for(let i=0; i<numberOfWord; i++) {
    console.log(spanStore[i].innerText);
  }
  console.log("--------------");

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
      flag = false;
      if(confirm("FAILED\nRETRY AGAIN?")) {
        location.reload();
      };
  }
}

// WHEN spanWord arrive at goalLine, REMOVE and REDUCE hp
function dropWord() {
  if (flag) {
    const numberOfWord = wordStore.length;

    for (let i = 0; i < numberOfWord; i++) {
      spanStore[i].style.top = parseInt(spanStore[i].style.top) + SPEED + "px";

      if (parseInt(spanStore[i].style.top) >= 700) {
        hp--;
        spanStore.splice(i, 1);
        console.log(`i는 ${i}번째 ${spanStore[i].innerText}`);
        dashBoard.removeChild(spanStore[i]);

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
  createWord();

  // IF input == spanWord => REMOVE spanWord
  wordInput.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      // INPUT ENTER
      for (let i = 0; i < spanStore.length; i++) {
        if (spanStore[i].innerText == wordInput.value) {
          dashBoard.removeChild(spanStore[i]);

          score += 100;
          printScore();
        }
      }
      wordInput.value = "";
    }
  });

  setInterval(dropWord, 50);
}


startBtn.addEventListener("click", startGame);
