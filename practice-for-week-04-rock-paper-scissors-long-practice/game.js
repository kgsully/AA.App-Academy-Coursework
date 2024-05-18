const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  // Your code here
  let commands = ["  Type 'r' for Rock",
                  "  Type 'p' for Paper",
                  "  Type 's' for Scissors",
                  "  Type 'q' to quit",
                  "  Type 'h' for a list of valid commands\n"];

  commands.forEach((el) => {
    console.log(el);
  });
}

function getWinner(move1, move2) {  // move1 = cmd, move2 = cpu
  // Your code here
  let returnVal = -1;

  if (move1 === move2) { // tie
    returnVal = 0;
  }
  else if (VALID_MOVES[move1].winsAgainst === move2) { // win
    returnVal = 1;
  }

  return returnVal;
}

function getCPUMove() {
  // Your code here
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  return cpu = validMoveKeys[randomIndex];
}

function processMove(cmd, cpu) {
  // Your code here
  console.log(`You pick ${VALID_MOVES[cmd].name}, computer picks ${VALID_MOVES[cpu].name}.`);

  let winnerMsg = "";

  let getWin = getWinner(cmd, cpu);

  if (getWin === 0) { // tie
    winnerMsg = "You tie.\n";
    ties++;
  }
  else if (getWin === 1) { // win
    winnerMsg = "You win!\n";
    wins++;
  } else { // loss
    winnerMsg = "You lose...\n";
    losses++;
  }
  console.log(winnerMsg);
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === 'h') {
      console.log("\nHelp:\n");
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]){

      let cpu = getCPUMove();
      console.clear();
      printHelp();
      processMove(cmd, cpu);

    } else {
      console.clear();
      printHelp();
      console.log("\nInvalid command.\n");

    }

    // printHelp();
    promptInput(rl);
  });
}


/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.clear();
  console.log("Welcome to Rock/Paper/Scissors\n");
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};
