const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
}

const game = {
  playerHand: "",
  cpuHand: "",
}

const hands = [...document.querySelectorAll('.select img')];

function handSelection() {
  game.playerHand = this.dataset.option
  hands.forEach(hand => hand.style.boxShadow = '');
  this.style.boxShadow = '1px 1px 4px 3px grey';
}

// const handSelection = (e) => {
//  // this
//  console.log(e.target);
//  console.log(e.currentTarget);
// }

function cpuChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option; 
}

function checkResult(player, cpu) {
  console.log(player, cpu);
  if (player === cpu) {
    return "draw";
  } else if ((player === "paper" && cpu === "rock") || (player === "rock" && cpu === "scissors") || (player === "scissors" && cpu === "paper")) {
  return "won";
  } else {
    return "lost";
  }
}

function showResult(player, cpu, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="cpu-choice"]').textContent = cpu;
  document.querySelector('p.numbers span').textContent = ++gameSummary.numbers;

  if (result === "won") {
    document.querySelector('p.wins span').textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="who-won"]').textContent = "You won!";
    document.querySelector('[data-summary="who-won"]').style.color = "green";
  } else if (result === "lost") {
    document.querySelector('p.losses span').textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="who-won"]').textContent = "CPU won!";
    document.querySelector('[data-summary="who-won"]').style.color = "red";
  } else {
    document.querySelector('p.draws span').textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="who-won"]').textContent = "Draw!";
    document.querySelector('[data-summary="who-won"]').style.color = "orange";
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
  game.playerHand = "";
}

function startGame() {
  if (!game.playerHand) {
    return alert("Make your move!");
  }
  game.cpuHand = cpuChoice()
  const gameResult = checkResult(game.playerHand, game.cpuHand);
  console.log(gameResult);
  showResult(game.playerHand, game.cpuHand, gameResult);
  endGame();
}

hands.forEach(hand => hand.addEventListener('click', handSelection))
document.querySelector('.start').addEventListener('click', startGame)