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


  function processMove(cmd, cpu) {
    // Your code here
    console.log(`You pick ${cmd}, computer picks ${cpu}.`);

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

  processMove('s', 'r');
  processMove('r', 'r');
