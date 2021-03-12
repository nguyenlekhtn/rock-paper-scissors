// const results = document.querySelector("div.results");
let playerScore = 0; 
let computeScore = 0;


function playRound(e) {
  let intResult;

  const result = document.querySelector("div.results");

  
  // make playerSelection case-insensitive
  playerSelection = capitalize(e.toElement.name);

  // create computerSelection
  computerSelection = computerPlay();

  // Perform the comparasion, 0 if draw, -1 if lose, 1 if win
  if (playerSelection == computerSelection) intResult = 0;
  else if ((playerSelection == "Rock"
    && computerSelection == "Paper") ||
    (playerSelection == "Paper"
      && computerSelection == "Scissors") ||
    (playerSelection == "Scissors"
      && computerSelection == "Rock")) {
    intResult = -1;
  }
  else intResult = 1;


  if (intResult == 1) {
    playerScore++;

  }
  else if (intResult == -1) {
    computeScore++;

  }
  

  
  result.textContent = `Player: ${playerSelection}, computer: ${computerSelection}  =>   ${(intResult == 1) ? "Player" : (intResult == -1) ? "Computer" : "No one"} wins.
  
  Player score: ${playerScore}, computer score: ${computeScore}`;

  if(playerScore == 5 || computeScore == 5) {
    const p = document.createElement('p');
    p.textContent = (playerScore == 5) ? "Player win" : "Player lose";
    result.appendChild(p);
  }

  // results.appendChild(result);

}


function capitalize(str) {
  let arrayStr = [...str.toLowerCase()];
  arrayStr[0] = arrayStr[0].toUpperCase();
  return arrayStr.join("");

}

function computerPlay() {
  let dice = Math.random() * 3;
  if (dice < 1) return "Rock";
  else if (dice < 2) return "Paper";
  else return "Scissors";
}

function resetGame() {
  playerScore = 0;
  computeScore = 0;
  const div = document.querySelector('div.results');
  div.textContent = `Player score: ${playerScore}, computer score: ${computeScore}`;
}

const buttons = document.querySelectorAll('button.play');



buttons.forEach(button => {
  button.addEventListener('click', playRound);
})

const reset = document.querySelector(`button[name="Reset"]`);
reset.addEventListener('click', resetGame);


