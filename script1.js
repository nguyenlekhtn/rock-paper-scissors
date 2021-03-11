
function playRound(e) {
  let intResult;
  const results = document.querySelector("div.results");
  
  playerSelection = capitalize(e.toElement.name);
  console.log(playerSelection);
  computerSelection = computerPlay();
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
    results.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
  }
  else if (intResult == -1) {
    results.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
  }
  else if (intResult == 0) {
    results.textContent = `Draw! Both do ${playerSelection}`;
  }
  else {
    results.textContent = `Something is wrong`;
  }
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

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', playRound);
})

