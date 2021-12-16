const startBtn = document.querySelector("#startBtn");
const wordInput = document.querySelector("#wordInput");
const dashBoard = document.querySelector("#dashboard");

const HIDDEN_CLASSNAME = "hidden";


// 네이버 사전에서 가져올 수 있으면 좋을 듯
const wordStore = ["Venezia", "Project", "Game", "Romeo", "LuBu", "Tomato", "Pikachu"];
let spanStore = [];
let MaxPositionOfWord;


function createWord() {
    const numberOfWord = wordStore.length;
    MaxPositionOfWord = dashBoard.clientWidth -100;

    for(let i=0; i<numberOfWord; i++){
        const span = document.createElement("span");
        const wordPick = Math.floor(Math.random() * numberOfWord);

        span.innerHTML = wordStore[wordPick];
        span.style.position = "absolute";
        span.style.top = "0px";
        span.style.left = `${Math.floor(Math.random() * MaxPositionOfWord) + 50}px`;

        dashBoard.appendChild(span);
        spanStore.push(span);
    }
}



function startGame(event) {
    event.preventDefault();
    startBtn.classList.add(HIDDEN_CLASSNAME);
    wordInput.classList.remove(HIDDEN_CLASSNAME);
    createWord();
}



startBtn.addEventListener("click", startGame);