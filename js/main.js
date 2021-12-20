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
const wordStore = ["Venezia", "Project", "Game", "Romeo", "LuBu", "Tomato", "Pikachu"];
let spanStore = [];
let MaxPositionOfWord;
let hp;
let score = 0;


function createWord() {
    const numberOfWord = wordStore.length;
    MaxPositionOfWord = dashBoard.clientWidth -100;

    for(let i=0; i<numberOfWord; i++) {
        const span = document.createElement("span");
        const wordPick = Math.floor(Math.random() * numberOfWord);

        span.innerText = wordStore[wordPick];
        span.style.position = "absolute";
        span.style.top = "-20px";
        span.style.left = `${Math.floor(Math.random() * MaxPositionOfWord) + 50}px`;

        dashBoard.appendChild(span);
        spanStore.push(span);
    }
}

// WHEN spanWord arrive at goalLine, REMOVE and REDUCE hp
function moveWord() {
    if(flag) {
        const numberOfWord = wordStore.length;


        for(let i=0; i<numberOfWord; i++) {
            spanStore[i].style.top = parseInt(spanStore[i].style.top) + SPEED + "px";

            if(parseInt(spanStore[i].style.top) >= 700) {
                hp--;
                spanStore.splice(i, 1);
                
                dashBoard.removeChild(spanStore[i]);

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
    hp = 5;
    createWord();


    // IF input == spanWord => REMOVE spanWord
    wordInput.addEventListener("keyup", function(event) {
        if(event.keyCode == 13) { // INPUT ENTER
            for(let i = 0; i<spanStore.length; i++) {
                if(spanStore[i].innerText == wordInput.value) {
                    dashBoard.removeChild(spanStore[i]);

                    score += 100;
                    // print score
                }
            }
            wordInput.value = "";
        }
    });

    setInterval(moveWord, 100);
}



startBtn.addEventListener("click", startGame);