
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const result = playRound(button.value, getComputerChoice());

        const outputDiv = document.querySelector("#output");
        outputDiv.textContent = result;
    })
});




function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3) + 1;
    
    if(choice === 1) {
        return "rock";
    }

    if(choice === 2) {
        return "paper";
    }

    return "scissors";
}




function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    if(playerSelection === computerSelection) {
        return "That round was a draw!"
    }

    //lose conditions
    if(playerSelection === "rock" && computerSelection === "paper"
    || playerSelection === "paper" && computerSelection === "scissors"
    || playerSelection === "scissors" && computerSelection === "rock") {
        return "You lose! " + computerSelection + " beats " + playerSelection;
    }

    //win conditions
    if(playerSelection === "rock" && computerSelection === "scissors" 
    || playerSelection === "paper" && computerSelection === "rock" 
    || playerSelection === "scissors" && computerSelection === "paper") {
        return "You win! " + playerSelection + " beats " + computerSelection;
    }
}


