// Your code here

// Variable Declarations:
let tttGrid = [];
let isGameOver = false;
let winner = "";

let playerTurn = "";

let imgSrc = "";
let imgAlt = "";

function initGame() {
    console.clear();
    console.log("Initializing New Game...");

    isGameOver = false;

    // clear the grid
    tttGrid = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    console.log("Initializing Grid:", tttGrid);

    // clear all img children for all cells within the grid
    console.log("Clearing grid images...");
    const gridCells = document.querySelectorAll(".cell");
    gridCells.forEach(el => {
        if (!el.classList.contains("cell__hover-enabled")) {
            el.classList.add("cell__hover-enabled");
        }
        el.innerHTML = "";
    });

    // Clear and hide the winner text:
    const divWinner = document.getElementById("div-winner");
    divWinner.innerText = "Winner:";
    divWinner.style.visibility = "hidden";

    // reset player turn to default and then call update function to set to the programmed default player turn
    playerTurn = "";
    updatePlayerTurn();

    // Initialize event listeners
    const grid = document.getElementById("grid-container");
    grid.addEventListener("click", handleClick);

    const btnGiveUp = document.getElementById("btn-give-up");
    btnGiveUp.disabled = false;
    btnGiveUp.addEventListener("click", giveUp);

    const btnNewGame = document.getElementById("btn-new-game");
    btnNewGame.disabled = true;
    btnNewGame.addEventListener("click", initGame);

}

function updatePlayerTurn() {
    switch(playerTurn) {
        case "X":
            playerTurn = "O";
            imgSrc = "./img/player-o.svg";
            imgAlt = "O";
            console.log("Current Player Turn: O");
            break;
        case "O":
            playerTurn = "X";
            imgSrc = "./img/player-x.svg";
            imgAlt = "X";
            console.log("Current Player Turn: X");
            break;
        default:
            playerTurn = "X";
            imgSrc = "./img/player-x.svg";
            imgAlt = "X";
            console.log("Current Player Turn: X");
            break;
    }
}

function checkGrid() {
    let result;

    // Check Rows
    for(let i = 0; i < tttGrid.length; i++) {
        let testVal = tttGrid[i][0];
        if(tttGrid[i][0] !== ' ' && tttGrid[i][1] === testVal && tttGrid[i][2] === testVal) {
          result = testVal;
        }
      }

    // Check Columns
    for(let i = 0; i < tttGrid.length; i++) {
        let testVal = tttGrid[0][i];
        if(tttGrid[0][i] !== ' ' && tttGrid[1][i] === testVal && tttGrid[2][i] === testVal) {
            result = testVal;
        }
      }

    // Check Diagonals
    let diagTestVal = tttGrid[1][1];
    if (diagTestVal !== ' ') {
      if(diagTestVal === tttGrid[0][0] && diagTestVal === tttGrid[2][2]) {
        result = diagTestVal;
      } else if (diagTestVal === tttGrid[0][2] && diagTestVal === tttGrid[2][0]) {
        result = diagTestVal;
      }
    }

    // check Tie
    let tieCheck = tttGrid.map((el) => el.includes(' '));
    if(!tieCheck.includes(true)) {
        result = 'Tie';
    }

    if (result) {
        gameOver(result);
    }

}

function giveUp() {
    updatePlayerTurn();
    gameOver(playerTurn);
}

function gameOver(result) {
    console.log(`Winner: ${result}`);

    // remove appropriate event listeners
    const grid = document.getElementById("grid-container");
    grid.removeEventListener("click", handleClick);

    // appropriately enable / disable buttons
    const btnGiveUp = document.getElementById("btn-give-up");
    btnGiveUp.disabled = true;

    const btnNewGame = document.getElementById("btn-new-game");
    btnNewGame.disabled = false;

    // remove hover effects from cells
    const gridCells = document.querySelectorAll(".cell");
    gridCells.forEach(el => {
        if (el.classList.contains("cell__hover-enabled")) {
            el.classList.remove("cell__hover-enabled");
        }
    });

    // Set winner text and set visibility property to visible
    const divWinner = document.getElementById("div-winner");
    divWinner.innerText = "Winner: " + result;
    divWinner.style.visibility = "visible";
}



function handleClick(event) {
    const cellRow = event.target.dataset.row;
    const cellCol = event.target.dataset.col;

    if (cellRow && cellCol) {
        console.log(`Selected Cell: ${cellRow}, ${cellCol}`);

        // enter player selection into array
        tttGrid[cellRow][cellCol] = playerTurn;
        console.log("Current Grid:", tttGrid);

        // handle display of appropriate image within selected cell
        const playerImg = document.createElement('img');
        playerImg.src = imgSrc;
        playerImg.alt = imgAlt;
        event.target.appendChild(playerImg);
        event.target.classList.remove("cell__hover-enabled");

        // check for win or tie
        checkGrid();

        // update the player turn for the next player
        updatePlayerTurn();
    }
}

window.onload = initGame;
