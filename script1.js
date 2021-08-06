const selections = [...document.querySelectorAll('.side--player .selection')];
const scoreBoard = document.getElementById('scoreBoard');
const reset = document.getElementById('reset');
const resultDiv = document.getElementById('result');
const roundResult = document.getElementById('roundResult');

// const results = document.querySelector("div.results");

function getRoundResult(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) return 'draw';
  else if (
    (playerSelection === 'rock' && computerSelection == 'paper') ||
    (playerSelection == 'paper' && computerSelection == 'scissors') ||
    (playerSelection == 'scissors' && computerSelection == 'rock')
  )
    return 'lose';
  else return 'win';
}

function getRandomSelection() {
  const selections = ['rock', 'paper', 'scissors'];
  return selections[Math.floor(Math.random() * 3)];
}

function changeScoreBoard(playerScore, computerScore) {
  scoreBoard.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
}

function annouceRoundResult(result) {
  const p = document.createElement('p');
  p.classList.add('roundResult');
  p.textContent = `Player ${result} this round`;
  roundResult.insertBefore(p, roundResult.firstElementChild);
}

function removeSelectedClass() {
  const selectedBtns = document.querySelectorAll('.selected');
  selectedBtns.forEach((btn) => btn.classList.remove('selected'));
}

async function playRound(playerSelection, playerScore, computerScore) {
  const computerSelection = getRandomSelection();
  const selectedComputerBtn = document.querySelector(
    `.side--computer [data-select="${computerSelection}"]`
  );
  selectedComputerBtn.classList.add('selected');

  const result = getRoundResult(playerSelection, computerSelection);
  switch (result) {
    case 'win':
      playerScore++;
      break;
    case 'lose':
      computerScore++;
      break;
    case 'draw':
      break;
  }

  changeScoreBoard(playerScore, computerScore);
  annouceRoundResult(result);
  setTimeout(removeSelectedClass, 1000);
  return [playerScore, computerScore];
}

function capitalize(str) {
  let arrayStr = [...str.toLowerCase()];
  arrayStr[0] = arrayStr[0].toUpperCase();
  return arrayStr.join('');
}

function getWinner(playerScore, computerScore, threshold) {
  if (playerScore === threshold) return 'player';
  else if (computerScore === threshold) return 'computer';
  else return 'none';
}

function annouceWinner(winner) {
  if (winner === 'player') {
    resultDiv.textContent = `You're the best. You beat him !!!`;
  } else {
    resultDiv.textContent = `Good luck next time`;
  }
}

function game() {
  let playerScore = 0;
  let computerScore = 0;
  const THRESHOLD = 3;

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    resultDiv.textContent = '';
    roundResult.textContent = '';
    changeScoreBoard(playerScore, computerScore);
  }

  reset.addEventListener('click', resetGame);
  selections.forEach((selection) => {
    selection.addEventListener('click', async (e) => {
      e.target.classList.add('selected');
      let winner = 'none';
      const playerSelection = e.target.dataset.select;
      [playerScore, computerScore] = await playRound(
        playerSelection,
        playerScore,
        computerScore
      );

      winner = getWinner(playerScore, computerScore, THRESHOLD);
      if (winner !== 'none') {
        annouceWinner(winner);
      }
    });
  });
}

game();
