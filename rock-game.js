
const buttons = document.querySelectorAll(".button");
const output = document.querySelector("#output");


let playerScore = 0;
let computerScore = 0;


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playRound(button.value, getComputerChoice());
        
        button.setAttribute("class", "selected-border")
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
    buttons.forEach((button) => {
        button.classList.remove("selected-border");
        

        if(computerSelection === button.value) {
            console.log("class added: " + computerSelection)
            button.classList.add("computer-selected")
            let classRemover = setInterval(() => {
                button.classList.remove("computer-selected");
                clearInterval(classRemover);
            }, 500);
        }
    })

    playerSelection = playerSelection.toLowerCase();

    if(playerSelection === computerSelection) {
        
        output.textContent = "That round was a draw! You both picked " + playerSelection + ".";
    }

    //lose conditions
    if(playerSelection === "rock" && computerSelection === "paper"
    || playerSelection === "paper" && computerSelection === "scissors"
    || playerSelection === "scissors" && computerSelection === "rock") {
        computerScore += 1;
        let text = "You lose! " + computerSelection + " beats " + playerSelection + "."; 
        console.log(text)
        output.textContent = text;
    }

    //win conditions
    if(playerSelection === "rock" && computerSelection === "scissors" 
    || playerSelection === "paper" && computerSelection === "rock" 
    || playerSelection === "scissors" && computerSelection === "paper") {
        playerScore += 1;
        output.textContent = "You win! " + playerSelection + " beats " + computerSelection + ".";
    }

    updateScores();

}

function updateScores() {
        const playerScoreLabel = document.querySelector("#playerScore");
        playerScoreLabel.textContent = playerScore;

        const computerScoreLabel = document.querySelector("#computerScore");
        computerScoreLabel.textContent = computerScore;


        if(playerScore >= 5 || computerScore >= 5) {
            document.querySelector("#game-result").textContent = "Game over!"
            buttons.forEach((button) => {
                button.disabled = true;
            })

            const restartBtn = document.createElement("button");
            restartBtn.setAttribute("id", "restart");
            restartBtn.textContent = "restart"
            restartBtn.addEventListener("click", () => restart());
            output.appendChild(restartBtn)
        }
}

function restart() {
    playerScore = 0;
    computerScore = 0;
    updateScores();
    document.querySelector("#game-result").textContent = "";
   
    const removeBtn = document.querySelector("#restart");
    output.removeChild(removeBtn);
    output.textContent = "";
    buttons.forEach((button) => {
        console.log("removeing lock")
        button.removeAttribute("disabled")
    })
}



