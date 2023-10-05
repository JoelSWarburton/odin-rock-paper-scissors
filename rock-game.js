
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


function getPlayerSelection() {
    let playerSelection = null;

    while(!playerSelection) {
        let temp = prompt("Rock, paper, or scissors?");
        const re = /rock|paper|scissors/i;
        if(temp.match(re) !== null) {
          
            playerSelection = temp;
        }
    }
    return playerSelection;
}

//returns 1 is player scored, -1 if computer scored, 0 for draw
function getRoundScore(roundResult) {

    let parts =roundResult.split(" ");
    
    if(parts[1] == "win!") {
        return 1;
    }

    if(parts[1] == "lose!") {
        return -1;
    }

    return 0;
} 

function game() {
    let computerScore = 0;
    let playerScore = 0;

    //play 5 rounds
    for(let i = 0; i < 5; i++) {
        
        let playerSelection = getPlayerSelection();

        result = playRound(playerSelection, getComputerChoice());
        console.log(result);

        let roundScore = getRoundScore(result);
        if(roundScore > 0) {
            playerScore++;
        } else if(roundScore < 0) {
            computerScore++;
        }
    
    }


    console.log("Game over! The score! Player: " + playerScore + ", Computer: " + computerScore);
}

game();