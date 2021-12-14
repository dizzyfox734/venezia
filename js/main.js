const startBtn = document.querySelector("#startBtn");
const wordInput = document.querySelector("#wordInput");

const HIDDEN_CLASSNAME = "hidden";

function startGame(event) {
    event.preventDefault();
    startBtn.classList.add(HIDDEN_CLASSNAME);
    wordInput.classList.remove(HIDDEN_CLASSNAME);
    
}




startBtn.addEventListener("click", startGame);