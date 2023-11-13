const buttons = document.querySelectorAll(".button");
const output = document.querySelector("#output");
const reset = document.querySelector("#reset");
const roundCounter = document.querySelector("#round-counter");

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.value, getComputerChoice());

    button.setAttribute("class", "selected-border");
  });
});

function getComputerChoice() {
  let choice = Math.floor(Math.random() * 3) + 1;

  if (choice === 1) {
    return "rock";
  }

  if (choice === 2) {
    return "paper";
  }

  return "scissors";
}

function playRound(playerSelection, computerSelection) {
  roundCount++;
  roundCounter.textContent = roundCount;
  buttons.forEach((button) => {
    button.classList.remove("selected-border");

    if (computerSelection === button.value) {
      console.log("class added: " + computerSelection);
      button.classList.add("computer-selected");
      let classRemover = setInterval(() => {
        button.classList.remove("computer-selected");
        clearInterval(classRemover);
      }, 500);
    }
  });

  playerSelection = playerSelection.toLowerCase();
  output.classList.remove("loss");
  output.classList.remove("win");
  if (playerSelection === computerSelection) {
    output.textContent =
      "That round was a draw! You both picked " + playerSelection + ".";
  }

  //lose conditions
  if (
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors") ||
    (playerSelection === "scissors" && computerSelection === "rock")
  ) {
    computerScore += 1;
    let text =
      "You lost that round! " +
      computerSelection +
      " beats " +
      playerSelection +
      ".";
    console.log(text);
    output.textContent = text;
    output.classList.add("loss");
  }

  //win conditions
  if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    playerScore += 1;
    output.textContent =
      "You won that round! " +
      playerSelection +
      " beats " +
      computerSelection +
      ".";
    output.classList.add("win");
  }

  updateScores();
}

function updateScores() {
  const playerScoreLabel = document.querySelector("#playerScore");
  playerScoreLabel.textContent = playerScore;

  const computerScoreLabel = document.querySelector("#computerScore");
  computerScoreLabel.textContent = computerScore;

  if (playerScore >= 5 || computerScore >= 5) {
    const gameResult = document.querySelector("#game-result");
    if (playerScore >= 5) {
      gameResult.textContent = "You're the winner! Congratulations";
      gameResult.classList.add("win");
    }

    if (computerScore >= 5) {
      gameResult.textContent = "Sorry! You lost to the computer.";
      gameResult.classList.add("loss");
    }

    buttons.forEach((button) => {
      button.disabled = true;
    });

    const restartBtn = document.createElement("button");
    restartBtn.setAttribute("id", "restart");
    restartBtn.textContent = "restart";
    restartBtn.addEventListener("click", () => restart());
    reset.appendChild(restartBtn);
  }
}

function restart() {
  playerScore = 0;
  computerScore = 0;
  roundCount = 0;
  roundCounter.textContent = roundCount;
  updateScores();
  document.querySelector("#game-result").textContent = "";

  const removeBtn = document.querySelector("#restart");
  reset.removeChild(removeBtn);
  output.textContent = "";
  buttons.forEach((button) => {
    console.log("removing lock");
    button.removeAttribute("disabled");
  });
}
